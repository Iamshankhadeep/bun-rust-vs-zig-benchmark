import React from "react";

export function Component5() {
  const items = ["5-alpha", "5-beta", "5-gamma", "5-delta"];
  return (
    <section className="card card-5" data-index="5">
      <h2>Component 5</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
