#!/usr/bin/env bash
# ==============================================================================
# deploy/cwall/stop-cwall.sh — 仅回收本项目在 cwall 节点的专属进程，严禁误杀友邻服务
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

for pid_file in .commandcode/cwall/caddy.pid .commandcode/cwall/lite.pid; do
  if [ -f "$pid_file" ]; then
    p="$(tr -d ' \n\r' < "$pid_file")"
    if [ -n "$p" ] && kill -0 "$p" 2>/dev/null; then
      kill "$p" 2>/dev/null || true
    fi
    rm -f "$pid_file"
  fi
done

if [ -f "scripts/lite-down.mjs" ]; then
  node scripts/lite-down.mjs --force 2>/dev/null || true
fi

echo "✅ [cwall] 本项目专属进程已干净回收"
