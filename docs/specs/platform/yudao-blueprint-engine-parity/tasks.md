# Tasks Breakdown & WBS: Yudao 四端蓝图底座与 CoolieBase 全能力对标升级：四端 BasePath 同源、无污染沙箱派生、极简蓝图一键交付与 6 阶段真库 Spec E2E 闭环

> **Spec-Kit 任务拆解与工单跟踪矩阵 (WBS & Task Dependency Plan)**
> 上游真源：`plan.md`。必须严格贯彻 **1 Task = 1 Commit** 铁律，Commit 消息必须包含 `[T<ID>]`。
> 状态：`PLAN_APPROVED` | 所属领域：`platform` | 规格标识：`yudao-blueprint-engine-parity`
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

- [x] **T1**: 四端 BasePath 同源模板与网关契约补齐：blueprint.template.json 增 BASE_PATH + admin/miniapp/app 模板对齐 + generate-gateway-config.mjs 暴露 /<slug>/v3/api-docs
  - 归属: `main`
  - 文件白名单: `blueprint.template.json, apps/admin/.env.local.template, apps/admin/.env.template, apps/app/app.template.json, scripts/generate-gateway-config.mjs`
  - 验收要求: 必须携带提交标识 `[T1]` 并附带真实测试验证

- [x] **T2**: 无污染沙箱秒级派生修复：修复 hatch.sh 与 project-reactor.mjs CLI 参数错位 (--target/--project 兼容) + 支持目标沙箱自动瘦身拷贝与根 node_modules 软链
  - 归属: `T1`
  - 文件白名单: `scripts/hatch.sh, scripts/project-reactor.mjs`
  - 验收要求: 必须携带提交标识 `[T2]` 并附带真实测试验证

- [x] **T3**: 代码生成器白标自适应与全栈能力升级：codegen-module.mjs 动态解析 <slug>-server 与真实 Java 包名 + 补齐 AppController (/app-api) + 状态机守卫 + 乐观锁 + convertActions + sub_table
  - 归属: `T2`
  - 文件白名单: `scripts/codegen-module.mjs`
  - 验收要求: 必须携带提交标识 `[T3]` 并附带真实测试验证

- [x] **T4**: 声明式蓝图引擎全能力对齐：升级 scripts/blueprint-engine.cjs 支持 --preset、doctor 自愈、compile-domain 与 deliver --verify-e2e（自动生成 14 份 SDD 资产 + 全栈模块 + 6 阶段 E2E 测试）
  - 归属: `T3`
  - 文件白名单: `scripts/blueprint-engine.cjs, package.json`
  - 验收要求: 必须携带提交标识 `[T4]` 并附带真实测试验证

- [x] **T5**: 底座纯净度与门禁守卫加固：gate-check.mjs 与 compat-check.mjs 新增母本 19 原生模块边界守卫与蓝图 BASE_PATH 闭合检查
  - 归属: `T4`
  - 文件白名单: `scripts/gate-check.mjs, scripts/compat-check.mjs, compat-manifest.json`
  - 验收要求: 必须携带提交标识 `[T5]` 并附带真实测试验证

- [x] **T6**: 无污染沙箱端到端实测与回归验证：在 /tmp/oa-yudao-sandbox 真跑 hatch -> blueprint deliver --verify-e2e -> 6 阶段 E2E 全绿并清理沙箱
  - 归属: `T5`
  - 文件白名单: `scripts/tests/blueprint-engine-e2e.test.mjs`
  - 验收要求: 必须携带提交标识 `[T6]` 并附带真实测试验证


## 3. CMMI 双向追溯与 Git 提交核实矩阵 (RTM & Git Trace)

> **两条硬规矩**（对齐 CMMI「主线-支线任务树」与「1 Task = 1 Commit」）:
> 1. **归属**必须写 `main`（主线）或某个已存在的任务 ID —— **不允许孤儿任务**
> 2. **文件白名单**必填（逗号分隔）；`-` 表示该任务不改文件（纯验证类）
>
> 完成度**不看"状态"列**，而是从 git 推导: commit message 带 `[T<ID>]`
> 且改动文件落在白名单内，才算这条任务真的做了（`pnpm task:verify`）。

| ID | 归属 | 任务 | 文件白名单 | 状态 |
|---|---|---|---|---|
| T1 | main | 四端 BasePath 同源模板与网关契约补齐：blueprint.template.json 增 BASE_PATH + admin/miniapp/app 模板对齐 + generate-gateway-config.mjs 暴露 /<slug>/v3/api-docs | blueprint.template.json, apps/admin/.env.local.template, apps/admin/.env.template, apps/app/app.template.json, scripts/generate-gateway-config.mjs | 已完成 |
| T2 | T1 | 无污染沙箱秒级派生修复：修复 hatch.sh 与 project-reactor.mjs CLI 参数错位 (--target/--project 兼容) + 支持目标沙箱自动瘦身拷贝与根 node_modules 软链 | scripts/hatch.sh, scripts/project-reactor.mjs | 已完成 |
| T3 | T2 | 代码生成器白标自适应与全栈能力升级：codegen-module.mjs 动态解析 <slug>-server 与真实 Java 包名 + 补齐 AppController (/app-api) + 状态机守卫 + 乐观锁 + convertActions + sub_table | scripts/codegen-module.mjs | 已完成 |
| T4 | T3 | 声明式蓝图引擎全能力对齐：升级 scripts/blueprint-engine.cjs 支持 --preset、doctor 自愈、compile-domain 与 deliver --verify-e2e（自动生成 14 份 SDD 资产 + 全栈模块 + 6 阶段 E2E 测试） | scripts/blueprint-engine.cjs, package.json | 已完成 |
| T5 | T4 | 底座纯净度与门禁守卫加固：gate-check.mjs 与 compat-check.mjs 新增母本 19 原生模块边界守卫与蓝图 BASE_PATH 闭合检查 | scripts/gate-check.mjs, scripts/compat-check.mjs, compat-manifest.json | 已完成 |
| T6 | T5 | 无污染沙箱端到端实测与回归验证：在 /tmp/oa-yudao-sandbox 真跑 hatch -> blueprint deliver --verify-e2e -> 6 阶段 E2E 全绿并清理沙箱 | scripts/tests/blueprint-engine-e2e.test.mjs | 已完成 |

## 4. 依赖说明与波次流转 (Dependencies & Progression)

T1 → T2 → T3 → T4 → T5 → T6

## 5. 阶段状态基线 (Phase Baseline)

* 规划：`PLAN_APPROVED`（由 Spec-Kit 生成）
* 开发：已完成
* 独立测试：已通过
