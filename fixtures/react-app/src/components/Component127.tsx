import React from "react";

export function Component127() {
  const items = ["127-alpha", "127-beta", "127-gamma", "127-delta"];
  return (
    <section className="card card-127" data-index="127">
      <h2>Component 127</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
