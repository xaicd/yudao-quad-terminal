#!/usr/bin/env node
/**
 * scripts/mcp/yudao-mcp-server.cjs
 *
 * Yudao-Quad-Terminal 机器可调用端点 (MCP stdio server)
 *
 * 治理依据：
 * - AGENTS.md Rule 13（全能力 AI Agent 驱动）：系统能力必须具备 100% 机器可读与
 *   Agent 闭环驱动能力，严禁只能人类手点的孤岛能力。
 * - AGENTS.md Rule 11（单一真源）：本 server 不复制任何业务逻辑，全部工具复用既有脚本。
 *
 * 传输：stdio（newline-delimited JSON-RPC 2.0），零 npm 依赖。
 * 接入：仓库根 .mcp.json（project scope，随 Git 提交）。工具对外名 mcp__yudao-quad-terminal__<tool>。
 *
 * 手动启动（调试）：node scripts/mcp/yudao-mcp-server.cjs
 */

"use strict";

const path = require("node:path");
const readline = require("node:readline");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..", "..");
const SERVER_NAME = "yudao-quad-terminal";
const SERVER_VERSION = "1.0.0";
const PROTOCOL_VERSION = "2024-11-05";
const MAX_BUFFER = 64 * 1024 * 1024;

/** 复用既有脚本，绝不重写第二套逻辑 */
function runNode(scriptRel, args, timeoutMs = 600000) {
  const result = spawnSync(process.execPath, [path.join(ROOT, scriptRel), ...args], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: timeoutMs,
    maxBuffer: MAX_BUFFER,
  });

  return {
    code: result.status === null || result.status === undefined ? -1 : result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    error: result.error ? result.error.message : null,
  };
}

function ok(text, structured) {
  return { content: [{ type: "text", text }], ...(structured ? { structuredContent: structured } : {}) };
}

function fail(text) {
  return { content: [{ type: "text", text }], isError: true };
}

function selectionArgs(a) {
  const out = [];
  if (a.profile) out.push("--profile", String(a.profile));
  else if (a.keep) out.push("--keep", Array.isArray(a.keep) ? a.keep.join(",") : String(a.keep));
  else if (a.remove) out.push("--remove", Array.isArray(a.remove) ? a.remove.join(",") : String(a.remove));
  if (a.activate) out.push("--activate");
  return out;
}

/** 包装一个 --json 化的既有脚本：优先解析 JSON，否则回退为原始文本 */
function wrapJsonResult(label, result, { okCodes = [0] } = {}) {
  const isOk = okCodes.includes(result.code);
  if (!isOk) {
    const detail = (result.stderr || result.stdout || result.error || "").trim();
    return fail(`❌ ${label} 失败 (exit=${result.code})\n${detail}`);
  }
  const raw = result.stdout.trim();
  if (!raw) return ok(`${label} 完成 (exit=0)，无输出。`);
  try {
    const parsed = JSON.parse(raw);
    return ok(`${label} ✅\n\n\`\`\`json\n${JSON.stringify(parsed, null, 2)}\n\`\`\``, parsed);
  } catch {
    return ok(`${label} ✅\n\n${raw}`);
  }
}

// ---------------------------------------------------------------------------
// 工具实现
// ---------------------------------------------------------------------------

async function toolModulesList(args) {
  const catalog = await import(path.join(ROOT, "scripts/lib/module-catalog.mjs"));
  const profile = args && args.profile ? catalog.resolveProfile(args.profile) : null;
  if (args && args.profile && !profile) {
    return fail(`❌ 未知 profile: "${args.profile}"（可选: ${Object.keys(catalog.PROFILES).join(" / ")}）`);
  }

  const keepIds = profile || catalog.MODULE_IDS;
  const s = catalog.summarize(keepIds);
  const rows = catalog.MODULES.map((m) => {
    const mark = keepIds.includes(m.id) ? "✅" : "🗑️";
    const deps = m.deps.length ? ` ← ${m.deps.join(",")}` : "";
    return `${mark} ${m.id.padEnd(9)} ${String(m.javaFiles).padStart(4)} 文件  ${m.label}${deps}`;
  });

  const text = [
    `Yudao-Quad-Terminal 模块清单（唯一真源: scripts/lib/module-catalog.mjs）`,
    ``,
    `profile: ${args && args.profile ? args.profile : "(全部 19 模块)"}`,
    `模块 Java 文件: ${s.moduleTotalJavaFiles} → 保留 ${s.keptJavaFiles}（剔除 ${s.removedJavaFiles}, -${s.reductionPercent}%）`,
    `全后端口径: ${s.backendTotalJavaFiles} → ${s.keptBackendJavaFiles}（模块外 ${s.nonTrimJavaFiles} 个框架/网关文件不参与裁剪）`,
    ``,
    ...rows,
    ``,
    `预设装配档: ${Object.entries(catalog.PROFILES).map(([k, v]) => `${k}(${v.length})`).join(" / ")}`,
    `地基模块 ${catalog.CORE_MODULE_IDS.join(" + ")} 不可剔除。`,
  ].join("\n");

  return ok(text, { summary: s, modules: catalog.MODULES, profiles: catalog.PROFILES });
}

function toolTrimPreview(args) {
  const r = runNode("scripts/trim-modules.mjs", [...selectionArgs(args || {}), "--dry-run", "--json"]);
  return wrapJsonResult("裁剪预览 (dry-run)", r, { okCodes: [0] });
}

function toolTrimApply(args) {
  const a = args || {};
  if (!a.yes) {
    return fail("❌ trim_apply 是破坏性操作：必须显式传 yes=true（或先调用 trim_preview 评审）。");
  }
  const r = runNode("scripts/trim-modules.mjs", [...selectionArgs(a), "--apply", "--yes", "--json"]);
  return wrapJsonResult("裁剪执行 (apply)", r, { okCodes: [0] });
}

function toolTrimCheck(args) {
  const r = runNode("scripts/trim-modules.mjs", [...selectionArgs(args || {}), "--check", "--json"]);
  if (r.code === 1) {
    const raw = r.stdout.trim();
    try {
      const parsed = JSON.parse(raw);
      const lines = parsed.drift.map((d) => `- [${d.module}] ${d.detail}`).join("\n");
      return fail(`⚠️ 裁剪状态存在 ${parsed.drift.length} 处漂移：\n${lines}`);
    } catch {
      return fail(`⚠️ 裁剪状态存在漂移 (exit=1)\n${raw}`);
    }
  }
  return wrapJsonResult("裁剪状态校验", r, { okCodes: [0] });
}

function toolGenModule(args) {
  const a = args || {};
  if (!a.module || !a.entity) return fail("❌ 必须提供 module 与 entity。");

  const cliArgs = ["--module", String(a.module), "--entity", String(a.entity)];
  if (a.table) cliArgs.push("--table", String(a.table));
  if (a.title) cliArgs.push("--title", String(a.title));
  if (a.fields) cliArgs.push("--fields", String(a.fields));
  if (a.dryRun) cliArgs.push("--dry-run");
  if (a.force) cliArgs.push("--force");

  const r = runNode("scripts/codegen-module.mjs", cliArgs);
  if (r.code !== 0) {
    return fail(`❌ 代码生成失败 (exit=${r.code})\n${(r.stderr || r.stdout).trim()}`);
  }
  return ok(`代码生成 ✅ (exit=0)\n\n${r.stdout.trim()}`);
}

function toolOpenwikiQuery(args) {
  const a = args || {};
  if (!a.query) return fail("❌ 必须提供 query（业务域关键词，如 order / pay / system）。");
  const r = runNode("scripts/agent-context-compressor.mjs", ["--query", String(a.query), "--json"]);
  if (r.code !== 0) {
    return fail(`❌ 上下文切片失败 (exit=${r.code})\n${(r.stderr || r.stdout).trim()}`);
  }
  const raw = r.stdout.trim();
  try {
    const parsed = JSON.parse(raw);
    const summary = [
      `上下文切片 "${a.query}"：controllers=${parsed.controllers.length} tables=${parsed.tables.length} apiModules=${parsed.apis.length}`,
      ``,
      `\`\`\`json`,
      JSON.stringify(parsed, null, 2),
      `\`\`\``,
    ].join("\n");
    return ok(summary, parsed);
  } catch {
    return ok(raw);
  }
}

function toolContractDrift(args) {
  const strict = !args || args.strict !== false;
  const cliArgs = strict ? ["--strict"] : [];
  const r = runNode("scripts/check-contracts-drift.mjs", cliArgs);
  const text = (r.stdout || "").trim();

  if (r.code === 0) {
    return ok(`契约防漂移检查 ✅ (strict=${strict})\n\n${text}`);
  }
  return fail(`❌ 检测到前后端契约漂移（本仓为既有基线状态，非本次改动引入）\n\n${text}`);
}

function toolGateCheck(args) {
  const tier = (args && args.tier) || "fast";
  // 单一真源：门禁逻辑只在 scripts/gate-check.mjs 里实现，MCP 仅做参数转译与结果包装
  const r = runNode("scripts/gate-check.mjs", ["--tier", tier, "--json"], 900000);

  let parsed = null;
  try {
    parsed = JSON.parse(r.stdout.trim());
  } catch {
    /* 解析失败时回退为原始输出 */
  }
  if (!parsed) {
    return fail(
      `❌ 门禁脚本输出无法解析 (exit=${r.code})\n${(r.stderr || r.stdout).trim().slice(0, 2000)}`
    );
  }

  const mark = { pass: "✅", fail: "❌", skipped: "⏭️" };
  const text = [
    `工程门禁 tier=${parsed.tier}：${parsed.passed ? "通过" : "未通过"}`,
    `blocking 失败: ${parsed.blockingFailed.join(", ") || "无"} | advisory 红灯: ${parsed.advisoryFailed.join(", ") || "无"} | 跳过: ${parsed.skipped.join(", ") || "无"}`,
    "",
    ...parsed.results.map(
      (x) => `${mark[x.status] || "?"} ${x.id.padEnd(11)} ${x.label}${x.detail ? `\n      ${x.detail}` : ""}`
    ),
  ].join("\n");

  const out = { content: [{ type: "text", text }], structuredContent: parsed };
  if (!parsed.passed) out.isError = true;
  return out;
}

// ---------------------------------------------------------------------------
// 工具注册表
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "modules_list",
    description:
      "列出 Yudao-Quad-Terminal 的 19 个后端业务模块元数据（Java 文件数、强依赖链），可传 profile 查看某档的保留/剔除标记与规模画像。只读。",
    inputSchema: {
      type: "object",
      properties: {
        profile: { type: "string", enum: ["mini", "lite", "full"], description: "预设装配档，省略则展示全部 19 模块" },
      },
    },
    handler: toolModulesList,
  },
  {
    name: "trim_preview",
    description:
      "预览模块裁剪计划（dry-run，不落地任何修改）：将删除哪些目录、改写哪些 pom 节点、Java 文件数变化。修改模块装配前必须先调用本工具评审。",
    inputSchema: {
      type: "object",
      properties: {
        profile: { type: "string", enum: ["mini", "lite", "full"] },
        keep: { type: "array", items: { type: "string" }, description: "显式保留清单，会自动补齐强依赖；不可与 profile/remove 同时使用" },
        remove: { type: "array", items: { type: "string" }, description: "显式剔除清单；与保留模块强依赖冲突时会被拒绝" },
      },
    },
    handler: toolTrimPreview,
  },
  {
    name: "trim_apply",
    description:
      "【破坏性】执行模块裁剪：物理删除被剔模块目录 + 同步改写 apps/backend/pom.xml 与 yudao-server/pom.xml（改写前自动写 .bak）。必须显式传 yes=true。",
    inputSchema: {
      type: "object",
      properties: {
        profile: { type: "string", enum: ["mini", "lite", "full"] },
        keep: { type: "array", items: { type: "string" } },
        remove: { type: "array", items: { type: "string" } },
        activate: { type: "boolean", description: "同时把保留模块在 yudao-server 的依赖反注释启用" },
        yes: { type: "boolean", description: "确认为破坏性操作，必须为 true" },
      },
      required: ["yes"],
    },
    handler: toolTrimApply,
  },
  {
    name: "trim_check",
    description:
      "校验磁盘现状是否等于目标装配档（目录 / 根 pom <module> / yudao-server 依赖三处一致性）。漂移则返回失败与逐条清单。只读，适合作为 CI 门禁。",
    inputSchema: {
      type: "object",
      properties: {
        profile: { type: "string", enum: ["mini", "lite", "full"] },
        keep: { type: "array", items: { type: "string" } },
        remove: { type: "array", items: { type: "string" } },
      },
    },
    handler: toolTrimCheck,
  },
  {
    name: "gen_module",
    description:
      "按 Schema 声明式生成全栈模块资产（DO/Mapper/Service/Controller/3×VO/Convert + TS API + Vue3 页面 + SQL DDL），由 scripts/codegen-module.mjs 展开，避免人肉逐行写样板代码。",
    inputSchema: {
      type: "object",
      properties: {
        module: { type: "string", description: "业务模块名，如 system / mall" },
        entity: { type: "string", description: "实体名，如 ProductCategory" },
        table: { type: "string", description: "物理表名，默认 <module>_<entity 下划线>" },
        title: { type: "string", description: "中文标题，用于注释与页面标题" },
        fields: { type: "string", description: "字段声明，逗号分隔" },
        dryRun: { type: "boolean", description: "只打印将生成的文件路径，不写盘" },
        force: { type: "boolean", description: "覆盖已存在文件" },
      },
      required: ["module", "entity"],
    },
    handler: toolGenModule,
  },
  {
    name: "openwiki_query",
    description:
      "极速上下文切片：按关键词返回 Controller 路由、实体表与前端 API 的高内聚微型切片（~150 Tokens），替代对上千 Java/Vue 文件的全盘盲搜。",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "业务域关键词，如 order / pay / system" } },
      required: ["query"],
    },
    handler: toolOpenwikiQuery,
  },
  {
    name: "contract_drift",
    description:
      "静态检测前后端契约漂移：后端已暴露但前端未封装的接口、前端调用但不存在的接口（404 风险）、HTTP 动词不匹配。只读。",
    inputSchema: {
      type: "object",
      properties: { strict: { type: "boolean", description: "严格模式（默认 true）：后端未在前端封装的接口也算漂移" } },
    },
    handler: toolContractDrift,
  },
  {
    name: "gate_check",
    description:
      "一键跑通工程门禁链并汇总结果（blocking / advisory 分级，单一真源为 scripts/gate-check.mjs）：OpenWiki 同步、技能注册一致性、trim CLI 自检、SDD 工作流，以及 advisory 的契约防漂移与苏格拉底反思；tier=full 时追加 lite 档端到端验收（缺前置条件会标 skipped 而非通过）。声明任务完成前必须调用。",
    inputSchema: {
      type: "object",
      properties: {
        tier: {
          type: "string",
          enum: ["fast", "full"],
          description: "fast=秒级无需构建（默认）；full=额外跑 lite 档 e2e 验收",
        },
      },
    },
    handler: toolGateCheck,
  },
];

// ---------------------------------------------------------------------------
// JSON-RPC 分发
// ---------------------------------------------------------------------------

async function handle(message) {
  const { id, method, params } = message;
  const isNotification = id === undefined || id === null;

  const reply = (result) => ({ jsonrpc: "2.0", id, result });
  const error = (code, msg) => ({ jsonrpc: "2.0", id, error: { code, message: msg } });

  try {
    switch (method) {
      case "initialize":
        return reply({
          protocolVersion: PROTOCOL_VERSION,
          capabilities: { tools: {} },
          serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
        });

      case "notifications/initialized":
      case "notifications/cancelled":
        return null;

      case "ping":
        return reply({});

      case "tools/list":
        return reply({
          tools: TOOLS.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema })),
        });

      case "tools/call": {
        const name = params && params.name;
        const tool = TOOLS.find((t) => t.name === name);
        if (!tool) return error(-32602, `未知工具: ${name}`);
        const result = await tool.handler(params.arguments || {});
        return reply(result);
      }

      default:
        if (isNotification) return null;
        return error(-32601, `不支持的方法: ${method}`);
    }
  } catch (e) {
    if (isNotification) return null;
    return error(-32603, `内部错误: ${e && e.message ? e.message : String(e)}`);
  }
}

function send(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

function main() {
  // MCP 客户端断开时 stdout 会 EPIPE：必须优雅退出，而不是抛未捕获异常把进程打崩
  process.stdout.on("error", (err) => {
    if (err && err.code === "EPIPE") process.exit(0);
    throw err;
  });

  const rl = readline.createInterface({ input: process.stdin, terminal: false });

  rl.on("line", async (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    let message;
    try {
      message = JSON.parse(trimmed);
    } catch {
      send({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "JSON 解析失败" } });
      return;
    }

    const response = await handle(message);
    if (response) send(response);
  });

  // 客户端关闭 stdin 即代表会话结束
  rl.on("close", () => process.exit(0));

  // stderr 仅用于诊断，不污染 stdio 的 JSON-RPC 通道
  process.stderr.write(`[${SERVER_NAME}] MCP stdio server 已就绪 (tools=${TOOLS.length})\n`);
}

main();
