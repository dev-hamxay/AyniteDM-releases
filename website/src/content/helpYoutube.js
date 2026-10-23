export default {
  key: "helpYoutube",
  updated: "14 October 2026",
  h1: "YouTube downloader not working? Causes and fixes for every tool, including Aynite Download Manager",
  lead: "A video that downloaded last week fails today, the button lists no qualities, or an online converter just spins. This happens to every YouTube downloader, because YouTube changes how it serves video every few weeks. Here is what the common error messages mean, the fix for each kind of tool, and the one-minute fix in Aynite Download Manager (ADM).",
  sections: [
    {
      h2: "Why every YouTube downloader breaks now and then",
      p: [
        "YouTube changes its pages and its video addresses often, partly on purpose, and any program that reads them has to be updated to follow. The difference between tools is how fast that update arrives and how much of it is left to you. Online converters go dark for days; ADM checks for a new version on every start and every few hours and installs it silently in place, so the fix reaches you without a trip to a download page.",
      ],
    },
    {
      h2: "What the error messages mean",
      table: {
        cols: ["Message", "What it means", "What to do"],
        rows: [
          ["403 Forbidden, or \"unable to download\"", "YouTube changed something and the tool is sending outdated requests", "Update the tool (see Fixes by tool). If no update is out yet, try again later"],
          ["\"Sign in to confirm you're not a bot\"", "YouTube wants a signed-in browser session, usually after many downloads from one address, or on a VPN or shared network", "Download from the video page while signed in, with the add-on passing your sign-in (in ADM: Send cookies for protected files). Wait an hour; avoid VPN exits many people share"],
          ["Age restricted, members only, private", "The video needs your sign-in", "Same as above: start from the page while signed in"],
          ["No qualities listed, or only tiny ones", "The tool read the page but not the stream list; a site change", "Update the tool, then reload the page and hover the video again"],
          ["Parse error, \"unable to extract\", \"cannot parse data\"", "The page layout changed", "Update the tool; this is the classic site change"],
          ["Download stops at 0% or stalls", "Blocked by an ad blocker, a VPN or security software, or a full disk", "Allow the tool in your security software, pause the VPN, check free space"],
          ["\"Video unavailable\" in the tool but it plays in the browser", "A regional block or a sign-in requirement", "Start from the browser page while signed in; a VPN from a different region may be the cause rather than the cure"],
        ],
      },
    },
    {
      h2: "Fixes by tool",
      list: [
        "Aynite Download Manager: Tools, then Check for Updates, then Download and install if a new version is offered. It installs silently and ADM restarts by itself; ADM also checks on every start and every few hours.",
        "Command-line downloaders: run their update command; most site fixes land within days of a change.",
        "4K Video Downloader, Free Download Manager, XDM, JDownloader and other programs: install the latest version from the maker's site, not from a mirror; most fixes ship as program updates.",
        "Online converters: there is nothing to update on your side. If one fails, it is down for everyone until its operator fixes it; try later or use a program on your own computer.",
        "Internet Download Manager: update IDM; if the download panel stopped appearing, IDM's own FAQ covers re-enabling its browser module.",
        "Browser extensions alone: they cannot download YouTube in most browsers by design; they need a program on the computer, as ADM's add-on does.",
      ],
    },
    {
      h2: "The one-minute fix in Aynite Download Manager",
      steps: [
        ["Open Tools, then Check for Updates", "ADM looks for a newer version straight away. Fixes for site changes come with new versions of ADM."],
        ["Install the new version", "If one is offered, click Download and install. The installer runs silently, ADM restarts by itself, and downloads that were running continue. On Linux the new package opens in your software installer."],
        ["Try the video again", "Press Resume on the failed download, or hover the video and click Download again. In most cases it works at once."],
      ],
      after: [
        "ADM also checks for a new version by itself on every start and every few hours and tells you when one is waiting, so most of the time the fix is already in place before you notice a problem.",
      ],
    },
    {
      h2: "Still failing after the update?",
      list: [
        "The video is protected by DRM (Netflix, Prime Video, Disney+, and some rentals and premium content on other sites). No downloader can save those; the add-on says so when it can tell. [More on the Download button](key:helpButton).",
        "The video needs a sign-in: age-restricted, members-only or private. Start the download from the video page while you are signed in, with Send cookies for protected files on in the add-on's popup. Pasting the link into ADM without the add-on does not carry your sign-in.",
        "The site changed again very recently and the fix is not out yet. ADM tells you as soon as a new version is ready; you can also check Tools, then Check for Updates again later.",
        "Your connection or a proxy is in the way: the download's status column shows a connection error rather than a site error. Check Options, then Proxy and Logins, and try another network.",
      ],
    },
    {
      h2: "If your tool takes weeks to catch up",
      p: [
        "That is the one thing that separates downloaders over time. ADM looks for its own updates on every start and every few hours and installs them silently in place, and site fixes come with them; [how ADM downloads YouTube videos in 4K, 1080p or as MP3](key:youtube). Report a video that still fails after the update, with its link and the text from the status column, to [support](https://aynitesoft.com); most such reports become a fix in the next ADM update.",
      ],
    },
  ],
  faq: [
    ["Why did my YouTube downloader stop working?", "Because YouTube changes its pages and video addresses often, and every downloader has to follow. Update the tool; if it is an online converter, wait for its operator."],
    ["Do I need to reinstall Aynite Download Manager when YouTube changes?", "No. The fix comes with the next ADM update: Tools, then Check for Updates installs it silently in place and ADM restarts by itself, with your downloads and settings kept."],
    ["Why does YouTube say \"Sign in to confirm you're not a bot\"?", "It has seen many downloads from your address, or you are on a VPN or shared network. Download from the page while signed in, and wait an hour before trying again."],
    ["Does this also fix TikTok, Instagram, Twitter/X and other sites?", "Yes. In ADM the same video-site support covers all of them, so one update fixes whichever site changed."],
    ["How often should I check for updates?", "In ADM you do not have to: it checks on every start and every few hours and tells you. Checking by hand only helps on the day a site breaks."],
  ],
  related: ["helpButton", "youtube", "anysite", "help"],
};
