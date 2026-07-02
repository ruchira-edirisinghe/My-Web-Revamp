'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initGalleryModal } from '@/lib/scripts/gallery-modal';

export default function GalleryEventPosters() {
  useEffect(() => {
    const disposers = [initProjects(), initGalleryModal()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Broadcasting the <span className="tagline-name">Event Horizon</span></>}
    >
      <main>
        <header className="page-header">
          <Link href="/projects/graphic" className="back-link"><span>←</span> Back to Graphic Projects</Link>
          <p className="section-label">High-Impact Visuals</p>
          <h1 className="page-title">Event Posters</h1>
          <p className="bio-para" style={{ textAlign: 'left', margin: 0 }}>
            A showcase of high-impact visual design for corporate events, hackathons, and creative gatherings.
          </p>
        </header>

        <div className="gallery-container">
          <div className="poster-grid">
            {/* Poster 1 */}
            <div className="poster-item" style={cssVars({ '--item-index': 1 })}>
              <img src="/Images/artworks/event-posters/thumbs/AGM-2.jpg"
                data-highres="/Images/artworks/event-posters/AGM-2.png" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Poster 2 */}
            <div className="poster-item" style={cssVars({ '--item-index': 2 })}>
              <img src="/Images/artworks/event-posters/thumbs/Coming-Soon-Final.jpg"
                data-highres="/Images/artworks/event-posters/Coming-Soon-Final.jpg" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Poster 3 */}
            <div className="poster-item" style={cssVars({ '--item-index': 3 })}>
              <img src="/Images/artworks/event-posters/thumbs/HackToNight.jpg"
                data-highres="/Images/artworks/event-posters/HackToNight.png" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Poster 4 */}
            <div className="poster-item" style={cssVars({ '--item-index': 4 })}>
              <img src="/Images/artworks/event-posters/thumbs/Happening-now.jpg"
                data-highres="/Images/artworks/event-posters/Happening-now.png" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Poster 5 */}
            <div className="poster-item" style={cssVars({ '--item-index': 5 })}>
              <img src="/Images/artworks/event-posters/thumbs/Live Now Final.jpg"
                data-highres="/Images/artworks/event-posters/Live Now Final.png" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Poster 6 */}
            <div className="poster-item" style={cssVars({ '--item-index': 6 })}>
              <img src="/Images/artworks/event-posters/thumbs/OSD-Final.jpg"
                data-highres="/Images/artworks/event-posters/OSD-Final.jpg" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Poster 7 */}
            <div className="poster-item" style={cssVars({ '--item-index': 7 })}>
              <img src="/Images/artworks/event-posters/thumbs/Step-into-GO.jpg"
                data-highres="/Images/artworks/event-posters/Step-into-GO.png" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Poster 8 */}
            <div className="poster-item" style={cssVars({ '--item-index': 8 })}>
              <img src="/Images/artworks/event-posters/thumbs/Technosphere - Registrations closed.jpg"
                data-highres="/Images/artworks/event-posters/Technosphere - Registrations closed.png" alt="Event Poster"
                className="artwork-img" loading="lazy" decoding="async" />
            </div>
            {/* Poster 9 */}
            <div className="poster-item" style={cssVars({ '--item-index': 9 })}>
              <img src="/Images/artworks/event-posters/thumbs/dive.jpg"
                data-highres="/Images/artworks/event-posters/dive.png" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Poster 10 */}
            <div className="poster-item" style={cssVars({ '--item-index': 10 })}>
              <img src="/Images/artworks/event-posters/thumbs/esthetique1.jpg"
                data-highres="/Images/artworks/event-posters/esthetique1.jpg" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Poster 11 */}
            <div className="poster-item" style={cssVars({ '--item-index': 11 })}>
              <img src="/Images/artworks/event-posters/thumbs/esthetique2.jpg"
                data-highres="/Images/artworks/event-posters/esthetique2.png" alt="Event Poster" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </main>

      {/* ── IMAGE MODAL ── */}
      <div id="artwork-modal" className="modal-overlay" aria-hidden="true">
        <button id="modal-close" aria-label="Close modal">×</button>
        <div className="modal-content">
          <img id="modal-img" alt="Full size preview" />
          <div id="modal-info">
            <span id="modal-tag"></span>
            <h3 id="modal-title"></h3>
            <p id="modal-desc"></p>
          </div>
        </div>
      </div>
    </StandardShell>
  );
}
