import { cssVars } from '@/lib/css';

/* About: the story (a crew card with the greeting, rotating roles and quick
   facts, beside the bio as three chapters on a rail, whose words fade in one
   by one as each comes into view - like the testimonial quotes) and the
   three crafts as cards.
   Styles: styles/about/about-v2.css. Motion: lib/scripts/about.ts. */

const ROLES = ['UI/UX engineer', 'game developer', 'vibe coder', 'graphic designer'];

const FACTS = [
  { k: 'Based in', v: 'Sri Lanka', d: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></> },
  { k: 'Shipping for', v: '4+ years', d: <><path d="M12 3c3 2.6 4.5 5.8 4.5 9.4L14 17h-4l-2.5-4.6C7.5 8.8 9 5.6 12 3Z" /><circle cx="12" cy="10" r="1.6" /><path d="M10 17l-1.5 4M14 17l1.5 4" /></> },
  { k: 'From', v: 'Sketch to launch', d: <><path d="M4 20l4-1L19 8l-3-3L5 16l-1 4Z" /><path d="M14 7l3 3" /></> },
];

const BIO = [
  "I'm a UI/UX engineer and game developer, and I've spent the last four years or so working in the space where design and code meet. Most of my days are split between designing interfaces, building them on the front end and making games, so I get to follow an idea all the way from a rough sketch to something people can actually click, play and enjoy. I care a lot about things looking good, but I care just as much about them working properly and feeling fun to use.",
  "When I start a project, I try to put myself in the shoes of the people who'll be using it. What are they trying to get done, and what's getting in their way? Once I understand that, the design decisions tend to make themselves. Because I also build what I design, I can take a layout from Figma and turn it into a fast, working site or app, and set up the hosting so it stays that way once it's live.",
  "I'm always curious about how people use technology, so I keep reading and experimenting with what's new in game development, accessibility and interactive design. Whether I'm putting together a browser game, working alongside developers and designers on a team, or taking a project from the first idea through to launch, I try to keep the code clean, the process efficient and the end result focused on the people using it.",
];

const CHAPTERS = [
  { k: 'The work', c: '#5ce0ff' },
  { k: 'The approach', c: '#bc6fff' },
  { k: 'The curiosity', c: '#6dff8a' },
];
// Words that glow in the bio (matched without punctuation, lower case).
const KEYS = new Set(['ui/ux', 'engineer', 'game', 'developer', 'design', 'code', 'games', 'sketch', 'people', 'figma', 'fast', 'accessibility', 'interactive', 'launch', 'clean']);

const CRAFTS = [
  {
    label: 'Design & Strategy', title: ['UI UX Engineering', '& UX Consulting'], c: '#bc6fff',
    text: 'I handle the whole design process, starting with research and wireframes and working through to polished interfaces and clickable prototypes you can test with real users. I also work with startups and businesses as a consultant, helping them figure out what their product needs and how to make it easy and enjoyable to use.',
    tags: ['Research', 'Wireframes', 'Prototypes', 'Consulting'],
    icon: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 9h.01M15 9h.01M9 15h6" /></>,
  },
  {
    label: 'Development', title: ['Vibe Coding and', 'Web Development'], c: '#5ce0ff',
    text: 'I build front ends with HTML, CSS, JavaScript and React, and lately a lot of my work is done through vibe coding, where I plan the architecture and guide AI tools to write the code with me. Because I come from a design background, I pay close attention to the small things like spacing, animation and how a page feels when you scroll through it.',
    tags: ['React', 'Next.js', 'Animation', 'AI pairing'],
    icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  },
  {
    label: 'Games & Visual Arts', title: ['Game Development', '& Graphic Designing'], c: '#6dff8a',
    text: 'I make games, ranging from browser games built with three.js to projects in Unity, and I usually work on the mechanics, the game feel and the artwork myself. On the graphic design side, I create logos, brand identities, posters and artwork, and I enjoy giving each piece its own story and personality.',
    tags: ['three.js', 'Unity', 'Branding', 'Posters'],
    icon: <><rect x="2" y="6" width="20" height="12" rx="4" /><path d="M6 12h4M8 10v4" /><path d="M15 11h.01M18 13h.01" /></>,
  },
];

export default function AboutStory() {
  return (
    <>
      <section className="ab-sec ab-story" aria-labelledby="ab-hi">
        {/* An ID badge on a lanyard: the greeting, the roles and the facts.
            The clip, chip, hologram and barcode are only decoration. */}
        <div className="ab-story-side ab-rv">
          <div className="ab-id-hang">
            <span className="ab-id-strap" aria-hidden="true"><i /></span>
            <div className="ab-id">
              <i className="ab-id-rim" aria-hidden="true" />
              <i className="ab-id-grid" aria-hidden="true" />
              <i className="ab-id-orb" aria-hidden="true" />
              <span className="ab-id-slot" aria-hidden="true" />
              <span className="ab-id-band" aria-hidden="true"><i className="ab-id-chip" /><i className="ab-id-holo" /></span>

              <p className="ab-kicker">Hello, world</p>
              <h2 className="ab-hi" id="ab-hi">
                Hi <span className="ab-wave" aria-hidden="true">👋</span>, I&rsquo;m <span className="ab-glow">Ruchira Edirisinghe</span>
              </h2>
              <p className="ab-roles">
                <span className="ab-roles-pre">I&rsquo;m a</span>
                <span className="ab-roles-win" aria-hidden="true">
                  <span className="ab-roles-reel">
                    {[...ROLES, ROLES[0]].map((r, i) => <span key={i}>{r}</span>)}
                  </span>
                </span>
                <span className="sr-only">{ROLES.join(', ')}</span>
              </p>

              <ul className="ab-facts">
                {FACTS.map((f, i) => (
                  <li key={f.k} className="ab-fact" style={cssVars({ '--i': i })}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">{f.d}</svg>
                    <span><small>{f.k}</small>{f.v}</span>
                  </li>
                ))}
              </ul>
              <i className="ab-id-code" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* The bio as three chapters on a rail; each marker lights as its words come in. */}
        <ol className="ab-story-text">
          {BIO.map((p, i) => (
            <li key={i} className="ab-chap" style={cssVars({ '--c': CHAPTERS[i].c })}>
              <span className="ab-chap-mark" aria-hidden="true">0{i + 1}</span>
              <p className="ab-chap-k">{CHAPTERS[i].k}</p>
              <p className="ab-words">
                {p.split(' ').map((w, j) => (
                  <span key={j} className={KEYS.has(w.replace(/[^\w/]/g, '').toLowerCase()) ? 'is-key' : undefined} style={cssVars({ '--i': j })}>{w} </span>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ab-sec ab-crafts" aria-labelledby="ab-crafts-t">
        <header className="ab-head ab-rv">
          <p className="ab-kicker">What I do</p>
          <h2 className="ab-title" id="ab-crafts-t">Three crafts, <span className="ab-glow">one orbit</span></h2>
        </header>
        <div className="ab-craft-grid">
          {CRAFTS.map((c, i) => (
            <article key={c.label} className="ab-craft ab-spot ab-rv" style={cssVars({ '--c': c.c, '--d': `${i * 0.12}s` })}>
              <div className="ab-craft-top">
                <span className="ab-craft-ico" aria-hidden="true">
                  <i className="ab-craft-orbit" />
                  <svg viewBox="0 0 24 24">{c.icon}</svg>
                </span>
                <span className="ab-craft-no" aria-hidden="true">0{i + 1}</span>
              </div>
              <p className="ab-craft-label">{c.label}</p>
              <h3 className="ab-craft-title">{c.title[0]}<br />{c.title[1]}</h3>
              <p className="ab-craft-text">{c.text}</p>
              <ul className="ab-craft-tags">
                {c.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
