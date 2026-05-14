import React from "react";

export function Component26() {
  const items = ["26-alpha", "26-beta", "26-gamma", "26-delta"];
  return (
    <section className="card card-26" data-index="26">
      <h2>Component 26</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
