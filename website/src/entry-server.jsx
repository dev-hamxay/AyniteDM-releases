// Build-time rendering: every page is rendered to HTML once, so the files on the server already contain the
// content (headline, features, download links, FAQ) before any script runs. The browser then takes over.
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import IdmAlternative from "./pages/IdmAlternative.jsx";
import LinuxPage from "./pages/LinuxPage.jsx";
import YoutubeGuide from "./pages/YoutubeGuide.jsx";

export const PAGES = [
  { key: "home", file: "index.html" },
  { key: "idm", file: "idm-alternative/index.html" },
  { key: "linux", file: "linux/index.html" },
  { key: "youtube", file: "youtube-4k-downloader/index.html" },
];

const COMPONENTS = { home: App, idm: IdmAlternative, linux: LinuxPage, youtube: YoutubeGuide };

export function render(key) {
  const Page = COMPONENTS[key];
  return renderToString(<Page />);
}
