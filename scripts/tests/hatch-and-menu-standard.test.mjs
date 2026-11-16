import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { sanitizeUpstreamMenus, UPSTREAM_MENU_RENAMES } from "../../deploy/lite/runtime/lite-pg.mjs";
import { generateEntityModule } from "../codegen-module.mjs";
import {
  pruneHistoricalArchives,
  purgeUpstreamPromoAndTutorialBloat,
  generateCleanProjectDocs,
} from "../project-reactor.mjs";

const require = createRequire(import.meta.url);
const {
  MAX_MENU_NAME_LENGTH,
  UPSTREAM_DOC_RESIDUE_REGEX,
  compactMenuName,
  isValidMenuName,
  menuCharLength,
} = require("../lib/menu-standard.cjs");
const { healDomainBlueprint } = require("../blueprint-engine.cjs");
const { scrubMotherBlueprintDocs } = require("../project-init.cjs");
const { resolveDatabaseEndpoint, createClient } = require("../lib/ephemeral-pg.cjs");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("menu-standard: compactMenuName 严格收敛任意标题至 <= 4 字且保持语义清晰", () => {
  assert.equal(compactMenuName("Redis 监控"), "缓存监控");
  assert.equal(compactMenuName("API 日志"), "接口日志");
  assert.equal(compactMenuName("数据源配置"), "库源配置");
  assert.equal(compactMenuName("系统管理"), "系统管理");
  assert.equal(compactMenuName("采购订单管理系统"), "采购订单");

  for (const sample of [
    "企业级供应商资质审核申请单管理",
    "CRM 客户线索跟进工作台",
    "跨境电商保税仓出入库台账",
    "企业全域数据集成管控平台",
    "CustomerOrderManagement",
  ]) {
    const out = compactMenuName(sample);
    assert.ok(isValidMenuName(out), `"${sample}" -> "${out}" 长度=${menuCharLength(out)} 超过 ${MAX_MENU_NAME_LENGTH}`);
  }
});

test("blueprint:doctor --write 自动将超 4 字菜单收敛至 <= 4 字并在 remark/title 保留完整标题", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bp-menu-test-"));
  const bpFile = path.join(tmpDir, "supply.blueprint.json");
  try {
    const raw = {
      domain: "supply",
      title: "企业级数字化供应链协同管理平台",
      menuName: "超长违规一级目录菜单名",
      entities: [
        {
          entity: "PurchaseAuditOrder",
          title: "大宗物资采购审批流转单",
          menuName: "大宗物资采购审批流转单管理",
          fields: "orderNo:文本:单据编号:req:search,totalAmount:金额:采购总额:req",
        },
      ],
    };
    fs.writeFileSync(bpFile, JSON.stringify(raw, null, 2), "utf8");

    const r = spawnSync(
      process.execPath,
      [path.join(ROOT, "scripts/blueprint-engine.cjs"), "doctor", "--file", bpFile, "--write"],
      { cwd: ROOT, encoding: "utf8" }
    );
    assert.equal(r.status, 0, r.stderr || r.stdout);

    const saved = JSON.parse(fs.readFileSync(bpFile, "utf8"));
    assert.ok(isValidMenuName(saved.menuName), `领域 menuName 未收敛至 <=4 字: ${saved.menuName}`);
    assert.equal(saved.title, "企业级数字化供应链协同管理平台");
    assert.equal(saved.remark, "企业级数字化供应链协同管理平台");

    const ent = saved.entities[0];
    assert.ok(isValidMenuName(ent.menuName), `实体 menuName 未收敛至 <=4 字: ${ent.menuName}`);
    assert.equal(ent.title, "大宗物资采购审批流转单");
    assert.equal(ent.remark, "大宗物资采购审批流转单");

    const { fixes } = healDomainBlueprint(raw);
    assert.ok(fixes.some((f) => f.includes("自愈")), "doctor 应记录超 4 字菜单自愈日志");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("codegen-module: 支持 --menu-name <=4 字或自动收敛超长标题，Java OpenAPI 保留完整 --title", () => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "codegen-menu-test-"));
  try {
    const appDir = path.join(tmpRoot, "apps/backend/server/src/main/java/com/acme/demo/server");
    fs.mkdirSync(appDir, { recursive: true });
    fs.writeFileSync(
      path.join(appDir, "DemoServerApplication.java"),
      "package com.acme.demo.server;\npublic class DemoServerApplication {}\n",
      "utf8"
    );

    const fullTitle = "异构数据库实时增量同步链路配置表";
    const res = generateEntityModule(
      {
        module: "di",
        entity: "SyncPipeline",
        title: fullTitle,
        parentMenuName: "数据集成管控中心",
        fields: "pipelineCode:string:链路编码:req:search,lagMs:int:延迟毫秒:req",
        force: true,
      },
      tmpRoot
    );

    assert.ok(isValidMenuName(res.menuName), `menuName="${res.menuName}" 必须 <=4 字`);
    assert.ok(isValidMenuName(res.parentMenuName), `parentMenuName="${res.parentMenuName}" 必须 <=4 字`);
    assert.equal(res.title, fullTitle);

    const ctrlJava = fs.readFileSync(
      path.join(
        tmpRoot,
        "apps/backend/server/src/main/java/com/acme/demo/module/di/controller/admin/SyncPipelineController.java"
      ),
      "utf8"
    );
    assert.ok(ctrlJava.includes(`@Tag(name = "管理后台 - ${fullTitle}")`), "OpenAPI @Tag 必须保留完整业务标题");

    const mysqlSql = fs.readFileSync(
      path.join(tmpRoot, "apps/backend/sql/mysql/di_sync_pipeline.sql"),
      "utf8"
    );
    const pgSql = fs.readFileSync(
      path.join(tmpRoot, "apps/backend/sql/postgresql/di_sync_pipeline.sql"),
      "utf8"
    );

    for (const sqlText of [mysqlSql, pgSql]) {
      assert.ok(sqlText.includes(fullTitle), "SQL 注释/表说明应保留完整业务标题");
      for (const m of sqlText.matchAll(/VALUES\s*\(\s*(?:[a-zA-Z0-9_]+\s*,\s*)?'([^']+)'\s*,\s*'[^']*'\s*,\s*([12])\s*,/g)) {
        assert.ok(
          isValidMenuName(m[1]),
          `生成的 system_menu(type=${m[2]}) name="${m[1]}" 超过 4 字`
        );
      }
    }
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
});

test("lite-pg sanitizeUpstreamMenus: 真实 PostgreSQL 验证 17/88/195 4字归一化与上游推广外链隐藏", async (t) => {
  const endpoint = await resolveDatabaseEndpoint({ persistent: false });
  const client = createClient(endpoint.url);
  await client.connect();

  t.after(async () => {
    try {
      await client.end();
    } catch {}
    try {
      await endpoint.close();
    } catch {}
  });

  await client.query(`
    DROP TABLE IF EXISTS system_menu CASCADE;
    CREATE TABLE system_menu (
      id BIGINT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      type INT2 NOT NULL,
      parent_id BIGINT NOT NULL DEFAULT 0,
      path VARCHAR(200) NOT NULL DEFAULT '',
      status INT2 NOT NULL DEFAULT 0,
      visible BOOLEAN NOT NULL DEFAULT true,
      deleted INT2 NOT NULL DEFAULT 0
    );

    INSERT INTO system_menu (id, name, type, parent_id, path, status, visible) VALUES
      (1, '系统管理', 1, 0, '/system', 0, true),
      (2, '基础设施', 1, 0, '/infra', 0, true),
      (17, 'Redis 监控', 2, 2, 'redis', 0, true),
      (88, 'API 日志', 2, 2, 'log', 0, true),
      (195, '数据源配置', 2, 2, 'data-source-config', 0, true),
      (194, '作者动态', 1, 0, 'https://www.iocoder.cn', 0, true),
      (347, 'Boot 开发文档', 1, 0, 'https://doc.iocoder.cn/', 0, true),
      (348, 'Cloud 开发文档', 1, 0, 'https://cloud.iocoder.cn', 0, true),
      (901, '官方源码', 1, 0, 'https://github.com/example', 0, true),
      (902, '交流社区', 1, 0, 'https://iocoder.cn/community', 0, true);
  `);

  const res = await sanitizeUpstreamMenus(client);
  assert.ok(res.renamedCount >= 3);
  assert.ok(res.hiddenPromoCount >= 5);

  const byIdRes = await client.query("SELECT id, name, visible, status FROM system_menu ORDER BY id ASC");
  const byId = new Map(byIdRes.rows.map((r) => [Number(r.id), r]));
  assert.equal(byId.get(17).name, "缓存监控");
  assert.equal(byId.get(88).name, "接口日志");
  assert.equal(byId.get(195).name, "库源配置");

  for (const promoId of [194, 347, 348, 901, 902]) {
    assert.equal(byId.get(promoId).visible, false, `推广菜单 id=${promoId} 必须隐藏`);
    assert.equal(Number(byId.get(promoId).status), 1, `推广菜单 id=${promoId} 必须停用`);
  }

  const violations = await client.query(
    "SELECT id, name FROM system_menu WHERE deleted = 0 AND visible = true AND status = 0 AND type IN (1, 2) AND char_length(name) > 4"
  );
  assert.equal(violations.rows.length, 0, `不得存在 >4 字可见目录/页面菜单: ${JSON.stringify(violations.rows)}`);
  assert.ok(Object.keys(UPSTREAM_MENU_RENAMES).length >= 15);
});

test("project-reactor: 物理清理上游教程/.image/*-ui 并生成零上游残留的多端 README/CLAUDE/HARNESS", () => {
  const tmpTarget = fs.mkdtempSync(path.join(os.tmpdir(), "reactor-clean-test-"));
  try {
    const writeRel = (rel, body = "placeholder") => {
      const abs = path.join(tmpTarget, rel);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, body, "utf8");
    };

    writeRel("apps/backend/pom.xml", "<project><modules><module>server</module></modules></project>");
    writeRel("apps/backend/README.md", "上海艰苦奋斗 https://cloud.iocoder.cn 艿艿 img.shields.io");
    writeRel("apps/admin/README.md", "上海艰苦奋斗 https://doc.iocoder.cn 艿艿");
    writeRel("apps/miniapp/README.md", "上海艰苦奋斗 https://doc.iocoder.cn 艿艿");
    writeRel("apps/backend/.image/qr.png", "bin");
    writeRel("apps/admin/.image/demo.png", "bin");
    writeRel("apps/miniapp/.image/mall.png", "bin");
    writeRel("apps/backend/.gitee/ISSUE_TEMPLATE.md", "issue");
    writeRel("apps/backend/.github/ISSUE_TEMPLATE/question.md", "q");
    writeRel("apps/backend/script/livekit-poc/README.md", "poc");
    writeRel("apps/backend/yudao-ui/yudao-ui-admin-vue3/README.md", "stub");
    writeRel("apps/backend/nebula-ops-ui/README.md", "stub2");
    writeRel("apps/backend/yudao-framework/redis/《芋道 Spring Boot Redis 入门》.md", "tutorial");
    writeRel("apps/backend/module-crm/convert/《芋道 Spring Boot 对象转换 MapStruct 入门》.md", "tutorial");

    purgeUpstreamPromoAndTutorialBloat(tmpTarget);
    generateCleanProjectDocs(tmpTarget, {
      projectName: "nebula-ops",
      projectTitle: "星云智能运维管控平台",
      groupId: "com.nebula_ops",
      packageName: "com.nebula_ops.server",
      basePath: "/nebula-ops",
      port: 48080,
      gatewayPort: 48120,
    });

    for (const removed of [
      "apps/backend/.image",
      "apps/admin/.image",
      "apps/miniapp/.image",
      "apps/backend/.gitee",
      "apps/backend/.github",
      "apps/backend/script/livekit-poc",
      "apps/backend/yudao-ui",
      "apps/backend/nebula-ops-ui",
      "apps/backend/yudao-framework/redis/《芋道 Spring Boot Redis 入门》.md",
      "apps/backend/module-crm/convert/《芋道 Spring Boot 对象转换 MapStruct 入门》.md",
    ]) {
      assert.equal(fs.existsSync(path.join(tmpTarget, removed)), false, `应物理删除 ${removed}`);
    }

    for (const cleanDoc of [
      "README.md",
      "CLAUDE.md",
      "HARNESS.md",
      "apps/backend/README.md",
      "apps/admin/README.md",
      "apps/miniapp/README.md",
    ]) {
      const text = fs.readFileSync(path.join(tmpTarget, cleanDoc), "utf8");
      assert.doesNotMatch(text, UPSTREAM_DOC_RESIDUE_REGEX, `${cleanDoc} 不得残留任何上游作者或推广外链`);
      assert.ok(text.includes("nebula-ops") || text.includes("星云智能运维管控平台"));
    }
  } finally {
    fs.rmSync(tmpTarget, { recursive: true, force: true });
  }
});

test("project-init / project-reactor: 孵化层 B 客户工作区时显式剥离母本归档/回灌审计/DAR/ADR/瞬态快照并保留干净 CMMI 00..09 + ontology", () => {
  for (const cleaner of [pruneHistoricalArchives, scrubMotherBlueprintDocs]) {
    const tmpTarget = fs.mkdtempSync(path.join(os.tmpdir(), "hatch-doc-scrub-test-"));
    try {
      const writeRel = (rel, body = "content") => {
        const abs = path.join(tmpTarget, rel);
        fs.mkdirSync(path.dirname(abs), { recursive: true });
        fs.writeFileSync(abs, body, "utf8");
      };

      // 注入模拟母本污染文档与运行时快照
      writeRel("docs/specs/archive/2026-Q4/platform/old-mother-spec/brief.json", "{}");
      writeRel("docs/00_meta_standards/blueprint-backport-audit.md", "# audit");
      writeRel("docs/01_management/dar/DAR-20261021-lite-runtime-dependencies.md", "# dar");
      writeRel("docs/01_management/dar-decision-records/DAR-001.md", "# dar2");
      writeRel("docs/03_design/adr/ADR-001.md", "# adr");
      writeRel("docs/architecture/artifacts/agent-route-last.json", "{}");
      writeRel("docs/artifacts/socratic-inquiry-latest.json", "{}");
      writeRel("docs/artifacts/env-fingerprint.json", "{}");

      // 注入应当保留的 CMMI 00..09 通用模板与活体本体
      writeRel("docs/00_meta_standards/README.md", "# 00");
      writeRel("docs/01_management/project-charter.md", "# 01");
      writeRel("docs/03_design/architecture-design-hld.md", "# 03");
      writeRel("docs/09_operations/tenant-governance.md", "# 09");
      writeRel("docs/ontology/ontology.yaml", "version: '1.0.0'\n");

      cleaner(tmpTarget);

      for (const purged of [
        "docs/specs/archive",
        "docs/00_meta_standards/blueprint-backport-audit.md",
        "docs/01_management/dar/DAR-20261021-lite-runtime-dependencies.md",
        "docs/01_management/dar-decision-records",
        "docs/03_design/adr/ADR-001.md",
        "docs/architecture/artifacts",
        "docs/artifacts",
      ]) {
        assert.equal(fs.existsSync(path.join(tmpTarget, purged)), false, `${cleaner.name} 必须剥离 ${purged}`);
      }

      for (const kept of [
        "docs/specs/.gitkeep",
        "docs/01_management/dar/.gitkeep",
        "docs/03_design/adr/.gitkeep",
        "docs/00_meta_standards/README.md",
        "docs/01_management/project-charter.md",
        "docs/03_design/architecture-design-hld.md",
        "docs/09_operations/tenant-governance.md",
        "docs/ontology/ontology.yaml",
      ]) {
        assert.equal(fs.existsSync(path.join(tmpTarget, kept)), true, `${cleaner.name} 必须保留 ${kept}`);
      }
    } finally {
      fs.rmSync(tmpTarget, { recursive: true, force: true });
    }
  }
});
