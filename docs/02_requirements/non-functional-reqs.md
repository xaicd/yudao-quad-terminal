# 《Yudao Quad-Terminal》非功能性需求规范 (Non-Functional Requirements, `v1.2.0`)

1. **安全与凭据基线（Security）**：
   - 登录认证接口强制开启 `@ApiEncrypt`（AES-256-ECB + `X-Api-Encrypt` 请求头）与 XSS 过滤；
   - 引导管理员与嵌入式缓存凭据 100% 由 CSPRNG 动态生成，以 `0600` 权限存储于 gitignored 的 `.commandcode/lite/credentials.env`，严禁任何弱默认口令或明文私钥入库。
2. **性能与连接池可靠性（Performance & Reliability）**：
   - 单节点核心读写接口 P99 响应延迟 `< 200ms`，生产 SLO 可用性目标 `>= 99.95%`；
   - PostgreSQL 运行档强制配置 `pool-prepared-statements: false` 与 `SELECT 1` 探活，通过连续加密登录回归验证杜绝连接池句柄失效。
3. **多视口几何兼容与无障碍（Responsive UX）**：
   - 四端 Web/H5 视图在 `1920×1080`、`1440×900`、`375×812` 与极限小屏 `320×568` 下均保持零横向滚动溢出（`scrollWidth <= clientWidth`）与底栏 `elementFromPoint` 零遮挡。
4. **可移植性与可维护性（Portability & Maintainability）**：
   - 只读子模块保持纯上游远端可达提交，定制补丁收敛于 `deploy/patches/`；
   - 跟踪入库的网关配置与工程脚本严禁硬编码开发者宿主机绝对路径，确保跨 macOS / Linux / CI 开箱一致。
