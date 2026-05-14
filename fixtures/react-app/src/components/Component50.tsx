import React from "react";

export function Component50() {
  const items = ["50-alpha", "50-beta", "50-gamma", "50-delta"];
  return (
    <section className="card card-50" data-index="50">
      <h2>Component 50</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
