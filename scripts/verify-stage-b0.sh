#!/usr/bin/env bash
# ==============================================================================
# scripts/verify-stage-b0.sh — Stage B0 需求边界锁定、端口矩阵与规格资产门禁
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔍 [Stage B0] 校验兼容契约、规格健康度、4字菜单规范与静态 23 门禁..."
node scripts/compat-check.cjs
node scripts/gate-check.cjs --only pkg-manager,ci-files,script-targets,doc-commands,menu-standard
node scripts/audit-23-gates.mjs --static-only
echo "✅ [Stage B0] 架构边界、零冲突端口矩阵与契约资产全部就绪！"
