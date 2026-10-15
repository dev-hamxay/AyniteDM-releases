import { chromiumPage } from "./_browser.js";

export default chromiumPage({
  key: "edge",
  name: "Microsoft Edge",
  possessive: "Edge's",
  extensionsPage: "edge://extensions",
  others: ["chrome", "brave", "firefox"],
  specifics: [
    {
      h2: "What is different in Edge",
      p: [
        "Edge takes add-ons from the Microsoft Edge Add-ons store and, after you allow it on edge://extensions (Allow extensions from other stores), from the Chrome Web Store as well. Once the ADM listing is live in either, installing is one click; until then, load the folder with Developer mode as described above.",
        "Edge's Downloads panel keeps files that ADM did not take, for example files a web app saves rather than links you click. Copy their address and paste it into Add URL (Alt+Shift+D); with the clipboard watch turned on in Options, ADM opens by itself when a link is copied. Files ADM takes appear in the panel as cancelled, because Edge handed them over.",
        "Edge on Linux works the same way, and ADM for Linux detects it. Edge's own download acceleration and its built-in PDF viewer are not affected by the add-on; a PDF you open inline stays in Edge, a PDF you download goes to ADM when the switch is on.",
      ],
    },
  ],
  extraFaq: [
    ["Does Edge's built-in download manager conflict with ADM?", "No. With Take over browser downloads on, Edge hands the file to ADM and shows it as cancelled in its own panel; with the switch off, Edge keeps its downloads and the Download button on videos still works."],
    ["Does it work in InPrivate windows?", "Only if you allow it: open the add-on's details on edge://extensions and switch on Allow in InPrivate."],
  ],
});
