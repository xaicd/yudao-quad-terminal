# Agent Skills 技能索引

> **单一真源**：技能的**唯一**真源是 `.agents/skills/<name>/SKILL.md`（见 `AGENTS.md` Rule 0 第 11 条）。
> 本文件只是**索引**，不承载任何技能正文；严禁在 `docs/skills/` 等处建立重复副本。

当前登记 **18** 个技能。面向 LLM 的首屏导航见 `wiki/index.md`。

---

## 按 CMMI 阶段分布

> 此表与 `scripts/sync-openwiki.mjs` 的 stage 定义**严格一致**；
> `node scripts/gate-check.mjs --tier fast` 会校验「引用的技能必须都存在」且「真实技能必须都被覆盖」。

| 阶段 | 阶段名 | 关联技能 |
|---|---|---|
| **00** | 技能与资产工程 | `cmmi-asset-authoring` |
| **01** | 决策分析与立项 | `cmmi-asset-authoring`, `dar-decision-matrix`, `yudao-cloud-bootstrap` |
| **02** | 需求工程与规格 | `cmmi-asset-authoring`, `ears-spec-writer` |
| **03** | 架构设计与契约 | `cmmi-asset-authoring`, `archify` |
| **04** | 编码实现与防假 | `cmmi-asset-authoring`, `yudao-backend-dev`, `yudao-admin-vue3`, `yudao-miniapp-dev`, `yudao-expo-app`, `yudao-contract-sync`, `yudao-local-stack`, `mutation-tester`, `yudao-mcp-server` |
| **05** | 验证与打假 | `cmmi-asset-authoring`, `mutation-tester`, `yudao-cmmi-gatekeeper` |
| **06** | 质量门禁与过程控制 | `cmmi-asset-authoring`, `yudao-cmmi-gatekeeper` |
| **07** | 发布与投产 | `cmmi-asset-authoring` |
| **08** | SRE 与安全 | `cmmi-asset-authoring`, `sre-slo-manager`, `postmortem-analyzer`, `strix-penetration-testing` |
| **09** | 持续运营与对账 | `cmmi-asset-authoring`, `financial-reconciliation-agent` |

---

## 技能清单

### 过程与决策（CMMI 通用）

| 技能 | 一句话职责 |
|---|---|
| `cmmi-asset-authoring` | 标准化创建、演进与审计 CMMI 01~09 全生命周期工程过程资产 |
| `dar-decision-matrix` | 结构化决策分析与加权权衡（CMMI DAR），附敏感度分析 |
| `ears-spec-writer` | 编写 IEEE 29148 / EARS 句式需求规格（WHEN…THEN…SHALL） |
| `mutation-tester` | 变异测试与反假 Mock 验证，要求 MSI 达标 |
| `yudao-cmmi-gatekeeper` | CMMI 01~09 质量门禁与变异测试打假守卫（驱动 workflow-engine） |
| `archify` | 生成可交互、可机器验证的架构与流程图 |
| `sre-slo-manager` | SLI/SLO 矩阵、错误预算与多燃烧率告警 |
| `postmortem-analyzer` | Google SRE 免责复盘、5-Whys 根因与 CAPA 闭环 |
| `strix-penetration-testing` | 多智能体自主红队渗透与漏洞 PoC 验证 |
| `financial-reconciliation-agent` | 复式记账守卫与三方对账平账 |

### 本仓工程（Yudao Quad-Terminal 专属）

| 技能 | 一句话职责 |
|---|---|
| `yudao-cloud-bootstrap` | 基座选型、JDK 适配、多模块裁剪与多端模板装配 |
| `yudao-backend-dev` | Spring Boot 3 / JDK 17 后端六层解耦、租户隔离与数据权限 |
| `yudao-admin-vue3` | Vue 3 + Element Plus + Pinia 运营中台研发 |
| `yudao-miniapp-dev` | Uni-App Vue 3 微信小程序（登录/支付/分包） |
| `yudao-expo-app` | Expo SDK 52 / RN 0.76 移动端与 OTA 发布 |
| `yudao-contract-sync` | OpenAPI / Knife4j → 强类型 TS SDK 与契约防漂移 |
| `yudao-local-stack` | 本地环境自闭环：**lite 零 Docker 档** 与 local 容器档 |
| `yudao-mcp-server` | MCP 机器可调用端点（8 个工具，供 Agent 无头编排） |

---

## 新增技能的标准步骤

1. 建目录：`.agents/skills/<name>/SKILL.md`
2. frontmatter 只允许两个键（与现有 18 个保持一致）：

   ```yaml
   ---
   name: <name>
   description: <中文、面向触发场景的一句话>
   ---
   ```

3. 在 `scripts/sync-openwiki.mjs` 的对应 stage `skills: [...]` **与** `wiki/index.md` 表格行中登记；
4. 重新生成并校验：

   ```bash
   node scripts/sync-openwiki.mjs
   node scripts/gate-check.mjs --tier fast
   ```

> 只登记真实存在的技能。`gate-check` 会拦住悬空引用，也会提示「真实技能未被任何阶段覆盖」。
