#!/usr/bin/env node
/**
 * CMMI-08: 服务运维、健康探活与 SRE 韧性保障 (08_sre_and_resilience)
 * --------------------------------------------------------------------------
 * 对齐文档目录: docs/08_sre_and_resilience/
 * 统一跨底座命令:
 *   node scripts/cmmi-08-sre.cjs <start|stop|restart|status|health|logs>
 *   node scripts/cmmi-08-sre.cjs security
 *   node scripts/cmmi-08-sre.cjs load
 *   pnpm run cmmi:08 -- status
 *   pnpm harness 08 status
 */

"use strict";

const { spawnSync } = require("node:child_process");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");

function runNode(scriptRel, extraArgs = []) {
  const res = spawnSync(process.execPath, [path.join(ROOT, scriptRel), ...extraArgs], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });
  return res.status ?? 1;
}

const rawArgs = process.argv.slice(2);
const sub = rawArgs[0] || "status";

if (["start", "stop", "restart", "status", "health", "logs"].includes(sub)) {
  console.log(`═══ [CMMI-08] SRE 服务生命周期管理: ${sub} ═══`);
  process.exit(runNode("scripts/harness.mjs", [sub, ...rawArgs.slice(1)]));
}

if (sub === "security" || sub === "scan") {
  console.log("═══ [CMMI-08] SRE 安全基线与门禁扫描 ═══");
  process.exit(runNode("scripts/verify-controls.mjs", rawArgs.slice(1)));
}

if (sub === "load" || sub === "slo") {
  console.log("═══ [CMMI-08] SRE 容量与契约基线巡检 ═══");
  process.exit(runNode("scripts/compat-check.cjs"));
}

if (sub === "--help" || sub === "-h" || sub === "help") {
  console.log(`用法:
  node scripts/cmmi-08-sre.cjs <start|stop|restart|status|health|logs>   服务生命周期与健康探针
  node scripts/cmmi-08-sre.cjs security                                  安全基线扫描
  node scripts/cmmi-08-sre.cjs slo                                       SRE 契约与容量基线检查`);
  process.exit(0);
}

console.error(`[CMMI-08] 未知子命令: ${sub}`);
process.exit(2);
