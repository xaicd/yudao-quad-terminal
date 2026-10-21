#!/usr/bin/env node
/**
 * scripts/trim-modules.mjs
 *
 * Yudao-Cloud 后端模块物理裁剪工具（确定性 CLI）
 *
 * 取代 .agents/skills/yudao-cloud-bootstrap/SKILL.md 里只存在于文档中的
 * `scripts/trim-modules.sh`（该文件从未落盘）与三个人肉 bash 模板。
 *
 * 三处同步落地：
 *   1. 物理删除 apps/backend/yudao-module-<id>/
 *   2. 从 apps/backend/pom.xml 移除/补回 <module> 节点
 *   3. 注释/反注释 apps/backend/yudao-server/pom.xml 的模块依赖
 *
 * ⚠️ apps/backend 在本仓是 git submodule（上游 YunaiV/yudao-cloud，branch master-jdk17）：
 *    裁剪是「本地消费态」操作，结果会被 `git submodule update` / `scripts/sync-upstream.sh` 还原；
 *    因此备份一律写到主仓 .commandcode/backups/，绝不在子模块工作树里留 .bak 污染。
 *    逆操作：node scripts/trim-modules.mjs --recover --yes
 *
 * 用法：
 *   node scripts/trim-modules.mjs --profile mini --dry-run
 *   node scripts/trim-modules.mjs --keep system,infra,member,pay,report --apply --yes
 *   node scripts/trim-modules.mjs --remove mes,hrm --dry-run
 *   node scripts/trim-modules.mjs --check --profile full
 *   node scripts/trim-modules.mjs --profile lite --sql
 *
 * 退出码：0 = 通过/成功；1 = --check 发现漂移；2 = 用法或校验错误
 */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  MODULES,
  MODULE_IDS,
  PROFILES,
  BACKEND_DIR,
  ROOT_POM,
  SERVER_POM,
  buildPurgeSql,
  expandClosure,
  findConflicts,
  getModule,
  resolveProfile,
  summarize,
  validateKeep,
} from "./lib/module-catalog.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const EXIT_OK = 0;
const EXIT_DRIFT = 1;
const EXIT_USAGE = 2;

/**
 * apps/backend 在本仓是 git submodule（上游 YunaiV/yudao-cloud），
 * 因此裁剪结果只是「本地消费态」：submodule update / sync-upstream.sh 都会把它还原。
 * 备份一律写到主仓 .commandcode/ 下，绝不在子模块工作树里留 .bak 污染。
 */
const BACKUP_DIR = ".commandcode/backups";

function backendSubmoduleInfo() {
  const gm = path.join(ROOT, ".gitmodules");
  if (!fs.existsSync(gm)) return null;

  const text = fs.readFileSync(gm, "utf8");
  const blocks = text.split(/^\[submodule\s+/m).slice(1);
  for (const block of blocks) {
    const p = (block.match(/path\s*=\s*(\S+)/) || [])[1];
    if (p !== BACKEND_DIR) continue;
    return {
      path: p,
      url: (block.match(/url\s*=\s*(\S+)/) || [])[1] || "(unknown)",
      branch: (block.match(/branch\s*=\s*(\S+)/) || [])[1] || "(detached HEAD)",
    };
  }
  return null;
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

// ---------------------------------------------------------------------------
// 参数解析
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const has = (flag) => args.includes(flag);
  const value = (flag) => {
    const index = args.indexOf(flag);
    return index >= 0 && index + 1 < args.length ? args[index + 1] : undefined;
  };
  const list = (flag) => {
    const raw = value(flag);
    if (!raw) return undefined;
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  return {
    profile: value("--profile"),
    keep: list("--keep"),
    remove: list("--remove"),
    dryRun: has("--dry-run"),
    apply: has("--apply"),
    check: has("--check"),
    activate: has("--activate"),
    sql: has("--sql"),
    json: has("--json"),
    yes: has("--yes"),
    force: has("--force"),
    recover: has("--recover"),
    help: has("--help") || has("-h"),
  };
}

function printHelp() {
  console.log(`Yudao-Cloud 后端模块裁剪工具

用法:
  node scripts/trim-modules.mjs --profile <mini|lite|full> [--dry-run|--apply]
  node scripts/trim-modules.mjs --keep  system,infra,member,pay,report [--apply --yes]
  node scripts/trim-modules.mjs --remove mes,hrm,fms [--dry-run]
  node scripts/trim-modules.mjs --check  --profile <mini|lite|full>
  node scripts/trim-modules.mjs --profile lite --sql

选项:
  --profile <name>  预设装配档: ${Object.keys(PROFILES).join(" / ")}
  --keep <a,b,c>    显式保留清单（会自动补齐强依赖）
  --remove <a,b,c>  显式剔除清单（与保留模块强依赖冲突时拒绝执行）
  --dry-run         只打印计划，不落地（未给 --apply 时默认行为）
  --apply           真正执行删除与 pom 改写
  --activate        同时把保留模块在 yudao-server 的依赖反注释启用
                    （默认只保证依赖块存在；本仓约定『默认注释，保证编译速度』）
  --check           校验磁盘现状是否等于目标档，漂移则退出码 1
  --sql             输出裁剪后的菜单/字典清理 SQL（不连库执行）
  --json            机器可读输出（供 MCP / CI 消费）
  --yes             跳过 --apply / --recover 的二次确认（CI / Agent 场景）
  --force           跳过 git 工作区洁净检查
  --recover         一键恢复 apps/backend 子模块工作树到已提交状态（--apply 的逆操作）

模块清单（唯一真源: scripts/lib/module-catalog.mjs）:
${MODULES.map((m) => `  ${m.id.padEnd(9)} ${String(m.javaFiles).padStart(4)} 文件  ${m.label}${m.deps.length ? `  ← ${m.deps.join(", ")}` : ""}`).join("\n")}
`);
}

// ---------------------------------------------------------------------------
// 目标装配集合解析
// ---------------------------------------------------------------------------

function resolveSelection(opts) {
  const errors = [];
  const warnings = [];

  const provided = [opts.profile, opts.keep, opts.remove].filter(Boolean).length;
  if (provided === 0) errors.push("必须给出 --profile / --keep / --remove 之一");
  if (provided > 1) errors.push("--profile / --keep / --remove 只能给出一个（避免语义歧义）");
  if (opts.apply && opts.check) errors.push("--apply 与 --check 互斥");

  let keepIds = null;

  if (opts.profile) {
    const fromProfile = resolveProfile(opts.profile);
    if (!fromProfile) {
      errors.push(`未知 profile: "${opts.profile}"（可选: ${Object.keys(PROFILES).join(" / ")}）`);
    } else {
      keepIds = fromProfile;
    }
  } else if (opts.keep) {
    keepIds = opts.keep;
  } else if (opts.remove) {
    const unknown = opts.remove.filter((id) => !getModule(id));
    for (const id of unknown) errors.push(`--remove 中的未知模块 id: "${id}"`);

    const rest = MODULE_IDS.filter((id) => !opts.remove.includes(id));
    const conflicts = findConflicts(rest, opts.remove);
    for (const c of conflicts) {
      errors.push(`不能剔除 "${c.required}"：保留的 "${c.keeper}" 强依赖它。请一并剔除 ${c.keeper}，或保留 ${c.required}`);
    }
    keepIds = rest;
  }

  if (!keepIds) return { keep: null, added: [], warnings, errors };

  errors.push(...validateKeep(keepIds));
  if (errors.length > 0) return { keep: null, added: [], warnings, errors };

  const closure = expandClosure(keepIds);
  if (closure.added.length > 0) {
    warnings.push(`依赖闭包自动补齐: ${closure.added.join(", ")}（被保留模块强依赖，无法单独剔除）`);
  }

  return { keep: closure.ids, added: closure.added, warnings, errors };
}

// ---------------------------------------------------------------------------
// POM 解析与改写
// ---------------------------------------------------------------------------

function readRel(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function rootPomModuleLine(id) {
  return new RegExp(`^\\s*<module>yudao-module-${id}</module>\\s*$`, "m");
}

function rootPomHasModule(text, id) {
  return rootPomModuleLine(id).test(text);
}

function rootPomRemoveModule(text, id) {
  return text
    .split("\n")
    .filter((line) => !rootPomModuleLine(id).test(line))
    .join("\n");
}

function rootPomAddModule(text, id) {
  if (rootPomHasModule(text, id)) return text;
  const lines = text.split("\n");
  let anchor = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*<module>yudao-module-[a-z]+<\/module>\s*$/.test(lines[i])) anchor = i;
  }
  if (anchor < 0) return text;
  const indent = lines[anchor].match(/^\s*/)[0];
  lines.splice(anchor + 1, 0, `${indent}<module>yudao-module-${id}</module>`);
  return lines.join("\n");
}

/**
 * 解析 yudao-server/pom.xml 的依赖块。
 * 返回 [{ start, end, desc, artifactId, commented }]，行号为闭区间。
 * desc 为紧邻上方的中文描述注释行（形如 <!-- 会员中心。默认注释，保证编译速度 -->）。
 */
function parseServerDepBlocks(text) {
  const lines = text.split("\n");
  const blocks = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    const commentedOpen = /^<!--\s*<dependency>\s*-->$/.test(trimmed);
    const plainOpen = trimmed === "<dependency>";

    if (commentedOpen) {
      let j = i;
      while (j < lines.length && !/^<!--\s*<\/dependency>\s*-->$/.test(lines[j].trim())) j++;
      const effective = lines
        .slice(i, j + 1)
        .map((l) => l.replace(/<!--/g, "").replace(/-->/g, ""))
        .join("\n");
      const artifact = effective.match(/<artifactId>([^<]+)<\/artifactId>/);
      let desc = -1;
      if (i > 0 && /^\s*<!--(?!\s*<dependency>).*-->\s*$/.test(lines[i - 1])) desc = i - 1;
      blocks.push({
        start: i,
        end: j,
        desc,
        artifactId: artifact ? artifact[1] : null,
        commented: true,
      });
      i = j;
      continue;
    }

    if (plainOpen) {
      let j = i;
      while (j < lines.length && lines[j].trim() !== "</dependency>") j++;
      const artifact = lines.slice(i, j + 1).join("\n").match(/<artifactId>([^<]+)<\/artifactId>/);
      blocks.push({
        start: i,
        end: j,
        desc: -1,
        artifactId: artifact ? artifact[1] : null,
        commented: false,
      });
      i = j;
    }
  }

  return blocks;
}

function serverDepState(text, module) {
  const blocks = parseServerDepBlocks(text).filter((b) =>
    module.serverArtifacts.includes(b.artifactId)
  );
  if (blocks.length === 0) return "absent";
  if (blocks.every((b) => !b.commented)) return "active";
  if (blocks.every((b) => b.commented)) return "commented";
  return "mixed";
}

/** 合成一个模块依赖块（本仓风格：注释态为 `<!--        <dependency>-->`，无空格） */
function buildDepBlock(artifact, commented, label) {
  const body = [
    "        <dependency>",
    "            <groupId>cn.iocoder.cloud</groupId>",
    `            <artifactId>${artifact}</artifactId>`,
    "            <version>${revision}</version>",
    "        </dependency>",
  ];
  const out = [];
  if (label) out.push(`        <!-- ${label}。默认注释，保证编译速度 -->`);
  for (const line of body) out.push(commented ? `<!--${line}-->` : line);
  return out;
}

// ---------------------------------------------------------------------------
// 计划构建
// ---------------------------------------------------------------------------

function buildPlan(keepIds, activate = false) {
  const keep = new Set(keepIds);
  const rootPom = readRel(ROOT_POM);
  const serverPom = readRel(SERVER_POM);
  const actions = [];

  for (const mod of MODULES) {
    const keepIt = keep.has(mod.id);
    const dirRel = `${BACKEND_DIR}/${mod.dir}`;
    const dirExists = fs.existsSync(path.join(ROOT, dirRel));
    const inRootPom = rootPomHasModule(rootPom, mod.id);
    const depState = serverDepState(serverPom, mod);

    const drift = [];
    if (keepIt) {
      if (!dirExists) drift.push(`目录缺失: ${dirRel}（本工具只能恢复 pom 接线，源码需从完整基座复制）`);
      if (!inRootPom) drift.push(`根 pom 缺少 <module>${mod.dir}</module>`);
      if (depState === "absent") drift.push(`${SERVER_POM} 缺少依赖块 (${mod.serverArtifacts.join(", ")})`);
      if (activate && depState === "commented") drift.push(`${SERVER_POM} 依赖未启用（--activate）`);
    } else {
      if (dirExists) drift.push(`目录未删除: ${dirRel}`);
      if (inRootPom) drift.push(`根 pom 仍声明 <module>${mod.dir}</module>`);
      if (depState !== "absent") drift.push(`${SERVER_POM} 依赖状态应为 absent，实际 ${depState}`);
    }

    actions.push({
      id: mod.id,
      dir: dirRel,
      label: mod.label,
      keep: keepIt,
      javaFiles: mod.javaFiles,
      serverArtifacts: mod.serverArtifacts,
      dirExists,
      inRootPom,
      depState,
      needsActivation: keepIt && depState === "commented",
      drift,
    });
  }

  return { actions };
}

function applyPlan(selection, activate = false) {
  const keep = new Set(selection.keep);
  const log = {
    deletedDirs: [],
    removedRootPom: [],
    addedRootPomModules: [],
    removedServerDeps: [],
    uncommentedServerDeps: [],
    addedServerDeps: [],
    backupDir: null,
  };

  // 备份落在主仓 .commandcode/ 下：子模块工作树保持零污染
  const backupDir = path.join(ROOT, BACKUP_DIR, `trim-${stamp()}`);
  fs.mkdirSync(backupDir, { recursive: true });
  log.backupDir = path.relative(ROOT, backupDir);

  // 1. 物理目录
  for (const mod of MODULES) {
    const dirAbs = path.join(ROOT, BACKEND_DIR, mod.dir);
    if (keep.has(mod.id)) continue;
    if (fs.existsSync(dirAbs)) {
      fs.rmSync(dirAbs, { recursive: true, force: true });
      log.deletedDirs.push(mod.dir);
    }
  }

  // 2. 根 pom <?module> 节点
  let rootPom = readRel(ROOT_POM);
  fs.writeFileSync(path.join(backupDir, "backend-pom.xml.bak"), rootPom, "utf8");
  for (const mod of MODULES) {
    if (keep.has(mod.id)) {
      const next = rootPomAddModule(rootPom, mod.id);
      if (next !== rootPom) {
        log.addedRootPomModules.push(mod.id);
        rootPom = next;
      }
    } else if (rootPomHasModule(rootPom, mod.id)) {
      rootPom = rootPomRemoveModule(rootPom, mod.id);
      log.removedRootPom.push(mod.id);
    }
  }
  fs.writeFileSync(path.join(ROOT, ROOT_POM), rootPom, "utf8");

  // 3. yudao-server 依赖开关
  let serverPom = readRel(SERVER_POM);
  fs.writeFileSync(path.join(backupDir, "backend-server-pom.xml.bak"), serverPom, "utf8");
  let lines = serverPom.split("\n");
  const allBlocks = parseServerDepBlocks(serverPom);
  const deletions = new Set();
  const uncomments = new Set();
  const inserts = [];

  for (const mod of MODULES) {
    const modBlocks = allBlocks.filter((b) => mod.serverArtifacts.includes(b.artifactId));

    if (keep.has(mod.id)) {
      // 保留：依赖块必须存在；--activate 时反注释启用
      for (const block of modBlocks) {
        if (block.commented && activate) {
          for (let i = block.start; i <= block.end; i++) uncomments.add(i);
          if (block.desc >= 0) deletions.add(block.desc);
          log.uncommentedServerDeps.push(block.artifactId);
        }
      }
      const present = new Set(modBlocks.map((b) => b.artifactId));
      for (const artifact of mod.serverArtifacts) {
        if (!present.has(artifact)) {
          inserts.push(...buildDepBlock(artifact, !activate, mod.label), "");
          log.addedServerDeps.push(artifact);
        }
      }
    } else {
      // 剔除：整块连同上方中文描述注释一起删除
      for (const block of modBlocks) {
        for (let i = block.start; i <= block.end; i++) deletions.add(i);
        if (block.desc >= 0) deletions.add(block.desc);
        log.removedServerDeps.push(block.artifactId);
      }
    }
  }

  lines = lines
    .map((line, index) => {
      if (deletions.has(index)) return null;
      if (uncomments.has(index)) return line.replace(/^(\s*)<!--/, "$1").replace(/-->\s*$/, "");
      return line;
    })
    .filter((line) => line !== null);

  if (inserts.length > 0) {
    const anchor = lines.findIndex((line) => line.includes("spring boot 配置所需依赖"));
    if (anchor >= 0) lines.splice(anchor, 0, ...inserts);
    else lines.push(...inserts);
  }

  fs.writeFileSync(path.join(ROOT, SERVER_POM), lines.join("\n"), "utf8");

  return log;
}

// ---------------------------------------------------------------------------
// git 洁净检查
// ---------------------------------------------------------------------------

function backendWorktreeDirty() {
  try {
    const out = execFileSync("git", ["status", "--porcelain", "--", BACKEND_DIR], {
      cwd: ROOT,
      encoding: "utf8",
      // 非 git 工作区（如派生沙箱）时，git 的 fatal 提示不应污染业务输出
      stdio: ["ignore", "pipe", "ignore"],
    });
    return out.trim().length > 0;
  } catch {
    return false;
  }
}

async function confirm(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => rl.question(question, resolve));
  rl.close();
  return /^(y|yes)$/i.test(answer.trim());
}

/**
 * 一键恢复：把 apps/backend 子模块工作树还原到已提交状态。
 * 这是 --apply 的逆操作（裁剪本身就是消费态的，恢复即回到上游指针状态）。
 */
function recoverBackend() {
  const info = backendSubmoduleInfo();
  const target = info ? `${BACKEND_DIR} (submodule ${info.url})` : BACKEND_DIR;

  const res = spawnSync("git", ["-C", path.join(ROOT, BACKEND_DIR), "checkout", "--", "."], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (res.status !== 0) {
    console.error(`❌ 恢复失败: ${(res.stderr || res.error?.message || "").trim()}`);
    return EXIT_USAGE;
  }

  const dirs = fs
    .readdirSync(path.join(ROOT, BACKEND_DIR))
    .filter((n) => n.startsWith("yudao-module-")).length;
  const cmd = spawnSync("bash", ["-lc", `find ${BACKEND_DIR} -name '*.java' | wc -l`], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });

  console.log(`✅ 已恢复 ${target} 到已提交状态`);
  console.log(`   模块目录: ${dirs} 个 | Java 文件: ${(cmd.stdout || "").trim()} 个`);
  return EXIT_OK;
}

// ---------------------------------------------------------------------------
// 输出
// ---------------------------------------------------------------------------

function printPlan(selection, plan, activate) {
  const s = summarize(selection.keep);
  console.log("================================================================");
  console.log("🧭 Yudao-Cloud 模块裁剪计划");
  console.log("================================================================");
  console.log(`保留 (${selection.keep.length}): ${selection.keep.join(", ")}`);
  console.log(`剔除 (${s.remove.length}): ${s.remove.join(", ") || "-"}`);
  for (const w of selection.warnings) console.log(`⚠️  ${w}`);
  console.log("----------------------------------------------------------------");
  console.log(`模块 Java 文件: ${s.moduleTotalJavaFiles} → ${s.keptJavaFiles} (剔除 ${s.removedJavaFiles})`);
  console.log(`全后端口径:     ${s.backendTotalJavaFiles} → ${s.keptBackendJavaFiles} (剔除 ${s.removedJavaFiles}, -${s.reductionPercent}%)`);
  console.log(`  （模块外 ${s.nonTrimJavaFiles} 个框架/网关/单体壳文件不参与裁剪）`);
  console.log("----------------------------------------------------------------");
  for (const a of plan.actions) {
    if (!a.keep) {
      console.log(`  🗑️  ${a.id.padEnd(9)} ${a.dirExists ? `删除 ${a.dir}` : "目录已不存在"}`);
    }
  }
  for (const a of plan.actions) {
    if (a.keep) {
      const fixes = [];
      if (!a.dirExists) fixes.push("目录缺失");
      if (!a.inRootPom) fixes.push("补回 <module>");
      if (a.depState === "absent") fixes.push("补回 server 依赖块");
      if (activate && a.needsActivation) fixes.push("启用 server 依赖");
      console.log(`  ✅ ${a.id.padEnd(9)} ${fixes.length ? fixes.join(" / ") : "已就绪"}`);
    }
  }
  console.log("================================================================");

  const sub = backendSubmoduleInfo();
  if (sub) {
    console.log(`⚠️  ${BACKEND_DIR} 是 git submodule（${sub.url} @ ${sub.branch}）`);
    console.log(`    裁剪结果只是「本地消费态」：git submodule update / scripts/sync-upstream.sh 会把它还原。`);
    console.log(`    恢复命令: node scripts/trim-modules.mjs --recover --yes`);
    console.log("================================================================");
  }
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs();

  if (opts.help || process.argv.length <= 2) {
    printHelp();
    process.exit(EXIT_OK);
  }

  // --recover：--apply 的逆操作，不需要装配集合
  if (opts.recover) {
    if (!opts.yes) {
      if (!process.stdin.isTTY) {
        console.error("❌ 非交互环境执行 --recover 必须显式传 --yes。");
        process.exit(EXIT_USAGE);
      }
      const confirmed = await confirm(
        `\n--recover 会丢弃 ${BACKEND_DIR} 内全部未提交改动（含你手工做的修改），确认？(y/N) `
      );
      if (!confirmed) {
        console.log("已取消。");
        process.exit(EXIT_OK);
      }
    }
    process.exit(recoverBackend());
  }

  const selection = resolveSelection(opts);

  if (selection.errors.length > 0) {
    for (const e of selection.errors) console.error(`❌ ${e}`);
    process.exit(EXIT_USAGE);
  }

  const plan = buildPlan(selection.keep, opts.activate);
  const s = summarize(selection.keep);

  // --check：与磁盘现状比对
  if (opts.check) {
    const drift = plan.actions.flatMap((a) =>
      a.drift.map((d) => ({ module: a.id, detail: d }))
    );

    if (opts.json) {
      console.log(JSON.stringify({ ok: drift.length === 0, action: "check", profile: opts.profile || null, selection: { keep: selection.keep, remove: s.remove }, drift }, null, 2));
    } else {
      console.log(`=== 裁剪状态校验: ${opts.profile ? `profile=${opts.profile}` : selection.keep.join(",")} ===`);
      if (drift.length === 0) {
        console.log(`✅ 磁盘现状与目标装配一致（保留 ${selection.keep.length} 个模块，全后端 ${s.keptBackendJavaFiles} 个 Java 文件）`);
      } else {
        for (const d of drift) console.log(`  ❌ [${d.module}] ${d.detail}`);
        console.log(`\n⚠️ 发现 ${drift.length} 处漂移，请执行裁剪使其收敛。`);
      }
    }
    process.exit(drift.length === 0 ? EXIT_OK : EXIT_DRIFT);
  }

  // --sql：只输出清理 SQL
  if (opts.sql) {
    console.log(buildPurgeSql(s.remove));
    process.exit(EXIT_OK);
  }

  // --dry-run（默认）
  if (!opts.apply) {
    if (opts.json) {
      console.log(JSON.stringify({ ok: true, action: "plan", selection: { keep: selection.keep, remove: s.remove, added: selection.added, warnings: selection.warnings }, summary: s, actions: plan.actions }, null, 2));
    } else {
      printPlan(selection, plan, opts.activate);
      console.log("ℹ️  这是预览（dry-run）。确认无误后加 --apply 落地。");
    }
    process.exit(EXIT_OK);
  }

  // --apply 前置校验
  if (!opts.force && backendWorktreeDirty()) {
    console.error(`❌ ${BACKEND_DIR} 下存在未提交改动，拒绝裁剪（避免把进行中的工作一并删除）。`);
    console.error(`   请先提交或 stash，或显式传 --force。`);
    process.exit(EXIT_USAGE);
  }

  if (!opts.yes) {
    if (!process.stdin.isTTY) {
      console.error("❌ 非交互环境执行 --apply 必须显式传 --yes。");
      process.exit(EXIT_USAGE);
    }
    printPlan(selection, plan, opts.activate);
    const ok = await confirm("\n确认执行上述破坏性裁剪？(y/N) ");
    if (!ok) {
      console.log("已取消。");
      process.exit(EXIT_OK);
    }
  }

  const log = applyPlan(selection, opts.activate);

  if (opts.json) {
    console.log(JSON.stringify({ ok: true, action: "apply", selection: { keep: selection.keep }, summary: s, log }, null, 2));
  } else {
    console.log("================================================================");
    console.log("🎉 裁剪完成");
    console.log("================================================================");
    console.log(`删除目录 (${log.deletedDirs.length}): ${log.deletedDirs.join(", ") || "-"}`);
    console.log(`根 pom 移除 <module> (${log.removedRootPom.length}): ${log.removedRootPom.join(", ") || "-"}`);
    console.log(`根 pom 补回 <module> (${log.addedRootPomModules.length}): ${log.addedRootPomModules.join(", ") || "-"}`);
    console.log(`server 依赖移除 (${log.removedServerDeps.length}): ${log.removedServerDeps.join(", ") || "-"}`);
    console.log(`server 依赖补回 (${log.addedServerDeps.length}): ${log.addedServerDeps.join(", ") || "-"}`);
    console.log(`server 依赖反注释 (${log.uncommentedServerDeps.length}): ${log.uncommentedServerDeps.join(", ") || "-"}`);
    console.log(`剩余 Java 文件: 全后端 ${s.keptBackendJavaFiles}（其中模块 ${s.keptJavaFiles}）`);
    console.log("----------------------------------------------------------------");
    const missingKept = plan.actions.filter((a) => a.keep && !a.dirExists).map((a) => a.id);
    if (missingKept.length > 0) {
      console.log(`⚠️  以下保留模块的源码目录不存在，需从完整基座复制后再编译:`);
      console.log(`   ${missingKept.join(", ")}`);
      console.log(`   例: cp -r <full-base>/yudao-module-bpm ${BACKEND_DIR}/`);
    }
    console.log(`备份: ${log.backupDir}`);
    const subInfo = backendSubmoduleInfo();
    if (subInfo) {
      console.log("");
      console.log(`⚠️  ${BACKEND_DIR} 是 git submodule（${subInfo.url} @ ${subInfo.branch}）`);
      console.log(`    裁剪只是「本地消费态」：git submodule update / scripts/sync-upstream.sh 会把它还原。`);
      console.log(`    一键恢复: node scripts/trim-modules.mjs --recover --yes`);
    }
    console.log("下一步:");
    console.log("  1) mvn -f apps/backend/pom.xml clean compile -DskipTests");
    console.log("  2) node scripts/trim-modules.mjs --profile " + (opts.profile || "custom") + " --sql   # 生成菜单/字典清理 SQL");
    console.log("  3) 若启用 yudao-gateway，请同步清理其路由配置中被裁模块的条目");
    console.log("================================================================");
  }

  process.exit(EXIT_OK);
}

main().catch((error) => {
  console.error(`❌ 裁剪失败: ${error.message}`);
  process.exit(EXIT_USAGE);
});
