# 《Yudao Quad-Terminal》全栈分层测试与质量验证总计划 (Test Plan, `v1.2.0`)

## 一、八层递进式自动化验证矩阵（L0 ~ L7）

| 层级 | 验证维度 | 执行入口命令 | 核心覆盖内容与放行标准 |
| :--- | :--- | :--- | :--- |
| **L0 兼容契约** | 下游绑定契约核验 | `pnpm compat:check` | 11 组核验：37 个脚本入口、lite 端口/环境变量、构建产物、3 个子模块远端可达指针与 19 原生模块纯净度 |
| **L1 快速门禁** | 秒级静态与架构守卫 | `pnpm check` (`pnpm gate:fast`) | 17 项门禁：`pkg-manager`、`openwiki`、`skills`、`typecheck`、`specs-health`、`workflow`、`scripts-tests`、`trim-cli`、`contract`、`doc-commands`、`script-targets`、`compat`、`submodule-patches`、`jdk-variants`、`ci-files`、`menu-standard`、`socratic` |
| **L2 脚本单测** | 工具链与运行时单测 | `pnpm test:scripts` | `scripts/tests/*.test.mjs` 共 **99 个 `node:test` 用例**（含真实 Embedded PG 菜单归一化测试） |
| **L3 后端单测** | Java 领域服务单测 | `pnpm test:all` | `apps/backend` 下 `yudao-module-system-server` 与 `yudao-module-infra-server` Maven 单元测试 |
| **L4 真库端到端** | 零 Docker 真 PG + 真 Redis | `pnpm lite:verify` | 60 表初始化、CSPRNG 高熵凭据注入、AES-256-ECB 连续 3 次登录 200、默认弱凭据拒绝反证 |
| **L5 全量门禁** | 构建与真库联调总验 | `pnpm gate:full` | 20 项门禁（在 L1 基础上追加 `backend-tests`、`admin-build` 与 `lite` 端到端验收） |
| **L6 反向控制** | 守卫有效性变异实验 | `pnpm harness:controls` | 对 10 道核心 blocking 门禁逐项注入受控违规，验证「必红 → 还原 → 必绿」 |
| **L7 金路径派生** | 净室白标孵化冒烟 | `pnpm harness:hatch` | 在临时目录完整运行 `project:hatch` 并逐条断言 20 项净室、包迁移与自跑门禁指标 |

---

## 二、多视口 UI 几何与防假 Mock 验收标准（Stage B3 / B4）

- **真实数据库驱动**：严禁前端硬编码静态数组或内存假数据；所有列表、状态流转与统计卡片均绑定真实后端 REST 接口。
- **四视口零遮挡**：Playwright 回归覆盖 `1920×1080`、`1440×900`、`375×812`、`320×568` 四档分辨率，强制断言横向零溢出与固定底栏 `elementFromPoint` 可点击性。
