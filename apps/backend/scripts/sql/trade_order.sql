-- -------------------------------------------------------------
-- 物理表: trade_order (商城订单)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_order` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '编号',
  `order_no` VARCHAR(255) NOT NULL COMMENT '订单流水号',
  `user_id` BIGINT NOT NULL COMMENT '买家用户编号',
  `total_price` INT NOT NULL COMMENT '实付总金额(分)',
  `status` INT NOT NULL COMMENT '订单状态',
  `pay_time` DATETIME DEFAULT NULL COMMENT '支付时间',
  `remark` VARCHAR(255) DEFAULT NULL COMMENT '用户备注',
  `creator` VARCHAR(64) DEFAULT '' COMMENT '创建者',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` VARCHAR(64) DEFAULT '' COMMENT '更新者',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` BIT(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  `tenant_id` BIGINT NOT NULL DEFAULT 0 COMMENT '多租户编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商城订单';

-- -------------------------------------------------------------
-- 权限标识预置 (Yudao 规范)
-- -------------------------------------------------------------
-- 菜单权限: trade:order:query   (查询)
-- 菜单权限: trade:order:create  (新增)
-- 菜单权限: trade:order:update  (修改)
-- 菜单权限: trade:order:delete  (删除)
-- 菜单权限: trade:order:export  (导出)
