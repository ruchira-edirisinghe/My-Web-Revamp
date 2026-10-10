import { BentoCard, ZEN_CHANNELS } from '@/components/BentoCard';

/* About: Zenitron Gaming - the channel's logo floating in its own neon glow,
   then the same channel cards as Quick Links (components/BentoCard.tsx).
   Styles: styles/about/about-v2.css and styles/bento-cards.css. */

export default function AboutChannels() {
  return (
    <section className="ab-sec ab-play" aria-labelledby="ab-play-t">
      <header className="ab-head ab-rv">
        <p className="ab-kicker">Content creator &amp; gamer</p>
        <h2 className="sr-only" id="ab-play-t">Zenitron Gaming</h2>
        <div className="ab-play-logo">
          <i className="ab-play-halo" aria-hidden="true" />
          <img src="/Images/zenitrongaming.webp" alt="Zenitron Gaming" decoding="async" loading="lazy" />
        </div>
        <p className="ab-lede">
          When I&rsquo;m not designing or coding, you&rsquo;ll probably find me gaming or live streaming. I run a channel
          called Zenitron Gaming, where I play, stream and share clips across a few different platforms. It started as a
          way to unwind, but it&rsquo;s grown into a fun little community, and honestly, spending time inside other
          people&rsquo;s games gives me a lot of ideas for my own work.
        </p>
      </header>

      <ul className="ql-bento ab-bento ab-rv">
        {ZEN_CHANNELS.map((c) => (
          <BentoCard key={c.id} id={c.id} name={c.name} href={c.href} color={c.color}
            note={c.kind} sub={`${c.stat} ${c.unit}`} cta={c.cta} live={c.live}
            label={`${c.name} - ${c.handle}, ${c.stat} ${c.unit}${c.live ? ', streams live' : ''}`} />
        ))}
      </ul>
    </section>
  );
}
