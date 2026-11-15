import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DRIFT_SCRIPT = path.join(ROOT, "scripts/check-contracts-drift.mjs");
const PMO_SCRIPT = path.join(ROOT, "scripts/cmmi-01-management.cjs");

function runDrift(...args) {
  return spawnSync(process.execPath, [DRIFT_SCRIPT, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 60000,
  });
}

function writeText(absPath, content) {
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, content, "utf8");
}

test("默认基线模式：92 条只读上游子模块孤儿透明归入 upstreamBaselineOrphans，0 新增漂移时 exit 0", () => {
  const jsonRes = runDrift("--json");
  assert.equal(jsonRes.status, 0, jsonRes.stderr || jsonRes.stdout);
  const parsed = JSON.parse(jsonRes.stdout);
  assert.equal(parsed.baselineApplied, true);
  assert.equal(parsed.hasDrift, false);
  assert.equal(parsed.counts.orphanInFrontend, 0);
  assert.equal(parsed.counts.methodMismatches, 0);
  assert.equal(parsed.counts.upstreamBaselineOrphans, 92);
  assert.equal(parsed.orphanInFrontend.length, 0);
  assert.equal(parsed.upstreamBaselineOrphans.length, 92);

  const textRes = runDrift();
  assert.equal(textRes.status, 0, textRes.stderr || textRes.stdout);
  assert.match(textRes.stdout, /ℹ️ 上游只读子模块已知基线差异: 92 个/);
  assert.match(textRes.stdout, /✅ 无契约漂移/);
});

test("上游审计模式（--no-baseline / --strict-upstream）：禁用基线过滤后原始 92 条上游孤儿以 exit 1 报告", () => {
  for (const flag of ["--no-baseline", "--strict-upstream"]) {
    const r = runDrift(flag, "--json");
    assert.equal(r.status, 1, `${flag} 应在原始上游孤儿存在时返回 exit 1`);
    const parsed = JSON.parse(r.stdout);
    assert.equal(parsed.baselineApplied, false);
    assert.equal(parsed.hasDrift, true);
    assert.equal(parsed.counts.orphanInFrontend, 92);
    assert.equal(parsed.counts.upstreamBaselineOrphans, 0);
  }
});

test("隔离夹具验证：仅含已知上游基线路由时 exit 0；一旦新增工程孤儿或动词不匹配立即 exit 1", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tp-contract-drift-"));
  try {
    writeText(
      path.join(tmpDir, "apps/backend/module-crm/CustomerController.java"),
      `package com.example.crm;
@RestController
@RequestMapping("/crm/customer")
public class CustomerController {
  @GetMapping("/page")
  public Object getCustomerPage() { return null; }
}
`
    );
    // 1. 仅存在对齐路由 + 已知上游子模块路由 (/ai1/agent/page 位于 apps/admin/src/api/) -> exit 0
    writeText(
      path.join(tmpDir, "apps/admin/src/api/ai1/agent/index.ts"),
      `export const getAgentPage = (params: any) => request.get({ url: '/ai1/agent/page', params })\n`
    );
    writeText(
      path.join(tmpDir, "packages/api-client/src/crm.ts"),
      `export const fetchCustomerPage = (params: any) => request.get({ url: '/crm/customer/page', params })\n`
    );

    const cleanRes = runDrift("--root", tmpDir, "--json");
    assert.equal(cleanRes.status, 0, cleanRes.stderr || cleanRes.stdout);
    const cleanJson = JSON.parse(cleanRes.stdout);
    assert.equal(cleanJson.hasDrift, false);
    assert.equal(cleanJson.counts.orphanInFrontend, 0);
    assert.equal(cleanJson.counts.upstreamBaselineOrphans, 1);

    // 2. 在 packages/api-client 新增后端未实现的孤儿路由 -> 必须 exit 1
    writeText(
      path.join(tmpDir, "packages/api-client/src/orphan.ts"),
      `export const fetchMissing = () => request.get({ url: '/crm/customer/unexpected-orphan' })\n`
    );
    const orphanRes = runDrift("--root", tmpDir, "--json");
    assert.equal(orphanRes.status, 1, "新增未对齐孤儿路由必须返回 exit 1");
    const orphanJson = JSON.parse(orphanRes.stdout);
    assert.equal(orphanJson.hasDrift, true);
    assert.equal(orphanJson.counts.orphanInFrontend, 1);
    assert.equal(orphanJson.orphanInFrontend[0].path, "/crm/customer/unexpected-orphan");
    fs.rmSync(path.join(tmpDir, "packages/api-client/src/orphan.ts"), { force: true });

    // 3. 即使路径与上游基线相同，只要由自有包 packages/api-client 调用也绝不能被基线掩盖 -> exit 1
    writeText(
      path.join(tmpDir, "packages/api-client/src/shadow-upstream.ts"),
      `export const callUnimplementedAi1 = () => request.get({ url: '/ai1/agent/page' })\n`
    );
    const shadowRes = runDrift("--root", tmpDir, "--json");
    assert.equal(shadowRes.status, 1, "packages/api-client 调用未暴露路由不得被上游子模块基线豁免");
    const shadowJson = JSON.parse(shadowRes.stdout);
    assert.equal(shadowJson.counts.orphanInFrontend, 1);
    assert.equal(shadowJson.counts.upstreamBaselineOrphans, 0);
    fs.rmSync(path.join(tmpDir, "packages/api-client/src/shadow-upstream.ts"), { force: true });

    // 4. HTTP 动词不匹配 (POST vs GET) -> 必须 exit 1
    writeText(
      path.join(tmpDir, "packages/api-client/src/crm.ts"),
      `export const fetchCustomerPageWrongVerb = (data: any) => request.post({ url: '/crm/customer/page', data })\n`
    );
    const verbRes = runDrift("--root", tmpDir, "--json");
    assert.equal(verbRes.status, 1, "HTTP 动词不匹配必须返回 exit 1");
    const verbJson = JSON.parse(verbRes.stdout);
    assert.equal(verbJson.hasDrift, true);
    assert.equal(verbJson.counts.methodMismatches, 1);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("PMO 雷达联动：check:drift 零新增漂移时 PMO 待办队列中 P0 契约漂移项为 0", () => {
  const pmoRes = spawnSync(process.execPath, [PMO_SCRIPT, "pmo", "--json"], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 60000,
  });
  assert.equal(pmoRes.status, 0, pmoRes.stderr || pmoRes.stdout);
  const { pmo } = JSON.parse(pmoRes.stdout);
  const p0ContractDebts = (pmo.techDebts || []).filter(
    (d) => d.priority === "P0" && /契约|drift|孤儿/i.test(`${d.category} ${d.summary} ${d.cmd}`)
  );
  assert.equal(p0ContractDebts.length, 0, `预期 0 条 P0 契约漂移待办，实际: ${JSON.stringify(p0ContractDebts)}`);
});
