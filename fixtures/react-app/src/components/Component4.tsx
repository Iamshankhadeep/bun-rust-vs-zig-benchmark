import React from "react";

export function Component4() {
  const items = ["4-alpha", "4-beta", "4-gamma", "4-delta"];
  return (
    <section className="card card-4" data-index="4">
      <h2>Component 4</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
