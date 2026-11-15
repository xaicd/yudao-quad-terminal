# 《Yudao Quad-Terminal Master Base》项目全周期计划：目标 · 路线图 · WBS · PMO 待办

- **版本**：以 `package.json.version` 与 `compat-manifest.json` 为准
- **归属规范**：CMMI 01_management (PLAN / MC / RSKM)
- **双支柱定位**：
  - **支柱一 `harness`（[`HARNESS.md`](../../HARNESS.md) + [`scripts/harness.cjs`](../../scripts/harness.cjs)）**：工作流程与运行生命周期总规范（9 大标准动作：`install / check / build / start / health / status / stop / e2e / deliver`）。
  - **支柱二 `speckit` + CMMI 00~09 扩展（[`scripts/cmmi-00-meta.cjs`](../../scripts/cmmi-00-meta.cjs) ~ [`scripts/cmmi-09-operations.cjs`](../../scripts/cmmi-09-operations.cjs)）**：全环节工程过程文档（`docs/00_meta_standards/`~`docs/09_operations/`）与特性规格包文档（`docs/specs/<domain>/<name>/`）统一治理引擎。

---

## 1. 北极星目标与阶段门禁判据 (North Star & Gate Criteria)

> **基于 `<500 Tokens` 声明式领域蓝图，在企业级四端同源基座（Java Spring Boot 3 中台 + Vue3 Admin + UniApp 小程序/H5 + Expo Native App）上自动展开全栈代码，并通过真实 PostgreSQL 18.4 全链路验收交付。**

| 编号 | 成功判据 | 机器验证入口 | 状态 |
| :--- | :--- | :--- | :--- |
| **G1** | 快速静态与架构边界门禁全绿（0 Blocking 失败） | `pnpm harness check` (`node scripts/cmmi-06-quality.cjs check`) | 基线就绪 |
| **G2** | 四端同源 `BASE_PATH` 网关路由与端口矩阵零冲突 | `pnpm compat:check` | 基线就绪 |
| **G3** | `<500 Tokens` 蓝图自愈诊断 + 全栈代码生成 + 真 PG 18.4 6 阶段 E2E | `node scripts/cmmi-04-implementation.cjs deliver --file <domain>.blueprint.json --verify-e2e` | 按需执行 |
| **G4** | 零 Docker 轻量运行档（嵌入式 PostgreSQL 18.4 + 嵌入式 Redis + CSPRNG 强凭据） | `pnpm lite:verify` (`scripts/lite-up.mjs`) | 按需执行 |
| **G5** | 业务模块按需闭包裁剪与 8 工具 MCP 编排端点 | `pnpm trim:check` (`scripts/trim-modules.mjs`) | 基线就绪 |

---

## 2. 标准工作分解结构模板 (Standard WBS Work Packages)

| WBS 编号 | 生命周期阶段 | 标准工作包描述 | 交付物落盘位置 | 验证入口 |
| :--- | :--- | :--- | :--- | :--- |
| **WBS-01** | 立项与环境基线 | 工程身份配置、`.env.ports` 端口矩阵与四平面网关配置生成 | `docs/01_management/`、`deploy/gateway/` | `pnpm verify:b0` |
| **WBS-02** | 需求与规格建模 | 编写 8 要素 `brief.json` 或 `<domain>.blueprint.json`，展开 EARS 需求规格 | `docs/02_requirements/`、`docs/specs/<domain>/<name>/` | `pnpm specs:health` |
| **WBS-03** | 架构与契约设计 | 多租户边界、状态机流转、三员分立防篡改审计与 OpenAPI 契约定义 | `docs/03_design/`、`docs/ontology/` | `pnpm check:drift` |
| **WBS-04** | 全栈编码实现 | 后端 `admin-api`/`app-api`、Vue3 管理端、UniApp 与 Expo 端协同实现 | `apps/`、`packages/` | `pnpm typecheck` |
| **WBS-05** | 真库集成与 E2E | 真实 PostgreSQL 18.4 数据入库、加密登录与多视口无头浏览器验收 | `docs/05_verification/`、`e2e/` | `pnpm lite:verify` |
| **WBS-06** | 发布与持续运营 | 不可变制品指纹、回滚预案 SOP、SLO 监控矩阵与完结规格归档 | `docs/07_release/`~`docs/09_operations/` | `pnpm gates:23:static` |

---

## 3. PMO 待办队列管理约定

> AI Agent 进场统一执行 `pnpm run pmo`（或 `node scripts/cmmi-01-management.cjs pmo`）实时拉取当前仓库活跃规格与 P0/P1/P2 待办队列。
