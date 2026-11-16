# 业务域百科：`infra` · 基础设施服务

> **后端模块目录**：`apps/backend/yudao-module-infra` | **Maven Server 构件**：`yudao-module-infra-server`  
> **实测 Java 源码规模**：**217** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
动态参数配置、S3/本地文件存储、多数据源管理、API 访问/异常日志、Redis/Druid 监控与 Codegen 元数据管理。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/infra/** & /v3/api-docs`
- **PC 管理端视图目录**：`apps/admin/src/views/infra`
- **代表性物理数据表**：`infra_config, infra_file, infra_data_source_config, infra_api_access_log, infra_api_error_log, infra_codegen_table`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 infra 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query infra

# 预览仅保留 infra 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,infra --dry-run
```
