import React from "react";

export function Component7() {
  const items = ["7-alpha", "7-beta", "7-gamma", "7-delta"];
  return (
    <section className="card card-7" data-index="7">
      <h2>Component 7</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
