#!/usr/bin/env node
/**
 * scripts/check-contracts-drift.mjs
 *
 * 前后端契约防漂移静态检测器
 *
 * 设计原则：**宁可少报，不可乱报；区分只读上游子模块基线与新增工程漂移**。
 * 1. 未归一化查询串：前端 `/ai/workflow/get?id=` vs 后端 `/ai/workflow/get` 归一化对齐；
 * 2. 收紧方法作用域：只匹配同一次调用内的 method + url，避免跨函数误配假阳性；
 * 3. 动态 URL（含 `${...}`）单独统计；
 * 4. `apps/admin` 与 `apps/backend` 为只读上游子模块（AGENTS.md §0.1 / §0.4），
 *    已知的 92 条上游子模块版本差路由固化于 `scripts/lib/upstream-contract-baseline.json`，
 *    透明报告为 `upstreamBaselineOrphans`，不混入业务契约漂移；
 *    任何新增孤儿路由（如 `packages/api-client` 或非基线路径）或任何 HTTP 动词不符仍严格以 exit 1 阻断！
 *
 * 用法：
 *   node scripts/check-contracts-drift.mjs                    # 默认启用上游只读子模块基线过滤
 *   node scripts/check-contracts-drift.mjs --no-baseline      # 禁用基线过滤（同 --strict-upstream），用于上游全量审计
 *   node scripts/check-contracts-drift.mjs --strict-upstream  # 禁用基线过滤，原始上游孤儿亦计入 exit 1
 *   node scripts/check-contracts-drift.mjs --strict           # 后端未在前端封装也算偏移
 *   node scripts/check-contracts-drift.mjs --json             # 机器可读（门禁/PMO/MCP 消费）
 *
 * 退出码：0 无偏移；1 存在偏移（新增孤儿 / 动词不符 / strict 下的未封装 / no-baseline 下的上游孤儿）；2 用法错误
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_ROOT = path.resolve(__dirname, "..");
const DEFAULT_BASELINE_PATH = path.join(__dirname, "lib", "upstream-contract-baseline.json");

/** 路径归一化：补前导斜杠、去查询串/哈希、折叠斜杠、去尾斜杠 */
export function normalizePath(p) {
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
export function scanBackendEndpoints(rootDir = DEFAULT_ROOT) {
  const endpoints = new Map();
  const files = findFiles(path.join(rootDir, "apps/backend"), /Controller\.java$/);

  const add = (fullPath, method, relFile) => {
    const p = normalizePath(fullPath);
    const existing = endpoints.get(p);
    if (existing) existing.methods.add(method);
    else endpoints.set(p, { path: p, methods: new Set([method]), file: relFile });
  };

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const relFile = path.relative(rootDir, file).split(path.sep).join("/");
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
 * 本仓前端真实形态（admin 约定）：
 *   request.get({ url: '/x', params })      ← 主形态：verb 方法 + 对象参数
 *   request.delete({ url: `/x?id=${id}` })  ← 模板串
 *   request.get('/x')                       ← 字符串直传
 *   request({ url: '/x', method: 'POST' })  ← 对象直传
 */
export function scanFrontendRoutes(rootDir = DEFAULT_ROOT) {
  const files = [
    ...findFiles(path.join(rootDir, "apps/admin/src/api"), /\.ts$/),
    ...findFiles(path.join(rootDir, "packages/api-client/src"), /\.ts$/),
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
    if (existing) {
      existing.methods.add(method);
      existing.files.add(relFile);
    } else {
      routes.set(key, {
        path: key,
        methods: new Set([method]),
        file: relFile,
        files: new Set([relFile]),
      });
    }
  };

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const relFile = path.relative(rootDir, file).split(path.sep).join("/");

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

export function loadUpstreamBaseline(baselinePath = DEFAULT_BASELINE_PATH) {
  if (!baselinePath || !fs.existsSync(baselinePath)) {
    return { fileScopePrefix: "apps/admin/src/api/", paths: new Set() };
  }
  const raw = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  const fileScopePrefix = String(raw.fileScopePrefix || "apps/admin/src/api/");
  const paths = new Set(
    (Array.isArray(raw.routes) ? raw.routes : []).map((entry) =>
      normalizePath(typeof entry === "string" ? entry : entry.path)
    )
  );
  return { fileScopePrefix, paths };
}

export function analyzeContractDrift({
  rootDir = DEFAULT_ROOT,
  isStrict = false,
  ignoreBaseline = false,
  baselinePath = DEFAULT_BASELINE_PATH,
} = {}) {
  const backend = scanBackendEndpoints(rootDir);
  const frontend = scanFrontendRoutes(rootDir);
  const baseline = ignoreBaseline
    ? { fileScopePrefix: "apps/admin/src/api/", paths: new Set() }
    : loadUpstreamBaseline(baselinePath);

  const missingInFrontend = [];
  const orphanInFrontend = [];
  const upstreamBaselineOrphans = [];
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
    if (backend.has(p)) continue;
    const strictlyUpstreamSubmodule =
      !ignoreBaseline &&
      baseline.paths.has(p) &&
      [...fe.files].every((f) => f.startsWith(baseline.fileScopePrefix));
    if (strictlyUpstreamSubmodule) {
      upstreamBaselineOrphans.push(fe);
    } else {
      orphanInFrontend.push(fe);
    }
  }

  // 未封装接口属于常态（后端路由数远多于前端已接入页面），只有 --strict 才算偏移；
  // 上游只读子模块基线差异已透明单列为 upstreamBaselineOrphans，除非显式传 --no-baseline / --strict-upstream
  const hasDrift =
    orphanInFrontend.length > 0 ||
    methodMismatches.length > 0 ||
    (isStrict && missingInFrontend.length > 0);

  return {
    strict: isStrict,
    baselineApplied: !ignoreBaseline,
    hasDrift,
    counts: {
      backendEndpoints: backend.size,
      frontendRoutes: frontend.routes.size,
      missingInFrontend: missingInFrontend.length,
      orphanInFrontend: orphanInFrontend.length,
      upstreamBaselineOrphans: upstreamBaselineOrphans.length,
      methodMismatches: methodMismatches.length,
      dynamicUrlsSkipped: frontend.dynamic.length,
    },
    missingInFrontend,
    orphanInFrontend,
    upstreamBaselineOrphans,
    methodMismatches,
  };
}

function parseCliArgs(argv) {
  let isStrict = false;
  let asJson = false;
  let ignoreBaseline = false;
  let rootDir = process.env.CONTRACT_DRIFT_ROOT ? path.resolve(process.env.CONTRACT_DRIFT_ROOT) : DEFAULT_ROOT;
  let baselinePath = process.env.CONTRACT_DRIFT_BASELINE
    ? path.resolve(process.env.CONTRACT_DRIFT_BASELINE)
    : DEFAULT_BASELINE_PATH;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      return { help: true };
    }
    if (arg === "--strict") {
      isStrict = true;
    } else if (arg === "--json") {
      asJson = true;
    } else if (arg === "--no-baseline" || arg === "--strict-upstream") {
      ignoreBaseline = true;
    } else if (arg === "--root") {
      if (!argv[i + 1]) return { error: "--root 需要指定目录路径" };
      rootDir = path.resolve(argv[i + 1]);
      i += 1;
    } else if (arg.startsWith("--root=")) {
      rootDir = path.resolve(arg.slice("--root=".length));
    } else if (arg === "--baseline") {
      if (!argv[i + 1]) return { error: "--baseline 需要指定基线文件路径" };
      baselinePath = path.resolve(argv[i + 1]);
      i += 1;
    } else if (arg.startsWith("--baseline=")) {
      baselinePath = path.resolve(arg.slice("--baseline=".length));
    } else {
      return { error: `未知参数: ${arg}` };
    }
  }

  return { isStrict, asJson, ignoreBaseline, rootDir, baselinePath };
}

function main() {
  const cli = parseCliArgs(process.argv.slice(2));
  if (cli.help) {
    console.log(
      "用法: node scripts/check-contracts-drift.mjs [--strict] [--no-baseline|--strict-upstream] [--json] [--root <dir>] [--baseline <file>]"
    );
    process.exit(0);
  }
  if (cli.error) {
    console.error(`❌ ${cli.error}`);
    process.exit(2);
  }

  const report = analyzeContractDrift({
    rootDir: cli.rootDir,
    isStrict: cli.isStrict,
    ignoreBaseline: cli.ignoreBaseline,
    baselinePath: cli.baselinePath,
  });

  if (cli.asJson) {
    console.log(
      JSON.stringify(
        {
          strict: report.strict,
          baselineApplied: report.baselineApplied,
          hasDrift: report.hasDrift,
          counts: report.counts,
          missingInFrontend: report.strict
            ? report.missingInFrontend.slice(0, 500).map((ep) => ({
                path: ep.path,
                methods: [...ep.methods],
                file: ep.file,
              }))
            : undefined,
          orphanInFrontend: report.orphanInFrontend.slice(0, 500).map((r) => ({
            path: r.path,
            methods: [...r.methods],
            file: r.file,
          })),
          upstreamBaselineOrphans: report.upstreamBaselineOrphans.slice(0, 500).map((r) => ({
            path: r.path,
            methods: [...r.methods],
            file: r.file,
          })),
          methodMismatches: report.methodMismatches.slice(0, 500).map((x) => ({
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
    process.exit(report.hasDrift ? 1 : 0);
  }

  console.log("================================================================");
  console.log("📡 前后端契约防漂移检测（已归一化查询串 / 收紧方法作用域）");
  console.log("================================================================");
  console.log(`- 后端暴露路由: ${report.counts.backendEndpoints} 个`);
  console.log(
    `- 前端封装路由: ${report.counts.frontendRoutes} 个（另有 ${report.counts.dynamicUrlsSkipped} 处动态 URL 无法静态解析，已跳过）`
  );
  console.log(
    `- 结论: 孤儿 ${report.counts.orphanInFrontend} / 动词不符 ${report.counts.methodMismatches} / 上游基线 ${report.counts.upstreamBaselineOrphans} / 未封装 ${report.counts.missingInFrontend}（未封装属常态，不计偏移）`
  );
  console.log(`\n--- 审计结果 ---`);

  if (report.methodMismatches.length > 0) {
    console.log(`\n❌ HTTP 动词不匹配 (${report.methodMismatches.length} 个):`);
    for (const x of report.methodMismatches) {
      console.log(
        `   - ${x.backend.path} | 后端 ${[...x.backend.methods].join("/")} (${x.backend.file}) vs 前端 ${[...x.frontend.methods].join("/")} (${x.frontend.file})`
      );
    }
  }

  if (report.orphanInFrontend.length > 0) {
    console.log(`\n❌ 前端调用但后端未暴露 (${report.orphanInFrontend.length} 个，404 风险):`);
    for (const r of report.orphanInFrontend.slice(0, 30)) {
      console.log(`   - [${[...r.methods].join("/")}] ${r.path} (${r.file})`);
    }
    if (report.orphanInFrontend.length > 30) {
      console.log(`   … 其余 ${report.orphanInFrontend.length - 30} 个省略`);
    }
  }

  if (report.upstreamBaselineOrphans.length > 0) {
    console.log(
      `\nℹ️ 上游只读子模块已知基线差异: ${report.upstreamBaselineOrphans.length} 个（详见 AGENTS.md §0.4，传入 --no-baseline 或 --strict-upstream 可全量审计）`
    );
  }

  if (report.missingInFrontend.length > 0) {
    const label = report.strict
      ? "⚠️ 后端已暴露但前端未封装"
      : "ℹ️ 后端已暴露但前端未封装（非阻断，--strict 才计偏移）";
    console.log(`\n${label} (${report.missingInFrontend.length} 个):`);
    for (const ep of report.missingInFrontend.slice(0, 10)) {
      console.log(`   - ${ep.path} [${[...ep.methods].join("/")}]`);
    }
    if (report.missingInFrontend.length > 10) {
      console.log(`   … 其余 ${report.missingInFrontend.length - 10} 个省略`);
    }
  }

  console.log("\n================================================================");
  if (!report.hasDrift) {
    const baselineNote =
      report.upstreamBaselineOrphans.length > 0
        ? `；上游只读子模块已知基线差异: ${report.upstreamBaselineOrphans.length} 个`
        : "";
    console.log(`✅ 无契约漂移（孤儿 0 / 动词不符 0${baselineNote}）`);
  } else {
    console.log(
      `❌ 契约漂移：孤儿 ${report.orphanInFrontend.length} / 动词不符 ${report.methodMismatches.length}` +
        (report.strict ? ` / 未封装 ${report.missingInFrontend.length}（strict）` : "")
    );
  }
  console.log("================================================================");
  process.exit(report.hasDrift ? 1 : 0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main();
}
