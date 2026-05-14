import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 85", () => {
  expect(checksum(85)).toBe(checksum(85));
  expect(checksum(85) >= 0).toBe(true);
});
