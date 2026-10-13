// Downloads come from your own download folder, not from GitHub. The folder holds the files that
// build/build.py writes: update.json (version, installer name, size, SHA-256), the installer, and the two
// add-on packages. Set VITE_DOWNLOAD_BASE to that folder's address, e.g. https://aynitesoft.com/aynitedm/files/
// The add-on packages are also served by this site itself (public/downloads), so they work without it.
import manifest from "../public/downloads/update.json";   // refreshed by the release pipeline before every build

const rawBase = import.meta.env.VITE_DOWNLOAD_BASE || "";
export const DOWNLOAD_BASE = rawBase && !rawBase.endsWith("/") ? rawBase + "/" : rawBase;
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://dev-hamxay.github.io/AyniteDM-releases/").replace(/\/?$/, "/");
export const CHROME_STORE_URL = import.meta.env.VITE_CHROME_STORE_URL || "";
export const FIREFOX_ADDON_URL = import.meta.env.VITE_FIREFOX_ADDON_URL || "";
export const SUPPORT_URL = import.meta.env.VITE_SUPPORT_URL || "https://aynitesoft.com";
export const BUY_URL = import.meta.env.VITE_BUY_URL || SUPPORT_URL;
export const FEEDBACK_URL = import.meta.env.VITE_FEEDBACK_URL || SUPPORT_URL;
export const VIDEO_URL = import.meta.env.VITE_VIDEO_URL || "";   // the YouTube presentation, once published
export const VERSION_FALLBACK = String(manifest.version || "");  // the version known at build time

export const ASSETS = {
  chromeZip: "aynitedm-chrome-extension.zip",
  firefoxXpi: "aynitedm-firefox.xpi",
  manifest: "update.json",
  installerFallback: String(manifest.url || "AyniteDM-Setup.exe"),
};

// BASE_URL is "/" normally and "/<repo>/" on a GitHub Pages project site.
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
export const siteDownload = (name) => asset(`downloads/${name}`);
export const baseDownload = (asset) => (DOWNLOAD_BASE ? DOWNLOAD_BASE + asset : siteDownload(asset));
export const SUPPORTED_SITES = "over 1,800 sites";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "13 October 2026", or "Oct 2026" when short, with no locale involved. */
export function formatDate(date, short = false) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const m = MONTHS[date.getUTCMonth()];
  return short ? `${m.slice(0, 3)} ${date.getUTCFullYear()}` : `${date.getUTCDate()} ${m} ${date.getUTCFullYear()}`;
}

export function humanSize(bytes) {
  if (!bytes) return "";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n < 10 ? n.toFixed(1) : Math.round(n)} ${units[i]}`;
}

async function readManifest(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`manifest ${res.status}`);
  return res.json();
}

function shapeRelease(data) {
  const name = data.url || data.file || ASSETS.installerFallback;
  const resolve = (n) => (/^https?:/i.test(n) ? n : baseDownload(n));
  // Linux packages, when the release has them: { deb: {url, size, name}, tar: {...} }
  let linux = null;
  if (data.linux && typeof data.linux === "object") {
    linux = {};
    for (const [kind, entry] of Object.entries(data.linux)) {
      if (entry && entry.url) {
        linux[kind] = { url: resolve(entry.url), size: Number(entry.size || 0), name: entry.url.split("/").pop() };
      }
    }
    if (!Object.keys(linux).length) linux = null;
  }
  return {
    version: String(data.version),
    date: data.date ? new Date(data.date) : null,
    notes: data.notes || "",
    sha256: data.sha256 || "",
    installer: { url: resolve(name), size: Number(data.size || 0), name: name.split("/").pop() },
    linux,
  };
}

/** The release known at build time, available before any network request (and to the pre-renderer). */
export const BUILT_RELEASE = manifest && manifest.version ? shapeRelease(manifest) : null;

/** @returns {Promise<{version, date, notes, installer:{url,size,name}, sha256, linux} | null>} */
export async function fetchLatestRelease() {
  // The copy this site ships is refreshed by the release pipeline, so it is tried first (same origin, no
  // cross-site request); the download folder's own manifest is the fallback.
  const sources = [siteDownload(ASSETS.manifest)];
  if (DOWNLOAD_BASE) sources.push(DOWNLOAD_BASE + ASSETS.manifest);
  for (const src of sources) {
    try {
      const data = await readManifest(src);
      if (data && data.version) return shapeRelease(data);
    } catch (e) {
      /* try the next source */
    }
  }
  return BUILT_RELEASE;
}

/** True when the visitor's browser reports a Linux desktop (not Android). */
export const IS_LINUX_VISITOR =
  typeof navigator !== "undefined" && /Linux|X11/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent);

/** Real user reviews and listing ratings, kept in public/reviews.json and public/ratings.json.
 *  reviews.json: [{ "name": "Full name or first name", "where": "City, Country (optional)", "text": "...", "date": "2026-10-12" }]
 *  ratings.json: [{ "site": "Softpedia", "label": "Editor's pick" or "4.5 / 5", "url": "https://...", "badge": "ratings/softpedia.png" (optional) }]
 *  Both sections stay hidden (reviews) or show the trust facts only (ratings) while the lists are empty. */
export async function fetchJsonList(name) {
  try {
    const res = await fetch(asset(name), { cache: "no-cache" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}
