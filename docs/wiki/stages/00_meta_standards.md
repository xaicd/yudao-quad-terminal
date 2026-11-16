# 阶段交付百科：00 规范与元契约 (Meta Standards & Constitution)

> **所属阶段**：CMMI-00 | **统一 CLI**：`pnpm run speckit -- cmmi 00 [docs|check|constitution|schema|sync]`  
> **阶段关联 Skills**：`cmmi-asset-authoring`

---

## 一、阶段职责与工程目标
治理工程宪法、18 个专属 Agent Skills 注册一致性、Blueprint JSON Schema 与全仓 docs/ 单一文档归口准则。

---

## 二、标准过程资产归宿（统一归口 `docs/`）
- **物理文档路径**：`docs/00_meta_standards/README.md、.specify/memory/constitution.md、AGENTS.md、HARNESS.md、docs/wiki/index.md`
- **脚手架与合规检查**：`pnpm cmmi:asset new --phase 00 --type <type>` · `pnpm cmmi:asset:check`

---

## 三、质量门禁与阻断红线
- **放行判据**：openwiki、skills、compat、menu-standard 门禁全绿
- **一票否决项**：**顶层散落非 docs/ 文档目录、悬空技能引用或契约失真严禁入仓**（*No Artifact, No Done*）
