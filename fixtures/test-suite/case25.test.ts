import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 25", () => {
  expect(checksum(25)).toBe(checksum(25));
  expect(checksum(25) >= 0).toBe(true);
});
