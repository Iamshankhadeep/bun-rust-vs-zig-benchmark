import React from "react";

export function Component20() {
  const items = ["20-alpha", "20-beta", "20-gamma", "20-delta"];
  return (
    <section className="card card-20" data-index="20">
      <h2>Component 20</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
