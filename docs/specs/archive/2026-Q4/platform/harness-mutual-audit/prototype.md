# 原型与交互规范: 跨底座 Harness 交付闭环十维双向互审与自画像基线沉淀

> **Spec-Kit UI/UX 文本线框原型与交互状态契约 (UI Prototypes & Interaction States)**
> 上游真源：`brief.json`。线框用纯文本表达，100% 具备机器可读性与 Agent 操作确定性。
> 状态：`PLAN_APPROVED` | 所属领域：`platform` | 规格标识：`harness-mutual-audit`

---

## 1. 主要页面线框视图 (Screen Wireframes)

### Harness 自画像与互审面板 (docs/specs/archive/*/platform/harness-mutual-audit/)

```
项目身份 · 五大入口 · L0~L7 验证矩阵 · 五条红灯线 · 家族互认结论
```

## 2. 交互要点与防误触守卫 (Interaction Guards)

* 通过 node scripts/specs-health.mjs --spec harness-mutual-audit 校验资产健康度

## 3. 状态与空态处理 (States & Degraded UI)

- 勘察完成：self-portrait.md 已记录完整事实路径。
- 资产齐备：16 份 Spec-Kit 标准文档已生成并核销。
- 已归档：移入 docs/specs/archive/ 供后续架构演进查阅。
