# 《Yudao Quad-Terminal》CMMI 5 缺陷因果分析与防复发机制 (CAR Prevention, `v1.2.0`)

## 一、典型系统性缺陷因果分析与固化防线（5-Whys -> CAPA）

| CAR 编号 | 问题类别 | 根本原因（Root Cause） | 组织级永久预防措施（CAPA） | 编译器 / 门禁防线 |
| :--- | :--- | :--- | :--- | :--- |
| **CAR-01** | 子模块协作断裂 | 在只读子模块内产生本地提交并钉进主仓 gitlink，外部协作者因远端无此 SHA 而克隆失败 | 建立 `deploy/patches/<submodule>/*.patch` 声明式补丁机制，子模块指针只许指向远端真实分支提交 | `compat-check.mjs` + `submodule-patches.mjs` |
| **CAR-02** | 文档与代码失真 | 文档手工书写命令、脚本路径、测试数量与上游分支名，随代码演进逐渐漂移失效 | 新增 `doc-commands`、`script-targets`、`jdk-variants` 与 `openwiki` 自动对账门禁，文档声明即断言 | `scripts/gate-check.mjs` (`tier=fast`) |
| **CAR-03** | 门禁空壳假阳性 | 门禁脚本因宽泛正则或早退逻辑导致「配置存在但违规时不报错」 | 建立 `negative-controls.mjs`，对 10 道核心 blocking 门禁做受控违规注入与字节级复原实验 | `pnpm harness:controls` |
| **CAR-04** | 多头文档目录污染 | 历史演进在仓库根目录遗留多个并行文档目录与软链，造成跨仓规范不一与检索混乱 | 全部过程文档、规格、OpenWiki、Release 说明与审计报告统一归口 `docs/`，根目录禁止并行文档入口 | `menu-standard` 顶层目录守卫 |
