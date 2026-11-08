#!/usr/bin/env node
/**
 * scripts/blueprint-engine.cjs
 *
 * Yudao 四位一体多端蓝图模板引擎 (Blueprint Engine for Yudao-Quad-Terminal)
 *
 * 核心功能:
 * 1. check:
 *    机检 blueprint.template.json 定义的所有变量与 .template 文件中的 {{VAR}} 占位符闭合性；
 * 2. render:
 *    依据传入的变量集合 (--set-var KEY=VAL / --values json) 渲染各 .template 文件并写盘至目标文件；
 * 3. schema:
 *    导出变量清单与元数据，供工坊调度中枢与大模型消费。
 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const MANIFEST_PATH = path.join(ROOT, "blueprint.template.json");

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(`[blueprint-engine] 缺失根级模板清单: ${MANIFEST_PATH}`);
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
}

function buildDefaultMap(manifest) {
  const defaults = {};
  for (const [key, meta] of Object.entries(manifest.variables || {})) {
    defaults[key] = meta.default;
  }
  return defaults;
}

function extractPlaceholdersFromText(text) {
  const found = new Set();
  const re = /\{\{\s*([A-Z0-9_]+)\s*\}\}/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    found.add(m[1]);
  }
  return Array.from(found);
}

function renderTemplateText(text, values) {
  return text.replace(/\{\{\s*([A-Z0-9_]+)\s*\}\}/g, (full, name) => {
    if (Object.prototype.hasOwnProperty.call(values, name) && values[name] !== undefined) {
      return String(values[name]);
    }
    return full;
  });
}

function parseCliArgs(argv) {
  const cmd = argv[0] || "check";
  const opts = {
    cmd,
    compact: false,
    dryRun: false,
    force: false,
    valuesFile: null,
    sets: {},
  };
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--compact") opts.compact = true;
    else if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--force") opts.force = true;
    else if (arg === "--values" && argv[i + 1]) opts.valuesFile = argv[++i];
    else if (arg.startsWith("--values=")) opts.valuesFile = arg.split("=")[1];
    else if ((arg === "--set" || arg === "--set-var") && argv[i + 1]) {
      const pair = argv[++i];
      const eqIdx = pair.indexOf("=");
      if (eqIdx > 0) {
        opts.sets[pair.slice(0, eqIdx).trim()] = pair.slice(eqIdx + 1).trim();
      }
    } else if (arg.startsWith("--set=") || arg.startsWith("--set-var=")) {
      const prefix = arg.startsWith("--set-var=") ? "--set-var=" : "--set=";
      const pair = arg.slice(prefix.length);
      const eqIdx = pair.indexOf("=");
      if (eqIdx > 0) {
        opts.sets[pair.slice(0, eqIdx).trim()] = pair.slice(eqIdx + 1).trim();
      }
    }
  }
  return opts;
}

function runCheck() {
  const manifest = loadManifest();
  const vars = manifest.variables || {};
  const errors = [];

  for (const tpl of manifest.templateFiles || []) {
    const absTpl = path.join(ROOT, tpl.templatePath);
    if (!fs.existsSync(absTpl)) {
      errors.push(`模板文件不存在: ${tpl.templatePath}`);
      continue;
    }
    const content = fs.readFileSync(absTpl, "utf8");
    const placeholders = extractPlaceholdersFromText(content);
    if (placeholders.length === 0) {
      errors.push(`模板文件 ${tpl.templatePath} 未包含任何 {{VAR}} 占位符`);
    }
    for (const p of placeholders) {
      if (!vars[p]) {
        errors.push(`模板文件 ${tpl.templatePath} 引用了未在 blueprint.template.json 登记的变量 {{${p}}}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`❌ [blueprint-engine check] 发现 ${errors.length} 项错误:`);
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  console.log(`✅ [blueprint-engine check] 蓝图模板校验通过:`);
  console.log(`   - 声明变量数: ${Object.keys(vars).length}`);
  console.log(`   - 模板文件数: ${(manifest.templateFiles || []).length}`);
  for (const t of manifest.templateFiles || []) {
    console.log(`     • ${t.templatePath} ➜ ${t.targetPath}`);
  }
}

function runRender(opts) {
  const manifest = loadManifest();
  const values = buildDefaultMap(manifest);

  if (opts.valuesFile) {
    const abs = path.resolve(opts.valuesFile);
    if (fs.existsSync(abs)) {
      const fileVals = JSON.parse(fs.readFileSync(abs, "utf8"));
      Object.assign(values, fileVals);
    }
  }

  Object.assign(values, opts.sets);

  console.log(`🚀 [blueprint-engine render] 开始渲染蓝图模板 (dryRun=${opts.dryRun})`);
  let renderedCount = 0;

  for (const tpl of manifest.templateFiles || []) {
    const absTpl = path.join(ROOT, tpl.templatePath);
    const absTarget = path.join(ROOT, tpl.targetPath);

    if (!fs.existsSync(absTpl)) {
      console.warn(`  ⚠️ 跳过缺失模板: ${tpl.templatePath}`);
      continue;
    }

    const tplContent = fs.readFileSync(absTpl, "utf8");
    const rendered = renderTemplateText(tplContent, values);

    // 检查是否还有未闭合的占位符
    const remaining = extractPlaceholdersFromText(rendered);
    if (remaining.length > 0) {
      console.warn(`  ⚠️ [${tpl.targetPath}] 存在未解析占位符: ${remaining.join(", ")}`);
    }

    if (!opts.dryRun) {
      fs.mkdirSync(path.dirname(absTarget), { recursive: true });
      fs.writeFileSync(absTarget, rendered, "utf8");
    }
    renderedCount++;
    console.log(`  📄 渲染成功: ${tpl.templatePath} ➜ ${tpl.targetPath}`);
  }

  console.log(`✅ [blueprint-engine render] 渲染完成，共处理 ${renderedCount} 个文件。\n`);
}

function runSchema(opts) {
  const manifest = loadManifest();
  if (opts.compact) {
    const keys = Object.keys(manifest.variables || {});
    console.log(JSON.stringify({ templateId: manifest.templateId, variableCount: keys.length, variables: keys }, null, 2));
  } else {
    console.log(JSON.stringify(manifest, null, 2));
  }
}

function main() {
  const opts = parseCliArgs(process.argv.slice(2));
  try {
    if (opts.cmd === "check") {
      runCheck();
    } else if (opts.cmd === "render") {
      runRender(opts);
    } else if (opts.cmd === "schema") {
      runSchema(opts);
    } else {
      console.error(`未知命令: ${opts.cmd}，支持: check | render | schema`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`❌ [blueprint-engine] 执行失败:`, err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
