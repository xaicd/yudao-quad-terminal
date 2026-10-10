package cn.iocoder.yudao.module.member.controller.admin;

import cn.iocoder.yudao.module.member.controller.admin.vo.UserPageReqVO;
import cn.iocoder.yudao.module.member.controller.admin.vo.UserRespVO;
import cn.iocoder.yudao.module.member.controller.admin.vo.UserSaveReqVO;
import cn.iocoder.yudao.module.member.dal.dataobject.UserDO;
import cn.iocoder.yudao.module.member.service.UserService;
import cn.iocoder.yudao.module.member.convert.UserConvert;
import cn.iocoder.yudao.framework.common.pojo.CommonResult;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static cn.iocoder.yudao.framework.common.pojo.CommonResult.success;

/**
 * 管理后台 - 会员用户 控制器
 */
@Tag(name = "管理后台 - 会员用户")
@RestController
@RequestMapping("/admin-api/member/user")
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    @Operation(summary = "创建会员用户")
    public CommonResult<Long> createUser(@Validated @RequestBody UserSaveReqVO createReqVO) {
        return success(userService.createUser(createReqVO));
    }

    @PutMapping("/update")
    @Operation(summary = "更新会员用户")
    public CommonResult<Boolean> updateUser(@Validated @RequestBody UserSaveReqVO updateReqVO) {
        userService.updateUser(updateReqVO);
        return success(true);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "删除会员用户")
    @Parameter(name = "id", description = "编号", required = true)
    public CommonResult<Boolean> deleteUser(@RequestParam("id") Long id) {
        userService.deleteUser(id);
        return success(true);
    }

    @GetMapping("/get")
    @Operation(summary = "获得会员用户")
    @Parameter(name = "id", description = "编号", required = true)
    public CommonResult<UserRespVO> getUser(@RequestParam("id") Long id) {
        UserDO entity = userService.getUser(id);
        return success(UserConvert.INSTANCE.convert(entity));
    }

    @GetMapping("/page")
    @Operation(summary = "获得会员用户分页")
    public CommonResult<PageResult<UserRespVO>> getUserPage(@Validated UserPageReqVO pageReqVO) {
        PageResult<UserDO> pageResult = userService.getUserPage(pageReqVO);
        return success(UserConvert.INSTANCE.convertPage(pageResult));
    }
}
