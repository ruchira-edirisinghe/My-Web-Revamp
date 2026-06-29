'use client';
import { useEffect } from 'react';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';

interface GalleryCard {
  type: string;
  idx: number;
  img: string;
  alt: string;
  label: string;
  title: string;
  desc: string;
  tags: string[];
  href: string;
  cta: string;
}

const GALLERIES: GalleryCard[] = [
  { type: 'type-design', idx: 0, img: '/Images/projects/logo-design-process.png', alt: 'Logo Designs', label: 'Identity Design', title: 'Logo Designs', desc: 'Crafting iconic visual signatures that define brands and leave lasting impressions.', tags: ['Vector Art', 'Branding'], href: '/projects/graphic/logos', cta: 'View Gallery ↗' },
  { type: 'type-app', idx: 1, img: '/Images/projects/digital_art.png', alt: 'Digital Arts', label: 'Fine Art', title: 'Digital Arts', desc: 'Experimental digital creations exploring themes of light, shadow, and cosmic geometry.', tags: ['Digital Paint', '3D Render'], href: '/projects/graphic/artworks', cta: 'View Gallery ↗' },
  { type: 'type-web', idx: 2, img: '/Images/projects/event_posters.png', alt: 'Event Posters', label: 'Print Design', title: 'Event Posters', desc: 'Striking visual communications designed to capture attention and spark curiosity for unique events.', tags: ['Typography', 'Layout'], href: '/projects/graphic/event-posters', cta: 'View Gallery ↗' },
  { type: 'type-ai', idx: 3, img: '/Images/projects/mobile_wallpapers.png', alt: 'Mobile Wallpapers', label: 'Digital Personalization', title: 'Mobile Wallpapers', desc: 'A curated collection of minimalist, high-fidelity wallpapers optimized for modern AMOLED displays.', tags: ['Minimalism', 'AMOLED', '4K Assets'], href: '/projects/graphic/mobile-wallpapers', cta: 'Explore Collection ↗' },
  { type: 'type-design', idx: 4, img: '/Images/projects/other_stuff.png', alt: 'Other Stuff', label: 'Miscellaneous', title: 'Other Stuff', desc: 'A diverse collection of creative experiments, icon sets, and unique visual explorations.', tags: ['Icons', 'Experiments'], href: '/projects/graphic/other-stuff', cta: 'View Gallery ↗' },
];

export default function GraphicProjectsClient() {
  useEffect(() => initProjects(), []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Visualizing the <span className="tagline-name">Creative Galaxy</span></>}
    >
      <main>
        <header id="hero-heading">
          <div className="back-nav-wrap">
            <a href="/projects" className="back-link"><span>←</span> Back to Project Categories</a>
          </div>
          <p className="section-label">Visual Artistry</p>
          <h1 className="page-title">Graphic Design</h1>
          <br />
          <p className="bio-para">
            A collection of visual narratives, brand identities, and digital art pieces crafted with precision and cosmic
            inspiration.
          </p>
        </header>

        <div className="projects-grid grid-mixed">
          {GALLERIES.map((c) => (
            <div key={c.title} className={`project-card ${c.type}`} style={cssVars({ '--card-index': c.idx })}>
              <div className="project-image-wrap">
                <img src={c.img} alt={c.alt} className="project-card-img" />
              </div>
              <div className="project-content">
                <span className="project-label">{c.label}</span>
                <h3 className="project-title">{c.title}</h3>
                <p className="project-desc">{c.desc}</p>
                <div className="project-tags">
                  {c.tags.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
              <div className="project-links">
                <a href={c.href} className="project-link-btn stretched-link">{c.cta}</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </StandardShell>
  );
}
