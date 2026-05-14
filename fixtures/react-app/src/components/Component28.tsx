import React from "react";

export function Component28() {
  const items = ["28-alpha", "28-beta", "28-gamma", "28-delta"];
  return (
    <section className="card card-28" data-index="28">
      <h2>Component 28</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
