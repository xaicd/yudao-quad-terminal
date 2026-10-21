import test from "node:test";
import assert from "node:assert/strict";

import {
  MODULES,
  MODULE_IDS,
  PROFILES,
  CORE_MODULE_IDS,
  NON_TRIM_JAVA_FILES,
  getModule,
  expandClosure,
  findConflicts,
  validateKeep,
  resolveProfile,
  summarize,
  buildPurgeSql,
} from "../lib/module-catalog.mjs";

test("模块清单为 19 个，id 唯一，core 模块存在", () => {
  assert.equal(MODULES.length, 19);
  assert.equal(new Set(MODULE_IDS).size, 19, "模块 id 必须唯一");
  for (const id of CORE_MODULE_IDS) assert.ok(getModule(id), `缺少 core 模块 ${id}`);
});

test("所有依赖都指向真实模块（无悬空依赖）", () => {
  for (const m of MODULES) {
    for (const dep of m.deps) {
      assert.ok(getModule(dep), `${m.id} 依赖了不存在的模块 ${dep}`);
    }
  }
});

test("每个模块都有实测文件数与 serverArtifacts", () => {
  for (const m of MODULES) {
    assert.ok(Number.isInteger(m.javaFiles) && m.javaFiles > 0, `${m.id} javaFiles 非法`);
    assert.ok(Array.isArray(m.serverArtifacts) && m.serverArtifacts.length > 0, `${m.id} 缺 serverArtifacts`);
    for (const a of m.serverArtifacts) assert.match(a, /-server$/, `${m.id} artifact 后缀应为 -server`);
  }
});

test("profiles 合法且都包含 core 模块", () => {
  assert.deepEqual(PROFILES.mini, ["system", "infra"]);
  for (const [name, ids] of Object.entries(PROFILES)) {
    for (const core of CORE_MODULE_IDS) {
      assert.ok(ids.includes(core), `profile ${name} 缺少 core 模块 ${core}`);
    }
    for (const id of ids) assert.ok(getModule(id), `profile ${name} 含未知模块 ${id}`);
  }
  assert.equal(PROFILES.full.length, 19);
});

test("依赖闭包：保留 mall 自动补齐 member + pay，且顺序稳定", () => {
  const r = expandClosure(["system", "infra", "mall"]);
  assert.deepEqual(r.ids, ["system", "infra", "member", "pay", "mall"]);
  assert.deepEqual([...r.added].sort(), ["member", "pay"]);
});

test("依赖闭包：保留 hrm 自动补齐 bpm", () => {
  const r = expandClosure(["system", "infra", "hrm"]);
  assert.ok(r.ids.includes("bpm"), "hrm 依赖 bpm，闭包必须补齐");
});

test("冲突检测：保留 hrm/fms/oa 时剔除 bpm 必须被识别", () => {
  const keep = MODULE_IDS.filter((id) => id !== "bpm");
  const conflicts = findConflicts(keep, ["bpm"]);
  assert.deepEqual(conflicts.map((c) => c.keeper).sort(), ["fms", "hrm", "oa"]);
});

test("validateKeep 拒绝缺 infra 与未知模块", () => {
  assert.match(validateKeep(["system"]).join("；"), /infra/);
  assert.match(validateKeep(["system", "infra", "不存在"]).join("；"), /不存在/);
  assert.deepEqual(validateKeep(["system", "infra"]), []);
});

test("summarize 与实测基线对齐（全后端 7347 / mini 模块 679）", () => {
  const full = summarize(MODULE_IDS);
  assert.equal(full.keptBackendJavaFiles, 7347, "全后端口径应与实测基线一致");
  assert.equal(full.removedJavaFiles, 0);
  assert.equal(full.reductionPercent, 0);
  assert.equal(full.nonTrimJavaFiles, NON_TRIM_JAVA_FILES);

  const mini = summarize(["system", "infra"]);
  assert.equal(mini.keptJavaFiles, 679);
  assert.ok(mini.reductionPercent > 80 && mini.reductionPercent < 95, `裁剪比例异常: ${mini.reductionPercent}`);
});

test("resolveProfile 对未知档位返回 null", () => {
  assert.deepEqual(resolveProfile("mini"), ["system", "infra"]);
  assert.equal(resolveProfile("nope"), null);
  assert.equal(resolveProfile(""), null);
});

test("清理 SQL：只输出确定性语句，不硬编码猜造的菜单名", () => {
  const sql = buildPurgeSql(["mall", "mes"]);

  // 确定性语句在位
  assert.match(sql, /DELETE FROM system_role_menu/);
  assert.match(sql, /DELETE FROM system_menu/);
  // 已知字典前缀被使用
  assert.match(sql, /dict_type LIKE 'trade_%'/);
  assert.match(sql, /dict_type LIKE 'mes_%'/);
  // 菜单名必须靠 SELECT 候选 + 注释模板，不能直接照抄
  assert.match(sql, /SELECT id, name, path, component FROM system_menu WHERE parent_id = 0/);
  assert.doesNotMatch(sql, /^\s*DELETE FROM system_menu WHERE name IN/m, "不得硬编码猜测的菜单名");
});

test("清理 SQL：未登记字典前缀的模块必须如实提示人工核对", () => {
  const sql = buildPurgeSql(["bpm"]);
  assert.match(sql, /未在 module-catalog 中登记/);
  assert.match(sql, /bpm/);
});
