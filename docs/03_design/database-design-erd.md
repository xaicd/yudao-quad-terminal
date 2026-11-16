# 《Yudao Quad-Terminal》数据库物理模型与多租户 ERD 规约 (`v1.2.0`)

## 一、数据库引擎与官方基线规模

- **零 Docker 标准基线**：Embedded PostgreSQL 18.4（`scripts/lib/ephemeral-pg.cjs` / `deploy/lite/runtime/lite-pg.mjs`），直接加载官方 SQL：
  - `apps/backend/sql/postgresql/ruoyi-vue-pro.sql`：**49 张核心业务与系统物理表**、**48 个自增序列**；
  - `apps/backend/sql/postgresql/quartz.sql`：**11 张分布式调度物理表**（合计 **60 张物理表**）。
- **多方言兼容**：`scripts/codegen-module.mjs` 与 `scripts/blueprint-engine.cjs` 同步输出标准 PostgreSQL 与 MySQL 8.0 双套 DDL。
- **连字符安全命名铁律**：派生项目名含连字符（如 `demo-mall`）时，所有 SQL 表前缀、索引名、序列名与数据库用户名统一使用下划线形态 `snakeSlug`（如 `demo_mall_*`）。

---

## 二、多租户隔离与基础审计底座字段（`TenantBaseDO` / `BaseDO`）

所有新建业务物理表必须包含以下标准底座列：

| 列名 | PostgreSQL 类型 | 约束说明 |
| :--- | :--- | :--- |
| `id` | `BIGINT PRIMARY KEY` | 唯一主键（PostgreSQL 下配合 `@KeySequence` 序列或雪花 ID） |
| `tenant_id` | `BIGINT NOT NULL DEFAULT 0` | 企业租户行级隔离列（由 `TenantDatabaseInterceptor` 自动注入过滤） |
| `creator` | `VARCHAR(64) DEFAULT ''` | 创建人账号或用户 ID |
| `create_time` | `TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP` | 记录创建时间 |
| `updater` | `VARCHAR(64) DEFAULT ''` | 最后更新人标识 |
| `update_time` | `TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP` | 最后更新时间 |
| `deleted` | `SMALLINT NOT NULL DEFAULT 0` | MyBatis-Plus 逻辑软删除标记（`0` 未删 / `1` 已删） |

---

## 三、菜单规范与政企防篡改审计触发器规约

1. **可见菜单四字约束（`system_menu`）**：凡 `type IN (1, 2)` 且 `visible = true` 的目录与页面节点，`char_length(name) <= 4`，完整业务标题写入 `remark` 列。
2. **Append-Only 哈希链审计表（`pnpm gen:three-role`）**：生成的 `<prefix>_sec_audit_log` 表内置 `prev_hash` 与 `curr_hash`（`pgcrypto` SHA-256），由 `BEFORE INSERT` 触发器自动串接哈希链，并由 `BEFORE UPDATE OR DELETE` 触发器在数据库内核层阻断任何篡改与删除操作。
