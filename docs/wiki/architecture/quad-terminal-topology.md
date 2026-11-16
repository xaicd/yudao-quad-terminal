# 架构支柱：四位一体多端同源拓扑与四平面 Caddy 网关

- **四大交付终端与共享包（PNPM Monorepo + Maven）**：
  1. `apps/backend`：Java 17 + Spring Boot 3.5.15 + MyBatis-Plus 后端服务（默认监听 `:48080`，兼容单体与微服务双形态）；
  2. `apps/admin`：Vue 3.4 + Vite + Element Plus + Pinia PC 运营管理中台（挂载 `/<slug>/admin/`）；
  3. `apps/miniapp`：Uni-App + Vue 3 微信小程序与移动端商城 H5（挂载 `/<slug>/2c/`）；
  4. `apps/app`：Expo SDK 52 + React Native 0.76 原生双端客户端（硬件级 `SecureStore` 与 OTA 热更新）；
  5. `packages/api-client` & `packages/shared-types`：OpenAPI 3 直出强类型 TS SDK 与跨端共享 DTO。
- **单一端口四平面同源网关（`scripts/generate-gateway-config.mjs`）**：
  - 自动生成 `deploy/gateway/caddy/<slug>.caddy`（强制顶部 `{ admin off }` 规避 `:2019` 端口冲突，母本默认采用 `{$CADDY_HOST_ROOT:.}` 零宿主机绝对路径泄漏）与 `deploy/gateway/nginx/<slug>.conf`；
  - 单一入口 `:48120` 同源承载 `/<slug>/cockpit/`、`/<slug>/admin/`、`/<slug>/2c/`、`/<slug>/{admin-api,app-api,open-api}/`（`uri strip_prefix /<slug>`）以及 `/<slug>/v3/api-docs` 契约平面。
