package cn.iocoder.yudao.module.trade.controller.admin.vo;

import cn.iocoder.yudao.framework.common.pojo.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * 管理后台 - 商城订单分页查询 Request VO
 */
@Schema(description = "管理后台 - 商城订单分页查询 Request VO")
public class OrderPageReqVO extends PageParam {

    @Schema(description = "订单流水号")
    private String orderNo;
    @Schema(description = "订单状态")
    private Integer status;

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
