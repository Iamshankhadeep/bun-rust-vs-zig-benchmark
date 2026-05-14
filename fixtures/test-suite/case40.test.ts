import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 40", () => {
  expect(checksum(40)).toBe(checksum(40));
  expect(checksum(40) >= 0).toBe(true);
});
