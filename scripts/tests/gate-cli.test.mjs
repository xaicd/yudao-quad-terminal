import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SCRIPT = path.join(ROOT, "scripts/gate-check.mjs");

// 注意：**不要**在这里跑完整门禁（scripts-tests 本身就是门禁的一项，会无限递归）。
// 只验证门禁自身的 CLI 契约与清单。
const run = (...args) =>
  spawnSync(process.execPath, [SCRIPT, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 60000,
  });

test("--list 列出全部门禁，且包含所有关键项", () => {
  const r = run("--list");
  assert.equal(r.status, 0, r.stderr);

  for (const id of [
    "pkg-manager",
    "openwiki",
    "skills",
    "typecheck",
    "specs-health",
    "workflow",
    "trim-cli",
    "doc-commands",
    "script-targets",
    "contract",
    "socratic",
    "lite",
  ]) {
    assert.match(r.stdout, new RegExp(`\\b${id}\\b`), `门禁清单缺少 ${id}`);
  }
});

test("门禁清单包含 blocking 与 advisory 两种分级，且 fast/full 两档都在", () => {
  const r = run("--list");
  assert.match(r.stdout, /blocking/);
  assert.match(r.stdout, /advisory/);
  assert.match(r.stdout, /\bfast\b/);
  assert.match(r.stdout, /\bfull\b/);
});

test("未知 tier：exit 2（用法错误，而不是静默按 fast 跑）", () => {
  const r = run("--tier", "nope");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /nope/);
});

test("--help 有用法说明", () => {
  const r = run("--help");
  assert.equal(r.status, 0);
  assert.match(r.stdout, /--tier/);
  assert.match(r.stdout, /--json/);
});
