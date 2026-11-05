#!/usr/bin/env bash
# ==============================================================================
# Yudao-Quad-Terminal —— 标准全生命周期服务操控执行器 (Standard Lifecycle Service Controller)
# 支持指令：install | build | start | stop | status | health | logs | deploy
# 唯一对外端口标准：单一入口 http://127.0.0.1:${PORT}/${SLUG}/
# ==============================================================================
set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJ_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJ_ROOT}"
mkdir -p logs

ACTION="${1:-status}"
PORT="${PORT:-${GATEWAY_PORT:-48120}}"
PID_FILE="logs/service.pid"
LOG_FILE="logs/service.log"

get_project_slug() {
  node -e '
    const fs = require("fs");
    let name = "app";
    try {
      const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
      name = (pkg.name || "").replace(/^@.*\//, "");
    } catch {}
    const slug = name.split(" ")[0].toLowerCase().replace(/[^a-z0-9_-]/g, "").replace(/^-|-$/g, "") || "app";
    console.log(slug);
  '
}

SLUG="$(get_project_slug)"

get_pid() {
  if [ -f "$PID_FILE" ]; then
    local p="$(cat "$PID_FILE" | tr -d ' \n\r')"
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
  echo "✅ 安装就绪"
}

do_build() {
  echo "🏗️  [${SLUG}] 执行标准全栈生产态构建 (build)..."
  bash scripts/lifecycle.sh . build
  echo "⚙️  生成标准网关配置 (Caddy & Nginx)..."
  node scripts/generate-gateway-config.mjs
  echo "✅ 构建完成"
}

do_start() {
  if pid="$(get_pid)"; then
    echo "⚠️  服务已在运行 (PID: $pid)"
    return 0
  fi
  echo "🚀 [${SLUG}] 启动全生命周期统一服务 (对外单一端口: ${PORT})..."

  # 1. 确保最新网关配置存在
  node scripts/generate-gateway-config.mjs

  # 2. 检查或启动数据库/Redis (若是本地开发)
  if [ -f "scripts/lite-up.mjs" ]; then
    echo "  📦 检查/启动本地内嵌基础组件..."
    node scripts/lite-up.mjs || true
  fi

  # 3. 启动后端 Spring Boot (默认后台运行)
  JAR_PATH="$(ls apps/backend/*/target/*.jar 2>/dev/null | grep -v 'original' | head -n 1 || true)"
  if [ -n "$JAR_PATH" ] && [ -f "$JAR_PATH" ]; then
    echo "  ☕ 启动 Spring Boot 后端 Jar: $JAR_PATH..."
    nohup java -jar "$JAR_PATH" --server.port=48080 > logs/backend.log 2>&1 &
  elif [ -d "apps/backend" ]; then
    echo "  ☕ 启动 Spring Boot 后端 (源码模式)..."
    (cd apps/backend && nohup mvn clean spring-boot:run -Dspring-boot.run.profiles=local > "${PROJ_ROOT}/logs/backend.log" 2>&1 &)
  fi

  # 4. 启动统一标准接入网关 (优先使用标准 caddy)
  CADDY_CONF="deploy/gateway/caddy/${SLUG}.caddy"
  if command -v caddy >/dev/null 2>&1 && [ -f "$CADDY_CONF" ]; then
    echo "  🚪 启动标准 Caddy 网关 (监听端口 ${PORT})..."
    lsof -i ":${PORT}" -t | xargs kill -9 2>/dev/null || true
    nohup caddy run --adapter caddyfile --config "$CADDY_CONF" > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
  else
    echo "❌ 缺少 caddy 命令或网关配置未生成，无法暴露统一入口"
    return 1
  fi

  local new_pid="$(cat "$PID_FILE")"
  echo "✅ 全栈服务已拉起 (主网关 PID: $new_pid)"
  echo "🔗 统一对外单一入口: http://127.0.0.1:${PORT}/${SLUG}/"
}

do_stop() {
  echo "🛑 停止 [${SLUG}] 全栈服务..."
  if pid="$(get_pid)"; then
    kill "$pid" 2>/dev/null || kill -9 "$pid" 2>/dev/null || true
    rm -f "$PID_FILE"
  fi
  # 彻底清理网关与后端端口
  lsof -i ":${PORT}" -t | xargs kill -9 2>/dev/null || true
  lsof -i ":48080" -t | xargs kill -9 2>/dev/null || true
  if [ -f "scripts/lite-down.mjs" ]; then
    node scripts/lite-down.mjs --force 2>/dev/null || true
  fi
  echo "✅ 全栈服务与端口已全部干净停止"
}

do_status() {
  if pid="$(get_pid)"; then
    echo "🟢 服务运行中 (主网关 PID: $pid, 监听端口: ${PORT})"
    echo "   • 统一入口: http://127.0.0.1:${PORT}/${SLUG}/"
    echo "   • C端商城:  http://127.0.0.1:${PORT}/${SLUG}/2c/"
    echo "   • B端后台:  http://127.0.0.1:${PORT}/${SLUG}/admin/"
  else
    echo "🔴 服务未运行 (端口 ${PORT} 空闲)"
  fi
}

do_health() {
  if curl -s -f -m 3 "http://127.0.0.1:${PORT}/${SLUG}/2c/" >/dev/null 2>&1; then
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
  node scripts/generate-gateway-config.mjs
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
