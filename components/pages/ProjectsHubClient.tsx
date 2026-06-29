'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';

export default function ProjectsHubClient() {
  useEffect(() => initProjects(), []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects-hub"
      tagline={<>Materializing My <span className="tagline-name">Creative Constellation</span></>}
    >
      <main>
        <header id="hero-heading">
          <p className="section-label">Creative Portfolio</p>
          <h1 className="page-title">Project Nexus</h1>
          <br />
          <p className="bio-para">
            A curated selection of my digital architecture, ranging from high-performance web applications to experimental
            cosmic interfaces.
          </p>
        </header>

        <br />

        <div className="hub-divide-container">
          {/* Web Panel */}
          <Link href="/projects/web" className="divide-panel project-card type-web" style={cssVars({ '--panel-index': 0 })}>
            <div className="panel-bg" style={{ backgroundImage: "url('/Images/projects/web-projects.png')" }}></div>
            <div className="panel-overlay"></div>
            <div className="panel-content">
              <p className="panel-label">Digital Systems</p>
              <h2 className="panel-title">Web Design &amp;<br /> Development</h2>
              <div className="panel-line"></div>
              <p className="panel-desc">Engineering high-performance interactive ecosystems with modern ui/ux aesthetics.</p>
              <span className="panel-cta">Enter Portfolio ↗</span>
            </div>
          </Link>

          {/* Graphic Panel */}
          <Link href="/projects/graphic" className="divide-panel project-card type-design" style={cssVars({ '--panel-index': 1 })}>
            <div className="panel-bg" style={{ backgroundImage: "url('/Images/projects/graphic-projects.png')" }}></div>
            <div className="panel-overlay"></div>
            <div className="panel-content">
              <p className="panel-label">Creative Vision</p>
              <h2 className="panel-title">Graphic <br /> Design</h2>
              <div className="panel-line"></div>
              <p className="panel-desc">Crafting vibrant visual narratives and cosmic brand identities that push boundaries.</p>
              <span className="panel-cta">Explore Gallery ↗</span>
            </div>
          </Link>
        </div>
      </main>
    </StandardShell>
  );
}
