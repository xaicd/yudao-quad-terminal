#!/usr/bin/env node
/**
 * scripts/gate-check.cjs
 *
 * 跨底座统一的工程质量门禁入口（与 cooliebase-all/scripts/gate-check.cjs 100% 同名同参数契约）
 * 用法：node scripts/gate-check.cjs [--tier fast|full] [--only <id>] [--list]
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const res = spawnSync(
  process.execPath,
  [path.join(__dirname, "gate-check.mjs"), ...process.argv.slice(2)],
  { stdio: "inherit", cwd: process.cwd(), env: process.env }
);

process.exit(res.status ?? 1);
