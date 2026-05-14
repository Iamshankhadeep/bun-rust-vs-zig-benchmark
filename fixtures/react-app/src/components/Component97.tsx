import React from "react";

export function Component97() {
  const items = ["97-alpha", "97-beta", "97-gamma", "97-delta"];
  return (
    <section className="card card-97" data-index="97">
      <h2>Component 97</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
