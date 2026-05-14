const requestCount = 480;
const batchSize = 24;

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 0,
  fetch(request) {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id") || "0");
    const value = (id * 4_223 + 97) % 1_000_003;

    return Response.json({
      id,
      value,
      pathLength: url.pathname.length,
    });
  },
});

let checksum = 0;

try {
  for (let offset = 0; offset < requestCount; offset += batchSize) {
    const responses = await Promise.all(
      Array.from({ length: batchSize }, (_, index) => {
        const id = offset + index;
        return fetch(new URL(`/runtime/${id}?id=${id}`, server.url));
      }),
    );

    for (const response of responses) {
      if (!response.ok) throw new Error(`http status ${response.status}`);
      const data = (await response.json()) as { id: number; value: number; pathLength: number };
      checksum = (checksum + data.id + data.value + data.pathLength) % 1_000_000_007;
    }
  }
} finally {
  server.stop(true);
}

if (checksum <= 0) {
  throw new Error("invalid http workload result");
}

console.log(`http:${requestCount}:${checksum}`);
