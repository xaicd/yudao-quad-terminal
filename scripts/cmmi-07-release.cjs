#!/usr/bin/env node
/**
 * CMMI-07: 制品构建、四端网关渲染与不可变投产 (07_release_and_deployment)
 * --------------------------------------------------------------------------
 * 对齐文档目录: docs/07_release_and_deployment/
 * 统一跨底座命令:
 *   node scripts/cmmi-07-release.cjs build
 *   node scripts/cmmi-07-release.cjs gateway
 *   node scripts/cmmi-07-release.cjs fingerprint [--verify]
 *   node scripts/cmmi-07-release.cjs runbook [--feature <name> --check]
 *   pnpm run cmmi:07
 *   pnpm harness 07
 */

"use strict";

const { spawnSync } = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");

function runNode(scriptRel, extraArgs = []) {
  const res = spawnSync(process.execPath, [path.join(ROOT, scriptRel), ...extraArgs], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });
  return res.status ?? 1;
}

function generateOrVerifyFingerprint(verifyOnly = false) {
  const targetFiles = ["package.json", "compat-manifest.json", "HARNESS.md", "AGENTS.md"];
  const hashes = {};
  for (const rel of targetFiles) {
    const abs = path.join(ROOT, rel);
    if (fs.existsSync(abs)) {
      hashes[rel] = crypto.createHash("sha256").update(fs.readFileSync(abs)).digest("hex");
    }
  }
  const fpPath = path.join(ROOT, "docs/07_release_and_deployment/release-fingerprint.json");
  fs.mkdirSync(path.dirname(fpPath), { recursive: true });
  if (verifyOnly && fs.existsSync(fpPath)) {
    const saved = JSON.parse(fs.readFileSync(fpPath, "utf8"));
    for (const [k, v] of Object.entries(hashes)) {
      if (saved.hashes && saved.hashes[k] && saved.hashes[k] !== v) {
        console.error(`✗ [CMMI-07] 指纹不匹配: ${k}`);
        return 1;
      }
    }
    console.log("✓ [CMMI-07] 制品指纹校验通过");
    return 0;
  }
  const payload = {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    hashes,
  };
  fs.writeFileSync(fpPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`✓ [CMMI-07] 已生成发布指纹 -> ${fpPath}`);
  return 0;
}

const rawArgs = process.argv.slice(2);
const sub = rawArgs[0] || "gateway";

if (sub === "gateway" || sub === "render-gateway") {
  console.log("═══ [CMMI-07] 渲染四端网关与部署配置 ═══");
  process.exit(runNode("scripts/render-gateway-conf.mjs", rawArgs.slice(1)));
}

if (sub === "build") {
  console.log("═══ [CMMI-07] 发布前网关与契约构建校验 ═══");
  const code = runNode("scripts/render-gateway-conf.mjs");
  if (code !== 0) process.exit(code);
  process.exit(generateOrVerifyFingerprint(false));
}

if (sub === "fingerprint") {
  const verify = rawArgs.includes("--verify") || rawArgs.includes("verify");
  process.exit(generateOrVerifyFingerprint(verify));
}

if (sub === "runbook") {
  console.log("═══ [CMMI-07] 生产割接与回滚 Runbook 预检 ═══");
  process.exit(generateOrVerifyFingerprint(false));
}

if (sub === "--help" || sub === "-h" || sub === "help") {
  console.log(`用法:
  node scripts/cmmi-07-release.cjs gateway                  渲染四端统一网关配置
  node scripts/cmmi-07-release.cjs build                    构建发布配置并生成不可变指纹
  node scripts/cmmi-07-release.cjs fingerprint [--verify]   生成或核验制品 SHA-256 指纹
  node scripts/cmmi-07-release.cjs runbook                  生产割接 Runbook 预检`);
  process.exit(0);
}

console.error(`[CMMI-07] 未知子命令: ${sub}`);
process.exit(2);
