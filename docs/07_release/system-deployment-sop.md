# 《Yudao Quad-Terminal》生产构建、标准部署拓扑与秒级回滚 SOP (`v1.2.0`)

> **CMMI 门禁**: G5 交付与投产门禁  
> **关联预案与指纹**: [`rollback-runbook.json`](rollback-runbook.json) · [`release-fingerprint.json`](release-fingerprint.json)  

---

## 一、发布前门禁与两步法制品构建

```bash
# 1. 注入三大只读子模块声明式补丁并校验门禁
pnpm patch:apply
pnpm check && pnpm compat:check

# 2. 执行全栈生产构建（两步 Maven 189MB 可执行 Jar + Admin 24.6MB 静态包 + MiniApp H5）
pnpm build

# 3. 签发不可变发布指纹与离线骨架归档包（输出至 dist/release-assets/）
node scripts/cmmi-07-release.cjs fingerprint
pnpm release:package -- --tag v1.2.0
```

> **关键防坑**：后端构建严禁合并为单条 `mvn package`，必须先以 `-Dspring-boot.repackage.skip=true` 安装普通模块库 Jar，再单独打包 `yudao-server`（已固化于 `pnpm build:backend`）。

---

## 二、标准 8 动词服务部署与网关拉起（`deploy/service.sh`）

1. **端口与凭据准备**：确认 `.env.ports`（默认网关 `:48120`、后端 `:48080`、PG `:55432`、Redis `:63799`）端口空闲；首次运行自动在 `.commandcode/lite/credentials.env`（权限 `0600`）签发高熵凭据。
2. **渲染四平面网关并启动守护进程**：
   ```bash
   pnpm gateway:gen          # 生成 deploy/gateway/caddy/<slug>.caddy 与 nginx/<slug>.conf
   pnpm service:start        # 后台拉起后端与统一网关并记录 PID
   pnpm service:health       # 实弹拨测健康端点与同源入口 HTTP 200
   pnpm service:status       # 查看进程 PID、监听端口与日志位置
   ```

---

## 三、5 分钟秒级回滚应急规程（Rollback SOP）

当线上拨测异常、P99 延迟突破阈值或错误预算加速燃烧时，立即按 [`rollback-runbook.json`](rollback-runbook.json) 执行止血回滚：
1. 停止异常应用实例：`./deploy/service.sh stop`；
2. 切回上一版本通过 SHA-256 指纹核验的制品目录或 Git Tag（`v1.2.0`），确认无破坏性非兼容 DDL；
3. 重新拉起并执行健康与登录冒烟：`./deploy/service.sh start && ./deploy/service.sh health && pnpm smoke:login`。
