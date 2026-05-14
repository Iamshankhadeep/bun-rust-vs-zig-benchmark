# Bun Rust vs Zig Benchmark

This repository benchmarks Bun v1.3.14 stable against the Rust rewrite PR build on one Apple M1 MacBook Air.

The goal is auditability. The scripts pin two separate Bun executables, collect sanitized machine metadata, run deterministic benchmark fixtures with `hyperfine`, and preserve raw result data.

The suite covers Bun's built-in tooling and Bun as a runtime:

- Startup: version and eval startup cost.
- Build: TSX bundling fixture.
- Test: `bun:test` fixture.
- Install: warm `bun install --frozen-lockfile`.
- Runtime: original loop, JSON, string/regex, filesystem, and HTTP workloads.

Result tables use `Pair Relative`: each Zig/Rust command pair is compared only with the matching workload, not against unrelated rows in the same section.

## Comparison

| Label | Source | Expected revision |
| --- | --- | --- |
| `bun-zig` | Bun v1.3.14 stable release | `0d9b296af33f2b851fcbf4df3e9ec89751734ba4` |
| `bun-rust` | PR #30412 head artifact via `bun-pr ed1a70f81708d7d137de8de057d11668c5f4e220` | `ed1a70f81708d7d137de8de057d11668c5f4e220` |

If the PR artifact cannot be downloaded or its revision does not match the expected PR head, the install script exits without running benchmarks.

## Requirements

- macOS on Apple Silicon
- `gh` authenticated with GitHub
- `hyperfine`
- `unzip`
- `curl`

Install `hyperfine` with:

```bash
brew install hyperfine
```

## Run

```bash
./scripts/run-all.sh
```

Generated outputs:

- `results/machine.json`
- `results/raw/*.json`
- `results/tables/*.md`
- `results/SUMMARY.md`
- `results/raw/binaries.json`

## References

See [`REFERENCES.md`](./REFERENCES.md) for attribution and license notes. Runtime workload code in this repository is original; external benchmark projects were used only as methodology references.

## Caveat

These are local measurements from one MacBook Air, not a universal performance claim about Bun on every platform or workload.
