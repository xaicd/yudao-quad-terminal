import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const requireRepo = createRequire(path.join(ROOT, "package.json"));
const { resolveSpecDir, getTargetSpecDir, listAllSpecs } = requireRepo("./scripts/lib/spec-resolver.cjs");

test("spec-resolver：能解析已存在的规格目录", () => {
  const dir = resolveSpecDir("module-trim-and-mcp");
  assert.ok(dir, "应能解析到该规格");
  assert.ok(fs.existsSync(path.join(dir, "brief.json")), "解析结果必须含 brief.json");
});

test("spec-resolver：未知规格返回 null（而不是乱猜路径）", () => {
  assert.equal(resolveSpecDir("definitely-not-a-spec-xyz"), null);
});

test("spec-resolver：目标路径遵循 docs/specs/<domain>/<name>", () => {
  const p = getTargetSpecDir("demo", "platform");
  assert.ok(p.endsWith(path.join("docs", "specs", "platform", "demo")), p);
});

test("spec-resolver：能列出全部规格（≥3 份）", () => {
  const all = listAllSpecs();
  assert.ok(all.length >= 3, `仅找到 ${all.length} 份规格`);
  for (const s of all) {
    assert.ok(s.name && s.domain, "每份规格都应有 name 与 domain");
    assert.ok(fs.existsSync(s.path), `${s.path} 不存在`);
  }
});

const health = (...args) =>
  spawnSync(process.execPath, [path.join(ROOT, "scripts/specs-health.mjs"), ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 60000,
  });

test("specs-health --json：全部规格健康，且计数自洽", () => {
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
