# Changelog

All notable changes to **Yudao Quad-Terminal** (`yudao-quad-terminal`) are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) and [Semantic Versioning](https://semver.org/lang/zh-CN/).

---

## [1.2.0] - 2026-11-16

### Added
- **Blueprint Engine (`scripts/blueprint-engine.cjs`, `blueprint.template.json`)**: Added `<500 Tokens` declarative domain blueprint rendering, `doctor` self-healing diagnostics, unified quad-terminal `BASE_PATH` templating, and `pnpm blueprint:deliver` full-stack delivery orchestration.
- **Spec-Kit × CMMI 00–09 Matrix (`scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs`, `scripts/harness.cjs`)**: Added full CMMI 00–09 stage scripts, PMO dashboard (`pnpm pmo`), deterministic requirement routing (`pnpm agent:route`), 8-verb service control plane (`deploy/service.sh`), three-role audit (`pnpm gen:three-role`), and 23-gate auditor (`pnpm gates:23`).
- **Zero-Docker Real DB Stack (`scripts/lib/ephemeral-pg.cjs`, `deploy/lite/`)**: Integrated Embedded PostgreSQL 18.4 and embedded Redis runtime with CSPRNG bootstrap credentials (`pnpm lite:up`, `pnpm lite:verify`).
- **Release Packaging & GitHub Release CI (`.github/workflows/release.yml`, `scripts/build-release-assets.cjs`, `docs/07_release/releases/v1.2.0.md`)**: Added `pnpm release:package` offline skeleton packager (`SHA256SUMS.txt` + contracts) and automated `softprops/action-gh-release@v2` publishing on `v*` tags.

### Changed
- **Unified `docs/` Documentation Consolidation (`docs/wiki/`, `docs/specs/`, `docs/07_release/releases/`, `docs/audit/`)**: Eliminated parallel top-level documentation directories/symlinks (`wiki/`, `openwiki`, `specs`, `releases/`) and enforced sole `docs/` consolidation via `menu-standard` gate (`pnpm check`).
- **Clean-Room Hatch Engine & Gateway Portability (`scripts/project-reactor.mjs`, `scripts/hatch.sh`, `scripts/project-init.cjs`, `scripts/generate-gateway-config.mjs`, `deploy/templates/admin/.env.template`)**: Hardened hyphen-safe SQL/Java identifier derivation (`snakeSlug` / `pascalSlug`), `{ admin off }` 4-plane Caddy gateway generation without hardcoded host paths, weak default credential removal in templates, Home mock chart scrubbing, and mother-repo archive/audit isolation (`pnpm harness:hatch`).
- **Upstream Contract Drift Governance (`scripts/check-contracts-drift.mjs`, `scripts/lib/upstream-contract-baseline.json`)**: Established explicit baseline accounting for 92 known read-only upstream submodule orphan endpoints while failing immediately on any new unbaselined orphan or HTTP verb mismatch.
- **Version Alignment**: Bumped blueprint & workspace package versions (`package.json`, `apps/app`, `packages/api-client`, `packages/shared-types`, `docs/ontology/ontology.yaml`, `docs/ontology/copilot.yaml`, `docs/07_release/*`) to `1.2.0` matching `compat-manifest.json` (`templateVersion: "1.2.0"`).

---

## [1.1.0] - 2026-10-13

### Added
- **Dynamic Upstream Submodule Architecture**: Bound `apps/backend`, `apps/admin`, and `apps/miniapp` to clean upstream commits with declarative patches under `deploy/patches/<submodule>/*.patch` (`pnpm patch:apply`, `pnpm patch:check`).
- **Overhauled Gitignore & Workspace Skeleton**: Unified monorepo `pnpm-workspace.yaml` with `apps/app` (Expo React Native), `packages/api-client`, and `packages/shared-types`.
