#!/usr/bin/env node
/**
 * scripts/codegen-module.cjs
 *
 * 跨底座统一的业务模块全栈代码生成入口（与 cooliebase-all/scripts/codegen-module.cjs 100% 同名契约）
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const res = spawnSync(
  process.execPath,
  [path.join(__dirname, "codegen-module.mjs"), ...process.argv.slice(2)],
  { stdio: "inherit", cwd: process.cwd(), env: process.env }
);

process.exit(res.status ?? 1);
