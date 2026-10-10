#!/usr/bin/env node
/**
 * scripts/check-contracts-drift.mjs
 *
 * Yudao-Cloud 前后端契约防漂移静态检测器 (AI Token 节约套件核心)
 *
 * 核心目的：
 * 终结 AI 数字员工在交付验收时“把 Java Controller 和 TS API 贴进提示词人肉核对”
 * 造成的审计 Token 极大浪费与人为眼花遗漏（单次核验节约 5,000 ~ 10,000 Tokens）。
 * 0.1 秒静态扫描，确定性给出前后端 API 路由覆盖率与漂移报告。
 *
 * 检查项：
 * 1. 后端声明但前端未封装的孤立接口 (Missing in Frontend)
 * 2. 前端调用但后端未暴露的虚假接口 (Orphan in Frontend / 404 风险)
 * 3. HTTP 动词一致性检测 (GET / POST / PUT / DELETE)
 *
 * 用法：
 *   node scripts/check-contracts-drift.mjs
 *   node scripts/check-contracts-drift.mjs --strict
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const isStrict = process.argv.includes("--strict");

function findFiles(dir, filterRegex, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findFiles(fullPath, filterRegex, fileList);
    } else if (entry.isFile() && filterRegex.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function scanBackendEndpoints() {
  const controllerFiles = findFiles(
    path.join(ROOT, "apps/backend"),
    /Controller\.java$/
  );
  const endpoints = new Map();

  for (const file of controllerFiles) {
    const content = fs.readFileSync(file, "utf8");
    const classMappingMatch = content.match(
      /@RequestMapping\(\s*["']([^"']+)["']\s*\)/
    );
    const basePath = classMappingMatch ? classMappingMatch[1] : "";

    const methodBlockRegex =
      /@(Get|Post|Put|Delete)Mapping(?:\(\s*["']?([^"']*)["']?\s*\))?([\s\S]*?public\s+([^\s]+(?:\s*<[^>]+>)?)\s+(\w+)\s*\(([^)]*)\))/g;

    let m;
    while ((m = methodBlockRegex.exec(content)) !== null) {
      const httpMethod = m[1].toUpperCase();
      const subPath = m[2] || "";
      const fullPath = (basePath + subPath).replace(/\/+/g, "/");
      const summaryMatch = m[3].match(/@Operation\(\s*summary\s*=\s*["']([^"']+)["']/);
      const summary = summaryMatch ? summaryMatch[1] : "";

      endpoints.set(fullPath, {
        method: httpMethod,
        path: fullPath,
        summary,
        file: path.relative(ROOT, file),
      });
    }
  }

  return endpoints;
}

function scanFrontendRoutes() {
  const apiFiles = [
    ...findFiles(path.join(ROOT, "apps/admin/src/api"), /\.ts$/),
    ...findFiles(path.join(ROOT, "packages/api-client/src"), /\.ts$/),
  ];
  const routes = new Map();

  for (const file of apiFiles) {
    const content = fs.readFileSync(file, "utf8");
    const reqRegex =
      /(?:request\.(get|post|put|delete)|method:\s*['"](GET|POST|PUT|DELETE)['"])[\s\S]*?url:\s*['"]([^'"]+)['"]/g;

    let m;
    while ((m = reqRegex.exec(content)) !== null) {
      const method = (m[1] || m[2] || "GET").toUpperCase();
      const url = m[3];
      routes.set(url, {
        method,
        url,
        file: path.relative(ROOT, file),
      });
    }
  }

  return routes;
}

function main() {
  console.log(`================================================================`);
  console.log(`📡 Yudao-Cloud 前后端契约防漂移静态检测器`);
  console.log(`================================================================`);

  const backendEndpoints = scanBackendEndpoints();
  const frontendRoutes = scanFrontendRoutes();

  console.log(`- 后端暴露路由: ${backendEndpoints.size} 个`);
  console.log(`- 前端封装路由: ${frontendRoutes.size} 个`);

  const missingInFrontend = [];
  const orphanInFrontend = [];
  const methodMismatches = [];

  // 1. 检查后端路由在前端是否都有对应
  for (const [pathUrl, ep] of backendEndpoints.entries()) {
    // 排除健康探测等内部基础设施
    if (pathUrl.includes("/infra/health")) continue;

    if (!frontendRoutes.has(pathUrl)) {
      missingInFrontend.push(ep);
    } else {
      const fe = frontendRoutes.get(pathUrl);
      if (fe.method !== ep.method) {
        methodMismatches.push({ backend: ep, frontend: fe });
      }
    }
  }

  // 2. 检查前端调用的路由在后端是否存在
  for (const [url, fe] of frontendRoutes.entries()) {
    if (!backendEndpoints.has(url)) {
      orphanInFrontend.push(fe);
    }
  }

  console.log(`\n--- 审计结果报告 ---`);
  let hasDrift = false;

  if (missingInFrontend.length > 0) {
    console.log(`\n⚠️ 前端未实现的后端接口 (${missingInFrontend.length} 个):`);
    for (const ep of missingInFrontend) {
      console.log(`   - [${ep.method}] ${ep.path} (${ep.summary || ep.file})`);
    }
    if (isStrict) hasDrift = true;
  }

  if (orphanInFrontend.length > 0) {
    console.log(`\n❌ 前端调用的未定义后端接口 (${orphanInFrontend.length} 个):`);
    for (const fe of orphanInFrontend) {
      console.log(`   - [${fe.method}] ${fe.url} (${fe.file})`);
    }
    hasDrift = true;
  }

  if (methodMismatches.length > 0) {
    console.log(`\n❌ HTTP 动词不匹配 (${methodMismatches.length} 个):`);
    for (const item of methodMismatches) {
      console.log(
        `   - 路径: ${item.backend.path} | 后端: ${item.backend.method} (${item.backend.file}) vs 前端: ${item.frontend.method} (${item.frontend.file})`
      );
    }
    hasDrift = true;
  }

  console.log(`\n================================================================`);
  if (!hasDrift && missingInFrontend.length === 0) {
    console.log(`✅ 契约完全吻合！前后端 API 契约 100% 保持同步，零漂移。`);
    console.log(`================================================================`);
    process.exit(0);
  } else if (!hasDrift) {
    console.log(`ℹ️ 契约基本吻合 (存在部分后端接口未在前端调用，属正常现象)。`);
    console.log(`================================================================`);
    process.exit(0);
  } else {
    console.log(`❌ 检测到前后端契约漂移！请根据上述清单修复后重试。`);
    console.log(`================================================================`);
    process.exit(1);
  }
}

main();
