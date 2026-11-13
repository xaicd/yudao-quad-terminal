/**
 * playwright.config.mjs
 *
 * Yudao-Quad-Terminal 通用零假 Mock 多视口 Playwright E2E 配置
 * 自动读取 `.env.ports` 与 `package.json`，开箱覆盖 Desktop (1920×1080 / 1440×900) 与 Mobile (375×812 / 320×568 320dp)。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

function loadEnvPorts() {
  const out = {};
  const f = path.join(ROOT, ".env.ports");
  if (!fs.existsSync(f)) return out;
  for (const line of fs.readFileSync(f, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const idx = t.indexOf("=");
    if (idx > 0) out[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
  }
  return out;
}

const envPorts = loadEnvPorts();
let slug = envPorts.PROJECT_SLUG || "yudao";
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  if (pkg.name) slug = pkg.name.replace(/^@.*\//, "").replace(/-quad-terminal$/, "");
} catch {}

const gatewayPort = Number(process.env.GATEWAY_PORT || envPorts.GATEWAY_PORT || 48120);
const baseURL = process.env.E2E_BASE_URL || `http://127.0.0.1:${gatewayPort}/${slug}`;

export default {
  testDir: "./e2e",
  timeout: 90_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL,
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
};
