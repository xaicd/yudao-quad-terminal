# TelePulse 全生命周期对标审计与母本能力回灌报告 (Mother Blueprint Benchmark & Backport Audit)

> **CMMI 过程资产** | 阶段: 00 | 类型: audit | 编号: BP-20261113 | 版本: 1.0 | 状态: APPROVED
> 对标样本：`tele-pulse`（提交区间 `bdf6048..3efa39e`，Stage B0–B5 23/23 硬门禁通过） vs 上游母本 `yudao-quad-terminal`

## 1. 审计范围与核心目标

本报告系统性复盘 `tele-pulse` 从 **骨架孵化 (`B0`) → 全栈构建与真库拉起 (`B1`) → 领域状态机与三员分立审计 (`B2`) → 多视口零假 Mock E2E (`B3`) → 23 道出厂门禁终审 (`B4`) → 远程算力节点 `cwall` 独立部署 (`B5`)** 全生命周期踩过的每一处工程陷阱、手工修补与提效加速器，逐项对标母本 `yudao-quad-terminal` 并完成 **100% 通用化回灌**，使后续任何执行 `pnpm project:hatch` 或 `pnpm project:init` 的新项目在 **Day 0 开箱即具备同等交付质量与速度**，同时严格遵守母本 **只读子模块（`pnpm patch:status` 合法）** 铁律。

---

## 2. 全生命周期差距对标与回灌矩阵 (`Stage B0`–`B5` 10 大核心差距)

| 编号 | 生命周期阶段 | `tele-pulse` 实战踩坑与提效点 | 回灌前母本状态 (`Before`) | 回灌后母本内置能力 (`After`) | 守护门禁 / 测试 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Gap 1** | **B0 骨架孵化** | 带连字符项目名（如 `tele-pulse`、`demo-mall`）导致 SQL 表名变成非法未加引号标识符 `tele-pulse_demo01_contact`、Java 主类变成 `Tele-pulseServerApplication.java`、Nginx `upstream` 含连字符语法报错 | `project-reactor.mjs` 直接把 `yudao` 替换为含 `-` 的 `projectName` | 新增 `deriveSlugForms()`，精确区分 `projectName`（路由/配置前缀）、`snakeSlug`（SQL 表/索引/DB 用户/Nginx upstream）、`pascalSlug`（Java 类名与 `.java` 文件名）、`camelSlug`（变量）、`upperSnakeSlug`（常量），并对 `.sql` 做兜底净化 | `G2`、`hatch-smoke.mjs`、`tele-pulse-backport.test.mjs` |
| **Gap 2** | **B0/B1 端口与网关** | 多项目同机并跑端口冲突；Caddy 默认抢占 `:2019` 管理端口导致第二实例启动失败；缺少 `/cockpit/` 与 `/evidence/` 声明式平面 | 仅支持单 `--port`，无 `.env.ports`；生成的 Caddyfile 未声明 `{ admin off }` 且无 `/cockpit/` 平面 | `project-init.cjs` / `hatch.sh` / `project-reactor.mjs` 全面支持 `--gateway-port`、`--backend-port`、`--admin-port`、`--miniapp-port`、`--db-port`、`--redis-port`（CLI + 环境变量），自动生成 `.env.ports` 并锁步对齐 `compat-manifest.json`；`generate-gateway-config.mjs` 顶部强制输出 `{ admin off }` 与四平面同源路由 | `G10`、`G11`、`compat:check` |
| **Gap 3** | **B1 真 PG 18.4 与连接池** | PostgreSQL 18.4 + Druid PreparedStatement 池导致“首登 200、后续交替 500”；JDK 17 下 Netty/RocketMQ 反射访问 `DirectByteBuffer` 报错；硬编码 `server.port: 48080`；派生领域 SQL 需手工导入 | `application-lite.yaml` 端口写死 `48080`；`lite-up.mjs` 未传 JDK 17 `--add-opens`；`lite-credentials.mjs` 未生成三员分立角色口令；未自动发现领域 SQL | `application-lite.yaml` 改为 `${LITE_SERVER_PORT:48080}`（保留 `pool-prepared-statements: false` 与 `mock-enable: false`）；`lite-up.mjs` 注入 4 项 JDK 17 `--add-opens`、自动读取 `.env.ports`、拓扑序幂等导入 `apps/backend/sql/postgresql/*.sql`；`lite-credentials.mjs` 为 `sys_admin`/`biz_admin`/`audit_admin`/`oncall_sre` 自动签发 `0600` CSPRNG 口令 | `G3`、`G8`、`G9`、`G17` |
| **Gap 4** | **B1/B2 前端净室与路由** | 派生工程残留 `views/Home/{Index2.vue,echarts-data.ts,types.ts}` 静态假图表；删除 `types.ts` 后若不重写 `Home/Index.vue` 会导致构建断链；`LoginForm.vue` 含推广外链且无 `data-testid`；`/cockpit` 顶层大屏被强行套上后台侧边栏 | 母本 `apps/admin` 为只读子模块，孵化器未在派生目录做前端净室清洗 | 在不触碰母本 `apps/admin` 子模块的前提下，`project-reactor.mjs` 新增 `sanitizeAdminFrontendForDerivedProject()`：孵化时物理删除 3 个假图表文件、生成零假数据编译安全的 `Home/Index.vue`、向 `LoginForm.vue` 注入 `data-testid="login-username\|login-password\|login-submit"` 并剥离外包链接、在 `routerHelper.ts` 守护动态视图 glob 并支持 `/cockpit` 全屏顶层路由 | `G4`、`G6`、`G7`、`hatch-smoke.mjs` |
| **Gap 5** | **B1/B2 菜单纯粹化** | 非商城政企项目执行 `domain-prune.mjs` 时，`general` 画像未裁剪 14 个全家桶套件且尾部无条件重新唤醒 `商城系统/会员中心/支付管理`，且未淘汰 Redis 菜单缓存、未隐藏上游已删 Controller 的 `/infra/job` 死链 | `domain-prune.mjs` 仅 `mall` 画像完整，且写库后未刷 Redis 缓存 | 升级 `scripts/domain-prune.mjs`：`general`/`enterprise` 画像彻底屏蔽全家桶、商城三件套、`租户管理` 与 `/infra/job` 死链，绝不反向唤醒商城菜单，并内置原生 RESP `flushRedisMenuCache()` 与 `--scan-docs` | `G14`、`G15` |
| **Gap 6** | **B0–B5 蜂群作战手册** | 多 Agent 协作时曾遇父目录文档串味、>25KB 写入超时、手写大 SQL 超时、Doris Stream Load `307` 重定向丢 `Authorization` 头与容器内网 BE 不可达 | 母本无 `SWARM.md` 协同手册 | 根目录新增通用 [`SWARM.md`](../../SWARM.md) 并随孵化器自动带入所有新项目，固化阶段 0 物理围栏、`<25KB` 分片 + `19ms` Node 种子生成器、单一写者矩阵、Doris `307` 双跳鉴权保活范式与 `cwall` 隔离部署 SOP | `G1`、`hatch-smoke.mjs` |
| **Gap 7** | **B0–B4 23 道硬门禁** | `tele-pulse` 沉淀了 `G1`–`G23` 出厂门禁与 `Stage B0`–`B4` 验收脚本，但原脚本含项目专属硬编码，新项目无法直接复用 | 母本仅有静态/单测 `gate-check.cjs`，缺少 Coolie Layer-B `G1`–`G23` 交付门禁与 `B0`–`B5` 阶段脚本 | 新增参数化 [`scripts/audit-23-gates.mjs`](../../scripts/audit-23-gates.mjs)（支持 `--static-only` Day-0 自检与全量实弹模式）、`start.sh`、`scripts/verify-stage-b0.sh`..`b4.sh`，并在 `package.json` 暴露 `pnpm gates:23`、`pnpm gates:23:static`、`pnpm verify:b0`..`pnpm verify:b5` | `G22`、`gates:23:static` |
| **Gap 8** | **B3 多视口防遮挡 E2E** | 移动端 `320×568` (`320dp`) 横向溢出、固定底部 TabBar 遮挡底部操作按钮、白屏/重复截图混入证据目录 | 母本无通用 Playwright 配置与防遮挡/截图 MD5 去重助手 | 新增 [`playwright.config.mjs`](../../playwright.config.mjs)、[`e2e/helpers/env-and-playwright.mjs`](../../e2e/helpers/env-and-playwright.mjs) 与 [`e2e/helpers/pg-verifier.mjs`](../../e2e/helpers/pg-verifier.mjs)，内置 `1920/1440/375/320dp` 零溢出断言、`elementFromPoint` 底栏防遮挡断言、`<=4` 字菜单 DOM 断言与 `>=20KB` MD5 去重截图器 | `G20`、`G21` |
| **Gap 9** | **B2 三员分立与防篡改审计** | 政企/电信项目需反复手写 `sys_admin`/`biz_admin`/`audit_admin` 角色互斥切面与 PostgreSQL Append-Only SHA-256 哈希链触发器 | 母本无现成生成器 | 新增 [`scripts/lib/three-role-audit.cjs`](../../scripts/lib/three-role-audit.cjs) 与 CLI [`scripts/scaffold-three-role-audit.mjs`](../../scripts/scaffold-three-role-audit.mjs)（`pnpm gen:three-role`），1 条命令生成 PostgreSQL 防篡改触发器 DDL + `ThreeRoleGuard.java` | `G18`、`tele-pulse-backport.test.mjs` |
| **Gap 10** | **B5 远程节点隔离部署** | 跨机部署至 `cwall` 时需防止干扰同机已有服务，且扁平化派生仓（无 `.gitmodules`）跑 `compat:check` / `jdk-variants` / `submodule-patches` 会因缺少上游子模块元数据误报失败 | 无 `deploy/cwall/` 模板；3 个母本脚本假设 `.gitmodules` 永远存在 | 新增 `deploy/cwall/{start-cwall.sh,stop-cwall.sh,cwall.caddy.tpl,README.md}` 与 `scripts/verify-stage-b5-cwall.sh`；`compat-check.mjs`、`jdk-variants.mjs`、`submodule-patches.mjs` 全面感知扁平化派生仓（`!exists(".gitmodules")`），且孵化前自动烘焙 `deploy/patches/*.patch` | `G10`、`G22`、`hatch-smoke.mjs` |

---

## 3. FCA（功能配置审计）与 PCA（物理配置审计）核验结论

### 3.1 FCA 功能配置审计
- **母本只读子模块零侵入**：`apps/backend`、`apps/admin`、`apps/miniapp` 工作区保持 `pnpm patch:status` `✅ 状态合法`，所有派生净室改造均封装于 `scripts/project-reactor.mjs` 对目标目录执行。
- **向下兼容契约 100% 闭合**：`compat-manifest.json` 原有入口、默认端口（PG `55432` / Redis `63799` / 应用 `48080`）完全保持不变，`package.json` 仅做纯增量脚本扩展，`pnpm compat:check` 全绿通过。
- **真实嵌入式 PostgreSQL 18.4 实测**：通过 `ephemeral-pg.cjs` 在真实 PostgreSQL 18.4 实例上验证了 `three-role-audit.cjs` 生成的 Append-Only SHA-256 哈希链触发器 —— `INSERT` 自动计算链式摘要，`UPDATE` 与 `DELETE` 均被数据库内核级触发器当场拒绝。

### 3.2 PCA 物理配置审计清单
- 协同作战宪法：[`SWARM.md`](../../SWARM.md)
- 23 门禁与阶段脚本：[`scripts/audit-23-gates.mjs`](../../scripts/audit-23-gates.mjs)、[`start.sh`](../../start.sh)、`scripts/verify-stage-b0.sh`..`scripts/verify-stage-b5-cwall.sh`
- 三员分立与防篡改审计引擎：[`scripts/lib/three-role-audit.cjs`](../../scripts/lib/three-role-audit.cjs)、[`scripts/scaffold-three-role-audit.mjs`](../../scripts/scaffold-three-role-audit.mjs)
- 多视口 Playwright 零假 Mock 底座：[`playwright.config.mjs`](../../playwright.config.mjs)、[`e2e/helpers/env-and-playwright.mjs`](../../e2e/helpers/env-and-playwright.mjs)、[`e2e/helpers/pg-verifier.mjs`](../../e2e/helpers/pg-verifier.mjs)
- 远程节点隔离部署套件：[`deploy/cwall/README.md`](../../deploy/cwall/README.md)、`deploy/cwall/{cwall.caddy.tpl,start-cwall.sh,stop-cwall.sh}`
- 回归单测与派生金路径冒烟：[`scripts/tests/tele-pulse-backport.test.mjs`](../../scripts/tests/tele-pulse-backport.test.mjs)、[`scripts/harness/hatch-smoke.mjs`](../../scripts/harness/hatch-smoke.mjs)

---

## 4. 不符合项与整改状态

本次审计识别出的全部 10 项全生命周期差距均已完成代码级回灌、单元测试覆盖与派生沙箱实测，**遗留未闭环不符合项：0 项**。

## 变更记录
| 日期 | 版本 | 变更人 | 说明 |
|---|---|---|---|
| 2026-11-13 | 1.0 | blueprint-gap-architect | 完成 tele-pulse Stage B0-B5 全生命周期对标审计与 10 大通用能力母本回灌 |
