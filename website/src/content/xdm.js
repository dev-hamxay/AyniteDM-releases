export default {
  key: "xdm",
  h1: "Aynite Download Manager (ADM) or Xtreme Download Manager (XDM)?",
  lead: "XDM is a free, open-source download manager for Windows, macOS and Linux with a browser extension and video capture. In 2026 some directories list it as discontinued while its own website offers XDM 9. Aynite Download Manager is a paid, actively maintained Windows and Linux program. The facts side by side, as of October 2026.",
  checked: "October 2026",
  updated: "14 October 2026",
  download: "windows",
  sections: [
    {
      h2: "At a glance",
      table: {
        cols: ["", "Aynite Download Manager", "Xtreme Download Manager"],
        rows: [
          ["Price", "Paid licence; no ads, no bundled extras", "Free, open source"],
          ["Runs on", "Windows 10 and 11; Linux", "Windows, macOS, Linux"],
          ["Several connections, pause and resume", "Yes", "Yes"],
          ["Browser add-on", "Chrome, Edge, Brave and Firefox: Download button on videos, right-click menu, takes over browser downloads", "Extensions for Chrome, Edge, Brave and Firefox; a 2026 discussion reports its Chrome extension being removed from the store for a time"],
          ["Video sites", "YouTube and 1,800+ sites with a quality list on the player, up to 4K, MP3 and M4A", "Captures video from the browser with quality options"],
          ["Live stream recording", "Yes, with a Stop button", "Not offered as a feature"],
          ["Torrents and magnet links", "Yes", "No"],
          ["Scheduler, shut down when done", "Yes", "Yes"],
          ["Checks on finished files", "Virus scan; SHA-256 and MD5 shown and verified", "Not offered as a feature"],
          ["Maintenance in 2026", "Active; see [what's new](key:whatsnew)", "Unclear: website live with XDM 9, directories mark it discontinued"],
        ],
      },
      note: "The XDM column describes Xtreme Download Manager as its website, directories and user discussions presented it in October 2026. Check the project's own pages for the current state.",
    },
    {
      h2: "What is the same",
      p: [
        "Both are download managers in the IDM mould: several connections per file, pause and resume, a browser extension that catches downloads and offers videos, a scheduler, Windows and Linux versions. For someone leaving IDM, either will feel familiar.",
      ],
    },
    {
      h2: "What only ADM does",
      list: [
        "Downloads [torrents and magnet links](key:torrent) in the same queue.",
        "Records [live streams](key:live) from Start until Stop.",
        "Scans finished files and shows their SHA-256 and MD5.",
        "Ships as one installer with everything inside, and installs its own update silently.",
      ],
    },
    {
      h2: "What only XDM does",
      list: [
        "Costs nothing and is open source, so anyone can read and change the code.",
        "Runs on macOS.",
        "Is described by its makers as lightweight by design.",
      ],
    },
    {
      h2: "Is XDM discontinued?",
      p: [
        "The signals conflict. AlternativeTo marks Xtreme Download Manager as discontinued, a 2026 Reddit thread calls it deprecated and reports Chrome removing its extension, and users on Arch Linux describe it as buggy. At the same time xtremedownloadmanager.com is live, offers XDM 9 with installers for Windows, macOS and Linux, and has a full user guide. We cannot settle this from the outside; check the project's own download page and release dates before relying on it.",
      ],
    },
    {
      h2: "Price and licence",
      p: [
        "XDM is free. Aynite Download Manager is a paid product with a licence from AyniteSoft; prices are on [aynitesoft.com](https://aynitesoft.com). ADM's case is a maintained program with torrents, live recording, file checks and silent in-place updates, with no ads and no extras.",
      ],
    },
    {
      h2: "Switching in three steps",
      steps: [
        ["Install ADM next to XDM", "[Download for Windows](key:windows) or [Linux](key:linux), run the installer, and let it set up the browser add-on when it asks."],
        ["Let only one of them watch the browser", "Turn off XDM's browser monitoring, or turn off Take over browser downloads in ADM's add-on, while you compare."],
        ["Move your unfinished downloads", "Copy each unfinished link from XDM's list and paste it into ADM."],
      ],
    },
  ],
  faq: [
    ["Is XDM free?", "Yes. Xtreme Download Manager is free and open source."],
    ["Is Xtreme Download Manager discontinued?", "Directories say yes, the project's website says no. See the section above and check the project's own release dates."],
    ["Does XDM support torrents?", "No. Aynite Download Manager (ADM) does, in the same queue as other downloads."],
    ["Does XDM work on Linux?", "Yes, with packages for several distributions. ADM offers a .deb for Ubuntu, Mint and Debian and an archive for the others."],
    ["Which should I choose?", "If you want a free, open-source manager and you are comfortable with an uncertain maintenance status, XDM. If you want a maintained program with torrents, live recording and a quality list on every video, and a licence is acceptable, ADM."],
  ],
  related: ["idm", "fdm", "alternatives", "linux", "torrent"],
};
