import React from "react";

export function Component42() {
  const items = ["42-alpha", "42-beta", "42-gamma", "42-delta"];
  return (
    <section className="card card-42" data-index="42">
      <h2>Component 42</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
