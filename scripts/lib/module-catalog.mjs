/**
 * scripts/lib/module-catalog.mjs
 *
 * Yudao-Cloud 后端模块元数据唯一真源 (Single Source of Truth)
 *
 * 治理依据：
 * - AGENTS.md Rule 0 第 11 条（单一真源与过程资产防污染）：裁剪逻辑只允许存在一份实现。
 * - AGENTS.md Rule 13（全能力 AI Agent 驱动）：元数据必须机器可读，供 CLI 与 MCP server 共用。
 *
 * 消费方（禁止复制任何模块清单）：
 * - scripts/trim-modules.mjs            模块裁剪 CLI
 * - scripts/mcp/yudao-mcp-server.cjs    MCP 端点（modules_list 工具）
 *
 * javaFiles 为在本仓实测值，非文档估算值。
 * 测量口径：统计 .java 文件时必须排除构建产物目录 target
 * （构建会在其中生成 MapStruct 等实现类，包含它会把数字虚高）。
 */

/** 后端根目录（相对仓库根） */
export const BACKEND_DIR = "apps/backend";
/** 后端根 POM，<modules> 节点所在处 */
export const ROOT_POM = `${BACKEND_DIR}/pom.xml`;
/** 单体启动器 POM，模块依赖声明处 */
export const SERVER_POM = `${BACKEND_DIR}/yudao-server/pom.xml`;

/** 任何裁剪都必须保留的地基模块 */
export const CORE_MODULE_IDS = ["system", "infra"];

/**
 * 裁剪永远不动的 Java 文件数（实测）。
 * 构成：yudao-framework 395 + yudao-gateway 18 + yudao-server 2 +
 *       apps/backend/sql/dm/flowable-patch 第三方 patch 3 = 418。
 * 用途：让「模块级」统计能对齐全后端口径（19 模块 6,929 + 418 = 7,347）。
 */
export const NON_TRIM_JAVA_FILES = 418;

/**
 * 19 个业务模块元数据。
 * deps：强依赖前置模块（裁剪时必须闭包保留）。
 * optionalDeps：可选依赖，缺失不阻断编译。
 * dictPrefixes：该模块在 system_dict_type/data 中的字典前缀（未知留空，工具会提示需手工核对）。
 */
export const MODULES = [
  {
    id: "system",
    dir: "yudao-module-system",
    label: "系统管理中枢",
    deps: [],
    javaFiles: 462,
    serverArtifacts: ["yudao-module-system-server"],
  },
  {
    id: "infra",
    dir: "yudao-module-infra",
    label: "基础设施服务",
    deps: ["system"],
    javaFiles: 217,
    serverArtifacts: ["yudao-module-infra-server"],
  },
  {
    id: "member",
    dir: "yudao-module-member",
    label: "会员中心",
    deps: ["system"],
    javaFiles: 190,
    serverArtifacts: ["yudao-module-member-server"],
  },
  {
    id: "pay",
    dir: "yudao-module-pay",
    label: "统一支付中心",
    deps: ["system"],
    javaFiles: 242,
    serverArtifacts: ["yudao-module-pay-server"],
  },
  {
    id: "report",
    dir: "yudao-module-report",
    label: "报表大屏",
    deps: ["system"],
    javaFiles: 35,
    serverArtifacts: ["yudao-module-report-server"],
  },
  {
    id: "bpm",
    dir: "yudao-module-bpm",
    label: "工作流引擎",
    deps: ["system"],
    javaFiles: 264,
    serverArtifacts: ["yudao-module-bpm-server"],
  },
  {
    id: "mp",
    dir: "yudao-module-mp",
    label: "微信公众号平台",
    deps: ["system"],
    javaFiles: 129,
    serverArtifacts: ["yudao-module-mp-server"],
  },
  {
    id: "mall",
    dir: "yudao-module-mall",
    label: "电商零售套件",
    deps: ["system", "member", "pay"],
    javaFiles: 842,
    // mall 是 4 个子模块套件：product / promotion / trade / statistics
    serverArtifacts: [
      "yudao-module-product-server",
      "yudao-module-promotion-server",
      "yudao-module-trade-server",
      "yudao-module-statistics-server",
    ],
    dictPrefixes: ["trade_", "product_", "promotion_"],
  },
  {
    id: "crm",
    dir: "yudao-module-crm",
    label: "客户关系管理",
    deps: ["system"],
    optionalDeps: ["bpm"],
    javaFiles: 288,
    serverArtifacts: ["yudao-module-crm-server"],
  },
  {
    id: "erp",
    dir: "yudao-module-erp",
    label: "企业进销存",
    deps: ["system"],
    javaFiles: 221,
    serverArtifacts: ["yudao-module-erp-server"],
    dictPrefixes: ["erp_"],
  },
  {
    id: "mes",
    dir: "yudao-module-mes",
    label: "制造执行系统",
    deps: ["system"],
    javaFiles: 1153,
    serverArtifacts: ["yudao-module-mes-server"],
    dictPrefixes: ["mes_"],
  },
  {
    id: "wms",
    dir: "yudao-module-wms",
    label: "仓储物流管理",
    deps: ["system"],
    javaFiles: 165,
    serverArtifacts: ["yudao-module-wms-server"],
  },
  {
    id: "im",
    dir: "yudao-module-im",
    label: "即时通讯中枢",
    deps: ["system"],
    javaFiles: 303,
    serverArtifacts: ["yudao-module-im-server"],
  },
  {
    id: "ai",
    dir: "yudao-module-ai",
    label: "AI 大模型中枢",
    deps: ["system"],
    javaFiles: 226,
    serverArtifacts: ["yudao-module-ai-server"],
    requiresJdk: 17,
  },
  {
    id: "iot",
    dir: "yudao-module-iot",
    label: "物联网设备平台",
    deps: ["system"],
    javaFiles: 475,
    serverArtifacts: ["yudao-module-iot-server"],
  },
  {
    id: "hrm",
    dir: "yudao-module-hrm",
    label: "人力资源中枢",
    deps: ["system", "bpm"],
    javaFiles: 634,
    serverArtifacts: ["yudao-module-hrm-server"],
  },
  {
    id: "fms",
    dir: "yudao-module-fms",
    label: "财务核算管理",
    deps: ["system", "bpm"],
    javaFiles: 290,
    serverArtifacts: ["yudao-module-fms-server"],
  },
  {
    id: "pms",
    dir: "yudao-module-pms",
    label: "项目协同管理",
    deps: ["system"],
    javaFiles: 316,
    serverArtifacts: ["yudao-module-pms-server"],
  },
  {
    id: "oa",
    dir: "yudao-module-oa",
    label: "日常办公协同",
    deps: ["system", "bpm"],
    javaFiles: 477,
    serverArtifacts: ["yudao-module-oa-server"],
  },
];

export const MODULE_IDS = MODULES.map((m) => m.id);

/**
 * 预设装配档（对标 .agents/skills/yudao-cloud-bootstrap/SKILL.md §2 的 mini / full 选型）。
 * lite：生活服务 / 轻量级 C 端运营平台（保留 5 模块，文档实测 7,347 → 1,593 个 Java 文件）。
 */
export const PROFILES = {
  mini: ["system", "infra"],
  lite: ["system", "infra", "member", "pay", "report"],
  full: MODULE_IDS,
};

export function getModule(id) {
  return MODULES.find((m) => m.id === id) || null;
}

export function moduleByDir(dir) {
  return MODULES.find((m) => m.dir === dir) || null;
}

/** 闭包扩张：把 keep 集合的强依赖递归补全，返回 { ids, added } */
export function expandClosure(keepIds) {
  const keep = new Set(keepIds);
  const added = new Set();
  const queue = [...keep];

  while (queue.length > 0) {
    const id = queue.shift();
    const mod = getModule(id);
    if (!mod) continue;
    for (const dep of mod.deps) {
      if (!keep.has(dep)) {
        keep.add(dep);
        added.add(dep);
        queue.push(dep);
      }
    }
  }

  const order = MODULE_IDS.filter((id) => keep.has(id));
  return { ids: order, added: [...added] };
}

/** 冲突检测：remove 集合中是否有被 kept 模块强依赖的模块 */
export function findConflicts(keepIds, removeIds) {
  const remove = new Set(removeIds);
  const conflicts = [];

  for (const id of keepIds) {
    const mod = getModule(id);
    if (!mod) continue;
    for (const dep of mod.deps) {
      if (remove.has(dep)) {
        conflicts.push({ keeper: id, required: dep });
      }
    }
  }

  return conflicts;
}

/** 校验 keep 集合的合法性（core 模块必须保留、id 必须存在）。返回错误信息数组。 */
export function validateKeep(keepIds) {
  const errors = [];

  for (const id of keepIds) {
    if (!getModule(id)) errors.push(`未知模块 id: "${id}"`);
  }

  for (const core of CORE_MODULE_IDS) {
    if (!keepIds.includes(core)) {
      errors.push(`必须保留地基模块 "${core}"（业务模块全部依赖它）`);
    }
  }

  return errors;
}

export function resolveProfile(name) {
  if (!name) return null;
  const ids = PROFILES[name];
  if (!ids) return null;
  return [...ids];
}

/** 统计一个 keep 集合的规模画像 */
export function summarize(keepIds) {
  const kept = keepIds.map(getModule).filter(Boolean);
  const removed = MODULES.filter((m) => !keepIds.includes(m.id));
  const keptJava = kept.reduce((sum, m) => sum + m.javaFiles, 0);
  const removedJava = removed.reduce((sum, m) => sum + m.javaFiles, 0);
  const moduleTotal = keptJava + removedJava;

  return {
    keep: kept.map((m) => m.id),
    remove: removed.map((m) => m.id),
    keptJavaFiles: keptJava,
    removedJavaFiles: removedJava,
    moduleTotalJavaFiles: moduleTotal,
    nonTrimJavaFiles: NON_TRIM_JAVA_FILES,
    // 全后端口径（含 19 模块以外的框架/网关/单体壳），与文档基线 7,347 对齐
    keptBackendJavaFiles: keptJava + NON_TRIM_JAVA_FILES,
    backendTotalJavaFiles: moduleTotal + NON_TRIM_JAVA_FILES,
    reductionPercent:
      moduleTotal === 0
        ? 0
        : Number(((removedJava / (moduleTotal + NON_TRIM_JAVA_FILES)) * 100).toFixed(1)),
  };
}

/**
 * 生成裁剪后的菜单 / 字典清理 SQL。
 * 只输出确定性语句；被裁模块的顶级菜单名无法从代码可靠推导，
 * 因此额外给出一条 SELECT 帮助运维列出候选，绝不硬编码猜测的菜单名。
 */
export function buildPurgeSql(removedIds) {
  const removed = removedIds.map(getModule).filter(Boolean);
  const prefixes = removed.flatMap((m) => m.dictPrefixes || []);
  const unknown = removed.filter((m) => !m.dictPrefixes || m.dictPrefixes.length === 0);

  const lines = [];
  lines.push("-- =============================================================================");
  lines.push("-- Yudao-Cloud 模块裁剪后数据库清理脚本");
  lines.push(`-- 已裁模块: ${removed.map((m) => m.id).join(", ")}`);
  lines.push("-- 生成方: scripts/trim-modules.mjs（请勿手改，改 catalog 后重新生成）");
  lines.push("-- =============================================================================");
  lines.push("");
  lines.push("-- ① 先列出顶级菜单候选（parent_id = 0），确认被裁模块对应的菜单行后再放开 DELETE");
  lines.push("SELECT id, name, path, component FROM system_menu WHERE parent_id = 0 ORDER BY id;");
  lines.push("");
  lines.push("-- ② 删除顶级菜单（示例，务必先用 ① 核对 name，不要直接照抄）");
  lines.push("-- DELETE FROM system_menu WHERE parent_id = 0 AND name IN (/* 从 ① 的结果中挑选 */);");
  lines.push("");
  lines.push("-- ③ 递归清理孤儿子菜单（反复执行直至 Affected rows 为 0）");
  lines.push("DELETE FROM system_menu");
  lines.push("WHERE parent_id NOT IN (SELECT id FROM (SELECT id FROM system_menu) AS TEMP)");
  lines.push("  AND parent_id > 0;");
  lines.push("");
  lines.push("-- ④ 清理角色与已删除菜单的映射关系");
  lines.push("DELETE FROM system_role_menu WHERE menu_id NOT IN (SELECT id FROM system_menu);");
  lines.push("");

  if (prefixes.length > 0) {
    lines.push("-- ⑤ 清理已知前缀的字典数据与字典类型");
    for (const prefix of prefixes) {
      lines.push(`DELETE FROM system_dict_data WHERE dict_type LIKE '${prefix}%';`);
      lines.push(`DELETE FROM system_dict_type WHERE type LIKE '${prefix}%';`);
    }
  } else {
    lines.push("-- ⑤ 本次裁剪的模块未登记字典前缀，无字典清理语句生成");
  }

  if (unknown.length > 0) {
    lines.push("");
    lines.push("-- ⚠️ 以下模块的字典前缀未在 module-catalog 中登记，需人工核对 system_dict_type 后补删:");
    lines.push(`--    ${unknown.map((m) => m.id).join(", ")}`);
    lines.push("--    SELECT type, name FROM system_dict_type ORDER BY type;");
  }

  return lines.join("\n");
}
