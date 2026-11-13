# 原型与交互规范: 河北电信B0-B5全流程守卫、6端口Caddy、SWARM与23门禁反向回灌

> **Spec-Kit UI/UX 文本线框原型与交互状态契约 (UI Prototypes & Interaction States)**
> 上游真源：`brief.json`。线框用纯文本表达，100% 具备机器可读性与 Agent 操作确定性。
> 状态：`PLAN_APPROVED` | 所属领域：`platform` | 规格标识：`tele-pulse-b0-b5-backport`

---

## 1. 主要页面线框视图 (Screen Wireframes)

### 四平面统一网关入口 (:<gatewayPort>/<slug>/{cockpit,admin,2c,admin-api,v3/api-docs})

```
顶层驾驶舱 /cockpit · B端净室工作台 /admin · 移动端 H5 /2c · 加密认证 API /admin-api & /app-api
```

## 2. 交互要点与防误触守卫 (Interaction Guards)

* 登录页通过 data-testid 确定性触发 AES-256-ECB @ApiEncrypt 加密认证；服务控制器通过 health 动词输出机器可读 JSON 供自动化流水线核验

## 3. 状态与空态处理 (States & Degraded UI)

- 加载中：前端路由切换与表格查询展示标准骨架/加载态。
- 空数据：净室门户与业务列表按真实授权与真实库表展示空状态提示。
- 出错：三员越权返回 403、弱口令登录拒绝、未就绪端口 health 返回 status=down 且退出码 1。
- 成功：四平面网关与后端探针全部 200 OK，health 返回 status=ok。
