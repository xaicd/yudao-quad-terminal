# lite 档 —— 零 Docker、零外部服务的单机运行档

> 定位：**coolie 工坊项目的底座加速器**。让开发者和 AI Agent 在一台干净机器上一条命令把
> `yudao-server` 连数据库和缓存一起拉起来，**不需要 Docker、不需要 MySQL/Redis 服务**。
>
> 关联资产：`docs/specs/platform/lite-runtime-profile/`（规格）·
> `docs/01_management/dar/DAR-20261021-lite-runtime-dependencies.md`（选型决策）

## 1. 它由什么组成

| 组件 | 实现 | 说明 |
|---|---|---|
| 数据库 | **嵌入式真 PostgreSQL 18.4** | npm `embedded-postgres`，进程内启动；直接执行**官方** `apps/backend/sql/postgresql/*.sql`，零 DDL 移植 |
| 缓存 | **嵌入式真 Redis 7.4.1** | 从 Maven 制品 `com.github.lansheng228:embedded-redis:7.4.1` 抽取预编译二进制；真 Redis 语义，非 jedis-mock 模拟器 |
| 配置 | `deploy/lite/application-lite.yaml` | 外置覆盖，经 `--spring.config.additional-location` 注入；**子模块零改动** |
| 编排 | `scripts/lite-up.mjs` | 预检 → 起双引擎 → 导官方 SQL → 注入凭据 → 起应用 → 探活 |
| 凭据 | `.commandcode/lite/credentials.env` | CSPRNG 生成，权限 600，已 gitignore |

## 2. 前置条件

- JDK 17、Maven 3.8+、Node 20+
- 首次运行需要网络（拉 npm 的 PG 二进制、Maven 的 Redis 制品与 PG 驱动）
- 安装 lite 运行时依赖：

```bash
cd deploy/lite/runtime && pnpm install
```

## 3. ⚠️ 先构建 fat jar（必须两步）

模块 `yudao-module-*-server` 的 pom 都绑定了 `spring-boot repackage` 且**没有 `exec` classifier**。
若用单条命令构建，模块 jar 会先变成 fat jar，再被嵌进 `yudao-server` 的 `BOOT-INF/lib`，形成
**「fat jar 套 fat jar」**：类落在嵌套 jar 的 `BOOT-INF/classes/` 下，模块 bean 与 MyBatis Mapper
全部扫描不到，应用必然启动失败（典型症状：`No MyBatis mapper was found ...` +
`required a bean of type 'ApiErrorLogCommonApi'`）。

```bash
cd apps/backend
# 1) 依赖模块装成「普通库 jar」（跳过 repackage）
mvn -B clean install -DskipTests -pl yudao-server -am -Dspring-boot.repackage.skip=true
# 2) 只对 yudao-server 做 repackage
mvn -B package -DskipTests -pl yudao-server
```

正确产物体积约 **189MB**；若看到 500MB+ 且启动报上述错误，就是踩了这个坑（`lite-up` 会自动检测并提示）。

`scripts/lifecycle.sh build` 与 `pnpm lifecycle:build` 已改用上述两步法。

### 构建入口

```bash
pnpm build:backend   # 两步 Maven 构建（已实测）：普通库 jar + 只 repackage yudao-server → 189MB
pnpm build:admin     # 前端构建；解析真实 vite 入口（hoisted 布局），缺依赖才显式 SKIP
pnpm build           # 两者串联
```

> ✅ `pnpm build:admin` **已实测通过**（`✓ built in 23.56s`，产物 `apps/admin/dist` 24.6MB）：
> 子模块 `apps/admin` 已 rebase 到上游 `master`（`36ede93e9`）并重放本仓的 ApiEncrypt 本地提交，
> 上游缺失的 `src/views/oa/utils/*` 已到位。前端构建现为 `gate:full` 的 blocking 项 `admin-build`。

## 4. 启动

```bash
pnpm lite:up          # 拉起并常驻；Ctrl-C 成对回收 Redis 与 java
pnpm lite:verify      # 跑完整验收（含弱默认凭据反证）后退出
pnpm lite:down        # 收割残留（node 非优雅退出后 redis/PG/java 会占着端口）
node scripts/lite-up.mjs --dry-run         # 只看计划与预检
node scripts/lite-up.mjs --rotate-credentials
node scripts/lite-up.mjs --pg-port 55433 --redis-port 63800   # 换端口
node scripts/lite-up.mjs --redis-variant redis-6.2.6-bsd      # 切 BSD-3 变体（可随交付物分发）
pnpm gate:full        # 门禁 full 档会自动跑 lite:verify（缺前置条件标 skipped，不算通过）
```

首次启动会回显一次生成的账号与口令；其后只从 `.commandcode/lite/credentials.env` 读取。

## 5. 凭据策略（硬约束）

- **禁止弱默认凭据**：不使用 `admin` / `admin123` 这类可猜值。
- 账号由 CSPRNG 生成，且符合后端校验 `^[a-zA-Z0-9]{4,30}$`（**不能带下划线**）。
- 口令由 CSPRNG 生成，长度 16 —— 因为 `AuthLoginReqVO` 的 `@Length(min=4, max=16)` 是登录请求的硬上限。
- 导入种子数据后立即：把 `system_users.id=1` 改成生成的高熵账号与 bcrypt(10) 口令，其余种子弱演示账号置为禁用。
- Redis 同样启用 `requirepass`（32 位 CSPRNG 口令），且仅绑定 `127.0.0.1`。

## 6. ⚠️ 许可边界

lite 档的 Redis 为 **7.4.1**，许可为 **RSALv2 / SSPLv1**（source-available，非 copyleft，不传染工程代码）。

- ✅ 允许：本地开发、演示、CI
- ❌ 禁止：用于对外提供 Redis 兼容托管服务
- ❌ 禁止：随交付物对外分发 —— 分发前必须切换到 **Redis 6.2.6（BSD-3）** 或 **Valkey**，并重开 DAR 评审

## 7. 与 local / 生产的差异

| 维度 | local（现状） | lite（本档） | 生产 |
|---|---|---|---|
| 数据库 | MySQL 8.0 容器 | 嵌入式 PG 18.4（复用官方 PG DDL） | MySQL 或 PG |
| 缓存 | Redis 7.2 alpine 容器 | 嵌入式 Redis 7.4.1（无持久化） | Redis 7.2+ |
| 容器依赖 | 需要 Docker | **无** | 视部署而定 |
| 登录 mock | `mock-enable: true` | **false**（必须真实账号密码） | false |
| 验证码 | 关闭 | 关闭（若开启，走真 Redis） | 开启 |

## 8. 排障

| 现象 | 原因与处理 |
|---|---|
| `fat jar 套 fat jar` / 缺少 `ApiErrorLogCommonApi` | 用第 3 节的两步构建重新打包 |
| `api-encrypt.requestKey 未取到` | `apps/backend/yudao-server/src/main/resources/application.yaml` 的 `yudao.api-encrypt` 块被改动；可用 `LITE_API_ENCRYPT_REQUEST_KEY` 覆盖 |
| `账号格式为数字以及字母` | 手改了凭据文件且账号含非法字符；删掉 `.commandcode/lite/credentials.env` 让其重新生成 |
| 端口被占用 | 用 `--pg-port/--redis-port/--server-port` 换端口 |
| 登录**间歇性** 500（日志含「这个 statement 已经被关闭」） | PostgreSQL 下**不要**开 Druid 的 PreparedStatement 池：`pool-prepared-statements: false`（本档已默认关闭）。该缺陷只在连续登录时暴露，`lite:verify` 已内置连续登录回归防护 |
| PG 数据目录损坏 | `pnpm lite:clean` 后重启（会重新 initdb 并重导官方脚本） |
