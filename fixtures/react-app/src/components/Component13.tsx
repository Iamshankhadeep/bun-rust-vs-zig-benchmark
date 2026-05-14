import React from "react";

export function Component13() {
  const items = ["13-alpha", "13-beta", "13-gamma", "13-delta"];
  return (
    <section className="card card-13" data-index="13">
      <h2>Component 13</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
