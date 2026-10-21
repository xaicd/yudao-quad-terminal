---
name: yudao-local-stack
description: Yudao-Quad-Terminal 本地开发环境自闭环指南（两档：lite 零 Docker 档 / local 容器档）。指导数字员工用 scripts/lite-up.mjs 秒级拉起嵌入式真 PostgreSQL + 嵌入式真 Redis（零 Docker），或用 docker-compose.local.yml 拉起容器化 MySQL/Redis；并规避弱默认凭据与端口冲突。
---

# Yudao-Local-Stack 本地环境自闭环指南（lite 零 Docker / local 容器）

> **最高法典契约**：杜绝向开发者与 Agent 强加繁重的本地环境配置。默认优先 **lite 档**（零 Docker、零外部服务）；
> 需要贴近生产的 MySQL 方言时再用 **local 档**（容器）。
> **凭据铁律**：禁止 `admin` / `admin123` 这类弱默认凭据（见 §4）。

---

## §1 两档拓扑

```
【lite 档：零 Docker、零外部服务】（推荐，默认）
        scripts/lite-up.mjs
                 │
   ┌─────────────┴──────────────┐
   ▼                            ▼
[嵌入式真 PostgreSQL 18.4]   [嵌入式真 Redis 7.4.1]
 • 官方 sql/postgresql 脚本     • 真二进制（非模拟器）
 • 端口 55432 / 数据 .commandcode/lite/pgdata
 • requirepass 由 CSPRNG 生成，仅绑 127.0.0.1
                 │
                 ▼
        [yudao-server 48080]  ← 外置配置 deploy/lite/application-lite.yaml

【local 档：容器化，贴近生产 MySQL】
        docker-compose.local.yml
                 │
   ┌─────────────┴──────────────┐
   ▼                            ▼
[yudao-mysql-dev]            [yudao-redis-dev]
 • mysql:8.0.36               • redis:7.2-alpine
 • 宿主机端口 33066           • 宿主机端口 63799
 • 初始化 ./apps/backend/sql/mysql/ruoyi-vue-pro.sql
 • 数据 ./data/mysql          • 数据 ./data/redis
```

---

## §2 lite 档（零 Docker）—— 默认选择

```bash
# 首次：安装 lite 运行时依赖（嵌入式 PG 二进制 + pg + bcryptjs）
cd deploy/lite/runtime && npm install

# 构建 fat jar：必须两步（否则会「fat jar 套 fat jar」导致模块 bean 全扫不到）
cd apps/backend
mvn -B clean install -DskipTests -pl yudao-server -am -Dspring-boot.repackage.skip=true
mvn -B package -DskipTests -pl yudao-server

# 启动 / 验收 / 清理
pnpm lite:up        # 常驻；Ctrl-C 成对回收 Redis 与 java
pnpm lite:verify    # 跑完整验收（含弱默认凭据反证）后退出
pnpm lite:clean     # 清理 PG 数据目录与抽出的二进制
```

**依赖边界（必须如实告知）**：lite 档需要本机具备 JDK 17 / Maven / Node；首次运行需网络拉取
PG 二进制、Redis 制品与 PG 驱动。除此之外**不需要 Docker，也不需要任何外部数据库/缓存服务**。

**许可边界**：lite 档的 Redis 为 7.4.1（RSALv2 / SSPLv1），仅限本地开发与演示；
**严禁**用于对外提供 Redis 兼容托管服务，**分发前必须切换**到 Redis 6.2.6（BSD-3）或 Valkey。
详见 `docs/01_management/dar/DAR-20261021-lite-runtime-dependencies.md`。

---

## §3 local 档（容器，需要 Docker）

```bash
bash scripts/start-local-stack.sh
# 或
docker compose -f docker-compose.local.yml up -d
```

探活：

```bash
docker exec yudao-mysql-dev mysqladmin ping -h localhost -u root -proot
docker exec yudao-redis-dev redis-cli ping
```

重置（销毁数据卷后重建）：

```bash
docker compose -f docker-compose.local.yml down -v
docker compose -f docker-compose.local.yml up -d
```

> ⚠️ local 档首次启动后，`system_users` 仍是**上游种子账号**。该账号仅供隔离环境自检，
> **不得**用于任何共享/演示/对外环境。需要可用凭据时，请改用 lite 档（会自动替换为 CSPRNG 高熵凭据）。

---

## §4 凭据铁律（硬约束）

- ❌ 禁止 `admin` 用户名、禁止 `admin123` 之类的弱口令，禁止把种子默认凭据写进文档/脚本/演示话术。
- ✅ lite 档账号与口令均由 CSPRNG 生成：
  - 账号需满足后端 `^[a-zA-Z0-9]{4,30}$`（**不能带下划线**）；
  - 口令长度 16（`AuthLoginReqVO` 的 `@Length(min=4, max=16)` 是登录请求硬上限）；
  - 凭据写入 `.commandcode/lite/credentials.env`（权限 600、已 gitignore），只回显一次；
  - 导入种子后立即把 `system_users.id=1` 改名改密，其余种子弱演示账号置为禁用。
- ✅ Redis 同样启用 `requirepass`（32 位 CSPRNG 口令），且仅绑定 `127.0.0.1`。

---

## §5 端口与冲突排查 (Gotchas)

| 用途 | lite 档 | local 档（compose 映射） |
|---|---|---|
| 应用 | 48080 | 48080 |
| 数据库 | 55432（嵌入式 PG） | 33066（映射到容器 3306） |
| 缓存 | 63799（嵌入式 Redis） | 63799（映射到容器 6379） |

1. **端口被占用**：lite 档用 `--pg-port/--redis-port/--server-port` 换端口；local 档改 compose 映射并同步外置配置。
2. **lite 起不来且日志有 `No MyBatis mapper was found` + 缺少 `ApiErrorLogCommonApi`**：
   典型的「fat jar 套 fat jar」，按 §2 的两步构建重新打包（正确产物约 189MB）。
3. **登录报 `账号格式为数字以及字母`**：手改过凭据文件且账号含非法字符；删除
   `.commandcode/lite/credentials.env` 让其重新生成。
4. **登录报 `请求未包含加密标头`**：蓝图开启了 `yudao.api-encrypt`，且 `AuthController#login` 带
   `@ApiEncrypt`；调用方必须按 §6 的契约加密请求。

---

## §6 ApiEncrypt 真实契约（lite 探活已内建）

- 请求头 `X-Api-Encrypt` 非空 ⇒ 后端认为请求体已加密并解密；缺失且接口带 `@ApiEncrypt` ⇒ 直接报错。
- 算法 AES ⇒ **AES/ECB/PKCS5Padding**，密钥取 `yudao.api-encrypt.request-key` / `response-key`（各 32 字节）。
- 请求体：Hutool 侧「HEX 优先、否则 BASE64」解码；响应体为 `encryptBase64` ⇒ BASE64。
- 现成实现：`deploy/lite/runtime/lite-api-encrypt.mjs`，由 `scripts/lite-up.mjs` 探活直接复用。
