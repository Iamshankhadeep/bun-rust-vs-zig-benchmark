import React from "react";

export function Component105() {
  const items = ["105-alpha", "105-beta", "105-gamma", "105-delta"];
  return (
    <section className="card card-105" data-index="105">
      <h2>Component 105</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
