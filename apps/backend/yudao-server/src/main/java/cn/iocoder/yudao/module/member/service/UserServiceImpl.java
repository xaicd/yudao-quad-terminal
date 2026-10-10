package cn.iocoder.yudao.module.member.service;

import cn.iocoder.yudao.module.member.dal.dataobject.UserDO;
import cn.iocoder.yudao.module.member.dal.mysql.UserMapper;
import cn.iocoder.yudao.module.member.controller.admin.vo.UserPageReqVO;
import cn.iocoder.yudao.module.member.controller.admin.vo.UserSaveReqVO;
import cn.iocoder.yudao.module.member.convert.UserConvert;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 会员用户 核心业务逻辑服务实现类
 */
@Service
@Validated
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createUser(UserSaveReqVO createReqVO) {
        UserDO entity = UserConvert.INSTANCE.convert(createReqVO);
        userMapper.insert(entity);
        return entity.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateUser(UserSaveReqVO updateReqVO) {
        validateUserExists(updateReqVO.getId());
        UserDO updateObj = UserConvert.INSTANCE.convert(updateReqVO);
        userMapper.updateById(updateObj);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Long id) {
        validateUserExists(id);
        userMapper.deleteById(id);
    }

    private void validateUserExists(Long id) {
        if (userMapper.selectById(id) == null) {
            throw new IllegalArgumentException("会员用户不存在，编号: " + id);
        }
    }

    @Override
    public UserDO getUser(Long id) {
        return userMapper.selectById(id);
    }

    @Override
    public PageResult<UserDO> getUserPage(UserPageReqVO pageReqVO) {
        List<UserDO> list = userMapper.selectList(pageReqVO);
        Long total = userMapper.selectCount(pageReqVO);
        return new PageResult<>(list, total);
    }
}
