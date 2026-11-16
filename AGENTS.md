# AGENTS.md — Yudao Quad-Terminal 工程宪法与治理守卫

更新时间：2026-11-16（`templateVersion: 1.2.0`）

本文件是 **Yudao Quad-Terminal（四位一体超级基座，`v1.2.0`）** 的独立开发规范与治理宪法，覆盖架构边界、四端协同、研发流程、测试门禁、运行部署与交付标准。

---

## 🚨 Top-Priority Universal Directives (最高优先级核心工程铁律 — 所有 IDE / Agent 必读必遵)

> **MANDATORY RULE 0: ZERO TOKEN WASTE, ZERO DUPLICATE CODE & TOOL-FIRST LOW-CODE ARCHITECTURE**
> 任何 AI Agent / IDE 接入本模板与工程时，**第一优先级必须执行以下 13 项不可动摇的底线法则**：
> 1. **严禁 Token 与算力浪费 (Zero Token Waste)**：严禁大模型人肉逐行生成几百行千篇一律的重复 CRUD、样板代码、冗余 DDL 或静态 HTML 骨架；业务开发与需求实现必须采用 **Schema / DSL 极简声明式驱动**（大模型输出压缩至 <500 Tokens），由底层通用引擎自动展开！
> 2. **架构模式极致复用 (Architectural Pattern Mastery)**：必须复用泛型 `BaseMapper<T>`、`LambdaQueryWrapper<T>`、MyBatis-Plus 租户插件与强类型 TS SDK，自动继承多租户隔离、逻辑删除与 8 大基础审计底座字段，严禁手写重复 SQL/CRUD！
> 3. **存量低代码工具优先 (Prioritize Existing Low-Code Tooling)**：在编写任何代码前，必须优先检索并复用模板内已有域能力、脚手架工具（`scripts/codegen-module.cjs` / `scripts/blueprint-engine.cjs`）、Knife4j API Client 生成器与内置 18 大 Skills！
> 4. **缺少工具就造工具 (Build Tools When Missing)**：遇到可抽象的高频研发需求，必须优先沉淀为通用工具与生成脚本，让工具自动化执行，**绝不能重复手写无效无意义代码**！
> 5. **开源成熟方案优先与竞品性价比选型 (Open-Source First & Best ROI Selection)**：若自研工具周期过长、复杂度高或 Token 消耗大，**严禁盲目从零造轮子**；必须优先检索开源成熟工业级方案，进行多维竞品横评并遴选出**最高性价比（ROI）与改造成本最小**的方案进行集成！
> 6. **SpaceX 级全链路测试验证与真实数据库驱动 (SpaceX-Grade Testing & Zero Fake Mock)**：代码变更必须跑通质量门禁（L1单测、L2集成、L3契约、L4 E2E）；100% 由真实数据库支撑，严禁前端伪造 Mock！
> 7. **本体域全息导航与 API 契约第一切入 (Ontology & API-Contract-First)**：任意需求必须先在本体域（实体网、Domain Facade、Knife4j API Docs、权限码）中秒级定位目标域与影响半径，以 API 契约为探针执行穿透闭环；一切需求终局 100% 收敛于真实 API 支撑，严禁无 API 支撑的假界面与硬编码 Mock！
> 8. **全工种四类契约族收敛 (All-Role Contract Families)**：数据同步/ETL、BI 查询、运营编排、运维发布等非编码需求同样必须收敛为可审计契约——API 契约 / 数据契约 / 流程契约 / 预案契约四选一，并过专属质量门禁；严禁一次性搬运脚本与口径打架的野 SQL！
> 9. **全局高阶反向思维与 AI-Driven Harness 全程监督 (High-Order Inverse Thinking & DeepSeek Harness Invariants, 详见 .agents/rules/HIGH-ORDER-INVERSE-THINKING.md)**：严禁以初级外包码农视角就事论事贴补丁；敲代码必须业务对象溯源且由通用引擎展开；写单测必须状态机真实入库覆盖与反假 Mock；修改接口必须契约先验、零破坏性变更与挂载不可变操作审计！
> 10. **0-1 软件工程交付资产与 No Artifact, No Done 铁律 (Spec-First Artifacts, 详见 .agents/rules/SPEC-FIRST-ENGINEERING-ARTIFACTS.md)**：严禁将上线运行期业务数据（订单数据、图纸、运营指标）当成交付资产；严禁口头声明完工；每个工单必须基于 8 要素 Brief 派发，且必须产出 7 类物理工程资产之一（SRS/RTM、OpenAPI 契约、0 报错源码、真实 DB 状态机单测报告、生产回滚 SOP、SRE 稳定性基线、持续运营对账单）！
> 11. **单一真源与全生命周期过程资产防污染铁律 (Single Source of Truth & Consolidated `docs/` Root)**：技能唯一真源为 `.agents/skills/<name>/SKILL.md`；**全仓所有文档、规格、知识库、Release 说明与审计报告严格统一归口于 `docs/`**（含 `docs/00_meta_standards` ~ `docs/09_operations`、`docs/specs/<domain>/<name>/`、`docs/wiki/`、`docs/07_release/releases/`、`docs/audit/`），严禁在仓库根目录建立 `doc/`、`wiki/`、`openwiki/`、`specs/`、`releases/` 等并行文档目录或软链！
> 12. **OpenWiki (LLM-Wiki) 动态百科首屏导航 (OpenWiki First, 详见 `docs/wiki/index.md`)**：任何外部 AI 助手进场时，优先阅读 `docs/wiki/index.md`，基于机器可读契约与架构词条开展工作，严禁全盘盲扫代码浪费 Token 与引起漂移！
> 13. **全能力 AI Agent 驱动公理 (All Capabilities Must Be AI Agent Driven)**：系统内的一切能力（需求立项、代码实现、API 契约、四端页面交互、接口运营、自动化测试、容器发版、故障自愈）必须具备 **100% 机器可读与 AI Agent 闭环驱动能力**；严禁设计仅供人类手点、无法被 AI Agent 编排或无头探针访问的孤岛能力；前端必须挂载机器可读 Page Schema，测试必须支持变异测试与自主红队渗透演练！

---

## 🧭 AI Agent 进场 30 秒续作与项目 PMO 待办决策树（与 `cooliebase-all` `v1.5.0` / `coolie` `v0.7.0` 100% 同名同参）

> **跨底座四端同构认知**：姊妹基座 `cooliebase-all`（`v1.5.0`）同样具备 **四大终端**（Admin + 2C Portal + `clients/miniapp` + `clients/expo`）与 **18 个第一方插件**（含 `oa/hrm/fms/pms` 等 20 业务域），与本基座 `yudao-quad-terminal`（`v1.2.0`，Java Spring Boot 3 + Vue3 Admin + UniApp + Expo 19 模块）共享完全一致的 `.cjs` 入口与 `pnpm` 命令契约。
>
> **进场第一视角：你即本项目 PMO (Project Management Office)**
> 任何 AI Agent 打开本项目时，**第一步先看项目 PMO 待办大盘**（耗时 `< 0.5s`，零 Token 盲扫浪费）：
> - **一键查看实时待办队列 (`P0/P1/P2`)**：`pnpm run pmo`（或 `node scripts/cmmi-01-management.cjs pmo [--write|--json]` / `pnpm run speckit -- cmmi 01 pmo` / `pnpm harness pmo`）
> - **持久化 PMO 待办大盘真源**：[`docs/01_management/pmo-dashboard.md`](docs/01_management/pmo-dashboard.md)（配合 [`docs/01_management/project-plan.md`](docs/01_management/project-plan.md)）
>
> **进场首屏双支柱定位**（详见 [`HARNESS.md`](HARNESS.md)）：
> - **支柱一 `harness`（[`HARNESS.md`](HARNESS.md) + `scripts/harness.cjs`）= 工作流程与运行生命周期总规范**：统一管控 `pnpm harness <install|check|build|start|health|status|stop|e2e|deliver|pmo>`。
> - **支柱二 `speckit`（`pnpm run speckit`）+ CMMI 00~09 扩展（`scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs`）= 全环节工程文档与过程资产引擎**：每个 CMMI 环节均属于 `speckit` 的文档扩展（`pnpm run speckit -- cmmi <00..09> [docs|check|asset|pmo|...]`），同时承载宏观工程文档（`docs/00_meta_standards/`~`docs/09_operations/`）与规格包阶段文档（`docs/specs/<domain>/<name>/`）。

### 四大高频开发场景：AI Agent 打开项目后直接按场景执行

```bash
# ─────────────────────────────────────────────────────────────────────────────
# 场景 0 [PMO 首屏雷达]：进场 1 秒摸清项目全貌、施工中规格 (WIP) 与 P0/P1/P2 下一跳待办
# ─────────────────────────────────────────────────────────────────────────────
pnpm run pmo
# （等价于: node scripts/cmmi-01-management.cjs pmo [--write|--json] | 查看 docs/01_management/pmo-dashboard.md）

# ─────────────────────────────────────────────────────────────────────────────
# 场景 A：从底座派生客户新项目（零污染外部沙箱，绝不污染母本 Git 工作区）
# ─────────────────────────────────────────────────────────────────────────────
node scripts/cmmi-01-management.cjs init --name <slug> --title "<系统中文名>" --target /tmp/<slug>-sandbox
# （等价于: pnpm run project:init -- --name <slug> --title "<系统中文名>" --target /tmp/<slug>-sandbox）

# ─────────────────────────────────────────────────────────────────────────────
# 场景 B：新增业务域 / 新业务表 / 全栈功能交付（<500 Tokens 蓝图驱动 + 嵌入式真 PG 18.4 E2E）
# ─────────────────────────────────────────────────────────────────────────────
# 1. 编写或渲染 <500 Tokens 的 <domain>.blueprint.json（禁止手写数百行 CRUD 样板）
node scripts/cmmi-01-management.cjs render --name "<系统名>" --domain <domain> --entities "a:实体A,b:实体B" --out <domain>.blueprint.json
# 2. 蓝图口语化字段/状态机/权限码自愈诊断 (CMMI-03)
node scripts/cmmi-03-design.cjs doctor --file <domain>.blueprint.json --write
# 3. 一键展开 Spec 文档 + Java/Vue/UniApp/Expo 全栈代码 + 嵌入式真 PostgreSQL 18.4 (ephemeral-pg.cjs) 6 阶段 E2E (CMMI-04 & 05)
node scripts/cmmi-04-implementation.cjs deliver --file <domain>.blueprint.json --verify-e2e
# （等价于: pnpm run blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e）

# ─────────────────────────────────────────────────────────────────────────────
# 场景 C：存量项目继续开发 / 修 Bug / 增量改特性（Spec-Kit × CMMI 00~09 闭环）
# ─────────────────────────────────────────────────────────────────────────────
# Step 0 [CMMI-02 需求分诊]: 确定性判定 SPEC_REQUIRED / DIRECT_OK / NOT_A_REQUIREMENT
pnpm run agent:route -- "<用户的原始需求原文>"
# Step 1 [CMMI-02 规格立项]: 若需立项，创建 <500 Tokens brief.json 并展开标准规格文档
node scripts/cmmi-02-requirements.cjs new --name <spec> --domain <域> --title "<标题>" --type <feature|bugfix|refactor>
node scripts/cmmi-02-requirements.cjs build --name <spec>
# Step 2 [CMMI-04 任务追踪]: 查看当前未完成任务 [T1..Tn] 及阶段文档状态
pnpm run speckit -- cmmi 04 docs --spec <spec>
node scripts/cmmi-04-implementation.cjs tasks --spec <spec>
# Step 3 [CMMI-05 真库验证]: 编码实现后运行真 PostgreSQL 18.4 E2E 与单元测试
node scripts/cmmi-05-verification.cjs e2e
# Step 4 [CMMI-06 门禁与提交]: 跑通全量门禁，并按 1 Task = 1 Commit 提交（带 [<spec>/T<ID>]）
node scripts/cmmi-06-quality.cjs check
git commit -m "[<spec>/T1] feat(<domain>): ..."
# Step 5 [CMMI-07~09 发布与归档]: 生成制品指纹并归档规格至 docs/specs/archive/
node scripts/cmmi-07-release.cjs fingerprint
node scripts/cmmi-09-operations.cjs archive --name <spec>
```

---

## 0. 工具与能力索引（Agent 必读：先看这里，不要全盘扫源码）

### 0.1 六条硬约束

1. **pnpm 唯一**：只用 pnpm；禁止任何非 pnpm 的 JS 包管理器命令，由门禁 `pkg-manager` 拦截。
2. **`apps/backend` / `apps/admin` / `apps/miniapp` 是第三方 git submodule（只读）**：严禁修改其中任何文件；所有差异一律落主仓（`deploy/patches/`、`scripts/`、`.agents/`、`docs/`）。
   对子模块的**代码级差异**收敛为 `deploy/patches/<submodule>/*.patch`，由 `pnpm patch:apply` 注入（`lite:up` 与 `lifecycle build` 会自动调用）；**子模块指针只钉远端真实存在的上游提交**，否则别人 clone 不到指向本地提交的 gitlink。新不变式由门禁 `submodule-patches` 强制：子模块工作区改动必须**恰好等于**声明的补丁。
3. **禁止弱默认凭据**（严禁使用可猜默认管理员账号与弱口令）：引导凭据由 CSPRNG 生成，写入 gitignored 的凭据文件（0600）。
4. **声明必须可执行**：文档里的命令必须真实存在；`pnpm check` 通过才算完工（No Artifact, No Done）。
5. **导航菜单严格 `<= 4` 字硬标准 & 全仓文档单一归口 `docs/`**：所有可见目录与页面级导航菜单（`system_menu.type IN (1, 2)`）的 `name` 必须严格满足 `char_length(name) <= 4`（完整业务标题保留于 `remark` / OpenAPI 描述）；`deploy/lite/runtime/lite-pg.mjs` 在导入种子 SQL 后自动归一化上游超长菜单（如 `id=17` `缓存监控`、`id=88` `接口日志`、`id=195` `库源配置`）并隐藏外链推广菜单；全仓文档/规格/OpenWiki/Release/审计报告统一落盘 `docs/`（门禁 `menu-standard` 强制阻断任何顶层并行文档目录）。
6. **派生工程子包文档与推广残留零容忍**：通过 `pnpm project:hatch` / `pnpm project:init`（`scripts/project-reactor.mjs`）孵化新项目时，自动生成品牌中立的 `README.md`、`CLAUDE.md`、`HARNESS.md` 及 `apps/{backend,admin,miniapp}/README.md`，并物理清除 `apps/backend` 下全部上游教程 Markdown、`apps/*/.image` 二维码截图目录与未入 Maven 的 `*-ui` 空壳目录，由 `pnpm harness:hatch` 逐项断言守卫。

### 0.2 能力速查

| 能力 | 命令 | 何时用 | 真源 |
|---|---|---|---|
| 零污染沙箱初始化 | `pnpm project:init -- --name <slug> --title "<中文名>" --target /tmp/<slug>-sandbox` | 秒级克隆沙箱 + 四端 `BASE_PATH` 同源渲染 + 白标包名重构（与 `cooliebase-all` 同参） | `scripts/project-init.cjs` |
| `<500 Tokens` 蓝图交付 | `pnpm blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e` | 蓝图口语化自愈 (`doctor`) + 16 份 Spec 资产 + 全栈生成 + **Embedded PostgreSQL** 6 阶段真库 E2E | `scripts/blueprint-engine.cjs` |
| 蓝图校验/渲染/编译 | `pnpm blueprint:check` / `blueprint:render` / `blueprint:doctor` / `blueprint:compile` | 校验模板、按行业预设渲染四端配置、单独诊断或编译领域蓝图 | `scripts/blueprint-engine.cjs` |
| 嵌入式真 PG 解析器 | `node -e 'require("./scripts/lib/ephemeral-pg.cjs").resolveDatabaseEndpoint()'` | 零 Docker 拉起 **Embedded PostgreSQL 18.4 (`embedded-postgres`)**（与 `cooliebase-all` 同名同契约） | `scripts/lib/ephemeral-pg.cjs` |
| 统一 9 阶段 Harness | `pnpm harness <install\|check\|build\|start\|health\|status\|stop\|e2e\|deliver\|pmo>` | 跨底座统一生命周期与 PMO 编排 | `scripts/harness.cjs` |
| 统一门禁 | `pnpm check` / `pnpm gate:fast` / `pnpm gate:full` | 任何改动后自证；fast 17 项 / full 20 项（full 另含后端单测、前端构建与 lite e2e） | `scripts/gate-check.cjs` |
| 类型检查 | `pnpm typecheck` | 自有包（app / shared-types / api-client）TS 0 报错 | 各包 `tsconfig.json` |
| 生产构建 | `pnpm build:backend` / `pnpm build:admin` / `pnpm build:miniapp` / `pnpm build` | 后端两步 Maven（189MB jar）+ Admin/MiniApp 前端构建 | `scripts/build-admin.mjs` |
| 发布制品打包 | `pnpm release:package` | 打包离线纯净四端骨架包、`compat-manifest.json`、`blueprint.template.json` 与 `SHA256SUMS.txt` | `scripts/build-release-assets.cjs` |
| 下游兼容契约 | `pnpm compat:check` | 11 组核验：下游绑定的入口/端口/路径/子模块指针必须与实现逐条一致 | `scripts/compat-check.cjs` |
| 派生金路径验证 | `pnpm harness:hatch` | 临时目录真跑派生并断言 20 项（契约齐备/零泄漏/身份替换/包迁移/依赖无悬空/可自跑门禁） | `scripts/harness/hatch-smoke.mjs` |
| 门禁反向控制 | `pnpm harness:controls` | 10/10 项：给每道 blocking 门禁注入违规，证明它真的会红（配置合法 ≠ 生效） | `scripts/harness/negative-controls.mjs` |
| 子模块差异补丁 | `pnpm patch:status` / `patch:apply` / `patch:check` / `pnpm patch:revert` | 差异收敛于 `deploy/patches/`，指针保持纯上游（可 clone） | `deploy/patches/README.md` |
| JDK 变体矩阵 | `pnpm jdk:list` / `pnpm jdk:status` / `pnpm jdk:use <id>` | 四档变体的真实 ref 与切换；门禁防"文档写不存在的分支" | `scripts/lib/jdk-variants.mjs` |
| 自有脚本单测 | `pnpm test:scripts` | 99 个 `node:test` 用例（契约基线/裁剪/规格/凭据/加解密/门禁 CLI/JDK 变体/子模块补丁/菜单与派生净室） | `scripts/tests/` |
| 全栈验证 | `pnpm test:all` | 脚本单测 + 类型 + 后端单测（实测 72s）+ 就绪自检，**严格失败即退出** | `scripts/lifecycle.sh` test 阶段 |
| lite 零 Docker 档 | `pnpm lite:up` / `pnpm lite:verify` / `pnpm lite:down` / `pnpm lite:clean` | 起后端、跑验收、收割残留、重置数据 | `deploy/lite/README.md` |
| 模块裁剪 | `pnpm trim:modules --profile lite --dry-run` → `--apply --yes` → `pnpm trim:check` | 只保留所需业务模块 | `scripts/lib/module-catalog.mjs` |
| 撤销裁剪 | `pnpm trim:modules --recover --yes` | 子模块回到已提交状态 | 同上 |
| 规格工程 | `pnpm speckit:new` / `speckit:build` / `speckit:tasks` / `speckit:check` / `speckit:archive` | 需求 → 资产 → 任务 → 归档（与 `cooliebase-all` 同名命令） | `scripts/speckit.cjs` |
| 规格健康 | `pnpm specs:health` | 校验 16 份资产 + brief 8 要素 + 占位符残留 | `scripts/specs-health.mjs` |
| CMMI 资产骨架 | `pnpm cmmi:asset new --phase 01 --type charter --title "..."` | 生成 01~09 过程资产骨架（含 TODO 标记） | `scripts/cmmi-asset-scaffold.cjs` |
| 登录冒烟 | `pnpm smoke:login` | 对**运行中**实例做真实登录探测（秒级） | `scripts/smoke-login.mjs` |
| 真实库验收 | `pnpm verify:real-db` | = `lite:verify`（真 PG + 真 Redis 全链路） | `deploy/lite/README.md` |
| 全栈代码生成 | `pnpm gen:module` / `pnpm domain:new` | 生成 DO/Mapper/Service/Admin+App Controller/VO + TS + Vue + PostgreSQL/MySQL DDL | `scripts/codegen-module.cjs` |
| 契约防漂移 | `pnpm check:drift` | 前后端路由对账（advisory） | `scripts/check-contracts-drift.mjs` |
| 上下文切片 | `pnpm ctx:query <keyword>` | 秒级定位域/接口/表（~150 tokens） | `scripts/agent-context-compressor.mjs` |
| MCP 端点 | `cmd mcp list`（8 工具） | 无头编排上述能力 | `.agents/skills/yudao-mcp-server/SKILL.md` |

### 0.2.1 双支柱架构：`harness` 定工作流程总规范 × `speckit` 扩展 CMMI 00~09 全生命周期 `.cjs` 矩阵（与 `cooliebase-all` 100% 同名同参）

| CMMI 阶段与宏观文档目录 (Layer A) | 特性规格阶段文档 (Layer B: `docs/specs/<域>/<名>/`) | `speckit` 扩展入口 / 统一 `.cjs` 脚本 | 标准动作与交付闭环 (`docs \| check \| asset` + 阶段动作) |
|---|---|---|---|
| **00 规范与元契约** (`docs/00_meta_standards`) | `spec.json` | `pnpm run speckit -- cmmi 00`<br>`scripts/cmmi-00-meta.cjs` | `docs \| check \| constitution \| schema \| sync`：校验元规范、`compat-manifest` 与蓝图 Schema |
| **01 立项与沙箱孵化** (`docs/01_management`) | `selection.md`, `research.md` | `pnpm run speckit -- cmmi 01`<br>`scripts/cmmi-01-management.cjs` | `docs \| check \| asset \| init \| render`：立项/DAR 文档管理 + 零污染沙箱孵化 (`/tmp/<slug>-sandbox`) |
| **02 需求与规格工程** (`docs/02_requirements`) | `brief.json`, `requirements.md`, `spec.md` | `pnpm run speckit -- cmmi 02`<br>`scripts/cmmi-02-requirements.cjs` | `docs \| check \| asset \| route \| new \| build`：需求分诊与 Spec-Kit EARS 规格立项展开 |
| **03 架构设计与自愈** (`docs/03_design`) | `design.md`, `prototype.md` | `pnpm run speckit -- cmmi 03`<br>`scripts/cmmi-03-design.cjs` | `docs \| check \| asset \| doctor \| compile-domain`：ADR/ERD 文档管理 + 蓝图自愈与契约编译 |
| **04 研发计划与实现** (`docs/04_implementation`) | `plan.md`, `tasks.md` | `pnpm run speckit -- cmmi 04`<br>`scripts/cmmi-04-implementation.cjs` | `docs \| check \| asset \| tasks \| deliver \| codegen`：WBS 任务矩阵 + `<500 Tokens` 蓝图全栈代码生成 |
| **05 测试与真 PG E2E** (`docs/05_verification`) | `testing.md`, `evidence.json`, `bugs.md` | `pnpm run speckit -- cmmi 05`<br>`scripts/cmmi-05-verification.cjs` | `docs \| check \| asset \| e2e \| unit \| mutation`：基于 `ephemeral-pg.cjs` (PostgreSQL 18.4) 的 6 阶段 Spec E2E |
| **06 质量门禁与审计** (`docs/06_quality_assurance`) | `checklist.md` | `pnpm run speckit -- cmmi 06`<br>`scripts/cmmi-06-quality.cjs` | `docs \| check \| asset \| tasks \| controls`：Checklist 核对单 + PPQA/FCA/PCA 质量门禁 |
| **07 发布 SOP 与指纹** (`docs/07_release`) | `deployment.md`, `runbook.json` | `pnpm run speckit -- cmmi 07`<br>`scripts/cmmi-07-release.cjs` | `docs \| check \| asset \| gateway \| build \| fingerprint \| runbook`：部署 SOP + 四端网关渲染与 SHA-256 指纹 |
| **08 SRE 与事故复盘** (`docs/08_sre`) | `operations.md` | `pnpm run speckit -- cmmi 08`<br>`scripts/cmmi-08-sre.cjs` | `docs \| check \| asset \| start \| stop \| status \| health \| security \| load`：SLO/SLI 矩阵与服务生命周期 |
| **09 持续运营与归档** (`docs/09_operations`) | `operations.md` | `pnpm run speckit -- cmmi 09`<br>`scripts/cmmi-09-operations.cjs` | `docs \| check \| asset \| archive --name <spec> \| ops`：运营对账单与历史规格防污染归档 |

### 0.3 先读什么（避免 Token 浪费）

1. `docs/wiki/index.md` —— 全息导航（Rule 12 要求首屏读）
2. `llms.txt` —— 高密度能力契约（含「常见失败 → 修复」表）
3. `.agents/skills/README.md` —— 18 个技能索引（按 CMMI 阶段）
4. 具体能力的 `SKILL.md` / `README.md`（见上表「真源」列）
5. **不要**整目录 grep 上千 Java 文件：用 `pnpm ctx:query <keyword>` 取精准切片

### 0.4 门禁基线与上游只读子模块说明（如实告知，勿当成自己引入的）

- `contract`：**检测器与只读上游基线已对齐**（真源 `scripts/check-contracts-drift.mjs` + `scripts/lib/upstream-contract-baseline.json`）。
  现测：后端 3186 路由 / 前端 2973 路由，**动词不符 0**、**工程新增孤儿 0**（默认基线模式下 `contract` 门禁为 **PASS**；传 `--strict-upstream` / `--no-baseline` 可审计原始 92 条只读上游未暴露端点）：
  - `/ai1` **66 条**：新前端带上了 AI1 模块页面并调用 `/ai1/*`，而本后端基座不含该模块 —— 属「前端领先后端」，派生项目可按需裁掉页面或补齐后端模块。
  - `/infra` 14 + `/pay` 5 + `/bpm` 3 + `/mes` 3 + `/promotion` 1：**上游历史基线**。
    `/infra/job*` 的归因（已向上游核实）：`YunaiV/yudao-cloud@master-jdk17` 的 infra controller 目录只有 `codegen/config/db/demo/file/logger/redis` —— **上游已移除 Quartz 任务 CRUD 控制器**，而前端仍保留「定时任务」页面。两个 submodule 都是只读上游，由 `upstream-contract-baseline.json` 显式建账。
  - 反方向的 `missingInFrontend` 305 条（后端暴露但前端未封装）**属常态，不计为漂移**。
- `socratic`：瞬态反问快照 `docs/artifacts/socratic-inquiry-latest.json` 已列入 `.gitignore`（净室母本不入库），因此在全新克隆的净室工作区呈 `advisory` 提示（`通过 16/17 | blocking 失败 0 | advisory 失败 1`）；本地需刷新时执行 `pnpm socratic:inquire` 即可。
- ~~**`apps/admin` 的前端构建被上游 pin 卡住**~~ → **已修**：把 `apps/admin` 钉到纯上游 `master` 提交（`050bac1ec`），并将登录加密配置收敛至主仓声明式补丁 `deploy/patches/admin/0001-login-encrypt-on.patch`。
  - 原症状：`[UNLOADABLE_DEPENDENCY] Could not load src/views/oa/utils/constants`（上游 `ce90b26a4` 已修，旧 pin 落后 74 个提交）。
  - 现状：`pnpm build:admin` **实测通过**（产物输出至构建目录 24.6MB），并纳入 `gate:full` 的 blocking 项 `admin-build`。
- **JDK 变体必须"可执行"**：`pnpm jdk:list` / `jdk:status` / `jdk:use <id>` 由 `scripts/lib/jdk-variants.mjs` 驱动，门禁 `jdk-variants` 会校验**文档里写到的上游 ref 是否真实存在**，并**读取该 ref 的 pom 实测 java/boot 版本反向核对声明**（防"名字与内容不符"）。
  曾抓到 README 宣称不存在的 ~~master-jdk8~~ / ~~master-jdk21~~：上游实际只有 `master-jdk17`（默认）、`master`（**JDK 8 线**，pom 实测 java=1.8）、`master-jdk25`（pom 实测 java=25）三个分支；JDK 21 与 17 共用 `master-jdk17`（改 pom 的 `java.version` 即可）。
  **约定**：文档里的反引号 ref 即"断言其存在"，会被门禁解析校验；要提"不存在的 ref"请用删除线或纯文本，勿加反引号。
- **`NODE_ENV=production` 会让 pnpm 跳过 devDependencies**：若 shell 已设 `NODE_ENV=production`，`pnpm install` 会打印 `devDependencies: skipped because NODE_ENV is set to production`，于是 `vite` / `vue-tsc` / `esbuild` 等构建工具**根本不会安装**，表现为"依赖明明装过了却找不到可执行文件"。安装开发依赖请显式用 `NODE_ENV=development pnpm install`。
- **hoisted linker 下子模块的 bin 在根目录**：本仓 `.npmrc` 用 hoisted 布局，`vite` / `vue-tsc` 等只存在于**根** `node_modules/.bin`，`apps/admin/node_modules/.bin` 不会生成；而子模块自己的构建脚本写死了相对路径 `./node_modules/vite/bin/vite.js`，直接跑必然失败。故前端构建统一走 `pnpm build:admin` —— `scripts/build-admin.mjs` 解析真实 vite 入口、以 `apps/admin` 为 cwd 执行，既不改子模块也不假装成功。
- `admin` 的 `ts:check` **不在本仓门禁内**：属其子模块自身质量（需在非 production 环境安装其依赖）。`pnpm typecheck` 只覆盖自有包（`apps/app`、`packages/*`）。

`contract` 与 `socratic` 在门禁中是 `advisory`，不阻塞合入；但**不得**在汇报时声称"全绿"。

---

## 1. 项目定位与四位一体架构

本项目为 **Yudao Quad-Terminal（四位一体超级基座）**，统一承载：
- **`apps/backend`**：Java Spring Boot 3 / Spring Cloud 微服务后端（支持 JDK 17/8/21 三大分支自由切换，原生 Maven 管理，零侵入无污染）；
- **`apps/admin`**：PC 运营管理后台（Vue 3 + Element Plus + Pinia + TS）；
- **`apps/miniapp`**：微信生态端（Uni-App Vue 3 + Wot/UniUI）；
- **`apps/app`**：原生移动客户端（Expo SDK 52 + React Native 0.76，60/120fps 原生手势与自建 OTA 热更新）；
- **`packages/api-client`**：Knife4j / OpenAPI 直出强类型 TS SDK（四端单一契约真源）；
- **`packages/shared-types`**：通用 DTO / 终端枚举 / `CommonResult<T>`。

---

## 2. CMMI 五大门禁与持续验证

在提交代码或完成任务前，必须执行对应门禁：
- **G1 需求门禁**: 查阅 `docs/02_requirements/software-requirements.md`（遵守 EARS 严谨句式）；
- **G2 架构门禁**: 查阅 `docs/03_design/architecture-design-hld.md`（确立微服务与多端拓扑，遵循 Archify 架构可视化标准）；
- **G3 契约门禁**: `pnpm typecheck`（前端多端 0 TS 报错）+ 后端 Maven 编译 0 报错；
- **G4 验收门禁**: 查阅 `docs/05_verification/test-summary-report.md`（拟真人走查四态界面与真机快照，严禁假 Mock）；
- **G5 投产门禁**: 查阅 `docs/07_release/system-deployment-sop.md`（制品指纹与回滚 SOP）。

---

## 3. 6 阶苏格拉底反思跃迁与自循环进化

执行任何功能研发或重构时，必须运行或符合 6 阶反思：
- 本地执行反问自检：`pnpm socratic:inquire`
- CI 自动化校验：`pnpm socratic:check`
1. **Level 1 (Teleological)**: 抹去此功能业务会死吗？证明其不可替代性；
2. **Level 2 (Ontological)**: 能否收敛为 1 个 Object + Action + 状态机？压缩 80% 样板代码；
3. **Level 3 (Agent-Native)**: 假定 99% 操作者为 AI Agent，是否具备 100% 机器可读与无头闭环驱动；
4. **Level 4 (Extreme Scale)**: 放大 10,000 倍并发与 100,000 家企业多租户，单点脆弱性在哪里；
5. **Level 5 (First Principles)**: 打破陈旧工业套路，以 OpenAPI 直出 SDK 与极简 Monorepo 降维打击；
6. **Level 6 (Autopoiesis)**: 产生不可变资产与静态守卫，系统智力持续累加无回退！
