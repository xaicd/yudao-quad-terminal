# AGENTS.md — Yudao Quad-Terminal 工程宪法与治理守卫

## 1. 目标与规范
本项目为 **Yudao Quad-Terminal（四位一体超级基座）**，统一承载 Java 微服务后端、Vue 3 PC 运营端、Uni-App 微信小程序端与 Expo 原生移动端。
所有智能体与开发者必须遵循以下工程规则。

## 2. CMMI 五大门禁验证
在提交代码或完成任务前，必须执行对应门禁：
- G1 需求门禁: 查阅 `docs/02_requirements/software-requirements.md` (遵守 EARS 语法)
- G2 架构门禁: 查阅 `docs/03_design/architecture-design-hld.md` (确立微服务与多端拓扑)
- G3 契约门禁: `pnpm run typecheck` (前端多端 0 TS 报错) + 后端 Maven 编译 0 报错
- G4 验收门禁: 查阅 `docs/05_verification/test-summary-report.md` (拟真人走查四态界面与真机快照)
- G5 投产门禁: 查阅 `docs/07_release/system-deployment-sop.md` (制品指纹与回滚 SOP)

## 3. 高阶反向思维守卫
所有开发任务遵循 RFC 2119 正向建设性工程契约：
1. 以业务双核 (Object + Action) 驱动，精准定位实体状态机；
2. 保持减法原则，优先删除冗余死代码；
3. 确保四态交互完备（加载态、内容态、空态、错误态），杜绝死交互。
