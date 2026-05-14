import React from "react";

export function Component126() {
  const items = ["126-alpha", "126-beta", "126-gamma", "126-delta"];
  return (
    <section className="card card-126" data-index="126">
      <h2>Component 126</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
