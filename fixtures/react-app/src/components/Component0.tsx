import React from "react";

export function Component0() {
  const items = ["0-alpha", "0-beta", "0-gamma", "0-delta"];
  return (
    <section className="card card-0" data-index="0">
      <h2>Component 0</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
