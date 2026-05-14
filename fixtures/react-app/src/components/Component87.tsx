import React from "react";

export function Component87() {
  const items = ["87-alpha", "87-beta", "87-gamma", "87-delta"];
  return (
    <section className="card card-87" data-index="87">
      <h2>Component 87</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
