# Yudao-Quad-Terminal 全域接口与实体浓缩卡片 (API & Entity Digest)

> **面向 AI Agent 的超轻量上下文指南**：无需逐一阅读大型 Java 或 Vue 源文件，直接参考本摘要或使用 `node scripts/agent-context-compressor.mjs --query <keyword>` 获取精确切片。

## 1. 系统概览 (System Overview)

- **后端微服务/单体控制器总数**: 3 个
- **已暴露 REST 接口总数**: 11 个
- **实体物理表总数**: 6 张
- **前端 API 包装总数**: 2 个模块

## 2. 后端 RESTful 控制器接口索引

| 控制器 | 基础路径 | 业务名称 | 接口数 | 对应文件 |
|---|---|---|---|---|
| `UserController` | `/admin-api/member/user` | 管理后台 - 会员用户 | 5 | [apps/backend/yudao-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/UserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/UserController.java) |
| `OrderController` | `/admin-api/trade/order` | 管理后台 - 商城订单 | 5 | [apps/backend/yudao-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/OrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/OrderController.java) |
| `HealthController` | `/admin-api/infra` | - | 1 | [apps/backend/yudao-server/src/main/java/cn/iocoder/yudao/server/controller/HealthController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-server/src/main/java/cn/iocoder/yudao/server/controller/HealthController.java) |

## 3. 详细接口清单

### 📦 `UserController` (管理后台 - 会员用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/admin-api/member/user/create` | 创建会员用户 | `CommonResult<Long>` | `@Validated @RequestBody UserSaveReqVO createReqVO` |
| `PUT` | `/admin-api/member/user/update` | 更新会员用户 | `CommonResult<Boolean>` | `@Validated @RequestBody UserSaveReqVO updateReqVO` |
| `DELETE` | `/admin-api/member/user/delete` | 删除会员用户 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/admin-api/member/user/get` | 获得会员用户 | `CommonResult<UserRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/admin-api/member/user/page` | 获得会员用户分页 | `CommonResult<PageResult<UserRespVO>>` | `@Validated UserPageReqVO pageReqVO` |

### 📦 `OrderController` (管理后台 - 商城订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/admin-api/trade/order/create` | 创建商城订单 | `CommonResult<Long>` | `@Validated @RequestBody OrderSaveReqVO createReqVO` |
| `PUT` | `/admin-api/trade/order/update` | 更新商城订单 | `CommonResult<Boolean>` | `@Validated @RequestBody OrderSaveReqVO updateReqVO` |
| `DELETE` | `/admin-api/trade/order/delete` | 删除商城订单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/admin-api/trade/order/get` | 获得商城订单 | `CommonResult<OrderRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/admin-api/trade/order/page` | 获得商城订单分页 | `CommonResult<PageResult<OrderRespVO>>` | `@Validated OrderPageReqVO pageReqVO` |

### 📦 `HealthController` (/admin-api/infra)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/admin-api/infra/health` | - | `Map<String, Object>` | `-` |

## 4. 数据库物理表清单

### 🗄️ 物理表: `system_tenant`

| 字段列名 | 物理类型 | 注释说明 |
|---|---|---|
| `id` | `bigint` | 租户编号 |
| `name` | `varchar(64)` | 租户名 |
| `contact_name` | `varchar(64)` | 联系人 |
| `contact_mobile` | `varchar` | - |

### 🗄️ 物理表: `system_users`

| 字段列名 | 物理类型 | 注释说明 |
|---|---|---|
| `id` | `bigint` | 用户ID |
| `username` | `varchar(30)` | 用户账号 |
| `password` | `varchar(100)` | 密码 |
| `nickname` | `varchar(30)` | 用户昵称 |
| `remark` | `varchar` | - |

### 🗄️ 物理表: `system_role`

| 字段列名 | 物理类型 | 注释说明 |
|---|---|---|
| `id` | `bigint` | 角色ID |
| `name` | `varchar(30)` | 角色名称 |
| `code` | `varchar(100)` | 角色权限字符串 |
| `sort` | `int` | 显示顺序 |
| `data_scope` | `tinyint` | 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限 5：仅本人数据权限） |
| `data_scope_dept_ids` | `varchar(500)` | 数据范围(指定部门id) |
| `status` | `tinyint` | 角色状态（0正常 1停用） |
| `type` | `tinyint` | 角色类型(1内置 2自定义) |
| `remark` | `varchar` | - |

### 🗄️ 物理表: `system_menu`

| 字段列名 | 物理类型 | 注释说明 |
|---|---|---|
| `id` | `bigint` | 菜单ID |
| `name` | `varchar(50)` | 菜单名称 |
| `permission` | `varchar(100)` | 权限标识 |
| `type` | `tinyint` | 菜单类型（1目录 2菜单 3按钮） |
| `sort` | `int` | 显示顺序 |
| `parent_id` | `bigint` | 父菜单ID |
| `path` | `varchar` | - |

### 🗄️ 物理表: `member_user`

| 字段列名 | 物理类型 | 注释说明 |
|---|---|---|
| `id` | `BIGINT` | 编号 |
| `nickname` | `VARCHAR(255)` | 用户昵称 |
| `mobile` | `VARCHAR(255)` | 手机号 |
| `avatar` | `VARCHAR` | - |

### 🗄️ 物理表: `trade_order`

| 字段列名 | 物理类型 | 注释说明 |
|---|---|---|
| `id` | `BIGINT` | 编号 |
| `order_no` | `VARCHAR(255)` | 订单流水号 |
| `user_id` | `BIGINT` | 买家用户编号 |
| `total_price` | `INT` | 实付总金额(分) |
| `status` | `INT` | 订单状态 |
| `pay_time` | `DATETIME` | 支付时间 |
| `remark` | `VARCHAR` | - |

