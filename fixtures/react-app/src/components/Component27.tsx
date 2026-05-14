import React from "react";

export function Component27() {
  const items = ["27-alpha", "27-beta", "27-gamma", "27-delta"];
  return (
    <section className="card card-27" data-index="27">
      <h2>Component 27</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
