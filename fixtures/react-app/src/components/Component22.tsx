import React from "react";

export function Component22() {
  const items = ["22-alpha", "22-beta", "22-gamma", "22-delta"];
  return (
    <section className="card card-22" data-index="22">
      <h2>Component 22</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
