# Yudao-Quad-Terminal — Harness 自画像 (Self-Portrait)

> **立场**: 只写事实(带路径), 不评价好坏。作为 harness-mutual-audit 10 维审计的事实底座。
> **勘察**: 2026-10-23, 由 wenlv-next 侧 Claude 会话只读勘察。

## 1. 项目身份

- **定位**: 四端一体**可派生底座** — Java 微服务 (`apps/backend`, Spring Boot 3 / JDK 17) + Vue3 中台 (`apps/admin`) + Uni-App 小程序 (`apps/miniapp`, HBuilderX 工程) + Expo 原生端 (`apps/app`, SDK 52 / RN 0.76)。monorepo: pnpm workspace, `apps/` + `packages/{api-client,shared-types,...}`。
- **模板版本**: `templateVersion 1.2.0` (`compat-manifest.json`), 与派生项目自身 version 无关。
- **消费方式 4 类** (`HARNESS.md §3`): 派生新项目 / 克隆协作 / 多项目同机托管 / AI Agent 接入。

## 2. 五个核心入口

| 文件 | 体积 | 角色 |
|---|---|---|
| `HARNESS.md` | 5.4KB | 一图总览: 交付物 + 消费契约 + 验证矩阵 |
| `AGENTS.md` | 16.5KB | 宪法: 13 条铁律 + 能力速查 + 已知红灯 (唯一真源) |
| `compat-manifest.json` | 4.7KB | **机器可读下游消费契约**, `pnpm compat:check` 强校验 |
| `llms.txt` | 8.9KB | 高密度能力契约 (LLM 首选入口) |
| `wiki/index.md` | 8.6KB | OpenWiki 全息导航 (architecture/domains/gotchas/stages 四类词条) |

## 3. 验证矩阵 (L0-L7, 8 层自证)

`HARNESS.md §4`, 全部有实测数字:

| 层 | 命令 | 证明什么 |
|---|---|---|
| L0 契约 | `pnpm compat:check` (`scripts/compat-check.mjs`) | 入口/端口/路径/子模块指针与实现逐条一致 |
| L1 静态守卫 | `pnpm gate:fast` (`scripts/gate-check.mjs`) | 16 项 blocking/advisory 门禁, 秒级 |
| L2 单元测试 | `pnpm test:scripts` | 78 个 node:test 用例 (裁剪/规格/凭据/加解密/JDK 变体/子模块补丁/harness 不变式) |
| L3 端到端 | `pnpm lite:verify` (`scripts/lite-up.mjs --verify`) | 嵌入式真 PG + 真 Redis + 真登录 (含 ApiEncrypt 加密登录连续 3 次), ~20s |
| L4 构建 | `pnpm build:backend` / `build:admin` | 189MB jar / 24.6MB dist |
| L5 全量 | `pnpm gate:full` | 19 项 (~2min) |
| **L6 反向控制** | `pnpm harness:controls` (`scripts/harness/negative-controls.mjs`) | **证明门禁真的会红**: 注入违规→必失败→复原→必绿, 9/9 |
| **L7 派生金路径** | `pnpm harness:hatch` (`scripts/hatch.sh` + `hatch-smoke.mjs`) | 临时目录真跑派生 + 断言 13 项 (凭据零泄漏/身份替换/包迁移/旧品牌清零/自跑门禁), 11s / 12986 文件 |

L6 明文对齐家族标准: "配置合法 ≠ 生效, 门禁存在 ≠ 会咬人" (与 cooliebase-all `harness-health` / wenlv-next `*-negative-control` 互认)。

## 4. 底座级不变式 (5 条红灯线, `HARNESS.md §5`)

1. 子模块只读, 差异只落 `deploy/patches/*.patch` (`scripts/submodule-patches.mjs` 双重把关)
2. pnpm 唯一 (pkg-manager 门禁禁上游四类操作)
3. 声明必须可执行 (doc-commands / script-targets / jdk-variants 门禁校验文档命令与 git ref 真实存在)
4. 无弱默认凭据 (CSPRNG 生成 + 0600 文件, lite 门禁反证 admin/admin123 必拒)
5. 测试不得空洞 (断言非空/真实入库, 禁假 Mock)

## 5. Skills (19 个, `.agents/skills/`)

两族:
- **yudao-* 专属族** (11): yudao-admin-vue3 / yudao-backend-dev / yudao-cloud-bootstrap / yudao-cmmi-gatekeeper / yudao-contract-sync / yudao-expo-app / yudao-local-stack / yudao-mcp-server / yudao-miniapp-dev 等
- **通用工程族** (8): archify (可机器验证架构图) / cmmi-asset-authoring / dar-decision-matrix / ears-spec-writer (IEEE 29148) / financial-reconciliation-agent / mutation-tester / postmortem-analyzer / sre-slo-manager / strix-penetration-testing

## 6. Rules (6) / Commands (9) / Workflows (1)

- `.agents/rules/`: FEATURE-SPEC-AND-PROTOTYPE-STANDARD / HIGH-ORDER-INVERSE-THINKING / MULTI-TENANT-ISOLATION / PROJECT-INIT-AND-REFACTOR / RULE-0-UNIVERSAL-DIRECTIVES / SPEC-FIRST-ENGINEERING-ARTIFACTS
- `.agents/commands/`: speckit.* 9 个斜杠命令 (specify/plan/tasks/implement/check/gate/checklist/eval/archive/constitution)
- `.agents/workflows/cmmi-full-lifecycle.workflow.json` + `scripts/workflow-engine.cjs` (workflow:new/run/advance/check/dry-run)

## 7. 脚本家族 (scripts/, 30+)

- **门禁**: gate-check.mjs (21.6KB) / negative-controls.mjs / specs-health.mjs
- **契约**: compat-check.mjs / check-contracts-drift.mjs (跨端契约防漂移)
- **环境**: lite-up.mjs (28.2KB, 嵌入式 PG+Redis 零 Docker) / lite-down / start-local-stack.sh / smoke-login.mjs
- **派生**: hatch.sh / project-reactor.mjs (改名+包迁移+脱敏) / hatch-smoke.mjs / run-all.cjs (多项目同机)
- **裁剪/生成**: trim-modules.mjs (26.3KB) / codegen-module.mjs (29.8KB) / jdk-variants.mjs
- **知识**: sync-openwiki.mjs (38.3KB, openwiki:sync/--check 双态) / agent-context-compressor.mjs (ctx:snapshot/query)
- **规格**: speckit.cjs (35.5KB) / cmmi-asset-scaffold.cjs / socratic-inquiry-engine.cjs
- **部署**: deploy-caddy.sh / lifecycle.sh (install/test/build/start)
- **MCP**: mcp/yudao-mcp-server.cjs + 根 `.mcp.json` (8 工具, 模块裁剪/契约/验收可无头编排)

## 8. 测试体系

- L2 node:test 78 用例 (scripts/tests/); L3 lite:verify 真 PG/Redis/登录; L4 真实构建产物断言。
- 前端 `pnpm -r run typecheck`; 跨端契约 `check:drift` (OpenAPI → TS 类型防漂移, gen:api-sdk)。

## 9. 调度/自治

- 未见 cron/CI 定时巡检登记 (调度自治维待审)。
- 自治形态偏"按需门禁 + 反向控制", 非定时运营。

## 10. 部署

- `deploy/caddy/` (反向代理配置) + `deploy/lite/` + `deploy/patches/` (admin/backend 补丁)。
- 多项目同机: 按项目名动态生成 `/&lt;slug&gt;/admin-api` 前缀与端口偏移 (`run-all.cjs`)。
- 上游同步: `sync-upstream.sh` + `git submodule status`。

## 11. 知识进化

- OpenWiki (`wiki/`) 四类词条 + `context-snapshot.json` (1.4MB) + `openwiki:sync/--check` 同步门禁。
- `docs/specs/` 两个域: `core/` (init-baseline / lite-runtime-profile / module-trim-and-mcp 等) + `platform/`; spec 包 16 文件制 (brief.json/spec.md/tasks.md/evidence.json/runbook.json...)。

## 12. 与家族的互认点 (事实)

- HARNESS.md §4 明文引用 cooliebase-all `harness-health` 与 wenlv-next `*-negative-control` 为同族对齐标准。
- llms.txt / compat-manifest 是本仓独有形态 (wenlv/cooliebase 无)。
