import { chromiumPage } from "./_browser.js";

export default chromiumPage({
  key: "brave",
  name: "Brave",
  possessive: "Brave's",
  extensionsPage: "brave://extensions",
  others: ["chrome", "edge", "firefox"],
  specifics: [
    {
      h2: "What is different in Brave",
      p: [
        "Brave Shields block trackers and ads on the sites you visit. They do not touch the add-on, which talks only to your own computer, so the Download button and the Connected status work with Shields up.",
        "Brave opens magnet links in its own built-in torrent viewer by default. To send magnet links to ADM instead, turn off WebTorrent under brave://settings/extensions. Torrent files and the Download button on videos are not affected by that setting.",
        "Brave's Developer mode and Load unpacked work exactly as in Chrome, and the notice about developer mode extensions appears here too until the add-on comes from the Chrome Web Store, which Brave uses as its add-on store.",
      ],
    },
  ],
  extraFaq: [
    ["Do Brave Shields block the Download button?", "No. Shields act on the website's own scripts; the add-on's button and its local connection to ADM are unaffected."],
    ["Why do magnet links open in Brave instead of ADM?", "Brave's built-in WebTorrent viewer claims them. Turn it off under brave://settings/extensions and magnet links go to ADM."],
  ],
});
