import Link from 'next/link';

export type NavKey = 'about' | 'experience' | 'projects' | 'links' | 'contact' | null;

/** Desktop top navigation (Shell B). `active` highlights the current section. */
export default function Navbar({ active = null }: { active?: NavKey }) {
  const cls = (key: NavKey) => 'nav-link' + (active === key ? ' active' : '');
  return (
    <div id="navbar-wrap">
      <Link href="/" aria-label="Home">
        <img className="nav-logo" src="/Images/longlogo.svg" alt="Logo" />
      </Link>
      <nav id="navbar">
        <div className="nav-links">
          <Link href="/about" className={cls('about')}>About Me</Link>
          <Link href="/experience" className={cls('experience')}>Experience</Link>
          <Link href="/projects" className={cls('projects')}>Projects</Link>
          <Link href="/links" className={cls('links')}>Quick Links</Link>
        </div>
        <div className="nav-divider"></div>
        <Link href="/contact" className="nav-cta">Say Hi 👋</Link>
      </nav>
    </div>
  );
}
