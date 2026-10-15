import { chromiumPage } from "./_browser.js";

export default chromiumPage({
  key: "chrome",
  name: "Google Chrome",
  possessive: "Chrome's",
  extensionsPage: "chrome://extensions",
  others: ["edge", "brave", "firefox"],
  specifics: [
    {
      h2: "What is different in Chrome",
      p: [
        "Chrome installs add-ons per profile. If you use several Chrome profiles (work and private, say), load the add-on in each profile where you want the Download button; ADM's popup shows Connected in each of them.",
        "Chrome shows a notice about developer mode extensions when it starts, for any add-on loaded from a folder. Click Cancel to keep the add-on; the notice stops once the add-on is installed from the Chrome Web Store.",
        "When ADM takes a download, Chrome's download bubble shows that file as cancelled: Chrome handed it to ADM and dropped its own copy. That is expected; the file is in ADM's list.",
      ],
    },
  ],
  extraFaq: [
    ["Does it work in Chromium, Chrome Beta and Canary?", "Yes. The same package loads in Chromium and in every Chrome channel; ADM detects Chromium on Linux too."],
    ["Does it work in incognito windows?", "Only if you allow it: open the add-on's details on chrome://extensions and switch on Allow in Incognito."],
  ],
});
