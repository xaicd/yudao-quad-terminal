# 00 · 规范与元编程（Meta Standards）

> **本目录只放「阶段 00 的工程资产」，不放技能与规则的副本。**
> 依据 `AGENTS.md` Rule 0 第 11 条（单一真源）：技能唯一真源为
> `.agents/skills/<name>/SKILL.md`，规则唯一真源为 `.agents/rules/`，
> 规格模板唯一真源为 `.specify/templates/`。**严禁在此重复建副本**。

## 本阶段的真源在哪

| 资产 | 真源 | 说明 |
|---|---|---|
| Agent 技能（18 个） | `.agents/skills/` + 索引 `.agents/skills/README.md` | 按 CMMI 阶段分布，含新增技能的步骤 |
| 工程铁律与红线 | `AGENTS.md`（Rule 0 十三条）+ `.agents/rules/` | 冲突时以 `AGENTS.md` 为准 |
| 项目宪法 | `.specify/memory/constitution.md` | Spec-Kit 门禁（Gate 1~6） |
| 规格包模板（10 份） | `.specify/templates/` | `speckit build` 用它展开 16 份资产 |
| 多智能体工作流配方 | `.agents/workflows/*.workflow.json` | 由 `workflow-engine.cjs` 驱动 |
| LLM 导航入口 | `wiki/index.md`、`llms.txt` | 进场必读，避免 Token 浪费 |

## 本阶段可执行的入口

```bash
pnpm gate:fast         # 12+ 道门禁（含本阶段相关的一致性检查）
pnpm specs:health      # 规格资产齐备性
pnpm openwiki:check    # wiki 与生成器是否漂移
pnpm cmmi:asset check  # 已脚手架化的过程资产是否有 TODO 残留
```

## 何时在本目录新建资产

只有在需要**交付一份阶段性工程资产**（而非索引）时才在此建文件，例如：
组织级过程改进计划、技能/规则基线的版本快照、元编程（Schema/DSL）规范正文。

> 新增后请用 `pnpm cmmi:asset new --phase 00 --type <type>` 生成标准头部骨架，
> 并保证 `pnpm cmmi:asset check` 通过（无 TODO 残留）。
