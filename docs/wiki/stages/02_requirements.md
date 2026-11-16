# 阶段交付百科：02 需求分诊与 EARS 规格工程 (Triage, SRS & RTM)

> **所属阶段**：CMMI-02 | **统一 CLI**：`pnpm agent:route / node scripts/cmmi-02-requirements.cjs [docs|check|asset|route|new|build]`  
> **阶段关联 Skills**：`cmmi-asset-authoring`, `ears-spec-writer`

---

## 一、阶段职责与工程目标
通过确定性需求分诊器判定 SPEC_REQUIRED / DIRECT_OK，并以 IEEE 29148 / EARS 句式建立需求到接口与测试的双向追溯矩阵。

---

## 二、标准过程资产归宿（统一归口 `docs/`）
- **物理文档路径**：`docs/02_requirements/ (software-requirements.md, rtm-traceability-matrix.md, non-functional-reqs.md, user-requirements.md, uat-acceptance-certificate.md) 与 docs/specs/<domain>/<name>/`
- **脚手架与合规检查**：`pnpm cmmi:asset new --phase 02 --type <type>` · `pnpm cmmi:asset:check`

---

## 三、质量门禁与阻断红线
- **放行判据**：specs:health 校验 16 份规格资产 + brief.json 8 要素完备且零占位符
- **一票否决项**：**含 TODO/待填 假资产或缺少 EARS 确定性验收准则严禁进入编码**（*No Artifact, No Done*）
