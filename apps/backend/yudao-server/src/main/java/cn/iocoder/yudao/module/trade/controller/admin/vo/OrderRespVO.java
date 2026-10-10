package cn.iocoder.yudao.module.trade.controller.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 管理后台 - 商城订单响应 Response VO
 */
@Schema(description = "管理后台 - 商城订单响应 Response VO")
public class OrderRespVO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "编号")
    private Long id;

    @Schema(description = "订单流水号")
    private String orderNo;
    @Schema(description = "买家用户编号")
    private Long userId;
    @Schema(description = "实付总金额(分)")
    private Integer totalPrice;
    @Schema(description = "订单状态")
    private Integer status;
    @Schema(description = "支付时间")
    private java.time.LocalDateTime payTime;
    @Schema(description = "用户备注")
    private String remark;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    public java.time.LocalDateTime getPayTime() {
        return payTime;
    }

    public void setPayTime(java.time.LocalDateTime payTime) {
        this.payTime = payTime;
    }
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
}
