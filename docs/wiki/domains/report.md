# 业务域百科：`report` · 报表大屏

> **后端模块目录**：`apps/backend/yudao-module-report` | **Maven Server 构件**：`yudao-module-report-server`  
> **实测 Java 源码规模**：**35** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
GoView 可视化大屏工程托管与积木报表（JimuReport）在线配置及权限受控预览。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/report/**`
- **PC 管理端视图目录**：`apps/admin/src/views/report`
- **代表性物理数据表**：`report_goview_project, jimu_report`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 report 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query report

# 预览仅保留 report 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,report --dry-run
```
