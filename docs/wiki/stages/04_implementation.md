# 阶段交付百科：04 四端同源编码实现与契约同步 (Quad-Terminal Implementation)

> **所属阶段**：CMMI-04 | **统一 CLI**：`pnpm blueprint:deliver / pnpm gen:module / pnpm gen:api-sdk / pnpm patch:check`  
> **阶段关联 Skills**：`cmmi-asset-authoring`, `yudao-backend-dev`, `yudao-admin-vue3`, `yudao-miniapp-dev`, `yudao-expo-app`, `yudao-contract-sync`, `yudao-local-stack`, `mutation-tester`, `yudao-mcp-server`

---

## 一、阶段职责与工程目标
依托 Spring Boot 3 六层架构、Vue 3 useCrudSchemas、Uni-App 分包与 Expo SDK 52 SecureStore 协同交付四端业务，OpenAPI 契约一键转译强类型 TS SDK。

---

## 二、标准过程资产归宿（统一归口 `docs/`）
- **物理文档路径**：`docs/04_implementation/README.md、deploy/patches/<submodule>/*.patch、packages/{api-client,shared-types}`
- **脚手架与合规检查**：`pnpm cmmi:asset new --phase 04 --type <type>` · `pnpm cmmi:asset:check`

---

## 三、质量门禁与阻断红线
- **放行判据**：typecheck 0 报错、submodule-patches 收敛一致、check:drift 新增孤儿 0 且动词不符 0
- **一票否决项**：**手改只读上游子模块、手写百行重复 CRUD 样板或前端硬编码假数据严禁合入**（*No Artifact, No Done*）
