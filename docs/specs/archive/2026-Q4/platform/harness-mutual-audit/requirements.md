# Requirements Specification: 跨底座 Harness 交付闭环十维双向互审与自画像基线沉淀

> **Spec-Kit 标准需求规格说明书 (SRS: Software Requirements Specification)**
> 遵循 IEEE 29148 与 EARS (Easy Approach to Requirements Syntax) 严谨需求工程标准。
> 状态：`PLAN_APPROVED` | 规格类型：`enhancement` | 所属领域：`platform` | 规格标识：`harness-mutual-audit`
> 对应项目宪法：`.specify/memory/constitution.md` (Rule 0 ~ 13 项不可动摇工程铁律)

---

## 1. 业务目标与愿景 (Introduction & Business Goal)

围绕治理入口、验证层级、子模块边界、凭据安全、反向控制与派生金路径等十个维度完成 yudao-quad-terminal 自画像勘察与跨家族双向互审，形成可复核的工程事实底座并为后续双支柱对齐提供依据。



## 2. 术语定义与领域边界 (Glossary & Domain Scope)

| 术语 / 概念 | 英文标识 | 领域定义与所属模块 |
|---|---|---|
| 跨底座 Harness 交付闭环十维双向互审与自画像基线沉淀 | harness-mutual-audit | 本规格所交付的真实业务与技术上下文，严格收敛于 `platform` 领域边界 |
| 领域门面契约 | Domain Facade | 业务模块对外暴露的标准契约接口，跨域通信单向调用，内部实现自闭环 |
| 数据隔离策略 | Data Isolation Policy | 依据客户交付形态按需选择（单租户物理独立库 / 多租户行级租户隔离可选特性） |

## 3. 业务需求立项与多端建设交付范围 (Business Intake & Multi-Terminal Scope)

### 3.1 真实业务立项背景
- **交付目标**: 面向客户真实业务场景，消灭手工低效流程与断点。
- **服务对象**: 涵盖 B 端业务操作员、管理员及终端客户角色，杜绝无主需求。

### 3.2 多端建设覆盖边界
- **B端管理中台**: 负责业务运营配置、流程审核、数据对账与大盘监控。
- **C端用户门户/移动端**: 负责业务直接录入、消费结算与进度查询（按需）。
- **多端协议对齐**: 多端统一遵循 OpenAPI/REST 契约规范，共享领域状态机。

## 4. 用户故事与角色矩阵 (User Stories & Personas)

1. **P0** [作为平台治理架构师 (墨斗 FDA)] 作为平台架构师，我要求输出只陈述客观代码路径与实测数据的 self-portrait.md 自画像，覆盖入口文档、L0~L7 验证层、只读子模块补丁与 19 技能体系。

2. **P0** [作为平台治理架构师 (墨斗 FDA)] 作为跨仓治理负责人，我要求对照姊妹仓基线完成『取长』与『会友』双向互审规格，识别门禁总闸、生命周期入口与规格归档闭环等可吸收项。

3. **P1** [作为平台治理架构师 (墨斗 FDA)] 作为 PMO 管理员，我要求将该历史互审专题补齐完整 16 件套 Spec-Kit 过程资产并归档至 docs/specs/archive/，消除半成品文档噪音。

## 5. 关键业务不变量 (Key Business Invariants)

1. **门禁必咬人反向控制不变量** —— 通过 scripts/harness/negative-controls.mjs 对每道 blocking 门禁执行注入违规变红与字节级还原转绿验证
2. **规格包 16 资产齐备不变量** —— 由 scripts/specs-health.mjs 统一扫描活跃区与 archive 归档区，确保每份规格具备完整 16 件套且零占位符

## 6. 验收标准清单 (Acceptance Criteria)

1. **THE system SHALL** 验证：pnpm specs:health 校验 harness-mutual-audit 16 份资产齐全且零占位符残留
2. **THE system SHALL** 验证：pnpm compat:check && pnpm gate:fast 全部阻塞门禁退出码 0

## 7. 约束条件与技术边界 (Constraints & Non-Goals)

### 系统必须满足的架构约束 (The System SHALL Comply With)
* **THE system SHALL COMPLY WITH**: 事实优先：所有审计结论必须绑定仓库内真实存在的脚本路径与门禁命令，严禁主观臆断。
* **THE system SHALL COMPLY WITH**: 零破坏归档：保留原始 self-portrait.md 勘察记录，同时满足 specs-health 16 份标准资产校验。

### 明确不做与负向范围 (Non-Goals)
* 不在本互审档案中直接改动上游业务子模块源码。
* 不跨仓复制异构技术栈专属的 ORM 或前端框架实现。
