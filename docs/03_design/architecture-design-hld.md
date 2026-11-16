# 《Yudao Quad-Terminal》系统概要设计说明书 (HLD) 与 DAR 技术选型决策表 (`v1.2.0`)

> **CMMI 门禁**: G2 架构与设计基线门禁  
> **适用版本**: `v1.2.0` (`2026-11-16`)  

---

## 一、四位一体同源系统拓扑

1. **统一网关接入层（`deploy/gateway/caddy/` & `deploy/gateway/nginx/`，默认 `:48120`）**：
   - 采用声明式 `{ admin off }` Caddyfile 配置，以单一 `BASE_PATH`（默认 `/yudao`，派生项目为 `/<slug>`）同源分发四大平面：
     - `/<slug>/cockpit/*`：领导驾驶舱全屏数据监控平面；
     - `/<slug>/admin/*`：Vue 3 + Vite + Element Plus B 端运营管理中台；
     - `/<slug>/2c/*`：Uni-App + Vue 3 移动端商城与掌上业务 H5；
     - `/<slug>/{admin-api,app-api,open-api}/*` 及 `/<slug>/v3/api-docs`：`uri strip_prefix /<slug>` 反向代理至后端 `:48080` 并透传 `tenant-id`。
2. **跨端契约共享层（`packages/`）**：
   - `packages/api-client`：基于后端 Knife4j `/v3/api-docs` OpenAPI 3 规范自动生成强类型请求客户端；
   - `packages/shared-types`：承载跨端通用枚举、`CommonResult<T>` 与分页契约。
3. **业务领域服务层（`apps/backend`，Java 17 + Spring Boot 3.5.15）**：
   - 遵循 Controller → VO/Convert → Service → Mapper → DO 标准六层解耦架构；
   - 内置 19 个官方业务模块（`scripts/lib/module-catalog.mjs`），支持按 `mini`（2 模块）、`lite`（5 模块）、`full`（19 模块）或自定义集合执行依赖闭包裁剪（`pnpm trim:modules`）。
4. **数据与缓存基础设施层（`deploy/lite/` & `docker-compose.local.yml`）**：
   - 本地零 Docker `lite` 档：进程内 **Embedded PostgreSQL 18.4**（`:55432`）+ **Embedded Redis**（`:63799`）；
   - 生产与容器档：支持 PostgreSQL / MySQL 8.0 主从数据源、Redis 集群以及可选真实中间件（Apache Doris、RocketMQ、MinIO）。

---

## 二、DAR（Decision Analysis & Resolution）架构选型决策矩阵

| 候选架构方案 | 多端同源复用度 (30%) | 零容器交付速度 (25%) | 上游跟进可维护性 (25%) | 企业安全与多租户完备度 (20%) | 加权总分 | 选型决议 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **方案 A：只读上游子模块 + `deploy/patches/` 补丁 + 嵌入式真 PG/Redis 四端底座** | 94 (28.2) | 96 (24.0) | 92 (23.0) | 95 (19.0) | **94.2** | **采纳为 `v1.2.0` 标准架构** |
| **方案 B：直接 Fork 拷贝并混改子模块代码 + 强依赖外部 Docker Desktop** | 85 (25.5) | 60 (15.0) | 45 (11.3) | 88 (17.6) | 69.4 | 淘汰（升级冲突高、无 Docker 环境不可跑） |
| **方案 C：从零手写多端前后端与基础 RBAC 框架（阴性对照）** | 40 (12.0) | 50 (12.5) | 70 (17.5) | 60 (12.0) | 54.0 | 淘汰（研发周期长、重复造轮子） |
