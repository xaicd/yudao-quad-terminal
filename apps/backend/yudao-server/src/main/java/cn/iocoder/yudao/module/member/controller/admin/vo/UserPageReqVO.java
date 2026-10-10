package cn.iocoder.yudao.module.member.controller.admin.vo;

import cn.iocoder.yudao.framework.common.pojo.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * 管理后台 - 会员用户分页查询 Request VO
 */
@Schema(description = "管理后台 - 会员用户分页查询 Request VO")
public class UserPageReqVO extends PageParam {

    @Schema(description = "用户昵称")
    private String nickname;
    @Schema(description = "手机号")
    private String mobile;
    @Schema(description = "状态")
    private Integer status;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
