/**
 * deploy/lite/pg/lite-pg.mjs
 *
 * lite 档的嵌入式 PostgreSQL 运行时封装（零 Docker）
 *
 * 设计约束（见 docs/specs/platform/lite-runtime-profile/）：
 * 1. apps/backend 是 git submodule，一律不改 → PG 运行时与编排全部落主仓 deploy/lite/。
 * 2. 必须用真实 PostgreSQL 并复用官方 apps/backend/sql/postgresql/ 脚本 → 不手写第二份 DDL。
 * 3. 运行时装在自包含目录（本目录的 node_modules），不进根 pnpm workspace。
 *
 * 本文件是「库」，由 scripts/lite-up.mjs 编排调用；也可单独 node 执行做自检。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

export const PG_RUNTIME_DIR = path.dirname(fileURLToPath(import.meta.url));
export const PG_MODULES_DIR = path.join(PG_RUNTIME_DIR, "node_modules");

export const DEFAULTS = {
  port: 55432,
  user: "yudao",
  password: "yudao",
  database: "ruoyi-vue-pro",
  dataDir: ".commandcode/lite/pgdata",
};

/** 官方 PG 脚本（子模块内，只读不写） */
export const OFFICIAL_SQL = [
  "apps/backend/sql/postgresql/ruoyi-vue-pro.sql",
  "apps/backend/sql/postgresql/quartz.sql",
];

/** 实测基线（2026-10-21）：官方脚本导入后应有的规模，作为验收对账依据 */
export const EXPECTED = { tables: 60, sequences: 48 };

export function isInstalled() {
  return (
    fs.existsSync(path.join(PG_MODULES_DIR, "embedded-postgres")) &&
    fs.existsSync(path.join(PG_MODULES_DIR, "pg"))
  );
}

export function installHint(rootDir) {
  const rel = path.relative(rootDir, PG_RUNTIME_DIR) || ".";
  return `cd ${rel} && pnpm install`;
}

function requireFromRuntime(id) {
  return createRequire(path.join(PG_RUNTIME_DIR, "package.json"))(id);
}

/** embedded-postgres 是 ESM-only，需按它自己声明的 exports 入口动态 import */
export async function loadEmbeddedPostgres() {
  const pkgDir = path.join(PG_MODULES_DIR, "embedded-postgres");
  const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
  const entry = typeof pkg.exports === "string" ? pkg.exports : pkg.exports["."];
  const mod = await import(pathToFileURL(path.join(pkgDir, entry)).href);
  return mod.default ?? mod.EmbeddedPostgres;
}

export function makeClient({ port, user, password, database }) {
  const { Client } = requireFromRuntime("pg");
  return new Client({
    host: "127.0.0.1",
    port,
    user,
    password,
    database,
    connectionTimeoutMillis: 10000,
  });
}

/**
 * 启动嵌入式 PG。
 * 数据目录已初始化（存在 PG_VERSION）时跳过 initdb，保证二次启动快且不碰已有数据。
 */
export async function startPostgres({ port, user, password, dataDir, onLog, onError }) {
  const EmbeddedPostgres = await loadEmbeddedPostgres();
  const absDataDir = path.resolve(dataDir);
  const alreadyInitialised = fs.existsSync(path.join(absDataDir, "PG_VERSION"));

  fs.mkdirSync(absDataDir, { recursive: true });

  const runtime = new EmbeddedPostgres({
    databaseDir: absDataDir,
    port,
    user,
    password,
    persistent: true, // 停机不删数据，保证二次启动秒起
    onLog: onLog || (() => {}),
    onError: onError || (() => {}),
  });

  if (!alreadyInitialised) await runtime.initialise();
  await runtime.start();

  return { runtime, dataDir: absDataDir, reinitialised: !alreadyInitialised };
}

export async function stopPostgres(handle) {
  if (!handle || !handle.runtime) return;
  try {
    await handle.runtime.stop();
  } catch {
    /* 停机失败不阻塞退出 */
  }
}

export async function ensureDatabase({ port, user, password, database }) {
  const admin = makeClient({ port, user, password, database: "postgres" });
  await admin.connect();
  try {
    const { rows } = await admin.query("select 1 from pg_database where datname = $1", [database]);
    if (rows.length === 0) {
      await admin.query(`CREATE DATABASE "${database}"`);
      return { created: true };
    }
    return { created: false };
  } finally {
    await admin.end();
  }
}

/** 是否已经导入过官方脚本（以 system_users 是否存在为准） */
export async function isSeeded({ port, user, password, database }) {
  try {
    const client = makeClient({ port, user, password, database });
    await client.connect();
    try {
      const r = await client.query(
        "select count(*)::int as n from information_schema.tables where table_schema='public' and table_name='system_users'"
      );
      return r.rows[0].n > 0;
    } finally {
      await client.end();
    }
  } catch {
    return false;
  }
}

/**
 * 导入官方 SQL 脚本（多语句 simple query，pg 原生支持整文件执行）。
 * 返回规模画像用于与 EXPECTED 对账 —— 本档的验收靠「表数对账」而不是「启动没报错」。
 */
export async function importOfficialSql({ port, user, password, database, files, onProgress }) {
  const client = makeClient({ port, user, password, database });
  await client.connect();
  try {
    for (const rel of files) {
      const abs = path.resolve(rel);
      const sql = fs.readFileSync(abs, "utf8");
      if (onProgress) onProgress({ file: rel, bytes: Buffer.byteLength(sql), startedAt: Date.now() });
      await client.query(sql);
    }
    const t = await client.query(
      "select count(*)::int as n from information_schema.tables where table_schema='public'"
    );
    const s = await client.query(
      "select count(*)::int as n from information_schema.sequences where sequence_schema='public'"
    );
    const u = await client.query("select count(*)::int as n from system_users");
    return { tables: t.rows[0].n, sequences: s.rows[0].n, users: u.rows[0].n };
  } finally {
    await client.end();
  }
}

export function compareToExpected(stats) {
  const drift = [];
  if (stats.tables !== EXPECTED.tables) drift.push(`tables 期望 ${EXPECTED.tables}，实际 ${stats.tables}`);
  if (stats.sequences !== EXPECTED.sequences) drift.push(`sequences 期望 ${EXPECTED.sequences}，实际 ${stats.sequences}`);
  return drift;
}

/* ------------------------------------------------------------------------
 * 自检：node deploy/lite/pg/lite-pg.mjs --self-test
 * 启 PG → 导入官方脚本 → 对账 → 停 PG
 * ---------------------------------------------------------------------- */
if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const selfTest = async () => {
    if (!isInstalled()) {
      console.error(`❌ PG 运行时未安装。请执行: ${installHint(process.cwd())}`);
      process.exit(2);
    }
    const opts = { ...DEFAULTS, dataDir: DEFAULTS.dataDir };
    console.log(`[lite-pg] 启动嵌入式 PG (port=${opts.port}, dataDir=${path.resolve(opts.dataDir)})`);
    const handle = await startPostgres(opts);
    try {
      console.log(`[lite-pg] ${handle.reinitialised ? "已 initdb 新数据目录" : "复用已初始化的数据目录"}`);
      await ensureDatabase(opts);
      const stats = await importOfficialSql({ ...opts, files: OFFICIAL_SQL });
      const drift = compareToExpected(stats);
      console.log(`[lite-pg] 对账: tables=${stats.tables} sequences=${stats.sequences} users=${stats.users}`);
      if (drift.length > 0) {
        console.error(`❌ 与基线漂移: ${drift.join("; ")}`);
        process.exitCode = 1;
      } else {
        console.log("✅ 与实测基线一致");
      }
    } finally {
      await stopPostgres(handle);
      console.log("[lite-pg] 已停止");
    }
  };
  selfTest().catch((e) => {
    console.error(`❌ 自检失败: ${e.message}`);
    process.exit(1);
  });
}
