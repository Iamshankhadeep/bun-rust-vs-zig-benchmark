import React from "react";

export function Component37() {
  const items = ["37-alpha", "37-beta", "37-gamma", "37-delta"];
  return (
    <section className="card card-37" data-index="37">
      <h2>Component 37</h2>
      <p>This deterministic component gives Bun's bundler TSX input to parse.</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
