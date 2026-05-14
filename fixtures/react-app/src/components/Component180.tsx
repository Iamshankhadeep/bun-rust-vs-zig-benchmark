import React from "react";

export function Component180() {
  const items = ["180-alpha", "180-beta", "180-gamma", "180-delta"];
  return (
    <section className="card card-180" data-index="180">
      <h2>Component 180</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
