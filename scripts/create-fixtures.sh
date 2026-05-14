#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIXTURES="$ROOT/fixtures"

rm -rf "$FIXTURES/react-app" "$FIXTURES/test-suite" "$FIXTURES/install-fixture" "$FIXTURES/runtime"

mkdir -p "$FIXTURES/react-app/src/components"
mkdir -p "$FIXTURES/react-app/node_modules/react"
mkdir -p "$FIXTURES/test-suite"
mkdir -p "$FIXTURES/install-fixture"
mkdir -p "$FIXTURES/runtime"

cat > "$FIXTURES/react-app/package.json" <<'JSON'
{
  "name": "react-build-fixture",
  "private": true,
  "version": "1.0.0",
  "type": "module"
}
JSON

cat > "$FIXTURES/react-app/node_modules/react/package.json" <<'JSON'
{
  "name": "react",
  "version": "19.0.0-fixture",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./jsx-runtime": "./jsx-runtime.js",
    "./jsx-dev-runtime": "./jsx-dev-runtime.js"
  }
}
JSON

cat > "$FIXTURES/react-app/node_modules/react/index.js" <<'JS'
export const Fragment = Symbol.for("react.fragment");

export function createElement(type, props, ...children) {
  return { type, props: { ...(props || {}), children } };
}

export default { createElement, Fragment };
JS

cat > "$FIXTURES/react-app/node_modules/react/jsx-runtime.js" <<'JS'
export const Fragment = Symbol.for("react.fragment");

export function jsx(type, props, key) {
  return { type, props: props || {}, key: key == null ? null : String(key) };
}

export const jsxs = jsx;
JS

cat > "$FIXTURES/react-app/node_modules/react/jsx-dev-runtime.js" <<'JS'
export const Fragment = Symbol.for("react.fragment");

export function jsxDEV(type, props, key) {
  return { type, props: props || {}, key: key == null ? null : String(key) };
}
JS

for i in $(seq 0 199); do
  cat > "$FIXTURES/react-app/src/components/Component${i}.tsx" <<TSX
import React from "react";

export function Component${i}() {
  const items = ["${i}-alpha", "${i}-beta", "${i}-gamma", "${i}-delta"];
  return (
    <section className="card card-${i}" data-index="${i}">
      <h2>Component ${i}</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
TSX
done

{
  echo 'import React from "react";'
  for i in $(seq 0 199); do
    echo "import { Component${i} } from \"./components/Component${i}\";"
  done
  echo
  echo "export function App() {"
  echo "  return ("
  echo "    <main>"
  for i in $(seq 0 199); do
    echo "      <Component${i} />"
  done
  echo "    </main>"
  echo "  );"
  echo "}"
  echo
  echo "console.log(JSON.stringify(App()).length);"
} > "$FIXTURES/react-app/src/index.tsx"

for i in $(seq 0 119); do
  cat > "$FIXTURES/test-suite/case${i}.test.ts" <<TS
import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum ${i}", () => {
  expect(checksum(${i})).toBe(checksum(${i}));
  expect(checksum(${i}) >= 0).toBe(true);
});
TS
done

cat > "$FIXTURES/install-fixture/package.json" <<'JSON'
{
  "name": "install-fixture",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "is-even": "1.0.0",
    "is-odd": "3.0.1",
    "nanoid": "5.0.9",
    "picocolors": "1.1.1"
  },
  "devDependencies": {
    "typescript": "5.8.3"
  }
}
JSON

cat > "$FIXTURES/runtime/loops.ts" <<'TS'
const size = 24_000;
const values = new Int32Array(size);
let checksum = 0;

for (let i = 0; i < values.length; i++) {
  values[i] = (i * 48_271 + 13_579) % 1_000_003;
}

for (let pass = 0; pass < 14; pass++) {
  for (let i = 0; i < values.length; i++) {
    checksum = (checksum + ((values[i] ^ (pass + i)) * 31)) >>> 0;
    values[i] = (values[i] + checksum + pass) % 1_000_003;
  }
}

const sorted = Array.from(values.slice(0, 6_000)).sort((a, b) => a - b);
const reduced = sorted
  .map((value, index) => (value ^ (index * 17)) % 65_521)
  .filter((value) => value % 3 !== 0)
  .reduce((sum, value) => (sum + value) % 1_000_000_007, 0);

if (sorted.length !== 6_000 || reduced <= 0 || checksum <= 0) {
  throw new Error("invalid loops workload result");
}

console.log(`loops:${checksum}:${reduced}:${sorted[0]}:${sorted.at(-1)}`);
TS

cat > "$FIXTURES/runtime/json.ts" <<'TS'
type Row = {
  id: number;
  group: string;
  score: number;
  active: boolean;
  tags: string[];
  nested: {
    left: number;
    right: string;
  };
};

const rows: Row[] = [];

for (let i = 0; i < 4_500; i++) {
  rows.push({
    id: i,
    group: `group-${i % 37}`,
    score: (i * 97 + 11) % 10_003,
    active: i % 5 !== 0,
    tags: [`tag-${i % 11}`, `tag-${(i + 3) % 17}`, `tag-${(i + 7) % 23}`],
    nested: {
      left: (i * i) % 65_537,
      right: `payload-${i.toString(36).padStart(4, "0")}`,
    },
  });
}

const encoded = JSON.stringify(rows);
const decoded = JSON.parse(encoded) as Row[];

let checksum = 0;
for (const row of decoded) {
  checksum = (checksum + row.id + row.score + row.nested.left + row.tags.join("").length) % 1_000_000_007;
  if (row.active) checksum = (checksum + row.group.length) % 1_000_000_007;
}

if (decoded.length !== rows.length || encoded.length < 100_000 || checksum <= 0) {
  throw new Error("invalid json workload result");
}

console.log(`json:${encoded.length}:${checksum}:${decoded.length}`);
TS

cat > "$FIXTURES/runtime/strings-regex.ts" <<'TS'
const events = ["alpha", "beta", "gamma", "delta", "epsilon"] as const;
const lines: string[] = [];

for (let i = 0; i < 12_000; i++) {
  const event = events[i % events.length];
  const value = (i * 7_919 + 1_337) % 1_000_003;
  lines.push(
    `time=2026-05-14T00:${String(i % 60).padStart(2, "0")}:00Z user=user_${i}@example.com event=${event} value=${value} path=/api/${event}/${i % 97}`,
  );
}

const text = lines.join("\n");
const pattern = /user_(\d+)@example\.com event=(alpha|beta|gamma|delta|epsilon) value=(\d+) path=\/api\/([a-z]+)\/(\d+)/g;
let matches = 0;
let checksum = 0;

for (const match of text.matchAll(pattern)) {
  matches++;
  checksum = (checksum + Number(match[1]) + Number(match[3]) + match[2].length + match[4].length + Number(match[5])) % 1_000_000_007;
}

const tokenChecksum = text
  .split(/\s+/)
  .filter((token) => token.includes("="))
  .slice(0, 20_000)
  .reduce((sum, token) => (sum + token.charCodeAt(0) + token.length) % 1_000_000_007, 0);

if (matches !== lines.length || checksum <= 0 || tokenChecksum <= 0) {
  throw new Error("invalid strings-regex workload result");
}

console.log(`strings-regex:${matches}:${checksum}:${tokenChecksum}`);
TS

cat > "$FIXTURES/runtime/filesystem.ts" <<'TS'
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const baseDir = dirname(fileURLToPath(import.meta.url));
const tmpDir = join(baseDir, ".tmp-fs");

rmSync(tmpDir, { recursive: true, force: true });
mkdirSync(tmpDir, { recursive: true });

let expectedFiles = 0;
for (let i = 0; i < 320; i++) {
  const payload = [
    `id=${i}`,
    `group=${i % 29}`,
    `value=${(i * 4_099 + 17) % 1_000_003}`,
    "body=" + "abcdefghi".repeat((i % 13) + 1),
  ].join("\n");
  writeFileSync(join(tmpDir, `entry-${String(i).padStart(4, "0")}.txt`), payload);
  expectedFiles++;
}

const files = readdirSync(tmpDir).sort();
let checksum = 0;

for (const file of files) {
  const content = readFileSync(join(tmpDir, file), "utf8");
  checksum = (checksum + content.length + content.charCodeAt(content.length - 1) + file.length) % 1_000_000_007;
}

rmSync(tmpDir, { recursive: true, force: true });

if (files.length !== expectedFiles || checksum <= 0) {
  throw new Error("invalid filesystem workload result");
}

console.log(`filesystem:${files.length}:${checksum}`);
TS

cat > "$FIXTURES/runtime/http.ts" <<'TS'
const requestCount = 480;
const batchSize = 24;

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 0,
  fetch(request) {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id") || "0");
    const value = (id * 4_223 + 97) % 1_000_003;

    return Response.json({
      id,
      value,
      pathLength: url.pathname.length,
    });
  },
});

let checksum = 0;

try {
  for (let offset = 0; offset < requestCount; offset += batchSize) {
    const responses = await Promise.all(
      Array.from({ length: batchSize }, (_, index) => {
        const id = offset + index;
        return fetch(new URL(`/runtime/${id}?id=${id}`, server.url));
      }),
    );

    for (const response of responses) {
      if (!response.ok) throw new Error(`http status ${response.status}`);
      const data = (await response.json()) as { id: number; value: number; pathLength: number };
      checksum = (checksum + data.id + data.value + data.pathLength) % 1_000_000_007;
    }
  }
} finally {
  server.stop(true);
}

if (checksum <= 0) {
  throw new Error("invalid http workload result");
}

console.log(`http:${requestCount}:${checksum}`);
TS

echo "Generated deterministic fixtures under $FIXTURES"
