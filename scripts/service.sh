#!/usr/bin/env bash
# ==============================================================================
# scripts/service.sh — Thin Forwarder to Canonical Layer-B deploy/service.sh
# Supports all 8 standard verbs: install | build | start | stop | restart | status | health | logs
# ==============================================================================
set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJ_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

exec bash "${PROJ_ROOT}/deploy/service.sh" "${@:-status}"
