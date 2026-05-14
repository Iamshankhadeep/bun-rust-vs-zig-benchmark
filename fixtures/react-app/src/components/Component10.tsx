import React from "react";

export function Component10() {
  const items = ["10-alpha", "10-beta", "10-gamma", "10-delta"];
  return (
    <section className="card card-10" data-index="10">
      <h2>Component 10</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
