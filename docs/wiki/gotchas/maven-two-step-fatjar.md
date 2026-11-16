# 避坑实录：两步 Maven 构建防嵌套 Fat-Jar 扫描失效

1. **故障现象**：各 `yudao-module-*-server` 子模块 POM 默认绑定了 `spring-boot-maven-plugin` 的 `repackage`。若单条命令构建，业务模块会被打成嵌套 Fat-Jar 塞入 `BOOT-INF/lib/`，导致 Spring 与 MyBatis 无法扫描模块内的 Bean 和 Mapper（报 `No MyBatis mapper was found` / 缺 `ApiErrorLogCommonApi`）。
2. **标准两步构建法（已封装为 `pnpm build:backend`）**：
   ```bash
   cd apps/backend
   mvn -B clean install -DskipTests -pl yudao-server -am -Dspring-boot.repackage.skip=true
   mvn -B package -DskipTests -pl yudao-server
   ```
   正常 `yudao-server.jar` 体积约 **189MB**；若超过 500MB 即误触嵌套 Fat-Jar。
