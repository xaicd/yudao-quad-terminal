import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  PATCH_SETS,
  parsePatchFiles,
  parsePorcelainPaths,
  listPatches,
  evaluatePatchState,
} from "../lib/submodule-patches.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SCRIPT = path.join(ROOT, "scripts/submodule-patches.mjs");

const run = (...args) =>
  spawnSync(process.execPath, [SCRIPT, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 60000,
  });

/* -------------------------------- 纯函数 -------------------------------- */

test("parsePatchFiles：取出 +++ b/<path>，忽略 /dev/null 与上下文行", () => {
  const patch = [
    "diff --git a/foo.java b/foo.java",
    "--- a/foo.java",
    "+++ b/foo.java",
    "@@ -1 +1 @@",
    "-old",
    "+new",
    "diff --git a/bar.yaml b/bar.yaml",
    "--- /dev/null",
    "+++ b/bar.yaml",
  ].join("\n");
  assert.deepEqual(parsePatchFiles(patch), ["bar.yaml", "foo.java"]);
  assert.deepEqual(parsePatchFiles(""), []);
});

test("parsePorcelainPaths：解析普通改动、重命名与带引号路径", () => {
  const out = [
    " M yudao-server/src/main/resources/application.yaml",
    "?? yudao-module-system/whatever.java",
    "R  old/path.java -> new/path.java",
    "",
  ].join("\n");
  assert.deepEqual(parsePorcelainPaths(out), [
    "new/path.java",
    "yudao-module-system/whatever.java",
    "yudao-server/src/main/resources/application.yaml",
  ]);
});

test("parsePorcelainPaths：首行前导空格被 trim 掉也不得砍掉路径首字符（真实踩过的坑）", () => {
  // 若调用方对 git stdout 做了 trim，" M path" 会变成 "M path"；
  // 此时用 slice(3) 会把 yudao-server/… 切成 udao-server/…，误判成"补丁未声明的改动"。
  assert.deepEqual(parsePorcelainPaths("M yudao-server/src/main/resources/application.yaml"), [
    "yudao-server/src/main/resources/application.yaml",
  ]);
});

test("evaluatePatchState：applied / applicable 都算合法", () => {
  const states = [
    { name: "a.patch", state: "applied", files: ["x.java"] },
    { name: "b.patch", state: "applicable", files: ["y.yaml"] },
  ];
  const ev = evaluatePatchState({ submodule: "backend", states, dirtyPaths: ["x.java"] });
  assert.equal(ev.ok, true, ev.problems.join("; "));
  assert.equal(ev.appliedCount, 1);
  assert.equal(ev.total, 2);
});

test("evaluatePatchState：冲突必须失败（补丁目标已变动）", () => {
  const ev = evaluatePatchState({
    submodule: "backend",
    states: [{ name: "a.patch", state: "conflict", files: ["x.java"] }],
    dirtyPaths: [],
  });
  assert.equal(ev.ok, false);
  assert.match(ev.problems.join("; "), /既不能应用也不能反向应用/);
});

test("evaluatePatchState：补丁之外的改动必须失败（防手改子模块）", () => {
  const ev = evaluatePatchState({
    submodule: "admin",
    states: [{ name: "a.patch", state: "applied", files: ["src/api/login/index.ts"] }],
    dirtyPaths: ["src/api/login/index.ts", "src/悄悄手改的.ts"],
  });
  assert.equal(ev.ok, false);
  assert.match(ev.problems.join("; "), /补丁未声明的改动 src\/悄悄手改的\.ts/);
});

/* ------------------------------ 真源目录 ------------------------------ */

test("补丁目录：每个子模块都声明了补丁，且补丁文件真实存在、非空、带 diff 头", () => {
  assert.ok(PATCH_SETS.length >= 2);
  for (const set of PATCH_SETS) {
    const patches = listPatches(ROOT, set.patchDir);
    assert.ok(patches.length > 0, `${set.patchDir} 未声明任何补丁`);
    assert.ok(fs.existsSync(path.join(ROOT, set.dir)), `${set.dir} 不存在`);
    for (const p of patches) {
      assert.ok(p.files.length > 0, `${p.name} 没解析出任何目标文件`);
      const text = fs.readFileSync(p.abs, "utf8");
      assert.match(text, /^diff --git /m, `${p.name} 不是 git 补丁格式`);
    }
  }
});

/* --------------------------------- CLI --------------------------------- */

test("--status --json：补丁已注入且无未声明改动", () => {
  const r = run("--status", "--json");
  assert.equal(r.status, 0, r.stderr);

  const j = JSON.parse(r.stdout);
  assert.equal(j.ok, true);
  assert.equal(j.sets.length, PATCH_SETS.length);
  for (const s of j.sets) {
    assert.match(s.pinned, /^[0-9a-f]{7,}$/, `${s.submodule} pin 非法`);
    assert.ok(s.patches.length > 0);
    for (const p of s.patches) assert.equal(p.state, "applied", `${s.submodule}/${p.name} 状态=${p.state}`);
    assert.deepEqual(s.dirty.sort(), s.patches.flatMap((p) => p.files).sort(), "子模块改动必须恰好等于声明的补丁");
  }
});

test("--check：门禁语义（合法即 0）", () => {
  const r = run("--check");
  assert.equal(r.status, 0, `${r.stdout}\n${r.stderr}`);
  assert.match(r.stdout, /状态合法|校验通过|改动恰好等于声明的补丁/);
});

test("--apply --dry-run：不改变状态", () => {
  const before = run("--status", "--json").stdout;
  const r = run("--apply", "--dry-run");
  assert.equal(r.status, 0, r.stderr);
  assert.equal(run("--status", "--json").stdout, before);
});

test("--help 说明用途；未知参数 exit 2", () => {
  const help = run("--help");
  assert.equal(help.status, 0);
  assert.match(help.stdout, /deploy\/patches/);

  assert.equal(run("--nope").status, 2);
});
