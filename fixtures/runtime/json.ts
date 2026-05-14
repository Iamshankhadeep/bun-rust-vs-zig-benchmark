type Row = {
  id: number;
  group: string;
  score: number;
  active: boolean;
  tags: string[];
  nested: {
    left: number;
    right: string;
  };
};

const rows: Row[] = [];

for (let i = 0; i < 4_500; i++) {
  rows.push({
    id: i,
    group: `group-${i % 37}`,
    score: (i * 97 + 11) % 10_003,
    active: i % 5 !== 0,
    tags: [`tag-${i % 11}`, `tag-${(i + 3) % 17}`, `tag-${(i + 7) % 23}`],
    nested: {
      left: (i * i) % 65_537,
      right: `payload-${i.toString(36).padStart(4, "0")}`,
    },
  });
}

const encoded = JSON.stringify(rows);
const decoded = JSON.parse(encoded) as Row[];

let checksum = 0;
for (const row of decoded) {
  checksum = (checksum + row.id + row.score + row.nested.left + row.tags.join("").length) % 1_000_000_007;
  if (row.active) checksum = (checksum + row.group.length) % 1_000_000_007;
}

if (decoded.length !== rows.length || encoded.length < 100_000 || checksum <= 0) {
  throw new Error("invalid json workload result");
}

console.log(`json:${encoded.length}:${checksum}:${decoded.length}`);
