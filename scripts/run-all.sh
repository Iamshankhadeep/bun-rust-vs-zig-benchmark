#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT"

./scripts/create-fixtures.sh
./scripts/install-buns.sh
./scripts/collect-machine-info.sh

if [[ ! -f fixtures/install-fixture/bun.lock ]]; then
  (cd fixtures/install-fixture && ../../bin/bun-zig install --lockfile-only)
fi

./benchmarks/run-startup.sh
./benchmarks/run-build.sh
./benchmarks/run-test.sh
./benchmarks/run-install.sh
./benchmarks/run-runtime.sh

./bin/bun-zig scripts/summarize-results.ts
