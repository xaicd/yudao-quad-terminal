# 《Yudao Quad-Terminal Master Base》版本发布说明书 (Release Notes)

版本号: `v1.2.0`  
发布日期: 2026-11-16  

## 核心里程碑摘要

1. **声明式蓝图引擎与全栈交付 (`scripts/blueprint-engine.cjs`)**：支持 `<500 Tokens` 领域蓝图声明、口语化契约自愈诊断 (`doctor`)、四端同源 `BASE_PATH` 渲染与一键全栈展开 (`pnpm blueprint:deliver`)。
2. **双支柱治理体系 (`harness` × `speckit` CMMI 00–09)**：补齐 `scripts/harness.cjs` 统一生命周期调度与 `scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs` 全生命周期过程资产引擎。
3. **零 Docker 真实数据库闭环 (`lite` 档)**：内置 Embedded PostgreSQL 18.4 (`scripts/lib/ephemeral-pg.cjs`) + 嵌入式 Redis 与 CSPRNG 引导凭据，支持 `pnpm lite:verify` 真库端到端验收。
4. **净室骨架孵化与 23 道出厂硬门禁**：`ProjectReactor` 支持连字符安全标识符 (`snakeSlug` / `pascalSlug`)、四平面 `{ admin off }` Caddy 网关、零上游推广残留净室清洗，以及只读上游子模块契约基线对账 (`scripts/lib/upstream-contract-baseline.json`)。
5. **自动化发布流水线 (`pnpm release:package` & `.github/workflows/release.yml`)**：支持打 `v*` 标签自动校验门禁、打包离线纯净骨架包与 `SHA256SUMS.txt` 并发布 GitHub Releases。
