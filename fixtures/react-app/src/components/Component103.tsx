import React from "react";

export function Component103() {
  const items = ["103-alpha", "103-beta", "103-gamma", "103-delta"];
  return (
    <section className="card card-103" data-index="103">
      <h2>Component 103</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
