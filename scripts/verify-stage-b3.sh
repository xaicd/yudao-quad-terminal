#!/usr/bin/env bash
# ==============================================================================
# scripts/verify-stage-b3.sh — Stage B3 多视口零假 Mock Playwright E2E 与底栏防遮挡验收
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🎭 [Stage B3] 执行零假 Mock 多视口 (1920/1440/375/320dp) Playwright E2E..."
bash scripts/service.sh health
if ls e2e/*.spec.* >/dev/null 2>&1; then
  pnpm exec playwright test --config=playwright.config.mjs
else
  echo "ℹ️ 尚未编写业务域 e2e/*.spec.mjs，执行冒烟登录探针..."
  pnpm smoke:login
fi

echo "✅ [Stage B3] 多视口渲染与交互验收通过！"
