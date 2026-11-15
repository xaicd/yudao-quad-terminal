# SWARM.md — 企业级多智能体蜂群协同与零返工全栈交付宪法 (Universal Multi-Team Swarm Playbook)

> **定位**：面向企业级四端项目（`Stage B0`–`B5` 全链路 23 道硬门禁交付标准）的母本内置多团队/多智能体协同作战手册。
> 所有从本母本派生的项目（`pnpm project:hatch` / `pnpm project:init`）在 Day 0 自动携带本文件，确保后续任意业务项目开箱复刻同等级别的交付速度、工程纪律与零返工质量。

---

## 1. 铁律总纲：6 条零返工工程公理 (Six Zero-Rework Axioms)

1. **阶段 0 需求物理围栏（Zero Parent-Folder Contamination）**：
   - 进场第一步锁定需求真源仅限 **`<project-root>/docs/`**（及项目根 `GOAL.md` / `AGENTS.md`）。
   - **严禁**向上层父目录（`../`）或兄弟项目目录读取任何旧文档、旧配置或参考图，彻底杜绝跨项目业务术语串味与架构污染。
2. **`< 25KB` 分片写入与确定性脚本生成（Chunked Writes & Deterministic Generators）**：
   - 单次文件写入工具调用严格控制在 **`< 25KB`** 以内，避免大输出触发流截断或超时重试。
   - **严禁让大模型手写数千行重复 SQL 种子或静态样板**：凡超过 50 行的领域种子数据（如省市机构树、多维指标流水、审计台账），一律编写 `< 150` 行确定性 Node 生成器（`scripts/seed-domain-*.mjs`），**`19ms` 毫秒级落盘**替代 5 分钟大模型生成超时！
3. **单一写者文件归属矩阵（Single-Writer File Ownership）**：
   - 同一时刻每个物理目录/文件只能归属 **唯一写者 Agent**；只读校验员（Verifier）只报告问题与行号，绝不并发抢改业务源码。
4. **零冲突 6 端口矩阵与 `{ admin off }` 四平面网关（Zero-Conflict Port Matrix）**：
   - 项目孵化即落盘 `.env.ports`（`GATEWAY_PORT`、`BACKEND_PORT`、`ADMIN_PORT`、`MINIAPP_PORT`、`DB_PORT`、`REDIS_PORT`）。
   - 统一网关 `deploy/gateway/caddy/<slug>.caddy` 顶部强制声明 **`{ admin off }`**（规避 `:2019` Caddy 管理端口冲突），单端口同源承载 `/cockpit/`、`/admin/`、`/2c/`、`/admin-api/`（`uri strip_prefix /<slug>`）与 `/v3/api-docs`，**严禁编写任何临时 Node HTTP 代理脚本**。
5. **真实数据库 + 双模真实中间件桥接（Zero Fake Mock & Dual-Mode Middleware Bridge）**：
   - 本地零 Docker 档默认拉起真实 **Embedded PostgreSQL 18.4 + Embedded Redis**；当宿主机或远程算力节点提供真实中间件（Apache Doris / RocketMQ / MinIO / XXL-JOB）时，通过环境变量无缝切换至真实协议探针与写入客户端，严禁前端伪造静态假图表。
6. **23 道硬门禁实弹终审（Coolie Layer-B `G1`–`G23` Gatekeeper）**：
   - 任何口头宣称的“已完成”一律无效；必须跑通 `pnpm gates:23`（含 AES-256-ECB `@ApiEncrypt` 连续 3 次登录防连接池假阳性、`<= 4` 字导航菜单、`320dp` 零横向溢出、固定底栏 `elementFromPoint` 防遮挡、`>= 20KB` 且 MD5 100% 唯一的证据截图）。

---

## 2. 蜂群编队与单一写者所有权矩阵 (Swarm Roster & Ownership Matrix)

在执行 `Stage B0`–`B5` 并行冲刺时，Coordinator 按以下正交边界切分写权限：

| 角色代号 | 独占可写路径（Single-Writer Scope） | 严禁触碰路径 | 交付判据（Done Criteria） |
| :--- | :--- | :--- | :--- |
| **`coordinator`** | `GOAL.md`, `.env.ports`, `docs/01_management/`, 顶层网关与发布归并 | 业务模块具体 Vue/Java 实现细节 | 阶段门禁 `pnpm verify:b0`..`pnpm verify:b5` 全绿 |
| **`backend-domain-author`** | `apps/backend/server/src/main/java/**/module/<domain>/**`, `apps/backend/sql/postgresql/<domain>_*.sql`, `scripts/seed-domain-*.mjs` | `apps/admin/**`, `apps/miniapp/**` | `pnpm build:backend` + `mvn test` 0 报错，OpenAPI `/v3/api-docs` 暴露完整契约 |
| **`admin-ui-author`** | `apps/admin/src/views/<domain>/**`, `apps/admin/src/api/<domain>/**` | `apps/backend/**`, `apps/miniapp/**` | `pnpm build:admin` 0 报错，零 Mock 引用，菜单 `<= 4` 字，按钮紧凑，绑定真实 API |
| **`cockpit-miniapp-author`** | `apps/admin/src/views/cockpit/**` (或 `apps/cockpit/**`), `apps/miniapp/src/**` | `apps/backend/**`, B 端常规 CRUD 视图 | `pnpm build:miniapp` 0 报错，`375×812` 与 `320×568` 零溢出，底栏零遮挡 |
| **`qa-e2e-verifier`** | `e2e/*.spec.mjs`, `docs/evidence/**` | `apps/**`（发现缺陷发回对应 Author 修复） | 多视口 Playwright 全绿，`docs/evidence/*.png` 全部 `>= 20KB` 且 MD5 唯一 |
| **`cwall-sre-deployer`** | `deploy/cwall/**`, 远程节点独立目录与进程 | 宿主机其他项目容器、共享网关、全局端口 | 远程四平面 HTTP 200，`pnpm verify:b5` 通过 |

> **面板通信省流纪律**：禁止发送“收到 / 开始干活”等空洞礼貌消息；中间交接只 `@` 下一跳责任人，仅在遇到跨模块决策阻塞或最终交付物就绪时 `@coordinator`。

---

## 3. 全生命周期标准阶段流水线 (`Stage B0` → `Stage B5`)

```bash
# Stage B0：架构边界锁定、零冲突端口分配、三员分立脚手架与静态 23 门禁
pnpm verify:b0
pnpm gen:three-role -- --prefix sys_sec

# Stage B1：全栈生产态编译、真 PG 18.4 + 真 Redis 拉起、AES 加密 3 连登验证
pnpm verify:b1

# Stage B2：核心领域状态机、三员分立 RBAC 互斥与 Append-Only SHA-256 审计单测
pnpm verify:b2

# Stage B3：多视口 (1920/1440/375/320dp) 零假 Mock Playwright E2E 与防遮挡截图取证
bash start.sh
pnpm verify:b3

# Stage B4：出厂终审 —— 静态门禁 + Coolie Layer-B G1-G23 实弹核验 + 证据 JSON 落盘
pnpm verify:b4

# Stage B5：远程算力节点 (cwall) 零冲突独立部署与跨网四平面拨测
pnpm verify:b5
```

---

## 4. 四大高频致命工程陷阱与底座内置解法 (Battle-Tested Pitfalls & Built-In Guards)

### 4.1 带连字符项目名 (`demo-mall` / `star-cloud`) 的 SQL 与 Java 类名陷阱
- **故障现象**：若把 `yudao_demo01_contact` 简单字符串替换为 `demo-mall_demo01_contact`，PostgreSQL 导入立刻报语法错误（未加引号的标识符不允许含 `-`）；同理 `YudaoServerApplication` 变成 `Demo-mallServerApplication` 会导致 Maven 编译崩溃，Nginx `upstream demo-mall_backend` 也会报错。
- **内置根治**：`scripts/project-reactor.mjs` 的 `deriveSlugForms()` 自动区分五种形态：
  - 路由前缀与 Spring 配置前缀保持连字符 `projectName`（如 `/demo-mall`、`demo-mall.info`）；
  - SQL 表名/索引/序列与数据库用户名强制使用下划线 `snakeSlug`（如 `demo_mall_demo01_contact`）；
  - Java 类名使用 `pascalSlug`（`DemoMallServerApplication`），变量名使用 `camelSlug`，常量使用 `upperSnakeSlug`；
  - Nginx `upstream` 强制使用 `${snakeSlug}_backend`。

### 4.2 PostgreSQL 18.4 + Alibaba Druid 连接池「首登成功、二登 500」假阳性陷阱
- **故障现象**：PostgreSQL 扩展查询协议关闭 PreparedStatement 后，Druid 连接池若开启 `pool-prepared-statements: true` 会复用已关闭句柄，抛出 `PSQLException: This statement has been closed`。只测 1 次登录会侥幸通过，线上连续请求交替 500！
- **内置根治**：
  1. `deploy/lite/application-lite.yaml` 固化 `pool-prepared-statements: false` 与 `validation-query: SELECT 1`；
  2. `scripts/lite-up.mjs` 自动为 JDK 17 注入 `--add-opens=java.base/java.nio=ALL-UNNAMED` 与 `sun.nio.ch=ALL-UNNAMED`（保障 Netty / RocketMQ / 堆外内存零反射报错）；
  3. `pnpm lite:verify` 与 `G17` 强制执行 **AES-256-ECB `@ApiEncrypt` 连续 3 次登录** + `admin/admin123` 弱口令拒绝反证。

### 4.3 前端脚手架 Mock 图表残留与登录 E2E 脆弱选择器陷阱
- **故障现象**：上游管理端默认携带 `views/Home/{Index2.vue,echarts-data.ts,types.ts}` 静态假图表及 `LoginForm.vue`「萌新必读」外包链接；且 Element Plus 输入框无固定 `data-testid`，导致 Playwright 多语言环境下偶发定位漂移。
- **内置根治**：`project-reactor.mjs` 在孵化阶段自动执行 `sanitizeAdminFrontendForDerivedProject()`：
  1. 物理删除 `Home/{Index2.vue,echarts-data.ts,types.ts}` 并生成零假数据真实会话工作台 `Home/Index.vue`；
  2. 在 `LoginForm.vue` 自动注入 `data-testid="login-username"`、`data-testid="login-password"`、`data-testid="login-submit"` 并剥离推广链接；
  3. 在 `routerHelper.ts` 守护 `import.meta.glob('../views/**/*.{vue,tsx}')` 并支持顶层 `/cockpit` 全屏无侧边栏大屏路由。

### 4.4 IT 三员分立（系统管理员 / 业务操作员 / 安全审计员）与防篡改审计链
- **一键生成**：政企/运营商项目直接运行：
  ```bash
  pnpm gen:three-role -- --prefix di
  ```
  自动生成 PostgreSQL `di_sec_audit_log` 表 + PL/pgSQL `BEFORE INSERT` SHA-256 哈希链触发器 + `BEFORE UPDATE OR DELETE` 硬件级拒写触发器 + Spring `ThreeRoleGuard.java` 切面守卫；同时 `lite-credentials.mjs` 自动为 `sys_admin`、`biz_admin`、`audit_admin`、`oncall_sre` 签发独立 16 位 CSPRNG 口令并写入 `0600` `.commandcode/lite/credentials.env`。

---

## 5. 双模真实中间件桥接与 Apache Doris `307` Stream Load 黄金范式

当项目需要对接大数据实时入仓（Apache Doris）、消息总线（RocketMQ）、对象存储（MinIO）或分布式调度（XXL-JOB）时，遵循 **环境变量驱动双模探测，严禁硬编码 Mock**：

### Apache Doris Stream Load 两跳重定向 (`307 Temporary Redirect`) 必避大坑
Doris 的 `_stream_load` 接口由 FE（如 `:8030`）接收请求后返回 **`HTTP 307 Temporary Redirect`** 指向 BE（如 `:8040`）。直接用默认 `java.net.http.HttpClient.Redirect.NORMAL` 会踩中两个致命坑：
1. **跨端口重定向自动剥离 `Authorization` 请求头**，导致第二跳 BE 返回 `401 Unauthorized`；
2. **Docker 内部 BE 容器主机名（如 `172.x.x.x` 或容器内网 hostname）在宿主机/跨网不可达**。

**标准两跳实现范式（Java 17）**：
1. 构建 `HttpClient.newBuilder().followRedirects(HttpClient.Redirect.NEVER).build()`，**关闭自动重定向**；
2. **第一跳（FE）**：向 `http://${dorisHost}:${feHttpPort}/api/${db}/${table}/_stream_load` 发送 `PUT`，携带：
   - `Authorization: Basic <base64(user:password)>`
   - `Expect: 100-continue`
   - `format: json`、`strip_outer_array: true`
3. **拦截 `307` 并重写第二跳（BE）**：读取响应头 `Location`，将其中的 host:port 重写为可达的 `${dorisHost}:${beHttpPort}`（当配置了显式 BE 端点时），**原样重新挂上 `Authorization`、`Expect: 100-continue`、`format: json`、`strip_outer_array: true` 请求头**再次执行 `PUT`，校验返回 JSON 中 `"Status": "Success"`（或 `"Publish Timeout"` 幂等对账）。

---

## 6. 远程算力节点 (`cwall`) 零冲突独立部署 SOP

1. **先勘探、后落盘（Read-Only Recon First）**：
   - 登录远程节点后先执行 `ss -tulpn` 核验 `.env.ports` 声明的 6 个端口全部空闲；
   - **严禁**修改宿主机全局 `/etc/caddy/Caddyfile`、`/etc/nginx/`，**严禁**停止或重启任何其他团队/项目的 Docker 容器或进程。
2. **独立工作区与 `{ admin off }` 网关**：
   - 代码同步至独立目录后，使用 `bash deploy/cwall/start-cwall.sh` 渲染 `.commandcode/cwall/<slug>.caddy`（内置 `{ admin off }`）并独立拉起后端与网关。
3. **跨网四平面实弹验收**：
   - 执行 `pnpm verify:b5` 与 Playwright 远程 `E2E_BASE_URL=http://<cwall-ip>:<gateway-port>/<slug>` 回归，确认 `/cockpit/`、`/admin/`、`/2c/`、`/admin-api/` 与 `/v3/api-docs` 全部 `HTTP 200` 且零控制台报错。
