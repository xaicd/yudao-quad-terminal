# 《Yudao Quad-Terminal》需求双向跟踪矩阵 (RTM - Requirements Traceability Matrix, `v1.2.0`)

| 需求编号 | 需求摘要 | 关联架构与实现真源 | 关联 REST / CLI 契约 | 自动化验证用例与门禁 | 状态 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-001** | 多企业租户行级隔离 | `docs/03_design/database-design-erd.md` · `yudao-spring-boot-starter-biz-tenant` | `tenant-id` 请求头 · `/admin-api/system/tenant/**` | `mvn test` (`yudao-module-system-server`) | ✅ 已验证 |
| **REQ-002** | CSPRNG 强凭据与加密登录 | `deploy/lite/runtime/{lite-credentials,lite-api-encrypt}.mjs` · `deploy/patches/` | `POST /admin-api/system/auth/login` (`X-Api-Encrypt`) | `scripts/tests/lite-runtime.test.mjs` · `pnpm lite:verify` · `G3`/`G17` | ✅ 已验证 |
| **REQ-003** | 导航菜单 `<= 4` 字与净室清洗 | `scripts/lib/menu-standard.cjs` · `deploy/lite/runtime/lite-pg.mjs` | `system_menu` (`type IN (1,2)`) | `scripts/tests/hatch-and-menu-standard.test.mjs` · `menu-standard` · `G14` | ✅ 已验证 |
| **REQ-004** | `<500 Tokens` 蓝图全栈生成 | `scripts/blueprint-engine.cjs` · `scripts/codegen-module.mjs` | `pnpm blueprint:doctor` · `pnpm blueprint:deliver` | `scripts/tests/hatch-and-menu-standard.test.mjs` · `compat:check` | ✅ 已验证 |
| **REQ-005** | 单端口 `{ admin off }` 四平面网关 | `scripts/generate-gateway-config.mjs` · `deploy/gateway/caddy/yudao.caddy` | `/<slug>/{cockpit,admin,2c,admin-api,v3/api-docs}` | `scripts/harness/hatch-smoke.mjs` · `G10`/`G11` | ✅ 已验证 |
| **REQ-006** | IT 三员分立与防篡改哈希链审计 | `scripts/scaffold-three-role-audit.mjs` · `scripts/lib/three-role-audit.cjs` | `pnpm gen:three-role -- --prefix <p>` | `scripts/tests/hyphen-slug-and-three-role.test.mjs` · `G18` | ✅ 已验证 |
| **REQ-007** | 只读上游子模块契约防漂移基线 | `scripts/check-contracts-drift.mjs` · `scripts/lib/upstream-contract-baseline.json` | `pnpm check:drift` (`/admin-api/**` vs `apps/admin/src/api/**`) | `scripts/tests/contract-drift.test.mjs` · `contract` 门禁 | ✅ 已验证 |
| **REQ-008** | 离线纯净四端骨架打包与发布 | `scripts/build-release-assets.cjs` · `.github/workflows/release.yml` | `pnpm release:package` (`SHA256SUMS.txt`) | `compat:check` · GitHub Release `v1.2.0` | ✅ 已验证 |
