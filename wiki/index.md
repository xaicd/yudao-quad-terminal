# 《Yudao Quad-Terminal Master Base》OpenWiki (LLM 知识大脑)

> **面向 AI 智能体的动态索引**：由业务元数据与 CMMI 00~09 交付管道自动化提取自愈。AI 进场接单优先阅读本索引，Token 消耗直降 80%！

---

## ⚡ 核心公理与架构
- 所属系统: Yudao Quad-Terminal Master Base (`yudao-quad-terminal`)
- 基座规格: `quad-terminal`
- 架构规约: 严格保持 docs/specs/ 扁平开放结构与 CMMI 00~09 门禁。

---

## 🧭 CMMI 00~09 全生命周期阶段导航
- [01 决策分析与立项](stages/01_management.md)
- [02 需求工程与规格](stages/02_requirements.md)
- [03 架构设计与契约](stages/03_design.md)
- [04 编码实现与插件化](stages/04_implementation.md)
- [05 变异测试与全栈验收](stages/05_verification.md)
- [06 质量门禁与过程控制](stages/06_quality_assurance.md)
- [07 容器交付与不可变投产](stages/07_release.md)
- [08 SRE 可靠性与事故复盘](stages/08_sre.md)
- [09 商业运营与对账平账](stages/09_operations.md)

---

## 🤖 AI 数字员工全域 Skills 路由表 (Agent-Driven Skills Map)

数字员工进场接单时，必须按照岗位角色精准启用对应技能，严禁跨域盲调：

| 领域 / 终端 | 对应 Skill 标识 | 主责角色 | 核心作业范围 |
| :--- | :--- | :--- | :--- |
| **基座与选型** | `yudao-cloud-bootstrap` | 墨斗 (FDA) / 铁匠 (CoreSWE) | JDK 8/17/21 适配、19 域微服务功能依赖与一键模块裁剪 |
| **本地运行栈** | `yudao-local-stack` | 兜底渊 (SRE) | 根目录 Docker Compose 秒级拉起 MySQL+Redis，0 外部依赖 |
| **Java 后端** | `yudao-backend-dev` | 铁匠 (CoreSWE) | 6 层架构、MyBatis-Plus Lambda 安全查询、租户隔离与权限注解 |
| **跨端契约** | `yudao-contract-sync` | 铁匠 (CoreSWE) | 从后端 Swagger/Knife4j 直出强类型 TS SDK，消灭跨端漂移 |
| **PC 运营端** | `yudao-admin-vue3` | 门神 (FDSE) | Vue 3 + Element Plus、字典选择器、权限指令、极简两字按钮 |
| **微信小程序** | `yudao-miniapp-dev` | 门神 (FDSE) | Uni-App Vue 3、微信一键静默授权登录、分包规避 2MB 限制 |
| **原生双端** | `yudao-expo-app` | 门神 (FDSE) | Expo SDK 52、硬件安全芯片 SecureStore、OTA 7 处版本一致性 |
| **门禁与质检** | `yudao-cmmi-gatekeeper`| 百晓生 (DS) / 兜底渊 (SRE) | 驱动 workflow-engine 校验 G1~G7 资产，变异测试防假 Mock |
