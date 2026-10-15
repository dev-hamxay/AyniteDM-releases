import { debPage } from "./_linux.js";

export default debPage({
  key: "ubuntu",
  name: "Ubuntu",
  versions: "Ubuntu 22.04 LTS, 24.04 LTS and every release since",
  opener: "Double-click the file. On Ubuntu 24.04 and newer the App Center shows ADM and asks for your password once; on 22.04 it is Ubuntu Software. If the file opens in Archive Manager instead, right-click it and choose Open With, then Software Install.",
  snapNote: ", and the Snap build of Chromium that Ubuntu ships",
  others: ["mint", "debian", "fedora"],
  specifics: [
    {
      h2: "What is different on Ubuntu",
      p: [
        "Ubuntu ships Firefox and Chromium as Snap packages. Chromium from Snap takes the add-on like any other Chromium: ADM detects it, opens its extensions page, and the add-on connects normally. Firefox from Snap is the regular edition, which accepts only add-ons signed by Mozilla; until the ADM add-on is signed, use Chromium, Chrome or Brave on Ubuntu, or Firefox Developer Edition or ESR.",
        "Ubuntu's GNOME desktop ships with the AppIndicator extension enabled, so ADM's tray icon appears at the top right out of the box. Kubuntu, Xubuntu, Ubuntu MATE and Ubuntu Budgie use the same package and show the icon in their own panels.",
        "The App Center lists Snaps first and installs a .deb only when you open the file yourself, which is why ADM comes as a download rather than a store entry. Ubuntu's own updater does not touch it; ADM checks for its updates itself and offers the new package.",
      ],
    },
  ],
  extraFaq: [
    ["Does it work on Ubuntu 20.04?", "No. Ubuntu 20.04 lacks a library the program needs; 22.04 LTS is the oldest supported release."],
    ["Is the Snap version of Firefox a problem?", "For now, yes: Ubuntu's Firefox is the regular edition and refuses add-ons that Mozilla has not signed. Until the ADM add-on is signed, use Chromium (also a Snap, which works), Chrome or Brave, or Firefox Developer Edition or ESR. ADM detects all of them."],
    ["Can I install it from the terminal?", "Yes: sudo apt install ./adm_<version>_amd64.deb in the download folder. apt brings in the torrent engine with it."],
  ],
});
