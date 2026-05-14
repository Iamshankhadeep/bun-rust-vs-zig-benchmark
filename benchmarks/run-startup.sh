#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/scripts/lib.sh"

ensure_dirs
require_binaries
require_hyperfine

hyperfine --warmup 5 --runs 30 \
  --export-json "$RAW_DIR/startup.json" \
  -n "zig: bun --version" "$ZIG_BUN --version" \
  -n "rust: bun --version" "$RUST_BUN --version" \
  -n "zig: bun eval" "$ZIG_BUN -e 'console.log(1)'" \
  -n "rust: bun eval" "$RUST_BUN -e 'console.log(1)'"

"$ZIG_BUN" scripts/summarize-results.ts >/dev/null
