# 原型与交互规范: Yudao 四端蓝图底座与 CoolieBase 全能力对标升级：四端 BasePath 同源、无污染沙箱派生、极简蓝图一键交付与 6 阶段真库 Spec E2E 闭环

> **Spec-Kit UI/UX 文本线框原型与交互状态契约 (UI Prototypes & Interaction States)**
> 上游真源：`brief.json`。线框用纯文本表达，100% 具备机器可读性与 Agent 操作确定性。
> 状态：`PLAN_APPROVED` | 所属领域：`platform` | 规格标识：`yudao-blueprint-engine-parity`

---

## 1. 主要页面线框视图 (Screen Wireframes)

### 四端同源网关入口 (:<gatewayPort>/<slug>/{2c,admin,admin-api,app-api,v3/api-docs})

```
C端 H5 (/<slug>/2c/) · B端 Vue3 中台 (/<slug>/admin/) · 双端 API (/<slug>/admin-api & /<slug>/app-api) · OpenAPI 3.0 (/<slug>/v3/api-docs)
```

## 2. 交互要点与防误触守卫 (Interaction Guards)

* 搜索回车触发分页查询、新增/修改弹窗带表单校验与 {{ $form.xxx }} 响应式联动、状态流转按钮触发状态机守卫、跨表动作按钮一键生成下游单据

## 3. 状态与空态处理 (States & Degraded UI)

- 加载中：表格 v-loading 骨架态。
- 空数据：el-table empty-text 空状态占位。
- 出错：ElMessage.error 提示状态机非法跃迁 (400) 或乐观锁版本冲突 (409)。
- 成功：数据落库并刷新分页列表。
