# Benchmark Summary

## Machine

- Machine: MacBook Air
- Model: MacBookAir10,1
- Chip: Apple M1
- Cores: 8 (4 Performance and 4 Efficiency)
- Memory: 16 GB
- OS: macOS 26.4.1

## Binaries

| Label | Version | Revision | SHA-256 |
| --- | --- | --- | --- |
| bun-zig | 1.3.14 | 1.3.14+0d9b296af | e0c90ec15d33363e6b70713d56bc3b2c7585c17f40a0fe0f8fd9305901d4e233 |
| bun-rust | 1.3.14 | 1.3.14-canary.1+ed1a70f81 | a1d41a8c23d842ef342de882f069049949842e9609c311d6b99235c7939feac5 |

## Startup

| Command | Mean | Stddev | Min | Max | Pair Relative |
| --- | ---: | ---: | ---: | ---: | ---: |
| `zig: bun --version` | 4.39 ms | 0.25 ms | 4.01 ms | 5.10 ms | 1.03x |
| `rust: bun --version` | 4.25 ms | 0.35 ms | 3.78 ms | 5.10 ms | 1.00x |
| `zig: bun eval` | 10.93 ms | 0.23 ms | 10.49 ms | 11.40 ms | 1.07x |
| `rust: bun eval` | 10.19 ms | 0.30 ms | 9.83 ms | 11.00 ms | 1.00x |

## Build

| Command | Mean | Stddev | Min | Max | Pair Relative |
| --- | ---: | ---: | ---: | ---: | ---: |
| `zig: bun build TSX fixture` | 11.57 ms | 0.41 ms | 10.99 ms | 12.36 ms | 1.00x |
| `rust: bun build TSX fixture` | 11.91 ms | 0.48 ms | 11.49 ms | 13.28 ms | 1.03x |

## Test

| Command | Mean | Stddev | Min | Max | Pair Relative |
| --- | ---: | ---: | ---: | ---: | ---: |
| `zig: bun test fixture` | 53.62 ms | 2.28 ms | 52.21 ms | 61.28 ms | 1.23x |
| `rust: bun test fixture` | 43.66 ms | 0.59 ms | 42.89 ms | 45.16 ms | 1.00x |

## Install

| Command | Mean | Stddev | Min | Max | Pair Relative |
| --- | ---: | ---: | ---: | ---: | ---: |
| `zig: warm bun install` | 11.17 ms | 0.41 ms | 10.57 ms | 12.06 ms | 1.07x |
| `rust: warm bun install` | 10.47 ms | 0.41 ms | 10.09 ms | 11.29 ms | 1.00x |

## Runtime

| Command | Mean | Stddev | Min | Max | Pair Relative |
| --- | ---: | ---: | ---: | ---: | ---: |
| `zig: runtime loops` | 17.79 ms | 0.62 ms | 16.87 ms | 18.98 ms | 1.02x |
| `rust: runtime loops` | 17.40 ms | 0.54 ms | 16.86 ms | 18.70 ms | 1.00x |
| `zig: runtime json` | 16.78 ms | 0.33 ms | 16.26 ms | 17.48 ms | 1.01x |
| `rust: runtime json` | 16.61 ms | 0.25 ms | 16.18 ms | 17.01 ms | 1.00x |
| `zig: runtime strings-regex` | 21.72 ms | 0.30 ms | 21.25 ms | 22.52 ms | 1.01x |
| `rust: runtime strings-regex` | 21.51 ms | 0.30 ms | 21.15 ms | 22.11 ms | 1.00x |
| `zig: runtime filesystem` | 58.53 ms | 2.19 ms | 56.64 ms | 65.45 ms | 1.01x |
| `rust: runtime filesystem` | 57.70 ms | 1.71 ms | 56.12 ms | 63.44 ms | 1.00x |
| `zig: runtime http` | 30.53 ms | 1.07 ms | 29.04 ms | 32.34 ms | 1.33x |
| `rust: runtime http` | 22.93 ms | 0.94 ms | 21.82 ms | 24.92 ms | 1.00x |

## Caveat

These results describe one Apple M1 MacBook Air run. They should not be read as a universal Bun performance verdict.
