import React from "react";

export function Component174() {
  const items = ["174-alpha", "174-beta", "174-gamma", "174-delta"];
  return (
    <section className="card card-174" data-index="174">
      <h2>Component 174</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
