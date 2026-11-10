# Requirements Specification: Yudao 四端蓝图底座与 CoolieBase 全能力对标升级：四端 BasePath 同源、无污染沙箱派生、极简蓝图一键交付与 6 阶段真库 Spec E2E 闭环

> **Spec-Kit 标准需求规格说明书 (SRS: Software Requirements Specification)**
> 遵循 IEEE 29148 与 EARS (Easy Approach to Requirements Syntax) 严谨需求工程标准。
> 状态：`PLAN_APPROVED` | 规格类型：`enhancement` | 所属领域：`platform` | 规格标识：`yudao-blueprint-engine-parity`
> 对应项目宪法：`.specify/memory/constitution.md` (Rule 0 ~ 13 项不可动摇工程铁律)

---

## 1. 业务目标与愿景 (Introduction & Business Goal)

对标姊妹底座 cooliebase-all 最新落地的蓝图工程标准，全面消除 yudao-quad-terminal 在『四端 BasePath 同源契约、无污染沙箱秒级派生 (hatch.sh/project-reactor.mjs)、白标后代码生成器包路径动态自适应 (codegen-module.mjs)、<500 Tokens 声明式蓝图一键交付引擎 (blueprint-engine.cjs doctor/deliver --verify-e2e)、母本原生模块纯净度守卫与 6 阶段真实数据库 Spec E2E 验证』上的 6 大审计断层，确保两大底座在 Coolie 工坊自动化生产流水线中具备 100% 对等的能力契约与验收标准。



## 2. 术语定义与领域边界 (Glossary & Domain Scope)

| 术语 / 概念 | 英文标识 | 领域定义与所属模块 |
|---|---|---|
| Yudao 四端蓝图底座与 CoolieBase 全能力对标升级：四端 BasePath 同源、无污染沙箱派生、极简蓝图一键交付与 6 阶段真库 Spec E2E 闭环 | yudao-blueprint-engine-parity | 本规格所交付的真实业务与技术上下文，严格收敛于 `platform` 领域边界 |
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

1. **P0** [作为掌柜 / 交付总指挥] 作为架构师，我要求 blueprint.template.json、apps/admin/.env*.template、apps/miniapp、apps/app/app.template.json 与 generate-gateway-config.mjs 全面接入 BASE_PATH (/<slug>) 变量，使四端入口（/<slug>/2c/、/<slug>/admin/、/<slug>/admin-api & /<slug>/app-api、/<slug>/v3/api-docs 及 Expo 客户端）100% 同源对齐。

2. **P0** [作为掌柜 / 交付总指挥] 作为研发工程师，我要求修复 hatch.sh 与 project-reactor.mjs 的 CLI 参数错位 Bug（兼容 --target/--name 与位置参数），并补齐从母本向 /tmp/<slug>-sandbox 无污染瘦身拷贝 + 共享根 node_modules 软链能力，使无污染沙箱派生在 10 秒内完成且母本 0 dirty。

3. **P0** [作为掌柜 / 交付总指挥] 作为 AI 数字员工，我要求 codegen-module.mjs 动态探测当前工作区的真实后端模块目录 (apps/backend/<slug>-server) 与 Java 根包名 (如 com.<slug>)，彻底根除硬编码 cn.iocoder.yudao 导致白标派生后生成代码即编译失败的致命缺陷，并同时生成 AdminController (/admin-api) 与 AppController (/app-api)。

4. **P0** [作为掌柜 / 交付总指挥] 作为 AI 数字员工，我要求升级 scripts/blueprint-engine.cjs 支持 --preset (5大行业词包)、doctor (27B 口语化 JSON 自愈)、compile-domain 与 deliver --file <domain>.blueprint.json --verify-e2e，从 <500 Tokens 蓝图一键展开 14 份 SDD 资产、Java+Vue3+UniApp 全栈代码（含状态机守卫、乐观锁、跨表 convertActions、主子表 sub_table）与 6 阶段真实数据库 E2E 测试套件。

5. **P1** [作为掌柜 / 交付总指挥] 作为质量守门员，我要求在 gate-check.mjs 中新增母本原生 19 模块纯净度守卫 (base-native-module-boundary) 与蓝图占位符闭合守卫，拦截任何测试残留在母本的临时业务域。

## 5. 关键业务不变量 (Key Business Invariants)

1. **母本零污染与子模块只读** —— gate-check.mjs 强制校验 19 个原生模块边界与 submodule 指针；一切新业务域试炼均通过 hatch.sh 在 /tmp/<slug>-sandbox 独立沙箱内完成
2. **白标包路径与代码生成同源** —— codegen-module.mjs 自动扫描 apps/backend/*-server 与 application.yaml / pom.xml 解析当前真实 packagePrefix，绝不硬编码 cn.iocoder.yudao
3. **四端 BasePath 单一入口** —— 所有端统一通过 :48120/<slug>/{2c,admin,admin-api,app-api,v3/api-docs} 通信，compat-check.mjs 与 gate-check.mjs 双重把关
4. **6 阶段真库 E2E 闭环** —— deliver --verify-e2e 强制运行覆盖 CRUD、多租户隔离、乐观锁 409、状态机 400、跨表转换与软删除的 6 阶段真实入库测试

## 6. 验收标准清单 (Acceptance Criteria)

1. **THE system SHALL** 验证：node scripts/blueprint-engine.cjs check 退出码 0，且 blueprint.template.json 包含 BASE_PATH 变量与 C/B/API/App 四端模板映射
2. **THE system SHALL** 验证：bash scripts/hatch.sh /tmp/oa-yudao-sandbox --title "智能协同办公平台" 退出码 0，自动完成瘦身拷贝、白标置换 (com.oa_yudao_sandbox)、BASE_PATH=/oa-yudao-sandbox 渲染与独立 Git 首提交，且母本 git status 保持 0 新增污染
3. **THE system SHALL** 验证：在白标后的 /tmp/oa-yudao-sandbox 中执行 node scripts/blueprint-engine.cjs doctor --file oa.blueprint.json --write && node scripts/blueprint-engine.cjs deliver --file oa.blueprint.json --verify-e2e 退出码 0，生成的 Java 代码准确落位在 apps/backend/oa-yudao-sandbox-server/src/main/java/com/oa_yudao_sandbox/module/oa/
4. **THE system SHALL** 验证：deliver 自动生成 docs/specs/oa/oa-blueprint/ 下完整 14 份 Spec-Kit SDD 工程资产，且 node scripts/speckit.cjs check --spec oa-blueprint 退出码 0
5. **THE system SHALL** 验证：deliver --verify-e2e 自动生成并跑通 6 阶段真实数据库 E2E 验证套件 (scripts/tests/oa-blueprint-e2e.test.mjs)，覆盖 CRUD、tenant_id 多租户隔离、乐观锁 version 冲突、状态机非法跃迁 400 拦截、跨表 convertActions 与逻辑删除 deleted=1
6. **THE system SHALL** 验证：deploy/gateway/caddy/<slug>.caddy 与 nginx/<slug>.conf 包含 /<slug>/2c/、/<slug>/admin/、/<slug>/admin-api/*、/<slug>/app-api/*、/<slug>/v3/api-docs 五路同源转发规则
7. **THE system SHALL** 验证：pnpm gate:fast && pnpm compat:check && pnpm test:scripts 全部退出码 0

## 7. 约束条件与技术边界 (Constraints & Non-Goals)

### 系统必须满足的架构约束 (The System SHALL Comply With)
* **THE system SHALL COMPLY WITH**: 零 Token 浪费：严禁 AI 手写冗长的 Java DO/Mapper/Service/Controller/VO/Convert 或 Vue3/UniApp 样板代码，必须由 <500 Tokens 的 <domain>.blueprint.json 经 blueprint-engine.cjs deliver --verify-e2e 确定性展开。
* **THE system SHALL COMPLY WITH**: 子模块只读铁律：apps/{backend,admin,miniapp} 为上游子模块，母本静态门禁保持子模块只读；新业务域生成与白标重构仅在派生的独立沙箱工作区 (--target /tmp/<slug>-sandbox) 中落地执行。
* **THE system SHALL COMPLY WITH**: 四端 BasePath 同源：对外统一经单一网关端口 (:48120) 暴露 /<slug>/2c/、/<slug>/admin/、/<slug>/admin-api/*、/<slug>/app-api/* 与 /<slug>/v3/api-docs，严禁前端写死 localhost:48080 绕过网关。
* **THE system SHALL COMPLY WITH**: 真实数据库驱动：6 阶段 E2E 测试必须针对真实嵌入式 PostgreSQL (lite-pg 55432) 或 MySQL 执行，严禁假 Mock。

### 明确不做与负向范围 (Non-Goals)
* 不破坏上游三个 git submodule (apps/backend, apps/admin, apps/miniapp) 在母本中的远端提交指针一致性
* 不改变现有 lite-pg (55432) 与 lite-redis (63799) 的嵌入式运行时端口契约
