import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";

function fetchHttp(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on("error", reject);
    req.end();
  });
}

test("serve-miniapp: 动态 BasePath 路由、重定向与 SPA 真实资产分发", async (t) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "serve-miniapp-test-"));
  const assetsDir = path.join(tmpDir, "assets");
  fs.mkdirSync(assetsDir, { recursive: true });

  const htmlContent = "<!DOCTYPE html><html><head><title>Test Mall</title></head><body><div id='app'>Mall Ready</div></body></html>";
  const jsContent = "console.log('shopro loaded');";

  fs.writeFileSync(path.join(tmpDir, "index.html"), htmlContent, "utf8");
  fs.writeFileSync(path.join(assetsDir, "app.js"), jsContent, "utf8");

  const testPort = 48197;
  const testSlug = "test-store";

  const scriptPath = path.resolve("scripts/serve-miniapp.cjs");
  const proc = spawn(process.execPath, [
    scriptPath,
    "--port", String(testPort),
    "--slug", testSlug,
    "--dir", tmpDir
  ], { stdio: "pipe" });

  t.after(() => {
    try { proc.kill("SIGTERM"); } catch {}
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  // 等待服务监听
  let started = false;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 100));
    try {
      const res = await fetchHttp(`http://127.0.0.1:${testPort}/`, { method: "HEAD" });
      if (res.status === 302) {
        started = true;
        break;
      }
    } catch {}
  }
  assert.ok(started, "serve-miniapp 未能在预定时间内启动");

  // 1. 根路径 -> 302 重定向到 /test-store/2c/
  const rootRes = await fetchHttp(`http://127.0.0.1:${testPort}/`);
  assert.equal(rootRes.status, 302, "根路径应 302 重定向");
  assert.equal(rootRes.headers.location, `/${testSlug}/2c/`, "应重定向至 /<slug>/2c/");

  // 2. 缺少结尾斜杠 /test-store/2c -> 308 重定向
  const noSlashRes = await fetchHttp(`http://127.0.0.1:${testPort}/${testSlug}/2c`);
  assert.equal(noSlashRes.status, 308, "缺少结尾斜杠应 308 重定向");
  assert.equal(noSlashRes.headers.location, `/${testSlug}/2c/`, "应重定向至带斜杠的路径");

  // 3. 规范路径 /2c -> 308 重定向
  const noSlash2c = await fetchHttp(`http://127.0.0.1:${testPort}/2c`);
  assert.equal(noSlash2c.status, 308, "/2c 应 308 重定向至 /2c/");
  assert.equal(noSlash2c.headers.location, "/2c/");

  // 4. 标准入口 /test-store/2c/ -> 200 返回 index.html
  const slugPortalRes = await fetchHttp(`http://127.0.0.1:${testPort}/${testSlug}/2c/`);
  assert.equal(slugPortalRes.status, 200);
  assert.ok(slugPortalRes.body.includes("Mall Ready"), "应返回包含 index.html 的内容");
  assert.ok(slugPortalRes.headers["content-type"].includes("text/html"));

  // 5. 兼容规范入口 /2c/ -> 200 返回 index.html
  const portal2cRes = await fetchHttp(`http://127.0.0.1:${testPort}/2c/`);
  assert.equal(portal2cRes.status, 200);
  assert.ok(portal2cRes.body.includes("Mall Ready"));

  // 6. 静态资产读取 /test-store/2c/assets/app.js -> 200 application/javascript
  const assetRes = await fetchHttp(`http://127.0.0.1:${testPort}/${testSlug}/2c/assets/app.js`);
  assert.equal(assetRes.status, 200);
  assert.equal(assetRes.body, jsContent);
  assert.ok(assetRes.headers["content-type"].includes("application/javascript"));

  // 7. 静态资产防 SPA 伪 200：请求不存在的静态资产 -> 404 JSON
  const missingAssetRes = await fetchHttp(`http://127.0.0.1:${testPort}/${testSlug}/2c/assets/not-found.js`);
  assert.equal(missingAssetRes.status, 404, "不存在的资产严禁回落 200 HTML");
  assert.ok(missingAssetRes.headers["content-type"].includes("application/json"));

  // 8. 客户端前端路由 (SPA Fallback) -> 200 HTML
  const spaRouteRes = await fetchHttp(`http://127.0.0.1:${testPort}/${testSlug}/2c/pages/goods/list`);
  assert.equal(spaRouteRes.status, 200);
  assert.ok(spaRouteRes.body.includes("Mall Ready"), "前端路由应正常回吐 index.html");
});
