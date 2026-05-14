import React from "react";

export function Component102() {
  const items = ["102-alpha", "102-beta", "102-gamma", "102-delta"];
  return (
    <section className="card card-102" data-index="102">
      <h2>Component 102</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
