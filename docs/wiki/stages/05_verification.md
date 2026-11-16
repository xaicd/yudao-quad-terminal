# 阶段交付百科：05 嵌入式真 PG E2E 验收与变异打假 (Real-DB E2E & Mutation)

> **所属阶段**：CMMI-05 | **统一 CLI**：`pnpm lite:verify / pnpm test:scripts / pnpm test:all / node scripts/cmmi-05-verification.cjs e2e`  
> **阶段关联 Skills**：`cmmi-asset-authoring`, `mutation-tester`, `yudao-cmmi-gatekeeper`

---

## 一、阶段职责与工程目标
基于 Embedded PostgreSQL 18.4 与 Embedded Redis 执行全链路真实入库验证、连续加密登录回归防护及四视口（1920/1440/375/320dp）几何防遮挡验收。

---

## 二、标准过程资产归宿（统一归口 `docs/`）
- **物理文档路径**：`docs/05_verification/ (test-plan.md, test-summary-report.md, defect-tracking-ledger.md, mutation/, peer-review-records/, test-cases/)`
- **脚手架与合规检查**：`pnpm cmmi:asset new --phase 05 --type <type>` · `pnpm cmmi:asset:check`

---

## 三、质量门禁与阻断红线
- **放行判据**：99 个自有脚本单测全绿、AES 加密连续 3 次登录 200、弱口令反证被拒、Playwright 多视口零遮挡
- **一票否决项**：**内存假 Mock、连接池二登 500 假阳性或空断言测试一票否决**（*No Artifact, No Done*）
