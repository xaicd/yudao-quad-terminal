# 《Yudao Quad-Terminal》项目立项章程与范围说明书 (Project Charter, `v1.2.0`)

> **CMMI 实践域**: 项目策划与监控 (PLAN / MC)  
> **工程标识**: `yudao-quad-terminal` (`templateVersion: 1.2.0`)  
> **技术基线**: Java 17 + Spring Boot 3.5.15 + MyBatis-Plus + Embedded PostgreSQL 18.4 + Redis + Vue 3 Admin + Uni-App + Expo SDK 52  

---

## 一、项目定位与核心商业价值

`yudao-quad-terminal` 是面向中大型企业与政企数字化交付的 **四位一体企业级多端母版基座**：
1. **四端同源开箱即用**：统一收拢 Java 微服务/单体后端（`apps/backend`）、Vue 3 B 端运营管理中台（`apps/admin`）、Uni-App 微信小程序/H5（`apps/miniapp`）与 Expo React Native 原生双端 App（`apps/app`），通过 `packages/api-client` 与 `packages/shared-types` 共享单一 OpenAPI 强类型契约。
2. **零污染白标净室孵化**：支持通过 `pnpm project:hatch` / `pnpm project:init` 在 10 秒内派生出包名独立、端口零冲突、去除全部上游推广痕迹的客户工程，并与姊妹基座 `cooliebase-all` (`v1.5.0`) 保持 100% 同名同参 `.cjs` 工具链契约。
3. **零 Docker 真实数据库闭环**：内置 Embedded PostgreSQL 18.4 与 Embedded Redis（`pnpm lite:up` / `pnpm lite:verify`），无需外部容器服务即可完成 60 张核心库表与加密连续登录全链路验证。

---

## 二、范围边界（In Scope / Out of Scope）

- **纳入范围（In Scope）**：
  - 19 个官方后端业务模块（`system`, `infra`, `member`, `pay`, `mall`, `crm`, `erp`, `bpm`, `ai`, `mp`, `report`, `iot`, `mes`, `wms`, `oa`, `hrm`, `fms`, `pms`, `im`）及声明式按需闭包裁剪（`pnpm trim:modules`）；
  - `<500 Tokens` 声明式领域蓝图编译、4 字菜单自愈与四端全栈代码生成（`pnpm blueprint:deliver`）；
  - 只读上游子模块纯指针治理与 `deploy/patches/` 声明式补丁收敛；
  - CMMI 00~09 全生命周期工程文档（统一归口 `docs/`）、17/20 道工程门禁、10 项门禁反向控制与 23 道出厂硬门禁。
- **排除范围（Out of Scope）**：
  - 不直接在只读子模块（`apps/{backend,admin,miniapp}`）内提交本地分叉历史；
  - 不在母本仓库内存放任何特定客户生产数据、瞬态探针快照或明文私钥凭据。

---

## 三、治理角色与职责矩阵（RACI）

| 角色 | 核心职责 | 关键把关门禁 |
| :--- | :--- | :--- |
| **PMO / 项目总控** | 需求分诊、里程碑排期、规格任务追踪与发布签批 | `pnpm pmo` · `pnpm specs:health` |
| **系统架构（FDA）** | 多租户隔离边界、四平面网关拓扑、模块闭包裁剪与 DAR 选型 | `pnpm compat:check` · `pnpm trim:check` |
| **全栈研发（Core SWE）** | 蓝图声明、Java 6 层服务、四端界面交互与 OpenAPI SDK 同步 | `pnpm typecheck` · `pnpm check:drift` |
| **质量验证（QA）** | 99 项脚本单测、嵌入式真 PG 验收、四视口 E2E 与门禁反向控制 | `pnpm test:scripts` · `pnpm harness:controls` |
| **可靠性工程（SRE）** | 两步 Maven 制品构建、SHA-256 指纹签发、8 动词服务守护与秒级回滚 | `pnpm release:package` · `pnpm service:health` |
