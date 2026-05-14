import React from "react";

export function Component120() {
  const items = ["120-alpha", "120-beta", "120-gamma", "120-delta"];
  return (
    <section className="card card-120" data-index="120">
      <h2>Component 120</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
