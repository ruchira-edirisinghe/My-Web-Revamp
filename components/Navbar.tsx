import Link from 'next/link';

export type NavKey = 'about' | 'experience' | 'projects' | 'links' | 'contact' | null;

/** Desktop top navigation (Shell B). `active` highlights the current section. */
export default function Navbar({ active = null }: { active?: NavKey }) {
  // Marks the active item both visually (.active) and for assistive tech (aria-current).
  const linkProps = (key: NavKey, base = 'nav-link') =>
    active === key
      ? { className: `${base} active`, 'aria-current': 'page' as const }
      : { className: base };
  return (
    <div id="navbar-wrap">
      <Link href="/" aria-label="Home">
        <img className="nav-logo" src="/Images/longlogo.svg" alt="Logo" />
      </Link>
      <nav id="navbar">
        <div className="nav-links">
          <Link href="/about" {...linkProps('about')}>About Me</Link>
          <Link href="/experience" {...linkProps('experience')}>Experience</Link>
          <Link href="/projects" {...linkProps('projects')}>Projects</Link>
          <Link href="/links" {...linkProps('links')}>Quick Links</Link>
        </div>
        <div className="nav-divider"></div>
        <Link href="/contact" {...linkProps('contact', 'nav-cta')}>Say Hi 👋</Link>
      </nav>
    </div>
  );
}
