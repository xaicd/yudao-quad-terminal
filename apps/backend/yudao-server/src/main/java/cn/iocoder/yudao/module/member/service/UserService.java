package cn.iocoder.yudao.module.member.service;

import cn.iocoder.yudao.module.member.dal.dataobject.UserDO;
import cn.iocoder.yudao.module.member.controller.admin.vo.UserPageReqVO;
import cn.iocoder.yudao.module.member.controller.admin.vo.UserSaveReqVO;
import cn.iocoder.yudao.framework.common.pojo.PageResult;

/**
 * 会员用户 核心业务逻辑服务接口
 */
public interface UserService {

    /**
     * 创建会员用户
     *
     * @param createReqVO 创建信息
     * @return 编号
     */
    Long createUser(UserSaveReqVO createReqVO);

    /**
     * 更新会员用户
     *
     * @param updateReqVO 更新信息
     */
    void updateUser(UserSaveReqVO updateReqVO);

    /**
     * 删除会员用户
     *
     * @param id 编号
     */
    void deleteUser(Long id);

    /**
     * 获得会员用户
     *
     * @param id 编号
     * @return 会员用户 DO
     */
    UserDO getUser(Long id);

    /**
     * 获得会员用户分页
     *
     * @param pageReqVO 分页查询
     * @return 会员用户分页列表
     */
    PageResult<UserDO> getUserPage(UserPageReqVO pageReqVO);
}
