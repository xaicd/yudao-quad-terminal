#!/usr/bin/env node
/**
 * scripts/domain-prune.mjs
 *
 * 层B 交付物领域裁剪与业务纯粹化引擎 (Layer B Domain Pruning Engine)
 *
 * 核心目标：
 * 消除 RuoYi / Yudao 官方通用脚手架中的 1500+ 无关全家桶菜单（ERP, WMS, MES, OA, HRM, FMS, PMS, AI, IoT, 作者动态, 文档链接等）
 * 以及上游已移除 Controller 的残留死链（如 /infra/job 定时任务）、单企业政企场景不需要的「租户管理」，
 * 将交付物收敛为纯粹、高信噪比的垂直业务系统。
 *
 * 规范：
 * 1. 自动执行：在 lite-up.mjs、service.sh install、lifecycle.sh install 时自动触发，无需人工手动清理。
 * 2. 幂等安全：支持多次执行，支持 --check（干跑检测）、--apply（落盘生效）、--scan-docs（零脚手架噪声文档扫描）。
 * 3. 干净优雅：不破坏数据库约束，递归停用并隐藏无关菜单树，并同步淘汰 Redis 菜单缓存。
 */

import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const localRequire = createRequire(import.meta.url);
const { UPSTREAM_MENU_RENAMES, UPSTREAM_PROMO_MENU_NAMES } = localRequire("./lib/menu-standard.cjs");

// 通用脚手架噪声（任何垂直业务系统均应彻底屏蔽的噪音）
export const SCAFFOLD_NOISE_MENUS = [
  "作者动态",
  "Boot 开发文档",
  "Cloud 开发文档",
  "开发文档",
  "官方源码",
  "交流社区",
];

// 全家桶非核心套件菜单
export const UNUSED_SUITE_MENUS = [
  "CRM 系统",
  "ERP 系统",
  "WMS 系统",
  "MES 系统",
  "OA 办公协同",
  "HRM 人力资源",
  "FMS 财务管理",
  "PMS 项目管理",
  "AI 大模型",
  "IoT 物联网",
  "IM 即时通讯",
  "MP 公众号管理",
  "CMS 内容管理",
  "工作流程",
  "报表管理",
];

// 上游已移除后端 Controller 或单企政企默认屏蔽的子菜单
export const BROKEN_OR_TENANT_SUBMENUS = [
  "定时任务", // 上游 master-jdk17 已移除 infra Quartz JobController，保留会 404
  "租户管理",
  "租户列表",
  "租户套餐",
];

// 垂直领域保留与裁剪规则
export const DOMAIN_PROFILES = {
  mall: {
    name: "商城系统 / 零售电商",
    keepTopMenus: ["MALL 商城系统", "商城系统", "会员中心", "支付管理", "系统管理", "基础设施"],
    pruneTopMenus: [...UNUSED_SUITE_MENUS, ...SCAFFOLD_NOISE_MENUS],
    enableMallTopMenus: true,
    pruneTenantSubmenus: false,
  },
  general: {
    name: "政企/行业垂直中台（零全家桶噪声）",
    keepTopMenus: ["系统管理", "基础设施"],
    pruneTopMenus: [
      ...UNUSED_SUITE_MENUS,
      "MALL 商城系统",
      "商城系统",
      "会员中心",
      "支付管理",
      ...SCAFFOLD_NOISE_MENUS,
    ],
    enableMallTopMenus: false,
    pruneTenantSubmenus: true,
  },
  enterprise: {
    name: "政企/电信专网管控平台（单企多组织 + 零脚手架噪声）",
    keepTopMenus: ["系统管理", "基础设施"],
    pruneTopMenus: [
      ...UNUSED_SUITE_MENUS,
      "MALL 商城系统",
      "商城系统",
      "会员中心",
      "支付管理",
      ...SCAFFOLD_NOISE_MENUS,
    ],
    enableMallTopMenus: false,
    pruneTenantSubmenus: true,
  },
};

function loadEnvPorts(rootDir) {
  const out = {};
  const file = path.join(rootDir, ".env.ports");
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const idx = t.indexOf("=");
    if (idx > 0) out[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
  }
  return out;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const envPorts = loadEnvPorts(ROOT);
  const value = (flag) => {
    const idx = args.indexOf(flag);
    return idx >= 0 && args[idx + 1] && !args[idx + 1].startsWith("--") ? args[idx + 1] : undefined;
  };
  const defaultDomain =
    envPorts.DOMAIN_PROFILE || (fs.existsSync(path.join(ROOT, ".gitmodules")) ? "mall" : "general");
  return {
    domain: value("--domain") || process.env.LITE_DOMAIN_PROFILE || defaultDomain,
    apply: args.includes("--apply"),
    check: args.includes("--check"),
    scanDocs: args.includes("--scan-docs"),
    help: args.includes("--help") || args.includes("-h"),
  };
}

async function getPgClient() {
  const envPorts = loadEnvPorts(ROOT);
  const pgRuntime = await import(path.join(ROOT, "deploy/lite/runtime/lite-pg.mjs"));
  const user = pgRuntime.DEFAULTS.user;
  const password = pgRuntime.DEFAULTS.password;
  const port = Number(process.env.LITE_PG_PORT || process.env.DB_PORT || envPorts.DB_PORT || pgRuntime.DEFAULTS.port);
  const database = pgRuntime.DEFAULTS.database;

  const client = pgRuntime.makeClient({ port, user, password, database });
  await client.connect();
  return client;
}

/**
 * 通过原生 RESP 协议清理 Redis 中的菜单与角色权限缓存，确保裁剪立即在前端生效
 */
export async function flushRedisMenuCache({ redisPort, redisPassword } = {}) {
  const envPorts = loadEnvPorts(ROOT);
  const port = Number(redisPort || process.env.LITE_REDIS_PORT || envPorts.REDIS_PORT || 63799);
  let password = redisPassword || process.env.LITE_REDIS_PASSWORD || "";
  if (!password) {
    const credFile = path.join(ROOT, ".commandcode/lite/credentials.env");
    if (fs.existsSync(credFile)) {
      const m = /^LITE_REDIS_PASSWORD=(.+)$/m.exec(fs.readFileSync(credFile, "utf8"));
      if (m) password = m[1].trim();
    }
  }

  return new Promise((resolve) => {
    const socket = net.createConnection({ host: "127.0.0.1", port });
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      try {
        socket.destroy();
      } catch {}
      resolve({ flushed: ok });
    };
    socket.setTimeout(1500, () => finish(false));
    socket.on("error", () => finish(false));
    socket.on("connect", () => {
      const encodeResp = (parts) =>
        `*${parts.length}\r\n` + parts.map((p) => `$${Buffer.byteLength(String(p))}\r\n${p}\r\n`).join("");
      const cmds = [];
      if (password) cmds.push(encodeResp(["AUTH", password]));
      cmds.push(encodeResp(["FLUSHDB"]));
      cmds.push(encodeResp(["QUIT"]));
      socket.write(cmds.join(""), () => setTimeout(() => finish(true), 80));
    });
  });
}

export function scanScaffoldResidueInDocs(rootDir = ROOT) {
  const hits = [];
  const targets = ["README.md", "GOAL.md", "docs/specs"];
  const forbidden = [/iocoder\.cn/i, /ruoyi-vue-pro/i, /萌新必读/];
  const walk = (abs) => {
    if (!fs.existsSync(abs)) return;
    const st = fs.statSync(abs);
    if (st.isDirectory()) {
      for (const entry of fs.readdirSync(abs)) walk(path.join(abs, entry));
      return;
    }
    if (!/\.(md|json|yaml|yml)$/i.test(abs)) return;
    const rel = path.relative(rootDir, abs);
    if (rel.startsWith("docs/00_meta_standards/")) return;
    const text = fs.readFileSync(abs, "utf8");
    for (const re of forbidden) {
      if (re.test(text)) hits.push({ file: rel, pattern: String(re) });
    }
  };
  if (!fs.existsSync(path.join(rootDir, ".gitmodules"))) {
    for (const t of targets) walk(path.join(rootDir, t));
  }
  return hits;
}

export async function pruneDatabaseMenus(client, domain = "mall", apply = false) {
  const profile = DOMAIN_PROFILES[domain] || DOMAIN_PROFILES.general;
  const pruneNames = profile.pruneTopMenus;

  // 1. 查询当前顶层菜单中待裁剪的项目
  const findTopSql = `
    SELECT id, name, visible, status FROM system_menu
    WHERE parent_id = 0 AND name = ANY($1::text[])
  `;
  const topRes = await client.query(findTopSql, [pruneNames]);
  const activeTops = topRes.rows.filter((r) => r.visible === true || r.status === 0);

  // 2. 递归查询所有要被裁剪的子菜单数量
  const countAllSql = `
    WITH RECURSIVE disabled_menus AS (
      SELECT id FROM system_menu WHERE parent_id = 0 AND name = ANY($1::text[])
      UNION ALL
      SELECT m.id FROM system_menu m INNER JOIN disabled_menus d ON m.parent_id = d.id
    )
    SELECT count(*)::int as count FROM disabled_menus;
  `;
  const countRes = await client.query(countAllSql, [pruneNames]);
  const totalToPrune = countRes.rows[0]?.count || 0;

  // 3. 额外检测外链/死链路由（path 以 # / http 开头，或上游已移除的 /infra/job 定时任务）
  const deadLinkSql = `
    SELECT count(*)::int as count FROM system_menu
    WHERE visible = true AND (
      path LIKE '#%' OR path LIKE 'http%' OR path IN ('job', '/infra/job') OR component LIKE 'infra/job/%'
    )
  `;
  const deadRes = await client.query(deadLinkSql);
  const deadCount = deadRes.rows[0]?.count || 0;

  if (!apply) {
    return {
      activeTopNoiseCount: activeTops.length,
      activeTopNoiseNames: activeTops.map((t) => t.name),
      totalSubmenuCount: totalToPrune,
      deadLinkCount: deadCount,
      clean: activeTops.length === 0 && deadCount === 0,
    };
  }

  // 执行真实更新：停用 (status = 1) 并隐藏 (visible = false)
  await client.query(
    `
    WITH RECURSIVE disabled_menus AS (
      SELECT id FROM system_menu WHERE parent_id = 0 AND name = ANY($1::text[])
      UNION ALL
      SELECT m.id FROM system_menu m INNER JOIN disabled_menus d ON m.parent_id = d.id
    )
    UPDATE system_menu
    SET visible = false, status = 1
    WHERE id IN (SELECT id FROM disabled_menus);
  `,
    [pruneNames]
  );

  // 隐藏所有外链、# 路径菜单与上游已移除 Controller 的 /infra/job 死链
  await client.query(
    `
    WITH RECURSIVE dead_submenus AS (
      SELECT id FROM system_menu
      WHERE path LIKE '#%'
         OR path LIKE 'http%'
         OR name = ANY($1::text[])
         OR path IN ('job', '/infra/job')
         OR component LIKE 'infra/job/%'
      UNION ALL
      SELECT m.id FROM system_menu m INNER JOIN dead_submenus d ON m.parent_id = d.id
    )
    UPDATE system_menu
    SET visible = false, status = 1
    WHERE id IN (SELECT id FROM dead_submenus);
  `,
    [UPSTREAM_PROMO_MENU_NAMES]
  );

  // 政企单企模式隐藏「租户管理 / 租户列表 / 租户套餐」
  if (profile.pruneTenantSubmenus) {
    await client.query(
      `
      WITH RECURSIVE tenant_menus AS (
        SELECT id FROM system_menu WHERE name = ANY($1::text[]) OR path IN ('tenant', '/system/tenant')
        UNION ALL
        SELECT m.id FROM system_menu m INNER JOIN tenant_menus t ON m.parent_id = t.id
      )
      UPDATE system_menu
      SET visible = false, status = 1
      WHERE id IN (SELECT id FROM tenant_menus);
    `,
      [BROKEN_OR_TENANT_SUBMENUS]
    );
  }

  // 同步 <= 4 字标准短菜单名
  for (const [idStr, cleanName] of Object.entries(UPSTREAM_MENU_RENAMES)) {
    await client.query("UPDATE system_menu SET name = $1 WHERE id = $2 AND name <> $1", [
      cleanName,
      Number(idStr),
    ]);
  }

  // 仅在 mall 画像下置顶商城三件套；政企/通用垂直项目绝不重新唤醒商城菜单！
  if (profile.enableMallTopMenus) {
    await client.query(`
      UPDATE system_menu
      SET sort = 1, name = '商城系统', visible = true, status = 0
      WHERE id = 449 OR name IN ('MALL 商城系统', '商城系统')
    `);
    await client.query(`
      UPDATE system_menu
      SET sort = 2, visible = true, status = 0
      WHERE name = '会员中心'
    `);
    await client.query(`
      UPDATE system_menu
      SET sort = 3, visible = true, status = 0
      WHERE name = '支付管理'
    `);
  }

  return {
    prunedTopNames: activeTops.map((t) => t.name),
    totalPrunedCount: totalToPrune,
    deadLinkCount: deadCount,
    clean: true,
  };
}

async function main() {
  const opts = parseArgs();
  if (opts.help) {
    console.log(`
用法: node scripts/domain-prune.mjs [--domain mall|general|enterprise] [--check] [--apply] [--scan-docs]

说明:
  --domain <name>   指定业务领域（母本默认 mall，派生项目默认 general）
  --check           仅检测当前数据库中是否存在脚手架噪声菜单
  --apply           执行真实裁剪与 Redis 菜单缓存刷新
  --scan-docs       扫描派生项目文档是否残留脚手架推广外链
`);
    process.exit(0);
  }

  if (opts.scanDocs) {
    const hits = scanScaffoldResidueInDocs(ROOT);
    if (hits.length > 0) {
      console.error("❌ 发现文档脚手架噪声残留:");
      for (const h of hits) console.error(`   - ${h.file} (${h.pattern})`);
      process.exit(1);
    }
    console.log("✅ 文档零脚手架噪声校验通过");
    if (!opts.check && !opts.apply) process.exit(0);
  }

  let client;
  try {
    client = await getPgClient();
  } catch (err) {
    console.error("❌ 连接数据库失败:", err.message);
    process.exit(1);
  }

  try {
    if (opts.check) {
      const res = await pruneDatabaseMenus(client, opts.domain, false);
      if (res.clean) {
        console.log("✅ 数据库菜单已高度纯粹，无未裁剪脚手架噪声。");
        process.exit(0);
      } else {
        console.warn("⚠️ 发现脚手架噪声菜单:");
        console.warn("  未裁剪顶层系统:", res.activeTopNoiseNames.join(", "));
        console.warn("  待收敛子菜单总数:", res.totalSubmenuCount);
        console.warn("  外链/死链数:", res.deadLinkCount);
        console.warn(`请执行: node scripts/domain-prune.mjs --domain ${opts.domain} --apply 进行清洗。`);
        process.exit(1);
      }
    } else {
      console.log(`🧹 执行领域清洗 (Domain: ${opts.domain})...`);
      const res = await pruneDatabaseMenus(client, opts.domain, true);
      await flushRedisMenuCache();
      console.log(
        `✅ 清洗完成！已停用并隐藏 ${res.prunedTopNames.length} 个非业务系统 (${res.totalPrunedCount} 个菜单节点)`
      );
      if (res.prunedTopNames.length > 0) {
        console.log("   已屏蔽顶层系统:", res.prunedTopNames.join(", "));
      }
      process.exit(0);
    }
  } finally {
    await client.end();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main().catch((err) => {
    console.error("❌ 清洗异常:", err);
    process.exit(1);
  });
}
