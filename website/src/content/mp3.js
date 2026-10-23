export default {
  key: "mp3",
  updated: "14 October 2026",
  h1: "Save YouTube audio as MP3 or M4A with Aynite Download Manager",
  lead: "Keep just the sound of a YouTube video with Aynite Download Manager (ADM): hover the player, click the arrow next to Download and choose Audio only, then MP3 or M4A. ADM fetches the best audio the site offers and converts it to MP3, or keeps the original M4A untouched. Whole playlists too. No ads, no limit on length or count.",
  download: "windows",
  sections: [
    {
      h2: "One click on the video, choose Audio only",
      steps: [
        ["Open the video", "In Chrome, Edge, Brave or Firefox with the ADM add-on, hover the player. The Download button appears."],
        ["Pick Audio only", "Click the arrow next to Download. Under Audio only, choose MP3, which plays everywhere, or M4A, the original audio YouTube sends, saved untouched."],
        ["Find the file", "It lands in the Music folder inside Downloads\\ADM, named after the video. The completion window has Open and Open folder buttons."],
      ],
      shot: { src: "screenshots/youtube-button.jpg", alt: "The quality list of Aynite Download Manager over a YouTube video, with the audio-only MP3 and M4A entries at the bottom", eager: true },
    },
    {
      h2: "MP3 or M4A: which to pick",
      p: [
        "M4A keeps the AAC audio stream YouTube serves, untouched, so nothing is lost and the download takes seconds. MP3 is converted from the best audio stream the site offers at 192 kbit/s, and every player, car stereo and phone understands it. Pick M4A for quality and speed, MP3 for compatibility.",
      ],
    },
    {
      h2: "A whole playlist as MP3",
      p: [
        "Paste a playlist link into Add URL, or open the Grabber on the playlist page, tick the tracks and choose Audio only once for all of them. They download one after another into your Music folder. [More on playlists and channels](key:playlist).",
      ],
    },
    {
      h2: "Why a desktop program beats online converters",
      p: [
        "Online converters put a limit on length, a limit on the number of files, a wait before the download and advertising around all of it, and they stop working when YouTube changes something. ADM has no such limits, converts on your own computer, and when YouTube changes something, the fix comes with ADM's next update, which it looks for by itself: Tools, then Check for Updates checks right away.",
      ],
    },
    {
      h2: "Other sites",
      p: [
        "The Audio only choice appears on every site ADM supports, which includes SoundCloud, Vimeo, Twitch recordings and over 1,800 others. [Download from any website](key:anysite).",
      ],
    },
  ],
  faq: [
    ["What bit rate is the MP3?", "192 kbit/s, converted from the best audio stream the site offers. M4A keeps the original stream as YouTube sends it."],
    ["Can I download an entire playlist as MP3?", "Yes. Choose Audio only once for the batch and every track is saved as MP3 or M4A."],
    ["Does it need a separate converter?", "No. The converter ships inside ADM; nothing else to install."],
    ["Is there a limit on length or on the number of files?", "No. A ten-hour recording or a playlist of five hundred tracks is fine; the queue takes them in turn."],
    ["Is it legal to save YouTube audio?", "Save only what you have the right to: your own uploads, material the creator lets you download, and openly licensed recordings. Many platforms' terms restrict downloading; ADM does not get around any protection."],
  ],
  related: ["youtube", "playlist", "anysite", "helpYoutube"],
};
