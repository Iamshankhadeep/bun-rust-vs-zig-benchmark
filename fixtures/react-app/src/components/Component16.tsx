import React from "react";

export function Component16() {
  const items = ["16-alpha", "16-beta", "16-gamma", "16-delta"];
  return (
    <section className="card card-16" data-index="16">
      <h2>Component 16</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
