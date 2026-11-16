# 业务域百科：`mp` · 微信公众号平台

> **后端模块目录**：`apps/backend/yudao-module-mp` | **Maven Server 构件**：`yudao-module-mp-server`  
> **实测 Java 源码规模**：**129** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
微信公众号多账号托管、粉丝标签管理、自定义菜单发布、素材库同步与关键词自动回复。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/mp/**`
- **PC 管理端视图目录**：`apps/admin/src/views/mp`
- **代表性物理数据表**：`mp_account, mp_user, mp_tag, mp_menu, mp_message, mp_auto_reply, mp_material`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 mp 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query mp

# 预览仅保留 mp 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,mp --dry-run
```
