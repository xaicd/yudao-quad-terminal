# AGENTS.md — Yudao Quad-Terminal 工程宪法与治理守卫

更新时间：2026-10-10

本文件是 **Yudao Quad-Terminal（四位一体超级基座）** 的独立开发规范与治理宪法，覆盖架构边界、四端协同、研发流程、测试门禁、运行部署与交付标准。

---

## 🚨 Top-Priority Universal Directives (最高优先级核心工程铁律 — 所有 IDE / Agent 必读必遵)

> **MANDATORY RULE 0: ZERO TOKEN WASTE, ZERO DUPLICATE CODE & TOOL-FIRST LOW-CODE ARCHITECTURE**
> 任何 AI Agent / IDE 接入本模板与工程时，**第一优先级必须执行以下 13 项不可动摇的底线法则**：
> 1. **严禁 Token 与算力浪费 (Zero Token Waste)**：严禁大模型人肉逐行生成几百行千篇一律的重复 CRUD、样板代码、冗余 DDL 或静态 HTML 骨架；业务开发与需求实现必须采用 **Schema / DSL 极简声明式驱动**（大模型输出压缩至 <500 Tokens），由底层通用引擎自动展开！
> 2. **架构模式极致复用 (Architectural Pattern Mastery)**：必须复用泛型 `BaseMapper<T>`、`LambdaQueryWrapper<T>`、MyBatis-Plus 租户插件与强类型 TS SDK，自动继承多租户隔离、逻辑删除与 8 大基础审计底座字段，严禁手写重复 SQL/CRUD！
> 3. **存量低代码工具优先 (Prioritize Existing Low-Code Tooling)**：在编写任何代码前，必须优先检索并复用模板内已有域能力、脚手架工具（`scripts/codegen-module.mjs`）、Knife4j API Client 生成器与内置 17 大 Skills！
> 4. **缺少工具就造工具 (Build Tools When Missing)**：遇到可抽象的高频研发需求，必须优先沉淀为通用工具与生成脚本，让工具自动化执行，**绝不能重复手写无效无意义代码**！
> 5. **开源成熟方案优先与竞品性价比选型 (Open-Source First & Best ROI Selection)**：若自研工具周期过长、复杂度高或 Token 消耗大，**严禁盲目从零造轮子**；必须优先检索开源成熟工业级方案，进行多维竞品横评并遴选出**最高性价比（ROI）与改造成本最小**的方案进行集成！
> 6. **SpaceX 级全链路测试验证与真实数据库驱动 (SpaceX-Grade Testing & Zero Fake Mock)**：代码变更必须跑通质量门禁（L1单测、L2集成、L3契约、L4 E2E）；100% 由真实数据库支撑，严禁前端伪造 Mock！
> 7. **本体域全息导航与 API 契约第一切入 (Ontology & API-Contract-First)**：任意需求必须先在本体域（实体网、Domain Facade、Knife4j API Docs、权限码）中秒级定位目标域与影响半径，以 API 契约为探针执行穿透闭环；一切需求终局 100% 收敛于真实 API 支撑，严禁无 API 支撑的假界面与硬编码 Mock！
> 8. **全工种四类契约族收敛 (All-Role Contract Families)**：数据同步/ETL、BI 查询、运营编排、运维发布等非编码需求同样必须收敛为可审计契约——API 契约 / 数据契约 / 流程契约 / 预案契约四选一，并过专属质量门禁；严禁一次性搬运脚本与口径打架的野 SQL！
> 9. **全局高阶反向思维与 AI-Driven Harness 全程监督 (High-Order Inverse Thinking & DeepSeek Harness Invariants, 详见 .agents/rules/HIGH-ORDER-INVERSE-THINKING.md)**：严禁以初级外包码农视角就事论事贴补丁；敲代码必须业务对象溯源且由通用引擎展开；写单测必须状态机真实入库覆盖与反假 Mock；修改接口必须契约先验、零破坏性变更与挂载不可变操作审计！
> 10. **0-1 软件工程交付资产与 No Artifact, No Done 铁律 (Spec-First Artifacts, 详见 .agents/rules/SPEC-FIRST-ENGINEERING-ARTIFACTS.md)**：严禁将上线运行期业务数据（订单数据、图纸、运营指标）当成交付资产；严禁口头声明完工；每个工单必须基于 8 要素 Brief 派发，且必须产出 7 类物理工程资产之一（SRS/RTM、OpenAPI 契约、0 报错源码、真实 DB 状态机单测报告、生产回滚 SOP、SRE 稳定性基线、持续运营对账单）！
> 11. **单一真源与全生命周期过程资产防污染铁律 (Single Source of Truth & Anti-Pollution)**：技能唯一真源为 `.agents/skills/<name>/SKILL.md`，严禁在 `docs/skills` 等建立任何重复副本；业务规格按域隔离于 `docs/specs/<domain>/<name>/` 并支持自动归档；过程资产收敛于 `docs/01_management` ~ `09_operations`（含 08_sre 全栈保障与 09_operations 持续运营），执行三存三不存法则，杜绝 Git 仓库被二进制撑爆与认知污染！
> 12. **OpenWiki (LLM-Wiki) 动态百科首屏导航 (OpenWiki First, 详见 wiki/index.md)**：任何外部 AI 助手进场时，优先阅读 `wiki/index.md`，基于机器可读契约与架构词条开展工作，严禁全盘盲扫代码浪费 Token 与引起漂移！
> 13. **全能力 AI Agent 驱动公理 (All Capabilities Must Be AI Agent Driven)**：系统内的一切能力（需求立项、代码实现、API 契约、四端页面交互、接口运营、自动化测试、容器发版、故障自愈）必须具备 **100% 机器可读与 AI Agent 闭环驱动能力**；严禁设计仅供人类手点、无法被 AI Agent 编排或无头探针访问的孤岛能力；前端必须挂载机器可读 Page Schema，测试必须支持变异测试与自主红队渗透演练！

---

## 1. 项目定位与四位一体架构

本项目为 **Yudao Quad-Terminal（四位一体超级基座）**，统一承载：
- **`apps/backend`**：Java Spring Boot 3 / Spring Cloud 微服务后端（支持 JDK 17/8/21 三大分支自由切换，原生 Maven 管理，零侵入无污染）；
- **`apps/admin`**：PC 运营管理后台（Vue 3 + Element Plus + Pinia + TS）；
- **`apps/miniapp`**：微信生态端（Uni-App Vue 3 + Wot/UniUI）；
- **`apps/app`**：原生移动客户端（Expo SDK 52 + React Native 0.76，60/120fps 原生手势与自建 OTA 热更新）；
- **`packages/api-client`**：Knife4j / OpenAPI 直出强类型 TS SDK（四端单一契约真源）；
- **`packages/shared-types`**：通用 DTO / 终端枚举 / `CommonResult<T>`。

---

## 2. CMMI 五大门禁与持续验证

在提交代码或完成任务前，必须执行对应门禁：
- **G1 需求门禁**: 查阅 `docs/02_requirements/software-requirements.md`（遵守 EARS 严谨句式）；
- **G2 架构门禁**: 查阅 `docs/03_design/architecture-design-hld.md`（确立微服务与多端拓扑，遵循 Archify 架构可视化标准）；
- **G3 契约门禁**: `pnpm run typecheck`（前端多端 0 TS 报错）+ 后端 Maven 编译 0 报错；
- **G4 验收门禁**: 查阅 `docs/05_verification/test-summary-report.md`（拟真人走查四态界面与真机快照，严禁假 Mock）；
- **G5 投产门禁**: 查阅 `docs/07_release/system-deployment-sop.md`（制品指纹与回滚 SOP）。

---

## 3. 6 阶苏格拉底反思跃迁与自循环进化

执行任何功能研发或重构时，必须运行或符合 6 阶反思：
- 本地执行反问自检：`pnpm run socratic:inquire`
- CI 自动化校验：`pnpm run socratic:check`
1. **Level 1 (Teleological)**: 抹去此功能业务会死吗？证明其不可替代性；
2. **Level 2 (Ontological)**: 能否收敛为 1 个 Object + Action + 状态机？压缩 80% 样板代码；
3. **Level 3 (Agent-Native)**: 假定 99% 操作者为 AI Agent，是否具备 100% 机器可读与无头闭环驱动；
4. **Level 4 (Extreme Scale)**: 放大 10,000 倍并发与 100,000 家企业多租户，单点脆弱性在哪里；
5. **Level 5 (First Principles)**: 打破陈旧工业套路，以 OpenAPI 直出 SDK 与极简 Monorepo 降维打击；
6. **Level 6 (Autopoiesis)**: 产生不可变资产与静态守卫，系统智力持续累加无回退！
