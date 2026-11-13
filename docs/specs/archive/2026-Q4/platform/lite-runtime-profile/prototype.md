# 原型与交互规范: 零 Docker 单机轻量运行档（嵌入式真 PostgreSQL + 嵌入式真 Redis，后端子模块零改动）

> **Spec-Kit UI/UX 文本线框原型与交互状态契约 (UI Prototypes & Interaction States)**
> 上游真源：`brief.json`。线框用纯文本表达，100% 具备机器可读性与 Agent 操作确定性。
> 状态：`PLAN_APPROVED` | 所属领域：`platform` | 规格标识：`lite-runtime-profile`

---

## 1. 主要页面线框视图 (Screen Wireframes)



## 2. 交互要点与防误触守卫 (Interaction Guards)

* 启动脚本在 PG 运行时、Redis 二进制、fat jar、PG 驱动任一缺失时直接退出并给出可执行修复提示，不进入半启动状态。
* 探活失败时打印启动日志尾部，避免只报『启动失败』。
* Ctrl-C 时成对回收 Redis 与 java 进程，不留孤儿。
* 凭据仅在首次生成时回显一次，其后只提示文件路径。

## 3. 状态与空态处理 (States & Degraded UI)

- dry-run：打印将执行的确切步骤与依赖检查结果，不启动任何进程。
- 预检失败：明确列出缺失项（PG 运行时装未装 / Redis 制品不可抽取 / fat jar 不存在 / PG 驱动缺失）并退出。
- 启动中：输出 PG 端口与数据目录、Redis 端口、导入的 SQL 脚本路径、java 命令与 profile。
- 就绪：打印登录探活结果（200 + 是否含 accessToken）。
- 退出：Ctrl-C 触发 Redis 与 java 进程的成对清理。
