import { BUY_URL, SUPPORTED_SITES } from "../release.js";
import { Crumbs, DownloadBand, Footer, Header, Shot, page, useRelease } from "../shared.jsx";

// Only facts we can stand behind. The IDM column states what is public knowledge about Internet Download
// Manager; where we are not certain, it says so instead of guessing.
const TABLE = [
  ["Runs on", "Windows 10 and 11, and Linux (Ubuntu, Mint, Debian and others)", "Windows only"],
  ["Several connections per download, pause and resume", "Yes", "Yes"],
  ["Browser button on videos, right-click download, takes over browser downloads", "Yes, for Chrome, Edge, Brave and Firefox", "Yes, through its own browser module"],
  ["Video sites with a quality picker", `YouTube and ${SUPPORTED_SITES}; pick up to 4K or MP3`, "Video capture on many sites; the quality list depends on the site"],
  ["Live stream recording with a Stop button", "Yes", "Not offered as a feature"],
  ["Torrents and magnet links", "Built in", "Not supported"],
  ["Whole-page grabber and playlists", "Yes", "Yes (Grabber)"],
  ["Scheduler and shutdown when done", "Yes", "Yes"],
  ["Checks on finished files", "Virus scan with your system's security software, damage check", "Virus scan with a scanner you point it to"],
  ["Updates", "Installs itself silently; video-site support updates in seconds", "Checks for new versions"],
  ["Ads or bundled extras", "None", "None"],
  ["Price", "Paid licence from AyniteSoft; see the price page", "Paid licence after a trial period"],
];

const SWITCH = [
  ["Install AyniteDM next to IDM", "Both can be installed at the same time. Download AyniteDM, run the installer, and let it set up the browser add-on when it asks."],
  ["Turn off IDM's browser capture", "Two download managers cannot both catch the same browser download. In IDM's options, switch off its browser integration, or simply close IDM, so AyniteDM's add-on takes over. You can turn IDM back on at any time."],
  ["Move your unfinished downloads", "Copy each unfinished link from IDM's list and paste it into AyniteDM; it starts fresh and, where the server allows it, can be paused and resumed from then on. There is no import of IDM's queue."],
];

const FAQ = [
  ["Can I keep IDM installed while I try AyniteDM?", "Yes. Install both and decide later. Only one of them should catch browser downloads at a time, so turn off that option in one of them."],
  ["Does AyniteDM read IDM's download list or settings?", "No. It starts with an empty list. Paste the links you still need."],
  ["What does AyniteDM do that IDM does not?", "It runs on Linux, records live broadcasts, downloads torrents and magnet links, and updates its video-site support in seconds without a reinstall."],
  ["What does IDM do that AyniteDM does not?", "IDM has been on the market far longer and some sites or corporate setups may be tuned for it. AyniteDM has no site-specific tweaks beyond its video-site support, and it has no Mac version, which IDM also lacks."],
];

export default function IdmAlternative() {
  const state = useRelease();
  return (
    <>
      <Header current="idm" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <Crumbs items={["Compare with IDM"]} />
            <h1>AyniteDM as an alternative to Internet Download Manager</h1>
            <p className="lead">
              Internet Download Manager (IDM) has been the best-known download accelerator for Windows for two decades.
              AyniteDM does the same core job, speeding up and resuming downloads with a button in the browser, and adds
              the things people switching from IDM ask for most: a Linux version, live stream recording, torrents and
              video quality up to 4K. Here is an honest side-by-side.
            </p>
          </div>
        </section>

        <section className="plain">
          <div className="wrap">
            <h2>Feature by feature</h2>
            <div className="table-wrap">
              <table className="compare">
                <thead>
                  <tr><th scope="col">Feature</th><th scope="col">AyniteDM</th><th scope="col">Internet Download Manager</th></tr>
                </thead>
                <tbody>
                  {TABLE.map(([f, a, b]) => (
                    <tr key={f}><th scope="row">{f}</th><td>{a}</td><td>{b}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="fine">
              The IDM column describes Internet Download Manager as publicly documented at the time of writing; check its
              own site for current details. AyniteSoft is not affiliated with IDM's maker.
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
                AyniteDM will feel familiar from the first minute.
              </p>
              <h2>What is different</h2>
              <p>
                AyniteDM runs on Linux as well as Windows. It records live broadcasts from the moment you press Start
                until you press Stop. It downloads torrents and magnet links without a second program. Its video support
                covers {SUPPORTED_SITES} with a quality list that goes up to 4K, and when a site changes, the fix arrives
                through a tiny update in seconds rather than a new release.
              </p>
            </div>
            <figure className="row-shot">
              <Shot src="screenshots/youtube-button.jpg" alt="AyniteDM's quality list over a YouTube video, offering 2160p60 down to 144p" eager />
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
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
            <p className="center">
              <a className="btn outline" href={BUY_URL} target="_blank" rel="noreferrer">Prices and licences</a>{" "}
              <a className="btn outline" href={page("linux")}>AyniteDM for Linux</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
