import React from "react";

export function Component9() {
  const items = ["9-alpha", "9-beta", "9-gamma", "9-delta"];
  return (
    <section className="card card-9" data-index="9">
      <h2>Component 9</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
