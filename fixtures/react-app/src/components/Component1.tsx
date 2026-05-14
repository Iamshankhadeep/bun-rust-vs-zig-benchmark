import React from "react";

export function Component1() {
  const items = ["1-alpha", "1-beta", "1-gamma", "1-delta"];
  return (
    <section className="card card-1" data-index="1">
      <h2>Component 1</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
