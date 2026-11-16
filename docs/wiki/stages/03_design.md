# 阶段交付百科：03 架构设计、ERD 与蓝图自愈 (HLD, ERD & Blueprint Doctor)

> **所属阶段**：CMMI-03 | **统一 CLI**：`pnpm blueprint:doctor / node scripts/cmmi-03-design.cjs [docs|check|asset|doctor|compile-domain]`  
> **阶段关联 Skills**：`cmmi-asset-authoring`, `archify`

---

## 一、阶段职责与工程目标
确立四平面同源网关拓扑、MyBatis-Plus 多租户物理/逻辑隔离模型，并通过 blueprint:doctor 自动自愈口语化字段、状态机与菜单命名。

---

## 二、标准过程资产归宿（统一归口 `docs/`）
- **物理文档路径**：`docs/03_design/ (architecture-design-hld.md, database-design-erd.md, adr/, diagrams/, detailed-design-lld/, interface-contracts/) 与 docs/ontology/*.yaml`
- **脚手架与合规检查**：`pnpm cmmi:asset new --phase 03 --type <type>` · `pnpm cmmi:asset:check`

---

## 三、质量门禁与阻断红线
- **放行判据**：蓝图 menuName <= 4 字校验通过、多租户 TenantBaseDO 8 大审计字段齐备
- **一票否决项**：**缺少 tenant_id 行级隔离、超 4 字违规导航菜单或跨模块循环依赖严禁通过设计门禁**（*No Artifact, No Done*）
