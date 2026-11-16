# 阶段交付百科：01 立项策划、DAR 选型与沙箱孵化 (PMO, DAR & Clean Hatch)

> **所属阶段**：CMMI-01 | **统一 CLI**：`pnpm pmo / node scripts/cmmi-01-management.cjs [pmo|docs|check|asset|init|render]`  
> **阶段关联 Skills**：`cmmi-asset-authoring`, `dar-decision-matrix`, `yudao-cloud-bootstrap`

---

## 一、阶段职责与工程目标
提供 0.5 秒 PMO 待办雷达、JDK 变体与模块裁剪选型（mini/lite/full），以及零 Git 历史净室白标孵化（project:init / project:hatch）。

---

## 二、标准过程资产归宿（统一归口 `docs/`）
- **物理文档路径**：`docs/01_management/ (pmo-dashboard.md, project-charter.md, project-plan.md, project-summary-report.md, risk-register.md, dar/)`
- **脚手架与合规检查**：`pnpm cmmi:asset new --phase 01 --type <type>` · `pnpm cmmi:asset:check`

---

## 三、质量门禁与阻断红线
- **放行判据**：PMO 待办大盘同步、DAR 加权选型完备、harness:hatch 20 项断言全绿
- **一票否决项**：**污染母本工作区、缺少风险缓释预案或未经净室白标脱敏严禁派生交付**（*No Artifact, No Done*）
