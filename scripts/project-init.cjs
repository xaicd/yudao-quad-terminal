#!/usr/bin/env node
/**
 * scripts/project-init.cjs
 *
 * 跨底座统一的零污染项目初始化与沙箱孵化入口（与 cooliebase-all/scripts/project-init.cjs 100% 同名同参数契约）
 *
 * 支持用法：
 *   node scripts/project-init.cjs --name <slug> --title "<中文名>" --target /tmp/<slug>-sandbox [--base-path /<slug>] [--package com.<slug>.server]
 *   node scripts/project-init.cjs --name <slug> --title "<中文名>" --in-place
 *   pnpm run project:init -- --name <slug> --title "<中文名>" --target /tmp/<slug>-sandbox
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const args = process.argv.slice(2);
const hasTarget = args.some((a) => a === "--target" || a.startsWith("--target="));
const hasInPlace = args.includes("--in-place");

// 若未传 --target 且未传 --in-place，兼容 cooliebase-all 默认原地重构语义
const finalArgs = !hasTarget && !hasInPlace ? ["--in-place", ...args] : args;

const res = spawnSync(
  process.execPath,
  [path.join(__dirname, "project-reactor.mjs"), ...finalArgs],
  { stdio: "inherit", cwd: process.cwd(), env: process.env }
);

process.exit(res.status ?? 1);
