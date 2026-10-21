import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SCRIPT = path.join(ROOT, "scripts/trim-modules.mjs");

const run = (...args) =>
  spawnSync(process.execPath, [SCRIPT, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 60000,
  });

test("--profile mini --dry-run --json：exit 0，且计划结构完整", () => {
  const r = run("--profile", "mini", "--dry-run", "--json");
  assert.equal(r.status, 0, r.stderr);

  const j = JSON.parse(r.stdout);
  assert.equal(j.action, "plan");
  assert.deepEqual(j.selection.keep, ["system", "infra"]);
  assert.equal(j.actions.length, 19, "计划应覆盖全部 19 个模块");
  assert.equal(j.actions.filter((a) => !a.keep).length, 17, "mini 应剔除 17 个");
  assert.equal(j.summary.keptJavaFiles, 679);
  assert.ok(j.summary.reductionPercent > 0);
});

test("--keep 缺少 infra：exit 2 并给出原因", () => {
  const r = run("--keep", "system", "--dry-run");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /infra/);
});

test("--remove bpm 但保留 hrm/fms/oa：exit 2 并指出被谁依赖", () => {
  const r = run("--remove", "bpm", "--dry-run");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /hrm/);
  assert.match(r.stderr, /fms/);
});

test("未知 profile：exit 2", () => {
  const r = run("--profile", "nope", "--dry-run");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /nope/);
});

test("未给选择器 / 给了多个选择器：均 exit 2", () => {
  assert.equal(run("--dry-run").status, 2);
  assert.equal(run("--profile", "mini", "--keep", "system,infra", "--dry-run").status, 2);
});

test("--check 缺选择器：exit 2", () => {
  assert.equal(run("--check").status, 2);
});

test("--recover 在非 TTY 下缺 --yes：exit 2（防止误清工作区）", () => {
  const r = run("--recover");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /--yes/);
});

test("--sql 只输出语句、不连库、不写盘", () => {
  const r = run("--profile", "mini", "--sql");
  assert.equal(r.status, 0);
  assert.match(r.stdout, /DELETE FROM system_role_menu/);
  assert.match(r.stdout, /SELECT id, name, path, component FROM system_menu/);
});

test("--help 覆盖关键开关（dry-run/apply/check/sql/json/recover）", () => {
  const r = run("--help");
  assert.equal(r.status, 0);
  for (const flag of ["--dry-run", "--apply", "--check", "--sql", "--json", "--recover", "--profile"]) {
    assert.match(r.stdout, new RegExp(flag.replace(/-/g, "\\-")), `帮助里缺少 ${flag}`);
  }
});
