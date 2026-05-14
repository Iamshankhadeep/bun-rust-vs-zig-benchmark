import React from "react";

export function Component21() {
  const items = ["21-alpha", "21-beta", "21-gamma", "21-delta"];
  return (
    <section className="card card-21" data-index="21">
      <h2>Component 21</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
