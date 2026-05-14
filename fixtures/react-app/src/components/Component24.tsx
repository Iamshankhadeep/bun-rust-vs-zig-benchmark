import React from "react";

export function Component24() {
  const items = ["24-alpha", "24-beta", "24-gamma", "24-delta"];
  return (
    <section className="card card-24" data-index="24">
      <h2>Component 24</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
