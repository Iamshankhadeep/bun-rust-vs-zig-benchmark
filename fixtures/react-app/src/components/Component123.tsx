import React from "react";

export function Component123() {
  const items = ["123-alpha", "123-beta", "123-gamma", "123-delta"];
  return (
    <section className="card card-123" data-index="123">
      <h2>Component 123</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
