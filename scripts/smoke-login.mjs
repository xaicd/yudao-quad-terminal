#!/usr/bin/env node
/**
 * scripts/smoke-login.mjs
 *
 * 登录冒烟：对**已经在运行**的 yudao-server 做一次真实登录探测（不负责启动应用）。
 *
 * 与 `lite:verify` 的分工：
 * - `pnpm lite:verify` = 拉起双引擎 + 导入官方 SQL + 启动应用 + 登录 + 弱凭据反证 + 回收（全链路）
 * - `pnpm smoke:login` = 只探测运行中的实例（部署后、CI 里 app 已起时可单独跑，秒级）
 *
 * 用法：
 *   pnpm smoke:login [--port 48080] [--username x] [--password y] [--json]
 * 凭据优先级：命令行参数 > .commandcode/lite/credentials.env
 *
 * 退出码：0 登录成功且拿到 accessToken；1 失败；2 用法/凭据缺失
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as encryptApi from "../deploy/lite/runtime/lite-api-encrypt.mjs";
import { loadOrCreateCredentials } from "../deploy/lite/runtime/lite-credentials.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function parseArgs() {
  const args = process.argv.slice(2);
  const value = (f) => {
    const i = args.indexOf(f);
    return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : undefined;
  };
  return {
    port: Number(value("--port") || process.env.LITE_SERVER_PORT || 48080),
    username: value("--username"),
    password: value("--password"),
    json: args.includes("--json"),
    help: args.includes("--help") || args.includes("-h"),
  };
}

function loadCreds(opts) {
  if (opts.username && opts.password) return { username: opts.username, password: opts.password, source: "argv" };
  const credsFile = path.join(ROOT, ".commandcode/lite/credentials.env");
  if (!fs.existsSync(credsFile)) return null;
  // rotate:false 时只读取、不生成（冒烟不应凭空造凭据）
  const c = loadOrCreateCredentials(ROOT, { rotate: false });
  return { username: c.username, password: c.password, source: path.relative(ROOT, c.file) };
}

async function main() {
  const opts = parseArgs();
  if (opts.help) {
    console.log("用法: pnpm smoke:login [--port 48080] [--username x] [--password y] [--json]");
    process.exit(0);
  }

  const creds = loadCreds(opts);
  if (!creds) {
    console.error("❌ 未找到凭据：请先在 lite 档生成（pnpm lite:up），或用 --username/--password 传入");
    process.exit(2);
  }

  let encryptConfig = null;
  try {
    encryptConfig = encryptApi.readEncryptConfig(ROOT);
  } catch {
    /* 读不到配置则按明文探测 */
  }

  const payload = JSON.stringify({ username: creds.username, password: creds.password });
  const headers = { "Content-Type": "application/json", "tenant-id": "1" };
  let body = payload;
  if (encryptConfig && encryptConfig.enabled) {
    headers[encryptConfig.header] = "true";
    body = encryptApi.encryptRequest(payload, encryptConfig);
  }

  const url = `http://127.0.0.1:${opts.port}/admin-api/system/auth/login`;
  let res;
  let raw;
  try {
    res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(10000) });
    raw = (await res.text()).trim();
  } catch (e) {
    const msg = `无法连接 ${url}：${e.message}（应用是否已启动？）`;
    if (opts.json) console.log(JSON.stringify({ ok: false, error: msg }, null, 2));
    else console.error(`❌ ${msg}`);
    process.exit(1);
  }

  let text = raw;
  if (encryptConfig && encryptConfig.enabled && (res.headers.get(encryptConfig.header) || !raw.startsWith("{"))) {
    try {
      text = encryptApi.decryptResponse(raw, encryptConfig);
    } catch {
      /* 保留原文 */
    }
  }

  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* 非 JSON */
  }
  const ok = res.status === 200 && Boolean(json && json.data && json.data.accessToken);

  if (opts.json) {
    console.log(
      JSON.stringify(
        { ok, status: res.status, code: json ? json.code : null, msg: json ? json.msg : text.slice(0, 200), user: creds.username, credSource: creds.source },
        null,
        2
      )
    );
  } else if (ok) {
    console.log(`✅ 登录冒烟通过：HTTP ${res.status} + accessToken（账号 ${creds.username}，凭据来源 ${creds.source}）`);
  } else {
    console.error(`❌ 登录冒烟失败：HTTP ${res.status}, code=${json ? json.code : "?"}, msg=${json ? json.msg : text.slice(0, 160)}`);
  }

  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(`❌ 冒烟异常: ${e.message}`);
  process.exit(1);
});
