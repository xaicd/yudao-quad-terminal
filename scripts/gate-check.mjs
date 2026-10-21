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
 *    - full：在 fast 之上追加 lite 档端到端验收（需要 pnpm install + 两步构建 fat jar）
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
// inline 检查：pnpm 标准化（禁止 npm 操作）
// ---------------------------------------------------------------------------

/**
 * 本仓唯一的 JS 包管理器与任务入口是 pnpm。
 * 禁止在自有文件里出现 npm 的四类操作，也禁止把 pnpm 写成多个前导 p 的笔误。
 *
 * 边界：`node scripts/x.mjs` 这类直接调 node 的写法是允许的（与 `pnpm x` 等价，
 * MCP 与门禁自身也是这么调用的）；`apps/` 下的上游子模块各自有工具链，不在约束范围内。
 */
function checkPackageManager() {
  const EXCLUDE_DIRS = new Set(["node_modules", ".git", ".commandcode", "apps", "data", "dist", "build", "target"]);
  const EXCLUDE_FILES = /(^|\/)(pnpm-lock\.yaml|package-lock\.json)$/;
  const FORBIDDEN = [
    { re: /(?<![a-z-])npm (run|install|exec|ci)\b/, label: "npm 操作" },
    { re: /\bp{2,}npm\b/, label: "重复 p 的 pnpm 笔误" },
  ];

  const files = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (EXCLUDE_DIRS.has(e.name)) continue;
        walk(path.join(dir, e.name));
      } else if (/\.(md|txt|mjs|cjs|js|json|ya?ml|sh)$/.test(e.name)) {
        const abs = path.join(dir, e.name);
        if (!EXCLUDE_FILES.test(abs)) files.push(abs);
      }
    }
  };
  walk(ROOT);

  const hits = [];
  for (const file of files) {
    fs.readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        for (const { re, label } of FORBIDDEN) {
          if (re.test(line)) {
            hits.push(`${path.relative(ROOT, file)}:${i + 1} ${label}`);
            break;
          }
        }
      });
  }

  return {
    passed: hits.length === 0,
    detail:
      hits.length === 0
        ? `pnpm 标准化一致（扫描 ${files.length} 个自有文件，0 处 npm 操作）`
        : `发现 ${hits.length} 处非 pnpm 用法：\n${hits.slice(0, 15).join("\n")}${hits.length > 15 ? "\n…" : ""}`,
  };
}

// ---------------------------------------------------------------------------
// inline 检查：文档里引用的 pnpm 命令是否真实存在（advisory）
// ---------------------------------------------------------------------------

/**
 * 把 pnpm 标准化做到"不撒谎"：文档/skill 里出现的 `pnpm <script>` 必须能在
 * 根 package.json 的 scripts 里找到。pnpm 内建子命令与带 flag 的用法会被忽略。
 *
 * 之所以是 advisory 而非 blocking：存量文档里仍有一批来自姊妹基座的命令
 * （cmmi:asset / smoke:login / security:scan 等）在本仓尚未实现，治理需要单独排期。
 */
function checkDocCommands() {
  const BUILTIN = new Set([
    "install", "i", "add", "remove", "rm", "update", "up", "exec", "dlx", "run",
    "link", "unlink", "import", "list", "ls", "why", "outdated", "audit", "store",
    "prune", "patch", "publish", "recursive", "deploy", "config", "help", "env",
  ]);
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const scripts = new Set(Object.keys(pkg.scripts || {}));

  const EXCLUDE_DIRS = new Set(["node_modules", ".git", ".commandcode", "apps", "data", "dist", "build", "target"]);
  const files = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (EXCLUDE_DIRS.has(e.name)) continue;
        walk(path.join(dir, e.name));
      } else if (e.name.endsWith(".md")) {
        files.push(path.join(dir, e.name));
      }
    }
  };
  walk(ROOT);

  const missing = new Map();
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const m of text.matchAll(/\bpnpm ([a-zA-Z0-9:_-]+)/g)) {
      const token = m[1];
      // 只认「带命名空间冒号的脚本名」，避免把 “pnpm Monorepo Workspace” 这类散文误判为命令
      if (!token.includes(":")) continue;
      if (token.startsWith("-") || BUILTIN.has(token) || scripts.has(token)) continue;
      if (!missing.has(token)) missing.set(token, new Set());
      missing.get(token).add(path.relative(ROOT, file));
    }
  }

  const names = [...missing.keys()].sort();
  return {
    passed: names.length === 0,
    detail:
      names.length === 0
        ? `文档里的 pnpm 命令全部对应真实 script（扫描 ${files.length} 个 md）`
        : `引用了本仓不存在的 pnpm script（${names.length} 个）：${names.join(", ")}`,
  };
}

// ---------------------------------------------------------------------------
// inline 检查：package.json 里脚本引用的本地文件必须存在
// ---------------------------------------------------------------------------

/**
 * 防止「声明了却指向不存在的脚本」这类死引用（典型：apps/app 的 ota:publish
 * 指向从未存在的 scripts/publish-ota.sh）。
 * 覆盖主仓自有 package.json（根 + apps/app + packages/*），不含上游 submodule。
 */
function checkScriptTargets() {
  const roots = [
    "package.json",
    "apps/app/package.json",
    ...fs
      .readdirSync(path.join(ROOT, "packages"), { withFileTypes: true })
      .filter((d) => d.isDirectory() && fs.existsSync(path.join(ROOT, "packages", d.name, "package.json")))
      .map((d) => `packages/${d.name}/package.json`),
  ].filter((rel) => fs.existsSync(path.join(ROOT, rel)));

  const missing = [];
  for (const rel of roots) {
    const baseDir = path.dirname(path.join(ROOT, rel));
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
    for (const [name, cmd] of Object.entries(pkg.scripts || {})) {
      const refs = [...String(cmd).matchAll(/(?:^|[\s"'&|(])(?:node|bash|sh)\s+([.\w/@-]+\.(?:mjs|cjs|js|sh))/g)].map(
        (m) => m[1]
      );
      for (const r of refs) {
        if (!fs.existsSync(path.resolve(baseDir, r))) missing.push(`${rel} → ${name}: ${r}`);
      }
    }
  }

  return {
    passed: missing.length === 0,
    detail:
      missing.length === 0
        ? `脚本目标全部存在（检查 ${roots.length} 个 package.json）`
        : `存在死引用：\n${missing.join("\n")}`,
  };
}

// ---------------------------------------------------------------------------
// inline 检查：CI workflow 结构 + shell 脚本语法
// ---------------------------------------------------------------------------

/**
 * 把「CI 能不能真的跑」和「shell 脚本有没有语法错」固化下来：
 * 1. `.github/workflows/*.yml`：不得含 tab（YAML 禁止）、必须有 on/jobs、引用的 scripts/* 必须存在；
 * 2. `scripts/*.sh`：逐个 `bash -n` 语法检查。
 */
function checkCiAndShell() {
  const problems = [];
  const wfDir = path.join(ROOT, ".github/workflows");

  if (fs.existsSync(wfDir)) {
    for (const f of fs.readdirSync(wfDir).filter((n) => /\.ya?ml$/.test(n))) {
      const text = fs.readFileSync(path.join(wfDir, f), "utf8");
      if (/\t/.test(text)) problems.push(`${f}: 含 tab（YAML 不允许）`);
      for (const key of ["on:", "jobs:"]) {
        if (!text.includes(key)) problems.push(`${f}: 缺少 \`${key}\``);
      }
      for (const m of text.matchAll(/(?:^|\s)(scripts\/[\w./-]+\.(?:mjs|cjs|sh))/g)) {
        if (!fs.existsSync(path.join(ROOT, m[1]))) problems.push(`${f}: 引用了不存在的 ${m[1]}`);
      }
    }
  }

  const shDir = path.join(ROOT, "scripts");
  const shFiles = fs.readdirSync(shDir).filter((n) => n.endsWith(".sh"));
  for (const f of shFiles) {
    const r = spawnSync("bash", ["-n", path.join(shDir, f)], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (r.status !== 0) problems.push(`${f}: bash -n 失败 — ${(r.stderr || "").trim().slice(0, 140)}`);
  }

  return {
    passed: problems.length === 0,
    detail:
      problems.length === 0
        ? `CI workflow 结构正常；${shFiles.length} 个 shell 脚本语法通过`
        : problems.join("\n"),
  };
}

// ---------------------------------------------------------------------------
// 门禁定义
// ---------------------------------------------------------------------------

const GATES = [
  {
    id: "pkg-manager",
    label: "pnpm 标准化（禁止 npm 操作）",
    tier: "fast",
    severity: "blocking",
    inline: checkPackageManager,
  },
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
    id: "typecheck",
    label: "TypeScript 类型检查（自有包：app / shared-types / api-client）",
    tier: "fast",
    severity: "blocking",
    spawn: { cmd: "pnpm", args: ["typecheck"], timeoutMs: 300000 },
  },
  {
    id: "specs-health",
    label: "规格健康度（16 资产 + brief 8 要素 + 占位符）",
    tier: "fast",
    severity: "blocking",
    spawn: { cmd: process.execPath, args: ["scripts/specs-health.mjs"] },
  },
  {
    id: "workflow",
    label: "SDD 工作流状态",
    tier: "fast",
    severity: "blocking",
    spawn: { cmd: process.execPath, args: ["scripts/workflow-engine.cjs", "--check"] },
  },
  {
    id: "scripts-tests",
    label: "自有脚本单元测试（node:test）",
    tier: "fast",
    severity: "blocking",
    spawn: { cmd: "pnpm", args: ["test:scripts"], timeoutMs: 180000 },
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
    label: "前后端契约防漂移（孤儿/动词不符；未封装属常态不计）",
    tier: "fast",
    severity: "advisory",
    spawn: { cmd: process.execPath, args: ["scripts/check-contracts-drift.mjs"] },
  },
  {
    id: "doc-commands",
    label: "文档 pnpm 命令真实性",
    tier: "fast",
    severity: "blocking",
    inline: checkDocCommands,
  },
  {
    id: "script-targets",
    label: "package.json 脚本目标存在性",
    tier: "fast",
    severity: "blocking",
    inline: checkScriptTargets,
  },
  {
    id: "jdk-variants",
    label: "JDK 变体可执行性（变体 ref + 文档 ref 真实性）",
    tier: "fast",
    severity: "blocking",
    spawn: { cmd: process.execPath, args: ["scripts/jdk-variants.mjs", "--check"] },
  },
  {
    id: "ci-files",
    label: "CI workflow 结构 + shell 语法",
    tier: "fast",
    severity: "blocking",
    inline: checkCiAndShell,
  },
  {
    id: "socratic",
    label: "6 阶苏格拉底反思（快照时效，advisory）",
    tier: "fast",
    severity: "advisory",
    spawn: { cmd: process.execPath, args: ["scripts/socratic-inquiry-engine.cjs", "--check"] },
  },
  {
    id: "backend-tests",
    label: "后端单测（system-server + infra-server，H2 + 内嵌 Jedis 真替身）",
    tier: "full",
    severity: "blocking",
    spawn: {
      cmd: "mvn",
      args: ["-B", "test", "-pl", "yudao-server", "-am"],
      cwd: "apps/backend",
      timeoutMs: 900000,
    },
  },
  {
    id: "admin-build",
    label: "前端构建（apps/admin vite 产物）",
    tier: "full",
    severity: "blocking",
    spawn: { cmd: process.execPath, args: ["scripts/build-admin.mjs"], timeoutMs: 900000 },
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
        missing.push("deploy/lite/runtime 未安装依赖（cd deploy/lite/runtime && pnpm install）");
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
    cwd: gate.spawn.cwd ? path.join(ROOT, gate.spawn.cwd) : ROOT,
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
