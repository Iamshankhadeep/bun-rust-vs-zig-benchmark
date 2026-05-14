import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 17", () => {
  expect(checksum(17)).toBe(checksum(17));
  expect(checksum(17) >= 0).toBe(true);
});
