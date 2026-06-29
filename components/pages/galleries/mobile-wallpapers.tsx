'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initGalleryModal } from '@/lib/scripts/gallery-modal';

export default function GalleryMobileWallpapers() {
  useEffect(() => {
    const disposers = [initProjects(), initGalleryModal()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Tailoring Your <span className="tagline-name">Pocket Universe</span></>}
    >
      <main>
        <header className="page-header">
          <Link href="/projects/graphic" className="back-link"><span>←</span> Back to Graphic Projects</Link>
          <p className="section-label">Digital Personalization</p>
          <h1 className="page-title">Mobile Wallpapers</h1>
          <p className="bio-para" style={{ textAlign: 'left', margin: 0 }}>
            A curated collection of minimalist, high-fidelity wallpapers optimized for modern AMOLED displays.
          </p>
        </header>

        <div className="gallery-container">
          <div className="wallpaper-grid">
            {/* Wallpaper 1 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 1 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/1.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/1.png" alt="Mobile Wallpaper 1" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 2 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 2 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/2.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/2.png" alt="Mobile Wallpaper 2" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 3 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 3 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/3.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/3.png" alt="Mobile Wallpaper 3" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 4 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 4 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/4.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/4.png" alt="Mobile Wallpaper 4" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 5 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 5 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/5.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/5.png" alt="Mobile Wallpaper 5" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 6 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 6 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/6.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/6.png" alt="Mobile Wallpaper 6" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 7 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 7 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/7.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/7.png" alt="Mobile Wallpaper 7" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 8 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 8 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/8.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/8.png" alt="Mobile Wallpaper 8" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 9 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 9 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/9.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/9.png" alt="Mobile Wallpaper 9" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 10 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 10 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/10.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/10.png" alt="Mobile Wallpaper 10" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 11 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 11 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/11.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/11.jpg" alt="Mobile Wallpaper 11" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 12 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 12 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/12.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/12.png" alt="Mobile Wallpaper 12" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 13 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 13 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/13.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/13.png" alt="Mobile Wallpaper 13" className="artwork-img"
                loading="lazy" decoding="async" />
            </div>
            {/* Wallpaper 14 */}
            <div className="wallpaper-item" style={cssVars({ '--item-index': 14 })}>
              <img src="/Images/artworks/mobile-wallpaper/thumbs/14.jpg"
                data-highres="/Images/artworks/mobile-wallpaper/14.jpg" alt="Mobile Wallpaper 14" className="artwork-img"
                loading="lazy" decoding="async" />
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
