export default {
  key: "guideGrab",
  updated: "14 October 2026",
  h1: "Download every file on a web page at once with Aynite Download Manager",
  lead: "A page with forty PDFs, a gallery of pictures, a lecture series, a folder listing on a server: the Grabber in Aynite Download Manager lists everything a page links to or plays, lets you filter by type and name, and queues what you tick. Windows and Linux.",
  sections: [
    {
      h2: "Open the Grabber",
      steps: [
        ["From the browser", "Right-click the page and choose Download all links on this page. The add-on collects the links as the page shows them, which also works for pages built by scripts, and hands them to the Grabber."],
        ["From ADM", "Click Grabber in the toolbar and paste the page's address. ADM reads the page and lists what it finds."],
      ],
      shot: { src: "screenshots/grabber.png", alt: "The Grabber window of Aynite Download Manager listing the files found on a page, with type filters, a name filter and Select all", eager: true },
    },
    {
      h2: "Filter the list",
      p: [
        "The type filter narrows the list to Video, Music, Documents, Compressed, Programs, Images or Torrents, to Videos on site, which are the videos ADM can download with a quality picker, or to Other. The name filter matches any part of the file name or address, so \"lecture\" or \".pdf\" cuts a long list down in a second.",
      ],
    },
    {
      h2: "Tick and download",
      p: [
        "Tick the entries you want, or Select all with the filter applied, and press Download. Each file joins the queue with the right category and folder; videos from a site get the quality you chose for the batch. The queue takes them three at a time by default, which you can change in Options, and the [scheduler](key:guideSchedule) can run them overnight.",
      ],
    },
    {
      h2: "Playlists and channels",
      p: [
        "A playlist page works the same way: the Grabber lists its videos and the Videos on site filter shows only those. [More on playlists](key:playlist).",
      ],
    },
  ],
  faq: [
    ["Does the Grabber follow links to other pages?", "No. It lists what is on the page you gave it. Open the next page and grab it too."],
    ["Can I grab files that need a sign-in?", "Start the Grabber from the browser, with the right-click entry, while you are signed in to the site. Links the add-on collects are downloaded with your sign-in when Send cookies for protected files is on."],
    ["Why are some pictures missing from the list?", "Pictures that a page loads only when you scroll are not on the page yet when it is read. Scroll to the bottom first, then grab from the browser."],
    ["Is there a limit on the number of files?", "No. Hundreds of entries are fine; they queue and download in turn."],
  ],
  related: ["playlist", "guideSchedule", "anysite", "guides"],
};
