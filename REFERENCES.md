# References

The benchmark code in this repository is original unless a file states otherwise.

External projects were reviewed for methodology and attribution context:

| Source | License note | How it was used |
| --- | --- | --- |
| [`icebob/node-deno-bun-benchmark`](https://github.com/icebob/node-deno-bun-benchmark) | No license detected in GitHub metadata. | Cited as a small Node/Deno/Bun HTTP benchmark reference. No code copied. |
| [`denosaurs/bench`](https://github.com/denosaurs/bench) | MIT license. | Used as HTTP runtime/framework benchmark methodology inspiration. No code copied. |
| [`fastify/benchmarks`](https://github.com/fastify/benchmarks) | MIT license. | Used for HTTP benchmark methodology and the caveat that synthetic HTTP tests measure overhead, not full production behavior. No code copied. |
| [`vltpkg/benchmarks`](https://github.com/vltpkg/benchmarks) | No license detected in GitHub metadata. | Cited for package-manager benchmark methodology. No code copied. |
| [`BuilderIO/framework-benchmarks`](https://github.com/BuilderIO/framework-benchmarks) | No license detected in GitHub metadata. | Cited for benchmark reporting and real-world-ish fixture methodology. No code copied. |

Because several useful references do not expose an explicit license, this repository does not vendor or adapt their source code. The runtime workloads under `fixtures/runtime` are intentionally small, deterministic scripts written specifically for this Bun Rust-vs-Zig comparison.
