// Renders a page from a content module (src/content/<key>.js). A content module is plain data:
//   key, h1, lead, download ("windows" | "linux" | null), sections[], faq[], related[], cta (false hides the band)
// A section has h2 and any of: p (paragraphs), list, steps ([title, text]), table ({cols, rows}), note, shot
// ({src, alt}). Text may hold links written as [label](key:windows), [label](https://...) or [label](#id);
// see Inline in shared.jsx.
import { VERSION_FALLBACK, humanSize } from "../release.js";
import { Crumbs, DownloadBand, Footer, Header, Inline, LinuxButtons, PrimaryDownload, Shot, page, useRelease } from "../shared.jsx";
import { BY_KEY, trail } from "./registry.js";

function Section({ s, tone }) {
  const body = (
    <>
      {s.h2 && <h2 id={s.id}>{s.h2}</h2>}
      {(s.p || []).map((t, i) => <p key={i}><Inline text={t} /></p>)}
      {s.list && <ul>{s.list.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ul>}
      {s.steps && (
        <ol className="steps compact">
          {s.steps.map(([t, d]) => <li key={t}><h3>{t}</h3><p><Inline text={d} /></p></li>)}
        </ol>
      )}
      {s.table && (
        <div className="table-wrap">
          <table className="compare">
            <thead><tr>{s.table.cols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
            <tbody>
              {s.table.rows.map((r) => (
                <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i}><Inline text={c} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.note && <p className="note"><Inline text={s.note} /></p>}
      {s.after && s.after.map((t, i) => <p key={i}><Inline text={t} /></p>)}
    </>
  );
  if (s.shot) {
    return (
      <section className={tone}>
        <div className={`wrap row prose${s.shotLeft ? " reverse" : ""}`}>
          <div className="row-text">{body}</div>
          <figure className="row-shot"><Shot src={s.shot.src} alt={s.shot.alt} eager={!!s.shot.eager} /></figure>
        </div>
      </section>
    );
  }
  return <section className={tone}><div className="wrap narrow prose">{body}</div></section>;
}

export function ContentPage({ content }) {
  const state = useRelease();
  const meta = BY_KEY[content.key];
  const path = trail(content.key);
  const crumbs = path.slice(1).map((p, i) =>
    i === path.length - 2 ? p.name : <a key={p.key} href={page(p.key)}>{p.name}</a>);
  const linux = state.release?.linux;
  return (
    <>
      <Header current={meta.nav || meta.section || ""} />
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <Crumbs items={crumbs} />
            <h1>{content.h1}</h1>
            <p className="lead"><Inline text={content.lead} /></p>
            {content.download && (
              <div className="cta-row left">
                <PrimaryDownload {...state} platform={content.download} />
                {content.download === "linux" && linux?.tar && (
                  <a className="btn outline" href={linux.tar.url}>
                    Other Linux
                    <small>{humanSize(linux.tar.size)} · archive, any distribution</small>
                  </a>
                )}
                {content.download === "windows" && linux && (
                  <a className="btn outline" href={page("linux")}>Also for Linux<small>Ubuntu, Mint, Debian and others</small></a>
                )}
              </div>
            )}
            {content.checked && <p className="fine">Competitor facts last checked: {content.checked}</p>}
            {content.updated && <p className="fine">Updated {content.updated}. Applies to Aynite Download Manager {VERSION_FALLBACK}.</p>}
          </div>
        </section>

        {content.sections.map((s, i) => <Section key={i} s={s} tone={i % 2 ? "band light" : "plain"} />)}

        {content.faq && content.faq.length > 0 && (
          <section className={content.sections.length % 2 ? "band light" : "plain"}>
            <div className="wrap narrow">
              <h2 className="center">{content.faqTitle || "Questions"}</h2>
              {content.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p><Inline text={a} /></p></details>)}
            </div>
          </section>
        )}

        {content.related && content.related.length > 0 && (
          <section className="plain">
            <div className="wrap narrow">
              <h2>Read next</h2>
              <ul className="checklist">
                {content.related.map((key) => <li key={key}><a href={page(key)}>{BY_KEY[key].relatedLabel || BY_KEY[key].title}</a></li>)}
              </ul>
            </div>
          </section>
        )}

        {content.cta !== false && (content.download === "linux"
          ? (
            <section id="download" className="band light">
              <div className="wrap center">
                <h2>Get Aynite Download Manager for Linux</h2>
                <div className="cta-row"><LinuxButtons release={state.release} /></div>
                {!linux && <p className="fine">The Linux packages are listed on the <a href={page("linux")}>Linux page</a>.</p>}
              </div>
            </section>
          )
          : <DownloadBand {...state} />)}
      </main>
      <Footer />
    </>
  );
}
