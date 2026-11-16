# 《Yudao Quad-Terminal》开发者与运维操作手册 (User & Operator Manual, `v1.2.0`)

## 一、环境准备与首次启动（零 Docker `lite` 档）

1. **基础环境要求**：JDK 17+、Maven 3.8+、Node.js 20+、`pnpm` 9+。
2. **安装工作区与运行时依赖**：
   ```bash
   pnpm patch:apply
   pnpm install
   pnpm --dir deploy/lite/runtime install
   ```
3. **构建并一键拉起零 Docker 真库环境**：
   ```bash
   pnpm build:backend
   pnpm lite:up        # 自动启动 Embedded PostgreSQL 18.4 + Redis + Spring Boot
   ```
   首次启动终端会输出动态签发的管理员账号口令，后续可在本地 `.commandcode/lite/credentials.env`（`0600`）中查阅。

---

## 二、单一网关四平面访问地址（默认端口 `:48120`，前缀 `/yudao` 或 `/<slug>`）

| 业务平面 | 默认访问路径 | 对应终端或服务 |
| :--- | :--- | :--- |
| **领导驾驶舱** | `http://127.0.0.1:48120/<slug>/cockpit/` | 经营监控全屏大屏视图 |
| **B 端运营中台** | `http://127.0.0.1:48120/<slug>/admin/` | Vue 3 + Element Plus 管理后台 |
| **C 端移动商城** | `http://127.0.0.1:48120/<slug>/2c/` | Uni-App 移动端 H5 前台 |
| **OpenAPI 契约** | `http://127.0.0.1:48120/<slug>/v3/api-docs` | Knife4j / OpenAPI 3.0 实时接口规范 |

---

## 三、常见运维与定制操作

- **派生独立客户新项目**：`pnpm project:hatch /tmp/my-enterprise --title "企业数字化平台" --package com.acme.server`
- **按需裁剪业务模块**：`pnpm trim:modules --profile lite --dry-run`（确认后追加 `--apply --yes`；还原执行 `--recover --yes`）
- **新增业务领域全栈代码**：编写 `<domain>.blueprint.json` 后执行 `pnpm blueprint:doctor -- --file <domain>.blueprint.json --write` 与 `pnpm blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e`
- **回收本地残留进程与重置数据**：`pnpm lite:down`（释放端口进程）· `pnpm lite:clean`（清空本地嵌入式库表数据重新初始化）
