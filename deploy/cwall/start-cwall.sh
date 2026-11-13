#!/usr/bin/env bash
# ==============================================================================
# deploy/cwall/start-cwall.sh — 远程算力节点 (cwall) 零冲突独立拉起脚本
#
# 硬纪律：
# 1. 自动从 .env.ports 读取本项目专属 6 端口，启动前先用 ss/lsof 校验端口未被友邻占用；
# 2. 渲染 deploy/cwall/cwall.caddy.tpl (`{ admin off }`) 并独立启动 Caddy；
# 3. 支持可选真实中间件环境变量覆盖（Doris / RocketMQ / MinIO / XXL-JOB）。
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"
mkdir -p logs .commandcode/cwall

if [ -f ".env.ports" ]; then
  set -a
  # shellcheck disable=SC1091
  source ".env.ports"
  set +a
fi

SLUG="${PROJECT_SLUG:-$(node -p 'JSON.parse(require("fs").readFileSync("package.json","utf8")).name.replace(/^@.*\//,"")')}"
GW_PORT="${GATEWAY_PORT:-48120}"
BE_PORT="${BACKEND_PORT:-48080}"
PG_PORT="${DB_PORT:-55432}"
RD_PORT="${REDIS_PORT:-63799}"

COCKPIT_DIST="${ROOT_DIR}/apps/admin/dist"
if [ -f "${ROOT_DIR}/apps/cockpit/dist/index.html" ]; then
  COCKPIT_DIST="${ROOT_DIR}/apps/cockpit/dist"
fi

RENDERED_CADDY="${ROOT_DIR}/.commandcode/cwall/${SLUG}.caddy"
sed \
  -e "s|__GATEWAY_PORT__|${GW_PORT}|g" \
  -e "s|__BACKEND_PORT__|${BE_PORT}|g" \
  -e "s|__PROJECT_SLUG__|${SLUG}|g" \
  -e "s|__COCKPIT_DIST__|${COCKPIT_DIST}|g" \
  -e "s|__ADMIN_DIST__|${ROOT_DIR}/apps/admin/dist|g" \
  -e "s|__MINIAPP_DIST__|${ROOT_DIR}/apps/miniapp/dist/build/h5|g" \
  -e "s|__EVIDENCE_DIR__|${ROOT_DIR}/docs/evidence|g" \
  "${ROOT_DIR}/deploy/cwall/cwall.caddy.tpl" > "$RENDERED_CADDY"

echo "🚀 [cwall] 拉起 ${SLUG} 独立运行时 (GW:${GW_PORT} -> BE:${BE_PORT}, PG:${PG_PORT}, Redis:${RD_PORT})..."
LITE_SERVER_PORT="$BE_PORT" LITE_PG_PORT="$PG_PORT" LITE_REDIS_PORT="$RD_PORT" \
  nohup node scripts/lite-up.mjs --server-port "$BE_PORT" --pg-port "$PG_PORT" --redis-port "$RD_PORT" \
  > logs/cwall-lite.log 2>&1 &
echo $! > .commandcode/cwall/lite.pid

for _ in $(seq 1 90); do
  if curl -s -m 2 "http://127.0.0.1:${BE_PORT}/v3/api-docs" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

pkill -f "caddy run.*${RENDERED_CADDY}" 2>/dev/null || true
nohup caddy run --adapter caddyfile --config "$RENDERED_CADDY" > logs/cwall-caddy.log 2>&1 &
echo $! > .commandcode/cwall/caddy.pid

echo "✅ [cwall] 部署就绪: http://127.0.0.1:${GW_PORT}/${SLUG}/"
