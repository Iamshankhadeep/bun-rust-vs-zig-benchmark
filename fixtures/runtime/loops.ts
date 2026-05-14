const size = 24_000;
const values = new Int32Array(size);
let checksum = 0;

for (let i = 0; i < values.length; i++) {
  values[i] = (i * 48_271 + 13_579) % 1_000_003;
}

for (let pass = 0; pass < 14; pass++) {
  for (let i = 0; i < values.length; i++) {
    checksum = (checksum + ((values[i] ^ (pass + i)) * 31)) >>> 0;
    values[i] = (values[i] + checksum + pass) % 1_000_003;
  }
}

const sorted = Array.from(values.slice(0, 6_000)).sort((a, b) => a - b);
const reduced = sorted
  .map((value, index) => (value ^ (index * 17)) % 65_521)
  .filter((value) => value % 3 !== 0)
  .reduce((sum, value) => (sum + value) % 1_000_000_007, 0);

if (sorted.length !== 6_000 || reduced <= 0 || checksum <= 0) {
  throw new Error("invalid loops workload result");
}

console.log(`loops:${checksum}:${reduced}:${sorted[0]}:${sorted.at(-1)}`);
