// Downloads come from your own download folder, not from GitHub. The folder holds the files that
// build/build.py writes: update.json (version, installer name, size, SHA-256), the installer, and the two
// add-on packages. Set VITE_DOWNLOAD_BASE to that folder's address, e.g. https://aynitesoft.com/aynitedm/files/
// The add-on packages are also served by this site itself (public/downloads), so they work without it.

const rawBase = import.meta.env.VITE_DOWNLOAD_BASE || "";
export const DOWNLOAD_BASE = rawBase && !rawBase.endsWith("/") ? rawBase + "/" : rawBase;
export const CHROME_STORE_URL = import.meta.env.VITE_CHROME_STORE_URL || "";
export const FIREFOX_ADDON_URL = import.meta.env.VITE_FIREFOX_ADDON_URL || "";
export const SUPPORT_URL = import.meta.env.VITE_SUPPORT_URL || "https://aynitesoft.com";
export const BUY_URL = import.meta.env.VITE_BUY_URL || SUPPORT_URL;

export const ASSETS = {
  chromeZip: "aynitedm-chrome-extension.zip",
  firefoxXpi: "aynitedm-firefox.xpi",
  manifest: "update.json",
  installerFallback: "AyniteDM-Setup.exe",
};

// BASE_URL is "/" normally and "/<repo>/" on a GitHub Pages project site.
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
export const siteDownload = (name) => asset(`downloads/${name}`);
export const baseDownload = (asset) => (DOWNLOAD_BASE ? DOWNLOAD_BASE + asset : siteDownload(asset));

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

/** @returns {Promise<{version, date, notes, installer:{url,size,name}, sha256} | null>} */
export async function fetchLatestRelease() {
  // 1) the download folder's own manifest (always current); 2) the copy this site ships (same origin,
  // refreshed by build/build.py), which also covers download folders without CORS headers.
  const sources = [];
  if (DOWNLOAD_BASE) sources.push(DOWNLOAD_BASE + ASSETS.manifest);
  sources.push(siteDownload(ASSETS.manifest));
  let data = null;
  for (const src of sources) {
    try {
      data = await readManifest(src);
      if (data && data.version) break;
    } catch (e) {
      data = null;
    }
  }
  if (!data || !data.version) return null;
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

/** True when the visitor's browser reports a Linux desktop (not Android). */
export const IS_LINUX_VISITOR =
  typeof navigator !== "undefined" && /Linux|X11/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent);
