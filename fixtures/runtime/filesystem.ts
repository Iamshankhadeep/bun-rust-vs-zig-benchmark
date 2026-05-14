import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const baseDir = dirname(fileURLToPath(import.meta.url));
const tmpDir = join(baseDir, ".tmp-fs");

rmSync(tmpDir, { recursive: true, force: true });
mkdirSync(tmpDir, { recursive: true });

let expectedFiles = 0;
for (let i = 0; i < 320; i++) {
  const payload = [
    `id=${i}`,
    `group=${i % 29}`,
    `value=${(i * 4_099 + 17) % 1_000_003}`,
    "body=" + "abcdefghi".repeat((i % 13) + 1),
  ].join("\n");
  writeFileSync(join(tmpDir, `entry-${String(i).padStart(4, "0")}.txt`), payload);
  expectedFiles++;
}

const files = readdirSync(tmpDir).sort();
let checksum = 0;

for (const file of files) {
  const content = readFileSync(join(tmpDir, file), "utf8");
  checksum = (checksum + content.length + content.charCodeAt(content.length - 1) + file.length) % 1_000_000_007;
}

rmSync(tmpDir, { recursive: true, force: true });

if (files.length !== expectedFiles || checksum <= 0) {
  throw new Error("invalid filesystem workload result");
}

console.log(`filesystem:${files.length}:${checksum}`);
