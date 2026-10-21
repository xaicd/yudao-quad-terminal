# Requirements Specification: 零 Docker 单机轻量运行档（嵌入式真 PostgreSQL + 嵌入式真 Redis，后端子模块零改动）

> **Spec-Kit 标准需求规格说明书 (SRS: Software Requirements Specification)**
> 遵循 IEEE 29148 与 EARS (Easy Approach to Requirements Syntax) 严谨需求工程标准。
> 状态：`PLAN_APPROVED` | 规格类型：`feature` | 所属领域：`platform` | 规格标识：`lite-runtime-profile`
> 对应项目宪法：`.specify/memory/constitution.md` (Rule 0 ~ 13 项不可动摇工程铁律)

---

## 1. 业务目标与愿景 (Introduction & Business Goal)

让 yudao-server 在既不需要 Docker 也不需要任何外部服务的机器上单机跑起来：数据库用嵌入式真实 PostgreSQL（复用官方 PG 脚本），缓存用嵌入式真实 Redis 7.4.1（真二进制，非模拟器），全部差异落主仓 deploy/lite/，apps/backend 子模块一个字节都不改。



## 2. 术语定义与领域边界 (Glossary & Domain Scope)

| 术语 / 概念 | 英文标识 | 领域定义与所属模块 |
|---|---|---|
| 零 Docker 单机轻量运行档（嵌入式真 PostgreSQL + 嵌入式真 Redis，后端子模块零改动） | lite-runtime-profile | 本规格所交付的业务与技术上下文，严格收敛于 `platform` 领域边界 |
| 行级租户隔离 | TenantLineInnerInterceptor | 基于 MyBatis-Plus 租户插件自动在 SQL 注入 `tenant_id` 过滤条件，严禁跨租户越权 |
| 审计底座字段 | Audit Base Columns | 实体必须自动继承 8 大审计字段，严禁业务层手工更新审计元数据 |

## 3. 用户故事与角色矩阵 (User Stories & Personas)

1. **P0** [作为交付 / 实施工程师] 作为实施工程师，我要在 Docker 完全停止的情况下把 yudao-server 起来并成功登录，以便客户现场不依赖任何容器与外部服务。

2. **P0** [作为交付 / 实施工程师] 作为 AI Agent，我要用一条命令拉起 lite 档并探活 /admin-api，以便把后端接进自动化测试与门禁。

3. **P0** [作为交付 / 实施工程师] 作为安全负责人，我要 lite 档不出现 admin/admin123 这类弱默认凭据，引导账号的用户名与密码都由 CSPRNG 生成，以便不把可撞库的默认口令交付出去。

4. **P1** [作为交付 / 实施工程师] 作为开发，我要 lite 档与生产使用同一数据库方言与同一份官方 DDL、以及真实 Redis 语义，以便不出现『开发跑得通、上生产才炸』的漂移。

## 4. 关键业务不变量 (Key Business Invariants)

1. **子模块零改动** —— lite 全部差异落主仓 deploy/lite/ 与 scripts/；验收用『启动前后 git -C apps/backend status --porcelain 均为空』硬校验
2. **零弱默认凭据** —— 用户名与密码均由 CSPRNG 生成（拒绝采样消除取模偏置），bcrypt 哈希后写库；凭据文件 0600 且 gitignore；验收用『admin/admin123 登录必须失败』反证
3. **真实引擎而非替身** —— PG 与 Redis 都必须是真的：PG 为 18.4 官方二进制，Redis 为真 redis-server 7.4.1；验收用 INFO 版本号与关键命令实测，禁止模拟器
4. **零 Docker 零外部服务** —— 两个依赖都在本进程生命周期内由编排器拉起并成对回收；验收在本项目 compose 无容器时执行
5. **二进制与凭据不入库** —— redis 二进制、PG 数据目录、凭据文件全部落 .commandcode/lite/ 并被 .gitignore 排除

## 5. 验收标准清单 (Acceptance Criteria)

1. **THE system SHALL** 验证：node scripts/lite-up.mjs --dry-run 退出码 0 且打印将执行的确切步骤（PG 端口/数据目录、Redis 端口、SQL 脚本路径、java 命令）
2. **THE system SHALL** 验证：本项目 docker-compose.local.yml 无任何容器运行时，lite 档启动后 curl /admin-api/system/auth/login（用生成的引导凭据）返回 200 且响应体含 accessToken
3. **THE system SHALL** 验证：用上游弱默认凭据 admin/admin123 调用同一登录接口必须失败（非 200），证明确实未沿用种子弱账号
4. **THE system SHALL** 验证：lite 档启动前后执行 git -C apps/backend status --porcelain 均为空（子模块零改动硬验证）
5. **THE system SHALL** 验证：引导凭据文件 .commandcode/lite/credentials.env 权限为 600 且 git status 不显示其任何痕迹（未入库）
6. **THE system SHALL** 验证：嵌入式 PG 导入官方 apps/backend/sql/postgresql/ruoyi-vue-pro.sql 后，public 表数为 60、序列数为 48（已实测基线）
7. **THE system SHALL** 验证：Redis 由本档自行拉起且为真引擎：redis-cli INFO server 报 redis_version 7.4.1，且 EVAL / SCRIPT LOAD / EVALSHA / XADD / PUBLISH 全部可用（命令数 250）

## 6. 约束条件与技术边界 (Constraints & Non-Goals)

### 系统必须满足的架构约束 (The System SHALL Comply With)
* **THE system SHALL COMPLY WITH**: apps/backend 是 git submodule（上游 YunaiV/yudao-cloud）：一律不得改动其中任何文件（含 pom.xml 与 application.yaml）。lite 的全部差异落在主仓 deploy/lite/。
* **THE system SHALL COMPLY WITH**: 数据库与缓存都必须使用真实引擎，禁止模拟器替身：PostgreSQL 用真 PG 二进制，Redis 用真 redis-server。jedis-mock / ioredis-mock 之类模拟器不得进入 lite 运行期（仅上游单测可用）。
* **THE system SHALL COMPLY WITH**: 零弱默认凭据：禁止 admin/admin123 这类弱用户名与弱密码；引导账号的用户名与密码均由 CSPRNG 生成高熵值，凭据文件权限 0600、位于 .gitignore 覆盖范围内、只回显一次；上游种子里的 admin 账号必须被改名并改写密码，其余弱演示账号一律置为禁用。
* **THE system SHALL COMPLY WITH**: 元件许可边界：lite 档采用的 Redis 7.4.1 为 RSALv2 / SSPLv1（source-available，非 copyleft，不传染工程代码）。lite 定位为本地开发/演示，严禁用于对外提供 Redis 兼容托管服务；一旦需要随交付物分发，必须切换到 BSD-3 方案（见 DAR-20261021）。
* **THE system SHALL COMPLY WITH**: 二进制不入库：RDB/RDB 二进制、PG 数据目录与引导凭据一律落在 .commandcode/lite/ 并由 .gitignore 排除，遵守三存三不存法则。
* **THE system SHALL COMPLY WITH**: PG 运行时装在自包含目录 deploy/lite/runtime/，不污染根 pnpm workspace（实测 pnpm 在 node-linker=hoisted 下会静默跳过该可选平台二进制包）。

### 明确不做与负向范围 (Non-Goals)
* 不改 apps/backend 任何文件（含 pom.xml、application.yaml、Java 源码）。
* 不做 H2 / SQLite 的 DDL 移植（DAR-20261021 已判定 ROI 不成立）。
* 不追求『去掉 Redis』：Redis 在本仓是结构性依赖（三条原文证据见 design.md），另立 spec 处理。
* 不使用 jedis-mock 等模拟器充当 lite 的运行期 Redis。
* 不把 lite 档当生产方案，也不随交付物对外分发（分发前须按 DAR 切换到 BSD-3 方案）。
* 不做多实例集群：lite 档面向单机开发 / 演示。
