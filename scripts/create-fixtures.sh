#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIXTURES="$ROOT/fixtures"

rm -rf "$FIXTURES/react-app" "$FIXTURES/test-suite" "$FIXTURES/install-fixture"

mkdir -p "$FIXTURES/react-app/src/components"
mkdir -p "$FIXTURES/react-app/node_modules/react"
mkdir -p "$FIXTURES/test-suite"
mkdir -p "$FIXTURES/install-fixture"

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

echo "Generated deterministic fixtures under $FIXTURES"
