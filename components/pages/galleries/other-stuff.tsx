'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initGalleryModal } from '@/lib/scripts/gallery-modal';

export default function GalleryOtherStuff() {
  useEffect(() => {
    const disposers = [initProjects(), initGalleryModal()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Unveiling the <span className="tagline-name">Creative Spectrum</span></>}
    >
      <main>
        <header className="page-header">
          <Link href="/projects/graphic" className="back-link"><span>←</span> Back to Graphic Projects</Link>
          <p className="section-label">Graphic Design & Branding</p>
          <h1 className="page-title">Graphic Assets</h1>
          <p className="bio-para" style={{ textAlign: 'left', margin: 0 }}>
            A curated collection of event posters, apparel designs, and branding collateral crafted for diverse creative
            needs.
          </p>
        </header>

        <div className="gallery-container">
          {/* ── SECTION 1: EVENT POSTERS ── */}
          <div className="poster-grid">
            <div className="poster-item ratio-1-1" style={cssVars({ '--item-index': 1 })}>
              <img src="/Images/artworks/other-stuff/thumbs/ART.webp" data-highres="/Images/artworks/other-stuff/ART.webp"
                alt="Event Poster" className="artwork-img" loading="lazy" decoding="async" />
            </div>
            <div className="poster-item ratio-1-1" style={cssVars({ '--item-index': 2 })}>
              <img src="/Images/artworks/other-stuff/thumbs/banner.webp"
                data-highres="/Images/artworks/other-stuff/banner.webp" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            <div className="poster-item ratio-1-1" style={cssVars({ '--item-index': 3 })}>
              <img src="/Images/artworks/other-stuff/thumbs/covid.webp"
                data-highres="/Images/artworks/other-stuff/covid.webp" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            <div className="poster-item ratio-1-1" style={cssVars({ '--item-index': 4 })}>
              <img src="/Images/artworks/other-stuff/thumbs/DAY.webp" data-highres="/Images/artworks/other-stuff/DAY.webp"
                alt="Event Poster" className="artwork-img" loading="lazy" decoding="async" />
            </div>
            <div className="poster-item ratio-1-1" style={cssVars({ '--item-index': 5 })}>
              <img src="/Images/artworks/other-stuff/thumbs/INDIA.webp"
                data-highres="/Images/artworks/other-stuff/INDIA.webp" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
          </div>

          {/* ── COSMIC DIVIDER 1 ── */}
          <div className="cosmic-divider" aria-hidden="true">
            <div className="cosmic-divider-sweep"></div>
            <div className="cosmic-divider-core">
              <span className="cosmic-divider-orb orb-sm"></span>
              <span className="cosmic-divider-orb"></span>
              <span className="cosmic-divider-star">&#10022;</span>
              <span className="cosmic-divider-orb"></span>
              <span className="cosmic-divider-orb orb-sm"></span>
            </div>
          </div>

          {/* ── SECTION 2: T-SHIRT DESIGNS ── */}
          <div className="poster-grid">
            <div className="poster-item ratio-16-10" style={cssVars({ '--item-index': 7 })}>
              <img src="/Images/artworks/other-stuff/thumbs/fosstshirt.webp"
                data-highres="/Images/artworks/other-stuff/fosstshirt.webp" alt="T-shirt Design" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            <div className="poster-item ratio-16-10" style={cssVars({ '--item-index': 8 })}>
              <img src="/Images/artworks/other-stuff/thumbs/isaca.webp"
                data-highres="/Images/artworks/other-stuff/isaca.webp" alt="T-shirt Design" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            <div className="poster-item ratio-16-10" style={cssVars({ '--item-index': 9 })}>
              <img src="/Images/artworks/other-stuff/thumbs/mora-tshirt.webp"
                data-highres="/Images/artworks/other-stuff/mora-tshirt.webp" alt="T-shirt Design" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
          </div>

          {/* ── COSMIC DIVIDER 2 ── */}
          <div className="cosmic-divider" aria-hidden="true">
            <div className="cosmic-divider-sweep"></div>
            <div className="cosmic-divider-core">
              <span className="cosmic-divider-orb orb-sm"></span>
              <span className="cosmic-divider-orb"></span>
              <span className="cosmic-divider-star">&#10022;</span>
              <span className="cosmic-divider-orb"></span>
              <span className="cosmic-divider-orb orb-sm"></span>
            </div>
          </div>

          {/* ── SECTION 3: BRANDING & LAYOUT ── */}
          <div className="poster-grid">
            <div className="poster-item branding-fixed-row" style={cssVars({ '--item-index': 10 })}>
              <img src="/Images/artworks/other-stuff/thumbs/Billboard.webp"
                data-highres="/Images/artworks/other-stuff/Billboard.webp" alt="Billboard Design" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            <div className="poster-item branding-fixed-row" style={cssVars({ '--item-index': 11 })}>
              <img src="/Images/artworks/other-stuff/thumbs/brouchure.webp"
                data-highres="/Images/artworks/other-stuff/brouchure.webp" alt="Brochure Design" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            <div className="poster-item branding-fixed-row" style={cssVars({ '--item-index': 12 })}>
              <img src="/Images/artworks/other-stuff/thumbs/Business-Card.webp"
                data-highres="/Images/artworks/other-stuff/Business-Card.webp" alt="Business Card" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            <div className="poster-item ratio-4-5" style={cssVars({ '--item-index': 13 })}>
              <img src="/Images/artworks/other-stuff/thumbs/New-Magazine.webp"
                data-highres="/Images/artworks/other-stuff/New-Magazine.webp" alt="Magazine Cover" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            <div className="poster-item ratio-4-5" style={cssVars({ '--item-index': 14 })}>
              <img src="/Images/artworks/other-stuff/thumbs/InvitationAll.webp"
                data-highres="/Images/artworks/other-stuff/InvitationAll.webp" alt="Invitation Card" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </main>

      {/* ── IMAGE MODAL ── */}
      <div id="artwork-modal" className="modal-overlay" aria-hidden="true">
        <button id="modal-close" aria-label="Close modal">×</button>
        <div className="modal-content">
          <img id="modal-img" alt="Full size preview" decoding="async" />
          <div id="modal-info">
            <span id="modal-tag"></span>
            <h2 id="modal-title"></h2>
            <p id="modal-desc"></p>
          </div>
        </div>
      </div>
    </StandardShell>
  );
}
