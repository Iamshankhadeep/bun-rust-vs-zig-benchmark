import React from "react";

export function Component17() {
  const items = ["17-alpha", "17-beta", "17-gamma", "17-delta"];
  return (
    <section className="card card-17" data-index="17">
      <h2>Component 17</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
