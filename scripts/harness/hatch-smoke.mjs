#!/usr/bin/env node
/**
 * scripts/harness/hatch-smoke.mjs —— 派生金路径验证（`pnpm harness:hatch`）
 *
 * 底座的终极价值是「能被别的项目拿去派生」。`pnpm project:hatch` 是那条金路径，但它此前从未被验证过：
 * 派生结果是不是真的能自洽？会不会把本地状态（凭据、.git、子模块指针）带进客户工程？改名与 Java 包迁移是否彻底？
 *
 * 本脚本在临时目录真跑一次派生，然后逐项断言：
 *   ① 派生成功            ② 顶层契约文件齐备（含 compat-manifest / HARNESS / deploy/lite）
 *   ③ 本地状态零泄漏      ④ 身份替换（package name / 页面标题 / env 标题）
 *   ⑤ Java 包与 groupId 迁移彻底（新包在、旧包消失、groupId 与新包同源）
 *   ⑥ 文件名旧品牌清零    ⑦ workspace 依赖无悬空（改名最容易断的地方）
 *   ⑧ 派生项目能自跑门禁（ci-files / script-targets / doc-commands）
 *
 * 用法: node scripts/harness/hatch-smoke.mjs [--name demo-mall] [--title "..."] [--package com.demo.server]
 *                                          [--keep] [--json]
 * 退出码: 0 全部通过 / 1 存在不达标项 / 2 用法错误
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};

if (args.includes("--help")) {
  console.log(`用法: node scripts/harness/hatch-smoke.mjs [选项]

  --name <name>        派生工程英文名（默认 demo-mall）
  --title "<标题>"     中文系统全称（默认 星云商城中台）
  --package <pkg>      Java 根包名（默认 com.demo.server）
  --keep               保留派生目录（默认跑完即删）
  --json               机器可读输出`);
  process.exit(0);
}

const NAME = arg("--name", "demo-mall");
const TITLE = arg("--title", "星云商城中台");
const PKG = arg("--package", "com.demo.server");
const KEEP = args.includes("--keep");
const JSON_OUT = args.includes("--json");

const checks = [];
const record = (name, passed, detail) => checks.push({ name, passed, detail });

const TMP_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "cq-hatch-smoke-"));
const TARGET = path.join(TMP_ROOT, NAME);

function cleanup() {
  if (KEEP) {
    console.log(`📦 保留派生目录: ${TARGET}`);
    return;
  }
  fs.rmSync(TMP_ROOT, { recursive: true, force: true });
}

try {
  /* ------------------------------- ① 派生 ------------------------------- */
  const started = Date.now();
  const hatch = spawnSync("bash", [path.join(ROOT, "scripts/hatch.sh"), TARGET, "--title", TITLE, "--package", PKG, "--no-git"], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 600000,
  });
  const seconds = Math.round((Date.now() - started) / 1000);
  record("派生执行成功", hatch.status === 0, `exit=${hatch.status} 耗时=${seconds}s`);
  if (hatch.status !== 0) {
    console.error(hatch.stdout?.slice(-2000));
    console.error(hatch.stderr?.slice(-2000));
    throw new Error("派生失败，后续断言无意义");
  }

  /* --------------------------- ② 顶层契约文件齐备 --------------------------- */
  const REQUIRED = [
    "package.json",
    "pnpm-workspace.yaml",
    "compat-manifest.json",
    "HARNESS.md",
    "AGENTS.md",
    "llms.txt",
    "scripts/gate-check.mjs",
    "scripts/compat-check.mjs",
    "scripts/harness/negative-controls.mjs",
    "scripts/hatch.sh",
    "deploy/lite/application-lite.yaml",
    "deploy/patches/README.md",
  ];
  const missing = REQUIRED.filter((r) => !fs.existsSync(path.join(TARGET, r)));
  record("派生结果包含全部契约文件", missing.length === 0, missing.length ? `缺失: ${missing.join(", ")}` : `${REQUIRED.length} 项齐备`);

  /* ---------------------------- ③ 本地状态零泄漏 ---------------------------- */
  const LEAKS = [".commandcode", ".git", ".gitmodules", ".claude", "node_modules"];
  const leaked = LEAKS.filter((l) => fs.existsSync(path.join(TARGET, l)));
  record("本地状态零泄漏（凭据/仓库/子模块指针）", leaked.length === 0, leaked.length ? `泄漏: ${leaked.join(", ")}` : LEAKS.join(" / ") + " 均不存在");

  // 凭据文件是绝对不能带走的
  const credLeak = fs.existsSync(path.join(TARGET, ".commandcode/lite/credentials.env"));
  record("生成凭据未随派生泄漏", !credLeak, credLeak ? "❌ 凭据文件被复制" : "credentials.env 不存在");

  /* ------------------------------ ④ 身份替换 ------------------------------ */
  const rootPkg = JSON.parse(fs.readFileSync(path.join(TARGET, "package.json"), "utf8"));
  record("根 package.json 名称已替换", rootPkg.name === NAME, `name=${rootPkg.name}`);

  const indexPath = path.join(TARGET, "apps/admin/index.html");
  const indexHtml = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, "utf8") : "";
  record("管理端页面标题已替换", indexHtml.includes(TITLE), `<title> 含「${TITLE}」`);

  const envFiles = fs.existsSync(path.join(TARGET, "apps/admin"))
    ? fs.readdirSync(path.join(TARGET, "apps/admin")).filter((f) => f.startsWith(".env"))
    : [];
  const envHit = envFiles.some((f) => fs.readFileSync(path.join(TARGET, "apps/admin", f), "utf8").includes(TITLE));
  record("管理端 env 标题已替换", envHit, envFiles.length ? `检查 ${envFiles.length} 个 .env*` : "无 .env* 文件（跳过语义：不适用）");

  /* ------------------------- ⑤ Java 包与 groupId ------------------------- */
  const backendDir = fs.existsSync(path.join(TARGET, "apps/backend/server"))
    ? path.join(TARGET, "apps/backend/server")
    : path.join(TARGET, "apps/backend/yudao-server");
  const newPkgPath = path.join(backendDir, "src/main/java", ...PKG.split("."));
  record("Java 新包路径已生成", fs.existsSync(newPkgPath), path.relative(TARGET, newPkgPath));

  const oldPkgPath = path.join(backendDir, "src/main/java/cn/iocoder/yudao");
  record("Java 旧包路径已消失", !fs.existsSync(oldPkgPath), "cn/iocoder/yudao 不存在");

  const pom = fs.existsSync(path.join(backendDir, "pom.xml")) ? fs.readFileSync(path.join(backendDir, "pom.xml"), "utf8") : "";
  const groupIdMatch = /<groupId>([^<]+)<\/groupId>/.exec(pom);
  const groupId = groupIdMatch ? groupIdMatch[1].trim() : null;
  // groupId 必须与 --package 同源：`com.demo-mall`（从带连字符的项目名硬拼）既不是合法 Java 包名段，也和包名对不上
  const expectedGroupPrefix = PKG.split(".").slice(0, -1).join(".");
  record(
    "Maven groupId 与 Java 包同源",
    Boolean(groupId) && (groupId === expectedGroupPrefix || groupId.startsWith(`${expectedGroupPrefix}.`)),
    `groupId=${groupId ?? "(未解析)"}，期望以 ${expectedGroupPrefix} 开头`
  );

  /* --------------------------- ⑥ 文件名旧品牌清零 --------------------------- */
  const walk = (dir, acc = []) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, acc);
      else acc.push(p);
    }
    return acc;
  };
  const yudaoFiles = walk(TARGET).filter((p) => /yudao/i.test(path.basename(p)));
  record("文件名旧品牌已清零", yudaoFiles.length === 0, yudaoFiles.length ? `残留 ${yudaoFiles.length} 个: ${yudaoFiles.slice(0, 3).map((p) => path.relative(TARGET, p)).join(", ")}` : "0 个含 yudao 的文件名");

  /* --------------------------- ⑦ workspace 无悬空 --------------------------- */
  const WS_DIRS = ["apps/admin", "apps/miniapp", "apps/app", "packages/api-client", "packages/shared-types"];
  const packages = new Map();
  for (const d of WS_DIRS) {
    const p = path.join(TARGET, d, "package.json");
    if (!fs.existsSync(p)) continue;
    const pkg = JSON.parse(fs.readFileSync(p, "utf8"));
    packages.set(pkg.name, { dir: d, pkg });
  }
  const dangling = [];
  for (const [name, { dir, pkg }] of packages) {
    for (const [dep, ver] of Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })) {
      if (String(ver).startsWith("workspace:") && !packages.has(dep)) dangling.push(`${dir}: ${dep}@${ver}`);
    }
  }
  for (const [dep, ver] of Object.entries({ ...rootPkg.dependencies, ...rootPkg.devDependencies })) {
    if (String(ver).startsWith("workspace:") && !packages.has(dep)) dangling.push(`root: ${dep}@${ver}`);
  }
  record("workspace 依赖无悬空", dangling.length === 0, dangling.length ? dangling.join("; ") : `校验 ${packages.size} 个工作区包`);

  /* ------------------------- ⑧ 派生项目能自跑门禁 ------------------------- */
  const selfGate = spawnSync(
    process.execPath,
    ["scripts/gate-check.mjs", "--only", "ci-files,script-targets,doc-commands"],
    { cwd: TARGET, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 300000 }
  );
  record(
    "派生项目可自跑门禁（无依赖子集）",
    selfGate.status === 0,
    `gate --only ci-files,script-targets,doc-commands → exit ${selfGate.status}`
  );

  /* ------------------------------- 汇总 ------------------------------- */
  const files = walk(TARGET).length;
  const sizeMB = Number(
    (spawnSync("du", ["-sk", TARGET], { encoding: "utf8" }).stdout || "0").trim().split(/\s+/)[0] || 0
  ) / 1024;

  const failed = checks.filter((c) => !c.passed);
  const ok = failed.length === 0;

  if (JSON_OUT) {
    console.log(JSON.stringify({ ok, name: NAME, title: TITLE, package: PKG, seconds, files, sizeMB: Number(sizeMB.toFixed(1)), checks }, null, 2));
  } else {
    console.log("================================================================");
    console.log(`🥚 派生金路径验证：${NAME}（${TITLE}）`);
    console.log("================================================================");
    for (const c of checks) console.log(`${c.passed ? "✅" : "❌"} ${c.name.padEnd(28)} ${c.detail}`);
    console.log("----------------------------------------------------------------");
    console.log(`规模: ${files} 文件 / ${sizeMB.toFixed(1)} MB / 耗时 ${seconds}s`);
    console.log(ok ? "✅ 派生金路径全绿：底座可被别的项目直接派生" : `❌ ${failed.length} 项不达标`);
  }

  process.exit(ok ? 0 : 1);
} catch (e) {
  if (JSON_OUT) console.log(JSON.stringify({ ok: false, error: e.message, checks }, null, 2));
  else console.error(`❌ 派生验证中断: ${e.message}`);
  process.exit(1);
} finally {
  cleanup();
}
