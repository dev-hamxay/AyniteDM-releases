import { useEffect, useState } from "react";
import {
  ASSETS, BUY_URL, CHROME_STORE_URL, DOWNLOAD_BASE, FEEDBACK_URL, FIREFOX_ADDON_URL, IS_LINUX_VISITOR, SUPPORT_URL,
  asset, baseDownload, fetchJsonList, fetchLatestRelease, humanSize, siteDownload,
} from "./release.js";

// True statements shown as badges next to the ratings, so the section is never empty or invented.
const TRUST = [
  ["No ads, no bundled extras", "The installer contains AyniteDM and nothing else."],
  ["Checksum published", "Every installer's SHA-256 is shown here and checked by the updater."],
  ["Your files stay yours", "Nothing about your downloads leaves your computer."],
  ["Updates itself", "New versions and video-site fixes arrive on their own."],
  ["Windows and Linux", "Windows 10 and 11, Ubuntu, Linux Mint, Debian and others."],
  ["Made by AyniteSoft", "Built and supported by one company, with a privacy policy you can read."],
];

const VERSION_FALLBACK = "1.3.3";

// Feature rows, in the order they appear: text on one side, a picture of the program on the other.
const ROWS = [
  {
    title: "Download faster and more reliably",
    text: "AyniteDM fetches several parts of a file at the same time, so big downloads arrive several times faster than in a browser. Pause a download and continue it later, even after a restart. If the connection drops, AyniteDM waits for the server and picks up where it left off on its own.",
    img: "screenshots/main.png", alt: "AyniteDM main window with a list of downloads, progress bars and speeds",
  },
  {
    title: "Watch every connection at work",
    text: "The progress window shows each connection and the piece of the file it is working on. Set a speed limit for one download while the others run at full speed, and open the finished file or its folder with one click.",
    img: "screenshots/progress.png", alt: "Progress window showing eight connections downloading parts of one file",
  },
  {
    title: "A Download button on every video",
    text: "With the browser add-on, a small Download button appears on any video you hover, on YouTube and over 1,800 other sites. Pick the quality you want, or keep just the sound as MP3, and the video is saved to your computer.",
    img: "screenshots/youtube-button.png", alt: "The AyniteDM Download button over a YouTube video with a list of qualities",
  },
  {
    title: "Record live broadcasts",
    text: "Live streams are recorded from the moment you press Start until you press Stop or the broadcast ends. The window shows the time and size captured so far, and a dropped connection is reconnected automatically.",
    img: "screenshots/live.png", alt: "Progress window recording a live stream with a Stop button",
  },
  {
    title: "All popular browsers are supported",
    text: "The add-on works in Google Chrome, Microsoft Edge, Brave and Firefox. It adds Download with AyniteDM to the right-click menu and can take over the browser's normal downloads so they finish faster.",
    img: "screenshots/addon.png", alt: "The window in AyniteDM that sets up the add-on for each installed browser",
    browsers: true,
  },
  {
    title: "Grab a whole page at once",
    text: "Point the Grabber at a page and it lists every file, picture, video and link on it, sorted by type and size. Tick what you want and download it all in one go, or hand it every video of a playlist.",
    img: "screenshots/grabber.png", alt: "The Grabber window listing the files found on a web page",
  },
  {
    title: "Download on a schedule",
    text: "Start the queue at night when the line is free and stop it in the morning, on the days you choose. When everything has finished, AyniteDM can shut the computer down or put it to sleep.",
    img: "screenshots/scheduler.png", alt: "Scheduler window with start and stop times and days of the week",
  },
  {
    title: "Torrents and magnet links too",
    text: "Open a magnet link or a torrent file and AyniteDM downloads it alongside everything else, shows peers and seeds, and stops sharing when it is done unless you want otherwise.",
    img: "screenshots/torrent.png", alt: "Add Download window with a magnet link ready to start",
  },
  {
    title: "Checked when it finishes",
    text: "Every finished file can be checked with the security scanner of your system and given MD5 and SHA-256 checksums. Files are sorted into folders for videos, music, documents, programs and pictures, and nothing you already have is silently overwritten.",
    img: "screenshots/complete.png", alt: "Download complete window showing the scan result and checksums",
  },
];

const FEATURES = [
  "Several connections per file", "Pause and resume, even after a restart", "Automatic resume after connection drops",
  "Videos from YouTube and 1,800+ sites", "Choose the quality, or audio only (MP3, M4A)", "Live stream recording",
  "Download button on every video", "Right-click: Download with AyniteDM", "Takes over browser downloads",
  "Sign-in-required videos via the add-on", "Google Drive, Dropbox and OneDrive links", "Whole pages and playlists at once",
  "Torrents and magnet links", "FTP and SFTP, with saved logins", "Proxy support",
  "Scheduler with shutdown when done", "Speed limits, global and per download", "Duplicate link detection",
  "Checksums and security scan on completion", "Sorted into category folders", "Clipboard watching: copy a link, it pops up",
  "Updates itself; video site support updates in seconds", "Windows 10 and 11", "Linux: Ubuntu, Mint, Debian and others",
];

const WHATS_NEW = [
  "Linux versions: a package for Ubuntu, Linux Mint and Debian, and an archive for other distributions.",
  "Live broadcasts can be recorded, with a Stop button and live size and time.",
  "The progress window can be minimised and maximised and has its own taskbar entry.",
  "AyniteDM checks for new versions on its own and tells you in the tray.",
];

const FAQ = [
  ["Windows says \"Windows protected your PC\". Is it safe?", "Yes, when the file came from this page. Click \"More info\" and check that the publisher reads AyniteSoft, then click \"Run anyway\". Windows shows that screen for programs it has not seen many times yet."],
  ["YouTube downloads stopped working. What now?", "Video sites change often. Open the Tools menu in AyniteDM and choose Check for Updates; the video part of the program updates itself in a few seconds, no reinstall needed."],
  ["Can it download videos that need me to be signed in?", "Yes. Use the Download button that the browser add-on shows on the video while you are signed in to the site, and AyniteDM uses that sign-in."],
  ["Why is there no Download button on Netflix, Prime Video or Disney+?", "Those services encrypt their videos (DRM) and the browser only decrypts them inside a locked player. No download manager can save them, and getting around that protection is against the law in most countries, so AyniteDM does not try. The add-on tells you when a video is protected instead of leaving you guessing."],
  ["Does it catch downloads from other programs, not just the browser?", "Downloads started inside other programs cannot be taken over by any download manager. Instead, copy the link and AyniteDM pops up on its own, or drag the link onto the AyniteDM window."],
  ["Where do my files go?", "In an AyniteDM folder inside your Downloads folder, neatly sorted into Videos, Music, Documents, Programs and so on. You can pick any other folder in Options."],
  ["Does it run on Linux or Mac?", "Linux, yes: there is a package for Ubuntu, Linux Mint and Debian, and an archive that runs on any other distribution. The browser add-on works the same way there. A Mac version is not available yet."],
  ["Who makes AyniteDM, and what does it cost?", "AyniteDM is made and supported by AyniteSoft. Current prices and licence options are on aynitesoft.com. There are no ads and no bundled extras in the installer."],
];

function useRelease() {
  const [state, setState] = useState({ loading: true, release: null });
  useEffect(() => {
    let alive = true;
    fetchLatestRelease()
      .then((release) => alive && setState({ loading: false, release }))
      .catch(() => alive && setState({ loading: false, release: null }));
    return () => { alive = false; };
  }, []);
  return state;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="top">
      <div className="wrap top-inner">
        <a className="brand" href="#top"><img src={asset("logo.svg")} alt="" width="34" height="34" /><span>AyniteDM</span></a>
        <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={open ? "open" : ""} onClick={() => setOpen(false)}>
          <a href="#top">Home</a>
          <a href="#features">Features</a>
          <a href="#download">Download</a>
          <a href="#extension">Browser add-on</a>
          <a href="#linux">Linux</a>
          <a href={SUPPORT_URL} target="_blank" rel="noreferrer">Support</a>
          <a className="btn solid small" href={BUY_URL} target="_blank" rel="noreferrer">Buy now</a>
          <a className="btn outline small" href="#download">Download</a>
        </nav>
      </div>
    </header>
  );
}

function PrimaryDownload({ loading, release, platform }) {
  if (loading) return <a className="btn solid big" aria-disabled="true">Finding the latest version...</a>;
  const deb = release?.linux?.deb;
  const wantLinux = platform === "linux" || (platform === undefined && IS_LINUX_VISITOR);
  if (wantLinux && deb) {
    return (
      <a className="btn solid big" href={deb.url}>
        Download AyniteDM for Linux
        <small>Version {release.version} · {humanSize(deb.size)} · Ubuntu, Mint, Debian</small>
      </a>
    );
  }
  const href = release?.installer?.url || baseDownload(ASSETS.installerFallback);
  return (
    <a className="btn solid big" href={href}>
      Download AyniteDM for Windows
      <small>{release ? `Version ${release.version} · ${humanSize(release.installer.size)} · ` : ""}Windows 10 and 11</small>
    </a>
  );
}

function LinuxButtons({ release }) {
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

function Hero(props) {
  const { release } = props;
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <p className="ribbon"><span>By AyniteSoft</span><i /><span>Windows and Linux</span></p>
        <h1>Download faster. Every file, every video.</h1>
        <p className="hero-lead">
          AyniteDM speeds up downloads with several connections at once, saves videos from YouTube and thousands of
          other sites in the quality you choose, records live streams, handles torrents, and resumes on its own when
          the connection drops.
        </p>
        <div className="hero-cta">
          <PrimaryDownload {...props} />
        </div>
        <p className="hero-fine">
          No ads, no bundled extras.{" "}
          {release?.linux ? <a href="#linux">Also for Linux.</a> : null}{" "}
          <a href={BUY_URL} target="_blank" rel="noreferrer">Buy a licence</a>
        </p>
      </div>
    </section>
  );
}

function BrowserLinks() {
  const chrome = CHROME_STORE_URL || siteDownload(ASSETS.chromeZip);
  const firefox = FIREFOX_ADDON_URL || siteDownload(ASSETS.firefoxXpi);
  return (
    <ul className="browser-links">
      <li><a href={chrome}>Add-on for Google Chrome</a></li>
      <li><a href={chrome}>Add-on for Microsoft Edge</a></li>
      <li><a href={chrome}>Add-on for Brave</a></li>
      <li><a href={firefox}>Add-on for Firefox</a></li>
    </ul>
  );
}

function FeatureRows() {
  return (
    <section id="features" className="rows">
      {ROWS.map((row, i) => (
        <div className={"wrap row" + (i % 2 ? " reverse" : "")} key={row.title}>
          <div className="row-text">
            <h2>{row.title}</h2>
            <p>{row.text}</p>
            {row.browsers && <BrowserLinks />}
          </div>
          <figure className="row-shot">
            <img src={asset(row.img)} alt={row.alt} loading={i > 1 ? "lazy" : "eager"} />
          </figure>
        </div>
      ))}
      <div className="wrap row-ctas">
        <a className="btn solid" href="#all-features">See all features</a>
        <a className="btn outline" href="#guide">How to install</a>
      </div>
    </section>
  );
}

function DownloadBand(props) {
  const { release } = props;
  return (
    <section id="download" className="band light">
      <div className="wrap center">
        <h2>Get AyniteDM</h2>
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
          For: Windows 10 and 11{release?.linux ? " · Ubuntu, Linux Mint, Debian · other Linux distributions" : ""}
        </p>
        {release?.sha256 && <p className="fine mono">Installer SHA-256: {release.sha256}</p>}
      </div>
    </section>
  );
}

function WhatsNew({ release }) {
  const version = release?.version || VERSION_FALLBACK;
  return (
    <section className="band dark">
      <div className="wrap whatsnew">
        <div className="box-art" aria-hidden="true">
          <img src={asset("logo.svg")} alt="" width="120" height="120" />
          <strong>AyniteDM</strong>
          <span>{version}</span>
        </div>
        <div>
          <p className="tag">New version</p>
          <h2>AyniteDM {version}</h2>
          <ul>
            {WHATS_NEW.map((line) => <li key={line}>{line}</li>)}
          </ul>
          {release?.date && (
            <p className="fine light-text">
              Released {release.date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}.
              Installed copies are told about it automatically.
            </p>
          )}
          <a className="btn solid" href="#download">Download the new version</a>
        </div>
      </div>
    </section>
  );
}

function useJsonList(name) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    let alive = true;
    fetchJsonList(name).then((list) => alive && setItems(list));
    return () => { alive = false; };
  }, [name]);
  return items;
}

function Stars({ label }) {
  // "4.5 / 5" style labels get drawn as stars; anything else is shown as text.
  const m = /^(\d(?:\.\d)?)\s*\/\s*5/.exec(String(label || ""));
  if (!m) return <span className="rating-label">{label}</span>;
  const value = Math.max(0, Math.min(5, parseFloat(m[1])));
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      <span className="stars-fill" style={{ width: `${(value / 5) * 100}%` }}>★★★★★</span>
      <span className="stars-base">★★★★★</span>
      <span className="rating-label">{label}</span>
    </span>
  );
}

function Ratings() {
  const ratings = useJsonList("ratings.json");
  return (
    <section id="ratings" className="plain">
      <div className="wrap">
        <h2 className="center">{ratings.length ? "Ratings and awards" : "Safe to install"}</h2>
        {ratings.length > 0 && (
          <ul className="badges">
            {ratings.map((r) => (
              <li key={r.site + r.label}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.badge ? <img src={asset(r.badge)} alt="" /> : <span className="badge-mark">{(r.site || "?").slice(0, 1)}</span>}
                  <strong>{r.site}</strong>
                  <Stars label={r.label} />
                </a>
              </li>
            ))}
          </ul>
        )}
        <ul className="trust">
          {TRUST.map(([title, text]) => (
            <li key={title}><strong>{title}</strong><span>{text}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = useJsonList("reviews.json");
  return (
    <section id="reviews" className="band light">
      <div className="wrap">
        <h2 className="center">What users say</h2>
        {reviews.length > 0 ? (
          <ul className="quotes">
            {reviews.map((r, i) => (
              <li key={i} className="quote">
                <p>{r.text}</p>
                <footer>
                  <strong>{r.name}</strong>
                  {r.where ? <span> · {r.where}</span> : null}
                  {r.date ? <time dateTime={r.date}> · {new Date(r.date).toLocaleDateString(undefined, { year: "numeric", month: "short" })}</time> : null}
                </footer>
              </li>
            ))}
          </ul>
        ) : (
          <p className="band-lead center">
            AyniteDM is new, and only real words from real users go here. Using it? Tell us what works and what should
            be better, and with your permission your review appears on this page.
          </p>
        )}
        <p className="center">
          <a className="btn outline" href={FEEDBACK_URL} target="_blank" rel="noreferrer">Share your experience</a>
        </p>
      </div>
    </section>
  );
}

function AllFeatures() {
  return (
    <section id="all-features" className="plain">
      <div className="wrap">
        <h2 className="center">Everything AyniteDM does</h2>
        <ul className="checklist">
          {FEATURES.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Extension() {
  return (
    <section id="extension" className="band light">
      <div className="wrap">
        <h2 className="center">Browser add-on</h2>
        <p className="band-lead center">
          The add-on puts the Download button on videos, adds "Download with AyniteDM" to the right-click menu, and lets
          AyniteDM take over the browser's normal downloads. AyniteDM offers to set it up the first time it starts;
          you can also do it from here.
        </p>
        <div className="two-col">
          <article className="panel">
            <h3>Chrome, Edge or Brave</h3>
            {CHROME_STORE_URL ? (
              <>
                <a className="btn solid" href={CHROME_STORE_URL} target="_blank" rel="noreferrer">Add to Chrome</a>
                <p className="fine">The same button works in Edge and Brave.</p>
              </>
            ) : (
              <>
                <a className="btn solid" href={siteDownload(ASSETS.chromeZip)}>Download the add-on</a>
                <ol>
                  <li>Unzip the download into a folder you will keep, for example inside Documents.</li>
                  <li>In your browser open the menu, choose Extensions, then Manage extensions.</li>
                  <li>Turn on the Developer mode switch in the corner of that page.</li>
                  <li>Click Load unpacked and choose the folder from step 1.</li>
                  <li>Pin the AyniteDM icon next to the address bar. It shows "Connected" while AyniteDM is running.</li>
                </ol>
                <p className="fine">Tip: in AyniteDM, choose Tools, then Install Browser Add-on, and it opens the right page and folder for you.</p>
              </>
            )}
          </article>
          <article className="panel">
            <h3>Firefox</h3>
            {FIREFOX_ADDON_URL ? (
              <a className="btn solid" href={FIREFOX_ADDON_URL} target="_blank" rel="noreferrer">Add to Firefox</a>
            ) : (
              <>
                <a className="btn solid" href={siteDownload(ASSETS.firefoxXpi)}>Download the add-on</a>
                <ol>
                  <li>Open Firefox's Add-ons and themes page from the menu.</li>
                  <li>Click the gear icon, choose Install Add-on From File, and pick the downloaded file.</li>
                  <li>Firefox only installs add-ons it has approved. Until AyniteDM is listed there, use Firefox Developer Edition or Firefox ESR, which can install it after you allow unsigned add-ons in their settings.</li>
                </ol>
              </>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}

function Guide({ release }) {
  const size = release?.installer?.size ? humanSize(release.installer.size) : "75 MB";
  const steps = [
    ["Download the installer", `Click Download for Windows above. One file, about ${size}, with everything included. On Linux, take the package for your distribution instead.`],
    ["Run it", "Open the downloaded file. If Windows shows \"Windows protected your PC\", click More info, then Run anyway. No administrator password is needed. On Linux, double-click the .deb package, or extract the archive and run install.sh from the folder it creates."],
    ["Add the browser add-on", "When AyniteDM starts for the first time it lists your browsers and sets the add-on up with a click. This is what makes the Download button appear on videos."],
    ["Download something", "Copy any link and AyniteDM opens by itself, ready to go. Or hover a video in your browser and click Download this video. Finished files land in the AyniteDM folder inside Downloads."],
    ["Keep it up to date", "AyniteDM tells you when a new version is out and installs it from the Tools menu. The video part updates the same way, more often, in seconds."],
  ];
  return (
    <section id="guide" className="plain">
      <div className="wrap">
        <h2 className="center">How to install</h2>
        <ol className="steps">
          {steps.map(([title, text]) => (
            <li key={title}><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="band light">
      <div className="wrap narrow">
        <h2 className="center">Questions</h2>
        {FAQ.map(([q, a]) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p className="brand-line"><img src={asset("logo.svg")} alt="" width="22" height="22" /> AyniteDM is a product of{" "}
          <a href="https://aynitesoft.com" target="_blank" rel="noreferrer">AyniteSoft</a>. © {new Date().getFullYear()} AyniteSoft. All rights reserved.</p>
        <p className="footer-links">
          <a href={asset("privacy.html")}>Privacy policy</a>
          <a href={SUPPORT_URL} target="_blank" rel="noreferrer">Support</a>
          <a href={BUY_URL} target="_blank" rel="noreferrer">Buy now</a>
        </p>
        {!DOWNLOAD_BASE && <p className="warn">Site owner: set VITE_DOWNLOAD_BASE to the folder that holds update.json and the installer.</p>}
      </div>
    </footer>
  );
}

export default function App() {
  const state = useRelease();
  return (
    <>
      <Header />
      <main>
        <Hero {...state} />
        <FeatureRows />
        <DownloadBand {...state} />
        <WhatsNew release={state.release} />
        <Ratings />
        <Testimonials />
        <AllFeatures />
        <Extension />
        <Guide release={state.release} />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
