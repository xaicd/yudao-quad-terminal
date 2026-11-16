# 《Yudao Quad-Terminal》项目全周期计划：目标 · WBS · 门禁判据 (`v1.2.0`)

- **模板版本**：`1.2.0`（以 `package.json` 与 `compat-manifest.json` 为唯一真源）
- **归属规范**：CMMI `01_management`（PLAN / MC / RSKM，全仓文档统一归口 `docs/`）
- **双支柱架构**：
  - **支柱一 `harness`（[`HARNESS.md`](../../HARNESS.md) + [`scripts/harness.cjs`](../../scripts/harness.cjs)）**：9 阶段运行生命周期总控（`install / check / build / start / health / status / stop / e2e / deliver` + `pmo`）。
  - **支柱二 `speckit` + CMMI 00~09（[`scripts/cmmi-00-meta.cjs`](../../scripts/cmmi-00-meta.cjs) ~ [`scripts/cmmi-09-operations.cjs`](../../scripts/cmmi-09-operations.cjs)）**：全环节过程资产（`docs/00_meta_standards/` ~ `docs/09_operations/`、`docs/wiki/`、`docs/audit/`）与特性规格包（`docs/specs/<domain>/<name>/`）统一治理引擎。

---

## 1. 北极星目标与阶段放行判据（Gate Criteria）

> **以 `<500 Tokens` 声明式领域蓝图驱动 Java Spring Boot 3.5.15 + Vue 3 Admin + Uni-App + Expo SDK 52 四端同源展开，并在零 Docker 嵌入式真实 PostgreSQL 18.4 + Redis 上闭环验证交付。**

| 门禁编号 | 放行判据 | 机器验证命令 | 基线状态 |
| :--- | :--- | :--- | :--- |
| **G0 契约一致** | 11 组下游兼容契约（入口/端口/路径/子模块远端指针/19 原生模块）100% 对齐 | `pnpm compat:check` | ✅ 已就绪 |
| **G1 快速门禁** | 17 项 `fast` 门禁 0 blocking 失败（含 99 个 `node:test` 脚本单测、4 字菜单与 `docs/` 归口守卫） | `pnpm check` (`pnpm gate:fast`) | ✅ 已就绪 |
| **G2 反向控制** | 10/10 道核心 blocking 门禁通过违规注入变红与字节级还原转绿测试 | `pnpm harness:controls` | ✅ 已就绪 |
| **G3 净室派生** | 临时沙箱真跑 `project:hatch` 并通过全部 20 项净室、连字符安全与自跑门禁断言 | `pnpm harness:hatch` | ✅ 已就绪 |
| **G4 真库验收** | 嵌入式真 PostgreSQL 18.4 + 真 Redis + AES-256-ECB 连续 3 次登录 200 + 弱凭据拒绝反证 | `pnpm lite:verify` | ✅ 按需执行 |
| **G5 制品打包** | 两步 Maven 189MB Jar + 前端构建 + 离线纯净骨架包与 `SHA256SUMS.txt` | `pnpm build` · `pnpm release:package` | ✅ 已就绪 |

---

## 2. 标准工作分解结构（Standard WBS Work Packages）

| WBS 编号 | CMMI 阶段 | 标准工作包描述 | 物理交付物路径 | 核验命令 |
| :--- | :--- | :--- | :--- | :--- |
| **WBS-01** | `01_management` | 净室白标派生、`.env.ports` 零冲突 6 端口矩阵与 `{ admin off }` 四平面网关配置生成 | `docs/01_management/`、`deploy/gateway/` | `pnpm verify:b0` |
| **WBS-02** | `02_requirements` | 需求确定性分诊、8 要素 `brief.json` 或 `<domain>.blueprint.json` 建模与 EARS 规格展开 | `docs/02_requirements/`、`docs/specs/<domain>/<name>/` | `pnpm specs:health` |
| **WBS-03** | `03_design` | 蓝图 `doctor` 自愈（`<= 4` 字菜单收敛）、多租户 ERD、三员分立审计与本体定义 | `docs/03_design/`、`docs/ontology/` | `pnpm blueprint:check` |
| **WBS-04** | `04_implementation` | Java 6 层后端、Vue 3 中台、Uni-App 移动端、Expo 原生端实现与 OpenAPI TS SDK 同步 | `apps/`、`packages/`、`deploy/patches/` | `pnpm typecheck` · `pnpm check:drift` |
| **WBS-05** | `05_verification` | 嵌入式真 PG 18.4 数据入库、连续加密登录与 Playwright 四视口（至 `320dp`）防遮挡取证 | `docs/05_verification/`、`e2e/` | `pnpm verify:b1` ~ `pnpm verify:b3` |
| **WBS-06** | `06` ~ `09` | 23 道出厂门禁终审、SHA-256 发布指纹、离线骨架归档、SLO 守护与完结规格归档 | `docs/06_quality_assurance/` ~ `docs/09_operations/`、`docs/audit/` | `pnpm gates:23:static` · `pnpm release:package` |

---

## 3. PMO 待办队列运行规约

AI 数字员工与研发人员进场第一步执行 `pnpm run pmo`（持久化刷新执行 `pnpm run pmo -- --write`），自动聚合活跃规格漏斗与 `P0 / P1 / P2` 待办工作队列至 [`pmo-dashboard.md`](pmo-dashboard.md)。
