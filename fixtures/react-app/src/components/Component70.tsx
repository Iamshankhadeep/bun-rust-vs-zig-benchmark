import React from "react";

export function Component70() {
  const items = ["70-alpha", "70-beta", "70-gamma", "70-delta"];
  return (
    <section className="card card-70" data-index="70">
      <h2>Component 70</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
