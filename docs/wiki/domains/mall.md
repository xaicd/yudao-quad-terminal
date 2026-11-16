# 业务域百科：`mall` · 电商零售套件

> **后端模块目录**：`apps/backend/yudao-module-mall` | **Maven Server 构件**：`yudao-module-product-server`, `yudao-module-promotion-server`, `yudao-module-trade-server`, `yudao-module-statistics-server`  
> **实测 Java 源码规模**：**842** 个文件 | **强依赖闭包**：`system`, `member`, `pay`

---

## 1. 领域定位与核心能力
聚合商品中心（product）、营销裂变（promotion：拼团/秒杀/砍价/优惠券/分销）、交易履约（trade）与经营统计（statistics）四大子服务。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/{product,promotion,trade,statistics}/** & /app-api/{product,promotion,trade}/**`
- **PC 管理端视图目录**：`apps/admin/src/views/mall`
- **代表性物理数据表**：`product_spu, product_sku, trade_order, trade_order_item, trade_after_sale, promotion_coupon, promotion_seckill_activity`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 mall 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query mall

# 预览仅保留 mall 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,mall --dry-run
```
