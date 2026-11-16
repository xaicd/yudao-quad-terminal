# 业务域百科：`wms` · 仓储物流管理

> **后端模块目录**：`apps/backend/yudao-module-wms` | **Maven Server 构件**：`yudao-module-wms-server`  
> **实测 Java 源码规模**：**165** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
精细化仓库/库区/库位三级拓扑、入库上架、波次拣货出库、移库盘点与批次库存追踪。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/wms/**`
- **PC 管理端视图目录**：`apps/admin/src/views/wms`
- **代表性物理数据表**：`wms_warehouse, wms_area, wms_location, wms_receipt_order, wms_shipment_order, wms_inventory, wms_check_order`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 wms 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query wms

# 预览仅保留 wms 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,wms --dry-run
```
