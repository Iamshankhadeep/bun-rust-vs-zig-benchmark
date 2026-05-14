#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/scripts/lib.sh"

ensure_dirs
require_binaries
require_hyperfine

cd "$ROOT"

fixture="$ROOT/fixtures/install-fixture"
if [[ ! -f "$fixture/bun.lock" ]]; then
  echo "Missing fixtures/install-fixture/bun.lock. Generate it with: (cd fixtures/install-fixture && ../../bin/bun-zig install --lockfile-only)" >&2
  exit 1
fi

rm -rf "$ROOT/.cache/install-zig" "$ROOT/.cache/install-rust" "$fixture/node_modules"
mkdir -p "$ROOT/.cache/install-zig" "$ROOT/.cache/install-rust"

"$ZIG_BUN" install --cwd "$fixture" --frozen-lockfile --cache-dir "$ROOT/.cache/install-zig" --silent
rm -rf "$fixture/node_modules"
"$RUST_BUN" install --cwd "$fixture" --frozen-lockfile --cache-dir "$ROOT/.cache/install-rust" --silent
rm -rf "$fixture/node_modules"

hyperfine --warmup 2 --runs 10 \
  --prepare "rm -rf '$fixture/node_modules'" \
  --export-json "$RAW_DIR/install.json" \
  --export-markdown "$TABLE_DIR/install.md" \
  -n "zig: warm bun install" "$ZIG_BUN install --cwd '$fixture' --frozen-lockfile --cache-dir '$ROOT/.cache/install-zig' --silent" \
  -n "rust: warm bun install" "$RUST_BUN install --cwd '$fixture' --frozen-lockfile --cache-dir '$ROOT/.cache/install-rust' --silent"
