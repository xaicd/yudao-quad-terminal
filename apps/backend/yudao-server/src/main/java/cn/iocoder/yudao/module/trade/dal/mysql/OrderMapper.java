package cn.iocoder.yudao.module.trade.dal.mysql;

import cn.iocoder.yudao.module.trade.dal.dataobject.OrderDO;
import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderPageReqVO;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/**
 * 商城订单 Mapper 数据持久层访问接口
 */
@Mapper
public interface OrderMapper {

    int insert(OrderDO entity);

    int updateById(OrderDO entity);

    int deleteById(Long id);

    OrderDO selectById(Long id);

    List<OrderDO> selectList(OrderPageReqVO reqVO);

    Long selectCount(OrderPageReqVO reqVO);
}
