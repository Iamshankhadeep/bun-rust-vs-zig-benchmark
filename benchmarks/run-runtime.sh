#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/scripts/lib.sh"

ensure_dirs
require_binaries
require_hyperfine

cd "$ROOT"

hyperfine --warmup 3 --runs 15 \
  --export-json "$RAW_DIR/runtime.json" \
  --export-markdown "$TABLE_DIR/runtime.md" \
  -n "zig: runtime loops" "$ZIG_BUN fixtures/runtime/loops.ts" \
  -n "rust: runtime loops" "$RUST_BUN fixtures/runtime/loops.ts" \
  -n "zig: runtime json" "$ZIG_BUN fixtures/runtime/json.ts" \
  -n "rust: runtime json" "$RUST_BUN fixtures/runtime/json.ts" \
  -n "zig: runtime strings-regex" "$ZIG_BUN fixtures/runtime/strings-regex.ts" \
  -n "rust: runtime strings-regex" "$RUST_BUN fixtures/runtime/strings-regex.ts" \
  -n "zig: runtime filesystem" "$ZIG_BUN fixtures/runtime/filesystem.ts" \
  -n "rust: runtime filesystem" "$RUST_BUN fixtures/runtime/filesystem.ts" \
  -n "zig: runtime http" "$ZIG_BUN fixtures/runtime/http.ts" \
  -n "rust: runtime http" "$RUST_BUN fixtures/runtime/http.ts"
