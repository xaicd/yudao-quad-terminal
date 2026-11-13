#!/usr/bin/env bash
# ==============================================================================
# start.sh — 幂等零 Docker 全栈一键拉起入口 (Embedded PG 18.4 + Embedded Redis + Spring Boot + Caddy)
#
# 自动读取 `.env.ports` 与 `package.json`，生成 `{ admin off }` 四平面 Caddyfile 并拉起全栈服务。
# 用法：
#   bash start.sh            # 幂等后台拉起全栈服务并探活
#   bash start.sh --stop     # 仅回收本项目专属进程，绝不误伤友邻端口
#   bash start.sh --status   # 查看服务监听状态
# ==============================================================================
set -eo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

case "${1:-start}" in
  --stop|stop)
    exec bash scripts/service.sh stop
    ;;
  --status|status)
    exec bash scripts/service.sh status
    ;;
  --health|health)
    exec bash scripts/service.sh health
    ;;
  *)
    exec bash scripts/service.sh start
    ;;
esac
