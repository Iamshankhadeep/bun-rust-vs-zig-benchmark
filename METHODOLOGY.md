# Methodology

## Question

How does Bun's Rust rewrite PR build compare with Bun v1.3.14 stable on this Apple M1 MacBook Air?

## Binaries

The benchmark uses two executable files:

- `./bin/bun-zig`
- `./bin/bun-rust`

The scripts never call ambient `bun` from `PATH`.

`./scripts/install-buns.sh` records `--version`, `--revision`, path, SHA-256, and source URL in `results/raw/binaries.json`.

## Machine Metadata

`./scripts/collect-machine-info.sh` writes sanitized hardware and OS details to `results/machine.json`.

The script intentionally excludes unique device identifiers.

## Benchmark Tool

The benchmark runner is `hyperfine`.

Rules:

- Startup benchmark: 5 warmups, 30 measured runs.
- Build benchmark: 3 warmups, 15 measured runs.
- Test benchmark: 3 warmups, 20 measured runs.
- Install benchmark: 2 warmups, 10 measured runs after separate cache prewarming.
- Runtime benchmark: 3 warmups, 15 measured runs.
- Raw JSON output is kept under `results/raw/`.
- Markdown tables are kept under `results/tables/`.
- Relative columns are pairwise: each `zig:` command is compared only with the matching `rust:` command for the same workload.
- Very small differences with overlapping uncertainty are treated as neutral.

## Benchmarks

### Startup

Commands:

- `./bin/bun-zig --version`
- `./bin/bun-rust --version`
- `./bin/bun-zig -e "console.log(1)"`
- `./bin/bun-rust -e "console.log(1)"`

### Build

Builds the deterministic TSX fixture in `fixtures/react-app` with `bun build`.

### Test

Runs the deterministic `bun:test` suite in `fixtures/test-suite`.

### Install

Runs warm `bun install --frozen-lockfile` against `fixtures/install-fixture` with separate cache directories for each binary.

The install benchmark measures package manager behavior after the registry data and package tarballs are already available locally.

### Runtime

Runs original TypeScript workloads in `fixtures/runtime` through each pinned Bun binary:

- `loops.ts`: arithmetic loops, nested loops, typed arrays, sorting, and map/reduce.
- `json.ts`: object generation, JSON stringify, JSON parse, and aggregate validation.
- `strings-regex.ts`: deterministic text generation, regex scanning, tokenization, and aggregation.
- `filesystem.ts`: many small local writes and reads under a temporary fixture directory.
- `http.ts`: a self-contained `Bun.serve()` server with same-process fetch requests.

The runtime results are full-process elapsed times measured by `hyperfine`. They include startup plus workload execution, so they should not be read as inner-loop nanosecond microbenchmarks.
