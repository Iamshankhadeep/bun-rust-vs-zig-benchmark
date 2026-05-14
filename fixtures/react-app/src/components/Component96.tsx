import React from "react";

export function Component96() {
  const items = ["96-alpha", "96-beta", "96-gamma", "96-delta"];
  return (
    <section className="card card-96" data-index="96">
      <h2>Component 96</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
