package cn.iocoder.yudao.module.trade.controller.admin;

import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderPageReqVO;
import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderRespVO;
import cn.iocoder.yudao.module.trade.controller.admin.vo.OrderSaveReqVO;
import cn.iocoder.yudao.module.trade.dal.dataobject.OrderDO;
import cn.iocoder.yudao.module.trade.service.OrderService;
import cn.iocoder.yudao.module.trade.convert.OrderConvert;
import cn.iocoder.yudao.framework.common.pojo.CommonResult;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static cn.iocoder.yudao.framework.common.pojo.CommonResult.success;

/**
 * 管理后台 - 商城订单 控制器
 */
@Tag(name = "管理后台 - 商城订单")
@RestController
@RequestMapping("/admin-api/trade/order")
@Validated
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    @Operation(summary = "创建商城订单")
    public CommonResult<Long> createOrder(@Validated @RequestBody OrderSaveReqVO createReqVO) {
        return success(orderService.createOrder(createReqVO));
    }

    @PutMapping("/update")
    @Operation(summary = "更新商城订单")
    public CommonResult<Boolean> updateOrder(@Validated @RequestBody OrderSaveReqVO updateReqVO) {
        orderService.updateOrder(updateReqVO);
        return success(true);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "删除商城订单")
    @Parameter(name = "id", description = "编号", required = true)
    public CommonResult<Boolean> deleteOrder(@RequestParam("id") Long id) {
        orderService.deleteOrder(id);
        return success(true);
    }

    @GetMapping("/get")
    @Operation(summary = "获得商城订单")
    @Parameter(name = "id", description = "编号", required = true)
    public CommonResult<OrderRespVO> getOrder(@RequestParam("id") Long id) {
        OrderDO entity = orderService.getOrder(id);
        return success(OrderConvert.INSTANCE.convert(entity));
    }

    @GetMapping("/page")
    @Operation(summary = "获得商城订单分页")
    public CommonResult<PageResult<OrderRespVO>> getOrderPage(@Validated OrderPageReqVO pageReqVO) {
        PageResult<OrderDO> pageResult = orderService.getOrderPage(pageReqVO);
        return success(OrderConvert.INSTANCE.convertPage(pageResult));
    }
}
