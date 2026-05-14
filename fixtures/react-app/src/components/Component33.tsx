import React from "react";

export function Component33() {
  const items = ["33-alpha", "33-beta", "33-gamma", "33-delta"];
  return (
    <section className="card card-33" data-index="33">
      <h2>Component 33</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
