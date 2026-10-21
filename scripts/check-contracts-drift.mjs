#!/usr/bin/env node
/**
 * scripts/check-contracts-drift.mjs
 *
 * 前后端契约防漂移静态检测器
 *
 * 设计原则：**宁可少报，不可乱报**。
 * 一个天天喊狼来了的检测器会训练团队忽略它，比没有检测器更糟。
 * 因此本版修掉了旧版三个系统性假阳性来源：
 *   1. 未归一化查询串：前端 `/ai/workflow/get?id=` vs 后端 `/ai/workflow/get` 曾被判为"孤儿"；
 *   2. 正则跨函数作用域：旧版用 `[\s\S]*?url:` 跨越了多个函数体，把相邻 `request.delete(...)`
 *      误配给别的 url，产生大量假的"动词不符"；
 *   3. 无法静态解析的动态 URL（含 `${...}`）曾被当成孤儿；现在单独统计。
 *
 * 用法：
 *   node scripts/check-contracts-drift.mjs            # 报告偏移，非阻断（未封装接口不算错）
 *   node scripts/check-contracts-drift.mjs --strict   # 后端未在前端封装也算偏移
 *   node scripts/check-contracts-drift.mjs --json     # 机器可读（门禁/MCP 消费）
 *
 * 退出码：0 无偏移；1 存在偏移（孤儿 / 动词不符 / strict 下的未封装）；2 用法错误
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const isStrict = args.includes("--strict");
const asJson = args.includes("--json");
if (args.includes("--help") || args.includes("-h")) {
  console.log("用法: node scripts/check-contracts-drift.mjs [--strict] [--json]");
  process.exit(0);
}

/** 路径归一化：补前导斜杠、去查询串/哈希、折叠斜杠、去尾斜杠 */
function normalizePath(p) {
  if (!p) return "/";
  let out = String(p).trim();
  out = out.split("#")[0];
  out = out.split("?")[0];
  // 后端存在 @RequestMapping("system/sms-channel") 这种无前导斜杠的写法
  if (!out.startsWith("/")) out = `/${out}`;
  out = out.replace(/\/{2,}/g, "/");
  if (out.length > 1 && out.endsWith("/")) out = out.slice(0, -1);
  return out || "/";
}

function findFiles(dir, filterRegex, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) findFiles(fullPath, filterRegex, fileList);
    else if (entry.isFile() && filterRegex.test(entry.name)) fileList.push(fullPath);
  }
  return fileList;
}

/** 后端：路径 → 允许的方法集合（同一路径可能同时有 GET/POST，或一个注解挂多个路径别名） */
function scanBackendEndpoints() {
  const endpoints = new Map();
  const files = findFiles(path.join(ROOT, "apps/backend"), /Controller\.java$/);

  const add = (fullPath, method, relFile) => {
    const p = normalizePath(fullPath);
    const existing = endpoints.get(p);
    if (existing) existing.methods.add(method);
    else endpoints.set(p, { path: p, methods: new Set([method]), file: relFile });
  };

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const relFile = path.relative(ROOT, file);
    const classMapping = content.match(/@RequestMapping\s*\(\s*(?:value\s*=\s*)?\{?\s*["']([^"']+)["']/);
    const basePath = classMapping ? classMapping[1] : "";

    // 捕获整个注解体，支持 @GetMapping({"/list-all-simple", "simple-list"}) 这类多路径别名
    const mappingRegex = /@(Get|Post|Put|Delete|Patch)Mapping\s*(?:\(\s*([^)]*)\))?/g;
    let m;
    while ((m = mappingRegex.exec(content)) !== null) {
      const method = m[1].toUpperCase();
      const body = m[2] || "";
      const quoted = [...body.matchAll(/["']([^"']+)["']/g)]
        .map((x) => x[1])
        // 排除 produces/consumes 之类的媒体类型字符串
        .filter((v) => !/^(application|text|multipart|image)\//.test(v));
      const subs = quoted.length > 0 ? quoted : [""];
      for (const sub of subs) add(`${basePath}/${sub}`, method, relFile);
    }
  }
  return endpoints;
}

/**
 * 前端：只匹配「同一次调用」内的 method + url，避免跨函数误配。
 *
 * 本仓前端真实形态（yudao admin 约定）：
 *   request.get({ url: '/x', params })      ← 主形态：verb 方法 + 对象参数
 *   request.delete({ url: `/x?id=${id}` })  ← 模板串
 *   request.get('/x')                       ← 字符串直传
 *   request({ url: '/x', method: 'POST' })  ← 对象直传
 */
function scanFrontendRoutes() {
  const files = [
    ...findFiles(path.join(ROOT, "apps/admin/src/api"), /\.ts$/),
    ...findFiles(path.join(ROOT, "packages/api-client/src"), /\.ts$/),
  ];

  const routes = new Map();
  const dynamic = [];

  const record = (url, method, relFile) => {
    // 先归一化（去查询串/哈希）：`/x?id=' + id` 与 `/x?id=${id}` 的路径部分都是 `/x`
    const key = normalizePath(url);
    if (key.includes("${") || key.includes("+")) {
      dynamic.push({ path: key, method, file: relFile });
      return;
    }
    const existing = routes.get(key);
    if (existing) existing.methods.add(method);
    else routes.set(key, { path: key, methods: new Set([method]), file: relFile });
  };

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const relFile = path.relative(ROOT, file);

    // request.<verb>( ... )：verb ∈ get/post/put/delete/patch/download（download 等价 GET）
    const verbCall = /request\s*\.\s*(get|post|put|delete|patch|download)\s*(?:<[^>]*>)?\s*\(\s*/g;
    let m;
    while ((m = verbCall.exec(content)) !== null) {
      const window = content.slice(verbCall.lastIndex, verbCall.lastIndex + 300);
      const urlMatch =
        window.match(/url\s*:\s*(['"`])([^'"`]*)\1/) || window.match(/^(['"`])([^'"`]*)\1/);
      if (urlMatch) {
        // download 语义上是 GET（导出/下载）
        const verb = m[1].toLowerCase() === "download" ? "GET" : m[1].toUpperCase();
        record(urlMatch[2], verb, relFile);
      }
    }

    // request({ url, method })
    const directCall = /request\s*(?:<[^>]*>)?\s*\(\s*(?=\{)/g;
    while ((m = directCall.exec(content)) !== null) {
      const window = content.slice(directCall.lastIndex, directCall.lastIndex + 300);
      const urlMatch = window.match(/url\s*:\s*(['"`])([^'"`]*)\1/);
      const methodMatch = window.match(/method\s*:\s*['"](\w+)['"]/);
      if (urlMatch) record(urlMatch[2], (methodMatch ? methodMatch[1] : "GET").toUpperCase(), relFile);
    }
  }

  return { routes, dynamic };
}

function main() {
  const backend = scanBackendEndpoints();
  const frontend = scanFrontendRoutes();

  const missingInFrontend = [];
  const orphanInFrontend = [];
  const methodMismatches = [];

  for (const [p, ep] of backend.entries()) {
    if (p.includes("/infra/health")) continue;
    const fe = frontend.routes.get(p);
    if (!fe) missingInFrontend.push(ep);
    else if (![...fe.methods].some((m) => ep.methods.has(m))) {
      methodMismatches.push({ backend: ep, frontend: fe });
    }
  }
  for (const [p, fe] of frontend.routes.entries()) {
    if (!backend.has(p)) orphanInFrontend.push(fe);
  }

  // 未封装接口属于常态（后端路由数远多于前端已接入页面），只有 --strict 才算偏移
  const hasDrift = orphanInFrontend.length > 0 || methodMismatches.length > 0 || (isStrict && missingInFrontend.length > 0);

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          strict: isStrict,
          hasDrift,
          counts: {
            backendEndpoints: backend.size,
            frontendRoutes: frontend.routes.size,
            missingInFrontend: missingInFrontend.length,
            orphanInFrontend: orphanInFrontend.length,
            methodMismatches: methodMismatches.length,
            dynamicUrlsSkipped: frontend.dynamic.length,
          },
          missingInFrontend: isStrict ? missingInFrontend.slice(0, 500) : undefined,
          orphanInFrontend: orphanInFrontend.slice(0, 500).map((r) => ({ path: r.path, methods: [...r.methods], file: r.file })),
          methodMismatches: methodMismatches.slice(0, 500).map((x) => ({
            path: x.backend.path,
            backendMethods: [...x.backend.methods],
            frontendMethods: [...x.frontend.methods],
            backendFile: x.backend.file,
            frontendFile: x.frontend.file,
          })),
        },
        null,
        2
      )
    );
    process.exit(hasDrift ? 1 : 0);
  }

  console.log("================================================================");
  console.log("📡 前后端契约防漂移检测（已归一化查询串 / 收紧方法作用域）");
  console.log("================================================================");
  console.log(`- 后端暴露路由: ${backend.size} 个`);
  console.log(`- 前端封装路由: ${frontend.routes.size} 个（另有 ${frontend.dynamic.length} 处动态 URL 无法静态解析，已跳过）`);
  console.log(
    `- 结论: 孤儿 ${orphanInFrontend.length} / 动词不符 ${methodMismatches.length} / 未封装 ${missingInFrontend.length}（未封装属常态，不计偏移）`
  );
  console.log(`\n--- 审计结果 ---`);

  if (methodMismatches.length > 0) {
    console.log(`\n❌ HTTP 动词不匹配 (${methodMismatches.length} 个):`);
    for (const x of methodMismatches) {
      console.log(
        `   - ${x.backend.path} | 后端 ${[...x.backend.methods].join("/")} (${x.backend.file}) vs 前端 ${[...x.frontend.methods].join("/")} (${x.frontend.file})`
      );
    }
  }

  if (orphanInFrontend.length > 0) {
    console.log(`\n❌ 前端调用但后端未暴露 (${orphanInFrontend.length} 个，404 风险):`);
    for (const r of orphanInFrontend.slice(0, 30)) {
      console.log(`   - [${[...r.methods].join("/")}] ${r.path} (${r.file})`);
    }
    if (orphanInFrontend.length > 30) console.log(`   … 其余 ${orphanInFrontend.length - 30} 个省略`);
  }

  if (missingInFrontend.length > 0) {
    const label = isStrict ? "⚠️ 后端已暴露但前端未封装" : "ℹ️ 后端已暴露但前端未封装（非阻断，--strict 才计偏移）";
    console.log(`\n${label} (${missingInFrontend.length} 个):`);
    for (const ep of missingInFrontend.slice(0, 10)) {
      console.log(`   - ${ep.path} [${[...ep.methods].join("/")}]`);
    }
    if (missingInFrontend.length > 10) console.log(`   … 其余 ${missingInFrontend.length - 10} 个省略`);
  }

  console.log("\n================================================================");
  if (!hasDrift) {
    console.log("✅ 无契约漂移（孤儿 0 / 动词不符 0）");
  } else {
    console.log(
      `❌ 契约漂移：孤儿 ${orphanInFrontend.length} / 动词不符 ${methodMismatches.length}` +
        (isStrict ? ` / 未封装 ${missingInFrontend.length}（strict）` : "")
    );
  }
  console.log("================================================================");
  process.exit(hasDrift ? 1 : 0);
}

main();
