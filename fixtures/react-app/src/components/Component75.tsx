import React from "react";

export function Component75() {
  const items = ["75-alpha", "75-beta", "75-gamma", "75-delta"];
  return (
    <section className="card card-75" data-index="75">
      <h2>Component 75</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
