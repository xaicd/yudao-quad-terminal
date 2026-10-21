#!/usr/bin/env node
/**
 * scripts/build-admin.mjs —— PC 运营中台（apps/admin）前端构建入口
 *
 * 为什么需要这个脚本（而不是直接 `pnpm --filter yudao-ui-admin-vue3 build:local`）：
 * 本仓使用 pnpm 的 hoisted linker（见 .npmrc），所有依赖的可执行文件都装在**根** node_modules；
 * 而子模块 apps/admin 的构建脚本写死了相对路径 `./node_modules/vite/bin/vite.js`，
 * 在 hoisted 布局下该路径必然不存在 —— 于是"构建"看似失败，其实是路径问题。
 *
 * 这里解析出真实的 vite 入口，并以 apps/admin 为工作目录执行：
 * 既不改子模块（只读铁律），也不假装成功（找不到 vite 才显式 SKIP）。
 *
 * 用法：node scripts/build-admin.mjs [mode]     # 默认 env.local
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ADMIN = path.join(ROOT, "apps/admin");
const OUT_DIR = path.join(ADMIN, "dist");

const MODES = ["env.local", "env.dev", "env.test", "env.stage", "env.prod"];

function resolveViteEntry() {
  const candidates = [
    path.join(ADMIN, "node_modules/vite/bin/vite.js"),
    path.join(ROOT, "node_modules/vite/bin/vite.js"),
  ];
  return candidates.find((c) => fs.existsSync(c)) || null;
}

function dirSizeMB(dir) {
  if (!fs.existsSync(dir)) return 0;
  let total = 0;
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile()) total += fs.statSync(p).size;
    }
  };
  walk(dir);
  return total / 1024 / 1024;
}

const mode = process.argv[2] || "env.local";
if (process.argv[2] === "--help" || process.argv[2] === "-h") {
  console.log(`用法: node scripts/build-admin.mjs [mode]\n  mode ∈ ${MODES.join(" | ")}（默认 env.local）`);
  process.exit(0);
}
if (process.argv[2] && !MODES.includes(mode)) {
  console.error(`❌ 未知 mode: ${mode}\n   可选: ${MODES.join(" | ")}`);
  process.exit(2);
}

const vite = resolveViteEntry();
if (!vite) {
  console.log("⏭️  SKIP 前端构建: 未找到 vite（请先执行 pnpm install，且不要带 NODE_ENV=production）");
  process.exit(0);
}

console.log(`🏗️  构建 PC 运营中台（mode=${mode}, vite=${path.relative(ROOT, vite)}）…`);
const started = Date.now();

const r = spawnSync(
  process.execPath,
  ["--max-old-space-size=8192", vite, "build", "--mode", mode],
  { cwd: ADMIN, stdio: "inherit", env: { ...process.env, NODE_ENV: "production" } }
);

if (r.status !== 0) {
  console.error(`❌ 前端构建失败（exit=${r.status}）`);
  console.error(`
   ↳ 若报错为 UNLOADABLE_DEPENDENCY（apps/admin 源码里 import 了不存在的模块），
     属**子模块上游缺陷**而非本仓配置问题，请对照 AGENTS.md §0.4「已知既有红灯」：
     例：views/oa/** 引用 @/views/oa/utils/constants，该文件在上游 master 存在、
     但本仓 pin 的子模块提交（fbb229fe）没有 → 需升 apps/admin 子模块指针或等上游对齐。
     本仓不得直接修改 apps/admin 任何文件。`);
  process.exit(r.status || 1);
}

const mb = dirSizeMB(OUT_DIR);
console.log(`✅ 前端构建完成: apps/admin/dist (${mb.toFixed(1)} MB, ${Math.round((Date.now() - started) / 1000)}s)`);
