# Tasks Breakdown & WBS: 零 Docker 单机轻量运行档（嵌入式真 PostgreSQL + 嵌入式真 Redis，后端子模块零改动）

> **Spec-Kit 任务拆解与工单跟踪矩阵 (WBS & Task Dependency Plan)**
> 上游真源：`plan.md`。必须严格贯彻 **1 Task = 1 Commit** 铁律，Commit 消息必须包含 `[T<ID>]`。
> 状态：`PLAN_APPROVED` | 所属领域：`platform` | 规格标识：`lite-runtime-profile`
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

- [ ] **T1**: deploy/lite/runtime 自包含 node 运行时（embedded-postgres + pg + bcryptjs + .gitignore）
  - 归属: `main`
  - 文件白名单: `deploy/lite/runtime/package.json, deploy/lite/runtime/.gitignore`
  - 验收要求: 必须携带提交标识 `[T1]` 并附带真实测试验证

- [ ] **T2**: lite-pg.mjs 嵌入式 PG 运行时封装（启动/建库/导入官方 SQL/对账/停止）
  - 归属: `T1`
  - 文件白名单: `deploy/lite/runtime/lite-pg.mjs`
  - 验收要求: 必须携带提交标识 `[T2]` 并附带真实测试验证

- [ ] **T3**: lite-credentials.mjs 零弱默认凭据（CSPRNG 生成 + bcrypt + 禁用种子弱账号）
  - 归属: `T1`
  - 文件白名单: `deploy/lite/runtime/lite-credentials.mjs`
  - 验收要求: 必须携带提交标识 `[T3]` 并附带真实测试验证

- [ ] **T4**: lite-redis.mjs 嵌入式真 Redis（从 Maven 制品按平台抽取二进制并托管进程）
  - 归属: `T1`
  - 文件白名单: `deploy/lite/runtime/lite-redis.mjs`
  - 验收要求: 必须携带提交标识 `[T4]` 并附带真实测试验证

- [ ] **T5**: deploy/lite/application-lite.yaml 外置配置（PG 数据源 + 嵌入式 Redis 端口 + 关闭 xxl-job）
  - 归属: `T4`
  - 文件白名单: `deploy/lite/application-lite.yaml`
  - 验收要求: 必须携带提交标识 `[T5]` 并附带真实测试验证

- [ ] **T6**: scripts/lite-up.mjs 编排器（预检 + 抽取驱动 + 拉起双引擎 + 注入凭据 + 探活 + 成对回收）
  - 归属: `T5`
  - 文件白名单: `scripts/lite-up.mjs`
  - 验收要求: 必须携带提交标识 `[T6]` 并附带真实测试验证

- [ ] **T7**: package.json 接线 + yudao-local-stack 技能更新 lite 档依赖边界与许可范围
  - 归属: `T6`
  - 文件白名单: `package.json, .agents/skills/yudao-local-stack/SKILL.md`
  - 验收要求: 必须携带提交标识 `[T7]` 并附带真实测试验证

- [ ] **T8**: DAR 选型决策记录归档（数据库与 Redis 双决策加权矩阵）
  - 归属: `main`
  - 文件白名单: `docs/01_management/dar/DAR-20261021-lite-runtime-dependencies.md`
  - 验收要求: 必须携带提交标识 `[T8]` 并附带真实测试验证

- [ ] **T9**: 端到端验证：本项目 compose 零容器 → lite 启动 → 引导凭据登录 200 → admin/admin123 必须失败 → 子模块零改动复验（纯验证任务）
  - 归属: `main`
  - 文件白名单: `-`
  - 验收要求: 必须携带提交标识 `[T9]` 并附带真实测试验证


## 3. CMMI 双向追溯与 Git 提交核实矩阵 (RTM & Git Trace)

> **两条硬规矩**（对齐 CMMI「主线-支线任务树」与「1 Task = 1 Commit」）:
> 1. **归属**必须写 `main`（主线）或某个已存在的任务 ID —— **不允许孤儿任务**
> 2. **文件白名单**必填（逗号分隔）；`-` 表示该任务不改文件（纯验证类）
>
> 完成度**不看"状态"列**，而是从 git 推导: commit message 带 `[T<ID>]`
> 且改动文件落在白名单内，才算这条任务真的做了（`pnpm task:verify`）。

| ID | 归属 | 任务 | 文件白名单 | 状态 |
|---|---|---|---|---|
| T1 | main | deploy/lite/runtime 自包含 node 运行时（embedded-postgres + pg + bcryptjs + .gitignore） | deploy/lite/runtime/package.json, deploy/lite/runtime/.gitignore | 未开始 |
| T2 | T1 | lite-pg.mjs 嵌入式 PG 运行时封装（启动/建库/导入官方 SQL/对账/停止） | deploy/lite/runtime/lite-pg.mjs | 未开始 |
| T3 | T1 | lite-credentials.mjs 零弱默认凭据（CSPRNG 生成 + bcrypt + 禁用种子弱账号） | deploy/lite/runtime/lite-credentials.mjs | 未开始 |
| T4 | T1 | lite-redis.mjs 嵌入式真 Redis（从 Maven 制品按平台抽取二进制并托管进程） | deploy/lite/runtime/lite-redis.mjs | 未开始 |
| T5 | T4 | deploy/lite/application-lite.yaml 外置配置（PG 数据源 + 嵌入式 Redis 端口 + 关闭 xxl-job） | deploy/lite/application-lite.yaml | 未开始 |
| T6 | T5 | scripts/lite-up.mjs 编排器（预检 + 抽取驱动 + 拉起双引擎 + 注入凭据 + 探活 + 成对回收） | scripts/lite-up.mjs | 未开始 |
| T7 | T6 | package.json 接线 + yudao-local-stack 技能更新 lite 档依赖边界与许可范围 | package.json, .agents/skills/yudao-local-stack/SKILL.md | 未开始 |
| T8 | main | DAR 选型决策记录归档（数据库与 Redis 双决策加权矩阵） | docs/01_management/dar/DAR-20261021-lite-runtime-dependencies.md | 未开始 |
| T9 | main | 端到端验证：本项目 compose 零容器 → lite 启动 → 引导凭据登录 200 → admin/admin123 必须失败 → 子模块零改动复验（纯验证任务） | - | 未开始 |

## 4. 依赖说明与波次流转 (Dependencies & Progression)

T1 → {T2, T3, T4}；T4 → T5 → T6 → T7；T9 依赖 T1..T6

## 5. 阶段状态基线 (Phase Baseline)

* 规划：`PLAN_APPROVED`（由 Spec-Kit 生成）
* 开发：待开始
* 独立测试：待开始
