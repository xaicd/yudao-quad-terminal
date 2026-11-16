# 避坑实录：连字符项目名五态标识符推导与 4 字导航菜单硬约束

1. **连字符项目名（如 `demo-mall`）分态规则**：直接把 `-` 拼进 SQL 表名、Java 类名或 Nginx `upstream` 会引发语法崩溃。`scripts/project-reactor.mjs` 的 `deriveSlugForms()` 严格区分路由前缀 `/demo-mall`、SQL/DB 标识 `demo_mall`（`snakeSlug`）、Java 主类 `DemoMallServerApplication`（`pascalSlug`）与 Nginx `upstream demo_mall_backend`。
2. **导航菜单严格 `<= 4` 字铁律**：所有可见目录与页面菜单（`system_menu.type IN (1, 2)`）必须满足 `char_length(name) <= 4`，完整说明写入 `remark`。由 `scripts/lib/menu-standard.cjs`、`lite-pg.mjs` 与门禁 `menu-standard` 全链路强制执行。
