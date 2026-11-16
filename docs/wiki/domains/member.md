# 业务域百科：`member` · 会员中心

> **后端模块目录**：`apps/backend/yudao-module-member` | **Maven Server 构件**：`yudao-module-member-server`  
> **实测 Java 源码规模**：**190** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
C 端会员全生命周期（微信小程序静默登录、手机验证码/密码登录、等级成长值、积分签到与收货地址）。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/member/** & /app-api/member/**`
- **PC 管理端视图目录**：`apps/admin/src/views/member`
- **代表性物理数据表**：`member_user, member_level, member_tag, member_group, member_point_record, member_sign_in_record, member_address`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 member 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query member

# 预览仅保留 member 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,member --dry-run
```
