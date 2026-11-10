/**
 * 跨底座统一的嵌入式真实 PostgreSQL 端点解析器（与 cooliebase-all/scripts/lib/ephemeral-pg.cjs 100% 同名同契约）
 *
 * 解析优先级（外部环境永远优先）：
 *   ① `DATABASE_URL` 已设置 → 直接用它，不启动任何进程；
 *   ② `PGHOST` 已设置 → 据此拼接连接串；
 *   ③ 都没有 → 启动嵌入式真实 PostgreSQL 18.4 (`embedded-postgres`)，测试结束后自动回收并清除临时 dataDir；
 *   ④ 启动失败 → fail-loud 并附带最近 Postgres 日志，绝不降级为 SQLite 或内存假 Mock。
 */

const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const { createRequire } = require("node:module");
const { pathToFileURL } = require("node:url");

const ROOT = path.resolve(__dirname, "../..");
const LITE_RUNTIME_DIR = path.join(ROOT, "deploy", "lite", "runtime");

function loadPgClient() {
  try {
    return require("pg").Client;
  } catch {
    const runtimeReq = createRequire(path.join(LITE_RUNTIME_DIR, "package.json"));
    return runtimeReq("pg").Client;
  }
}

async function loadEmbeddedPostgres() {
  try {
    const mod = await import("embedded-postgres");
    return mod.default ?? mod.EmbeddedPostgres ?? mod;
  } catch {
    const pkgDir = path.join(LITE_RUNTIME_DIR, "node_modules", "embedded-postgres");
    const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
    const entry = typeof pkg.exports === "string" ? pkg.exports : pkg.exports["."];
    const mod = await import(pathToFileURL(path.join(pkgDir, entry)).href);
    return mod.default ?? mod.EmbeddedPostgres ?? mod;
  }
}

const LOG_BUFFER_LIMIT = 40;

function createLogBuffer() {
  const lines = [];
  return {
    push(line) {
      const text = String(line ?? "").trimEnd();
      if (!text) return;
      lines.push(text);
      if (lines.length > LOG_BUFFER_LIMIT) lines.shift();
    },
    recent(count = 12) {
      return lines.slice(-count);
    },
  };
}

function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close(() => (port ? resolve(port) : reject(new Error("无法探测空闲端口"))));
    });
  });
}

function waitForPortClosed(port, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve) => {
    const attempt = () => {
      const socket = net.connect(port, "127.0.0.1");
      socket.once("connect", () => {
        socket.destroy();
        if (Date.now() > deadline) return resolve(false);
        setTimeout(attempt, 150);
      });
      socket.once("error", () => resolve(true));
    };
    attempt();
  });
}

function actualPortFromPidFile(dataDir, fallbackPort) {
  try {
    const body = fs.readFileSync(path.join(dataDir, "postmaster.pid"), "utf8");
    const portText = body.split("\n")[3];
    const port = Number(portText);
    return Number.isSafeInteger(port) && port > 0 && port < 65536 ? port : fallbackPort;
  } catch {
    return fallbackPort;
  }
}

function assertExplicitUrl(url) {
  if (!/^postgres(ql)?:\/\//.test(url)) {
    throw new Error(
      `DATABASE_URL 不是 Postgres 连接串（当前以 "${url.slice(0, 12)}..." 开头）。` +
        " 本 helper 只服务真实 Postgres —— 严禁回退到 sqlite/内存。"
    );
  }
}

async function resolveDatabaseEndpoint(options = {}) {
  const logger = options.logger ?? console;
  const logs = createLogBuffer();

  const explicit = process.env.DATABASE_URL;
  if (explicit) {
    assertExplicitUrl(explicit);
    logger.log("[pg-endpoint] 使用外部 DATABASE_URL（不启动嵌入式 Postgres）");
    return {
      url: explicit,
      source: "external",
      port: null,
      dataDir: null,
      recentLogs: () => logs.recent(),
      close: async () => {},
    };
  }

  const pgHost = process.env.PGHOST;
  if (pgHost) {
    const port = process.env.PGPORT || "55432";
    const url = `postgresql://${process.env.PGUSER || "yudao"}:${process.env.PGPASSWORD || "yudao"}@${pgHost}:${port}/postgres?schema=public`;
    logger.log(`[pg-endpoint] 使用 PGHOST 指定的数据库 ${pgHost}:${port}`);
    return {
      url,
      source: "external",
      port: Number(port),
      dataDir: null,
      recentLogs: () => logs.recent(),
      close: async () => {},
    };
  }

  const port = await findFreePort();
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "yudao-epg-"));
  const isRoot = typeof process.getuid === "function" && process.getuid() === 0;
  if (isRoot) {
    try {
      fs.chmodSync(dataDir, 0o777);
    } catch {}
  }
  logger.log(`[pg-endpoint] 启动嵌入式 Postgres（port=${port}, dataDir=${dataDir}）`);

  const EmbeddedPostgres = await loadEmbeddedPostgres();
  const instance = new EmbeddedPostgres({
    databaseDir: dataDir,
    port,
    user: "postgres",
    password: "postgres",
    persistent: options.persistent ?? false,
    createPostgresUser: isRoot,
    initdbFlags: ["--encoding=UTF8", "--locale=C"],
    onLog: (line) => logs.push(line),
    onError: (line) => logs.push(line),
  });

  const keepDataDir = options.persistent === true;
  let started = false;
  let actualPort = port;
  const close = async () => {
    if (!started) return;
    started = false;
    try {
      await instance.stop();
    } catch (error) {
      logger.error(`[pg-endpoint] 停止嵌入式 Postgres 失败: ${error?.message ?? error}`);
    }
    await waitForPortClosed(actualPort);
    if (!keepDataDir) {
      try {
        fs.rmSync(dataDir, { recursive: true, force: true });
      } catch (error) {
        logger.error(`[pg-endpoint] ✗ 删除临时 dataDir 失败: ${error?.message ?? error}`);
      }
    }
  };

  try {
    await instance.initialise();
    await instance.start();
    started = true;
    actualPort = actualPortFromPidFile(dataDir, port);
  } catch (error) {
    await close();
    const tail = logs.recent().join("\n");
    throw new Error(
      `嵌入式 Postgres 启动失败: ${error?.message ?? error}` +
        (tail ? `\n--- Postgres 最近日志 ---\n${tail}` : "\n（未捕获到 Postgres 日志）")
    );
  }

  const url = `postgresql://postgres:postgres@127.0.0.1:${actualPort}/postgres`;
  return {
    url,
    source: "embedded",
    port: actualPort,
    dataDir,
    recentLogs: () => logs.recent(),
    close,
  };
}

function createClient(url) {
  const Client = loadPgClient();
  return new Client({ connectionString: url });
}

async function query(url, sql, params = []) {
  const client = createClient(url);
  try {
    await client.connect();
    return await client.query(sql, params);
  } finally {
    await client.end().catch(() => undefined);
  }
}

function withDatabase(url, database) {
  const parsed = new URL(url);
  parsed.pathname = `/${database}`;
  return parsed.toString();
}

module.exports = {
  resolveDatabaseEndpoint,
  findFreePort,
  waitForPortClosed,
  query,
  withDatabase,
  createClient,
};
