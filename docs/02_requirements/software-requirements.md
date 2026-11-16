# 《Yudao Quad-Terminal》软件需求规格说明书 (SRS - Software Requirements Specification, `v1.2.0`)

> **CMMI 门禁**: G1 需求基线门禁 (`specs-health` / `menu-standard`)  
> **规范语法**: IEEE 29148 / EARS (Easy Approach to Requirements Syntax)  
> **适用版本**: `v1.2.0`  

---

## 一、核心功能性需求（EARS 严谨规格）

1. **[REQ-001] 多企业租户行级数据隔离**
   - **WHEN** 任意已鉴权租户会话发起业务读写请求；
   - **THEN** 后端持久层 **SHALL** 通过 `TenantDatabaseInterceptor` 自动注入并强校验 `tenant_id` 边界，阻断任何跨租户数据穿透。

2. **[REQ-002] CSPRNG 高熵凭据与 `@ApiEncrypt` 登录传输加密**
   - **WHEN** 系统执行本地零 Docker 引导或客户端调用 `POST /admin-api/system/auth/login`；
   - **THEN** 系统 **SHALL** 使用 CSPRNG 动态签发高熵初始凭据（拒绝任何默认弱口令），并强制校验 `X-Api-Encrypt` 请求头与 AES-256-ECB 加密报文。

3. **[REQ-003] 导航菜单严格 `<= 4` 字与上游推广净室化**
   - **WHILE** 渲染或生成任意可见目录与页面级导航菜单（`system_menu.type IN (1, 2)`）；
   - **THE SYSTEM SHALL** 强制约束 `char_length(name) <= 4`（完整说明存入 `remark`），并在导入种子库与派生工程时自动隐藏上游推广外链与清除静态假图表。

4. **[REQ-004] `<500 Tokens` 声明式蓝图全栈同源展开**
   - **WHEN** 研发人员或 AI Agent 输入 `<domain>.blueprint.json` 并执行 `pnpm blueprint:deliver`；
   - **THEN** 蓝图引擎 **SHALL** 自动完成菜单/权限码自愈、展开 16 份 Spec-Kit 规格文档、生成 Java 6 层代码 + Vue 3 视图 + 强类型 TS SDK + PostgreSQL/MySQL DDL，并支持真库 6 阶段 E2E 核验。

5. **[REQ-005] 单一端口 `{ admin off }` 四平面网关同源路由**
   - **WHEN** 生成或启动项目统一网关（默认 `:48120`）；
   - **THEN** Caddy 网关配置 **SHALL** 启用 `{ admin off }` 并在同一 `BASE_PATH`（`/<slug>`）下无冲突承载 `/cockpit/`、`/admin/`、`/2c/`、`/admin-api/`（含 `/app-api/`、`/open-api/`）与 `/v3/api-docs`。

6. **[REQ-006] 政企 IT 三员分立与防篡改哈希链审计**
   - **WHERE** 交付项目启用政企合规三员分立（`pnpm gen:three-role`）；
   - **THE SYSTEM SHALL** 强制隔离 `sys_admin`、`biz_admin`、`audit_admin` 角色职责，并在 PostgreSQL 审计表上挂载 SHA-256 前后向哈希链触发器与硬件级拒改/拒删触发器。

---

## 二、非功能性与架构边界约束

- 核心管理与业务读写 API 在本地/单节点基线下 P99 响应延迟 `< 200ms`，生产目标可用性 `>= 99.95%`；
- 全仓所有工程文档、规格、知识库、Release 说明与审计报告统一归口 `docs/`，严禁顶层并行文档目录。
