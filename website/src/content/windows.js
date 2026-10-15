export default {
  key: "windows",
  updated: "15 October 2026",
  h1: "Download Aynite Download Manager for Windows 10 and 11",
  lead: "Aynite Download Manager (ADM) for Windows is one 64-bit installer for Windows 10 and 11 with everything inside: the download engine, the video tool, the torrent engine and the browser add-on for Chrome, Edge, Brave and Firefox. No ads, no bundled extras.",
  download: "windows",
  sections: [
    {
      h2: "Which file do I need?",
      p: [
        "There is one Windows installer, ADM-Setup-<version>.exe, for 64-bit Windows 10 and Windows 11. The version number and size are on the button above, and the file's SHA-256 fingerprint is listed under Verify this file on the [download section of the home page](key:home#download), so you can check that what you got is untouched.",
        "The installer puts the program in your own user account's Programs folder, so no administrator password is needed. If you prefer an installation for every user of the PC, the installer offers that choice and then asks for the password.",
        "Windows 7, 8 and 32-bit Windows are not supported.",
      ],
      shot: { src: "screenshots/main.png", alt: "The main window of Aynite Download Manager on Windows 11 with a list of downloads, progress bars and speeds", eager: true },
    },
    {
      h2: "Install in three steps",
      steps: [
        ["Run the installer", "Double-click ADM-Setup-<version>.exe. If Windows shows \"Windows protected your PC\", that is the SmartScreen notice every new installer gets until it has a reputation; [what it means and how to check the file](key:helpSmartscreen) before you click More info, then Run anyway."],
        ["Choose the options", "Tick the desktop shortcut and Start with Windows if you want them. ADM starts minimized to the tray when it starts with Windows, so it is there when you hover a video or send a link from the browser."],
        ["Add the browser add-on", "On its first start ADM lists the browsers it found and opens the right page in each one. This is what puts the Download button on videos and lets ADM catch browser downloads. [How the add-on works](key:extension)."],
      ],
    },
    {
      h2: "What you get on Windows",
      list: [
        "Up to 32 connections per file, with pause and resume that survive a restart of the program or the PC ([what happens when a download fails](key:helpResume)).",
        "A Download button on every video in your browser, with the quality list up to 4K and audio-only MP3 or M4A. [How to download a YouTube video in 4K](key:youtube).",
        "[Live stream recording](key:live) from the moment you press Start until you press Stop, saved as a normal MP4.",
        "[Torrents and magnet links](key:torrent) in the same queue as everything else, with seeding that stops when you say so.",
        "A [scheduler](key:guideSchedule) that starts the queue at night, stops it in the morning and can shut down, sleep or hibernate the PC when the queue is done.",
        "The [Grabber](key:guideGrab), which lists every link, picture, video and document on a page so you can tick what you want.",
        "Checks on every finished file: a scan with Windows Security's command-line scanner, and the SHA-256 and MD5 fingerprints shown in the completion window. [How to verify a download](key:guideChecksum).",
        "Files sorted into Videos, Music, Documents, Programs, Compressed, Images and Torrents inside Downloads\\ADM; pick other folders in Options.",
        "Drag links onto the window, press Alt+Shift+D to add one from anywhere, or turn on the clipboard watch in Options so that a copied link opens ADM by itself.",
        "[FTP and SFTP with saved logins](key:guideFtp), HTTP and SOCKS5 proxies, and [speed limits](key:guideSpeed) for one download or for all of them.",
      ],
    },
    {
      h2: "Your first download",
      p: [
        "Copy any link. ADM notices it and opens the Add Download window with the link already filled in; press Start. Or hover a video in your browser and click Download this video, then pick a quality.",
        "The progress window shows every connection at work, the speed, the time left and a speed limit for just this download. When the file is finished, a Download complete window opens with Open, Open folder and Copy SHA-256 buttons.",
      ],
      shot: { src: "screenshots/progress.png", alt: "The progress window of Aynite Download Manager showing eight connections downloading parts of one file" },
    },
    {
      h2: "How it compares on Windows",
      p: ["The three programs people weigh against each other on Windows, on the points that decide the choice. The full tables are on the [IDM comparison](key:idm) and the [IDM alternatives round-up](key:alternatives)."],
      table: {
        cols: ["", "Aynite Download Manager", "Internet Download Manager", "Free Download Manager"],
        rows: [
          ["Price", "Paid licence, no ads", "Paid after a 30-day trial", "Free"],
          ["Also on Linux", "Yes", "No", "Yes"],
          ["Quality list on the video, up to 4K", "Yes", "Video panel; qualities depend on the site", "Video download; qualities depend on the site"],
          ["Torrents and magnet links", "Yes", "No", "Yes"],
          ["Live stream recording", "Yes", "No", "No"],
        ],
      },
      note: "Competitor facts as their websites presented them in October 2026.",
    },
    {
      h2: "Updates",
      p: [
        "ADM checks for a new version when it starts and every few hours while it runs. When one is out, a banner above the download list offers Download and install: the program closes, the installer runs silently, and the new version starts by itself. Downloads that were running continue.",
        "The part of ADM that understands video sites is updated separately, from Tools, then Check for Updates. That takes seconds and needs no reinstall, which matters because video sites change often. [What to do when YouTube downloads stop working](key:helpYoutube).",
      ],
    },
    {
      h2: "Licence",
      p: [
        "Aynite Download Manager (ADM) is a paid product of AyniteSoft. There are no ads, no bundled extras and no upsell screens in the program. Current prices and licence options are on [aynitesoft.com](https://aynitesoft.com).",
      ],
    },
    {
      h2: "Other platforms",
      p: [
        "The same program runs on [Linux](key:linux): a package for Ubuntu, Linux Mint and Debian, and an archive for Fedora, Arch and other distributions. There is no Mac version yet.",
      ],
    },
  ],
  faq: [
    ["Does ADM run on Windows 7 or Windows 8?", "No. Aynite Download Manager needs 64-bit Windows 10 or Windows 11."],
    ["Does it need administrator rights?", "No. By default the installer puts the program in your user account's Programs folder and never asks for a password. An installation for all users is offered as an option."],
    ["Is there a portable version?", "Not at the moment. ADM has to be installed; the installer is about 110 MB and installs in under a minute."],
    ["Can ADM take over downloads from Chrome or Edge?", "Yes. Once the add-on is installed and its Take over browser downloads option is on, downloads you start in the browser open in ADM instead, with several connections and pause and resume."],
    ["Where are my downloads?", "In Downloads\\ADM, sorted into Videos, Music, Documents, Programs, Compressed, Images and Torrents. Change the main folder, or the folder for one category, under Options."],
    ["How do I uninstall it?", "Through Windows Settings, Apps, like any other program. Your downloads stay where they are; the settings and the download list live in your AppData folder and are removed with the program."],
  ],
  related: ["extension", "helpSmartscreen", "idm", "adm", "linux"],
};
