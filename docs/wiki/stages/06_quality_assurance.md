# 阶段交付百科：06 质量门禁、反向控制与配置审计 (Quality Gates & Negative Controls)

> **所属阶段**：CMMI-06 | **统一 CLI**：`pnpm check / pnpm harness:controls / pnpm gates:23:static / node scripts/cmmi-06-quality.cjs check`  
> **阶段关联 Skills**：`cmmi-asset-authoring`, `yudao-cmmi-gatekeeper`

---

## 一、阶段职责与工程目标
通过 negative-controls.mjs 向每道 blocking 门禁注入受控违规验证真实拦截力，并执行 FCA/PCA 功能与物理配置审计。

---

## 二、标准过程资产归宿（统一归口 `docs/`）
- **物理文档路径**：`docs/06_quality_assurance/ (qa-audit-plan.md, configuration-audit.md, car-prevention.md, spc-metrics.md, audit/) 与 docs/audit/`
- **脚手架与合规检查**：`pnpm cmmi:asset new --phase 06 --type <type>` · `pnpm cmmi:asset:check`

---

## 三、质量门禁与阻断红线
- **放行判据**：fast 17 项 / full 20 项门禁通过、10/10 反向控制咬合、G1~G23 出厂门禁达标
- **一票否决项**：**不会咬人的摆设门禁、配置与实现失真或未闭环高危缺陷严禁放行**（*No Artifact, No Done*）
