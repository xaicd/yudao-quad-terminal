# 架构支柱：双支柱治理 —— Harness 9 阶段生命周期 × Spec-Kit CMMI 00~09

- **支柱一 `harness`（[HARNESS.md](../../../HARNESS.md) + `scripts/harness.cjs`）**：
  - 统一管控 `install -> check -> build -> start -> health -> status -> stop -> e2e -> deliver`（含 `pmo` / `doctor` / `test`）标准运行生命周期，底层对接 `deploy/service.sh` 8 动词服务控制器。
- **支柱二 `speckit`（`scripts/speckit.cjs`）+ CMMI 00~09 扩展（`scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs`）**：
  - 统一管理宏观过程文档（`docs/00_meta_standards/` ~ `docs/09_operations/`）与敏捷特性规格全息包（`docs/specs/<domain>/<name>/` 共 16 份标准资产）；
  - 内置 SDD 多智能体工作流配方（`.agents/workflows/`）：
  1. `cmmi-full-lifecycle.workflow.json`：CMMI 01~09 全生命周期多智能体递进式商业软件交付工作流 (G1 需求规格 -> G2 概要架构 -> G3 静态契约 -> G4 全栈验收 -> G5 不可变投产 -> G6 SRE稳定性 -> G7 持续运营)（7 步）
- **门禁反向控制（`scripts/harness/negative-controls.mjs`）**：
  - `pnpm harness:controls` 对 10 道核心 blocking 门禁逐一执行「基线绿 → 注入违规必须变红 → 字节级还原必须转绿」受控实验，杜绝形同虚设的空壳守卫。
