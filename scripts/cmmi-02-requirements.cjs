#!/usr/bin/env node
/**
 * scripts/cmmi-02-requirements.cjs —— CMMI Phase 02: 需求分诊与 EARS 规格工程 (02_requirements)
 * 主责数字员工: 百晓生 (DS) / Hermes
 *
 * 跨底座统一用法 (cooliebase-all & yudao-quad-terminal 100% 同名同参):
 *   node scripts/cmmi-02-requirements.cjs route "<用户原始需求>"
 *   node scripts/cmmi-02-requirements.cjs new --name <slug> --domain <domain> --title "<标题>"
 *   node scripts/cmmi-02-requirements.cjs build --name <slug>
 *   node scripts/cmmi-02-requirements.cjs check [--spec <slug>]
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
  console.log(`CMMI 02 (02_requirements) —— 需求分诊与 EARS 规格立项引擎
用法:
  node scripts/cmmi-02-requirements.cjs route "<用户需求>"
  node scripts/cmmi-02-requirements.cjs new --name <slug> --domain <domain> --title "<标题>"
  node scripts/cmmi-02-requirements.cjs build --name <slug>
  node scripts/cmmi-02-requirements.cjs check [--spec <slug>]`);
  process.exit(0);
}

if (sub === "route" || sub === "triage") {
  runNode("scripts/speckit.cjs", ["triage", ...rest]);
} else if (sub === "new" || sub === "specify") {
  runNode("scripts/speckit.cjs", ["new", ...rest]);
} else if (sub === "build" || sub === "plan") {
  runNode("scripts/speckit.cjs", ["build", ...rest]);
} else if (sub === "asset") {
  runNode("scripts/cmmi-asset-scaffold.cjs", ["new", "--phase", "02", ...rest]);
} else {
  runNode("scripts/specs-health.mjs", rest);
}
