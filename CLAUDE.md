# Claude Code Guidelines for yudao-quad-terminal (`v1.2.0`)

This repository is `yudao-quad-terminal` (`v1.2.0`), an enterprise-grade quad-terminal fullstack blueprint base (Java Spring Boot 3 + Vue 3 Admin + Uni-App Miniapp + Expo React Native App), with zero-Docker Embedded PostgreSQL 18.4 (`embedded-postgres`) and Embedded Redis. It shares 100% identical `.cjs` CLI contracts with sister base `cooliebase-all` (`v1.5.0`, which also provides 4 terminals: `clients/web`, `clients/admin`, `clients/app`, and `clients/miniapp`, and 20 first-party plugins including `oa/hrm/fms/pms`).

## Single Source of Truth for Rules & Two-Pillar Architecture
All engineering rules and architectural standards are unified in [`AGENTS.md`](AGENTS.md), [`HARNESS.md`](HARNESS.md), [`docs/wiki/index.md`](docs/wiki/index.md), and `.agents/rules/` (all documentation, specs, OpenWiki, release notes, and audit reports are strictly consolidated under `docs/`):
- **Pillar 1 — `harness` (`HARNESS.md` + `scripts/harness.cjs`) = Master Workflow & Lifecycle Specification**:
  `pnpm harness <install|check|build|start|health|status|stop|e2e|deliver|pmo>`
- **Pillar 2 — `speckit` (`pnpm run speckit`) + CMMI 00~09 Extensions (`scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs`) = Stage Document & Process Asset Engine**:
  `pnpm run speckit -- cmmi <00..09> [docs|check|asset|...]` (or `node scripts/cmmi-0X-*.cjs`)
- **Mandatory Submodule Rule**: `apps/backend`, `apps/admin`, `apps/miniapp` are read-only upstream git submodules; all customizations go to `deploy/patches/` or derived sandboxes (`/tmp/<slug>-sandbox`).
- **Sole `docs/` Documentation Directory**: `docs/00_meta_standards` ~ `09_operations`, `docs/specs/`, `docs/wiki/`, `docs/07_release/releases/`, and `docs/audit/` live exclusively under `docs/` (zero top-level `doc/`, `wiki/`, `openwiki/`, `specs/`, or `releases/`).
- **Strict 4-Character Navigation Menu Standard**: All visible directory/page menus (`system_menu.type IN (1, 2)`) MUST satisfy `char_length(name) <= 4` (`scripts/lib/menu-standard.cjs`, `deploy/lite/runtime/lite-pg.mjs`, `scripts/blueprint-engine.cjs`, `scripts/codegen-module.mjs`, and gate `menu-standard`).
- **Clean Derived Project Hatching**: `scripts/project-reactor.mjs` (`pnpm project:init` / `pnpm project:hatch`) regenerates clean branded `README.md`, `CLAUDE.md`, `HARNESS.md`, and `apps/{backend,admin,miniapp}/README.md` while purging upstream tutorial `.md` files, `.image/` directories, and `*-ui` stubs (verified by `pnpm harness:hatch`).
- **Unified Spec & Prototype Standard**: `docs/specs/<domain>/<name>/` governed by `scripts/speckit.cjs` (`FEATURE-SPEC-AND-PROTOTYPE-STANDARD`).

## Project PMO & 4-Scenario AI Agent Playbook (Identical Across `coolie` `v0.7.0`, `yudao-quad-terminal` `v1.2.0` & `cooliebase-all` `v1.5.0`)
0. **Scenario 0 — Project PMO Instant Backlog & Next-Action Radar (CMMI-01)**:
   - Run `pnpm run pmo` (or `node scripts/cmmi-01-management.cjs pmo [--write|--json]` / `pnpm harness pmo`)
   - Inspect [`docs/01_management/pmo-dashboard.md`](docs/01_management/pmo-dashboard.md) and [`docs/01_management/project-plan.md`](docs/01_management/project-plan.md) for active WIP specs, unverified tasks `[T1..Tn]`, ready-to-archive specs, and the prioritized `P0 / P1 / P2` Next Action Queue.
1. **Scenario A — Zero-Pollution Sandbox Hatching (CMMI-01)**:
   `node scripts/cmmi-01-management.cjs init --name <slug> --title "<系统中文名>" --target /tmp/<slug>-sandbox`
   (or `pnpm run project:init -- --name <slug> --title "<系统中文名>" --target /tmp/<slug>-sandbox`)
2. **Scenario B — `<500 Tokens` Blueprint Fullstack Delivery + Embedded PostgreSQL 18.4 E2E (CMMI-03~05)**:
   - `node scripts/cmmi-03-design.cjs doctor --file <domain>.blueprint.json --write`
   - `node scripts/cmmi-04-implementation.cjs deliver --file <domain>.blueprint.json --verify-e2e`
   (or `pnpm run blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e`)
3. **Scenario C — Feature / Bugfix / Refactor Iteration (Spec-Kit × CMMI 00~09)**:
   - `pnpm run agent:route -- "<用户的原始需求原文>"`
   - `pnpm run speckit:new -- --name <name> --domain <domain> --title "<title>" [--type feature|bugfix|enhancement|refactor]`
   - `pnpm run speckit:build -- --name <name>`
   - `pnpm run speckit -- cmmi 04 docs --spec <name>` & `pnpm run speckit:tasks -- --spec <name>`
   - `node scripts/cmmi-05-verification.cjs e2e`
   - `pnpm run check` & `pnpm run compat:check`
   - `pnpm run speckit:archive -- --name <name>`

## 第一步（强制）：需求分诊

动手做任何需求之前，先跑：

    pnpm run agent:route -- "<用户的原始需求原文>"

它会给出**确定性判定**（`SPEC_REQUIRED` / `DIRECT_OK` / `NOT_A_REQUIREMENT`）：
- `SPEC_REQUIRED` → 先 `pnpm run speckit:new -- --name <名> --domain <域> --type <类型> --title "<标题>"`
- `DIRECT_OK` → 可直接改（改完仍须 `pnpm run check` 全绿）
- `NOT_A_REQUIREMENT` → 这句话不是一个需求，既不立规格也不改代码
