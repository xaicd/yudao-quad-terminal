# Technical Architecture & Implementation Plan: {{TITLE}}

> **Spec-Kit 架构与技术实施方案 (ADD: Architecture & Design Document)**
> 上游真源：`spec.md` (或 `requirements.md`)。技术方案严格支撑需求，严禁反向变更业务目标。
> 状态：`PLAN_APPROVED` | 所属领域：`{{DOMAIN}}` | 规格标识：`{{NAME}}`
> 对应项目宪法：`.specify/memory/constitution.md` (Rule 0.2 模式复用 / Rule 0.6 真实测试驱动)

---

## 1. 关键不变量与防御性约束 (Key Invariants & Guards)

{{INVARIANTS_SECTION}}

## 2. 领域架构边界与调用拓扑 (Architecture Topology & Flows)

{{ARCHITECTURE_OVERVIEW}}

### 核心业务时序图 (Archify Mermaid Flow)
```mermaid
sequenceDiagram
    autonumber
    actor User as 客户端/Admin UI
    participant Ctrl as Spring MVC Controller (/admin-api/...)
    participant Service as {{NAME}} Service (@Transactional 状态机守卫)
    participant Repo as MyBatis-Plus BaseMapper<T>
    participant DB as Real Database (MySQL/H2)

    User->>Ctrl: 发起业务请求 (携带 Token 与 TenantContext)
    Ctrl->>Ctrl: @Valid 参数校验 + @PreAuthorize 权限码校验
    Ctrl->>Service: 调用 Service 编排
    Service->>Repo: 执行持久化 (自动注入 tenant_id 与审计列)
    Repo->>DB: 事务提交与写操作落盘
    Service-->>Ctrl: 结构化领域响应
    Ctrl-->>User: CommonResult<T> 统一标准契约包装
```

## 3. 数据模型与持久化契约 (Data Model & Tables)

实体结构严格遵循底座审计底座字段规范 (`BaseDO` / `TenantBaseDO` 自动继承)：
- `id` (主键，`IdTypeEnvironmentPostProcessor` 按数据库方言自适应)
- `creator` / `create_time` (创建人/时间)
- `updater` / `update_time` (更新人/时间)
- `deleted` (逻辑删除标识)
- `tenant_id` (多租户标识，由 MyBatis-Plus 租户插件自动注入与过滤)
- `version` (乐观锁版本号，**仅并发写实体需要，非全表必备**)

### 涉及实体与变更说明
{{ENTITIES_SECTION}}

## 4. API 契约与权限体系 (API Contracts & Security)

{{API_CONTRACTS_SECTION}}

## 5. 状态机流转与边界守卫 (State Machine Transitions)

{{STATES_SECTION}}

## 6. 技术风险评估与缓解策略 (Technical Risks & Mitigations)

{{RISKS_SECTION}}
