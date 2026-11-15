/**
 * scripts/lib/menu-standard.cjs
 *
 * 导航菜单 <= 4 字硬标准与上游推广菜单清洗字典（单一真源）
 *
 * 适用范围：
 * 1. deploy/lite/runtime/lite-pg.mjs —— 官方 SQL 导入后标准化 >4 字菜单并隐藏外链推广菜单；
 * 2. scripts/blueprint-engine.cjs —— blueprint:doctor / compile-domain 自动收敛 menuName <= 4 字；
 * 3. scripts/codegen-module.mjs —— 生成目录/页面 system_menu SQL 时强制 name <= 4 字（完整标题留存 remark/注释）；
 * 4. scripts/gate-check.mjs —— 门禁静态阻断超 4 字导航菜单。
 */

const MAX_MENU_NAME_LENGTH = 4;

/** 上游种子 SQL 中需要强制停用并隐藏的作者动态/源码推广/外链菜单 */
const UPSTREAM_PROMO_MENU_NAMES = [
  "作者动态",
  "Boot 开发文档",
  "Cloud 开发文档",
  "开发文档",
  "官方源码",
  "交流社区",
];

/**
 * 上游 ruoyi-vue-pro.sql 中可见目录/页面菜单 (type IN (1, 2)) 超 4 字行的确定性 4 字映射表
 * 重点覆盖基础设施与系统底座高频可见项（如 17/88/195）及商城/会员/支付可见项
 */
const UPSTREAM_MENU_RENAMES = {
  15: "数据监控", // MySQL 监控
  16: "服务监控", // Java 监控
  17: "缓存监控", // Redis 监控
  20: "接口文档", // API 接口
  83: "生成示例", // 代码生成案例
  88: "接口日志", // API 日志
  195: "库源配置", // 数据源配置
  201: "开放授权", // OAuth 2.0
  230: "轮播海报", // Banner
  236: "优惠券库", // 优惠劵列表
  332: "站内消息", // 站内信管理
  449: "商城系统", // MALL 商城系统
  536: "内嵌主子", // 主子表（内嵌）
  537: "单表示例", // 单表（增删改查）
  543: "树表示例", // 树表（增删改查）
  549: "标准主子", // 主子表（标准）
  555: "主子示例", // 主子表（ERP）
  565: "实时通道", // WebSocket
  583: "收退示例", // 支付&退款案例
  584: "转账示例", // 提现转账案例
};

const CANONICAL_MENU_MAP = new Map([
  ["Redis 监控", "缓存监控"],
  ["Redis监控", "缓存监控"],
  ["MySQL 监控", "数据监控"],
  ["MySQL监控", "数据监控"],
  ["Java 监控", "服务监控"],
  ["Java监控", "服务监控"],
  ["API 日志", "接口日志"],
  ["API日志", "接口日志"],
  ["API 接口", "接口文档"],
  ["API接口", "接口文档"],
  ["数据源配置", "库源配置"],
  ["OAuth 2.0", "开放授权"],
  ["WebSocket", "实时通道"],
  ["MALL 商城系统", "商城系统"],
  ["站内信管理", "站内消息"],
  ["优惠劵列表", "优惠券库"],
  ["优惠券列表", "优惠券库"],
  ["代码生成案例", "生成示例"],
]);

const FILLER_PREFIXES = [
  "企业级",
  "集团级",
  "数字化",
  "智能化",
  "自动化",
  "全生命周期",
  "全链路",
  "一体化",
  "多租户",
  "跨平台",
  "企业",
  "集团",
  "智能",
  "综合",
  "通用",
  "标准",
  "线上",
  "在线",
];

const FILLER_SUFFIXES = [
  "全生命周期管理",
  "综合管理平台",
  "集成管控平台",
  "业务管理系统",
  "业务模块",
  "管理系统",
  "管理中台",
  "管理平台",
  "管理中心",
  "信息管理",
  "列表管理",
  "记录管理",
  "配置管理",
  "台账管理",
  "档案管理",
  "平台",
  "中台",
  "系统",
  "模块",
  "中心",
  "管理",
  "列表",
  "台账",
  "档案",
  "明细",
  "记录",
  "信息",
  "数据",
  "服务",
  "功能",
];

function menuCharLength(value) {
  return [...String(value ?? "").trim()].length;
}

function isValidMenuName(value) {
  const trimmed = String(value ?? "").trim();
  const len = [...trimmed].length;
  return len >= 1 && len <= MAX_MENU_NAME_LENGTH;
}

/**
 * 将任意长度的业务/模块标题收敛为严格 <= 4 字符的导航菜单短名。
 * 完整业务语义由调用方保留在 title / remark / OpenAPI description 中。
 */
function compactMenuName(rawTitle, fallback = "业务管理") {
  const safeFallback = [...String(fallback || "业务管理").trim()].slice(0, MAX_MENU_NAME_LENGTH).join("") || "业务管理";
  const raw = String(rawTitle ?? "").trim();
  if (!raw) return safeFallback;

  if (CANONICAL_MENU_MAP.has(raw)) {
    return CANONICAL_MENU_MAP.get(raw);
  }

  if ([...raw].length <= MAX_MENU_NAME_LENGTH) {
    return raw;
  }

  // 1. 剥离括号附注（如 "单表（增删改查）" -> "单表"、"订单管理(B端)" -> "订单管理"）
  let s = raw
    .replace(/（[^）]*）|\([^)]*\)|【[^】]*】|\[[^\]]*\]/g, "")
    .replace(/[\s·•/\\|_—–-]+/g, "")
    .trim();

  if (CANONICAL_MENU_MAP.has(s)) {
    return CANONICAL_MENU_MAP.get(s);
  }
  if ([...s].length >= 1 && [...s].length <= MAX_MENU_NAME_LENGTH) {
    return s;
  }

  // 2. 若为 "CRM客户线索管理" / "OA请假审批" 等英文缩写前缀 + 中文主体，优先保留中文业务词干
  const cjkRest = s.replace(/^[A-Za-z0-9]+/, "");
  if (cjkRest && /[\u4e00-\u9fff]/.test(cjkRest) && [...cjkRest].length >= 2) {
    s = cjkRest;
    if ([...s].length <= MAX_MENU_NAME_LENGTH) return s;
  }

  // 3. 仅在超 4 字时，逐步剥离通用修饰前缀
  for (const prefix of FILLER_PREFIXES) {
    if ([...s].length <= MAX_MENU_NAME_LENGTH) break;
    if (s.startsWith(prefix) && [...s.slice(prefix.length)].length >= 2) {
      s = s.slice(prefix.length);
    }
  }
  if ([...s].length >= 1 && [...s].length <= MAX_MENU_NAME_LENGTH) {
    return s;
  }

  // 4. 仅在超 4 字时，逐步剥离尾部泛化后缀（保留至少 2 个核心字；若剩 2 字可补齐更紧凑的 4 字或直接返回 2~4 字）
  let changed = true;
  while (changed && [...s].length > MAX_MENU_NAME_LENGTH) {
    changed = false;
    for (const suffix of FILLER_SUFFIXES) {
      if ([...s].length <= MAX_MENU_NAME_LENGTH) break;
      if (s.endsWith(suffix)) {
        const stem = s.slice(0, s.length - suffix.length);
        if ([...stem].length >= 2) {
          s = stem;
          changed = true;
          break;
        }
      }
    }
  }

  const chars = [...s];
  if (chars.length === 0) return safeFallback;
  if (chars.length <= MAX_MENU_NAME_LENGTH) return s;

  // 5. 中文偏正短语中心语在尾部（如 "企业全域数据集成" -> "数据集成"、"供应商资质审核" -> "资质审核"）；
  //    纯英文标识符取前 4 字符。
  if (/[\u4e00-\u9fff]/.test(s)) {
    return chars.slice(-MAX_MENU_NAME_LENGTH).join("");
  }
  return chars.slice(0, MAX_MENU_NAME_LENGTH).join("");
}

/**
 * 派生工程核心文档（README / CLAUDE / HARNESS / apps/* /README.md）禁止残留的上游作者/推广特征正则。
 * 采用分段拼接构造，防止 project-reactor 在派生改写脚本源码时把检测词自身替换成新项目名。
 */
const UPSTREAM_DOC_RESIDUE_REGEX = new RegExp(
  [
    ["iocoder", "\\.cn"].join(""),
    ["艿", "艿"].join(""),
    ["上海艰苦", "奋斗"].join(""),
    ["zhijian", "tianya"].join(""),
    ["enterprise-quad", "-terminal"].join(""),
    ["Yun", "aiV"].join(""),
    ["img\\.shields", "\\.io"].join(""),
    ["《芋", "道"].join(""),
  ].join("|"),
  "i"
);

module.exports = {
  MAX_MENU_NAME_LENGTH,
  UPSTREAM_PROMO_MENU_NAMES,
  UPSTREAM_MENU_RENAMES,
  CANONICAL_MENU_MAP,
  UPSTREAM_DOC_RESIDUE_REGEX,
  menuCharLength,
  isValidMenuName,
  compactMenuName,
};
