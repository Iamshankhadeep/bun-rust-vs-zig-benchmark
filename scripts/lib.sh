#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ZIG_BUN="$ROOT/bin/bun-zig"
RUST_BUN="$ROOT/bin/bun-rust"
RAW_DIR="$ROOT/results/raw"
TABLE_DIR="$ROOT/results/tables"
TMP_DIR="$ROOT/tmp"

ensure_dirs() {
  mkdir -p "$ROOT/bin" "$RAW_DIR" "$TABLE_DIR" "$TMP_DIR"
}

require_executable() {
  local path="$1"
  if [[ ! -x "$path" ]]; then
    echo "Missing executable: $path" >&2
    exit 1
  fi
}

require_hyperfine() {
  if ! command -v hyperfine >/dev/null 2>&1; then
    echo "Missing hyperfine. Install it with: brew install hyperfine" >&2
    exit 1
  fi
}

require_binaries() {
  require_executable "$ZIG_BUN"
  require_executable "$RUST_BUN"
}

sha256_file() {
  shasum -a 256 "$1" | awk '{print $1}'
}

record_binaries() {
  ensure_dirs

  local zig_version zig_revision zig_sha rust_version rust_revision rust_sha
  zig_version="$("$ZIG_BUN" --version)"
  zig_revision="$("$ZIG_BUN" --revision)"
  zig_sha="$(sha256_file "$ZIG_BUN")"

  rust_version="$("$RUST_BUN" --version)"
  rust_revision="$("$RUST_BUN" --revision)"
  rust_sha="$(sha256_file "$RUST_BUN")"

  cat > "$RAW_DIR/binaries.json" <<JSON
{
  "bun_zig": {
    "label": "Bun v1.3.14 stable Zig baseline",
    "path": "$ZIG_BUN",
    "version": "$zig_version",
    "revision": "$zig_revision",
    "sha256": "$zig_sha",
    "source": "https://github.com/oven-sh/bun/releases/download/bun-v1.3.14/bun-darwin-aarch64.zip"
  },
  "bun_rust": {
    "label": "Bun Rust rewrite PR build",
    "path": "$RUST_BUN",
    "version": "$rust_version",
    "revision": "$rust_revision",
    "sha256": "$rust_sha",
    "source": "bunx bun-pr 30412"
  }
}
JSON
}
