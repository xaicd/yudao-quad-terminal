#!/usr/bin/env bash
# ==============================================================================
# start-local-stack.sh — 一键拉起 Yudao 本地开发环境容器 (MySQL 8.0 + Redis 7.2)
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 [1/3] 检查本地轻量容器编排环境..."

# 检查 Docker 是否运行
if ! docker info >/dev/null 2>&1; then
  echo "❌ 错误: 未检测到运行中的 Docker 引擎。请先启动 Docker Desktop 或 Docker 服务！" >&2
  exit 1
fi

echo "📦 [2/3] 启动本地 MySQL 8.0 与 Redis 7.2 容器..."
(cd "$ROOT_DIR" && docker compose -f docker-compose.local.yml up -d)

echo "⏳ [3/3] 等待 MySQL 与 Redis 容器就绪..."
for i in {1..30}; do
  if docker exec yudao-mysql-dev mysqladmin ping -h localhost -u root -proot >/dev/null 2>&1; then
    echo "  ✅ MySQL 8.0 数据库已就绪 (端口 3306, 数据库 ruoyi-vue-pro, 初始账号 admin/admin123)"
    break
  fi
  sleep 1
done

if docker exec yudao-redis-dev redis-cli ping >/dev/null 2>&1; then
  echo "  ✅ Redis 7.2 缓存已就绪 (端口 6379, 免密)"
fi

echo ""
echo "🎉 Yudao 本地开发环境已 100% 就绪！现在您可以执行:"
echo "  • 启动后端: pnpm dev:backend"
echo "  • 启动管理端: pnpm dev:admin"
echo "  • 启动小程序: pnpm dev:miniapp"
echo "  • 启动原生App: pnpm dev:app"
