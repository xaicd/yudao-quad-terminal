#!/usr/bin/env node
/**
 * deploy/gateway/unified-gateway.mjs
 *
 * Yudao-Quad-Terminal 企业级自包含统一接入网关 (Unified Access Gateway)
 * 职责：
 *   彻底消灭裸端口乱跳与各自为政。
 *   统一监听网关端口 (默认 48120)，收敛所有对外物理路径：
 *     - /<slug>/2c/*        -> C端独立前台 (apps/miniapp H5, :48122)
 *     - /<slug>/admin/*     -> B端管理中台 (apps/admin Vue3, :48121)
 *     - /<slug>/admin-api/* -> 后端中台管理接口 (:48080/admin-api/*)
 *     - /<slug>/app-api/*   -> 后端移动商城会员接口 (:48080/app-api/*)
 *     - /<slug>/open-api/*  -> 后端开放平台生态接口 (:48080/open-api/*)
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../..');

let slug = 'ebook-mall-yd';
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  if (pkg.name) slug = pkg.name;
} catch {}

const GATEWAY_PORT = parseInt(process.env.GATEWAY_PORT || '48120', 10);
const BACKEND_PORT = parseInt(process.env.BACKEND_PORT || '48080', 10);
const ADMIN_PORT = parseInt(process.env.ADMIN_PORT || '48121', 10);
const MINIAPP_PORT = parseInt(process.env.MINIAPP_PORT || '48122', 10);

function proxyRequest(req, res, targetPort, targetPath) {
  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: targetPath,
    method: req.method,
    headers: {
      ...req.headers,
      host: `127.0.0.1:${targetPort}`,
      'x-forwarded-for': req.socket.remoteAddress,
      'x-forwarded-proto': 'http',
      'x-forwarded-host': req.headers.host || '',
      'x-gateway-prefix': '/' + slug
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('502 Bad Gateway: 无法连接目标微服务端口 ' + targetPort + ' (' + err.message + ')');
  });

  req.pipe(proxyReq, { end: true });
}

const server = http.createServer((req, res) => {
  const url = req.url || '/';
  const prefix = '/' + slug;

  // 1. API 接口三域：/<slug>/admin-api/*, /<slug>/app-api/*, /<slug>/open-api/*
  // 必须最先匹配，避免被 /admin 拦截！
  if (url.startsWith(prefix + '/admin-api/') || url.startsWith(prefix + '/app-api/') || url.startsWith(prefix + '/open-api/')) {
    const targetPath = url.slice(prefix.length);
    return proxyRequest(req, res, BACKEND_PORT, targetPath);
  }

  // 2. C端用户前台：/<slug>/2c/*
  if (url.startsWith(prefix + '/2c') || url === prefix || url === prefix + '/') {
    if (url === prefix || url === prefix + '/') {
      res.writeHead(302, { Location: prefix + '/2c/' });
      return res.end();
    }
    const targetPath = url.replace(prefix + '/2c', '') || '/';
    return proxyRequest(req, res, MINIAPP_PORT, targetPath);
  }

  // 3. B端管理后台：/<slug>/admin/*
  if (url.startsWith(prefix + '/admin')) {
    const targetPath = url.replace(prefix + '/admin', prefix);
    return proxyRequest(req, res, ADMIN_PORT, targetPath);
  }

  // 4. 兼容直连后端接口 (/admin-api/*, /app-api/*, /open-api/*)
  if (url.startsWith('/admin-api/') || url.startsWith('/app-api/') || url.startsWith('/open-api/')) {
    return proxyRequest(req, res, BACKEND_PORT, url);
  }

  // 5. 兜底转发给 B 端管理前端静态资源 (包含 /<slug>/assets/*, /<slug>/index 等)
  if (url.startsWith(prefix)) {
    return proxyRequest(req, res, ADMIN_PORT, url);
  }

  // 根路径自适应重定向至前台
  if (url === '/') {
    res.writeHead(302, { Location: prefix + '/2c/' });
    return res.end();
  }

  // 其他资源透传给 C 端
  proxyRequest(req, res, MINIAPP_PORT, url);
});

server.listen(GATEWAY_PORT, '0.0.0.0', () => {
  console.log('🌐 [Unified Gateway] 企业级统一接入网关已拉起: http://127.0.0.1:' + GATEWAY_PORT + '/' + slug + '/');
  console.log('   • C端用户前台: http://127.0.0.1:' + GATEWAY_PORT + '/' + slug + '/2c/');
  console.log('   • B端管理中台: http://127.0.0.1:' + GATEWAY_PORT + '/' + slug + '/admin/');
  console.log('   • 管理端接口: http://127.0.0.1:' + GATEWAY_PORT + '/' + slug + '/admin-api/...');
  console.log('   • 移动端接口: http://127.0.0.1:' + GATEWAY_PORT + '/' + slug + '/app-api/...');
  console.log('   • 开放端接口: http://127.0.0.1:' + GATEWAY_PORT + '/' + slug + '/open-api/...');
});
