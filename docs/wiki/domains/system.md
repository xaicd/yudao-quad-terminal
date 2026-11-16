# 业务域百科：`system` · 系统管理中枢

> **后端模块目录**：`apps/backend/yudao-module-system` | **Maven Server 构件**：`yudao-module-system-server`  
> **实测 Java 源码规模**：**462** 个文件 | **强依赖闭包**：无（地基核心模块）

---

## 1. 领域定位与核心能力
多租户隔离（TenantDatabaseInterceptor）、RBAC 菜单与行级数据权限（@DataPermission）、OAuth2 双 Token 鉴权、字典与操作审计底座。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/system/** & /app-api/system/**`
- **PC 管理端视图目录**：`apps/admin/src/views/system`
- **代表性物理数据表**：`system_users, system_role, system_menu, system_dept, system_tenant, system_dict_type, system_operate_log`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 system 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query system

# 预览仅保留 system 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,system --dry-run
```
