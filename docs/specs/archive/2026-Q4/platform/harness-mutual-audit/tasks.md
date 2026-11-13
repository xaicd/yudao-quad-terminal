# Tasks Breakdown & WBS: 跨底座 Harness 交付闭环十维双向互审与自画像基线沉淀

> **Spec-Kit 任务拆解与工单跟踪矩阵 (WBS & Task Dependency Plan)**
> 上游真源：`plan.md`。必须严格贯彻 **1 Task = 1 Commit** 铁律，Commit 消息必须包含 `[T<ID>]`。
> 状态：`COMPLETED` | 所属领域：`platform` | 规格标识：`harness-mutual-audit`
> 对应项目宪法：`.specify/memory/constitution.md` (Gate 3 任务原子性 / Gate 4 真实入库测试)

---

## 1. 任务依赖波次图 (Task Dependency Waves)

```json
{
  "waves": [
    {
      "id": "wave-1",
      "title": "自画像客观勘察",
      "tasks": ["T1"],
      "dependsOn": []
    },
    {
      "id": "wave-2",
      "title": "十维双向互审对照",
      "tasks": ["T2"],
      "dependsOn": ["wave-1"]
    },
    {
      "id": "wave-3",
      "title": "16件套资产收口归档",
      "tasks": ["T3"],
      "dependsOn": ["wave-2"]
    }
  ]
}
```

## 2. 交互式任务清单 (Interactive Execution Tasks)

- [x] **T1**: 完成 Yudao-Quad-Terminal 12 节客观事实自画像勘察 (`self-portrait.md`)
  - 归属: `main`
  - 文件白名单: `HARNESS.md, compat-manifest.json`
  - 验收证据: `self-portrait.md` 已完整记录五大入口与 L0~L7 验证层事实

- [x] **T2**: 制定十维双向互审对照基线与取长补短演进清单
  - 归属: `T1`
  - 文件白名单: `AGENTS.md, scripts/harness.cjs`
  - 验收证据: 双支柱治理矩阵 (`HARNESS.md` + CMMI 00~09) 已全面落地

- [x] **T3**: 补齐 16 件套标准规格资产、核销验证证据并完成 CMMI-09 归档
  - 归属: `T2`
  - 文件白名单: `scripts/specs-health.mjs`
  - 验收证据: `pnpm specs:health` 100% 绿灯并归档至 `docs/specs/archive/`

## 3. CMMI 双向追溯与 Git 提交核实矩阵 (RTM & Git Trace)

| ID | 归属 | 任务 | 文件白名单 | 状态 |
|---|---|---|---|---|
| T1 | main | 完成 Yudao-Quad-Terminal 12 节客观事实自画像勘察 (self-portrait.md) | HARNESS.md, compat-manifest.json | 已完成 |
| T2 | T1 | 制定十维双向互审对照基线与取长补短演进清单 | AGENTS.md, scripts/harness.cjs | 已完成 |
| T3 | T2 | 补齐 16 件套标准规格资产、核销验证证据并完成 CMMI-09 归档 | scripts/specs-health.mjs | 已完成 |

## 4. 依赖说明与波次流转 (Dependencies & Progression)

T1 → T2 → T3

## 5. 阶段状态基线 (Phase Baseline)

* 规划：`PLAN_APPROVED`（由 Spec-Kit 生成）
* 开发：已完成
* 独立测试：已通过
