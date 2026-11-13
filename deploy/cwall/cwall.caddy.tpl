# ==============================================================================
# deploy/cwall/cwall.caddy.tpl — 远程算力节点 (cwall) 零冲突独立 Caddy 网关模板
# 全局 admin off，严禁占用 :2019 或干扰同机其他项目网关端口！
# ==============================================================================
{
    admin off
}

:__GATEWAY_PORT__ {
    redir / /__PROJECT_SLUG__/admin/ 302
    redir /__PROJECT_SLUG__ /__PROJECT_SLUG__/admin/ 302
    redir /__PROJECT_SLUG__/ /__PROJECT_SLUG__/admin/ 302
    redir /__PROJECT_SLUG__/admin /__PROJECT_SLUG__/admin/ 308
    redir /__PROJECT_SLUG__/cockpit /__PROJECT_SLUG__/cockpit/ 308
    redir /__PROJECT_SLUG__/2c /__PROJECT_SLUG__/2c/ 308

    handle_path /__PROJECT_SLUG__/cockpit/* {
        root * __COCKPIT_DIST__
        file_server
        try_files {path} /index.html
    }

    handle_path /__PROJECT_SLUG__/admin/* {
        root * __ADMIN_DIST__
        file_server
        try_files {path} /index.html
    }

    handle_path /__PROJECT_SLUG__/2c/* {
        root * __MINIAPP_DIST__
        file_server
        try_files {path} /index.html
    }

    handle_path /__PROJECT_SLUG__/evidence/* {
        root * __EVIDENCE_DIR__
        file_server
    }

    handle /__PROJECT_SLUG__/admin-api/* {
        uri strip_prefix /__PROJECT_SLUG__
        reverse_proxy 127.0.0.1:__BACKEND_PORT__ {
            header_up Host {host}
            header_up tenant-id 1
        }
    }
    handle /admin-api/* {
        reverse_proxy 127.0.0.1:__BACKEND_PORT__ {
            header_up Host {host}
            header_up tenant-id 1
        }
    }

    handle /__PROJECT_SLUG__/app-api/* {
        uri strip_prefix /__PROJECT_SLUG__
        reverse_proxy 127.0.0.1:__BACKEND_PORT__ {
            header_up Host {host}
            header_up tenant-id 1
        }
    }
    handle /app-api/* {
        reverse_proxy 127.0.0.1:__BACKEND_PORT__ {
            header_up Host {host}
            header_up tenant-id 1
        }
    }

    handle /__PROJECT_SLUG__/v3/api-docs* {
        uri strip_prefix /__PROJECT_SLUG__
        reverse_proxy 127.0.0.1:__BACKEND_PORT__ {
            header_up Host {host}
        }
    }
    handle /v3/api-docs* {
        reverse_proxy 127.0.0.1:__BACKEND_PORT__ {
            header_up Host {host}
        }
    }
}
