#!/usr/bin/env bash
# ==============================================================================
# scripts/verify-stage-b5-cwall.sh — Stage B5 远程算力节点 (cwall) 零冲突独立部署拨测模板
#
# 用法：
#   CWALL_HOST=100.118.232.61 GATEWAY_PORT=48091 PROJECT_SLUG=my-app bash scripts/verify-stage-b5-cwall.sh
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

CWALL_HOST="${CWALL_HOST:-100.118.232.61}"
SLUG="${PROJECT_SLUG:-$(node -p 'JSON.parse(require("fs").readFileSync("package.json","utf8")).name.replace(/^@.*\//,"")')}"
GW_PORT="${GATEWAY_PORT:-48120}"
BASE_URL="http://${CWALL_HOST}:${GW_PORT}/${SLUG}"

echo "🌐 [Stage B5] 拨测远程节点四平面网关: ${BASE_URL}/ ..."
for plane in "admin/" "cockpit/" "2c/" "v3/api-docs"; do
  code="$(curl -s -o /dev/null -w '%{http_code}' -m 8 "${BASE_URL}/${plane}")"
  echo "   • ${BASE_URL}/${plane} -> HTTP ${code}"
  if [ "$code" != "200" ]; then
    echo "❌ 平面 ${plane} 未返回 HTTP 200 (实际: ${code})"
    exit 1
  fi
done

echo "✅ [Stage B5] 远程节点四平面 200 OK 验收通过！"
