#!/usr/bin/env node
/**
 * scripts/project-reactor.mjs
 *
 * Yudao-Quad-Terminal 企业级项目反应堆与全自动白标置换引擎 (ProjectReactor Engine)
 * 对标 upstream apps/backend/yudao-gateway/src/test/java/cn/iocoder/yudao/ProjectReactor.java
 * 并对齐 Coolie 工坊跨底座调用规范与四端同源 BASE_PATH 契约。
 *
 * 核心功能：
 * 1. 毫秒级重构：彻底替换开源底座品牌词 (芋道 / yudao / cn.iocoder.yudao / cn.iocoder.cloud)
 *    置换为专属商业工程包名、Maven ArtifactId、系统标题与 Docker 容器名；
 * 2. 物理路径重命名：自动将 Java 源码目录 `cn/iocoder/yudao` 迁移为 `${packageName}`；
 * 3. 四端同源 BASE_PATH 模板渲染：联动 `blueprint-engine.cjs render` 与 `generate-gateway-config.mjs`，
 *    一次性对齐 `/<slug>/{2c,admin,admin-api,app-api,v3/api-docs}`；
 * 4. 标准化多端目录：将 apps/yudao-admin-vue3 -> apps/admin, apps/yudao-mall-uniapp -> apps/miniapp,
 *    apps/yudao-quad-app -> apps/app, yudao-server -> server；
 * 5. 深度脱敏降噪：自动修剪 docs/architecture/archive 与 docs/specs/archive 等历史归档及本地凭据状态；
 * 6. 二进制白名单防护：自动绕过图片、字体、压缩包等非文本格式，防止破坏二进制数据。
 *
 * 用法：
 *   node scripts/project-reactor.mjs --target /tmp/my-proj --name my-proj --title "业务管理系统" [--package com.my_proj.server]
 *   node scripts/project-reactor.mjs /tmp/my-proj --project my-proj --title "业务管理系统" [--package-prefix com.my_proj.server]
 *   node scripts/project-reactor.mjs --in-place --name my-app --title "星云智能制造中台"
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const WHITE_FILE_EXTENSIONS = new Set([
  ".gif", ".jpg", ".jpeg", ".png", ".svg", ".ico", ".webp",
  ".eot", ".woff2", ".woff", ".ttf", ".otf",
  ".xdb", ".zip", ".tar", ".gz", ".dump", ".pdf", ".jar", ".class",
  ".bmp", ".mp3", ".mp4", ".avi", ".mov", ".wasm", ".patch"
]);

const IGNORE_DIRS = new Set([
  "node_modules", ".git", ".idea", ".vscode", "target", "dist", "build",
  ".claude", ".commandcode", ".next", ".cache"
]);

function parseArgs(argv = process.argv.slice(2)) {
  const options = {
    inPlace: false,
    target: null,
    name: null,
    title: null,
    titleFile: null,
    groupId: null,
    packageName: null,
    artifactId: null,
    basePath: null,
    port: 48080,
    gatewayPort: 48120,
    dryRun: false,
    quiet: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--in-place") options.inPlace = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--quiet") options.quiet = true;
    else if (arg === "--target" && argv[i + 1]) options.target = argv[++i];
    else if (arg.startsWith("--target=")) options.target = arg.split("=")[1];
    else if ((arg === "--name" || arg === "--project") && argv[i + 1]) options.name = argv[++i];
    else if (arg.startsWith("--name=") || arg.startsWith("--project=")) options.name = arg.split("=")[1];
    else if (arg === "--title" && argv[i + 1]) options.title = argv[++i];
    else if (arg.startsWith("--title=")) options.title = arg.split("=")[1];
    else if (arg === "--title-file" && argv[i + 1]) options.titleFile = argv[++i];
    else if (arg.startsWith("--title-file=")) options.titleFile = arg.split("=")[1];
    else if (arg === "--group-id" && argv[i + 1]) options.groupId = argv[++i];
    else if (arg.startsWith("--group-id=")) options.groupId = arg.split("=")[1];
    else if ((arg === "--package" || arg === "--package-prefix") && argv[i + 1]) options.packageName = argv[++i];
    else if (arg.startsWith("--package=") || arg.startsWith("--package-prefix=")) options.packageName = arg.split("=")[1];
    else if (arg === "--artifact-id" && argv[i + 1]) options.artifactId = argv[++i];
    else if (arg.startsWith("--artifact-id=")) options.artifactId = arg.split("=")[1];
    else if (arg === "--base-path" && argv[i + 1]) options.basePath = argv[++i];
    else if (arg.startsWith("--base-path=")) options.basePath = arg.split("=")[1];
    else if (arg === "--port" && argv[i + 1]) options.port = parseInt(argv[++i], 10);
    else if (arg.startsWith("--port=")) options.port = parseInt(arg.split("=")[1], 10);
    else if (!arg.startsWith("-") && !options.target) options.target = arg;
  }

  if (options.titleFile) {
    try {
      const raw = fs.readFileSync(path.resolve(options.titleFile), "utf8").trim();
      if (raw) options.title = raw;
    } catch (err) {
      console.error(`❌ --title-file 读取失败: ${options.titleFile} (${err.message})`);
      process.exit(2);
    }
  }

  return options;
}

function copyDirRecursive(src, dest, relFromRoot = "") {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const childRel = relFromRoot ? `${relFromRoot}/${entry.name}` : entry.name;
    // 跳过 apps/* 下的上游推广截图目录与开源社区模板目录（保留主仓根 .github/workflows）
    if (relFromRoot.startsWith("apps") && (entry.name === ".image" || entry.name === ".gitee")) {
      continue;
    }
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, childRel);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * 物理清除派生工程中的上游教程 Markdown、宣传二维码/截图目录、社区 Issue 模板与未纳入 Maven 的 *-ui 占位空壳目录
 */
export function purgeUpstreamPromoAndTutorialBloat(targetDir) {
  const fixedRemovals = [
    path.join(targetDir, "apps", "admin", ".image"),
    path.join(targetDir, "apps", "backend", ".image"),
    path.join(targetDir, "apps", "miniapp", ".image"),
    path.join(targetDir, "apps", "backend", ".gitee"),
    path.join(targetDir, "apps", "backend", ".github"),
    path.join(targetDir, "apps", "admin", ".gitee"),
    path.join(targetDir, "apps", "admin", ".github"),
    path.join(targetDir, "apps", "miniapp", ".gitee"),
    path.join(targetDir, "apps", "miniapp", ".github"),
    path.join(targetDir, "apps", "backend", "script", "livekit-poc"),
    path.join(targetDir, "apps", "backend", "sql", "db2", "README.md"),
  ];

  for (const p of fixedRemovals) {
    try {
      if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
    } catch {}
  }

  // 1. 递归清除 apps/ 下任何残留的 .image 目录
  const appsDir = path.join(targetDir, "apps");
  if (fs.existsSync(appsDir)) {
    const cleanAppsImages = (dir) => {
      let entries = [];
      try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
      } catch {
        return;
      }
      for (const e of entries) {
        if (IGNORE_DIRS.has(e.name)) continue;
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          if (e.name === ".image") {
            try {
              fs.rmSync(full, { recursive: true, force: true });
            } catch {}
          } else {
            cleanAppsImages(full);
          }
        }
      }
    };
    cleanAppsImages(appsDir);
  }

  const backendDir = path.join(targetDir, "apps", "backend");
  if (!fs.existsSync(backendDir)) return;

  // 2. 递归删除 apps/backend/ 下所有《芋道 ...》.md / *芋道*.md 教程文档
  const tutorialFileRe = /(?:芋道|《.*?(?:入门|指南|教程).*?》).*\.md$/i;
  const cleanBackendTutorials = (dir) => {
    let entries = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (IGNORE_DIRS.has(e.name)) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        cleanBackendTutorials(full);
      } else if (e.isFile() && e.name.endsWith(".md") && tutorialFileRe.test(e.name)) {
        try {
          fs.rmSync(full, { force: true });
        } catch {}
      }
    }
  };
  cleanBackendTutorials(backendDir);

  // 3. 删除 apps/backend/*-ui 占位目录（先核验未在 apps/backend/pom.xml 的 <module> 中声明）
  const pomPath = path.join(backendDir, "pom.xml");
  const declaredModules = new Set();
  if (fs.existsSync(pomPath)) {
    try {
      const pom = fs.readFileSync(pomPath, "utf8");
      for (const m of pom.matchAll(/<module>\s*([^<\s]+)\s*<\/module>/g)) {
        declaredModules.add(m[1].trim());
      }
    } catch {}
  }

  for (const e of fs.readdirSync(backendDir, { withFileTypes: true })) {
    if (e.isDirectory() && (e.name === "yudao-ui" || e.name.endsWith("-ui"))) {
      if (!declaredModules.has(e.name)) {
        try {
          fs.rmSync(path.join(backendDir, e.name), { recursive: true, force: true });
        } catch {}
      }
    }
  }
}

function pruneHistoricalArchives(targetDir) {
  const archives = [
    path.join(targetDir, "docs", "architecture", "archive"),
    path.join(targetDir, "docs", "specs", "archive"),
    path.join(targetDir, "docs", "architecture", "artifacts"),
    path.join(targetDir, "docs", "architecture", "OPEN-SOURCE-TRACKING-MANUAL.md"),
    path.join(targetDir, "docs", "architecture", "CURRENT-PROGRESS.md"),
    path.join(targetDir, ".claude"),
    path.join(targetDir, ".commandcode"),
    path.join(targetDir, ".gitmodules"),
  ];

  for (const item of archives) {
    try {
      if (fs.existsSync(item)) {
        fs.rmSync(item, { recursive: true, force: true });
      }
    } catch {}
  }
}

function normalizeAppDirectories(targetDir) {
  const appsDir = path.join(targetDir, "apps");
  if (!fs.existsSync(appsDir)) return;

  const adminOld = path.join(appsDir, "yudao-admin-vue3");
  const adminNew = path.join(appsDir, "admin");
  if (fs.existsSync(adminOld) && !fs.existsSync(adminNew)) {
    fs.renameSync(adminOld, adminNew);
  }

  const miniappOld = path.join(appsDir, "yudao-mall-uniapp");
  const miniappNew = path.join(appsDir, "miniapp");
  if (fs.existsSync(miniappOld) && !fs.existsSync(miniappNew)) {
    fs.renameSync(miniappOld, miniappNew);
  }

  const appOld = path.join(appsDir, "yudao-quad-app");
  const appNew = path.join(appsDir, "app");
  if (fs.existsSync(appOld) && !fs.existsSync(appNew)) {
    fs.renameSync(appOld, appNew);
  }

  const backendServerOld = path.join(appsDir, "backend", "yudao-server");
  const backendServerNew = path.join(appsDir, "backend", "server");
  if (fs.existsSync(backendServerOld) && !fs.existsSync(backendServerNew)) {
    fs.renameSync(backendServerOld, backendServerNew);
    const backendPom = path.join(appsDir, "backend", "pom.xml");
    if (fs.existsSync(backendPom)) {
      let pom = fs.readFileSync(backendPom, "utf8");
      pom = pom.replace(/<module>yudao-server<\/module>/g, "<module>server</module>");
      fs.writeFileSync(backendPom, pom, "utf8");
    }
  }
}

function renameJavaPackagePaths(targetDir, oldPkgDot, newPkgDot) {
  const oldPkgSlash = oldPkgDot.replace(/\./g, path.sep);
  const newPkgSlash = newPkgDot.replace(/\./g, path.sep);

  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      }
    }

    if (dir.includes(oldPkgSlash)) {
      const parentOfOld = dir.substring(0, dir.indexOf(oldPkgSlash));
      const oldFullDir = path.join(parentOfOld, oldPkgSlash);
      const newFullDir = path.join(parentOfOld, newPkgSlash);

      if (fs.existsSync(oldFullDir) && !fs.existsSync(newFullDir)) {
        fs.mkdirSync(path.dirname(newFullDir), { recursive: true });
        fs.renameSync(oldFullDir, newFullDir);
        try {
          const oldIocoder = path.join(parentOfOld, "cn", "iocoder");
          if (fs.existsSync(oldIocoder) && fs.readdirSync(oldIocoder).length === 0) fs.rmdirSync(oldIocoder);
          const oldCn = path.join(parentOfOld, "cn");
          if (fs.existsSync(oldCn) && fs.readdirSync(oldCn).length === 0) fs.rmdirSync(oldCn);
        } catch {}
      }
    }
  }

  walk(targetDir);
}

function renameFilesWithKeyword(targetDir, projectName, packageName = "") {
  const pkgSegments = new Set(String(packageName).split(".").filter(Boolean));
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        if (
          /yudao/i.test(entry.name) &&
          !entry.name.includes(projectName) &&
          !pkgSegments.has(entry.name)
        ) {
          const newName = entry.name
            .replace(/Yudao/g, projectName.charAt(0).toUpperCase() + projectName.slice(1))
            .replace(/yudao/gi, projectName);
          const newDirPath = path.join(dir, newName);
          if (!fs.existsSync(newDirPath)) {
            try {
              fs.renameSync(fullPath, newDirPath);
            } catch {}
          }
        }
      } else if (entry.isFile()) {
        if (/yudao/i.test(entry.name) && !entry.name.includes(projectName)) {
          const newName = entry.name
            .replace(/Yudao/g, projectName.charAt(0).toUpperCase() + projectName.slice(1))
            .replace(/yudao/gi, projectName);
          const newFilePath = path.join(dir, newName);
          if (!fs.existsSync(newFilePath)) {
            try {
              fs.renameSync(fullPath, newFilePath);
            } catch {}
          }
        }
      }
    }
  }

  walk(targetDir);
}

function replaceContent(targetDir, config) {
  const { projectName, projectTitle, groupId, packageName } = config;
  const projectCap = projectName.charAt(0).toUpperCase() + projectName.slice(1);
  const projectUpper = projectName.toUpperCase();

  const replacements = [
    // 1. 中文品牌词长词优先置换
    [/芋道四位一体企业级管理中台/g, `${projectTitle} · 企业级管理中台`],
    [/芋道四位一体管理系统/g, `${projectTitle} · 业务管理系统`],
    [/芋道四位一体业务工作台/g, `${projectTitle} · 业务工作台`],
    [/芋道四位一体云商中台/g, `${projectTitle} · 业务中台`],
    [/芋道四位一体/g, `${projectTitle} · 多端中台`],
    [/芋道管理中台/g, `${projectTitle} · 管理中台`],
    [/芋道管理后台/g, `${projectTitle} · 管理后台`],
    [/芋道管理系统/g, `${projectTitle}`],
    [/芋道源码/g, `${projectTitle}企业架构`],
    [/芋道/g, projectTitle],

    // 2. 包名与组织 ID 置换 (对标 ProjectReactor.java)
    [/cn\.iocoder\.cloud/g, groupId],
    [/cn\.iocoder\.boot/g, groupId],
    [/cn\.iocoder\.yudao/g, packageName],
    [/cn\/iocoder\/yudao/g, packageName.replace(/\./g, "/")],

    // 3. 架构组件与单体模块置换（直接映射为专属 projectName，严禁残留 enterprise-quad-terminal）
    [/yudao-quad-terminal/g, projectName],
    [/enterprise-quad-terminal/g, projectName],
    [/yudao-ui-admin-vue3/g, `@${projectName}/admin`],
    [/yudao-cloud-backend/g, `@${projectName}/backend`],
    [/yudao-mall-uniapp/g, `@${projectName}/miniapp`],
    [/yudao-quad-app/g, `@${projectName}/app`],
    [/yudao-server/g, `${projectName}-server`],
    [/yudao-monorepo/g, `@${projectName}`],
    [/yudao-native-app/g, `@${projectName}/app`],
    [/yudao-mysql-dev/g, `${projectName}-mysql-dev`],
    [/yudao-redis-dev/g, `${projectName}-redis-dev`],
    [/yudao-module-/g, `${projectName}-module-`],
    [/yudao-framework/g, `${projectName}-framework`],
    [/yudao-dependencies/g, `${projectName}-dependencies`],
    [/yudao-gateway/g, `${projectName}-gateway`],

    // 4. 上游作者署名、推广链接与开源托管标识脱敏
    [/上海艰苦奋斗/g, "企业级工程研发"],
    [/艿艿/g, "平台工程团队"],
    [/zhijiantianya/gi, projectName],
    [/YunaiV\/[a-zA-Z0-9_-]+(?:@[a-zA-Z0-9._/-]+)?/g, `${projectName}/backend`],
    [/YunaiV/g, projectName],
    [/yudaocode\/[a-zA-Z0-9_-]+/g, `${projectName}/frontend`],
    [/yunai@iocoder\.cn/gi, `ops@${projectName}.local`],
    [/yuanma@iocoder\.cn/gi, `dev@${projectName}.local`],
    [/https?:\/\/[a-z0-9.-]*iocoder\.cn[^\s"')>`]*/gi, `http://127.0.0.1:${config.gatewayPort || 48120}${config.basePath || `/${projectName}`}`],
    [/iocoder\.cn/gi, `${projectName}.local`],

    // 5. 短词全量置换与大小写自适应 (对标 ProjectReactor.java: artifactIdNew)
    [/yudaocode/g, projectName],
    [/yudao/gi, (match) => {
      if (match === "Yudao") return projectCap;
      if (match === "YUDAO") return projectUpper;
      return projectName;
    }],
  ];

  const combinedRe = new RegExp(
    replacements.map(([re]) => `(?:${re.source})`).join("|"),
    "gi"
  );

  function replaceSinglePass(text) {
    let modified = false;
    const out = text.replace(combinedRe, (match) => {
      for (const [re, rep] of replacements) {
        const single = new RegExp(`^(?:${re.source})$`, re.flags.includes("i") ? "i" : "");
        if (single.test(match)) {
          modified = true;
          return typeof rep === "function" ? rep(match) : rep;
        }
      }
      return match;
    });
    return { out, modified };
  }

  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (WHITE_FILE_EXTENSIONS.has(ext)) continue;

        try {
          const content = fs.readFileSync(fullPath, "utf8");
          const { out, modified } = replaceSinglePass(content);
          if (modified && out !== content) {
            fs.writeFileSync(fullPath, out, "utf8");
          }
        } catch {}
      }
    }
  }

  walk(targetDir);
}

function updateConfigFiles(targetDir, config) {
  // 1. package.json 根目录
  const rootPkgPath = path.join(targetDir, "package.json");
  if (fs.existsSync(rootPkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));
      pkg.name = config.projectName;
      fs.writeFileSync(rootPkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
    } catch {}
  }

  // 2. apps/admin/index.html 标题
  const adminHtml = path.join(targetDir, "apps", "admin", "index.html");
  if (fs.existsSync(adminHtml)) {
    try {
      let html = fs.readFileSync(adminHtml, "utf8");
      html = html.replace(/<title>.*?<\/title>/, `<title>${config.projectTitle}</title>`);
      html = html.replace(/content="芋道管理系统.*?"/g, `content="${config.projectTitle} 企业级业务管理中台"`);
      fs.writeFileSync(adminHtml, html, "utf8");
    } catch {}
  }

  // 3. apps/admin/.env.* 环境变量标题与四端 BASE_PATH
  const adminDir = path.join(targetDir, "apps", "admin");
  if (fs.existsSync(adminDir)) {
    const envFiles = fs.readdirSync(adminDir).filter((f) => f.startsWith(".env"));
    for (const f of envFiles) {
      const envPath = path.join(adminDir, f);
      try {
        let envContent = fs.readFileSync(envPath, "utf8");
        envContent = envContent.replace(/VITE_APP_TITLE=.*$/m, `VITE_APP_TITLE=${config.projectTitle}`);
        fs.writeFileSync(envPath, envContent, "utf8");
      } catch {}
    }
  }
}

/**
 * 为派生工程生成零上游残留、100% 专属项目品牌化的标准文档集：
 * - README.md (根文档)
 * - CLAUDE.md (AI 研发助手准则)
 * - HARNESS.md (9 阶段生命周期与契约总览)
 * - apps/backend/README.md (Java Spring Boot 3 后端指南)
 * - apps/admin/README.md (Vue 3 B 端管理中台指南)
 * - apps/miniapp/README.md (Uni-App C 端小程序/H5 指南)
 */
export function generateCleanProjectDocs(targetDir, config) {
  const {
    projectName,
    projectTitle,
    groupId,
    packageName,
    basePath,
    port,
    gatewayPort,
  } = config;

  const rootReadme = `# ${projectTitle} (${projectName})

> 企业级四端同源全栈工程：**Java Spring Boot 3 后端 (\`apps/backend\`) + Vue 3 B端管理中台 (\`apps/admin\`) + Uni-App C端小程序/H5 (\`apps/miniapp\`) + Expo React Native 原生端 (\`apps/app\`)**。

---

## 1. 工程身份与路由拓扑

| 维度 | 配置值 |
| :--- | :--- |
| **工程标识** | \`${projectName}\` |
| **系统名称** | \`${projectTitle}\` |
| **Maven GroupId** | \`${groupId}\` |
| **Java 根包名** | \`${packageName}\` |
| **四端统一前缀** | \`${basePath}/{2c,admin,admin-api,app-api,v3/api-docs}\` |
| **默认服务端口** | 后端 \`:${port}\` / 统一网关 \`:${gatewayPort}\` |

---

## 2. 快速启动与构建命令（仅限 \`pnpm\`）

\`\`\`bash
# 安装工作区依赖
pnpm install

# 零 Docker 嵌入式真 PostgreSQL 18.4 + 真 Redis 一键拉起与验收
pnpm lite:up
pnpm lite:verify
pnpm lite:down

# 多端开发与生产构建
pnpm build:backend
pnpm build:admin
pnpm build:miniapp
pnpm dev:admin
pnpm dev:miniapp
pnpm dev:app

# 统一门禁与契约检查
pnpm gate:fast
pnpm compat:check
pnpm test:scripts
\`\`\`

---

## 3. 核心架构与界面治理红线

1. **导航菜单严格 \`<= 4\` 字规范**：所有可见目录与页面级导航菜单（\`system_menu.type IN (1, 2)\`）的 \`name\` 必须严格满足 \`char_length(name) <= 4\`，完整业务语义写入 \`remark\` 或接口文档说明。
2. **契约先行与零假 Mock**：跨端接口统一由 OpenAPI 契约驱动（\`pnpm gen:api-sdk\`），全部验收跑在真实 PostgreSQL 数据库之上。
3. **双支柱工程治理**：运行生命周期由 \`HARNESS.md\`（\`pnpm harness <stage>\`）统一编排，需求与阶段资产由 \`AGENTS.md\`（\`pnpm speckit\` × CMMI 00~09）闭环管控。
`;

  const claudeMd = `# Claude Code & AI Agent Guidelines for ${projectName}

This repository is \`${projectName}\` (**${projectTitle}**), an enterprise quad-terminal fullstack application (Java Spring Boot 3 \`${packageName}\` + Vue 3 Admin + Uni-App Miniapp + Expo React Native App), standardized on unified gateway \`BASE_PATH\` \`${basePath}\` (backend \`:${port}\`, gateway \`:${gatewayPort}\`) with zero-Docker Embedded PostgreSQL 18.4 and Embedded Redis.

## Single Source of Truth & Hard Engineering Invariants
All architectural standards and quality gates are governed by [\`AGENTS.md\`](AGENTS.md), [\`HARNESS.md\`](HARNESS.md), and [\`compat-manifest.json\`](compat-manifest.json):
- **Pillar 1 — \`harness\` (\`HARNESS.md\` + \`scripts/harness.cjs\`) = Workflow & Runtime Lifecycle**:
  \`pnpm harness <install|check|build|start|health|status|stop|e2e|deliver|pmo>\`
- **Pillar 2 — \`speckit\` (\`pnpm run speckit\`) + CMMI 00~09 (\`scripts/cmmi-00-meta.cjs\` ~ \`scripts/cmmi-09-operations.cjs\`) = Spec & Process Asset Engine**:
  \`pnpm run speckit -- cmmi <00..09> [docs|check|asset|...]\`
- **Strict 4-Character Menu Rule**: Every visible directory/page navigation menu (\`system_menu.type IN (1, 2)\`) MUST satisfy \`char_length(name) <= 4\`. Keep full business descriptions in \`remark\` / OpenAPI annotations.
- **\`pnpm\` Only & Zero Weak Default Credentials**: Never invoke legacy JS package manager commands; bootstrap credentials are generated via CSPRNG into gitignored \`0600\` secret files.

## Standard AI Agent Workflow
1. **PMO Backlog Radar**:
   \`pnpm run pmo\`
2. **Requirement Triage (Mandatory Before Coding)**:
   \`pnpm run agent:route -- "<requirement>"\`
3. **Blueprint / Module Delivery**:
   - \`pnpm blueprint:doctor -- --file <domain>.blueprint.json --write\`
   - \`pnpm blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e\`
4. **Spec-Kit Feature / Bugfix Iteration**:
   - \`pnpm speckit:new -- --name <name> --domain <domain> --title "<title>"\`
   - \`pnpm speckit:build -- --name <name>\`
   - \`pnpm speckit:tasks -- --spec <name>\`
   - \`pnpm gate:fast\` & \`pnpm compat:check\`
   - \`pnpm speckit:archive -- --name <name>\`
`;

  const harnessMd = `# HARNESS — ${projectName}（${projectTitle}）交付物与生命周期总览

> **定位**：\`${projectName}\`（${projectTitle}）四端同源工程的运行生命周期、入口契约与验证矩阵总览。
> **与 \`AGENTS.md\` 关系**：\`AGENTS.md\` 定义工程宪法与研发铁律，本文件定义标准运行环节与自动化验收手段。

---

## 1. 工程身份

| 项 | 值 |
|---|---|
| 工程标识 | \`${projectName}\`（${projectTitle}） |
| 技术拓扑 | Java Spring Boot 3 (\`${packageName}\`) + Vue 3 Admin + Uni-App + Expo |
| 统一路径 | \`${basePath}/{2c,admin,admin-api,app-api,v3/api-docs}\` |
| 默认端口 | 后端 \`:${port}\` / 网关 \`:${gatewayPort}\` |
| 零外部依赖档 | 嵌入式真 PostgreSQL 18.4 + 嵌入式真 Redis（\`pnpm lite:up\`） |

---

## 2. 核心入口矩阵

| 入口文件 / 脚本 | 标准命令 | 职责说明 |
|---|---|---|
| [\`AGENTS.md\`](AGENTS.md) | — | 工程宪法、4字菜单硬约束与 CMMI 规范真源 |
| [\`compat-manifest.json\`](compat-manifest.json) | \`pnpm compat:check\` | 机器可读兼容契约与端口/路径声明 |
| [\`scripts/harness.cjs\`](scripts/harness.cjs) | \`pnpm harness <stage>\` | 9 阶段标准生命周期编排引擎 |
| [\`scripts/blueprint-engine.cjs\`](scripts/blueprint-engine.cjs) | \`pnpm blueprint:deliver\` | 声明式蓝图自愈、4字菜单收敛与真库 E2E 交付 |
| [\`scripts/codegen-module.cjs\`](scripts/codegen-module.cjs) | \`pnpm gen:module\` | 双端 Controller/Service/Mapper/Vue/SQL 生成器 |
| [\`scripts/gate-check.cjs\`](scripts/gate-check.cjs) | \`pnpm gate:fast\` | 统一静态质量与架构边界门禁 |

---

## 3. 标准 Harness 9 大生命周期环节

\`\`\`bash
pnpm harness install     # [环节 1] 依赖安装与数据库种子准备
pnpm harness check       # [环节 2] 静态、类型与4字菜单门禁检查
pnpm harness build       # [环节 3] 后端可执行 Jar 与前端静态产物构建
pnpm harness start       # [环节 4] 服务与统一网关后台拉起
pnpm harness health      # [环节 5] 实时健康探活拨测
pnpm harness status      # [环节 6] 进程与监听端口状态巡检
pnpm harness stop        # [环节 7] 进程与端口干净回收
pnpm harness e2e         # [环节 8] 真实数据库与端到端交互验证
pnpm harness deliver     # [环节 9] 全量门禁出厂终验
\`\`\`

---

## 4. 工程协作与扩展方式

| 场景 | 标准入口 | 说明 |
|---|---|---|
| **沙箱派生与实验** | \`pnpm project:hatch\` / \`pnpm project:init\` | 零污染孵化独立沙箱与同源路径配置 |
| **蓝图增量交付** | \`pnpm blueprint:doctor\` → \`pnpm blueprint:deliver\` | 自动收敛 \`<= 4\` 字菜单名并执行 6 阶段真 PG 验收 |
| **多端联调运行** | \`pnpm lite:up\` / \`pnpm service:start\` | 本地零 Docker 闭环启动与探活 |

---

## 5. 验证矩阵

| 层级 | 命令 | 验证目标 |
|---|---|---|
| L0 契约 | \`pnpm compat:check\` | 入口、端口、路径声明与实现逐条对齐 |
| L1 静态门禁 | \`pnpm gate:fast\` | 包管理器、规格健康度、4字菜单规范、脚本目标完整性 |
| L2 脚本单测 | \`pnpm test:scripts\` | 核心工程脚本与运行时模块单元测试 |
| L3 真库验收 | \`pnpm lite:verify\` | 嵌入式真 PG + 真 Redis + 高熵引导凭据连续登录验收 |
| L4 全量门禁 | \`pnpm gate:full\` | 后端单测 + 前端构建 + 真库端到端全链路门禁 |
| L5 反向控制 | \`pnpm harness:controls\` | 注入受控违规验证每道 blocking 门禁真实拦截 |
| L6 派生自证 | \`pnpm harness:hatch\` | 沙箱派生全链路纯净度与自跑门禁验证 |

---

## 6. 核心不变式

1. **pnpm 唯一**：严禁任何非 pnpm 的 JS 包管理命令。
2. **导航菜单 \`<= 4\` 字**：目录与页面级可见菜单标题严格 \`<= 4\` 字符，完整说明落 \`remark\`。
3. **零弱默认凭据**：管理员与缓存口令均由 CSPRNG 动态签发，落盘 \`0600\` 凭据文件。
4. **真实数据库验证**：拒绝内存假 Mock，一切业务读写经真实数据库闭环验证。
`;

  const backendReadme = `# ${projectTitle} — 后端服务 (\`apps/backend\`)

## 1. 模块概览

本目录承载 **${projectTitle}** (\`${projectName}\`) 的 Java Spring Boot 3 / JDK 17 后端服务与领域模块：

- **Maven GroupId**: \`${groupId}\`
- **Java 根包名**: \`${packageName}\`
- **主启动模块**: \`apps/backend/server\`（监听端口 \`:${port}\`）
- **接口前缀契约**:
  - B 端管理接口：\`/admin-api/**\`（经统一网关映射为 \`${basePath}/admin-api/**\`）
  - C 端应用接口：\`/app-api/**\`（经统一网关映射为 \`${basePath}/app-api/**\`）
  - OpenAPI 文档：\`/v3/api-docs\`

## 2. 构建与本地运行

后端采用两步 Maven 构建以确保业务模块以标准库 Jar 形态装配进主服务可执行包：

\`\`\`bash
# 在仓库根目录执行标准两步构建
pnpm build:backend

# 零 Docker 模式启动（自动拉起嵌入式 PostgreSQL 18.4 + Redis 并注入高熵凭据）
pnpm lite:up

# 运行后端单元测试
cd apps/backend && mvn -B test -pl server -am
\`\`\`

## 3. 研发与数据库契约规范

1. **实体与多租户底座**：业务 DO 统一继承 \`BaseDO\`，具备 \`creator\`、\`create_time\`、\`updater\`、\`update_time\`、\`deleted\`、\`tenant_id\` 审计与隔离字段。
2. **菜单命名硬约束**：凡新增或变更 \`system_menu\` 目录/页面节点（\`type IN (1, 2)\`），\`name\` 字段必须严格 \`<= 4\` 个字符，完整业务说明写入注释或 \`remark\`。
3. **代码生成优先**：新增业务表与双端接口优先通过根目录 \`pnpm gen:module\` 或 \`pnpm blueprint:deliver\` 生成。
`;

  const adminReadme = `# ${projectTitle} — B端运营管理中台 (\`apps/admin\`)

## 1. 终端定位

本目录承载 **${projectTitle}** (\`@${projectName}/admin\`) 的 PC Web 运营管理前端，基于 **Vue 3 + Vite + Element Plus + Pinia + TypeScript** 构建。

- **访问路径**: \`${basePath}/admin\`
- **后端接口前缀**: \`${basePath}/admin-api\`

## 2. 开发与构建（仅限 \`pnpm\`）

请在仓库根目录执行统一工作区指令：

\`\`\`bash
# 启动管理端开发服务器
pnpm dev:admin

# 生产环境打包构建（产物输出至 apps/admin/dist）
pnpm build:admin
\`\`\`

## 3. 前端交互与菜单规范

1. **导航菜单 \`<= 4\` 字铁律**：侧边栏与顶部一级/二级导航菜单标题严禁超过 4 个字符（例如使用 \`缓存监控\`、\`接口日志\`、\`库源配置\`），详细业务释义通过页面内副标题、Tooltip 或表单说明承载。
2. **零假数据铁律**：所有列表、详情、状态流转均直连真实后端 \`/admin-api/**\` 接口，严禁在前端硬编码业务 Mock 数据。
3. **按钮细粒度鉴权**：写操作按钮统一绑定 \`v-hasPermi\` 权限标识（格式 \`<domain>:<entity>:<action>\`）。
`;

  const miniappReadme = `# ${projectTitle} — C端移动小程序与 H5 (\`apps/miniapp\`)

## 1. 终端定位

本目录承载 **${projectTitle}** (\`@${projectName}/miniapp\`) 的 C 端用户触点工程，基于 **Uni-App + Vue 3** 构建，支持编译发布为微信小程序与移动端 H5。

- **H5 访问路径**: \`${basePath}/2c\`
- **后端接口前缀**: \`${basePath}/app-api\`

## 2. 开发与构建（仅限 \`pnpm\`）

请在仓库根目录执行统一工作区指令：

\`\`\`bash
# 启动 H5 端开发调试
pnpm dev:miniapp

# 构建 H5 生产静态产物（输出至 apps/miniapp/dist/build/h5）
pnpm build:miniapp

# 本地预览已构建的 H5 产物（自动对齐 BasePath）
pnpm preview:miniapp
\`\`\`

## 3. 工程规范

1. **同源网关通信**：所有业务请求统一走 \`${basePath}/app-api/**\`，严禁硬编码外部测试域名或第三方静态资源私链。
2. **分包与包体积守卫**：新增业务页面按领域归入对应子包目录，保障微信小程序主包体积受控与底部安全区适配。
`;

  fs.writeFileSync(path.join(targetDir, "README.md"), rootReadme, "utf8");
  fs.writeFileSync(path.join(targetDir, "CLAUDE.md"), claudeMd, "utf8");
  fs.writeFileSync(path.join(targetDir, "HARNESS.md"), harnessMd, "utf8");

  if (fs.existsSync(path.join(targetDir, "apps", "backend"))) {
    fs.writeFileSync(path.join(targetDir, "apps", "backend", "README.md"), backendReadme, "utf8");
  }
  if (fs.existsSync(path.join(targetDir, "apps", "admin"))) {
    fs.writeFileSync(path.join(targetDir, "apps", "admin", "README.md"), adminReadme, "utf8");
  }
  if (fs.existsSync(path.join(targetDir, "apps", "miniapp"))) {
    fs.writeFileSync(path.join(targetDir, "apps", "miniapp", "README.md"), miniappReadme, "utf8");
  }
}

function renderBlueprintAndGateway(targetDir, config) {
  const enginePath = path.join(targetDir, "scripts", "blueprint-engine.cjs");
  const manifestPath = path.join(targetDir, "blueprint.template.json");
  if (fs.existsSync(enginePath) && fs.existsSync(manifestPath)) {
    const shortTitle = config.projectTitle.slice(0, 16).trim() || config.projectTitle;
    const safeIdent = config.projectName.replace(/[^a-zA-Z0-9_]/g, "_");
    const vars = {
      PROJECT_NAME: config.projectName,
      BASE_PATH: config.basePath,
      PLATFORM_TITLE: config.projectTitle,
      SHORT_NAME: shortTitle,
      PACKAGE_PREFIX: config.packageName,
      DB_NAME: `${safeIdent}_prod`,
      BACKEND_PORT: String(config.port),
      GATEWAY_PORT: String(config.gatewayPort),
      EXPO_APP_NAME: shortTitle,
      EXPO_APP_SLUG: `${config.projectName}-app`,
      IOS_BUNDLE_ID: `${config.groupId}.app`,
      ANDROID_PACKAGE: `${config.groupId}.app`,
      CADDY_DOMAIN: `${config.projectName}.local`,
      MCP_SERVER_NAME: `${config.projectName}-mcp`,
    };
    const setArgs = Object.entries(vars).flatMap(([k, v]) => ["--set", `${k}=${v}`]);
    spawnSync(process.execPath, [enginePath, "render", "--force", ...setArgs], {
      cwd: targetDir,
      stdio: config.quiet ? "ignore" : "inherit",
    });
  }

  const gwScript = path.join(targetDir, "scripts", "generate-gateway-config.mjs");
  if (fs.existsSync(gwScript)) {
    // 清理母本旧网关配置，确保只保留当前项目的网关配置
    const caddyDir = path.join(targetDir, "deploy", "gateway", "caddy");
    const nginxDir = path.join(targetDir, "deploy", "gateway", "nginx");
    if (fs.existsSync(caddyDir)) fs.rmSync(caddyDir, { recursive: true, force: true });
    if (fs.existsSync(nginxDir)) fs.rmSync(nginxDir, { recursive: true, force: true });
    spawnSync(process.execPath, [gwScript], {
      cwd: targetDir,
      stdio: config.quiet ? "ignore" : "inherit",
    });
  }
}

export async function runProjectReactor(rawOptions) {
  const options = { ...rawOptions };
  let targetDir = ROOT;
  if (options.target) {
    targetDir = path.resolve(process.cwd(), options.target);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    if (!fs.existsSync(path.join(targetDir, "package.json"))) {
      if (!options.quiet) {
        console.log(`🚀 [ProjectReactor] 正在拷贝骨架至目标目录: ${targetDir} ...`);
      }
      copyDirRecursive(ROOT, targetDir);
    }
  } else if (!options.inPlace) {
    console.error("❌ 错误: 必须指定 --in-place (原地重构) 或 --target <目录> (派生重构)！");
    process.exit(2);
  }

  const projectName = (options.name || options.projectName || path.basename(targetDir))
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");
  const projectTitle = options.title || options.projectTitle || projectName;
  // Java 包名不能含连字符，故默认值先做标识符化处理（`my-store` → `com.my_store.server`）
  const packageName =
    options.packageName ||
    options.packagePrefix ||
    `com.${projectName.replace(/[^a-zA-Z0-9_]/g, "_")}.server`;
  // groupId 必须与 Java 包同源：直接从项目名硬拼会得到 `com.demo-mall` 这种
  // 既非法又与包名不一致的值（派生金路径验证 harness/hatch-smoke.mjs 会断言这一点）
  const groupId = options.groupId || packageName.replace(/\.server$/, "");
  const artifactId = options.artifactId || projectName;
  const basePath = (options.basePath || `/${projectName}`).replace(/\/+$/, "");

  const config = {
    projectName,
    projectTitle,
    groupId,
    packageName,
    artifactId,
    basePath,
    port: options.port || 48080,
    gatewayPort: options.gatewayPort || 48120,
    quiet: Boolean(options.quiet),
  };

  if (!config.quiet) {
    console.log("================================================================");
    console.log("⚡ [ProjectReactor] 启动全自动化项目重塑与品牌中立化清洗...");
    console.log(`   目标目录:   ${targetDir}`);
    console.log(`   工程名称:   ${projectName}`);
    console.log(`   系统标题:   ${projectTitle}`);
    console.log(`   Maven 组织: ${groupId}`);
    console.log(`   Java 包名:  ${packageName}`);
    console.log(`   统一路径:   ${basePath}/{2c,admin,admin-api,app-api,v3/api-docs}`);
    console.log("================================================================");
  }

  if (options.dryRun) {
    return { targetDir, ...config, dryRun: true };
  }

  // 0. 先基于 blueprint.template.json 渲染四端配置模板 (此时 yudao-server 目录尚未改名)
  renderBlueprintAndGateway(targetDir, config);

  // 1. 深度修剪旧竞品/历史架构归档、上游教程 Markdown、宣传二维码图片与空壳 *-ui 目录
  if (!config.quiet) console.log("🧹 [1/6] 清理历史框架归档、上游教程与推广产物...");
  pruneHistoricalArchives(targetDir);
  purgeUpstreamPromoAndTutorialBloat(targetDir);

  // 2. 规范化 apps/ 子目录名称
  if (!config.quiet) console.log("📂 [2/6] 规范化子包目录结构 (admin, miniapp, app, server)...");
  normalizeAppDirectories(targetDir);

  // 3. 物理重命名 Java 包路径 (cn/iocoder/yudao -> packageName)
  if (!config.quiet) console.log(`📦 [3/6] 重构 Java 源码包路径 (cn.iocoder.yudao -> ${packageName})...`);
  renameJavaPackagePaths(targetDir, "cn.iocoder.yudao", packageName);

  // 4. 重命名包含 yudao 关键字的文件与目录
  if (!config.quiet) console.log("🏷️  [4/6] 重命名含旧标识的文件与类名...");
  renameFilesWithKeyword(targetDir, projectName, packageName);
  purgeUpstreamPromoAndTutorialBloat(targetDir);

  // 5. 深度替换文本内容与配置文件，并重新生成网关配置
  if (!config.quiet) console.log("📝 [5/6] 批量替换开源品牌词与配置契约...");
  replaceContent(targetDir, config);
  updateConfigFiles(targetDir, config);
  renderBlueprintAndGateway(targetDir, config);

  // 6. 生成零上游残留的专属多端 README.md / CLAUDE.md / HARNESS.md
  if (!config.quiet) console.log("📘 [6/6] 生成项目专属无残留标准文档集 (README / CLAUDE / HARNESS)...");
  generateCleanProjectDocs(targetDir, config);

  // 6. 沙箱软链 lite 运行时依赖（零安装启动 embedded-postgres 与 pg 驱动，且不触发根 node_modules 泄漏门禁）
  if (targetDir !== ROOT) {
    const srcLiteMods = path.join(ROOT, "deploy", "lite", "runtime", "node_modules");
    const dstLiteMods = path.join(targetDir, "deploy", "lite", "runtime", "node_modules");
    try {
      if (fs.existsSync(srcLiteMods) && !fs.existsSync(dstLiteMods)) {
        fs.mkdirSync(path.dirname(dstLiteMods), { recursive: true });
        fs.symlinkSync(srcLiteMods, dstLiteMods, "dir");
      }
    } catch {}
  }

  if (!config.quiet) {
    console.log("================================================================");
    console.log("🎉 [SUCCESS] ProjectReactor 重塑完成！");
    console.log(`   已彻底移除 芋道 / yudao 关键字，项目已蜕变为专属商业级工程: [${projectTitle}]`);
    console.log("================================================================");
  }
  return { targetDir, ...config };
}

async function main() {
  const options = parseArgs();
  if (options.help) {
    console.log(`
Yudao-Quad-Terminal 企业级项目反应堆重塑引擎 (ProjectReactor)

用法:
  node scripts/project-reactor.mjs [选项]

选项:
  --in-place                   原地重构当前仓库
  --target <path>              派生克隆至目标目录并重构 (支持位置参数 <targetDir>)
  --name / --project <name>    项目英文标识 (例如: star-mall)
  --title <title>              项目中文系统全称 (例如: 星云数字化商城中台)
  --group-id <groupId>         Maven 组织 ID (默认: 从 --package 派生)
  --package <package>          Java 根包名 (默认: com.<name>.server)
  --base-path <prefix>         四端同源 BASE_PATH (默认: /<name>)
  --artifact-id <id>           Maven 根 ArtifactId (默认: <name>)
  -h, --help                   显示帮助信息
`);
    return;
  }

  await runProjectReactor(options);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("❌ [ProjectReactor ERROR]", err);
    process.exit(1);
  });
}
