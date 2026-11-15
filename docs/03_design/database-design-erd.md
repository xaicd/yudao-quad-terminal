# 《Yudao Quad-Terminal Master Base》数据库设计报告与物理 ERD 规约

## 一、 基础审计与多租户隔离字段
所有业务物理表统一继承 `TenantBaseDO` / `BaseDO`，包含以下标准字段：
1. `id`: 统一分布式唯一主键；
2. `tenant_id`: 企业租户物理隔离标识；
3. `create_time`, `update_time`: 创建与更新时间戳；
4. `creator`, `updater`: 变更操作人标识；
5. `deleted`: 逻辑软删除标记（`0` 未删除 / `1` 已删除）；
6. `version`: 乐观锁并发版本号（涉及资金/库存/状态流转表必配）。
