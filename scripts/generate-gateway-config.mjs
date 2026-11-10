#!/usr/bin/env node
/**
 * scripts/generate-gateway-config.mjs
 * Yudao-Quad-Terminal —— 工业级网关配置自动生成器 (Caddyfile & Nginx Conf)
 * 
 * 核心设计原则：
 * 1. 纯声明式配置驱动，严禁任何手写 Node 临时网关脚本；
 * 2. 统一对外单一入口：http://<ip>:<port>/<slug>/，由标准网关在单端口下完成路由分发；
 * 3. 根路径或 /<slug> 自动 302 重定向到 /<slug>/2c/；
 * 4. 2c 移动商城 H5 与 admin 管理后台通过静态资源直接挂载 (零中间层损耗)；
 * 5. 后端 admin-api 与 app-api 统一反向代理至 Spring Boot (默认 48080)，自动透传 tenant-id 头；
 *    - 双重兼容：同时支持 /<slug>/admin-api/* 与 /admin-api/*，以及 /<slug>/app-api/* 与 /app-api/*，彻底根治跨域与路径断流；
 * 6. 一次生成，全平台适用：
 *    - deploy/gateway/caddy/<slug>.caddy 用于开发与轻量级交付；
 *    - deploy/gateway/nginx/<slug>.conf 用于企业级生产环境 Nginx include。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

let projectName = path.basename(ROOT);
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  if (pkg.name) {
    projectName = pkg.name.replace(/^@.*\//, "").replace(/-quad-terminal$/, "");
  }
} catch {}

const projectSlug = projectName.split(" ")[0].toLowerCase().replace(/[^a-z0-9_-]/g, "").replace(/^-|-$/g, "") || "app";

// 端口配置解析
let backendPort = parseInt(process.env.BACKEND_PORT || process.env.SERVER_PORT || "48080", 10);
let gatewayPort = parseInt(process.env.GATEWAY_PORT || process.env.PORT || "48120", 10);

const miniappH5Dist = path.join(ROOT, "apps/miniapp/dist/build/h5");
const adminDist = path.join(ROOT, "apps/admin/dist");

// 确保目录存在
const caddyDir = path.join(ROOT, "deploy/gateway/caddy");
const nginxDir = path.join(ROOT, "deploy/gateway/nginx");
fs.mkdirSync(caddyDir, { recursive: true });
fs.mkdirSync(nginxDir, { recursive: true });

// 1. 生成 Caddyfile 片段
const caddyConfig = `# ==============================================================================
# [${projectSlug}] 工业级标准 Caddy 网关配置 (自动生成，严禁手动篡改)
# 单一入口标准: http://127.0.0.1:${gatewayPort}/${projectSlug}/
# ==============================================================================
:${gatewayPort} {
    # 根入口智能引导至 C 端前台商城
    redir / /${projectSlug}/2c/ 302
    redir /${projectSlug} /${projectSlug}/2c/ 302
    redir /${projectSlug}/ /${projectSlug}/2c/ 302
    redir /${projectSlug}/2c /${projectSlug}/2c/ 308

    # 1. C端前台商城 H5 静态资源 (零代理层极速挂载)
    handle_path /${projectSlug}/2c/* {
        root * ${miniappH5Dist}
        file_server
        try_files {path} /index.html
    }

    # 2. B端管理中台 Web 静态资源
    handle_path /${projectSlug}/admin/* {
        root * ${adminDist}
        file_server
        try_files {path} /index.html
    }

    # 3. 管理端 API 穿透 (Spring Boot ${backendPort}，双前缀同源支持)
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

    # 4. 移动端/商城 API 穿透 (Spring Boot ${backendPort}，双前缀同源支持)
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

    # 5. 开放平台 API 穿透 (/open-api/*)
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

    # 6. OpenAPI 3.0 契约文档平面穿透 (/v3/api-docs, /doc.html, /swagger-ui/*)
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

    # 7. WebSocket 长连接通道 (/infra/ws/*)
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

// 2. 生成 Nginx 配置片段
const nginxConfig = `# ==============================================================================
# [${projectSlug}] 工业级标准 Nginx 反代配置 (自动生成，放置于 /etc/nginx/conf.d/)
# 单一入口标准: http://<server_name>/${projectSlug}/
# ==============================================================================

upstream ${projectSlug}_backend {
    server 127.0.0.1:${backendPort};
    keepalive 32;
}

# 1. 统一入口智能引导至 C 端前台商城
location = /${projectSlug} {
    return 301 /${projectSlug}/2c/;
}
location = /${projectSlug}/ {
    return 301 /${projectSlug}/2c/;
}

# 2. C端移动商城 H5 前端 (SPA 静态资源 + 历史路由)
location /${projectSlug}/2c/ {
    alias ${miniappH5Dist}/;
    index index.html;
    try_files $uri $uri/ /${projectSlug}/2c/index.html;
}

# 3. B端管理后台前端 (SPA 静态资源 + try_files 路由守卫)
location /${projectSlug}/admin/ {
    alias ${adminDist}/;
    index index.html;
    try_files $uri $uri/ /${projectSlug}/admin/index.html;
}

# 4. 后端管理端 API 穿透 (/admin-api/)
location /${projectSlug}/admin-api/ {
    proxy_pass http://${projectSlug}_backend/admin-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header tenant-id 1;
    proxy_read_timeout 60s;
}
location /admin-api/ {
    proxy_pass http://${projectSlug}_backend/admin-api/;
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
    proxy_pass http://${projectSlug}_backend/app-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header tenant-id 1;
    proxy_read_timeout 60s;
}
location /app-api/ {
    proxy_pass http://${projectSlug}_backend/app-api/;
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
    proxy_pass http://${projectSlug}_backend/open-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header tenant-id 1;
    proxy_read_timeout 60s;
}
location /open-api/ {
    proxy_pass http://${projectSlug}_backend/open-api/;
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
    proxy_pass http://${projectSlug}_backend/v3/api-docs;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
location /${projectSlug}/doc.html {
    proxy_pass http://${projectSlug}_backend/doc.html;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
location /${projectSlug}/swagger-ui/ {
    proxy_pass http://${projectSlug}_backend/swagger-ui/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
`;

const isDryRun = process.argv.includes("--dry-run");
const caddyPath = path.join(caddyDir, `${projectSlug}.caddy`);
const nginxPath = path.join(nginxDir, `${projectSlug}.conf`);

if (!isDryRun) {
  fs.writeFileSync(caddyPath, caddyConfig, "utf8");
  fs.writeFileSync(nginxPath, nginxConfig, "utf8");
}

console.log(`✅ [Gateway Config] 成功生成标准网关配置${isDryRun ? " (dry-run)" : ""}：`);
console.log(`   • Caddy: ${path.relative(ROOT, caddyPath)}`);
console.log(`   • Nginx: ${path.relative(ROOT, nginxPath)}`);
