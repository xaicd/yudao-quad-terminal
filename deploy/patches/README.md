# 子模块差异补丁（方案 B：差异一律落主仓）

## 为什么是这个方案

`apps/backend`（YunaiV/yudao-cloud）与 `apps/admin`（yudaocode/yudao-ui-admin-vue3）都是**第三方只读子模块**。

如果直接把改动提交**在子模块里**、并把主仓 gitlink 钉到那个本地提交，会有一个致命问题：
**该提交在子模块远端不存在**，别人 `git clone --recursive` / `git submodule update --init` 会直接失败
（`Fetched in submodule path 'apps/backend', but it did not contain <sha>`）。

因此本仓采用：

> **子模块指针只钉「远端真实存在的上游提交」；所有对本基座的差异化改动以补丁形式收敛在本目录。**

优点：clone 即成功、上游可随时跟随、差异在本仓可评审可回滚，且与 AGENTS 的「差异一律落主仓」一致。

## 现有补丁

| 补丁 | 目标 | 内容 | 为什么不能只靠配置 |
|---|---|---|---|
| `backend/0001-api-encrypt-default-on.patch` | `apps/backend` | `AuthController` 加 `@ApiEncrypt`；`api-encrypt.enable` / `xss.enable` / 验证码频率限制默认开启 | 注解是**代码**，而 `@ApiEncrypt` 决定登录请求体是否解密；纯配置无法替代 |
| `admin/0001-login-encrypt-on.patch` | `apps/admin` | 登录接口 `isEncrypt: true` | 与后端配对，否则前端不会加密登录请求体 |

## 用法

```bash
pnpm patch:status     # 查看各子模块补丁状态与未声明改动
pnpm patch:apply      # 幂等注入（lite:up 与 lifecycle build 会自动调用）
pnpm patch:check      # 门禁：改动必须恰好等于声明的补丁
pnpm patch:revert     # 反向应用，把子模块还原成纯上游（干净树）
```

## 约定（由 `submodule-patches` 门禁强制）

1. 子模块工作区的改动，必须**恰好等于**本目录声明的补丁；**不得有额外手改**。
2. 新增差异的正规做法：
   ```bash
   git -C apps/<sub> diff > deploy/patches/<sub>/000N-<name>.patch
   git -C apps/<sub> checkout .        # 立刻还原子模块为纯上游
   git add deploy/patches/<sub>/000N-<name>.patch   # 差异提交在主仓
   ```
3. 补丁按文件名排序应用（`0001-`、`0002-` …），请保持顺序稳定。
4. **粒度原则**：能用配置覆盖层（如 `deploy/lite/application-lite.yaml`）解决的，不要写补丁；只有代码级改动（注解、接口签名）才落补丁。
