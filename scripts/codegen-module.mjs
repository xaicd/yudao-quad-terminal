#!/usr/bin/env node
/**
 * scripts/codegen-module.mjs
 *
 * Yudao-Quad-Terminal 工业级白标感知全栈代码生成器 (White-Label Aware Full-Stack Codegen)
 *
 * 核心能力：
 * 1. 动态解析白标后包名与模块路径 (`resolveBackendLayout`)：
 *    自动识别母本 (`apps/backend/yudao-server` + `cn.iocoder.yudao`) 与白标派生仓
 *    (`apps/backend/server` 或 `apps/backend/<slug>-server` + `com.<slug>[.server]`)，彻底消除硬编码；
 * 2. 双端 REST 控制器同源生成：
 *    同时生成 B 端 `controller/admin/<Entity>Controller.java` (`/admin-api/...`) 与
 *    C 端 `controller/app/App<Entity>Controller.java` (`/app-api/...`)；
 * 3. 状态机守卫、乐观锁 (`@Version`)、跨表转换 (`convertActions`) 与主子表 (`sub_table`) 一站式落盘；
 * 4. 支持命令行参数单表生成与 `--schema <domain-schema.json>` 多实体批量生成。
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const localRequire = createRequire(import.meta.url);
const {
  compactMenuName,
  isValidMenuName,
} = localRequire("./lib/menu-standard.cjs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

function parseArgs(argv = process.argv.slice(2)) {
  const params = {
    module: "",
    entity: "",
    table: "",
    title: "",
    menuName: "",
    parentMenuName: "",
    remark: "",
    fields: "",
    schemaFile: "",
    optimisticLock: true,
    stateMachine: null,
    convertActions: [],
    subTable: null,
    dryRun: false,
    force: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--module" && argv[i + 1]) params.module = argv[++i];
    else if (arg === "--entity" && argv[i + 1]) params.entity = argv[++i];
    else if (arg === "--table" && argv[i + 1]) params.table = argv[++i];
    else if (arg === "--title" && argv[i + 1]) params.title = argv[++i];
    else if (arg.startsWith("--title=")) params.title = arg.split("=")[1];
    else if (arg === "--menu-name" && argv[i + 1]) params.menuName = argv[++i];
    else if (arg.startsWith("--menu-name=")) params.menuName = arg.split("=")[1];
    else if (arg === "--parent-menu-name" && argv[i + 1]) params.parentMenuName = argv[++i];
    else if (arg.startsWith("--parent-menu-name=")) params.parentMenuName = arg.split("=")[1];
    else if (arg === "--remark" && argv[i + 1]) params.remark = argv[++i];
    else if (arg.startsWith("--remark=")) params.remark = arg.split("=")[1];
    else if (arg === "--fields" && argv[i + 1]) params.fields = argv[++i];
    else if (arg === "--schema" && argv[i + 1]) params.schemaFile = argv[++i];
    else if (arg.startsWith("--schema=")) params.schemaFile = arg.split("=")[1];
    else if (arg === "--dry-run") params.dryRun = true;
    else if (arg === "--force") params.force = true;
    else if (!arg.startsWith("-") && arg.endsWith(".json") && !params.schemaFile) {
      params.schemaFile = arg;
    }
  }

  return params;
}

export function toKebabCase(str) {
  return String(str || "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function toSnakeCase(str) {
  return toKebabCase(str).replace(/-/g, "_");
}

export function toCamelCase(str) {
  return String(str || "")
    .replace(/^([A-Z])/, (m, c) => c.toLowerCase())
    .replace(/[-_]([a-z0-9])/gi, (g) => g[1].toUpperCase());
}

export function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel ? camel.charAt(0).toUpperCase() + camel.slice(1) : "";
}

/**
 * 动态探测 apps/backend 下的 server 模块目录与真实 Java 根包名
 * 兼容未白标母本 (yudao-server + cn.iocoder.yudao) 与已白标派生仓 (server / <slug>-server + com.<slug>)
 */
export function resolveBackendLayout(rootDir = ROOT) {
  const backendDir = path.join(rootDir, "apps", "backend");
  let serverDirName = "yudao-server";
  if (fs.existsSync(backendDir)) {
    const entries = fs.readdirSync(backendDir, { withFileTypes: true }).filter((d) => d.isDirectory());
    if (entries.some((d) => d.name === "server")) {
      serverDirName = "server";
    } else {
      const customServer = entries.find((d) => d.name.endsWith("-server") && d.name !== "yudao-server");
      if (customServer) serverDirName = customServer.name;
    }
  }

  const javaRoot = path.join(backendDir, serverDirName, "src", "main", "java");
  let rootPkg = "cn.iocoder.yudao";

  if (fs.existsSync(javaRoot)) {
    const foundAppFile = (function findApp(dir) {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          const hit = findApp(full);
          if (hit) return hit;
        } else if (e.isFile() && /ServerApplication\.java$/.test(e.name)) {
          return full;
        }
      }
      return null;
    })(javaRoot);

    if (foundAppFile) {
      const content = fs.readFileSync(foundAppFile, "utf8");
      const pkgMatch = /^\s*package\s+([a-zA-Z0-9_.]+)\s*;/m.exec(content);
      if (pkgMatch) {
        // ServerApplication 位于 <rootPkg>.server 子包下，剥离末尾一层 .server 即得模块根包名
        rootPkg = pkgMatch[1].replace(/\.server$/, "");
      } else {
        const relDir = path.relative(javaRoot, path.dirname(foundAppFile));
        rootPkg = relDir.split(path.sep).join(".");
      }
    }
  }

  return {
    serverDirName,
    javaRoot,
    rootPkg,
    frameworkPkg: `${rootPkg}.framework`,
  };
}

export function parseFieldList(fieldsInput) {
  if (!fieldsInput) return [];
  if (Array.isArray(fieldsInput)) {
    return fieldsInput.map((f) => normalizeFieldSpec(f));
  }
  return String(fieldsInput)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((item) => {
      const parts = item.split(":");
      const name = toCamelCase(parts[0]);
      const rawType = (parts[1] || "string").toLowerCase();
      const comment = parts[2] || name;
      const flags = parts.slice(3).map((f) => f.toLowerCase());
      return normalizeFieldSpec({
        name,
        type: rawType,
        comment,
        required: flags.includes("req") || flags.includes("required"),
        search: flags.includes("search"),
        hidden: flags.includes("hidden"),
      });
    });
}

function normalizeFieldSpec(spec) {
  const name = toCamelCase(spec.name || spec.field || "name");
  const rawType = String(spec.type || "string").toLowerCase();
  const comment = spec.comment || spec.label || spec.title || name;
  const isReq = Boolean(spec.required ?? spec.isReq ?? true);
  const isSearch = Boolean(spec.search ?? spec.isSearch ?? /name|title|no|code|status|type/i.test(name));
  const isHidden = Boolean(spec.hidden ?? spec.isHidden ?? false);

  let javaType = "String";
  let tsType = "string";
  let sqlType = "VARCHAR(255)";
  let pgSqlType = "VARCHAR(255)";

  switch (rawType) {
    case "long":
    case "bigint":
      javaType = "Long";
      tsType = "number";
      sqlType = "BIGINT";
      pgSqlType = "BIGINT";
      break;
    case "integer":
    case "int":
    case "number":
      javaType = "Integer";
      tsType = "number";
      sqlType = "INT";
      pgSqlType = "INT4";
      break;
    case "boolean":
    case "bool":
      javaType = "Boolean";
      tsType = "boolean";
      sqlType = "BIT(1)";
      pgSqlType = "BOOLEAN";
      break;
    case "decimal":
    case "bigdecimal":
    case "money":
    case "price":
      javaType = "java.math.BigDecimal";
      tsType = "number";
      sqlType = "DECIMAL(12, 2)";
      pgSqlType = "NUMERIC(12, 2)";
      break;
    case "datetime":
    case "date":
    case "timestamp":
      javaType = "java.time.LocalDateTime";
      tsType = "string";
      sqlType = "DATETIME";
      pgSqlType = "TIMESTAMP";
      break;
    case "text":
    case "json":
      javaType = "String";
      tsType = "string";
      sqlType = "TEXT";
      pgSqlType = "TEXT";
      break;
    default:
      javaType = "String";
      tsType = "string";
      sqlType = "VARCHAR(255)";
      pgSqlType = "VARCHAR(255)";
  }

  return {
    name,
    columnName: toSnakeCase(name),
    javaType,
    tsType,
    sqlType,
    pgSqlType,
    comment,
    isReq,
    isSearch,
    isHidden,
  };
}

function ensureDirSync(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function generateEntityModule(entitySpec, rootDir = ROOT) {
  const layout = resolveBackendLayout(rootDir);
  const moduleName = String(entitySpec.module || "oa").toLowerCase();
  const entityPascal = toPascalCase(entitySpec.entity);
  const entityCamel = toCamelCase(entitySpec.entity);
  const entityKebab = toKebabCase(entitySpec.entity);
  const tableName = entitySpec.table || `${moduleName}_${toSnakeCase(entitySpec.entity)}`;
  const title = entitySpec.title || entityPascal;
  const remark = entitySpec.remark || entitySpec.description || title;
  const rawMenuName = entitySpec.menuName || title;
  const menuName = isValidMenuName(rawMenuName)
    ? String(rawMenuName).trim()
    : compactMenuName(rawMenuName, "单据管理");
  const rawParentMenuName =
    entitySpec.parentMenuName || entitySpec.domainMenuName || `${moduleName.toUpperCase()}管理`;
  const parentMenuName = isValidMenuName(rawParentMenuName)
    ? String(rawParentMenuName).trim()
    : compactMenuName(rawParentMenuName, "业务管理");
  const fields = parseFieldList(entitySpec.fields);
  const optimisticLock = entitySpec.optimisticLock !== false;
  const stateMachine = entitySpec.stateMachine || null;
  const convertActions = Array.isArray(entitySpec.convertActions) ? entitySpec.convertActions : [];
  const subTable = entitySpec.subTable || entitySpec.sub_table || null;

  // 若启用了状态机但字段中未显式声明状态列，自动补齐 status 字段
  const statusField = stateMachine?.field ? toCamelCase(stateMachine.field) : "status";
  if (stateMachine && !fields.some((f) => f.name === statusField)) {
    fields.push(
      normalizeFieldSpec({
        name: statusField,
        type: "string",
        comment: `${title}状态`,
        required: true,
        search: true,
      })
    );
  }

  const basePkg = `${layout.rootPkg}.module.${moduleName}`;
  const frameworkPkg = layout.frameworkPkg;
  const backendSrc = path.join(
    layout.javaRoot,
    ...layout.rootPkg.split("."),
    "module",
    moduleName
  );

  // 1. DataObject (含 BaseDO 审计字段与 @Version 乐观锁)
  const doContent = `package ${basePkg}.dal.dataobject;

import ${frameworkPkg}.mybatis.core.dataobject.BaseDO;
import com.baomidou.mybatisplus.annotation.Version;
import java.io.Serializable;

/**
 * ${title} DO 实体类
 * 对应物理表: ${tableName}
 */
public class ${entityPascal}DO extends BaseDO implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 编号
     */
    private Long id;

    /**
     * 乐观锁版本号
     */
    @Version
    private Integer version;
${fields
  .map(
    (f) => `
    /**
     * ${f.comment}
     */
    private ${f.javaType} ${f.name};`
  )
  .join("")}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
${fields
  .map(
    (f) => `
    public ${f.javaType} get${toPascalCase(f.name)}() {
        return ${f.name};
    }

    public void set${toPascalCase(f.name)}(${f.javaType} ${f.name}) {
        this.${f.name} = ${f.name};
    }`
  )
  .join("")}
}
`;

  // 2. Mapper
  const mapperContent = `package ${basePkg}.dal.mysql;

import ${basePkg}.dal.dataobject.${entityPascal}DO;
import ${basePkg}.controller.admin.vo.${entityPascal}PageReqVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/**
 * ${title} Mapper 数据持久层访问接口
 */
@Mapper
public interface ${entityPascal}Mapper {

    int insert(${entityPascal}DO entity);

    int updateById(${entityPascal}DO entity);

    int deleteById(Long id);

    ${entityPascal}DO selectById(Long id);

    List<${entityPascal}DO> selectList(${entityPascal}PageReqVO reqVO);

    Long selectCount(${entityPascal}PageReqVO reqVO);
}
`;

  // 构建状态机转换映射代码
  const smTransitions = stateMachine?.transitions || {};
  const smEntriesCode = Object.entries(smTransitions)
    .map(
      ([fromState, toStates]) =>
        `        STATE_GRAPH.put("${fromState}", Set.of(${(Array.isArray(toStates) ? toStates : [toStates])
          .map((s) => `"${s}"`)
          .join(", ")}));`
    )
    .join("\n");

  // 3. Service Interface
  const serviceContent = `package ${basePkg}.service;

import ${basePkg}.dal.dataobject.${entityPascal}DO;
import ${basePkg}.controller.admin.vo.${entityPascal}PageReqVO;
import ${basePkg}.controller.admin.vo.${entityPascal}SaveReqVO;
import ${frameworkPkg}.common.pojo.PageResult;

/**
 * ${title} 核心业务逻辑服务接口
 */
public interface ${entityPascal}Service {

    Long create${entityPascal}(${entityPascal}SaveReqVO createReqVO);

    void update${entityPascal}(${entityPascal}SaveReqVO updateReqVO);

    void delete${entityPascal}(Long id);

    ${entityPascal}DO get${entityPascal}(Long id);

    PageResult<${entityPascal}DO> get${entityPascal}Page(${entityPascal}PageReqVO pageReqVO);

    /**
     * 状态机受控跃迁（含非法流转 400 守卫与乐观锁版本 409 守卫）
     */
    ${entityPascal}DO transition${entityPascal}Status(Long id, String toStatus, Integer expectedVersion);
${convertActions
  .map(
    (act) => `
    /**
     * 跨表动作: ${act.label || act.name} -> ${act.targetEntity || act.targetTable}
     */
    Long ${toCamelCase(act.name || `convertTo_${act.targetEntity}`)}(Long sourceId);`
  )
  .join("")}
}
`;

  // 4. Service Implementation
  const serviceImplContent = `package ${basePkg}.service;

import ${basePkg}.dal.dataobject.${entityPascal}DO;
import ${basePkg}.dal.mysql.${entityPascal}Mapper;
import ${basePkg}.controller.admin.vo.${entityPascal}PageReqVO;
import ${basePkg}.controller.admin.vo.${entityPascal}SaveReqVO;
import ${basePkg}.convert.${entityPascal}Convert;
import ${frameworkPkg}.common.pojo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/**
 * ${title} 核心业务逻辑服务实现类
 */
@Service
@Validated
public class ${entityPascal}ServiceImpl implements ${entityPascal}Service {

    private static final Map<String, Set<String>> STATE_GRAPH = new HashMap<>();

    static {
${smEntriesCode || '        // 默认无额外状态限制'}
    }

    private final ${entityPascal}Mapper ${entityCamel}Mapper;

    public ${entityPascal}ServiceImpl(${entityPascal}Mapper ${entityCamel}Mapper) {
        this.${entityCamel}Mapper = ${entityCamel}Mapper;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long create${entityPascal}(${entityPascal}SaveReqVO createReqVO) {
        ${entityPascal}DO entity = ${entityPascal}Convert.INSTANCE.convert(createReqVO);
        if (entity.getVersion() == null) {
            entity.setVersion(1);
        }
        ${entityCamel}Mapper.insert(entity);
        return entity.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update${entityPascal}(${entityPascal}SaveReqVO updateReqVO) {
        ${entityPascal}DO current = validate${entityPascal}Exists(updateReqVO.getId());
        if (updateReqVO.getVersion() != null && !Objects.equals(current.getVersion(), updateReqVO.getVersion())) {
            throw new IllegalStateException("[409_CONFLICT] ${title}已被并发修改，当前版本: " + current.getVersion());
        }
        ${entityPascal}DO updateObj = ${entityPascal}Convert.INSTANCE.convert(updateReqVO);
        updateObj.setVersion((current.getVersion() == null ? 1 : current.getVersion()) + 1);
        ${entityCamel}Mapper.updateById(updateObj);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete${entityPascal}(Long id) {
        validate${entityPascal}Exists(id);
        ${entityCamel}Mapper.deleteById(id);
    }

    private ${entityPascal}DO validate${entityPascal}Exists(Long id) {
        ${entityPascal}DO current = ${entityCamel}Mapper.selectById(id);
        if (current == null) {
            throw new IllegalArgumentException("[404_NOT_FOUND] ${title}不存在，编号: " + id);
        }
        return current;
    }

    @Override
    public ${entityPascal}DO get${entityPascal}(Long id) {
        return ${entityCamel}Mapper.selectById(id);
    }

    @Override
    public PageResult<${entityPascal}DO> get${entityPascal}Page(${entityPascal}PageReqVO pageReqVO) {
        List<${entityPascal}DO> list = ${entityCamel}Mapper.selectList(pageReqVO);
        Long total = ${entityCamel}Mapper.selectCount(pageReqVO);
        return new PageResult<>(list, total);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ${entityPascal}DO transition${entityPascal}Status(Long id, String toStatus, Integer expectedVersion) {
        ${entityPascal}DO current = validate${entityPascal}Exists(id);
        if (expectedVersion != null && !Objects.equals(current.getVersion(), expectedVersion)) {
            throw new IllegalStateException("[409_CONFLICT] 乐观锁版本冲突: expected=" + expectedVersion + ", actual=" + current.getVersion());
        }
        ${
          stateMachine
            ? `String fromStatus = String.valueOf(current.get${toPascalCase(statusField)}());
        Set<String> allowed = STATE_GRAPH.get(fromStatus);
        if (allowed == null || !allowed.contains(toStatus)) {
            throw new IllegalArgumentException("[400_ILLEGAL_STATE_TRANSITION] 非法状态跃迁: " + fromStatus + " -> " + toStatus);
        }
        current.set${toPascalCase(statusField)}(toStatus);`
            : "// 无状态机约束字段"
        }
        current.setVersion((current.getVersion() == null ? 1 : current.getVersion()) + 1);
        ${entityCamel}Mapper.updateById(current);
        return current;
    }
${convertActions
  .map(
    (act) => `
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long ${toCamelCase(act.name || `convertTo_${act.targetEntity}`)}(Long sourceId) {
        ${entityPascal}DO source = validate${entityPascal}Exists(sourceId);
        ${
          act.requireStatus
            ? `if (!"${act.requireStatus}".equals(String.valueOf(source.get${toPascalCase(statusField)}()))) {
            throw new IllegalArgumentException("[400_CONVERT_GUARD] 仅状态为 ${act.requireStatus} 的记录可执行转换");
        }`
            : ""
        }
        return source.getId();
    }`
  )
  .join("")}
}
`;

  // 5. PageReqVO
  const pageReqVoContent = `package ${basePkg}.controller.admin.vo;

import ${frameworkPkg}.common.pojo.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * 管理后台 - ${title}分页查询 Request VO
 */
@Schema(description = "管理后台 - ${title}分页查询 Request VO")
public class ${entityPascal}PageReqVO extends PageParam {
${fields
  .filter((f) => f.isSearch)
  .map(
    (f) => `
    @Schema(description = "${f.comment}")
    private ${f.javaType} ${f.name};`
  )
  .join("")}
${fields
  .filter((f) => f.isSearch)
  .map(
    (f) => `
    public ${f.javaType} get${toPascalCase(f.name)}() {
        return ${f.name};
    }

    public void set${toPascalCase(f.name)}(${f.javaType} ${f.name}) {
        this.${f.name} = ${f.name};
    }`
  )
  .join("")}
}
`;

  // 6. SaveReqVO
  const saveReqVoContent = `package ${basePkg}.controller.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;

/**
 * 管理后台/移动端 - ${title}创建/更新 Request VO
 */
@Schema(description = "管理后台/移动端 - ${title}创建/更新 Request VO")
public class ${entityPascal}SaveReqVO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "编号 (更新时必传)")
    private Long id;

    @Schema(description = "乐观锁版本号")
    private Integer version;
${fields
  .map(
    (f) => `
    @Schema(description = "${f.comment}"${f.isReq ? ", requiredMode = Schema.RequiredMode.REQUIRED" : ""})
    private ${f.javaType} ${f.name};`
  )
  .join("")}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
${fields
  .map(
    (f) => `
    public ${f.javaType} get${toPascalCase(f.name)}() {
        return ${f.name};
    }

    public void set${toPascalCase(f.name)}(${f.javaType} ${f.name}) {
        this.${f.name} = ${f.name};
    }`
  )
  .join("")}
}
`;

  // 7. RespVO
  const respVoContent = `package ${basePkg}.controller.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 管理后台/移动端 - ${title}响应 Response VO
 */
@Schema(description = "管理后台/移动端 - ${title}响应 Response VO")
public class ${entityPascal}RespVO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "编号")
    private Long id;

    @Schema(description = "乐观锁版本号")
    private Integer version;
${fields
  .map(
    (f) => `
    @Schema(description = "${f.comment}")
    private ${f.javaType} ${f.name};`
  )
  .join("")}

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
${fields
  .map(
    (f) => `
    public ${f.javaType} get${toPascalCase(f.name)}() {
        return ${f.name};
    }

    public void set${toPascalCase(f.name)}(${f.javaType} ${f.name}) {
        this.${f.name} = ${f.name};
    }`
  )
  .join("")}

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
}
`;

  // 8. Convert
  const convertContent = `package ${basePkg}.convert;

import ${basePkg}.dal.dataobject.${entityPascal}DO;
import ${basePkg}.controller.admin.vo.${entityPascal}RespVO;
import ${basePkg}.controller.admin.vo.${entityPascal}SaveReqVO;
import ${frameworkPkg}.common.pojo.PageResult;
import java.util.ArrayList;
import java.util.List;

/**
 * ${title} 实体转换器
 */
public class ${entityPascal}Convert {

    public static final ${entityPascal}Convert INSTANCE = new ${entityPascal}Convert();

    public ${entityPascal}DO convert(${entityPascal}SaveReqVO bean) {
        if (bean == null) return null;
        ${entityPascal}DO entity = new ${entityPascal}DO();
        entity.setId(bean.getId());
        entity.setVersion(bean.getVersion());
${fields
  .map((f) => `        entity.set${toPascalCase(f.name)}(bean.get${toPascalCase(f.name)}());\n`)
  .join("")}        return entity;
    }

    public ${entityPascal}RespVO convert(${entityPascal}DO bean) {
        if (bean == null) return null;
        ${entityPascal}RespVO vo = new ${entityPascal}RespVO();
        vo.setId(bean.getId());
        vo.setVersion(bean.getVersion());
${fields
  .map((f) => `        vo.set${toPascalCase(f.name)}(bean.get${toPascalCase(f.name)}());\n`)
  .join("")}        vo.setCreateTime(bean.getCreateTime());
        return vo;
    }

    public PageResult<${entityPascal}RespVO> convertPage(PageResult<${entityPascal}DO> page) {
        if (page == null) return PageResult.empty();
        List<${entityPascal}RespVO> list = new ArrayList<>();
        if (page.getList() != null) {
            for (${entityPascal}DO item : page.getList()) {
                list.add(convert(item));
            }
        }
        return new PageResult<>(list, page.getTotal());
    }
}
`;

  // 9. B-End Admin Controller (/admin-api/...)
  const adminControllerContent = `package ${basePkg}.controller.admin;

import ${basePkg}.controller.admin.vo.${entityPascal}PageReqVO;
import ${basePkg}.controller.admin.vo.${entityPascal}RespVO;
import ${basePkg}.controller.admin.vo.${entityPascal}SaveReqVO;
import ${basePkg}.dal.dataobject.${entityPascal}DO;
import ${basePkg}.service.${entityPascal}Service;
import ${basePkg}.convert.${entityPascal}Convert;
import ${frameworkPkg}.common.pojo.CommonResult;
import ${frameworkPkg}.common.pojo.PageResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static ${frameworkPkg}.common.pojo.CommonResult.success;

/**
 * 管理后台 - ${title} 控制器
 */
@Tag(name = "管理后台 - ${title}")
@RestController
@RequestMapping("/admin-api/${moduleName}/${entityKebab}")
@Validated
public class ${entityPascal}Controller {

    private final ${entityPascal}Service ${entityCamel}Service;

    public ${entityPascal}Controller(${entityPascal}Service ${entityCamel}Service) {
        this.${entityCamel}Service = ${entityCamel}Service;
    }

    @PostMapping("/create")
    @Operation(summary = "创建${title}")
    public CommonResult<Long> create${entityPascal}(@Validated @RequestBody ${entityPascal}SaveReqVO createReqVO) {
        return success(${entityCamel}Service.create${entityPascal}(createReqVO));
    }

    @PutMapping("/update")
    @Operation(summary = "更新${title}")
    public CommonResult<Boolean> update${entityPascal}(@Validated @RequestBody ${entityPascal}SaveReqVO updateReqVO) {
        ${entityCamel}Service.update${entityPascal}(updateReqVO);
        return success(true);
    }

    @PostMapping("/transition")
    @Operation(summary = "状态机流转${title}")
    public CommonResult<${entityPascal}RespVO> transition${entityPascal}Status(
            @RequestParam("id") Long id,
            @RequestParam("toStatus") String toStatus,
            @RequestParam(value = "version", required = false) Integer version) {
        ${entityPascal}DO updated = ${entityCamel}Service.transition${entityPascal}Status(id, toStatus, version);
        return success(${entityPascal}Convert.INSTANCE.convert(updated));
    }

    @DeleteMapping("/delete")
    @Operation(summary = "删除${title}")
    @Parameter(name = "id", description = "编号", required = true)
    public CommonResult<Boolean> delete${entityPascal}(@RequestParam("id") Long id) {
        ${entityCamel}Service.delete${entityPascal}(id);
        return success(true);
    }

    @GetMapping("/get")
    @Operation(summary = "获得${title}")
    @Parameter(name = "id", description = "编号", required = true)
    public CommonResult<${entityPascal}RespVO> get${entityPascal}(@RequestParam("id") Long id) {
        ${entityPascal}DO entity = ${entityCamel}Service.get${entityPascal}(id);
        return success(${entityPascal}Convert.INSTANCE.convert(entity));
    }

    @GetMapping("/page")
    @Operation(summary = "获得${title}分页")
    public CommonResult<PageResult<${entityPascal}RespVO>> get${entityPascal}Page(@Validated ${entityPascal}PageReqVO pageReqVO) {
        PageResult<${entityPascal}DO> pageResult = ${entityCamel}Service.get${entityPascal}Page(pageReqVO);
        return success(${entityPascal}Convert.INSTANCE.convertPage(pageResult));
    }
}
`;

  // 10. C-End App Controller (/app-api/...)
  const appControllerContent = `package ${basePkg}.controller.app;

import ${basePkg}.controller.admin.vo.${entityPascal}PageReqVO;
import ${basePkg}.controller.admin.vo.${entityPascal}RespVO;
import ${basePkg}.controller.admin.vo.${entityPascal}SaveReqVO;
import ${basePkg}.dal.dataobject.${entityPascal}DO;
import ${basePkg}.service.${entityPascal}Service;
import ${basePkg}.convert.${entityPascal}Convert;
import ${frameworkPkg}.common.pojo.CommonResult;
import ${frameworkPkg}.common.pojo.PageResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static ${frameworkPkg}.common.pojo.CommonResult.success;

/**
 * 用户 App / C 端门户 - ${title} 控制器
 */
@Tag(name = "用户 App - ${title}")
@RestController
@RequestMapping("/app-api/${moduleName}/${entityKebab}")
@Validated
public class App${entityPascal}Controller {

    private final ${entityPascal}Service ${entityCamel}Service;

    public App${entityPascal}Controller(${entityPascal}Service ${entityCamel}Service) {
        this.${entityCamel}Service = ${entityCamel}Service;
    }

    @PostMapping("/create")
    @Operation(summary = "C端提交${title}")
    public CommonResult<Long> create${entityPascal}(@Validated @RequestBody ${entityPascal}SaveReqVO createReqVO) {
        return success(${entityCamel}Service.create${entityPascal}(createReqVO));
    }

    @GetMapping("/get")
    @Operation(summary = "C端获取${title}详情")
    public CommonResult<${entityPascal}RespVO> get${entityPascal}(@RequestParam("id") Long id) {
        ${entityPascal}DO entity = ${entityCamel}Service.get${entityPascal}(id);
        return success(${entityPascal}Convert.INSTANCE.convert(entity));
    }

    @GetMapping("/page")
    @Operation(summary = "C端获取${title}分页列表")
    public CommonResult<PageResult<${entityPascal}RespVO>> get${entityPascal}Page(@Validated ${entityPascal}PageReqVO pageReqVO) {
        PageResult<${entityPascal}DO> pageResult = ${entityCamel}Service.get${entityPascal}Page(pageReqVO);
        return success(${entityPascal}Convert.INSTANCE.convertPage(pageResult));
    }
}
`;

  // 11. Front-end Admin API Client (TS)
  const apiTsPath = path.join(rootDir, "apps/admin/src/api", moduleName, entityKebab, "index.ts");
  const apiTsContent = `import { request } from '@/utils/request';

export interface ${entityPascal}VO {
  id?: number;
  version?: number;
${fields.map((f) => `  ${f.name}?: ${f.tsType};`).join("\n")}
  createTime?: string;
}

export interface ${entityPascal}PageReqVO {
  pageNo: number;
  pageSize: number;
${fields
  .filter((f) => f.isSearch)
  .map((f) => `  ${f.name}?: ${f.tsType};`)
  .join("\n")}
}

// 查询${title}分页列表
export const get${entityPascal}PageApi = (params: ${entityPascal}PageReqVO) => {
  return request.get({ url: '/admin-api/${moduleName}/${entityKebab}/page', params });
};

// 查询${title}详情
export const get${entityPascal}Api = (id: number) => {
  return request.get({ url: '/admin-api/${moduleName}/${entityKebab}/get', params: { id } });
};

// 新增${title}
export const create${entityPascal}Api = (data: ${entityPascal}VO) => {
  return request.post({ url: '/admin-api/${moduleName}/${entityKebab}/create', data });
};

// 修改${title}
export const update${entityPascal}Api = (data: ${entityPascal}VO) => {
  return request.put({ url: '/admin-api/${moduleName}/${entityKebab}/update', data });
};

// 状态机跃迁${title}
export const transition${entityPascal}StatusApi = (id: number, toStatus: string, version?: number) => {
  return request.post({ url: '/admin-api/${moduleName}/${entityKebab}/transition', params: { id, toStatus, version } });
};

// 删除${title}
export const delete${entityPascal}Api = (id: number) => {
  return request.delete({ url: '/admin-api/${moduleName}/${entityKebab}/delete', params: { id } });
};
`;

  // 12. Front-end Vue3 View
  const vueViewPath = path.join(rootDir, "apps/admin/src/views", moduleName, entityKebab, "index.vue");
  const vueViewContent = `<template>
  <div class="app-container p-4">
    <el-card shadow="never" class="mb-4">
      <el-form :model="tableObject.queryParams" ref="queryFormRef" :inline="true">
${fields
  .filter((f) => f.isSearch)
  .map(
    (f) => `        <el-form-item label="${f.comment}" prop="${f.name}">
          <el-input
            v-model="tableObject.queryParams.${f.name}"
            placeholder="请输入${f.comment}"
            clearable
            @keyup.enter="tableMethods.handleQuery"
          />
        </el-form-item>`
  )
  .join("\n")}
        <el-form-item>
          <el-button type="primary" @click="tableMethods.handleQuery">查询</el-button>
          <el-button @click="tableMethods.resetQuery">重置</el-button>
          <el-button type="success" plain @click="openForm('create')">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <el-table v-loading="tableObject.loading" :data="tableObject.dataList" border stripe>
        <el-table-column label="编号" align="center" prop="id" width="80" />
${fields
  .filter((f) => !f.isHidden)
  .map((f) => `        <el-table-column label="${f.comment}" align="center" prop="${f.name}" />`)
  .join("\n")}
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="操作" align="center" width="160">
          <template #default="scope">
            <el-button link type="primary" @click="openForm('update', scope.row.id)">修改</el-button>
            <el-button link type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  get${entityPascal}PageApi,
  delete${entityPascal}Api,
} from '@/api/${moduleName}/${entityKebab}';
import { useTable } from '@/hooks/web/useTable';

const { tableObject, tableMethods } = useTable({
  getListApi: get${entityPascal}PageApi,
});

const openForm = (_type: 'create' | 'update', _id?: number) => {};

const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('是否确认删除此项数据？', '提示', { type: 'warning' });
  await delete${entityPascal}Api(id);
  ElMessage.success('删除成功');
  tableMethods.getList();
};

onMounted(() => {
  tableMethods.getList();
});
</script>
`;

  // 13. C-End Miniapp API Client
  const miniappApiPath = path.join(rootDir, "apps/miniapp/sheep/api", moduleName, `${entityKebab}.js`);
  const miniappApiContent = `import request from '@/sheep/request';

export default {
  get${entityPascal}Page: (params) =>
    request({ url: '/app-api/${moduleName}/${entityKebab}/page', method: 'GET', params }),
  get${entityPascal}: (id) =>
    request({ url: '/app-api/${moduleName}/${entityKebab}/get', method: 'GET', params: { id } }),
  create${entityPascal}: (data) =>
    request({ url: '/app-api/${moduleName}/${entityKebab}/create', method: 'POST', data }),
};
`;

  // 14. SQL DDL (PostgreSQL 真源 + MySQL 兼容版，含主表 + 可选子表 subTable + 乐观锁 version + 多租户 tenant_id + 6 审计列)
  const sqlPath = path.join(rootDir, "apps/backend/sql/mysql", `${tableName}.sql`);
  const pgSqlPath = path.join(rootDir, "apps/backend/sql/postgresql", `${tableName}.sql`);
  const subTableName = subTable ? subTable.table || `${tableName}_line` : null;
  const subTableFk = subTable ? toSnakeCase(subTable.foreignKey || `${entityCamel}Id`) : null;
  const subTableFields = subTable ? parseFieldList(subTable.fields || []) : [];

  const subTableSql = subTable
    ? `\n-- 子表: ${subTableName} (${subTable.title || `${title}明细`})
CREATE TABLE IF NOT EXISTS \`${subTableName}\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT COMMENT '明细编号',
  \`${subTableFk}\` BIGINT NOT NULL COMMENT '主表关联ID',
${subTableFields
  .map(
    (f) =>
      `  \`${f.columnName}\` ${f.sqlType} ${f.isReq ? "NOT NULL" : "DEFAULT NULL"} COMMENT '${f.comment}',`
  )
  .join("\n")}
  \`creator\` VARCHAR(64) DEFAULT '' COMMENT '创建者',
  \`create_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  \`updater\` VARCHAR(64) DEFAULT '' COMMENT '更新者',
  \`update_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  \`deleted\` BIT(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  \`tenant_id\` BIGINT NOT NULL DEFAULT 0 COMMENT '多租户编号',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='${subTable.title || `${title}明细`}';\n`
    : "";

  const pgSubTableSql = subTable
    ? `\n-- 子表 (PostgreSQL): ${subTableName} (${subTable.title || `${title}明细`})
CREATE TABLE IF NOT EXISTS ${subTableName} (
  id BIGSERIAL PRIMARY KEY,
  ${subTableFk} BIGINT NOT NULL,
${subTableFields
  .map(
    (f) =>
      `  ${f.columnName} ${f.pgSqlType} ${f.isReq ? "NOT NULL" : "DEFAULT NULL"},`
  )
  .join("\n")}
  creator VARCHAR(64) DEFAULT '',
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updater VARCHAR(64) DEFAULT '',
  update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted INT2 NOT NULL DEFAULT 0,
  tenant_id BIGINT NOT NULL DEFAULT 0
);
COMMENT ON TABLE ${subTableName} IS '${subTable.title || `${title}明细`}';\n`
    : "";

  const sqlEscape = (s) => String(s ?? "").replace(/'/g, "''");
  const safeParentMenu = sqlEscape(parentMenuName);
  const safePageMenu = sqlEscape(menuName);
  const safeRemark = sqlEscape(remark);

  const pgMenuSql = `
-- -------------------------------------------------------------
-- 导航菜单与按钮权限种子（严格执行目录/页面菜单 <= 4 字规范，完整描述保留于注释: ${safeRemark}）
-- 目录菜单: '${safeParentMenu}' (len=${[...parentMenuName].length}) | 页面菜单: '${safePageMenu}' (len=${[...menuName].length})
-- -------------------------------------------------------------
DO $$
DECLARE
  v_parent_id BIGINT;
  v_page_id BIGINT;
BEGIN
  IF to_regclass('public.system_menu') IS NOT NULL THEN
    SELECT id INTO v_parent_id FROM system_menu WHERE parent_id = 0 AND path = '/${moduleName}' AND deleted = 0 LIMIT 1;
    IF v_parent_id IS NULL THEN
      SELECT COALESCE(MAX(id), 9000) + 1 INTO v_parent_id FROM system_menu;
      INSERT INTO system_menu (id, name, permission, type, sort, parent_id, path, icon, component, component_name, status, visible, keep_alive, always_show, creator, updater, deleted)
      VALUES (v_parent_id, '${safeParentMenu}', '', 1, 50, 0, '/${moduleName}', 'ep:grid', NULL, NULL, 0, true, true, true, 'admin', 'admin', 0);
    END IF;

    SELECT id INTO v_page_id FROM system_menu WHERE parent_id = v_parent_id AND path = '${entityKebab}' AND deleted = 0 LIMIT 1;
    IF v_page_id IS NULL THEN
      SELECT COALESCE(MAX(id), v_parent_id) + 1 INTO v_page_id FROM system_menu;
      INSERT INTO system_menu (id, name, permission, type, sort, parent_id, path, icon, component, component_name, status, visible, keep_alive, always_show, creator, updater, deleted)
      VALUES (v_page_id, '${safePageMenu}', '${moduleName}:${entityKebab}:query', 2, 10, v_parent_id, '${entityKebab}', 'ep:document', '${moduleName}/${entityKebab}/index', '${entityPascal}', 0, true, true, true, 'admin', 'admin', 0);

      INSERT INTO system_menu (id, name, permission, type, sort, parent_id, path, icon, component, component_name, status, visible, keep_alive, always_show, creator, updater, deleted)
      VALUES
        (v_page_id + 1, '查询', '${moduleName}:${entityKebab}:query', 3, 1, v_page_id, '', '#', '', NULL, 0, true, true, true, 'admin', 'admin', 0),
        (v_page_id + 2, '新增', '${moduleName}:${entityKebab}:create', 3, 2, v_page_id, '', '#', '', NULL, 0, true, true, true, 'admin', 'admin', 0),
        (v_page_id + 3, '修改', '${moduleName}:${entityKebab}:update', 3, 3, v_page_id, '', '#', '', NULL, 0, true, true, true, 'admin', 'admin', 0),
        (v_page_id + 4, '删除', '${moduleName}:${entityKebab}:delete', 3, 4, v_page_id, '', '#', '', NULL, 0, true, true, true, 'admin', 'admin', 0),
        (v_page_id + 5, '导出', '${moduleName}:${entityKebab}:export', 3, 5, v_page_id, '', '#', '', NULL, 0, true, true, true, 'admin', 'admin', 0);
    END IF;
  END IF;
END $$;
`;

  const pgSqlContent = `-- -------------------------------------------------------------
-- PostgreSQL 物理表: ${tableName} (${title})
-- 根包名: ${layout.rootPkg} | 服务模块: ${layout.serverDirName}
-- 导航菜单 (<=4字): ${parentMenuName} / ${menuName} | 完整描述: ${remark}
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ${tableName} (
  id BIGSERIAL PRIMARY KEY,
${fields
  .map(
    (f) =>
      `  ${f.columnName} ${f.pgSqlType} ${f.isReq ? "NOT NULL" : "DEFAULT NULL"},`
  )
  .join("\n")}
  version INT4 NOT NULL DEFAULT 1,
  creator VARCHAR(64) DEFAULT '',
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updater VARCHAR(64) DEFAULT '',
  update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted INT2 NOT NULL DEFAULT 0,
  tenant_id BIGINT NOT NULL DEFAULT 0
);
COMMENT ON TABLE ${tableName} IS '${safeRemark}';
${pgSubTableSql}${pgMenuSql}`;

  const sqlContent = `-- -------------------------------------------------------------
-- 物理表: ${tableName} (${title})
-- 根包名: ${layout.rootPkg} | 服务模块: ${layout.serverDirName}
-- 导航菜单 (<=4字): ${parentMenuName} / ${menuName} | 完整描述: ${remark}
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`${tableName}\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT COMMENT '编号',
${fields
  .map(
    (f) =>
      `  \`${f.columnName}\` ${f.sqlType} ${f.isReq ? "NOT NULL" : "DEFAULT NULL"} COMMENT '${f.comment}',`
  )
  .join("\n")}
  \`version\` INT NOT NULL DEFAULT 1 COMMENT '乐观锁版本号',
  \`creator\` VARCHAR(64) DEFAULT '' COMMENT '创建者',
  \`create_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  \`updater\` VARCHAR(64) DEFAULT '' COMMENT '更新者',
  \`update_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  \`deleted\` BIT(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  \`tenant_id\` BIGINT NOT NULL DEFAULT 0 COMMENT '多租户编号',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='${safeRemark}';
${subTableSql}
-- -------------------------------------------------------------
-- 导航菜单与按钮权限种子（严格执行目录/页面菜单 <= 4 字规范，完整描述: ${safeRemark}）
-- -------------------------------------------------------------
INSERT INTO system_menu (name, permission, type, sort, parent_id, path, icon, component, component_name, status, visible, keep_alive, always_show)
VALUES ('${safeParentMenu}', '', 1, 50, 0, '/${moduleName}', 'ep:grid', NULL, NULL, 0, b'1', b'1', b'1');
SET @parentId := LAST_INSERT_ID();

INSERT INTO system_menu (name, permission, type, sort, parent_id, path, icon, component, component_name, status, visible, keep_alive, always_show)
VALUES ('${safePageMenu}', '${moduleName}:${entityKebab}:query', 2, 10, @parentId, '${entityKebab}', 'ep:document', '${moduleName}/${entityKebab}/index', '${entityPascal}', 0, b'1', b'1', b'1');
SET @menuId := LAST_INSERT_ID();

INSERT INTO system_menu (name, permission, type, sort, parent_id, path, icon, component, status, visible, keep_alive, always_show)
VALUES
  ('查询', '${moduleName}:${entityKebab}:query', 3, 1, @menuId, '', '#', '', 0, b'1', b'1', b'1'),
  ('新增', '${moduleName}:${entityKebab}:create', 3, 2, @menuId, '', '#', '', 0, b'1', b'1', b'1'),
  ('修改', '${moduleName}:${entityKebab}:update', 3, 3, @menuId, '', '#', '', 0, b'1', b'1', b'1'),
  ('删除', '${moduleName}:${entityKebab}:delete', 3, 4, @menuId, '', '#', '', 0, b'1', b'1', b'1'),
  ('导出', '${moduleName}:${entityKebab}:export', 3, 5, @menuId, '', '#', '', 0, b'1', b'1', b'1');
`;

  const filesToWrite = [
    { path: path.join(backendSrc, "dal/dataobject", `${entityPascal}DO.java`), content: doContent, name: "Java DataObject" },
    { path: path.join(backendSrc, "dal/mysql", `${entityPascal}Mapper.java`), content: mapperContent, name: "Java MyBatis Mapper" },
    { path: path.join(backendSrc, "service", `${entityPascal}Service.java`), content: serviceContent, name: "Java Service Interface" },
    { path: path.join(backendSrc, "service", `${entityPascal}ServiceImpl.java`), content: serviceImplContent, name: "Java Service Implementation" },
    { path: path.join(backendSrc, "controller/admin/vo", `${entityPascal}PageReqVO.java`), content: pageReqVoContent, name: "Java PageReqVO" },
    { path: path.join(backendSrc, "controller/admin/vo", `${entityPascal}SaveReqVO.java`), content: saveReqVoContent, name: "Java SaveReqVO" },
    { path: path.join(backendSrc, "controller/admin/vo", `${entityPascal}RespVO.java`), content: respVoContent, name: "Java RespVO" },
    { path: path.join(backendSrc, "convert", `${entityPascal}Convert.java`), content: convertContent, name: "Java Convert" },
    { path: path.join(backendSrc, "controller/admin", `${entityPascal}Controller.java`), content: adminControllerContent, name: "Java Admin Controller" },
    { path: path.join(backendSrc, "controller/app", `App${entityPascal}Controller.java`), content: appControllerContent, name: "Java App Controller" },
    { path: apiTsPath, content: apiTsContent, name: "TS Admin API Client" },
    { path: vueViewPath, content: vueViewContent, name: "Vue3 Admin View" },
    { path: miniappApiPath, content: miniappApiContent, name: "UniApp C-End API Client" },
    { path: pgSqlPath, content: pgSqlContent, name: "PostgreSQL Database DDL" },
    { path: sqlPath, content: sqlContent, name: "MySQL Database DDL" },
  ];

  let totalLines = 0;
  const written = [];
  for (const item of filesToWrite) {
    const relPath = path.relative(rootDir, item.path);
    const lines = item.content.split("\n").length;
    totalLines += lines;

    if (entitySpec.dryRun) {
      console.log(`[DRY-RUN] 将生成 ${item.name}: ${relPath} (${lines} 行)`);
      continue;
    }

    if (fs.existsSync(item.path) && !entitySpec.force) {
      console.log(`⚠️ 文件已存在 (跳过，使用 --force 覆盖): ${relPath}`);
      continue;
    }

    ensureDirSync(item.path);
    fs.writeFileSync(item.path, item.content, "utf8");
    written.push(relPath);
    console.log(`✅ [${item.name}] -> ${relPath} (${lines} 行)`);
  }

  return {
    moduleName,
    entityPascal,
    entityKebab,
    tableName,
    title,
    remark,
    menuName,
    parentMenuName,
    rootPkg: layout.rootPkg,
    serverDirName: layout.serverDirName,
    written,
    totalLines,
  };
}

function main() {
  const args = parseArgs();

  if (args.schemaFile) {
    const schemaAbs = path.resolve(process.cwd(), args.schemaFile);
    if (!fs.existsSync(schemaAbs)) {
      console.error(`❌ Schema 文件不存在: ${schemaAbs}`);
      process.exit(1);
    }
    const schema = JSON.parse(fs.readFileSync(schemaAbs, "utf8"));
    const moduleName = schema.domain || schema.module || "oa";
    const domainMenuName = schema.menuName || schema.title || `${moduleName.toUpperCase()}管理`;
    const entities = Array.isArray(schema.entities) ? schema.entities : [schema];
    for (const ent of entities) {
      generateEntityModule(
        {
          ...ent,
          module: ent.module || moduleName,
          entity: ent.entity || ent.name,
          table: ent.table || ent.tableName,
          title: ent.title || ent.label,
          remark: ent.remark || ent.description || ent.title || ent.label,
          menuName: ent.menuName,
          parentMenuName: ent.parentMenuName || domainMenuName,
          dryRun: args.dryRun,
          force: true,
        },
        ROOT
      );
    }
    return;
  }

  if (!args.module || !args.entity) {
    console.log(`
⚡ Yudao-Quad-Terminal 白标感知极速代码生成器 ⚡
用法:
  node scripts/codegen-module.mjs --schema <domain-schema.json>
  node scripts/codegen-module.mjs \\
    --module <module-name> \\
    --entity <EntityName> \\
    --table <table_name> \\
    --title <完整业务标题> \\
    [--menu-name <=4字导航短名] \\
    [--parent-menu-name <=4字目录短名] \\
    --fields "<name>:<type>:<comment>:<req|search|hidden>,..."
`);
    process.exit(1);
  }

  generateEntityModule(args, ROOT);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
