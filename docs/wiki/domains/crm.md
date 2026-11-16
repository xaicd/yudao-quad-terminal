# 业务域百科：`crm` · 客户关系管理

> **后端模块目录**：`apps/backend/yudao-module-crm` | **Maven Server 构件**：`yudao-module-crm-server`  
> **实测 Java 源码规模**：**288** 个文件 | **强依赖闭包**：`system`（可选联动：`bpm`）

---

## 1. 领域定位与核心能力
线索公海池、客户画像、联系人、商机推进漏斗、合同审批与回款计划，支持团队成员级数据权限协同。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/crm/**`
- **PC 管理端视图目录**：`apps/admin/src/views/crm`
- **代表性物理数据表**：`crm_clue, crm_customer, crm_contact, crm_business, crm_contract, crm_receivable, crm_permission`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 crm 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query crm

# 预览仅保留 crm 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,crm --dry-run
```
