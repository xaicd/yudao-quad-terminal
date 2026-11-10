# GitHub Copilot Instructions for yudao-quad-terminal

This workspace is `yudao-quad-terminal`, an enterprise-grade quad-terminal fullstack platform built on Spring Boot 3 + Vue 3 + Uni-App + Expo React Native, with zero-Docker Embedded PostgreSQL 18.4 (`embedded-postgres`).

- Two-Pillar Architecture:
  - Pillar 1 (`harness` = Master Workflow): `pnpm harness <install|check|build|start|health|status|stop|e2e|deliver>` (`scripts/harness.cjs`)
  - Pillar 2 (`speckit` + CMMI 00~09 Stage Document Extensions): `pnpm run speckit -- cmmi <00..09> [docs|check|asset|...]` (`scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs`)
- Spec & Prototype Standard (`FEATURE-SPEC-AND-PROTOTYPE-STANDARD`): `pnpm run spec:new`, `pnpm run spec:build`, `pnpm run spec:check`, `pnpm run spec:archive`
- Zero-Pollution Sandbox Hatching: `pnpm run project:init -- --name <slug> --title "<系统名>" --target /tmp/<slug>-sandbox`
- `<500 Tokens` Blueprint + Embedded PostgreSQL 18.4 E2E: `pnpm run blueprint:deliver -- --file <domain>.blueprint.json --verify-e2e`
- Detailed Rules: Review `AGENTS.md`, `HARNESS.md`, `CLAUDE.md`, and `llms.txt`.

## 第一步（强制）：需求分诊

动手做任何需求之前，先跑：

    pnpm run agent:route -- "<用户的原始需求原文>"

- `SPEC_REQUIRED` → 先 `pnpm run speckit:new -- --name <名> --domain <域> --type <类型> --title "<标题>"`
- `DIRECT_OK` → 可直接改（改完仍须 `pnpm run check` 全绿）
- `NOT_A_REQUIREMENT` → 这句话不是一个需求，既不立规格也不改代码
