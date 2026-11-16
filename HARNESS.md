# HARNESS — yudao-quad-terminal 底座交付物一图总览

> **目的**：AI 数字员工与人类协作者进场 30 秒内看清「这个底座交付了什么 / 怎么被别的项目用 / 哪些红线 / 怎么自证」。
> **统一律**：与 `cooliebase-all` 严格保持 **Harness 9 大生命周期环节 100% 一致**（只能多不能少），具体实现因 Java 17 + Vue3/Expo 微服务与四端技术栈自适应。
> **与 `AGENTS.md` 的关系**：互补不冲突 —— `AGENTS.md` 是**宪法与红线**（含 13 条铁律与已知红灯），本文件是**交付物索引 + 消费契约 + 验证矩阵**。

---

## 1. 底座身份（5 秒）

| 项 | 值 |
|---|---|
| 定位 | 四端一体的**可派生底座**：Java 微服务 + Vue3 中台 + Uni-App 小程序 + Expo 原生端 |
| 消费方式 | 派生新项目 / 克隆协作 / 多项目同机托管 / AI Agent 接入（见 §3） |
| 模板版本 | `templateVersion 1.2.0`（见 `compat-manifest.json`；与派生项目自身 version 无关） |
| 底座形态 | **零 Docker** 可起（嵌入式真 PostgreSQL + 嵌入式真 Redis，`pnpm lite:up`） |
| 子模块 | `apps/{backend,admin,miniapp}` 为第三方只读上游；**差异一律落主仓** `deploy/patches/` |

---

## 2. 核心入口与跨底座统一 `.cjs` 契约矩阵

> **跨底座同名同参铁律**：无论底层是 `cooliebase-all`（`v1.5.0`，Next.js 16 / React 19 + Admin + 2C Portal + `clients/miniapp` + `clients/expo` 四端同源 & 含 `oa/hrm/fms/pms` 等 18 第一方插件）还是 `yudao-quad-terminal`（`v1.2.0`，Java Spring Boot 3 + Vue3 Admin + UniApp + Expo 四端同源 & 19 业务模块），向外部（Coolie 工坊与 AI Agent 数字员工）暴露的 **`.cjs` 脚本路径、CLI 参数、`pnpm run` 命令、全仓 `docs/` 文档归口及 Embedded PostgreSQL 真库测试契约 100% 一致**：

| 优先级 | 统一入口文件 / 脚本 | 统一 `pnpm run` 命令 | 用途与跨底座标准行为 |
|---|---|---|---|
| ★ | **`HARNESS.md`**（本文件） | — | 一图总览：交付物 + 消费契约 + 统一生命周期环节 + 验证矩阵 |
| ★★ | [`AGENTS.md`](AGENTS.md) | — | 宪法 / 铁律 / 蓝图使用规范 / 能力速查表（唯一真源） |
| ★★ | [`compat-manifest.json`](compat-manifest.json) | `pnpm run compat:check` | **下游消费契约**（机器可读，`scripts/compat-check.cjs` 强校验） |
| ★★ | [`scripts/harness.cjs`](scripts/harness.cjs) | `pnpm run harness <action>` | 统一 9 阶段全生命周期 Harness 总调度引擎（含 `pmo`） |
| ★★ | [`scripts/project-init.cjs`](scripts/project-init.cjs) | `pnpm run project:init -- ...` | 统一零污染沙箱派生与白标重构引擎（兼容 `pnpm project:hatch`） |
| ★★ | [`scripts/blueprint-engine.cjs`](scripts/blueprint-engine.cjs) | `pnpm run blueprint:deliver` | 统一 `<500 Tokens` 蓝图自愈 (`doctor`)、编译 (`compile-domain`) 与真库交付 (`deliver --verify-e2e`) |
| ★★ | [`scripts/lib/ephemeral-pg.cjs`](scripts/lib/ephemeral-pg.cjs) | — | 统一零 Docker **嵌入式真 PostgreSQL 18.4 (`embedded-postgres`)** 端点解析器 |
| ★★ | [`scripts/speckit.cjs`](scripts/speckit.cjs) | `pnpm run speckit:new` / `pnpm run speckit:check` | 统一 Spec-Kit SDD 工程规格管理引擎 (`new \| build \| check \| tasks \| archive`) |
| ★★ | [`scripts/codegen-module.cjs`](scripts/codegen-module.cjs) | `pnpm run gen:module` | 统一业务域全栈代码与 PostgreSQL DDL 生成器 |
| ★★ | [`scripts/gate-check.cjs`](scripts/gate-check.cjs) | `pnpm run check` / `pnpm run gate:fast` | 统一工程质量与架构边界门禁（fast 17 项 / full 20 项） |
| ★★ | [`scripts/build-release-assets.cjs`](scripts/build-release-assets.cjs) | `pnpm run release:package` | 统一离线纯净四端骨架包、契约清单与 `SHA256SUMS.txt` 发布打包器 |
| ★★ | [`scripts/service.sh`](scripts/service.sh) | `pnpm run service:start` / `pnpm run service:health` | 物理服务运维控制器（支持单一入口 `48120` 与 Spring Boot 守护） |

### 2.1 双支柱架构：`harness` 定工作流程总规范 × `speckit` 扩展 CMMI 00~09 全生命周期文档体系

> **核心分工哲学**：
> 1. **支柱一：`harness`（[`HARNESS.md`](HARNESS.md) + [`scripts/harness.cjs`](scripts/harness.cjs)）= 工作流程与运行生命周期总规范**
>    负责定义从依赖安装、静态检查、构建打包、服务启停、健康探活到真库 E2E 与出厂终验的 9 阶段标准工作流（`install -> check -> build -> start -> health -> status -> stop -> e2e -> deliver`）。
> 2. **支柱二：`speckit`（[`scripts/speckit.cjs`](scripts/speckit.cjs)）+ CMMI 00~09 扩展（`scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs`）= 全环节工程文档与过程资产引擎**
>    因为**每个 CMMI 00~09 环节本质上都与工程文档强绑定**（同时承载 **Layer A 宏观过程文档 `docs/00_meta_standards/`~`docs/09_operations/`** 与 **Layer B 特性规格包阶段文档 `docs/specs/<domain>/<name>/`**），所以每个 CMMI 环节均属于 `speckit` 的一等公民扩展，统一通过 `node scripts/speckit.cjs cmmi <00..09> [docs|check|asset|...]`（或 `node scripts/cmmi-0X-*.cjs`）调用：

| CMMI 阶段 | `speckit` 阶段扩展入口 / `.cjs` 脚本 | 宏观工程过程文档 (Layer A: 统一归口 `docs/`) | 特性规格包阶段文档 (Layer B: `docs/specs/<域>/<名>/`) | 阶段专属动作与文档门禁 |
|---|---|---|---|---|
| **00 规范与元契约** | `node scripts/speckit.cjs cmmi 00`<br>([`scripts/cmmi-00-meta.cjs`](scripts/cmmi-00-meta.cjs)) | `docs/00_meta_standards/README.md`、`.specify/memory/constitution.md`、`docs/wiki/` | `spec.json` | `docs \| check \| constitution \| schema \| sync` |
| **01 立项与 PMO 大盘** | `node scripts/speckit.cjs cmmi 01`<br>([`scripts/cmmi-01-management.cjs`](scripts/cmmi-01-management.cjs)) | `docs/01_management/` (`pmo-dashboard.md`, `project-plan.md`, `project-charter.md`, `risk-register.md`) | `selection.md`, `research.md` | `pmo \| docs \| check \| asset \| init \| render` |
| **02 需求与规格工程** | `node scripts/speckit.cjs cmmi 02`<br>([`scripts/cmmi-02-requirements.cjs`](scripts/cmmi-02-requirements.cjs)) | `docs/02_requirements/` (`software-requirements.md`, `rtm-traceability-matrix.md`, `non-functional-reqs.md`, `uat-acceptance-certificate.md`) | `brief.json`, `requirements.md`, `spec.md` | `docs \| check \| asset \| route \| new \| build` |
| **03 架构设计与自愈** | `node scripts/speckit.cjs cmmi 03`<br>([`scripts/cmmi-03-design.cjs`](scripts/cmmi-03-design.cjs)) | `docs/03_design/` (`architecture-design-hld.md`, `database-design-erd.md`, `adr/`, `diagrams/`) | `design.md`, `prototype.md` | `docs \| check \| asset \| doctor \| compile-domain` |
| **04 研发计划与实现** | `node scripts/speckit.cjs cmmi 04`<br>([`scripts/cmmi-04-implementation.cjs`](scripts/cmmi-04-implementation.cjs)) | `docs/04_implementation/` (`README.md`) | `plan.md`, `tasks.md` | `docs \| check \| asset \| tasks \| deliver \| codegen` |
| **05 测试与真 PG E2E** | `node scripts/speckit.cjs cmmi 05`<br>([`scripts/cmmi-05-verification.cjs`](scripts/cmmi-05-verification.cjs)) | `docs/05_verification/` (`test-plan.md`, `test-summary-report.md`, `defect-tracking-ledger.md`) | `testing.md`, `evidence.json`, `bugs.md` | `docs \| check \| asset \| e2e \| unit \| mutation` |
| **06 质量门禁与审计** | `node scripts/speckit.cjs cmmi 06`<br>([`scripts/cmmi-06-quality.cjs`](scripts/cmmi-06-quality.cjs)) | `docs/06_quality_assurance/` (`qa-audit-plan.md`, `configuration-audit.md`, `car-prevention.md`, `spc-metrics.md`)、`docs/audit/` | `checklist.md` | `docs \| check \| asset \| tasks \| controls` |
| **07 发布 SOP 与指纹** | `node scripts/speckit.cjs cmmi 07`<br>([`scripts/cmmi-07-release.cjs`](scripts/cmmi-07-release.cjs)) | `docs/07_release/` (`system-deployment-sop.md`, `rollback-runbook.json`, `release-fingerprint.json`, `releases/v1.2.0.md`) | `deployment.md`, `runbook.json` | `docs \| check \| asset \| gateway \| build \| fingerprint \| runbook` |
| **08 SRE 与事故复盘** | `node scripts/speckit.cjs cmmi 08`<br>([`scripts/cmmi-08-sre.cjs`](scripts/cmmi-08-sre.cjs)) | `docs/08_sre/` (`01_slo_sli_metrics/`, `06_incidents_postmortem/`) | `operations.md` | `docs \| check \| asset \| status \| health \| security \| load` |
| **09 持续运营与归档** | `node scripts/speckit.cjs cmmi 09`<br>([`scripts/cmmi-09-operations.cjs`](scripts/cmmi-09-operations.cjs)) | `docs/09_operations/` (`tenant-governance.md`, `01_biz_ops/`) | `operations.md` | `docs \| check \| asset \| archive \| ops` |

---

## 3. 交付物标准 Harness 9 大闭环生命周期环节 & 蓝图三步交付流（与 CoolieBase 100% 一致）

无论是母本自身研发，还是派生出的层B交付物，统一暴露且严格执行以下 9 大标准环节：

```bash
pnpm harness install     # [环节 1] 依赖安装：mvn install + pnpm install + 领域种子数据注入
pnpm harness check       # [环节 2] 静态与契约门禁：0 编译报错、TypeScript 类型全绿、敏感配置扫描
pnpm harness build       # [环节 3] 制品编译：生产打包 (Spring Boot 可运行 Jar + Vite 前端 dist)
pnpm harness start       # [环节 4] 运行时拉起：后台守护进程启动、单一入口网关 (:48120)、PID 记录
pnpm harness health      # [环节 5] 实时健康探活：物理拨测 /${slug}/actuator/health 与 /${slug}/，严格 200 OK
pnpm harness status      # [环节 6] 状态大盘：查看 PID、端口监听、对外统一 C端/B端 入口
pnpm harness stop        # [环节 7] 资源回收：干净回收 :48120 与 :48080，清理残留锁与进程树
pnpm harness e2e         # [环节 8] 拟真人交互走查：agent-browser 驱动真机点击，输出不可伪造四态截图
pnpm harness deliver     # [环节 9] 商业终验出厂：23道物理门禁全量压测，生成不可篡改《出厂交付结项单》
```

### 3.1 Coolie 工坊 & AI Agent 数字员工跨底座统一三步流水线

在 `cooliebase-all` 与 `yudao-quad-terminal` 上，AI 员工无需区分底座类型，统一执行完全相同的 3 条标准指令：

```bash
# Step 1: 零污染沙箱派生 + 四端 BASE_PATH 同源渲染 (/<slug>/{2c,admin,admin-api,app-api,v3/api-docs})
pnpm run project:init -- --name <slug> --title "<系统中文名>" --target /tmp/<slug>-sandbox

# Step 2: 喂入 <500 Tokens 的 <domain>.blueprint.json，一键完成 doctor 自愈 + Spec-Kit 展开 + 全栈代码 + Embedded PostgreSQL 6阶段真库 E2E
cd /tmp/<slug>-sandbox
pnpm run blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e

# Step 3: 统一工程门禁与兼容契约自检
pnpm run check && pnpm run compat:check
```

---

## 4. 别的项目怎么用这个底座（4 类消费方）

| 消费方 | 怎么用 | 说明 |
|---|---|---|
| **派生新项目** | `pnpm project:hatch <工程名> [--title ...] [--package ...]` | `scripts/hatch.sh` → `scripts/project-reactor.mjs`：零 Git 历史复制 + 改名 + Java 包路径迁移 + 开源关键字脱敏 → 产出独立 git 仓库 |
| **克隆协作** | `git clone --recursive` → `pnpm install` → `pnpm gate:fast` | 三个子模块指针**都指向各自远端真实存在的上游提交**（`compat:check` 会验证这一点） |
| **多项目同机托管** | `pnpm all`（= `run-all.cjs`）/ `pnpm check:all` | 按项目名动态生成 API 前缀 `/${slug}/admin-api` 与端口偏移，多项目并存不冲突 |
| **AI Agent 接入** | `.mcp.json`（8 工具）+ `llms.txt` + 本文件 | 需求→裁剪→代码生成→契约→验收→发布 全链路可无头编排 |

---

## 5. 验证矩阵（自证手段，不是口号）

| 层 | 命令 | 证明什么 | 实测 |
|---|---|---|---|
| L0 契约 | `pnpm compat:check` | 下游绑定的入口/端口/路径/子模块指针与实现**逐条一致** | 11 组检查 |
| L1 静态守卫 | `pnpm gate:fast`（`pnpm harness check`） | 17 项 blocking/advisory 门禁（含 4 字菜单与 `docs/` 单一归口守卫） | 秒级 |
| L2 单元测试 | `pnpm test:scripts`（`pnpm harness test`） | 99 个 `node:test` 用例（契约基线/裁剪/规格/凭据/加解密/收割边界/JDK 变体/子模块补丁/净室派生） | ~5s |
| L3 端到端 | `pnpm lite:verify`（`pnpm harness e2e`） | 嵌入式真 PG + 真 Redis + 真登录（含 ApiEncrypt 加密登录连续 3 次） | ~20s |
| L4 构建与发布 | `pnpm build` / `pnpm release:package` | 189MB 可运行 jar / 24.6MB 前端 dist / 离线纯净四端骨架包 (`SHA256SUMS.txt`) | ~1min |
| L5 全量 | `pnpm gate:full`（`pnpm harness deliver`） | 20 项（含后端单测 + 前端构建 + lite e2e） | ~2min |
| **L6 反向控制** | `pnpm harness:controls` | **证明门禁真的会红**：给每道 blocking 门禁注入违规 → 必须失败 → 复原 → 必须转绿 | 10/10 通过 |
| **L7 派生金路径** | `pnpm harness:hatch` | 在临时目录**真跑一次派生**并断言 20 项：契约文件齐备 / 本地状态零泄漏（含凭据）/ 身份替换 / Java 包迁移 / `groupId` 同源 / 文件名旧品牌清零 / 依赖无悬空 / 四平面 Caddy 网关 / 自跑门禁 | ~12s |

> L6 是本文件与跨底座统一反向控制守卫（`harness-health` / `negative-controls`）对齐的关键：
> **配置合法 ≠ 生效，门禁存在 ≠ 会咬人**。只有被反向验证过的守卫才算数。

---

## 6. 底座级不变式（违反即红灯）

1. **子模块只读**：差异只以 `deploy/patches/*.patch` 形式落主仓；子模块指针必须钉**远端存在**的提交（`gate:fast` 的 `submodule-patches` 与 `compat:check` 双重把关）。
2. **pnpm 唯一**：所有脚本入口与依赖安装一律走 pnpm；禁止出现其他 JS 包管理器命令（`pkg-manager` 门禁）。
3. **声明必须可执行**：文档里出现的命令与 git ref 必须真实存在（`doc-commands` / `script-targets` / `jdk-variants` 门禁）。
4. **无弱默认凭据**：引导凭据由 CSPRNG 生成并写入 0600 文件（`lite` 门禁反证默认弱管理员口令必须被拒）。
5. **测试不得空洞 & 文档单一归口 `docs/`**：探针与验收必须断言真实入库，禁止假 Mock；全仓文档/规格/知识库/Release/审计报告严格归口 `docs/`，禁止顶层散落文档目录。

---

## 7. 维护约定

- 本文件只在「交付物结构变化」时更新（新增门禁层、新增消费方式、脚本改名）。
- 改 `compat-manifest.json` 的任何声明，必须同时让 `pnpm compat:check` 保持绿灯 —— 二者不一致就是红灯。
- 新增 blocking 门禁后，请在 `scripts/harness/negative-controls.mjs` 里补一条**反向控制**，否则不确定它会不会咬人。
