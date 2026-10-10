# Requirements Specification: 项目初始基础地基与多租户基线

> **Spec-Kit 标准需求规格说明书 (SRS: Software Requirements Specification)**
> 遵循 IEEE 29148 与 EARS (Easy Approach to Requirements Syntax) 严谨需求工程标准。
> 状态：`PLAN_APPROVED` | 规格类型：`feature` | 所属领域：`core` | 规格标识：`init-baseline`
> 对应项目宪法：`.specify/memory/constitution.md` (Rule 0 ~ 13 项不可动摇工程铁律)

---

## 1. 业务目标与愿景 (Introduction & Business Goal)

完成 Yudao Quad-Terminal Master Base 系统的工程地基搭建与全生命周期规范初始化



## 2. 术语定义与领域边界 (Glossary & Domain Scope)

| 术语 / 概念 | 英文标识 | 领域定义与所属模块 |
|---|---|---|
| 项目初始基础地基与多租户基线 | init-baseline | 本规格所交付的业务与技术上下文，严格收敛于 `core` 领域边界 |
| 行级租户隔离 | Multi-Tenant AST | 基于 Kysely AST 自动在 SQL 注入 `tenant_id` 过滤条件，严禁跨租户越权 |
| 审计底座字段 | Audit Base Columns | 实体必须自动继承 8 大审计字段，严禁业务层手工更新审计元数据 |

## 3. 用户故事与角色矩阵 (User Stories & Personas)

1. **P0** [作为掌柜/交付总监] 搭建多企业租户物理隔离地基与数据库访问层

2. **P0** [作为掌柜/交付总监] 固化统一 OpenAPI 契约与静态 TypeScript 编译守卫

3. **P1** [作为掌柜/交付总监] 配置端到端集成测试套件与自动化门禁

## 4. 关键业务不变量 (Key Business Invariants)

1. **多租户数据强隔离** —— 所有业务查询强制注入 company_id 过滤

## 5. 验收标准清单 (Acceptance Criteria)

1. **THE system SHALL** 验证：npm run check 0 报错
2. **THE system SHALL** 验证：全生命周期 CMMI 01~09 资产齐全在位

## 6. 约束条件与技术边界 (Constraints & Non-Goals)

### 系统必须满足的架构约束 (The System SHALL Comply With)
* **THE system SHALL COMPLY WITH**: 多租户隔离：严禁跨企业租户数据穿透。
* **THE system SHALL COMPLY WITH**: 反假 Mock：必须使用真实数据库 WAL 事务测试。

### 明确不做与负向范围 (Non-Goals)

