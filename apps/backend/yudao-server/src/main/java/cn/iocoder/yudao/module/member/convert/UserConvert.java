package cn.iocoder.yudao.module.member.convert;

import cn.iocoder.yudao.module.member.dal.dataobject.UserDO;
import cn.iocoder.yudao.module.member.controller.admin.vo.UserRespVO;
import cn.iocoder.yudao.module.member.controller.admin.vo.UserSaveReqVO;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import java.util.ArrayList;
import java.util.List;

/**
 * 会员用户 实体转换器 (支持手动映射或 MapStruct)
 */
public class UserConvert {

    public static final UserConvert INSTANCE = new UserConvert();

    public UserDO convert(UserSaveReqVO bean) {
        if (bean == null) return null;
        UserDO entity = new UserDO();
        entity.setId(bean.getId());
        entity.setNickname(bean.getNickname());
        entity.setMobile(bean.getMobile());
        entity.setAvatar(bean.getAvatar());
        entity.setStatus(bean.getStatus());
        entity.setPoint(bean.getPoint());
        return entity;
    }

    public UserRespVO convert(UserDO bean) {
        if (bean == null) return null;
        UserRespVO vo = new UserRespVO();
        vo.setId(bean.getId());
        vo.setNickname(bean.getNickname());
        vo.setMobile(bean.getMobile());
        vo.setAvatar(bean.getAvatar());
        vo.setStatus(bean.getStatus());
        vo.setPoint(bean.getPoint());
        vo.setCreateTime(bean.getCreateTime());
        return vo;
    }

    public PageResult<UserRespVO> convertPage(PageResult<UserDO> page) {
        if (page == null) return PageResult.empty();
        List<UserRespVO> list = new ArrayList<>();
        if (page.getList() != null) {
            for (UserDO item : page.getList()) {
                list.add(convert(item));
            }
        }
        return new PageResult<>(list, page.getTotal());
    }
}
