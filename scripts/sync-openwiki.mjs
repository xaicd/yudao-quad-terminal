#!/usr/bin/env node
/**
 * scripts/sync-openwiki.mjs
 *
 * Yudao Quad-Terminal (v1.2.0) OpenWiki 动态知识库生成与自愈校验引擎
 *
 * 核心定位：
 * 1. 所有 OpenWiki 词条统一收敛于 `docs/wiki/`（严禁在仓库根目录生成 `wiki/` 或 `openwiki` 软链）；
 * 2. 100% 基于本仓真实技术栈与元数据（`scripts/lib/module-catalog.mjs` 19 物理业务模块 + `online` 低代码域 = 20 领域词条）动态生成，彻底清除外部控制面与无关项目的串味残留；
 * 3. 与 `scripts/gate-check.mjs` 的 `openwiki` 和 `skills` 双门禁闭环联动。
 *
 * 用法:
 *   node scripts/sync-openwiki.mjs          # 生成并同步 docs/wiki/ 目录
 *   node scripts/sync-openwiki.mjs --write  # 显式写入
 *   node scripts/sync-openwiki.mjs --check  # CI 门禁：校验词条同步且无多余残留词条
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MODULES, NON_TRIM_JAVA_FILES, PROFILES } from "./lib/module-catalog.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const WIKI_DIR = path.join(ROOT, "docs", "wiki");
const checkOnly = process.argv.includes("--check");

const generatedFiles = new Map();

/** 允许由其他工具在 docs/wiki/ 下维护的伴生文件 */
const EXTERNAL_WIKI_FILES = new Set([
  "context-snapshot.json",
  "architecture/api-digest.md",
]);

function readPkgVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    return pkg.version || "1.2.0";
  } catch {
    return "1.2.0";
  }
}

function listRecipes() {
  const dir = path.join(ROOT, ".agents/workflows");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".workflow.json")).sort()
    : [];
  return files.map((f) => {
    let name = f.replace(/\.workflow\.json$/, "");
    let desc = "";
    let steps = 0;
    try {
      const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      name = j.name || name;
      desc = j.description || "";
      steps = Array.isArray(j.steps) ? j.steps.length : 0;
    } catch {
      /* ignore malformed json */
    }
    return { file: f, name, desc, steps };
  });
}

function countPgTables() {
  const baseSql = path.join(ROOT, "apps/backend/sql/postgresql/ruoyi-vue-pro.sql");
  const quartzSql = path.join(ROOT, "apps/backend/sql/postgresql/quartz.sql");
  const countIn = (p) =>
    fs.existsSync(p) ? (fs.readFileSync(p, "utf8").match(/CREATE TABLE /gi) || []).length : 0;
  const core = countIn(baseSql);
  const quartz = countIn(quartzSql);
  return { core, quartz, total: core + quartz };
}

function countSkills() {
  const skillsDir = path.join(ROOT, ".agents/skills");
  if (!fs.existsSync(skillsDir)) return 0;
  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(skillsDir, d.name, "SKILL.md"))).length;
}

function countSpecs() {
  const specsDir = path.join(ROOT, "docs/specs");
  if (!fs.existsSync(specsDir)) return 0;
  let count = 0;
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === "brief.json") count++;
    }
  };
  walk(specsDir);
  return count;
}

function countBackendModulesOnDisk() {
  const backendDir = path.join(ROOT, "apps/backend");
  if (!fs.existsSync(backendDir)) return MODULES.length;
  const found = fs
    .readdirSync(backendDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && (d.name.startsWith("yudao-module-") || d.name.startsWith("module-"))).length;
  return found || MODULES.length;
}

const DOMAIN_ENRICHMENTS = {
  system: {
    apiPrefix: "/admin-api/system/** & /app-api/system/**",
    adminView: "apps/admin/src/views/system",
    tables: "system_users, system_role, system_menu, system_dept, system_tenant, system_dict_type, system_operate_log",
    summary: "多租户隔离（TenantDatabaseInterceptor）、RBAC 菜单与行级数据权限（@DataPermission）、OAuth2 双 Token 鉴权、字典与操作审计底座。",
  },
  infra: {
    apiPrefix: "/admin-api/infra/** & /v3/api-docs",
    adminView: "apps/admin/src/views/infra",
    tables: "infra_config, infra_file, infra_data_source_config, infra_api_access_log, infra_api_error_log, infra_codegen_table",
    summary: "动态参数配置、S3/本地文件存储、多数据源管理、API 访问/异常日志、Redis/Druid 监控与 Codegen 元数据管理。",
  },
  member: {
    apiPrefix: "/admin-api/member/** & /app-api/member/**",
    adminView: "apps/admin/src/views/member",
    tables: "member_user, member_level, member_tag, member_group, member_point_record, member_sign_in_record, member_address",
    summary: "C 端会员全生命周期（微信小程序静默登录、手机验证码/密码登录、等级成长值、积分签到与收货地址）。",
  },
  pay: {
    apiPrefix: "/admin-api/pay/** & /app-api/pay/**",
    adminView: "apps/admin/src/views/pay",
    tables: "pay_app, pay_channel, pay_order, pay_refund, pay_transfer, pay_wallet, pay_notify_task",
    summary: "微信支付 V3、支付宝、会员储值钱包等多渠道收单、退款、转账与异步回调幂等通知引擎。",
  },
  mall: {
    apiPrefix: "/admin-api/{product,promotion,trade,statistics}/** & /app-api/{product,promotion,trade}/**",
    adminView: "apps/admin/src/views/mall",
    tables: "product_spu, product_sku, trade_order, trade_order_item, trade_after_sale, promotion_coupon, promotion_seckill_activity",
    summary: "聚合商品中心（product）、营销裂变（promotion：拼团/秒杀/砍价/优惠券/分销）、交易履约（trade）与经营统计（statistics）四大子服务。",
  },
  crm: {
    apiPrefix: "/admin-api/crm/**",
    adminView: "apps/admin/src/views/crm",
    tables: "crm_clue, crm_customer, crm_contact, crm_business, crm_contract, crm_receivable, crm_permission",
    summary: "线索公海池、客户画像、联系人、商机推进漏斗、合同审批与回款计划，支持团队成员级数据权限协同。",
  },
  erp: {
    apiPrefix: "/admin-api/erp/**",
    adminView: "apps/admin/src/views/erp",
    tables: "erp_product, erp_purchase_order, erp_purchase_in, erp_sale_order, erp_sale_out, erp_stock, erp_finance_payment",
    summary: "采购申请/订单/入库、销售订单/出库、多仓库存台账调拨及供应商/客户往来应收应付结算。",
  },
  bpm: {
    apiPrefix: "/admin-api/bpm/**",
    adminView: "apps/admin/src/views/bpm",
    tables: "bpm_process_definition_info, bpm_form, bpm_user_group, bpm_process_instance_copy, bpm_category",
    summary: "基于 Flowable 的 BPMN 2.0 / 钉钉风格流程设计器、动态表单、会签/或签/委派/回退及 OA/HRM/FMS 跨模块审批编排。",
  },
  ai: {
    apiPrefix: "/admin-api/ai/** & /app-api/ai/**",
    adminView: "apps/admin/src/views/ai",
    tables: "ai_api_key, ai_model, ai_chat_conversation, ai_chat_message, ai_knowledge, ai_knowledge_document, ai_write, ai_mind_map",
    summary: "基于 JDK 17 + Spring AI 的多模型路由、流式对话、RAG 企业知识库检索、AI 写作与思维导图生成能力。",
  },
  mp: {
    apiPrefix: "/admin-api/mp/**",
    adminView: "apps/admin/src/views/mp",
    tables: "mp_account, mp_user, mp_tag, mp_menu, mp_message, mp_auto_reply, mp_material",
    summary: "微信公众号多账号托管、粉丝标签管理、自定义菜单发布、素材库同步与关键词自动回复。",
  },
  report: {
    apiPrefix: "/admin-api/report/**",
    adminView: "apps/admin/src/views/report",
    tables: "report_goview_project, jimu_report",
    summary: "GoView 可视化大屏工程托管与积木报表（JimuReport）在线配置及权限受控预览。",
  },
  iot: {
    apiPrefix: "/admin-api/iot/**",
    adminView: "apps/admin/src/views/iot",
    tables: "iot_product, iot_device, iot_thing_model, iot_device_group, iot_ota_firmware, iot_scene_rule",
    summary: "物联网产品物模型（属性/事件/服务）、设备上下线状态、MQTT/HTTP 插件接入、场景联动规则与 OTA 固件升级。",
  },
  mes: {
    apiPrefix: "/admin-api/mes/**",
    adminView: "apps/admin/src/views/mes",
    tables: "mes_md_item, mes_pro_workorder, mes_pro_route, mes_pro_feedback, mes_qc_iqc, mes_qc_ipqc, mes_dv_machinery",
    summary: "制造执行系统全链路：主数据物料 BOM、生产工单排程、工艺路线报工、IQC/IPQC/OQC 质量检验与设备台账点检。",
  },
  wms: {
    apiPrefix: "/admin-api/wms/**",
    adminView: "apps/admin/src/views/wms",
    tables: "wms_warehouse, wms_area, wms_location, wms_receipt_order, wms_shipment_order, wms_inventory, wms_check_order",
    summary: "精细化仓库/库区/库位三级拓扑、入库上架、波次拣货出库、移库盘点与批次库存追踪。",
  },
  oa: {
    apiPrefix: "/admin-api/oa/**",
    adminView: "apps/admin/src/views/oa",
    tables: "oa_attendance_group, oa_attendance_record, oa_meeting_room, oa_meeting_booking, oa_car, oa_seal_apply",
    summary: "企业协同办公：考勤班次打卡、会议室预约、车辆调度、用印申请及与 BPM 引擎联动的行政审批流。",
  },
  hrm: {
    apiPrefix: "/admin-api/hrm/**",
    adminView: "apps/admin/src/views/hrm",
    tables: "hrm_employee, hrm_job_post, hrm_recruit_candidate, hrm_contract, hrm_salary_archive, hrm_performance_plan",
    summary: "人力资源全模块：招聘候选人、员工花名册入转调离、劳动合同、薪资社保核算与绩效考核联动。",
  },
  fms: {
    apiPrefix: "/admin-api/fms/**",
    adminView: "apps/admin/src/views/fms",
    tables: "fms_account, fms_subject, fms_voucher, fms_expense_reimburse, fms_invoice, fms_receivable_bill",
    summary: "企业业财一体财务核算：会计科目、记账凭证、费用报销审批（强依赖 BPM）、发票台账与资金收支对账。",
  },
  pms: {
    apiPrefix: "/admin-api/pms/**",
    adminView: "apps/admin/src/views/pms",
    tables: "pms_project, pms_milestone, pms_task, pms_work_log, pms_iteration, pms_member",
    summary: "项目集与研发协同管理：项目立项、里程碑计划、WBS 任务看板、工时填报与迭代交付追踪。",
  },
  im: {
    apiPrefix: "/admin-api/im/** & /app-api/im/**",
    adminView: "apps/admin/src/views/im",
    tables: "im_conversation, im_message, im_group, im_group_member, im_contact",
    summary: "企业内外部即时通讯：单聊/群聊会话、WebSocket 实时消息推送、已读回执与会话归档审计。",
  },
};

// ==========================================
// 1. 生成 docs/wiki/index.md
// ==========================================
function buildIndexMd() {
  const version = readPkgVersion();
  const skills = countSkills();
  const recipes = listRecipes();
  const modules = countBackendModulesOnDisk();
  const pg = countPgTables();
  const specs = countSpecs();

  const recipeLines = recipes.length
    ? recipes.map((r) => `   - \`${r.name}\`（${r.steps} 步）：${r.desc}`).join("\n")
    : "   - 当前无（`.agents/workflows/` 为空）";

  const domainLinks = [
    ...MODULES.map((m) => `- [\`${m.id}\` · ${m.label}（${m.javaFiles} Java 文件）](domains/${m.id}.md)`),
    `- [\`online\` · 声明式蓝图与在线低代码生成引擎](domains/online.md)`,
  ].join("\n");

  const content = `# Yudao Quad-Terminal OpenWiki（\`v${version}\` 动态知识大脑）

> **面向 AI 数字员工与架构师的首屏全息索引**：本知识库统一落盘于 \`docs/wiki/\`，由 \`scripts/sync-openwiki.mjs\` 从仓库真实模块清单（\`scripts/lib/module-catalog.mjs\`）、SQL 建表脚本与 CMMI 00~09 规范自动生成并通过 \`openwiki\` 门禁防漂移校验。进场接单请优先检索本索引与 \`pnpm ctx:query <keyword>\`，严禁全盘盲扫数千 Java/Vue 源码。

---

## 📌 本仓实时事实基线（磁盘实测自动计算）

| 事实维度 | 实测值 | 唯一真源 |
|---|---|---|
| 底座模板版本 | **\`v${version}\`** | \`package.json\` · \`compat-manifest.json\` |
| 四端工程拓扑 | **4 端同源** | \`apps/backend\` + \`apps/admin\` + \`apps/miniapp\` + \`apps/app\` |
| 后端物理业务模块数 | **${modules}**（含在线代码生成共 **20** 业务域） | \`apps/backend/yudao-module-*\` · \`scripts/lib/module-catalog.mjs\` |
| 官方 PostgreSQL 建表数 | **${pg.total}**（核心 \`${pg.core}\` + Quartz \`${pg.quartz}\`） | \`apps/backend/sql/postgresql/{ruoyi-vue-pro,quartz}.sql\` |
| Agent 专属技能数 | **${skills}** | \`.agents/skills/*/SKILL.md\` |
| SDD 工作流配方数 | **${recipes.length}** | \`.agents/workflows/*.workflow.json\` |
| 当前活跃特性规格数 | **${specs}** | \`docs/specs/**/brief.json\` |

---

## ⚡ 核心工程公理（Quad-Terminal Axioms）

1. **只读上游子模块 + 主仓声明式补丁**：\`apps/{backend,admin,miniapp}\` 钉在远端真实存在的纯上游提交，代码级定制收敛于 \`deploy/patches/<submodule>/*.patch\`（\`pnpm patch:apply\` 幂等注入，\`submodule-patches\` 门禁强校验）。
2. **零 Docker 嵌入式真库闭环（\`lite\` 档）**：本地无需 Docker 或外部数据库，\`pnpm lite:up\` / \`pnpm lite:verify\` 秒级拉起 **Embedded PostgreSQL 18.4 + Embedded Redis**，引导凭据由 CSPRNG 动态签发至 \`0600\` 凭据文件，严禁弱口令与假 Mock。
3. **\`<500 Tokens\` 蓝图全栈同源展开**：业务模块优先通过 \`scripts/blueprint-engine.cjs\`（\`pnpm blueprint:doctor\` → \`pnpm blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e\`）自动生成 16 份 Spec 资产、Java 6 层代码、Vue 3 页面、TS SDK 与双库 DDL。
4. **双支柱生命周期治理（与姊妹基座 \`cooliebase-all v1.5.0\` 100% 同名同参）**：\`harness\`（\`HARNESS.md\` + \`scripts/harness.cjs\`）统管 9 阶段运行生命周期；\`speckit\` + CMMI 00~09（\`scripts/cmmi-00-meta.cjs\` ~ \`scripts/cmmi-09-operations.cjs\`）统管宏观工程文档与特性规格文档。
5. **全仓文档统一归口 \`docs/\` & 导航菜单 \`<= 4\` 字**：所有过程文档、规格（\`docs/specs/\`）、知识库（\`docs/wiki/\`）、Release 说明（\`docs/07_release/releases/\`）与审计报告（\`docs/audit/\`）一律归口 \`docs/\`，严禁顶层并行文档目录；可见目录/页面菜单严格满足 \`char_length(name) <= 4\`。

---

## 🚀 高频能力速查（Agent 优先复用）

| 能力 | 标准命令 | 唯一真源 |
|---|---|---|
| PMO 首屏待办雷达 | \`pnpm pmo\` | \`scripts/cmmi-01-management.cjs\` |
| 统一门禁（fast 17 / full 20 项） | \`pnpm check\` / \`pnpm gate:fast\` / \`pnpm gate:full\` | \`scripts/gate-check.cjs\` |
| 下游兼容契约与门禁反向控制 | \`pnpm compat:check\` / \`pnpm harness:controls\` | \`compat-manifest.json\` |
| 净室骨架孵化与金路径验证 | \`pnpm project:hatch\` / \`pnpm project:init\` / \`pnpm harness:hatch\` | \`scripts/project-reactor.mjs\` |
| \`<500 Tokens\` 蓝图真库交付 | \`pnpm blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e\` | \`scripts/blueprint-engine.cjs\` |
| lite 零 Docker 真 PG + 真 Redis | \`pnpm lite:up\` / \`pnpm lite:verify\` / \`pnpm lite:down\` | \`deploy/lite/README.md\` |
| 19 模块依赖闭包裁剪 | \`pnpm trim:modules --profile lite --dry-run\` | \`scripts/lib/module-catalog.mjs\` |
| 上下文 ~150 Token 精准切片 | \`pnpm ctx:query <keyword>\` | \`scripts/agent-context-compressor.mjs\` |
| 离线骨架包与 Release 制品打包 | \`pnpm release:package\` | \`scripts/build-release-assets.cjs\` |
| MCP 无头编排端点（8 工具） | \`cmd mcp list\` | \`.agents/skills/yudao-mcp-server/SKILL.md\` |

---

## 🔄 SDD 多智能体工作流引擎与配方

1. **配方真源**：\`.agents/workflows/*.workflow.json\`，由 \`scripts/workflow-engine.cjs\`（\`pnpm workflow:list\` / \`workflow:check\` / \`workflow:dry-run\` / \`workflow:run\`）驱动：
${recipeLines}
2. **CMMI 00~09 过程资产脚手架**：由 \`pnpm cmmi:asset new --phase <00..09> --type <type>\` 生成骨架，\`pnpm cmmi:asset:check\` 校验零 TODO 占位残留。

---

## 🧭 CMMI 00~09 全生命周期阶段导航

| 阶段代码 | 阶段名称 | 核心专属 Skills | 阶段百科词条 |
|---|---|---|---|
| **00** | 规范与元契约 | \`cmmi-asset-authoring\` | [00_meta_standards.md](stages/00_meta_standards.md) |
| **01** | 立项策划与沙箱孵化 | \`cmmi-asset-authoring\`, \`dar-decision-matrix\`, \`yudao-cloud-bootstrap\` | [01_management.md](stages/01_management.md) |
| **02** | 需求工程与 EARS 规格 | \`cmmi-asset-authoring\`, \`ears-spec-writer\` | [02_requirements.md](stages/02_requirements.md) |
| **03** | 架构设计与蓝图自愈 | \`cmmi-asset-authoring\`, \`archify\` | [03_design.md](stages/03_design.md) |
| **04** | 四端实现与契约同步 | \`cmmi-asset-authoring\`, \`yudao-backend-dev\`, \`yudao-admin-vue3\`, \`yudao-miniapp-dev\`, \`yudao-expo-app\`, \`yudao-contract-sync\`, \`yudao-local-stack\`, \`mutation-tester\`, \`yudao-mcp-server\` | [04_implementation.md](stages/04_implementation.md) |
| **05** | 真库 E2E 与变异打假 | \`cmmi-asset-authoring\`, \`mutation-tester\`, \`yudao-cmmi-gatekeeper\` | [05_verification.md](stages/05_verification.md) |
| **06** | 质量门禁与配置审计 | \`cmmi-asset-authoring\`, \`yudao-cmmi-gatekeeper\` | [06_quality_assurance.md](stages/06_quality_assurance.md) |
| **07** | 制品指纹与发布割接 | \`cmmi-asset-authoring\` | [07_release.md](stages/07_release.md) |
| **08** | SRE 可靠性与红队渗透 | \`cmmi-asset-authoring\`, \`sre-slo-manager\`, \`postmortem-analyzer\`, \`strix-penetration-testing\` | [08_sre.md](stages/08_sre.md) |
| **09** | 多租户运营与财务平账 | \`cmmi-asset-authoring\`, \`financial-reconciliation-agent\` | [09_operations.md](stages/09_operations.md) |

---

## 📚 核心架构支柱（Architecture Pillars）

- [四位一体多端同源拓扑与四平面 Caddy 网关](architecture/quad-terminal-topology.md)
- [只读上游子模块、声明式补丁与净室派生引擎](architecture/submodule-patches-and-clean-hatch.md)
- [零 Docker 嵌入式 PostgreSQL 18.4 + Redis 运行栈](architecture/zero-docker-lite-stack.md)
- [声明式蓝图引擎、代码生成与 19 模块闭包裁剪](architecture/blueprint-and-module-trimming.md)
- [双支柱治理：Harness 9 阶段生命周期 × Spec-Kit CMMI 00~09](architecture/two-pillar-harness-speckit.md)
- [活体业务本体、OpenAPI 强类型 SDK 与契约基线防漂移](architecture/living-ontology-and-contract-sync.md)
- [全域 REST 控制器与数据库物理表浓缩卡片（自动扫描）](architecture/api-digest.md)

---

## 🏛️ 20 大业务领域全景字典（Business Domains）

${domainLinks}

---

## ⚠️ 高频工程避坑实录（Battle-Tested Gotchas）

- [两步 Maven 构建防嵌套 Fat-Jar 扫描失效](gotchas/maven-two-step-fatjar.md)
- [PostgreSQL 18.4 Druid 连接池句柄关闭陷阱与登录加密](gotchas/postgres-druid-and-api-encrypt.md)
- [连字符项目名五态标识符推导与 4 字导航菜单硬约束](gotchas/hyphen-slug-and-menu-standard.md)
- [Expo SDK 52 OTA 版本对齐与 PNPM Hoisted 构建解析](gotchas/expo-ota-and-pnpm-hoisted.md)
`;

  generatedFiles.set("index.md", content);
}

// ==========================================
// 2. 生成 docs/wiki/stages/*.md (CMMI 00~09)
// ==========================================
function buildStages() {
  const stages = [
    {
      code: "00",
      file: "00_meta_standards.md",
      title: "00 规范与元契约 (Meta Standards & Constitution)",
      skills: ["cmmi-asset-authoring"],
      cli: "pnpm run speckit -- cmmi 00 [docs|check|constitution|schema|sync]",
      gates: "openwiki、skills、compat、menu-standard 门禁全绿",
      artifacts: "docs/00_meta_standards/README.md、.specify/memory/constitution.md、AGENTS.md、HARNESS.md、docs/wiki/index.md",
      blockedBy: "顶层散落非 docs/ 文档目录、悬空技能引用或契约失真严禁入仓",
      desc: "治理工程宪法、18 个专属 Agent Skills 注册一致性、Blueprint JSON Schema 与全仓 docs/ 单一文档归口准则。",
    },
    {
      code: "01",
      file: "01_management.md",
      title: "01 立项策划、DAR 选型与沙箱孵化 (PMO, DAR & Clean Hatch)",
      skills: ["cmmi-asset-authoring", "dar-decision-matrix", "yudao-cloud-bootstrap"],
      cli: "pnpm pmo / node scripts/cmmi-01-management.cjs [pmo|docs|check|asset|init|render]",
      gates: "PMO 待办大盘同步、DAR 加权选型完备、harness:hatch 20 项断言全绿",
      artifacts: "docs/01_management/ (pmo-dashboard.md, project-charter.md, project-plan.md, project-summary-report.md, risk-register.md, dar/)",
      blockedBy: "污染母本工作区、缺少风险缓释预案或未经净室白标脱敏严禁派生交付",
      desc: "提供 0.5 秒 PMO 待办雷达、JDK 变体与模块裁剪选型（mini/lite/full），以及零 Git 历史净室白标孵化（project:init / project:hatch）。",
    },
    {
      code: "02",
      file: "02_requirements.md",
      title: "02 需求分诊与 EARS 规格工程 (Triage, SRS & RTM)",
      skills: ["cmmi-asset-authoring", "ears-spec-writer"],
      cli: "pnpm agent:route / node scripts/cmmi-02-requirements.cjs [docs|check|asset|route|new|build]",
      gates: "specs:health 校验 16 份规格资产 + brief.json 8 要素完备且零占位符",
      artifacts: "docs/02_requirements/ (software-requirements.md, rtm-traceability-matrix.md, non-functional-reqs.md, user-requirements.md, uat-acceptance-certificate.md) 与 docs/specs/<domain>/<name>/",
      blockedBy: "含 TODO/待填 假资产或缺少 EARS 确定性验收准则严禁进入编码",
      desc: "通过确定性需求分诊器判定 SPEC_REQUIRED / DIRECT_OK，并以 IEEE 29148 / EARS 句式建立需求到接口与测试的双向追溯矩阵。",
    },
    {
      code: "03",
      file: "03_design.md",
      title: "03 架构设计、ERD 与蓝图自愈 (HLD, ERD & Blueprint Doctor)",
      skills: ["cmmi-asset-authoring", "archify"],
      cli: "pnpm blueprint:doctor / node scripts/cmmi-03-design.cjs [docs|check|asset|doctor|compile-domain]",
      gates: "蓝图 menuName <= 4 字校验通过、多租户 TenantBaseDO 8 大审计字段齐备",
      artifacts: "docs/03_design/ (architecture-design-hld.md, database-design-erd.md, adr/, diagrams/, detailed-design-lld/, interface-contracts/) 与 docs/ontology/*.yaml",
      blockedBy: "缺少 tenant_id 行级隔离、超 4 字违规导航菜单或跨模块循环依赖严禁通过设计门禁",
      desc: "确立四平面同源网关拓扑、MyBatis-Plus 多租户物理/逻辑隔离模型，并通过 blueprint:doctor 自动自愈口语化字段、状态机与菜单命名。",
    },
    {
      code: "04",
      file: "04_implementation.md",
      title: "04 四端同源编码实现与契约同步 (Quad-Terminal Implementation)",
      skills: [
        "cmmi-asset-authoring",
        "yudao-backend-dev",
        "yudao-admin-vue3",
        "yudao-miniapp-dev",
        "yudao-expo-app",
        "yudao-contract-sync",
        "yudao-local-stack",
        "mutation-tester",
        "yudao-mcp-server",
      ],
      cli: "pnpm blueprint:deliver / pnpm gen:module / pnpm gen:api-sdk / pnpm patch:check",
      gates: "typecheck 0 报错、submodule-patches 收敛一致、check:drift 新增孤儿 0 且动词不符 0",
      artifacts: "docs/04_implementation/README.md、deploy/patches/<submodule>/*.patch、packages/{api-client,shared-types}",
      blockedBy: "手改只读上游子模块、手写百行重复 CRUD 样板或前端硬编码假数据严禁合入",
      desc: "依托 Spring Boot 3 六层架构、Vue 3 useCrudSchemas、Uni-App 分包与 Expo SDK 52 SecureStore 协同交付四端业务，OpenAPI 契约一键转译强类型 TS SDK。",
    },
    {
      code: "05",
      file: "05_verification.md",
      title: "05 嵌入式真 PG E2E 验收与变异打假 (Real-DB E2E & Mutation)",
      skills: ["cmmi-asset-authoring", "mutation-tester", "yudao-cmmi-gatekeeper"],
      cli: "pnpm lite:verify / pnpm test:scripts / pnpm test:all / node scripts/cmmi-05-verification.cjs e2e",
      gates: "99 个自有脚本单测全绿、AES 加密连续 3 次登录 200、弱口令反证被拒、Playwright 多视口零遮挡",
      artifacts: "docs/05_verification/ (test-plan.md, test-summary-report.md, defect-tracking-ledger.md, mutation/, peer-review-records/, test-cases/)",
      blockedBy: "内存假 Mock、连接池二登 500 假阳性或空断言测试一票否决",
      desc: "基于 Embedded PostgreSQL 18.4 与 Embedded Redis 执行全链路真实入库验证、连续加密登录回归防护及四视口（1920/1440/375/320dp）几何防遮挡验收。",
    },
    {
      code: "06",
      file: "06_quality_assurance.md",
      title: "06 质量门禁、反向控制与配置审计 (Quality Gates & Negative Controls)",
      skills: ["cmmi-asset-authoring", "yudao-cmmi-gatekeeper"],
      cli: "pnpm check / pnpm harness:controls / pnpm gates:23:static / node scripts/cmmi-06-quality.cjs check",
      gates: "fast 17 项 / full 20 项门禁通过、10/10 反向控制咬合、G1~G23 出厂门禁达标",
      artifacts: "docs/06_quality_assurance/ (qa-audit-plan.md, configuration-audit.md, car-prevention.md, spc-metrics.md, audit/) 与 docs/audit/",
      blockedBy: "不会咬人的摆设门禁、配置与实现失真或未闭环高危缺陷严禁放行",
      desc: "通过 negative-controls.mjs 向每道 blocking 门禁注入受控违规验证真实拦截力，并执行 FCA/PCA 功能与物理配置审计。",
    },
    {
      code: "07",
      file: "07_release.md",
      title: "07 不可变制品指纹、离线骨架包与发布割接 (Release & Rollback)",
      skills: ["cmmi-asset-authoring"],
      cli: "pnpm build / pnpm release:package / node scripts/cmmi-07-release.cjs [fingerprint|gateway|runbook]",
      gates: "两步 Maven 189MB 可执行 Jar、Admin/MiniApp 静态产物齐备、SHA256SUMS 校验一致",
      artifacts: "docs/07_release/ (system-deployment-sop.md, rollback-runbook.json, release-fingerprint.json, release-notes.md, user-operation-manual.md, releases/v1.2.0.md)",
      blockedBy: "嵌套 Fat-Jar 构建错误、制品哈希漂移或缺失 5 分钟秒级回滚预案严禁发布",
      desc: "固化两步 Maven 与前端构建流水线，支持一键生成离线纯净四端骨架包并经 GitHub Actions 自动发布带 SHA-256 签名的正式版本。",
    },
    {
      code: "08",
      file: "08_sre.md",
      title: "08 SRE 服务控制面、SLO 预算与安全渗透 (SRE, SLO & Security)",
      skills: ["cmmi-asset-authoring", "sre-slo-manager", "postmortem-analyzer", "strix-penetration-testing"],
      cli: "pnpm service:start / pnpm service:health / pnpm service:status / node scripts/cmmi-08-sre.cjs health",
      gates: "SLO 可用率 >= 99.95%、核心读写 P99 < 200ms、网关四平面 HTTP 200 贯通",
      artifacts: "docs/08_sre/ (01_slo_sli_metrics/SLO-SLI-ERROR-BUDGET-MATRIX.md, 02_observability_apm/, 05_disaster_recovery/, 06_incidents_postmortem/, security-reports/)",
      blockedBy: "硬编码宿主机路径、抢占邻居实例端口或事故未完成 5-Whys CAPA 严禁结单",
      desc: "通过标准 8 动词控制器 deploy/service.sh 守护进程与端口生命周期，落实多燃烧率告警、红队安全验证与免责复盘。",
    },
    {
      code: "09",
      file: "09_operations.md",
      title: "09 多租户持续运营、三员分立审计与规格归档 (Tenant Ops & Archive)",
      skills: ["cmmi-asset-authoring", "financial-reconciliation-agent"],
      cli: "pnpm gen:three-role / pnpm speckit:archive / node scripts/cmmi-09-operations.cjs [docs|check|archive|ops]",
      gates: "租户套餐配额隔离有效、SHA-256 防篡改审计链连续、完结规格按季度归档零散落",
      artifacts: "docs/09_operations/ (tenant-governance.md, 01_biz_ops/, 02_data_ops/, 03_inspection/, 04_agent_ops/)",
      blockedBy: "跨租户数据串味、审计表可被 UPDATE/DELETE 篡改或支付账实不平一票否决",
      desc: "治理企业租户开通与配额套餐、政企 IT 三员分立（sys_admin/biz_admin/audit_admin）硬件级防篡改审计触发器、渠道资金对账及历史规格归档。",
    },
  ];

  for (const s of stages) {
    const content = `# 阶段交付百科：${s.title}

> **所属阶段**：CMMI-${s.code} | **统一 CLI**：\`${s.cli}\`  
> **阶段关联 Skills**：\`${s.skills.join("`, `")}\`

---

## 一、阶段职责与工程目标
${s.desc}

---

## 二、标准过程资产归宿（统一归口 \`docs/\`）
- **物理文档路径**：\`${s.artifacts}\`
- **脚手架与合规检查**：\`pnpm cmmi:asset new --phase ${s.code} --type <type>\` · \`pnpm cmmi:asset:check\`

---

## 三、质量门禁与阻断红线
- **放行判据**：${s.gates}
- **一票否决项**：**${s.blockedBy}**（*No Artifact, No Done*）
`;
    generatedFiles.set(`stages/${s.file}`, content);
  }
}

// ==========================================
// 3. 生成 docs/wiki/architecture/*.md
// ==========================================
function buildArchitecture() {
  const recipes = listRecipes();
  const recipeList = recipes.length
    ? recipes.map((r, i) => `  ${i + 1}. \`${r.file}\`：${r.desc || r.name}（${r.steps} 步）`).join("\n")
    : "  - 当前无配方";

  const pillars = [
    {
      file: "quad-terminal-topology.md",
      content: `# 架构支柱：四位一体多端同源拓扑与四平面 Caddy 网关

- **四大交付终端与共享包（PNPM Monorepo + Maven）**：
  1. \`apps/backend\`：Java 17 + Spring Boot 3.5.15 + MyBatis-Plus 后端服务（默认监听 \`:48080\`，兼容单体与微服务双形态）；
  2. \`apps/admin\`：Vue 3.4 + Vite + Element Plus + Pinia PC 运营管理中台（挂载 \`/<slug>/admin/\`）；
  3. \`apps/miniapp\`：Uni-App + Vue 3 微信小程序与移动端商城 H5（挂载 \`/<slug>/2c/\`）；
  4. \`apps/app\`：Expo SDK 52 + React Native 0.76 原生双端客户端（硬件级 \`SecureStore\` 与 OTA 热更新）；
  5. \`packages/api-client\` & \`packages/shared-types\`：OpenAPI 3 直出强类型 TS SDK 与跨端共享 DTO。
- **单一端口四平面同源网关（\`scripts/generate-gateway-config.mjs\`）**：
  - 自动生成 \`deploy/gateway/caddy/<slug>.caddy\`（强制顶部 \`{ admin off }\` 规避 \`:2019\` 端口冲突，母本默认采用 \`{$CADDY_HOST_ROOT:.}\` 零宿主机绝对路径泄漏）与 \`deploy/gateway/nginx/<slug>.conf\`；
  - 单一入口 \`:48120\` 同源承载 \`/<slug>/cockpit/\`、\`/<slug>/admin/\`、\`/<slug>/2c/\`、\`/<slug>/{admin-api,app-api,open-api}/\`（\`uri strip_prefix /<slug>\`）以及 \`/<slug>/v3/api-docs\` 契约平面。`,
    },
    {
      file: "submodule-patches-and-clean-hatch.md",
      content: `# 架构支柱：只读上游子模块、声明式补丁与净室派生引擎

- **只读子模块契约（方案 B）**：
  - \`apps/backend\`、\`apps/admin\`、\`apps/miniapp\` 均钉死在各自上游远端真实存在的提交（由 \`pnpm compat:check\` 校验远端分支可达性，确保任何环境 \`git clone --recursive\` 100% 成功）；
  - 代码级差异收敛在主仓 \`deploy/patches/{backend,admin,miniapp}/*.patch\`，由 \`pnpm patch:apply\` 幂等注入，\`pnpm patch:check\` 强制校验子模块改动恰好等于已声明补丁。
- **零 Git 历史净室白标孵化（\`scripts/project-reactor.mjs\`）**：
  - 执行 \`pnpm project:hatch\` 或 \`pnpm project:init\` 时，\`deriveSlugForms()\` 自动推导连字符路由名、下划线 SQL 标识符 \`snakeSlug\` 与大驼峰 Java 主类名 \`pascalSlug\`；
  - 自动迁移 Java 包路径与同源 Maven \`groupId\`，物理清除上游教程 Markdown、\`.image\` 二维码目录、静态假图表以及母本内部审计/Release 归档，并通过 \`pnpm harness:hatch\` 20 项金路径断言守卫。`,
    },
    {
      file: "zero-docker-lite-stack.md",
      content: `# 架构支柱：零 Docker 嵌入式 PostgreSQL 18.4 + Redis 运行栈

- **真实双引擎零容器拉起（\`scripts/lite-up.mjs\` & \`scripts/lib/ephemeral-pg.cjs\`）**：
  - 数据库采用进程内 **Embedded PostgreSQL 18.4**，直接导入官方 \`apps/backend/sql/postgresql/{ruoyi-vue-pro,quartz}.sql\`（60 张物理表 / 48 个序列），零 SQL 方言移植损耗；
  - 缓存采用真实预编译 **Embedded Redis**（本地开发默认 \`7.4.1\`，对外随制品分发支持切换 \`--redis-variant redis-6.2.6-bsd\`）。
- **CSPRNG 零弱默认凭据体系（\`deploy/lite/runtime/lite-credentials.mjs\`）**：
  - 首次引导自动生成高熵字母数字管理员账号与 16 位口令、32 位 Redis 口令，以 \`0600\` 权限写入 gitignored 的 \`.commandcode/lite/credentials.env\`；
  - 导入种子后立即覆写 \`system_users.id=1\` 为 bcrypt(10) 高熵口令、停用其余演示账号，并调用 \`sanitizeUpstreamMenus()\` 自动归一化超 4 字菜单与隐藏上游外链菜单；
  - \`pnpm lite:verify\` 强制执行 AES-256-ECB \`@ApiEncrypt\` 连续 3 次登录回归验证与弱默认凭据拒绝反证。`,
    },
    {
      file: "blueprint-and-module-trimming.md",
      content: `# 架构支柱：声明式蓝图引擎、代码生成与 19 模块闭包裁剪

- **\`<500 Tokens\` 蓝图全栈引擎（\`scripts/blueprint-engine.cjs\` & \`scripts/codegen-module.cjs\`）**：
  - \`pnpm blueprint:doctor -- --file <domain>.blueprint.json --write\` 自动诊断并收敛超 4 字导航菜单名、补齐权限码与状态机约定（完整业务标题保留于 \`remark\` 与 OpenAPI \`@Tag\`）；
  - \`pnpm blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e\` 一键展开 16 份 Spec-Kit 规格文档、Java 6 层代码（DO / Mapper / Service / Convert / Admin+App Controller / VO）、Vue 3 管理页、TS SDK 与 MySQL/PostgreSQL 双库 DDL，并联动真 PG 18.4 执行 6 阶段验收。
- **19 业务模块依赖闭包裁剪（\`scripts/trim-modules.mjs\`）**：
  - 元数据唯一真源 \`scripts/lib/module-catalog.mjs\` 实测登记全后端 ${MODULES.reduce((s, m) => s + m.javaFiles, 0) + NON_TRIM_JAVA_FILES} 个 Java 文件，内置 \`mini\`（${PROFILES.mini.length} 模块）、\`lite\`（${PROFILES.lite.length} 模块）、\`full\`（${PROFILES.full.length} 模块）三档预设；
  - 自动计算强依赖闭包（如保留 \`mall\` 自动补齐 \`system + member + pay\`，保留 \`oa/hrm/fms\` 自动补齐 \`bpm\`），支持 \`--dry-run\` 预览、\`--check\` 漂移校验与 \`--recover\` 无损还原。`,
    },
    {
      file: "two-pillar-harness-speckit.md",
      content: `# 架构支柱：双支柱治理 —— Harness 9 阶段生命周期 × Spec-Kit CMMI 00~09

- **支柱一 \`harness\`（[HARNESS.md](../../../HARNESS.md) + \`scripts/harness.cjs\`）**：
  - 统一管控 \`install -> check -> build -> start -> health -> status -> stop -> e2e -> deliver\`（含 \`pmo\` / \`doctor\` / \`test\`）标准运行生命周期，底层对接 \`deploy/service.sh\` 8 动词服务控制器。
- **支柱二 \`speckit\`（\`scripts/speckit.cjs\`）+ CMMI 00~09 扩展（\`scripts/cmmi-00-meta.cjs\` ~ \`scripts/cmmi-09-operations.cjs\`）**：
  - 统一管理宏观过程文档（\`docs/00_meta_standards/\` ~ \`docs/09_operations/\`）与敏捷特性规格全息包（\`docs/specs/<domain>/<name>/\` 共 16 份标准资产）；
  - 内置 SDD 多智能体工作流配方（\`.agents/workflows/\`）：
${recipeList}
- **门禁反向控制（\`scripts/harness/negative-controls.mjs\`）**：
  - \`pnpm harness:controls\` 对 10 道核心 blocking 门禁逐一执行「基线绿 → 注入违规必须变红 → 字节级还原必须转绿」受控实验，杜绝形同虚设的空壳守卫。`,
    },
    {
      file: "living-ontology-and-contract-sync.md",
      content: `# 架构支柱：活体业务本体、OpenAPI 强类型 SDK 与契约基线防漂移

> **关联真源**：[AGENTS.md](../../../AGENTS.md) · [docs/ontology/ontology.yaml](../../ontology/ontology.yaml) · [docs/ontology/domain.yaml](../../ontology/domain.yaml) · [docs/ontology/copilot.yaml](../../ontology/copilot.yaml)

- **活体业务本体三件套（\`docs/ontology/\`）**：
  - \`ontology.yaml\`：定义核心实体（Objects）、受控行为动词（Actions）、多租户与审计底线不变量（Invariants）、角色矩阵与状态流转；
  - \`domain.yaml\`：映射全部 20 大业务域的后端包路径、管理端视图目录、模块依赖与核心物理表；
  - \`copilot.yaml\`：约束只读 AI 数据探查沙箱（仅允许携带 \`tenant_id\` 隔离的 \`SELECT\` / \`WITH\` 查询，硬限返回行数）。
- **跨端契约同步与只读上游漂移基线（\`scripts/check-contracts-drift.mjs\`）**：
  - 后端 Controller 变更后执行 \`pnpm gen:api-sdk\` 从 \`/v3/api-docs\` 直出强类型客户端；
  - \`scripts/lib/upstream-contract-baseline.json\` 对只读上游子模块固有的 92 条未暴露孤儿路由建立精确基线，任何新增未授权孤儿或 HTTP 动词不匹配立即触发门禁阻断。`,
    },
  ];

  for (const p of pillars) {
    generatedFiles.set(`architecture/${p.file}`, p.content);
  }
}

// ==========================================
// 4. 生成 docs/wiki/domains/*.md (20 大业务域)
// ==========================================
function buildDomains() {
  for (const mod of MODULES) {
    const info = DOMAIN_ENRICHMENTS[mod.id] || {
      apiPrefix: `/admin-api/${mod.id}/**`,
      adminView: `apps/admin/src/views/${mod.id}`,
      tables: `${mod.id}_*`,
      summary: `${mod.label}核心业务领域模块。`,
    };
    const depsText = mod.deps.length ? mod.deps.map((d) => `\`${d}\``).join(", ") : "无（地基核心模块）";
    const optDepsText = mod.optionalDeps?.length ? `（可选联动：${mod.optionalDeps.map((d) => `\`${d}\``).join(", ")}）` : "";

    const content = `# 业务域百科：\`${mod.id}\` · ${mod.label}

> **后端模块目录**：\`apps/backend/${mod.dir}\` | **Maven Server 构件**：\`${mod.serverArtifacts.join("`, `")}\`  
> **实测 Java 源码规模**：**${mod.javaFiles}** 个文件 | **强依赖闭包**：${depsText}${optDepsText}

---

## 1. 领域定位与核心能力
${info.summary}

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：\`${info.apiPrefix}\`
- **PC 管理端视图目录**：\`${info.adminView}\`
- **代表性物理数据表**：\`${info.tables}\`

---

## 3. 按需裁剪与上下文检索
\`\`\`bash
# 极速提取 ${mod.id} 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query ${mod.id}

# 预览仅保留 ${mod.id} 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,${mod.id} --dry-run
\`\`\`
`;
    generatedFiles.set(`domains/${mod.id}.md`, content);
  }

  // 第 20 域：online（声明式蓝图与在线低代码代码生成域）
  const onlineContent = `# 业务域百科：\`online\` · 声明式蓝图与在线低代码生成引擎

> **核心引擎真源**：\`scripts/blueprint-engine.cjs\` · \`scripts/codegen-module.cjs\` · \`apps/backend/yudao-module-infra\` (\`codegen\`)  
> **跨底座对齐**：与 \`cooliebase-all v1.5.0\` 的 \`plugin-online\` / \`blueprint:deliver\` 保持 100% 同名同参命令契约

---

## 1. 领域定位与核心能力
提供「声明式 JSON 蓝图 + 在线元数据代码生成」双轮驱动能力：AI 数字员工只需编写 \`<500 Tokens\` 的 \`<domain>.blueprint.json\`，即可自动完成 \`<= 4\` 字导航菜单自愈、16 份 Spec-Kit 规格文档展开、Java 6 层后端代码、Vue 3 管理后台视图、强类型 TS SDK、PostgreSQL/MySQL 双库 DDL 生成及真库 E2E 闭环验证。

---

## 2. 核心入口与物理映射
- **蓝图母版契约**：\`blueprint.template.json\`（\`schemaVersion: "2.1.0"\`）
- **在线表结构元数据**：\`infra_codegen_table\`、\`infra_codegen_column\`（位于 \`yudao-module-infra\`）
- **管理端代码生成视图**：\`apps/admin/src/views/infra/codegen\`

---

## 3. 标准低代码交付流水线
\`\`\`bash
# 1. 渲染行业/领域蓝图骨架并执行 4 字菜单与字段类型自愈
pnpm blueprint:render -- --name "系统名称" --domain supply --entities "order:采购单" --out supply.blueprint.json
pnpm blueprint:doctor -- --file supply.blueprint.json --write

# 2. 一键展开 Spec + 四端全栈代码 + 嵌入式真 PostgreSQL 18.4 验收
pnpm blueprint:deliver -- --file supply.blueprint.json --verify-e2e
\`\`\`
`;
  generatedFiles.set("domains/online.md", onlineContent);
}

// ==========================================
// 5. 生成 docs/wiki/gotchas/*.md
// ==========================================
function buildGotchas() {
  const gotchas = [
    {
      file: "maven-two-step-fatjar.md",
      content: `# 避坑实录：两步 Maven 构建防嵌套 Fat-Jar 扫描失效

1. **故障现象**：各 \`yudao-module-*-server\` 子模块 POM 默认绑定了 \`spring-boot-maven-plugin\` 的 \`repackage\`。若单条命令构建，业务模块会被打成嵌套 Fat-Jar 塞入 \`BOOT-INF/lib/\`，导致 Spring 与 MyBatis 无法扫描模块内的 Bean 和 Mapper（报 \`No MyBatis mapper was found\` / 缺 \`ApiErrorLogCommonApi\`）。
2. **标准两步构建法（已封装为 \`pnpm build:backend\`）**：
   \`\`\`bash
   cd apps/backend
   mvn -B clean install -DskipTests -pl yudao-server -am -Dspring-boot.repackage.skip=true
   mvn -B package -DskipTests -pl yudao-server
   \`\`\`
   正常 \`yudao-server.jar\` 体积约 **189MB**；若超过 500MB 即误触嵌套 Fat-Jar。`,
    },
    {
      file: "postgres-druid-and-api-encrypt.md",
      content: `# 避坑实录：PostgreSQL 18.4 Druid 连接池句柄关闭陷阱与登录加密

1. **「首登 200、二登 500」连接池陷阱**：PostgreSQL 驱动关闭扩展查询句柄后，若 Alibaba Druid 开启 \`pool-prepared-statements: true\` 会复用已关闭 Statement 抛出 \`This statement has been closed\`。\`deploy/lite/application-lite.yaml\` 已强制设为 \`false\`，且 \`pnpm lite:verify\` 连登 3 次做回归守卫。
2. **登录接口 \`@ApiEncrypt\` 对称加密**：\`AuthController\` 默认启用请求体加密，客户端必须携带 \`X-Api-Encrypt\` 请求头并使用 AES-256-ECB 加密请求体（参考 \`deploy/lite/runtime/lite-api-encrypt.mjs\`）。
3. **JDK 17 模块反射开放参数**：启动 JVM 须携带 \`--add-opens=java.base/java.nio=ALL-UNNAMED\` 与 \`--add-opens=java.base/sun.nio.ch=ALL-UNNAMED\`（\`scripts/lite-up.mjs\` 与 \`deploy/service.sh\` 已内置）。`,
    },
    {
      file: "hyphen-slug-and-menu-standard.md",
      content: `# 避坑实录：连字符项目名五态标识符推导与 4 字导航菜单硬约束

1. **连字符项目名（如 \`demo-mall\`）分态规则**：直接把 \`-\` 拼进 SQL 表名、Java 类名或 Nginx \`upstream\` 会引发语法崩溃。\`scripts/project-reactor.mjs\` 的 \`deriveSlugForms()\` 严格区分路由前缀 \`/demo-mall\`、SQL/DB 标识 \`demo_mall\`（\`snakeSlug\`）、Java 主类 \`DemoMallServerApplication\`（\`pascalSlug\`）与 Nginx \`upstream demo_mall_backend\`。
2. **导航菜单严格 \`<= 4\` 字铁律**：所有可见目录与页面菜单（\`system_menu.type IN (1, 2)\`）必须满足 \`char_length(name) <= 4\`，完整说明写入 \`remark\`。由 \`scripts/lib/menu-standard.cjs\`、\`lite-pg.mjs\` 与门禁 \`menu-standard\` 全链路强制执行。`,
    },
    {
      file: "expo-ota-and-pnpm-hoisted.md",
      content: `# 避坑实录：Expo SDK 52 OTA 版本对齐与 PNPM Hoisted 构建解析

1. **PNPM Hoisted 布局下的前端构建**：仓库根 \`.npmrc\` 采用 \`node-linker=hoisted\`，可执行入口位于根 \`node_modules/.bin\`。管理端构建请统一使用 \`pnpm build:admin\`（\`scripts/build-admin.mjs\` 自动解析真实 \`vite\` 入口）；注意安装开发依赖时 \`NODE_ENV\` 不得为 \`production\`。
2. **全仓版本与 OTA 一致性**：发版时根 \`package.json\`、\`compat-manifest.json\`（\`templateVersion\`）、\`apps/app/{package.json,app.json}\`、\`packages/*\`、\`docs/ontology/*.yaml\` 与 \`docs/07_release/*\` 必须同步对齐同一语义化版本号（当前 \`1.2.0\`）。`,
    },
  ];

  for (const g of gotchas) {
    generatedFiles.set(`gotchas/${g.file}`, g.content);
  }
}

function collectExistingWikiMdFiles(dir, prefix = "") {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...collectExistingWikiMdFiles(abs, rel));
    else if (e.isFile() && e.name.endsWith(".md")) out.push(rel);
  }
  return out;
}

function main() {
  buildIndexMd();
  buildStages();
  buildArchitecture();
  buildDomains();
  buildGotchas();

  if (checkOnly) {
    console.log(`[openwiki:check] 开始校验 OpenWiki 动态知识库 (共 ${generatedFiles.size} 篇受控词条)...`);
    let driftCount = 0;

    for (const [relPath, expectedContent] of generatedFiles.entries()) {
      const fullPath = path.join(WIKI_DIR, relPath);
      if (!fs.existsSync(fullPath)) {
        console.error(`  ❌ 缺失 Wiki 词条: docs/wiki/${relPath}`);
        driftCount++;
        continue;
      }
      const existingContent = fs.readFileSync(fullPath, "utf-8");
      if (existingContent.trim() !== expectedContent.trim()) {
        console.error(`  ❌ 词条内容发生漂移: docs/wiki/${relPath}`);
        driftCount++;
      }
    }

    for (const existingRel of collectExistingWikiMdFiles(WIKI_DIR)) {
      if (!generatedFiles.has(existingRel) && !EXTERNAL_WIKI_FILES.has(existingRel)) {
        console.error(`  ❌ 存在未登记陈旧 Wiki 词条: docs/wiki/${existingRel}`);
        driftCount++;
      }
    }

    if (driftCount > 0) {
      console.error(`\n[openwiki:check] ✗ 发现 ${driftCount} 处 Wiki 漂移或陈旧词条，请运行: pnpm openwiki:sync 修复\n`);
      process.exit(1);
    }

    console.log(`[openwiki:check] 🎉 PASS: 全部 ${generatedFiles.size} 篇 OpenWiki 词条 100% 同步且零陈旧残留！`);
    return;
  }

  console.log(`[openwiki:sync] 开始动态生成与自愈 OpenWiki 知识大脑 (共 ${generatedFiles.size} 篇受控词条)...`);
  for (const existingRel of collectExistingWikiMdFiles(WIKI_DIR)) {
    if (!generatedFiles.has(existingRel) && !EXTERNAL_WIKI_FILES.has(existingRel)) {
      fs.rmSync(path.join(WIKI_DIR, existingRel), { force: true });
      console.log(`  [PURGED] docs/wiki/${existingRel}`);
    }
  }

  for (const [relPath, content] of generatedFiles.entries()) {
    const fullPath = path.join(WIKI_DIR, relPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
    console.log(`  [SYNCED] docs/wiki/${relPath}`);
  }

  console.log(`\n🎉 [openwiki:sync] 成功同步 ${generatedFiles.size} 篇纯净 OpenWiki 词条至 docs/wiki/ 目录！`);
}

main();
