#!/usr/bin/env node
/**
 * scripts/submodule-patches.mjs —— 子模块差异补丁的注入 / 校验 / 回滚 CLI
 *
 * 用法：
 *   node scripts/submodule-patches.mjs --status          # 各子模块的补丁状态与未声明改动
 *   node scripts/submodule-patches.mjs --check           # 门禁：补丁状态合法且无未声明改动
 *   node scripts/submodule-patches.mjs --apply [--dry-run] [--quiet]
 *   node scripts/submodule-patches.mjs --revert          # 反向应用，把子模块还原成纯上游
 *
 * 退出码：0 通过 / 1 状态不合法 / 2 用法错误
 */

import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { PATCH_SETS, listPatches, parsePorcelainPaths, evaluatePatchState } from "./lib/submodule-patches.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const EXIT_OK = 0;
const EXIT_FINDINGS = 1;
const EXIT_USAGE = 2;

function git(dir, args) {
  const r = spawnSync("git", ["-C", dir, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return { ok: r.status === 0, out: (r.stdout || "").trim(), err: (r.stderr || "").trim() };
}

/** 不做 trim：porcelain 首行的前导空格有意义，trim 会把路径首字符吃掉 */
function gitRaw(dir, args) {
  const r = spawnSync("git", ["-C", dir, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return { ok: r.status === 0, out: r.stdout || "", err: (r.stderr || "").trim() };
}

function patchState(dir, abs) {
  if (git(dir, ["apply", "--check", "-R", abs]).ok) return "applied";
  if (git(dir, ["apply", "--check", abs]).ok) return "applicable";
  return "conflict";
}

function collect() {
  return PATCH_SETS.map((set) => {
    const dir = path.join(ROOT, set.dir);
    const patches = listPatches(ROOT, set.patchDir);
    const states = patches.map((p) => ({ ...p, state: patchState(dir, p.abs) }));
    const dirtyPaths = parsePorcelainPaths(gitRaw(dir, ["status", "--porcelain"]).out);
    const pinned = git(dir, ["rev-parse", "--short", "HEAD"]).out;
    return { ...set, dir, pinned, states, dirtyPaths };
  });
}

function cmdStatus(json) {
  const sets = collect();
  let ok = true;
  const rows = sets.map((s) => {
    const ev = evaluatePatchState({ submodule: s.submodule, states: s.states, dirtyPaths: s.dirtyPaths });
    if (!ev.ok) ok = false;
    return { submodule: s.submodule, pinned: s.pinned, patches: s.states.map((p) => ({ name: p.name, state: p.state, files: p.files })), dirty: s.dirtyPaths, problems: ev.problems };
  });

  if (json) {
    console.log(JSON.stringify({ ok, sets: rows }, null, 2));
    return ok ? EXIT_OK : EXIT_FINDINGS;
  }

  console.log("🔧 子模块补丁状态（真源：deploy/patches/<submodule>/*.patch）");
  console.log("----------------------------------------------------------------");
  for (const r of rows) {
    console.log(`  apps/${r.submodule}  pin=${r.pinned}`);
    for (const p of r.patches) {
      const mark = p.state === "applied" ? "✅ 已注入" : p.state === "applicable" ? "⏭️ 可注入" : "❌ 冲突";
      console.log(`     ${mark}  ${p.name}  (${p.files.length} 个文件)`);
    }
    if (r.patches.length === 0) console.log("     （该子模块未声明补丁）");
    if (r.dirty.length) console.log(`     工作区改动: ${r.dirty.join(", ")}`);
  }
  console.log("----------------------------------------------------------------");
  for (const r of rows) for (const p of r.problems) console.log(`  ❌ ${p}`);
  console.log(ok ? "✅ 状态合法（改动恰好等于声明的补丁）" : "❌ 状态不合法");
  return ok ? EXIT_OK : EXIT_FINDINGS;
}

function cmdApply({ dryRun, quiet }) {
  const sets = collect();
  let failed = false;

  for (const s of sets) {
    if (s.states.length === 0) continue;
    const ev = evaluatePatchState({ submodule: s.submodule, states: s.states, dirtyPaths: s.dirtyPaths });
    if (!ev.ok) {
      failed = true;
      console.error(`❌ apps/${s.submodule} 状态不合法，拒绝注入:`);
      for (const p of ev.problems) console.error(`     ${p}`);
      continue;
    }

    for (const p of s.states) {
      if (p.state === "applied") {
        if (!quiet) console.log(`  ✅ apps/${s.submodule}: ${p.name} 已是注入状态，跳过`);
        continue;
      }
      if (dryRun) {
        console.log(`  🧪 apps/${s.submodule}: 将注入 ${p.name}`);
        continue;
      }
      const r = git(s.dir, ["apply", p.abs]);
      if (!r.ok) {
        failed = true;
        console.error(`  ❌ apps/${s.submodule}: 注入 ${p.name} 失败 — ${r.err}`);
        continue;
      }
      console.log(`  🔧 apps/${s.submodule}: 已注入 ${p.name}`);
    }
  }

  return failed ? EXIT_FINDINGS : EXIT_OK;
}

function cmdRevert() {
  const sets = collect();
  let failed = false;

  for (const s of sets) {
    for (const p of [...s.states].reverse()) {
      if (p.state !== "applied") continue;
      const r = git(s.dir, ["apply", "-R", p.abs]);
      if (!r.ok) {
        failed = true;
        console.error(`  ❌ apps/${s.submodule}: 回滚 ${p.name} 失败 — ${r.err}`);
        continue;
      }
      console.log(`  ↩️  apps/${s.submodule}: 已回滚 ${p.name}`);
    }
    const left = parsePorcelainPaths(git(s.dir, ["status", "--porcelain"]).out);
    if (left.length) {
      failed = true;
      console.error(`  ❌ apps/${s.submodule}: 回滚后仍有改动（非本工具所改，请手动检查）: ${left.join(", ")}`);
    }
  }

  return failed ? EXIT_FINDINGS : EXIT_OK;
}

function main() {
  const args = process.argv.slice(2);
  const flag = (n) => args.includes(n);

  if (flag("--help") || args.length === 0) {
    console.log(`用法: node scripts/submodule-patches.mjs <命令>

  --status          查看各子模块补丁状态与未声明改动
  --check           门禁校验：补丁状态合法（applied/applicable）且无未声明改动
  --apply           幂等注入补丁（--dry-run 预览，--quiet 静默）
  --revert          反向应用，把子模块还原成纯上游提交状态
  --json            机器可读输出（配合 --status）

为什么需要它：本仓把对第三方子模块的差异（ApiEncrypt 开箱即用）收敛在主仓
deploy/patches/，子模块指针保持纯上游提交，才能被别人 clone 到。`);
    return EXIT_OK;
  }

  if (flag("--status")) return cmdStatus(flag("--json"));
  if (flag("--check")) return cmdStatus(flag("--json"));
  if (flag("--apply")) return cmdApply({ dryRun: flag("--dry-run"), quiet: flag("--quiet") });
  if (flag("--revert")) return cmdRevert();

  console.error(`❌ 未知参数: ${args.join(" ")}（用 --help 查看用法）`);
  return EXIT_USAGE;
}

process.exit(main());
