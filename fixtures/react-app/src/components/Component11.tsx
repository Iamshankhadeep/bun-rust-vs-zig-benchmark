import React from "react";

export function Component11() {
  const items = ["11-alpha", "11-beta", "11-gamma", "11-delta"];
  return (
    <section className="card card-11" data-index="11">
      <h2>Component 11</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
