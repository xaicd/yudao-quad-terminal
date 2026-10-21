#!/usr/bin/env node
/**
 * scripts/jdk-variants.mjs —— JDK 变体矩阵的查询、校验与切换 CLI
 *
 * 为什么需要它：
 * 本仓宣称支持 JDK 8/11、17/21、25 三档变体，但上游 `YunaiV/yudao-cloud` **只有 `master-jdk17` 一个
 * （默认）分支**，其余变体是用标签发布的。文档里若直接写 `master-jdk8` / `master-jdk21` 这类分支名，
 * 就是一条**无法执行、无法校验**的声明。本 CLI 把"变体→真实 ref"变成可查询（--list）、可校验（--check）、
 * 可切换（--use）的能力，并把"文档里写的 ref 必须真实存在"纳入门禁。
 *
 * 用法：
 *   node scripts/jdk-variants.mjs --list            # 变体矩阵 + 最新 ref + SHA + 日期 + pom 实测值
 *   node scripts/jdk-variants.mjs --status          # 当前 pin 属于哪个变体、上面叠了几个本地提交
 *   node scripts/jdk-variants.mjs --check           # 门禁：变体可解析 + pom 核对 + 文档 ref 真实存在 + pin 可追溯
 *   node scripts/jdk-variants.mjs --use jdk8-11 [--dry-run] [--yes] [--force]
 *
 * 文档约定：**反引号里的 ref 即"断言其存在"**，会被 --check 解析校验；
 * 若只是在说明"某个 ref 不存在"，请用删除线或纯文本，否则会被判为假声明。
 *
 * 退出码：0 通过 / 1 校验发现问题 / 2 用法错误
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  VARIANTS,
  DEFAULT_VARIANT,
  getVariant,
  resolveVariants,
  extractDocRefTokens,
} from "./lib/jdk-variants.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BACKEND = path.join(ROOT, "apps/backend");

const DOC_FILES = [
  "README.md",
  "AGENTS.md",
  ".agents/skills/yudao-cloud-bootstrap/SKILL.md",
];

const EXIT_OK = 0;
const EXIT_FINDINGS = 1;
const EXIT_USAGE = 2;

function git(args, cwd = BACKEND) {
  const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return { ok: r.status === 0, out: (r.stdout || "").trim(), err: (r.stderr || "").trim() };
}

function readRefs() {
  const r = git([
    "for-each-ref",
    "--format=%(refname:short)",
    "refs/heads",
    "refs/remotes/origin",
    "refs/tags",
  ]);
  const names = r.ok ? r.out.split("\n").filter(Boolean) : [];

  const branches = new Set();
  const tags = [];
  for (const full of names) {
    if (full.startsWith("origin/")) {
      const b = full.slice("origin/".length);
      if (b === "HEAD") continue;
      branches.add(b);
    } else {
      branches.add(full);
    }
  }

  const tagList = git(["tag", "-l"]).out.split("\n").filter(Boolean);
  tags.push(...tagList);

  return { branches: [...branches], tags };
}

/**
 * 把「文档里写的 ref 名」解析成一个**当前仓库真的能解析**的 ref。
 * 子模块通常停留在某个具体分支上，`master-jdk25` 这类只存在于 origin/master-jdk25，
 * 因此裸名解析失败时必须回退到 origin/<name>，否则会把真实存在的分支误报为不存在。
 */
function resolveRef(name) {
  for (const candidate of [name, `origin/${name}`]) {
    if (git(["rev-parse", "--verify", "-q", `${candidate}^{commit}`]).ok) return candidate;
  }
  return null;
}

function refInfo(ref) {
  const resolved = resolveRef(ref);
  if (!resolved) return null;
  const sha = git(["rev-parse", "--short", `${resolved}^{commit}`]);
  const date = git(["log", "-1", "--format=%ci", `${resolved}^{commit}`]);
  const full = git(["rev-parse", `${resolved}^{commit}`]);
  return { ref, resolved, sha: sha.out, full: full.out, date: (date.out || "").slice(0, 10) };
}

function refExists(ref) {
  return resolveRef(ref) !== null;
}

function headInfo() {
  const sha = git(["rev-parse", "HEAD"]);
  const short = git(["rev-parse", "--short", "HEAD"]);
  const subject = git(["log", "-1", "--format=%s"]);
  const branch = git(["symbolic-ref", "-q", "--short", "HEAD"]);
  return {
    sha: sha.out,
    short: short.out,
    subject: subject.out,
    branch: branch.ok ? branch.out : "(detached)",
  };
}

function isAncestor(a, b) {
  return git(["merge-base", "--is-ancestor", a, b]).ok;
}

function commitsBetween(a, b) {
  const r = git(["rev-list", "--count", `${a}..${b}`]);
  return r.ok ? Number(r.out) : null;
}

function commitSubjects(range) {
  const r = git(["log", "--format=%h %s", range]);
  return r.ok ? r.out.split("\n").filter(Boolean) : [];
}

/**
 * 读取某个 ref 的真实 pom 编译参数 —— 用于**反向核对**变体声明。
 * 只信 pom 里的实测值，绝不信 ref 名字（名字与内容不符正是本仓要防的坑）。
 */
function readPomParams(ref) {
  const resolved = resolveRef(ref);
  if (!resolved) return null;
  const pom = git(["show", `${resolved}:pom.xml`]);
  if (!pom.ok) return null;
  const java = /<java\.version>([^<]+)<\/java\.version>/.exec(pom.out);
  const boot = /<spring\.boot\.version>([^<]+)<\/spring\.boot\.version>/.exec(pom.out);
  return { javaVersion: java ? java[1].trim() : null, springBoot: boot ? boot[1].trim() : null };
}

/* ----------------------------------- list ---------------------------------- */

function cmdList(json) {
  const refs = readRefs();
  const rows = resolveVariants(refs).map(({ variant, resolved }) => {
    const info = resolved ? refInfo(resolved.ref) : null;
    const pom = resolved ? readPomParams(resolved.ref) : null;
    return {
      id: variant.id,
      label: variant.label,
      kind: resolved ? resolved.kind : null,
      ref: resolved ? resolved.ref : null,
      sha: info ? info.sha : null,
      date: info ? info.date : null,
      javaVersion: variant.javaVersion,
      javaTargets: variant.javaTargets,
      springBoot: variant.springBoot,
      pomJava: pom ? pom.javaVersion : null,
      pomSpringBoot: pom ? pom.springBoot : null,
      resolvable: Boolean(info),
      isDefault: variant.id === DEFAULT_VARIANT,
    };
  });

  if (json) {
    console.log(JSON.stringify({ default: DEFAULT_VARIANT, variants: rows }, null, 2));
    return EXIT_OK;
  }

  console.log("🧩 JDK 变体矩阵（真源：scripts/lib/jdk-variants.mjs）");
  console.log("----------------------------------------------------------------");
  for (const r of rows) {
    const mark = r.isDefault ? "★" : " ";
    console.log(`${mark} ${r.id.padEnd(10)} ${r.label}`);
    console.log(
      `    ref=${r.ref ?? "❌ 无法解析"} (${r.kind ?? "-"})  sha=${r.sha ?? "-"}  date=${r.date ?? "-"}`
    );
    console.log(
      `    声明: java=${r.javaVersion} spring-boot=${r.springBoot}   |   实测 pom: java=${r.pomJava ?? "-"} spring-boot=${r.pomSpringBoot ?? "-"}`
    );
  }
  console.log("----------------------------------------------------------------");
  console.log("★ = 默认档。上游分支：master-jdk17（默认）/ master（JDK 8 线）/ master-jdk25；另有发布标签 v*(jdk8/11)、v*(jdk17/21)、v*(jdk25)。");
  return EXIT_OK;
}

/* ---------------------------------- status --------------------------------- */

function cmdStatus(json) {
  const refs = readRefs();
  const head = headInfo();
  const resolved = resolveVariants(refs);

  const bases = resolved
    .filter((r) => r.resolved)
    .map(({ variant, resolved: res }) => {
      const info = refInfo(res.ref);
      if (!info) return null;
      const contains = head.sha && isAncestor(info.full, head.sha);
      return {
        id: variant.id,
        ref: res.ref,
        sha: info.sha,
        isBase: Boolean(contains),
        behind: contains ? commitsBetween(info.full, head.sha) : null,
      };
    })
    .filter(Boolean);

  const base = bases.find((b) => b.isBase) || null;
  const localCommits = base ? commitSubjects(`${base.sha}..HEAD`) : [];

  const payload = { head, base, bases, localCommits };

  if (json) {
    console.log(JSON.stringify(payload, null, 2));
    return EXIT_OK;
  }

  console.log("🔎 当前后端 pin");
  console.log(`   branch: ${head.branch}`);
  console.log(`   commit: ${head.short}  ${head.subject}`);
  console.log(`   基座变体: ${base ? `${base.id}（${base.ref}）领先 ${base.behind} 个本地提交` : "❌ 无法追溯到任何变体"}`);
  if (localCommits.length) {
    console.log("   本地独有提交（切走变体会丢失，需 cherry-pick 迁移）:");
    for (const c of localCommits) console.log(`     ${c}`);
  }
  return EXIT_OK;
}

/* ----------------------------------- check --------------------------------- */

function cmdCheck(json) {
  const findings = [];
  const refs = readRefs();
  const resolved = resolveVariants(refs);

  // 1) 每个变体都必须能解析出真实 ref，且 pom 实测参数必须与声明一致
  const variantRows = [];
  for (const { variant, resolved: res } of resolved) {
    if (!res) {
      findings.push(`变体 ${variant.id} 无法解析出 ref（声明必须可执行）`);
      variantRows.push({ id: variant.id, ref: null });
      continue;
    }
    const info = refInfo(res.ref);
    if (!info) {
      findings.push(`变体 ${variant.id} 的 ref ${res.ref} 解析不到提交`);
      variantRows.push({ id: variant.id, ref: res.ref });
      continue;
    }
    const pom = readPomParams(res.ref);
    variantRows.push({ id: variant.id, ref: res.ref, sha: info.sha, date: info.date, pom });

    if (!pom || !pom.javaVersion) {
      findings.push(`变体 ${variant.id} 的 ref ${res.ref} 读不到 pom 的 java.version，无法核对`);
    } else if (!variant.javaTargets.includes(pom.javaVersion)) {
      findings.push(
        `变体 ${variant.id} 声明 java ∈ {${variant.javaTargets.join("/")}}，但 ${res.ref} 的 pom 实测 java.version=${pom.javaVersion}（名字与内容不符）`
      );
    }
    if (pom && variant.springBoot && pom.springBoot !== variant.springBoot) {
      findings.push(
        `变体 ${variant.id} 声明 spring-boot=${variant.springBoot}，但 ${res.ref} 的 pom 实测 ${pom.springBoot}`
      );
    }
  }

  // 2) 文档里写到的上游 ref 必须真实存在（防"假分支"）
  const docRefs = [];
  for (const rel of DOC_FILES) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    for (const token of extractDocRefTokens(fs.readFileSync(abs, "utf8"))) {
      const exists = refExists(token);
      docRefs.push({ file: rel, token, exists });
      if (!exists) findings.push(`${rel} 引用了不存在的上游 ref：\`${token}\``);
    }
  }

  // 3) 当前 pin 必须可追溯到某个变体（否则说明底座来路不明）
  const head = headInfo();
  const base = resolved
    .filter((r) => r.resolved)
    .map(({ variant, resolved: res }) => {
      const full = resolveRef(res.ref) ? git(["rev-parse", `${resolveRef(res.ref)}^{commit}`]).out : "";
      return full && head.sha && isAncestor(full, head.sha) ? { id: variant.id, ref: res.ref } : null;
    })
    .filter(Boolean)[0];
  if (!base) findings.push(`当前 pin ${head.short} 无法追溯到任何 JDK 变体 ref`);

  const passed = findings.length === 0;

  if (json) {
    console.log(JSON.stringify({ passed, variants: variantRows, docRefs, base, head, findings }, null, 2));
    return passed ? EXIT_OK : EXIT_FINDINGS;
  }

  console.log(`🧩 JDK 变体可执行性校验：${variantRows.length} 个变体 / ${docRefs.length} 处文档 ref`);
  for (const v of variantRows) {
    const pom = v.pom ? `pom: java=${v.pom.javaVersion} boot=${v.pom.springBoot}` : "pom: 读取失败";
    console.log(`   ✅ ${v.id.padEnd(10)} → ${v.ref} ${v.sha ?? ""} ${v.date ?? ""} | ${pom}`);
  }
  if (docRefs.length) {
    console.log("   文档中的上游 ref:");
    for (const d of docRefs) {
      console.log(`   ${d.exists ? "✅" : "❌"} ${d.token}  (${d.file})`);
    }
  }
  console.log(`   当前 pin ${head.short} → 基座变体 ${base ? base.id : "❌ 未识别"}`);

  if (!passed) {
    console.log("----------------------------------------------------------------");
    for (const f of findings) console.log(`   ❌ ${f}`);
    console.log(
      "💡 约定：文档里的反引号 ref 即『断言其存在』；若只是在说明某个 ref 不存在，请改用删除线或纯文本。"
    );
    console.log("❌ 校验未通过");
    return EXIT_FINDINGS;
  }
  console.log("✅ 校验通过：变体可解析、文档 ref 真实存在、pin 可追溯");
  return EXIT_OK;
}

/* ------------------------------------ use ---------------------------------- */

function cmdUse(id, { dryRun, yes, force }) {
  const variant = getVariant(id);
  if (!variant) {
    console.error(`❌ 未知变体: ${id}\n   可选: ${VARIANTS.map((v) => v.id).join(" | ")}`);
    return EXIT_USAGE;
  }

  const refs = readRefs();
  const resolved = resolveVariants(refs).find((r) => r.variant.id === id)?.resolved;
  if (!resolved) {
    console.error(`❌ 变体 ${id} 解析不到 ref，无法切换`);
    return EXIT_FINDINGS;
  }

  // 必须用「真正能解析的 ref」算 SHA：子模块里 `master` 只存在于 origin/master，
  // 直接用裸名会让 rev-parse 失败、进而**跳过丢失提交的告警**（这是一个真实踩到的 bug）。
  const target = resolveRef(resolved.ref);
  if (!target) {
    console.error(`❌ 变体 ${id} 的 ref ${resolved.ref} 在本仓解析不到，无法切换（先 git fetch）`);
    return EXIT_FINDINGS;
  }

  const head = headInfo();
  const targetSha = git(["rev-parse", `${target}^{commit}`]).out;
  const dropped = commitSubjects(`${targetSha}..HEAD`);

  console.log(`🎯 目标变体: ${variant.label}`);
  console.log(
    `   切换 ${head.short} (${head.branch}) → ${target} (${resolved.kind}, ${targetSha.slice(0, 8)})`
  );
  if (dropped.length) {
    console.log(`   ⚠️  以下 ${dropped.length} 个本地提交不在目标 ref 上，切换后将不可见:`);
    for (const c of dropped) console.log(`        ${c}`);
    console.log("        如需保留，切回后执行: git -C apps/backend cherry-pick <sha>");
  }

  if (dryRun) {
    console.log("🧪 --dry-run：未做任何改动");
    return EXIT_OK;
  }

  if (!yes) {
    console.error("❌ 切换后端底座属破坏性操作，请显式加 --yes（或先用 --dry-run 预览）");
    return EXIT_USAGE;
  }
  if (dropped.length && !force) {
    console.error("❌ 目标 ref 不含当前本地提交，如确认放弃请加 --force");
    return EXIT_USAGE;
  }

  // origin/X 用 -B 建出跟踪本地分支，避免子模块停留在 detached 状态；
  // 本地分支/标签则直接 checkout。
  const checkoutArgs = target.startsWith("origin/")
    ? ["checkout", "-B", resolved.ref, target]
    : ["checkout", target];
  const checkout = git(checkoutArgs);
  if (!checkout.ok) {
    console.error(`❌ git checkout 失败: ${checkout.err}`);
    return EXIT_FINDINGS;
  }

  const staged = spawnSync("git", ["-C", ROOT, "add", "apps/backend"], { encoding: "utf8" });
  console.log(
    staged.status === 0
      ? "✅ 已切换并在主仓暂存新 gitlink（git add apps/backend）"
      : "⚠️ 已切换，但暂存 gitlink 失败，请手动执行 git add apps/backend"
  );
  console.log("   后续建议: pnpm build:backend && pnpm gate:full");
  return EXIT_OK;
}

/* ----------------------------------- main ---------------------------------- */

function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const flag = (name) => args.includes(name);

  if (flag("--help") || args.length === 0) {
    console.log(`用法: node scripts/jdk-variants.mjs <命令> [选项]

命令:
  --list                 列出变体矩阵与各自最新的真实 ref
  --status               当前 pin 属于哪个变体、叠加了哪些本地提交
  --check                门禁校验（变体可解析 + 文档 ref 真实存在 + pin 可追溯）
  --use <id> [--yes]     切换后端底座到指定变体（--dry-run 预览，--force 允许丢弃本地提交）

选项: --json 机器可读；--help 帮助

变体: ${VARIANTS.map((v) => `${v.id}(${v.label})`).join(" / ")}`);
    return EXIT_OK;
  }

  if (flag("--list")) return cmdList(json);
  if (flag("--status")) return cmdStatus(json);
  if (flag("--check")) return cmdCheck(json);
  if (flag("--use")) {
    const id = args[args.indexOf("--use") + 1];
    if (!id || id.startsWith("--")) {
      console.error("❌ --use 需要变体 id");
      return EXIT_USAGE;
    }
    return cmdUse(id, { dryRun: flag("--dry-run"), yes: flag("--yes"), force: flag("--force") });
  }

  console.error(`❌ 未知参数: ${args.join(" ")}（用 --help 查看用法）`);
  return EXIT_USAGE;
}

process.exit(main());
