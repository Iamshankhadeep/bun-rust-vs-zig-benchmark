#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/scripts/lib.sh"

ensure_dirs
require_binaries
require_hyperfine

cd "$ROOT"

hyperfine --warmup 3 --runs 15 \
  --prepare "rm -rf '$TMP_DIR/build-zig' '$TMP_DIR/build-rust'" \
  --export-json "$RAW_DIR/build.json" \
  -n "zig: bun build TSX fixture" "$ZIG_BUN build fixtures/react-app/src/index.tsx --outdir '$TMP_DIR/build-zig' --target browser --minify" \
  -n "rust: bun build TSX fixture" "$RUST_BUN build fixtures/react-app/src/index.tsx --outdir '$TMP_DIR/build-rust' --target browser --minify"

"$ZIG_BUN" scripts/summarize-results.ts >/dev/null
