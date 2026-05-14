import React from "react";

export function Component64() {
  const items = ["64-alpha", "64-beta", "64-gamma", "64-delta"];
  return (
    <section className="card card-64" data-index="64">
      <h2>Component 64</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
