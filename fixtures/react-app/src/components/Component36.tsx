import React from "react";

export function Component36() {
  const items = ["36-alpha", "36-beta", "36-gamma", "36-delta"];
  return (
    <section className="card card-36" data-index="36">
      <h2>Component 36</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
