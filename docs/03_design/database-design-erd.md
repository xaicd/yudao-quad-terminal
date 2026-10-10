# 《Yudao Quad-Terminal Master Base》数据库设计报告与物理 ERD 规约

## 一、 基础审计与企业隔离字段
所有业务物理表一律包含以下基础字段：
1. `id`: 统一高熵分布式唯一主键；
2. `company_id`: 企业租户物理隔离标识；
3. `created_at`, `updated_at`: 纳秒/毫秒时间戳；
4. `created_by`, `updated_by`: 变更操作人标识；
5. `is_deleted`: 软删除逻辑标记；
6. `version`: 乐观锁并发版本号。
