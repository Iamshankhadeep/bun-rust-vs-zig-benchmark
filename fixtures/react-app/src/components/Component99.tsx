import React from "react";

export function Component99() {
  const items = ["99-alpha", "99-beta", "99-gamma", "99-delta"];
  return (
    <section className="card card-99" data-index="99">
      <h2>Component 99</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
