#!/usr/bin/env node
/**
 * scripts/lite-down.mjs
 *
 * lite 档残留进程收割器（`pnpm lite:up` 非优雅退出时的兜底）
 *
 * 背景：`lite:up` 在收到 SIGINT/SIGTERM 时会成对回收 redis / PG / java。
 * 但如果 node 被 SIGKILL、或运行在不会转发子进程信号的 wrapper 下（例如某些 CI shell），
 * 三个子进程会变成孤儿并继续占用 63799 / 55432 / 48080 端口。
 *
 * 本脚本只匹配**本仓专属**的命令行特征，不会误杀其他项目：
 *   - Redis：     <repo>/.commandcode/lite/bin/...redis-server...
 *   - PostgreSQL：<repo>/.commandcode/lite/pgdata
 *   - 应用：      <repo>/apps/backend/yudao-server/target/yudao-server.jar
 *   - 编排器：    scripts/lite-up.mjs
 *
 * 用法：node scripts/lite-down.mjs [--json] [--force]
 * 退出码：0 已清理（或本就干净）；1 仍有残留
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const force = args.includes("--force");
if (args.includes("--help") || args.includes("-h")) {
  console.log("用法: node scripts/lite-down.mjs [--json] [--force]");
  process.exit(0);
}

const PATTERNS = [
  { label: "redis", re: /\.commandcode\/lite\/bin\/.*redis-server/ },
  { label: "postgres", re: /\.commandcode\/lite\/pgdata/ },
  { label: "app", re: /apps\/backend\/yudao-server\/target\/yudao-server\.jar/ },
  // 只匹配真正以 node 启动的编排器；避免把"命令行里恰好提到该路径"的 shell / grep / less 也算进来
  { label: "orchestrator", re: /^(?:\S*\/)?node\s+\S*lite-up\.mjs/ },
];

/**
 * 壳包装器排除：`sh -c "...lite-up.mjs..."` 这类命令行只是「提到」了脚本路径，
 * 并不是我们要收割的目标。早期版本漏了这个判断，曾误杀发起测试的 shell 本身。
 */
const SHELL_WRAPPER = /(^|\/)(sh|bash|zsh|dash|ksh)\s+-c\b/;

const PORTS = [63799, 55432, 48080];

function listProcesses() {
  const res = spawnSync("ps", ["-eo", "pid=,command="], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  return (res.stdout || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(" ");
      return { pid: Number(line.slice(0, idx)), command: line.slice(idx + 1) };
    })
    .filter((p) => Number.isFinite(p.pid) && p.pid !== process.pid);
}

/**
 * 判定一条命令行是否属于「本仓 lite 残留」。返回 label 或 null。
 * 纯函数，供测试直接覆盖（尤其是 shell 包装器排除这条——它曾导致误杀测试 shell）。
 */
export function classifyCommand(command) {
  if (!command) return null;
  if (SHELL_WRAPPER.test(command)) return null;
  for (const { label, re } of PATTERNS) if (re.test(command)) return label;
  return null;
}

function findTargets() {
  const out = [];
  for (const proc of listProcesses()) {
    const label = classifyCommand(proc.command);
    if (label) out.push({ pid: proc.pid, label, command: proc.command.slice(0, 120) });
  }
  return out;
}

function portOwners() {
  const owners = {};
  for (const port of PORTS) {
    const res = spawnSync("bash", ["-lc", `lsof -nP -iTCP:${port} -sTCP:LISTEN -t 2>/dev/null`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const pids = (res.stdout || "").trim().split("\n").filter(Boolean).map(Number);
    if (pids.length) owners[port] = pids;
  }
  return owners;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const targets = findTargets();
  const killed = [];

  if (targets.length > 0) {
    for (const t of targets) {
      try {
        // 先 SIGTERM（redis/postgres 会正常落盘退出），或 --force 直接 SIGKILL
        process.kill(t.pid, force ? "SIGKILL" : "SIGTERM");
        killed.push({ ...t, signal: force ? "SIGKILL" : "SIGTERM" });
      } catch {
        /* 已退出 */
      }
    }

    if (!force) {
      // 最多等 8 秒，仍未退出的升级为 SIGKILL
      for (let i = 0; i < 16; i++) {
        const remain = targets.filter((t) => {
          try {
            process.kill(t.pid, 0);
            return true;
          } catch {
            return false;
          }
        });
        if (remain.length === 0) break;
        await sleep(500);
        if (i === 15) {
          for (const t of remain) {
            try {
              process.kill(t.pid, "SIGKILL");
              killed.push({ ...t, signal: "SIGKILL(escalated)" });
            } catch {
              /* ignore */
            }
          }
        }
      }
    }
    await sleep(500);
  }

  const remaining = findTargets();
  const owners = portOwners();

  if (asJson) {
    console.log(JSON.stringify({ ok: remaining.length === 0 && Object.keys(owners).length === 0, killed, remaining, portOwners: owners }, null, 2));
  } else {
    if (killed.length === 0 && remaining.length === 0) {
      console.log("✅ 无 lite 残留进程（本就干净）");
    } else {
      for (const k of killed) console.log(`  🗑️  ${k.label.padEnd(12)} pid=${k.pid} ${k.signal}`);
      for (const r of remaining) console.log(`  ❌ 仍存活 ${r.label} pid=${r.pid}`);
      const ports = Object.keys(owners);
      console.log(
        ports.length === 0
          ? "✅ lite 残留已清理，63799 / 55432 / 48080 均空闲"
          : `❌ 端口仍被占用: ${ports.map((p) => `${p}→${owners[p].join(",")}`).join(" ")}`
      );
    }
  }

  process.exit(remaining.length === 0 && Object.keys(owners).length === 0 ? 0 : 1);
}

// 仅在直接执行时运行；被测试 import 时不应产生副作用（更不能去杀进程）
if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((e) => {
    console.error(`❌ 清理失败: ${e.message}`);
    process.exit(1);
  });
}
