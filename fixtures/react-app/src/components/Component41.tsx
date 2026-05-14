import React from "react";

export function Component41() {
  const items = ["41-alpha", "41-beta", "41-gamma", "41-delta"];
  return (
    <section className="card card-41" data-index="41">
      <h2>Component 41</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
