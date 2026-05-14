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

| Command | Mean | Stddev | Min | Max | Relative |
| --- | ---: | ---: | ---: | ---: | ---: |
| `zig: bun --version` | 4.77 ms | 0.40 ms | 4.30 ms | 5.77 ms | 1.00x |
| `rust: bun --version` | 4.81 ms | 0.55 ms | 4.03 ms | 5.90 ms | 1.01x |
| `zig: bun eval` | 11.69 ms | 0.46 ms | 10.97 ms | 12.43 ms | 2.45x |
| `rust: bun eval` | 10.95 ms | 0.51 ms | 10.38 ms | 12.86 ms | 2.30x |

## Build

| Command | Mean | Stddev | Min | Max | Relative |
| --- | ---: | ---: | ---: | ---: | ---: |
| `zig: bun build TSX fixture` | 11.23 ms | 0.44 ms | 10.65 ms | 11.95 ms | 1.00x |
| `rust: bun build TSX fixture` | 11.77 ms | 0.33 ms | 11.31 ms | 12.56 ms | 1.05x |

## Test

| Command | Mean | Stddev | Min | Max | Relative |
| --- | ---: | ---: | ---: | ---: | ---: |
| `zig: bun test fixture` | 54.49 ms | 2.32 ms | 52.24 ms | 61.19 ms | 1.23x |
| `rust: bun test fixture` | 44.37 ms | 1.84 ms | 42.74 ms | 48.81 ms | 1.00x |

## Install

| Command | Mean | Stddev | Min | Max | Relative |
| --- | ---: | ---: | ---: | ---: | ---: |
| `zig: warm bun install` | 10.82 ms | 0.28 ms | 10.43 ms | 11.23 ms | 1.04x |
| `rust: warm bun install` | 10.36 ms | 0.76 ms | 9.67 ms | 12.38 ms | 1.00x |

## Caveat

These results describe one Apple M1 MacBook Air run. They should not be read as a universal Bun performance verdict.
