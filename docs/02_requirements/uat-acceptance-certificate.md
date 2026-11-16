# 《Yudao Quad-Terminal》客户终验与基线出厂核销单 (UAT & Baseline Acceptance Certificate, `v1.2.0`)

> **商业与工程结项法定准绳**: 依据《软件需求规格说明书 (SRS)》与《需求双向跟踪矩阵 (RTM)》，在真实数据库与目标网关拓扑下全部自动化门禁核验通过（*No Artifact, No Done*）。

---

## 一、出厂必过自动化核验清单

| 核验项 | 标准核验命令 | 达标判据 |
| :--- | :--- | :--- |
| **1. 快速工程门禁与单测** | `pnpm check` (`pnpm test:scripts`) | 17 项快速门禁 0 blocking 失败，99/99 个 `node:test` 用例通过 |
| **2. 下游兼容契约校验** | `pnpm compat:check` | 11 组入口/端口/路径/子模块远端可达性与 19 原生模块检查全部通过 |
| **3. 门禁反向控制自证** | `pnpm harness:controls` | 10/10 道 blocking 门禁在注入违规时准确拦截、还原后恢复绿灯 |
| **4. 净室派生金路径验证** | `pnpm harness:hatch` | 临时目录完整派生客户工程并通过全部 20 项净室、连字符与自跑门禁断言 |
| **5. 零 Docker 真库端到端验收** | `pnpm lite:verify` | Embedded PostgreSQL 18.4 + Redis 启动成功，AES 加密连续 3 次登录 200，弱口令反证被拒 |
| **6. Layer-B 23 道出厂门禁** | `pnpm gates:23:static` / `pnpm gates:23` | 静态 16 项（运行态全量 23 项）零失败 |
