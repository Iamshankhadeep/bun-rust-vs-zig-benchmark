import React from "react";

export function Component81() {
  const items = ["81-alpha", "81-beta", "81-gamma", "81-delta"];
  return (
    <section className="card card-81" data-index="81">
      <h2>Component 81</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
