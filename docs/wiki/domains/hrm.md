# 业务域百科：`hrm` · 人力资源中枢

> **后端模块目录**：`apps/backend/yudao-module-hrm` | **Maven Server 构件**：`yudao-module-hrm-server`  
> **实测 Java 源码规模**：**634** 个文件 | **强依赖闭包**：`system`, `bpm`

---

## 1. 领域定位与核心能力
人力资源全模块：招聘候选人、员工花名册入转调离、劳动合同、薪资社保核算与绩效考核联动。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/hrm/**`
- **PC 管理端视图目录**：`apps/admin/src/views/hrm`
- **代表性物理数据表**：`hrm_employee, hrm_job_post, hrm_recruit_candidate, hrm_contract, hrm_salary_archive, hrm_performance_plan`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 hrm 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query hrm

# 预览仅保留 hrm 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,hrm --dry-run
```
