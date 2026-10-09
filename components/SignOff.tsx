import Link from 'next/link';
import AstroPeek from '@/components/AstroPeek';

/* The sign-off at the end of a page (About, Experience): a big two-line
   invitation, buttons to Contact and Projects, and the 3D astronaut waving
   from the bottom of the page. Styles: styles/signoff.css and
   styles/astro-peek.css. `className` adds the page's own section spacing and
   reveal classes. */
export default function SignOff({ className = '' }: { className?: string }) {
  return (
    <>
      <section className={`so ${className}`} aria-label="Get in touch">
        <p className="so-kicker">Ready for liftoff?</p>
        <h2 className="so-title">
          <span className="so-plain">Let&rsquo;s sketch</span> <span className="so-glow">something out of this world</span>
        </h2>
        <div className="so-row">
          <Link href="/contact/" className="so-btn is-main">
            Say hi
            <svg className="so-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </Link>
          <Link href="/projects/" className="so-btn">See my projects</Link>
        </div>
      </section>

      {/* He peeks up over the footer to wave goodbye. */}
      <AstroPeek />
    </>
  );
}
