import { useEffect, useState } from "react";
import {
  ASSETS, CHROME_STORE_URL, DOWNLOAD_BASE, FIREFOX_ADDON_URL, IS_LINUX_VISITOR, SUPPORT_URL, asset, baseDownload,
  fetchLatestRelease, humanSize, siteDownload,
} from "./release.js";

const FEATURES = [
  ["Faster downloads", "Big files arrive several times faster, because AyniteDM fetches many parts of a file at the same time."],
  ["Pause and continue", "Stop a download and pick it up later, even after a restart. If your internet drops, AyniteDM waits and continues on its own."],
  ["Videos from any site", "Save videos from YouTube and over 1,800 other sites. Choose the quality you want, or keep just the sound as MP3."],
  ["A download button on every video", "With the browser add-on, a small Download button appears on any video you hover. Pick a quality and it starts."],
  ["Torrents too", "Open a magnet link or a torrent file and AyniteDM downloads it, then stops sharing when it is done unless you want otherwise."],
  ["Links from anywhere", "Copy a link in any app and AyniteDM pops up ready to download. Google Drive, Dropbox and OneDrive share links work as well."],
  ["Whole pages at once", "Grab every file, picture or video on a page in one go, or download on a timetable and shut the PC down when finished."],
  ["Safe by default", "Every finished file is checked with Windows security and never silently overwrites a file you already have."],
];

const FAQ = [
  ["Windows says \"Windows protected your PC\". Is it safe?", "Yes, when the file came from this page. Click \"More info\" and check that the publisher reads AyniteSoft, then click \"Run anyway\". Windows shows that screen for programs it has not seen many times yet."],
  ["YouTube downloads stopped working. What now?", "Video sites change often. Open the Tools menu in AyniteDM and choose Check for Updates; the video part of the program updates itself in a few seconds, no reinstall needed."],
  ["Can it download videos that need me to be signed in?", "Yes. Use the Download button that the browser add-on shows on the video while you are signed in to the site, and AyniteDM uses that sign-in."],
  ["Does it catch downloads from other programs, not just the browser?", "Downloads started inside other programs cannot be taken over by any download manager. Instead, copy the link and AyniteDM pops up on its own, or drag the link onto the AyniteDM window."],
  ["Where do my files go?", "In a AyniteDM folder inside your Downloads folder, neatly sorted into Videos, Music, Documents, Programs and so on. You can pick any other folder in Options."],
  ["Who makes AyniteDM, and what does it cost?", "AyniteDM is made and supported by AyniteSoft. Current prices and licence options are on aynitesoft.com. There are no ads and no bundled extras in the installer."],
  ["Does it run on Linux or Mac?", "Linux, yes: there is a package for Ubuntu, Linux Mint and Debian, and an archive that runs on any other distribution. The browser add-on works the same way there. A Mac version is not available yet."],
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

function Nav() {
  return (
    <header className="nav">
      <a className="brand" href="#top"><img src={asset("logo.svg")} alt="" width="28" height="28" /> AyniteDM</a>
      <nav>
        <a href="#features">Features</a>
        <a href="#download">Download</a>
        <a href="#extension">Browser add-on</a>
        <a href="#guide">How to install</a>
        <a href="#faq">Questions</a>
      </nav>
    </header>
  );
}

function DownloadButton({ loading, release, platform }) {
  if (loading) return <a className="btn primary" aria-disabled="true">Finding the latest version...</a>;
  const deb = release?.linux?.deb;
  const wantLinux = platform === "linux" || (platform === undefined && IS_LINUX_VISITOR);
  if (wantLinux && deb) {
    return (
      <a className="btn primary" href={deb.url}>
        Download for Linux
        <span className="btn-sub">Version {release.version} · {humanSize(deb.size)} · Ubuntu, Mint, Debian</span>
      </a>
    );
  }
  const href = release?.installer?.url || baseDownload(ASSETS.installerFallback);
  return (
    <a className="btn primary" href={href}>
      Download for Windows
      <span className="btn-sub">
        {release ? `Version ${release.version} · ${humanSize(release.installer.size)} · ` : ""}Windows 10 and 11
      </span>
    </a>
  );
}

function LinuxButtons({ release }) {
  const linux = release?.linux;
  if (!linux) return null;
  return (
    <>
      {linux.deb && (
        <a className="btn" href={linux.deb.url}>
          Linux: Ubuntu, Mint, Debian
          <span className="btn-sub">{humanSize(linux.deb.size)} · .deb package</span>
        </a>
      )}
      {linux.tar && (
        <a className="btn" href={linux.tar.url}>
          Other Linux
          <span className="btn-sub">{humanSize(linux.tar.size)} · archive, any distribution</span>
        </a>
      )}
    </>
  );
}

function Hero(props) {
  const { release } = props;
  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <p className="eyebrow">Download manager for Windows by AyniteSoft</p>
        <h1>Every file. Every video. One click.</h1>
        <p className="lead">
          AyniteDM downloads faster, saves videos from YouTube and thousands of other sites in the quality you choose,
          handles torrents, and picks up where it left off when your connection drops.
        </p>
        <div className="cta">
          <DownloadButton {...props} />
          <a className="btn" href="#extension">Get the browser add-on</a>
        </div>
        <p className="fine">
          {release?.date && <>Released {release.date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}. </>}
          {release?.linux ? "For Windows and Linux. " : ""}A product of AyniteSoft. No ads, no bundled extras.
        </p>
      </div>
      <figure className="hero-shot">
        <img src={asset("screenshots/main.png")} alt="AyniteDM main window with a list of downloads and progress bars" />
      </figure>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="section">
      <h2>What it does</h2>
      <div className="grid features">
        {FEATURES.map(([title, text]) => (
          <article key={title} className="card">
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <figure className="shot wide">
        <img src={asset("screenshots/youtube-button.png")} alt="The AyniteDM download button over a YouTube video listing the available qualities" />
        <figcaption>Hover a video, click Download this video, pick a quality. That is the whole process.</figcaption>
      </figure>
    </section>
  );
}

function Extension() {
  return (
    <section id="extension" className="section">
      <h2>Browser add-on</h2>
      <p className="lead">
        The add-on puts the Download button on videos, adds "Download with AyniteDM" to the right-click menu, and lets
        AyniteDM take over the browser's normal downloads. AyniteDM offers to set it up the first time it starts;
        you can also do it from here.
      </p>
      <div className="grid two">
        <article className="card">
          <h3>Chrome, Edge or Brave</h3>
          {CHROME_STORE_URL ? (
            <>
              <a className="btn primary" href={CHROME_STORE_URL} target="_blank" rel="noreferrer">Add to Chrome</a>
              <p className="fine">The same button works in Edge and Brave.</p>
            </>
          ) : (
            <>
              <a className="btn primary" href={siteDownload(ASSETS.chromeZip)}>Download the add-on</a>
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
        <article className="card">
          <h3>Firefox</h3>
          {FIREFOX_ADDON_URL ? (
            <a className="btn primary" href={FIREFOX_ADDON_URL} target="_blank" rel="noreferrer">Add to Firefox</a>
          ) : (
            <>
              <a className="btn primary" href={siteDownload(ASSETS.firefoxXpi)}>Download the add-on</a>
              <ol>
                <li>Open Firefox's Add-ons and themes page from the menu.</li>
                <li>Click the gear icon, choose Install Add-on From File, and pick the downloaded file.</li>
                <li>Firefox only installs add-ons it has approved. Until AyniteDM is listed there, use Firefox Developer Edition or Firefox ESR, which can install it after you allow unsigned add-ons in their settings.</li>
              </ol>
            </>
          )}
        </article>
      </div>
    </section>
  );
}

function Guide({ release }) {
  const steps = [
    ["Download the installer", `Click Download for Windows above. One file, about ${release?.installer?.size ? humanSize(release.installer.size) : "110 MB"}, with everything included.`],
    ["Run it", "Open the downloaded file. If Windows shows \"Windows protected your PC\", click More info, then Run anyway. No administrator password is needed. Choose whether you want a desktop icon and whether AyniteDM should start with Windows. On Linux, double-click the .deb package to install it, or extract the archive and run install.sh (or AyniteDM directly) from the folder it creates."],
    ["Add the browser add-on", "When AyniteDM starts for the first time it lists your browsers and sets the add-on up with a click. This is what makes the Download button appear on videos."],
    ["Download something", "Copy any link and AyniteDM opens by itself, ready to go. Or hover a video in your browser and click Download this video. Finished files land in the AyniteDM folder inside Downloads."],
    ["Keep it up to date", "AyniteDM tells you when a new version is out. Choose Check for Updates in the Tools menu and it installs itself. The video part updates the same way, more often, in seconds."],
    ["Remove it", "Windows Settings, Apps, AyniteDM, Uninstall. Your settings and download list are kept in case you install it again."],
  ];
  return (
    <section id="guide" className="section">
      <h2>How to install</h2>
      <div className="steps">
        {steps.map(([title, text], i) => (
          <div className="step" key={title}>
            <span className="num">{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="section">
      <h2>Questions</h2>
      <div className="faq">
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} <a href="https://aynitesoft.com" target="_blank" rel="noreferrer">AyniteSoft</a> ·{" "}
        <a href={SUPPORT_URL} target="_blank" rel="noreferrer">Support</a> ·{" "}
        <a href={asset("privacy.html")}>Privacy policy</a>
      </p>
      {!DOWNLOAD_BASE && (
        <p className="warn">Site owner: set VITE_DOWNLOAD_BASE to the folder that holds update.json and the installer.</p>
      )}
    </footer>
  );
}

export default function App() {
  const state = useRelease();
  return (
    <>
      <Nav />
      <main>
        <Hero {...state} />
        <Features />
        <section id="download" className="section band">
          <h2>Get AyniteDM</h2>
          <div className="cta center">
            <DownloadButton {...state} platform="windows" />
            <LinuxButtons release={state.release} />
            <a className="btn" href={CHROME_STORE_URL || siteDownload(ASSETS.chromeZip)}>Add-on for Chrome, Edge, Brave</a>
            <a className="btn" href={FIREFOX_ADDON_URL || siteDownload(ASSETS.firefoxXpi)}>Add-on for Firefox</a>
          </div>
          {state.release?.notes && (
            <details className="notes">
              <summary>What's new in version {state.release.version}</summary>
              <pre>{state.release.notes}</pre>
            </details>
          )}
        </section>
        <Extension />
        <Guide release={state.release} />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
