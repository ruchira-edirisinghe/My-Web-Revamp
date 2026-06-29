'use client';
import { useEffect } from 'react';
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
          <a href="/projects/graphic" className="back-link"><span>←</span> Back to Graphic Projects</a>
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
              <img src="/Images/artworks/thumbs/Loki-sylvie.jpg" alt="Temporal Bonds" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Illustration</span>
                <h3 className="info-title">Temporal Bonds</h3>
                <p className="info-sub">Exploring the duality and cosmic connection between Loki and his variant, Sylvie.</p>
                <a href="/Images/artworks/Loki-sylvie.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 2: Justice or Ego? (Kira) */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 2 })}>
              <img src="/Images/artworks/thumbs/kira1.jpg" alt="Justice or Ego?" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Character Study</span>
                <h3 className="info-title">Justice or Ego?</h3>
                <p className="info-sub">A psychological exploration of Light Yagami and his divine descent.</p>
                <a href="/Images/artworks/kira1.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 3: Edgerunners */}
            <div className="masonry-item landscape" style={cssVars({ '--item-index': 3 })}>
              <img src="/Images/artworks/thumbs/lucy-david.jpg" alt="Edgerunners" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Digital Portrait</span>
                <h3 className="info-title">Edgerunners</h3>
                <p className="info-sub">A neon-soaked tribute to the tragic connection in Night City.</p>
                <a href="/Images/artworks/lucy-david.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 4: Spidey Hearts */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 4 })}>
              <img src="/Images/artworks/thumbs/spidey.jpg" alt="Friendly Neighborhood" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Illustration</span>
                <h3 className="info-title">Friendly Neighborhood</h3>
                <p className="info-sub">A dynamic composition capturing the iconic energy of the web-slinger.</p>
                <a href="/Images/artworks/spidey.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 5: Loki Solo */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 5 })}>
              <img src="/Images/artworks/thumbs/loki.jpg" alt="God of Mischief" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Portrait</span>
                <h3 className="info-title">God of Mischief</h3>
                <p className="info-sub">A regal character study of Loki Laufeyjson in his celestial prime.</p>
                <a href="/Images/artworks/loki.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 6: Amazing One (Andrew) */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 6 })}>
              <img src="/Images/artworks/thumbs/andrew.jpg" alt="The Amazing One" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Portrait</span>
                <h3 className="info-title">The Amazing One</h3>
                <p className="info-sub">A cinematic character study of the Peter Parker variant across the multiverse.</p>
                <a href="/Images/artworks/andrew.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 7: Water Breathing (Demon Slayer) */}
            <div className="masonry-item landscape" style={cssVars({ '--item-index': 7 })}>
              <img src="/Images/artworks/thumbs/demonslayer.jpg" alt="Water Breathing" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Fan Art</span>
                <h3 className="info-title">Water Breathing</h3>
                <p className="info-sub">A stylistic tribute to the breathing techniques of the Demon Slayer Corps.</p>
                <a href="/Images/artworks/demonslayer.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 8: Unlikely Connection (Otis & Ruby) */}
            <div className="masonry-item landscape" style={cssVars({ '--item-index': 8 })}>
              <img src="/Images/artworks/thumbs/otisruby.jpg" alt="Unlikely Connection" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Character Study</span>
                <h3 className="info-title">Unlikely Connection</h3>
                <p className="info-sub">Exploring the emotional depth of a bond found in the most unexpected places.</p>
                <a href="/Images/artworks/otisruby.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 9: Kakashi */}
            <div className="masonry-item portrait feature-tall" style={cssVars({ '--item-index': 9 })}>
              <img src="/Images/artworks/thumbs/Kakashi.jpg" alt="The Copy Ninja" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="835" />
              <div className="artwork-info">
                <span className="info-tag">Character Study</span>
                <h3 className="info-title">The Copy Ninja</h3>
                <p className="info-sub">A hyper-detailed portrait of Kakashi Hatake exploring depth and textural realism.</p>
                <a href="/Images/artworks/Kakashi.jpg" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 10: Winged Freedom */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 10 })}>
              <img src="/Images/artworks/thumbs/freedom.jpg" alt="The Winged Freedom" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Conceptual Art</span>
                <h3 className="info-title">Winged Freedom</h3>
                <p className="info-sub">An allegorical piece exploring the weight of choice and the flight of the soul.</p>
                <a href="/Images/artworks/freedom.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

            {/* Item 11: The Quiet Grave */}
            <div className="masonry-item portrait" style={cssVars({ '--item-index': 11 })}>
              <img src="/Images/artworks/thumbs/grave.jpg" alt="The Quiet Grave" className="artwork-img" loading="lazy"
                decoding="async" width="800" height="500" />
              <div className="artwork-info">
                <span className="info-tag">Mood Piece</span>
                <h3 className="info-title">The Quiet Grave</h3>
                <p className="info-sub">Atmospheric concept art exploring silence, memory, and the passage of time.</p>
                <a href="/Images/artworks/grave.png" target="_blank" rel="noopener noreferrer" className="view-btn">Full Image ↗</a>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── IMAGE MODAL ── */}
      <div id="artwork-modal" className="modal-overlay" aria-hidden="true">
        <button id="modal-close" aria-label="Close modal">×</button>
        <div className="modal-content">
          <img id="modal-img" src="" alt="Full size preview" />
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
