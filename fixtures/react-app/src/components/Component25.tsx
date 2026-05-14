import React from "react";

export function Component25() {
  const items = ["25-alpha", "25-beta", "25-gamma", "25-delta"];
  return (
    <section className="card card-25" data-index="25">
      <h2>Component 25</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
