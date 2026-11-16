# 业务域百科：`online` · 声明式蓝图与在线低代码生成引擎

> **核心引擎真源**：`scripts/blueprint-engine.cjs` · `scripts/codegen-module.cjs` · `apps/backend/yudao-module-infra` (`codegen`)  
> **跨底座对齐**：与 `cooliebase-all v1.5.0` 的 `plugin-online` / `blueprint:deliver` 保持 100% 同名同参命令契约

---

## 1. 领域定位与核心能力
提供「声明式 JSON 蓝图 + 在线元数据代码生成」双轮驱动能力：AI 数字员工只需编写 `<500 Tokens` 的 `<domain>.blueprint.json`，即可自动完成 `<= 4` 字导航菜单自愈、16 份 Spec-Kit 规格文档展开、Java 6 层后端代码、Vue 3 管理后台视图、强类型 TS SDK、PostgreSQL/MySQL 双库 DDL 生成及真库 E2E 闭环验证。

---

## 2. 核心入口与物理映射
- **蓝图母版契约**：`blueprint.template.json`（`schemaVersion: "2.1.0"`）
- **在线表结构元数据**：`infra_codegen_table`、`infra_codegen_column`（位于 `yudao-module-infra`）
- **管理端代码生成视图**：`apps/admin/src/views/infra/codegen`

---

## 3. 标准低代码交付流水线
```bash
# 1. 渲染行业/领域蓝图骨架并执行 4 字菜单与字段类型自愈
pnpm blueprint:render -- --name "系统名称" --domain supply --entities "order:采购单" --out supply.blueprint.json
pnpm blueprint:doctor -- --file supply.blueprint.json --write

# 2. 一键展开 Spec + 四端全栈代码 + 嵌入式真 PostgreSQL 18.4 验收
pnpm blueprint:deliver -- --file supply.blueprint.json --verify-e2e
```
