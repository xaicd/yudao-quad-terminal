#!/usr/bin/env bash
# ==============================================================================
# scripts/verify-stage-b4.sh — Stage B4 出厂终审：全量门禁 + Coolie Layer-B G1–G23 硬门禁
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🛡️  [Stage B4] 执行 Coolie Layer-B G1–G23 全量出厂硬门禁审计..."
node scripts/gate-check.cjs --tier fast
node scripts/audit-23-gates.mjs --write-report
echo "✅ [Stage B4] G1–G23 全部达标，审计报告已输出至 docs/evidence/23-gates-audit.json！"
