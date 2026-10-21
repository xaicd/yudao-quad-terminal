#!/usr/bin/env node
/**
 * scripts/gate-check.mjs
 *
 * 统一工程门禁（单一真源）——CI、MCP 的 gate_check 工具与人工排查都调用本脚本。
 *
 * 设计原则：
 * 1. **blocking vs advisory 分级**：只有 blocking 失败才让退出码非零；
 *    advisory 是已知的既有基线红灯（契约漂移积压、苏格拉底快照过期），如实展示但不阻塞合入。
 * 2. **skipped ≠ pass**：缺前置条件的门禁标记为 skipped 并说明原因，不伪装成通过。
 * 3. **两档**：
 *    - fast：秒级、无需构建、无网络（适合每次提交）
 *    - full：在 fast 之上追加 lite 档端到端验收（需要 npm install + 两步构建 fat jar）
 *
 * 用法：
 *   node scripts/gate-check.mjs                 # fast
 *   node scripts/gate-check.mjs --tier full     # fast + lite e2e
 *   node scripts/gate-check.mjs --json          # 机器可读（MCP / CI 消费）
 *   node scripts/gate-check.mjs --list          # 列出全部门禁
 *
 * 退出码：0 全通过（blocking 无失败）；1 有 blocking 失败；2 用法错误
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const EXIT_OK = 0;
const EXIT_FAIL = 1;
const EXIT_USAGE = 2;

// ---------------------------------------------------------------------------
// inline 检查：技能注册表一致性
// ---------------------------------------------------------------------------

/**
 * 校验 skills 注册的两条不变量：
 * 1. `scripts/sync-openwiki.mjs` 里引用的每个技能名，都必须在 .agents/skills/<name>/SKILL.md 存在；
 * 2. 磁盘上每个真实技能，都必须被至少一个 stage 引用（避免「有技能但无人知晓」）。
 */
function checkSkillsRegistry() {
  const src = fs.readFileSync(path.join(ROOT, "scripts/sync-openwiki.mjs"), "utf8");
  const skillsDir = path.join(ROOT, ".agents/skills");
  const onDisk = new Set(
    fs
      .readdirSync(skillsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && fs.existsSync(path.join(skillsDir, d.name, "SKILL.md")))
      .map((d) => d.name)
  );

  const referenced = new Set();
  for (const m of src.matchAll(/skills:\s*\[([^\]]*)\]/g)) {
    for (const n of m[1].matchAll(/"([^"]+)"/g)) referenced.add(n[1]);
  }

  const dangling = [...referenced].filter((n) => !onDisk.has(n)).sort();
  const uncovered = [...onDisk].filter((n) => !referenced.has(n)).sort();

  const problems = [];
  if (dangling.length > 0) problems.push(`悬空引用（引用了不存在的技能）: ${dangling.join(", ")}`);
  if (uncovered.length > 0) problems.push(`未被任何阶段覆盖的真实技能: ${uncovered.join(", ")}`);

  return {
    passed: problems.length === 0,
    detail: problems.join("；") || `技能注册一致（${onDisk.size} 个技能，全部被引用且均存在）`,
  };
}

// ---------------------------------------------------------------------------
// inline 检查：trim CLI 自检（验证工具本身可用，而非验证仓库被裁剪）
// ---------------------------------------------------------------------------

function checkTrimCli() {
  const run = (args) =>
    spawnSync(process.execPath, [path.join(ROOT, "scripts/trim-modules.mjs"), ...args], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 60000,
    });

  const plan = run(["--profile", "mini", "--dry-run", "--json"]);
  if (plan.status !== 0) return { passed: false, detail: `dry-run 退出码 ${plan.status}` };
  try {
    const parsed = JSON.parse(plan.stdout);
    if (!parsed.summary || !Array.isArray(parsed.actions)) {
      return { passed: false, detail: "dry-run 的 JSON 结构不符合预期" };
    }
  } catch (e) {
    return { passed: false, detail: `dry-run 输出不是合法 JSON: ${e.message}` };
  }

  const guard = run(["--keep", "system", "--dry-run"]);
  if (guard.status !== 2) {
    return { passed: false, detail: `缺少 infra 时应退出码 2，实际 ${guard.status}` };
  }

  return { passed: true, detail: "dry-run JSON 合法；缺 infra 时正确以退出码 2 拒绝" };
}

// ---------------------------------------------------------------------------
// 门禁定义
// ---------------------------------------------------------------------------

const GATES = [
  {
    id: "openwiki",
    label: "OpenWiki 知识库同步",
    tier: "fast",
    severity: "blocking",
    spawn: { cmd: process.execPath, args: ["scripts/sync-openwiki.mjs", "--check"] },
  },
  {
    id: "skills",
    label: "技能注册表一致性",
    tier: "fast",
    severity: "blocking",
    inline: checkSkillsRegistry,
  },
  {
    id: "workflow",
    label: "SDD 工作流状态",
    tier: "fast",
    severity: "blocking",
    spawn: { cmd: process.execPath, args: ["scripts/workflow-engine.cjs", "--check"] },
  },
  {
    id: "trim-cli",
    label: "trim CLI 自检",
    tier: "fast",
    severity: "blocking",
    inline: checkTrimCli,
  },
  {
    id: "contract",
    label: "前后端契约防漂移（既有基线，advisory）",
    tier: "fast",
    severity: "advisory",
    spawn: { cmd: process.execPath, args: ["scripts/check-contracts-drift.mjs", "--strict"] },
  },
  {
    id: "socratic",
    label: "6 阶苏格拉底反思（快照时效，advisory）",
    tier: "fast",
    severity: "advisory",
    spawn: { cmd: process.execPath, args: ["scripts/socratic-inquiry-engine.cjs", "--check"] },
  },
  {
    id: "lite",
    label: "lite 档端到端验收",
    tier: "full",
    severity: "blocking",
    spawn: { cmd: process.execPath, args: ["scripts/lite-up.mjs", "--verify"], timeoutMs: 900000 },
    // 前置：lite 运行时依赖已安装 + fat jar 已构建；缺失时 skipped 并说明原因
    precondition: () => {
      const missing = [];
      if (!fs.existsSync(path.join(ROOT, "deploy/lite/runtime/node_modules/embedded-postgres"))) {
        missing.push("deploy/lite/runtime 未安装依赖（cd deploy/lite/runtime && npm install）");
      }
      if (!fs.existsSync(path.join(ROOT, "apps/backend/yudao-server/target/yudao-server.jar"))) {
        missing.push("fat jar 未构建（见 deploy/lite/README.md §3 的两步构建）");
      }
      return missing;
    },
  },
];

// ---------------------------------------------------------------------------
// 执行
// ---------------------------------------------------------------------------

function tail(text, lines = 3) {
  return (text || "").trim().split("\n").slice(-lines).join("\n");
}

function runGate(gate) {
  const started = Date.now();

  if (gate.precondition) {
    const missing = gate.precondition();
    if (missing.length > 0) {
      return { ...gate, status: "skipped", detail: missing.join("；"), ms: Date.now() - started };
    }
  }

  if (gate.inline) {
    const r = gate.inline();
    return {
      ...gate,
      status: r.passed ? "pass" : "fail",
      detail: r.detail,
      ms: Date.now() - started,
    };
  }

  const r = spawnSync(gate.spawn.cmd, gate.spawn.args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: gate.spawn.timeoutMs || 300000,
    maxBuffer: 32 * 1024 * 1024,
  });
  const ok = r.status === 0;
  return {
    ...gate,
    status: ok ? "pass" : "fail",
    exitCode: r.status,
    detail: ok ? "" : tail(r.stdout || r.stderr, 4),
    ms: Date.now() - started,
  };
}

function main() {
  const args = process.argv.slice(2);
  const tierArg = args.includes("--tier") ? args[args.indexOf("--tier") + 1] : "fast";
  const json = args.includes("--json");

  if (args.includes("--help") || args.includes("-h")) {
    console.log("用法: node scripts/gate-check.mjs [--tier fast|full] [--json] [--list]");
    process.exit(EXIT_OK);
  }
  if (!["fast", "full"].includes(tierArg)) {
    console.error(`❌ 未知 tier: ${tierArg}（可选 fast / full）`);
    process.exit(EXIT_USAGE);
  }

  if (args.includes("--list")) {
    for (const g of GATES) {
      console.log(`${g.tier.padEnd(5)} ${g.severity.padEnd(9)} ${g.id.padEnd(11)} ${g.label}`);
    }
    process.exit(EXIT_OK);
  }

  const selected = GATES.filter((g) => g.tier === "fast" || tierArg === "full");
  if (!json) {
    console.log("================================================================");
    console.log(`🚦 工程门禁  tier=${tierArg}（${selected.length} 项）`);
    console.log("================================================================");
  }

  const results = selected.map(runGate);

  const blockingFailed = results.filter((r) => r.severity === "blocking" && r.status === "fail");
  const advisoryFailed = results.filter((r) => r.severity === "advisory" && r.status === "fail");
  const skipped = results.filter((r) => r.status === "skipped");

  if (json) {
    console.log(
      JSON.stringify(
        {
          tier: tierArg,
          passed: blockingFailed.length === 0,
          blockingFailed: blockingFailed.map((r) => r.id),
          advisoryFailed: advisoryFailed.map((r) => r.id),
          skipped: skipped.map((r) => r.id),
          results: results.map((r) => ({
            id: r.id,
            label: r.label,
            tier: r.tier,
            severity: r.severity,
            status: r.status,
            ms: r.ms,
            detail: r.detail || undefined,
            exitCode: r.exitCode,
          })),
        },
        null,
        2
      )
    );
  } else {
    const icon = { pass: "✅", fail: "❌", skipped: "⏭️ " };
    for (const r of results) {
      console.log(`${icon[r.status]} ${r.id.padEnd(11)} ${String(r.ms + "ms").padStart(8)}  ${r.label}`);
      if (r.status !== "pass" && r.detail) {
        console.log(String(r.detail).split("\n").map((l) => `      ${l}`).join("\n"));
      }
    }
    console.log("----------------------------------------------------------------");
    console.log(
      `通过 ${results.filter((r) => r.status === "pass").length}/${results.length}` +
        ` | blocking 失败 ${blockingFailed.length} | advisory 失败 ${advisoryFailed.length} | 跳过 ${skipped.length}`
    );
    if (advisoryFailed.length > 0) {
      console.log(`⚠️  advisory 红灯（既有基线，不阻塞）：${advisoryFailed.map((r) => r.id).join(", ")}`);
    }
    if (skipped.length > 0) {
      console.log(`⏭️  跳过（缺前置条件，不算通过）：${skipped.map((r) => r.id).join(", ")}`);
    }
    console.log("================================================================");
    console.log(blockingFailed.length === 0 ? "✅ 门禁通过" : "❌ 门禁未通过");
  }

  process.exit(blockingFailed.length === 0 ? EXIT_OK : EXIT_FAIL);
}

main();
