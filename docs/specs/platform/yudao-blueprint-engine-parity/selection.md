# Research & Decision Analysis (DAR): Yudao 四端蓝图底座与 CoolieBase 全能力对标升级：四端 BasePath 同源、无污染沙箱派生、极简蓝图一键交付与 6 阶段真库 Spec E2E 闭环

> **Spec-Kit 概念研判与加权决策分析 (Idea Assessment & Tech Selection)**
> 所属领域：`platform` | 规格标识：`yudao-blueprint-engine-parity`
> 对应项目宪法：`.specify/memory/constitution.md` (Rule 0.3 开源成熟方案优先与竞品最高性价比选型)

---

## 1. 业务痛点与技术诉求阐述 (Background & Objectives)
对标姊妹底座 cooliebase-all 最新落地的蓝图工程标准，全面消除 yudao-quad-terminal 在『四端 BasePath 同源契约、无污染沙箱秒级派生 (hatch.sh/project-reactor.mjs)、白标后代码生成器包路径动态自适应 (codegen-module.mjs)、<500 Tokens 声明式蓝图一键交付引擎 (blueprint-engine.cjs doctor/deliver --verify-e2e)、母本原生模块纯净度守卫与 6 阶段真实数据库 Spec E2E 验证』上的 6 大审计断层，确保两大底座在 Coolie 工坊自动化生产流水线中具备 100% 对等的能力契约与验收标准。

## 2. 候选方案拟定 (Candidate Solutions >= 2 + 1 阴性对照)
| 方案编号 | 方案名称 | 技术路线 | 开源协议 | 维护成本与风险 |
|---|---|---|---|---|
| A | 领域复用/微内核展开 | 复用已有 BaseMapper 与 Facade 底座 | 内部专有 | 改造成本最低，零学习曲线 |
| B | 开源成熟工业级方案集成 | 引入社区经过验证的标准库进行二次封装 | MIT/Apache 2.0 | 生态成熟，但需增加包体积 |
| C | 阴性对照 (从零人肉手写) | 逐行手写 CRUD 与裸 SQL | 内部专有 | 极高 Token 浪费与违背 Rule 0，不予推荐 |

## 3. 决策分析与加权打分 (DAR Decision Matrix)
| 准则编号 | 评估维度 | 权重 | 方案 A | 方案 B | 方案 C (对照) |
|---|---|---|---|---|---|
| C1 | 业务契合度与 ROI | 30% | 5 (1.5) | 3 (0.9) | 1 (0.3) |
| C2 | 零外部重型依赖交付 | 25% | 5 (1.25) | 2 (0.5) | 3 (0.75) |
| C3 | 性能与并发抗损性 | 20% | 5 (1.0) | 4 (0.8) | 5 (1.0) |
| C4 | 架构演进与单体拆分 | 15% | 5 (0.75) | 3 (0.45) | 1 (0.15) |
| C5 | 开源许可与社区生态 | 10% | 5 (0.5) | 5 (0.5) | 2 (0.2) |
| **合计** | **综合加权得分** | **100%** | **5.00** | **3.15** | **2.40** |

## 4. 结论与立项裁决 (Decision Conclusion)
结论：自有 MIT 脚本演进，零第三方新增依赖，合规无风险。方案 A 在开发 ROI、架构一致性与无外部额外运行时依赖方面表现最优，获准进入规格立项阶段。
