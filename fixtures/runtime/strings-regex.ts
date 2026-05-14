const events = ["alpha", "beta", "gamma", "delta", "epsilon"] as const;
const lines: string[] = [];

for (let i = 0; i < 12_000; i++) {
  const event = events[i % events.length];
  const value = (i * 7_919 + 1_337) % 1_000_003;
  lines.push(
    `time=2026-05-14T00:${String(i % 60).padStart(2, "0")}:00Z user=user_${i}@example.com event=${event} value=${value} path=/api/${event}/${i % 97}`,
  );
}

const text = lines.join("\n");
const pattern = /user_(\d+)@example\.com event=(alpha|beta|gamma|delta|epsilon) value=(\d+) path=\/api\/([a-z]+)\/(\d+)/g;
let matches = 0;
let checksum = 0;

for (const match of text.matchAll(pattern)) {
  matches++;
  checksum = (checksum + Number(match[1]) + Number(match[3]) + match[2].length + match[4].length + Number(match[5])) % 1_000_000_007;
}

const tokenChecksum = text
  .split(/\s+/)
  .filter((token) => token.includes("="))
  .slice(0, 20_000)
  .reduce((sum, token) => (sum + token.charCodeAt(0) + token.length) % 1_000_000_007, 0);

if (matches !== lines.length || checksum <= 0 || tokenChecksum <= 0) {
  throw new Error("invalid strings-regex workload result");
}

console.log(`strings-regex:${matches}:${checksum}:${tokenChecksum}`);
