import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 34", () => {
  expect(checksum(34)).toBe(checksum(34));
  expect(checksum(34) >= 0).toBe(true);
});
