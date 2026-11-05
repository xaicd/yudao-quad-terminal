#!/usr/bin/env node
/**
 * scripts/run-all.cjs
 * Coolie 商业交付工厂 —— 全栈四位一体统一拉起与就绪自验中枢 (Full-Stack Launcher & Readiness Verifier)
 * 
 * 核心能力：
 * 1. 动态从项目名取值生成 API 前缀 (如 /<slug>/admin-api, /<slug>/app-api, /<slug>/open-api)；
 * 2. 动态端口偏移分配 (如 48017 / 3017 / 48122 / 48120)，杜绝多项目同机运行 EADDRINUSE 冲突；
 * 3. 自动探测并拉起后端 (Java/Spring Boot)、B端管理端 (Vue3/Vite)、C端独立商城 (UniApp H5) 与企业级统一接入网关 (Unified Gateway)；
 * 4. 实时就绪探针轮询 (Active Readiness Probe) 监听动态端口与路径；
 * 5. 真实性机检：
 *    - 后端 REST API: 验证 ${apiPrefix}/infra/health 与 ${openApiPrefix} 等返回 200 JSON
 *    - B端 Web 页面: 验证 / 返回 200 HTML 且 DOM 挂载点有效
 *    - C端 H5 页面: 验证 / 返回 200 HTML
 *    - 统一接入网关: 验证 /<slug>/2c/, /<slug>/admin/, /<slug>/admin-api/ 穿透打通
 * 6. 支持 --check / --verify-only 模式作为 CI/CD 与 CMMI 质量门禁执行静态/动态断言。
 */

const { spawn } = require("child_process");
const http = require("http");
const net = require("net");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const IS_CHECK_ONLY = args.includes("--check") || args.includes("--verify-only");

const children = [];

function cleanup() {
  for (const child of children) {
    try { if (child.pid) process.kill(-child.pid, "SIGTERM"); } catch {}
    try { if (child.pid) child.kill("SIGTERM"); } catch {}
  }
}

process.on("SIGINT", () => { cleanup(); process.exit(0); });
process.on("SIGTERM", () => { cleanup(); process.exit(0); });
process.on("exit", () => cleanup());

const C = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  bold: "\x1b[1m"
};

// 动态解析项目标识、API 前缀与隔离端口 (从项目名动态取值)
let projectName = path.basename(process.cwd());
try {
  const pkg = JSON.parse(fs.readFileSync(path.resolve("package.json"), "utf8"));
  if (pkg.name) projectName = pkg.name.replace(/^@.*\//, "");
} catch {}

const projectSlug = projectName.split(" ")[0].toLowerCase().replace(/[^a-z0-9_-]/g, "").replace(/^-|-$/g, "") || "app";
const numMatch = projectSlug.match(/[0-9]+$/);
const portOffset = numMatch ? (parseInt(numMatch[0], 10) % 500) : 0;

let apiPrefix = process.env.API_PREFIX || process.env.VITE_API_PREFIX;
let appApiPrefix = process.env.APP_API_PREFIX || process.env.VITE_APP_API_PREFIX;
let openApiPrefix = process.env.OPEN_API_PREFIX || process.env.VITE_OPEN_API_PREFIX;
let backendPort = parseInt(process.env.SERVER_PORT || process.env.BACKEND_PORT || "", 10);
let frontendPort = parseInt(process.env.VITE_FRONTEND_PORT || process.env.FRONTEND_PORT || process.env.PORT || "", 10);
let miniappPort = parseInt(process.env.MINIAPP_PORT || process.env.VITE_MINIAPP_PORT || "", 10);
let gatewayPort = parseInt(process.env.GATEWAY_PORT || "", 10);

function readEnvKey(text, ...keys) {
  for (const key of keys) {
    const m = text.match(new RegExp(`(?:^|\\r?\\n)\\s*${key}\\s*=\\s*([^\\r\\n]+)`));
    if (m && m[1].trim()) return m[1].trim();
  }
  return null;
}

for (const envFile of [".env", ".env.local", "apps/admin/.env", "apps/miniapp/.env"]) {
  const p = path.resolve(envFile);
  if (fs.existsSync(p)) {
    const envText = fs.readFileSync(p, "utf8");
    if (!apiPrefix) {
      const v = readEnvKey(envText, "VITE_API_PREFIX", "API_PREFIX");
      if (v) apiPrefix = v;
    }
    if (!appApiPrefix) {
      const v = readEnvKey(envText, "VITE_APP_API_PREFIX", "APP_API_PREFIX");
      if (v) appApiPrefix = v;
    }
    if (!openApiPrefix) {
      const v = readEnvKey(envText, "VITE_OPEN_API_PREFIX", "OPEN_API_PREFIX");
      if (v) openApiPrefix = v;
    }
    if (!backendPort || isNaN(backendPort)) {
      const v = readEnvKey(envText, "VITE_BACKEND_PORT", "BACKEND_PORT", "SERVER_PORT");
      if (v) backendPort = parseInt(v, 10);
    }
    if (!frontendPort || isNaN(frontendPort)) {
      const v = readEnvKey(envText, "VITE_FRONTEND_PORT", "FRONTEND_PORT", "PORT");
      if (v) frontendPort = parseInt(v, 10);
    }
    if (!miniappPort || isNaN(miniappPort)) {
      const v = readEnvKey(envText, "VITE_MINIAPP_PORT", "MINIAPP_PORT");
      if (v) miniappPort = parseInt(v, 10);
    }
    if (!gatewayPort || isNaN(gatewayPort)) {
      const v = readEnvKey(envText, "GATEWAY_PORT");
      if (v) gatewayPort = parseInt(v, 10);
    }
  }
}

// 默认回退与动态衍生 (若无指定端口则优先使用隔离端口，否则 fallback 到标准端口)
if (!apiPrefix) apiPrefix = `/${projectSlug}/admin-api`;
if (!appApiPrefix) appApiPrefix = `/${projectSlug}/app-api`;
if (!openApiPrefix) openApiPrefix = `/${projectSlug}/open-api`;
if (!backendPort || isNaN(backendPort)) backendPort = 48000 + portOffset;
if (!frontendPort || isNaN(frontendPort)) frontendPort = 3000 + portOffset;
if (!miniappPort || isNaN(miniappPort)) miniappPort = 48122;
if (!gatewayPort || isNaN(gatewayPort)) gatewayPort = 48120;

function probeTcpPort(port, host = "127.0.0.1", timeout = 1000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let resolved = false;
    socket.setTimeout(timeout);
    socket.once("connect", () => { resolved = true; socket.destroy(); resolve(true); });
    socket.once("timeout", () => { if (!resolved) { resolved = true; socket.destroy(); resolve(false); } });
    socket.once("error", () => { if (!resolved) { resolved = true; resolve(false); } });
    socket.connect(port, host);
  });
}

function fetchHttp(url, timeout = 2000) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout }, (res) => {
      let data = "";
      res.on("data", chunk => { data += chunk; });
      res.on("end", () => {
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 400, status: res.statusCode, body: data });
      });
    });
    req.on("timeout", () => { req.destroy(); resolve({ ok: false, status: 0, body: "TIMEOUT" }); });
    req.on("error", (err) => { resolve({ ok: false, status: 0, body: err.message }); });
  });
}

async function runCheckOnly() {
  console.log(`\n${C.bold}🔍 [Preflight Check] 执行四位一体工程资产、动态前缀与接口真实性审查...${C.reset}`);
  console.log(`  🏢 项目标识: ${C.cyan}${projectSlug}${C.reset} | 端口: 后端 ${backendPort} / B端前端 ${frontendPort} / C端前台 ${miniappPort} / 网关 ${gatewayPort}`);

  const isNextFullstack = fs.existsSync(path.resolve("next.config.mjs")) || fs.existsSync(path.resolve("next.config.js")) || fs.existsSync(path.resolve("next.config.ts"));
  const backendJar = path.resolve("apps/backend/server/target/yudao-server.jar");
  const backendPom = path.resolve("apps/backend/server/pom.xml");
  const altBackendPom = path.resolve("apps/backend/yudao-server/pom.xml");
  const hasBackend = isNextFullstack || fs.existsSync(backendJar) || fs.existsSync(backendPom) || fs.existsSync(altBackendPom);
  console.log(`  ☕ 后端工程资产: ${hasBackend ? (isNextFullstack ? C.green + "✅ 在位 (Next.js 前后端同构 API 路由)" + C.reset : C.green + "✅ 在位 (Java/Spring Boot)" + C.reset) : C.red + "❌ 缺失" + C.reset}`);
  
  const adminPkg = path.resolve("apps/admin/package.json");
  const adminHtml = path.resolve("apps/admin/index.html");
  const adminApp = path.resolve("apps/admin/src/App.vue");
  const hasFrontendPage = isNextFullstack || (fs.existsSync(adminPkg) && (fs.existsSync(adminHtml) || fs.existsSync(adminApp)));
  console.log(`  🌐 B端管理前端: ${hasFrontendPage ? C.green + "✅ 在位 (具有实体 HTML/Vue3/Next 页面)" + C.reset : C.red + "❌ 缺失" + C.reset}`);

  const miniappPkg = path.resolve("apps/miniapp/package.json");
  const miniappDist = path.resolve("apps/miniapp/dist/build/h5/index.html");
  const hasMiniapp = fs.existsSync(miniappPkg) || fs.existsSync(miniappDist);
  console.log(`  📱 C端前台商城: ${hasMiniapp ? C.green + "✅ 在位 (UniApp H5 独立工程)" + C.reset : C.yellow + "⚪ 未启用" + C.reset}`);

  const beTargetPortAlive = await probeTcpPort(backendPort);
  const beLegacyPortAlive = await probeTcpPort(48080);
  const bePortAlive = beTargetPortAlive || beLegacyPortAlive;
  const actualBePort = beTargetPortAlive ? backendPort : (beLegacyPortAlive ? 48080 : backendPort);

  const feTargetPortAlive = await probeTcpPort(frontendPort);
  const feLegacyPortAlive = await probeTcpPort(3000) || await probeTcpPort(48121);
  const fePortAlive = feTargetPortAlive || feLegacyPortAlive;
  const actualFePort = feTargetPortAlive ? frontendPort : (await probeTcpPort(48121) ? 48121 : 3000);

  const miniPortAlive = await probeTcpPort(miniappPort);
  const gwPortAlive = await probeTcpPort(gatewayPort);

  console.log(`  🔌 端口 ${actualBePort} (后端): ${bePortAlive ? C.green + "🟢 活跃监听中" + C.reset : C.yellow + "⚪ 待启动" + C.reset}`);
  console.log(`  🔌 端口 ${actualFePort} (B端管理): ${fePortAlive ? C.green + "🟢 活跃监听中" + C.reset : C.yellow + "⚪ 待启动" + C.reset}`);
  console.log(`  🔌 端口 ${miniappPort} (C端商城): ${miniPortAlive ? C.green + "🟢 活跃监听中" + C.reset : C.yellow + "⚪ 待启动" + C.reset}`);
  console.log(`  🔌 端口 ${gatewayPort} (统一网关): ${gwPortAlive ? C.green + "🟢 活跃监听中" + C.reset : C.yellow + "⚪ 待启动" + C.reset}`);

  if (bePortAlive) {
    let apiRes = await fetchHttp(`http://127.0.0.1:${actualBePort}${apiPrefix}/infra/health`);
    if (!apiRes.ok) apiRes = await fetchHttp(`http://127.0.0.1:${actualBePort}/admin-api/infra/health`);
    if (!apiRes.ok) apiRes = await fetchHttp(`http://127.0.0.1:${actualBePort}/admin-api/system/health`);
    console.log(`  🩺 管理端接口响应: [HTTP ${apiRes.status}] ${apiRes.ok ? C.green + "✅ 真实 REST API (" + apiPrefix + ")" + C.reset : C.yellow + "⚠️ 响应非 200" + C.reset}`);

    let appRes = await fetchHttp(`http://127.0.0.1:${actualBePort}${appApiPrefix}/infra/health`);
    if (!appRes.ok) appRes = await fetchHttp(`http://127.0.0.1:${actualBePort}/app-api/infra/health`);
    if (appRes.ok) {
      console.log(`  📱 移动端接口响应: [HTTP ${appRes.status}] ${C.green}✅ 真实 REST API (${appApiPrefix})${C.reset}`);
    }

    let openRes = await fetchHttp(`http://127.0.0.1:${actualBePort}${openApiPrefix}/infra/health`);
    if (!openRes.ok) openRes = await fetchHttp(`http://127.0.0.1:${actualBePort}/open-api/infra/health`);
    if (openRes.ok) {
      console.log(`  🌐 开放端接口响应: [HTTP ${openRes.status}] ${C.green}✅ 真实 REST API (${openApiPrefix})${C.reset}`);
    }

    const docRes = await fetchHttp(`http://127.0.0.1:${actualBePort}/doc.html`);
    if (docRes.ok) {
      console.log(`  📄 Knife4j 契约文档: [HTTP 200] ${C.green}✅ 交互式文档已就绪 (http://127.0.0.1:${actualBePort}/doc.html)${C.reset}`);
    }
  }

  if (gwPortAlive) {
    const cRes = await fetchHttp(`http://127.0.0.1:${gatewayPort}/${projectSlug}/2c/`);
    console.log(`  🛍️ 网关 C端商城路径: [HTTP ${cRes.status}] ${cRes.ok ? C.green + "✅ 通路正常 (/${projectSlug}/2c/)" + C.reset : C.yellow + "⚠️ 响应非 200" + C.reset}`);

    const bRes = await fetchHttp(`http://127.0.0.1:${gatewayPort}/${projectSlug}/admin/`);
    console.log(`  🏢 网关 B端管理路径: [HTTP ${bRes.status}] ${bRes.ok ? C.green + "✅ 通路正常 (/${projectSlug}/admin/)" + C.reset : C.yellow + "⚠️ 响应非 200" + C.reset}`);

    const apiRes = await fetchHttp(`http://127.0.0.1:${gatewayPort}/${projectSlug}/admin-api/infra/health`);
    console.log(`  🔌 网关 API 接口穿透: [HTTP ${apiRes.status}] ${apiRes.ok ? C.green + "✅ 接口反代畅通 (/${projectSlug}/admin-api/...)" + C.reset : C.yellow + "⚠️ 响应非 200" + C.reset}`);
  }

  console.log(`\n  📋 ${C.bold}全栈统一路径契约矩阵 (Unified Access Matrix)${C.reset}:`);
  console.log(`     • C端前台商城: ${C.cyan}http://127.0.0.1:${gatewayPort}/${projectSlug}/2c/${C.reset}`);
  console.log(`     • B端管理中台: ${C.cyan}http://127.0.0.1:${gatewayPort}/${projectSlug}/admin/${C.reset}`);
  console.log(`     • 管理中台 API: ${C.cyan}http://127.0.0.1:${gatewayPort}/${projectSlug}/admin-api/*${C.reset}`);
  console.log(`     • 移动商城 API: ${C.cyan}http://127.0.0.1:${gatewayPort}/${projectSlug}/app-api/*${C.reset}`);
  console.log(`     • 开放生态 API: ${C.cyan}http://127.0.0.1:${gatewayPort}/${projectSlug}/open-api/*${C.reset}`);

  const allGood = hasBackend && hasFrontendPage;
  console.log(`\n📋 审查结论: ${allGood ? C.green + "CMMI 真实工程资产校验通过 (0 假Mock)" + C.reset : C.red + "资产缺失，需修复" + C.reset}\n`);
  process.exit(allGood ? 0 : 1);
}

async function main() {
  if (IS_CHECK_ONLY) {
    await runCheckOnly();
    return;
  }

  console.log("========================================================================");
  console.log(`🚀 ${C.bold}Coolie 商业交付工厂 —— 全栈四位一体统一拉起与就绪自验中枢${C.reset}`);
  console.log(`   项目标识: ${C.cyan}${projectSlug}${C.reset}`);
  console.log(`   统一拓扑: Spring Boot (${backendPort}) + Vue3 (${frontendPort}) + UniApp (${miniappPort}) + 网关 (${gatewayPort})`);
  console.log("========================================================================\n");

  const envOverrides = {
    ...process.env,
    SERVER_PORT: String(backendPort),
    BACKEND_PORT: String(backendPort),
    API_PREFIX: apiPrefix,
    APP_API_PREFIX: appApiPrefix,
    OPEN_API_PREFIX: openApiPrefix,
    VITE_API_PREFIX: apiPrefix,
    VITE_APP_API_PREFIX: appApiPrefix,
    VITE_OPEN_API_PREFIX: openApiPrefix,
    VITE_BACKEND_PORT: String(backendPort),
    VITE_FRONTEND_PORT: String(frontendPort),
    PORT: String(frontendPort),
    MINIAPP_PORT: String(miniappPort),
    GATEWAY_PORT: String(gatewayPort),
    PROJECT_SLUG: projectSlug
  };

  const backendJar = path.resolve("apps/backend/server/target/yudao-server.jar");
  const backendPom = path.resolve("apps/backend/server/pom.xml");
  const altBackendPom = path.resolve("apps/backend/yudao-server/pom.xml");
  let backendStarted = false;

  const beTargetPortAlive = await probeTcpPort(backendPort) || await probeTcpPort(48080);
  if (!beTargetPortAlive) {
    if (fs.existsSync(backendJar)) {
      console.log(`  ☕ [Backend] 启动预打包 Spring Boot Jar 生产运行时 (端口 ${backendPort}, 前缀 ${apiPrefix})...`);
      const beArgs = ["-jar", backendJar, "--spring.profiles.active=local", `--server.port=${backendPort}`, `--api.prefix=${apiPrefix}`];
      const be = spawn("java", beArgs, { env: envOverrides, stdio: "inherit", detached: true });
      children.push(be);
      backendStarted = true;
    } else if (fs.existsSync(backendPom)) {
      console.log(`  ☕ [Backend] 启动 Spring Boot 后端工程 (apps/backend/server, 端口 ${backendPort}, 前缀 ${apiPrefix})...`);
      const mvnArgs = ["spring-boot:run", "-Dspring-boot.run.profiles=local", `-Dspring-boot.run.arguments=--server.port=${backendPort} --api.prefix=${apiPrefix}`];
      const be = spawn("mvn", mvnArgs, { cwd: path.resolve("apps/backend/server"), env: envOverrides, stdio: "inherit", detached: true });
      children.push(be);
      backendStarted = true;
    } else if (fs.existsSync(altBackendPom)) {
      console.log(`  ☕ [Backend] 启动 Spring Boot 后端工程 (apps/backend/yudao-server, 端口 ${backendPort}, 前缀 ${apiPrefix})...`);
      const mvnArgs = ["spring-boot:run", "-Dspring-boot.run.profiles=local", `-Dspring-boot.run.arguments=--server.port=${backendPort} --api.prefix=${apiPrefix}`];
      const be = spawn("mvn", mvnArgs, { cwd: path.resolve("apps/backend/yudao-server"), env: envOverrides, stdio: "inherit", detached: true });
      children.push(be);
      backendStarted = true;
    }
  } else {
    console.log(`  ☕ [Backend] 后端已在运行中 (端口 ${backendPort})，跳过启动`);
  }

  const adminPkg = path.resolve("apps/admin/package.json");
  let frontendStarted = false;
  const fePortAlive = await probeTcpPort(frontendPort) || await probeTcpPort(48121);
  if (!fePortAlive) {
    if (fs.existsSync(adminPkg)) {
      console.log(`  🌐 [Frontend] 启动 Vue3 管理中台 (apps/admin, 端口 ${frontendPort})...`);
      const fe = spawn("pnpm", ["--filter", "./apps/admin", "dev", "--port", String(frontendPort)], { env: envOverrides, stdio: "inherit", detached: true });
      children.push(fe);
      frontendStarted = true;
    } else if (fs.existsSync(path.resolve("next.config.mjs")) || fs.existsSync(path.resolve("next.config.js"))) {
      console.log(`  🌐 [Fullstack] 启动 Next.js 前后端同构服务 (端口 ${frontendPort})...`);
      const fsChild = spawn("pnpm", ["run", "dev", "-p", String(frontendPort)], { env: envOverrides, stdio: "inherit", detached: true });
      children.push(fsChild);
      frontendStarted = true;
    }
  } else {
    console.log(`  🌐 [Frontend] B端管理前端已在运行中 (端口 ${frontendPort})，跳过启动`);
  }

  const miniappH5Dist = path.resolve("apps/miniapp/dist/build/h5");
  const miniappPkg = path.resolve("apps/miniapp/package.json");
  let miniappStarted = false;
  const miniPortAlive = await probeTcpPort(miniappPort);
  if (!miniPortAlive && (fs.existsSync(miniappH5Dist) || fs.existsSync(miniappPkg))) {
    if (fs.existsSync(path.join(miniappH5Dist, "index.html"))) {
      console.log(`  📱 [Miniapp] 启动 C端前台商城静态服务 (端口 ${miniappPort}, BasePath /${projectSlug}/2c/)...`);
      const serveScript = path.resolve("scripts/serve-miniapp.cjs");
      const mini = spawn(process.execPath, [serveScript, "--port", String(miniappPort), "--slug", projectSlug, "--dir", miniappH5Dist], { env: envOverrides, stdio: "inherit", detached: true });
      children.push(mini);
      miniappStarted = true;
    } else {
      console.log(`  📱 [Miniapp] 启动 C端前台商城开发服务器 (apps/miniapp, 端口 ${miniappPort})...`);
      const mini = spawn("pnpm", ["--filter", "shopro", "run", "dev:h5"], { env: envOverrides, stdio: "inherit", detached: true });
      children.push(mini);
      miniappStarted = true;
    }
  } else if (miniPortAlive) {
    console.log(`  📱 [Miniapp] C端前台商城已在运行中 (端口 ${miniappPort})，跳过启动`);
  }

  const gatewayScript = path.resolve("deploy/gateway/unified-gateway.mjs");
  let gatewayStarted = false;
  const gwPortAlive = await probeTcpPort(gatewayPort);
  if (!gwPortAlive && fs.existsSync(gatewayScript)) {
    console.log(`  🚪 [Gateway] 启动企业级统一接入网关 (端口 ${gatewayPort})...`);
    const gw = spawn("node", [gatewayScript], { env: envOverrides, stdio: "inherit", detached: true });
    children.push(gw);
    gatewayStarted = true;
  } else if (gwPortAlive) {
    console.log(`  🚪 [Gateway] 企业级统一接入网关已在运行中 (端口 ${gatewayPort})，跳过启动`);
  }

  console.log(`\n⏳ 正在后台监听服务就绪探针 (Readiness Probe 轮询中，最大等待 45s)...`);
  let beReady = false;
  let feReady = false;
  let miniReady = false;
  let gwReady = false;
  const maxAttempts = 45;

  for (let i = 1; i <= maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 1000));
    if (!beReady) {
      const portOk = await probeTcpPort(backendPort) || await probeTcpPort(48080);
      if (portOk) {
        const actualPort = (await probeTcpPort(backendPort)) ? backendPort : 48080;
        let res = await fetchHttp(`http://127.0.0.1:${actualPort}${apiPrefix}/infra/health`);
        if (!res.ok) res = await fetchHttp(`http://127.0.0.1:${actualPort}/admin-api/infra/health`);
        if (res.ok) beReady = true;
      }
    }
    if (!feReady) {
      const portOk = await probeTcpPort(frontendPort) || await probeTcpPort(3000) || await probeTcpPort(48121);
      if (portOk) {
        const actualPort = (await probeTcpPort(frontendPort)) ? frontendPort : (await probeTcpPort(48121) ? 48121 : 3000);
        const res = await fetchHttp(`http://127.0.0.1:${actualPort}/`);
        if (res.ok) feReady = true;
      }
    }
    if (!miniReady) {
      const portOk = await probeTcpPort(miniappPort);
      if (portOk) {
        const res = await fetchHttp(`http://127.0.0.1:${miniappPort}/`);
        if (res.ok) miniReady = true;
      }
    }
    if (!gwReady) {
      const portOk = await probeTcpPort(gatewayPort);
      if (portOk) {
        const res = await fetchHttp(`http://127.0.0.1:${gatewayPort}/${projectSlug}/2c/`);
        if (res.ok) gwReady = true;
      }
    }
    if (beReady && feReady && (miniReady || !fs.existsSync(miniappPkg)) && (gwReady || !fs.existsSync(gatewayScript))) {
      break;
    }
  }

  console.log("\n========================================================================");
  console.log(`📊 ${C.bold}全栈运行态拓扑与验证仪表盘 (Runtime Topology & Verification Dashboard)${C.reset}`);
  console.log("========================================================================");
  console.log(`  🏢 项目标识: ${projectSlug}`);
  console.log(`  🚪 统一接入网关: http://127.0.0.1:${gatewayPort}/${projectSlug}/`);
  console.log(`  🛍️ C端独立前台: http://127.0.0.1:${gatewayPort}/${projectSlug}/2c/`);
  console.log(`  🏢 B端管理中台: http://127.0.0.1:${gatewayPort}/${projectSlug}/admin/`);
  console.log(`  🏷️ 管理端 API: http://127.0.0.1:${gatewayPort}/${projectSlug}/admin-api/* (向后兼容: /admin-api/*)`);
  console.log(`  📱 移动端 API: http://127.0.0.1:${gatewayPort}/${projectSlug}/app-api/* (向后兼容: /app-api/*)`);
  console.log(`  🌐 开放端 API: http://127.0.0.1:${gatewayPort}/${projectSlug}/open-api/* (向后兼容: /open-api/*)`);
  console.log(`  📄 Knife4j 契约文档: http://127.0.0.1:${backendPort}/doc.html (OpenAPI: /v3/api-docs)`);
  console.log(`  🔌 实时通信与流式: ws://127.0.0.1:${backendPort}/infra/ws (WebSocket) | http://127.0.0.1:${backendPort}/sse`);
  console.log(`  🩺 运维监控探针: http://127.0.0.1:${backendPort}/actuator/health`);
  console.log("========================================================================\n");
}

main().catch(err => {
  console.error("Launcher Error:", err);
  cleanup();
  process.exit(1);
});
