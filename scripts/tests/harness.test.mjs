import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const run = (script, ...args) =>
  spawnSync(process.execPath, [path.join(ROOT, script), ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 300000,
  });

/* --------------------------- 下游兼容契约（compat） --------------------------- */

test("compat-manifest 存在且结构完整（下游绑定它，缺字段即契约无效）", () => {
  const abs = path.join(ROOT, "compat-manifest.json");
  assert.ok(fs.existsSync(abs), "缺少 compat-manifest.json");

  const m = JSON.parse(fs.readFileSync(abs, "utf8"));
  assert.equal(m.kind, "compat-manifest");
  assert.equal(typeof m.version, "number");
  assert.ok(m.framework?.templateVersion, "必须声明 templateVersion（跟踪模板而非派生项目自身版本）");
  assert.ok(Array.isArray(m.framework?.consumers) && m.framework.consumers.length >= 3, "至少声明 3 类消费方");
  for (const c of m.framework.consumers) {
    assert.ok(c.kind && c.how, `消费方 ${c.kind ?? "?"} 缺少 kind/how`);
  }
  assert.ok(Object.keys(m.entrypoints || {}).length >= 8, "入口契约过少");
  assert.ok(m.runtime?.lite?.postgres?.port && m.runtime?.lite?.redis?.port, "缺少 lite 运行时声明");
  assert.ok(m.artifacts?.backendJar && m.artifacts?.adminDist, "缺少产物声明");
  assert.ok(Array.isArray(m.submodules) && m.submodules.length === 3, "应声明三个子模块");
  assert.ok(m.docs?.harness, "必须声明 HARNESS.md");
});

test("compat:check 必须绿灯（声明与实现一致）", () => {
  const r = run("scripts/compat-check.mjs", "--json");
  assert.equal(r.status, 0, r.stdout + r.stderr);

  const j = JSON.parse(r.stdout);
  assert.equal(j.passed, true, j.problems.join("; "));
  assert.ok(j.checks.length >= 6, `检查组过少：${j.checks.length}`);
});

/* --------------------------- 门禁反向控制（harness） --------------------------- */

test("反向控制集：每道 blocking 门禁都必须被覆盖或被显式登记为豁免", () => {
  // 这条不变式是 HARNESS.md §6 的机器化版本：
  // 新增一道 blocking 门禁后，要么给它补一条反向控制，要么在下面的豁免表里写明为什么不能注入。
  const EXEMPT = new Set([
    "openwiki", // 需要构造 wiki 漂移，注入代价大，暂以 openwiki:check 的自身测试覆盖
    "skills", // 同上：注册表一致性由 skills sync 脚本自检
    "workflow", // SDD 工作流状态依赖规格快照，不便于就地注入
    "scripts-tests", // 自指：跑测试时不能同时又跑测试套件
    "trim-cli", // 需要真删模块目录，代价高（已由单元测试覆盖）
    "backend-tests", // 需要注入 Java 失败用例（已由 mvn 自身失败即退出保证）
    "admin-build", // 需要注入前端语法错误，耗时长（已由构建 exit code 保证）
    "lite", // 端到端验收强制失败需破坏运行时（已由 3 次连续登录等断言保证）
  ]);

  const list = run("scripts/gate-check.mjs", "--list");
  assert.equal(list.status, 0, list.stderr);
  const blocking = list.stdout
    .split("\n")
    .filter((l) => l.includes("blocking"))
    .map((l) => l.trim().split(/\s+/)[2]);

  const controls = run("scripts/harness/negative-controls.mjs", "--list");
  assert.equal(controls.status, 0, controls.stderr);
  const controlled = new Set(controls.stdout.split("\n").filter(Boolean).map((l) => l.trim().split(/\s+/)[0]));

  const uncovered = blocking.filter((id) => !controlled.has(id) && !EXEMPT.has(id));
  assert.deepEqual(
    uncovered,
    [],
    `以下 blocking 门禁既没有反向控制也没有豁免登记：${uncovered.join(", ")}`
  );
  assert.ok(controlled.size >= 9, `反向控制集过少：${controlled.size}`);
});

test("反向控制 --list 报出全部控制项；--only 未知 id 退出码 2", () => {
  const list = run("scripts/harness/negative-controls.mjs", "--list");
  assert.equal(list.status, 0);
  for (const id of ["pkg-manager", "compat", "submodule-patches", "jdk-variants", "typecheck"]) {
    assert.match(list.stdout, new RegExp(`^${id}\\b`, "m"), `缺少 ${id} 的反向控制`);
  }

  const bad = run("scripts/harness/negative-controls.mjs", "--only", "no-such-gate");
  assert.equal(bad.status, 2);
});

test("HARNESS.md 存在且覆盖消费方/验证矩阵/不变式三块", () => {
  const text = fs.readFileSync(path.join(ROOT, "HARNESS.md"), "utf8");
  for (const k of ["## 3.", "## 4.", "## 5."]) assert.ok(text.includes(k), `HARNESS.md 缺少 ${k} 章节`);
  assert.match(text, /project:hatch/, "必须说明派生用法");
  assert.match(text, /compat:check/, "必须指向兼容契约校验");
  assert.match(text, /harness:controls/, "必须指向反向控制");
});
