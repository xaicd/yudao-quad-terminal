#!/usr/bin/env node
/**
 * scripts/serve-admin.cjs
 * Yudao-Quad-Terminal —— B端管理中台 (Vue3+Vite+Element Plus) 生产静态服务与动态 BasePath 路由中枢
 * 
 * 核心能力：
 * 1. 动态支持项目专属 basePath (如 /<slug>/admin/ 与 /admin/)；
 * 2. 根路径 / 与 /<slug> 自动 302 重定向至 /<slug>/admin/；
 * 3. 规范化重定向：/<slug>/admin 与 /admin 自动 308 重定向至带斜杠路径（保障相对资源寻址）；
 * 4. 静态资产严格 MIME 类型映射，缺失静态资产严格返回 404 JSON（杜绝 SPA 伪 200 假阳性）；
 * 5. SPA 路由智能兜底：未匹配到实体静态资源的普通页面路由回吐 index.html；
 * 6. 纯 Node.js 内置模块实现，零外部依赖。
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
function getArg(flag, fallback) {
  const idx = args.indexOf(flag);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return fallback;
}

let projectName = path.basename(process.cwd());
try {
  const pkg = JSON.parse(fs.readFileSync(path.resolve("package.json"), "utf8"));
  if (pkg.name) projectName = pkg.name.replace(/^@.*\//, "");
} catch {}

const defaultSlug = projectName.split(" ")[0].toLowerCase().replace(/[^a-z0-9_-]/g, "").replace(/^-|-$/g, "") || "app";
const projectSlug = getArg("--slug", process.env.PROJECT_SLUG || defaultSlug);
const port = parseInt(getArg("--port", process.env.FRONTEND_PORT || process.env.VITE_FRONTEND_PORT || "48121"), 10);
const distDir = path.resolve(getArg("--dir", path.resolve("apps/admin/dist")));

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".map": "application/json"
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. 根路径或项目根 -> 自动重定向至标准 B 端管理入口 /<slug>/admin/
  if (pathname === "/" || pathname === `/${projectSlug}` || pathname === `/${projectSlug}/`) {
    res.writeHead(302, { Location: `/${projectSlug}/admin/${parsedUrl.search}` });
    return res.end();
  }

  // 2. 缺少末尾斜杠时 308 重定向，确保 HTML 内部的相对路径 ./assets 正确解析
  if (pathname === `/${projectSlug}/admin` || pathname === "/admin") {
    res.writeHead(308, { Location: `${pathname}/${parsedUrl.search}` });
    return res.end();
  }

  // 3. 提取子路径并定位实体文件
  let subPath = pathname;
  const slugPrefix = `/${projectSlug}/admin`;
  if (subPath.startsWith(slugPrefix)) {
    subPath = subPath.slice(slugPrefix.length);
  } else if (subPath.startsWith("/admin")) {
    subPath = subPath.slice(6);
  }

  if (subPath === "" || subPath === "/") {
    subPath = "/index.html";
  }

  const cleanSubPath = subPath.replace(/^\/+/, "");
  const targetFile = path.join(distDir, cleanSubPath);

  // 4. 检查是否存在真实文件
  if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
    const ext = path.extname(targetFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable"
    });
    return fs.createReadStream(targetFile).pipe(res);
  }

  // 5. 静态资产缺失时，严格返回 404 JSON（禁止 SPA 回落伪 200 假阳性）
  const ext = path.extname(cleanSubPath).toLowerCase();
  if (cleanSubPath.startsWith("assets/") || [".js", ".css", ".map", ".png", ".jpg", ".jpeg", ".svg", ".ico", ".woff", ".woff2"].includes(ext)) {
    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    return res.end(JSON.stringify({ error: "Asset not found", path: pathname }));
  }

  // 6. 普通业务前端路由 -> 回落至 index.html (SPA Fallback)
  const indexFile = path.join(distDir, "index.html");
  if (fs.existsSync(indexFile)) {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache"
    });
    return fs.createReadStream(indexFile).pipe(res);
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(`B-End Admin Not Found: ${pathname}`);
});

if (require.main === module) {
  server.listen(port, "0.0.0.0", () => {
    console.log(`🏢 [Admin Server] 已在端口 ${port} 启动`);
    console.log(`   • 项目前缀: http://127.0.0.1:${port}/${projectSlug}/admin/`);
    console.log(`   • 规范前缀: http://127.0.0.1:${port}/admin/`);
    console.log(`   • 根重定向: http://127.0.0.1:${port}/ ➜ /${projectSlug}/admin/`);
    console.log(`   • 静态资源: ${distDir}`);
  });
}

module.exports = { server, projectSlug, port, distDir };
