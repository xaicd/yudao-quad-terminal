# 《Yudao Quad-Terminal》技术与交付风险管理台账 (Risk Register, `v1.2.0`)

| 风险编号 | 风险类别 | 风险描述与触发条件 | 影响等级 | 工程化缓解与防御措施 (Mitigation) | 自动化守卫入口 | 状态 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-001** | 数据安全 | 多企业租户并发访问发生跨租户数据越权读写 | 极高 | 业务表统一继承 `TenantBaseDO`，由 MyBatis-Plus `TenantDatabaseInterceptor` AST 级强制注入 `tenant_id` | `docs/ontology/ontology.yaml` · 后端租户单测 | 持续受控 |
| **RSK-002** | 构建打包 | Maven 单步构建生成嵌套 Fat-Jar 导致启动找不到 Bean/Mapper | 高 | `pnpm build:backend` 固化两步构建法，`lite-up.mjs` 启动前自动校验 Jar 结构与体积 | `pnpm build:backend` | 已根治 |
| **RSK-003** | 数据库连接 | PostgreSQL 18.4 + Druid 开启 PS 池导致第二次请求报 Statement 已关闭 | 高 | `deploy/lite/application-lite.yaml` 强制 `pool-prepared-statements: false`，验收连登 3 次 | `pnpm lite:verify` · `G8` | 已根治 |
| **RSK-004** | 供应链协作 | 子模块指针误钉本地未推送提交导致外部 `git clone --recursive` 失败 | 高 | 严禁子模块本地提交；定制收敛于 `deploy/patches/*.patch`，门禁实时校验远端分支可达性 | `pnpm compat:check` · `pnpm patch:check` | 已根治 |
| **RSK-005** | 凭据泄漏 | 本地或模板残留弱默认管理员口令或明文密钥 | 高 | 模板清空默认账号口令；`lite` 档由 CSPRNG 动态签发 16/32 位高熵口令至 gitignored `0600` 文件 | `G3` · `G17` · `G23` | 已根治 |
| **RSK-006** | 许可合规 | Redis 7.4.1 采用 RSALv2/SSPLv1 协议，不可直接随商业闭源制品对外分发 | 中 | 本地开发默认 `7.4.1`，商业交付分发前支持一键切换 `--redis-variant redis-6.2.6-bsd` (BSD-3) | `deploy/lite/README.md` | 持续受控 |
