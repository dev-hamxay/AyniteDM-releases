export default {
  key: "playlist",
  updated: "15 October 2026",
  h1: "Download a whole YouTube playlist or channel with Aynite Download Manager",
  lead: "With Aynite Download Manager (ADM), paste the address of a playlist, or open the Grabber on the page, tick the videos you want and pick one quality for all of them. ADM queues them and downloads them in turn, in the quality you chose, up to 4K, or as MP3. Windows and Linux.",
  download: "windows",
  sections: [
    {
      h2: "Paste the playlist link",
      steps: [
        ["Copy the playlist address", "Any playlist or channel page on YouTube. Press Alt+Shift+D and paste it, or send the page from the browser add-on. With the clipboard watch turned on in Options, ADM opens by itself when the link is copied."],
        ["Tick the videos", "ADM lists every video in the playlist with its title. Tick the ones you want, or Select all."],
        ["Pick one quality", "Choose a quality once, up to 4K, or Audio only. Every ticked video is queued with that choice and downloads one after another."],
      ],
    },
    {
      h2: "Or use the Grabber on the page",
      p: [
        "Right-click the playlist page and choose Download all links on this page. The [Grabber](key:guideGrab) lists what it found; the Videos on site filter narrows it to the videos. Tick, pick a quality, Start.",
      ],
      shot: { src: "screenshots/grabber.png", alt: "The Grabber window of Aynite Download Manager listing the videos found on a page, with filters and a Select all button", eager: true },
    },
    {
      h2: "Private and members-only playlists",
      p: [
        "Playlists that need your sign-in work through the browser add-on: start from the page while you are signed in and leave Send cookies for protected files on in the add-on's popup. ADM uses your sign-in for the download and keeps it on your computer.",
      ],
    },
    {
      h2: "Large playlists",
      p: [
        "A playlist of hundreds of videos is fine. The queue takes them three at a time by default (change that in Options), the [scheduler](key:guideSchedule) can run them overnight, and ADM can shut the computer down when the last one is done.",
      ],
    },
    {
      h2: "Playlists on Linux",
      p: [
        "Everything above works the same way on Ubuntu, Mint, Debian and the other distributions [ADM for Linux](key:linux) runs on; the add-on works in Chrome, Chromium, Brave and Firefox there.",
      ],
    },
  ],
  faq: [
    ["Can I download a whole channel?", "Yes. Paste the address of the channel's Videos page; ADM lists its videos like a playlist."],
    ["Can I download only part of a playlist?", "Yes. Untick what you do not want before you press Start."],
    ["Can I save the whole playlist as MP3?", "Yes. Choose Audio only once for the batch. [More on MP3 and M4A](key:mp3)."],
    ["Do playlists work on other sites?", "On many of the supported sites, for example Vimeo and SoundCloud, playlists and sets work the same way."],
    ["What if a video in the playlist fails?", "The others continue. The failed one stays in the list with its error; Resume tries it again, which usually succeeds after Tools, then Check for Updates when a site changed."],
  ],
  related: ["youtube", "mp3", "guideGrab", "anysite"],
};
