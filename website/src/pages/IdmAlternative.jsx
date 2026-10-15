import { BUY_URL, SUPPORTED_SITES } from "../release.js";
import { Crumbs, DownloadBand, Footer, Header, Inline, Shot, page, useRelease } from "../shared.jsx";

// Only facts we can stand behind. The IDM column states what is public knowledge about Internet Download
// Manager; where we are not certain, it says so instead of guessing.
const TABLE = [
  ["Runs on", "Windows 10 and 11, and Linux (Ubuntu, Mint, Debian and others)", "Windows only"],
  ["Several connections per download, pause and resume", "Yes", "Yes"],
  ["Browser button on videos, right-click download, takes over browser downloads", "Yes, for Chrome, Edge, Brave and Firefox", "Yes, through its own browser module"],
  ["Video sites with a quality picker", `YouTube and ${SUPPORTED_SITES}; pick up to 4K or MP3`, "Video capture on many sites; the quality list depends on the site"],
  ["Live stream recording with a Stop button", "Yes", "Not offered as a feature"],
  ["Torrents and magnet links", "Built in", "Not supported"],
  ["Whole-page grabber and playlists", "Yes; the Grabber lists one page at a time", "Yes; its Site Grabber can follow links into further pages"],
  ["Scheduler and shutdown when done", "Yes", "Yes"],
  ["Checks on finished files", "Virus scan with your system's security software, damage check", "Virus scan with a scanner you point it to"],
  ["Updates", "Installs itself silently; video-site support updates in seconds", "Checks for new versions"],
  ["Ads or bundled extras", "None", "None"],
  ["Price", "Paid licence from AyniteSoft; prices on aynitesoft.com", "Paid licence after a trial period"],
];

const SWITCH = [
  ["Install ADM next to IDM", "Both can be installed at the same time. Download ADM, run the installer, and let it set up the browser add-on when it asks."],
  ["Turn off IDM's browser capture", "Two download managers cannot both catch the same browser download. In IDM's options, switch off its browser integration, or simply close IDM, so ADM's add-on takes over. You can turn IDM back on at any time."],
  ["Move your unfinished downloads", "Copy each unfinished link from IDM's list and paste it into ADM; it starts fresh and, where the server allows it, can be paused and resumed from then on. There is no import of IDM's queue."],
];

const FAQ = [
  ["Is IDM free?", "No. Internet Download Manager comes with a 30-day trial and then needs a paid licence. Aynite Download Manager is licensed too; current prices are on aynitesoft.com."],
  ["Can I keep IDM installed while I try ADM?", "Yes. Install both and decide later. Only one of them should catch browser downloads at a time, so turn off that option in one of them."],
  ["Does ADM read IDM's download list or settings?", "No. It starts with an empty list. Paste the links you still need."],
  ["What does ADM do that IDM does not?", "Aynite Download Manager runs on Linux, records live broadcasts, downloads torrents and magnet links, and updates its video-site support in seconds without a reinstall."],
  ["What does IDM do that ADM does not?", "IDM has two decades of fixes behind it, and some sites or corporate setups are tuned for it. Its Site Grabber can follow links into further pages, where ADM's Grabber lists one page at a time; it downloads subtitles for some streaming videos, which ADM does not do yet; and it supports older Windows versions, while ADM needs 64-bit Windows 10 or 11. Neither has a Mac version."],
];

export default function IdmAlternative() {
  const state = useRelease();
  return (
    <>
      <Header current="idm" />
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <Crumbs items={["Compare with IDM"]} />
            <h1>Aynite Download Manager vs Internet Download Manager (IDM): an alternative that also runs on Linux</h1>
            <p className="lead">
              Aynite Download Manager (ADM) is a paid alternative to Internet Download Manager (IDM) for Windows 10, 11
              and Linux. Like IDM, it speeds up downloads with several connections, resumes them and adds a Download
              button to the browser; unlike IDM, it also runs on Linux, records live streams, downloads torrents and
              magnet links, and lists video qualities up to 4K. Here is an honest side-by-side, last checked in October 2026.
              Looking for a list instead? See the round-up of <a href={page("alternatives")}>IDM alternatives</a>, or
              the <a href={page("idmVsFdm")}>IDM vs FDM</a> comparison.
            </p>
          </div>
        </section>

        <section className="plain">
          <div className="wrap">
            <h2>Feature by feature</h2>
            <div className="table-wrap">
              <table className="compare">
                <thead>
                  <tr><th scope="col">Feature</th><th scope="col">Aynite Download Manager (ADM)</th><th scope="col">Internet Download Manager</th></tr>
                </thead>
                <tbody>
                  {TABLE.map(([f, a, b]) => (
                    <tr key={f}><th scope="row">{f}</th><td>{a}</td><td>{b}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="fine">
              The IDM column describes Internet Download Manager as its website presented it in October 2026 (version 6.43);
              check its own site for current details. AyniteSoft is not affiliated with IDM's maker.
            </p>
          </div>
        </section>

        <section className="band light">
          <div className="wrap row">
            <div className="row-text">
              <h2>What is the same</h2>
              <p>
                Both programs split a file into parts and download them at the same time, both resume a broken download
                where it stopped, both put a Download button on videos in the browser, both can take over regular browser
                downloads, both grab every link on a page, and both run on a schedule. If you use IDM for those things,
                ADM will feel familiar from the first minute.
              </p>
              <h2>What is different</h2>
              <p>
                ADM runs on Linux as well as Windows. It records live broadcasts from the moment you press Start
                until you press Stop. It downloads torrents and magnet links without a second program. Its video support
                covers {SUPPORTED_SITES} with a quality list that goes up to 4K, and when a site changes, the fix arrives
                through a tiny update in seconds rather than a new release.
              </p>
            </div>
            <figure className="row-shot">
              <Shot src="screenshots/youtube-button.jpg" alt="ADM's quality list over a YouTube video, offering 2160p60 down to 144p" eager />
            </figure>
          </div>
        </section>

        <section className="plain">
          <div className="wrap">
            <h2 className="center">Switching from IDM in three steps</h2>
            <ol className="steps">
              {SWITCH.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
            </ol>
          </div>
        </section>

        <DownloadBand {...state} />

        <section className="band light">
          <div className="wrap narrow">
            <h2 className="center">Questions people ask when they switch</h2>
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p><Inline text={a} /></p></details>)}
            <p className="center">
              <a className="btn outline" href={BUY_URL} target="_blank" rel="noreferrer">Prices and licences</a>{" "}
              <a className="btn outline" href={page("linux")}>ADM for Linux</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
