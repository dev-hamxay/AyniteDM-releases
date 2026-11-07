export default {
  key: "whatsnew",
  updated: "6 November 2026",
  h1: "What's new in Aynite Download Manager",
  lead: "Every version of Aynite Download Manager (ADM) and its browser add-on, newest first. ADM installs its updates by itself, silently and in place; each version brings the latest support for video sites.",
  download: "windows",
  cta: false,
  sections: [
    {
      h2: "1.7.0 and browser add-on 1.4.0 (6 November 2026)",
      list: [
        "Aynite Download Manager is now free to download and use, with every feature and no limits. The free version shows one small ad inside the program; a licence removes it. Buy a licence, then enter it under Help, then Activate Licence.",
        "Subtitles: choose one or more languages when you add a video, then save them as SRT or VTT files or keep them inside the video. Automatic captions are offered too and are marked as automatic.",
        "Title, channel, date, chapters and cover art can now be written into the file, for videos and for MP3 and M4A audio. Both are on by default, and you can turn them off in the Add window.",
        "MKV: save videos as MP4 or MKV. MKV takes the best streams a site offers, which on many sites is better than what fits in MP4.",
        "Recordings can stop by themselves: in the Add window, set a length, such as 1 hour 30 minutes, or a time of day. ADM stops and keeps the file. A recording still ends when the broadcast does.",
        "File name rules: build names from the title, channel, date, quality and more. Playlists can be numbered, and {episode} gives names such as S01E03. Set a rule in the Add window or in Options.",
        "If subtitles or cover art cannot be fetched, the video still downloads and ADM tells you what is missing.",
        "Fixed: a title with a dot in it, such as Mr. Beast, could lose everything after the dot in the suggested file name.",
        "Click a magnet link in your browser and the torrent starts in ADM straight away. The same goes for a link to a .torrent file. You get a small progress window and a notice, with no questions in between.",
        "Open .torrent files: double-click one, drag it onto the window, use Tasks, then Open Torrent File, or the button in Add URL. ADM keeps its own copy, so the download can still resume if the original file is deleted.",
        "Magnet links on a page now appear in the grabber, so you can queue them together with the page's other links.",
        "ADM starts with your computer and waits in the system tray, so it is ready for the browser. You can turn this off in Options.",
        "When ADM is closed, or was ended in Task Manager, sending it a link starts it and the link goes through. You no longer see \"Could not reach ADM\".",
        "Zoom recordings: paste a recording link or use the Download button on its page, then choose screen and camera, screen only, camera only or audio. If the recording has a passcode, ADM asks for it.",
        "Fixed: downloads saved to a folder you picked could end with \"Threat detected by Windows Defender\" when nothing was found. The scan had failed, and ADM reported that as a threat. ADM now scans these files properly and corrects rows that were marked wrongly.",
        "Fixed: downloads that were running when ADM updated could stay paused. They now continue by themselves.",
        "A torrent now shows Connecting until data starts to flow, instead of Downloading at 0%.",
        "To get these browser features, remove the old add-on from your browser and install it again from ADM, once. ADM reminds you the first time it opens after the update.",
      ],
    },
    {
      h2: "1.4.3 (23 October 2026)",
      list: [
        "One update for everything: each ADM version now carries the latest support for video sites, and the Updates window only shows ADM itself. The separate video-site update and its restart are gone.",
        "This version brings the newest video-site support, with the latest fixes for YouTube and other sites.",
      ],
    },
    {
      h2: "1.4.2 and browser add-on 1.3.2 (23 October 2026)",
      list: [
        "The Download button over a video on a home feed, channel, profile or search page downloads that one video. Before, on the YouTube home page it could send the whole page, which opened a list of hundreds of recommended videos.",
        "Pages with many videos, such as a GitHub project page or an article: each player downloads its own file, named as the page shows it, and its list no longer repeats the other players' files.",
        "GitHub videos keep downloading when the page has been open for a while; before, their links ran out after five minutes.",
      ],
    },
    {
      h2: "Browser add-on 1.3.1 (22 October 2026)",
      list: [
        "TikTok, YouTube Shorts, Facebook and Instagram feeds: the Download button always takes the video under your pointer. Before, after scrolling to the next video it could still download the previous one.",
        "Scrolling with the mouse wheel or the arrow keys moves the button to the new video, without moving the mouse.",
        "YouTube's mini-player and the previews that play when you hover a thumbnail download their own video, not the page you are on.",
        "Videos playing in Instagram's Explore and profile grids download their own post.",
        "On other sites, the media list puts the video playing now first, and long feeds no longer stop adding videos after the first forty.",
      ],
    },
    {
      h2: "1.4.1 (15 October 2026)",
      list: [
        "The Add window lists every video of a playlist with a tick box, with Select all and Select none; untick what you do not want and the rest are queued.",
        "Videos the playlist page hides because they are removed, private or blocked in your country are found in the background and unticked, greyed, with the reason on hover, so the list matches what YouTube shows.",
        "A link sent from the browser add-on brings ADM out of the tray and opens the Add window on top of the browser, so the download is one click away.",
        "ADM no longer opens by itself every time a link is copied. The clipboard watch is off, and switched off once on copies that had it on; turn it on in Options if you want copied links picked up.",
      ],
    },
    {
      h2: "1.4.0 (14 October 2026)",
      list: [
        "New name: Aynite Download Manager, ADM for short. The program file, the folders and the browser add-on carry the new name; an existing installation is moved to the new folders on first start, with the download list and settings intact.",
        "Videos served as encrypted streams, used by some course platforms and video hosts, now download; before, they failed with an error.",
        "Live recordings and video downloads cope with the unusual file names some hosts use.",
        "Error messages from the video tool are in plain words.",
        "Browser add-on 1.3.0 with the new name.",
      ],
    },
    {
      h2: "1.3.9 to 1.3.12 (11 to 14 October 2026)",
      list: [
        "The windows and the add-on popup no longer show technical details; tool names are replaced by plain words.",
        "ADM checks for a new version of itself on every start, then every few hours.",
        "Installers downloaded for an update are removed afterwards.",
        "Browser add-on 1.2.4 and 1.2.5: videos in social feeds route to the post's own link; stream pieces are never listed in the media list, and stale lists are dropped on update.",
      ],
    },
    {
      h2: "1.3.5 to 1.3.8 (11 October 2026)",
      list: [
        "Silent self-update: the program closes, the installer runs quietly, and the new version starts by itself; downloads that were running continue.",
        "Update alerts on every copy, with a banner above the list and a tray notice.",
      ],
    },
    {
      h2: "1.3.4 (10 October 2026)",
      list: [
        "The browser add-on says when a video is protected (DRM) instead of staying silent. Add-on 1.2.2.",
      ],
    },
    {
      h2: "1.3.3 (9 October 2026)",
      list: [
        "First Linux release: a .deb package for Ubuntu, Linux Mint and Debian, and an archive for other distributions, with the same browser add-on flow.",
      ],
    },
    {
      h2: "1.3.2 (9 October 2026)",
      list: [
        "Alt+Shift+D adds a download from anywhere; it is the only keyboard shortcut.",
      ],
    },
    {
      h2: "1.3.1 (8 October 2026)",
      list: [
        "Live stream recording with a Stop button, saved as MP4.",
        "The update check is built into the program; nothing to configure.",
        "Window buttons tidied.",
      ],
    },
    {
      h2: "1.3.0 (8 October 2026)",
      list: [
        "New name AyniteDM (previously SwiftDM), this website, and automatic releases with the built-in updater.",
      ],
    },
  ],
};
