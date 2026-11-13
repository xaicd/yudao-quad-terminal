/**
 * scripts/lib/three-role-audit.cjs
 *
 * 企业/政企/运营商 IT 内控“三员分立”互斥权限模型与 PostgreSQL 物理级 Append-Only 链式 SHA-256 不可变审计底座生成器
 *
 * 沉淀自 tele-pulse 实盘工程经验：
 * 1. 四大标准内控角色：
 *    - sys_admin   : 系统管理员（集群主机节点、全局水位/HA 配置、备份恢复、账号角色赋权；严禁修改业务数据/密钥策略）
 *    - biz_admin   : 业务管理员（业务连接器、流程/通道编排、脱敏/密钥策略、对账稽核；严禁修改节点与账号赋权）
 *    - audit_admin : 审计管理员（纯只读合规检索不可变审计轨迹；严禁执行任何写请求，违者返 HTTP 403 并记入审计流）
 *    - oncall_sre  : 值班运维工程师（态势大屏、移动值守告警认领、在线限流/断点恢复；严禁删库或改主密钥）
 * 2. 物理级 Append-Only 防篡改触发器：
 *    - `<prefix>_security_audit_trail` 表挂载 `BEFORE UPDATE OR DELETE` PL/pgSQL Trigger，物理拦截任何篡改或删除行为。
 * 3. Spring Boot 3 零侵入守卫模板 (`ThreeRoleGuard.java`)：
 *    - 内置角色兼任互斥校验、越权 `403` 自动记审（`PROPAGATION_REQUIRES_NEW` 独立事务落库，不被主事务回滚吞没）与 `prev_hash_sha256 -> integrity_sha256` 哈希链签名。
 */

"use strict";

const DEFAULT_ROLES = Object.freeze([
  {
    id: 1101,
    code: "sys_admin",
    name: "系统管理",
    sort: 10,
    dataScope: 1,
    remark: "IT内控系统管理员：负责集群节点、高可用容灾、全局阈值与账号角色赋权，严禁触碰业务数据配置",
    userId: 1101,
    username: "sys_admin",
    nickname: "系统管理员",
  },
  {
    id: 1102,
    code: "biz_admin",
    name: "业务管理",
    sort: 20,
    dataScope: 1,
    remark: "IT内控业务管理员：负责业务规则、数据通道、密钥脱敏策略与质量对账，严禁修改系统节点与赋权",
    userId: 1102,
    username: "biz_admin",
    nickname: "业务管理员",
  },
  {
    id: 1103,
    code: "audit_admin",
    name: "安全审计",
    sort: 30,
    dataScope: 1,
    remark: "IT内控安全审计员：纯只读查阅链式SHA-256安全审计流与合规报表，物理禁止一切写操作",
    userId: 1103,
    username: "audit_admin",
    nickname: "安全审计员",
  },
  {
    id: 1104,
    code: "oncall_sre",
    name: "值班运维",
    sort: 40,
    dataScope: 1,
    remark: "7x24值班SRE工程师：负责态势监控、移动告警认领、限流切换与故障恢复演练",
    userId: 1104,
    username: "oncall_sre",
    nickname: "值班SRE",
  },
]);

function normalizeSqlIdent(raw, fallback = "app") {
  const clean = String(raw || fallback)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/^_+|_+$/g, "");
  if (!clean) return fallback;
  return /^[0-9]/.test(clean) ? `p_${clean}` : clean;
}

/**
 * 生成 PostgreSQL Append-Only 链式 SHA-256 不可变审计表 + 防 UPDATE/DELETE 触发器 + 三员分立基础 RBAC 种子 SQL
 */
function renderThreeRoleAuditSql(options = {}) {
  const prefix = normalizeSqlIdent(options.prefix || options.domain || "sec", "sec");
  const tableName = normalizeSqlIdent(options.tableName || `${prefix}_security_audit_trail`);
  const fnName = normalizeSqlIdent(`fn_forbid_${prefix}_audit_trail_mutation`);
  const trgName = normalizeSqlIdent(`trg_${prefix}_security_audit_append_only`);
  const tenantId = Number.isFinite(Number(options.tenantId)) ? Number(options.tenantId) : 1;
  // 占位符哈希在 lite-up 启动时会被 lite-credentials.mjs 以 CSPRNG 16位强口令 BCrypt(cost=10) 强制覆写
  const bootstrapHashPlaceholder =
    options.bcryptPlaceholder || "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
  const includeRbacUsers = options.includeRbacUsers !== false;

  const lines = [
    "-- ============================================================================",
    `-- [${prefix}] IT 内控三员分立角色体系与 Append-Only 链式 SHA-256 不可变审计底座`,
    "-- 由 scripts/scaffold-three-role-audit.mjs 自动生成（100% 幂等可重入）",
    "-- ============================================================================",
    "",
    `CREATE TABLE IF NOT EXISTS ${tableName} (`,
    "    id                      BIGSERIAL PRIMARY KEY,",
    "    trace_id                VARCHAR(64)  NOT NULL,",
    "    audit_level             VARCHAR(16)  NOT NULL DEFAULT 'L1_CRITICAL',",
    "    operator_account        VARCHAR(64)  NOT NULL,",
    "    operator_role           VARCHAR(64)  NOT NULL,",
    "    client_ip               VARCHAR(64)  NOT NULL DEFAULT '127.0.0.1',",
    "    module_name             VARCHAR(64)  NOT NULL,",
    "    action_type             VARCHAR(64)  NOT NULL,",
    "    target_table            VARCHAR(64)  NOT NULL,",
    "    target_pk               VARCHAR(128) NOT NULL,",
    "    http_status             INT          NOT NULL DEFAULT 200,",
    "    before_snapshot_json    TEXT         NOT NULL DEFAULT '{}',",
    "    after_snapshot_json     TEXT         NOT NULL DEFAULT '{}',",
    "    approval_ticket_no      VARCHAR(64)  DEFAULT NULL,",
    "    prev_hash_sha256        VARCHAR(64)  NOT NULL,",
    "    integrity_sha256        VARCHAR(64)  NOT NULL,",
    "    version                 INT          NOT NULL DEFAULT 0,",
    `    tenant_id               BIGINT       NOT NULL DEFAULT ${tenantId},`,
    "    creator                 VARCHAR(64)  DEFAULT 'system',",
    "    create_time             TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,",
    "    updater                 VARCHAR(64)  DEFAULT 'system',",
    "    update_time             TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,",
    "    deleted                 SMALLINT     NOT NULL DEFAULT 0",
    ");",
    `CREATE SEQUENCE IF NOT EXISTS ${tableName}_seq START WITH 1000 INCREMENT BY 1;`,
    `CREATE UNIQUE INDEX IF NOT EXISTS uk_${prefix}_audit_trace_id ON ${tableName} (trace_id);`,
    `CREATE INDEX IF NOT EXISTS idx_${prefix}_audit_role_mod_time ON ${tableName} (tenant_id, operator_role, module_name, create_time DESC);`,
    `CREATE INDEX IF NOT EXISTS idx_${prefix}_audit_target ON ${tableName} (target_table, target_pk);`,
    "",
    "-- 物理级 Append-Only 防篡改触发器：严禁任何 UPDATE 或 DELETE 操作",
    `CREATE OR REPLACE FUNCTION ${fnName}()`,
    "RETURNS TRIGGER AS $trg$",
    "BEGIN",
    `    RAISE EXCEPTION 'Security audit trail is strictly append-only! Operation % on ${tableName} (id=%) is physically forbidden.', TG_OP, OLD.id;`,
    "END;",
    "$trg$ LANGUAGE plpgsql;",
    "",
    `DROP TRIGGER IF EXISTS ${trgName} ON ${tableName};`,
    `CREATE TRIGGER ${trgName}`,
    `    BEFORE UPDATE OR DELETE ON ${tableName}`,
    "    FOR EACH ROW",
    `    EXECUTE FUNCTION ${fnName}();`,
  ];

  if (includeRbacUsers) {
    lines.push(
      "",
      "-- 三员分立 + 值班 SRE 标准角色与账号幂等注入（仅在 system_role / system_users 存在时执行）",
      "DO $rbac$",
      "BEGIN",
      "  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'system_role') THEN"
    );
    for (const r of DEFAULT_ROLES) {
      lines.push(
        `    INSERT INTO system_role (id, name, code, sort, data_scope, data_scope_dept_ids, status, type, remark, creator, create_time, updater, update_time, deleted, tenant_id)`,
        `    VALUES (${r.id}, '${r.name}', '${r.code}', ${r.sort}, ${r.dataScope}, '', 0, 2, '${r.remark}', '1', CURRENT_TIMESTAMP, '1', CURRENT_TIMESTAMP, 0, ${tenantId})`,
        `    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, code = EXCLUDED.code, data_scope = EXCLUDED.data_scope, status = 0, deleted = 0, remark = EXCLUDED.remark;`
      );
    }
    lines.push(
      "  END IF;",
      "",
      "  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'system_users') THEN"
    );
    for (const r of DEFAULT_ROLES) {
      lines.push(
        `    INSERT INTO system_users (id, username, password, nickname, remark, dept_id, post_ids, email, mobile, sex, avatar, status, login_ip, login_date, creator, create_time, updater, update_time, deleted, tenant_id)`,
        `    VALUES (${r.userId}, '${r.username}', '${bootstrapHashPlaceholder}', '${r.nickname}', '${r.remark}', 100, '[]', '${r.username}@enterprise.local', '', 1, '', 0, '127.0.0.1', CURRENT_TIMESTAMP, '1', CURRENT_TIMESTAMP, '1', CURRENT_TIMESTAMP, 0, ${tenantId})`,
        `    ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, nickname = EXCLUDED.nickname, status = 0, deleted = 0;`
      );
    }
    lines.push(
      "  END IF;",
      "",
      "  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'system_user_role') THEN"
    );
    DEFAULT_ROLES.forEach((r, idx) => {
      const relId = 2101 + idx;
      lines.push(
        `    INSERT INTO system_user_role (id, user_id, role_id, creator, create_time, updater, update_time, deleted, tenant_id)`,
        `    VALUES (${relId}, ${r.userId}, ${r.id}, '1', CURRENT_TIMESTAMP, '1', CURRENT_TIMESTAMP, 0, ${tenantId})`,
        `    ON CONFLICT (id) DO UPDATE SET user_id = EXCLUDED.user_id, role_id = EXCLUDED.role_id, deleted = 0;`
      );
    });
    lines.push("  END IF;", "END;", "$rbac$;", "");
  }

  return lines.join("\n");
}

/**
 * 生成 Spring Boot 3 通用三员分立互斥守卫与链式审计 Java 类源码
 */
function renderThreeRoleGuardJava(options = {}) {
  const basePackage = String(options.basePackage || "cn.iocoder.yudao")
    .trim()
    .replace(/\.server$/, "");
  const moduleName = normalizeSqlIdent(options.domain || options.prefix || "sec", "sec");
  const javaPackage =
    options.javaPackage || `${basePackage}.module.${moduleName}.framework.security`;
  const tableName = normalizeSqlIdent(options.tableName || `${moduleName}_security_audit_trail`);
  const tracePrefix = String(options.tracePrefix || `TRC-${moduleName.toUpperCase()}-`);

  return `package ${javaPackage};

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.digest.DigestUtil;
import ${basePackage}.framework.common.exception.ErrorCode;
import ${basePackage}.framework.common.exception.util.ServiceExceptionUtil;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.TransactionTemplate;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Locale;
import java.util.List;
import java.util.Set;

/**
 * IT 内控三员分立互斥守卫与 Append-Only 链式 SHA-256 不可变审计器
 * 物理审计表: ${tableName}（挂载 PostgreSQL BEFORE UPDATE OR DELETE 防篡改触发器）
 */
public class ThreeRoleGuard {

    public static final String ROLE_SYS_ADMIN = "sys_admin";
    public static final String ROLE_BIZ_ADMIN = "biz_admin";
    public static final String ROLE_AUDIT_ADMIN = "audit_admin";
    public static final String ROLE_ONCALL_SRE = "oncall_sre";

    public static final ErrorCode UNAUTHENTICATED = new ErrorCode(401, "账号未登录或会话已过期");
    public static final ErrorCode THREE_ROLE_FORBIDDEN = new ErrorCode(403, "三员分立职责互斥：当前角色禁止执行该越权操作");
    public static final ErrorCode AUDIT_READ_ONLY_FORBIDDEN = new ErrorCode(403, "安全审计员(audit_admin)为纯监督只读角色，严禁执行任何写操作");
    public static final ErrorCode THREE_ROLE_MUTEX_VIOLATION = new ErrorCode(403, "违反三员分立互斥原则：同一账号严禁兼任系统、业务、审计中任意两类角色");

    private static final String GENESIS_PREV_HASH = "0000000000000000000000000000000000000000000000000000000000000000";
    private static final Set<String> MUTEX_THREE_ROLES = Set.of(ROLE_SYS_ADMIN, ROLE_BIZ_ADMIN, ROLE_AUDIT_ADMIN);

    private final JdbcTemplate jdbcTemplate;
    private final TransactionTemplate requiresNewTx;

    public ThreeRoleGuard(JdbcTemplate jdbcTemplate, PlatformTransactionManager txManager) {
        this.jdbcTemplate = jdbcTemplate;
        if (txManager != null) {
            TransactionTemplate tpl = new TransactionTemplate(txManager);
            tpl.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
            this.requiresNewTx = tpl;
        } else {
            this.requiresNewTx = null;
        }
    }

    public void assertRoleAssignmentMutuallyExclusive(Collection<String> assignedRoleCodes) {
        if (CollUtil.isEmpty(assignedRoleCodes)) {
            return;
        }
        long count = assignedRoleCodes.stream()
                .filter(StrUtil::isNotBlank)
                .map(s -> s.trim().toLowerCase(Locale.ROOT))
                .filter(MUTEX_THREE_ROLES::contains)
                .distinct()
                .count();
        if (count > 1) {
            throw ServiceExceptionUtil.exception(THREE_ROLE_MUTEX_VIOLATION);
        }
    }

    public void assertSysAdminOnly(Long userId, String username, Set<String> roles, String module, String action, String targetPk) {
        if (userId == null) {
            throw ServiceExceptionUtil.exception(UNAUTHENTICATED);
        }
        if (roles.contains(ROLE_AUDIT_ADMIN)) {
            appendAuditTrail(username, ROLE_AUDIT_ADMIN, "127.0.0.1", module, action + "_DENIED", "${tableName}", targetPk, 403, "{}", "{\\"denied\\":\\"audit_read_only\\"}", null);
            throw ServiceExceptionUtil.exception(AUDIT_READ_ONLY_FORBIDDEN);
        }
        boolean superBoot = Long.valueOf(1L).equals(userId) || roles.contains("super_admin");
        if (!superBoot && !roles.contains(ROLE_SYS_ADMIN)) {
            appendAuditTrail(username, resolvePrimaryRole(roles), "127.0.0.1", module, action + "_DENIED", "${tableName}", targetPk, 403, "{}", "{\\"denied\\":\\"require_sys_admin\\"}", null);
            throw ServiceExceptionUtil.exception(THREE_ROLE_FORBIDDEN);
        }
    }

    public void assertBizAdminOnly(Long userId, String username, Set<String> roles, String module, String action, String targetPk) {
        if (userId == null) {
            throw ServiceExceptionUtil.exception(UNAUTHENTICATED);
        }
        if (roles.contains(ROLE_AUDIT_ADMIN)) {
            appendAuditTrail(username, ROLE_AUDIT_ADMIN, "127.0.0.1", module, action + "_DENIED", "${tableName}", targetPk, 403, "{}", "{\\"denied\\":\\"audit_read_only\\"}", null);
            throw ServiceExceptionUtil.exception(AUDIT_READ_ONLY_FORBIDDEN);
        }
        if (roles.contains(ROLE_SYS_ADMIN)) {
            appendAuditTrail(username, ROLE_SYS_ADMIN, "127.0.0.1", module, action + "_DENIED", "${tableName}", targetPk, 403, "{}", "{\\"denied\\":\\"sys_admin_mutex_on_biz\\"}", null);
            throw ServiceExceptionUtil.exception(THREE_ROLE_FORBIDDEN);
        }
        boolean superBoot = Long.valueOf(1L).equals(userId) || roles.contains("super_admin");
        boolean isBiz = roles.stream().anyMatch(r -> r.equalsIgnoreCase(ROLE_BIZ_ADMIN) || r.endsWith("_biz_admin"));
        if (!superBoot && !isBiz) {
            appendAuditTrail(username, resolvePrimaryRole(roles), "127.0.0.1", module, action + "_DENIED", "${tableName}", targetPk, 403, "{}", "{\\"denied\\":\\"require_biz_admin\\"}", null);
            throw ServiceExceptionUtil.exception(THREE_ROLE_FORBIDDEN);
        }
    }

    public String appendAuditTrail(String account, String role, String clientIp, String mod, String act,
                                   String targetTable, String targetPk, int httpStatus,
                                   String beforeJson, String afterJson, String ticketNo) {
        String traceId = "${tracePrefix}" + IdUtil.fastSimpleUUID().substring(0, 20).toUpperCase(Locale.ROOT);
        String safeAcc = StrUtil.blankToDefault(account, "anonymous");
        String safeRole = StrUtil.blankToDefault(role, "anonymous");
        String safeIp = StrUtil.blankToDefault(clientIp, "127.0.0.1");
        String safeMod = StrUtil.blankToDefault(mod, "${moduleName}");
        String safeAct = StrUtil.blankToDefault(act, "MUTATE");
        String safeTbl = StrUtil.blankToDefault(targetTable, "${tableName}");
        String safePk = StrUtil.blankToDefault(targetPk, "-");
        String safeBefore = StrUtil.blankToDefault(beforeJson, "{}");
        String safeAfter = StrUtil.blankToDefault(afterJson, "{}");
        String level = httpStatus >= 400 ? "L1_CRITICAL" : "L2_SENSITIVE";
        Timestamp now = Timestamp.valueOf(LocalDateTime.now());

        if (requiresNewTx != null) {
            return requiresNewTx.execute(s -> insertRow(traceId, level, safeAcc, safeRole, safeIp, safeMod, safeAct, safeTbl, safePk, httpStatus, safeBefore, safeAfter, ticketNo, now));
        }
        return insertRow(traceId, level, safeAcc, safeRole, safeIp, safeMod, safeAct, safeTbl, safePk, httpStatus, safeBefore, safeAfter, ticketNo, now);
    }

    private String insertRow(String traceId, String level, String acc, String role, String ip, String mod, String act,
                             String tbl, String pk, int httpStatus, String beforeJson, String afterJson, String ticketNo, Timestamp now) {
        String prevHash = GENESIS_PREV_HASH;
        List<String> latest = jdbcTemplate.queryForList("SELECT integrity_sha256 FROM ${tableName} ORDER BY id DESC LIMIT 1", String.class);
        if (!latest.isEmpty() && StrUtil.isNotBlank(latest.get(0))) {
            prevHash = latest.get(0);
        }
        String payload = String.join("|", prevHash, traceId, level, acc, role, ip, mod, act, tbl, pk, String.valueOf(httpStatus), beforeJson, afterJson, String.valueOf(now.getTime()));
        String sha256 = DigestUtil.sha256Hex(payload);
        jdbcTemplate.update(
                "INSERT INTO ${tableName} (trace_id, audit_level, operator_account, operator_role, client_ip, module_name, action_type, target_table, target_pk, http_status, before_snapshot_json, after_snapshot_json, approval_ticket_no, prev_hash_sha256, integrity_sha256, version, tenant_id, creator, create_time, updater, update_time, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1, ?, ?, ?, ?, 0)",
                traceId, level, acc, role, ip, mod, act, tbl, pk, httpStatus, beforeJson, afterJson, ticketNo, prevHash, sha256, acc, now, acc, now
        );
        return sha256;
    }

    private static String resolvePrimaryRole(Set<String> roles) {
        if (CollUtil.isEmpty(roles)) return "anonymous";
        for (String r : List.of(ROLE_AUDIT_ADMIN, ROLE_SYS_ADMIN, ROLE_BIZ_ADMIN, ROLE_ONCALL_SRE)) {
            if (roles.contains(r)) return r;
        }
        return roles.iterator().next();
    }
}
`;
}

module.exports = {
  DEFAULT_ROLES,
  normalizeSqlIdent,
  renderThreeRoleAuditSql,
  renderThreeRoleGuardJava,
};
