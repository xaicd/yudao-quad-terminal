# 架构支柱：零 Docker 嵌入式 PostgreSQL 18.4 + Redis 运行栈

- **真实双引擎零容器拉起（`scripts/lite-up.mjs` & `scripts/lib/ephemeral-pg.cjs`）**：
  - 数据库采用进程内 **Embedded PostgreSQL 18.4**，直接导入官方 `apps/backend/sql/postgresql/{ruoyi-vue-pro,quartz}.sql`（60 张物理表 / 48 个序列），零 SQL 方言移植损耗；
  - 缓存采用真实预编译 **Embedded Redis**（本地开发默认 `7.4.1`，对外随制品分发支持切换 `--redis-variant redis-6.2.6-bsd`）。
- **CSPRNG 零弱默认凭据体系（`deploy/lite/runtime/lite-credentials.mjs`）**：
  - 首次引导自动生成高熵字母数字管理员账号与 16 位口令、32 位 Redis 口令，以 `0600` 权限写入 gitignored 的 `.commandcode/lite/credentials.env`；
  - 导入种子后立即覆写 `system_users.id=1` 为 bcrypt(10) 高熵口令、停用其余演示账号，并调用 `sanitizeUpstreamMenus()` 自动归一化超 4 字菜单与隐藏上游外链菜单；
  - `pnpm lite:verify` 强制执行 AES-256-ECB `@ApiEncrypt` 连续 3 次登录回归验证与弱默认凭据拒绝反证。
