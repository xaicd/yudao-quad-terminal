#!/usr/bin/env node
/**
 * scripts/project-init.cjs
 *
 * 跨底座统一的零污染项目初始化与沙箱孵化入口（与 cooliebase-all/scripts/project-init.cjs 100% 同名同参数契约）
 *
 * 支持用法：
 *   node scripts/project-init.cjs --name <slug> --title "<中文名>" --target /tmp/<slug>-sandbox \
 *     [--base-path /<slug>] [--package com.<slug>.server] \
 *     [--gateway-port 48091] [--backend-port 48281] [--admin-port 5181] [--miniapp-port 5182] [--db-port 55436] [--redis-port 63801]
 *   node scripts/project-init.cjs --name <slug> --title "<中文名>" --in-place
 *   pnpm run project:init -- --name <slug> --title "<中文名>" --target /tmp/<slug>-sandbox
 */

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const VALUE_FLAGS = new Set([
  "--target",
  "--name",
  "--project",
  "--title",
  "--title-file",
  "--group-id",
  "--package",
  "--package-prefix",
  "--artifact-id",
  "--base-path",
  "--port",
  "--backend-port",
  "--gateway-port",
  "--admin-port",
  "--miniapp-port",
  "--db-port",
  "--pg-port",
  "--redis-port",
]);

function resolveInitTargetDir(argv, cwd = process.cwd()) {
  let positionalTarget = null;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--target" && argv[i + 1]) return path.resolve(cwd, argv[++i]);
    if (a.startsWith("--target=")) return path.resolve(cwd, a.slice("--target=".length));
    if (a === "--in-place") return path.resolve(cwd);
    if (VALUE_FLAGS.has(a)) {
      i++;
      continue;
    }
    if (!a.startsWith("-") && !positionalTarget) {
      positionalTarget = path.resolve(cwd, a);
    }
  }
  return positionalTarget;
}

/**
 * 显式剥离母本历史归档、内部回灌审计、历史 DAR/ADR 与瞬态运行时快照，
 * 仅保留干净的 CMMI 00..09 通用过程资产模板与 docs/ontology/ 活体本体。
 */
function scrubMotherBlueprintDocs(targetDir) {
  if (!targetDir || !fs.existsSync(targetDir)) return;

  const stripTargets = [
    path.join(targetDir, "docs", "specs", "archive"),
    path.join(targetDir, "docs", "architecture", "archive"),
    path.join(targetDir, "docs", "architecture", "artifacts"),
    path.join(targetDir, "docs", "artifacts"),
    path.join(targetDir, "docs", "audit"),
    path.join(targetDir, "docs", "07_release", "releases"),
    path.join(targetDir, "docs", "00_meta_standards", "blueprint-backport-audit.md"),
    path.join(targetDir, "docs", "architecture", "OPEN-SOURCE-TRACKING-MANUAL.md"),
    path.join(targetDir, "docs", "architecture", "CURRENT-PROGRESS.md"),
  ];

  for (const p of stripTargets) {
    try {
      if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
    } catch {}
  }

  // 移除旧版重复目录并清空母本历史 DAR / ADR Markdown，仅保留唯一标准目录骨架 .gitkeep
  try {
    fs.rmSync(path.join(targetDir, "docs", "01_management", "dar-decision-records"), { recursive: true, force: true });
  } catch {}
  const cleanMdDirs = [
    path.join(targetDir, "docs", "01_management", "dar"),
    path.join(targetDir, "docs", "03_design", "adr"),
  ];
  for (const dir of cleanMdDirs) {
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".md")) {
        try {
          fs.rmSync(path.join(dir, entry.name), { force: true });
        } catch {}
      }
    }
    const keepFile = path.join(dir, ".gitkeep");
    if (!fs.existsSync(keepFile)) {
      fs.writeFileSync(keepFile, "", "utf8");
    }
  }

  // 递归清理 docs/ 下残留的 *-last.json / *-latest.json 瞬态文件
  const docsRoot = path.join(targetDir, "docs");
  if (fs.existsSync(docsRoot)) {
    const cleanTransient = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          cleanTransient(full);
        } else if (entry.isFile() && (/-(last|latest)\.json$/i.test(entry.name))) {
          try {
            fs.rmSync(full, { force: true });
          } catch {}
        }
      }
    };
    cleanTransient(docsRoot);

    const archDir = path.join(docsRoot, "architecture");
    try {
      if (fs.existsSync(archDir) && fs.readdirSync(archDir).length === 0) {
        fs.rmdirSync(archDir);
      }
    } catch {}

    const specsKeep = path.join(docsRoot, "specs", ".gitkeep");
    fs.mkdirSync(path.dirname(specsKeep), { recursive: true });
    if (!fs.existsSync(specsKeep)) {
      fs.writeFileSync(specsKeep, "", "utf8");
    }
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  let hasPositionalTarget = false;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (VALUE_FLAGS.has(a)) {
      i++;
      continue;
    }
    if (!a.startsWith("-")) {
      hasPositionalTarget = true;
      break;
    }
  }

  const hasTarget =
    hasPositionalTarget || args.some((a) => a === "--target" || a.startsWith("--target="));
  const hasInPlace = args.includes("--in-place");
  const hasHelp = args.includes("--help") || args.includes("-h");

  // 若未传 --target（含位置参数）且未传 --in-place/--help，兼容 cooliebase-all 默认原地重构语义
  const finalArgs = !hasTarget && !hasInPlace && !hasHelp ? ["--in-place", ...args] : args;

  const res = spawnSync(
    process.execPath,
    [path.join(__dirname, "project-reactor.mjs"), ...finalArgs],
    { stdio: "inherit", cwd: process.cwd(), env: process.env }
  );

  if (res.status === 0 && !hasHelp && !finalArgs.includes("--dry-run")) {
    const resolvedTarget = resolveInitTargetDir(finalArgs, process.cwd());
    if (resolvedTarget && fs.existsSync(resolvedTarget)) {
      scrubMotherBlueprintDocs(resolvedTarget);
    }
  }

  process.exit(res.status ?? 1);
}

module.exports = {
  scrubMotherBlueprintDocs,
  resolveInitTargetDir,
};
