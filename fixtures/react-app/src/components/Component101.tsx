import React from "react";

export function Component101() {
  const items = ["101-alpha", "101-beta", "101-gamma", "101-delta"];
  return (
    <section className="card card-101" data-index="101">
      <h2>Component 101</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
