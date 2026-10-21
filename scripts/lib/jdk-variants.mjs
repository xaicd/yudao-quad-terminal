/**
 * scripts/lib/jdk-variants.mjs —— JDK 变体矩阵的**唯一真源**（纯函数，无副作用，便于测试）
 *
 * 上游事实（YunaiV/yudao-cloud，已核实）：
 *   - 分支只有 `master-jdk17`（默认 HEAD）与 `master`；
 *   - **没有** `master-jdk8` / `master-jdk21` / `master-jdk25` 分支；
 *   - JDK 8/11、17/21、25 三个变体是用**标签**承载的：`v2026.09(jdk8/11)`、`v2026.09(jdk17/21)`、`v2026.09(jdk25)`。
 *
 * 因此本文件用「分支名」或「标签模式」声明变体，"最新"由标签版本号比较动态求得，
 * 而不是把某个 SHA 或版本号硬编码进文档（那种写法必然过期，且无法机器验证）。
 */

export const DEFAULT_VARIANT = "jdk17-21";

/**
 * 变体矩阵。
 * - refKind=branch：优先用分支（上游可能只有分支没标签），可带 fallbackTagPattern 回退到最新标签；
 * - refKind=tagPattern：上游没有该分支，只能从标签里挑最新。
 * javaTargets / springBoot 用于**反向核对**：门禁会读该 ref 的 pom 实测值来验证声明，防止「名字与内容不符」。
 */
export const VARIANTS = [
  {
    id: "jdk17-21",
    label: "JDK 17 / 21（默认基准）",
    refKind: "branch",
    refName: "master-jdk17",
    javaTargets: ["17", "21"],
    javaVersion: "17 或 21",
    springBoot: "3.5.15",
    note: "商业交付默认档：Jakarta EE 10；JDK 21 与 17 同代码线，改 pom 的 java.version 即可启用虚拟线程",
  },
  {
    id: "jdk8-11",
    label: "JDK 8 / 11（存量政企）",
    refKind: "branch",
    refName: "master",
    fallbackTagPattern: "\\(jdk8\\/11\\)$",
    javaTargets: ["1.8", "8", "11"],
    javaVersion: "1.8 或 11",
    springBoot: "2.7.18",
    note: "老旧专网 / 遗留系统对接；注意上游该线的**分支名是 master**（无 master-jdk8），发布标签为 v*(jdk8/11)",
  },
  {
    id: "jdk25",
    label: "JDK 25（前沿预研）",
    refKind: "branch",
    refName: "master-jdk25",
    fallbackTagPattern: "\\(jdk25\\)$",
    javaTargets: ["25"],
    javaVersion: "25",
    springBoot: "4.1.0",
    note: "跟踪 Spring Boot 4.x 与下一代 LTS；注意上游是 jdk**25**（不存在 jdk21 分支）",
  },
];

/** 只校验「上游 ref 令牌」，避免把本仓分支名（如 main）误当成上游引用 */
export const DOC_REF_PATTERN = /`(master(?:-jdk\d+)?|v[0-9.]+\(jdk[^)]+\))`/g;

/** `v2026.09(jdk8/11)` → [2026, 9]；无法解析返回 null */
export function parseVersionName(name) {
  const m = /^v(\d+(?:\.\d+)*)/.exec(String(name || ""));
  if (!m) return null;
  return m[1].split(".").map(Number);
}

/** 数值段比较：a < b → -1，相等 → 0，a > b → 1 */
export function compareVersions(a, b) {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const x = a[i] ?? 0;
    const y = b[i] ?? 0;
    if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}

/** 从标签里挑出版本号最大的匹配项 */
export function newestTag(pattern, tags = []) {
  let re;
  try {
    re = new RegExp(pattern);
  } catch {
    return null;
  }
  const candidates = tags
    .filter((t) => re.test(t))
    .map((t) => ({ ref: t, version: parseVersionName(t) }))
    .filter((c) => c.version);
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => compareVersions(a.version, b.version));
  const best = candidates[candidates.length - 1];
  return { ref: best.ref, kind: "tag", version: best.version };
}

/**
 * 求某个变体的「最新」引用：分支优先，无分支时回退到最新标签。
 * @param {object} variant VARIANTS 中的一项
 * @param {{branches?: string[], tags?: string[]}} refs 子模块里实际存在的 ref 名
 * @returns {{ref: string, kind: "branch"|"tag", version: number[]|null} | null}
 */
export function latestRefFor(variant, refs = {}) {
  const { branches = [], tags = [] } = refs;

  if (variant.refKind === "branch") {
    if (branches.includes(variant.refName)) {
      return { ref: variant.refName, kind: "branch", version: parseVersionName(variant.refName) };
    }
    if (variant.fallbackTagPattern) return newestTag(variant.fallbackTagPattern, tags);
    return null;
  }

  return newestTag(variant.tagPattern, tags);
}

/** 全部变体的最新引用；解析不到的标 unresolved */
export function resolveVariants(refs = {}) {
  return VARIANTS.map((v) => ({ variant: v, resolved: latestRefFor(v, refs) }));
}

export function getVariant(id) {
  return VARIANTS.find((v) => v.id === id) || null;
}

/** 从文档文本里抽出所有「上游 ref 令牌」（去重排序） */
export function extractDocRefTokens(text) {
  const found = new Set();
  const pattern = new RegExp(DOC_REF_PATTERN.source, "g");
  for (const m of String(text || "").matchAll(pattern)) found.add(m[1]);
  return [...found].sort();
}
