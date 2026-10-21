/**
 * deploy/lite/runtime/lite-redis.mjs
 *
 * lite 档的嵌入式「真 Redis」运行时（零 Docker、零编译）
 *
 * 为什么是「真 Redis」：jedis-mock / ioredis-mock 是模拟器，语义不完整；
 * 这里从 Maven 制品中抽取**预编译的官方 redis-server 二进制**，与 embedded-postgres 对称。
 *
 * 支持两个变体（由 `--redis-variant` 或环境变量 LITE_REDIS_VARIANT 选择）：
 *
 * | variant            | 引擎版本  | 许可                        | 可随交付物分发 |
 * |--------------------|-----------|-----------------------------|----------------|
 * | redis-7.4.1 (默认) | 7.4.1     | RSALv2 / SSPLv1             | ❌ 否          |
 * | redis-6.2.6-bsd    | 6.2.x     | BSD-3-Clause                | ✅ 是          |
 *
 * 许可取舍与证据链见 docs/01_management/dar/DAR-20261021-lite-runtime-dependencies.md：
 * 默认选 7.4.1 用于本地开发/演示；**一旦 lite 运行时需随交付物分发，必须切到 redis-6.2.6-bsd**。
 *
 * 二进制不入库：一律抽取到 .commandcode/lite/bin/（已被 .gitignore 覆盖）。
 */

import fs from "node:fs";
import path from "node:path";
import net from "node:net";
import os from "node:os";
import { spawn, spawnSync } from "node:child_process";

export const DEFAULTS = { port: 63799, bind: "127.0.0.1" };

export const BIN_DIR = ".commandcode/lite/bin";
export const DATA_DIR = ".commandcode/lite/redis-data";

export const VARIANTS = {
  "redis-7.4.1": {
    id: "redis-7.4.1",
    label: "Redis 7.4.1",
    group: "com.github.lansheng228",
    artifact: "embedded-redis",
    version: "7.4.1",
    license: "RSALv2 / SSPLv1（source-available，非 copyleft，不传染工程代码）",
    distributable: false,
    licenseNote: "仅限本地开发/演示；禁止对外提供 Redis 兼容托管服务；分发前必须切换到 redis-6.2.6-bsd",
  },
  "redis-6.2.6-bsd": {
    id: "redis-6.2.6-bsd",
    // 注意：制品的平台二进制版本并不统一（darwin-arm64 实测为 6.2.11，标签沿用 6.2.x）
    label: "Redis 6.2.x（BSD-3）",
    group: "com.github.codemonstur",
    artifact: "embedded-redis",
    version: "1.4.3",
    license: "BSD-3-Clause",
    distributable: true,
    licenseNote: "许可干净，可随交付物分发；实测 darwin-arm64 二进制为 6.2.11",
  },
};

export const DEFAULT_VARIANT = "redis-7.4.1";

export function resolveVariant(name) {
  const id = name || process.env.LITE_REDIS_VARIANT || DEFAULT_VARIANT;
  const variant = VARIANTS[id];
  if (!variant) {
    throw new Error(`未知 Redis 变体: "${id}"（可选: ${Object.keys(VARIANTS).join(" / ")}）`);
  }
  return variant;
}

/** Node 平台/架构 → 制品内的条目后缀 */
export function platformSuffix() {
  const plat = process.platform === "darwin" ? "darwin" : process.platform === "linux" ? "linux" : null;
  const arch = process.arch === "arm64" ? "arm64" : process.arch === "x64" ? "amd64" : null;
  if (!plat || !arch) {
    throw new Error(`不支持的平台: ${process.platform}-${process.arch}（制品仅含 darwin/linux × arm64/amd64）`);
  }
  return `${plat}-${arch}`;
}

function artifactCoords(variant) {
  return `${variant.group}:${variant.artifact}:${variant.version}`;
}

/** 定位制品 jar；缺失则用 Maven 拉取（与构建 fat jar 同源前置，不引入新工具链依赖） */
export function ensureArtifactJar(rootDir, variant, { onLog } = {}) {
  const home = process.env.HOME || process.env.USERPROFILE || "";
  const jarPath = path.join(
    home,
    ".m2",
    "repository",
    ...variant.group.split("."),
    variant.artifact,
    variant.version,
    `${variant.artifact}-${variant.version}.jar`
  );

  if (fs.existsSync(jarPath)) return jarPath;

  if (onLog) onLog(`[redis] ~/.m2 中未找到制品，执行 mvn dependency:get -Dartifact=${artifactCoords(variant)}`);
  spawnSync("mvn", ["-B", "-q", "dependency:get", `-Dartifact=${artifactCoords(variant)}`], {
    cwd: rootDir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (!fs.existsSync(jarPath)) {
    throw new Error(`无法获取 Redis 制品: ${artifactCoords(variant)}`);
  }
  return jarPath;
}

/** 列出 jar 内的条目名（只取最后一段路径） */
export function listJarEntries(jarPath) {
  const res = spawnSync("unzip", ["-Z1", jarPath], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });
  if (res.status !== 0) throw new Error(`无法读取制品条目: ${jarPath}`);
  return (res.stdout || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.split("/").pop());
}

/** 从 jar 中抽取单个条目到目标路径（unzip 优先，回退 jar xf） */
export function extractEntry(jarPath, entry, outPath, { rootDir } = {}) {
  fs.rmSync(outPath, { force: true });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const res = spawnSync("unzip", ["-p", jarPath, entry], {
    encoding: "buffer",
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });
  let ok = res.status === 0 && res.stdout && res.stdout.length > 0;

  if (ok) {
    fs.writeFileSync(outPath, res.stdout, { mode: 0o755 });
  } else {
    const tmpDir = path.join(rootDir || process.cwd(), ".commandcode/lite/tmp-extract");
    fs.rmSync(tmpDir, { recursive: true, force: true });
    fs.mkdirSync(tmpDir, { recursive: true });
    const r2 = spawnSync("jar", ["xf", jarPath, entry], {
      cwd: tmpDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const produced = path.join(tmpDir, entry);
    ok = r2.status === 0 && fs.existsSync(produced);
    if (ok) {
      fs.renameSync(produced, outPath);
    }
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  if (!ok) throw new Error(`从制品中抽取条目失败: ${entry}（该平台可能不受支持）`);
  fs.chmodSync(outPath, 0o755);
  return outPath;
}

/**
 * 抽取并校验二进制。
 * 不走固定命名模板：不同上游制品的命名不统一（如 `6.2.6-v5`、或 linux-arm64 只有 6.2.7），
 * 因此直接按 `<kind>-*-<platform>` 匹配条目。
 */
export function ensureBinaries(rootDir, variant, { onLog } = {}) {
  const suffix = platformSuffix();
  const binDir = path.join(rootDir, BIN_DIR);
  fs.mkdirSync(binDir, { recursive: true });

  const jarPath = ensureArtifactJar(rootDir, variant, { onLog });
  const entries = listJarEntries(jarPath);

  const pick = (kind) =>
    entries.find((n) => new RegExp(`^${kind}-.*-${suffix}$`).test(n)) || null;

  const serverEntry = pick("redis-server");
  if (!serverEntry) {
    throw new Error(
      `制品 ${artifactCoords(variant)} 中没有 ${suffix} 平台的 redis-server 条目（共 ${entries.length} 个条目）`
    );
  }
  const cliEntry = pick("redis-cli"); // 部分制品不带 cli，缺失时降级为纯 RESP 探测

  const server = path.join(binDir, `${variant.id}-${serverEntry}`);
  const cli = cliEntry ? path.join(binDir, `${variant.id}-${cliEntry}`) : null;

  if (!fs.existsSync(server)) extractEntry(jarPath, serverEntry, server, { rootDir });
  if (cli && !fs.existsSync(cli)) extractEntry(jarPath, cliEntry, cli, { rootDir });

  // 校验确实是真 Redis（不只看文件存在）
  const v = spawnSync(server, ["--version"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  const versionLine = (v.stdout || "").trim();
  if (v.status !== 0 || !/^Redis server v=\d+\.\d+/.test(versionLine)) {
    throw new Error(`抽出的 redis-server 校验失败（输出: ${versionLine || "空"}）`);
  }

  return { server, cli, jarPath, suffix, versionLine, serverEntry, cliEntry };
}

/* ----------------------------------------------------------------------------
 * 最小 RESP 客户端（不依赖 redis-cli）
 * -------------------------------------------------------------------------- */

let lastSocketError = null;

/** 构造 RESP 数组命令（口令可能含特殊字符，必须走 RESP 而非 inline 命令） */
function respCommand(...args) {
  return `*${args.length}\r\n${args.map((a) => `$${Buffer.byteLength(a)}\r\n${a}\r\n`).join("")}`;
}

/**
 * 最小 RESP 回复解析器：从缓冲区解析一条回复，返回 { value, rest }；数据不足返回 null。
 * 支持 + 简单串 / - 错误 / : 整数 / $ 批量串 / * 数组。
 * 注：本档只用于文本协议（INFO、GET、EVAL 等），按字符计长即可。
 */
function parseReply(buf) {
  const nl = buf.indexOf("\r\n");
  if (nl < 0) return null;
  const type = buf[0];
  const line = buf.slice(1, nl);
  const rest = buf.slice(nl + 2);

  if (type === "+") return { value: line, rest };
  if (type === "-") return { value: { error: line }, rest };
  if (type === ":") return { value: Number(line), rest };
  if (type === "$") {
    const len = Number(line);
    if (len < 0) return { value: null, rest };
    if (rest.length < len + 2) return null;
    return { value: rest.slice(0, len), rest: rest.slice(len + 2) };
  }
  if (type === "*") {
    const count = Number(line);
    if (count < 0) return { value: null, rest };
    const items = [];
    let r = rest;
    for (let i = 0; i < count; i++) {
      const sub = parseReply(r);
      if (!sub) return null;
      items.push(sub.value);
      r = sub.rest;
    }
    return { value: items, rest: r };
  }
  return { value: line, rest };
}

/**
 * 建立连接、按需 AUTH，再执行一条命令并返回解析后的值。
 * 关键：AUTH 的回复必须与命令回复分开消费，否则会把 "+OK" 当成命令结果（早期 bug）。
 */
function command(port, password, args, { timeoutMs = 4000 } = {}) {
  return new Promise((resolve, reject) => {
    const socket = net.connect({ host: DEFAULTS.bind, port });
    let buf = "";
    let stage = password ? "auth" : "cmd";
    let settled = false;

    const fail = (e) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      reject(e);
    };
    const finish = (v) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(v);
    };

    const drain = () => {
      for (;;) {
        const parsed = parseReply(buf);
        if (!parsed) return;
        buf = parsed.rest;
        const value = parsed.value;
        if (value && typeof value === "object" && value.error) {
          return fail(new Error(`Redis 错误(${args[0]}): ${value.error}`));
        }
        if (stage === "auth") {
          stage = "cmd";
          socket.write(respCommand(...args));
          continue;
        }
        return finish(value);
      }
    };

    socket.setTimeout(timeoutMs, () => fail(new Error(`Redis 命令超时: ${args[0]}`)));
    socket.on("error", (e) => {
      lastSocketError = e;
      fail(e);
    });
    socket.on("data", (b) => {
      buf += String(b);
      drain();
    });
    socket.on("connect", () => {
      if (password) socket.write(respCommand("AUTH", password));
      else socket.write(respCommand(...args));
    });
  });
}

export async function ping(port, { password, timeoutMs = 800 } = {}) {
  try {
    const out = await command(port, password, ["PING"], { timeoutMs });
    return String(out).includes("PONG");
  } catch {
    return false;
  }
}

export async function waitForReady(port, { timeoutMs = 20000, intervalMs = 250, password } = {}) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await ping(port, { password })) return true;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}

/** 读取 INFO 并按行拆成 key:value（用于「真引擎」校验） */
export async function serverInfo(handle) {
  const text = await command(handle.port, handle.password ? handle.password : undefined, ["INFO", "server"]);
  const info = {};
  for (const line of String(text).split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf(":");
    if (i > 0) info[trimmed.slice(0, i)] = trimmed.slice(i + 1);
  }
  return info;
}

/** 通用命令执行（自检 / 门禁用；同样不依赖 redis-cli） */
export async function execCommand(handle, args, opts = {}) {
  return command(handle.port, handle.password ? handle.password : undefined, args, opts);
}

/* ----------------------------------------------------------------------------
 * 生命周期
 * -------------------------------------------------------------------------- */

/**
 * 启动嵌入式真 Redis。
 * 安全默认：仅绑 127.0.0.1、启用 requirepass（口令由 lite-credentials 生成）、关闭持久化。
 */
export async function startRedis(rootDir, { port = DEFAULTS.port, password, variant: variantName, onLog, onError } = {}) {
  const variant = resolveVariant(variantName);
  const { server, cli, versionLine, serverEntry } = ensureBinaries(rootDir, variant, { onLog });

  const dataDir = path.join(rootDir, DATA_DIR);
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });

  const args = [
    "--bind", DEFAULTS.bind,
    "--port", String(port),
    "--dir", dataDir,
    "--save", "",          // lite 档不做 RDB 持久化
    "--appendonly", "no",
    "--daemonize", "no",
    "--protected-mode", "yes",
  ];
  if (password) args.push("--requirepass", password);

  const child = spawn(server, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (onLog) child.stdout.on("data", (b) => onLog(`[redis] ${String(b).trimEnd()}`));
  if (onError) child.stderr.on("data", (b) => onError(`[redis] ${String(b).trimEnd()}`));

  let exited = null;
  child.on("exit", (code, signal) => {
    exited = { code, signal };
  });

  const ready = await waitForReady(port, { password });
  if (!ready) {
    try {
      child.kill("SIGKILL");
    } catch {
      /* ignore */
    }
    throw new Error(
      `嵌入式 Redis 启动后未就绪（port=${port}）${exited ? `，进程已退出 code=${exited.code}` : ""}` +
        `${lastSocketError ? `，socket: ${lastSocketError.message}` : ""}`
    );
  }

  return {
    child,
    server,
    cli,
    serverEntry,
    port,
    dataDir,
    variant,
    versionLine,
    // 存真实口令（RESP 鉴权与 redis-cli 的 REDISCLI_AUTH 都需要它；不可存布尔标记）
    password: password || null,
    get exited() {
      return exited;
    },
  };
}

export function stopRedis(handle) {
  if (!handle || !handle.child) return;
  try {
    handle.child.kill("SIGTERM");
  } catch {
    /* ignore */
  }
}

/** 若制品自带 redis-cli，则可用它执行命令（调试用；核心链路不依赖它） */
export function redisCli(handle, args, { timeoutMs = 8000 } = {}) {
  if (!handle.cli) return { code: 127, stdout: "", stderr: "该变体的制品未附带 redis-cli" };
  const base = ["-h", DEFAULTS.bind, "-p", String(handle.port)];
  const res = spawnSync(handle.cli, [...base, ...args], {
    encoding: "utf8",
    timeout: timeoutMs,
    env: handle.password ? { ...process.env, REDISCLI_AUTH: handle.password } : process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  return { code: res.status, stdout: (res.stdout || "").trim(), stderr: (res.stderr || "").trim() };
}
