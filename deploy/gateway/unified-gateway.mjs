#!/usr/bin/env node
/**
 * deploy/gateway/unified-gateway.mjs
 * Coolie 商业交付工厂 —— Yudao-Quad-Terminal 企业级统一接入网关 (Unified Gateway)
 * 
 * 核心职责：
 * 1. 纯 Node.js 内置模块实现（零 Docker、零外部 Caddy 依赖、全平台自闭环）；
 * 2. 统一收敛四端流量至单个接入端口 (默认 48120)；
 * 3. 动态 BasePath 路由分流与规范化重定向：
 *    - /<slug>/admin/* 与 /admin/*     ➜ B端管理中台 (48121)
 *    - /<slug>/2c/* 与 /2c/*           ➜ C端前台商城 (48122)
 *    - /<slug>/admin-api/* 与 /admin-api/* ➜ 管理契约接口 (48080)
 *    - /<slug>/app-api/* 与 /app-api/*     ➜ 移动契约接口 (48080)
 *    - /<slug>/open-api/* 与 /open-api/*   ➜ 开放生态接口 (48080)
 *    - /<slug>/doc.html 与 /doc.html       ➜ Knife4j 交互式文档 (48080)
 *    - /<slug>/v3/api-docs/*               ➜ OpenAPI 契约 (48080)
 * 4. 原生支持 HTTP Keep-Alive、流式 SSE、Chunked 传输与 WebSocket 实时穿透 (/infra/ws/*)；
 * 5. 严格防御 SPA 伪 200 假阳性与接口路由旁路。
 */

import http from "node:http";
import net from "node:net";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

const args = process.argv.slice(2);
function getArg(flag, fallback) {
  const idx = args.indexOf(flag);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return fallback;
}

let projectName = path.basename(ROOT);
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  if (pkg.name) projectName = pkg.name.replace(/^@.*\//, "");
} catch {}

const defaultSlug = projectName.split(" ")[0].toLowerCase().replace(/[^a-z0-9_-]/g, "").replace(/^-|-$/g, "") || "app";
const projectSlug = getArg("--slug", process.env.PROJECT_SLUG || defaultSlug);

const gatewayPort = parseInt(getArg("--port", process.env.GATEWAY_PORT || "48120"), 10);
const backendPort = parseInt(getArg("--backend-port", process.env.BACKEND_PORT || process.env.SERVER_PORT || "48080"), 10);
const adminPort = parseInt(getArg("--admin-port", process.env.FRONTEND_PORT || process.env.VITE_FRONTEND_PORT || "48121"), 10);
const miniappPort = parseInt(getArg("--miniapp-port", process.env.MINIAPP_PORT || process.env.VITE_MINIAPP_PORT || "48122"), 10);

function proxyHttp(req, res, targetPort, targetPath) {
  const options = {
    hostname: "127.0.0.1",
    port: targetPort,
    path: targetPath,
    method: req.method,
    headers: {
      ...req.headers,
      host: req.headers.host || `127.0.0.1:${gatewayPort}`,
      "x-forwarded-host": req.headers.host || `127.0.0.1:${gatewayPort}`,
      "x-forwarded-port": String(gatewayPort),
      "x-forwarded-proto": "http",
      "x-real-ip": req.socket.remoteAddress || "127.0.0.1"
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on("error", (err) => {
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({
        error: "Bad Gateway",
        message: `Upstream port ${targetPort} unreachable: ${err.message}`,
        path: req.url
      }));
    }
  });

  req.pipe(proxyReq, { end: true });
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const search = parsedUrl.search || "";

  // 1. 项目根与全站根重定向 -> 默认分流至 B端管理中台
  if (pathname === "/" || pathname === `/${projectSlug}` || pathname === `/${projectSlug}/`) {
    res.writeHead(308, { Location: `/${projectSlug}/admin/${search}` });
    return res.end();
  }

  // 2. 规范化重定向：确保前台与中台带末尾斜杠
  if (pathname === `/${projectSlug}/admin` || pathname === "/admin") {
    res.writeHead(308, { Location: `/${projectSlug}/admin/${search}` });
    return res.end();
  }
  if (pathname === `/${projectSlug}/2c` || pathname === "/2c") {
    res.writeHead(308, { Location: `/${projectSlug}/2c/${search}` });
    return res.end();
  }

  // 3. 后端契约路由 (48080)
  const isBackend = (p) =>
    p.startsWith(`/${projectSlug}/admin-api/`) || p.startsWith("/admin-api/") ||
    p.startsWith(`/${projectSlug}/app-api/`) || p.startsWith("/app-api/") ||
    p.startsWith(`/${projectSlug}/open-api/`) || p.startsWith("/open-api/") ||
    p === `/${projectSlug}/doc.html` || p === "/doc.html" ||
    p.startsWith(`/${projectSlug}/v3/api-docs`) || p.startsWith("/v3/api-docs") ||
    p.startsWith(`/${projectSlug}/swagger-ui`) || p.startsWith("/swagger-ui") ||
    p.startsWith(`/${projectSlug}/webjars`) || p.startsWith("/webjars") ||
    p.startsWith(`/${projectSlug}/actuator`) || p.startsWith("/actuator") ||
    p.startsWith(`/${projectSlug}/infra/`) || p.startsWith("/infra/");

  if (isBackend(pathname)) {
    // 后端如果以 /<slug> 开头，剥离 /<slug> 前缀透传至 Spring Boot
    let targetPath = pathname;
    if (targetPath.startsWith(`/${projectSlug}/`)) {
      targetPath = targetPath.slice(`/${projectSlug}`.length);
    }
    return proxyHttp(req, res, backendPort, targetPath + search);
  }

  // 4. C端前台商城路由 (48122)
  if (pathname.startsWith(`/${projectSlug}/2c/`) || pathname.startsWith("/2c/")) {
    return proxyHttp(req, res, miniappPort, pathname + search);
  }

  // 5. B端管理中台路由 (48121)
  if (pathname.startsWith(`/${projectSlug}/admin/`) || pathname.startsWith("/admin/")) {
    return proxyHttp(req, res, adminPort, pathname + search);
  }

  // 6. 前端静态资产代理（支持 assets/ 顶层路由探测）
  if (pathname.startsWith("/assets/")) {
    // 默认尝试 B 端前端资产
    return proxyHttp(req, res, adminPort, pathname + search);
  }

  // 7. 404 兜底
  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({
    error: "Gateway Route Not Found",
    path: pathname,
    allowedPrefixes: [
      `/${projectSlug}/admin/`,
      `/${projectSlug}/2c/`,
      `/${projectSlug}/admin-api/`,
      `/${projectSlug}/app-api/`,
      `/${projectSlug}/open-api/`,
      `/${projectSlug}/doc.html`
    ]
  }));
});

// WebSocket 升级透传 (支持 /infra/ws/* 实时长连接)
server.on("upgrade", (req, clientSocket, head) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  let targetPath = parsedUrl.pathname;
  if (targetPath.startsWith(`/${projectSlug}/`)) {
    targetPath = targetPath.slice(`/${projectSlug}`.length);
  }

  const upstreamSocket = net.connect(backendPort, "127.0.0.1", () => {
    let rawHeaders = `${req.method} ${targetPath}${parsedUrl.search} HTTP/1.1\r\n`;
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      const k = req.rawHeaders[i];
      const v = req.rawHeaders[i + 1];
      rawHeaders += `${k}: ${v}\r\n`;
    }
    rawHeaders += "\r\n";
    upstreamSocket.write(rawHeaders);
    if (head && head.length > 0) upstreamSocket.write(head);
    upstreamSocket.pipe(clientSocket);
    clientSocket.pipe(upstreamSocket);
  });

  upstreamSocket.on("error", () => clientSocket.destroy());
  clientSocket.on("error", () => upstreamSocket.destroy());
});

if (import.meta.url === `file://${process.argv[1]}`) {
  server.listen(gatewayPort, "0.0.0.0", () => {
    console.log(`🚪 [Unified Gateway] 统一接入网关已在端口 ${gatewayPort} 启动`);
    console.log(`   • 项目标识: ${projectSlug}`);
    console.log(`   • C端前台: http://127.0.0.1:${gatewayPort}/${projectSlug}/2c/`);
    console.log(`   • B端中台: http://127.0.0.1:${gatewayPort}/${projectSlug}/admin/`);
    console.log(`   • 接口反代: http://127.0.0.1:${gatewayPort}/${projectSlug}/admin-api/* ➜ :${backendPort}`);
    console.log(`   • 文档契约: http://127.0.0.1:${gatewayPort}/${projectSlug}/doc.html`);
  });
}

export { server, projectSlug, gatewayPort };
