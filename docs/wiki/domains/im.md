# 业务域百科：`im` · 即时通讯中枢

> **后端模块目录**：`apps/backend/yudao-module-im` | **Maven Server 构件**：`yudao-module-im-server`  
> **实测 Java 源码规模**：**303** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
企业内外部即时通讯：单聊/群聊会话、WebSocket 实时消息推送、已读回执与会话归档审计。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/im/** & /app-api/im/**`
- **PC 管理端视图目录**：`apps/admin/src/views/im`
- **代表性物理数据表**：`im_conversation, im_message, im_group, im_group_member, im_contact`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 im 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query im

# 预览仅保留 im 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,im --dry-run
```
