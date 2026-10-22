#!/usr/bin/env node
/**
 * scripts/harness/negative-controls.mjs —— 门禁「反向控制」（negative control）
 *
 * 学自家族 harness 的做法（cooliebase-all `harness-health.cjs`、wenlv-next `scripts/harness/*-negative-control.sh`）：
 *
 *   **配置文件合法 ≠ 生效；门禁存在 ≠ 会咬人。**
 *
 * 因此对每道 blocking 门禁做一次受控实验：
 *   ① 先跑一次，确认基线是绿的（否则实验无意义）；
 *   ② 注入一处**恰好针对该门禁**的违规；
 *   ③ 再跑一次 —— 必须**变红**（exit ≠ 0），否则说明这道门禁是摆设；
 *   ④ 复原并校验字节级还原，再跑第三次 —— 必须恢复绿灯。
 *
 * 全过程 try/finally + 逐文件哈希校验，任何一步复原失败立即中止并报错。
 *
 * 用法: node scripts/harness/negative-controls.mjs [--json] [--list] [--only <id,...>]
 * 退出码: 0 全部控制通过 / 1 有门禁不咬人或恢复失败 / 2 用法错误
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const GATE = path.join(ROOT, "scripts/gate-check.mjs");

const abs = (rel) => path.join(ROOT, rel);
const write = (rel, text) => {
  fs.mkdirSync(path.dirname(abs(rel)), { recursive: true });
  fs.writeFileSync(abs(rel), text);
};
const append = (rel, text) => fs.appendFileSync(abs(rel), text);

function runGate(id) {
  const r = spawnSync(process.execPath, [GATE, "--only", id], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 300000,
  });
  return r.status === null ? 124 : r.status;
}

function snapshot(rel) {
  const a = abs(rel);
  return fs.existsSync(a) ? { exists: true, text: fs.readFileSync(a, "utf8") } : { exists: false };
}

function restore(rel, snap) {
  const a = abs(rel);
  if (snap.exists) fs.writeFileSync(a, snap.text);
  else if (fs.existsSync(a)) fs.rmSync(a, { force: true });

  const now = fs.existsSync(a);
  const same = snap.exists ? now && fs.readFileSync(a, "utf8") === snap.text : !now;
  if (!same) throw new Error(`复原失败（字节级不一致）: ${rel}`);
}

/* --------------------------------- 控制集 --------------------------------- */

const CONTROLS = [
  {
    id: "pkg-manager",
    label: "自有文档里写了 npm 安装命令",
    files: ["docs/.negative-control-npm.md"],
    // 注意：这里**不能**直接写字符串字面量，否则本文件自身会被 pkg-manager 门禁命中
    // （门禁会扫 scripts/**/*.mjs），所以用拼接构造违规文本。
    mutate: () => write("docs/.negative-control-npm.md", `# negative control\n\n${["npm", "install"].join(" ")} left-pad\n`),
  },
  {
    id: "doc-commands",
    label: "文档引用不存在的 pnpm 脚本",
    files: ["docs/.negative-control-cmd.md"],
    // 门禁只认「带命名空间冒号」的脚本名（避免把散文里的 pnpm 误判成命令），故注入也必须带冒号
    mutate: () => write("docs/.negative-control-cmd.md", "# negative control\n\npnpm negative:control-missing\n"),
  },
  {
    id: "jdk-variants",
    label: "文档引用了不存在的上游 ref",
    files: ["README.md"],
    mutate: () => append("README.md", "\n<!-- negative control -->\n变体 ~~`master-jdk999`~~\n"),
  },
  {
    id: "submodule-patches",
    label: "子模块出现补丁未声明的改动",
    files: ["apps/backend/.negative-control-stray.txt"],
    mutate: () => write("apps/backend/.negative-control-stray.txt", "stray\n"),
  },
  {
    id: "ci-files",
    label: "workflow YAML 里含 tab",
    files: [".github/workflows/quality-gates.yml"],
    mutate: () => append(".github/workflows/quality-gates.yml", "\n#\tnegative control\n"),
  },
  {
    id: "script-targets",
    label: "package.json 脚本指向不存在的文件",
    files: ["package.json"],
    mutate: () => {
      const p = JSON.parse(fs.readFileSync(abs("package.json"), "utf8"));
      p.scripts.__negative_control__ = "node scripts/negative-control-missing.mjs";
      fs.writeFileSync(abs("package.json"), `${JSON.stringify(p, null, 2)}\n`);
    },
  },
  {
    id: "compat",
    label: "兼容契约声明与实际不符",
    files: ["compat-manifest.json"],
    mutate: () => {
      const m = JSON.parse(fs.readFileSync(abs("compat-manifest.json"), "utf8"));
      m.runtime.lite.server.port = 1;
      fs.writeFileSync(abs("compat-manifest.json"), `${JSON.stringify(m, null, 2)}\n`);
    },
  },
  {
    id: "specs-health",
    label: "规格资产缺失（借走 brief.json）",
    files: ["docs/specs/platform/module-trim-and-mcp/brief.json", "docs/specs/platform/module-trim-and-mcp/brief.json.nc-bak"],
    mutate: () => fs.renameSync(abs("docs/specs/platform/module-trim-and-mcp/brief.json"), abs("docs/specs/platform/module-trim-and-mcp/brief.json.nc-bak")),
  },
  {
    id: "typecheck",
    label: "自有包出现类型错误",
    files: ["packages/shared-types/src/index.ts"],
    mutate: () => append("packages/shared-types/src/index.ts", '\nexport const __negativeControl: number = "not a number";\n'),
  },
];

/* ---------------------------------- main ---------------------------------- */

function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",").map((s) => s.trim()) : null;

  if (args.includes("--help")) {
    console.log(`用法: node scripts/harness/negative-controls.mjs [--json] [--list] [--only <id,...>]

对每道 blocking 门禁做受控实验：基线绿 → 注入违规 → 必须变红 → 复原 → 必须转绿。
不带参数即跑全部控制；--only 可只跑指定门禁（逗号分隔）。

控制集: ${CONTROLS.map((c) => c.id).join(" / ")}`);
    return 0;
  }
  if (args.includes("--list")) {
    for (const c of CONTROLS) console.log(`${c.id.padEnd(18)} ${c.label}`);
    return 0;
  }

  const selected = only ? CONTROLS.filter((c) => only.includes(c.id)) : CONTROLS;
  const missing = only ? only.filter((id) => !CONTROLS.some((c) => c.id === id)) : [];
  if (missing.length) {
    console.error(`❌ 未登记的反向控制: ${missing.join(", ")}`);
    return 2;
  }

  if (!json) {
    console.log("================================================================");
    console.log(`🧪 门禁反向控制（证明守卫真的会咬人）— ${selected.length} 项`);
    console.log("================================================================");
  }

  const rows = [];
  for (const c of selected) {
    const snaps = c.files.map((f) => [f, snapshot(f)]);
    let baselineGreen = false;
    let error = null;

    try {
      const baseline = runGate(c.id);
      if (baseline !== 0) {
        // 基线本就红：实验无意义，且**不得**在 finally 里做"复原后复检"（否则会把 SKIP 升级成 FAIL）
        rows.push({ id: c.id, label: c.label, verdict: "SKIP", reason: `基线本就红（exit ${baseline}），无法做干净的反向控制` });
        continue;
      }
      baselineGreen = true;

      c.mutate();
      const mutated = runGate(c.id);
      rows.push({
        id: c.id,
        label: c.label,
        verdict: mutated !== 0 ? "PASS" : "FAIL",
        reason: mutated !== 0 ? `注入违规后门禁红灯（exit ${mutated}）` : "注入违规后门禁**仍然绿灯** → 这道门禁不会咬人",
      });
    } catch (e) {
      error = e.message;
      rows.push({ id: c.id, label: c.label, verdict: "ERROR", reason: e.message });
    } finally {
      try {
        for (const [f, s] of snaps) restore(f, s);
        if (baselineGreen && !error) {
          const restored = runGate(c.id);
          if (restored !== 0) {
            rows.push({ id: c.id, label: c.label, verdict: "FAIL", reason: `复原后门禁仍红灯（exit ${restored}）` });
          }
        }
      } catch (e) {
        rows.push({ id: c.id, label: c.label, verdict: "ERROR", reason: `复原阶段失败: ${e.message}` });
      }
    }
  }

  // 同一 id 出现多条时，取最严重的裁决
  const severity = { ERROR: 3, FAIL: 2, SKIP: 1, PASS: 0 };
  const merged = new Map();
  for (const r of rows) {
    const prev = merged.get(r.id);
    if (!prev || severity[r.verdict] > severity[prev.verdict]) merged.set(r.id, r);
  }
  const finalRows = [...merged.values()];

  const failed = finalRows.filter((r) => r.verdict === "FAIL" || r.verdict === "ERROR");
  const skipped = finalRows.filter((r) => r.verdict === "SKIP");
  const passed = finalRows.filter((r) => r.verdict === "PASS");

  if (json) {
    console.log(JSON.stringify({ ok: failed.length === 0, rows: finalRows }, null, 2));
    return failed.length === 0 ? 0 : 1;
  }

  for (const r of finalRows) {
    const mark = r.verdict === "PASS" ? "✅" : r.verdict === "SKIP" ? "⏭️ " : "❌";
    console.log(`${mark} ${r.id.padEnd(18)} ${r.label}`);
    console.log(`      ${r.reason}`);
  }
  console.log("----------------------------------------------------------------");
  console.log(`通过 ${passed.length} / 跳过 ${skipped.length} / 失败 ${failed.length}`);
  if (failed.length) {
    console.log("❌ 存在不会咬人的门禁或复原异常 —— 守卫形同虚设，必须修");
    return 1;
  }
  console.log("✅ 全部门禁都通过了反向控制（注入违规确实变红，复原后确实转绿）");
  return 0;
}

process.exit(main());
