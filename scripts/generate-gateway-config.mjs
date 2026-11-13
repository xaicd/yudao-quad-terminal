#!/usr/bin/env node
/**
 * scripts/generate-gateway-config.mjs
 * Yudao-Quad-Terminal —— 工业级四平面网关配置自动生成器 (Caddyfile & Nginx Conf)
 *
 * 核心设计原则：
 * 1. 纯声明式配置驱动，严禁任何手写 Node 临时网关脚本（自动清理残留 unified-gateway.mjs）；
 * 2. 全局启用 `{ admin off }`，彻底规避多项目/多实例并跑时 Caddy 默认 `:2019` 管理端口冲突；
 * 3. 自动读取 `.env.ports` 与环境变量（GATEWAY_PORT / BACKEND_PORT），零冲突绑定端口；
 * 4. 单一入口四平面同源挂载：`http://127.0.0.1:<gatewayPort>/<slug>/`
 *    - `/<slug>/cockpit/*`   : 大屏/驾驶舱平面（存在 `apps/cockpit/dist` 时独立静态挂载，否则同源回退管理端 SPA）
 *    - `/<slug>/admin/*`     : B 端管理中台 Web 静态资源
 *    - `/<slug>/2c/*`        : C 端移动商城 / 掌上运维 H5 静态资源
 *    - `/<slug>/admin-api/*` : `uri strip_prefix /<slug>` 反向代理至 Spring Boot `:${backendPort}`（透传 `tenant-id: 1`）
 *    - `/<slug>/app-api/*`、`/open-api/*`、`/v3/api-docs*`、`/doc.html*`、`/infra/ws/*`、`/evidence/*` 全链路打通；
 * 5. 支持 `{$CADDY_HOST_ROOT:<ROOT>}`，兼顾容器内生成与宿主机原生 Caddy 直接加载。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

function loadEnvPorts(rootDir) {
  const out = {};
  const file = path.join(rootDir, ".env.ports");
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const idx = t.indexOf("=");
    if (idx > 0) out[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
  }
  return out;
}

const envPorts = loadEnvPorts(ROOT);

let projectName = envPorts.PROJECT_SLUG || path.basename(ROOT);
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  if (pkg.name) {
    projectName = pkg.name.replace(/^@.*\//, "").replace(/-quad-terminal$/, "");
  }
} catch {}

const projectSlug =
  projectName
    .split(" ")[0]
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .replace(/^-|-$/g, "") || "app";
const snakeSlug = projectSlug.replace(/-/g, "_");

// 端口配置解析（CLI > 环境变量 > .env.ports > 默认值）
function readArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx >= 0 && process.argv[idx + 1] && !process.argv[idx + 1].startsWith("-")) {
    return process.argv[idx + 1];
  }
  const eq = process.argv.find((a) => a.startsWith(`${flag}=`));
  return eq ? eq.slice(flag.length + 1) : undefined;
}

const backendPort = parseInt(
  readArgValue("--backend-port") ||
    process.env.BACKEND_PORT ||
    process.env.LITE_SERVER_PORT ||
    process.env.SERVER_PORT ||
    envPorts.BACKEND_PORT ||
    "48080",
  10
);
const gatewayPort = parseInt(
  readArgValue("--gateway-port") ||
    process.env.GATEWAY_PORT ||
    process.env.PORT ||
    envPorts.GATEWAY_PORT ||
    "48120",
  10
);

const hostRootExpr = `{$CADDY_HOST_ROOT:${ROOT}}`;
const hasStandaloneCockpit = fs.existsSync(path.join(ROOT, "apps/cockpit/dist/index.html"));
const cockpitDistExpr = hasStandaloneCockpit
  ? `${hostRootExpr}/apps/cockpit/dist`
  : `${hostRootExpr}/apps/admin/dist`;
const miniappH5DistExpr = `${hostRootExpr}/apps/miniapp/dist/build/h5`;
const adminDistExpr = `${hostRootExpr}/apps/admin/dist`;
const evidenceDirExpr = `${hostRootExpr}/docs/evidence`;

const miniappH5Dist = path.join(ROOT, "apps/miniapp/dist/build/h5");
const adminDist = path.join(ROOT, "apps/admin/dist");
const cockpitDist = hasStandaloneCockpit ? path.join(ROOT, "apps/cockpit/dist") : adminDist;

const caddyDir = path.join(ROOT, "deploy/gateway/caddy");
const nginxDir = path.join(ROOT, "deploy/gateway/nginx");
fs.mkdirSync(caddyDir, { recursive: true });
fs.mkdirSync(nginxDir, { recursive: true });

// 物理清理任何遗留的非标手写网关脚本
const legacyNodeGateway = path.join(ROOT, "deploy/gateway/unified-gateway.mjs");
const isDryRun = process.argv.includes("--dry-run");
if (!isDryRun && fs.existsSync(legacyNodeGateway)) {
  try {
    fs.rmSync(legacyNodeGateway, { force: true });
  } catch {}
}

const defaultEntryPlane = fs.existsSync(path.join(ROOT, ".gitmodules")) ? "2c" : "admin";

// 1. 生成 Caddyfile（强制 `{ admin off }` 防止 :2019 冲突）
const caddyConfig = `# ==============================================================================
# [${projectSlug}] 工业级标准四平面 Caddy 网关配置 (自动生成，严禁手动篡改)
# 单一入口标准: http://127.0.0.1:${gatewayPort}/${projectSlug}/
# 覆盖四平面: /cockpit/ | /admin/ | /2c/ | /admin-api/ (+ /app-api/ & /v3/api-docs)
# ==============================================================================
{
    admin off
}

:${gatewayPort} {
    # 根入口智能引导
    redir / /${projectSlug}/${defaultEntryPlane}/ 302
    redir /${projectSlug} /${projectSlug}/${defaultEntryPlane}/ 302
    redir /${projectSlug}/ /${projectSlug}/${defaultEntryPlane}/ 302
    redir /${projectSlug}/admin /${projectSlug}/admin/ 308
    redir /${projectSlug}/cockpit /${projectSlug}/cockpit/ 308
    redir /${projectSlug}/2c /${projectSlug}/2c/ 308

    # 1. 领导驾驶舱 / 实时监控大屏平面 (/cockpit/)
    handle_path /${projectSlug}/cockpit/* {
        root * ${cockpitDistExpr}
        file_server
        try_files {path} /index.html
    }

    # 2. B端运营管理中台 Web 静态资源 (/admin/)
    handle_path /${projectSlug}/admin/* {
        root * ${adminDistExpr}
        file_server
        try_files {path} /index.html
    }

    # 3. C端移动商城 / 掌上运维 H5 静态资源 (/2c/)
    handle_path /${projectSlug}/2c/* {
        root * ${miniappH5DistExpr}
        file_server
        try_files {path} /index.html
    }

    # 3.5 验收证据只读归档平面 (/evidence/)
    handle_path /${projectSlug}/evidence/* {
        root * ${evidenceDirExpr}
        file_server
    }

    # 4. 管理端 API 穿透 (Spring Boot 127.0.0.1:${backendPort}，双前缀同源支持)
    handle /${projectSlug}/admin-api/* {
        uri strip_prefix /${projectSlug}
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
            header_up tenant-id 1
        }
    }
    handle /admin-api/* {
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
            header_up tenant-id 1
        }
    }

    # 5. 移动端 API 穿透 (/app-api/*)
    handle /${projectSlug}/app-api/* {
        uri strip_prefix /${projectSlug}
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
            header_up tenant-id 1
        }
    }
    handle /app-api/* {
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
            header_up tenant-id 1
        }
    }

    # 6. 开放平台 API 穿透 (/open-api/*)
    handle /${projectSlug}/open-api/* {
        uri strip_prefix /${projectSlug}
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
            header_up tenant-id 1
        }
    }
    handle /open-api/* {
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
            header_up tenant-id 1
        }
    }

    # 7. OpenAPI 3.0 契约文档平面穿透 (/v3/api-docs, /doc.html, /swagger-ui/*)
    handle /${projectSlug}/v3/api-docs* {
        uri strip_prefix /${projectSlug}
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
        }
    }
    handle /v3/api-docs* {
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
        }
    }
    handle /${projectSlug}/doc.html* {
        uri strip_prefix /${projectSlug}
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
        }
    }
    handle /doc.html* {
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
        }
    }
    handle /${projectSlug}/swagger-ui/* {
        uri strip_prefix /${projectSlug}
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
        }
    }

    # 8. WebSocket 长连接通道 (/infra/ws/*)
    handle /${projectSlug}/infra/ws/* {
        uri strip_prefix /${projectSlug}
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
            header_up Upgrade {>Upgrade}
            header_up Connection {>Connection}
        }
    }
    handle /infra/ws/* {
        reverse_proxy 127.0.0.1:${backendPort} {
            header_up Host {host}
            header_up Upgrade {>Upgrade}
            header_up Connection {>Connection}
        }
    }
}
`;

// 2. 生成 Nginx 配置片段（upstream 标识符强制转为下划线，兼容带连字符的 slug）
const nginxConfig = `# ==============================================================================
# [${projectSlug}] 工业级标准 Nginx 反代配置 (自动生成，放置于 /etc/nginx/conf.d/)
# 单一入口标准: http://<server_name>/${projectSlug}/
# ==============================================================================

upstream ${snakeSlug}_backend {
    server 127.0.0.1:${backendPort};
    keepalive 32;
}

location = /${projectSlug} {
    return 301 /${projectSlug}/${defaultEntryPlane}/;
}
location = /${projectSlug}/ {
    return 301 /${projectSlug}/${defaultEntryPlane}/;
}

# 1. 领导驾驶舱平面 (/cockpit/)
location /${projectSlug}/cockpit/ {
    alias ${cockpitDist}/;
    index index.html;
    try_files $uri $uri/ /${projectSlug}/cockpit/index.html;
}

# 2. C端移动 H5 平面 (/2c/)
location /${projectSlug}/2c/ {
    alias ${miniappH5Dist}/;
    index index.html;
    try_files $uri $uri/ /${projectSlug}/2c/index.html;
}

# 3. B端管理后台前端 (/admin/)
location /${projectSlug}/admin/ {
    alias ${adminDist}/;
    index index.html;
    try_files $uri $uri/ /${projectSlug}/admin/index.html;
}

# 4. 后端管理端 API 穿透 (/admin-api/)
location /${projectSlug}/admin-api/ {
    proxy_pass http://${snakeSlug}_backend/admin-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header tenant-id 1;
    proxy_read_timeout 60s;
}
location /admin-api/ {
    proxy_pass http://${snakeSlug}_backend/admin-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header tenant-id 1;
    proxy_read_timeout 60s;
}

# 5. 后端移动端 API 穿透 (/app-api/)
location /${projectSlug}/app-api/ {
    proxy_pass http://${snakeSlug}_backend/app-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header tenant-id 1;
    proxy_read_timeout 60s;
}
location /app-api/ {
    proxy_pass http://${snakeSlug}_backend/app-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header tenant-id 1;
    proxy_read_timeout 60s;
}

# 6. 后端开放平台 API 穿透 (/open-api/)
location /${projectSlug}/open-api/ {
    proxy_pass http://${snakeSlug}_backend/open-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header tenant-id 1;
    proxy_read_timeout 60s;
}
location /open-api/ {
    proxy_pass http://${snakeSlug}_backend/open-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header tenant-id 1;
    proxy_read_timeout 60s;
}

# 7. OpenAPI 3.0 契约文档平面穿透 (/v3/api-docs, /doc.html, /swagger-ui/)
location /${projectSlug}/v3/api-docs {
    proxy_pass http://${snakeSlug}_backend/v3/api-docs;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
location /${projectSlug}/doc.html {
    proxy_pass http://${snakeSlug}_backend/doc.html;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
location /${projectSlug}/swagger-ui/ {
    proxy_pass http://${snakeSlug}_backend/swagger-ui/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
`;

const caddyPath = path.join(caddyDir, `${projectSlug}.caddy`);
const nginxPath = path.join(nginxDir, `${projectSlug}.conf`);

if (!isDryRun) {
  fs.writeFileSync(caddyPath, caddyConfig, "utf8");
  fs.writeFileSync(nginxPath, nginxConfig, "utf8");
  // 派生扁平化项目自动在根目录挂载声明式 Caddyfile 软链，开箱支持 G11 网关检查
  if (!fs.existsSync(path.join(ROOT, ".gitmodules")) || process.argv.includes("--link-root")) {
    const rootCaddyLink = path.join(ROOT, "Caddyfile");
    try {
      if (fs.existsSync(rootCaddyLink) || fs.lstatSync(rootCaddyLink)) {
        fs.rmSync(rootCaddyLink, { force: true });
      }
    } catch {}
    try {
      fs.symlinkSync(path.join("deploy", "gateway", "caddy", `${projectSlug}.caddy`), rootCaddyLink);
    } catch {}
  }
}

console.log(`✅ [Gateway Config] 成功生成标准四平面网关配置${isDryRun ? " (dry-run)" : ""}：`);
console.log(`   • Caddy: ${path.relative(ROOT, caddyPath)} (:{gatewayPort=${gatewayPort}}, admin off -> backend :${backendPort})`);
console.log(`   • Nginx: ${path.relative(ROOT, nginxPath)} (upstream ${snakeSlug}_backend)`);
