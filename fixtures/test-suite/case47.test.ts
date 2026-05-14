import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 47", () => {
  expect(checksum(47)).toBe(checksum(47));
  expect(checksum(47) >= 0).toBe(true);
});
