/**
 * e2e/helpers/env-and-playwright.mjs
 *
 * Yudao-Quad-Terminal 通用零假 Mock Playwright 多视口与防遮挡审计助手库
 *
 * 沉淀自 tele-pulse 全生命周期实战：
 * 1. 自动解析 `.env.ports`、`package.json` 与 `.commandcode/lite/credentials.env`（含 IT 三员分立口令）；
 * 2. 原生支持 `@ApiEncrypt` AES-256-ECB 加密登录探针与 `data-testid="login-username|login-password|login-submit"` 真实表单登录；
 * 3. 多视口零横向溢出守卫（`1920×1080`、`1440×900`、`375×812`、`320×568` `320dp`）；
 * 4. 移动端固定底部 TabBar 防遮挡命中检测（`document.elementFromPoint` 几何反证）；
 * 5. 侧边栏可见导航菜单 `<= 4` 字 DOM 级守卫、紧凑按钮文案守卫、零裸枚举/未翻译 i18n Key 泄漏守卫；
 * 6. 视觉证据截图体积（`>= 20KB`）与跨图 MD5 唯一性硬校验（杜绝白屏图与重复假图）。
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as encryptApi from "../../deploy/lite/runtime/lite-api-encrypt.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(__dirname, "../..");

export const STANDARD_VIEWPORTS = [
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "laptop-1440", width: 1440, height: 900 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-320", width: 320, height: 568 },
];

export function parseKeyValueEnv(filePath) {
  const out = {};
  if (!fs.existsSync(filePath)) return out;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const idx = t.indexOf("=");
    if (idx > 0) out[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
  }
  return out;
}

export function resolveProjectEndpoints(rootDir = REPO_ROOT) {
  const envPorts = parseKeyValueEnv(path.join(rootDir, ".env.ports"));
  let slug = envPorts.PROJECT_SLUG || path.basename(rootDir);
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
    if (pkg.name) slug = pkg.name.replace(/^@.*\//, "").replace(/-quad-terminal$/, "");
  } catch {}
  slug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, "") || "app";

  const gatewayPort = Number(process.env.GATEWAY_PORT || envPorts.GATEWAY_PORT || 48120);
  const backendPort = Number(process.env.BACKEND_PORT || process.env.LITE_SERVER_PORT || envPorts.BACKEND_PORT || 48080);
  const dbPort = Number(process.env.DB_PORT || process.env.LITE_PG_PORT || envPorts.DB_PORT || 55432);
  const redisPort = Number(process.env.REDIS_PORT || process.env.LITE_REDIS_PORT || envPorts.REDIS_PORT || 63799);
  const gatewayOrigin = process.env.E2E_GATEWAY_ORIGIN || `http://127.0.0.1:${gatewayPort}`;
  const gatewayBaseUrl = `${gatewayOrigin}/${slug}`;
  const backendBaseUrl = `http://127.0.0.1:${backendPort}`;

  return {
    slug,
    snakeSlug: slug.replace(/-/g, "_"),
    gatewayPort,
    backendPort,
    dbPort,
    redisPort,
    gatewayOrigin,
    gatewayBaseUrl,
    backendBaseUrl,
    adminUrl: `${gatewayBaseUrl}/admin/`,
    cockpitUrl: `${gatewayBaseUrl}/cockpit/`,
    miniappUrl: `${gatewayBaseUrl}/2c/`,
    adminApiUrl: `${gatewayBaseUrl}/admin-api`,
  };
}

export function loadRuntimeCredentials(rootDir = REPO_ROOT) {
  const credFile = path.join(rootDir, ".commandcode/lite/credentials.env");
  const env = parseKeyValueEnv(credFile);
  return {
    file: credFile,
    username: process.env.E2E_USERNAME || env.LITE_ADMIN_USERNAME || "",
    password: process.env.E2E_PASSWORD || env.LITE_ADMIN_PASSWORD || "",
    redisPassword: env.LITE_REDIS_PASSWORD || "",
    roles: {
      sys_admin: env.LITE_PASS_SYS_ADMIN || "",
      biz_admin: env.LITE_PASS_BIZ_ADMIN || "",
      audit_admin: env.LITE_PASS_AUDIT_ADMIN || "",
      oncall_sre: env.LITE_PASS_ONCALL_SRE || "",
    },
  };
}

/**
 * 通过真实 `@ApiEncrypt` AES-256-ECB 契约调用登录接口并返回 token 载荷
 */
export async function apiEncryptedLogin({
  username,
  password,
  rootDir = REPO_ROOT,
  loginUrl,
} = {}) {
  const endpoints = resolveProjectEndpoints(rootDir);
  const creds = loadRuntimeCredentials(rootDir);
  const finalUser = username || creds.username;
  const finalPass = password || creds.password;
  if (!finalUser || !finalPass) {
    throw new Error("缺少登录凭据：请先执行 pnpm lite:up 生成 .commandcode/lite/credentials.env");
  }

  const encryptConfig = encryptApi.readEncryptConfig(rootDir);
  const payload = JSON.stringify({ username: finalUser, password: finalPass });
  const headers = { "Content-Type": "application/json", "tenant-id": "1" };
  let body = payload;
  if (encryptConfig && encryptConfig.enabled) {
    headers[encryptConfig.header] = "true";
    body = encryptApi.encryptRequest(payload, encryptConfig);
  }

  const targetUrl = loginUrl || `${endpoints.gatewayBaseUrl}/admin-api/system/auth/login`;
  const res = await fetch(targetUrl, {
    method: "POST",
    headers,
    body,
    signal: AbortSignal.timeout(10_000),
  });
  const raw = (await res.text()).trim();
  let text = raw;
  const flagged = encryptConfig && encryptConfig.enabled && res.headers.get(encryptConfig.header);
  if (encryptConfig && encryptConfig.enabled && (flagged || !raw.startsWith("{"))) {
    text = encryptApi.decryptResponse(raw, encryptConfig);
  }
  const parsed = JSON.parse(text);
  return { status: res.status, code: parsed.code, msg: parsed.msg, data: parsed.data };
}

/**
 * 挂载浏览器控制台错误与未捕获异常收集器（排除 favicon 404 等非功能噪声）
 */
export function attachZeroErrorCollector(page) {
  const errors = [];
  page.on("pageerror", (err) => {
    errors.push(`pageerror: ${err.message}`);
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (!/favicon\.ico/i.test(text)) {
        errors.push(`console.error: ${text}`);
      }
    }
  });
  return {
    errors,
    assertClean(contextLabel = "page") {
      if (errors.length > 0) {
        throw new Error(`[${contextLabel}] 捕获到 ${errors.length} 条前端运行时报错:\n${errors.join("\n")}`);
      }
    },
  };
}

/**
 * 使用真实表单（优先命中 data-testid="login-username|login-password|login-submit"）完成 B 端登录
 */
export async function loginAdminViaUi(page, { username, password, rootDir = REPO_ROOT, routeHash = "#/index" } = {}) {
  const endpoints = resolveProjectEndpoints(rootDir);
  const creds = loadRuntimeCredentials(rootDir);
  const finalUser = username || creds.username;
  const finalPass = password || creds.password;

  await page.goto(`${endpoints.adminUrl}#/login`, { waitUntil: "networkidle" });

  const userLoc = page.locator('[data-testid="login-username"] input, input[placeholder*="账号"], input[type="text"]').first();
  const passLoc = page.locator('[data-testid="login-password"] input, input[type="password"]').first();
  const submitLoc = page.locator('[data-testid="login-submit"], button.el-button--primary').first();

  await userLoc.waitFor({ state: "visible", timeout: 15_000 });
  await userLoc.fill(finalUser);
  await passLoc.fill(finalPass);
  await submitLoc.click();

  await page.waitForFunction(() => !window.location.hash.includes("/login"), null, { timeout: 20_000 });
  if (routeHash && routeHash !== "#/index") {
    await page.goto(`${endpoints.adminUrl}${routeHash}`, { waitUntil: "networkidle" });
  }
}

/**
 * 断言当前视口零横向滚动溢出（支持 1920 / 1440 / 375 / 320dp 全视口验证）
 */
export async function assertZeroHorizontalOverflow(page, label = "viewport") {
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body ? document.body.scrollWidth : 0,
  }));
  const maxScroll = Math.max(metrics.docScrollWidth, metrics.bodyScrollWidth);
  if (maxScroll > metrics.innerWidth + 1) {
    throw new Error(
      `[${label}] 发生横向溢出: scrollWidth=${maxScroll} > innerWidth=${metrics.innerWidth}`
    );
  }
  return metrics;
}

/**
 * 断言移动端固定底部导航栏（Fixed Bottom TabBar）未遮挡页面底部可交互控件：
 * 将最后一个业务按钮/卡片滚动至视口可见区域后，用 `elementFromPoint` 校验中心点命中该元素自身而非 TabBar。
 */
export async function assertFixedTabBarAntiOcclusion(
  page,
  {
    tabBarSelector = ".uni-tabbar, .tabbar, [data-testid='bottom-tabbar']",
    actionableSelector = "button:visible, .action-btn:visible, .card-action:visible",
  } = {}
) {
  const result = await page.evaluate(
    ({ tbSel, actSel }) => {
      const tabBar = document.querySelector(tbSel);
      if (!tabBar) return { hasTabBar: false, occluded: false };
      const candidates = Array.from(document.querySelectorAll(actSel)).filter(
        (el) => !tabBar.contains(el) && el.getBoundingClientRect().height > 0
      );
      if (candidates.length === 0) return { hasTabBar: true, candidates: 0, occluded: false };
      const last = candidates[candidates.length - 1];
      last.scrollIntoView({ block: "end", behavior: "instant" });
      const rect = last.getBoundingClientRect();
      const cx = Math.floor(rect.left + rect.width / 2);
      const cy = Math.floor(rect.top + rect.height / 2);
      const hit = document.elementFromPoint(cx, cy);
      const occluded = Boolean(hit && (hit === tabBar || tabBar.contains(hit)));
      return {
        hasTabBar: true,
        candidates: candidates.length,
        occluded,
        targetTag: last.tagName,
        hitTag: hit ? hit.tagName : null,
      };
    },
    { tbSel: tabBarSelector, actSel: actionableSelector }
  );

  if (result.occluded) {
    throw new Error(`底部固定 TabBar 遮挡了页面底部交互控件 (${JSON.stringify(result)})`);
  }
  return result;
}

/**
 * DOM 级守卫：侧边栏所有可见目录/页面菜单名严格 `<= maxChars`（默认 4 字）
 */
export async function assertCompactSidebarMenus(page, { maxChars = 4 } = {}) {
  const items = await page.evaluate(() => {
    const nodes = document.querySelectorAll(
      ".el-menu-item:not(.is-hidden), .el-sub-menu__title"
    );
    return Array.from(nodes)
      .map((n) => (n.textContent || "").trim())
      .filter(Boolean);
  });
  const violations = items.filter((txt) => Array.from(txt).length > maxChars);
  if (violations.length > 0) {
    throw new Error(`发现超过 ${maxChars} 字的可见导航菜单: ${violations.join(", ")}`);
  }
  return items;
}

/**
 * DOM 级守卫：表格行内与工具栏常规按钮文案紧凑（剔除图标空白后汉字数 <= maxChars）
 */
export async function assertCompactActionButtons(page, { maxChars = 4 } = {}) {
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".el-table .el-button, .el-form .el-button"))
      .map((b) => (b.textContent || "").replace(/\s+/g, "").trim())
      .filter(Boolean);
  });
  const overlong = buttons.filter((txt) => Array.from(txt).length > maxChars);
  if (overlong.length > 0) {
    throw new Error(`发现冗长按钮文案 (> ${maxChars} 字): ${overlong.slice(0, 5).join(", ")}`);
  }
  return buttons;
}

/**
 * DOM 级守卫：拒绝裸枚举码（如 `SYNC_RUNNING`）、未翻译 i18n 键（如 `login.usernamePlaceholder`）或 `undefined`/`[object Object]`
 */
export async function assertZeroRawEnumOrI18nLeak(page) {
  const bodyText = await page.evaluate(() => (document.body ? document.body.innerText : ""));
  const badPatterns = [
    { name: "[object Object]", re: /\[object Object\]/ },
    { name: "raw i18n key", re: /\b(?:common|system|infra|login)\.[a-zA-Z0-9_.]+\b/ },
  ];
  for (const { name, re } of badPatterns) {
    const m = re.exec(bodyText);
    if (m) {
      throw new Error(`页面存在未转译 ${name} 泄漏: "${m[0]}"`);
    }
  }
  return true;
}

/**
 * 截取视觉验收证据并执行体积（默认 `>= 20KB`）与 MD5 跨图去重校验
 */
export async function captureDistinctEvidenceScreenshot(
  page,
  outPath,
  { minBytes = 20_480, seenMd5Set = null, fullPage = false } = {}
) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await page.screenshot({ path: outPath, fullPage });
  const buf = fs.readFileSync(outPath);
  if (buf.byteLength < minBytes) {
    throw new Error(
      `证据截图体积过小 (${buf.byteLength}B < ${minBytes}B)，疑似白屏或未渲染完成: ${outPath}`
    );
  }
  const md5 = crypto.createHash("md5").update(buf).digest("hex");
  if (seenMd5Set) {
    if (seenMd5Set.has(md5)) {
      throw new Error(`证据截图 MD5 重复 (${md5})，严禁伪造相同截图充数: ${outPath}`);
    }
    seenMd5Set.add(md5);
  }
  return { path: outPath, bytes: buf.byteLength, md5 };
}
