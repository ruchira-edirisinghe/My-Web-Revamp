'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initGalleryModal } from '@/lib/scripts/gallery-modal';

export default function GalleryArtworks() {
  useEffect(() => {
    const disposers = [initProjects(), initGalleryModal()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Manifesting the <span className="tagline-name">Infinite Canvas</span></>}
    >
      <main>
        <header className="page-header">
          <Link href="/projects/graphic" className="back-link"><span>←</span> Back to Graphic Projects</Link>
          <p className="section-label">Immersive Gallery</p>
          <h1 className="page-title">Digital Artworks</h1>
          <p className="bio-para" style={{ textAlign: 'left', margin: 0 }}>
            A high-fidelity collection of digital portraits, cinematic illustrations, and character studies exploring the
            intersection of pop culture and cosmic aesthetics.
          </p>
        </header>

        <div className="gallery-container">
          <div className="masonry-grid">
            {/* Item 1: Temporal Bonds */}
            <div className="masonry-item landscape" style={cssVars({ '--item-index': 1 })}>
              <img src="/Images/artworks/thumbs/Loki-sylvie.webp" alt="Temporal Bonds" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Illustration</span>
                <h2 className="info-title">Temporal Bonds</h2>
                <p className="info-sub">Exploring the duality and cosmic connection between Loki and his variant, Sylvie.</p>
                <a href="/Images/artworks/Loki-sylvie.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 2: Justice or Ego? (Kira) */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 2 })}>
              <img src="/Images/artworks/thumbs/kira1.webp" alt="Kira Yukimura from Teen Wolf" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Character Study</span>
                <h2 className="info-title">The Thunder Kitsune</h2>
                <p className="info-sub">A character study of Kira Yukimura, the thunder kitsune from Teen Wolf.</p>
                <a href="/Images/artworks/kira1.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 3: Edgerunners */}
            <div className="masonry-item landscape" style={cssVars({ '--item-index': 3 })}>
              <img src="/Images/artworks/thumbs/lucy-david.webp" alt="Edgerunners" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Digital Portrait</span>
                <h2 className="info-title">Edgerunners</h2>
                <p className="info-sub">A neon-soaked tribute to the tragic connection in Night City.</p>
                <a href="/Images/artworks/lucy-david.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 4: Spidey Hearts */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 4 })}>
              <img src="/Images/artworks/thumbs/spidey.webp" alt="Friendly Neighborhood" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Illustration</span>
                <h2 className="info-title">Friendly Neighborhood</h2>
                <p className="info-sub">A dynamic composition capturing the iconic energy of the web-slinger.</p>
                <a href="/Images/artworks/spidey.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 5: Loki Solo */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 5 })}>
              <img src="/Images/artworks/thumbs/loki.webp" alt="Loki with the Tesseract" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Portrait</span>
                <h2 className="info-title">God of Mischief</h2>
                <p className="info-sub">A character study of Loki Laufeyson wielding the Tesseract, from Marvel&apos;s Avengers films.</p>
                <a href="/Images/artworks/loki.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 6: Amazing One (Andrew) */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 6 })}>
              <img src="/Images/artworks/thumbs/andrew.webp" alt="The Amazing One" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Portrait</span>
                <h2 className="info-title">The Amazing One</h2>
                <p className="info-sub">A cinematic character study of the Peter Parker variant across the multiverse.</p>
                <a href="/Images/artworks/andrew.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 7: Water Breathing (Demon Slayer) */}
            <div className="masonry-item landscape" style={cssVars({ '--item-index': 7 })}>
              <img src="/Images/artworks/thumbs/demonslayer.webp" alt="Water Breathing" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Fan Art</span>
                <h2 className="info-title">Water Breathing</h2>
                <p className="info-sub">A stylistic tribute to the breathing techniques of the Demon Slayer Corps.</p>
                <a href="/Images/artworks/demonslayer.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 8: Unlikely Connection (Otis & Ruby) */}
            <div className="masonry-item landscape" style={cssVars({ '--item-index': 8 })}>
              <img src="/Images/artworks/thumbs/otisruby.webp" alt="Unlikely Connection" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Character Study</span>
                <h2 className="info-title">Unlikely Connection</h2>
                <p className="info-sub">Exploring the emotional depth of a bond found in the most unexpected places.</p>
                <a href="/Images/artworks/otisruby.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 9: Kakashi */}
            <div className="masonry-item portrait feature-tall" style={cssVars({ '--item-index': 9 })}>
              <img src="/Images/artworks/thumbs/Kakashi.webp" alt="The Copy Ninja" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="835" />
              <div className="artwork-info">
                <span className="info-tag">Character Study</span>
                <h2 className="info-title">The Copy Ninja</h2>
                <p className="info-sub">A hyper-detailed portrait of Kakashi Hatake exploring depth and textural realism.</p>
                <a href="/Images/artworks/Kakashi.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 10: Winged Freedom */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 10 })}>
              <img src="/Images/artworks/thumbs/freedom.webp" alt="The Winged Freedom" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Conceptual Art</span>
                <h2 className="info-title">Winged Freedom</h2>
                <p className="info-sub">An allegorical piece exploring the weight of choice and the flight of the soul.</p>
                <a href="/Images/artworks/freedom.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 11: The Quiet Grave */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 11 })}>
              <img src="/Images/artworks/thumbs/grave.webp" alt="Grave of the Fireflies fan art" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Mood Piece</span>
                <h2 className="info-title">The Quiet Grave</h2>
                <p className="info-sub">Fan art inspired by Studio Ghibli&apos;s Grave of the Fireflies.</p>
                <a href="/Images/artworks/grave.webp" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
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
