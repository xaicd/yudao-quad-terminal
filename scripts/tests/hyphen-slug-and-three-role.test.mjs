import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import * as cred from "../../deploy/lite/runtime/lite-credentials.mjs";
import { discoverCustomDomainSql } from "../../deploy/lite/runtime/lite-pg.mjs";
import { pruneDatabaseMenus } from "../domain-prune.mjs";
import {
  deriveSlugForms,
  replaceContent,
  sanitizeAdminFrontendForDerivedProject,
} from "../project-reactor.mjs";

const require = createRequire(import.meta.url);
const { resolveDatabaseEndpoint, createClient } = require("../lib/ephemeral-pg.cjs");
const {
  DEFAULT_ROLES,
  renderThreeRoleAuditSql,
  renderThreeRoleGuardJava,
} = require("../lib/three-role-audit.cjs");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("deriveSlugForms + replaceContent: 连字符项目名 (star-pulse) 在 SQL/Java/Spring 配置中各得其所", () => {
  const forms = deriveSlugForms("star-pulse");
  assert.deepEqual(forms, {
    projectName: "star-pulse",
    snakeSlug: "star_pulse",
    upperSnakeSlug: "STAR_PULSE",
    pascalSlug: "StarPulse",
    camelSlug: "starPulse",
  });

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "reactor-hyphen-test-"));
  try {
    const sqlFile = path.join(tmp, "demo.sql");
    const javaFile = path.join(tmp, "Demo.java");
    const yamlFile = path.join(tmp, "application.yaml");

    fs.writeFileSync(
      sqlFile,
      "CREATE TABLE yudao_demo01_contact (id BIGINT PRIMARY KEY);\nCREATE INDEX idx_yudao_demo ON yudao_demo01_contact(id);\n",
      "utf8"
    );
    fs.writeFileSync(
      javaFile,
      [
        "package cn.iocoder.yudao.server;",
        '@ConfigurationProperties(prefix = "yudao.info")',
        "public class YudaoServerApplication {",
        "  public static final String KEY = YUDAO_CACHE_KEY;",
        "  private Object yudaoProperties;",
        "}",
      ].join("\n"),
      "utf8"
    );
    fs.writeFileSync(yamlFile, "yudao:\n  info:\n    base-package: cn.iocoder.yudao\n", "utf8");

    replaceContent(tmp, {
      projectName: "star-pulse",
      projectTitle: "星云数据集成平台",
      groupId: "com.star_pulse",
      packageName: "com.star_pulse.server",
      basePath: "/star-pulse",
      gatewayPort: 48091,
    });

    const sqlOut = fs.readFileSync(sqlFile, "utf8");
    assert.match(sqlOut, /CREATE TABLE star_pulse_demo01_contact/);
    assert.match(sqlOut, /idx_star_pulse_demo/);
    assert.doesNotMatch(sqlOut, /star-pulse_/, "SQL 标识符严禁出现未加引号连字符");

    const javaOut = fs.readFileSync(javaFile, "utf8");
    assert.match(javaOut, /package com\.star_pulse\.server\.server;/);
    assert.match(javaOut, /@ConfigurationProperties\(prefix = "star-pulse\.info"\)/);
    assert.match(javaOut, /public class StarPulseServerApplication/);
    assert.match(javaOut, /STAR_PULSE_CACHE_KEY/);
    assert.match(javaOut, /private Object starPulseProperties;/);

    const yamlOut = fs.readFileSync(yamlFile, "utf8");
    assert.match(yamlOut, /^star-pulse:/m);
    assert.match(yamlOut, /base-package: com\.star_pulse\.server/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("sanitizeAdminFrontendForDerivedProject: 物理删除假图表、重写零Mock首页、注入登录 testid 与 /cockpit 路由", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "admin-cleanroom-test-"));
  try {
    const homeDir = path.join(tmp, "apps/admin/src/views/Home");
    const loginDir = path.join(tmp, "apps/admin/src/views/Login/components");
    const utilsDir = path.join(tmp, "apps/admin/src/utils");
    fs.mkdirSync(homeDir, { recursive: true });
    fs.mkdirSync(loginDir, { recursive: true });
    fs.mkdirSync(utilsDir, { recursive: true });

    fs.writeFileSync(path.join(homeDir, "Index.vue"), "import './types'; import './echarts-data';", "utf8");
    fs.writeFileSync(path.join(homeDir, "Index2.vue"), "<template>mock</template>", "utf8");
    fs.writeFileSync(path.join(homeDir, "echarts-data.ts"), "export const mock = 1;", "utf8");
    fs.writeFileSync(path.join(homeDir, "types.ts"), "export type T = any;", "utf8");

    fs.copyFileSync(
      path.join(ROOT, "apps/admin/src/views/Login/components/LoginForm.vue"),
      path.join(loginDir, "LoginForm.vue")
    );
    fs.copyFileSync(
      path.join(ROOT, "apps/admin/src/utils/routerHelper.ts"),
      path.join(utilsDir, "routerHelper.ts")
    );

    sanitizeAdminFrontendForDerivedProject(tmp, {
      projectName: "star-pulse",
      projectTitle: "星云数据集成平台",
    });

    for (const removed of ["Index2.vue", "echarts-data.ts", "types.ts"]) {
      assert.equal(fs.existsSync(path.join(homeDir, removed)), false, `${removed} 必须被物理删除`);
    }
    const homeVue = fs.readFileSync(path.join(homeDir, "Index.vue"), "utf8");
    assert.doesNotMatch(homeVue, /echarts-data|\.\/types/);
    assert.match(homeVue, /data-testid="portal-home"/);

    const loginVue = fs.readFileSync(path.join(loginDir, "LoginForm.vue"), "utf8");
    assert.match(loginVue, /data-testid="login-username"/);
    assert.match(loginVue, /data-testid="login-password"/);
    assert.match(loginVue, /data-testid="login-submit"/);
    assert.doesNotMatch(loginVue, /萌新必读/);

    const routerTs = fs.readFileSync(path.join(utilsDir, "routerHelper.ts"), "utf8");
    assert.match(routerTs, /import\.meta\.glob\('\.\.\/views\/\*\*\/\*\.\{vue,tsx\}'\)/);
    assert.match(routerTs, /route\.path === '\/cockpit'/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("discoverCustomDomainSql: 按 schema -> audit -> rbac -> seed 确定性拓扑序发现自定义领域 SQL", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "custom-sql-order-"));
  try {
    const sqlDir = path.join(tmp, "apps/backend/sql/postgresql");
    fs.mkdirSync(sqlDir, { recursive: true });
    for (const f of [
      "ruoyi-vue-pro.sql",
      "quartz.sql",
      "di_seed.sql",
      "di_rbac_menu.sql",
      "di_schema.sql",
      "di_three_role_audit.sql",
    ]) {
      fs.writeFileSync(path.join(sqlDir, f), "-- sql\n", "utf8");
    }
    const ordered = discoverCustomDomainSql(tmp).map((p) => path.basename(p));
    assert.deepEqual(ordered, [
      "di_schema.sql",
      "di_three_role_audit.sql",
      "di_rbac_menu.sql",
      "di_seed.sql",
    ]);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("three-role-audit + lite-credentials + domain-prune: 真实 PostgreSQL 18.4 验证防篡改触发器与三员口令", async (t) => {
  const endpoint = await resolveDatabaseEndpoint({ persistent: false });
  const client = createClient(endpoint.url);
  await client.connect();

  const tmpCredDir = fs.mkdtempSync(path.join(os.tmpdir(), "three-role-cred-"));
  t.after(async () => {
    fs.rmSync(tmpCredDir, { recursive: true, force: true });
    try {
      await client.end();
    } catch {}
    try {
      await endpoint.close();
    } catch {}
  });

  // 1. 准备最小化 system_users / system_role / system_menu 表
  await client.query(`
    CREATE TABLE system_role (
      id BIGINT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      code VARCHAR(100) NOT NULL,
      sort INT NOT NULL DEFAULT 0,
      data_scope INT2 NOT NULL DEFAULT 1,
      data_scope_dept_ids VARCHAR(500) NOT NULL DEFAULT '',
      status INT2 NOT NULL DEFAULT 0,
      type INT2 NOT NULL DEFAULT 2,
      remark VARCHAR(500),
      creator VARCHAR(64),
      create_time TIMESTAMP,
      updater VARCHAR(64),
      update_time TIMESTAMP,
      deleted INT2 NOT NULL DEFAULT 0,
      tenant_id BIGINT NOT NULL DEFAULT 1
    );
    CREATE TABLE system_users (
      id BIGINT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL,
      nickname VARCHAR(50) NOT NULL,
      remark VARCHAR(500),
      dept_id BIGINT,
      post_ids VARCHAR(255),
      email VARCHAR(100),
      mobile VARCHAR(20),
      sex INT2,
      avatar VARCHAR(255),
      status INT2 NOT NULL DEFAULT 0,
      login_ip VARCHAR(50),
      login_date TIMESTAMP,
      creator VARCHAR(64),
      create_time TIMESTAMP,
      updater VARCHAR(64),
      update_time TIMESTAMP,
      deleted INT2 NOT NULL DEFAULT 0,
      tenant_id BIGINT NOT NULL DEFAULT 1
    );
    INSERT INTO system_users (id, username, password, nickname, status) VALUES
      (1, 'admin', 'weak', '超级管理员', 0),
      (2, 'demo_guest', 'weak', '演示弱账号', 0);
  `);

  // 2. 执行三员分立 + Append-Only 审计 DDL 并校验 UPDATE/DELETE 被物理拦截
  const auditSql = renderThreeRoleAuditSql({ prefix: "di" });
  await client.query(auditSql);

  const guardJava = renderThreeRoleGuardJava({ packagePrefix: "com.star_pulse.server", prefix: "di" });
  assert.match(guardJava, /class ThreeRoleGuard/);
  assert.equal(DEFAULT_ROLES.length, 4);

  const c = cred.loadOrCreateCredentials(tmpCredDir);
  assert.equal(Object.keys(c.rolePasswords).length, 4);
  const applied = await cred.applyBootstrapCredentials(client, {
    username: c.username,
    password: c.password,
    rolePasswords: c.rolePasswords,
  });
  assert.equal(applied.syncedRoleUsers.length, 4);
  assert.equal(applied.disabledSeededUsers, 1, "弱演示账号 demo_guest 应被自动禁用，三员账号保持启用");

  await client.query(`
    INSERT INTO di_security_audit_trail
      (trace_id, operator_account, operator_role, module_name, action_type, target_table, target_pk, prev_hash_sha256, integrity_sha256)
    VALUES
      ('tr-001', 'sys_admin', 'sys_admin', 'cluster', 'CREATE_NODE', 'di_node', '101', 'GENESIS', 'a1b2c3d4')
  `);

  await assert.rejects(
    () => client.query("UPDATE di_security_audit_trail SET operator_account = 'tampered' WHERE trace_id = 'tr-001'"),
    /strictly append-only/i,
    "Append-Only 触发器必须物理拦截 UPDATE"
  );
  await assert.rejects(
    () => client.query("DELETE FROM di_security_audit_trail WHERE trace_id = 'tr-001'"),
    /strictly append-only/i,
    "Append-Only 触发器必须物理拦截 DELETE"
  );

  // 3. 验证 domain-prune 的 general 画像裁剪商城/全家桶/定时任务死链且绝不反向唤醒商城
  await client.query(`
    CREATE TABLE system_menu (
      id BIGINT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      type INT2 NOT NULL,
      sort INT NOT NULL DEFAULT 0,
      parent_id BIGINT NOT NULL DEFAULT 0,
      path VARCHAR(200) NOT NULL DEFAULT '',
      component VARCHAR(200) NOT NULL DEFAULT '',
      status INT2 NOT NULL DEFAULT 0,
      visible BOOLEAN NOT NULL DEFAULT true,
      deleted INT2 NOT NULL DEFAULT 0
    );
    INSERT INTO system_menu (id, name, type, parent_id, path, component, status, visible) VALUES
      (1, '系统管理', 1, 0, '/system', '', 0, true),
      (2, '基础设施', 1, 0, '/infra', '', 0, true),
      (110, '定时任务', 2, 2, 'job', 'infra/job/index', 0, true),
      (120, '租户管理', 1, 1, 'tenant', '', 0, true),
      (449, 'MALL 商城系统', 1, 0, '/mall', '', 0, true),
      (500, 'CRM 系统', 1, 0, '/crm', '', 0, true);
  `);

  await pruneDatabaseMenus(client, "general", true);
  const activeMenus = await client.query(
    "SELECT id, name FROM system_menu WHERE visible = true AND status = 0 ORDER BY id ASC"
  );
  assert.deepEqual(
    activeMenus.rows.map((r) => r.name),
    ["系统管理", "基础设施"],
    "general 画像应彻底隐藏商城、CRM、租户管理与 /infra/job 死链"
  );
});

test("audit-23-gates --static-only 在母本仓库可直接通过 Day-0 静态门禁", () => {
  const run = spawnSync(
    process.execPath,
    [path.join(ROOT, "scripts/audit-23-gates.mjs"), "--static-only", "--json"],
    { cwd: ROOT, encoding: "utf8" }
  );
  assert.equal(run.status, 0, run.stderr || run.stdout);
  const parsed = JSON.parse(run.stdout);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.counts.total, 23);
  assert.equal(parsed.counts.fail, 0);
});
