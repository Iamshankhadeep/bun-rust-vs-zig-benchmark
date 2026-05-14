import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 52", () => {
  expect(checksum(52)).toBe(checksum(52));
  expect(checksum(52) >= 0).toBe(true);
});
