import React from "react";

export function Component76() {
  const items = ["76-alpha", "76-beta", "76-gamma", "76-delta"];
  return (
    <section className="card card-76" data-index="76">
      <h2>Component 76</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
