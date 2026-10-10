package cn.iocoder.yudao.module.trade.dal.dataobject;

import cn.iocoder.yudao.framework.mybatis.core.dataobject.BaseDO;
import java.io.Serializable;

/**
 * 商城订单 DO 实体类
 * 对应物理表: trade_order
 */
public class OrderDO extends BaseDO implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 编号
     */
    private Long id;

    /**
     * 订单流水号
     */
    private String orderNo;
    /**
     * 买家用户编号
     */
    private Long userId;
    /**
     * 实付总金额(分)
     */
    private Integer totalPrice;
    /**
     * 订单状态
     */
    private Integer status;
    /**
     * 支付时间
     */
    private java.time.LocalDateTime payTime;
    /**
     * 用户备注
     */
    private String remark;

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
}
