#!/usr/bin/env node
/**
 * scripts/build-release-assets.cjs
 * 自动打包 GitHub / Gitee Release 制品资产包 (Release Artifacts)
 *
 * 产物目录: dist/release-assets/
 *   - yudao-quad-terminal-${TAG}-skeleton.tar.gz  (离线纯净四端工程骨架包，已剔除 .git / node_modules / target / .commandcode)
 *   - compat-manifest.json                        (下游机器可读兼容契约)
 *   - blueprint.template.json                     (四端同源 BASE_PATH 蓝图模板契约)
 *   - SHA256SUMS.txt                              (完整性校验哈希清单)
 */

"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { execSync, spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const DIST_ASSETS = path.join(ROOT, "dist", "release-assets");

function getTag() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a.startsWith("--tag=")) return a.slice("--tag=".length).trim();
    if (a === "--tag" && args[i + 1]) return args[i + 1].trim();
  }
  const positional = args.find((a) => !a.startsWith("-"));
  if (positional) return positional.trim();

  try {
    const gitTag = execSync("git describe --tags --exact-match", {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (gitTag) return gitTag;
  } catch {
    // 非精确 tag HEAD 时回退到 package.json version
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    if (pkg.version) return `v${String(pkg.version).replace(/^v/, "")}`;
  } catch {
    // fallback
  }
  return "v1.2.0";
}

function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function main() {
  const tag = getTag();
  console.log(`\n📦 [release-assets] 正在构建版本制品资产包: ${tag}`);

  if (fs.existsSync(DIST_ASSETS)) {
    fs.rmSync(DIST_ASSETS, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_ASSETS, { recursive: true });

  // 1. 打包离线纯净四端工程骨架 Tarball（兼容 GNU tar 与 macOS bsdtar）
  const skeletonTar = path.join(DIST_ASSETS, `yudao-quad-terminal-${tag}-skeleton.tar.gz`);
  console.log(`[1/3] 打包离线纯净工程骨架: ${path.basename(skeletonTar)}...`);

  const excludes = [
    ".git",
    "node_modules",
    ".pnpm-store",
    ".commandcode",
    "target",
    "dist",
    "dist-preview",
    "build",
    "unpackage",
    ".expo",
    ".next",
    ".nuxt",
    ".output",
    ".turbo",
    ".cache",
    ".vite",
    "*.tsbuildinfo",
    "data",
    "tmp",
    "temp",
    "scratch",
    "coverage",
    ".nyc_output",
    "playwright-report",
    "test-results",
    ".DS_Store",
  ];

  const tarArgs = [
    ...excludes.map((pattern) => `--exclude=${pattern}`),
    "-czf",
    skeletonTar,
    ".",
  ];

  const tarRes = spawnSync("tar", tarArgs, {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, COPYFILE_DISABLE: "1" },
  });
  if (tarRes.status !== 0) {
    console.error(`❌ [release-assets] tar 打包失败 (exit=${tarRes.status})`);
    process.exit(tarRes.status || 1);
  }

  const tarStat = fs.statSync(skeletonTar);
  console.log(`✓ 骨架包构建成功: ${(tarStat.size / (1024 * 1024)).toFixed(2)} MB`);

  // 2. 导出下游兼容契约与蓝图模板清单
  console.log("[2/3] 导出下游兼容契约与蓝图模板清单...");
  for (const contractRel of ["compat-manifest.json", "blueprint.template.json"]) {
    const src = path.join(ROOT, contractRel);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(DIST_ASSETS, path.basename(contractRel)));
    }
  }

  // 3. 生成 SHA256SUMS.txt 完整性哈希清单（Node 原生 crypto，跨 Linux/macOS 一致）
  console.log("[3/3] 生成 SHA256SUMS.txt 完整性哈希清单...");
  const assetFiles = fs
    .readdirSync(DIST_ASSETS)
    .filter((f) => f !== "SHA256SUMS.txt")
    .sort();
  const sumLines = assetFiles.map((f) => `${sha256File(path.join(DIST_ASSETS, f))}  ${f}`);
  fs.writeFileSync(path.join(DIST_ASSETS, "SHA256SUMS.txt"), `${sumLines.join("\n")}\n`, "utf8");

  const finalFiles = fs.readdirSync(DIST_ASSETS).sort();
  console.log("\n✅ [release-assets] 全部发布制品构建完成 (dist/release-assets/):");
  for (const f of finalFiles) {
    const s = fs.statSync(path.join(DIST_ASSETS, f));
    const sizeStr = s.size >= 1024 * 1024
      ? `${(s.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(s.size / 1024).toFixed(1)} KB`;
    console.log(`  - ${f} (${sizeStr})`);
  }
  console.log("");
}

main();
