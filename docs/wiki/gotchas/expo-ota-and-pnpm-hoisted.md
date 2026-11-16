# 避坑实录：Expo SDK 52 OTA 版本对齐与 PNPM Hoisted 构建解析

1. **PNPM Hoisted 布局下的前端构建**：仓库根 `.npmrc` 采用 `node-linker=hoisted`，可执行入口位于根 `node_modules/.bin`。管理端构建请统一使用 `pnpm build:admin`（`scripts/build-admin.mjs` 自动解析真实 `vite` 入口）；注意安装开发依赖时 `NODE_ENV` 不得为 `production`。
2. **全仓版本与 OTA 一致性**：发版时根 `package.json`、`compat-manifest.json`（`templateVersion`）、`apps/app/{package.json,app.json}`、`packages/*`、`docs/ontology/*.yaml` 与 `docs/07_release/*` 必须同步对齐同一语义化版本号（当前 `1.2.0`）。
