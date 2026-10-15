export default {
  key: "extension",
  updated: "15 October 2026",
  h1: "Aynite Download Manager browser extension for Chrome, Edge, Brave and Firefox",
  lead: "The add-on works together with the Aynite Download Manager (ADM) program on your computer, in Google Chrome, Microsoft Edge, Brave and Firefox, on Windows and Linux. It puts a Download button on every video, adds Download with ADM to the right-click menu, and can take over the browser's own downloads so they finish faster and can be paused and resumed.",
  download: "windows",
  sections: [
    {
      h2: "What the add-on does",
      list: [
        "Shows a Download button when you hover a video. Its arrow opens the quality list: every size the site offers, up to 4K, plus audio-only MP3 and M4A.",
        "Adds three entries to the right-click menu: Download with ADM for a link, picture or video; Download video from this page; and Download all links on this page, which opens the [Grabber](key:guideGrab).",
        "Can take over the browser's normal downloads, so a file you click starts in ADM with several connections instead of in the browser's download panel. This is a switch in the popup; leave it off if you prefer.",
        "Shows Connected in its popup while ADM is running, with the version number, and Disconnected when it is not.",
        "Passes your sign-in to ADM for videos that need it, but only when you start a download from that page and only if Send cookies for protected files is on in the popup.",
        "Tells you when a video is protected by DRM (Netflix, Prime Video, Disney+) instead of staying silent: no download manager can save those.",
      ],
      shot: { src: "screenshots/youtube-button.jpg", alt: "The Download button of Aynite Download Manager over a YouTube video with the quality list open", eager: true },
    },
    {
      h2: "Chrome, Edge and Brave",
      p: [
        "The three Chromium browsers share one package. ADM sets it up for you: choose Tools, then Install Browser Add-on, and it opens the right page in each browser it found, together with the folder to load. The same steps by hand:",
      ],
      steps: [
        ["Get the package", "Download the [add-on for Chrome, Edge and Brave](asset:downloads/adm-chrome-extension.zip) and unzip it into a folder you will keep, for example Documents\\ADM add-on."],
        ["Load it", "Open the browser's extensions page (chrome://extensions, edge://extensions or brave://extensions), turn on Developer mode in the top right, click Load unpacked and choose that folder."],
        ["Pin it", "Click the puzzle-piece icon in the toolbar and pin Aynite Download Manager. Its popup says Connected while ADM is running."],
      ],
      after: [
        "Step-by-step pages for each browser: [Chrome](key:chrome), [Microsoft Edge](key:edge) and [Brave](key:brave).",
      ],
    },
    {
      h2: "Firefox",
      steps: [
        ["Get the add-on", "Download [the add-on for Firefox](asset:downloads/adm-firefox.xpi)."],
        ["Install it", "Open Firefox's Add-ons and themes page from the menu, click the gear icon, choose Install Add-on From File, and pick the downloaded file."],
        ["If Firefox says the add-on could not be verified", "Regular Firefox installs only add-ons that Mozilla has signed. Until that signature is in place, the Developer Edition and ESR editions of Firefox can install it after you switch on unverified add-ons in their settings (about:config, xpinstall.signatures.required set to false)."],
      ],
      after: ["The [Firefox page](key:firefox) has the details, including Firefox on Linux."],
    },
    {
      h2: "Permissions and privacy",
      p: [
        "The add-on asks for the permissions it needs to do its job and nothing more. The browser lists them when you install it:",
      ],
      list: [
        "Read and change data on all websites: to find the video and the links on the page you are looking at, so the Download button and the Grabber can work. Nothing is sent anywhere but ADM.",
        "Downloads: to hand a browser download to ADM when Take over browser downloads is on.",
        "Cookies: to pass your sign-in to ADM for a video that needs it, only when you start that download and only while Send cookies for protected files is on.",
        "Tabs, web requests and navigation: to notice when a page starts playing media and to find the stream pieces it loads.",
        "Context menus and storage: for the right-click entries and for the add-on's own two switches.",
        "The address 127.0.0.1: your own computer, where ADM listens. The add-on talks to no other address.",
      ],
      after: [
        "Nothing is sent to AyniteSoft or anyone else, and the add-on keeps no history. The [privacy policy](asset:privacy.html) spells this out.",
      ],
    },
    {
      h2: "Take over browser downloads, or not",
      p: [
        "With Take over browser downloads on, every file you click in the browser opens in ADM: it is fetched with several connections, sorted into the right folder, scanned when it is done, and can be paused and resumed. With the switch off, the browser keeps its own downloads and the add-on only adds the Download button on videos and the right-click entries.",
        "Downloads started inside other programs cannot be caught by any add-on. For those, copy the link and paste it into Add URL with Alt+Shift+D; with the clipboard watch turned on in Options, ADM opens by itself as soon as the link is copied.",
      ],
    },
    {
      h2: "Not working?",
      list: [
        "The popup says Disconnected: ADM is not running, or something is blocking its local connection. [What to check](key:helpDisconnected).",
        "There is no Download button on a video: the video may be protected, need a sign-in, or live inside a player the add-on does not see yet. [Causes and fixes](key:helpButton).",
        "Chrome shows a notice about developer mode extensions at start: that is Chrome's standard message for any add-on loaded from a folder. Click Cancel to keep the add-on; it goes away once the add-on is installed from the Chrome Web Store.",
      ],
    },
  ],
  faq: [
    ["Does the add-on download files itself?", "No. It hands links and videos to the ADM program on the same computer, which does the downloading. Without ADM running, the add-on shows Disconnected and does nothing."],
    ["Which browsers work?", "Google Chrome, Microsoft Edge, Brave and Chromium, on Windows and Linux, including Flatpak and Snap builds. Firefox: the Developer Edition and ESR editions (including the firefox-esr that Debian ships) install the add-on today after you allow unsigned add-ons; regular Firefox, including Ubuntu's Snap and the Flathub build, accepts it once Mozilla has signed it."],
    ["Does it work in Opera, Vivaldi or other Chromium browsers?", "The Chrome package can usually be loaded unpacked in them, but ADM sets up and tests only Chrome, Edge, Brave and Firefox."],
    ["Does the add-on slow the browser down?", "No. It does nothing until you hover a video, right-click, or start a download; it keeps no history and runs no background work."],
    ["Will it break when the browser updates?", "No. The add-on uses the standard extension interfaces of Chrome and Firefox. Video sites change more often than browsers do, and that part updates inside ADM in seconds."],
  ],
  related: ["chrome", "edge", "brave", "firefox", "helpDisconnected", "helpButton"],
};
