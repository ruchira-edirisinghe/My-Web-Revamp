'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initGalleryModal } from '@/lib/scripts/gallery-modal';

export default function GalleryLogos() {
  useEffect(() => {
    const disposers = [initProjects(), initGalleryModal()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Forging the <span className="tagline-name">Identity Matrix</span></>}
    >
      <main>
        <header className="page-header">
          <Link href="/projects/graphic" className="back-link"><span>←</span> Back to Graphic Projects</Link>
          <p className="section-label">Identity & Branding</p>
          <h1 className="page-title">Logo Designs</h1>
          <p className="bio-para" style={{ textAlign: 'left', margin: 0 }}>
            A specialized collection of visual identities, brand marks, and typography systems crafted for diverse industries,
            ranging from tech startups and campus clubs to multinational enterprises and personal branding.
          </p>
        </header>

        <div className="gallery-container">
          <div className="masonry-grid">
            {/* Item 1: Akila Physics */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 1 })}>
              <img src="/Images/artworks/logos/thumbs/akila.jpg" data-highres="/Images/artworks/logos/akila.png" alt="Akila Physics" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Identity Design</span>
                <h3 className="info-title">Akila Physics</h3>
                <p className="info-sub">Designed for a Physics Tuition Teacher for marketing and branding purposes.</p>
              </div>
            </div>

            {/* Item 2: Bumpie */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 2 })}>
              <img src="/Images/artworks/logos/thumbs/bumpie.jpg" data-highres="/Images/artworks/logos/bumpie.png" alt="Bumpie" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Software Brand</span>
                <h3 className="info-title">Bumpie</h3>
                <p className="info-sub">Visual identity for a Maternity Status Monetization Software platform.</p>
              </div>
            </div>

            {/* Item 3: Celeritas */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 3 })}>
              <img src="/Images/artworks/logos/thumbs/celeritas.jpg" data-highres="/Images/artworks/logos/celeritas.png" alt="Celeritas" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Logistics Branding</span>
                <h3 className="info-title">Celeritas</h3>
                <p className="info-sub">Designed for an international courier service agent management system.</p>
              </div>
            </div>

            {/* Item 4: Lanka Dairy Engineers */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 4 })}>
              <img src="/Images/artworks/logos/thumbs/dairy.jpg" data-highres="/Images/artworks/logos/dairy.png" alt="Lanka Dairy" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Corporate Identity</span>
                <h3 className="info-title">Lanka Dairy</h3>
                <p className="info-sub">Branding for a dairy milk production and distribution company.</p>
              </div>
            </div>

            {/* Item 5: D.N.S. */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 5 })}>
              <img src="/Images/artworks/logos/thumbs/dns.jpg" data-highres="/Images/artworks/logos/dns.png" alt="D.N.S." className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Community Club</span>
                <h3 className="info-title">D.N.S.</h3>
                <p className="info-sub">Designed for a campus community club for the Networking Department.</p>
              </div>
            </div>

            {/* Item 6: Electra */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 6 })}>
              <img src="/Images/artworks/logos/thumbs/electra.jpg" data-highres="/Images/artworks/logos/electra.png" alt="Electra" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Energy Software</span>
                <h3 className="info-title">Electra</h3>
                <p className="info-sub">Visual identity for a university software project in solar energy.</p>
              </div>
            </div>

            {/* Item 7: FunExtreme */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 7 })}>
              <img src="/Images/artworks/logos/thumbs/funextreme.jpg" data-highres="/Images/artworks/logos/funextreme.png" alt="FunExtreme" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Recreational</span>
                <h3 className="info-title">FunExtreme</h3>
                <p className="info-sub">Custom branding for an adventure and recreational-focused platform.</p>
              </div>
            </div>

            {/* Item 8: Gaming Community */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 8 })}>
              <img src="/Images/artworks/logos/thumbs/gaming.jpg" data-highres="/Images/artworks/logos/gaming.png" alt="Gaming Community" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">University Life</span>
                <h3 className="info-title">Gaming Community</h3>
                <p className="info-sub">Official identity for the Gaming Community of NSBM Green University.</p>
              </div>
            </div>

            {/* Item 9: Gears & Glam */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 9 })}>
              <img src="/Images/artworks/logos/thumbs/gears.jpg" data-highres="/Images/artworks/logos/gears.png" alt="Gears & Glam" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Apparel Brand</span>
                <h3 className="info-title">Gears & Glam</h3>
                <p className="info-sub">Designed for a clothing brand focused on glamorous, modern products.</p>
              </div>
            </div>

            {/* Item 10: GEvents */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 10 })}>
              <img src="/Images/artworks/logos/thumbs/gevents.jpg" data-highres="/Images/artworks/logos/gevents.png" alt="GEvents" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Event Management</span>
                <h3 className="info-title">GEvents</h3>
                <p className="info-sub">Branding solution for a modern event planning and logistics startup.</p>
              </div>
            </div>

            {/* Item 11: Grubit */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 11 })}>
              <img src="/Images/artworks/logos/thumbs/grubit.jpg" data-highres="/Images/artworks/logos/grubit.png" alt="Grubit" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Food Tech</span>
                <h3 className="info-title">Grubit</h3>
                <p className="info-sub">A playful and modern visual identity for a food delivery service.</p>
              </div>
            </div>

            {/* Item 12: HassleFree */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 12 })}>
              <img src="/Images/artworks/logos/thumbs/hassle.jpg" data-highres="/Images/artworks/logos/hassle.png" alt="HassleFree" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Courier Service</span>
                <h3 className="info-title">HassleFree</h3>
                <p className="info-sub">Designed for a courier service prioritizing customer support and speed.</p>
              </div>
            </div>

            {/* Item 13: HealHub */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 13 })}>
              <img src="/Images/artworks/logos/thumbs/heal.jpg" data-highres="/Images/artworks/logos/heal.png" alt="HealHub" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Healthcare IT</span>
                <h3 className="info-title">HealHub</h3>
                <p className="info-sub">Identity for a university health management software project.</p>
              </div>
            </div>

            {/* Item 14: HNC */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 14 })}>
              <img src="/Images/artworks/logos/thumbs/hnc.jpg" data-highres="/Images/artworks/logos/hnc.png" alt="HNC" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Personal Brand</span>
                <h3 className="info-title">HNC</h3>
                <p className="info-sub">Designed for a gaming streamer for marketing and digital presence.</p>
              </div>
            </div>

            {/* Item 15: IMLAN */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 15 })}>
              <img src="/Images/artworks/logos/thumbs/imlan.jpg" data-highres="/Images/artworks/logos/imlan.png" alt="IMLAN" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Education</span>
                <h3 className="info-title">IMLAN</h3>
                <p className="info-sub">Branding for an Immersive Language Learning System (IMLAN) for Pearson.</p>
              </div>
            </div>

            {/* Item 16: KoneKza */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 16 })}>
              <img src="/Images/artworks/logos/thumbs/konekza.jpg" data-highres="/Images/artworks/logos/konekza.png" alt="KoneKza" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Tech & Networking</span>
                <h3 className="info-title">KoneKza</h3>
                <p className="info-sub">Sophisticated branding for a networking and connectivity solution provider.</p>
              </div>
            </div>

            {/* Item 17: OHL */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 17 })}>
              <img src="/Images/artworks/logos/thumbs/ohl.jpg" data-highres="/Images/artworks/logos/ohl.png" alt="OHL" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Logo Redesign</span>
                <h3 className="info-title">OHL</h3>
                <p className="info-sub">Modern redesign of the OHL brand for future promotional purposes.</p>
              </div>
            </div>

            {/* Item 18: PhURL */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 18 })}>
              <img src="/Images/artworks/logos/thumbs/phurl.jpg" data-highres="/Images/artworks/logos/phurl.png" alt="PhURL" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Cyber Security</span>
                <h3 className="info-title">PhURL</h3>
                <p className="info-sub">Designed for a Phishing URL Detection System which aims to protect users.</p>
              </div>
            </div>

            {/* Item 19: SureID */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 19 })}>
              <img src="/Images/artworks/logos/thumbs/sureid.jpg" data-highres="/Images/artworks/logos/sureid.png" alt="SureID" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Verification</span>
                <h3 className="info-title">SureID</h3>
                <p className="info-sub">A secure and trustworthy identity verification branding project.</p>
              </div>
            </div>

            {/* Item 20: TAKG */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 20 })}>
              <img src="/Images/artworks/logos/thumbs/takg.jpg" data-highres="/Images/artworks/logos/takg.png" alt="TAKG" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Startup Branding</span>
                <h3 className="info-title">TAKG</h3>
                <p className="info-sub">Visual identity designed for a tech startup business ecosystem.</p>
              </div>
            </div>

            {/* Item 21: WishKids */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 21 })}>
              <img src="/Images/artworks/logos/thumbs/wish.jpg" data-highres="/Images/artworks/logos/wish.png" alt="WishKids" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Community Service</span>
                <h3 className="info-title">WishKids</h3>
                <p className="info-sub">Designed for a project to fulfill water needs for people suffering from drought.</p>
              </div>
            </div>

            {/* Item 22: XUPING */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 22 })}>
              <img src="/Images/artworks/logos/thumbs/xuping.jpg" data-highres="/Images/artworks/logos/xuping.png" alt="XUPING" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Global Enterprise</span>
                <h3 className="info-title">XUPING</h3>
                <p className="info-sub">Designed for a multinational group of companies across diverse fields.</p>
              </div>
            </div>

            {/* Item 23: Yasupi */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 23 })}>
              <img src="/Images/artworks/logos/thumbs/yasupi.jpg" data-highres="/Images/artworks/logos/yasupi.png" alt="Yasupi" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Distribution</span>
                <h3 className="info-title">Yasupi</h3>
                <p className="info-sub">Branding for a local distribution and logistics network platform.</p>
              </div>
            </div>

            {/* Item 24: ZEN */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 24 })}>
              <img src="/Images/artworks/logos/thumbs/zen.jpg" data-highres="/Images/artworks/logos/zen.png" alt="ZEN" className="artwork-img" loading="lazy" />
              <div className="artwork-info">
                <span className="info-tag">Artist Branding</span>
                <h3 className="info-title">ZEN</h3>
                <p className="info-sub">Personal brand designed to represent myself for freelance creative projects.</p>
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
