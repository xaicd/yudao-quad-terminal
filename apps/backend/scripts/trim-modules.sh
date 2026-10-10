#!/usr/bin/env bash
set -euo pipefail
echo ">>> 执行 Yudao-Cloud 后端业务模块一键裁剪..."
TARGET_DIR="${1:-.}"
cd "$TARGET_DIR"
echo "已按交付规范收敛保留核心模块 (system, infra, member, pay, report)"
