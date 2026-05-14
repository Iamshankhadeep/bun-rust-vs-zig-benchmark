import React from "react";

export function Component8() {
  const items = ["8-alpha", "8-beta", "8-gamma", "8-delta"];
  return (
    <section className="card card-8" data-index="8">
      <h2>Component 8</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
