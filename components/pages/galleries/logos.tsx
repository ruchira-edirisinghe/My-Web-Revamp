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
            Over the years I&apos;ve designed logos and brand identities for all sorts of clients, including tech startups,
            university clubs, large international companies and my own personal brand. Here are some of my favourites.
          </p>
        </header>

        <div className="gallery-container">
          <div className="masonry-grid">
            {/* Item 1: Akila Physics */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 1 })}>
              <img src="/Images/artworks/logos/thumbs/akila.webp" data-highres="/Images/artworks/logos/akila.webp" alt="Akila Physics" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Identity Design</span>
                <h2 className="info-title">Akila Physics</h2>
                <p className="info-sub">A logo for a physics tuition teacher, used for their classes, marketing and branding.</p>
              </div>
            </div>

            {/* Item 2: Bumpie */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 2 })}>
              <img src="/Images/artworks/logos/thumbs/bumpie.webp" data-highres="/Images/artworks/logos/bumpie.webp" alt="Bumpie" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Software Brand</span>
                <h2 className="info-title">Bumpie</h2>
                <p className="info-sub">The visual identity for Bumpie, a software platform for maternity status monetization.</p>
              </div>
            </div>

            {/* Item 3: Celeritas */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 3 })}>
              <img src="/Images/artworks/logos/thumbs/celeritas.webp" data-highres="/Images/artworks/logos/celeritas.webp" alt="Celeritas" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Logistics Branding</span>
                <h2 className="info-title">Celeritas</h2>
                <p className="info-sub">A logo for an agent management system used by an international courier service.</p>
              </div>
            </div>

            {/* Item 4: Lanka Dairy Engineers */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 4 })}>
              <img src="/Images/artworks/logos/thumbs/dairy.webp" data-highres="/Images/artworks/logos/dairy.webp" alt="Lanka Dairy" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Corporate Identity</span>
                <h2 className="info-title">Lanka Dairy</h2>
                <p className="info-sub">Branding for a company that produces and distributes dairy milk.</p>
              </div>
            </div>

            {/* Item 5: D.N.S. */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 5 })}>
              <img src="/Images/artworks/logos/thumbs/dns.webp" data-highres="/Images/artworks/logos/dns.webp" alt="D.N.S." className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Community Club</span>
                <h2 className="info-title">D.N.S.</h2>
                <p className="info-sub">A logo for the Networking Department&apos;s community club at my university.</p>
              </div>
            </div>

            {/* Item 6: Electra */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 6 })}>
              <img src="/Images/artworks/logos/thumbs/electra.webp" data-highres="/Images/artworks/logos/electra.webp" alt="Electra" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Energy Software</span>
                <h2 className="info-title">Electra</h2>
                <p className="info-sub">The visual identity for a university software project focused on solar energy.</p>
              </div>
            </div>

            {/* Item 7: FunExtreme */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 7 })}>
              <img src="/Images/artworks/logos/thumbs/funextreme.webp" data-highres="/Images/artworks/logos/funextreme.webp" alt="FunExtreme" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Recreational</span>
                <h2 className="info-title">FunExtreme</h2>
                <p className="info-sub">Custom branding for a platform built around adventure and recreational activities.</p>
              </div>
            </div>

            {/* Item 8: Gaming Community */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 8 })}>
              <img src="/Images/artworks/logos/thumbs/gaming.webp" data-highres="/Images/artworks/logos/gaming.webp" alt="Gaming Community" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">University Life</span>
                <h2 className="info-title">Gaming Community</h2>
                <p className="info-sub">The official logo for the Gaming Community of NSBM Green University.</p>
              </div>
            </div>

            {/* Item 9: Gears & Glam */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 9 })}>
              <img src="/Images/artworks/logos/thumbs/gears.webp" data-highres="/Images/artworks/logos/gears.webp" alt="Gears & Glam" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Apparel Brand</span>
                <h2 className="info-title">Gears & Glam</h2>
                <p className="info-sub">A logo for a clothing brand that sells glamorous, modern fashion.</p>
              </div>
            </div>

            {/* Item 10: GEvents */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 10 })}>
              <img src="/Images/artworks/logos/thumbs/gevents.webp" data-highres="/Images/artworks/logos/gevents.webp" alt="GEvents" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Event Management</span>
                <h2 className="info-title">GEvents</h2>
                <p className="info-sub">Branding for a modern startup that handles event planning and logistics.</p>
              </div>
            </div>

            {/* Item 11: Grubit */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 11 })}>
              <img src="/Images/artworks/logos/thumbs/grubit.webp" data-highres="/Images/artworks/logos/grubit.webp" alt="Grubit" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Food Tech</span>
                <h2 className="info-title">Grubit</h2>
                <p className="info-sub">A playful, modern identity for a food delivery service.</p>
              </div>
            </div>

            {/* Item 12: HassleFree */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 12 })}>
              <img src="/Images/artworks/logos/thumbs/hassle.webp" data-highres="/Images/artworks/logos/hassle.webp" alt="HassleFree" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Courier Service</span>
                <h2 className="info-title">HassleFree</h2>
                <p className="info-sub">A logo for a courier service that puts fast delivery and good customer support first.</p>
              </div>
            </div>

            {/* Item 13: HealHub */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 13 })}>
              <img src="/Images/artworks/logos/thumbs/heal.webp" data-highres="/Images/artworks/logos/heal.webp" alt="HealHub" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Healthcare IT</span>
                <h2 className="info-title">HealHub</h2>
                <p className="info-sub">The identity for a university software project that manages health records.</p>
              </div>
            </div>

            {/* Item 14: HNC */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 14 })}>
              <img src="/Images/artworks/logos/thumbs/hnc.webp" data-highres="/Images/artworks/logos/hnc.webp" alt="HNC" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Personal Brand</span>
                <h2 className="info-title">HNC</h2>
                <p className="info-sub">A logo for a gaming streamer, used across their channels and marketing.</p>
              </div>
            </div>

            {/* Item 15: IMLAN */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 15 })}>
              <img src="/Images/artworks/logos/thumbs/imlan.webp" data-highres="/Images/artworks/logos/imlan.webp" alt="IMLAN" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Education</span>
                <h2 className="info-title">IMLAN</h2>
                <p className="info-sub">Branding for IMLAN, an immersive language learning system I worked on for Pearson.</p>
              </div>
            </div>

            {/* Item 16: KoneKza */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 16 })}>
              <img src="/Images/artworks/logos/thumbs/konekza.webp" data-highres="/Images/artworks/logos/konekza.webp" alt="KoneKza" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Tech & Networking</span>
                <h2 className="info-title">KoneKza</h2>
                <p className="info-sub">Clean, professional branding for a company that provides networking and connectivity solutions.</p>
              </div>
            </div>

            {/* Item 17: OHL */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 17 })}>
              <img src="/Images/artworks/logos/thumbs/ohl.webp" data-highres="/Images/artworks/logos/ohl.webp" alt="OHL" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Logo Redesign</span>
                <h2 className="info-title">OHL</h2>
                <p className="info-sub">A modern redesign of the OHL logo, made for the brand&apos;s future promotions.</p>
              </div>
            </div>

            {/* Item 18: PhURL */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 18 })}>
              <img src="/Images/artworks/logos/thumbs/phurl.webp" data-highres="/Images/artworks/logos/phurl.webp" alt="PhURL" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Cyber Security</span>
                <h2 className="info-title">PhURL</h2>
                <p className="info-sub">The logo for PhURL, my phishing URL detection system that helps keep people safe online.</p>
              </div>
            </div>

            {/* Item 19: SureID */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 19 })}>
              <img src="/Images/artworks/logos/thumbs/sureid.webp" data-highres="/Images/artworks/logos/sureid.webp" alt="SureID" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Verification</span>
                <h2 className="info-title">SureID</h2>
                <p className="info-sub">Branding for an identity verification product, designed to feel secure and trustworthy.</p>
              </div>
            </div>

            {/* Item 20: TAKG */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 20 })}>
              <img src="/Images/artworks/logos/thumbs/takg.webp" data-highres="/Images/artworks/logos/takg.webp" alt="TAKG" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Startup Branding</span>
                <h2 className="info-title">TAKG</h2>
                <p className="info-sub">The visual identity for TAKG, the tech startup I co-founded.</p>
              </div>
            </div>

            {/* Item 21: WishKids */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 21 })}>
              <img src="/Images/artworks/logos/thumbs/wish.webp" data-highres="/Images/artworks/logos/wish.webp" alt="WishKids" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Community Service</span>
                <h2 className="info-title">WishKids</h2>
                <p className="info-sub">A logo for a project that brings water to people affected by drought.</p>
              </div>
            </div>

            {/* Item 22: XUPING */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 22 })}>
              <img src="/Images/artworks/logos/thumbs/xuping.webp" data-highres="/Images/artworks/logos/xuping.webp" alt="XUPING" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Global Enterprise</span>
                <h2 className="info-title">XUPING</h2>
                <p className="info-sub">A logo for a multinational group of companies working across many different industries.</p>
              </div>
            </div>

            {/* Item 23: Yasupi */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 23 })}>
              <img src="/Images/artworks/logos/thumbs/yasupi.webp" data-highres="/Images/artworks/logos/yasupi.webp" alt="Yasupi" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Distribution</span>
                <h2 className="info-title">Yasupi</h2>
                <p className="info-sub">Branding for a local distribution and logistics network.</p>
              </div>
            </div>

            {/* Item 24: ZEN */}
            <div className="masonry-item logo-card" style={cssVars({ '--item-index': 24 })}>
              <img src="/Images/artworks/logos/thumbs/zen.webp" data-highres="/Images/artworks/logos/zen.webp" alt="ZEN" className="artwork-img" loading="lazy" decoding="async" />
              <div className="artwork-info">
                <span className="info-tag">Artist Branding</span>
                <h2 className="info-title">ZEN</h2>
                <p className="info-sub">My own personal brand, which I use for my freelance creative work.</p>
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
