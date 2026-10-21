# Requirements Specification: 模块裁剪工具化与 Agent 可编排 MCP 端点

> **Spec-Kit 标准需求规格说明书 (SRS: Software Requirements Specification)**
> 遵循 IEEE 29148 与 EARS (Easy Approach to Requirements Syntax) 严谨需求工程标准。
> 状态：`PLAN_APPROVED` | 规格类型：`enhancement` | 所属领域：`platform` | 规格标识：`module-trim-and-mcp`
> 对应项目宪法：`.specify/memory/constitution.md` (Rule 0 ~ 13 项不可动摇工程铁律)

---

## 1. 业务目标与愿景 (Introduction & Business Goal)

把只存在于 .agents/skills/yudao-cloud-bootstrap/SKILL.md 文档代码块里的模块裁剪能力，收敛为确定性脚本 scripts/trim-modules.mjs 与零依赖 MCP 端点，使『保留哪些模块』可由人或 Agent 一条命令预览、落地、校验。



## 2. 术语定义与领域边界 (Glossary & Domain Scope)

| 术语 / 概念 | 英文标识 | 领域定义与所属模块 |
|---|---|---|
| 模块裁剪工具化与 Agent 可编排 MCP 端点 | module-trim-and-mcp | 本规格所交付的业务与技术上下文，严格收敛于 `platform` 领域边界 |
| 行级租户隔离 | TenantLineInnerInterceptor | 基于 MyBatis-Plus 租户插件自动在 SQL 注入 `tenant_id` 过滤条件，严禁跨租户越权 |
| 审计底座字段 | Audit Base Columns | 实体必须自动继承 8 大审计字段，严禁业务层手工更新审计元数据 |

## 3. 用户故事与角色矩阵 (User Stories & Personas)

1. **P0** [作为架构师 / 交付负责人] 作为交付负责人，我要在删除任何文件前看到完整裁剪计划（目录清单 + 文件数 + pom 改动），以便评审后再执行。

2. **P0** [作为架构师 / 交付负责人] 作为 AI Agent，我要通过 MCP 工具拿到机器可读 JSON 结果，以便把裁剪纳入自动化闭环而不必解析中文日志。

3. **P1** [作为架构师 / 交付负责人] 作为架构师，我要在『保留 hrm 却裁剪 bpm』时被工具直接拒绝并说明依赖链，以便不在编译期才发现断裂。

4. **P1** [作为架构师 / 交付负责人] 作为运维，我要拿到与裁剪结果一致的菜单/字典清理 SQL，以便数据库不残留已裁模块的入口。

## 4. 关键业务不变量 (Key Business Invariants)

1. **裁剪元数据单一真源** —— CLI 与 MCP server 都引用 scripts/lib/module-catalog.mjs；MCP 不复制任何模块元数据，验收用 acceptance 第 6 条与 code review 白名单约束
2. **依赖闭包完整** —— --keep 触发 deps 闭包自动扩张，--remove 与闭包冲突时 exit 2；验收用 --keep system 反例覆盖
3. **破坏性操作可回退** —— 备份写主仓 .commandcode/backups/，git 工作区脏时拒绝执行，--recover 提供一键还原；验收用 acceptance 第 4、5 条覆盖
4. **子模块零污染** —— apps/backend 是 git submodule，工具不在其工作树留 .bak；裁剪的『本地消费态』语义在 dry-run/apply 输出与 SKILL §5 显式标注，避免误以为装配已固化

## 5. 验收标准清单 (Acceptance Criteria)

1. **THE system SHALL** 验证：node scripts/trim-modules.mjs --profile mini --dry-run --json 退出码 0 且 stdout 为可被 JSON.parse 解析的对象
2. **THE system SHALL** 验证：node scripts/trim-modules.mjs --keep system --dry-run 退出码 2 且说明缺少 infra
3. **THE system SHALL** 验证：在未裁剪仓库执行 node scripts/trim-modules.mjs --check --profile full 退出码 0；裁剪成 mini 后同一命令退出码 1
4. **THE system SHALL** 验证：node scripts/trim-modules.mjs --recover --yes 退出码 0 并输出模块目录数与 Java 文件数；非 TTY 下缺 --yes 时退出码 2
5. **THE system SHALL** 验证：执行 --apply 后 apps/backend 内不存在任何 *.bak（备份位于主仓 .commandcode/backups/）
6. **THE system SHALL** 验证：node scripts/sync-openwiki.mjs --check 退出码 0（wiki 与新技能注册一致）
7. **THE system SHALL** 验证：cmd mcp list 输出包含 yudao-quad-terminal

## 6. 约束条件与技术边界 (Constraints & Non-Goals)

### 系统必须满足的架构约束 (The System SHALL Comply With)
* **THE system SHALL COMPLY WITH**: 单一真源：CLI 与 MCP 必须共用同一个模块元数据真源，禁止第二套模块清单实现。
* **THE system SHALL COMPLY WITH**: 零新增运行时依赖：MCP server 手写最小 stdio JSON-RPC，不引入 npm 包；风格对齐既有 scripts/*.cjs。
* **THE system SHALL COMPLY WITH**: 破坏性默认关闭：默认 dry-run，--apply 需显式给出；依赖闭包必须校验。

### 明确不做与负向范围 (Non-Goals)
* 不实现 speckit archive（未实现，另立 bugfix spec）。
* 不新增对 SQLite 的支持。
* 不做 wiki 全量技能对账（本轮只把悬空的 mcp-builder 改名为 yudao-mcp-server）。
* 不自动连库执行清理 SQL：--sql 只输出语句，连库与执行由使用方自行负责。
