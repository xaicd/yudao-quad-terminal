# Quality Checklist & Acceptance Gate: 零 Docker 单机轻量运行档（嵌入式真 PostgreSQL + 嵌入式真 Redis，后端子模块零改动）

> **Spec-Kit 质量验收与门禁自检清单 (Verification Checklist)**
> 所属领域：`platform` | 规格标识：`lite-runtime-profile` | 阶段：`PLAN_APPROVED`
> 对应项目宪法：`.specify/memory/constitution.md` (Gate 1~6 物理门禁全覆盖)

---

## 1. 宪法与架构合规自检 (Constitutional & Architecture Compliance)
- [ ] **Rule 0 第 1 条 零 Token 浪费**：业务模型采用 Schema/DSL 驱动展开，无冗余手写样板代码。
- [ ] **Rule 0 第 2 条 模式极致复用**：已复用 `BaseMapper<T>`、`LambdaQueryWrapper<T>`，自动继承审计底座字段。
- [ ] **Rule 0 第 6 条 真实数据库驱动**：100% 跑通真实 MySQL/H2 状态机测试，0 内存伪造 Mock。
- [ ] **Rule 0 第 7 条 契约第一切入**：以 Knife4j / OpenAPI 契约为探针穿透闭环，对外契约零破坏性变更。
- [ ] **Rule 0 第 2 条 权限与租户隔离**：接口配置权限码，MyBatis-Plus 租户插件全局注入行级隔离。

## 2. 六道门禁交付物齐全性自检 (G0_DAR ~ G5_PRE Gates Health)
- [ ] **选型与研判 (G0_DAR)**：`research.md` (或 `selection.md`) 包含竞品选型与加权评分结论。
- [ ] **需求规格 (G4_DS)**：`spec.md` (或 `requirements.md`) 包含 P0/P1/P2 用户故事，0 占位符。
- [ ] **架构设计 (G1_FDA)**：`plan.md` (或 `design.md`) 包含关键业务不变量与 Archify Mermaid 时序图。
- [ ] **任务拆解 (G2_CoreSWE)**：`tasks.md` 包含波次图、无孤儿任务、文件白名单完备。
- [ ] **实施轨回滚演练 (G5_PRE)**：`runbook.json` 包含 S1~S5 步骤与 R1~R3 回滚演练预案。

## 3. 验收标准逐项核验 (Acceptance Criteria Status)
- [ ] node scripts/lite-up.mjs --dry-run 退出码 0 且打印将执行的确切步骤（PG 端口/数据目录、Redis 端口、SQL 脚本路径、java 命令）
- [ ] 本项目 docker-compose.local.yml 无任何容器运行时，lite 档启动后 curl /admin-api/system/auth/login（用生成的引导凭据）返回 200 且响应体含 accessToken
- [ ] 用上游弱默认凭据 admin/admin123 调用同一登录接口必须失败（非 200），证明确实未沿用种子弱账号
- [ ] lite 档启动前后执行 git -C apps/backend status --porcelain 均为空（子模块零改动硬验证）
- [ ] 引导凭据文件 .commandcode/lite/credentials.env 权限为 600 且 git status 不显示其任何痕迹（未入库）
- [ ] 嵌入式 PG 导入官方 apps/backend/sql/postgresql/ruoyi-vue-pro.sql 后，public 表数为 60、序列数为 48（已实测基线）
- [ ] Redis 由本档自行拉起且为真引擎：redis-cli INFO server 报 redis_version 7.4.1，且 EVAL / SCRIPT LOAD / EVALSHA / XADD / PUBLISH 全部可用（命令数 250）
