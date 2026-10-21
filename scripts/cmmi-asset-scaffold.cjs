#!/usr/bin/env node
/**
 * scripts/cmmi-asset-scaffold.cjs
 *
 * CMMI 01~09 过程资产脚手架（此前文档大量引用 `pnpm cmmi:asset`，但该脚本从未存在）
 *
 * 用法：
 *   pnpm cmmi:asset new --phase 01 --type charter --title "项目章程" [--slug project-charter] [--version 1.0] [--id 3] [--real] [--score 91.5%]
 *   pnpm cmmi:asset list [--phase 03]
 *   pnpm cmmi:asset check [--all] [--json]
 *
 * 约定：
 * - 资产落位 `docs/<NN>_<name>/<slug>.md`（阶段目录不存在则创建）；
 * - 骨架统一带 `CMMI 过程资产` 头部与 `<!-- TODO: -->` 待填标记；
 * - `check` 默认只校验「声明了 CMMI 过程资产头部」的文件（避免误伤历史文档），`--all` 才全量严格校验；
 * - 不生成任何"看起来已完成"的正文：所有正文段落一律留 TODO，禁止假资产。
 *
 * 退出码：0 成功/通过；1 check 发现问题；2 用法错误
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");

const PHASE_DIRS = {
  "00": "docs/00_meta_standards",
  "01": "docs/01_management",
  "02": "docs/02_requirements",
  "03": "docs/03_design",
  "04": "docs/04_implementation",
  "05": "docs/05_verification",
  "06": "docs/06_quality_assurance",
  "07": "docs/07_release",
  "08": "docs/08_sre",
  "09": "docs/09_operations",
};

/** 类型 → 专属正文小节（未登记的类型走通用骨架） */
const TYPE_SECTIONS = {
  charter: ["项目目标与成功标准", "范围边界（In / Out）", "里程碑与验收条件", "RACI 角色矩阵"],
  risk: ["风险识别清单", "概率 × 影响评级", "缓解与应急措施", "风险责任人与复审周期"],
  dar: ["决策目标与约束", "候选方案（≥2 + 阴性对照）", "评估准则与权重（Σ=100%）", "量化打分与敏感度分析", "决议与风险缓释"],
  srs: ["业务背景与术语", "角色与用户故事", "EARS 验收标准（WHEN…THEN…SHALL）", "非目标与边界"],
  rtm: ["需求清单", "需求 → 设计 → 测试 双向追溯", "覆盖率统计"],
  adr: ["上下文与问题", "决策", "备选方案与取舍", "后果（正 / 负）"],
  archify: ["系统拓扑", "关键时序", "部署与网络边界"],
  "code-review": ["审查范围与清单", "发现的问题与定级", "整改与复查结论"],
  "test-summary": ["测试范围与矩阵", "用例统计与通过率", "缺陷分布", "结论与遗留风险"],
  "mutation-report": ["变异算子与覆盖范围", "MSI 变异得分", "幸存变异体分析", "结论"],
  audit: ["审计范围", "FCA 功能配置审计", "PCA 物理配置审计", "不符合项与整改"],
  "deployment-sop": ["发布前检查", "割接步骤（可回滚）", "验证与观测", "回滚预案"],
  "rollback-runbook": ["触发条件", "回滚步骤", "数据一致性校验", "复盘与改进"],
  "release-notes": ["新增能力", "破坏性变更与迁移指引", "已知问题"],
  "slo-matrix": ["SLI 定义", "SLO 目标与错误预算", "告警阈值与燃烧率", "容量护栏"],
};

const TODO = "<!-- TODO: 填写 -->";
const HEADER_MARKER = "CMMI 过程资产";

function usage() {
  console.log(`CMMI 过程资产脚手架

用法:
  pnpm cmmi:asset new --phase <00~09> --type <type> [--title "标题"] [--slug 文件名] [--version 1.0] [--id N] [--real] [--score "91.5%"]
  pnpm cmmi:asset list [--phase <00~09>]
  pnpm cmmi:asset check [--all] [--json]

阶段目录:
${Object.entries(PHASE_DIRS).map(([k, v]) => `  ${k} → ${v}`).join("\n")}

已登记类型: ${Object.keys(TYPE_SECTIONS).join(", ")}
（未登记类型会生成通用骨架）
`);
}

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : undefined;
}
const hasFlag = (f) => process.argv.includes(f);

function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function slugify(input, fallback) {
  const s = String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || fallback;
}

function renderAsset({ phase, type, title, version, id, real, score }) {
  const sections = TYPE_SECTIONS[type] || ["目的与范围", "输入与前置条件", "正文", "度量与验收"];
  const extra = [];
  if (real) extra.push(`> 真实性声明: \`--real\`（数据来自真实执行，非估算）`);
  if (score) extra.push(`> 度量结果: \`${score}\``);

  const lines = [
    `# ${title}`,
    "",
    `> **${HEADER_MARKER}** | 阶段: ${phase} | 类型: ${type}${id ? ` | 编号: ${id}` : ""} | 版本: ${version} | 状态: DRAFT`,
    `> 生成: \`pnpm cmmi:asset new\`（骨架；正文需人工 / Agent 填写，\`pnpm cmmi:asset:check\` 会校验 TODO 残留）`,
    ...(extra.length ? ["", ...extra] : []),
    "",
    ...sections.flatMap((s, i) => [`## ${i + 1}. ${s}`, TODO, ""]),
    "## 变更记录",
    "| 日期 | 版本 | 变更人 | 说明 |",
    "|---|---|---|---|",
    `| ${today()} | ${version} | - | 初始骨架 |`,
    "",
  ];
  return lines.join("\n");
}

function handleNew() {
  const phase = getArg("--phase");
  const type = getArg("--type");
  if (!phase || !type) {
    console.error("❌ 用法错误: pnpm cmmi:asset new --phase <00~09> --type <type> [--title ...]");
    process.exit(2);
  }
  const dirRel = PHASE_DIRS[phase];
  if (!dirRel) {
    console.error(`❌ 未知阶段: ${phase}（可选 ${Object.keys(PHASE_DIRS).join(" / ")}）`);
    process.exit(2);
  }

  const title = getArg("--title") || type;
  const version = getArg("--version") || "1.0";
  const id = getArg("--id");
  const slug = getArg("--slug") || slugify(title, type);
  const dirAbs = path.join(ROOT, dirRel);
  const fileAbs = path.join(dirAbs, `${slug}.md`);

  if (fs.existsSync(fileAbs) && !hasFlag("--force")) {
    console.error(`❌ 目标已存在: ${path.relative(ROOT, fileAbs)}（如需覆盖请加 --force）`);
    process.exit(2);
  }

  fs.mkdirSync(dirAbs, { recursive: true });
  fs.writeFileSync(
    fileAbs,
    renderAsset({ phase, type, title, version, id, real: hasFlag("--real"), score: getArg("--score") }),
    "utf8"
  );

  console.log(`✅ 已生成 ${headerType(type)} 资产: ${path.relative(ROOT, fileAbs)}`);
  console.log(`   下一步: 填写正文（当前为 ${TODO}），完成后跑 pnpm cmmi:asset:check`);
  process.exit(0);
}

function headerType(type) {
  return type;
}

function collectAssets(phaseFilter) {
  const out = [];
  for (const [phase, dirRel] of Object.entries(PHASE_DIRS)) {
    if (phaseFilter && phase !== phaseFilter) continue;
    const dirAbs = path.join(ROOT, dirRel);
    if (!fs.existsSync(dirAbs)) continue;
    const walk = (d) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith(".md")) out.push({ phase, dir: dirRel, file: p });
      }
    };
    walk(dirAbs);
  }
  return out;
}

function handleList() {
  const files = collectAssets(getArg("--phase"));
  if (files.length === 0) {
    console.log("（该阶段暂无资产）");
    process.exit(0);
  }
  console.log("================================================================");
  console.log(`📚 CMMI 过程资产清单（${files.length} 份）`);
  console.log("================================================================");
  for (const f of files) {
    const head = fs.readFileSync(f.file, "utf8").split("\n").find((l) => l.includes(HEADER_MARKER));
    const rel = path.relative(ROOT, f.file);
    console.log(`  [${f.phase}] ${rel}${head ? "" : "   ⚠️ 无标准头部"}`);
  }
  process.exit(0);
}

function handleCheck() {
  const all = hasFlag("--all");
  const json = hasFlag("--json");
  const files = collectAssets();

  const issues = [];
  const checked = [];
  for (const f of files) {
    const text = fs.readFileSync(f.file, "utf8");
    const rel = path.relative(ROOT, f.file);
    const hasHeader = text.split("\n").some((l) => l.includes(HEADER_MARKER));
    if (!all && !hasHeader) continue; // 默认只校验脚手架产出的资产
    checked.push(rel);
    if (!hasHeader) issues.push(`${rel}: 缺少「${HEADER_MARKER}」标准头部`);
    if (text.includes("<!-- TODO")) issues.push(`${rel}: 仍存在 TODO 待填段落`);
  }

  if (json) {
    console.log(JSON.stringify({ checked: checked.length, issues }, null, 2));
  } else {
    console.log(
      `CMMI 资产校验: 检查 ${checked.length} 份${all ? "（全量）" : "（仅含标准头部）"}，问题 ${issues.length} 处`
    );
    for (const i of issues.slice(0, 30)) console.log(`  ❌ ${i}`);
    if (issues.length > 30) console.log(`  … 其余 ${issues.length - 30} 处省略`);
  }
  process.exit(issues.length === 0 ? 0 : 1);
}

const command = process.argv[2] && !process.argv[2].startsWith("-") ? process.argv[2] : "help";
switch (command) {
  case "new":
    handleNew();
    break;
  case "list":
    handleList();
    break;
  case "check":
    handleCheck();
    break;
  default:
    usage();
    process.exit(0);
}
