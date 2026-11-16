# 《Yudao Quad-Terminal》阶段工程基线总结与经验沉淀报告 (`v1.2.0`)

> **适用版本**: `v1.2.0` (`2026-11-16`)  
> **归属阶段**: CMMI `01_management` / `06_quality_assurance`  

---

## 一、`v1.2.0` 核心工程成果交付摘要

1. **双支柱架构与跨底座同名契约闭环**：完成 `scripts/harness.cjs` 生命周期总调度器与 `scripts/cmmi-00-meta.cjs` ~ `scripts/cmmi-09-operations.cjs` 十阶段过程资产扩展，与姊妹基座 `cooliebase-all` (`v1.5.0`，同具 `clients/{web,admin,app,miniapp}` 四端与 20 个官方插件) 实现 100% 同名同参调用。
2. **只读子模块声明式补丁收敛（方案 B）**：`apps/backend` (`612a3da76`)、`apps/admin` (`050bac1ec`)、`apps/miniapp` (`4924ad51`) 全部钉定远端真实上游提交，3 份定制补丁统一落盘 `deploy/patches/`，彻底根治子模块本地提交导致外部克隆失败的历史痛点。
3. **零 Docker 真库运行档与净室孵化器**：集成 Embedded PostgreSQL 18.4 + Embedded Redis + CSPRNG `0600` 强凭据（`pnpm lite:verify`），并在 `ProjectReactor` 中固化连字符安全标识符（`snakeSlug` / `pascalSlug`）、4 字导航菜单归一化与零宿主机硬编码网关渲染。
4. **全仓文档统一归口 `docs/` 与自动化发布流水线**：消除顶层并行文档目录，将 OpenWiki（41 篇受控词条）、规格包、Release 说明与治理审计统一收敛至 `docs/`，并通过 `pnpm release:package` 与 `.github/workflows/release.yml` 实现离线纯净骨架包签名发布。

---

## 二、关键工程经验教训（Lessons Learned）

| 序号 | 真实踩坑场景 | 根治工程机制 | 守护测试 / 门禁 |
| :--- | :--- | :--- | :--- |
| 1 | 单步 `mvn package` 将子模块打成嵌套 Fat-Jar，导致 Mapper 与 Bean 扫描全灭 | 固化两步 Maven 构建（先 `-Dspring-boot.repackage.skip=true` install，再单独 package `yudao-server`） | `pnpm build:backend` · `lite-up.mjs` 体积预检 |
| 2 | PostgreSQL 下开启 Druid `pool-prepared-statements` 引发「首登 200、二登 500」 | `application-lite.yaml` 强制关闭 PS 池，验收脚本强制连续加密登录 3 次 | `pnpm lite:verify` · `G8` / `G17` |
| 3 | 带连字符项目名（如 `demo-mall`）直接替换进 SQL 表名与 Java 类名导致语法崩溃 | `deriveSlugForms()` 严格拆分路由连字符名、`snakeSlug` 与 `pascalSlug` | `hyphen-slug-and-three-role.test.mjs` · `harness:hatch` |
| 4 | 网关配置生成脚本写入开发者本机绝对路径，跨机器检出即漂移失效 | 母本统一输出 `{$CADDY_HOST_ROOT:.}` 与标准服务目录占位，零宿主机路径入库 | `scripts/generate-gateway-config.mjs` · `G11` |
