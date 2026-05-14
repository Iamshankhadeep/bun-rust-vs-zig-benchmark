import React from "react";

export function Component32() {
  const items = ["32-alpha", "32-beta", "32-gamma", "32-delta"];
  return (
    <section className="card card-32" data-index="32">
      <h2>Component 32</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
