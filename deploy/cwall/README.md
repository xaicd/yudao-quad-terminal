# 远程算力节点 (`cwall`) 零冲突独立部署套件

本目录提供跨机器部署至高性能算力节点 `cwall` 的标准零冲突运行模板，沉淀自 `tele-pulse` Stage B5 实战经验。

## 核心隔离纪律

1. **只读端口勘探先行**：部署前先通过 `ss -tulpn` 确认 `.env.ports` 中的 `GATEWAY_PORT` / `BACKEND_PORT` / `DB_PORT` / `REDIS_PORT` 未被同机已有业务项目占用，**严禁改动同机共享 Nginx/Caddy 配置或重启其他项目容器**。
2. **强制 `{ admin off }`**：`cwall.caddy.tpl` 顶部固化 `{ admin off }`，避免与宿主机已有 Caddy `:2019` 管理端点碰撞。
3. **双模真实中间件环境变量穿透**：若宿主机具备真实 Apache Doris / RocketMQ / MinIO / XXL-JOB 容器，可直接通过环境变量注入（详见根目录 [`SWARM.md`](../../SWARM.md) 第 5 章 Apache Doris `307 Temporary Redirect` Stream Load 双跳鉴权保活规范）。

## 标准命令（仅限 `pnpm`）

```bash
# 本地完成构建与 G1-G23 门禁
pnpm build:backend
pnpm build:admin
pnpm build:miniapp
pnpm gates:23

# 在远程节点项目根下启动 / 停止 / 验收
bash deploy/cwall/start-cwall.sh
pnpm verify:b5
bash deploy/cwall/stop-cwall.sh
```
