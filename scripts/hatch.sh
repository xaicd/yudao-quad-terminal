#!/usr/bin/env bash
# ==============================================================================
# yudao-quad-terminal 一键骨架派生孵化器 (Zero-Git-History Hatch CLI)
#
# 功能：
# 1. 免下载全量 Git 历史 (Zero Git History): 极速派生干净代码骨架至独立沙箱/目标目录；
# 2. 驱动 ProjectReactor 引擎: 自动执行项目名、中文标题、Java包名路径替换、
#    四端同源 BASE_PATH 渲染与开源底座关键字脱敏清洗；
# 3. 自动化地基准备: 支持自动执行 git init 独立首提交（或 --no-git 沙箱模式）；
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
  echo "  bash scripts/hatch.sh --target <目标路径> [--name <项目名>] [选项]"
  echo ""
  echo "参数与选项:"
  echo "  <目标工程> / --target <dir>  新项目目录名或绝对/相对路径 (如: /tmp/oa-yudao-sandbox)"
  echo "  --name <slug>                项目英文标识 (默认取目标目录名，如: oa-yudao)"
  echo "  --title <text>               项目中文系统全称 (如: \"星云进销存管理系统\")"
  echo "  --package <pkg>              Java 根包名 (默认: com.<工程名>.server)"
  echo "  --base-path <prefix>         四端统一基础路径前缀 (默认: /<工程名>)"
  echo "  --no-git                     跳过自动创建新 git 仓库与首提交"
  echo "  -h, --help                   显示帮助信息"
  echo ""
  exit 0
}

TARGET=""
PROJECT_NAME=""
TITLE=""
PKG_NAME=""
BASE_PATH_ARG=""
INIT_GIT=true

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      show_help
      ;;
    --target)
      TARGET="$2"
      shift 2
      ;;
    --target=*)
      TARGET="${1#*=}"
      shift 1
      ;;
    --name|--project)
      PROJECT_NAME="$2"
      shift 2
      ;;
    --name=*|--project=*)
      PROJECT_NAME="${1#*=}"
      shift 1
      ;;
    --title)
      TITLE="$2"
      shift 2
      ;;
    --title=*)
      TITLE="${1#*=}"
      shift 1
      ;;
    --package|--package-prefix)
      PKG_NAME="$2"
      shift 2
      ;;
    --package=*|--package-prefix=*)
      PKG_NAME="${1#*=}"
      shift 1
      ;;
    --base-path)
      BASE_PATH_ARG="$2"
      shift 2
      ;;
    --base-path=*)
      BASE_PATH_ARG="${1#*=}"
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
if [[ -z "$PROJECT_NAME" ]]; then
  PROJECT_NAME=$(basename "$TARGET_DIR")
fi

if [[ -z "$TITLE" ]]; then
  TITLE="$PROJECT_NAME"
fi

if [[ -z "$PKG_NAME" ]]; then
  PKG_NAME="com.${PROJECT_NAME//-/_}.server"
fi

if [[ -z "$BASE_PATH_ARG" ]]; then
  BASE_PATH_ARG="/${PROJECT_NAME}"
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "$BANNER"
echo "🚀 开始四端企业级项目派生 (Zero Git History Hatching)..."
echo "   目标路径: $TARGET_DIR"
echo "   工程名称: $PROJECT_NAME"
echo "   系统标题: $TITLE"
echo "   Java包名: $PKG_NAME"
echo "   统一路径: $BASE_PATH_ARG/{2c,admin,admin-api,app-api,v3/api-docs}"
echo ""

# 驱动 ProjectReactor (涵盖无污染沙箱复制、蓝图模板渲染、白标置换与网关配置生成)
node "$SCRIPT_DIR/project-reactor.mjs" \
  --target "$TARGET_DIR" \
  --name "$PROJECT_NAME" \
  --title "$TITLE" \
  --package "$PKG_NAME" \
  --base-path "$BASE_PATH_ARG"

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
echo "  BasePath: $BASE_PATH_ARG"
echo ""
echo "  👉 启动指南:"
echo "     1. 后端 (Spring Boot): cd $TARGET_DIR/apps/backend/server && mvn spring-boot:run"
echo "     2. 管理端 (Vue3):      cd $TARGET_DIR/apps/admin && pnpm dev"
echo "     3. 小程序 (Uni-App):   cd $TARGET_DIR/apps/miniapp && pnpm dev:mp-weixin"
echo "     4. 移动端 (Expo):      cd $TARGET_DIR/apps/app && pnpm start"
echo "================================================================"
