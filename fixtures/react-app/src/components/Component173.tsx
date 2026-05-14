import React from "react";

export function Component173() {
  const items = ["173-alpha", "173-beta", "173-gamma", "173-delta"];
  return (
    <section className="card card-173" data-index="173">
      <h2>Component 173</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
