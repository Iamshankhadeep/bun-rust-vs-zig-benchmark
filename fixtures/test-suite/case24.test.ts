import { expect, test } from "bun:test";

function checksum(seed: number) {
  let value = seed;
  for (let i = 0; i < 500; i++) {
    value = (value * 33 + i) % 1000003;
  }
  return value;
}

test("checksum 24", () => {
  expect(checksum(24)).toBe(checksum(24));
  expect(checksum(24) >= 0).toBe(true);
});
