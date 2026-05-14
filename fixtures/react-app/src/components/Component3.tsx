import React from "react";

export function Component3() {
  const items = ["3-alpha", "3-beta", "3-gamma", "3-delta"];
  return (
    <section className="card card-3" data-index="3">
      <h2>Component 3</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
