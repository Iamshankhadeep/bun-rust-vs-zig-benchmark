import React from "react";

export function Component60() {
  const items = ["60-alpha", "60-beta", "60-gamma", "60-delta"];
  return (
    <section className="card card-60" data-index="60">
      <h2>Component 60</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
