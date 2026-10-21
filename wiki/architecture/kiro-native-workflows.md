# 架构支柱：Kiro SDD 原生多智能体工作流引擎与配方体系

- **核心运行引擎**：
  工作流是把 SDD 规格从静态 Markdown 推向多智能体自动化执行的核心引擎。
- **物理单一真源与软链接桥接**：
  - 单一真源：`.agents/workflows/*.workflow.json`
  - Kiro IDE 需自行建立软链接：`.kiro/workflows -> ../.agents/workflows`（本仓未预置）
- **内置 SDD 配方（自动读取 `.agents/workflows/`）**：
  1. `cmmi-full-lifecycle.workflow.json`：CMMI 01~09 全生命周期多智能体递进式商业软件交付工作流 (G1 需求规格 -> G2 概要架构 -> G3 静态契约 -> G4 全栈验收 -> G5 不可变投产 -> G6 SRE稳定性 -> G7 持续运营)（7 步）
- **统一工作流 CLI 引擎 (`scripts/workflow-engine.cjs`)**：
  - `pnpm workflow:list`：检视配方清单与依赖
  - `pnpm workflow:check`：DAG 有向无环图深度扫描与语法校验
  - `pnpm workflow:dry-run`：模拟展开输出 Mermaid DAG 与角色指令
  - `pnpm workflow:run`：驱动执行脚手架并落盘执行流水
  - `pnpm workflow:new`：脚手架生成新配方模板
