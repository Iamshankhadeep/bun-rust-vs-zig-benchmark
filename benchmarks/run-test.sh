#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/scripts/lib.sh"

ensure_dirs
require_binaries
require_hyperfine

cd "$ROOT"

hyperfine --warmup 3 --runs 20 \
  --export-json "$RAW_DIR/test.json" \
  -n "zig: bun test fixture" "$ZIG_BUN test fixtures/test-suite" \
  -n "rust: bun test fixture" "$RUST_BUN test fixtures/test-suite"

"$ZIG_BUN" scripts/summarize-results.ts >/dev/null
