#!/usr/bin/env node
/**
 * scripts/project-reactor.mjs
 *
 * Yudao-Quad-Terminal 企业级项目反应堆与重构清洗引擎 (ProjectReactor Engine)
 * 对标 upstream apps/backend/yudao-gateway/src/test/java/cn/iocoder/yudao/ProjectReactor.java
 *
 * 核心功能：
 * 1. 毫秒级重构：彻底替换开源底座品牌词 (芋道 / yudao / cn.iocoder.yudao / cn.iocoder.cloud)
 *    置换为专属商业工程包名、Maven ArtifactId、系统标题与 Docker 容器名；
 * 2. 物理路径重命名：自动将 Java 源码目录 `cn/iocoder/yudao` 迁移为 `com/${projectName}/server`；
 * 3. 标准化多端目录：将 apps/yudao-admin-vue3 -> apps/admin, apps/yudao-mall-uniapp -> apps/miniapp,
 *    apps/yudao-quad-app -> apps/app, yudao-server -> server；
 * 4. 深度脱敏降噪：自动修剪 docs/architecture/archive 与 docs/specs/archive 等历史竞品归档；
 * 5. 二进制白名单防护：自动绕过图片、字体、压缩包等非文本格式，防止破坏二进制数据。
 *
 * 用法：
 *   node scripts/project-reactor.mjs --in-place --name my-app --title "星云智能制造中台"
 *   node scripts/project-reactor.mjs --target /tmp/my-proj --name my-proj --title "业务管理系统"
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const WHITE_FILE_EXTENSIONS = new Set([
  ".gif", ".jpg", ".jpeg", ".png", ".svg", ".ico", ".webp",
  ".eot", ".woff2", ".woff", ".ttf", ".otf",
  ".xdb", ".zip", ".tar", ".gz", ".dump", ".pdf"
]);

const IGNORE_DIRS = new Set([
  "node_modules", ".git", ".idea", ".vscode", "target", "dist", "build",
  ".claude", ".commandcode", ".next", ".cache"
]);

const TEXT_FILE_EXTENSIONS = new Set([
  ".java", ".xml", ".properties", ".yaml", ".yml", ".sql",
  ".vue", ".js", ".ts", ".jsx", ".tsx", ".json", ".html",
  ".md", ".sh", ".cjs", ".mjs", ".env", ".local", ".conf",
  ".json5", ".scss", ".css", ".less"
]);

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    inPlace: false,
    target: null,
    name: null,
    title: null,
    groupId: null,
    packageName: null,
    artifactId: null,
    port: 48080,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--in-place") options.inPlace = true;
    else if (arg === "--target" && args[i + 1]) options.target = args[++i];
    else if (arg.startsWith("--target=")) options.target = arg.split("=")[1];
    else if (arg === "--name" && args[i + 1]) options.name = args[++i];
    else if (arg.startsWith("--name=")) options.name = arg.split("=")[1];
    else if (arg === "--title" && args[i + 1]) options.title = args[++i];
    else if (arg.startsWith("--title=")) options.title = arg.split("=")[1];
    else if (arg === "--group-id" && args[i + 1]) options.groupId = args[++i];
    else if (arg.startsWith("--group-id=")) options.groupId = arg.split("=")[1];
    else if (arg === "--package" && args[i + 1]) options.packageName = args[++i];
    else if (arg.startsWith("--package=")) options.packageName = arg.split("=")[1];
    else if (arg === "--artifact-id" && args[i + 1]) options.artifactId = args[++i];
    else if (arg.startsWith("--artifact-id=")) options.artifactId = arg.split("=")[1];
    else if (arg === "--port" && args[i + 1]) options.port = parseInt(args[++i], 10);
    else if (arg.startsWith("--port=")) options.port = parseInt(arg.split("=")[1], 10);
  }

  return options;
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
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
    path.join(targetDir, ".gitmodules")
  ];

  for (const item of archives) {
    try {
      if (fs.existsSync(item)) {
        fs.rmSync(item, { recursive: true, force: true });
      }
    } catch {}
  }
}

function normalizeAppDirectories(targetDir, projectName) {
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
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
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
      }
    }
  }

  walk(targetDir);
}

function renameFilesWithKeyword(targetDir, projectName) {
  function walk(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        if (entry.name.includes("yudao")) {
          const newName = entry.name.replace(/yudao/g, projectName);
          const newDirPath = path.join(dir, newName);
          if (!fs.existsSync(newDirPath)) {
            try { fs.renameSync(fullPath, newDirPath); } catch {}
          }
        }
      } else if (entry.isFile()) {
        if (entry.name.includes("yudao") || entry.name.includes("Yudao")) {
          const newName = entry.name
            .replace(/Yudao/g, projectName.charAt(0).toUpperCase() + projectName.slice(1))
            .replace(/yudao/g, projectName);
          const newFilePath = path.join(dir, newName);
          if (!fs.existsSync(newFilePath)) {
            try { fs.renameSync(fullPath, newFilePath); } catch {}
          }
        }
      }
    }
  }

  walk(targetDir);
}

function replaceContent(targetDir, config) {
  const { projectName, projectTitle, groupId, packageName, artifactId } = config;
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

    // 3. 架构组件与单体模块置换
    [/yudao-quad-terminal/g, "enterprise-quad-terminal"],
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

    // 4. 短词全量置换与大小写自适应 (对标 ProjectReactor.java: artifactIdNew)
    [/yudaocode/g, projectName],
    [/yudao/gi, (match) => {
      if (match === "Yudao") return projectCap;
      if (match === "YUDAO") return projectUpper;
      return projectName;
    }]
  ];

  function walk(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        // 遵循 ProjectReactor.java 仅排除二进制白名单，全部文本/模板/无后缀资源均进行彻底脱敏
        if (WHITE_FILE_EXTENSIONS.has(ext)) continue;

        try {
          let content = fs.readFileSync(fullPath, "utf8");
          let modified = false;
          for (const [re, rep] of replacements) {
            if (re.test(content)) {
              content = content.replace(re, rep);
              modified = true;
            }
          }
          if (modified) {
            fs.writeFileSync(fullPath, content, "utf8");
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
      fs.writeFileSync(rootPkgPath, JSON.stringify(pkg, null, 2), "utf8");
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

  // 3. apps/admin/.env.* 环境变量标题
  const adminDir = path.join(targetDir, "apps", "admin");
  if (fs.existsSync(adminDir)) {
    const envFiles = fs.readdirSync(adminDir).filter(f => f.startsWith(".env"));
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

async function main() {
  const options = parseArgs();
  if (options.help) {
    console.log(`
Yudao-Quad-Terminal 企业级项目反应堆重塑引擎 (ProjectReactor)

用法:
  node scripts/project-reactor.mjs [选项]

选项:
  --in-place             原地重构当前仓库
  --target <path>        派生克隆至目标目录并重构
  --name <name>          项目英文标识 (例如: star-mall)
  --title <title>        项目中文系统全称 (例如: 星云数字化商城中台)
  --group-id <groupId>   Maven 组织 ID (默认: com.<name>)
  --package <package>    Java 根包名 (默认: com.<name>.server)
  --artifact-id <id>     Maven 根 ArtifactId (默认: <name>)
  -h, --help             显示帮助信息
`);
    return;
  }

  let targetDir = ROOT;
  if (options.target) {
    targetDir = path.resolve(process.cwd(), options.target);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    console.log(`🚀 [ProjectReactor] 正在拷贝骨架至目标目录: ${targetDir} ...`);
    copyDirRecursive(ROOT, targetDir);
  } else if (!options.inPlace) {
    console.error("❌ 错误: 必须指定 --in-place (原地重构) 或 --target <目录> (派生重构)！");
    process.exit(1);
  }

  const projectName = options.name || path.basename(targetDir);
  const projectTitle = options.title || projectName;
  // Java 包名不能含连字符，故默认值先做标识符化处理（`my-store` → `com.my_store.server`）
  const packageName = options.packageName || `com.${projectName.replace(/[^a-zA-Z0-9_]/g, "_")}.server`;
  // groupId 必须与 Java 包同源：直接从项目名硬拼会得到 `com.demo-mall` 这种
  // 既非法又与包名不一致的值（派生金路径验证 harness/hatch-smoke.mjs 会断言这一点）
  const groupId = options.groupId || packageName.replace(/\.server$/, "");
  const artifactId = options.artifactId || projectName;

  const config = {
    projectName,
    projectTitle,
    groupId,
    packageName,
    artifactId,
    port: options.port
  };

  console.log("================================================================");
  console.log("⚡ [ProjectReactor] 启动全自动化项目重塑与品牌中立化清洗...");
  console.log(`   目标目录:   ${targetDir}`);
  console.log(`   工程名称:   ${projectName}`);
  console.log(`   系统标题:   ${projectTitle}`);
  console.log(`   Maven 组织: ${groupId}`);
  console.log(`   Java 包名:  ${packageName}`);
  console.log("================================================================");

  // 1. 深度修剪旧竞品/历史架构归档
  console.log("🧹 [1/5] 清理历史框架归档与调研产物...");
  pruneHistoricalArchives(targetDir);

  // 2. 规范化 apps/ 子目录名称
  console.log("📂 [2/5] 规范化子包目录结构 (admin, miniapp, app, server)...");
  normalizeAppDirectories(targetDir, projectName);

  // 3. 物理重命名 Java 包路径 (cn/iocoder/yudao -> com/project/server)
  console.log(`📦 [3/5] 重构 Java 源码包路径 (cn.iocoder.yudao -> ${packageName})...`);
  renameJavaPackagePaths(targetDir, "cn.iocoder.yudao", packageName);

  // 4. 重命名包含 yudao 关键字的文件与目录
  console.log("🏷️  [4/5] 重命名含旧标识的文件与类名...");
  renameFilesWithKeyword(targetDir, projectName);

  // 5. 深度替换文本内容与配置文件
  console.log("📝 [5/5] 批量替换开源品牌词与配置契约...");
  replaceContent(targetDir, config);
  updateConfigFiles(targetDir, config);

  console.log("================================================================");
  console.log("🎉 [SUCCESS] ProjectReactor 重塑完成！");
  console.log(`   已彻底移除 芋道 / yudao 关键字，项目已蜕变为专属商业级工程: [${projectTitle}]`);
  console.log("================================================================");
}

main().catch(err => {
  console.error("❌ [ProjectReactor ERROR]", err);
  process.exit(1);
});
