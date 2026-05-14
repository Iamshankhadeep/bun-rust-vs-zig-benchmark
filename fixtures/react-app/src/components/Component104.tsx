import React from "react";

export function Component104() {
  const items = ["104-alpha", "104-beta", "104-gamma", "104-delta"];
  return (
    <section className="card card-104" data-index="104">
      <h2>Component 104</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
