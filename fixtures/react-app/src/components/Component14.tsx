import React from "react";

export function Component14() {
  const items = ["14-alpha", "14-beta", "14-gamma", "14-delta"];
  return (
    <section className="card card-14" data-index="14">
      <h2>Component 14</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
