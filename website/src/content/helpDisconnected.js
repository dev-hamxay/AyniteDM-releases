export default {
  key: "helpDisconnected",
  updated: "5 November 2026",
  h1: "The Aynite Download Manager add-on says Disconnected: what to check",
  lead: "The Aynite Download Manager add-on talks to the ADM program on your own computer. ADM starts with your computer, and if it is closed, the add-on starts it as soon as you send a link. If the add-on still reports that it could not start ADM, work through these checks in order; the first two cover almost every case.",
  sections: [
    {
      h2: "1. Is your add-on or ADM older than this feature?",
      p: [
        "Starting ADM from the browser needs ADM 1.5.0 or newer and add-on 1.4.0 or newer. Update ADM, then remove the old add-on from your browser's extensions page and install it again from Tools, then Install Browser Add-on. You only need to do this once.",
      ],
    },
    {
      h2: "2. Has ADM been opened once since it was installed?",
      p: [
        "The add-on starts the copy of ADM that last registered itself. Start ADM once from the Start menu or your application menu; the popup turns to Connected within a second, and from then on it starts by itself. Closing the window keeps ADM in the tray. Exit from the tray icon's menu stops it until the next link, the next start of your computer, or until you open it yourself. To stop it starting with your computer, turn off Start with Windows (or with your session) in Options.",
      ],
    },
    {
      h2: "3. Another program is holding ADM's connection",
      p: [
        "The add-on reaches ADM through one local connection on your computer. If another program took it first, ADM says so when it starts: \"Close that program and restart ADM\". Do that, and the add-on reconnects. This is rare and only ever involves programs on your own PC; nothing from the network is involved.",
      ],
    },
    {
      h2: "4. Security software blocking local connections",
      p: [
        "The add-on connects to 127.0.0.1, the address of your own computer. A firewall that blocks local connections, which is unusual, shows Disconnected even though ADM is running. Allow ADM in the firewall, or add an exception for local connections.",
      ],
    },
    {
      h2: "5. Reinstall the add-on",
      p: [
        "If the add-on was installed before a browser update or from an old package, open Tools, then Install Browser Add-on in ADM and follow the steps for your browser again. Remove the old copy from the browser's extensions page first. [The add-on page](key:extension).",
      ],
    },
    {
      h2: "Linux notes",
      p: [
        "Browsers installed from Flatpak or Snap can reach local connections normally, so they work with the add-on while ADM is running, but their sandbox does not let them start programs: keep ADM running, or start it from your application menu. If the tray icon is missing on GNOME, ADM is still running; the popup should say Connected regardless.",
      ],
    },
  ],
  faq: [
    ["Does the add-on need the internet to connect to ADM?", "No. It connects to the program on the same computer. An offline PC still shows Connected."],
    ["Why does it say Connected but nothing happens when I click Download?", "Check ADM's window: the download is probably there, waiting in the queue or asking for a folder. Also check that the scheduler is not holding the queue."],
    ["Can two users on one PC run ADM at the same time?", "Each user runs their own copy with their own settings; the add-on in each user's browser talks to that user's copy."],
    ["Is this connection visible to other computers?", "No. It is bound to 127.0.0.1, which other machines cannot reach."],
  ],
  related: ["extension", "helpButton", "windows", "help"],
};
