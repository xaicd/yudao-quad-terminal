# 业务域百科：`fms` · 财务核算管理

> **后端模块目录**：`apps/backend/yudao-module-fms` | **Maven Server 构件**：`yudao-module-fms-server`  
> **实测 Java 源码规模**：**290** 个文件 | **强依赖闭包**：`system`, `bpm`

---

## 1. 领域定位与核心能力
企业业财一体财务核算：会计科目、记账凭证、费用报销审批（强依赖 BPM）、发票台账与资金收支对账。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/fms/**`
- **PC 管理端视图目录**：`apps/admin/src/views/fms`
- **代表性物理数据表**：`fms_account, fms_subject, fms_voucher, fms_expense_reimburse, fms_invoice, fms_receivable_bill`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 fms 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query fms

# 预览仅保留 fms 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,fms --dry-run
```
