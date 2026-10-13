// Runs after `vite build`: renders every page to HTML and writes it into the built files, so the pages carry
// their content before any script runs (search engines, link previews and assistants read it directly).
import { build } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const ssrDir = path.join(root, ".ssr");

await build({
  configFile: path.join(root, "vite.config.js"),
  logLevel: "warn",
  build: {
    ssr: "src/entry-server.jsx",
    outDir: ".ssr",
    emptyOutDir: true,
    rollupOptions: { input: "src/entry-server.jsx" },
  },
});

const bundle = (await fs.readdir(ssrDir)).find((f) => /^entry-server\.(m?js)$/.test(f));
if (!bundle) throw new Error("server bundle not found in .ssr");
const mod = await import(pathToFileURL(path.join(ssrDir, bundle)).href);
for (const pageDef of mod.PAGES) {
  const file = path.join(root, "dist", pageDef.file);
  let html = await fs.readFile(file, "utf8");
  const rendered = mod.render(pageDef.key);
  if (!html.includes('<div id="root"></div>')) throw new Error(`no root placeholder in ${pageDef.file}`);
  html = html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
  await fs.writeFile(file, html);
  console.log(`pre-rendered ${pageDef.file} (${(rendered.length / 1024).toFixed(1)} KB of HTML)`);
}
await fs.rm(ssrDir, { recursive: true, force: true });
