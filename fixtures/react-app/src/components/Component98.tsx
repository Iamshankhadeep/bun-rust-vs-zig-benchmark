import React from "react";

export function Component98() {
  const items = ["98-alpha", "98-beta", "98-gamma", "98-delta"];
  return (
    <section className="card card-98" data-index="98">
      <h2>Component 98</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
