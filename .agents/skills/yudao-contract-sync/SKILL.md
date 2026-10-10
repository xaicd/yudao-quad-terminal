---
name: yudao-contract-sync
description: Yudao 跨端契约自动转译与 TypeScript 类型防漂移技能。用于将 Spring Boot / Knife4j 后端生成的 OpenAPI 规范自动化编译转译为前端强类型 TS SDK，并在三大终端 (Vue3 Admin / Uni-App 小程序 / Expo App) 间保持零漂移契约守卫。
---

# Yudao 跨端契约同步与类型防漂移规范 (Contract Sync Skill)

> **最高法典契约**：后端接口是全平台的唯一真理源。任何数字员工在新增/修改后端 API 或 DTO 之后，**必须在提交前执行契约同步**。严禁在前端三端手工编造重复的 TypeScript 接口类型，严禁绕过 `packages/api-client` 直接手写未经校验的原始 fetch 调用。

---

## §1 跨端契约流水线拓扑

```
┌─────────────────────────────────┐
│ Spring Boot 后端 (/v3/api-docs)  │ (Knife4j / SpringDoc 自动汇总全部 API & DTO)
└────────────────┬────────────────┘
                 │ curl /tmp/openapi.json
                 ▼
┌─────────────────────────────────┐
│ openapi-typescript 编译器       │ (精准生成强类型 AST 契约)
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ packages/api-client/src/        │
│   ├── generated/index.ts        │ (所有接口的 Request/Response/Path 完整类型)
│   └── client.ts                 │ (统一 Axios / Fetch 客户端适配层)
└────────────────┬────────────────┘
                 │
         ┌───────┼───────┐
         ▼       ▼       ▼
    [Admin]  [MiniApp]  [Expo App] (通过 pnpm workspace:* 强类型引用)
```

---

## §2 契约生成与同步 SOP

### 1. 本地在线实时转译 (后端正在运行时)
在工程根目录下执行：
```bash
pnpm --filter @yudao-quad-terminal/api-client gen
# 或直接运行底层脚本
bash packages/api-client/scripts/gen-api-sdk.sh
```
脚本将自动探活 `http://localhost:48080/v3/api-docs`，拉取最新的 OpenAPI 3.0 JSON 描述并将其直接编译为 TypeScript 强类型。

### 2. 离线/CI 构建时转译
若后端未在本地启动，可直接将最新的 `openapi.json` 放置在 `/tmp/openapi.json` 或 `docs/artifacts/openapi.json`：
```bash
npx --yes openapi-typescript docs/artifacts/openapi.json --output packages/api-client/src/generated/index.ts
```

---

## §3 前端三端消费代码范式

### 1. PC 运营后台 (`apps/admin`)
```typescript
import { paths } from '@yudao-quad-terminal/api-client';
import request from '@/utils/request';

type UserPageReq = paths['/admin-api/system/user/page']['get']['parameters']['query'];
type UserPageResp = paths['/admin-api/system/user/page']['get']['responses']['200']['content']['application/json'];

export const getUserPage = (params: UserPageReq): Promise<UserPageResp> => {
  return request({
    url: '/admin-api/system/user/page',
    method: 'get',
    params
  });
};
```

### 2. Expo 原生 App (`apps/app`)
```typescript
import { paths } from '@yudao-quad-terminal/api-client';
import { apiRequest } from '@/utils/api';

type UserProfileResp = paths['/app-api/member/user/get']['get']['responses']['200']['content']['application/json']['data'];

export async function fetchUserProfile(): Promise<UserProfileResp> {
  return apiRequest<UserProfileResp>('/app-api/member/user/get', { method: 'GET' });
}
```

---

## §4 静态契约守卫 (Zero-Drift Check)

任何 PR 提交或门禁检查必须通过全仓类型检查：
```bash
pnpm -r typecheck
```
如果后端字段变更（例如某个入参字段重命名或改为必填），前端三端引用的地方会在编译阶段立即报出红字错误，**把类型漂移阻断在编译器内，杜绝带病上线**！
