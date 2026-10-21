#!/usr/bin/env node
/**
 * scripts/lite-up.mjs
 *
 * yudao lite 档编排器：零 Docker、零外部服务地把 yudao-server 单机拉起
 *
 * 链路：预检 → 抽取并拉起嵌入式真 Redis → 拉起嵌入式真 PostgreSQL → 导入官方 PG 脚本
 *       → 注入 CSPRNG 引导凭据 → 以 -cp fatjar:pgdriver 启动应用 → 用引导凭据探活登录
 *
 * 设计依据：docs/specs/platform/lite-runtime-profile/ 与
 *           docs/01_management/dar/DAR-20261021-lite-runtime-dependencies.md
 *
 * ⚠️ 许可范围：本档使用 Redis 7.4.1（RSALv2 / SSPLv1），仅限本地开发与演示，
 *    严禁用于对外提供 Redis 兼容托管服务；对外分发前必须切换到 BSD-3 方案。
 *
 * 用法：
 *   node scripts/lite-up.mjs                 # 拉起并常驻（Ctrl-C 成对回收）
 *   node scripts/lite-up.mjs --dry-run       # 只打印将执行的步骤
 *   node scripts/lite-up.mjs --verify        # 跑完整验收（含弱默认凭据反证）后退出
 *   node scripts/lite-up.mjs --rotate-credentials
 *
 * 退出码：0 成功；1 运行期失败；2 用法或预检失败
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import * as pgRuntime from "../deploy/lite/runtime/lite-pg.mjs";
import * as credentialsRuntime from "../deploy/lite/runtime/lite-credentials.mjs";
import * as redisRuntime from "../deploy/lite/runtime/lite-redis.mjs";
import * as encryptApi from "../deploy/lite/runtime/lite-api-encrypt.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const EXIT_OK = 0;
const EXIT_RUNTIME = 1;
const EXIT_USAGE = 2;

function findFatJar() {
  const candidates = [
    "apps/backend/yudao-server/target/yudao-server.jar",
    "apps/backend/server/target/yudao-server.jar",
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(ROOT, c))) return c;
  }
  const backendDir = path.join(ROOT, "apps/backend");
  if (fs.existsSync(backendDir)) {
    for (const sub of fs.readdirSync(backendDir)) {
      const targetDir = path.join(backendDir, sub, "target");
      if (fs.existsSync(targetDir)) {
        const jars = fs.readdirSync(targetDir).filter(
          (f) =>
            f.endsWith(".jar") &&
            !f.endsWith("-sources.jar") &&
            !f.endsWith("-javadoc.jar") &&
            !f.startsWith("original-")
        );
        if (jars.length > 0) {
          const sorted = jars.sort(
            (a, b) =>
              fs.statSync(path.join(targetDir, b)).size -
              fs.statSync(path.join(targetDir, a)).size
          );
          return path.join("apps/backend", sub, "target", sorted[0]);
        }
      }
    }
  }
  return "apps/backend/yudao-server/target/yudao-server.jar";
}
let FAT_JAR = findFatJar();
const DRIVER_LIB_DIR = "deploy/lite/lib";
const PG_DRIVER_HINT = "mvn -B -q dependency:get -Dartifact=org.postgresql:postgresql:42.7.11";

// ---------------------------------------------------------------------------
// 参数
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const has = (f) => args.includes(f);
  const value = (f) => {
    const i = args.indexOf(f);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined;
  };
  return {
    dryRun: has("--dry-run"),
    verify: has("--verify"),
    skipImport: has("--skip-import"),
    forceImport: has("--force-import"),
    rotateCredentials: has("--rotate-credentials"),
    noProbe: has("--no-probe"),
    pgPort: Number(value("--pg-port") || process.env.LITE_PG_PORT || pgRuntime.DEFAULTS.port),
    redisPort: Number(value("--redis-port") || process.env.LITE_REDIS_PORT || redisRuntime.DEFAULTS.port),
    redisVariant: value("--redis-variant") || process.env.LITE_REDIS_VARIANT || undefined,
    serverPort: Number(value("--server-port") || process.env.LITE_SERVER_PORT || 48080),
    help: has("--help") || has("-h"),
  };
}

function printHelp() {
  console.log(`yudao lite 档编排器 —— 零 Docker / 零外部服务

用法:
  node scripts/lite-up.mjs [选项]

选项:
  --dry-run              只打印将执行的步骤与预检结果，不启动任何进程
  --verify               启动后跑完整验收（引导凭据登录 200 + admin/admin123 必须失败），随后全部回收并退出
  --pg-port <n>          嵌入式 PG 端口（默认 ${pgRuntime.DEFAULTS.port}）
  --redis-port <n>       嵌入式 Redis 端口（默认 ${redisRuntime.DEFAULTS.port}）
  --redis-variant <id>   Redis 变体：${Object.keys(redisRuntime.VARIANTS).join(" | ")}
                         （也可用 LITE_REDIS_VARIANT；默认 ${redisRuntime.DEFAULT_VARIANT}）
  --server-port <n>      yudao-server 端口（默认 48080）
  --skip-import          跳过导入官方 PG 脚本
  --force-import         强制重新导入官方 PG 脚本
  --rotate-credentials   轮换引导凭据（含管理员与 Redis 口令）
  --no-probe             不做登录探活
  --help                 显示本帮助

流程:
  1) 预检 PG 运行时 / fat jar / PG 驱动 / 端口占用
  2) 从 Maven 制品抽取真 redis-server 二进制并拉起（带 CSPRNG 口令，仅绑 127.0.0.1）
  3) 拉起嵌入式 PostgreSQL 并建库
  4) 导入官方 apps/backend/sql/postgresql/{ruoyi-vue-pro,quartz}.sql 并对账
  5) 注入 CSPRNG 引导凭据：改写 id=1 账号、禁用其余种子弱演示账号
  6) 以 -cp '<fatjar>:<pgdriver>' org.springframework.boot.loader.launch.JarLauncher 启动
  7) 用生成的引导凭据探活 /admin-api/system/auth/login
`);
}

// ---------------------------------------------------------------------------
// 预检
// ---------------------------------------------------------------------------

const BUILD_RECIPE = `  cd apps/backend
  mvn -B clean install -DskipTests -pl yudao-server -am -Dspring-boot.repackage.skip=true
  mvn -B package -DskipTests -pl yudao-server`;

function checkFatJar() {
  FAT_JAR = findFatJar();
  const abs = path.join(ROOT, FAT_JAR);
  if (!fs.existsSync(abs)) {
    return { ok: false, hint: `未找到 fat jar。请用两步构建：\n${BUILD_RECIPE}` };
  }
  const sizeMB = (fs.statSync(abs).size / 1024 / 1024).toFixed(0);

  // 检测致命构建缺陷「fat jar 套 fat jar」：模块 jar 自身被执行过 repackage，
  // 类被放进其内部 BOOT-INF/classes；再整体嵌入上层的 BOOT-INF/lib 后，
  // Spring Boot 扫描期待类在嵌套 jar 根部 → 模块 bean 与 Mapper 全部找不到，应用必然启动失败。
  // 复现特征：No MyBatis mapper was found + 缺少某个模块提供的 CommonApi bean。
  const list = spawnSync("unzip", ["-l", abs], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  const moduleJar = (list.stdout || "")
    .split("\n")
    .map((l) => l.trim().split(/\s+/).pop())
    .find((n) => n && /^BOOT-INF\/lib\/yudao-module-infra-server-.*\.jar$/.test(n));

  if (moduleJar) {
    const tmp = path.join(ROOT, ".commandcode/lite/tmp-check");
    fs.rmSync(tmp, { recursive: true, force: true });
    fs.mkdirSync(tmp, { recursive: true });
    spawnSync("unzip", ["-o", "-j", abs, moduleJar, "-d", tmp], { stdio: "ignore" });
    const extracted = fs.readdirSync(tmp).find((f) => f.endsWith(".jar"));
    if (extracted) {
      const inner = spawnSync("unzip", ["-l", path.join(tmp, extracted)], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      const doubleRepackaged = /BOOT-INF\//.test(inner.stdout || "");
      fs.rmSync(tmp, { recursive: true, force: true });
      if (doubleRepackaged) {
        return {
          ok: false,
          hint: `检测到「fat jar 套 fat jar」：${extracted} 自身是 Spring Boot fat jar（类在 BOOT-INF/classes 下），\n  嵌入后模块 bean 与 MyBatis Mapper 全部扫描不到，应用必然启动失败。\n  请改用两步构建：\n${BUILD_RECIPE}`,
        };
      }
    }
  }

  return { ok: true, abs, sizeMB };
}

function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d;
  }
  return 0;
}

/** PG 驱动为 optional，未打进 fat jar，必须外挂 */
function ensurePgDriver({ onLog } = {}) {
  const libDir = path.join(ROOT, DRIVER_LIB_DIR);
  fs.mkdirSync(libDir, { recursive: true });

  const local = fs.readdirSync(libDir).filter((f) => /^postgresql-[\d.]+\.jar$/.test(f));
  if (local.length > 0) {
    local.sort((a, b) => compareVersions(b.replace(/^postgresql-|\.jar$/g, ""), a.replace(/^postgresql-|\.jar$/g, "")));
    return path.join(libDir, local[0]);
  }

  const m2Base = path.join(os.homedir(), ".m2/repository/org/postgresql/postgresql");
  if (fs.existsSync(m2Base)) {
    const candidates = [];
    for (const ver of fs.readdirSync(m2Base)) {
      const jar = path.join(m2Base, ver, `postgresql-${ver}.jar`);
      if (fs.existsSync(jar)) candidates.push({ ver, jar });
    }
    if (candidates.length > 0) {
      candidates.sort((a, b) => compareVersions(b.ver, a.ver));
      const picked = candidates[0];
      const dest = path.join(libDir, path.basename(picked.jar));
      fs.copyFileSync(picked.jar, dest);
      if (onLog) onLog(`[driver] 从 ~/.m2 复制 PG 驱动 ${picked.ver} → ${DRIVER_LIB_DIR}/`);
      return dest;
    }
  }

  throw new UsageError(`未找到 PG 驱动 jar。请执行: ${PG_DRIVER_HINT}\n或在 ~/.m2 中准备 org.postgresql:postgresql`);
}

function isPortFree(port) {
  const res = spawnSync("bash", ["-lc", `lsof -nP -iTCP:${port} -sTCP:LISTEN >/dev/null 2>&1 && echo BUSY || echo FREE`], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  return (res.stdout || "").trim() !== "BUSY";
}

class UsageError extends Error {}

// ---------------------------------------------------------------------------
// 探活
// ---------------------------------------------------------------------------

async function probeLogin(serverPort, username, password, encryptConfig) {
  const url = `http://127.0.0.1:${serverPort}/admin-api/system/auth/login`;
  const payload = JSON.stringify({ username, password });
  try {
    const headers = { "Content-Type": "application/json", "tenant-id": "1" };
    let body = payload;
    // 蓝图刻意开启 yudao.api-encrypt，且 AuthController#login 带 @ApiEncrypt ⇒ 必须按其真实契约发加密请求
    if (encryptConfig && encryptConfig.enabled) {
      headers[encryptConfig.header] = "true";
      body = encryptApi.encryptRequest(payload, encryptConfig);
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(8000),
    });
    const raw = (await res.text()).trim();

    let text = raw;
    const flagged = encryptConfig && encryptConfig.enabled && res.headers.get(encryptConfig.header);
    if (encryptConfig && encryptConfig.enabled && (flagged || !raw.startsWith("{"))) {
      try {
        text = encryptApi.decryptResponse(raw, encryptConfig);
      } catch {
        /* 解密失败则保留原文用于诊断 */
      }
    }

    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      /* 非 JSON 响应 */
    }
    return {
      status: res.status,
      hasToken: Boolean(json && json.data && json.data.accessToken),
      code: json ? json.code : null,
      msg: json ? json.msg : text.slice(0, 200),
    };
  } catch (e) {
    return { status: 0, hasToken: false, code: null, msg: e.message };
  }
}

async function waitForLogin(serverPort, username, password, encryptConfig, { timeoutMs = 240000, intervalMs = 2000, onTick, shouldAbort } = {}) {
  const deadline = Date.now() + timeoutMs;
  let attempt = 0;
  let last = null;
  while (Date.now() < deadline) {
    if (shouldAbort && shouldAbort()) return { ok: false, aborted: true, attempt, last };
    attempt++;
    last = await probeLogin(serverPort, username, password, encryptConfig);
    if (last.status === 200 && last.hasToken) return { ok: true, attempt, last };
    if (onTick && attempt % 5 === 0) onTick(`…等待应用就绪（第 ${attempt} 次探测，最近: status=${last.status} msg=${String(last.msg).slice(0, 60)}）`);
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return { ok: false, attempt, last };
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs();
  if (opts.help) {
    printHelp();
    process.exit(EXIT_OK);
  }

  let redisVariant;
  try {
    redisVariant = redisRuntime.resolveVariant(opts.redisVariant);
  } catch (e) {
    console.error(`❌ ${e.message}`);
    process.exit(EXIT_USAGE);
  }

  console.log("================================================================");
  console.log("🧩 yudao lite 档启动（零 Docker / 零外部服务）");
  console.log("================================================================");
  console.log(`  仓库根     : ${ROOT}`);
  console.log(`  PG 端口    : ${opts.pgPort}   数据目录: ${pgRuntime.DEFAULTS.dataDir}`);
  console.log(`  Redis 端口 : ${opts.redisPort}（变体 ${redisVariant.id}）`);
  console.log(`  应用端口   : ${opts.serverPort}`);
  console.log(`  Redis 许可 : ${redisVariant.license}`);
  console.log(`               可随交付物分发: ${redisVariant.distributable ? "✅ 是" : "❌ 否"} —— ${redisVariant.licenseNote}`);
  console.log("----------------------------------------------------------------");

  // --- 预检 ---
  const problems = [];

  if (!pgRuntime.isInstalled()) {
    problems.push(`PG 运行时未安装。请执行: ${pgRuntime.installHint(ROOT)}`);
  }

  const fatJar = checkFatJar();
  if (!fatJar.ok) problems.push(fatJar.hint);

  let pgDriver = null;
  try {
    pgDriver = ensurePgDriver({ onLog: (m) => console.log(m) });
  } catch (e) {
    problems.push(e.message);
  }

  for (const [label, port] of [
    ["PG", opts.pgPort],
    ["Redis", opts.redisPort],
    ["应用", opts.serverPort],
  ]) {
    if (!isPortFree(port)) problems.push(`${label} 端口 ${port} 已被占用，请先释放或换端口`);
  }

  if (problems.length > 0) {
    console.error("❌ 预检未通过：");
    for (const p of problems) console.error(`   - ${p}`);
    process.exit(EXIT_USAGE);
  }
  console.log(`✅ 预检通过（fat jar ${fatJar.sizeMB}MB, PG 驱动 ${path.basename(pgDriver)}）`);

  // --- API 加解密契约（蓝图刻意开启 yudao.api-encrypt，且 login 带 @ApiEncrypt，探活须按真实契约发加密请求）---
  let encryptConfig = null;
  try {
    encryptConfig = encryptApi.readEncryptConfig(ROOT);
    console.log(
      `🔒 ApiEncrypt: ${encryptConfig.enabled ? "已开启" : "已关闭"}` +
        (encryptConfig.enabled ? `（header=${encryptConfig.header}, 算法=${encryptConfig.algorithm}）` : "")
    );
  } catch (e) {
    console.log(`🔒 ApiEncrypt: 配置读取失败，将按明文探活（${e.message}）`);
  }

  // --- 凭据 ---
  const creds = credentialsRuntime.loadOrCreateCredentials(ROOT, { rotate: opts.rotateCredentials });
  console.log(`🔐 引导凭据: ${creds.created ? "本次新生成" : "复用已有"} → ${path.relative(ROOT, creds.file)}（权限 ${creds.credentialsFileMode}）`);
  if (creds.created) {
    console.log(`   账号: ${creds.username}`);
    console.log(`   口令: ${creds.password}`);
    console.log("   ⚠️ 该口令仅回显这一次；请立即记录，其后只从凭据文件读取。");
  }

  if (opts.dryRun) {
    console.log("----------------------------------------------------------------");
    console.log("🧪 dry-run：将执行以下步骤（不落地）");
    console.log(`  1) 抽取并启动真 redis-server（端口 ${opts.redisPort}，requirepass 已生成，仅绑 127.0.0.1）`);
    console.log(`  2) 启动嵌入式 PostgreSQL ${opts.pgPort}，数据目录 ${pgRuntime.DEFAULTS.dataDir}`);
    console.log(`  3) 建库 ${pgRuntime.DEFAULTS.database} 并导入官方脚本: ${pgRuntime.OFFICIAL_SQL.join(", ")}`);
    console.log(`  4) 注入引导凭据：改写 system_users id=1，并禁用其余种子弱演示账号`);
    console.log(`  5) 启动应用: java -cp '${FAT_JAR}:${DRIVER_LIB_DIR}/<pg-driver>.jar' org.springframework.boot.loader.launch.JarLauncher --spring.profiles.active=lite --spring.config.additional-location=file:./deploy/lite/`);
    console.log(`  6) 探活: POST http://127.0.0.1:${opts.serverPort}/admin-api/system/auth/login（使用生成的引导凭据）`);
    console.log("================================================================");
    process.exit(EXIT_OK);
  }

  let redisHandle = null;
  let pgHandle = null;
  let app = null;

  const shutdown = async () => {
    if (app && !app.killed) {
      try {
        app.kill("SIGTERM");
      } catch {
        /* ignore */
      }
    }
    redisRuntime.stopRedis(redisHandle);
    await pgRuntime.stopPostgres(pgHandle);
  };

  // SIGINT(Ctrl-C) / SIGTERM(docker stop、CI 取消) / SIGHUP(终端关闭) 统一走优雅回收
  for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
    process.on(sig, async () => {
      console.log(`\n🛑 收到 ${sig}，正在成对回收进程…`);
      await shutdown();
      process.exit(EXIT_OK);
    });
  }

  // 兜底：任何退出路径都尽力同步关掉 java 与 redis。
  // PG 由 embedded-postgres 在进程退出时自清理；若 node 被 SIGKILL，则需 `pnpm lite:down` 兜底。
  process.on("exit", () => {
    try {
      if (app && !app.killed) app.kill("SIGTERM");
    } catch {
      /* ignore */
    }
    try {
      redisRuntime.stopRedis(redisHandle);
    } catch {
      /* ignore */
    }
  });

  try {
    // --- 0. 子模块补丁注入（幂等）---
    // ApiEncrypt 开箱即用等差异化改动收敛在主仓 deploy/patches/，子模块指针保持纯上游提交，
    // 否则别人 clone 不到指向本地提交的 gitlink。这里在启动前注入。
    console.log("🔧 注入子模块补丁（deploy/patches，幂等）…");
    const patchRun = spawnSync(process.execPath, [path.join(ROOT, "scripts/submodule-patches.mjs"), "--apply", "--quiet"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (patchRun.status !== 0) {
      throw new Error(
        `子模块补丁注入失败（exit=${patchRun.status}）：\n${(patchRun.stdout || "") + (patchRun.stderr || "")}`
      );
    }
    const patchOut = (patchRun.stdout || "").trim();
    console.log(patchOut ? patchOut.split("\n").map((l) => `   ${l.trim()}`).join("\n") : "   已是最新，无需注入");

    // --- 1. Redis ---
    console.log(`🐘 启动嵌入式真 Redis（端口 ${opts.redisPort}，变体 ${redisVariant.id}）…`);
    redisHandle = await redisRuntime.startRedis(ROOT, {
      port: opts.redisPort,
      password: creds.redisPassword,
      variant: redisVariant.id,
      onLog: (m) => {
        if (/Ready to accept|Server initialized/.test(m)) console.log(m);
      },
      onError: () => {},
    });
    console.log(`   ${redisHandle.versionLine}（仅绑 127.0.0.1，requirepass 已启用，未开启持久化）`);

    const info = await redisRuntime.serverInfo(redisHandle);
    console.log(`   真引擎校验: redis_version=${info.redis_version || "?"} os=${info.os || "?"}（非模拟器）`);

    // --- 2. PG ---
    console.log(`🐘 启动嵌入式 PostgreSQL（端口 ${opts.pgPort}）…`);
    pgHandle = await pgRuntime.startPostgres({
      port: opts.pgPort,
      user: pgRuntime.DEFAULTS.user,
      password: pgRuntime.DEFAULTS.password,
      dataDir: pgRuntime.DEFAULTS.dataDir,
    });
    console.log(`   ${pgHandle.reinitialised ? "已 initdb 新数据目录" : "复用已初始化数据目录"}: ${pgHandle.dataDir}`);

    const db = await pgRuntime.ensureDatabase({
      port: opts.pgPort,
      user: pgRuntime.DEFAULTS.user,
      password: pgRuntime.DEFAULTS.password,
      database: pgRuntime.DEFAULTS.database,
    });
    if (db.created) console.log(`   已创建数据库 ${pgRuntime.DEFAULTS.database}`);

    // --- 3. 导入官方 SQL ---
    const seeded = await pgRuntime.isSeeded({
      port: opts.pgPort,
      user: pgRuntime.DEFAULTS.user,
      password: pgRuntime.DEFAULTS.password,
      database: pgRuntime.DEFAULTS.database,
    });

    if (opts.forceImport || (!seeded && !opts.skipImport)) {
      console.log(`📥 导入官方 PG 脚本（${pgRuntime.OFFICIAL_SQL.length} 个文件）…`);
      const stats = await pgRuntime.importOfficialSql({
        port: opts.pgPort,
        user: pgRuntime.DEFAULTS.user,
        password: pgRuntime.DEFAULTS.password,
        database: pgRuntime.DEFAULTS.database,
        files: pgRuntime.OFFICIAL_SQL,
        onProgress: (p) => console.log(`   ${p.file}（${(p.bytes / 1024 / 1024).toFixed(2)}MB）`),
      });
      console.log(`   对账: tables=${stats.tables} sequences=${stats.sequences} users=${stats.users}`);
      const drift = pgRuntime.compareToExpected(stats);
      if (drift.length > 0) console.error(`   ⚠️ 与实测基线漂移: ${drift.join("; ")}`);
    } else {
      console.log("📥 已存在数据（跳过导入；--force-import 可强制重导）");
    }

    // --- 4. 注入引导凭据 ---
    console.log("🔐 注入引导凭据并列装禁种子弱账号…");
    const client = pgRuntime.makeClient({
      port: opts.pgPort,
      user: pgRuntime.DEFAULTS.user,
      password: pgRuntime.DEFAULTS.password,
      database: pgRuntime.DEFAULTS.database,
    });
    await client.connect();
    try {
      const applied = await credentialsRuntime.applyBootstrapCredentials(client, {
        username: creds.username,
        password: creds.password,
      });
      console.log(`   引导账号: ${applied.username}（bcrypt cost 10）`);
      console.log(`   已禁用其余种子弱演示账号: ${applied.disabledSeededUsers} 个`);
    } finally {
      await client.end();
    }

    // --- 5. 启动应用 ---
    console.log("🚀 启动 yudao-server…");
    const sep = process.platform === "win32" ? ";" : ":";
    app = spawn(
      "java",
      [
        "-cp",
        `${path.join(ROOT, FAT_JAR)}${sep}${pgDriver}`,
        "org.springframework.boot.loader.launch.JarLauncher",
        "--spring.profiles.active=lite",
        "--spring.config.additional-location=file:./deploy/lite/",
      ],
      {
        cwd: ROOT,
        env: {
          ...process.env,
          LITE_PG_PORT: String(opts.pgPort),
          LITE_PG_USER: pgRuntime.DEFAULTS.user,
          LITE_PG_PASSWORD: pgRuntime.DEFAULTS.password,
          LITE_REDIS_PORT: String(opts.redisPort),
          LITE_REDIS_PASSWORD: creds.redisPassword,
        },
        stdio: ["ignore", "pipe", "pipe"],
      }
    );

    // 应用日志同时落盘：否则失败后只能看到内存里最后 80 行，无法复盘（如间歇性 500）
    const logDir = path.join(ROOT, ".commandcode/lite/logs");
    fs.mkdirSync(logDir, { recursive: true });
    const appLogFile = path.join(logDir, `yudao-server-${new Date().toISOString().replace(/[:.]/g, "-")}.log`);
    const appLogStream = fs.createWriteStream(appLogFile, { flags: "a" });

    const appLog = [];
    let appExited = null;
    const pushLog = (line) => {
      appLog.push(line);
      if (appLog.length > 400) appLog.shift();
    };
    const onChunk = (b) => {
      appLogStream.write(b);
      String(b)
        .split("\n")
        .forEach((l) => l.trim() && pushLog(l));
    };
    app.stdout.on("data", onChunk);
    app.stderr.on("data", onChunk);
    app.on("exit", () => appLogStream.end());
    app.on("exit", (code) => {
      appExited = { code };
      console.error(`\n❌ [app] 进程已退出 code=${code} —— 立即打印应用日志尾部（不再空等探活超时）`);
      for (const l of appLog.slice(-80)) console.error(`   ${l}`);
    });

    // --- 6. 探活 ---
    let probe = { ok: false, last: null };
    if (!opts.noProbe) {
      console.log(`🔎 等待应用就绪并探活登录（最长 4 分钟）…`);
      probe = await waitForLogin(opts.serverPort, creds.username, creds.password, encryptConfig, {
        onTick: (m) => console.log(`   ${m}`),
        shouldAbort: () => appExited !== null,
      });
      if (probe.ok) {
        console.log(`✅ 登录成功（第 ${probe.attempt} 次探测）：HTTP 200 + accessToken`);
      } else if (probe.aborted) {
        console.error(`❌ 应用在就绪前异常退出（code=${appExited.code}），探活中止`);
      } else {
        console.error(`❌ 登录探活失败：status=${probe.last ? probe.last.status : "?"} msg=${probe.last ? probe.last.msg : "?"}`);
        console.error("   应用日志尾部：");
        for (const l of appLog.slice(-30)) console.error(`   ${l}`);
      }
    }

    // --- 7. --verify：完整验收 ---
    if (opts.verify) {
      console.log("----------------------------------------------------------------");
      console.log("🧪 验收：弱默认凭据反证（admin/admin123 必须失败）");
      const weak = await probeLogin(opts.serverPort, "admin", "admin123", encryptConfig);
      const weakRejected = !(weak.status === 200 && weak.hasToken);
      console.log(
        `   admin/admin123 → HTTP ${weak.status}, code=${weak.code}, msg="${String(weak.msg).slice(0, 40)}" ` +
          (weakRejected ? "✅ 已拒绝（未签发 token）" : "❌ 竟然登录成功！")
      );

      console.log("🧪 验收：连续登录（回归防护——只登录一次会漏掉连接池类缺陷）");
      // 真实教训：Druid + PostgreSQL 的 PreparedStatement 池会导致「首次成功、后续交替 500」，
      // 只做一次登录的验收完全发现不了。这里连续登录 3 次，全部成功才算过。
      let repeatOk = true;
      for (let i = 1; i <= 3; i++) {
        const r = await probeLogin(opts.serverPort, creds.username, creds.password, encryptConfig);
        const okOne = r.status === 200 && r.hasToken;
        if (!okOne) repeatOk = false;
        console.log(
          `   第 ${i} 次连续登录 → HTTP ${r.status}${okOne ? " + accessToken ✅" : ` ❌ code=${r.code} msg=${String(r.msg).slice(0, 60)}`}`
        );
        if (!okOne) break;
      }

      console.log("🧪 验收：子模块差异收敛复核（改动必须恰好等于 deploy/patches 声明的补丁）");
      const patchCheck = spawnSync(
        process.execPath,
        [path.join(ROOT, "scripts/submodule-patches.mjs"), "--check"],
        { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
      );
      const patchesOk = patchCheck.status === 0;
      console.log(
        `   submodule-patches --check → ${patchesOk ? "✅ 合法（无未声明改动）" : "❌ 存在未声明改动或补丁冲突"}`
      );
      if (!patchesOk) console.log((patchCheck.stdout || "").split("\n").map((l) => `     ${l}`).join("\n"));

      console.log("----------------------------------------------------------------");
      const passed = probe.ok && repeatOk && weakRejected && patchesOk;
      console.log(passed ? "✅ 验收全部通过" : "❌ 验收未通过");
      await shutdown();
      process.exit(passed ? EXIT_OK : EXIT_RUNTIME);
    }

    if (!probe.ok && !opts.noProbe) {
      await shutdown();
      process.exit(EXIT_RUNTIME);
    }

    console.log("================================================================");
    console.log("🎉 lite 档已就绪");
    console.log(`   应用: http://127.0.0.1:${opts.serverPort}/admin-api`);
    console.log(`   文档: http://127.0.0.1:${opts.serverPort}/swagger-ui`);
    console.log(`   登录: 使用 ${path.relative(ROOT, creds.file)} 中的 LITE_ADMIN_USERNAME / LITE_ADMIN_PASSWORD`);
    console.log(`   数据库: jdbc:postgresql://127.0.0.1:${opts.pgPort}/ruoyi-vue-pro`);
    console.log(`   Redis : 127.0.0.1:${opts.redisPort}（requirepass 见凭据文件）`);
    console.log(`   应用日志: ${path.relative(ROOT, appLogFile)}`);
    console.log("   Ctrl-C 将成对回收 Redis 与 java 进程");
    console.log("================================================================");
  } catch (e) {
    console.error(`❌ 启动失败: ${e.message}`);
    await shutdown();
    process.exit(e instanceof UsageError ? EXIT_USAGE : EXIT_RUNTIME);
  }
}

main().catch((e) => {
  console.error(`❌ 未捕获异常: ${e && e.stack ? e.stack : e}`);
  process.exit(EXIT_RUNTIME);
});
