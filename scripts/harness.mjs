#!/usr/bin/env node
/**
 * scripts/harness.mjs
 * Yudao-Quad-Terminal —— 统一全生命周期 Harness 总调度引擎
 * (Unified Lifecycle Harness Dispatcher)
 *
 * 核心目标：
 * 保证与 CoolieBase-All 在 9 大生命周期环节上 100% 契约对齐（只能多不能少）。
 *
 * 标准命令集：
 *   pnpm harness install     # [环节 1] 依赖安装与领域种子数据注入
 *   pnpm harness check       # [环节 2] 静态与契约门禁（0 编译报错）
 *   pnpm harness build       # [环节 3] 制品编译（Spring Boot Jar + Vite）
 *   pnpm harness start       # [环节 4] 运行时拉起（后台守护、单一网关 48120、PID 记录）
 *   pnpm harness health      # [环节 5] 实时健康与就绪探活（返回 200 OK）
 *   pnpm harness status      # [环节 6] 状态大盘（查看 PID、端口监听、对外统一入口）
 *   pnpm harness stop        # [环节 7] 资源回收（彻底释放 48120 与 48080）
 *   pnpm harness restart     # 平滑重启
 *   pnpm harness logs        # 查看最新运行日志
 *   pnpm harness test        # 单元与脚本回归测试
 *   pnpm harness e2e         # 拟真人与端到端实测 (lite e2e)
 *   pnpm harness deliver     # 商业终验出厂门禁（全量门禁 + 机器凭证）
 *   pnpm harness doctor      # 只读环境与兼容性体检
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const argv = process.argv.slice(2);
const sub = (argv[0] || "help").toLowerCase();
const rest = argv.slice(1);

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { cwd: ROOT, stdio: "inherit", ...opts });
  return res.status ?? 1;
}

function runBash(script, args = []) {
  return run("bash", [path.join(ROOT, script), ...args]);
}

function runNode(script, args = []) {
  return run(process.execPath, [path.join(ROOT, script), ...args]);
}

function runPnpm(script, args = []) {
  return run("pnpm", ["run", script, ...args]);
}

const TRUNK = [
  ["route", "pnpm harness route -- \"<需求>\"", "需求分诊（SPEC_REQUIRED / FAST_PATH）"],
  ["spec", "pnpm harness spec new|build|tasks|check", "Spec-Kit SDD 规格体系命令"],
  ["install", "pnpm harness install", "依赖安装与垂直领域种子注入 (service.sh install)"],
  ["check", "pnpm harness check", "全量静态快速门禁 (gate-check --tier fast)"],
  ["build", "pnpm harness build", "全栈生产构建 (Jar + Vite + 网关配置)"],
  ["start", "pnpm harness start", "启动全栈服务 (Spring Boot + Caddy 单一入口 48120)"],
  ["stop", "pnpm harness stop", "停止全栈服务并彻底释放端口"],
  ["restart", "pnpm harness restart", "平滑重启全栈服务"],
  ["status", "pnpm harness status", "查询服务运行状态、PID 与访问入口"],
  ["health", "pnpm harness health", "服务健康与就绪实时探活 (返回 200 OK)"],
  ["logs", "pnpm harness logs", "查看最新运行日志 (service.log)"],
  ["test", "pnpm harness test", "单元与脚本回归测试 (test:scripts)"],
  ["e2e", "pnpm harness e2e", "真 DB + 拟真人走查端到端验证 (lite:verify)"],
  ["deliver", "pnpm harness deliver", "商业终验出厂门禁 (gate-check --tier full)"],
  ["doctor", "pnpm harness doctor", "底座环境与契约兼容性体检 (compat:check)"],
];

function printHelp() {
  console.log("========================================================================");
  console.log("🛡️  Yudao-Quad-Terminal —— 统一全生命周期 Harness 总调度引擎");
  console.log("   标准全流程主干（与 CoolieBase-All 严格对齐，只能多不能少）：\n");
  for (const [cmd, usage, desc] of TRUNK) {
    console.log(`  ${cmd.padEnd(10)} ${usage.padEnd(46)} ${desc}`);
  }
  console.log("========================================================================\n");
}

function main() {
  switch (sub) {
    case "help":
    case "--help":
    case "-h":
      printHelp();
      return 0;

    case "install":
    case "build":
    case "start":
    case "stop":
    case "restart":
    case "status":
    case "health":
    case "logs":
    case "deploy":
      return runBash("scripts/service.sh", [sub, ...rest]);

    case "check":
      return runNode("scripts/gate-check.mjs", ["--tier", "fast", ...rest]);

    case "deliver":
      return runNode("scripts/gate-check.mjs", ["--tier", "full", ...rest]);

    case "test":
      return runPnpm("test:scripts", rest);

    case "e2e":
      return runNode("scripts/lite-up.mjs", ["--verify", ...rest]);

    case "doctor":
      return runNode("scripts/compat-check.mjs", rest);

    case "route":
    case "triage":
      return runNode("scripts/speckit.cjs", ["triage", ...rest]);

    case "spec":
    case "speckit":
      return runNode("scripts/speckit.cjs", rest);

    default: {
      // 兜底转发 package.json 中的 npm script
      const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
      if (pkg.scripts && pkg.scripts[sub]) {
        return runPnpm(sub, rest);
      }
      console.error(`[harness] 未知子命令: ${sub}（也不存在同名 npm script）`);
      printHelp();
      return 2;
    }
  }
}

process.exit(main());
