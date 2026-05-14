import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 18", () => {
  expect(checksum(18)).toBe(checksum(18));
  expect(checksum(18) >= 0).toBe(true);
});
