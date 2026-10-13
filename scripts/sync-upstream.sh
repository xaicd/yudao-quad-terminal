#!/usr/bin/env bash
# ==============================================================================
# sync-upstream.sh — Yudao Quad-Terminal 开源上游多端原子同步工具
#
# 架构公理：
# 1. 绝不写死源码：基座主仓仅维护 CMMI 规范、胶水 SDK、跨端配置与子模块指针；
# 2. 官方源头持续同步：一键拉取 yudao-cloud、yudao-ui-admin-vue3、yudao-mall-uniapp 官方最新 commit；
# 3. 干净版本治理：更新后在主仓以单个原子 Commit 记录子模块 SHA，杜绝代码漂移。
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "======================================================================"
echo "📡 [Upstream Sync] 启动 Yudao 开源多端上游同步流水线"
echo "工作目录: $ROOT_DIR"
echo "======================================================================"

# 1. 检查并初始化子模块
echo ">>> [1/3] 检查并初始化 Git Submodules ..."
git submodule update --init --recursive

# 2. 逐一拉取各端最新代码
echo ">>> [2/3] 从各官方源头拉取最新发布/特性提交 ..."

if [ -d "apps/backend/.git" ] || [ -f "apps/backend/.git" ]; then
  echo "  ☕ 正在同步 apps/backend (yudao-cloud) ..."
  (cd apps/backend && git fetch origin master-jdk17 && git checkout master-jdk17 && git pull origin master-jdk17) || echo "  ⚠️ backend 同步跳过或需要手动合并"
fi

if [ -d "apps/admin/.git" ] || [ -f "apps/admin/.git" ]; then
  echo "  🖥️ 正在同步 apps/admin (yudao-ui-admin-vue3) ..."
  (cd apps/admin && git fetch origin master && git checkout master && git pull origin master) || echo "  ⚠️ admin 同步跳过或需要手动合并"
fi

if [ -d "apps/miniapp/.git" ] || [ -f "apps/miniapp/.git" ]; then
  echo "  📱 正在同步 apps/miniapp (yudao-mall-uniapp) ..."
  (cd apps/miniapp && git fetch origin master && git checkout master && git pull origin master) || echo "  ⚠️ miniapp 同步跳过或需要手动合并"
fi

# 3. 汇总当前各端版本指纹
echo ">>> [3/3] 汇总最新子模块版本指针:"
git submodule status

echo "======================================================================"
echo "✅ 上游源头同步已完成！"
echo "💡 提示: 若需固化新版本指针，执行: git add apps/ .gitmodules && git commit -m 'chore: bump upstream yudao submodules'"
echo "======================================================================"
