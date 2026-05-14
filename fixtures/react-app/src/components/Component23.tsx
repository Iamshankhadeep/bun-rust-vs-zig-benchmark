import React from "react";

export function Component23() {
  const items = ["23-alpha", "23-beta", "23-gamma", "23-delta"];
  return (
    <section className="card card-23" data-index="23">
      <h2>Component 23</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
