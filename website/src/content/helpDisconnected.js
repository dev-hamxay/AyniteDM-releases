export default {
  key: "helpDisconnected",
  updated: "14 October 2026",
  h1: "The Aynite Download Manager add-on says Disconnected: what to check",
  lead: "The Aynite Download Manager add-on talks to the ADM program on your own computer. When the popup says Disconnected, the program is not running or the add-on cannot reach it. Work through these checks in order; the first two cover almost every case.",
  sections: [
    {
      h2: "1. Is ADM running?",
      p: [
        "Look for the ADM icon in the system tray (Windows: the arrow at the right of the taskbar; Linux: your desktop's tray area). If it is not there, start ADM from the Start menu or your application menu. The popup turns to Connected within a second. If you want ADM to be there whenever you need it, turn on Start with Windows (or with your session) in Options.",
      ],
    },
    {
      h2: "2. Did you close the window rather than exit?",
      p: [
        "Closing ADM's window keeps it running in the tray, which is what you want: the add-on keeps working. Exit from the tray icon's menu stops it, and the add-on shows Disconnected until the next start.",
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
        "Browsers installed from Flatpak or Snap can reach local connections normally, so they work with the add-on. If the tray icon is missing on GNOME, ADM is still running; the popup should say Connected regardless.",
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
