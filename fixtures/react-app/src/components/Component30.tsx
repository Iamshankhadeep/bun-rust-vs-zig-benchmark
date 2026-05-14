import React from "react";

export function Component30() {
  const items = ["30-alpha", "30-beta", "30-gamma", "30-delta"];
  return (
    <section className="card card-30" data-index="30">
      <h2>Component 30</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
