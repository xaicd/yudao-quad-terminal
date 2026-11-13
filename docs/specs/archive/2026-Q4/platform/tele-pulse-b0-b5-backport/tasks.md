# Tasks Breakdown & WBS: 河北电信B0-B5全流程守卫、6端口Caddy、SWARM与23门禁反向回灌

> **Spec-Kit 任务拆解与工单跟踪矩阵 (WBS & Task Dependency Plan)**
> 上游真源：`plan.md`。必须严格贯彻 **1 Task = 1 Commit** 铁律，Commit 消息必须包含 `[T<ID>]`。
> 状态：`COMPLETED` | 所属领域：`platform` | 规格标识：`tele-pulse-b0-b5-backport`
> 对应项目宪法：`.specify/memory/constitution.md` (Gate 3 任务原子性 / Gate 4 真实入库测试)

---

## 1. 任务依赖波次图 (Task Dependency Waves)

```json
{
  "waves": [
    {
      "id": "wave-1",
      "title": "4字菜单标准与派生净室去品牌",
      "tasks": ["T1"],
      "dependsOn": []
    },
    {
      "id": "wave-2",
      "title": "B0-B5 十大能力、SWARM 与 23 门禁回灌",
      "tasks": ["T2"],
      "dependsOn": ["wave-1"]
    },
    {
      "id": "wave-3",
      "title": "公开规约路径与零容器路径脱耦",
      "tasks": ["T3"],
      "dependsOn": ["wave-2"]
    },
    {
      "id": "wave-4",
      "title": "层B 8动词 service.sh 契约与规格封版归档",
      "tasks": ["T4"],
      "dependsOn": ["wave-3"]
    }
  ]
}
```

## 2. 交互式任务清单 (Interactive Execution Tasks)

- [x] **T1**: 实施 4 字菜单硬规范与派生去品牌净室清洗 (`a6f8f8b`)：新增 `menu-standard.cjs` 守卫、清除上游教程/`.image` 推广残留并补齐 `hatch-and-menu-standard` 单测
  - 归属: `main`
  - 文件白名单: `scripts/lib/menu-standard.cjs, scripts/gate-check.mjs, scripts/project-reactor.mjs, scripts/tests/hatch-and-menu-standard.test.mjs`
  - 验收证据: `a6f8f8b` 已合入主干并通过 `hatch-and-menu-standard.test.mjs` 与 `pnpm harness:hatch`

- [x] **T2**: 回灌 Stage B0~B5 十大通用能力 (`2725f98`)：落地连字符安全标识符、6端口 `.env.ports` 与 `{ admin off }` Caddy、`SWARM.md`、`G1`~`G23` 审计引擎、三员分立审计生成器、多视口 Playwright 助手与 `cwall` 套件
  - 归属: `T1`
  - 文件白名单: `SWARM.md, scripts/audit-23-gates.mjs, scripts/lib/three-role-audit.cjs, scripts/scaffold-three-role-audit.mjs, e2e/helpers/env-and-playwright.mjs, deploy/cwall/cwall.caddy.tpl, scripts/tests/tele-pulse-backport.test.mjs`
  - 验收证据: `2725f98` 已合入主干并通过真实嵌入式 PostgreSQL 18.4 防篡改触发器与三员口令单测

- [x] **T3**: 消除层B规约机私有依赖与容器路径耦合 (`5258602`, `5a10a54`)：迁移公开 `spec-path-resolver.cjs` 并通过 `COOLIE_BLUEPRINTS_DIR`/`COOLIE_HOME` 动态定位母本目录
  - 归属: `T2`
  - 文件白名单: `scripts/lib/spec-path-resolver.cjs, scripts/audit-23-gates.mjs, scripts/specs-health.mjs`
  - 验收证据: `5258602` 与 `5a10a54` 已合入主干，`23/23` 静态门禁与层B防泄漏校验全绿

- [x] **T4**: 补齐层B标准 8 动词 `deploy/service.sh` 与 `scripts/service.sh` 薄转发、孵化可执行位守卫、单元测试及全规格包完结归档
  - 归属: `T3`
  - 文件白名单: `deploy/service.sh, scripts/service.sh, package.json, scripts/project-reactor.mjs, scripts/harness/hatch-smoke.mjs, scripts/tests/service-entrypoint.test.mjs`
  - 验收证据: `[tele-pulse-b0-b5-backport/T4]` 跑通 `service-entrypoint.test.mjs`、`pnpm harness:hatch` 与 `pnpm gate:fast`

## 3. CMMI 双向追溯与 Git 提交核实矩阵 (RTM & Git Trace)

| ID | 归属 | 任务 | 文件白名单 | 状态 |
|---|---|---|---|---|
| T1 | main | 实施 4 字菜单硬规范与派生去品牌净室清洗 (`a6f8f8b`) | scripts/lib/menu-standard.cjs, scripts/gate-check.mjs, scripts/project-reactor.mjs, scripts/tests/hatch-and-menu-standard.test.mjs | 已完成 |
| T2 | T1 | 回灌 Stage B0~B5 十大通用能力 (`2725f98`) | SWARM.md, scripts/audit-23-gates.mjs, scripts/lib/three-role-audit.cjs, scripts/scaffold-three-role-audit.mjs, e2e/helpers/env-and-playwright.mjs, deploy/cwall/cwall.caddy.tpl, scripts/tests/tele-pulse-backport.test.mjs | 已完成 |
| T3 | T2 | 消除层B规约机私有依赖与容器路径耦合 (`5258602`, `5a10a54`) | scripts/lib/spec-path-resolver.cjs, scripts/audit-23-gates.mjs, scripts/specs-health.mjs | 已完成 |
| T4 | T3 | 补齐层B标准 8 动词 `deploy/service.sh` 与 `scripts/service.sh` 薄转发、孵化守卫及全规格归档 | deploy/service.sh, scripts/service.sh, package.json, scripts/project-reactor.mjs, scripts/harness/hatch-smoke.mjs, scripts/tests/service-entrypoint.test.mjs | 已完成 |

## 4. 依赖说明与波次流转 (Dependencies & Progression)

T1 → T2 → T3 → T4

## 5. 阶段状态基线 (Phase Baseline)

* 规划：`PLAN_APPROVED`（由 Spec-Kit 生成）
* 开发：已完成
* 独立测试：已通过
