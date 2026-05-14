import React from "react";

export function Component34() {
  const items = ["34-alpha", "34-beta", "34-gamma", "34-delta"];
  return (
    <section className="card card-34" data-index="34">
      <h2>Component 34</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
