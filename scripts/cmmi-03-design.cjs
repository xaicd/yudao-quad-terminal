#!/usr/bin/env node
/**
 * scripts/cmmi-03-design.cjs —— CMMI Phase 03: 蓝图自愈诊断与架构契约设计 (03_design)
 * 主责数字员工: 墨斗 (FDA) / 铁匠 (CoreSWE)
 *
 * 跨底座统一用法 (cooliebase-all & yudao-quad-terminal 100% 同名同参):
 *   node scripts/cmmi-03-design.cjs doctor --file <domain>.blueprint.json [--write]
 *   node scripts/cmmi-03-design.cjs compile --file <domain>.blueprint.json [--write]
 *   node scripts/cmmi-03-design.cjs asset --type <adr|archify> --title "<标题>"
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const argv = process.argv.slice(2);
const sub = (argv[0] && !argv[0].startsWith("-") ? argv[0] : "doctor").toLowerCase();
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
  console.log(`CMMI 03 (03_design) —— 蓝图防呆自愈与架构契约编译引擎
用法:
  node scripts/cmmi-03-design.cjs doctor --file <domain>.blueprint.json [--write]
  node scripts/cmmi-03-design.cjs compile --file <domain>.blueprint.json [--write]
  node scripts/cmmi-03-design.cjs asset --type <adr|archify> --title "<标题>"`);
  process.exit(0);
}

if (sub === "compile" || sub === "compile-domain") {
  runNode("scripts/blueprint-engine.cjs", ["compile-domain", ...rest]);
} else if (sub === "asset") {
  runNode("scripts/cmmi-asset-scaffold.cjs", ["new", "--phase", "03", ...rest]);
} else {
  runNode("scripts/blueprint-engine.cjs", ["doctor", ...rest]);
}
