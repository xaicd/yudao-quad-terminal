---
name: yudao-mcp-server
description: Yudao-Quad-Terminal 的 MCP 机器可调用端点（scripts/mcp/yudao-mcp-server.cjs + 根 .mcp.json），把模块裁剪、代码生成、上下文切片与工程门禁暴露为 Agent 可闭环驱动的 8 个工具。接到「MCP 接入 / 让 Agent 驱动裁剪 / 机器可读端点 / mcp 工具编排 / 无头驱动工程能力」时启用。
---

# yudao-mcp-server — Agent 可编排的机器端点

> 治理依据：`AGENTS.md` Rule 13（全能力 AI Agent 驱动）与 Rule 11（单一真源）。
> 本技能只描述**如何调用**；所有实现都在既有脚本里，本技能不承载任何业务逻辑。

## 1. 它解决什么问题

本仓的模块裁剪、全栈代码生成、上下文切片、门禁自检原本只能由人类敲命令。本端点把它们收敛为
MCP stdio JSON-RPC 服务，使 Cursor / Claude Code / Command Code 等客户端可**无人工干预**调用。

**单一真源约束**：MCP server 不复制任何逻辑，全部工具复用既有脚本：

| 层 | 文件 | 职责 |
|---|---|---|
| 元数据真源 | `scripts/lib/module-catalog.mjs` | 19 模块元数据、依赖闭包、装配档 |
| 领域引擎 | `scripts/trim-modules.mjs` | 裁剪计划/落地/校验 |
| 端点层 | `scripts/mcp/yudao-mcp-server.cjs` | stdio JSON-RPC，只做参数转译与结果包装 |
| 注册 | `.mcp.json`（仓库根，project scope，随 Git 提交） | 客户端发现入口 |

## 2. 接入方式

```bash
# 方式一：仓库根 .mcp.json 已存在，MCP 兼容客户端会自动发现（project scope，需提交）
# 方式二：显式注册（用户级）
cmd mcp add yudao-quad-terminal -- node "$PWD/scripts/mcp/yudao-mcp-server.cjs"

# 验证
cmd mcp list          # 应列出 yudao-quad-terminal
/mcp                  # 会话内查看连接状态与工具数
```

工具对外名遵循 `mcp__yudao-quad-terminal__<tool>`：
`modules_list`、`trim_preview`、`trim_apply`、`trim_check`、`gen_module`、
`openwiki_query`、`contract_drift`、`gate_check`。

## 3. 工具清单

| 工具 | 只读 | 用途 | 关键入参 |
|---|---|---|---|
| `modules_list` | ✅ | 19 模块元数据 + 规模画像 | `profile?` |
| `trim_preview` | ✅ | 裁剪计划预览（不落地） | `profile` \| `keep` \| `remove` |
| `trim_apply` | ❌ | **破坏性**执行裁剪 | 同上 + `yes:true`、`activate?` |
| `trim_check` | ✅ | 磁盘 vs 目标档一致性（CI 门禁） | 同上 |
| `gen_module` | ❌ | 全栈样板代码生成 | `module`、`entity`、`table?`、`title?`、`fields?`、`dryRun?` |
| `openwiki_query` | ✅ | ~150 Token 上下文切片 | `query` |
| `contract_drift` | ✅ | 前后端契约防漂移 | `strict?` |
| `gate_check` | ✅ | 四道门禁一键自检 | — |

## 4. 标准调用范式

```
1) modules_list   { profile: "lite" }        # 先看清保留/剔除与规模代价
2) trim_preview   { profile: "lite" }        # 评审预览，确认删除清单与 pom 改动
3) trim_apply     { profile: "lite", yes: true }
4) trim_check     { profile: "lite" }        # 收敛验证，应通过
5) gate_check     {}                         # 声明完成前必须跑
```

**硬约束**：
- 禁止跳过第 2 步直接 `trim_apply`；`yes:true` 是破坏性确认闸门，不是走过场。
- `trim_check` 返回失败即代表磁盘与目标档不一致，必须处理漂移后再声明完成。
- `gate_check` 返回 `isError:true` 时不得声明任务完成（与本仓 `No Artifact, No Done` 一致）。

## 5. 退出码与错误语义

| 退出码 | 含义 | Agent 应对 |
|---|---|---|
| `0` | 通过 | 继续 |
| `1` | `trim_check` 检出漂移 | 逐条修复 `drift` 列表 |
| `2` | 用法/校验错误（如缺 `infra`、`--remove` 与保留模块依赖冲突） | 按提示调整装配集合，不要 `--force` 绕过 |

## 6. 禁止事项

- 🚫 不要在 MCP server 里重写裁剪/生成逻辑（违反单一真源）。
- 🚫 不要用 `trim_apply` 代替评审：它是物理删除，虽然写 `.bak` 且 git 可恢复，但会删掉数千文件。
- 🚫 不要手改 `apps/backend/pom.xml` 的 `<module>` 节点来「对齐」`trim_check`：改装配集合后由工具改写。
- 🚫 不要把 `gate_check` 的红灯当作噪音：本仓目前 `socratic` 与 `contract` 两道门禁存在既有红灯，需如实上报。

## 7. 与其它技能的关系

- 选型与裁剪策略 → `yudao-cloud-bootstrap`
- 本地容器栈与端口 → `yudao-local-stack`
- 后端编码规范 → `yudao-backend-dev`
- 门禁体系与变异打假 → `yudao-cmmi-gatekeeper`
