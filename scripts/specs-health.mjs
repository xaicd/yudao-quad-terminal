#!/usr/bin/env node
/**
 * scripts/specs-health.mjs
 *
 * 规格健康度检查（blocking 门禁用）
 *
 * 校验三类问题：
 * 1. **资产齐备性**：每份规格应有 16 份资产（brief + 15 份展开文档）
 * 2. **Brief 完备性**：title/domain/goal 非空，roles≥2、stories≥3、acceptance≥2、invariants≥1、tasks≥3
 * 3. **占位符残留**：brief.json 里仍有「待填」等脚手架占位文本 → 视为假资产（违反 No Artifact, No Done）
 *
 * 用法：
 *   node scripts/specs-health.mjs [--spec <name>] [--json]
 *   exit 0 = 全部健康；1 = 存在不健康规格；2 = 用法错误
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const requireFromRepo = createRequire(path.join(ROOT, "package.json"));
const { listAllSpecs } = requireFromRepo("./scripts/lib/spec-resolver.cjs");

const EXPECTED_ASSETS = [
  "brief.json",
  "spec.md",
  "requirements.md",
  "plan.md",
  "design.md",
  "tasks.md",
  "checklist.md",
  "research.md",
  "selection.md",
  "runbook.json",
  "evidence.json",
  "deployment.md",
  "bugs.md",
  "prototype.md",
  "spec.json",
  "feature.json",
  // 与 scripts/speckit.cjs 的 expectedDocs 保持同一清单（16 份）
];

const BRIEF_RULES = [
  { key: "title", ok: (v) => typeof v === "string" && v.trim().length > 0, msg: "title 为空" },
  { key: "domain", ok: (v) => typeof v === "string" && v.trim().length > 0, msg: "domain 为空" },
  { key: "goal", ok: (v) => typeof v === "string" && v.trim().length > 0, msg: "goal 为空" },
  { key: "roles", ok: (v) => Array.isArray(v) && v.length >= 2, msg: "roles 需 ≥2" },
  { key: "stories", ok: (v) => Array.isArray(v) && v.length >= 3, msg: "stories 需 ≥3" },
  { key: "acceptance", ok: (v) => Array.isArray(v) && v.length >= 2, msg: "acceptance 需 ≥2" },
  { key: "invariants", ok: (v) => Array.isArray(v) && v.length >= 1, msg: "invariants 需 ≥1" },
  { key: "tasks", ok: (v) => Array.isArray(v) && v.length >= 3, msg: "tasks 需 ≥3" },
];

const PLACEHOLDER = /待填|TODO|TBD|<!--\s*\.\.\.\s*-->/;

function inspectSpec(spec) {
  const issues = [];

  for (const asset of EXPECTED_ASSETS) {
    if (!fs.existsSync(path.join(spec.path, asset))) issues.push(`缺少资产 ${asset}`);
  }

  const briefPath = path.join(spec.path, "brief.json");
  if (fs.existsSync(briefPath)) {
    let brief = null;
    try {
      brief = JSON.parse(fs.readFileSync(briefPath, "utf8"));
    } catch (e) {
      issues.push(`brief.json 解析失败: ${e.message}`);
    }
    if (brief) {
      for (const rule of BRIEF_RULES) {
        if (!rule.ok(brief[rule.key])) issues.push(`brief.${rule.key} 不合规：${rule.msg}`);
      }
      if (PLACEHOLDER.test(JSON.stringify(brief))) {
        issues.push("brief.json 仍含占位符（待填/TODO）—— 属假资产");
      }
    }
  }

  return {
    name: spec.name,
    domain: spec.domain,
    type: spec.type,
    archived: spec.isArchived,
    path: path.relative(ROOT, spec.path),
    healthy: issues.length === 0,
    issues,
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log("用法: node scripts/specs-health.mjs [--spec <name>] [--json]");
    process.exit(0);
  }
  const json = args.includes("--json");
  const only = args.includes("--spec") ? args[args.indexOf("--spec") + 1] : null;

  let all = listAllSpecs();
  if (only) all = all.filter((s) => s.name === only);
  if (only && all.length === 0) {
    console.error(`❌ 找不到规格: ${only}`);
    process.exit(2);
  }
  if (all.length === 0) {
    console.error("❌ docs/specs 下没有任何规格");
    process.exit(2);
  }

  const results = all.map(inspectSpec);
  const unhealthy = results.filter((r) => !r.healthy);

  if (json) {
    console.log(JSON.stringify({ healthy: unhealthy.length === 0, total: results.length, unhealthyCount: unhealthy.length, specs: results }, null, 2));
  } else {
    console.log("================================================================");
    console.log(`🩺 规格健康度（${results.length} 份，其中 ${unhealthy.length} 份不健康）`);
    console.log("================================================================");
    for (const r of results) {
      console.log(`${r.healthy ? "✅" : "❌"} ${r.name.padEnd(24)} ${r.domain.padEnd(10)} ${r.type.padEnd(12)} ${r.archived ? "已归档" : "活跃"}`);
      for (const i of r.issues) console.log(`      - ${i}`);
    }
    console.log("================================================================");
    console.log(unhealthy.length === 0 ? "✅ 全部规格健康" : `❌ ${unhealthy.length} 份规格存在缺口`);
  }

  process.exit(unhealthy.length === 0 ? 0 : 1);
}

main();
