import React from "react";

export function Component2() {
  const items = ["2-alpha", "2-beta", "2-gamma", "2-delta"];
  return (
    <section className="card card-2" data-index="2">
      <h2>Component 2</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
