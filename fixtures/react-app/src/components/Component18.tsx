import React from "react";

export function Component18() {
  const items = ["18-alpha", "18-beta", "18-gamma", "18-delta"];
  return (
    <section className="card card-18" data-index="18">
      <h2>Component 18</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
