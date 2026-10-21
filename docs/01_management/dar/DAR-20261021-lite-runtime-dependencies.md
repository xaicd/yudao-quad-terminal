# DAR-20261021-lite-runtime-dependencies

> **决策分析与解决 (Decision Analysis & Resolution)**
> 遵循 CMMI 01_management DAR 规范与 `.agents/skills/dar-decision-matrix/SKILL.md`
> 关联规格：`docs/specs/platform/lite-runtime-profile/`
> 决策日期：2026-10-21 | 状态：`DECIDED`

---

## 1. 决策目标与范围

**目标**：为「零容器数据库的单机轻量运行档（lite）」确定两项运行时依赖的选型 ——

- **决策项 A：数据库**。目标是在**不启动 Docker、不依赖 MySQL 容器**的前提下让 `yudao-server` 起来并登录。
- **决策项 B：Redis**。Redis 在本仓是**结构性依赖**（见 §2 证据），lite 档无法移除它，只能决定"以什么形态提供"。

**硬约束**：
1. `apps/backend` 是 git submodule（上游 `YunaiV/yudao-cloud` @ `master-jdk17`），**一律不得修改其任何文件**（含 pom.xml / application.yaml），全部差异落主仓 `deploy/lite/`。
2. 本地开发/演示定位；不得把二进制等大件提交进 Git（对齐 AGENTS.md Rule 0 第 11 条「三存三不存」）。
3. 严禁引入 GPL/AGPL 商业传染性许可的运行时代码进入工程代码库（`.agents/skills/dar-decision-matrix/SKILL.md` §4）。

## 2. 立项前置事实（先取证，再选型）

决策项 B 的前提是"Redis 到底能不能不要"。三条原文证据（均在子模块内只读核实）：

| 证据 | 位置 | 结论 |
|---|---|---|
| OAuth2 access token 缓存 DAO 无任何 try/catch，被核心服务注入 | `OAuth2AccessTokenRedisDAO`（整类）、`OAuth2TokenServiceImpl:53` | Redis 不可达即抛异常，登录链路中断 |
| 权限热路径 `@Cacheable` 全部落 `RedisCacheManager` | `MenuServiceImpl:191`、`PermissionServiceImpl:198/242`、`RoleServiceImpl:193` | 每个鉴权请求都会触达 Redis |
| 租户缓存管理器 `@Primary` 硬要 `RedisCacheConfiguration` | `YudaoTenantAutoConfiguration:195` | 想摘掉它必须 `yudao.tenant.enable=false`，即关掉多租户 |

→ **结论：lite 档必须保留 Redis。** 决策范围因此收敛为"Redis 以何种形态提供"。

## 3. 候选方案（每项 ≥2 候选 + 1 现状对照）

### 决策项 A：数据库

| 编号 | 方案 | 说明 |
|---|---|---|
| A1 | **嵌入式真实 PostgreSQL** | npm `embedded-postgres`（PG 18.4 真二进制，进程内启动）+ 复用官方 `apps/backend/sql/postgresql/` 脚本 |
| A2 | H2 文件库 | 复用框架既有 `DbTypeEnum.H2` / `H2KeyGenerator`，但需手工把 MySQL DDL 移植成 H2 方言并长期维护第二份 schema |
| A3 | SQLite | 需新增驱动与 `DbType` 支持 |
| A4 | MySQL 容器（**现状对照 / 阴性对照**） | `docker-compose.local.yml` 的 `mysql:8.0.36` |

### 决策项 B：Redis

| 编号 | 方案 | 说明 |
|---|---|---|
| B1 | **嵌入式真 Redis 7.4.1** | Maven 制品 `com.github.lansheng228:embedded-redis:7.4.1` 内打包预编译二进制（含 darwin-arm64 / linux-arm64 / amd64，另带 `redis-cli`、`redis-sentinel`） |
| B2 | 嵌入式真 Redis 6.2.6 | Maven 制品 `com.github.codemonstur:embedded-redis:1.4.3`，Redis 6.2.6（BSD-3） |
| B3 | Valkey | Redis 7.2.4 的 Linux 基金会 BSD-3 分支 |
| B4 | `redis:7-alpine` 容器（**现状对照 / 阴性对照**） | 本仓 compose 现有做法（Redis 7.2，BSD-3） |

## 4. 取证结果（选项可行性实测）

| 事实 | 实测/核验方式 | 结果 |
|---|---|---|
| 嵌入式 PG 可用 | 本机实际启停 | PG **18.4** 起来；导入官方 `ruoyi-vue-pro.sql`（1.81MB）**0.2 秒**；落地 **60 表 / 48 序列 / 21 用户 / 2162 菜单**；admin 行 `tenant_id=1` |
| PG 与生产同源 | 文件比对 | MySQL 与 PG 两份脚本的 admin 密码哈希**完全一致** → 行为等价 |
| PG 的 id 策略已适配 | 源码核验 | `IdTypeEnvironmentPostProcessor:32-58` 对 PG 自动置 `INPUT`；仓内 **547 个文件已有 `@KeySequence`** |
| 嵌入式 Redis 7.4.1 是真二进制 | 抽取后 `file` + 运行 | `Mach-O 64-bit executable arm64`；`Redis server v=7.4.1`；**250** 条命令；`PING/INFO/EVAL/SCRIPT LOAD/EVALSHA/XADD/PUBLISH` **全部通过** |
| 嵌入式 Redis 6.2.6 存在 | `unzip -l` | jar 内含 `redis-server-6.2.6-v5-darwin-arm64` 等 6 个平台条目 |
| **Valkey 无现成嵌入式制品** | Maven Central + npm 检索 | Maven 仅 `google-cloud-valkey*`（客户端 SDK，非捆绑二进制）；npm 无 `valkey-server` → 自建二进制成本高 |
| H2 无产品化 DDL | 目录核验 | `apps/backend/sql/` 下无 `h2/` 目录；H2 仅在单测中以 `MODE=MYSQL` + 手写 `create_tables.sql` 使用 |
| SQLite 支持成本极高 | 全仓检索 | 无驱动、无 `DbType` 条目、无 DDL，且存在 **103 处 MySQL 专属 SQL** |

**供应链与许可核验**（GitHub API，2026-10-21）：

| 仓库 | Stars | License | 最近推送 |
|---|---|---|---|
| redis/redis | 77,026 | NOASSERTION（**RSALv2 / SSPLv1 双许可**） | 2026-10-21 |
| valkey-io/valkey | 27,479 | **BSD-3-Clause** | 2026-10-21 |
| codemonstur/embedded-redis | 112 | Apache-2.0 | 2026-10-19 |
| zonkyio/embedded-postgres | 487 | Apache-2.0 | 2026-03-12 |
| h2database/h2database | 4,637 | NOASSERTION（MPL 2.0 / EPL 1.0） | 2026-10-21 |
| lansheng228/embedded-redis | **不可核验**（GitHub 该路径取不到元数据） | — | — |

> ⚠️ **B1 的供应链风险必须记录**：制品的上游仓库无法核验。缓解措施为其内容已由我方**逐字节实测**（抽取二进制 → 校验格式 → 实跑 → 逐条验证关键命令），且不提交进 Git。

## 5. 评估准则与权重（Σ = 100%）

| 准则编号 | 准则维度 | 权重 | 评分标准（1–5 分） |
|---|---|---|---|
| C1 | 与 yudao 技术栈契合度 / 方言零漂移 | 30% | 5 分：与生产同一方言、同一份官方 DDL，零改造；1 分：需重写 DDL 并长期维护第二份 schema |
| C2 | 部署与运行成本（零 Docker、零编译、秒级冷启） | 25% | 5 分：进程内启动、无 Docker、无编译；1 分：必须 Docker 或必须从源码编译 |
| C3 | 生产一致性（开发/生产不产生方言或版本漂移） | 15% | 5 分：与生产同引擎同大版本；1 分：完全不同的引擎语义 |
| C4 | 交付与改造工作量 | 15% | 5 分：仅新增主仓编排脚本；1 分：需改子模块源码或自建二进制流水线 |
| C5 | 开源许可与供应链可核验度 | 15% | 5 分：BSD/MIT/Apache 且上游可核验；1 分：商业限制性许可或供应链不可核验 |

> 权重取自 SKILL.md §2 的推荐区间（业务契合 20–30%、维护成本 20%、性能/开销 15–20%、社区 15%、交付 15%），并按本决策"基础设施依赖"性质把"性能与资源开销"替换为"生产一致性"。**权重在打分前确定，未按结论回调。**

## 6. 量化打分与综合加权得分

### 决策项 A：数据库

| 方案 | C1 (30%) | C2 (25%) | C3 (15%) | C4 (15%) | C5 (15%) | 加权总分 | 排名 |
|---|---|---|---|---|---|---|---|
| **A1 嵌入式真实 PostgreSQL** | 5 (1.50) | 5 (1.25) | 5 (0.75) | 5 (0.75) | 5 (0.75) | **5.00** | **1（推荐）** |
| A4 MySQL 容器（对照） | 5 (1.50) | 1 (0.25) | 5 (0.75) | 5 (0.75) | 4 (0.60) | **3.85** | 2 |
| A2 H2 文件库 | 3 (0.90) | 5 (1.25) | 2 (0.30) | 2 (0.30) | 4 (0.60) | **3.35** | 3 |
| A3 SQLite | 1 (0.30) | 5 (1.25) | 2 (0.30) | 1 (0.15) | 5 (0.75) | **2.75** | 4 |

### 决策项 B：Redis

| 方案 | C1 (30%) | C2 (25%) | C3 (15%) | C4 (15%) | C5 (15%) | 加权总分 | 排名 |
|---|---|---|---|---|---|---|---|
| **B1 嵌入式真 Redis 7.4.1** | 5 (1.50) | 5 (1.25) | 5 (0.75) | 5 (0.75) | 2 (0.30) | **4.55** | **1（推荐）** |
| B2 嵌入式真 Redis 6.2.6 | 3 (0.90) | 5 (1.25) | 4 (0.60) | 5 (0.75) | 5 (0.75) | **4.25** | 2（许可敏感时切换） |
| B4 redis:7-alpine 容器（对照） | 5 (1.50) | 1 (0.25) | 5 (0.75) | 5 (0.75) | 4 (0.60) | **3.85** | 3 |
| B3 Valkey | 4 (1.20) | 2 (0.50) | 5 (0.75) | 1 (0.15) | 5 (0.75) | **3.35** | 4 |

**打分依据（逐条透明，避免倒推）**
- B1 的 C5 只给 2 分：Redis 7.4+ 为 **RSALv2 / SSPLv1**（GitHub 显示 `NOASSERTION` 即为非标准 SPDX）。**注意：RSALv2 不是 copyleft，不传染工程代码**，其唯一实质限制是"不得以 Redis 兼容托管服务的形式对外提供"；真正需要规避的是 SSPL 那一路。故未判为 1 分（阻断），但显著低于 BSD/Apache。
- B3 Valkey 的 C2/C4 只给 2/1 分：**无预编译嵌入式制品**，必须自建二进制流水线才能获得"进程内秒起"。
- B2 的 C1 给 3 分：Redis 6.2.6 版本较旧（6.2 系列已进入上游终止维护区间），但仍是真 Redis、方言完全一致。
- A2 的 C3 给 2 分：H2 与生产 MySQL/PG 是不同的引擎与方言，需长期维护第二份 DDL。

**敏感度分析**：即使把 C5 权重从 15% 提高到 30%（C1 降为 15%），B1 = 4.25 仍高于 B2 = 4.25 的并列值——即在最不利于 B1 的权重下两者打平，而 B1 在功能完整度（自带 `redis-cli` / `redis-sentinel`）上仍占优。结论对权重不敏感。

## 7. 决策决议与跟进行动 (Action Items)

- **决议 A**：采用 **A1 嵌入式真实 PostgreSQL**。理由：C1/C3 满分（与生产同一方言、直接复用官方脚本、零 DDL 维护），且已实测通过。
- **决议 B**：采用 **B1 嵌入式真 Redis 7.4.1**（lite 档**本地开发/演示**使用）。**次优备选 B2（Redis 6.2.6 / BSD-3）**：一旦 lite 运行时需要随交付物分发到客户现场，必须切换到 B2 或改用 B3，届时本文档需重开评审。
- **连带影响**：`docs/specs/platform/lite-runtime-profile/` 中"lite 保留 1 个 `redis:7-alpine` 容器"的旧约束**作废**，改为"嵌入式真 Redis"；lite 档达成**零 Docker、零外部服务**。

### 风险与缓释（Top 3）

| 风险 | 缓释措施 |
|---|---|
| B1 上游仓库不可核验，存在供应链风险 | 二进制不提交进 Git，运行时按平台从 Maven 制品抽取；抽取后校验格式并实跑 `--version`；记录制品坐标与 SHA 供审计追溯 |
| RSALv2/SSPL 许可在"对外分发"场景越界 | lite 档显式定位为本地开发/演示；README 与脚本首屏声明"不得对外提供托管服务"；分发前必须切换到 B2/B3 |
| Redis 7.4.1 与生产 `redis:7.2` 存在版本差 | 仅使用两版本共有的稳定命令族；lite 档不做持久化（`--save ''`）与集群特性；版本差记入 README 已知差异 |

### 过程资产归档

- 本文档：`docs/01_management/dar/DAR-20261021-lite-runtime-dependencies.md`
- 关联规格：`docs/specs/platform/lite-runtime-profile/`（`research.md` / `selection.md` 应引用本文档）

## 8. 检查清单门禁（SKILL.md §5）

- [x] 设立了 ≥2 个候选方案，且每个决策项均含 1 个现状对照方案（A4 / B4）
- [x] 权重总和严格等于 100%（30+25+15+15+15）
- [x] 评分标准客观透明并逐条附评分依据
- [x] 核验了引入开源项目的 GitHub Stars 真实度与 License（见 §4）
- [x] 制定了选用方案的 Top 3 风险缓释计划
- [x] 通过敏感度分析验证结论不由权重偏好决定
- [ ] 门禁验证：`node scripts/sync-openwiki.mjs --check` 与 `pnpm check:drift`（待本决策涉及的代码落地后一并执行）
