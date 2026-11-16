# 阶段交付百科：08 SRE 服务控制面、SLO 预算与安全渗透 (SRE, SLO & Security)

> **所属阶段**：CMMI-08 | **统一 CLI**：`pnpm service:start / pnpm service:health / pnpm service:status / node scripts/cmmi-08-sre.cjs health`  
> **阶段关联 Skills**：`cmmi-asset-authoring`, `sre-slo-manager`, `postmortem-analyzer`, `strix-penetration-testing`

---

## 一、阶段职责与工程目标
通过标准 8 动词控制器 deploy/service.sh 守护进程与端口生命周期，落实多燃烧率告警、红队安全验证与免责复盘。

---

## 二、标准过程资产归宿（统一归口 `docs/`）
- **物理文档路径**：`docs/08_sre/ (01_slo_sli_metrics/SLO-SLI-ERROR-BUDGET-MATRIX.md, 02_observability_apm/, 05_disaster_recovery/, 06_incidents_postmortem/, security-reports/)`
- **脚手架与合规检查**：`pnpm cmmi:asset new --phase 08 --type <type>` · `pnpm cmmi:asset:check`

---

## 三、质量门禁与阻断红线
- **放行判据**：SLO 可用率 >= 99.95%、核心读写 P99 < 200ms、网关四平面 HTTP 200 贯通
- **一票否决项**：**硬编码宿主机路径、抢占邻居实例端口或事故未完成 5-Whys CAPA 严禁结单**（*No Artifact, No Done*）
