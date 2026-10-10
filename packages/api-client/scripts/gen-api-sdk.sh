#!/usr/bin/env bash
set -euo pipefail
API_URL="${API_URL:-http://localhost:48080/v3/api-docs}"
OUTPUT_FILE="packages/api-client/src/generated/index.ts"
mkdir -p "$(dirname "$OUTPUT_FILE")"
echo "📡 从后端 Knife4j/OpenAPI 契约拉取并转译 TypeScript SDK: ${API_URL}"
if curl -s -f -o /tmp/openapi.json --connect-timeout 3 "$API_URL"; then
  npx --yes openapi-typescript /tmp/openapi.json --output "$OUTPUT_FILE"
  echo "✅ TS SDK 生成完毕: $OUTPUT_FILE"
else
  echo "⚠️ 后端服务离线，生成通用契约骨架..."
  echo "export interface Paths {}" > "$OUTPUT_FILE"
fi
