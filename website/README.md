# AyniteDM website

Landing page for AyniteDM by AyniteSoft: download button for the current Windows installer,
browser add-on setup, an installation guide and an FAQ. Built with React and Vite. No GitHub
links appear on the page; downloads come from your own download folder.

## How downloads work

`build/build.py` writes these files to `dist/` for every version:

| File | Purpose |
| --- | --- |
| `AyniteDM-Setup-<version>.exe` | the installer |
| `AyniteDM-Setup-<version>.exe.sha256` | its checksum |
| `update.json` | version, installer file name, size, date, checksum |
| `aynitedm-chrome-extension.zip` | add-on for Chrome, Edge, Brave |
| `aynitedm-firefox.xpi` | add-on for Firefox |

Upload all of them to one folder on your web server, for example
`https://aynitesoft.com/aynitedm/files/`, and set `VITE_DOWNLOAD_BASE` to that address. The page
reads `update.json` from there to show the version and link the installer, so a new version goes
live the moment you upload the new files; the site itself never needs a redeploy for that. The
installed app reads the same `update.json` to update itself (set `UPDATE_FEED_URL` in
`aynitedm/__init__.py` to `<that folder>/update.json`).

The build also copies the two add-on packages and `update.json` into `website/public/downloads/`,
so the site serves the add-ons directly and still shows a version if the download folder is on a
different domain without CORS headers.

If you prefer not to run your own file hosting, the same files can live in a public GitHub
"releases" repository; `VITE_DOWNLOAD_BASE` then is
`https://github.com/OWNER/REPO/releases/latest/download/`. The page still shows no GitHub wording.

## Hosting on GitHub Pages (github.io) for now

GitHub Pages serves the page for free; the installer is too large for Pages (100 MB limit) and
goes to GitHub Releases in the same public repository (2 GB per file). The page shows no GitHub
wording; only the download address contains github.com.

1. Create a **public** repository, for example `OWNER/aynitedm-releases`. Keep the source in the
   private repository; the workflows below push only built files to the public one.
2. In the private repository (Settings > Secrets and variables > Actions):
   - Variables: `RELEASE_REPO` = `OWNER/aynitedm-releases`, `PAGES_REPO` = `OWNER/aynitedm-releases`,
     `DOWNLOAD_BASE` = `https://github.com/OWNER/aynitedm-releases/releases/latest/download/`,
     `BASE_PATH` = `/aynitedm-releases/`, `SUPPORT_URL` = `https://aynitesoft.com`.
   - Secret: `RELEASE_TOKEN` = a fine-grained personal access token with Contents read/write on the
     public repository.
3. In the public repository: Settings > Pages > Source "Deploy from a branch", branch `gh-pages`.
4. Publish a version: bump `APP_VERSION`, tag `vX.Y.Z`, push. The Release workflow builds and uploads
   the installer, `update.json` and the add-ons to the public repository; the Website workflow then
   builds the page with the current add-ons and pushes it to `gh-pages`.
5. The page is live at `https://OWNER.github.io/aynitedm-releases/`. In the app set
   `UPDATE_FEED_URL = "https://github.com/OWNER/aynitedm-releases/releases/latest/download/update.json"`
   and `WEBSITE_URL = "https://OWNER.github.io/aynitedm-releases/"`.
6. Later, for `aynitedm.AyniteSoft`: add a CNAME record pointing at `OWNER.github.io`, set the
   variable `PAGES_CNAME` to the domain, change `BASE_PATH` to `/`, and set the custom domain in the
   public repository's Pages settings. Moving to Vercel or your own server later only means
   changing `VITE_DOWNLOAD_BASE`; nothing else on the page depends on where it is hosted.

If the source repository is public anyway, leave `PAGES_REPO` and `RELEASE_REPO` unset: releases
and Pages are then created in the same repository (Settings > Pages > Source "GitHub Actions").

## Run locally

```
cd website
npm install
cp .env.example .env     # then set VITE_DOWNLOAD_BASE
npm run dev
```

## Deploy on Vercel

1. Push the repository (it can stay private) to GitHub, GitLab or Bitbucket.
2. In Vercel, **Add New Project**, import it, and set **Root Directory** to `website`. Vercel detects
   Vite; build command `npm run build`, output `dist` (also pinned in `vercel.json`).
3. Under **Environment Variables** add `VITE_DOWNLOAD_BASE` and `VITE_SUPPORT_URL`, plus
   `VITE_CHROME_STORE_URL` and `VITE_FIREFOX_ADDON_URL` once the add-ons are published.
4. Deploy. Point a domain such as `aynitedm.AyniteSoft` at the project in Vercel's Domains tab.
