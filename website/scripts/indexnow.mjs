// Tells Bing, Yandex, Naver and the other IndexNow engines which pages changed. Run after a deployment:
//   VITE_SITE_URL=https://example.com/ node scripts/indexnow.mjs            (all pages)
//   node scripts/indexnow.mjs https://example.com/linux/ https://example.com/   (just these)
// The key file public/<key>.txt is served by the site; the request names its location, so a sub-path site works.
import { PAGES } from "../src/pages/registry.js";

const KEY = "b2588fdfd57248248b76154eb78098fc";
const SITE_URL = (process.env.VITE_SITE_URL || "https://dev-hamxay.github.io/AyniteDM-releases/").replace(/\/?$/, "/");
const urls = process.argv.slice(2).length ? process.argv.slice(2) : PAGES.map((p) => SITE_URL + p.path).concat([SITE_URL + "privacy.html"]);
const host = new URL(SITE_URL).host;

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE_URL}${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s) on ${host}`);
if (res.status >= 400) {
  console.log(await res.text());
  process.exitCode = 1;
}
