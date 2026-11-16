# 业务域百科：`pms` · 项目协同管理

> **后端模块目录**：`apps/backend/yudao-module-pms` | **Maven Server 构件**：`yudao-module-pms-server`  
> **实测 Java 源码规模**：**316** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
项目集与研发协同管理：项目立项、里程碑计划、WBS 任务看板、工时填报与迭代交付追踪。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/pms/**`
- **PC 管理端视图目录**：`apps/admin/src/views/pms`
- **代表性物理数据表**：`pms_project, pms_milestone, pms_task, pms_work_log, pms_iteration, pms_member`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 pms 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query pms

# 预览仅保留 pms 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,pms --dry-run
```
