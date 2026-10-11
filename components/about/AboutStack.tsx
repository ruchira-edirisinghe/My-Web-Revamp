import { cssVars } from '@/lib/css';
import { ORBITS } from '@/components/about/data';

/* About: the tech stack as three decks - one per kind of tool, each with
   every tool in view at once on a small grid. Each deck has a turning orbit
   emblem; the tiles pop in when the deck comes into view, then a glow passes
   from one to the next in turn.
   Styles: styles/about/about-v2.css (.ab-deck). */

export default function AboutStack() {
  return (
    <section className="ab-sec ab-stack" aria-labelledby="ab-stack-t">
      <header className="ab-head ab-rv">
        <p className="ab-kicker">What I work with</p>
        <h2 className="ab-title" id="ab-stack-t">My <span className="ab-glow">Tech Stack</span></h2>
        <p className="ab-lede">
          These are the tools I reach for most often. I&rsquo;ve picked them up over the years because they let me work
          quickly without cutting corners on quality or looks. Alongside the usual design and development work, I&rsquo;ve
          been getting better at prompt engineering and vibe coding, which I mostly use to build front-end interfaces and
          games. I still lean on good old development habits like planning the structure first, reviewing every change
          and testing properly, so the projects hold up well and are easy to grow later on.
        </p>
      </header>

      <div className="ab-decks">
        {ORBITS.map((o, i) => (
          <article key={o.key} className="ab-deck ab-spot ab-rv" style={cssVars({ '--c': o.c, '--d': `${i * 0.12}s`, '--n': o.tools.length })}>
            <header className="ab-deck-head">
              <span className="ab-deck-emblem" aria-hidden="true">
                <i className="is-1"><b /></i>
                <i className="is-2"><b /></i>
                <span>0{i + 1}</span>
              </span>
              <span>
                <h3 className="ab-deck-name">{o.name}</h3>
                <p className="ab-deck-blurb">{o.blurb}</p>
              </span>
            </header>
            <ul className="ab-deck-tools" aria-label={o.name}>
              {o.tools.map((t, j) => (
                <li key={t.name} className="ab-tool" style={cssVars({ '--j': j })}>
                  <span className="ab-tool-ico">{t.icon}</span>
                  <span className="ab-tool-name">{t.name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
