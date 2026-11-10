#!/usr/bin/env node
/**
 * scripts/cmmi-04-implementation.cjs —— CMMI Phase 04: 全栈编码生成与防假实现 (04_implementation)
 * 主责数字员工: 铁匠 (CoreSWE)
 *
 * 跨底座统一用法 (cooliebase-all & yudao-quad-terminal 100% 同名同参):
 *   node scripts/cmmi-04-implementation.cjs deliver --file <domain>.blueprint.json [--verify-e2e]
 *   node scripts/cmmi-04-implementation.cjs codegen --schema <schema.json>
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const argv = process.argv.slice(2);
const sub = (argv[0] && !argv[0].startsWith("-") ? argv[0] : "deliver").toLowerCase();
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
  console.log(`CMMI 04 (04_implementation) —— 声明式蓝图全栈代码与 PostgreSQL DDL 生成引擎
用法:
  node scripts/cmmi-04-implementation.cjs [deliver] --file <domain>.blueprint.json [--verify-e2e]
  node scripts/cmmi-04-implementation.cjs codegen --schema <domain.codegen.json>`);
  process.exit(0);
}

if (sub === "codegen" || sub === "gen") {
  runNode("scripts/codegen-module.cjs", rest);
} else if (sub === "asset") {
  runNode("scripts/cmmi-asset-scaffold.cjs", ["new", "--phase", "04", ...rest]);
} else {
  runNode("scripts/blueprint-engine.cjs", ["deliver", ...rest]);
}
