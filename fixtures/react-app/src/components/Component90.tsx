import React from "react";

export function Component90() {
  const items = ["90-alpha", "90-beta", "90-gamma", "90-delta"];
  return (
    <section className="card card-90" data-index="90">
      <h2>Component 90</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
