#!/usr/bin/env bash
# ==============================================================================
# yudao-quad-terminal 一键骨架派生孵化器 (Zero-Git-History Hatch CLI)
#
# 功能：
# 1. 免下载全量 Git 历史 (Zero Git History): 通过 degit / shallow clone / tarball
#    极速拉取干净代码骨架，规避冗余历史包；
# 2. 驱动 ProjectReactor 引擎: 自动执行项目名、中文标题、Java包名路径替换与
#    开源底座关键字脱敏清洗；
# 3. 自动化地基准备: 自动执行 git init 独立首提交；
# ==============================================================================

set -eo pipefail

BANNER="
   ___                   _   _ _   _          _   
  | _ \_  _ ___ _  _ (_) / /_\ | | |  | \| | _____ _| |_ 
  |   / || / _ \ || | | | / _ \| | |  | .\` |/ -_) \ /  _|
  |_|_\\\\_,_\\___/\\_,_| |_|/_/ \_\_|_|  |_|\_|\___/_\_\\\\__|
    Zero-Git-History Quad-Terminal Hatch Engine (Spring Boot + Vue3 + UniApp + Expo)
"

function show_help() {
  echo "$BANNER"
  echo "用法:"
  echo "  bash scripts/hatch.sh <目标工程名或路径> [选项]"
  echo ""
  echo "参数:"
  echo "  <目标工程>         新项目目录名或绝对/相对路径 (如: my-app)"
  echo ""
  echo "选项:"
  echo "  --title <text>     项目中文系统全称 (如: \"星云进销存管理系统\")"
  echo "  --package <pkg>    Java 根包名 (默认: com.<工程名>.server)"
  echo "  --no-git           跳过自动创建新 git 仓库与首提交"
  echo "  -h, --help         显示帮助信息"
  echo ""
  exit 0
}

TARGET=""
TITLE=""
PKG_NAME=""
INIT_GIT=true

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      show_help
      ;;
    --title)
      TITLE="$2"
      shift 2
      ;;
    --title=*)
      TITLE="${1#*=}"
      shift 1
      ;;
    --package)
      PKG_NAME="$2"
      shift 2
      ;;
    --package=*)
      PKG_NAME="${1#*=}"
      shift 1
      ;;
    --no-git)
      INIT_GIT=false
      shift 1
      ;;
    -*)
      echo "❌ 未知参数: $1"
      show_help
      ;;
    *)
      if [[ -z "$TARGET" ]]; then
        TARGET="$1"
        shift 1
      else
        echo "❌ 多余位置参数: $1"
        exit 1
      fi
      ;;
  esac
done

if [[ -z "$TARGET" ]]; then
  echo "$BANNER"
  echo "❌ 缺少目标工程路径！"
  echo "用法: bash scripts/hatch.sh <目标工程名或路径> [--title \"系统标题\"]"
  exit 1
fi

TARGET_DIR=$(node -e "const path = require('path'); console.log(path.resolve(process.cwd(), process.argv[1]))" "$TARGET")
PROJECT_NAME=$(basename "$TARGET_DIR")

if [[ -z "$TITLE" ]]; then
  TITLE="$PROJECT_NAME"
fi

if [[ -z "$PKG_NAME" ]]; then
  PKG_NAME="com.${PROJECT_NAME//-/_}.server"
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "$BANNER"
echo "🚀 开始四端企业级项目派生 (Zero Git History Hatching)..."
echo "   目标路径: $TARGET_DIR"
echo "   工程名称: $PROJECT_NAME"
echo "   系统标题: $TITLE"
echo "   Java包名: $PKG_NAME"
echo ""

# 驱动 ProjectReactor
node "$SCRIPT_DIR/project-reactor.mjs" --target "$TARGET_DIR" --name "$PROJECT_NAME" --title "$TITLE" --package "$PKG_NAME"

# 检查/补充独立 Git 仓库
if [[ "$INIT_GIT" = true && ! -d "$TARGET_DIR/.git" ]]; then
  echo "📦 初始化客户专属 Git 仓库并创建首个基线快照..."
  (
    cd "$TARGET_DIR"
    git init -q
    git config user.email "bot@local" 2>/dev/null || true
    git config user.name "HatchBot" 2>/dev/null || true
    git add -A
    git commit -q -m "feat: 派生自企业级四端中台底座 ($PROJECT_NAME)"
  )
fi

echo ""
echo "================================================================"
echo "🎉 恭喜！四端新业务工程派生成功！"
echo "================================================================"
echo "  工程路径: $TARGET_DIR"
echo "  工程名:   $PROJECT_NAME"
echo "  包名:     $PKG_NAME"
echo ""
echo "  👉 启动指南:"
echo "     1. 后端 (Spring Boot): cd $TARGET_DIR/apps/backend/server && mvn spring-boot:run"
echo "     2. 管理端 (Vue3):      cd $TARGET_DIR/apps/admin && pnpm dev"
echo "     3. 小程序 (Uni-App):   cd $TARGET_DIR/apps/miniapp && pnpm dev:mp-weixin"
echo "     4. 移动端 (Expo):      cd $TARGET_DIR/apps/app && pnpm start"
echo "================================================================"
