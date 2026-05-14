import React from "react";

export function Component38() {
  const items = ["38-alpha", "38-beta", "38-gamma", "38-delta"];
  return (
    <section className="card card-38" data-index="38">
      <h2>Component 38</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
