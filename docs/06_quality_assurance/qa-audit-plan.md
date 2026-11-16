# 《Yudao Quad-Terminal》过程与产品质量保证审计计划 (PPQA Audit Plan, `v1.2.0`)

## 一、审计目标与独立性原则

围绕 CMMI 过程与产品质量保证（PPQA）实践域，通过自动化门禁（`scripts/gate-check.cjs`）、下游兼容契约校验（`scripts/compat-check.cjs`）与门禁反向控制实验（`scripts/harness/negative-controls.mjs`），确保每一版本交付物在架构边界、契约一致性、凭据安全与文档真实性上 100% 可复核。

---

## 二、常规审计检查项与触发频率

| 审计编号 | 审计对象 | 检查标准 | 自动化执行入口 | 触发时机 |
| :--- | :--- | :--- | :--- | :--- |
| **QA-01** | 包管理器与脚本目标 | 仅允许 `pnpm`；`package.json` 声明脚本与文档引用脚本 100% 物理存在 | `pkg-manager` · `doc-commands` · `script-targets` | 每次提交 / CI |
| **QA-02** | 只读子模块与补丁收敛 | `apps/{backend,admin,miniapp}` 指针远端可达，工作区改动恰好等于 `deploy/patches/` | `submodule-patches` · `pnpm compat:check` | 每次提交 / Release |
| **QA-03** | 文档单一归口与知识库同步 | 根目录下零并行文档目录，`docs/wiki/` 41 篇词条与生成器零漂移 | `openwiki` · `menu-standard` | 每次提交 / CI |
| **QA-04** | 导航菜单四字与净室规范 | 蓝图/SQL 中目录与页面菜单 `<= 4` 字，派生工程零母本归档或上游推广残留 | `menu-standard` · `pnpm harness:hatch` | 每次提交 / 派生前 |
| **QA-05** | 守卫咬合力反向验证 | 10 道 blocking 门禁在注入违规样本时必须失败退出（防止门禁退化为空壳） | `pnpm harness:controls` | 发版封板前 |
