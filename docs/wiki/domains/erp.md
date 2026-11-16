# 业务域百科：`erp` · 企业进销存

> **后端模块目录**：`apps/backend/yudao-module-erp` | **Maven Server 构件**：`yudao-module-erp-server`  
> **实测 Java 源码规模**：**221** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
采购申请/订单/入库、销售订单/出库、多仓库存台账调拨及供应商/客户往来应收应付结算。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/erp/**`
- **PC 管理端视图目录**：`apps/admin/src/views/erp`
- **代表性物理数据表**：`erp_product, erp_purchase_order, erp_purchase_in, erp_sale_order, erp_sale_out, erp_stock, erp_finance_payment`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 erp 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query erp

# 预览仅保留 erp 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,erp --dry-run
```
