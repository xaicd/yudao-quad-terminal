# 🧭 yudao-quad-terminal 项目 PMO 待办与全息状态大盘 (Project PMO Dashboard)

> **实时刷新命令**: `pnpm run pmo`（或 `node scripts/cmmi-01-management.cjs pmo [--write|--json]`）
> **项目坐标**: `yudao-quad-terminal@1.1.0` | **分支**: `main` | **HEAD**: `4c88efe docs(harness): unify 30s AI agent playbook, multi-IDE entry files and agent-route (55 minutes ago)` | **工作区净度**: ⚠️ 31 处未提交变更

## 一、Spec-Kit 规格漏斗与 WBS 原子任务进度

- **活跃规格总数**: `4` 个 ｜ 🔥 **施工中 (WIP)**: `0` 个 ｜ 📋 **已立项待开工**: `0` 个 ｜ 📝 **待填骨架**: `0` 个 ｜ 📦 **已完结待归档**: `4` 个

### 📦 1.3 代码与任务已完结规格 (Ready for Gate Evidence / Archive: 共 4 个)
- **代表规格**: `core/init-baseline` (3/3)、`platform/module-trim-and-mcp` (8/8)、`platform/lite-runtime-profile` (9/9)、`platform/yudao-blueprint-engine-parity` (6/6)
- **收口动作**: 核对 `evidence.json` 门禁证据后执行 `node scripts/cmmi-09-operations.cjs archive --name <spec>` 归档至 `docs/specs/archive/`。

## 二、工程门禁、路线图与技术债待办池 (Engineering & Tech-Debt Backlog)

| 优先级 | 领域 / 门禁维度 | 待办事项描述 | 核验 / 执行命令 |
| :--- | :--- | :--- | :--- |
| **P0** | 前后端契约孤儿端点收敛 (Advisory -> 0) | packages/api-client 与 apps/backend Controller 存在 92 个未对齐孤儿端点，收敛后 16/16 门禁全绿无告警 | `pnpm run check:drift` |
| **P1** | 四端原生 App (apps/app) 业务页深化 | 推进 apps/app (Expo React Native) 与 apps/miniapp (UniApp) 商城/会员核心页面双端同构 | `pnpm harness check` |
| **P2** | 19 业务域声明式蓝图预设扩充 | 在 scripts/blueprint-engine.cjs 中扩充 ERP/WMS/MES/CRM 行业蓝图预设模板 | `node scripts/cmmi-01-management.cjs render --help` |

## 三、🎯 本项目 PMO 接下来的待办工作队列 (Prioritized Next Actions)

| 序 | 优先级 | 归属范围 | 接下来的具体待办工作 | 立即执行命令 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **P1** | `已完结规格归档池 (4 个)` | 对已完成全部任务的规格 (如 core/init-baseline) 核销门禁证据并归档 | `node scripts/cmmi-09-operations.cjs archive --name init-baseline` |
| 2 | **P0** | `前后端契约孤儿端点收敛 (Advisory -> 0)` | packages/api-client 与 apps/backend Controller 存在 92 个未对齐孤儿端点，收敛后 16/16 门禁全绿无告警 | `pnpm run check:drift` |
| 3 | **P1** | `四端原生 App (apps/app) 业务页深化` | 推进 apps/app (Expo React Native) 与 apps/miniapp (UniApp) 商城/会员核心页面双端同构 | `pnpm harness check` |
| 4 | **P2** | `19 业务域声明式蓝图预设扩充` | 在 scripts/blueprint-engine.cjs 中扩充 ERP/WMS/MES/CRM 行业蓝图预设模板 | `node scripts/cmmi-01-management.cjs render --help` |
