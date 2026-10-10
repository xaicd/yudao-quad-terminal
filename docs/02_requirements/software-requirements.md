# 《Yudao Quad-Terminal Master Base》软件需求规格说明书 (SRS - Software Requirements Specification)

> **CMMI 门禁**: G1 需求基线门禁 (`gate_g1_spec`)  
> **主责角色**: 墨斗 (FDA) / 百晓生 (DS)  
> **规范语法**: IEEE 29148 / EARS 句式规范  

## 一、 需求清单与 EARS 语法规格

1. **[REQ-001] 多企业租户数据隔离**
   - **WHEN** 任意企业用户通过身份鉴权进入系统；
   - **THEN** 系统 **SHALL** 强校验 `company_id` 边界，杜绝跨企业数据穿透。

2. **[REQ-002] 核心业务主线交付**
   - **WHEN** 客户现场操作核心业务；
   - **THEN** 系统 **SHALL** 提供确定性状态流转与单手极简两字操作。

## 二、 非功能性需求约束
系统接口 P99 响应延迟必须小于 200ms，系统可用性达到 99.95%。
