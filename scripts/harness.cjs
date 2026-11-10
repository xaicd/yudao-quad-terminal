#!/usr/bin/env node
/**
 * scripts/harness.cjs
 *
 * 跨底座统一的 CMMI 00~09 全生命周期 Harness 调度入口（与 cooliebase-all/scripts/harness.cjs 100% 同名同参数契约）
 *
 * 支持动作：
 *   1. CMMI 00~09 阶段直接派发: 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | cmmi <00..09> | cmmi:00..09
 *   2. 生命周期主干动作: install | check | build | start | health | status | stop | e2e | deliver | doctor
 */

"use strict";

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const CMMI_MAP = {
  "00": "cmmi-00-meta.cjs",
  "01": "cmmi-01-management.cjs",
  "02": "cmmi-02-requirements.cjs",
  "03": "cmmi-03-design.cjs",
  "04": "cmmi-04-implementation.cjs",
  "05": "cmmi-05-verification.cjs",
  "06": "cmmi-06-quality.cjs",
  "07": "cmmi-07-release.cjs",
  "08": "cmmi-08-sre.cjs",
  "09": "cmmi-09-operations.cjs",
};

const argv = process.argv.slice(2);
const sub = (argv[0] || "").toLowerCase();

if (sub === "pmo") {
  const res = spawnSync(
    process.execPath,
    [path.join(__dirname, "cmmi-01-management.cjs"), "pmo", ...argv.slice(1)],
    { stdio: "inherit", cwd: process.cwd(), env: process.env }
  );
  process.exit(res.status ?? 1);
}

if (CMMI_MAP[sub]) {
  const res = spawnSync(
    process.execPath,
    [path.join(__dirname, CMMI_MAP[sub]), ...argv.slice(1)],
    { stdio: "inherit", cwd: process.cwd(), env: process.env }
  );
  process.exit(res.status ?? 1);
}

if (sub.startsWith("cmmi:") && CMMI_MAP[sub.slice(5)]) {
  const res = spawnSync(
    process.execPath,
    [path.join(__dirname, CMMI_MAP[sub.slice(5)]), ...argv.slice(1)],
    { stdio: "inherit", cwd: process.cwd(), env: process.env }
  );
  process.exit(res.status ?? 1);
}

if (sub === "cmmi" && CMMI_MAP[argv[1]]) {
  const res = spawnSync(
    process.execPath,
    [path.join(__dirname, CMMI_MAP[argv[1]]), ...argv.slice(2)],
    { stdio: "inherit", cwd: process.cwd(), env: process.env }
  );
  process.exit(res.status ?? 1);
}

const res = spawnSync(
  process.execPath,
  [path.join(__dirname, "harness.mjs"), ...argv],
  { stdio: "inherit", cwd: process.cwd(), env: process.env }
);

process.exit(res.status ?? 1);
