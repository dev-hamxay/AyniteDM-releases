import { useEffect, useState } from "react";
import { BY_KEY, SECTIONS } from "./pages/registry.js";
import {
  ASSETS, BUILT_RELEASE, BUY_URL, DOWNLOAD_BASE, IS_LINUX_VISITOR, SUPPORT_URL, asset, baseDownload,
  fetchLatestRelease, humanSize,
} from "./release.js";

// Natural pixel sizes of the program screenshots (rendered at triple density), so the browser can reserve
// their space before they load and pick the right WebP variant.
export const SHOTS = {
  "screenshots/main.png": [3360, 1920],
  "screenshots/progress.png": [1860, 1290],
  "screenshots/youtube-button.jpg": [2667, 1521],
  "screenshots/live.png": [1860, 1290],
  "screenshots/addon.png": [1740, 900],
  "screenshots/grabber.png": [2880, 1680],
  "screenshots/scheduler.png": [1560, 1080],
  "screenshots/torrent.png": [1920, 1140],
  "screenshots/complete.png": [1680, 750],
};

export function Shot({ src, alt, eager = false, className }) {
  const [w, h] = SHOTS[src] || [1600, 1000];
  const base = src.replace(/\.(png|jpg)$/, "");
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${asset(base + "-500.webp")} 500w, ${asset(base + "-800.webp")} 800w, ${asset(base + "-1400.webp")} 1400w, ${asset(base + ".webp")} ${w}w`}
        sizes="(max-width: 900px) 92vw, (max-width: 1360px) 50vw, 700px"
      />
      <img src={asset(base + "-1400.webp")} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"} decoding="async" className={className} />
    </picture>
  );
}

/** True once mounted in a Linux desktop browser; false during pre-rendering and the first paint. */
export function useIsLinuxVisitor() {
  const [linux, setLinux] = useState(false);
  useEffect(() => { setLinux(IS_LINUX_VISITOR); }, []);
  return linux;
}

/** The latest release: the build-time copy is shown at once, the live feed replaces it when it answers. */
export function useRelease() {
  const [state, setState] = useState({ loading: !BUILT_RELEASE, release: BUILT_RELEASE });
  useEffect(() => {
    let alive = true;
    fetchLatestRelease()
      .then((release) => alive && setState({ loading: false, release: release || BUILT_RELEASE }))
      .catch(() => alive && setState({ loading: false, release: BUILT_RELEASE }));
    return () => { alive = false; };
  }, []);
  return state;
}

/** Address of a page by its registry key, e.g. page("windows") or page("home", "#download"). */
export const page = (key, hash = "") => asset(BY_KEY[key].path) + hash;

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Text with links written as [label](key:windows), [label](key:home#download), [label](https://...) or
 *  [label](#id). Everything else is rendered as plain text. */
export function Inline({ text }) {
  if (!text || !text.includes("](")) return text || null;
  const out = [];
  let last = 0;
  let m;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const target = m[2];
    let href = target;
    let external = false;
    if (target.startsWith("key:")) {
      const [key, hash] = target.slice(4).split("#");
      href = page(key, hash ? `#${hash}` : "");
    } else if (target.startsWith("asset:")) {
      href = asset(target.slice(6));
    } else if (/^https?:/i.test(target)) {
      external = true;
    }
    out.push(external
      ? <a key={m.index} href={href} target="_blank" rel="noreferrer">{m[1]}</a>
      : <a key={m.index} href={href}>{m[1]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Header({ current = "home" }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="top">
      <a className="skip" href="#main">Skip to main content</a>
      <div className="wrap top-inner">
        <a className="brand" href={page("home")}><img src={asset("logo.svg")} alt="" width="34" height="34" /><span>ADM<small className="brand-full">Aynite Download Manager</small></span></a>
        <button className="menu-btn" aria-label="Menu" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav id="site-nav" aria-label="Main" className={open ? "open" : ""} onClick={() => setOpen(false)}>
          <a href={page("home")} aria-current={current === "home" ? "page" : undefined}>Home</a>
          <a href={page("home", "#features")}>Features</a>
          <a href={page("home", "#download")}>Download</a>
          <a href={page("extension")} aria-current={current === "extension" ? "page" : undefined}>Browser add-on</a>
          <a href={page("linux")} aria-current={current === "linux" ? "page" : undefined}>Linux</a>
          <a href={page("idm")} aria-current={current === "idm" ? "page" : undefined}>Compare with IDM</a>
          <a href={page("help")} aria-current={current === "help" ? "page" : undefined}>Help</a>
          <a href={SUPPORT_URL} target="_blank" rel="noreferrer">Support</a>
          <a className="btn solid small" href={BUY_URL} target="_blank" rel="noreferrer">Buy now</a>
          <a className="btn outline small" href={page("home", "#download")}>Download</a>
        </nav>
      </div>
    </header>
  );
}

export function PrimaryDownload({ loading, release, platform }) {
  const linuxVisitor = useIsLinuxVisitor();
  if (loading) return <a className="btn solid big" aria-disabled="true" href={baseDownload(ASSETS.installerFallback)}>Finding the latest version...</a>;
  const deb = release?.linux?.deb;
  const wantLinux = platform === "linux" || (platform === undefined && linuxVisitor);
  if (wantLinux && deb) {
    return (
      <a className="btn solid big" href={deb.url}>
        Download ADM for Linux
        <small>Version {release.version} · {humanSize(deb.size)} · Ubuntu, Mint, Debian</small>
      </a>
    );
  }
  const href = release?.installer?.url || baseDownload(ASSETS.installerFallback);
  return (
    <a className="btn solid big" href={href}>
      Download ADM for Windows
      <small>{release ? `Version ${release.version} · ${humanSize(release.installer.size)}` : "Windows 10 and 11"}</small>
    </a>
  );
}

export function LinuxButtons({ release }) {
  const linux = release?.linux;
  if (!linux) return null;
  return (
    <>
      {linux.deb && (
        <a className="btn outline" href={linux.deb.url}>
          Linux: Ubuntu, Mint, Debian
          <small>{humanSize(linux.deb.size)} · .deb package</small>
        </a>
      )}
      {linux.tar && (
        <a className="btn outline" href={linux.tar.url}>
          Other Linux
          <small>{humanSize(linux.tar.size)} · archive, any distribution</small>
        </a>
      )}
    </>
  );
}

export function DownloadBand(props) {
  const { release } = props;
  return (
    <section id="download" className="band light">
      <div className="wrap center">
        <h2>Get ADM</h2>
        <p className="band-lead">
          One installer with everything included. Install it, add the browser add-on when asked, and every link you copy
          or every video you hover is ready to download.
        </p>
        <div className="cta-row">
          <PrimaryDownload {...props} platform="windows" />
        </div>
        <div className="cta-row" id="linux">
          <LinuxButtons release={release} />
        </div>
        <p className="for-os">
          For Windows 10 and 11{release?.linux ? ", Ubuntu, Linux Mint, Debian and other Linux distributions" : ""}
        </p>
        {release?.sha256 && (
          <details className="verify">
            <summary>Verify this file</summary>
            <p>The Windows installer's fingerprint (SHA-256), for anyone who wants to check the download is untouched:</p>
            <p className="mono">{release.sha256}</p>
          </details>
        )}
      </div>
    </section>
  );
}

export function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href={page("home")}>Home</a></li>
        {items.map((it, i) => (
          <li key={i} aria-current={i === items.length - 1 ? "page" : undefined}>{it}</li>
        ))}
      </ol>
    </nav>
  );
}

const BUILD_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <nav className="footer-groups" aria-label="Site map">
          {SECTIONS.map(([id, label, keys]) => (
            <div key={id}>
              <h3>{label}</h3>
              {keys.map((k) => <a key={k} href={page(k)}>{BY_KEY[k].name}</a>)}
            </div>
          ))}
        </nav>
      </div>
      <div className="wrap footer-inner">
        <p className="brand-line"><img src={asset("logo.svg")} alt="" width="22" height="22" /> Aynite Download Manager (ADM) is a product of{" "}
          <a href="https://aynitesoft.com" target="_blank" rel="noreferrer">AyniteSoft</a>. © {BUILD_YEAR} AyniteSoft. All rights reserved.</p>
        <p className="footer-links">
          <a href={asset("privacy.html")}>Privacy policy</a>
          <a href={page("whatsnew")}>What's new</a>
          <a href={SUPPORT_URL} target="_blank" rel="noreferrer">Support</a>
          <a href={BUY_URL} target="_blank" rel="noreferrer">Buy now</a>
        </p>
      </div>
    </footer>
  );
}
