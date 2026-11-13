#!/usr/bin/env bash
# ==============================================================================
# Yudao-Quad-Terminal — Layer-B Standard 8-Verb Service Controller (deploy/service.sh)
#
# Standard Verbs:
#   install | build | start | stop | restart | status | health | logs
#
# Key Invariants:
#   1. Zero hardcoded container/host paths: resolves workspace dynamically via BASH_SOURCE.
#   2. Auto-loads .env.ports (with safe defaults) and .commandcode/lite/credentials.env.
#   3. Auto-discovers JDK 17+ and Maven across macOS Homebrew, Linux OpenJDK, and SDKMAN.
#   4. Strictly scoped process/port lifecycle: never kills neighbor project ports.
# ==============================================================================
set -eo pipefail

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJ_ROOT="$(cd "${DEPLOY_DIR}/.." && pwd)"
cd "${PROJ_ROOT}"
mkdir -p logs .commandcode/lite

setup_java_maven_env() {
  if [ -z "${JAVA_HOME:-}" ] || [ ! -x "${JAVA_HOME}/bin/java" ]; then
    local candidates=(
      "/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
      "/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
      "/usr/local/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
      "/usr/lib/jvm/java-17-openjdk-arm64"
      "/usr/lib/jvm/java-17-openjdk-amd64"
      "/usr/lib/jvm/java-21-openjdk-arm64"
      "/usr/lib/jvm/java-21-openjdk-amd64"
      "${HOME:-/root}/.sdkman/candidates/java/current"
    )
    local cand
    for cand in "${candidates[@]}"; do
      if [ -d "$cand" ] && [ -x "$cand/bin/java" ]; then
        export JAVA_HOME="$cand"
        break
      fi
    done
    if [ -z "${JAVA_HOME:-}" ] && [ -x "/usr/libexec/java_home" ]; then
      local mac_java
      mac_java="$(/usr/libexec/java_home -v 17+ 2>/dev/null || true)"
      if [ -n "$mac_java" ] && [ -x "$mac_java/bin/java" ]; then
        export JAVA_HOME="$mac_java"
      fi
    fi
  fi

  if [ -n "${JAVA_HOME:-}" ] && [ -d "${JAVA_HOME}/bin" ]; then
    export PATH="${JAVA_HOME}/bin:${PATH}"
  fi
  for extra_bin in "/opt/homebrew/bin" "/usr/local/bin" "${HOME:-/root}/.sdkman/candidates/maven/current/bin"; do
    if [ -d "$extra_bin" ]; then
      case ":${PATH}:" in
        *":${extra_bin}:"*) ;;
        *) export PATH="${extra_bin}:${PATH}" ;;
      esac
    fi
  done
}

setup_java_maven_env

if [ -f ".env.ports" ]; then
  set -a
  # shellcheck disable=SC1091
  source ".env.ports"
  set +a
fi

CRED_FILE=".commandcode/lite/credentials.env"
CREDENTIALS_LOADED=0
if [ -f "${CRED_FILE}" ]; then
  set -a
  # shellcheck disable=SC1090
  source "${CRED_FILE}"
  set +a
  CREDENTIALS_LOADED=1
fi

DRY_RUN="${SERVICE_SH_DRY_RUN:-0}"
ACTION=""
for arg in "$@"; do
  case "$arg" in
    --dry-run)
      DRY_RUN=1
      ;;
    -h|--help|help)
      ACTION="--help"
      ;;
    *)
      if [ -z "$ACTION" ]; then
        ACTION="$arg"
      fi
      ;;
  esac
done
ACTION="${ACTION:-status}"

BACKEND_PORT="${BACKEND_PORT:-${LITE_SERVER_PORT:-48080}}"
ADMIN_PORT="${ADMIN_PORT:-48081}"
MINIAPP_PORT="${MINIAPP_PORT:-48082}"
PORT="${PORT:-${GATEWAY_PORT:-48120}}"
DB_PORT="${DB_PORT:-${LITE_PG_PORT:-55432}}"
REDIS_PORT="${REDIS_PORT:-${LITE_REDIS_PORT:-63799}}"

PID_FILE="logs/service.pid"
LITE_PID_FILE="logs/lite-up.pid"
LOG_FILE="logs/service.log"
LITE_LOG_FILE="logs/lite-up.log"

get_project_slug() {
  node -e '
    const fs = require("fs");
    let name = process.env.PROJECT_SLUG || "";
    if (!name) {
      try {
        const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
        if (pkg.name) name = pkg.name.replace(/^@.*\//, "").replace(/-quad-terminal$/, "");
      } catch {}
    }
    const slug = (name || "app").split(" ")[0].toLowerCase().replace(/[^a-z0-9_-]/g, "").replace(/^-|-$/g, "") || "app";
    console.log(slug);
  '
}

SLUG="$(get_project_slug)"
BASE_PATH="${BASE_PATH:-/${SLUG}}"

show_help() {
  cat <<EOF
用法: bash deploy/service.sh <verb> [--dry-run]
      bash scripts/service.sh <verb> [--dry-run]

支持的标准 8 动词:
  install   安装工作区依赖并执行初始化/菜单收敛
  build     执行后端 Fat-Jar 与前端静态产物完整重建 (含网关配置渲染)
  start     幂等后台拉起嵌入式 PG/Redis + Spring Boot + Caddy 统一网关
  stop      按本仓 PID 与独占端口干净停止服务 (零误伤邻仓端口)
  restart   停止旧进程并拉起最新服务
  status    查看当前服务进程、端口矩阵与凭据就绪状态
  health    探测健康端点并返回机器可读 JSON ({status, slug, port, backendPort})
  logs      输出网关与后端最近运行日志

辅助选项:
  --dry-run 仅解析端口/JDK/Maven 与动作契约并退出 0
  -h,--help 显示本帮助说明并退出 0
EOF
}

is_pid_running() {
  local f="$1"
  if [ -f "$f" ]; then
    local p
    p="$(tr -d ' \n\r' < "$f")"
    if [ -n "$p" ] && kill -0 "$p" 2>/dev/null; then
      echo "$p"
      return 0
    fi
  fi
  return 1
}

probe_backend_http() {
  local url code
  for url in \
    "http://127.0.0.1:${BACKEND_PORT}/actuator/health" \
    "http://127.0.0.1:${BACKEND_PORT}/admin-api/system/tenant/simple-list" \
    "http://127.0.0.1:${BACKEND_PORT}/admin-api/infra/config/get-value-by-key?key=sys.health" \
    "http://127.0.0.1:${BACKEND_PORT}/v3/api-docs"; do
    code="$(curl -s -o /dev/null -w "%{http_code}" -m 2 "$url" 2>/dev/null || echo "000")"
    if [ "$code" = "200" ]; then
      echo "$url"
      return 0
    fi
  done
  return 1
}

probe_gateway_http() {
  local url code
  for url in \
    "http://127.0.0.1:${PORT}/${SLUG}/admin/" \
    "http://127.0.0.1:${PORT}/${SLUG}/2c/" \
    "http://127.0.0.1:${PORT}/${SLUG}/admin-api/system/tenant/simple-list" \
    "http://127.0.0.1:${PORT}/${SLUG}/"; do
    code="$(curl -s -o /dev/null -w "%{http_code}" -m 2 "$url" 2>/dev/null || echo "000")"
    if [ "$code" = "200" ]; then
      echo "$url"
      return 0
    fi
  done
  return 1
}

emit_dry_run() {
  local verb="$1"
  local java_bin mvn_bin
  java_bin="$(command -v java 2>/dev/null || echo "")"
  mvn_bin="$(command -v mvn 2>/dev/null || echo "")"
  node -e '
    console.log(JSON.stringify({
      dryRun: true,
      verb: process.argv[1],
      slug: process.argv[2],
      basePath: process.argv[3],
      port: Number(process.argv[4]),
      backendPort: Number(process.argv[5]),
      adminPort: Number(process.argv[6]),
      dbPort: Number(process.argv[7]),
      redisPort: Number(process.argv[8]),
      credentialsLoaded: process.argv[9] === "1",
      java: process.argv[10],
      mvn: process.argv[11]
    }));
  ' "$verb" "$SLUG" "$BASE_PATH" "$PORT" "$BACKEND_PORT" "$ADMIN_PORT" "$DB_PORT" "$REDIS_PORT" "$CREDENTIALS_LOADED" "$java_bin" "$mvn_bin"
}

do_install() {
  if [ "$DRY_RUN" = "1" ]; then
    emit_dry_run "install"
    return 0
  fi
  echo "📦 [${SLUG}] 执行标准依赖安装与初始化 (install)..."
  if [ -f "scripts/lifecycle.sh" ]; then
    bash scripts/lifecycle.sh . install
  else
    NODE_ENV=development pnpm install
  fi
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
  if [ "$DRY_RUN" = "1" ]; then
    emit_dry_run "build"
    return 0
  fi
  echo "🏗️  [${SLUG}] 执行标准全栈生产态构建 (build)..."
  command -v java >/dev/null 2>&1 || { echo "❌ 未检测到 JDK 17+ (java)" >&2; exit 1; }
  command -v mvn >/dev/null 2>&1 || { echo "❌ 未检测到 Maven (mvn)" >&2; exit 1; }

  if [ -f ".gitmodules" ] && [ -f "scripts/submodule-patches.mjs" ]; then
    node scripts/submodule-patches.mjs --apply --quiet
  fi

  if [ -d "apps/backend/server" ]; then
    (cd apps/backend && mvn -B clean install -DskipTests -pl server -am -Dspring-boot.repackage.skip=true && mvn -B package -DskipTests -pl server)
  elif [ -d "apps/backend/yudao-server" ]; then
    pnpm build:backend
  fi

  if [ -d "apps/admin" ] && [ -x "apps/admin/node_modules/.bin/vite" ]; then
    node scripts/build-admin.mjs
  fi

  if [ -d "apps/miniapp" ] && { [ -x "apps/miniapp/node_modules/.bin/uni" ] || [ -f "apps/miniapp/node_modules/.bin/vite" ]; }; then
    pnpm build:miniapp
  fi

  if [ -f "scripts/generate-gateway-config.mjs" ]; then
    GATEWAY_PORT="${PORT}" BACKEND_PORT="${BACKEND_PORT}" node scripts/generate-gateway-config.mjs
  fi
  echo "✅ 构建完成 (BUILD SUCCESS)"
}

do_start() {
  if [ "$DRY_RUN" = "1" ]; then
    emit_dry_run "start"
    return 0
  fi
  if pid="$(is_pid_running "$PID_FILE")" && probe_backend_http >/dev/null 2>&1; then
    echo "⚠️  [${SLUG}] 服务已在运行 (PID: $pid, 网关 :${PORT}, 后端 :${BACKEND_PORT})"
    return 0
  fi
  if [ -f "scripts/port-registry.cjs" ]; then
    if ! node scripts/port-registry.cjs check "${PORT}" "${SLUG:-app}"; then
      echo "❌ 启动终止: 端口 ${PORT} 存在外部项目冲突，请检查 .env.ports" >&2
      exit 1
    fi
  fi
  echo "🚀 [${SLUG}] 启动全生命周期服务 (网关 :${PORT} -> 后端 :${BACKEND_PORT}, PG :${DB_PORT}, Redis :${REDIS_PORT})..."

  if [ -f "scripts/generate-gateway-config.mjs" ]; then
    GATEWAY_PORT="${PORT}" BACKEND_PORT="${BACKEND_PORT}" node scripts/generate-gateway-config.mjs
  fi

  if ! probe_backend_http >/dev/null 2>&1; then
    if [ -f "scripts/lite-up.mjs" ]; then
      echo "  📦 后台拉起零 Docker 运行时 (lite-up.mjs)..."
      LITE_SERVER_PORT="${BACKEND_PORT}" LITE_PG_PORT="${DB_PORT}" LITE_REDIS_PORT="${REDIS_PORT}" \
        nohup node scripts/lite-up.mjs --server-port "${BACKEND_PORT}" --pg-port "${DB_PORT}" --redis-port "${REDIS_PORT}" \
        > "${LITE_LOG_FILE}" 2>&1 &
      echo $! > "$LITE_PID_FILE"
      local ok=0
      for _ in $(seq 1 90); do
        if probe_backend_http >/dev/null 2>&1; then
          ok=1
          break
        fi
        sleep 2
      done
      if [ "$ok" -ne 1 ]; then
        echo "❌ 等待后端 :${BACKEND_PORT} 就绪超时，日志尾部：" >&2
        tail -n 50 "${LITE_LOG_FILE}" >&2 || true
        exit 1
      fi
    else
      local jar_path
      jar_path="$(ls apps/backend/*/target/*.jar 2>/dev/null | grep -v 'original' | head -n 1 || true)"
      if [ -n "$jar_path" ] && [ -f "$jar_path" ]; then
        echo "  ☕ 启动 Spring Boot 后端 Jar: $jar_path (:${BACKEND_PORT})..."
        nohup java \
          --add-opens=java.base/java.nio=ALL-UNNAMED \
          --add-opens=java.base/sun.nio.ch=ALL-UNNAMED \
          --add-opens=java.base/java.lang=ALL-UNNAMED \
          --add-opens=java.base/java.lang.reflect=ALL-UNNAMED \
          -jar "$jar_path" --server.port="${BACKEND_PORT}" > logs/backend.log 2>&1 &
        echo $! > "$LITE_PID_FILE"
      else
        echo "❌ 未找到 lite-up.mjs 或可执行 Jar，请先执行 bash deploy/service.sh build" >&2
        exit 1
      fi
    fi
  fi

  local caddy_conf="deploy/gateway/caddy/${SLUG}.caddy"
  if command -v caddy >/dev/null 2>&1 && [ -f "$caddy_conf" ]; then
    echo "  🚪 启动声明式 Caddy 四平面网关 (:${PORT}, admin off)..."
    pkill -f "caddy run.*${caddy_conf}" 2>/dev/null || true
    nohup caddy run --adapter caddyfile --config "$caddy_conf" > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
  else
    if lpid="$(is_pid_running "$LITE_PID_FILE")"; then
      echo "$lpid" > "$PID_FILE"
    fi
    echo "  ℹ️ 未安装 caddy，已就绪后端直连入口 http://127.0.0.1:${BACKEND_PORT}"
  fi

  local active_pid
  active_pid="$(cat "$PID_FILE" 2>/dev/null || echo "")"
  if [ -f "scripts/port-registry.cjs" ] && [ -n "$active_pid" ]; then
    node scripts/port-registry.cjs claim "${PORT}" "${SLUG:-app}" "$active_pid" || true
    node scripts/port-registry.cjs claim "${BACKEND_PORT}" "${SLUG:-app}" "$active_pid" || true
  fi
  echo "✅ [${SLUG}] 全栈服务已拉起 (网关 :${PORT} | 后端 :${BACKEND_PORT})"
}

do_stop() {
  if [ "$DRY_RUN" = "1" ]; then
    emit_dry_run "stop"
    return 0
  fi
  echo "🛑 停止 [${SLUG}] 本项目专属全栈服务 (严格隔离端口，零误伤邻仓)..."
  if [ -f "scripts/port-registry.cjs" ]; then
    node scripts/port-registry.cjs release "${PORT}" "${SLUG:-app}" || true
    node scripts/port-registry.cjs release "${BACKEND_PORT}" "${SLUG:-app}" || true
  fi
  if pid="$(is_pid_running "$PID_FILE")"; then
    kill "$pid" 2>/dev/null || true
    rm -f "$PID_FILE"
  fi
  pkill -f "caddy run.*deploy/gateway/caddy/${SLUG}.caddy" 2>/dev/null || true

  if lpid="$(is_pid_running "$LITE_PID_FILE")"; then
    kill "$lpid" 2>/dev/null || true
    rm -f "$LITE_PID_FILE"
  fi

  if [ -f "scripts/lite-down.mjs" ]; then
    LITE_SERVER_PORT="${BACKEND_PORT}" LITE_PG_PORT="${DB_PORT}" LITE_REDIS_PORT="${REDIS_PORT}" \
      node scripts/lite-down.mjs --force 2>/dev/null || true
  fi
  echo "✅ [${SLUG}] 专属进程与运行时已干净回收"
}

do_restart() {
  if [ "$DRY_RUN" = "1" ]; then
    emit_dry_run "restart"
    return 0
  fi
  do_stop
  sleep 1
  do_start
}

do_status() {
  if [ "$DRY_RUN" = "1" ]; then
    emit_dry_run "status"
    return 0
  fi
  local gw_pid be_url gw_url state="stopped"
  gw_pid="$(is_pid_running "$PID_FILE" || true)"
  be_url="$(probe_backend_http || true)"
  gw_url="$(probe_gateway_http || true)"
  if [ -n "$be_url" ] || [ -n "$gw_url" ] || [ -n "$gw_pid" ]; then
    state="running"
    echo "🟢 [${SLUG}] 服务状态: ${state} (网关 :${PORT} | 后端 :${BACKEND_PORT} | PG :${DB_PORT} | Redis :${REDIS_PORT} | 凭据已加载=${CREDENTIALS_LOADED})"
    echo "   • 统一入口: http://127.0.0.1:${PORT}/${SLUG}/"
    echo "   • 大屏平面: http://127.0.0.1:${PORT}/${SLUG}/cockpit/"
    echo "   • B端后台:  http://127.0.0.1:${PORT}/${SLUG}/admin/"
    echo "   • C端H5:    http://127.0.0.1:${PORT}/${SLUG}/2c/"
    echo "   • API契约:  http://127.0.0.1:${PORT}/${SLUG}/v3/api-docs"
  else
    echo "🔴 [${SLUG}] 服务状态: ${state} (网关 :${PORT} | 后端 :${BACKEND_PORT} 空闲 | 凭据已加载=${CREDENTIALS_LOADED})"
  fi
  return 0
}

do_health() {
  if [ "$DRY_RUN" = "1" ]; then
    emit_dry_run "health"
    return 0
  fi
  local be_url gw_url active_port
  be_url="$(probe_backend_http || true)"
  gw_url="$(probe_gateway_http || true)"
  if [ -n "$gw_url" ]; then
    active_port="$PORT"
    node -e 'console.log(JSON.stringify({ status: "ok", slug: process.argv[1], port: Number(process.argv[2]), backendPort: Number(process.argv[3]), endpoint: process.argv[4] }));' \
      "$SLUG" "$active_port" "$BACKEND_PORT" "$gw_url"
    return 0
  elif [ -n "$be_url" ]; then
    active_port="$BACKEND_PORT"
    node -e 'console.log(JSON.stringify({ status: "ok", slug: process.argv[1], port: Number(process.argv[2]), backendPort: Number(process.argv[3]), endpoint: process.argv[4] }));' \
      "$SLUG" "$active_port" "$BACKEND_PORT" "$be_url"
    return 0
  else
    node -e 'console.log(JSON.stringify({ status: "down", slug: process.argv[1], port: Number(process.argv[2]), backendPort: Number(process.argv[3]) }));' \
      "$SLUG" "$PORT" "$BACKEND_PORT"
    return 1
  fi
}

do_logs() {
  if [ "$DRY_RUN" = "1" ]; then
    emit_dry_run "logs"
    return 0
  fi
  echo "=== Gateway Log (${LOG_FILE}) ==="
  if [ -f "${LOG_FILE}" ]; then
    tail -n 40 "${LOG_FILE}"
  else
    echo "ℹ️ 暂无网关日志 (${LOG_FILE})"
  fi
  echo "=== Runtime Log (${LITE_LOG_FILE}) ==="
  if [ -f "${LITE_LOG_FILE}" ]; then
    tail -n 40 "${LITE_LOG_FILE}"
  elif [ -f "logs/backend.log" ]; then
    tail -n 40 "logs/backend.log"
  else
    echo "ℹ️ 暂无运行时日志 (${LITE_LOG_FILE})"
  fi
}

do_deploy() {
  if [ "$DRY_RUN" = "1" ]; then
    emit_dry_run "deploy"
    return 0
  fi
  echo "🚀 [${SLUG}] 同步声明式网关配置 (deploy)..."
  if [ -f "scripts/generate-gateway-config.mjs" ]; then
    GATEWAY_PORT="${PORT}" BACKEND_PORT="${BACKEND_PORT}" node scripts/generate-gateway-config.mjs
  fi
  if [ -f "scripts/deploy-caddy.sh" ]; then
    bash scripts/deploy-caddy.sh || true
  fi
  echo "✅ 网关部署规则同步完成"
}

case "$ACTION" in
  install) do_install ;;
  build)   do_build ;;
  start)   do_start ;;
  stop)    do_stop ;;
  restart) do_restart ;;
  status)  do_status ;;
  health)  do_health ;;
  logs)    do_logs ;;
  deploy)  do_deploy ;;
  --help)  show_help ;;
  *)
    echo "❌ 未知服务操作动词: ${ACTION}" >&2
    show_help >&2
    exit 2
    ;;
esac
