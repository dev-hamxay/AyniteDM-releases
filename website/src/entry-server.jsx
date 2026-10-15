// Build-time rendering: every page is rendered to HTML once, so the files on the server already contain the
// content (headline, features, download links, FAQ) before any script runs. The browser then takes over.
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { ContentPage } from "./pages/ContentPage.jsx";
import IdmAlternative from "./pages/IdmAlternative.jsx";
import LinuxPage from "./pages/LinuxPage.jsx";
import YoutubeGuide from "./pages/YoutubeGuide.jsx";
import { PAGES as REGISTRY } from "./pages/registry.js";

const COMPONENTS = { App, IdmAlternative, LinuxPage, YoutubeGuide };
const CONTENT = import.meta.glob(["./content/*.js", "!./content/_*.js"], { eager: true, import: "default" });

export const PAGES = REGISTRY.map((p) => ({ key: p.key, file: p.path + "index.html" }));

export function render(key) {
  const p = REGISTRY.find((q) => q.key === key);
  if (p.component) {
    const Page = COMPONENTS[p.component];
    return renderToString(<Page />);
  }
  const content = CONTENT[`./content/${key}.js`];
  if (!content) throw new Error(`no content module for page "${key}"`);
  return renderToString(<ContentPage content={content} />);
}
