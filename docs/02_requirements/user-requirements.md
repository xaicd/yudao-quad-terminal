# 《Yudao Quad-Terminal》用户需求说明书 (URS - User Requirements Specification, `v1.2.0`)

## 一、四大终端目标用户画像与核心诉求

| 终端平面 | 典型角色 | 物理工程承载 | 核心业务诉求与体验标准 |
| :--- | :--- | :--- | :--- |
| **领导驾驶舱 (`/cockpit/`)** | 企业高管 / 运营总监 | `apps/admin` (全屏大屏路由) 或独立 `apps/cockpit` | 核心经营指标实时汇总、无侧边栏沉浸式大屏、100% 真实 API 驱动零静态假图表 |
| **B 端管理中台 (`/admin/`)** | 系统管理员 / 业务运营 / 财务审计 | `apps/admin` (Vue 3 + Element Plus) | `<= 4` 字精炼侧边栏导航、多租户与部门数据隔离、细粒度按钮鉴权（`v-hasPermi`）、高密度分页查询与导出 |
| **微信生态端 (`/2c/`)** | C 端消费者 / 渠道会员 | `apps/miniapp` (Uni-App Vue 3) | 微信一键静默授权登录、商品浏览下单与微信支付闭环、`375dp`/`320dp` 小屏零横向溢出与底栏防遮挡 |
| **原生双端 App** | 外勤作业员 / 高频核心会员 | `apps/app` (Expo SDK 52 / RN 0.76) | 60/120fps 原生流畅手势、硬件级 `SecureStore` 令牌存储、生物识别鉴权与自建 OTA 热更新 |

## 二、下游工程消费方需求

1. **新项目孵化团队**：10 秒内通过单条命令派生出独立包名、独立端口、零上游推广外链的纯净四端商业骨架（`pnpm project:hatch`）。
2. **AI 数字员工与研发团队**：进场 0.5 秒读取 PMO 待办大盘（`pnpm pmo`）与 `docs/wiki/index.md`，通过 `<500 Tokens` 声明式蓝图完成全栈模块生成与零 Docker 真库验证（`pnpm blueprint:deliver -- --verify-e2e`）。
