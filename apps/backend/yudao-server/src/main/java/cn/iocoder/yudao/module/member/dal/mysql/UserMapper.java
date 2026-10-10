package cn.iocoder.yudao.module.member.dal.mysql;

import cn.iocoder.yudao.module.member.dal.dataobject.UserDO;
import cn.iocoder.yudao.module.member.controller.admin.vo.UserPageReqVO;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/**
 * 会员用户 Mapper 数据持久层访问接口
 */
@Mapper
public interface UserMapper {

    int insert(UserDO entity);

    int updateById(UserDO entity);

    int deleteById(Long id);

    UserDO selectById(Long id);

    List<UserDO> selectList(UserPageReqVO reqVO);

    Long selectCount(UserPageReqVO reqVO);
}
