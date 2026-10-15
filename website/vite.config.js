import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { BY_KEY, PAGES, SECTIONS, trail } from "./src/pages/registry.js";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.VITE_SITE_URL || "https://dev-hamxay.github.io/AyniteDM-releases/").replace(/\/?$/, "/");
const DOWNLOAD_BASE = (process.env.VITE_DOWNLOAD_BASE || "").replace(/\/?$/, "/");
const BUY_URL = process.env.VITE_BUY_URL || process.env.VITE_SUPPORT_URL || "https://aynitesoft.com";
const PRICE = (process.env.VITE_PRICE || "").trim();                 // "19.99": the Offer carries a price once set
const CURRENCY = (process.env.VITE_PRICE_CURRENCY || "USD").trim();
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "public", "downloads", "update.json"), "utf8"));
const TODAY = new Date().toISOString().slice(0, 10);
const LASTMOD = manifest.date || TODAY;

/** Dates from git for the files a page is made of (not the shared layout), so lastmod and dateModified move only
 *  when that page changes and datePublished is the day it was first committed. Uncommitted or unknown files fall
 *  back to the release date. CI must check out the full history (fetch-depth: 0) for this to work there. */
const dateCache = new Map();
function gitDate(files, first = false) {
  const found = files.filter((f) => fs.existsSync(path.join(ROOT, f)));
  const key = (first ? "first:" : "last:") + found.join("|");
  if (!found.length) return LASTMOD;
  if (dateCache.has(key)) return dateCache.get(key);
  let date = LASTMOD;
  try {
    const args = first ? ["log", "--diff-filter=A", "--format=%cs", "--", ...found] : ["log", "-1", "--format=%cs", "--", ...found];
    const out = execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim().split("\n").filter(Boolean);
    const pick = first ? out[out.length - 1] : out[0];
    if (pick && /^\d{4}-\d{2}-\d{2}$/.test(pick) && pick <= TODAY) date = pick;
  } catch (e) { /* no git: release date */ }
  dateCache.set(key, date);
  return date;
}
function filesFor(p) {
  if (p.component === "App") return ["src/App.jsx"];
  if (p.component) return [`src/pages/${p.component}.jsx`];
  return [`src/content/${p.key}.js`];
}
const pageDate = (p) => gitDate(filesFor(p));
const pageFirstDate = (p) => gitDate(filesFor(p), true);

const FULL_NAME = "Aynite Download Manager";
const COMPANY = { "@type": "Organization", "@id": "https://aynitesoft.com/#organization", name: "AyniteSoft",
  url: "https://aynitesoft.com", logo: SITE_URL + "apple-touch-icon.png",
  description: "Maker of Aynite Download Manager (ADM), a paid download manager and video downloader for Windows and Linux." };
const WEBSITE = { "@type": "WebSite", "@id": SITE_URL + "#website", url: SITE_URL, name: FULL_NAME, alternateName: ["ADM", "AyniteDM"],
  inLanguage: "en", publisher: { "@id": COMPANY["@id"] } };

function installerUrl() {
  const name = manifest.url || "ADM-Setup.exe";
  return DOWNLOAD_BASE ? DOWNLOAD_BASE + name : SITE_URL + "downloads/" + name;
}

const SOFTWARE = {
  "@type": "SoftwareApplication", "@id": SITE_URL + "#software", name: FULL_NAME, alternateName: ["ADM", "AyniteDM"], isAccessibleForFree: false,
  description: "A download manager and video downloader for Windows and Linux: faster downloads with several connections, "
    + "videos from YouTube and over 1,800 sites in the quality you choose, live stream recording, torrents, "
    + "and automatic resume.",
  url: SITE_URL, image: SITE_URL + "screenshots/main.png",
  screenshot: [SITE_URL + "screenshots/main.png", SITE_URL + "screenshots/youtube-button.jpg", SITE_URL + "screenshots/progress.png"],
  applicationCategory: "UtilitiesApplication", operatingSystem: "Windows 10, Windows 11, Linux",
  softwareVersion: String(manifest.version || ""), dateModified: manifest.date || undefined, inLanguage: "en",
  disambiguatingDescription: "Desktop download manager and video downloader for Windows and Linux by AyniteSoft; not the Android app also abbreviated ADM.",
  featureList: ["Multi-connection downloads with pause and resume", "Video downloads from YouTube and 1,800+ sites in the chosen quality, up to 4K, or as MP3",
    "Live stream recording", "Torrents and magnet links", "Browser add-on for Chrome, Edge, Brave and Firefox", "Scheduler with shutdown when done", "Checksum verification"],
  softwareRequirements: "64-bit Windows 10 or 11, or Linux (Ubuntu 22.04 or newer, Debian 12 or newer, or any 2022+ distribution)",
  downloadUrl: installerUrl(), fileSize: manifest.size ? `${Math.round(manifest.size / 1048576)} MB` : undefined,
  author: { "@id": COMPANY["@id"] }, publisher: { "@id": COMPANY["@id"] },
  // an Offer without a price earns a warning and no rich result; it appears once VITE_PRICE is set
  ...(PRICE ? { offers: { "@type": "Offer", url: BUY_URL, availability: "https://schema.org/InStock", price: PRICE, priceCurrency: CURRENCY } } : {}),
};

const pageUrl = (p) => SITE_URL + p.path;

const SOFTWARE_STUB = { "@type": "SoftwareApplication", "@id": SITE_URL + "#software", name: FULL_NAME, alternateName: ["ADM", "AyniteDM"], isAccessibleForFree: false,
  url: SITE_URL, applicationCategory: "UtilitiesApplication", operatingSystem: "Windows 10, Windows 11, Linux" };

function pageGraph(p) {
  const url = pageUrl(p);
  if (p.key === "home") {
    return [WEBSITE, COMPANY, SOFTWARE, {
      "@type": "WebPage", "@id": url + "#webpage", url, name: p.title, description: p.description, inLanguage: "en",
      isPartOf: { "@id": WEBSITE["@id"] }, about: { "@id": SITE_URL + "#software" }, dateModified: pageDate(p),
      primaryImageOfPage: { "@type": "ImageObject", url: SITE_URL + "screenshots/main.png" },
    }];
  }
  // the trail holds the page and its ancestors; Home comes first on every page
  const crumbs = [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }]
    .concat(trail(p.key).map((q, i) => ({ "@type": "ListItem", position: i + 2, name: q.name, item: pageUrl(q) })));
  const isArticle = !!p.parent && (p.parent === "help" || p.parent === "guides");
  return [WEBSITE, COMPANY, SOFTWARE_STUB, {
    "@type": isArticle ? "TechArticle" : "WebPage", "@id": url + "#webpage", url, name: p.title,
    description: p.description, inLanguage: "en", isPartOf: { "@id": WEBSITE["@id"] },
    about: { "@id": SITE_URL + "#software" }, dateModified: pageDate(p), breadcrumb: { "@id": url + "#breadcrumb" },
    ...(isArticle ? {
      headline: p.title.replace(/\s*\|\s*(ADM|Aynite Download Manager(?: \(ADM\))?)$/, ""), datePublished: pageFirstDate(p),
      image: [SITE_URL + "og-image.png"], mainEntityOfPage: { "@id": url + "#webpage" },
      author: { "@id": COMPANY["@id"] }, publisher: { "@id": COMPANY["@id"] },
    } : {}),
  }, { "@type": "BreadcrumbList", "@id": url + "#breadcrumb", itemListElement: crumbs }];
}

function sitemapXml() {
  const urls = PAGES.map((p) => [pageUrl(p), pageDate(p)]).concat([[SITE_URL + "privacy.html", gitDate(["privacy.src.html"])]]);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    + urls.map(([u, d]) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${d}</lastmod>\n  </url>`).join("\n") + "\n</urlset>\n";
}

/** privacy.html and 404.html carry absolute addresses; the placeholder is filled at build time. */
const withSiteUrl = (file) => fs.readFileSync(path.join(ROOT, file), "utf8").replaceAll("%SITE_URL%", SITE_URL);

// Read by crawlers only at the root of the host: effective on a custom domain (or a user site), not on a
// GitHub project page, where docs/root-site/robots.txt applies instead.
function robotsTxt() {
  return `# ${FULL_NAME} (ADM) website
User-agent: *
Allow: /

# AI search crawlers that cite their sources are welcome.
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Training crawlers (GPTBot, ClaudeBot) are allowed as well. Google-Extended also controls Gemini grounding answers:
# keep it allowed for Gemini visibility. None of these affects Google Search, AI Overviews, ChatGPT search or Claude search.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`;
}

function llmsTxt() {
  const link = (p) => `- [${p.key === "adm" ? "What ADM (Aynite Download Manager) is" : p.name}](${pageUrl(p)}): ${p.description}`;
  const top = SECTIONS.map(([, label, keys]) => `## ${label}\n\n${keys.map((k) => link(BY_KEY[k])).join("\n")}`);
  const listed = new Set(SECTIONS.flatMap(([, , keys]) => keys));
  const optional = PAGES.filter((p) => !listed.has(p.key) && p.key !== "home").map(link);
  return `# ${FULL_NAME} (ADM)

> Download manager and video downloader for Windows 10, 11 and Linux by AyniteSoft: multi-connection downloads with pause and resume, videos from YouTube and 1,800+ sites up to 4K or as MP3, live stream recording, torrents and magnet links, a scheduler and a browser add-on for Chrome, Edge, Brave and Firefox. Paid licence, no ads, no bundled extras. "ADM" on this site always means Aynite Download Manager, not the Android app Advanced Download Manager.

- Price: paid licence from AyniteSoft; no ads, no bundled extras. Prices and licence options: https://aynitesoft.com
- Platforms: 64-bit Windows 10 and 11; Ubuntu 22.04+, Linux Mint 21+, Debian 12+ (.deb); Fedora, openSUSE, Arch and other 2022+ distributions (.tar.gz). No macOS or Android version.
- Torrents and magnet links: built in, on Windows and Linux.
- Video: YouTube and 1,800+ sites up to 4K, MP3 and M4A, playlists, live stream recording. No DRM circumvention.
- Also known as: ADM, AyniteDM (the name until October 2026). Not related to the Android app Advanced Download Manager.
- Current version: ${manifest.version || "see the download page"} (${LASTMOD}). Windows installer ${manifest.url || "ADM-Setup.exe"}. Maker: AyniteSoft.

- [Aynite Download Manager home](${SITE_URL}): ${BY_KEY.home.description}

${top.join("\n\n")}

## Optional

${optional.join("\n")}
- [Privacy policy](${SITE_URL}privacy.html): everything stays on the user's computer; nothing is sent to AyniteSoft.
`;
}

/** Address-dependent head tags on every page (canonical, social preview, icons, structured data), the stylesheet
 *  inlined so the first paint waits for nothing, and the files that depend on the site address. */
function siteFiles() {
  let ssr = false;
  return {
    name: "adm-site",
    configResolved(cfg) { ssr = !!cfg.build.ssr; },
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const rel = path.relative(ROOT, ctx.filename).replace(/\\/g, "/");
        const p = PAGES.find((q) => q.path + "index.html" === rel);
        if (!p) return html;
        const url = pageUrl(p);
        const graph = { "@context": "https://schema.org", "@graph": pageGraph(p) };
        // inline the (single, small) stylesheet: one fewer render-blocking request
        if (ctx.bundle) {
          html = html.replace(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g, (tag, href) => {
            const file = Object.values(ctx.bundle).find((f) => href.endsWith(f.fileName));
            return file && typeof file.source === "string" && file.source.length < 60000 ? `<style>${file.source}</style>` : tag;
          });
        }
        const tags = [
          { tag: "link", attrs: { rel: "canonical", href: url }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:url", content: url }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:type", content: "website" }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:site_name", content: FULL_NAME }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:locale", content: "en_US" }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:image:alt", content: "The main window of Aynite Download Manager with a list of downloads" }, injectTo: "head" },
          { tag: "meta", attrs: { name: "twitter:title", content: p.ogTitle }, injectTo: "head" },
          { tag: "meta", attrs: { name: "twitter:description", content: p.ogDescription }, injectTo: "head" },
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
    generateBundle() {
      if (ssr) return;
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml() });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robotsTxt() });
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llmsTxt() });
      this.emitFile({ type: "asset", fileName: "privacy.html", source: withSiteUrl("privacy.src.html") });
      this.emitFile({ type: "asset", fileName: "404.html", source: withSiteUrl("404.src.html") });
    },
  };
}

export default defineConfig({
  plugins: [react(), siteFiles()],
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: Object.fromEntries(PAGES.map((p) => [p.key, path.join(ROOT, ...p.path.split("/").filter(Boolean), "index.html")])),
    },
  },
});
