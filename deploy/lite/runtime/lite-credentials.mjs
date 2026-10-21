/**
 * deploy/lite/runtime/lite-credentials.mjs
 *
 * lite 档的「零弱默认凭据」引导模块
 *
 * 硬约束（用户明确要求，已记入项目 taste）：
 * - 禁止 admin123 这类弱密码；
 * - 禁止 admin / root / test 这类可猜用户名；
 * - 不得依赖上游种子里的默认账号；
 * - 用户名与密码都必须由 CSPRNG 生成高熵值，凭据文件 0600 且 gitignored，只回显一次。
 *
 * 与 cooliebase-all 的「零默认凭据体系 (Zero Default Credentials)」保持一致的做法。
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const RUNTIME_DIR = path.dirname(fileURLToPath(import.meta.url));
const requireFromRuntime = createRequire(path.join(RUNTIME_DIR, "package.json"));

/** 凭据文件（相对仓库根）；已加入 .gitignore 的 .commandcode/lite/ 之下 */
export const CREDENTIALS_FILE = ".commandcode/lite/credentials.env";

/** BCrypt 代价因子：上游 Seed 用的是 04（过弱），引导凭据统一用 10 */
const BCRYPT_COST = 10;

/** 去掉 0/O/1/l/I 等易混字符，避免人工抄录出错；同时保持纯字母数字以符合账号校验 */
const USERNAME_ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";
/** 口令字符集：去掉 % # * = ^ 等在 shell / URL 里易被转义的字符，熵仍远超需要 */
const PASSWORD_ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@-_.+";

/**
 * 账号格式的硬约束来自 yudao 的 AuthLoginReqVO：
 *   @Length(min=4, max=30) @Pattern(regexp = "^[a-zA-Z0-9]{4,30}$")
 * ⇒ 前缀不能带下划线等符号。
 */
export const USERNAME_PREFIX = "ops";
export const USERNAME_RANDOM_LENGTH = 12;

/**
 * 登录口令的硬上限同样来自 AuthLoginReqVO：@Length(min=4, max=16)。
 * 注意：这是「登录请求」的校验，超过 16 位会被直接判为参数不合法，与库里的哈希无关。
 */
export const ADMIN_PASSWORD_LENGTH = 16;
/** Redis 口令无此限制（requirepass 不限长），用更长值 */
export const REDIS_PASSWORD_LENGTH = 32;

/** 无取模偏置的 CSPRNG 取样（拒绝采样） */
function randomFromAlphabet(alphabet, length) {
  const limit = 256 - (256 % alphabet.length);
  let out = "";
  while (out.length < length) {
    for (const byte of crypto.randomBytes(length)) {
      if (byte < limit && out.length < length) out += alphabet[byte % alphabet.length];
    }
  }
  return out;
}

/** 高熵用户名：ops + 12 位字母数字（不含下划线，符合 ^[a-zA-Z0-9]{4,30}$；也不含 admin/root/test 等可猜值） */
export function generateUsername() {
  const username = `${USERNAME_PREFIX}${randomFromAlphabet(USERNAME_ALPHABET, USERNAME_RANDOM_LENGTH)}`;
  // 自检：历史上生成过带下划线的账号，被后端 @Pattern 拒绝；这里直接拦住，避免静默产出不可登录的凭据
  if (!/^[a-zA-Z0-9]{4,30}$/.test(username)) {
    throw new Error(`生成的账号不满足 ^[a-zA-Z0-9]{4,30}$ 校验: "${username}"`);
  }
  return username;
}

/** 高熵口令 */
export function generatePassword(length = 24) {
  return randomFromAlphabet(PASSWORD_ALPHABET, length);
}

export function hashPassword(password) {
  return requireFromRuntime("bcryptjs").hashSync(password, BCRYPT_COST);
}

export function verifyPassword(password, hash) {
  return requireFromRuntime("bcryptjs").compareSync(password, hash);
}

function parseEnvFile(text) {
  const out = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx > 0) out[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
  }
  return out;
}

/**
 * 读取或生成引导凭据。
 * 已存在且未要求轮换时复用（保证多次启动的登录凭据稳定）。
 */
export function loadOrCreateCredentials(rootDir, { rotate = false } = {}) {
  const abs = path.join(rootDir, CREDENTIALS_FILE);
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  if (!rotate && fs.existsSync(abs)) {
    const env = parseEnvFile(fs.readFileSync(abs, "utf8"));
    if (env.LITE_ADMIN_USERNAME && env.LITE_ADMIN_PASSWORD) {
      // 兼容早期只含管理员凭据的文件：补生成 Redis 口令并回写（Redis 同样不允许弱/空口令）
      let redisPassword = env.LITE_REDIS_PASSWORD;
      if (!redisPassword) {
        redisPassword = generatePassword();
        fs.appendFileSync(abs, `LITE_REDIS_PASSWORD=${redisPassword}\n`, { mode: 0o600 });
      }
      return {
        username: env.LITE_ADMIN_USERNAME,
        password: env.LITE_ADMIN_PASSWORD,
        redisPassword,
        created: false,
        file: abs,
        credentialsFileMode: (fs.statSync(abs).mode & 0o777).toString(8),
      };
    }
  }

  const username = generateUsername();
  // 管理员口令必须满足登录 VO 的 max=16；Redis 口令无此限制，用更长值
  const password = generatePassword(ADMIN_PASSWORD_LENGTH);
  const redisPassword = generatePassword(REDIS_PASSWORD_LENGTH);

  fs.writeFileSync(
    abs,
    [
      "# yudao lite 档引导凭据 —— CSPRNG 生成，严禁提交（.commandcode/lite/ 已 gitignore）",
      "# 轮换: node scripts/lite-up.mjs --rotate-credentials",
      "# 说明: 不使用 admin/admin123 这类弱默认凭据；上游种子里的 admin 账号会被本档重命名并改写密码。",
      `LITE_ADMIN_USERNAME=${username}`,
      `LITE_ADMIN_PASSWORD=${password}`,
      `LITE_REDIS_PASSWORD=${redisPassword}`,
      "",
    ].join("\n"),
    { mode: 0o600 }
  );
  fs.chmodSync(abs, 0o600); // 显式再收紧一次，避免 umask 影响

  return {
    username,
    password,
    redisPassword,
    created: true,
    file: abs,
    credentialsFileMode: "600",
  };
}

/** 把 DB 里的引导账号改成生成的高熵凭据，并关闭上游种子里的其余弱演示账号 */
export async function applyBootstrapCredentials(client, { username, password, disableSeededUsers = true }) {
  const hash = hashPassword(password);
  const res = await client.query(
    "UPDATE system_users SET username = $1, password = $2 WHERE id = 1 RETURNING id, username",
    [username, hash]
  );
  if (res.rowCount !== 1) {
    throw new Error(`引导账号(id=1)更新失败，影响行数=${res.rowCount}`);
  }

  let disabled = 0;
  if (disableSeededUsers) {
    const d = await client.query("UPDATE system_users SET status = 1 WHERE id <> 1 AND status = 0");
    disabled = d.rowCount;
  }

  return { hash, disabledSeededUsers: disabled, username: res.rows[0].username };
}
