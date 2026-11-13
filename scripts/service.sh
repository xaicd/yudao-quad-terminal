#!/usr/bin/env bash
# ==============================================================================
# Yudao-Quad-Terminal —— 标准全生命周期服务操控执行器 (Standard Lifecycle Service Controller)
# 支持指令：install | build | start | stop | status | health | logs | deploy
# 唯一对外端口标准：单一入口 http://127.0.0.1:${PORT}/${SLUG}/
# 严格遵循多项目并跑隔离纪律：优先读取 .env.ports，按 PID 与精确命令行回收，绝不盲杀友邻端口！
# ==============================================================================
set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJ_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJ_ROOT}"
mkdir -p logs

if [ -f ".env.ports" ]; then
  set -a
  # shellcheck disable=SC1091
  source ".env.ports"
  set +a
fi

ACTION="${1:-status}"
PORT="${PORT:-${GATEWAY_PORT:-48120}}"
BACKEND_PORT="${BACKEND_PORT:-${LITE_SERVER_PORT:-48080}}"
DB_PORT="${DB_PORT:-${LITE_PG_PORT:-55432}}"
REDIS_PORT="${REDIS_PORT:-${LITE_REDIS_PORT:-63799}}"
PID_FILE="logs/service.pid"
LITE_PID_FILE="logs/lite-up.pid"
LOG_FILE="logs/service.log"

get_project_slug() {
  node -e '
    const fs = require("fs");
    let name = process.env.PROJECT_SLUG || "app";
    try {
      const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
      if (pkg.name) name = pkg.name.replace(/^@.*\//, "").replace(/-quad-terminal$/, "");
    } catch {}
    const slug = name.split(" ")[0].toLowerCase().replace(/[^a-z0-9_-]/g, "").replace(/^-|-$/g, "") || "app";
    console.log(slug);
  '
}

SLUG="$(get_project_slug)"

get_pid() {
  if [ -f "$PID_FILE" ]; then
    local p
    p="$(tr -d ' \n\r' < "$PID_FILE")"
    if [ -n "$p" ] && kill -0 "$p" 2>/dev/null; then
      echo "$p"
      return 0
    fi
  fi
  return 1
}

do_install() {
  echo "📦 [${SLUG}] 执行标准依赖安装与初始化 (install)..."
  bash scripts/lifecycle.sh . install
  if [ -f "scripts/domain-prune.mjs" ]; then
    echo "🧹 [${SLUG}] 自动化执行领域菜单与脚手架噪声清洗 (domain-prune)..."
    node scripts/domain-prune.mjs --apply || true
  fi
  for seed in scripts/seed-domain-*.mjs scripts/seed-domain.mjs; do
    if [ -f "$seed" ]; then
      echo "🌱 [${SLUG}] 自动化执行垂直领域业务种子注入 ($seed)..."
      node "$seed" || true
    fi
  done
  echo "✅ 安装就绪"
}

do_build() {
  echo "🏗️  [${SLUG}] 执行标准全栈生产态构建 (build)..."
  bash scripts/lifecycle.sh . build
  echo "⚙️  生成标准四平面网关配置 (Caddy & Nginx)..."
  GATEWAY_PORT="${PORT}" BACKEND_PORT="${BACKEND_PORT}" node scripts/generate-gateway-config.mjs
  echo "✅ 构建完成"
}

do_start() {
  if pid="$(get_pid)"; then
    echo "⚠️  服务已在运行 (PID: $pid, 网关端口: ${PORT})"
    return 0
  fi
  if [ -f "scripts/port-registry.cjs" ]; then
    if ! node scripts/port-registry.cjs check "${PORT}" "${SLUG:-app}"; then
      echo "❌ 启动终止: 端口 ${PORT} 存在外部项目冲突，请排查或修改 .env.ports 后重试"
      exit 1
    fi
  fi
  echo "🚀 [${SLUG}] 启动全生命周期统一服务 (网关 :${PORT} -> 后端 :${BACKEND_PORT}, PG :${DB_PORT}, Redis :${REDIS_PORT})..."

  # 1. 确保最新网关配置存在（含 { admin off }）
  GATEWAY_PORT="${PORT}" BACKEND_PORT="${BACKEND_PORT}" node scripts/generate-gateway-config.mjs

  # 2. 启动嵌入式 PG + Redis + Spring Boot 编排器（或回退独立 Jar）
  if ! curl -s -m 2 "http://127.0.0.1:${BACKEND_PORT}/v3/api-docs" >/dev/null 2>&1; then
    if [ -f "scripts/lite-up.mjs" ]; then
      echo "  📦 后台拉起零 Docker 全栈运行时 (lite-up.mjs)..."
      LITE_SERVER_PORT="${BACKEND_PORT}" LITE_PG_PORT="${DB_PORT}" LITE_REDIS_PORT="${REDIS_PORT}" \
        nohup node scripts/lite-up.mjs --server-port "${BACKEND_PORT}" --pg-port "${DB_PORT}" --redis-port "${REDIS_PORT}" \
        > logs/lite-up.log 2>&1 &
      echo $! > "$LITE_PID_FILE"
      for _ in $(seq 1 90); do
        if curl -s -m 2 "http://127.0.0.1:${BACKEND_PORT}/v3/api-docs" >/dev/null 2>&1; then
          break
        fi
        sleep 2
      done
    else
      JAR_PATH="$(ls apps/backend/*/target/*.jar 2>/dev/null | grep -v 'original' | head -n 1 || true)"
      if [ -n "$JAR_PATH" ] && [ -f "$JAR_PATH" ]; then
        echo "  ☕ 启动 Spring Boot 后端 Jar: $JAR_PATH (:${BACKEND_PORT})..."
        nohup java \
          --add-opens=java.base/java.nio=ALL-UNNAMED \
          --add-opens=java.base/sun.nio.ch=ALL-UNNAMED \
          --add-opens=java.base/java.lang=ALL-UNNAMED \
          --add-opens=java.base/java.lang.reflect=ALL-UNNAMED \
          -jar "$JAR_PATH" --server.port="${BACKEND_PORT}" > logs/backend.log 2>&1 &
        echo $! > "$LITE_PID_FILE"
      fi
    fi
  fi

  # 3. 启动统一标准接入网关 (Caddy with `{ admin off }`)
  CADDY_CONF="deploy/gateway/caddy/${SLUG}.caddy"
  if command -v caddy >/dev/null 2>&1 && [ -f "$CADDY_CONF" ]; then
    echo "  🚪 启动标准 Caddy 四平面网关 (监听端口 ${PORT}, admin off)..."
    pkill -f "caddy run.*${CADDY_CONF}" 2>/dev/null || true
    nohup caddy run --adapter caddyfile --config "$CADDY_CONF" > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
  else
    echo "❌ 缺少 caddy 命令或网关配置未生成 ($CADDY_CONF)，无法暴露统一入口"
    return 1
  fi

  local new_pid
  new_pid="$(cat "$PID_FILE")"
  if [ -f "scripts/port-registry.cjs" ]; then
    node scripts/port-registry.cjs claim "${PORT}" "${SLUG:-app}" "$new_pid" || true
  fi
  echo "✅ 全栈服务已拉起 (主网关 PID: $new_pid)"
  echo "🔗 统一对外单一入口: http://127.0.0.1:${PORT}/${SLUG}/"
}

do_stop() {
  echo "🛑 停止 [${SLUG}] 本项目专属全栈服务 (严禁误伤其他项目端口)..."
  if [ -f "scripts/port-registry.cjs" ]; then
    node scripts/port-registry.cjs release "${PORT}" "${SLUG:-app}" || true
  fi
  if pid="$(get_pid)"; then
    kill "$pid" 2>/dev/null || kill -9 "$pid" 2>/dev/null || true
    rm -f "$PID_FILE"
  fi
  pkill -f "caddy run.*deploy/gateway/caddy/${SLUG}.caddy" 2>/dev/null || true

  if [ -f "$LITE_PID_FILE" ]; then
    local lp
    lp="$(tr -d ' \n\r' < "$LITE_PID_FILE")"
    if [ -n "$lp" ] && kill -0 "$lp" 2>/dev/null; then
      kill "$lp" 2>/dev/null || true
    fi
    rm -f "$LITE_PID_FILE"
  fi

  if [ -f "scripts/lite-down.mjs" ]; then
    node scripts/lite-down.mjs --force 2>/dev/null || true
  fi
  echo "✅ [${SLUG}] 专属进程与运行时已干净回收"
}

do_status() {
  if pid="$(get_pid)"; then
    echo "🟢 服务运行中 (主网关 PID: $pid, 网关端口: ${PORT}, 后端端口: ${BACKEND_PORT})"
    echo "   • 统一入口: http://127.0.0.1:${PORT}/${SLUG}/"
    echo "   • 大屏平面: http://127.0.0.1:${PORT}/${SLUG}/cockpit/"
    echo "   • B端后台:  http://127.0.0.1:${PORT}/${SLUG}/admin/"
    echo "   • C端H5:    http://127.0.0.1:${PORT}/${SLUG}/2c/"
    echo "   • API契约:  http://127.0.0.1:${PORT}/${SLUG}/v3/api-docs"
  else
    echo "🔴 服务未运行 (网关端口 ${PORT} 空闲)"
  fi
}

do_health() {
  if curl -s -f -m 3 "http://127.0.0.1:${PORT}/${SLUG}/admin/" >/dev/null 2>&1; then
    echo "✅ 探活 200 OK: http://127.0.0.1:${PORT}/${SLUG}/admin/"
  elif curl -s -f -m 3 "http://127.0.0.1:${PORT}/${SLUG}/2c/" >/dev/null 2>&1; then
    echo "✅ 探活 200 OK: http://127.0.0.1:${PORT}/${SLUG}/2c/"
  elif curl -s -f -m 3 "http://127.0.0.1:${PORT}/${SLUG}/" >/dev/null 2>&1; then
    echo "✅ 探活 200 OK: http://127.0.0.1:${PORT}/${SLUG}/"
  else
    echo "⚠️ 统一网关端口 ${PORT} 暂未响应"
    return 1
  fi
}

do_logs() {
  if [ -f "$LOG_FILE" ]; then
    tail -n 50 "$LOG_FILE"
  else
    echo "ℹ️ 暂无日志文件 ($LOG_FILE)"
  fi
}

do_deploy() {
  echo "🚀 [${SLUG}] 执行标准生产部署配置同步 (deploy)..."
  GATEWAY_PORT="${PORT}" BACKEND_PORT="${BACKEND_PORT}" node scripts/generate-gateway-config.mjs
  bash scripts/deploy-caddy.sh || true
  echo "✅ 部署与网关规则同步完成 (deploy/gateway/nginx/ & caddy/)"
}

case "$ACTION" in
  install) do_install ;;
  build)   do_build ;;
  start)   do_start ;;
  stop)    do_stop ;;
  restart) do_stop; sleep 1; do_start ;;
  status)  do_status ;;
  health)  do_health ;;
  logs)    do_logs ;;
  deploy)  do_deploy ;;
  *)
    echo "用法: bash scripts/service.sh [install|build|start|stop|restart|status|health|logs|deploy]"
    exit 1
    ;;
esac
