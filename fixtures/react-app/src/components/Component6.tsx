import React from "react";

export function Component6() {
  const items = ["6-alpha", "6-beta", "6-gamma", "6-delta"];
  return (
    <section className="card card-6" data-index="6">
      <h2>Component 6</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
