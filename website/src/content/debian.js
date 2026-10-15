import { debPage } from "./_linux.js";

export default debPage({
  key: "debian",
  name: "Debian",
  versions: "Debian 12 (bookworm), Debian 13 and newer",
  opener: "Double-click the file to open it in GNOME Software or KDE Discover, which installs it after asking for the root password. On a system without a desktop store, use the terminal line below.",
  others: ["ubuntu", "mint", "fedora"],
  torrentNote: "The package recommends the aria2 torrent engine, which apt installs alongside it by default (APT::Install-Recommends is on in a standard Debian install), so magnet links and .torrent files work right away. If ADM reports that the torrent engine is missing, run apt install aria2 as root. [More on torrents](key:torrent).",
  specifics: [
    {
      h2: "What is different on Debian",
      p: [
        "Debian 12 (bookworm) is the oldest release with the libraries ADM needs; Debian 13 and testing work too. Firefox ESR, Debian's default browser, installs the add-on today after you allow unsigned add-ons (about:config, xpinstall.signatures.required set to false), which makes Debian the one .deb distribution where the Firefox add-on works before Mozilla signs it. Chromium from Debian's repository works as well.",
        "On a fresh Debian install, sudo may not be set up for your user. Either install the package as root (su -, then apt install ./adm_<version>_amd64.deb in the download folder), or open the file in GNOME Software or KDE Discover, which ask for the root password themselves.",
        "Debian's GNOME desktop shows no tray icons until you install the AppIndicator extension (apt install gnome-shell-extension-appindicator, then enable it). KDE Plasma, XFCE, MATE and Cinnamon show ADM's tray icon without extra steps. Debian stable does not update ADM through apt; ADM offers its own updates and downloads the new package.",
      ],
    },
  ],
  extraFaq: [
    ["Does it work on Debian 11?", "No. Debian 11 (bullseye) lacks a library the program needs. Debian 12 or newer is required."],
    ["Is there a repository to add?", "Not yet. Install the .deb from this site; ADM tells you when a new version is out and downloads it."],
    ["Why is there no tray icon on GNOME?", "Debian's GNOME hides tray icons until the AppIndicator extension is installed. ADM keeps running without it; use the window, or install the extension."],
  ],
});
