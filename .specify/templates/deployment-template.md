# Deployment & Network Infrastructure (G5): {{TITLE}}

> **Spec-Kit 基础设施与网络策略矩阵 (Deployment & Network Policy Document)**
> 对应项目宪法：`.specify/memory/constitution.md` (Gate 5 上线前实施割接)

---

## 1. 端口与通信策略矩阵 (Port Matrix)

| 源域 | 目的域 | 端口/协议 | 业务用途 | 安全审批状态 |
|---|---|---|---|---|
| DMZ 外部网络 | Caddy 边缘网关 | 443/tcp (入) | 对外 HTTPS 统一入口，由 `scripts/deploy-caddy.sh` 热加载站点配置 | 生产基准在位 |
| Caddy 边缘网关 | yudao-server | 48080/tcp | Spring Boot 单体 / 微服务 RESTful API 与 Knife4j 文档 | 生产基准在位 |
| yudao-server | MySQL 持久化域 | 33066/tcp | 业务数据持久化 (本机 `docker-compose.local.yml`) | 生产基准在位 |
| yudao-server | Redis 缓存与消息域 | 63799/tcp | 缓存、分布式锁与 Redis Stream 事件分发 | 生产基准在位 |
| Admin 静态产物 | 浏览器 | 443/5173/tcp | Vue3 运营中台静态资源（生产由 Caddy 托管，开发走 Vite） | 生产基准在位 |
| 运维安全域 | 生产宿主机 | 22/tcp (跳板) | 4A 堡垒机纳管与不可变审计接入 | 生产基准在位 |

## 2. 网络域拓扑与多租户隔离说明
1. **DMZ 边界隔离**：仅暴露 443 入口，所有请求由 Caddy 边缘网关鉴权拦截并注入 `TraceId`；
2. **应用隔离**：单体档仅监听 48080，微服务档各 `*-server` 独立进程隔离运行，禁止内网服务向公网开放监听；
3. **数据隔离**：持久化数据层由 MyBatis-Plus 租户插件强制注入行级 `tenant_id` 过滤，备份副本严格只读；
4. **运维加固**：生产全量操作严格记录 Audit Log，严禁无工单直接连接生产数据库。
