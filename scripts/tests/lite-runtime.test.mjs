import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as cred from "../../deploy/lite/runtime/lite-credentials.mjs";
import * as enc from "../../deploy/lite/runtime/lite-api-encrypt.mjs";
import { classifyCommand } from "../lite-down.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/* ---------------- 凭据：零弱默认凭据 ---------------- */

test("生成的账号必须符合后端校验 ^[a-zA-Z0-9]{4,30}$（历史事故：下划线被拒）", () => {
  for (let i = 0; i < 50; i++) {
    assert.match(cred.generateUsername(), /^[a-zA-Z0-9]{4,30}$/);
  }
});

test("账号是 CSPRNG 生成，不重复且不含 admin/root/test 之类可猜值", () => {
  const set = new Set();
  for (let i = 0; i < 200; i++) set.add(cred.generateUsername());
  assert.ok(set.size >= 199, `200 次生成仅得到 ${set.size} 个不同账号`);
  for (const u of set) assert.doesNotMatch(u.toLowerCase(), /admin|root|test/);
});

test("口令长度可控（登录 VO 上限 16 / Redis 用 32）", () => {
  assert.equal(cred.generatePassword(16).length, 16);
  assert.equal(cred.generatePassword(32).length, 32);
  assert.equal(cred.ADMIN_PASSWORD_LENGTH, 16);
  assert.equal(cred.REDIS_PASSWORD_LENGTH, 32);
});

test("bcrypt 往返：正确口令通过，错误口令不通过", () => {
  const hash = cred.hashPassword("Abc123!x");
  assert.match(hash, /^\$2[aby]\$/);
  assert.equal(cred.verifyPassword("Abc123!x", hash), true);
  assert.equal(cred.verifyPassword("Abc123!y", hash), false);
});

test("凭据文件：权限 600、含管理员与 Redis 双口令、二次调用复用不重生成", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lite-cred-"));
  try {
    const a = cred.loadOrCreateCredentials(dir);
    assert.equal(a.created, true);
    assert.equal(fs.statSync(a.file).mode & 0o777, 0o600, "凭据文件必须是 0600");

    const text = fs.readFileSync(a.file, "utf8");
    assert.match(text, /LITE_ADMIN_USERNAME=/);
    assert.match(text, /LITE_ADMIN_PASSWORD=/);
    assert.match(text, /LITE_REDIS_PASSWORD=/);

    const b = cred.loadOrCreateCredentials(dir);
    assert.equal(b.created, false, "已存在时应复用而非轮换");
    assert.equal(b.username, a.username);
    assert.equal(b.password, a.password);
    assert.equal(b.redisPassword, a.redisPassword);

    const rotated = cred.loadOrCreateCredentials(dir, { rotate: true });
    assert.equal(rotated.created, true, "--rotate 必须重新生成");
    assert.notEqual(rotated.username, a.username);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/* ---------------- ApiEncrypt：按真实契约 ---------------- */

test("读取 ApiEncrypt 配置：AES + 两把不同的 32 字节密钥", () => {
  const c = enc.readEncryptConfig(ROOT);
  assert.equal(c.enabled, true);
  assert.equal(c.header, "X-Api-Encrypt");
  assert.equal(c.algorithm, "AES");
  assert.equal(Buffer.byteLength(c.requestKey, "utf8"), 32);
  assert.equal(Buffer.byteLength(c.responseKey, "utf8"), 32);
  assert.notEqual(c.requestKey, c.responseKey, "请求与响应密钥不应相同");
});

test("加密 → 解密往返（同密钥）保持原文", () => {
  const c = enc.readEncryptConfig(ROOT);
  const sameKey = { ...c, responseKey: c.requestKey };
  const plain = JSON.stringify({ username: "u1", password: "p1" });

  const hex = enc.encryptRequest(plain, sameKey);
  assert.match(hex, /^[0-9a-f]+$/, "请求体应输出 HEX（Hutool 侧 HEX 优先解码）");

  const back = enc.decryptResponse(Buffer.from(hex, "hex").toString("base64"), sameKey);
  assert.equal(back, plain);
});

test("错误密钥不得静默返回原文（必须报错或解出不同内容）", () => {
  const c = enc.readEncryptConfig(ROOT);
  const hex = enc.encryptRequest("hello", c);
  const wrongKey = { ...c, responseKey: "0".repeat(32) };

  let out = null;
  try {
    out = enc.decryptResponse(Buffer.from(hex, "hex").toString("base64"), wrongKey);
  } catch {
    out = null;
  }
  assert.notEqual(out, "hello");
});

test("配置非法（非 AES）时必须抛错而不是悄悄降级", () => {
  assert.throws(() => enc.encryptRequest("x", { enabled: true, algorithm: "RSA", requestKey: "a".repeat(32), responseKey: "b".repeat(32) }));
});

/* ---------------- lite-down：进程归类的安全边界 ---------------- */

test("classifyCommand 能识别本仓四类残留", () => {
  assert.equal(classifyCommand("/r/.commandcode/lite/bin/redis-7.4.1-redis-server-7.4.1-darwin-arm64 127.0.0.1:63799"), "redis");
  assert.equal(classifyCommand("/r/deploy/lite/runtime/node_modules/x/native/bin/postgres -D /r/.commandcode/lite/pgdata -p 55432"), "postgres");
  assert.equal(classifyCommand("java -cp /r/apps/backend/yudao-server/target/yudao-server.jar org.springframework.boot.loader.launch.JarLauncher"), "app");
  assert.equal(classifyCommand("node scripts/lite-up.mjs"), "orchestrator");
});

test("classifyCommand 必须排除 shell 包装器（真实事故：曾误杀测试 shell）", () => {
  assert.equal(classifyCommand("/bin/sh -c 'cd /r && node scripts/lite-up.mjs'"), null);
  assert.equal(classifyCommand('bash -c "grep -r .commandcode/lite/bin/redis-server"'), null);
});

test("classifyCommand 不得误杀其他项目的 postgres（如 coolie 的 paperclip 实例）", () => {
  assert.equal(
    classifyCommand("/Users/x/.paperclip/instances/default/db/bin/postgres -D /Users/x/.paperclip/instances/default/db -p 54329"),
    null
  );
  assert.equal(classifyCommand(""), null);
  assert.equal(classifyCommand(undefined), null);
});
