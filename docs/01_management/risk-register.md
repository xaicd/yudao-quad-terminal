# 《Yudao Quad-Terminal Master Base》项目技术与交付风险台账 (Risk Register)

| 风险编号 | 风险描述 | 影响等级 | 缓解措施 (Mitigation) | 责任人 | 状态 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| RSK-001 | 多租户越权穿透 | 高 | AST 层强制注入 tenant_id 隔离过滤 | 墨斗 (FDA) | 监控中 |
| RSK-002 | 高并发数据超卖 | 高 | 分布式排他锁与数据库原子事务校验 | 铁匠 (Core SWE) | 监控中 |
