import React from "react";

export function Component12() {
  const items = ["12-alpha", "12-beta", "12-gamma", "12-delta"];
  return (
    <section className="card card-12" data-index="12">
      <h2>Component 12</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
