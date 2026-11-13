/**
 * e2e/helpers/pg-verifier.mjs
 *
 * 真实 PostgreSQL 数据库断言助手 —— 供 Playwright E2E 与 Stage B2/B3/B4 验收直接核验真实落库状态、
 * 状态机扭转与 Append-Only SHA-256 审计日志（Zero Fake Mock）。
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

import * as pgRuntime from "../../deploy/lite/runtime/lite-pg.mjs";
import { resolveProjectEndpoints } from "./env-and-playwright.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");

export async function withPgClient(fn, rootDir = REPO_ROOT) {
  const endpoints = resolveProjectEndpoints(rootDir);
  const client = pgRuntime.makeClient({
    port: endpoints.dbPort,
    user: pgRuntime.DEFAULTS.user,
    password: pgRuntime.DEFAULTS.password,
    database: pgRuntime.DEFAULTS.database,
  });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}

export async function queryScalar(sql, params = [], rootDir = REPO_ROOT) {
  return withPgClient(async (client) => {
    const res = await client.query(sql, params);
    if (!res.rows[0]) return null;
    const firstKey = Object.keys(res.rows[0])[0];
    return res.rows[0][firstKey];
  }, rootDir);
}
