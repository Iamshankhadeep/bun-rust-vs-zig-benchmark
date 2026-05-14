import React from "react";

export function Component88() {
  const items = ["88-alpha", "88-beta", "88-gamma", "88-delta"];
  return (
    <section className="card card-88" data-index="88">
      <h2>Component 88</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
