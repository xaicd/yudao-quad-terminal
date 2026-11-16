# 业务域百科：`bpm` · 工作流引擎

> **后端模块目录**：`apps/backend/yudao-module-bpm` | **Maven Server 构件**：`yudao-module-bpm-server`  
> **实测 Java 源码规模**：**264** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
基于 Flowable 的 BPMN 2.0 / 钉钉风格流程设计器、动态表单、会签/或签/委派/回退及 OA/HRM/FMS 跨模块审批编排。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/bpm/**`
- **PC 管理端视图目录**：`apps/admin/src/views/bpm`
- **代表性物理数据表**：`bpm_process_definition_info, bpm_form, bpm_user_group, bpm_process_instance_copy, bpm_category`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 bpm 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query bpm

# 预览仅保留 bpm 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,bpm --dry-run
```
