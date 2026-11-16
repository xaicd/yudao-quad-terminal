# 《Yudao Quad-Terminal》历史工程缺陷根治与回归防护台账 (Defect Tracking Ledger, `v1.2.0`)

| 缺陷编号 | 严重度 | 历史故障现象 | 5-Whys 根本原因 | 根治方案与回归守卫测试 | 当前状态 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DEF-001** | P0 | 单条 Maven 打包后启动报找不到 Mapper 与 `ApiErrorLogCommonApi` | 子模块 `*-server` 均绑定 `spring-boot repackage`，单步打包产生嵌套 Fat-Jar | `pnpm build:backend` 固化两步构建法，`lite-up.mjs` 增加嵌套 Jar 检测 | ✅ 已关闭 |
| **DEF-002** | P0 | PostgreSQL `lite` 档首次登录 200，第二次登录偶发 HTTP 500 | PostgreSQL 关闭扩展协议句柄后，Druid `pool-prepared-statements: true` 复用失效句柄 | `application-lite.yaml` 强制关闭 PS 池；`lite:verify` 连登 3 次回归防护 | ✅ 已关闭 |
| **DEF-003** | P1 | 带连字符工程名（如 `demo-mall`）孵化后 SQL 导入与 Java 编译失败 | 早期字符串直替将 `-` 写入未加引号 SQL 表名与 Java 类名 | `deriveSlugForms()` 拆分 `snakeSlug`、`pascalSlug` 与 Nginx 下划线 `upstream` | ✅ 已关闭 |
| **DEF-004** | P1 | 管理端模板与网关配置残留默认弱口令及宿主机绝对路径 | `.env.template` 保留上游演示口令，`generate-gateway-config.mjs` 写入本机 `ROOT` | 清空模板弱默认凭据；母本网关改用 `{$CADDY_HOST_ROOT:.}` 与标准服务目录 | ✅ 已关闭 |
| **DEF-005** | P2 | 仓库根目录存在 `wiki/`、`openwiki`、`specs`、`releases/` 多头文档入口 | 历史迭代演进中保留了兼容软链与顶层目录，造成文档检索路径分散 | 全量迁移归口至 `docs/`，并在 `menu-standard` 门禁新增顶层并行文档目录拦截 | ✅ 已关闭 |
