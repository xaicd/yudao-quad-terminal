package cn.iocoder.yudao.module.trade.convert;

import cn.iocoder.yudao.module.trade.dal.dataobject.OrderDO;
import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderRespVO;
import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderSaveReqVO;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import java.util.ArrayList;
import java.util.List;

/**
 * 商城订单 实体转换器 (支持手动映射或 MapStruct)
 */
public class OrderConvert {

    public static final OrderConvert INSTANCE = new OrderConvert();

    public OrderDO convert(OrderSaveReqVO bean) {
        if (bean == null) return null;
        OrderDO entity = new OrderDO();
        entity.setId(bean.getId());
        entity.setOrderNo(bean.getOrderNo());
        entity.setUserId(bean.getUserId());
        entity.setTotalPrice(bean.getTotalPrice());
        entity.setStatus(bean.getStatus());
        entity.setPayTime(bean.getPayTime());
        entity.setRemark(bean.getRemark());
        return entity;
    }

    public OrderRespVO convert(OrderDO bean) {
        if (bean == null) return null;
        OrderRespVO vo = new OrderRespVO();
        vo.setId(bean.getId());
        vo.setOrderNo(bean.getOrderNo());
        vo.setUserId(bean.getUserId());
        vo.setTotalPrice(bean.getTotalPrice());
        vo.setStatus(bean.getStatus());
        vo.setPayTime(bean.getPayTime());
        vo.setRemark(bean.getRemark());
        vo.setCreateTime(bean.getCreateTime());
        return vo;
    }

    public PageResult<OrderRespVO> convertPage(PageResult<OrderDO> page) {
        if (page == null) return PageResult.empty();
        List<OrderRespVO> list = new ArrayList<>();
        if (page.getList() != null) {
            for (OrderDO item : page.getList()) {
                list.add(convert(item));
            }
        }
        return new PageResult<>(list, page.getTotal());
    }
}
