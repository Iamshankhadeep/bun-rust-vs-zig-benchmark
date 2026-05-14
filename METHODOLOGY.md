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

The script intentionally excludes serial number, hardware UUID, provisioning UDID, and other unique device identifiers.

## Benchmark Tool

The benchmark runner is `hyperfine`.

Rules:

- Startup benchmark: 5 warmups, 30 measured runs.
- Build benchmark: 3 warmups, 15 measured runs.
- Test benchmark: 3 warmups, 20 measured runs.
- Install benchmark: 2 warmups, 10 measured runs after separate cache prewarming.
- Raw JSON output is kept under `results/raw/`.
- Markdown tables are kept under `results/tables/`.
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
