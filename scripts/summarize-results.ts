import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type HyperfineResult = {
  command: string;
  mean: number;
  stddev: number;
  median: number;
  min: number;
  max: number;
};

type HyperfineFile = {
  results: HyperfineResult[];
};

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const resultsDir = join(root, "results");
const rawDir = join(resultsDir, "raw");
const tableDir = join(resultsDir, "tables");

const files = [
  ["Startup", "startup.json"],
  ["Build", "build.json"],
  ["Test", "test.json"],
  ["Install", "install.json"],
  ["Runtime", "runtime.json"],
] as const;

function ms(seconds: number) {
  return `${(seconds * 1000).toFixed(2)} ms`;
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function pairKey(command: string) {
  return command.replace(/^(zig|rust):\s*/, "");
}

function pairFastest(results: HyperfineResult[]) {
  const fastest = new Map<string, number>();

  for (const result of results) {
    const key = pairKey(result.command);
    fastest.set(key, Math.min(fastest.get(key) ?? Number.POSITIVE_INFINITY, result.mean));
  }

  return fastest;
}

function renderResultTable(data: HyperfineFile) {
  const fastest = pairFastest(data.results);
  let table = "| Command | Mean | Stddev | Min | Max | Pair Relative |\n";
  table += "| --- | ---: | ---: | ---: | ---: | ---: |\n";

  for (const result of data.results) {
    const baseline = fastest.get(pairKey(result.command)) ?? result.mean;
    const relative = result.mean / baseline;
    table += `| \`${result.command}\` | ${ms(result.mean)} | ${ms(result.stddev)} | ${ms(result.min)} | ${ms(result.max)} | ${relative.toFixed(2)}x |\n`;
  }

  return table;
}

let markdown = "# Benchmark Summary\n\n";
mkdirSync(tableDir, { recursive: true });

const machinePath = join(resultsDir, "machine.json");
if (existsSync(machinePath)) {
  const machine = readJson<Record<string, unknown>>(machinePath);
  markdown += "## Machine\n\n";
  markdown += `- Machine: ${machine.machine}\n`;
  markdown += `- Model: ${machine.model}\n`;
  markdown += `- Chip: ${machine.chip}\n`;
  markdown += `- Cores: ${machine.core_description}\n`;
  markdown += `- Memory: ${machine.memory_gb} GB\n`;
  markdown += `- OS: ${machine.os}\n\n`;
}

const binariesPath = join(rawDir, "binaries.json");
if (existsSync(binariesPath)) {
  const binaries = readJson<Record<string, { version: string; revision: string; sha256: string }>>(binariesPath);
  markdown += "## Binaries\n\n";
  markdown += "| Label | Version | Revision | SHA-256 |\n";
  markdown += "| --- | --- | --- | --- |\n";
  markdown += `| bun-zig | ${binaries.bun_zig.version} | ${binaries.bun_zig.revision} | ${binaries.bun_zig.sha256} |\n`;
  markdown += `| bun-rust | ${binaries.bun_rust.version} | ${binaries.bun_rust.revision} | ${binaries.bun_rust.sha256} |\n\n`;
}

for (const [title, file] of files) {
  const path = join(rawDir, file);
  if (!existsSync(path)) continue;

  const data = readJson<HyperfineFile>(path);
  const table = renderResultTable(data);

  markdown += `## ${title}\n\n`;
  markdown += `${table}\n`;
  writeFileSync(join(tableDir, file.replace(".json", ".md")), table);
}

markdown += "## Caveat\n\n";
markdown += "These results describe one Apple M1 MacBook Air run. They should not be read as a universal Bun performance verdict.\n";

writeFileSync(join(resultsDir, "SUMMARY.md"), markdown);
console.log(markdown);
