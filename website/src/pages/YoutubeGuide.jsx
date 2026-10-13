import { SUPPORTED_SITES } from "../release.js";
import { Crumbs, DownloadBand, Footer, Header, Shot, page, useRelease } from "../shared.jsx";

const STEPS = [
  ["Install AyniteDM and its browser add-on", "Run the installer and let AyniteDM set up the add-on for your browser when it asks. This takes a minute and is needed only once."],
  ["Open the video and hover it", "Move the mouse over the player. A small Download this video button appears in its corner. Click the arrow next to it to see the quality list."],
  ["Pick the quality", "The list shows every quality the site offers for that video, for example MP4 2160p60 (4K), 1440p, 1080p, 720p, down to 144p. Pick one and the download starts in AyniteDM. The sound is included; AyniteDM joins picture and sound for you."],
  ["Or keep just the sound", "Choose Audio only MP3 or Audio only M4A from the same list for music, talks and podcasts."],
  ["Find the file", "Finished videos land in the Videos folder inside your Downloads folder, under AyniteDM; music goes to Music. The completion window has an Open and an Open folder button."],
];

const FAQ = [
  ["Which qualities can I get?", "Whatever the site offers for that video. On YouTube that is often 4K (2160p) at 60 frames per second, 1440p, 1080p, 720p, 480p, 360p, 240p and 144p. AyniteDM lists them all, with the file size when the site provides it."],
  ["Why is 4K missing on some videos?", "Because the video was not uploaded in 4K. The list shows only what exists for that video."],
  ["Can I download a whole playlist or channel?", "Yes. Paste the playlist address into AyniteDM, or use the Grabber, and tick the videos you want. They queue up and download one after another."],
  ["Can I record a live stream?", "Yes. Hover the live video and click Download this video. AyniteDM records from that moment until you press Stop or the broadcast ends, and saves a normal MP4."],
  ["Does it work for videos that need me to be signed in?", "Yes. Use the Download button in the browser while you are signed in to the site; AyniteDM uses that sign-in for the download. Pasting the link into the program by hand does not carry the sign-in."],
  ["YouTube downloads stopped working. What now?", "Video sites change often. Open the Tools menu in AyniteDM and choose Check for Updates; the video-site support updates itself in seconds, no reinstall needed."],
  ["Does it work on other sites?", `Yes, on ${SUPPORTED_SITES}, including Vimeo, Dailymotion, Twitter/X, TikTok, Facebook, Twitch, SoundCloud and many news sites. Netflix, Prime Video, Disney+ and other subscription services encrypt their videos, and AyniteDM does not try to get around that.`],
  ["Is downloading YouTube videos allowed?", "Download only what you have the right to save: your own uploads, videos the creator allows you to download, and material released under a licence that permits it. Respect each site's terms and your local law. AyniteDM is a tool; what you download with it is your responsibility."],
];

export default function YoutubeGuide() {
  const state = useRelease();
  return (
    <>
      <Header current="youtube" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <Crumbs items={["YouTube guide"]} />
            <h1>How to download YouTube videos in 4K, 1080p or as MP3</h1>
            <p className="lead">
              With AyniteDM, saving a video takes one click on the player and one pick from the quality list. This guide
              shows the steps on Windows and Linux, how to keep only the sound, how to handle playlists and live streams,
              and what cannot be downloaded.
            </p>
          </div>
        </section>

        <section className="plain">
          <div className="wrap row">
            <div className="row-text">
              <h2>The quality list, on the video itself</h2>
              <p>
                Hover any YouTube video with the AyniteDM add-on installed and the Download button appears. Its arrow opens
                the list of qualities the site offers for that video, from 4K at 60 frames per second down to 144p, plus
                audio-only MP3 and M4A. Pick one; AyniteDM downloads picture and sound and joins them into a single MP4.
              </p>
            </div>
            <figure className="row-shot">
              <Shot src="screenshots/youtube-button.jpg" alt="AyniteDM's Download button over a YouTube video with the quality list open, MP4 2160p60 selected" eager />
            </figure>
          </div>
        </section>

        <section className="band light">
          <div className="wrap">
            <h2 className="center">Step by step</h2>
            <ol className="steps">
              {STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="plain">
          <div className="wrap row reverse">
            <div className="row-text">
              <h2>Playlists, channels and live streams</h2>
              <p>
                For a playlist, paste its address into AyniteDM or open the Grabber on the page: every video is listed
                with its title, you tick the ones you want, and they download in turn at the quality you chose. Live
                broadcasts are recorded with a Stop button and saved as a normal video file, with the time and size shown
                while it records.
              </p>
              <p><a href={page("home", "#features")}>All features of AyniteDM</a></p>
            </div>
            <figure className="row-shot">
              <Shot src="screenshots/live.png" alt="AyniteDM recording a live stream, with the time captured so far and a Stop button" />
            </figure>
          </div>
        </section>

        <DownloadBand {...state} />

        <section className="band light">
          <div className="wrap narrow">
            <h2 className="center">Questions</h2>
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
