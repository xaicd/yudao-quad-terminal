# 阶段交付百科：07 不可变制品指纹、离线骨架包与发布割接 (Release & Rollback)

> **所属阶段**：CMMI-07 | **统一 CLI**：`pnpm build / pnpm release:package / node scripts/cmmi-07-release.cjs [fingerprint|gateway|runbook]`  
> **阶段关联 Skills**：`cmmi-asset-authoring`

---

## 一、阶段职责与工程目标
固化两步 Maven 与前端构建流水线，支持一键生成离线纯净四端骨架包并经 GitHub Actions 自动发布带 SHA-256 签名的正式版本。

---

## 二、标准过程资产归宿（统一归口 `docs/`）
- **物理文档路径**：`docs/07_release/ (system-deployment-sop.md, rollback-runbook.json, release-fingerprint.json, release-notes.md, user-operation-manual.md, releases/v1.2.0.md)`
- **脚手架与合规检查**：`pnpm cmmi:asset new --phase 07 --type <type>` · `pnpm cmmi:asset:check`

---

## 三、质量门禁与阻断红线
- **放行判据**：两步 Maven 189MB 可执行 Jar、Admin/MiniApp 静态产物齐备、SHA256SUMS 校验一致
- **一票否决项**：**嵌套 Fat-Jar 构建错误、制品哈希漂移或缺失 5 分钟秒级回滚预案严禁发布**（*No Artifact, No Done*）
