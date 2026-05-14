import React from "react";

export function Component80() {
  const items = ["80-alpha", "80-beta", "80-gamma", "80-delta"];
  return (
    <section className="card card-80" data-index="80">
      <h2>Component 80</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
