import React from "react";

export function Component125() {
  const items = ["125-alpha", "125-beta", "125-gamma", "125-delta"];
  return (
    <section className="card card-125" data-index="125">
      <h2>Component 125</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
