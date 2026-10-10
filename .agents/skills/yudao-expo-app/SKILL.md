---
name: yudao-expo-app
description: Yudao-Quad-Terminal 原生移动端 (Expo SDK 52 / React Native 0.76) 核心开发规范。指导数字员工遵循 Monorepo 跨包解析、硬件级 SecureStore 存储、6 寸屏极简对称 UI、局部一跳因果卡片流、以及自建 OTA 热更新发布与版本一致性检查准则。
---

# Yudao-Expo-App 原生移动端研发法典 (Expo App Skill)

> **最高法典契约**：Expo 原生端承载着移动终端的高保真体验与硬件级权限。必须做到**60/120fps 原生手势响应、硬件级安全芯片防嗅探、极简 6 寸屏单手可达**。严禁将 Token 存储在未经加密的 AsyncStorage，严禁打断移动端 LIFO 导航调用栈，OTA 发版必须保持 7 处版本指纹一致。

---

## §1 Metro Monorepo 跨包解析规范

在 PNPM Workspace 下，`apps/app` 必须通过 `metro.config.js` 显式监听 Monorepo 根目录，否则引用 `@yudao-quad-terminal/shared-types` 时 Metro bundler 会报 `Unable to resolve module`：

```javascript
// apps/app/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. 监控整个 Monorepo 根目录
config.watchFolders = [workspaceRoot];

// 2. 优先解析当前包的 node_modules，再回退到根 node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. 确保原生平台符号解析
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
```

---

## §2 硬件级凭证存储与生物识别 (SecureStore)

严禁在客户端直接使用裸 `AsyncStorage` 存储核心 JWT Token，必须使用 iOS Keychain 与 Android KeyStore 硬件加密：

```typescript
// apps/app/src/utils/security.ts
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

const TOKEN_KEY = 'yudao_auth_secure_token';

export async function saveSecureToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
  });
}

export async function getSecureToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function authenticateWithBiometrics(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!hasHardware || !isEnrolled) return true; // 无硬件退回普通模式

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: '请验证指纹或面容以解锁系统',
    cancelLabel: '取消'
  });
  return result.success;
}
```

---

## §3 6 寸屏极简对称交互与两字按钮规范

移动端掌柜驾驶舱遵循以下人机工程铁律：
1. **底栏黄金 5 槽位绝对对称**：
   - 导航栏固定收敛为 5 槽位：【首页】【待办】【工坊】【资产】【我的】；
   - 严格居中对齐，任何时候不得出现偏心或不对称折行。
2. **两字按钮规范**：
   - 底部操作栏按钮文案只允许出现 2 个字（【派单】【确认】【驳回】【通过】【撤回】【保存】）；
   - 杜绝“立即确认提交该项目需求”等口语化长文案。
3. **就地浮层防遮挡**：
   - 实体检视（如查看工单详情、查看审批流）必须采用全局覆盖的下挂抽屉（Bottom Sheet），关闭即退回上下文，严禁强制跨 Tab 跳出导致现场丢失。

---

## §4 自建 OTA 热更新与 7 处版本一致性

### 1. OTA 发布与 Cache-Busting
发布纯 JS 增量补丁时，运行统一发版脚本：
```bash
bash scripts/publish-ota.sh android
```
- `launchAsset.key` 与 `manifest.json` 中的 bundle hash 必须随构建内容动态变化，防止老设备命中 HTTP 缓存导致更新静默失效。

### 2. 7 处版本一致性守卫
在打生产 Release APK 包前，必须保证以下 7 处版本完全一致：
- `apps/app/app.json` (`expo.version`)
- `apps/app/package.json` (`version`)
- `apps/app/android/app/build.gradle` (`versionName`)
- `CHANGELOG.md`
- `ui/dist/version.json`
- `docs/07_release/release-notes.md`
- Git Tag (如 `v1.0.0`)
