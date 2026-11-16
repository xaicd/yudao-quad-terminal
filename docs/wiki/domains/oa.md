# 业务域百科：`oa` · 日常办公协同

> **后端模块目录**：`apps/backend/yudao-module-oa` | **Maven Server 构件**：`yudao-module-oa-server`  
> **实测 Java 源码规模**：**477** 个文件 | **强依赖闭包**：`system`, `bpm`

---

## 1. 领域定位与核心能力
企业协同办公：考勤班次打卡、会议室预约、车辆调度、用印申请及与 BPM 引擎联动的行政审批流。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/oa/**`
- **PC 管理端视图目录**：`apps/admin/src/views/oa`
- **代表性物理数据表**：`oa_attendance_group, oa_attendance_record, oa_meeting_room, oa_meeting_booking, oa_car, oa_seal_apply`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 oa 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query oa

# 预览仅保留 oa 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,oa --dry-run
```
