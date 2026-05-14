| Command | Mean [ms] | Min [ms] | Max [ms] | Relative |
|:---|---:|---:|---:|---:|
| `zig: runtime loops` | 17.8 ± 0.6 | 16.9 | 19.0 | 1.07 ± 0.04 |
| `rust: runtime loops` | 17.4 ± 0.5 | 16.9 | 18.7 | 1.05 ± 0.04 |
| `zig: runtime json` | 16.8 ± 0.3 | 16.3 | 17.5 | 1.01 ± 0.02 |
| `rust: runtime json` | 16.6 ± 0.2 | 16.2 | 17.0 | 1.00 |
| `zig: runtime strings-regex` | 21.7 ± 0.3 | 21.2 | 22.5 | 1.31 ± 0.03 |
| `rust: runtime strings-regex` | 21.5 ± 0.3 | 21.2 | 22.1 | 1.30 ± 0.03 |
| `zig: runtime filesystem` | 58.5 ± 2.2 | 56.6 | 65.5 | 3.52 ± 0.14 |
| `rust: runtime filesystem` | 57.7 ± 1.7 | 56.1 | 63.4 | 3.47 ± 0.12 |
| `zig: runtime http` | 30.5 ± 1.1 | 29.0 | 32.3 | 1.84 ± 0.07 |
| `rust: runtime http` | 22.9 ± 0.9 | 21.8 | 24.9 | 1.38 ± 0.06 |
