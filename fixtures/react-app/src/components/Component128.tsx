import React from "react";

export function Component128() {
  const items = ["128-alpha", "128-beta", "128-gamma", "128-delta"];
  return (
    <section className="card card-128" data-index="128">
      <h2>Component 128</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
