#!/usr/bin/env node
/**
 * scripts/scaffold-three-role-audit.mjs
 *
 * 一键生成政企/电信级 IT 内控“三员分立”角色体系 (`sys_admin` / `biz_admin` / `audit_admin` + `oncall_sre`)
 * 与 PostgreSQL 物理级 Append-Only 链式 SHA-256 不可变审计表触发器 + Spring Boot `ThreeRoleGuard.java`。
 *
 * 用法:
 *   pnpm gen:three-role -- --prefix di [--package com.tele_pulse] [--out-sql apps/backend/sql/postgresql/di_three_role_audit.sql] [--out-java ...]
 *   node scripts/scaffold-three-role-audit.mjs --prefix gov --dry-run
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const {
  normalizeSqlIdent,
  renderThreeRoleAuditSql,
  renderThreeRoleGuardJava,
} = require("./lib/three-role-audit.cjs");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv = process.argv.slice(2)) {
  const get = (flag) => {
    const i = argv.indexOf(flag);
    if (i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("-")) return argv[i + 1];
    const eq = argv.find((a) => a.startsWith(`${flag}=`));
    return eq ? eq.slice(flag.length + 1) : null;
  };
  return {
    prefix: get("--prefix") || get("--domain") || "sec",
    basePackage: get("--package") || get("--base-package") || detectBasePackage(),
    outSql: get("--out-sql"),
    outJava: get("--out-java"),
    dryRun: argv.includes("--dry-run"),
    json: argv.includes("--json"),
    help: argv.includes("--help") || argv.includes("-h"),
  };
}

function detectBasePackage() {
  try {
    const bp = JSON.parse(fs.readFileSync(path.join(ROOT, "blueprint.template.json"), "utf8"));
    const pkg = bp?.variables?.PACKAGE_PREFIX?.default;
    if (pkg) return String(pkg).replace(/\.server$/, "");
  } catch {}
  return "cn.iocoder.yudao";
}

function main() {
  const opts = parseArgs();
  if (opts.help) {
    console.log(`用法: node scripts/scaffold-three-role-audit.mjs [选项]

选项:
  --prefix / --domain <slug>   业务域表前缀（默认: sec -> sec_security_audit_trail）
  --package <basePkg>          Java 根包名（默认自动探测，如 com.my_proj）
  --out-sql <path>             输出 PostgreSQL 幂等 SQL 文件路径
  --out-java <path>            输出 Spring Boot ThreeRoleGuard.java 路径
  --dry-run                    仅校验并打印摘要，不写磁盘
  --json                       输出 JSON 结果`);
    return;
  }

  const prefix = normalizeSqlIdent(opts.prefix, "sec");
  const sqlContent = renderThreeRoleAuditSql({ prefix });
  const javaContent = renderThreeRoleGuardJava({
    prefix,
    domain: prefix,
    basePackage: opts.basePackage,
  });

  const sqlRel =
    opts.outSql ||
    (fs.existsSync(path.join(ROOT, ".gitmodules"))
      ? `deploy/templates/sql/${prefix}_three_role_audit.sql`
      : `apps/backend/sql/postgresql/${prefix}_three_role_audit.sql`);

  const pkgRelDir = `${opts.basePackage.replace(/\.server$/, "").replace(/\./g, "/")}/module/${prefix}/framework/security`;
  const javaRel =
    opts.outJava ||
    (fs.existsSync(path.join(ROOT, ".gitmodules"))
      ? `deploy/templates/java/${pkgRelDir}/ThreeRoleGuard.java`
      : `apps/backend/server/src/main/java/${pkgRelDir}/ThreeRoleGuard.java`);

  if (!opts.dryRun) {
    const absSql = path.resolve(ROOT, sqlRel);
    const absJava = path.resolve(ROOT, javaRel);
    fs.mkdirSync(path.dirname(absSql), { recursive: true });
    fs.mkdirSync(path.dirname(absJava), { recursive: true });
    fs.writeFileSync(absSql, sqlContent, "utf8");
    fs.writeFileSync(absJava, javaContent, "utf8");
  }

  const summary = {
    ok: true,
    dryRun: opts.dryRun,
    prefix,
    auditTable: `${prefix}_security_audit_trail`,
    roles: ["sys_admin", "biz_admin", "audit_admin", "oncall_sre"],
    sqlPath: sqlRel,
    javaPath: javaRel,
  };

  if (opts.json) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(
      `✅ [Three-Role & Append-Only Audit] ${opts.dryRun ? "(dry-run) " : ""}已生成三员分立与链式不可变审计资产:`
    );
    console.log(`   • SQL 触发器与角色表 : ${sqlRel}`);
    console.log(`   • Java 互斥守卫类    : ${javaRel}`);
  }
}

main();
