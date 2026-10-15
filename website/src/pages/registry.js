// Every page of the site in one list: address, head tags, place in the site and how it is rendered.
//   scripts/make-pages.mjs  writes <path>/index.html and src/entries/<key>.jsx from it
//   vite.config.js          builds those shells and adds canonical links, structured data, sitemap, robots, llms.txt
//   shared.jsx              resolves internal links by key: page("windows")
//   entry-server.jsx        pre-renders every page
// Titles stay under 60 characters and descriptions under 155 so search results show them whole. The full
// product name appears in every title where it fits, and always in the H1: "ADM" alone is an Android app in
// search results.
const FULL = "Aynite Download Manager";

function P(key, path, name, title, description, extra = {}) {
  return {
    key, path, name, title, description,
    ogTitle: extra.ogTitle || title,
    ogDescription: extra.ogDescription || description,
    section: extra.section || null,       // footer group: product | features | compare | help
    parent: extra.parent || null,         // breadcrumb parent (page key)
    component: extra.component || null,   // a hand-written page component; otherwise content/<key>.js
    nav: extra.nav || null,               // header entry to highlight
  };
}

export const PAGES = [
  // ---- product
  P("home", "", "Home", `${FULL} (ADM) for Windows and Linux`,
    "Download manager and video downloader for Windows and Linux: faster multi-connection downloads, YouTube and 1,800+ sites up to 4K, live streams, torrents.",
    { component: "App", nav: "home", ogDescription: "Faster downloads, videos from YouTube and over 1,800 sites up to 4K, live stream recording, torrents, automatic resume. By AyniteSoft." }),
  P("windows", "windows/", "Windows", `${FULL} for Windows 10 and 11`,
    "Install Aynite Download Manager (ADM) on Windows 10 or 11 in three steps: faster multi-connection downloads, a Download button on videos, torrents.",
    { section: "product" }),
  P("linux", "linux/", "Linux", `${FULL} for Linux: Ubuntu, Mint, Debian`,
    "Download manager for Linux: .deb for Ubuntu, Mint and Debian, archive for Fedora, Arch and others. Browser add-on, 4K video, live streams, torrents.",
    { component: "LinuxPage", section: "product", nav: "linux", ogTitle: `${FULL} for Linux`, ogDescription: "A full download manager for Ubuntu, Mint, Debian and other distributions, with the browser add-on." }),
  P("ubuntu", "linux/ubuntu/", "Ubuntu", `Download Manager for Ubuntu | ${FULL} (ADM)`,
    "Install Aynite Download Manager on Ubuntu 22.04 or newer from one .deb: browser add-on for Chrome, Chromium, Brave and Firefox, 4K video, torrents.",
    { parent: "linux", nav: "linux" }),
  P("mint", "linux/mint/", "Linux Mint", `Download Manager for Linux Mint | ${FULL}`,
    "Install Aynite Download Manager on Linux Mint 21 or newer from one .deb: browser add-on, YouTube in 4K, live stream recording, torrents, scheduler.",
    { parent: "linux", nav: "linux" }),
  P("debian", "linux/debian/", "Debian", `Download Manager for Debian | ${FULL}`,
    "Install Aynite Download Manager on Debian 12 or newer from one .deb: browser add-on, YouTube in 4K, live stream recording, torrents and a scheduler.",
    { parent: "linux", nav: "linux" }),
  P("fedora", "linux/fedora-arch/", "Fedora and Arch", `Download Manager for Fedora, Arch | ${FULL}`,
    "Run Aynite Download Manager on Fedora, openSUSE, Arch, Manjaro and other distributions from one archive: no root needed, menu entry, browser add-on.",
    { parent: "linux", nav: "linux" }),
  P("extension", "browser-extension/", "Browser add-on", "Download Manager Extension for Chrome, Edge & Firefox | ADM",
    "The Aynite Download Manager add-on for Chrome, Edge, Brave and Firefox: a Download button on videos, a right-click menu, downloads handled by ADM.",
    { section: "product", nav: "extension" }),
  P("chrome", "chrome/", "Chrome", `${FULL} Extension for Chrome`,
    "Install the Aynite Download Manager (ADM) add-on in Chrome: a Download button on videos, Download with ADM in the right-click menu, faster downloads.",
    { parent: "extension", nav: "extension" }),
  P("edge", "edge/", "Microsoft Edge", `${FULL} Extension for Microsoft Edge`,
    "Install the Aynite Download Manager (ADM) add-on in Microsoft Edge: a Download button on videos, a right-click download menu, downloads handled by ADM.",
    { parent: "extension", nav: "extension" }),
  P("brave", "brave/", "Brave", `${FULL} Extension for Brave`,
    "Install the Aynite Download Manager (ADM) add-on in Brave: a Download button on videos, Download with ADM in the right-click menu, Brave downloads in ADM.",
    { parent: "extension", nav: "extension" }),
  P("firefox", "firefox/", "Firefox", `${FULL} Add-on for Firefox`,
    "Install the Aynite Download Manager (ADM) add-on in Firefox: a Download button on videos, a right-click download menu, Firefox downloads handled by ADM.",
    { parent: "extension", nav: "extension" }),
  P("adm", "adm-download-manager/", "ADM for PC", `ADM Download Manager for PC: ${FULL}`,
    "ADM is Aynite Download Manager: a download manager for Windows 10, 11 and Linux PCs, not the Android app with the same initials. Fast downloads, 4K video.",
    { section: "product" }),
  P("whatsnew", "whats-new/", "What's new", `What's New in ${FULL}`,
    "Version history of Aynite Download Manager (ADM) and its browser add-on: the new name, encrypted stream support, Linux packages, live recording, more.",
    { section: "product" }),

  // ---- features
  P("youtube", "youtube-4k-downloader/", "YouTube in 4K", `YouTube Downloader 4K, 1080p, MP3 | ${FULL}`,
    "Save YouTube videos in 4K 60fps, 1080p or as MP3 with one click on the player. Playlists, live streams and signed-in videos, on Windows and Linux.",
    { component: "YoutubeGuide", section: "features", ogTitle: `YouTube downloader for 4K, 1080p and MP3: ${FULL}`, ogDescription: "One click on the video, one pick from the quality list. Playlists, live streams and MP3 too." }),
  P("mp3", "youtube-to-mp3/", "YouTube to MP3", `YouTube to MP3 Downloader for PC | ${FULL}`,
    "Keep just the sound of a YouTube video as MP3 or M4A with one click on the player, playlists too. Aynite Download Manager (ADM) for Windows and Linux.",
    { section: "features" }),
  P("playlist", "youtube-playlist-downloader/", "YouTube playlists", `YouTube Playlist Downloader | ${FULL} (ADM)`,
    "Paste a playlist or channel link, tick the videos you want, pick one quality for all of them. Aynite Download Manager queues them on Windows and Linux.",
    { section: "features" }),
  P("live", "live-stream-recorder/", "Live streams", "How to Download a YouTube Live Stream on PC (2026) | ADM",
    "Four ways to download or record a YouTube live stream on a PC in 2026, with Aynite Download Manager (ADM) first: press Start, press Stop, keep an MP4.",
    { section: "features" }),
  P("torrent", "torrent-download-manager/", "Torrents", "Download Manager with Torrent and Magnet Support | ADM",
    "One queue for torrents, magnet links and normal downloads. Aynite Download Manager (ADM) shows seeders, stops sharing when done, runs on Windows and Linux.",
    { section: "features" }),
  P("anysite", "download-video-from-any-website/", "Any website", `Download Video from Any Website | ${FULL}`,
    "Hover a video, click Download, pick the quality. Works on YouTube, Vimeo, TikTok, Twitter/X, Facebook, Twitch and 1,800+ sites on Windows and Linux.",
    { section: "features" }),

  // ---- compare
  P("idm", "idm-alternative/", "vs Internet Download Manager", `${FULL} vs IDM: Feature Comparison`,
    "Aynite Download Manager (ADM) and Internet Download Manager compared feature by feature: Linux, 4K video, live streams, torrents, price, and how to switch.",
    { component: "IdmAlternative", section: "compare", nav: "idm", ogTitle: `${FULL} (ADM): an IDM alternative for Windows and Linux`, ogDescription: "Feature by feature comparison with IDM, and how to switch in three steps." }),
  P("fdm", "compare/free-download-manager/", "vs Free Download Manager", `${FULL} vs Free Download Manager`,
    "Free Download Manager and Aynite Download Manager (ADM) side by side: platforms, browser button, video quality picker, live streams, torrents, price.",
    { section: "compare" }),
  P("xdm", "compare/xdm/", "vs Xtreme Download Manager", `${FULL} vs Xtreme Download Manager (XDM)`,
    "XDM and Aynite Download Manager (ADM) compared: platforms, browser extension, video downloads, torrents, updates, and whether XDM is discontinued.",
    { section: "compare" }),
  P("jdownloader", "compare/jdownloader/", "vs JDownloader", `${FULL} vs JDownloader 2`,
    "JDownloader 2 and Aynite Download Manager (ADM) compared: Java and size, installer offers, browser integration, video quality, torrents, live streams.",
    { section: "compare" }),
  P("fourk", "compare/4k-video-downloader/", "vs 4K Video Downloader", `${FULL} vs 4K Video Downloader Plus`,
    "4K Video Downloader Plus and Aynite Download Manager (ADM) compared: video downloader or full download manager, free-tier limits, licences, torrents.",
    { section: "compare" }),
  P("idmLinux", "idm-for-linux/", "IDM for Linux", "IDM for Linux: Run It in Wine, or Use a Native Manager",
    "No IDM for Linux exists. What works and breaks when you run Internet Download Manager in Wine, and the native download managers for Ubuntu and Debian.",
    { section: "compare" }),
  P("idmVsFdm", "compare/idm-vs-fdm/", "IDM vs FDM", `IDM vs FDM vs ${FULL} (2026)`,
    "IDM and Free Download Manager compared on price, speed, platforms, torrents, video quality and browser add-ons, and where Aynite Download Manager fits.",
    { section: "compare" }),
  P("alternatives", "idm-alternatives/", "IDM alternatives", "Best IDM Alternatives for Windows and Linux (2026) | ADM",
    "Eight Internet Download Manager alternatives judged on the thing IDM does well: catching downloads and videos in the browser. Windows and Linux.",
    { section: "compare" }),

  // ---- help and guides
  P("help", "help/", "Help", `Help Centre | ${FULL} (ADM)`,
    "Fixes for the questions people ask most about Aynite Download Manager: YouTube downloads stopped, no Download button, SmartScreen, a disconnected add-on.",
    { section: "help", nav: "help" }),
  P("helpYoutube", "help/youtube-downloads-stopped-working/", "YouTube downloader not working", "YouTube Downloader Not Working? Causes and Fixes (2026)",
    "Why YouTube downloaders stop working, the error messages and what they mean, fixes per tool, and the one-minute fix in Aynite Download Manager.",
    { parent: "help", nav: "help" }),
  P("helpButton", "help/no-download-button-on-video/", "No Download button", "No Download Button on a Video | Aynite Download Manager",
    "The Download button is missing on a video: the add-on is off, ADM is not running, the video is protected (DRM) or needs a sign-in. How to tell and fix it.",
    { parent: "help", nav: "help" }),
  P("helpSmartscreen", "help/windows-protected-your-pc/", "Windows protected your PC", "\"Windows protected your PC\" When Installing ADM",
    "What the Windows SmartScreen notice means for the Aynite Download Manager installer, how to check the file's SHA-256 against the site, how to continue.",
    { parent: "help", nav: "help" }),
  P("helpResume", "help/resume-failed-download/", "Resume a failed download", "Resume a Failed Download | Aynite Download Manager",
    "A download failed or the PC restarted: how Aynite Download Manager resumes it, what to do when the server refuses to resume, and how to use a fresh link.",
    { parent: "help", nav: "help" }),
  P("helpDisconnected", "help/add-on-disconnected/", "Add-on disconnected", "Add-on Says Disconnected | Aynite Download Manager",
    "The browser add-on shows Disconnected: start the program, check the tray, check for another program on its connection, reinstall the add-on if needed.",
    { parent: "help", nav: "help" }),
  P("guides", "guides/", "Guides", `Guides | ${FULL} (ADM)`,
    "Step-by-step guides for Aynite Download Manager: scheduling and shutting down, grabbing every file on a page, speed limits, FTP and SFTP, checksums.",
    { section: "help", nav: "help" }),
  P("guideSchedule", "guides/schedule-downloads-and-shut-down/", "Schedule and shut down", "Schedule Downloads and Shut Down | Aynite Download Manager",
    "Set start and stop times and days in Aynite Download Manager; shut down, sleep or hibernate the PC when the queue finishes. Manual downloads run at once.",
    { parent: "guides", nav: "help" }),
  P("guideGrab", "guides/download-all-files-on-a-page/", "Grab a whole page", "Download Every File on a Page | Aynite Download Manager",
    "Use the Grabber in Aynite Download Manager to list every link, picture, video or document on a page, filter by type or name, tick what you want, queue it.",
    { parent: "guides", nav: "help" }),
  P("guideSpeed", "guides/speed-limit/", "Speed limits", "Set a Speed Limit for One Download | Aynite Download Manager",
    "Limit one download without slowing the rest, or cap all downloads in Options: how speed limits work in Aynite Download Manager and when to use each one.",
    { parent: "guides", nav: "help" }),
  P("guideFtp", "guides/ftp-sftp/", "FTP and SFTP", "FTP and SFTP Downloads | Aynite Download Manager",
    "Download from FTP and SFTP servers with Aynite Download Manager: paste the address, save the login once under Options, resume large transfers.",
    { parent: "guides", nav: "help" }),
  P("guideChecksum", "guides/verify-checksum/", "Verify a download", "Check a Download's SHA-256 | Aynite Download Manager",
    "Paste the SHA-256, SHA-1 or MD5 a site publishes and Aynite Download Manager verifies the file when it finishes; every finished file shows its fingerprint.",
    { parent: "guides", nav: "help" }),
];

export const BY_KEY = Object.fromEntries(PAGES.map((p) => [p.key, p]));

/** The page and its ancestors, home first. */
export function trail(key) {
  const items = [];
  let cur = BY_KEY[key];
  while (cur) {
    items.unshift(cur);
    cur = cur.parent ? BY_KEY[cur.parent] : null;
  }
  return items;
}

export const SECTIONS = [
  ["product", "Product", ["windows", "linux", "extension", "adm", "whatsnew"]],
  ["features", "Features", ["youtube", "mp3", "playlist", "live", "torrent", "anysite"]],
  ["compare", "Compare", ["idm", "alternatives", "idmLinux", "idmVsFdm", "fdm", "xdm", "jdownloader", "fourk"]],
  ["help", "Help", ["help", "helpYoutube", "helpButton", "helpSmartscreen", "guides", "guideSchedule", "guideGrab"]],
];
