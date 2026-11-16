# Yudao Quad-Terminal (`v1.2.0`) 核心文档五维准确性审计与全量归口整改报告

> **审计日期**: `2026-11-16`  
> **审计仓库**: `yudao-quad-terminal`（`templateVersion: 1.2.0`）  
> **审计覆盖范围**: 根入口文档（`README.md`、`AGENTS.md`、`CLAUDE.md`、`HARNESS.md`、`SWARM.md`、`llms.txt`、`CHANGELOG.md`、`compat-manifest.json`）、部署与技能索引（`.agents/skills/README.md`、`deploy/lite/README.md`、`deploy/patches/README.md`）以及统一归口于 `docs/` 下的全量文档（`docs/00_meta_standards` ~ `docs/09_operations`、`docs/07_release/releases/v1.2.0.md`、`docs/wiki/` 41 篇词条、`docs/ontology/*.yaml`）。

---

## 一、五维审计结论与整改闭环总览

| 审计维度 | 审计前发现的失真与污染问题 | 原地根治与工程化防复发措施 | 复验结果 |
| :--- | :--- | :--- | :--- |
| **1. 路径、目录归口与宿主路径净度** | ① 根目录散落 `wiki/`、`openwiki`、`specs`、`releases/` 多头入口及重复空目录 `docs/01_management/dar-decision-records/`；<br>② `HARNESS.md` 与 `speckit-cmmi-docs.cjs` 引用了不存在的历史文件名；<br>③ `deploy/gateway/{caddy/yudao.caddy,nginx/yudao.conf}` 残留开发者宿主机绝对路径；<br>④ `api-digest.md` 控制器相对链接层级偏差。 | ① 全量迁移至 `docs/wiki/`、`docs/specs/`、`docs/07_release/releases/`、`docs/audit/`，清理顶层目录/软链与重复 `dar-decision-records/`，并在 `menu-standard` 门禁新增顶层并行文档目录硬拦截；<br>② 对齐全部 `docs/00_meta_standards` ~ `09_operations` 真实路径；<br>③ `scripts/generate-gateway-config.mjs` 母本改用 `{$CADDY_HOST_ROOT:.}` 与标准服务目录；<br>④ 修正 `scripts/agent-context-compressor.mjs` 三级相对回溯路径。 | **0 死链 / 0 顶层并行文档目录 / 0 宿主机绝对路径** |
| **2. 命令可执行性真源对账** | ① `compat-manifest.json`、`llms.txt`、`scripts/start-local-stack.sh`、`scripts/cmmi-07-release.cjs` 存在旧脚本别名引用；<br>② `README.md` 误称 `pnpm dev:miniapp` 无 CLI 脚本；<br>③ `README.md` / `AGENTS.md` / `HARNESS.md` 漏登新增的 `pnpm release:package`。 | ① 逐条对齐 `package.json` 37+ 核心入口与 `scripts/` 真实文件（修正 `pnpm all`、`pnpm backend:run`、`scripts/generate-gateway-config.mjs`）；<br>② 更新 `pnpm dev:miniapp` / `pnpm build:miniapp` 无头 Vite CLI 说明；<br>③ 在核心文档与兼容契约全链路补齐 `pnpm release:package`。 | **`doc-commands` & `script-targets` & `compat:check` 100% PASS** |
| **3. 版本、20 业务域与跨仓对齐** | ① `docs/wiki/` 旧词条混入外部控制面与无关项目词条；<br>② `docs/ontology/domain.yaml` 仅登记 5 个域，`docs/ontology/copilot.yaml` 版本停留在 `1.0.0`；<br>③ `AGENTS.md` / `deploy/lite/README.md` 残留旧子模块提交号描述；<br>④ `deploy/patches/README.md` 漏列 `apps/miniapp` 补丁；<br>⑤ 跨仓描述未反映姊妹基座最新四端同构态势。 | ① 彻底清除错位旧词条，重构 `scripts/sync-openwiki.mjs` 动态生成 41 篇纯正 `yudao-quad-terminal v1.2.0` 词条（完整覆盖 19 物理后端模块 + `online` 共 20 大业务域）；<br>② 补全 `domain.yaml` 20 域映射并将 `copilot.yaml` 升至 `1.2.0`；<br>③ 对齐纯上游子模块指针（`backend 612a3da76` / `admin 050bac1ec` / `miniapp 4924ad51`）与全部 3 份声明式补丁；<br>④ 准确同步 `cooliebase-all`（`v1.5.0`，含 Admin + 2C + `clients/miniapp` + `clients/expo` 四端及 `oa/hrm/fms/pms` 等 18 插件）及退役节点（~~`aja-pc`~~ 已停用移除）说明。 | **全仓版本 `1.2.0` 一致 / 20 域齐备 / 跨仓口径零偏差** |
| **4. 零明文密钥与零弱默认凭据** | ① `deploy/templates/admin/.env.template` 残留上游默认弱登录账号口令与第三方统计/地图 Key；<br>② `scripts/start-local-stack.sh` 提示语含默认弱凭据说明。 | ① 清空 `.env.template` 中的默认账号口令与第三方标识，关闭推广弹窗开关；<br>② 清理脚本与核心文档中的弱口令示例文本，统一指向 CSPRNG `0600` `.commandcode/lite/credentials.env`。 | **0 明文私钥 / 0 模板弱默认口令** |
| **5. 门禁、单测与契约规模实测对齐** | 各核心文档记录的历史单测与门禁数量不一（单测曾写 44/62/78/81，门禁曾写 15/16 与 18/19，兼容检查曾写 8 组，反向控制曾写 9/9，派生断言曾写 13 项，契约漂移曾写 27 条）。 | 全部以实测输出统一校准：**`fast` 17 项 / `full` 20 项门禁**、**99 个 `node:test` 脚本单测**、**11 组 `compat:check`**、**10/10 项 `harness:controls`**、**20 项 `harness:hatch` 断言**、**PostgreSQL 60 表（49 + 11）**、**92 条只读上游基线孤儿（新增漂移 0）**。 | **文档声明数字与实时命令输出 100% 吻合** |

---

## 二、`docs/` 全生命周期过程资产焕新清单

除迁移归口外，本次对 `docs/00_meta_standards` ~ `docs/09_operations` 下全部历史占位骨架与简略条目执行了实质性重写升级（零 `TODO` 占位符）：

- **`00_meta_standards`**：[`README.md`](../00_meta_standards/README.md) — 明确 `docs/` 唯一文档归口与 17 道快速门禁入口。
- **`01_management`**：[`pmo-dashboard.md`](../01_management/pmo-dashboard.md)（幂等化持久化生成）、[`project-charter.md`](../01_management/project-charter.md)、[`project-plan.md`](../01_management/project-plan.md)、[`project-summary-report.md`](../01_management/project-summary-report.md)、[`risk-register.md`](../01_management/risk-register.md)，并移除重复目录 `dar-decision-records/`。
- **`02_requirements`**：[`user-requirements.md`](../02_requirements/user-requirements.md)、[`software-requirements.md`](../02_requirements/software-requirements.md)（`REQ-001`~`REQ-006` EARS 规格）、[`non-functional-reqs.md`](../02_requirements/non-functional-reqs.md)、[`rtm-traceability-matrix.md`](../02_requirements/rtm-traceability-matrix.md)（绑定真实 REST 路由与测试脚本）、[`uat-acceptance-certificate.md`](../02_requirements/uat-acceptance-certificate.md)。
- **`03_design`**：[`architecture-design-hld.md`](../03_design/architecture-design-hld.md)（四平面同源网关 + DAR 选型矩阵）、[`database-design-erd.md`](../03_design/database-design-erd.md)（60 张 PG 物理表与 `TenantBaseDO` / 三员分立触发器规约）。
- **`04_implementation`**：[`README.md`](../04_implementation/README.md) — 同步三大只读子模块方案 B、99 项单测与 92 条上游契约基线。
- **`05_verification`**：[`test-plan.md`](../05_verification/test-plan.md)（L0~L7 验证矩阵）、[`test-summary-report.md`](../05_verification/test-summary-report.md)、[`defect-tracking-ledger.md`](../05_verification/defect-tracking-ledger.md)（`DEF-001`~`DEF-005` 根因与回归测试）。
- **`06_quality_assurance`**：[`qa-audit-plan.md`](../06_quality_assurance/qa-audit-plan.md)、[`configuration-audit.md`](../06_quality_assurance/configuration-audit.md)（FCA/PCA）、[`car-prevention.md`](../06_quality_assurance/car-prevention.md)、[`spc-metrics.md`](../06_quality_assurance/spc-metrics.md)。
- **`07_release`**：[`release-notes.md`](../07_release/release-notes.md)、[`releases/v1.2.0.md`](../07_release/releases/v1.2.0.md)、[`system-deployment-sop.md`](../07_release/system-deployment-sop.md)、[`user-operation-manual.md`](../07_release/user-operation-manual.md)、[`release-fingerprint.json`](../07_release/release-fingerprint.json)（相同哈希幂等保戳）。
- **`08_sre` & `09_operations`**：[`SLO-SLI-ERROR-BUDGET-MATRIX.md`](../08_sre/01_slo_sli_metrics/SLO-SLI-ERROR-BUDGET-MATRIX.md)、[`tenant-governance.md`](../09_operations/tenant-governance.md)。
- **`wiki` & `ontology`**：[`docs/wiki/index.md`](../wiki/index.md)（41 篇受控百科 + `api-digest.md` + `context-snapshot.json`）、[`ontology.yaml`](../ontology/ontology.yaml)、[`domain.yaml`](../ontology/domain.yaml)（20 业务域）、[`copilot.yaml`](../ontology/copilot.yaml)。

---

## 三、门禁与工具链自证命令清单

```bash
node scripts/cmmi-07-release.cjs fingerprint
pnpm run pmo -- --write
pnpm check
pnpm compat:check
pnpm test:scripts
pnpm harness:controls
pnpm harness:hatch
pnpm gates:23:static
pnpm release:package -- --tag v1.2.0
```
