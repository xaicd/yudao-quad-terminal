# 《Yudao Quad-Terminal》全栈测试与质量门禁验收报告 (Test Summary Report, `v1.2.0`)

> **CMMI 门禁**: G4 验证与确认门禁  
> **测试基线版本**: `v1.2.0` (`2026-11-16`)  

---

## 一、`v1.2.0` 自动化测试与门禁实测结果汇总

| 验证套件 | 执行命令 | 实测通过规模 | 结果结论 |
| :--- | :--- | :--- | :--- |
| **自有工程脚本单元测试** | `pnpm test:scripts` | **99 / 99 用例 PASS**（0 失败，含真实 Embedded PG 18.4 菜单清洗验证） | ✅ 通过 |
| **快速工程门禁 (`fast`)** | `pnpm check` | **16 / 17 项 PASS**（15 项 blocking 0 失败 + `contract` 基线 PASS；净室 `socratic` 为预期 `advisory`） | ✅ 通过 |
| **下游兼容契约自检** | `pnpm compat:check` | **11 / 11 组检查 PASS**（37 脚本入口、端口契约、3 子模块远端可达、19 模块边界受控） | ✅ 通过 |
| **门禁反向控制实验** | `pnpm harness:controls` | **10 / 10 项控制 PASS**（注入违规 100% 触发非零退出并字节级无损复原） | ✅ 通过 |
| **净室派生金路径冒烟** | `pnpm harness:hatch` | **20 / 20 项断言 PASS**（零凭据/母本审计泄漏、连字符安全类名/表名、自跑门禁通过） | ✅ 通过 |
| **Layer-B 23 门禁静态审计** | `pnpm gates:23:static` | **PASS = 16 / SKIP = 7（运行态探针） / FAIL = 0** | ✅ 通过 |
| **跨端 TypeScript 类型检查** | `pnpm typecheck` | `apps/app`、`packages/api-client`、`packages/shared-types` **0 编译报错** | ✅ 通过 |

---

## 二、反假 Mock 与契约防漂移核验结论

1. **零新增契约漂移**：`pnpm check:drift` 实测后端 3,186 条端点、管理端 2,973 条路由封装；只读上游固有的 92 条未暴露孤儿端点已建立 `scripts/lib/upstream-contract-baseline.json` 审计台账，工程新增孤儿 `0`、HTTP 动词不匹配 `0`。
2. **四态界面与净室保障**：派生孵化器自动清理上游示例静态假图表并注入确定性登录 `data-testid`（`login-username` / `login-password` / `login-submit`），确保端到端自动化测试稳定可靠。
