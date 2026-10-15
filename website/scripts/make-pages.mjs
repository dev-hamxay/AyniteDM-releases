// Writes the HTML shell and the entry script of every page listed in src/pages/registry.js. Runs before
// `vite build` (see package.json) and can be run alone: node scripts/make-pages.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES } from "../src/pages/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function shell(p) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(p.title)}</title>
    <meta name="description" content="${esc(p.description)}" />
    <meta property="og:title" content="${esc(p.ogTitle)}" />
    <meta property="og:description" content="${esc(p.ogDescription)}" />
    <meta name="theme-color" content="#1e40af" />
    <link rel="icon" type="image/svg+xml" href="%BASE_URL%logo.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/entries/${p.key}.jsx"></script>
  </body>
</html>
`;
}

function entry(p) {
  if (p.component) {
    const from = p.component === "App" ? "../App.jsx" : `../pages/${p.component}.jsx`;
    return `// generated from src/pages/registry.js by scripts/make-pages.mjs\nimport Page from "${from}";\nimport { mount } from "../mount.jsx";\n\nmount(Page);\n`;
  }
  return `// generated from src/pages/registry.js by scripts/make-pages.mjs\nimport content from "../content/${p.key}.js";\nimport { ContentPage } from "../pages/ContentPage.jsx";\nimport { mount } from "../mount.jsx";\n\nmount(() => <ContentPage content={content} />);\n`;
}

function writeIfChanged(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === text) return false;
  fs.writeFileSync(file, text);
  return true;
}

let changed = 0;
for (const p of PAGES) {
  if (writeIfChanged(path.join(ROOT, ...p.path.split("/").filter(Boolean), "index.html"), shell(p))) changed += 1;
  if (writeIfChanged(path.join(ROOT, "src", "entries", `${p.key}.jsx`), entry(p))) changed += 1;
  if (!p.component && !fs.existsSync(path.join(ROOT, "src", "content", `${p.key}.js`))) {
    console.error(`missing content module for page "${p.key}": src/content/${p.key}.js`);
    process.exitCode = 1;
  }
}
console.log(`${PAGES.length} pages, ${changed} file(s) written`);
