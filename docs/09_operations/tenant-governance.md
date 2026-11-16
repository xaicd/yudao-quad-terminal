# 《Yudao Quad-Terminal》多租户持续运营、三员分立审计与规格归档 SOP (`v1.2.0`)

> **CMMI 门禁**: G7 持续商业运营门禁  
> **统一执行入口**: `node scripts/cmmi-09-operations.cjs [docs|check|archive|ops]` · `pnpm gen:three-role`  

---

## 一、多企业租户生命周期与配额治理

1. **租户套餐与菜单边界（`system_tenant_package`）**：开通新企业租户前先绑定功能套餐，精确授予该行业所需的模块菜单权限（可见目录/页面菜单均遵循 `<= 4` 字规范）。
2. **数据隔离三重防线**：
   - 请求接入层：统一网关与客户端请求头携带 `tenant-id`，后端校验租户启用状态与有效期；
   - SQL 执行层：MyBatis-Plus `TenantDatabaseInterceptor` 对所有继承 `TenantBaseDO` 的物理表自动拼接 `tenant_id` 条件；
   - 缓存与异步任务层：Redis Key 与异步消息上下文显式携带租户上下文，防止跨租户缓存污染。

---

## 二、政企 IT 三员分立与防篡改审计日常核查

面向政企、运营商与金融合规交付项目，通过 `pnpm gen:three-role -- --prefix <prefix>` 启用硬件级防篡改审计：
- **三员职责互斥**：`sys_admin`（组织/参数配置）、`biz_admin`（日常业务操作）、`audit_admin`（安全审计只读查阅）三类角色严禁兼任；
- **哈希链完整性巡检**：定期校验 `<prefix>_sec_audit_log` 表中相邻记录的 `prev_hash == 上一条 curr_hash`（SHA-256），任何数据库层面的直接 `UPDATE` 或 `DELETE` 均由触发器硬阻断。

---

## 三、完结特性规格防污染归档规程

当 `docs/specs/<domain>/<name>/tasks.md` 中全部原子任务完成且门禁证据齐备后，执行：
```bash
pnpm speckit:archive -- --name <spec-name>
```
将完结规格归档至派生项目的 `docs/specs/archive/<YYYY-Qx>/<domain>/<spec-name>/`（注：母本仓库自身保持 0 历史规格归档的净室基线，由 `pnpm test:scripts` 守护）。
