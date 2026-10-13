import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles.css";

/** Attach a page to #root: take over the pre-rendered HTML when it is there, render from scratch otherwise. */
export function mount(Page) {
  const el = document.getElementById("root");
  const tree = <React.StrictMode><Page /></React.StrictMode>;
  if (el.hasChildNodes()) hydrateRoot(el, tree);
  else createRoot(el).render(tree);
}
