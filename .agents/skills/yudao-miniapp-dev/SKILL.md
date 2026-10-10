---
name: yudao-miniapp-dev
description: Yudao-Mall-UniApp 微信小程序与跨端 H5 移动研发规范。指导数字员工遵循 Uni-App Vue 3 标准规范、微信一键登录与双 Token 刷新机制、微信支付流转闭环、分包加载 (Subpackages) 限制规避以及 uni.request 适配器治理。
---

# Yudao-Mall-UniApp 微信小程序研发法典 (MiniApp Skill)

> **最高法典契约**：移动端是直面普通消费者与一线工人的门面。必须做到**微信静默授权一键登录、毫秒级页面首屏加载、网络断网自愈重试**。严禁主包体积超过 2MB，严禁明文暴露微信 AppSecret，严禁死链接死交互。

---

## §1 核心目录结构与分包架构

微信小程序有严格的代码包体积限制（主包 ≤ 2MB，全量分包 ≤ 20MB），工程必须实施分包治理：

```
apps/miniapp/src/
├── pages/              # 【主包核心页面】(仅保留 TabBar 核心页: 首页、分类、购物车、我的)
├── pages-sub/          # 【业务分包目录】
│   ├── order/          # 订单流程 (提交订单、收银台、订单详情、物流轨迹)
│   ├── member/         # 会员中心 (个人资料、收货地址、优惠券、积分中心)
│   └── user/           # 认证流程 (手机号绑定、密码找回、协议页面)
├── components/         # 跨端通用业务组件
├── store/              # Pinia 状态树 (user 登录态, cart 购物车, app 全局配置)
├── utils/              # 跨端工具库
│   ├── http.ts         # 基于 uni.request 封装的拦截器 (自动注入 Token / 401 自动刷新)
│   └── auth.ts         # 本地持久化缓存 (uni.setStorageSync)
└── App.vue             # 小程序生命周期 (onLaunch 版本更新检查)
```

---

## §2 微信一键登录与 Token 自动续期

小程序端必须采用标准的高信噪比授权流：

```typescript
// apps/miniapp/src/utils/auth.ts
export async function wxSilentLogin(): Promise<string | null> {
  return new Promise((resolve) => {
    uni.login({
      provider: 'weixin',
      success: async (res) => {
        if (res.code) {
          // 调用后端 /app-api/member/auth/weixin-mini-app-login 接口
          try {
            const tokenRes = await http.post('/app-api/member/auth/weixin-mini-app-login', {
              code: res.code
            });
            const { accessToken, refreshToken, expiresTime } = tokenRes.data;
            uni.setStorageSync('ACCESS_TOKEN', accessToken);
            uni.setStorageSync('REFRESH_TOKEN', refreshToken);
            resolve(accessToken);
          } catch (e) {
            console.error('登录换票失败', e);
            resolve(null);
          }
        } else {
          resolve(null);
        }
      },
      fail: () => resolve(null)
    });
  });
}
```

---

## §3 网络拦截与 401 自动续期队列

```typescript
// apps/miniapp/src/utils/http.ts
let isRefreshing = false;
let requestsQueue: Array<(token: string) => void> = [];

export function request<T = any>(options: UniApp.RequestOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('ACCESS_TOKEN');
    const header = {
      ...options.header,
      'tenant-id': '1',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    uni.request({
      ...options,
      header,
      success: async (res: any) => {
        if (res.statusCode === 200 && res.data.code === 0) {
          resolve(res.data);
        } else if (res.data.code === 401) {
          // Token 过期，挂起请求并用 RefreshToken 换取新票
          if (!isRefreshing) {
            isRefreshing = true;
            const newToken = await refreshToken();
            isRefreshing = false;
            if (newToken) {
              requestsQueue.forEach((cb) => cb(newToken));
              requestsQueue = [];
              // 重试当前请求
              resolve(request(options));
            } else {
              uni.removeStorageSync('ACCESS_TOKEN');
              uni.navigateTo({ url: '/pages-sub/user/login' });
              reject(res.data);
            }
          } else {
            requestsQueue.push((newToken: string) => {
              options.header = { ...options.header, Authorization: `Bearer ${newToken}` };
              resolve(request(options));
            });
          }
        } else {
          uni.showToast({ title: res.data.msg || '网络开小差了', icon: 'none' });
          reject(res.data);
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络连接异常', icon: 'none' });
        reject(err);
      }
    });
  });
}
```

---

## §4 微信支付闭环规范

调用微信原生支付时，必须严格捕获用户取消支付动作，绝不弹红字报错：
```typescript
export function callWxPay(payParams: any): Promise<boolean> {
  return new Promise((resolve) => {
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: payParams.timeStamp,
      nonceStr: payParams.nonceStr,
      package: payParams.packageValue,
      signType: payParams.signType || 'RSA',
      paySign: payParams.paySign,
      success: () => {
        uni.showToast({ title: '支付成功', icon: 'success' });
        resolve(true);
      },
      fail: (err) => {
        if (err.errMsg.indexOf('cancel') !== -1) {
          uni.showToast({ title: '已取消支付', icon: 'none' });
        } else {
          uni.showToast({ title: '支付异常，请稍后重试', icon: 'none' });
        }
        resolve(false);
      }
    });
  });
}
```
