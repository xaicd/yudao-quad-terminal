# 《Yudao Quad-Terminal》CMMI 5 统计过程控制与量化质量基线 (SPC Metrics, `v1.2.0`)

## 一、核心工程量化度量指标基线（`v1.2.0`）

| 度量指标（Metric） | 目标控制限（UCL / LCL） | `v1.2.0` 实测基线值 | 采集真源命令 |
| :--- | :--- | :--- | :--- |
| **快速门禁 Blocking 通过率** | `= 100%`（0 Blocking 失败） | **100%**（15/15 Blocking 门禁全绿） | `pnpm check` |
| **自有脚本单元测试通过数** | `100% PASS`（`>= 90` 用例） | **99 / 99 PASS**（耗时 `~5.0s`） | `pnpm test:scripts` |
| **门禁反向控制咬合率** | `= 100%` | **10 / 10 PASS** | `pnpm harness:controls` |
| **派生金路径断言通过率** | `= 100%` | **20 / 20 PASS** | `pnpm harness:hatch` |
| **未登记前后端契约漂移数** | `= 0`（新增孤儿 = 0，动词不符 = 0） | **0 新增孤儿 / 0 动词不符**（92 条只读上游基线已建账） | `pnpm check:drift` |
| **可见导航菜单 `<= 4` 字合规率** | `= 100%` | **100%** | `node scripts/gate-check.cjs --only menu-standard` |
| **后端可裁剪模块覆盖度** | `19/19` 官方模块受控 | **19 模块 / 7,347 Java 文件**（`mini` 档可精简 85.1%） | `pnpm trim:modules --profile mini --dry-run` |
