import React from "react";

export function Component187() {
  const items = ["187-alpha", "187-beta", "187-gamma", "187-delta"];
  return (
    <section className="card card-187" data-index="187">
      <h2>Component 187</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
