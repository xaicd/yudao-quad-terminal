# 《Yudao Quad-Terminal》站点可靠性保障基线与 SLO/SLI 错误预算矩阵 (`v1.2.0`)

> **CMMI 门禁**: G6 站点可靠性保障门禁  
> **巡检与探活入口**: `pnpm service:health` · `pnpm smoke:login` · `node scripts/cmmi-08-sre.cjs health`  

---

## 一、核心服务等级指标与目标矩阵（SLI / SLO Matrix）

| 指标维度 | SLI 度量定义 | SLO 目标阈值 | 月度错误预算（30天） | 告警与处置动作 |
| :--- | :--- | :--- | :--- | :--- |
| **服务可用率 (Availability)** | 网关 `/admin-api/**` 与 `/app-api/**` 非 `5xx` 成功响应占比 | `>= 99.95%` | `21.6 分钟` | 1h 燃烧率 `> 14.4x` 立即冻结非紧急变更并触发回滚评估 |
| **核心读写延迟 (Latency)** | 登录、菜单权限与核心分页接口服务端处理耗时 | `P95 < 100ms` / `P99 < 200ms` | 超标请求占比 `< 0.1%` | 排查 Druid 慢 SQL 日志与 Redis 命中率 |
| **认证链路健康度 (Auth Probe)** | `pnpm smoke:login` AES-256-ECB 加密登录与 Token 签发成功率 | `= 100%`（连续 3 次探测全通） | `0` 次连续认证中断 | 检查 PostgreSQL 连接池与 Redis 会话存活 |
| **网关四平面连通性** | `/<slug>/{cockpit,admin,2c,v3/api-docs}` 拨测 HTTP 200 | `= 100%` | `0` 平面黑屏或 502 | 运行 `./deploy/service.sh restart` 并核查静态构建产物 |

---

## 二、多机物理拓扑与运维红线

- **活跃运行拓扑**：本地开发与移动真机验证节点（`mac`）、重型构建与独立集成测试节点（`cwall`）、生产服务节点（`tc-coolie-claw`）；已退役历史节点（~~`aja-pc`~~）严禁配置任何监控探针或发布任务。
- **端口与网关隔离纪律**：多项目并存部署时必须加载各自 `.env.ports` 并启用 Caddy `{ admin off }`，严禁修改宿主机共享全局网关配置或误杀邻居实例数据库进程（由 `scripts/tests/lite-runtime.test.mjs` 进程分类器测试守护）。
