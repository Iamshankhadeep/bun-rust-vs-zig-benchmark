import React from "react";

export function Component78() {
  const items = ["78-alpha", "78-beta", "78-gamma", "78-delta"];
  return (
    <section className="card card-78" data-index="78">
      <h2>Component 78</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
