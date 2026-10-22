# HARNESS — yudao-quad-terminal 底座交付物一图总览

> **目的**：AI 数字员工与人类协作者进场 30 秒内看清「这个底座交付了什么 / 怎么被别的项目用 / 哪些红线 / 怎么自证」。
> **与 `AGENTS.md` 的关系**：互补不冲突 —— `AGENTS.md` 是**宪法与红线**（含 13 条铁律与已知红灯），本文件是**交付物索引 + 消费契约 + 验证矩阵**。
> **不重复任何 skill 全文**：只给「路径 + 1 行能力」。真源永远在被指向的那个文件。

---

## 1. 底座身份（5 秒）

| 项 | 值 |
|---|---|
| 定位 | 四端一体的**可派生底座**：Java 微服务 + Vue3 中台 + Uni-App 小程序 + Expo 原生端 |
| 消费方式 | 派生新项目 / 克隆协作 / 多项目同机托管 / AI Agent 接入（见 §3） |
| 模板版本 | `templateVersion 1.2.0`（见 `compat-manifest.json`；与派生项目自身 version 无关） |
| 底座形态 | **零 Docker** 可起（嵌入式真 PostgreSQL + 嵌入式真 Redis，`pnpm lite:up`） |
| 子模块 | `apps/{backend,admin,miniapp}` 为第三方只读上游；**差异一律落主仓** `deploy/patches/` |

## 2. 五个核心入口

| 优先级 | 文件 | 用途 |
|---|---|---|
| ★ | **`HARNESS.md`**（本文件） | 一图总览：交付物 + 消费契约 + 验证矩阵 |
| ★★ | [`AGENTS.md`](AGENTS.md) | 宪法 / 铁律 / 能力速查表 / 已知红灯（唯一真源） |
| ★★ | [`compat-manifest.json`](compat-manifest.json) | **下游消费契约**（机器可读，`pnpm compat:check` 强校验） |
| ★★ | [`llms.txt`](llms.txt) | 高密度能力契约（LLM 首选入口） |
| ★★ | [`wiki/index.md`](wiki/index.md) | OpenWiki 全息导航（按域找入口） |

## 3. 别的项目怎么用这个底座（4 类消费方）

| 消费方 | 怎么用 | 说明 |
|---|---|---|
| **派生新项目** | `pnpm project:hatch <工程名> [--title ...] [--package ...]` | `scripts/hatch.sh` → `scripts/project-reactor.mjs`：零 Git 历史复制 + 改名 + Java 包路径迁移 + 开源关键字脱敏 → 产出独立 git 仓库 |
| **克隆协作** | `git clone --recursive` → `pnpm install` → `pnpm gate:fast` | 三个子模块指针**都指向各自远端真实存在的上游提交**（`compat:check` 会验证这一点） |
| **多项目同机托管** | `pnpm all`（= `run-all.cjs`）/ `pnpm check:all` | 按项目名动态生成 API 前缀 `/&lt;slug&gt;/admin-api` 与端口偏移，多项目并存不冲突 |
| **AI Agent 接入** | `.mcp.json`（8 工具）+ `llms.txt` + 本文件 | 需求→裁剪→代码生成→契约→验收→发布 全链路可无头编排 |

## 4. 验证矩阵（自证手段，不是口号）

| 层 | 命令 | 证明什么 | 实测 |
|---|---|---|---|
| L0 契约 | `pnpm compat:check` | 下游绑定的入口/端口/路径/子模块指针与实现**逐条一致** | 8 组检查 |
| L1 静态守卫 | `pnpm gate:fast` | 16 项 blocking/advisory 门禁 | 秒级 |
| L2 单元测试 | `pnpm test:scripts` | 78 个 `node:test` 用例（裁剪/规格/凭据/加解密/收割边界/JDK 变体/子模块补丁/harness 不变式） | ~4s |
| L3 端到端 | `pnpm lite:verify` | 嵌入式真 PG + 真 Redis + 真登录（含 ApiEncrypt 加密登录连续 3 次） | ~20s |
| L4 构建 | `pnpm build:backend` / `pnpm build:admin` | 189MB 可运行 jar / 24.6MB 前端 dist | 各 ~1min / ~25s |
| L5 全量 | `pnpm gate:full` | 19 项（含后端单测 + 前端构建 + lite e2e） | ~2min |
| **L6 反向控制** | `pnpm harness:controls` | **证明门禁真的会红**：给每道门禁注入违规 → 必须失败 → 复原 → 必须转绿 | 9/9 通过 |
| **L7 派生金路径** | `pnpm harness:hatch` | 在临时目录**真跑一次派生**并断言 13 项：契约文件齐备 / 本地状态零泄漏（含凭据）/ 身份替换 / Java 包迁移 / `groupId` 与包同源 / 文件名旧品牌清零 / workspace 依赖无悬空 / 派生项目能自跑门禁 | 11s · 12986 文件 |

> L6 是本文件与家族 harness（cooliebase-all `harness-health` / wenlv-next `*-negative-control`）对齐的关键：
> **配置合法 ≠ 生效，门禁存在 ≠ 会咬人**。只有被反向验证过的守卫才算数。

## 5. 底座级不变式（违反即红灯）

1. **子模块只读**：差异只以 `deploy/patches/*.patch` 形式落主仓；子模块指针必须钉**远端存在**的提交（`gate:fast` 的 `submodule-patches` 与 `compat:check` 双重把关）。
2. **pnpm 唯一**：所有脚本入口与依赖安装一律走 pnpm；上游包管理器那四类操作（run / install / exec / ci）在自有文件里禁止出现（`pkg-manager` 门禁）。
3. **声明必须可执行**：文档里出现的命令与 git ref 必须真实存在（`doc-commands` / `script-targets` / `jdk-variants` 门禁）。
4. **无弱默认凭据**：引导凭据由 CSPRNG 生成并写入 0600 文件（`lite` 门禁反证 `admin/admin123` 必须被拒）。
5. **测试不得空洞**：探针与验收必须断言非空/真实入库，禁止假 Mock（见 §6）。

## 6. 维护约定

- 本文件只在「交付物结构变化」时更新（新增门禁层、新增消费方式、脚本改名）。
- 改 `compat-manifest.json` 的任何声明，必须同时让 `pnpm compat:check` 保持绿灯 —— 二者不一致就是红灯。
- 新增 blocking 门禁后，请在 `scripts/harness/negative-controls.mjs` 里补一条**反向控制**，否则不确定它会不会咬人。
