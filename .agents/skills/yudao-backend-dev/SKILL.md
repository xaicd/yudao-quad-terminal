---
name: yudao-backend-dev
description: Yudao-Cloud (芋道后端微服务与单体开发法典)。指导 AI 数字员工 (铁匠 CoreSWE / 墨斗 FDA) 遵循标准的 6 层架构、多企业租户物理隔离、RBAC 权限守卫、MyBatis-Plus 安全查询、Knife4j 接口契约注释与事务缓存双写一致性规范。
---

# Yudao-Cloud 后端架构与业务模块研发法典 (Yudao Backend Dev Skill)

> **最高法典契约**：任何数字员工在开发或二开 `yudao-quad-terminal` 后端模块时，必须严格执行本规范。严禁越层调用，严禁跳过租户隔离拦截器，严禁手写无分页大表全查，必须对所有对外 API 施加 `@PreAuthorize` 权限控制与 Knife4j OpenAPI 注释。

---

## §1 标准 6 层工程架构与职责边界

每个业务模块必须严格划分为 6 个逻辑层级，禁止倒置引用：

```
[Controller] 控制器层: 负责路由绑定、参数校验(@Valid)、权限鉴权与返回 CommonResult<T>
     │
     ▼
 [Service]  业务接口层: 定义纯净业务契约，不暴露持久层细节
     │
     ▼
[ServiceImpl] 业务实现层: 核心业务逻辑、事务声明(@Transactional)、缓存读写与多表编排
     │
     ▼
  [Mapper]  持久映射层: 继承 BaseMapperX<T>，使用 LambdaQueryWrapperX 进行类型安全查询
     │
     ▼
   [DO]     数据实体层: 继承 BaseDO / TenantBaseDO，映射物理数据表字段
     │
     ▲
[VO / DTO]  视图与数据传输对象: 进出解耦 (PageReqVO, RespVO, CreateReqVO, UpdateReqVO)
     │
[Convert]   MapStruct 映射器: 负责 DO 与 VO/DTO 之间的编译期零开销属性拷贝
```

---

## §2 数据实体 (DO) 规范与租户隔离

所有业务表实体必须严格继承基类，不得遗漏审计字段与租户字段：

### 1. 实体定义代码范式
```java
package cn.iocoder.yudao.module.system.dal.dataobject.user;

import cn.iocoder.yudao.framework.mybatis.core.dataobject.BaseDO;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

@TableName("system_users")
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserDO extends BaseDO {

    @TableId
    private Long id;

    private String username;
    private String nickname;
    private String mobile;
    private Integer status;

    /**
     * 租户编号 (框架 MyBatis-Plus 插件会自动在每次 SQL 自动追加 WHERE tenant_id = ?)
     */
    private Long tenantId;
}
```

### 2. 租户隔离防线与例外控制
- **全局自动拦截**：默认情况下，MyBatis-Plus 会自动对带有 `tenant_id` 的表注入租户条件，确保绝不发生跨企业租户数据穿透。
- **管理端全局系统表例外**：若某业务为平台级全局字典或公共套餐，需跨租户查询时，必须在 Service 方法上显式声明注解：
  ```java
  @TenantIgnore // 仅限超级管理员全局扫描场景使用！
  public List<TenantDO> getTenantList() { ... }
  ```

---

## §3 控制器 (Controller) 与接口契约规范

控制器必须采用统一的 RESTful 命名规范，并用 Knife4j 标注清晰的接口契约：

```java
package cn.iocoder.yudao.module.system.controller.admin.user;

import cn.iocoder.yudao.framework.common.pojo.CommonResult;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import javax.validation.Valid;

@Tag(name = "管理后台 - 用户管理")
@RestController
@RequestMapping("/admin-api/system/user")
@Validated
public class UserController {

    @Resource
    private UserService userService;

    @GetMapping("/page")
    @Operation(summary = "获得用户分页列表")
    @PreAuthorize("@ss.hasPermission('system:user:query')")
    public CommonResult<PageResult<UserRespVO>> getUserPage(@Valid UserPageReqVO reqVO) {
        PageResult<AdminUserDO> pageResult = userService.getUserPage(reqVO);
        return CommonResult.success(UserConvert.INSTANCE.convertPage(pageResult));
    }

    @PostMapping("/create")
    @Operation(summary = "创建用户")
    @PreAuthorize("@ss.hasPermission('system:user:create')")
    public CommonResult<Long> createUser(@Valid @RequestBody UserCreateReqVO reqVO) {
        Long userId = userService.createUser(reqVO);
        return CommonResult.success(userId);
    }
}
```

---

## §4 持久层 (Mapper) 安全防线

1. **绝对禁止无限制全表扫描**：所有列表查询必须携带租户过滤，必须带 `limit` 或通过 `PageResult` 进行分页；
2. **强制使用 Lambda 语法**：杜绝字符串硬编码列名，使用 `LambdaQueryWrapperX`：
```java
@Mapper
public interface AdminUserMapper extends BaseMapperX<AdminUserDO> {
    default PageResult<AdminUserDO> selectPage(UserPageReqVO reqVO) {
        return selectPage(reqVO, new LambdaQueryWrapperX<AdminUserDO>()
            .likeIfPresent(AdminUserDO::getUsername, reqVO.getUsername())
            .likeIfPresent(AdminUserDO::getMobile, reqVO.getMobile())
            .eqIfPresent(AdminUserDO::getStatus, reqVO.getStatus())
            .orderByDesc(AdminUserDO::getId));
    }
}
```

---

## §5 研发自查与门禁清单 (Checklist)

- [ ] 实体类是否继承 `BaseDO`（具备创建/更新时间与软删除字段）？
- [ ] Controller 方法是否添加了 `@PreAuthorize` 鉴权表达式？
- [ ] 是否所有接口均返回标准 `CommonResult<T>` 统一响应封装？
- [ ] 是否在参数上声明了 `@Valid` 并对入参 DTO 字段加设校验规则（如 `@NotBlank`）？
- [ ] 新增或修改接口后，是否立即调用 `bash packages/api-client/scripts/gen-api-sdk.sh` 同步前端契约？
