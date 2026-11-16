# 架构支柱：活体业务本体、OpenAPI 强类型 SDK 与契约基线防漂移

> **关联真源**：[AGENTS.md](../../../AGENTS.md) · [docs/ontology/ontology.yaml](../../ontology/ontology.yaml) · [docs/ontology/domain.yaml](../../ontology/domain.yaml) · [docs/ontology/copilot.yaml](../../ontology/copilot.yaml)

- **活体业务本体三件套（`docs/ontology/`）**：
  - `ontology.yaml`：定义核心实体（Objects）、受控行为动词（Actions）、多租户与审计底线不变量（Invariants）、角色矩阵与状态流转；
  - `domain.yaml`：映射全部 20 大业务域的后端包路径、管理端视图目录、模块依赖与核心物理表；
  - `copilot.yaml`：约束只读 AI 数据探查沙箱（仅允许携带 `tenant_id` 隔离的 `SELECT` / `WITH` 查询，硬限返回行数）。
- **跨端契约同步与只读上游漂移基线（`scripts/check-contracts-drift.mjs`）**：
  - 后端 Controller 变更后执行 `pnpm gen:api-sdk` 从 `/v3/api-docs` 直出强类型客户端；
  - `scripts/lib/upstream-contract-baseline.json` 对只读上游子模块固有的 92 条未暴露孤儿路由建立精确基线，任何新增未授权孤儿或 HTTP 动词不匹配立即触发门禁阻断。
