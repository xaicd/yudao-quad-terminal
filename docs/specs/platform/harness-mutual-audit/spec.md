# Spec — Harness 交付闭环全面互审 (以武会友, 取长补短)

> **类型**: audit | **状态**: DRAFT (待本项目 AI 数字员工执行)
> **立场**: 双向互审 — 既对照 wenlv-next harness 基线找差距 (**取长**), 也提炼本项目独有强项反哺通用版 (**会友**)。**严禁预设结论、严禁只找差距不看强项。**
> **红线**: 本 spec 只产出审计报告与建议, 不改任何代码/脚本/宪法文件。

---

## 1. 背景与动机

wenlv-next (乡村振兴平台) 近期沉淀了一套 harness 标准交付流程 (Spec-Kit 四维门禁 + 五层×三元组固化矩阵 + 交付闭环守卫脚本 + HARNESS.md 首屏)。经三方会商, 决定先立"全面视角审计 spec"到各项目, 由各项目自己的 AI 自审产出事实, 再决定吃哪几层——**不直接移植**。

## 2. 对照基线 (wenlv-next 出的"武艺", 摘要)

1. **四维一体交付硬门禁** ("无触达不立项, 无内生自治不交付"):
   - 使用者触达闭环 (入口可发现→交互可触发→协同可履约→结果有反馈)
   - 自动化资产内生 (0-1 全生命周期 operate 脚本, 禁脱离交付物/手点测/假 mock)
   - 日常巡检定时挂载 (登记调度中心, 禁写完即丢)
   - 双层测试 (领域不变式单测 100% + 真实终端 E2E)
2. **T1-T8 通用任务骨架** (Schema→服务→UI→协同→运营脚本→cron→E2E→双环境交付)
3. **五层×三元组固化矩阵** (开发/测试/运行/交付/协同/进化 × 脚本×skill×MCP + 硬门禁)
4. **Harness 工具箱**: `harness:scaffold / verify / closure / fix-cron` (孤儿脚本检测→自动登记 cron→串联验证)
5. **HARNESS.md 首屏**: 8KB 门禁, 三 CLI 共享, "路径+1 行能力"不抄 skill 全文
6. **(2026-10-23 WEN-500 T1-T7 增补)**: `gate.sh` 全局门禁总闸 (commit/delivery/full 三档单一清单, pre-commit 与交付链均委派, 消双份漂移); `pointer-cycle-guard` 规范文档 @导入环检测 (防 memory 递归内联放大上下文); `pnpm install` prepare 自动装门禁钩子 (堵"新 clone 门禁假绿"); CLAUDE.md `@HARNESS.md` 内联总纲伞 + 单向不回跳约定

## 3. 审计维度 (10 维全面视角, 逐维产出: ✅已备 / ⚠️部分 / ❌缺失 / 🎁强项)

| # | 维度 | 审什么 |
|---|---|---|
| 1 | 首屏入口 | AI 进场 30 秒能否看清"交付了什么/怎么干活"? HARNESS.md/AGENTS.md/llms.txt 体积与门禁? |
| 2 | 宪法与门禁 | 铁律数量、可执行性 (有无 pre-commit/CI 硬拦截 vs 仅文档宣示) |
| 3 | 交付闭环四维 | 任取最近 3 个已交付 feature, 逐维检验 (使用者触达/资产内生/巡检挂载/双层测试) |
| 4 | 五层×三元组 | 开发/测试/运行/交付/协同 各层有无"固化脚本+skill+硬门禁"组合 |
| 5 | 调度自治 | 运营/巡检脚本是否登记调度 (cron/CI/调度平台), 有无孤儿脚本 |
| 6 | 双层测试 | 单测是否真 DB 驱动、E2E 是否真实终端; 有无"仅单测假绿"案例 |
| 7 | 部署链 | dev/test/prod 分离、锁互斥、post-deploy 值断言、回滚演练 |
| 8 | 协同机制 | 多 agent 并发有无锁/owner 概念 |
| 9 | 知识进化 | wiki/OpenWiki/本体是否随代码同步 (有无同步门禁) |
| 10 | 下游消费契约 | compat-manifest 之类机器可读契约的覆盖度与强校验 |

## 4. 本项目强项反哺候选 (预填观察, 待自审确认/补充 — 🎁)

- **compat-manifest.json + `pnpm compat:check`**: 机器可读下游消费契约 + 强校验, wenlv 无此物, **通用版应吸收**
- **llms.txt 高密度能力契约**: LLM 首选入口的独立形态, 值得评估是否通用化
- **零 Docker 嵌入式起底** (`pnpm lite:up`, 嵌入式真 PG+Redis): 环境 Onboarding 体验强
- **HARNESS.md 已按 wenlv 模式派生** (5.4KB): 说明本项目对首屏模式已有认同, 可反向贡献底座派生场景的实战反馈

## 5. 缺口假设 (待验证, 非结论)

- 四维门禁未成文 → feature 交付可能无"使用者触达闭环/资产内生"硬验收
- 无 delivery-closure-guard 类守卫 → operate 脚本可能存在孤儿 (未挂调度)
- T1-T8 骨架未用于 tasks.md → 交付物完整性靠自觉

## 6. 审计方法 (每维都要"机器可查 + 抽样走查"双证据)

> **第 0 步**: 先读本目录 `self-portrait.md` (2026-10-23 已产出的本国事实底座), 审计从校验它是否仍与现状一致开始 (画像过期先修正画像再打分)。

```bash
# 机器可查示例 (按本项目实际调整):
ls .agents/skills | wc -l && wc -c AGENTS.md HARNESS.md llms.txt
grep -rn "cron\|schedule" scripts/ --include="*.json" -l   # 调度登记面
git log --oneline -20                                       # 最近交付抽样池
```

抽样走查: 从最近 20 commit 挑 3 个 feature 型交付, 逐维打分并附证据 (文件路径/命令输出)。

## 7. 产出与 DoD

1. `audit-report.md` (本目录): 10 维 × 4 态结论 + 证据
2. `adopt-plan.md`: 分层采纳建议 (哪些层吃、哪些不吃、为什么 — 参考"原则层/契约层/引擎层"三层分离)
3. `contribute-list.md`: 反哺通用版的强项清单 (含论证)
4. 三份产出汇总回 wenlv-next 侧, 合入 `harness-delivery-closure-universal V1` 的编写输入

**DoD**: 10 维全有证据结论; 采纳建议经项目负责人拍板; 反哺清单 ≥2 条有论证。
