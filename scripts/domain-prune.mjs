#!/usr/bin/env node
/**
 * scripts/domain-prune.mjs
 *
 * 层B 交付物领域裁剪与业务纯粹化引擎 (Layer B Domain Pruning Engine)
 *
 * 核心目标：
 * 消除 RuoYi / Yudao 官方通用脚手架中的 1500+ 无关全家桶菜单（ERP, WMS, MES, OA, HRM, FMS, PMS, AI, IoT, 作者动态, 文档链接等），
 * 将交付物收敛为纯粹、高信噪比的垂直业务系统（如美妆商城、电子书城等）。
 *
 * 规范：
 * 1. 自动执行：在 lite-up.mjs、service.sh install、lifecycle.sh install 时自动触发，无需人工手动清理。
 * 2. 幂等安全：支持多次执行，支持 --check（干跑检测）、--apply（落盘生效）。
 * 3. 干净优雅：不破坏数据库约束，递归停用并隐藏无关菜单树。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// 通用脚手架噪声（任何垂直业务系统均应彻底屏蔽的噪音）
export const SCAFFOLD_NOISE_MENUS = [
  '作者动态',
  'Boot 开发文档',
  'Cloud 开发文档',
  '开发文档',
  '官方源码',
  '交流社区',
];

// 垂直领域保留与裁剪规则
export const DOMAIN_PROFILES = {
  mall: {
    name: '商城系统 / 零售电商',
    keepTopMenus: ['MALL 商城系统', '会员中心', '支付管理', '系统管理', '基础设施'],
    pruneTopMenus: [
      'CRM 系统',
      'ERP 系统',
      'WMS 系统',
      'MES 系统',
      'OA 办公协同',
      'HRM 人力资源',
      'FMS 财务管理',
      'PMS 项目管理',
      'AI 大模型',
      'IoT 物联网',
      'IM 即时通讯',
      'MP 公众号管理',
      'CMS 内容管理',
      '工作流程',
      '报表管理',
      ...SCAFFOLD_NOISE_MENUS,
    ],
  },
  general: {
    name: '通用中台',
    keepTopMenus: ['系统管理', '基础设施'],
    pruneTopMenus: [...SCAFFOLD_NOISE_MENUS],
  },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const value = (flag) => {
    const idx = args.indexOf(flag);
    return idx >= 0 && args[idx + 1] && !args[idx + 1].startsWith('--') ? args[idx + 1] : undefined;
  };
  return {
    domain: value('--domain') || 'mall',
    apply: args.includes('--apply'),
    check: args.includes('--check'),
    help: args.includes('--help') || args.includes('-h'),
  };
}

async function getPgClient() {
  const pgRuntime = await import(path.join(ROOT, 'deploy/lite/runtime/lite-pg.mjs'));
  let user = pgRuntime.DEFAULTS.user;
  let password = pgRuntime.DEFAULTS.password;
  const port = Number(process.env.LITE_PG_PORT || pgRuntime.DEFAULTS.port);
  const database = pgRuntime.DEFAULTS.database;

  const client = pgRuntime.makeClient({ port, user, password, database });
  await client.connect();
  return client;
}

export async function pruneDatabaseMenus(client, domain = 'mall', apply = false) {
  const profile = DOMAIN_PROFILES[domain] || DOMAIN_PROFILES.mall;
  const pruneNames = profile.pruneTopMenus;

  // 1. 查询当前顶层菜单中待裁剪的项目
  const findTopSql = `
    SELECT id, name, visible, status FROM system_menu 
    WHERE parent_id = 0 AND name = ANY($1::text[])
  `;
  const topRes = await client.query(findTopSql, [pruneNames]);
  const activeTops = topRes.rows.filter(r => r.visible === true || r.status === 0);

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

  // 3. 额外清理外链/错误路径路由 (例如 path 以 # 开头或 http 开头的前端死链接)
  const deadLinkSql = `
    SELECT count(*)::int as count FROM system_menu 
    WHERE visible = true AND (path LIKE '#%' OR path LIKE 'http%')
  `;
  const deadRes = await client.query(deadLinkSql);
  const deadCount = deadRes.rows[0]?.count || 0;

  if (!apply) {
    return {
      activeTopNoiseCount: activeTops.length,
      activeTopNoiseNames: activeTops.map(t => t.name),
      totalSubmenuCount: totalToPrune,
      deadLinkCount: deadCount,
      clean: activeTops.length === 0 && deadCount === 0,
    };
  }

  // 执行真实更新：停用 (status = 1) 并隐藏 (visible = false)
  const updateSql = `
    WITH RECURSIVE disabled_menus AS (
      SELECT id FROM system_menu WHERE parent_id = 0 AND name = ANY($1::text[])
      UNION ALL
      SELECT m.id FROM system_menu m INNER JOIN disabled_menus d ON m.parent_id = d.id
    )
    UPDATE system_menu 
    SET visible = false, status = 1 
    WHERE id IN (SELECT id FROM disabled_menus);
  `;
  await client.query(updateSql, [pruneNames]);

  // 隐藏所有外链或 # 路径菜单
  await client.query(`
    UPDATE system_menu 
    SET visible = false, status = 1 
    WHERE path LIKE '#%' OR path LIKE 'http%'
  `);

  // 将 MALL 商城系统置顶 (sort = 1)
  await client.query(`
    UPDATE system_menu 
    SET sort = 1, visible = true, status = 0 
    WHERE name = 'MALL 商城系统'
  `);

  // 会员中心紧随其后 (sort = 2)
  await client.query(`
    UPDATE system_menu 
    SET sort = 2, visible = true, status = 0 
    WHERE name = '会员中心'
  `);

  // 支付管理 (sort = 3)
  await client.query(`
    UPDATE system_menu 
    SET sort = 3, visible = true, status = 0 
    WHERE name = '支付管理'
  `);

  return {
    prunedTopNames: activeTops.map(t => t.name),
    totalPrunedCount: totalToPrune,
    deadLinkCount: deadCount,
    clean: true,
  };
}

async function main() {
  const opts = parseArgs();
  if (opts.help) {
    console.log(`
用法: node scripts/domain-prune.mjs [--domain mall|general] [--check] [--apply]

说明:
  --domain <name>   指定业务领域（默认 mall）
  --check           仅检测当前数据库中是否存在脚手架噪声菜单
  --apply           执行真实裁剪与置顶更新
`);
    process.exit(0);
  }

  let client;
  try {
    client = await getPgClient();
  } catch (err) {
    console.error('❌ 连接数据库失败:', err.message);
    process.exit(1);
  }

  try {
    if (opts.check) {
      const res = await pruneDatabaseMenus(client, opts.domain, false);
      if (res.clean) {
        console.log('✅ 数据库菜单已高度纯粹，无未裁剪脚手架噪声。');
        process.exit(0);
      } else {
        console.warn('⚠️ 发现脚手架噪声菜单:');
        console.warn('  未裁剪顶层系统:', res.activeTopNoiseNames.join(', '));
        console.warn('  待收敛子菜单总数:', res.totalSubmenuCount);
        console.warn('  外链死链接数:', res.deadLinkCount);
        console.warn('请执行: node scripts/domain-prune.mjs --apply 进行清洗。');
        process.exit(1);
      }
    } else {
      console.log(`🧹 执行领域清洗 (Domain: ${opts.domain})...`);
      const res = await pruneDatabaseMenus(client, opts.domain, true);
      console.log(`✅ 清洗完成！已停用并隐藏 ${res.prunedTopNames.length} 个非业务系统 (${res.totalPrunedCount} 个菜单节点)`);
      if (res.prunedTopNames.length > 0) {
        console.log('   已屏蔽顶层系统:', res.prunedTopNames.join(', '));
      }
      console.log('   已置顶业务模块: MALL 商城系统, 会员中心, 支付管理');
      process.exit(0);
    }
  } finally {
    await client.end();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main().catch(err => {
    console.error('❌ 清洗异常:', err);
    process.exit(1);
  });
}
