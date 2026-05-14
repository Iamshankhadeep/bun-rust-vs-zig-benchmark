import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type HyperfineResult = {
  command: string;
  mean: number;
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

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function pairKey(command: string) {
  return command.replace(/^(zig|rust):\s*/, "");
}

function expectedRelatives(results: HyperfineResult[]) {
  const groups = new Map<string, HyperfineResult[]>();

  for (const result of results) {
    const key = pairKey(result.command);
    groups.set(key, [...(groups.get(key) ?? []), result]);
  }

  const expected = new Map<string, string>();
  for (const group of groups.values()) {
    const fastest = Math.min(...group.map((result) => result.mean));
    for (const result of group) {
      expected.set(result.command, `${(result.mean / fastest).toFixed(2)}x`);
    }
  }

  return expected;
}

function parseRows(markdown: string) {
  const rows = new Map<string, string>();

  for (const line of markdown.split("\n")) {
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

    const command = cells[0];
    if (!command?.startsWith("`") || !command.endsWith("`")) continue;

    const relative = cells.at(-1);
    if (!relative) continue;

    rows.set(command.slice(1, -1), normalizeRelative(relative));
  }

  return rows;
}

function normalizeRelative(relative: string) {
  const firstToken = relative.split(/\s+/)[0] ?? "";
  const numeric = Number(firstToken.replace(/x$/, ""));
  if (!Number.isFinite(numeric)) return relative;
  return `${numeric.toFixed(2)}x`;
}

function summarySection(markdown: string, title: string) {
  const startMarker = `## ${title}\n`;
  const start = markdown.indexOf(startMarker);
  if (start === -1) {
    throw new Error(`Missing summary section: ${title}`);
  }

  const next = markdown.indexOf("\n## ", start + startMarker.length);
  return markdown.slice(start, next === -1 ? undefined : next);
}

function verifyRows(source: string, rows: Map<string, string>, expected: Map<string, string>) {
  const failures: string[] = [];

  for (const [command, relative] of expected) {
    const observed = rows.get(command);
    if (!observed) {
      failures.push(`${source}: missing row for ${command}`);
      continue;
    }

    if (observed !== relative) {
      failures.push(`${source}: ${command} expected ${relative}, found ${observed}`);
    }
  }

  return failures;
}

const summaryPath = join(resultsDir, "SUMMARY.md");
if (!existsSync(summaryPath)) {
  throw new Error("Missing results/SUMMARY.md. Run scripts/summarize-results.ts first.");
}

const summary = readFileSync(summaryPath, "utf8");
const failures: string[] = [];

for (const [title, file] of files) {
  const rawPath = join(rawDir, file);
  if (!existsSync(rawPath)) continue;

  const data = readJson<HyperfineFile>(rawPath);
  const expected = expectedRelatives(data.results);

  failures.push(...verifyRows(`SUMMARY.md ${title}`, parseRows(summarySection(summary, title)), expected));

  const tablePath = join(tableDir, file.replace(".json", ".md"));
  if (existsSync(tablePath)) {
    failures.push(...verifyRows(tablePath, parseRows(readFileSync(tablePath, "utf8")), expected));
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Pairwise relative columns are correct.");
