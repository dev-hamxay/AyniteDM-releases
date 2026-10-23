// One page per distribution family, from a template. The .deb distributions share the install mechanics; each
// page adds its own section and questions (package tool, browsers, desktop, release policy) so that the pages
// differ in substance, not only in the name.

const ADDON = "Chrome, Chromium, Edge, Brave and Firefox";

export function debPage({ key, name, versions, opener, snapNote = "", others, specifics = [], extraFaq = [], torrentNote }) {
  return {
    key,
    updated: "14 October 2026",
    h1: `Aynite Download Manager for ${name}`,
    lead: `One .deb package for ${versions}. It installs like any other program, appears in your application menu under Internet, and brings its own video tool and torrent engine with it. The browser add-on works in Chrome, Chromium, Edge and Brave, Flatpak builds included${snapNote}; Firefox needs the Developer Edition or ESR until Mozilla has signed the add-on.`,
    download: "linux",
    sections: [
      {
        h2: "Install the package",
        steps: [
          ["Download the package", "Use the Linux button above: adm_<version>_amd64.deb, for 64-bit PCs."],
          ["Open it", opener],
          ["Start ADM", "Find it in your application menu under Internet. The first start offers to set up the browser add-on and asks whether ADM should start with your session."],
        ],
        after: [
          "Prefer a terminal? In the folder you downloaded to: sudo apt install ./adm_<version>_amd64.deb. That installs the package and the few libraries it needs in one go.",
        ],
      },
      ...specifics,
      {
        h2: "First start and the browser add-on",
        p: [
          `ADM lists the browsers it found, ${ADDON}, Flatpak builds included${snapNote}, and opens the right page in each one. In Chrome, Chromium and Brave: turn on Developer mode on the extensions page, click Load unpacked and choose the folder ADM opened. In Firefox: Add-ons and themes, the gear icon, Install Add-on From File. After that, every video you hover shows the Download button with its quality list, and the right-click menu gains Download with ADM. [Details per browser](key:extension).`,
        ],
        shot: { src: "screenshots/addon.png", alt: "The add-on setup window of Aynite Download Manager listing the browsers found on a Linux desktop" },
      },
      {
        h2: "Download a video in 4K",
        p: [
          "Hover the video in your browser, click the arrow next to Download, pick a quality (up to 2160p60 on YouTube) or Audio only for MP3 and M4A. The file lands in the Videos or Music folder inside Downloads/ADM. [The full YouTube guide](key:youtube).",
        ],
      },
      {
        h2: `Torrents on ${name}`,
        p: [
          torrentNote || "The package recommends the aria2 torrent engine, which apt installs alongside it by default, so magnet links and .torrent files work right away. If ADM ever reports that the torrent engine is missing, run sudo apt install aria2. [More on torrents](key:torrent).",
        ],
      },
      {
        h2: "Updates",
        p: [
          "ADM tells you when a new version is out and downloads the right package, which opens in your software installer and replaces the old version. Video-site fixes come with these updates; Tools, then Check for Updates looks for one right away.",
        ],
      },
    ],
    faq: [
      [`Which versions of ${name} are supported?`, `${versions}. Older releases lack a library the program needs.`],
      ...extraFaq,
      ["Where do my downloads go?", "In an ADM folder inside Downloads, sorted into Videos, Music, Documents, Programs, Compressed and Images. Choose another place in Options."],
      [`Is there an IDM for ${name}?`, "No. Internet Download Manager runs only on Windows. Aynite Download Manager does the same job natively, browser button included. [IDM compared](key:idm)."],
    ],
    related: ["linux", ...others, "extension", "torrent"],
  };
}

export function tarPage() {
  return {
    key: "fedora",
    updated: "14 October 2026",
    h1: "Aynite Download Manager for Fedora, openSUSE, Arch and other distributions",
    lead: "One archive that runs on any 64-bit distribution from 2022 onward: Fedora, openSUSE, Arch, Manjaro, EndeavourOS, Pop!_OS, Zorin and the rest. No root rights needed: unpack it, run it, and an Install script adds it to your application menu. The browser add-on works in Chrome, Chromium, Brave and Firefox.",
    download: "linux",
    sections: [
      {
        h2: "Run it from the archive",
        steps: [
          ["Download the archive", "Use the Other Linux button above: adm-<version>-linux-x86_64.tar.gz."],
          ["Unpack it", "Extract it where you like, for example in your home folder. The folder it creates holds the program, its video tool and the add-on packages."],
          ["Run the Install script, or run ADM directly", "Double-click Install (install.sh) inside the folder to add ADM to your application menu and your user's programs under ~/.local, no administrator rights needed. Or just start ./adm from the folder."],
        ],
      },
      {
        h2: "Which distributions work",
        p: [
          "Any 64-bit distribution with a system library set from 2022 or later: Fedora 36 and newer, openSUSE Tumbleweed and Leap 15.6, Arch, Manjaro and EndeavourOS, Pop!_OS 22.04 and newer, Zorin 17, elementary 7, and others of the same age. Ubuntu, Linux Mint and Debian users should take the [.deb package](key:linux) instead, which also brings in the torrent engine.",
        ],
      },
      {
        h2: "First start and the browser add-on",
        p: [
          "ADM lists the browsers it found, Chrome, Chromium, Brave and Firefox, Flatpak builds included, and opens the right page in each one. In Chrome, Chromium and Brave: turn on Developer mode on the extensions page, click Load unpacked and choose the folder ADM opened. In Firefox: Add-ons and themes, the gear icon, Install Add-on From File. [Details per browser](key:extension).",
        ],
        shot: { src: "screenshots/addon.png", alt: "The add-on setup window of Aynite Download Manager listing the browsers found on a Linux desktop" },
      },
      {
        h2: "Torrents",
        p: [
          "The archive uses your distribution's aria2 package for torrents. Install it once: sudo dnf install aria2 on Fedora, sudo zypper install aria2 on openSUSE, sudo pacman -S aria2 on Arch and Manjaro. After that, magnet links and .torrent files work like any other download. [More on torrents](key:torrent).",
        ],
      },
      {
        h2: "Wayland, the tray and your desktop",
        p: [
          "ADM runs on Wayland and X11, on GNOME, KDE Plasma, XFCE and the others. Its tray icon appears wherever your desktop shows tray icons; on stock GNOME install an AppIndicator extension or keep the window open. The Install script registers magnet links and .torrent files with ADM through its desktop entry.",
        ],
      },
      {
        h2: "Updates",
        p: [
          "ADM tells you when a new version is out and downloads the new archive; replace the folder with it and run the Install script again. Video-site fixes come with these updates; Tools, then Check for Updates looks for one right away.",
        ],
      },
    ],
    faq: [
      ["Is there an RPM, an AUR package or a Flatpak?", "Not yet. The archive runs on all of these distributions without one; packages are on the list."],
      ["Does it need root?", "No. The Install script puts everything under your home folder, in ~/.local."],
      ["Where do my downloads go?", "In an ADM folder inside Downloads, sorted into Videos, Music, Documents, Programs, Compressed and Images. Choose another place in Options."],
      ["Does the add-on work with Flatpak browsers?", "Yes. ADM detects Chrome, Chromium, Brave and Firefox from Flatpak and opens the right page in each."],
      ["Is there an IDM for Fedora or Arch?", "No. Internet Download Manager runs only on Windows. Aynite Download Manager does the same job natively, browser button included. [IDM compared](key:idm)."],
    ],
    related: ["linux", "ubuntu", "mint", "debian", "extension", "torrent"],
  };
}
