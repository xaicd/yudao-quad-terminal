package cn.iocoder.yudao.module.member.controller.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;

/**
 * 管理后台 - 会员用户创建/更新 Request VO
 */
@Schema(description = "管理后台 - 会员用户创建/更新 Request VO")
public class UserSaveReqVO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "编号 (更新时必传)")
    private Long id;

    @Schema(description = "用户昵称", requiredMode = Schema.RequiredMode.REQUIRED)
    private String nickname;
    @Schema(description = "手机号", requiredMode = Schema.RequiredMode.REQUIRED)
    private String mobile;
    @Schema(description = "头像")
    private String avatar;
    @Schema(description = "状态", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer status;
    @Schema(description = "积分")
    private Integer point;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }
}
