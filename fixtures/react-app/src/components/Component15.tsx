import React from "react";

export function Component15() {
  const items = ["15-alpha", "15-beta", "15-gamma", "15-delta"];
  return (
    <section className="card card-15" data-index="15">
      <h2>Component 15</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
