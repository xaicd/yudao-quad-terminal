# 原型与交互规范: 模块裁剪工具化与 Agent 可编排 MCP 端点

> **Spec-Kit UI/UX 文本线框原型与交互状态契约 (UI Prototypes & Interaction States)**
> 上游真源：`brief.json`。线框用纯文本表达，100% 具备机器可读性与 Agent 操作确定性。
> 状态：`PLAN_APPROVED` | 所属领域：`platform` | 规格标识：`module-trim-and-mcp`

---

## 1. 主要页面线框视图 (Screen Wireframes)



## 2. 交互要点与防误触守卫 (Interaction Guards)

* 破坏性 --apply 前需二次确认；CI/Agent 场景用 --yes 显式跳过。
* git 工作区存在未提交改动时拒绝 --apply，避免把用户在做的工作一起卷进删除。

## 3. 状态与空态处理 (States & Degraded UI)

- dry-run：打印计划表，不做任何写入。
- apply 成功：打印已删目录数、剩余模块、剩余 Java 文件数与冷编译预估变化。
- check 通过：exit 0 并列出当前 profile。
- check 漂移：exit 1 并逐条列出漂移项（目录 / pom 节点）。
