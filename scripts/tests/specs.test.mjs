import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const requireRepo = createRequire(path.join(ROOT, "package.json"));
const { resolveSpecDir, getTargetSpecDir, listAllSpecs } = requireRepo("./scripts/lib/spec-path-resolver.cjs");

test("spec-resolver：能解析新建或已存在的规格目录", () => {
  const tmpSpecDir = path.join(ROOT, "docs", "specs", "__resolver_test_domain__", "__resolver_test_spec__");
  fs.mkdirSync(tmpSpecDir, { recursive: true });
  fs.writeFileSync(
    path.join(tmpSpecDir, "brief.json"),
    JSON.stringify({ name: "__resolver_test_spec__", domain: "__resolver_test_domain__", type: "feature" }),
    "utf8"
  );
  try {
    const dir = resolveSpecDir("__resolver_test_spec__");
    assert.equal(dir, tmpSpecDir, "应能精准解析到 docs/specs/<domain>/<name>");
    assert.ok(fs.existsSync(path.join(dir, "brief.json")), "解析结果必须含 brief.json");

    const all = listAllSpecs();
    assert.ok(all.some((s) => s.name === "__resolver_test_spec__" && s.domain === "__resolver_test_domain__"));
  } finally {
    fs.rmSync(path.join(ROOT, "docs", "specs", "__resolver_test_domain__"), { recursive: true, force: true });
  }
});

test("spec-resolver：未知规格返回 null（而不是乱猜路径）", () => {
  assert.equal(resolveSpecDir("definitely-not-a-spec-xyz"), null);
});

test("spec-resolver：目标路径遵循 docs/specs/<domain>/<name>", () => {
  const p = getTargetSpecDir("demo", "platform");
  assert.ok(p.endsWith(path.join("docs", "specs", "platform", "demo")), p);
});

test("母本净室基线：不含 docs/specs/archive 历史规格、母本回灌审计或瞬态 artifacts", () => {
  assert.equal(fs.existsSync(path.join(ROOT, "docs", "specs", "archive")), false, "母本不得携带 docs/specs/archive 历史归档");
  assert.equal(
    fs.existsSync(path.join(ROOT, "docs", "00_meta_standards", "blueprint-backport-audit.md")),
    false,
    "母本不得携带内部回灌审计报告"
  );
  assert.equal(fs.existsSync(path.join(ROOT, "docs", "artifacts")), false, "母本不得提交瞬态 docs/artifacts");
  assert.equal(fs.existsSync(path.join(ROOT, "docs", "architecture", "artifacts")), false, "母本不得提交瞬态 docs/architecture/artifacts");

  const darDir = path.join(ROOT, "docs", "01_management", "dar");
  if (fs.existsSync(darDir)) {
    const darMds = fs.readdirSync(darDir).filter((f) => f.endsWith(".md"));
    assert.deepEqual(darMds, [], "母本 docs/01_management/dar 不得残留历史选型记录");
  }
});

const health = (...args) =>
  spawnSync(process.execPath, [path.join(ROOT, "scripts/specs-health.mjs"), ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 60000,
  });

test("specs-health --json：干净 0 规格基线与存量规格均健康自洽", () => {
  const r = health("--json");
  assert.equal(r.status, 0, r.stderr);

  const j = JSON.parse(r.stdout);
  assert.equal(j.healthy, true);
  assert.equal(j.unhealthyCount, 0);
  assert.equal(j.total, j.specs.length);
  for (const s of j.specs) {
    assert.equal(s.healthy, true, `${s.name} 不健康: ${s.issues.join("; ")}`);
    assert.equal(s.issues.length, 0);
  }
});

test("specs-health：未知 --spec → exit 2", () => {
  const r = health("--spec", "definitely-not-a-spec-xyz");
  assert.equal(r.status, 2);
});

test("规格资产清单与 speckit 的 16 份保持一致", () => {
  // 两条独立实现（speckit check 与 specs-health）不能对"齐备"的定义产生分歧
  const speckit = fs.readFileSync(path.join(ROOT, "scripts/speckit.cjs"), "utf8");
  const healthSrc = fs.readFileSync(path.join(ROOT, "scripts/specs-health.mjs"), "utf8");
  const names = ["brief.json", "spec.md", "requirements.md", "plan.md", "design.md", "tasks.md", "checklist.md", "research.md", "selection.md", "runbook.json", "evidence.json", "deployment.md", "bugs.md", "prototype.md", "spec.json", "feature.json"];
  for (const n of names) {
    assert.ok(speckit.includes(`"${n}"`), `speckit 缺少资产 ${n}`);
    assert.ok(healthSrc.includes(`"${n}"`), `specs-health 缺少资产 ${n}`);
  }
});
