# 架构支柱：声明式蓝图引擎、代码生成与 19 模块闭包裁剪

- **`<500 Tokens` 蓝图全栈引擎（`scripts/blueprint-engine.cjs` & `scripts/codegen-module.cjs`）**：
  - `pnpm blueprint:doctor -- --file <domain>.blueprint.json --write` 自动诊断并收敛超 4 字导航菜单名、补齐权限码与状态机约定（完整业务标题保留于 `remark` 与 OpenAPI `@Tag`）；
  - `pnpm blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e` 一键展开 16 份 Spec-Kit 规格文档、Java 6 层代码（DO / Mapper / Service / Convert / Admin+App Controller / VO）、Vue 3 管理页、TS SDK 与 MySQL/PostgreSQL 双库 DDL，并联动真 PG 18.4 执行 6 阶段验收。
- **19 业务模块依赖闭包裁剪（`scripts/trim-modules.mjs`）**：
  - 元数据唯一真源 `scripts/lib/module-catalog.mjs` 实测登记全后端 7347 个 Java 文件，内置 `mini`（2 模块）、`lite`（5 模块）、`full`（19 模块）三档预设；
  - 自动计算强依赖闭包（如保留 `mall` 自动补齐 `system + member + pay`，保留 `oa/hrm/fms` 自动补齐 `bpm`），支持 `--dry-run` 预览、`--check` 漂移校验与 `--recover` 无损还原。
