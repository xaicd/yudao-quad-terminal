import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  VARIANTS,
  DEFAULT_VARIANT,
  getVariant,
  parseVersionName,
  compareVersions,
  newestTag,
  latestRefFor,
  resolveVariants,
  extractDocRefTokens,
} from "../lib/jdk-variants.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SCRIPT = path.join(ROOT, "scripts/jdk-variants.mjs");

const run = (...args) =>
  spawnSync(process.execPath, [SCRIPT, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 60000,
  });

/* ------------------------------ 纯函数：矩阵与版本比较 ------------------------------ */

test("变体矩阵：id 唯一、默认档存在、每档都声明 java 与 spring-boot", () => {
  assert.equal(new Set(VARIANTS.map((v) => v.id)).size, VARIANTS.length);
  assert.ok(getVariant(DEFAULT_VARIANT), "默认档必须存在");
  for (const v of VARIANTS) {
    assert.ok(v.label && v.javaVersion && v.springBoot, `${v.id} 声明不完整`);
    assert.ok(Array.isArray(v.javaTargets) && v.javaTargets.length > 0, `${v.id} 缺 javaTargets（门禁要用它核对 pom）`);
    assert.match(v.note, /.+/);
    assert.ok(v.refKind === "branch" || v.refKind === "tagPattern", `${v.id} refKind 非法`);
    if (v.refKind === "branch") assert.match(v.refName, /^(master|main)/, `${v.id} 分支名可疑`);
  }
});

test("parseVersionName：解析 v 版本号，非版本名返回 null", () => {
  assert.deepEqual(parseVersionName("v2026.09(jdk8/11)"), [2026, 9]);
  assert.deepEqual(parseVersionName("v2.6.1(jdk17/21)"), [2, 6, 1]);
  assert.equal(parseVersionName("master-jdk17"), null);
  assert.equal(parseVersionName(""), null);
  assert.equal(parseVersionName(undefined), null);
});

test("compareVersions：数值比较且处理长度不一致", () => {
  assert.equal(compareVersions([2026, 9], [2026, 8]), 1);
  assert.equal(compareVersions([2, 6, 1], [2, 6, 0]), 1);
  assert.equal(compareVersions([2026], [2026, 0]), 0);
  assert.equal(compareVersions([2025, 12], [2026, 1]), -1);
});

test("newestTag：从候选标签里选版本号最大的（这才是『用最新的』）", () => {
  const tags = [
    "v2025.12(jdk8/11)",
    "v2026.08(jdk8/11)",
    "v2026.09(jdk8/11)",
    "v2026.09(jdk25)",
  ];
  assert.equal(newestTag("\\(jdk8\\/11\\)$", tags).ref, "v2026.09(jdk8/11)");
  assert.equal(newestTag("\\(jdk25\\)$", tags).ref, "v2026.09(jdk25)");
  assert.equal(newestTag("\\(jdk8\\/11\\)$", []), null, "无候选必须返回 null，不得瞎猜");
});

test("latestRefFor：分支优先，无分支才回退标签", () => {
  const v = getVariant("jdk25");
  assert.equal(latestRefFor(v, { branches: ["master-jdk25"], tags: ["v2026.09(jdk25)"] }).kind, "branch");
  assert.equal(latestRefFor(v, { branches: [], tags: ["v2026.09(jdk25)"] }).ref, "v2026.09(jdk25)");
  assert.equal(latestRefFor(v, { branches: [], tags: [] }), null);
});

test("latestRefFor：jdk17-21 只认分支，不得回退成同名标签", () => {
  const v = getVariant("jdk17-21");
  assert.equal(latestRefFor(v, { branches: ["master-jdk17"], tags: [] }).ref, "master-jdk17");
  assert.equal(latestRefFor(v, { branches: [], tags: ["v2026.09(jdk17/21)"] }), null);
});

test("resolveVariants：解析不到的变体如实标记，不静默补位", () => {
  const rows = resolveVariants({ branches: [], tags: [] });
  assert.equal(rows.length, VARIANTS.length);
  for (const r of rows) assert.equal(r.resolved, null);
});

/* ------------------------------- 文档 ref 真实性 ------------------------------- */

test("extractDocRefTokens：只认上游 ref 令牌，忽略本仓分支名", () => {
  const tokens = extractDocRefTokens(
    "本仓用 `main`，上游用 `master-jdk17`；不存在的 `master-jdk8`；标签 `v2026.09(jdk8/11)`；裸写 master-jdk17 不算"
  );
  assert.deepEqual(tokens, ["master-jdk17", "master-jdk8", "v2026.09(jdk8/11)"]);
});

test("回归防护：文档不得再引用不存在的 master-jdk8 / master-jdk21（真实踩过的坑）", () => {
  for (const rel of ["README.md", "AGENTS.md", ".agents/skills/yudao-cloud-bootstrap/SKILL.md"]) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    const tokens = extractDocRefTokens(fs.readFileSync(abs, "utf8"));
    for (const bogus of ["master-jdk8", "master-jdk21"]) {
      assert.ok(!tokens.includes(bogus), `${rel} 仍引用上游不存在的 ref：${bogus}`);
    }
  }
});

/* ------------------------------------ CLI ------------------------------------ */

test("--list --json：3 个变体都能解析出真实 ref 与 SHA", () => {
  const r = run("--list", "--json");
  assert.equal(r.status, 0, r.stderr);

  const j = JSON.parse(r.stdout);
  assert.equal(j.default, "jdk17-21");
  assert.equal(j.variants.length, VARIANTS.length);
  for (const v of j.variants) {
    assert.equal(v.resolvable, true, `${v.id} 无法解析出 ref`);
    assert.match(v.sha, /^[0-9a-f]{7,}$/, `${v.id} sha 非法`);
  }
});

test("--list --json：声明值必须与 ref 的 pom 实测值一致（名字≠内容 是真实踩过的坑）", () => {
  const r = run("--list", "--json");
  assert.equal(r.status, 0, r.stderr);
  const j = JSON.parse(r.stdout);

  for (const v of j.variants) {
    assert.ok(v.pomJava, `${v.id} 读不到 pom 的 java.version`);
    assert.ok(
      v.javaTargets.includes(v.pomJava),
      `${v.id} 声明 java ∈ {${v.javaTargets.join("/")}} 但 ${v.ref} 实测 java=${v.pomJava}`
    );
    assert.equal(v.pomSpringBoot, v.springBoot, `${v.id} 声明的 Spring Boot 与 ${v.ref} 实测不符`);
  }
});

test("--list --json：JDK 8/11 锚定 master 分支、JDK 25 锚定 master-jdk25（而非臆造分支名）", () => {
  const j = JSON.parse(run("--list", "--json").stdout);
  const byId = Object.fromEntries(j.variants.map((v) => [v.id, v]));

  assert.equal(byId["jdk17-21"].ref, "master-jdk17");
  assert.equal(byId["jdk8-11"].ref, "master", "上游 JDK 8 线的分支名就是 master");
  assert.equal(byId["jdk8-11"].kind, "branch");
  assert.equal(byId["jdk25"].ref, "master-jdk25");
  assert.equal(byId["jdk25"].pomJava, "25", "JDK 25 变体的 pom 必须是 25（不是 21）");
});

test("--status --json：当前 pin 可追溯到默认变体", () => {
  const r = run("--status", "--json");
  assert.equal(r.status, 0, r.stderr);

  const j = JSON.parse(r.stdout);
  assert.match(j.head.sha, /^[0-9a-f]{40}$/);
  assert.ok(j.base, "pin 必须能追溯到某个变体");
  assert.equal(j.base.id, "jdk17-21");
});

test("--check：变体可解析 + 文档 ref 真实存在 + pin 可追溯", () => {
  const r = run("--check");
  assert.equal(r.status, 0, `--check 未通过：\n${r.stdout}\n${r.stderr}`);
  assert.match(r.stdout, /校验通过/);
});

test("--use 未知变体：exit 2", () => {
  const r = run("--use", "jdk99");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /jdk99/);
});

test("--use 缺 --yes：exit 2（切换底座是破坏性操作）", () => {
  const r = run("--use", "jdk8-11");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /--yes/);
});

test("--use --dry-run：只预览、不动仓库，并如实提示会丢失的本地提交", () => {
  const before = run("--status", "--json").stdout;
  const r = run("--use", "jdk8-11", "--dry-run");

  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /--dry-run/);
  assert.match(r.stdout, /不在目标 ref 上/, "必须提示切换会丢失本地提交");
  assert.match(r.stdout, /cherry-pick/, "必须给出恢复手段");

  assert.equal(run("--status", "--json").stdout, before, "dry-run 不得改变仓库状态");
});

test("--help 列出三档变体；未知参数 exit 2", () => {
  const help = run("--help");
  assert.equal(help.status, 0);
  for (const id of ["jdk17-21", "jdk8-11", "jdk25"]) assert.match(help.stdout, new RegExp(id));

  const bad = run("--nope");
  assert.equal(bad.status, 2);
});
