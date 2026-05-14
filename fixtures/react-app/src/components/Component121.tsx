import React from "react";

export function Component121() {
  const items = ["121-alpha", "121-beta", "121-gamma", "121-delta"];
  return (
    <section className="card card-121" data-index="121">
      <h2>Component 121</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
