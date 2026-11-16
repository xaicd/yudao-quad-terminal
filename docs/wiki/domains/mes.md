# 业务域百科：`mes` · 制造执行系统

> **后端模块目录**：`apps/backend/yudao-module-mes` | **Maven Server 构件**：`yudao-module-mes-server`  
> **实测 Java 源码规模**：**1153** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
制造执行系统全链路：主数据物料 BOM、生产工单排程、工艺路线报工、IQC/IPQC/OQC 质量检验与设备台账点检。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/mes/**`
- **PC 管理端视图目录**：`apps/admin/src/views/mes`
- **代表性物理数据表**：`mes_md_item, mes_pro_workorder, mes_pro_route, mes_pro_feedback, mes_qc_iqc, mes_qc_ipqc, mes_dv_machinery`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 mes 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query mes

# 预览仅保留 mes 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,mes --dry-run
```
