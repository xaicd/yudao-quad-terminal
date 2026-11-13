#!/usr/bin/env bash
# ==============================================================================
# scripts/verify-stage-b2.sh — Stage B2 核心领域 CRUD、状态机流转与三员分立审计验证
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🧪 [Stage B2] 执行核心领域单测、脚本测试与 OpenAPI 契约对账..."
pnpm test:scripts
pnpm typecheck

if [ -d "apps/backend/server" ]; then
  (cd apps/backend && mvn -B test -pl server -am)
elif [ -d "apps/backend/yudao-server" ]; then
  (cd apps/backend && mvn -B test -pl yudao-server -am)
fi

echo "✅ [Stage B2] 领域服务、状态机与契约验证通过！"
