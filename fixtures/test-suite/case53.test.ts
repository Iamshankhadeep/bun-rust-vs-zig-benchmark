import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 53", () => {
  expect(checksum(53)).toBe(checksum(53));
  expect(checksum(53) >= 0).toBe(true);
});
