# 架构支柱：只读上游子模块、声明式补丁与净室派生引擎

- **只读子模块契约（方案 B）**：
  - `apps/backend`、`apps/admin`、`apps/miniapp` 均钉死在各自上游远端真实存在的提交（由 `pnpm compat:check` 校验远端分支可达性，确保任何环境 `git clone --recursive` 100% 成功）；
  - 代码级差异收敛在主仓 `deploy/patches/{backend,admin,miniapp}/*.patch`，由 `pnpm patch:apply` 幂等注入，`pnpm patch:check` 强制校验子模块改动恰好等于已声明补丁。
- **零 Git 历史净室白标孵化（`scripts/project-reactor.mjs`）**：
  - 执行 `pnpm project:hatch` 或 `pnpm project:init` 时，`deriveSlugForms()` 自动推导连字符路由名、下划线 SQL 标识符 `snakeSlug` 与大驼峰 Java 主类名 `pascalSlug`；
  - 自动迁移 Java 包路径与同源 Maven `groupId`，物理清除上游教程 Markdown、`.image` 二维码目录、静态假图表以及母本内部审计/Release 归档，并通过 `pnpm harness:hatch` 20 项金路径断言守卫。
