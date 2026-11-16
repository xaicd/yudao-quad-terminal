# 避坑实录：PostgreSQL 18.4 Druid 连接池句柄关闭陷阱与登录加密

1. **「首登 200、二登 500」连接池陷阱**：PostgreSQL 驱动关闭扩展查询句柄后，若 Alibaba Druid 开启 `pool-prepared-statements: true` 会复用已关闭 Statement 抛出 `This statement has been closed`。`deploy/lite/application-lite.yaml` 已强制设为 `false`，且 `pnpm lite:verify` 连登 3 次做回归守卫。
2. **登录接口 `@ApiEncrypt` 对称加密**：`AuthController` 默认启用请求体加密，客户端必须携带 `X-Api-Encrypt` 请求头并使用 AES-256-ECB 加密请求体（参考 `deploy/lite/runtime/lite-api-encrypt.mjs`）。
3. **JDK 17 模块反射开放参数**：启动 JVM 须携带 `--add-opens=java.base/java.nio=ALL-UNNAMED` 与 `--add-opens=java.base/sun.nio.ch=ALL-UNNAMED`（`scripts/lite-up.mjs` 与 `deploy/service.sh` 已内置）。
