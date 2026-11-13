#!/usr/bin/env bash
# ==============================================================================
# scripts/verify-stage-b1.sh — Stage B1 全栈零报错构建、真 PG 18.4 拉起与四平面网关探活
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -f ".env.ports" ]; then
  set -a
  # shellcheck disable=SC1091
  source ".env.ports"
  set +a
fi

echo "🏗️  [Stage B1] 1/4 全栈生产构建 (Backend Fat-Jar + Admin Dist + Miniapp H5)..."
pnpm build:backend
pnpm build:admin
pnpm build:miniapp

echo "🚪 [Stage B1] 2/4 生成声明式 { admin off } 四平面网关配置..."
node scripts/generate-gateway-config.mjs

echo "🐘 [Stage B1] 3/4 执行零 Docker 真实 PostgreSQL 18.4 + Redis + AES 加密三连登验收..."
node scripts/lite-up.mjs --verify

echo "✅ [Stage B1] 全栈构建与真实数据库引导验收通过！"
