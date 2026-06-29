export type NavKey = 'about' | 'experience' | 'projects' | 'links' | 'contact' | null;

/** Desktop top navigation (Shell B). `active` highlights the current section. */
export default function Navbar({ active = null }: { active?: NavKey }) {
  const cls = (key: NavKey) => 'nav-link' + (active === key ? ' active' : '');
  return (
    <div id="navbar-wrap">
      <a href="/" aria-label="Home">
        <img className="nav-logo" src="/Images/longlogo.svg" alt="Logo" />
      </a>
      <nav id="navbar">
        <div className="nav-links">
          <a href="/about" className={cls('about')}>About Me</a>
          <a href="/experience" className={cls('experience')}>Experience</a>
          <a href="/projects" className={cls('projects')}>Projects</a>
          <a href="/links" className={cls('links')}>Quick Links</a>
        </div>
        <div className="nav-divider"></div>
        <a href="/contact" className="nav-cta">Say Hi 👋</a>
      </nav>
    </div>
  );
}
