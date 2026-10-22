#!/usr/bin/env node
/**
 * scripts/compat-check.mjs —— 下游兼容契约的机器校验（`pnpm compat:check`）
 *
 * 为什么需要（学 cooliebase-all 的 compat-manifest 做法）：
 * 下游项目通过 `pnpm project:hatch` 派生、协作者通过 `git clone --recursive` 克隆、外部 Agent 通过
 * `.mcp.json` 接入 —— 它们全都**绑定**了 compat-manifest.json 里声明的入口、端口、路径与约定。
 * 但这些声明很容易在重构中悄悄失真（改端口、改脚本名、子模块指针又钉回本地提交……），
 * 而下游只会在运行时才炸。本脚本逐条把声明与**本仓实际值**对照，失真即红灯。
 *
 * 用法: node scripts/compat-check.mjs [--json]
 * 退出码: 0 全部一致 / 1 存在失真 / 2 用法错误
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXIT_OK = 0;
const EXIT_FINDINGS = 1;

const problems = [];
const notes = [];
const fail = (msg) => problems.push(msg);
const ok = (msg) => notes.push(msg);

function read(rel) {
  const abs = path.join(ROOT, rel);
  return fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function git(args, cwd = ROOT) {
  const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return { ok: r.status === 0, out: (r.stdout || "").trim() };
}

/** 在隔离子进程里读取运行时模块的导出（避免在本进程里产生副作用） */
function probeModule(rel, exportNames) {
  const url = pathToFileURL(path.join(ROOT, rel)).href;
  const code = `import(${JSON.stringify(url)}).then((m)=>{const o={};for(const n of ${JSON.stringify(
    exportNames
  )})o[n]=m[n];console.log(JSON.stringify(o))}).catch((e)=>{console.error(e.message);process.exit(1)})`;
  const r = spawnSync(process.execPath, ["--input-type=module", "-e", code], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) return null;
  try {
    return JSON.parse(r.stdout);
  } catch {
    return null;
  }
}

/* ---------------------------- 1. 消费方与入口 ---------------------------- */

function checkEntrypoints(manifest) {
  const pkg = JSON.parse(read("package.json") || "{}");
  const declared = new Set(Object.keys(pkg.scripts || {}));

  const flat = [];
  for (const [key, value] of Object.entries(manifest.entrypoints || {})) {
    for (const s of Array.isArray(value) ? value : [value]) flat.push({ key, script: s });
  }
  for (const { key, script } of flat) {
    if (!declared.has(script)) fail(`entrypoints.${key}: package.json 里不存在脚本 "${script}"`);
  }
  ok(`入口契约：${flat.length} 个脚本全部存在`);

  // 派生的实现文件必须真实存在（入口脚本只是个壳）
  for (const [rel, why] of [
    ["scripts/hatch.sh", "派生入口"],
    ["scripts/project-reactor.mjs", "派生引擎"],
    ["scripts/run-all.cjs", "多项目启动器"],
    [".mcp.json", "Agent 端点"],
  ]) {
    if (!exists(rel)) fail(`${why} ${rel} 不存在`);
  }
  ok("派生/启动/Agent 端点实现文件齐备");
}

/* ------------------------------- 2. 运行时 ------------------------------- */

function checkRuntime(manifest) {
  const lite = manifest.runtime.lite;

  const pg = probeModule("deploy/lite/runtime/lite-pg.mjs", ["DEFAULTS"]);
  const redis = probeModule("deploy/lite/runtime/lite-redis.mjs", ["DEFAULTS", "BIN_DIR", "DATA_DIR"]);
  const cred = probeModule("deploy/lite/runtime/lite-credentials.mjs", ["CREDENTIALS_FILE", "ADMIN_PASSWORD_LENGTH"]);

  if (!pg || !redis || !cred) {
    fail("运行时模块无法探针读取（lite-pg / lite-redis / lite-credentials）");
    return;
  }

  const cmp = (label, declared, actual) => {
    if (declared !== actual) fail(`runtime.lite.${label}: 声明 ${JSON.stringify(declared)} ≠ 实际 ${JSON.stringify(actual)}`);
  };
  cmp("postgres.port", lite.postgres.port, pg.DEFAULTS.port);
  cmp("postgres.user", lite.postgres.user, pg.DEFAULTS.user);
  cmp("postgres.database", lite.postgres.database, pg.DEFAULTS.database);
  cmp("postgres.dataDir", lite.postgres.dataDir, pg.DEFAULTS.dataDir);
  cmp("redis.port", lite.redis.port, redis.DEFAULTS.port);
  cmp("redis.bind", lite.redis.bind, redis.DEFAULTS.bind);
  cmp("redis.binDir", lite.redis.binDir, redis.BIN_DIR);
  cmp("redis.dataDir", lite.redis.dataDir, redis.DATA_DIR);
  cmp("credentialsFile", lite.credentialsFile, cred.CREDENTIALS_FILE);

  // 应用端口与覆盖层参数写在 lite-up 里，用源码**精确解析**（不能用 includes 数字，
  // 否则任何文件里出现 "1" 都会通过 —— 这种空洞断言正是反向控制要抓的东西）
  const liteUp = read("scripts/lite-up.mjs") || "";
  const portLine = liteUp.split("\n").find((l) => l.trim().startsWith("serverPort:"));
  const portMatch = portLine ? /\|\|\s*(\d+)\s*\)/.exec(portLine) : null;
  const actualPort = portMatch ? Number(portMatch[1]) : null;
  if (actualPort === null) fail("runtime.lite.server.port: 无法从 lite-up.mjs 的 serverPort 行解析出默认端口");
  else cmp("server.port", lite.server.port, actualPort);

  if (!liteUp.includes("--spring.config.additional-location=file:./deploy/lite/")) {
    fail(`runtime.lite.configOverlayArg: lite-up.mjs 未使用 ${lite.configOverlayArg}`);
  }
  for (const v of [...lite.passwordEnvVars, ...lite.portEnvVars]) {
    if (!liteUp.includes(v)) fail(`runtime.lite 环境变量 ${v} 未被 lite-up.mjs 使用`);
  }
  if (!exists(lite.configOverlay)) fail(`runtime.lite.configOverlay ${lite.configOverlay} 不存在`);

  ok(`运行时契约：PG ${pg.DEFAULTS.port} / Redis ${redis.DEFAULTS.port} / 应用 ${lite.server.port} 与声明一致`);

  // API 前缀
  const runAll = read("scripts/run-all.cjs") || "";
  for (const [k, v] of Object.entries(manifest.runtime.apiPrefixes)) {
    if (k === "multiProjectPattern" || k === "loginPath" || k === "encryptHeader") continue;
    if (!runAll.includes(v)) fail(`runtime.apiPrefixes.${k}: run-all.cjs 里找不到 ${v}`);
  }
  if (!liteUp.includes(manifest.runtime.apiPrefixes.loginPath)) {
    fail(`runtime.apiPrefixes.loginPath: lite-up.mjs 探活路径 ≠ ${manifest.runtime.apiPrefixes.loginPath}`);
  }
  ok("API 前缀契约：admin/app 前缀与登录探活路径一致");
}

/* ------------------------------ 3. 产物与子模块 ------------------------------ */

function checkArtifactsAndSubmodules(manifest) {
  const pkg = JSON.parse(read("package.json") || "{}");
  for (const [name, script] of Object.entries(manifest.artifacts.producers)) {
    if (!pkg.scripts?.[script]) fail(`artifacts.producers.${name}: 缺少生产脚本 ${script}`);
  }
  const buildAdmin = read("scripts/build-admin.mjs") || "";
  if (!buildAdmin.includes(manifest.artifacts.adminDist.replace("apps/admin/", ""))) {
    fail(`artifacts.adminDist: build-admin.mjs 的输出目录与声明不符（${manifest.artifacts.adminDist}）`);
  }
  const backendBuild = pkg.scripts?.[manifest.artifacts.producers.backendJar] || "";
  const jarRel = manifest.artifacts.backendJar.replace("apps/backend/", "");
  if (backendBuild && !backendBuild.includes("yudao-server")) {
    fail(`artifacts.backendJar: build:backend 未产出 yudao-server（声明 ${jarRel}）`);
  }
  ok("产物契约：jar 与 dist 的生产脚本一致");

  for (const sub of manifest.submodules) {
    const url = git(["config", "-f", ".gitmodules", "--get", `submodule.${sub.path}.url`], ROOT);
    if (!url.ok || !url.out) {
      fail(`submodules.${sub.path}: .gitmodules 未声明 url`);
      continue;
    }
    if (url.out !== sub.url) fail(`submodules.${sub.path}: 声明 url ${sub.url} ≠ .gitmodules ${url.out}`);

    if (sub.branch) {
      const br = git(["config", "-f", ".gitmodules", "--get", `submodule.${sub.path}.branch`], ROOT);
      if (br.out !== sub.branch) fail(`submodules.${sub.path}: 声明 branch ${sub.branch} ≠ .gitmodules ${br.out || "(未声明)"}`);
    }

    // 关键：钉住的提交必须在子模块远端真实存在，否则别人 clone 拉不到
    const dir = path.join(ROOT, sub.path);
    if (!fs.existsSync(dir)) {
      fail(`submodules.${sub.path}: 目录不存在（未 submodule update --init）`);
      continue;
    }
    const sha = git(["rev-parse", "HEAD"], dir);
    const remoteRefs = git(["branch", "-r", "--contains", sha.out], dir);
    if (!sha.ok || !remoteRefs.out) {
      fail(`submodules.${sub.path}: 当前提交 ${sha.out.slice(0, 10)} 不在任何远端分支上 → 别人 clone 会失败`);
    }

    if (sub.patchesDir) {
      if (!exists(sub.patchesDir)) {
        fail(`submodules.${sub.path}: 声明的补丁目录 ${sub.patchesDir} 不存在`);
        continue;
      }
      const patches = fs.readdirSync(path.join(ROOT, sub.patchesDir)).filter((n) => n.endsWith(".patch"));
      if (patches.length === 0) fail(`submodules.${sub.path}: 补丁目录为空`);
      for (const p of patches) {
        const text = fs.readFileSync(path.join(ROOT, sub.patchesDir, p), "utf8");
        const files = [...text.matchAll(/^\+\+\+ b\/(.+)$/gm)].map((m) => m[1].trim()).filter((f) => f !== "/dev/null");
        if (files.length === 0) fail(`${sub.patchesDir}/${p}: 未解析出目标文件`);
        for (const f of files) {
          if (!fs.existsSync(path.join(dir, f))) fail(`${sub.patchesDir}/${p}: 目标文件 ${f} 在 ${sub.path} 里不存在`);
        }
      }
    }
  }
  ok("子模块契约：url/branch 与 .gitmodules 一致，且指针均在远端存在");
}

/* -------------------------------- 4. 其它 -------------------------------- */

async function checkJdkAndDocs(manifest) {
  const { VARIANTS, DEFAULT_VARIANT } = await import("./lib/jdk-variants.mjs");
  const ids = VARIANTS.map((v) => v.id);
  if (DEFAULT_VARIANT !== manifest.jdkVariants.default) {
    fail(`jdkVariants.default: 声明 ${manifest.jdkVariants.default} ≠ 真源 ${DEFAULT_VARIANT}`);
  }
  const declared = [...manifest.jdkVariants.ids].sort().join(",");
  if (declared !== [...ids].sort().join(",")) {
    fail(`jdkVariants.ids: 声明 [${manifest.jdkVariants.ids}] ≠ 真源 [${ids}]`);
  }
  if (manifest.jdkVariants.source !== "scripts/lib/jdk-variants.mjs") {
    fail("jdkVariants.source 必须指向 scripts/lib/jdk-variants.mjs（单一真源）");
  }
  ok("JDK 变体契约与真源一致");

  for (const [k, rel] of Object.entries(manifest.docs)) {
    if (!exists(rel)) fail(`docs.${k}: ${rel} 不存在`);
  }
  ok("文档面契约齐备");
}

/* --------------------------------- main --------------------------------- */

async function main() {
  const json = process.argv.includes("--json");
  const manifest = JSON.parse(read("compat-manifest.json") || "null");
  if (!manifest) {
    console.error("❌ 找不到 compat-manifest.json");
    return 2;
  }

  checkEntrypoints(manifest);
  checkRuntime(manifest);
  checkArtifactsAndSubmodules(manifest);
  await checkJdkAndDocs(manifest);

  const passed = problems.length === 0;
  if (json) {
    console.log(JSON.stringify({ passed, checks: notes, problems }, null, 2));
    return passed ? EXIT_OK : EXIT_FINDINGS;
  }

  console.log(`🧩 下游兼容契约校验：${notes.length} 组检查`);
  for (const n of notes) console.log(`   ✅ ${n}`);
  if (!passed) {
    console.log("----------------------------------------------------------------");
    for (const p of problems) console.log(`   ❌ ${p}`);
    console.log("💡 契约失真会直接坑到下游项目/克隆者/外部 Agent；请修 manifest 或修实现，二者必须一致。");
    console.log("❌ 校验未通过");
    return EXIT_FINDINGS;
  }
  console.log("✅ 契约校验通过：声明与实现完全一致");
  return EXIT_OK;
}

process.exit(await main());
