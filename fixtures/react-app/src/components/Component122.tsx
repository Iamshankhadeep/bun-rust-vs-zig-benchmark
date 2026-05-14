import React from "react";

export function Component122() {
  const items = ["122-alpha", "122-beta", "122-gamma", "122-delta"];
  return (
    <section className="card card-122" data-index="122">
      <h2>Component 122</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
