#!/usr/bin/env node
/**
 * scripts/cmmi-00-meta.cjs —— CMMI Phase 00: 规范与元契约 (00_meta_standards)
 * 主责数字员工: 墨斗 (FDA)
 *
 * 跨底座统一用法 (cooliebase-all & yudao-quad-terminal 100% 同名同参):
 *   node scripts/cmmi-00-meta.cjs [check | sync | schema]
 *   pnpm run cmmi:00 [check | sync | schema]
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const argv = process.argv.slice(2);
const sub = (argv[0] && !argv[0].startsWith("-") ? argv[0] : "check").toLowerCase();
const rest = argv[0] && !argv[0].startsWith("-") ? argv.slice(1) : argv;

function runNode(scriptRel, args = []) {
  const res = spawnSync(process.execPath, [path.join(ROOT, scriptRel), ...args], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

if (sub === "help" || argv.includes("--help") || argv.includes("-h")) {
  console.log(`CMMI 00 (00_meta_standards) —— 规范与元契约引擎
用法:
  node scripts/cmmi-00-meta.cjs check    校验 compat-manifest 下游契约 + 蓝图模板契约 + OpenWiki 同步状态
  node scripts/cmmi-00-meta.cjs sync     同步 OpenWiki 知识大脑与元契约表面
  node scripts/cmmi-00-meta.cjs schema   输出机器可读的蓝图 Schema (--compact)`);
  process.exit(0);
}

if (sub === "sync") {
  runNode("scripts/sync-openwiki.mjs", rest);
  runNode("scripts/compat-check.cjs");
} else if (sub === "schema") {
  runNode("scripts/blueprint-engine.cjs", ["schema", "--compact", ...rest]);
} else {
  runNode("scripts/compat-check.cjs", rest);
  runNode("scripts/blueprint-engine.cjs", ["check"]);
}
