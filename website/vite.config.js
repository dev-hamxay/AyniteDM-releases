import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// VITE_BASE_PATH: "/" for a custom domain or Vercel, "/<repo>/" for a GitHub Pages project site
// such as https://OWNER.github.io/<repo>/
// VITE_SITE_URL: the public address of the site (used for canonical links, previews and structured data).
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.VITE_SITE_URL || "https://dev-hamxay.github.io/AyniteDM-releases/").replace(/\/?$/, "/");
const DOWNLOAD_BASE = (process.env.VITE_DOWNLOAD_BASE || "").replace(/\/?$/, "/");
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "public", "downloads", "update.json"), "utf8"));
const COMPANY = { "@type": "Organization", "@id": "https://aynitesoft.com/#organization", name: "AyniteSoft",
  url: "https://aynitesoft.com", logo: SITE_URL + "apple-touch-icon.png" };
const WEBSITE = { "@type": "WebSite", "@id": SITE_URL + "#website", url: SITE_URL, name: "AyniteDM", inLanguage: "en",
  publisher: { "@id": COMPANY["@id"] } };

function installerUrl() {
  const name = manifest.url || "AyniteDM-Setup.exe";
  return DOWNLOAD_BASE ? DOWNLOAD_BASE + name : SITE_URL + "downloads/" + name;
}

// Per page: its path under the site, and the structured data that describes it.
const PAGES = {
  "index.html": {
    path: "",
    graph: () => [WEBSITE, COMPANY, {
      "@type": "SoftwareApplication", "@id": SITE_URL + "#software", name: "AyniteDM",
      description: "A download manager and video downloader for Windows and Linux: faster downloads with several connections, "
        + "videos from YouTube and over 1,800 sites in the quality you choose, live stream recording, torrents, "
        + "and automatic resume.",
      url: SITE_URL, image: SITE_URL + "screenshots/main.png",
      screenshot: [SITE_URL + "screenshots/main.png", SITE_URL + "screenshots/youtube-button.jpg", SITE_URL + "screenshots/progress.png"],
      applicationCategory: "UtilitiesApplication", operatingSystem: "Windows 10, Windows 11, Linux",
      softwareVersion: String(manifest.version || ""), datePublished: manifest.date || undefined,
      downloadUrl: installerUrl(), fileSize: manifest.size ? `${Math.round(manifest.size / 1048576)} MB` : undefined,
      author: { "@id": COMPANY["@id"] }, publisher: { "@id": COMPANY["@id"] },
      offers: { "@type": "Offer", url: "https://aynitesoft.com", availability: "https://schema.org/InStock" },
    }],
  },
  "idm-alternative/index.html": { path: "idm-alternative/", name: "Compare with IDM" },
  "linux/index.html": { path: "linux/", name: "Linux" },
  "youtube-4k-downloader/index.html": { path: "youtube-4k-downloader/", name: "YouTube guide" },
};

function pageGraph(rel, page, url) {
  if (page.graph) return page.graph();
  return [WEBSITE, COMPANY, {
    "@type": "WebPage", "@id": url + "#webpage", url, name: page.name, inLanguage: "en", isPartOf: { "@id": WEBSITE["@id"] },
    about: { "@id": SITE_URL + "#software" }, dateModified: manifest.date || undefined,
  }, {
    "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "AyniteDM", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: page.name, item: url },
    ],
  }];
}

/** Adds the address-dependent head tags to every page: canonical, social preview, icons, structured data. */
function headTags() {
  return {
    name: "aynitedm-head",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const rel = path.relative(ROOT, ctx.filename).replace(/\\/g, "/");
        const page = PAGES[rel];
        if (!page) return html;
        const url = SITE_URL + page.path;
        const graph = { "@context": "https://schema.org", "@graph": pageGraph(rel, page, url) };
        const tags = [
          { tag: "link", attrs: { rel: "canonical", href: url }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:url", content: url }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:type", content: "website" }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:site_name", content: "AyniteDM" }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:image", content: SITE_URL + "og-image.png" }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:image:width", content: "1200" }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:image:height", content: "630" }, injectTo: "head" },
          { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" }, injectTo: "head" },
          { tag: "meta", attrs: { name: "twitter:image", content: SITE_URL + "og-image.png" }, injectTo: "head" },
          { tag: "meta", attrs: { name: "referrer", content: "strict-origin-when-cross-origin" }, injectTo: "head" },
          { tag: "link", attrs: { rel: "icon", type: "image/png", sizes: "32x32", href: SITE_URL + "favicon-32.png" }, injectTo: "head" },
          { tag: "link", attrs: { rel: "apple-touch-icon", sizes: "180x180", href: SITE_URL + "apple-touch-icon.png" }, injectTo: "head" },
          { tag: "script", attrs: { type: "application/ld+json" }, children: JSON.stringify(graph), injectTo: "head" },
        ];
        return { html, tags };
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), headTags()],
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: {
        home: path.join(ROOT, "index.html"),
        idm: path.join(ROOT, "idm-alternative", "index.html"),
        linux: path.join(ROOT, "linux", "index.html"),
        youtube: path.join(ROOT, "youtube-4k-downloader", "index.html"),
      },
    },
  },
});
