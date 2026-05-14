import React from "react";

export function Component40() {
  const items = ["40-alpha", "40-beta", "40-gamma", "40-delta"];
  return (
    <section className="card card-40" data-index="40">
      <h2>Component 40</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
