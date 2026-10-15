export default {
  key: "helpButton",
  updated: "14 October 2026",
  h1: "No Download button on a video in Aynite Download Manager: causes and fixes",
  lead: "The Aynite Download Manager add-on shows a Download button when you hover a video. When it does not, one of five things is going on. Here is how to tell which, from the most common to the rarest, and what to do about each.",
  sections: [
    {
      h2: "1. ADM is not running",
      p: [
        "Click the ADM icon in the browser's toolbar. If the popup says Disconnected, the program is not running or cannot be reached. Start ADM from the Start menu or your application menu; the popup turns to Connected within a second and the button appears on the next video you hover. [If it stays Disconnected](key:helpDisconnected).",
      ],
    },
    {
      h2: "2. The add-on is not installed in this browser",
      p: [
        "The add-on is installed per browser, and per profile in Chrome and Edge. If there is no ADM icon in the toolbar at all, open Tools, then Install Browser Add-on in ADM and follow the steps for this browser. [The add-on page](key:extension) has them too.",
      ],
    },
    {
      h2: "3. The video is protected (DRM)",
      p: [
        "Netflix, Prime Video, Disney+, Apple TV, and some rentals, sports passes and premium videos on other sites are encrypted. The browser decrypts them only inside a locked player, so no download manager can save them, and getting around the protection is illegal in most countries. The add-on tells you when it detects a protected video instead of staying silent.",
      ],
    },
    {
      h2: "4. The video needs a sign-in",
      p: [
        "Age-restricted, members-only, private or paid videos show a button, but the download fails or lists no qualities unless ADM has your sign-in. Start the download from the video page while you are signed in to the site, with Send cookies for protected files switched on in the add-on's popup. Your sign-in stays on your computer; it is passed to ADM for that download only.",
      ],
    },
    {
      h2: "5. A player the add-on cannot see yet",
      p: [
        "Some pages load the video only after you press play, or inside a player the add-on does not recognise. Press play, then hover again. If the button still does not appear, right-click the page and choose Download video from this page, which asks ADM to look at the page itself; or copy the page's address and paste it into ADM. If a site that worked last week has no button today, the site probably changed: [update the video-site support](key:helpYoutube).",
      ],
    },
    {
      h2: "Live streams",
      p: [
        "Live videos do show the button. Picking a quality starts a [recording](key:live) that runs until you press Stop or the broadcast ends.",
      ],
    },
  ],
  faq: [
    ["Why is there a button on YouTube but not on another site?", "Either the site is not among the supported ones yet, or its player hides the video from the add-on. Try Download video from this page from the right-click menu, or paste the page's address into ADM."],
    ["Why does the button appear and then the download fails?", "Most often a site change (update the video-site support) or a sign-in requirement (start from the page while signed in, with cookies on)."],
    ["Can I download from Netflix with a different tool?", "No tool can, legitimately. Those videos are encrypted and only the official player decrypts them."],
    ["Does the button work in private or incognito windows?", "Only if the browser allows the add-on in those windows: Chrome, Edge and Brave have a switch for that on the add-on's details page; Firefox asks when you install it."],
  ],
  related: ["helpDisconnected", "helpYoutube", "extension", "anysite", "help"],
};
