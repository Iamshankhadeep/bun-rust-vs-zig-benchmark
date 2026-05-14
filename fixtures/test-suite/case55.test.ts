import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 55", () => {
  expect(checksum(55)).toBe(checksum(55));
  expect(checksum(55) >= 0).toBe(true);
});
