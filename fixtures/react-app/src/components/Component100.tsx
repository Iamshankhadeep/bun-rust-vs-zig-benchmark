import React from "react";

export function Component100() {
  const items = ["100-alpha", "100-beta", "100-gamma", "100-delta"];
  return (
    <section className="card card-100" data-index="100">
      <h2>Component 100</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
