# Requirements Specification: 河北电信B0-B5全流程守卫、6端口Caddy、SWARM与23门禁反向回灌

> **Spec-Kit 标准需求规格说明书 (SRS: Software Requirements Specification)**
> 遵循 IEEE 29148 与 EARS (Easy Approach to Requirements Syntax) 严谨需求工程标准。
> 状态：`PLAN_APPROVED` | 规格类型：`feature` | 所属领域：`platform` | 规格标识：`tele-pulse-b0-b5-backport`
> 对应项目宪法：`.specify/memory/constitution.md` (Rule 0 ~ 13 项不可动摇工程铁律)

---

## 1. 业务目标与愿景 (Introduction & Business Goal)

将河北电信数据集成管控平台 (tele-pulse) 在 Stage B0~B5 全链路交付实战中验证成熟的 10 大通用能力与层B标准 8 动词 deploy/service.sh 入口 100% 参数化回灌至 yudao-quad-terminal 母本，确保后续任何新派生项目在 Day 0 开箱即具备连字符安全标识符、零冲突 6 端口 Caddy 网关、三员分立防篡改审计、4字菜单规范、SWARM 多智能体协作手册与 G1~G23 硬门禁闭环。



## 2. 术语定义与领域边界 (Glossary & Domain Scope)

| 术语 / 概念 | 英文标识 | 领域定义与所属模块 |
|---|---|---|
| 河北电信B0-B5全流程守卫、6端口Caddy、SWARM与23门禁反向回灌 | tele-pulse-b0-b5-backport | 本规格所交付的真实业务与技术上下文，严格收敛于 `platform` 领域边界 |
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

1. **P0** [作为Coolie 层B 交付数字员工 (铁匠 Core-SWE / 门神 FDSE / 百晓生 QA)] 作为架构师，我要求孵化器强制执行导航菜单 <= 4 字硬规范，并在派生时物理清除上游教程 Markdown、.image 推广截图、Home/Index2.vue 等假图表及外包链接，保障新项目净室交付。

2. **P0** [作为Coolie 层B 交付数字员工 (铁匠 Core-SWE / 门神 FDSE / 百晓生 QA)] 作为全栈工程师，我要求母本内置连字符安全标识符转换 (deriveSlugForms)、6 端口 .env.ports 矩阵、声明式 { admin off } 四平面 Caddy 网关、三员分立 Append-Only 审计生成器、SWARM.md 与 G1~G23 通用门禁引擎。

3. **P0** [作为Coolie 层B 交付数字员工 (铁匠 Core-SWE / 门神 FDSE / 百晓生 QA)] 作为平台研发，我要求公开规格解析器迁移至零母港私有依赖的 scripts/lib/spec-path-resolver.cjs，且 audit-23-gates.mjs 通过 COOLIE_BLUEPRINTS_DIR / COOLIE_HOME 解析母本目录而绝不依赖容器绝对路径。

4. **P0** [作为Coolie 层B 交付数字员工 (铁匠 Core-SWE / 门神 FDSE / 百晓生 QA)] 作为运维与交付员工，我要求 deploy/service.sh 与 scripts/service.sh 薄转发完整支持 install|build|start|stop|restart|status|health|logs 八大标准动词，自适应探测宿主机/容器 JDK 17+ 与 Maven 并返回机器可读 JSON 健康探针。

## 5. 关键业务不变量 (Key Business Invariants)

1. **导航菜单 <=4 字与前端净室不变量** —— menu-standard 门禁静态拦截超长菜单，lite-pg.mjs 启动与 domain-prune.mjs 自动执行数据库菜单收敛，project-reactor.mjs 派生时物理清除假图表与推广残留
2. **安全审计只追加防篡改不变量** —— three-role-audit.cjs 生成 PostgreSQL 内核级触发器物理拒绝 UPDATE/DELETE，并由真实嵌入式 PostgreSQL 18.4 单元测试验证
3. **层B 八大动词幂等与端口隔离不变量** —— deploy/service.sh 与 scripts/service.sh 读取工作区 .env.ports 与 PID 文件精准启停本仓进程，绝不触碰邻仓端口，health 动词输出标准 JSON
4. **公开脚本零私有规约机与零容器路径泄漏** —— 公开脚本仅依赖纯 Node 内置实现的 spec-path-resolver.cjs，母本定位通过 COOLIE_BLUEPRINTS_DIR 与 COOLIE_HOME 动态解析

## 6. 验收标准清单 (Acceptance Criteria)

1. **THE system SHALL** 验证：pnpm gate:fast && pnpm compat:check && pnpm patch:status 全部退出码 0
2. **THE system SHALL** 验证：pnpm test:scripts 运行全部 node:test 单元测试（含 hatch-and-menu-standard、tele-pulse-backport、service-entrypoint）退出码 0
3. **THE system SHALL** 验证：pnpm harness:hatch 在临时目录真跑派生并校验 deploy/service.sh、scripts/service.sh、SWARM.md、23 门禁与 4 字菜单规范全部通过
4. **THE system SHALL** 验证：bash deploy/service.sh --help 与 bash scripts/service.sh status 退出码 0，health 返回合法 JSON 结构且零容器绝对路径残留

## 7. 约束条件与技术边界 (Constraints & Non-Goals)

### 系统必须满足的架构约束 (The System SHALL Comply With)
* **THE system SHALL COMPLY WITH**: 子模块只读铁律：apps/backend、apps/admin、apps/miniapp 三个上游子模块严禁越界未声明改动，pnpm patch:status 必须 100% 合法。
* **THE system SHALL COMPLY WITH**: 零容器路径耦合：所有公开脚本与服务入口严禁硬编码容器专属挂载路径，统一采用工作区相对路径与 COOLIE_BLUEPRINTS_DIR / COOLIE_HOME 环境变量回退。
* **THE system SHALL COMPLY WITH**: 向下兼容契约闭合：compat-manifest.json、package.json 与各阶段门禁必须保持 100% 自洽，pnpm compat:check 与 pnpm gate:fast 阻塞项零失败。

### 明确不做与负向范围 (Non-Goals)
* 不直接修改上游子模块仓库远端分支历史，所有派生期前端净室清洗均在目标沙箱目录内执行。
* 不在母本内置特定行业私有业务表，领域 DDL 与状态机统一通过蓝图或代码生成器按需注入。
