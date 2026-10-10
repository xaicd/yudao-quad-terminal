package cn.iocoder.yudao.module.trade.service;

import cn.iocoder.yudao.module.trade.dal.dataobject.OrderDO;
import cn.iocoder.yudao.module.trade.dal.mysql.OrderMapper;
import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderPageReqVO;
import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderSaveReqVO;
import cn.iocoder.yudao.module.trade.convert.OrderConvert;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 商城订单 核心业务逻辑服务实现类
 */
@Service
@Validated
public class OrderServiceImpl implements OrderService {

    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createOrder(OrderSaveReqVO createReqVO) {
        OrderDO entity = OrderConvert.INSTANCE.convert(createReqVO);
        orderMapper.insert(entity);
        return entity.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateOrder(OrderSaveReqVO updateReqVO) {
        validateOrderExists(updateReqVO.getId());
        OrderDO updateObj = OrderConvert.INSTANCE.convert(updateReqVO);
        orderMapper.updateById(updateObj);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteOrder(Long id) {
        validateOrderExists(id);
        orderMapper.deleteById(id);
    }

    private void validateOrderExists(Long id) {
        if (orderMapper.selectById(id) == null) {
            throw new IllegalArgumentException("商城订单不存在，编号: " + id);
        }
    }

    @Override
    public OrderDO getOrder(Long id) {
        return orderMapper.selectById(id);
    }

    @Override
    public PageResult<OrderDO> getOrderPage(OrderPageReqVO pageReqVO) {
        List<OrderDO> list = orderMapper.selectList(pageReqVO);
        Long total = orderMapper.selectCount(pageReqVO);
        return new PageResult<>(list, total);
    }
}
