# Tasks Breakdown & WBS: 模块裁剪工具化与 Agent 可编排 MCP 端点

> **Spec-Kit 任务拆解与工单跟踪矩阵 (WBS & Task Dependency Plan)**
> 上游真源：`plan.md`。必须严格贯彻 **1 Task = 1 Commit** 铁律，Commit 消息必须包含 `[T<ID>]`。
> 状态：`PLAN_APPROVED` | 所属领域：`platform` | 规格标识：`module-trim-and-mcp`
> 对应项目宪法：`.specify/memory/constitution.md` (Gate 3 任务原子性 / Gate 4 真实入库测试)

---

## 1. 任务依赖波次图 (Task Dependency Waves)

```json
{
  "waves": [
    {
      "id": "wave-1",
      "title": "地基与契约准备",
      "tasks": [
        "T1"
      ],
      "dependsOn": []
    },
    {
      "id": "wave-2",
      "title": "核心服务与数据流落地",
      "tasks": [
        "T2"
      ],
      "dependsOn": [
        "wave-1"
      ]
    },
    {
      "id": "wave-3",
      "title": "端到端测试与集成验证",
      "tasks": [
        "T3"
      ],
      "dependsOn": [
        "wave-2"
      ]
    }
  ]
}
```

## 2. 交互式任务清单 (Interactive Execution Tasks)

- [ ] **T1**: module-catalog 单一真源（19 模块元数据 + profiles + 依赖闭包）
  - 归属: `main`
  - 文件白名单: `scripts/lib/module-catalog.mjs`
  - 验收要求: 必须携带提交标识 `[T1]` 并附带真实测试验证

- [ ] **T2**: trim-modules CLI（dry-run/apply/check/sql/json + 依赖闭包校验 + 子模块语义与 --recover）
  - 归属: `T1`
  - 文件白名单: `scripts/trim-modules.mjs`
  - 验收要求: 必须携带提交标识 `[T2]` 并附带真实测试验证

- [ ] **T3**: trim CLI 自测：三档 profile 全量覆盖、漂移时 exit 1、重复执行幂等
  - 归属: `T2`
  - 文件白名单: `scripts/lib/module-catalog.mjs, scripts/trim-modules.mjs`
  - 验收要求: 必须携带提交标识 `[T3]` 并附带真实测试验证

- [ ] **T4**: MCP stdio server + 8 个工具（全程复用既有脚本）
  - 归属: `T1`
  - 文件白名单: `scripts/mcp/yudao-mcp-server.cjs, .mcp.json`
  - 验收要求: 必须携带提交标识 `[T4]` 并附带真实测试验证

- [ ] **T5**: yudao-mcp-server 技能 + wiki 注册（含悬空 mcp-builder 改名）
  - 归属: `T4`
  - 文件白名单: `.agents/skills/yudao-mcp-server/SKILL.md, scripts/sync-openwiki.mjs, wiki/`
  - 验收要求: 必须携带提交标识 `[T5]` 并附带真实测试验证

- [ ] **T6**: bootstrap SKILL 收敛到真实脚本（删除假 bash 模板）
  - 归属: `T2`
  - 文件白名单: `.agents/skills/yudao-cloud-bootstrap/SKILL.md`
  - 验收要求: 必须携带提交标识 `[T6]` 并附带真实测试验证

- [ ] **T7**: package.json 接线（trim:*/mcp:yudao/openwiki:*）
  - 归属: `T1`
  - 文件白名单: `package.json`
  - 验收要求: 必须携带提交标识 `[T7]` 并附带真实测试验证

- [ ] **T8**: 修同族工具 SQL 路径 bug（codegen 写到不存在的 apps/backend/scripts/sql）
  - 归属: `main`
  - 文件白名单: `scripts/codegen-module.mjs, scripts/agent-context-compressor.mjs`
  - 验收要求: 必须携带提交标识 `[T8]` 并附带真实测试验证


## 3. CMMI 双向追溯与 Git 提交核实矩阵 (RTM & Git Trace)

> **两条硬规矩**（对齐 CMMI「主线-支线任务树」与「1 Task = 1 Commit」）:
> 1. **归属**必须写 `main`（主线）或某个已存在的任务 ID —— **不允许孤儿任务**
> 2. **文件白名单**必填（逗号分隔）；`-` 表示该任务不改文件（纯验证类）
>
> 完成度**不看"状态"列**，而是从 git 推导: commit message 带 `[T<ID>]`
> 且改动文件落在白名单内，才算这条任务真的做了（`pnpm task:verify`）。

| ID | 归属 | 任务 | 文件白名单 | 状态 |
|---|---|---|---|---|
| T1 | main | module-catalog 单一真源（19 模块元数据 + profiles + 依赖闭包） | scripts/lib/module-catalog.mjs | 未开始 |
| T2 | T1 | trim-modules CLI（dry-run/apply/check/sql/json + 依赖闭包校验 + 子模块语义与 --recover） | scripts/trim-modules.mjs | 未开始 |
| T3 | T2 | trim CLI 自测：三档 profile 全量覆盖、漂移时 exit 1、重复执行幂等 | scripts/lib/module-catalog.mjs, scripts/trim-modules.mjs | 未开始 |
| T4 | T1 | MCP stdio server + 8 个工具（全程复用既有脚本） | scripts/mcp/yudao-mcp-server.cjs, .mcp.json | 未开始 |
| T5 | T4 | yudao-mcp-server 技能 + wiki 注册（含悬空 mcp-builder 改名） | .agents/skills/yudao-mcp-server/SKILL.md, scripts/sync-openwiki.mjs, wiki/ | 未开始 |
| T6 | T2 | bootstrap SKILL 收敛到真实脚本（删除假 bash 模板） | .agents/skills/yudao-cloud-bootstrap/SKILL.md | 未开始 |
| T7 | T1 | package.json 接线（trim:*/mcp:yudao/openwiki:*） | package.json | 未开始 |
| T8 | main | 修同族工具 SQL 路径 bug（codegen 写到不存在的 apps/backend/scripts/sql） | scripts/codegen-module.mjs, scripts/agent-context-compressor.mjs | 未开始 |

## 4. 依赖说明与波次流转 (Dependencies & Progression)

T1 → {T2, T4, T7, T8}；T2 → {T3, T6}；T4 → T5

## 5. 阶段状态基线 (Phase Baseline)

* 规划：`PLAN_APPROVED`（由 Spec-Kit 生成）
* 开发：待开始
* 独立测试：待开始
