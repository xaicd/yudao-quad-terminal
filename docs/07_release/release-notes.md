# 《Yudao Quad-Terminal》版本发布说明书 (Release Notes Summary, `v1.2.0`)

- **发布版本**: `v1.2.0`（完整制品清单与快速核验指引详见 [`releases/v1.2.0.md`](releases/v1.2.0.md) 与根目录 [`CHANGELOG.md`](../../CHANGELOG.md)）
- **发布日期**: `2026-11-16`
- **兼容契约**: `compat-manifest.json` (`templateVersion: "1.2.0"`) · `blueprint.template.json` (`schemaVersion: "2.1.0"`)

---

## 核心里程碑摘要

1. **声明式蓝图引擎与全栈交付（`scripts/blueprint-engine.cjs`）**：支持 `<500 Tokens` 领域蓝图声明、`<= 4` 字菜单与权限码口语化自愈（`doctor`）、四端同源 `BASE_PATH` 渲染与一键全栈展开（`pnpm blueprint:deliver`）。
2. **双支柱治理与全仓 `docs/` 单一归口**：`scripts/harness.cjs` 生命周期总控 × `scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs` 全环节文档引擎，将 OpenWiki（`docs/wiki/` 41 篇纯净词条）、规格（`docs/specs/`）、正式版说明（`docs/07_release/releases/`）与治理审计（`docs/audit/`）统一归口于 `docs/`。
3. **零 Docker 真实数据库闭环（`lite` 档）**：内置 Embedded PostgreSQL 18.4（`scripts/lib/ephemeral-pg.cjs`）+ 嵌入式 Redis 与 CSPRNG `0600` 引导凭据，支持 `pnpm lite:verify` 连续 3 次加密登录真库验收。
4. **净室骨架孵化与可移植网关配置**：`ProjectReactor` 固化连字符安全标识符（`snakeSlug` / `pascalSlug`）、零宿主机绝对路径硬编码的 `{ admin off }` Caddy 四平面网关、模板弱默认凭据清零及 92 条只读上游契约基线对账。
5. **自动化发布流水线（`pnpm release:package` & `.github/workflows/release.yml`）**：一键构建离线纯净四端骨架包、`compat-manifest.json`、`blueprint.template.json` 与 `SHA256SUMS.txt` 并自动发布 GitHub Releases。
