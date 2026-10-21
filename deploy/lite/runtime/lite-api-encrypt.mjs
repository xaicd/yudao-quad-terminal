/**
 * deploy/lite/runtime/lite-api-encrypt.mjs
 *
 * yudao 原生 ApiEncrypt 的客户端实现（供 lite 探活按真实契约发起调用）
 *
 * 后端契约（源码：yudao-spring-boot-starter-web/.../encrypt/）：
 * - 请求头名默认 `X-Api-Encrypt`；该头非空 ⇒ 后端认为请求体已加密并解密
 *   （见 ApiEncryptFilter：requestEnable 为真且头为空时直接抛「请求未包含加密标头」）
 * - 对称加密算法 AES：Hutool SecureUtil.aes(utf8Bytes(key)) ⇒ AES/ECB/PKCS5Padding
 *   （application.yaml 的 request-key/response-key 为 32 字节 ⇒ AES-256-ECB）
 * - 请求体：ApiDecryptRequestWrapper 用 SymmetricDecryptor.decrypt(String)，
 *   而 Hutool 的该重载会「HEX 优先、否则 BASE64」解码 ⇒ 本实现发 HEX（无歧义）
 * - 响应体：ApiEncryptResponseWrapper 用 encryptBase64(body) ⇒ BASE64
 *
 * 之所以实现加密而不是在 lite 档关掉它：蓝图（AGENTS 侧）刻意开启 yudao.api-encrypt，
 * 底座的价值就在于让下游项目/Agent 面对的是**真实契约**，顺带把该链路一并验证。
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const APPLICATION_YAML = "apps/backend/yudao-server/src/main/resources/application.yaml";

const ENV_OVERRIDE = {
  requestKey: "LITE_API_ENCRYPT_REQUEST_KEY",
  responseKey: "LITE_API_ENCRYPT_RESPONSE_KEY",
  header: "LITE_API_ENCRYPT_HEADER",
};

/** 从子模块内实际被加载的 application.yaml 读取 api-encrypt 配置（只读，不改） */
export function readEncryptConfig(rootDir) {
  const file = path.join(rootDir, APPLICATION_YAML);
  const lines = fs.readFileSync(file, "utf8").split("\n");

  // 按缩进收集 `api-encrypt:` 块（同块内被注释掉的 RSA 示例行以 # 开头，天然被跳过）
  let blockIndent = null;
  const blockLines = [];
  for (const line of lines) {
    if (blockIndent === null) {
      const m = line.match(/^(\s*)api-encrypt:\s*(?:#.*)?$/);
      if (m) blockIndent = m[1].length;
      continue;
    }
    if (line.trim() === "") {
      blockLines.push(line);
      continue;
    }
    const indent = line.match(/^\s*/)[0].length;
    if (indent > blockIndent) {
      blockLines.push(line);
      continue;
    }
    break; // 缩进回退 ⇒ 块结束
  }

  const pick = (key) => {
    for (const line of blockLines) {
      const m = line.match(new RegExp(`^\\s*${key}:\\s*([^\\s#]+)`));
      if (m) return m[1].replace(/^["']|["']$/g, "");
    }
    return null;
  };

  const enabledRaw = pick("enable");

  return {
    enabled: enabledRaw === null ? true : enabledRaw === "true",
    header: process.env[ENV_OVERRIDE.header] || pick("header") || "X-Api-Encrypt",
    algorithm: pick("algorithm") || "AES",
    requestKey: process.env[ENV_OVERRIDE.requestKey] || pick("request-key"),
    responseKey: process.env[ENV_OVERRIDE.responseKey] || pick("response-key"),
  };
}

function assertAes(config) {
  if (!/^AES$/i.test(config.algorithm)) {
    throw new Error(`lite 探活暂只支持 AES（当前配置: ${config.algorithm}）`);
  }
  for (const [name, key] of [
    ["requestKey", config.requestKey],
    ["responseKey", config.responseKey],
  ]) {
    if (!key) throw new Error(`api-encrypt.${name} 未取到，无法按真实契约探活`);
    const len = Buffer.byteLength(key, "utf8");
    if (![16, 24, 32].includes(len)) {
      throw new Error(`api-encrypt.${name} 长度 ${len} 非法（AES 要求 16/24/32 字节）`);
    }
  }
}

/** 加密请求体 → HEX（Hutool 侧 HEX 优先解码，无歧义） */
export function encryptRequest(plaintext, config) {
  assertAes(config);
  const cipher = crypto.createCipheriv(
    `aes-${Buffer.byteLength(config.requestKey, "utf8") * 8}-ecb`,
    Buffer.from(config.requestKey, "utf8"),
    null
  );
  return Buffer.concat([cipher.update(Buffer.from(plaintext, "utf8")), cipher.final()]).toString("hex");
}

/** 解密响应体（BASE64 → UTF-8 明文） */
export function decryptResponse(base64, config) {
  assertAes(config);
  const decipher = crypto.createDecipheriv(
    `aes-${Buffer.byteLength(config.responseKey, "utf8") * 8}-ecb`,
    Buffer.from(config.responseKey, "utf8"),
    null
  );
  return Buffer.concat([
    decipher.update(Buffer.from(base64, "base64")),
    decipher.final(),
  ]).toString("utf8");
}
