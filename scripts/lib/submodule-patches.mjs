/**
 * scripts/lib/submodule-patches.mjs —— 子模块差异补丁的**真源逻辑**（纯函数，便于测试）
 *
 * 背景（方案 B）：本仓的 ApiEncrypt「开箱即用」需要改两处子模块源码/配置，
 * 但子模块是第三方只读上游，钉在**本地提交**上会让别人 clone 不到该对象。
 * 因此差异一律落主仓 `deploy/patches/<submodule>/*.patch`，
 * 子模块指针保持纯上游提交，运行时/构建时用 `pnpm patch:apply` 注入。
 *
 * 由此产生的新不变式（取代旧的"子模块零改动"）：
 *   子模块工作区的改动，必须**恰好等于**声明的补丁集合；不得有额外手改。
 */

import fs from "node:fs";
import path from "node:path";

/** 每个子模块的补丁目录（真源） */
export const PATCH_SETS = [
  { submodule: "backend", dir: "apps/backend", patchDir: "deploy/patches/backend" },
  { submodule: "admin", dir: "apps/admin", patchDir: "deploy/patches/admin" },
];

/** 从补丁正文里解析出它触碰的文件列表 */
export function parsePatchFiles(text) {
  const files = new Set();
  for (const line of String(text || "").split("\n")) {
    const m = /^\+\+\+ b\/(.+)$/.exec(line);
    if (!m) continue;
    if (m[1] === "/dev/null") continue;
    files.add(m[1].trim());
  }
  return [...files].sort();
}

/** 从 `git status --porcelain` 输出里取出被改动的路径 */
export function parsePorcelainPaths(text) {
  const out = new Set();
  for (const raw of String(text || "").split("\n")) {
    if (!raw.trim()) continue;

    // porcelain v1 是 `XY<space>PATH`；但调用方若对 stdout 做了 trim，首行会变成 `Y<space>PATH`
    // （真实踩过的坑：无脑 slice(3) 会砍掉路径首字符，yudao-… 变 udao-…），故两种形态都识别。
    let p;
    if (/^[ MADRCU?!]{2} /.test(raw)) p = raw.slice(3);
    else if (/^[MADRCU?!] /.test(raw)) p = raw.slice(2);
    else p = raw.trim();

    p = p.trim();
    const arrow = p.indexOf(" -> ");
    if (arrow >= 0) p = p.slice(arrow + 4).trim();
    if (p.startsWith('"') && p.endsWith('"')) p = p.slice(1, -1);
    if (p) out.add(p);
  }
  return [...out].sort();
}

/** 读取某个补丁目录下的补丁清单（按文件名排序，保证应用顺序稳定） */
export function listPatches(rootDir, patchDir) {
  const abs = path.join(rootDir, patchDir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((n) => n.endsWith(".patch"))
    .sort()
    .map((n) => {
      const rel = path.posix.join(patchDir, n);
      const text = fs.readFileSync(path.join(abs, n), "utf8");
      return { name: n, rel, abs: path.join(abs, n), files: parsePatchFiles(text) };
    });
}

/**
 * 判定补丁集是否处于合法状态（纯函数）：
 * - 每个补丁要么已应用（applied），要么可干净应用（applicable）；conflict 即失败；
 * - 子模块工作区里不允许出现补丁之外的改动（防手改/漂移）。
 */
export function evaluatePatchState({ submodule, states, dirtyPaths }) {
  const problems = [];

  for (const s of states) {
    if (s.state === "conflict") problems.push(`${submodule}: 补丁 ${s.name} 既不能应用也不能反向应用（可能目标已变动）`);
  }

  const declared = new Set(states.flatMap((s) => s.files));
  for (const p of dirtyPaths) {
    if (!declared.has(p)) problems.push(`${submodule}: 存在补丁未声明的改动 ${p}`);
  }

  const appliedCount = states.filter((s) => s.state === "applied").length;
  return {
    ok: problems.length === 0,
    problems,
    appliedCount,
    total: states.length,
    declaredFiles: [...declared].sort(),
  };
}
