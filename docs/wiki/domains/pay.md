# 业务域百科：`pay` · 统一支付中心

> **后端模块目录**：`apps/backend/yudao-module-pay` | **Maven Server 构件**：`yudao-module-pay-server`  
> **实测 Java 源码规模**：**242** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
微信支付 V3、支付宝、会员储值钱包等多渠道收单、退款、转账与异步回调幂等通知引擎。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/pay/** & /app-api/pay/**`
- **PC 管理端视图目录**：`apps/admin/src/views/pay`
- **代表性物理数据表**：`pay_app, pay_channel, pay_order, pay_refund, pay_transfer, pay_wallet, pay_notify_task`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 pay 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query pay

# 预览仅保留 pay 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,pay --dry-run
```
