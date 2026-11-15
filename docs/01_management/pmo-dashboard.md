# 🧭 《Yudao Quad-Terminal Master Base》项目 PMO 待办与全息状态大盘 (Project PMO Dashboard)

> **实时刷新命令**: `pnpm run pmo`（或 `node scripts/cmmi-01-management.cjs pmo [--write|--json]`）
> **状态基线**: CMMI-01 立项与待办总控标准模板（派生业务项目执行 `pnpm run pmo -- --write` 自动注入实时进度）

## 一、Spec-Kit 规格漏斗与 WBS 原子任务进度

- **活跃规格总数**: `0` 个 ｜ 🔥 **施工中 (WIP)**: `0` 个 ｜ 📋 **已立项待开工**: `0` 个 ｜ 📝 **待填骨架**: `0` 个 ｜ 📦 **已完结待归档**: `0` 个

## 二、标准研发推进入口 (Standard Delivery Actions)

| 优先级 | 生命周期阶段 | 标准执行动作描述 | 核验 / 执行命令 |
| :--- | :--- | :--- | :--- |
| **P0** | CMMI-02 需求分诊与立项 | 对新业务需求执行确定性分诊，生成 `<500 Tokens` 领域蓝图或 Spec-Kit 规格包 | `pnpm run agent:route -- "<需求描述>"` |
| **P1** | CMMI-04/05 蓝图全栈交付 | 执行蓝图自愈、四端同源代码展开与嵌入式真 PostgreSQL 18.4 六阶段 E2E 验收 | `pnpm run blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e` |
| **P2** | CMMI-06/07 门禁与发布封板 | 跑通快速质量门禁、兼容契约守卫与 23 道出厂门禁，生成制品指纹 | `pnpm gate:fast && pnpm compat:check` |

## 三、🎯 接下来的待办工作队列 (Prioritized Next Actions)

| 序 | 优先级 | 归属范围 | 接下来的具体待办工作 | 立即执行命令 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **P0** | `CMMI-01 PMO` | 扫描当前工作区活跃规格与 WBS 待办队列 | `pnpm run pmo` |
| 2 | **P1** | `CMMI-06 QA` | 校验工程门禁、子模块补丁与契约一致性 | `pnpm gate:fast` |
