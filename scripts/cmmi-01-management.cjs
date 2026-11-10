#!/usr/bin/env node
/**
 * scripts/cmmi-01-management.cjs —— CMMI Phase 01: 立项策划与零污染沙箱孵化 (01_management)
 * 主责数字员工: 墨斗 (FDA) / 百晓生 (DS)
 *
 * 跨底座统一用法 (cooliebase-all & yudao-quad-terminal 100% 同名同参):
 *   node scripts/cmmi-01-management.cjs --name <slug> --title "<中文名>" --target /tmp/<slug>-sandbox [--base-path /<slug>] [--package <pkg>]
 *   node scripts/cmmi-01-management.cjs asset --type <charter|risk|dar|plan> --title "<标题>"
 *   node scripts/cmmi-01-management.cjs check
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const argv = process.argv.slice(2);
const sub = argv[0] && !argv[0].startsWith("-") ? argv[0].toLowerCase() : "init";
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
  console.log(`CMMI 01 (01_management) —— 立项策划与零污染沙箱孵化引擎
用法:
  node scripts/cmmi-01-management.cjs [init] --name <slug> --title "<系统名>" --target /tmp/<slug>-sandbox
  node scripts/cmmi-01-management.cjs render --preset <preset> --set PROJECT_NAME=<slug> --set BASE_PATH=/<slug>
  node scripts/cmmi-01-management.cjs asset --type <charter|risk|dar|plan> --title "<标题>"
  node scripts/cmmi-01-management.cjs check`);
  process.exit(0);
}

if (sub === "asset") {
  runNode("scripts/cmmi-asset-scaffold.cjs", ["new", "--phase", "01", ...rest]);
} else if (sub === "render") {
  runNode("scripts/blueprint-engine.cjs", ["render", ...rest]);
} else if (sub === "check") {
  runNode("scripts/blueprint-engine.cjs", ["check"]);
  runNode("scripts/cmmi-asset-scaffold.cjs", ["check"]);
} else {
  runNode("scripts/project-init.cjs", rest);
}
