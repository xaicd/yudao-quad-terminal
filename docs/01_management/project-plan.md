# 《Yudao Quad-Terminal Master Base》项目全周期计划：目标 · 路线图 · WBS · PMO 待办

- **版本**：以 `package.json.version` 与 `compat-manifest.json` 为准
- **更新日期**：2026-11-10
- **归属规范**：CMMI 01_management (PLAN / MC / RSKM)
- **双支柱定位**：
  - **支柱一 `harness`（[`HARNESS.md`](../../HARNESS.md) + [`scripts/harness.cjs`](../../scripts/harness.cjs)）**：工作流程与运行生命周期总规范（9 大标准动作：`install / check / build / start / health / status / stop / e2e / deliver`）。
  - **支柱二 `speckit` + CMMI 00~09 扩展（[`scripts/cmmi-00-meta.cjs`](../../scripts/cmmi-00-meta.cjs) ~ [`scripts/cmmi-09-operations.cjs`](../../scripts/cmmi-09-operations.cjs)）**：全环节工程过程文档（`docs/00_meta_standards/`~`docs/09_operations/`）与特性规格包文档（`docs/specs/<domain>/<name>/`）统一治理引擎。

---

## 1. 北极星目标与成功判据 (North Star & Gate Criteria)

> **让任何数字员工或人类工程师，基于 `<500 Tokens` 声明式蓝图，在四位一体基座（Java Spring Boot 3 中台 + Vue3 Admin + UniApp 小程序/H5 + Expo Native App）上零污染孵化、自动展开全栈代码并通过嵌入式真 PostgreSQL 18.4 6 阶段 E2E 交付。**

| 编号 | 成功判据 | 机器验证入口 | 状态 |
| :--- | :--- | :--- | :--- |
| **G1** | 16 项快速工程门禁全过（0 Blocking 失败） | `pnpm harness check` (`node scripts/cmmi-06-quality.cjs check`) | ✅ 已达成 |
| **G2** | 零污染外部沙箱秒级白标孵化 | `node scripts/cmmi-01-management.cjs init --name <slug> --title "<中文名>" --target /tmp/<slug>-sandbox` | ✅ 已达成 |
| **G3** | `<500 Tokens` 蓝图自愈诊断 + 全栈代码生成 + 真 PG 18.4 6 阶段 E2E | `node scripts/cmmi-04-implementation.cjs deliver --file <domain>.blueprint.json --verify-e2e` | ✅ 已达成 |
| **G4** | 零 Docker 轻量运行档（嵌入式 PostgreSQL 18.4 + 嵌入式 Redis + CSPRNG 强凭据） | `pnpm run lite:check` (`scripts/lite-up.mjs`) | ✅ 已达成 |
| **G5** | 19 模块依赖闭包裁剪与 8 工具 MCP 编排端点 | `pnpm run trim:check` (`scripts/trim-modules.mjs`) | ✅ 已达成 |
| **G6** | 双底座 (`cooliebase-all` ↔ `yudao-quad-terminal`) 外部接口与多智能体入口 100% 同构 | `node scripts/cmmi-01-management.cjs pmo` | ✅ 已达成 |

---

## 2. 工作分解结构 (WBS Work Packages)

| WBS 编号 | 模块域 | 工作项描述 | 状态 | 验证证据 |
| :--- | :--- | :--- | :--- | :--- |
| **WS-A1** | 四端同源与网关 | `blueprint.template.json` 四端 `BASE_PATH` 同源注入 + Caddy/Nginx 声明式反代网关 | ✅ | `scripts/generate-gateway-config.mjs` |
| **WS-A2** | 子模块补丁收敛 | `apps/admin`、`apps/backend`、`apps/miniapp` 锁定上游纯净提交，差异收敛至 `deploy/patches/` | ✅ | `pnpm run check:submodules` |
| **WS-B1** | 零 Docker Lite 档 | `scripts/lib/ephemeral-pg.cjs` (Root-Safe PG 18.4) + `deploy/lite/runtime/` 嵌入式 PG/Redis | ✅ | `docs/specs/platform/lite-runtime-profile` |
| **WS-B2** | 模块裁剪与 MCP | `module-catalog.mjs` 19 模块闭包裁剪 + `yudao-mcp-server.cjs` 8 工具暴露 | ✅ | `docs/specs/platform/module-trim-and-mcp` |
| **WS-C1** | 声明式蓝图引擎 | `scripts/blueprint-engine.cjs` (`render` / `doctor` / `compile-domain` / `deliver --verify-e2e`) | ✅ | `docs/specs/platform/yudao-blueprint-engine-parity` |
| **WS-C2** | 全栈代码生成器 | `scripts/codegen-module.mjs` 支持白标 `<slug>-server`、AppController (`/app-api`)、4 态状态机、乐观锁、主子表与跨单据转化 | ✅ | `scripts/tests/blueprint-engine-e2e.test.mjs` |
| **WS-D1** | 双支柱 CMMI 00~09 | `scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs` + `speckit-cmmi-docs.cjs` + 6 大多 IDE 入口对齐 | ✅ | `pnpm run speckit -- cmmi matrix` |

---

## 3. PMO 接下来的待办工作池 (Next Action Backlog — P0 / P1 / P2)

> AI Agent 进场可执行 `pnpm run pmo`（或 `node scripts/cmmi-01-management.cjs pmo`）实时拉取最新待办雷达。

- [ ] **[P0 · 契约防漂移收敛]** 消减 `pnpm run check:drift` 中的 92 个前后端孤儿契约端点（对齐 `packages/api-client` 与 `apps/backend` Controller 路由），消除 `harness check` 唯一 Advisory 告警。
- [ ] **[P1 · 完结规格归档与 G5 证据封板]** 对已完成代码落地的规格（`yudao-blueprint-engine-parity`、`lite-runtime-profile`、`module-trim-and-mcp`）执行 `G5_PRE` 割接演练记录回填并归档至 `docs/specs/archive/`。
- [ ] **[P1 · 四端原生 App 壳业务页深化]** 推进 `apps/app` (Expo React Native) 原生端核心商城/会员业务页面与 `apps/miniapp` (UniApp) 的双端视觉与契约同构。
- [ ] **[P2 · 19 业务域蓝图预设库扩充]** 在 `scripts/blueprint-engine.cjs` 中扩充更多行业预设（ERP/WMS/MES/CRM/政务审批），实现一句话秒级生成垂直行业四端工程。
