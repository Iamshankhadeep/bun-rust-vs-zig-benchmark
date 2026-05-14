#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

ensure_dirs

stable_url="https://github.com/oven-sh/bun/releases/download/bun-v1.3.14/bun-darwin-aarch64.zip"
stable_zip="$TMP_DIR/bun-v1.3.14-darwin-aarch64.zip"
stable_extract="$TMP_DIR/bun-v1.3.14"

echo "Installing Bun v1.3.14 stable to $ZIG_BUN"
rm -rf "$stable_extract"
curl --fail --location --output "$stable_zip" "$stable_url"
unzip -oq "$stable_zip" -d "$stable_extract"
cp "$stable_extract/bun-darwin-aarch64/bun" "$ZIG_BUN"
chmod +x "$ZIG_BUN"

zig_revision="$("$ZIG_BUN" --revision)"
if [[ "$zig_revision" != *"0d9b296af"* ]]; then
  echo "Unexpected Bun v1.3.14 revision: $zig_revision" >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "Missing GitHub CLI. Install gh and authenticate before running this script." >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated. Run: gh auth login" >&2
  exit 1
fi

rust_commit="ed1a70f81708d7d137de8de057d11668c5f4e220"

echo "Installing Bun Rust rewrite PR head build via bun-pr $rust_commit"
export PATH="$ROOT/bin:$HOME/.bun/bin:$PATH"
"$ZIG_BUN" x bun-pr "$rust_commit"

candidate=""
for path in "$HOME/.bun/bin/bun-${rust_commit}" "$HOME/.bun/bin/bun-${rust_commit}-commit${rust_commit}" "$(command -v "bun-${rust_commit}" 2>/dev/null || true)"; do
  if [[ -n "$path" && -x "$path" ]]; then
    candidate="$path"
    break
  fi
done

if [[ -z "$candidate" ]]; then
  echo "Unable to locate bun-$rust_commit after running bun-pr. Not using a later canary." >&2
  exit 1
fi

cp "$candidate" "$RUST_BUN"
chmod +x "$RUST_BUN"

rust_revision="$("$RUST_BUN" --revision)"
if [[ "$rust_revision" != *"ed1a70f81"* ]]; then
  echo "Rust build revision does not match PR #30412 head commit $rust_commit: $rust_revision" >&2
  exit 1
fi

record_binaries

echo "Installed benchmark binaries:"
cat "$RAW_DIR/binaries.json"
