# 04 · 编码实现与防假（Implementation）

> 本目录收纳**实现阶段的工程资产**：编码规范、生成器产出说明、契约同步与运行档。
> 业务规格正文不放这里 —— 它们在 `docs/specs/<domain>/<name>/`（Rule 11）。

## 实现阶段的真源

| 关注点 | 真源 |
|---|---|
| 后端编码规范（六层解耦 / 租户 / 数据权限 / `@KeySequence`） | `.agents/skills/yudao-backend-dev/SKILL.md` |
| PC 运营中台研发（Vue3 + Element Plus + Pinia / `useCrudSchemas`） | `.agents/skills/yudao-admin-vue3/SKILL.md` |
| 微信小程序研发（Uni-App / 静默登录 / 分包） | `.agents/skills/yudao-miniapp-dev/SKILL.md` |
| Expo 原生端研发与 OTA | `.agents/skills/yudao-expo-app/SKILL.md` |
| OpenAPI → TS SDK 契约转译与防漂移 | `.agents/skills/yudao-contract-sync/SKILL.md` |
| 本地运行档（lite 零 Docker / local 容器） | `.agents/skills/yudao-local-stack/SKILL.md` + `deploy/lite/README.md` |
| Agent 可编排端点（MCP） | `.agents/skills/yudao-mcp-server/SKILL.md` |
| 模块裁剪（19 模块 + 依赖闭包） | `scripts/lib/module-catalog.mjs`（唯一真源） |

## 实现阶段的硬约束（违反即返工）

1. **禁止人肉样板**：CRUD 一律 `pnpm gen:module` 展开，不逐行手写。
2. **禁止假 Mock**：测试必须由真实数据库驱动（lite 档的嵌入式真 PG）或真实状态机断言。
3. **子模块只读**：`apps/{backend,admin,miniapp}` 是第三方 submodule，实现差异只能落主仓。
4. **pnpm 唯一**：包管理与任务入口都走 pnpm（门禁 `pkg-manager` 拦截）。
5. **契约先行**：接口改动先改后端并同步 `pnpm gen:api-sdk`，再用 `pnpm check:drift` 对账。

## 本阶段的常用入口

```bash
pnpm gen:module                       # 全栈样板代码生成
pnpm gen:api-sdk                      # 契约 → TS SDK
pnpm check:drift                      # 前后端路由对账（advisory）
pnpm trim:modules --profile lite --dry-run   # 模块裁剪预览
pnpm lite:up                          # 零 Docker 起后端（真 PG + 真 Redis）
pnpm build:backend                    # 两步 Maven 构建（已验证）
```

## 子模块差异如何落主仓（方案 B）

`apps/{backend,admin}` 是第三方只读子模块。**代码级差异不得提交在子模块里**：那会把主仓 gitlink 钉到远端不存在的提交，别人 `git clone --recursive` 直接失败。

```bash
pnpm patch:status   # 看差异现状
pnpm patch:apply    # 幂等注入（lite:up 与 lifecycle build 自动调用）
pnpm patch:check    # 门禁：子模块改动必须恰好等于 deploy/patches 声明的补丁
```

真源：`deploy/patches/<submodule>/*.patch` + `deploy/patches/README.md`；逻辑：`scripts/submodule-patches.mjs`。

## 现存缺口（如实登记）

- **后端单测已实测可跑并纳入 `gate:full`**：`mvn -B test -pl yudao-server -am` → BUILD SUCCESS / 约 72s，
  仅 `yudao-server` 自身无测试（它是装配层），用例集中在 `yudao-module-system-server` 与 `yudao-module-infra-server`。
  未纳入 `gate:fast` 的原因只是耗时，不是不可用。
- 自有脚本 **62 个单测**（`pnpm test:scripts`）是 `gate:fast` 的 blocking 项。
- **前端构建已打通并纳入 `gate:full`**：`pnpm build:admin` 实测 `✓ built in 23.56s`（`apps/admin/dist` 24.6MB）。
  子模块 `apps/admin` 已 rebase 到上游 `master` + 重放本仓 ApiEncrypt 提交（pin `36ede93e9`），
  上游缺失的 `src/views/oa/utils/*` 已到位；构建走 `scripts/build-admin.mjs` 以绕过 hoisted linker 的路径陷阱。
- JDK 变体可执行性由 `jdk-variants` 门禁保证：变体 ref 必须可解析，且**其 pom 实测 java/boot 必须与声明一致**；
  `pnpm jdk:list` 查最新 ref，`pnpm jdk:use <id>` 切换（真源 `scripts/lib/jdk-variants.mjs`）。
- `apps/admin` 的 `ts:check` 需要其子模块自装依赖（且 `NODE_ENV` 不能是 production），未纳入本仓门禁。
- 契约漂移 27 条来自上游（`/infra/job*` 等），详见 `AGENTS.md §0.4`。
