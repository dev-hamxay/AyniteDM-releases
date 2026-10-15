import { debPage } from "./_linux.js";

export default debPage({
  key: "mint",
  name: "Linux Mint",
  versions: "Linux Mint 21, 22 and every release since, in the Cinnamon, MATE and XFCE editions, and LMDE 6",
  opener: "Double-click the file. GDebi, Mint's package installer, opens, shows what will be installed, and asks for your password once. Mint's Software Manager lists only programs from the repositories, so it does not show ADM; GDebi is the right tool.",
  others: ["ubuntu", "debian", "fedora"],
  specifics: [
    {
      h2: "What is different on Linux Mint",
      p: [
        "Linux Mint ships no Snap packages. Chromium comes from Mint's own repository as an ordinary program and takes the add-on like any other Chromium; Chrome and Brave from their makers' repositories work the same way. Mint's Firefox is the regular edition, which accepts the add-on once Mozilla has signed it; until then use Chromium, Chrome or Brave, or Firefox Developer Edition or ESR.",
        "Cinnamon, MATE and XFCE all show ADM's tray icon in their panels without any extension, so the program sits in the tray from the first start. Closing the window keeps it there; Exit is in the tray icon's menu.",
        "LMDE 6, the Debian-based edition, uses the same package and the same steps. Mint's Update Manager does not update ADM: ADM checks for its own updates and offers the new package itself, and the video-site support updates from inside ADM in seconds.",
      ],
    },
  ],
  extraFaq: [
    ["Can I install it with Synaptic or apt instead of GDebi?", "Yes: sudo apt install ./adm_<version>_amd64.deb in the download folder does the same job and brings in the torrent engine."],
    ["Does Mint's Software Manager show ADM?", "No. The Software Manager lists repository programs only. Open the downloaded .deb with GDebi, or use the terminal line above."],
    ["Does it work on Linux Mint 20?", "No. Mint 20 is based on Ubuntu 20.04, which lacks a library the program needs. Mint 21 or newer is required."],
  ],
});
