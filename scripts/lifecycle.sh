#!/usr/bin/env bash
# ==============================================================================
# yudao-quad-terminal - scripts/lifecycle.sh
# 全方位独立生命周期方案执行器 (Install -> Dev -> Test -> Build -> Start)
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="${1:-$ROOT_DIR}"
ACTION="${2:-all}"

cd "$TARGET_DIR"

case "$ACTION" in
  install|init)
    echo "📦 [yudao-quad-terminal] 阶段 1: 全方位初始化与依赖预热..."
    command -v java >/dev/null 2>&1 || (echo "❌ 缺少 JDK 17+" && exit 1)
    command -v mvn >/dev/null 2>&1 || (echo "❌ 缺少 Maven 3.8+" && exit 1)
    command -v pnpm >/dev/null 2>&1 || (echo "❌ 缺少 pnpm" && exit 1)
    
    # 确保腾讯云 Maven 镜像
    mkdir -p ~/.m2
    if [ ! -f ~/.m2/settings.xml ]; then
      cat << 'EOF_M2' > ~/.m2/settings.xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
  <mirrors>
    <mirror>
      <id>tencentyun</id>
      <name>TencentCloud Maven Mirror</name>
      <url>http://mirrors.tencentyun.com/nexus/repository/maven-public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
</settings>
EOF_M2
    fi
    
    pnpm install
    if [ -d "apps/backend/server" ]; then
      (cd apps/backend/server && mvn clean test-compile -DskipTests)
    elif [ -d "apps/backend/yudao-server" ]; then
      (cd apps/backend && mvn clean test-compile -DskipTests -pl yudao-server -am)
    fi
    echo "  ✅ 初始化安装完成"
    ;;

  dev)
    echo "🚀 [yudao-quad-terminal] 阶段 2: 启动全栈开发模式 (统一前后端并发)..."
    exec node scripts/run-all.cjs
    ;;

  test)
    echo "🧪 [yudao-quad-terminal] 阶段 3: 全栈验证（自有脚本单测 + 类型 + 后端单测 + 就绪自检）..."

    echo "  ▸ 自有脚本单元测试"
    pnpm test:scripts

    echo "  ▸ 多端类型检查"
    pnpm typecheck

    echo "  ▸ 后端单测（H2 + 内嵌 Jedis 真替身，实测约 72s）"
    if [ -d "apps/backend/server" ]; then
      (cd apps/backend/server && mvn -B test)
    elif [ -d "apps/backend/yudao-server" ]; then
      (cd apps/backend && mvn -B test -pl yudao-server -am)
    fi

    echo "  ▸ 全栈就绪自检"
    node scripts/run-all.cjs --check

    echo "  ✅ 测试验证完成（脚本单测 + 类型 0 报错 + 后端单测 全绿）"
    ;;

  build)
    echo "🏗️ [yudao-quad-terminal] 阶段 4: 生产构建 (Spring Boot Fat Jar + Vue3 Dist)..."
    if [ -d "apps/backend/server" ]; then
      (cd apps/backend/server && mvn clean package -DskipTests)
      echo "  ✅ Spring Boot Jar 构建完成: apps/backend/server/target/yudao-server.jar"
    elif [ -d "apps/backend/yudao-server" ]; then
      # ⚠️ 必须两步构建：模块 -server 的 pom 都绑定了 spring-boot repackage 且无 exec classifier，
      # 若用单条 `package -pl yudao-server -am`，模块 jar 会先被 repackage 成 fat jar，
      # 再被嵌进 yudao-server 的 BOOT-INF/lib → 形成「fat jar 套 fat jar」，
      # 类落在嵌套 jar 的 BOOT-INF/classes 下，模块 bean 与 MyBatis Mapper 全部扫描不到，应用起不来。
      # 正确做法：依赖模块装成「普通库 jar」（跳过 repackage），再单独对 yudao-server repackage。
      (cd apps/backend && mvn -B clean install -DskipTests -pl yudao-server -am -Dspring-boot.repackage.skip=true) \
        && (cd apps/backend && mvn -B package -DskipTests -pl yudao-server)
      echo "  ✅ Spring Boot Jar 构建完成: apps/backend/yudao-server/target/yudao-server.jar"
    fi
    if [ -d "apps/admin" ]; then
      # 显式 SKIP 而非 `|| true` 假绿：前端构建需要子模块自己的依赖与构建工具
      if [ -x "apps/admin/node_modules/.bin/vite" ]; then
        pnpm --filter yudao-ui-admin-vue3 build:local
        echo "  ✅ 前端静态产物构建完成: apps/admin/dist"
      else
        echo "  ⏭️  SKIP 前端构建: apps/admin 缺依赖/构建工具（cd apps/admin && pnpm install）"
      fi
    fi
    ;;

  start)
    echo "⚡ [yudao-quad-terminal] 阶段 5: 启动生产运行物..."
    JAR_PATH=""
    if [ -f "apps/backend/server/target/yudao-server.jar" ]; then
      JAR_PATH="apps/backend/server/target/yudao-server.jar"
    elif [ -f "apps/backend/yudao-server/target/yudao-server.jar" ]; then
      JAR_PATH="apps/backend/yudao-server/target/yudao-server.jar"
    fi

    if [ -n "$JAR_PATH" ]; then
      echo "  ☕ 启动后端生产运行时: $JAR_PATH"
      exec java -jar "$JAR_PATH" --spring.profiles.active=prod
    else
      echo "❌ 未检测到可执行 Jar 包，请先执行: bash scripts/lifecycle.sh . build"
      exit 1
    fi
    ;;

  all|*)
    echo "🌟 [yudao-quad-terminal] 全栈一键并发拉起与就绪自验..."
    exec node scripts/run-all.cjs
    ;;
esac
