package cn.iocoder.yudao.module.trade.service;

import cn.iocoder.yudao.module.trade.dal.dataobject.OrderDO;
import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderPageReqVO;
import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderSaveReqVO;
import cn.iocoder.yudao.framework.common.pojo.PageResult;

/**
 * 商城订单 核心业务逻辑服务接口
 */
public interface OrderService {

    /**
     * 创建商城订单
     *
     * @param createReqVO 创建信息
     * @return 编号
     */
    Long createOrder(OrderSaveReqVO createReqVO);

    /**
     * 更新商城订单
     *
     * @param updateReqVO 更新信息
     */
    void updateOrder(OrderSaveReqVO updateReqVO);

    /**
     * 删除商城订单
     *
     * @param id 编号
     */
    void deleteOrder(Long id);

    /**
     * 获得商城订单
     *
     * @param id 编号
     * @return 商城订单 DO
     */
    OrderDO getOrder(Long id);

    /**
     * 获得商城订单分页
     *
     * @param pageReqVO 分页查询
     * @return 商城订单分页列表
     */
    PageResult<OrderDO> getOrderPage(OrderPageReqVO pageReqVO);
}
