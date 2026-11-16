# Yudao Quad-Terminal OpenWiki（`v1.2.0` 动态知识大脑）

> **面向 AI 数字员工与架构师的首屏全息索引**：本知识库统一落盘于 `docs/wiki/`，由 `scripts/sync-openwiki.mjs` 从仓库真实模块清单（`scripts/lib/module-catalog.mjs`）、SQL 建表脚本与 CMMI 00~09 规范自动生成并通过 `openwiki` 门禁防漂移校验。进场接单请优先检索本索引与 `pnpm ctx:query <keyword>`，严禁全盘盲扫数千 Java/Vue 源码。

---

## 📌 本仓实时事实基线（磁盘实测自动计算）

| 事实维度 | 实测值 | 唯一真源 |
|---|---|---|
| 底座模板版本 | **`v1.2.0`** | `package.json` · `compat-manifest.json` |
| 四端工程拓扑 | **4 端同源** | `apps/backend` + `apps/admin` + `apps/miniapp` + `apps/app` |
| 后端物理业务模块数 | **19**（含在线代码生成共 **20** 业务域） | `apps/backend/yudao-module-*` · `scripts/lib/module-catalog.mjs` |
| 官方 PostgreSQL 建表数 | **60**（核心 `49` + Quartz `11`） | `apps/backend/sql/postgresql/{ruoyi-vue-pro,quartz}.sql` |
| Agent 专属技能数 | **18** | `.agents/skills/*/SKILL.md` |
| SDD 工作流配方数 | **1** | `.agents/workflows/*.workflow.json` |
| 当前活跃特性规格数 | **0** | `docs/specs/**/brief.json` |

---

## ⚡ 核心工程公理（Quad-Terminal Axioms）

1. **只读上游子模块 + 主仓声明式补丁**：`apps/{backend,admin,miniapp}` 钉在远端真实存在的纯上游提交，代码级定制收敛于 `deploy/patches/<submodule>/*.patch`（`pnpm patch:apply` 幂等注入，`submodule-patches` 门禁强校验）。
2. **零 Docker 嵌入式真库闭环（`lite` 档）**：本地无需 Docker 或外部数据库，`pnpm lite:up` / `pnpm lite:verify` 秒级拉起 **Embedded PostgreSQL 18.4 + Embedded Redis**，引导凭据由 CSPRNG 动态签发至 `0600` 凭据文件，严禁弱口令与假 Mock。
3. **`<500 Tokens` 蓝图全栈同源展开**：业务模块优先通过 `scripts/blueprint-engine.cjs`（`pnpm blueprint:doctor` → `pnpm blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e`）自动生成 16 份 Spec 资产、Java 6 层代码、Vue 3 页面、TS SDK 与双库 DDL。
4. **双支柱生命周期治理（与姊妹基座 `cooliebase-all v1.5.0` 100% 同名同参）**：`harness`（`HARNESS.md` + `scripts/harness.cjs`）统管 9 阶段运行生命周期；`speckit` + CMMI 00~09（`scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs`）统管宏观工程文档与特性规格文档。
5. **全仓文档统一归口 `docs/` & 导航菜单 `<= 4` 字**：所有过程文档、规格（`docs/specs/`）、知识库（`docs/wiki/`）、Release 说明（`docs/07_release/releases/`）与审计报告（`docs/audit/`）一律归口 `docs/`，严禁顶层并行文档目录；可见目录/页面菜单严格满足 `char_length(name) <= 4`。

---

## 🚀 高频能力速查（Agent 优先复用）

| 能力 | 标准命令 | 唯一真源 |
|---|---|---|
| PMO 首屏待办雷达 | `pnpm pmo` | `scripts/cmmi-01-management.cjs` |
| 统一门禁（fast 17 / full 20 项） | `pnpm check` / `pnpm gate:fast` / `pnpm gate:full` | `scripts/gate-check.cjs` |
| 下游兼容契约与门禁反向控制 | `pnpm compat:check` / `pnpm harness:controls` | `compat-manifest.json` |
| 净室骨架孵化与金路径验证 | `pnpm project:hatch` / `pnpm project:init` / `pnpm harness:hatch` | `scripts/project-reactor.mjs` |
| `<500 Tokens` 蓝图真库交付 | `pnpm blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e` | `scripts/blueprint-engine.cjs` |
| lite 零 Docker 真 PG + 真 Redis | `pnpm lite:up` / `pnpm lite:verify` / `pnpm lite:down` | `deploy/lite/README.md` |
| 19 模块依赖闭包裁剪 | `pnpm trim:modules --profile lite --dry-run` | `scripts/lib/module-catalog.mjs` |
| 上下文 ~150 Token 精准切片 | `pnpm ctx:query <keyword>` | `scripts/agent-context-compressor.mjs` |
| 离线骨架包与 Release 制品打包 | `pnpm release:package` | `scripts/build-release-assets.cjs` |
| MCP 无头编排端点（8 工具） | `cmd mcp list` | `.agents/skills/yudao-mcp-server/SKILL.md` |

---

## 🔄 SDD 多智能体工作流引擎与配方

1. **配方真源**：`.agents/workflows/*.workflow.json`，由 `scripts/workflow-engine.cjs`（`pnpm workflow:list` / `workflow:check` / `workflow:dry-run` / `workflow:run`）驱动：
   - `cmmi-full-lifecycle`（7 步）：CMMI 01~09 全生命周期多智能体递进式商业软件交付工作流 (G1 需求规格 -> G2 概要架构 -> G3 静态契约 -> G4 全栈验收 -> G5 不可变投产 -> G6 SRE稳定性 -> G7 持续运营)
2. **CMMI 00~09 过程资产脚手架**：由 `pnpm cmmi:asset new --phase <00..09> --type <type>` 生成骨架，`pnpm cmmi:asset:check` 校验零 TODO 占位残留。

---

## 🧭 CMMI 00~09 全生命周期阶段导航

| 阶段代码 | 阶段名称 | 核心专属 Skills | 阶段百科词条 |
|---|---|---|---|
| **00** | 规范与元契约 | `cmmi-asset-authoring` | [00_meta_standards.md](stages/00_meta_standards.md) |
| **01** | 立项策划与沙箱孵化 | `cmmi-asset-authoring`, `dar-decision-matrix`, `yudao-cloud-bootstrap` | [01_management.md](stages/01_management.md) |
| **02** | 需求工程与 EARS 规格 | `cmmi-asset-authoring`, `ears-spec-writer` | [02_requirements.md](stages/02_requirements.md) |
| **03** | 架构设计与蓝图自愈 | `cmmi-asset-authoring`, `archify` | [03_design.md](stages/03_design.md) |
| **04** | 四端实现与契约同步 | `cmmi-asset-authoring`, `yudao-backend-dev`, `yudao-admin-vue3`, `yudao-miniapp-dev`, `yudao-expo-app`, `yudao-contract-sync`, `yudao-local-stack`, `mutation-tester`, `yudao-mcp-server` | [04_implementation.md](stages/04_implementation.md) |
| **05** | 真库 E2E 与变异打假 | `cmmi-asset-authoring`, `mutation-tester`, `yudao-cmmi-gatekeeper` | [05_verification.md](stages/05_verification.md) |
| **06** | 质量门禁与配置审计 | `cmmi-asset-authoring`, `yudao-cmmi-gatekeeper` | [06_quality_assurance.md](stages/06_quality_assurance.md) |
| **07** | 制品指纹与发布割接 | `cmmi-asset-authoring` | [07_release.md](stages/07_release.md) |
| **08** | SRE 可靠性与红队渗透 | `cmmi-asset-authoring`, `sre-slo-manager`, `postmortem-analyzer`, `strix-penetration-testing` | [08_sre.md](stages/08_sre.md) |
| **09** | 多租户运营与财务平账 | `cmmi-asset-authoring`, `financial-reconciliation-agent` | [09_operations.md](stages/09_operations.md) |

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

- [`system` · 系统管理中枢（462 Java 文件）](domains/system.md)
- [`infra` · 基础设施服务（217 Java 文件）](domains/infra.md)
- [`member` · 会员中心（190 Java 文件）](domains/member.md)
- [`pay` · 统一支付中心（242 Java 文件）](domains/pay.md)
- [`report` · 报表大屏（35 Java 文件）](domains/report.md)
- [`bpm` · 工作流引擎（264 Java 文件）](domains/bpm.md)
- [`mp` · 微信公众号平台（129 Java 文件）](domains/mp.md)
- [`mall` · 电商零售套件（842 Java 文件）](domains/mall.md)
- [`crm` · 客户关系管理（288 Java 文件）](domains/crm.md)
- [`erp` · 企业进销存（221 Java 文件）](domains/erp.md)
- [`mes` · 制造执行系统（1153 Java 文件）](domains/mes.md)
- [`wms` · 仓储物流管理（165 Java 文件）](domains/wms.md)
- [`im` · 即时通讯中枢（303 Java 文件）](domains/im.md)
- [`ai` · AI 大模型中枢（226 Java 文件）](domains/ai.md)
- [`iot` · 物联网设备平台（475 Java 文件）](domains/iot.md)
- [`hrm` · 人力资源中枢（634 Java 文件）](domains/hrm.md)
- [`fms` · 财务核算管理（290 Java 文件）](domains/fms.md)
- [`pms` · 项目协同管理（316 Java 文件）](domains/pms.md)
- [`oa` · 日常办公协同（477 Java 文件）](domains/oa.md)
- [`online` · 声明式蓝图与在线低代码生成引擎](domains/online.md)

---

## ⚠️ 高频工程避坑实录（Battle-Tested Gotchas）

- [两步 Maven 构建防嵌套 Fat-Jar 扫描失效](gotchas/maven-two-step-fatjar.md)
- [PostgreSQL 18.4 Druid 连接池句柄关闭陷阱与登录加密](gotchas/postgres-druid-and-api-encrypt.md)
- [连字符项目名五态标识符推导与 4 字导航菜单硬约束](gotchas/hyphen-slug-and-menu-standard.md)
- [Expo SDK 52 OTA 版本对齐与 PNPM Hoisted 构建解析](gotchas/expo-ota-and-pnpm-hoisted.md)
