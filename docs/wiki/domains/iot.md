# 业务域百科：`iot` · 物联网设备平台

> **后端模块目录**：`apps/backend/yudao-module-iot` | **Maven Server 构件**：`yudao-module-iot-server`  
> **实测 Java 源码规模**：**475** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
物联网产品物模型（属性/事件/服务）、设备上下线状态、MQTT/HTTP 插件接入、场景联动规则与 OTA 固件升级。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/iot/**`
- **PC 管理端视图目录**：`apps/admin/src/views/iot`
- **代表性物理数据表**：`iot_product, iot_device, iot_thing_model, iot_device_group, iot_ota_firmware, iot_scene_rule`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 iot 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query iot

# 预览仅保留 iot 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,iot --dry-run
```
