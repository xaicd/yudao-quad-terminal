import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DEPLOY_SERVICE = path.join(ROOT, "deploy/service.sh");
const SCRIPTS_SERVICE = path.join(ROOT, "scripts/service.sh");

const EIGHT_VERBS = ["install", "build", "start", "stop", "restart", "status", "health", "logs"];
const FORBIDDEN_CONTAINER_PATH = ["/host", "workspace"].join("-");

test("deploy/service.sh 与 scripts/service.sh 存在、具备可执行权限且零容器绝对路径硬编码", () => {
  for (const file of [DEPLOY_SERVICE, SCRIPTS_SERVICE]) {
    assert.equal(fs.existsSync(file), true, `${path.relative(ROOT, file)} 必须存在`);
    const st = fs.statSync(file);
    assert.notEqual(st.mode & 0o111, 0, `${path.relative(ROOT, file)} 必须具备 chmod +x 可执行权限`);
    const content = fs.readFileSync(file, "utf8");
    assert.equal(
      content.includes(FORBIDDEN_CONTAINER_PATH),
      false,
      `${path.relative(ROOT, file)} 严禁包含容器路径字面量 ${FORBIDDEN_CONTAINER_PATH}`
    );
    const syntax = spawnSync("bash", ["-n", file], { encoding: "utf8" });
    assert.equal(syntax.status, 0, `${path.relative(ROOT, file)} bash -n 语法检查失败: ${syntax.stderr}`);
  }
});

test("deploy/service.sh 与 scripts/service.sh 支持 --help / status 退出码 0 及非法动词拒绝", () => {
  for (const entry of [DEPLOY_SERVICE, SCRIPTS_SERVICE]) {
    const helpRes = spawnSync("bash", [entry, "--help"], {
      cwd: ROOT,
      encoding: "utf8",
      timeout: 15000,
    });
    assert.equal(helpRes.status, 0, `${path.relative(ROOT, entry)} --help 应退出码 0`);
    for (const verb of EIGHT_VERBS) {
      assert.match(helpRes.stdout, new RegExp(`\\b${verb}\\b`), `--help 输出应包含动词 ${verb}`);
    }

    const badRes = spawnSync("bash", [entry, "unknown-invalid-verb"], {
      cwd: ROOT,
      encoding: "utf8",
      timeout: 15000,
    });
    assert.notEqual(badRes.status, 0, "未知动词必须返回非 0 退出码");
  }
});

test("service.sh 八大标准动词解析 + .env.ports 与 credentials.env 自动读取契约", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "yudao-service-sh-test-"));
  try {
    fs.mkdirSync(path.join(tmp, "deploy"), { recursive: true });
    fs.mkdirSync(path.join(tmp, "scripts"), { recursive: true });
    fs.mkdirSync(path.join(tmp, ".commandcode/lite"), { recursive: true });
    fs.copyFileSync(DEPLOY_SERVICE, path.join(tmp, "deploy/service.sh"));
    fs.copyFileSync(SCRIPTS_SERVICE, path.join(tmp, "scripts/service.sh"));
    fs.chmodSync(path.join(tmp, "deploy/service.sh"), 0o755);
    fs.chmodSync(path.join(tmp, "scripts/service.sh"), 0o755);

    fs.writeFileSync(
      path.join(tmp, "package.json"),
      JSON.stringify({ name: "demo-portal", version: "1.0.0" }, null, 2),
      "utf8"
    );
    fs.writeFileSync(
      path.join(tmp, ".env.ports"),
      [
        "PROJECT_SLUG=demo-portal",
        "BASE_PATH=/demo-portal",
        "GATEWAY_PORT=49120",
        "BACKEND_PORT=49080",
        "ADMIN_PORT=49081",
        "DB_PORT=55932",
        "REDIS_PORT=63999",
      ].join("\n") + "\n",
      "utf8"
    );
    fs.writeFileSync(
      path.join(tmp, ".commandcode/lite/credentials.env"),
      "LITE_ADMIN_USERNAME=admin\nLITE_ADMIN_PASSWORD=Secret_9f8a7b6c5d4e\n",
      { encoding: "utf8", mode: 0o600 }
    );

    // 1. 逐一校验全部 8 个标准动词经 scripts/service.sh 转发至 deploy/service.sh 的解析输出
    for (const verb of EIGHT_VERBS) {
      const res = spawnSync("bash", [path.join(tmp, "scripts/service.sh"), verb, "--dry-run"], {
        cwd: tmp,
        encoding: "utf8",
        timeout: 15000,
      });
      assert.equal(res.status, 0, `动词 ${verb} --dry-run 必须返回 0: ${res.stderr}`);
      const parsed = JSON.parse(res.stdout.trim());
      assert.equal(parsed.dryRun, true);
      assert.equal(parsed.verb, verb);
      assert.equal(parsed.slug, "demo-portal");
      assert.equal(parsed.basePath, "/demo-portal");
      assert.equal(parsed.port, 49120);
      assert.equal(parsed.backendPort, 49080);
      assert.equal(parsed.adminPort, 49081);
      assert.equal(parsed.dbPort, 55932);
      assert.equal(parsed.redisPort, 63999);
      assert.equal(parsed.credentialsLoaded, true);
      assert.equal(res.stdout.includes("Secret_9f8a7b6c5d4e"), false, "严禁向终端泄漏口令明文");
    }

    // 2. 真实运行 status / logs / health（未启动服务时 status/logs 退出 0，health 返回 down JSON 且退出 1）
    const statusRes = spawnSync("bash", [path.join(tmp, "deploy/service.sh"), "status"], {
      cwd: tmp,
      encoding: "utf8",
      timeout: 15000,
    });
    assert.equal(statusRes.status, 0, "未启动态 status 查询应退出 0");
    assert.match(statusRes.stdout, /demo-portal/);
    assert.match(statusRes.stdout, /49120/);

    const logsRes = spawnSync("bash", [path.join(tmp, "deploy/service.sh"), "logs"], {
      cwd: tmp,
      encoding: "utf8",
      timeout: 15000,
    });
    assert.equal(logsRes.status, 0, "logs 动词在日志文件尚未生成时应退出 0");

    const healthDown = spawnSync("bash", [path.join(tmp, "deploy/service.sh"), "health"], {
      cwd: tmp,
      encoding: "utf8",
      timeout: 15000,
    });
    assert.equal(healthDown.status, 1, "未监听端口时 health 探针应返回退出码 1");
    const healthJson = JSON.parse(healthDown.stdout.trim());
    assert.equal(healthJson.status, "down");
    assert.equal(healthJson.slug, "demo-portal");
    assert.equal(healthJson.port, 49120);
    assert.equal(healthJson.backendPort, 49080);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
