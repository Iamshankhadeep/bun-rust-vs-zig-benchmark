import React from "react";

export function Component133() {
  const items = ["133-alpha", "133-beta", "133-gamma", "133-delta"];
  return (
    <section className="card card-133" data-index="133">
      <h2>Component 133</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
