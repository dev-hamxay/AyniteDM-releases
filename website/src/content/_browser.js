// One page per browser, from a template. The install mechanics are shared; each page adds its own section and
// questions (store, profiles, download panel, built-in features that interact with downloads) so that the pages
// differ in substance, not only in the name.
import { CHROME_STORE_URL, FIREFOX_ADDON_URL } from "../release.js";

const PACKAGE = "asset:downloads/adm-chrome-extension.zip";

export function chromiumPage({ key, name, possessive, extensionsPage, others, specifics = [], extraFaq = [], notes = [] }) {
  const store = CHROME_STORE_URL;
  const getIt = store
    ? `Open the [store listing](${store}) and click Add to ${name}. That is all; skip to step 3.`
    : `Download the [add-on package](${PACKAGE}) and unzip it into a folder you will keep, for example Documents\\ADM add-on. ADM can do this for you: choose Tools, then Install Browser Add-on, and it opens ${extensionsPage} and the folder.`;
  return {
    key,
    updated: "15 October 2026",
    h1: `Install the Aynite Download Manager add-on in ${name}`,
    lead: `With the add-on, ${name} shows a Download button on every video, offers Download with ADM in the right-click menu, and can hand its own downloads to Aynite Download Manager, where they run with several connections and can be paused and resumed. Windows and Linux.`,
    download: "windows",
    sections: [
      {
        h2: `Install it in ${name}`,
        steps: [
          ["Get the add-on", getIt],
          [`Load it in ${name}`, store ? "Nothing to do: the store installs it." : `Open ${extensionsPage}, turn on Developer mode in the top right, click Load unpacked and choose the folder you unzipped. The ADM icon appears in the toolbar.`],
          ["Pin it and check Connected", "Click the puzzle-piece icon in the toolbar and pin Aynite Download Manager. Click the icon: the popup says Connected to ADM with the version number while ADM is running. If it says Disconnected, [here is what to check](key:helpDisconnected)."],
        ],
      },
      ...specifics,
      {
        h2: `What changes in ${name}`,
        list: [
          "Hover any video and a Download button appears on the player. Its arrow opens the quality list: every size the site offers, up to 4K, plus audio-only MP3 and M4A.",
          "Right-click a link, picture or video and choose Download with ADM. The page's own right-click menu also gains Download video from this page and Download all links on this page.",
          `With Take over browser downloads switched on in the popup, a file you click in ${name} starts in ADM instead of in ${possessive} download panel.`,
          "The popup has the two switches that matter: Take over browser downloads, and Send cookies for protected files, which lets ADM save videos that need your sign-in.",
        ],
        shot: { src: "screenshots/youtube-button.jpg", alt: `The Aynite Download Manager Download button over a YouTube video in ${name}, with the quality list open`, eager: true },
      },
      {
        h2: "Download a video in 4K",
        p: [
          `Open the video in ${name}, hover the player, click the arrow next to Download and pick a quality, for example MP4 2160p60 for 4K. ADM downloads picture and sound and joins them into one MP4 in your Videos folder. Pick Audio only for MP3 or M4A. The full walk-through is in the [YouTube guide](key:youtube).`,
        ],
      },
      {
        h2: `Let ADM catch ${possessive} downloads`,
        p: [
          `Open the popup and switch on Take over browser downloads. From then on, a file you click in ${name} opens in ADM's Add Download window with the link, the file name and the folder for its type already filled in; press Start, or set it to start at once in Options. The file is fetched with up to 32 connections, sorted into Videos, Music, Documents, Programs, Compressed or Images, and scanned when it is done.`,
          `Prefer ${possessive} own download panel for everyday files? Leave the switch off. The Download button on videos and the right-click entries keep working either way.`,
        ],
      },
      {
        h2: "Troubleshooting",
        list: [
          "No Download button on a video: [the causes and the fixes](key:helpButton).",
          "The popup says Disconnected: [start ADM and check its connection](key:helpDisconnected).",
          ...notes,
        ],
      },
    ],
    faq: [
      [`Does the add-on work in ${name} on Linux?`, `Yes, exactly as on Windows. ADM for Linux detects ${name} and opens the right page.`],
      ...extraFaq,
      [`Can I keep some downloads in ${name}?`, "Yes. With Take over browser downloads on, ADM takes every file you click; switch it off in the popup at any time and the browser keeps them again. Videos through the Download button are not affected."],
      ["Does the add-on collect anything?", "No. It talks only to the ADM program on your own computer, keeps no history, and sends nothing to AyniteSoft or anyone else. See the [privacy policy](asset:privacy.html)."],
    ],
    related: ["extension", ...others, "youtube", "helpButton"],
  };
}

export function firefoxPage() {
  const store = FIREFOX_ADDON_URL;
  return {
    key: "firefox",
    updated: "14 October 2026",
    h1: "Install the Aynite Download Manager add-on in Firefox",
    lead: "With the add-on, Firefox shows a Download button on every video, offers Download with ADM in the right-click menu, and can hand its own downloads to Aynite Download Manager, where they run with several connections and can be paused and resumed. Windows and Linux. Until Mozilla has signed the add-on it installs in Firefox Developer Edition and ESR; regular Firefox accepts it once it is signed.",
    download: "windows",
    sections: [
      {
        h2: "Install it in Firefox",
        steps: [
          ["Get the add-on", store ? `Open the [listing on addons.mozilla.org](${store}) and click Add to Firefox.` : "Download [the add-on for Firefox](asset:downloads/adm-firefox.xpi). ADM can do this for you: choose Tools, then Install Browser Add-on, and it opens Firefox with the file."],
          ["Install it", "Open Firefox's Add-ons and themes page from the menu, click the gear icon, choose Install Add-on From File, and pick the downloaded file."],
          ["If Firefox says the add-on could not be verified", "Regular Firefox installs only add-ons that Mozilla has signed. Until that signature is in place, the Developer Edition and ESR editions of Firefox can install it after you switch on unverified add-ons in their settings (about:config, xpinstall.signatures.required set to false)."],
          ["Pin it and check Connected", "Right-click the ADM icon in the toolbar and choose Pin to Toolbar. Click the icon: the popup says Connected to ADM with the version number while ADM is running. If it says Disconnected, [here is what to check](key:helpDisconnected)."],
        ],
      },
      {
        h2: "What is different in Firefox",
        p: [
          "Firefox keeps its own download panel and its own rules for add-ons. Add-ons from outside addons.mozilla.org are accepted only by the Developer Edition, ESR and Nightly builds after you allow unverified add-ons, which is the one extra step above. Once the listing on addons.mozilla.org is live, regular Firefox installs it with one click.",
          "Firefox ESR, which Debian ships and many companies use, takes the add-on the same way. Firefox from Flatpak or Snap on Linux works too; ADM detects those builds.",
          "Several download managers offer no Firefox add-on at all, or an old one that only catches links. ADM's Firefox add-on does everything the Chrome one does: Download button on videos with the full quality list, right-click entries, and download takeover.",
        ],
      },
      {
        h2: "What changes in Firefox",
        list: [
          "Hover any video and a Download button appears on the player. Its arrow opens the quality list: every size the site offers, up to 4K, plus audio-only MP3 and M4A.",
          "Right-click a link, picture or video and choose Download with ADM. The page's own right-click menu also gains Download video from this page and Download all links on this page.",
          "With Take over browser downloads switched on in the popup, a file you click in Firefox starts in ADM instead of in Firefox's download panel.",
          "The popup has the two switches that matter: Take over browser downloads, and Send cookies for protected files, which lets ADM save videos that need your sign-in.",
        ],
        shot: { src: "screenshots/youtube-button.jpg", alt: "The Aynite Download Manager Download button over a YouTube video in Firefox, with the quality list open", eager: true },
      },
      {
        h2: "Download a video in 4K",
        p: [
          "Open the video in Firefox, hover the player, click the arrow next to Download and pick a quality, for example MP4 2160p60 for 4K. ADM downloads picture and sound and joins them into one MP4 in your Videos folder. Pick Audio only for MP3 or M4A. The full walk-through is in the [YouTube guide](key:youtube).",
        ],
      },
      {
        h2: "Let ADM catch Firefox's downloads",
        p: [
          "Open the popup and switch on Take over browser downloads. From then on, a file you click in Firefox opens in ADM's Add Download window with the link, the file name and the folder for its type already filled in; press Start, or set it to start at once in Options.",
          "Prefer Firefox's own download panel for everyday files? Leave the switch off. The Download button on videos and the right-click entries keep working either way.",
        ],
      },
      {
        h2: "Troubleshooting",
        list: [
          "No Download button on a video: [the causes and the fixes](key:helpButton).",
          "The popup says Disconnected: [start ADM and check its connection](key:helpDisconnected).",
          "Firefox refused the file: you are on regular Firefox, which accepts only add-ons from its own site. Use the Developer Edition or ESR edition until the listing is live, or use ADM without the add-on by copying links.",
        ],
      },
    ],
    faq: [
      ["Does the add-on work in Firefox on Linux?", "In Firefox ESR (the edition Debian ships) and Developer Edition today, after you allow unsigned add-ons; Firefox from Snap or Flatpak is the regular edition and accepts the add-on once Mozilla has signed it. ADM for Linux detects every Firefox and opens the right page."],
      ["Does the add-on work in private windows?", "Only if you allow it: Firefox asks when you install the add-on, and the setting is on the add-on's page under Add-ons and themes."],
      ["Does the add-on collect anything?", "No. It talks only to the ADM program on your own computer, keeps no history, and sends nothing to AyniteSoft or anyone else. See the [privacy policy](asset:privacy.html)."],
    ],
    related: ["extension", "chrome", "edge", "brave", "youtube", "helpButton"],
  };
}
