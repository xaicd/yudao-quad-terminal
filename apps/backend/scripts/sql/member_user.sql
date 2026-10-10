-- -------------------------------------------------------------
-- 物理表: member_user (会员用户)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `member_user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '编号',
  `nickname` VARCHAR(255) NOT NULL COMMENT '用户昵称',
  `mobile` VARCHAR(255) NOT NULL COMMENT '手机号',
  `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像',
  `status` INT NOT NULL COMMENT '状态',
  `point` INT DEFAULT NULL COMMENT '积分',
  `creator` VARCHAR(64) DEFAULT '' COMMENT '创建者',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` VARCHAR(64) DEFAULT '' COMMENT '更新者',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` BIT(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  `tenant_id` BIGINT NOT NULL DEFAULT 0 COMMENT '多租户编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员用户';

-- -------------------------------------------------------------
-- 权限标识预置 (Yudao 规范)
-- -------------------------------------------------------------
-- 菜单权限: member:user:query   (查询)
-- 菜单权限: member:user:create  (新增)
-- 菜单权限: member:user:update  (修改)
-- 菜单权限: member:user:delete  (删除)
-- 菜单权限: member:user:export  (导出)
