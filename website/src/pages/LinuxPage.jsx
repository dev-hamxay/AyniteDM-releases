import { SUPPORTED_SITES, humanSize } from "../release.js";
import { Crumbs, Footer, Header, Inline, LinuxButtons, PrimaryDownload, Shot, page, useRelease } from "../shared.jsx";

const STEPS_DEB = [
  ["Download the package", "Click the Ubuntu, Mint, Debian button. You get one .deb file with everything inside, including the video tool."],
  ["Open it", "Double-click the file. Your software installer (Ubuntu Software, GDebi, Discover or similar) shows ADM and asks for your password once. Linux Mint and Debian work the same way."],
  ["Start ADM", "Find it in your application menu under Internet. The first start offers to set up the browser add-on and asks whether ADM should start with your session."],
];

const STEPS_TAR = [
  ["Download the archive", "Click Other Linux. The archive works on Fedora, openSUSE, Arch, Manjaro and any other current distribution from 2022 onwards."],
  ["Unpack it", "Extract it anywhere you like, for example in your home folder. A folder named adm appears."],
  ["Run the Install script, or run ADM directly", "Double-click Install inside the folder to add ADM to your application menu and your user's programs, no administrator rights needed. Or just start the adm program in the folder."],
];

const FAQ = [
  ["Does Aynite Download Manager run on Linux?", "Yes. Aynite Download Manager (ADM) runs on Ubuntu 22.04+, Linux Mint 21+ and Debian 12+ from a .deb, and on Fedora, openSUSE, Arch, Manjaro and other distributions from 2022 onwards from an archive that needs no root, with the same browser add-on, torrents and 4K video as on Windows."],
  ["Is there an IDM for Linux?", "No. Internet Download Manager runs only on Windows. Aynite Download Manager does the same job natively on Ubuntu, Linux Mint, Debian and other distributions, browser button included."],
  ["Which distributions are supported?", "The package is for Ubuntu 22.04 and newer, Linux Mint 21 and newer, Debian 12 and newer and their relatives. The archive runs on any distribution from 2022 onwards, including Fedora, openSUSE, Arch and Manjaro."],
  ["Where do my downloads go on Linux?", "In an ADM folder inside your Downloads folder, sorted into Videos, Music, Documents, Programs, Compressed and Images. You can choose another place in Options."],
  ["Does the browser add-on work on Linux?", "Chrome, Chromium, Edge and Brave: yes, exactly as on Windows, including Flatpak and Snap builds; ADM detects the browsers you have and opens the right page for each. Firefox: the Developer Edition and ESR editions (including the firefox-esr that Debian ships) install the add-on today after you allow unsigned add-ons; regular Firefox, including Ubuntu's Snap and the Flathub build, accepts it once Mozilla has signed it."],
  ["Do torrents work on Linux?", "Yes. The package recommends the aria2 torrent engine, which apt installs with it; if ADM reports the engine missing, run sudo apt install aria2. With the archive, install aria2 from your distribution once, and torrents and magnet links work like any other download."],
  ["Do I get updates on Linux?", "Yes. ADM tells you when a new version is out and downloads the right package for your installation. Video-site fixes come with those updates, the same as on Windows."],
  ["Does it work on Wayland and on KDE, GNOME, XFCE, Cinnamon?", "Yes. It is a regular desktop program and uses whatever your desktop provides. The tray icon appears on desktops that show tray icons; on GNOME that needs the AppIndicator extension, which most distributions already include."],
  ["Is there a Mac version?", "No. Aynite Download Manager runs on Windows 10, 11 and Linux; there is no macOS version yet."],
];

export default function LinuxPage() {
  const state = useRelease();
  const linux = state.release?.linux;
  return (
    <>
      <Header current="linux" />
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <Crumbs items={["Linux"]} />
            <h1>Aynite Download Manager for Linux: a download manager for Ubuntu, Linux Mint, Debian and more</h1>
            <p className="lead">
              Yes, Aynite Download Manager (ADM) runs natively on Linux: the same program as on Windows, not a cut-down
              version. Several connections per file, pause and resume,
              videos from YouTube and {SUPPORTED_SITES} with a quality picker up to 4K, live stream recording, torrents, a
              scheduler and the browser add-on that puts a Download button on every video.
            </p>
            <div className="cta-row left">
              <PrimaryDownload {...state} platform="linux" />
              {linux?.tar && (
                <a className="btn outline" href={linux.tar.url}>
                  Other Linux
                  <small>{humanSize(linux.tar.size)} · archive, any distribution</small>
                </a>
              )}
            </div>
            {!linux && <p className="fine">The Linux packages are listed on the <a href={page("home", "#download")}>download page</a>.</p>}
          </div>
        </section>

        <section className="plain">
          <div className="wrap row">
            <div className="row-text">
              <h2>Which download is for me?</h2>
              <p>
                <strong>Ubuntu, Linux Mint, Debian, Pop!_OS, Zorin, elementary:</strong> take the package. It installs
                like any other program, appears in your application menu, and brings its own video tool and torrent
                engine with it.
              </p>
              <p>
                <strong>Fedora, openSUSE, Arch, Manjaro and anything else:</strong> take the archive. It runs from any
                folder, and an Install script adds it to your menu without administrator rights.
              </p>
              <p>Both are about the same size and contain the same program.</p>
            </div>
            <figure className="row-shot">
              <Shot src="screenshots/main.png" alt="ADM main window with a list of downloads" eager />
            </figure>
          </div>
        </section>

        <section className="band light">
          <div className="wrap two-col">
            <article className="panel">
              <h2>Install the package</h2>
              <ol className="steps compact">
                {STEPS_DEB.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
              </ol>
            </article>
            <article className="panel">
              <h2>Install from the archive</h2>
              <ol className="steps compact">
                {STEPS_TAR.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
              </ol>
            </article>
          </div>
        </section>

        <section className="plain">
          <div className="wrap row reverse">
            <div className="row-text">
              <h2>The browser add-on on Linux</h2>
              <p>
                Open ADM, choose Tools, then Install Browser Add-on. It lists the browsers it found, Chrome,
                Chromium, Edge, Brave or Firefox, including Flatpak versions, and opens the right page in each one. After
                that, every video you hover shows the Download button with its quality list, right-click menus gain
                "Download with ADM", and the add-on can take over normal browser downloads.
              </p>
              <p><a href={page("youtube")}>How to save a YouTube video in 4K or as MP3</a></p>
            </div>
            <figure className="row-shot">
              <Shot src="screenshots/addon.png" alt="ADM's add-on window listing installed browsers" />
            </figure>
          </div>
        </section>

        <section className="band light">
          <div className="wrap narrow">
            <h2 className="center">Questions about Linux</h2>
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p><Inline text={a} /></p></details>)}
            <div className="cta-row">
              <LinuxButtons release={state.release} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
