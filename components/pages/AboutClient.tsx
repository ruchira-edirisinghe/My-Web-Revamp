'use client';
import { useEffect, useState } from 'react';
import StandardShell from '@/components/StandardShell';
import SignOff from '@/components/SignOff';
import Sheet from '@/components/Sheet';
import AboutStory from '@/components/about/AboutStory';
import AboutStats from '@/components/about/AboutStats';
import AboutStack from '@/components/about/AboutStack';
import AboutChannels from '@/components/about/AboutChannels';
import AboutVoices from '@/components/about/AboutVoices';
import AboutHero from '@/components/about/AboutHero';
import { initAbout } from '@/lib/scripts/about';

export default function AboutClient() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  useEffect(() => {
    const disposers = [initAbout()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="about"
      dataPage="about"
      tagline={<>Getting to know more about<br className="tagline-br" /> <span className="tagline-name">Ruchira Edirisinghe</span></>}
    >
      <main className="page">
          <p className="section-label">Get to know me</p>
          <h1 className="page-title">About Me</h1>
      
          <div className="ab-hero">
            <AboutHero onCv={() => setIsCvModalOpen(true)} />

            <Sheet open={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} labelledBy="cv-title" describedBy="cv-desc">
              <button type="button" className="xg-x" aria-label="Close" onClick={() => setIsCvModalOpen(false)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
              <div className="xg-orb" aria-hidden="true">
                <span className="xg-orb-ring" />
                <svg className="xg-orb-icon" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
                </svg>
              </div>
              <p className="xg-kicker">Curriculum Vitae</p>
              <h2 id="cv-title" className="xg-title">Ruchira Edirisinghe</h2>
              <p className="xg-detail">UI/UX Engineer &amp; Game Developer</p>
              <p id="cv-desc" className="xg-desc">
                Save a copy of my CV as a PDF, or have a look at it on <strong>Google Drive</strong> first.
              </p>
              <div className="xg-dest">
                <svg className="xg-lock" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></svg>
                <span>ruchiraedirisinghe-cv.pdf</span>
              </div>
              <div className="xg-actions">
                {/* The choice is already made here, so Drive skips the leaving-the-site check. */}
                <a
                  className="xg-btn"
                  href="https://drive.google.com/file/d/1VOlUmLOLnbNnXnkU8TE6Y9E5qZbVBvOY/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-no-guard
                  onClick={() => setIsCvModalOpen(false)}
                >
                  View on Drive
                </a>
                <a
                  className="xg-btn is-go"
                  href="/docs/ruchiraedirisinghe-cv.pdf"
                  download="Ruchira_Edirisinghe_CV.pdf"
                  data-autofocus
                  onClick={() => setIsCvModalOpen(false)}
                >
                  Download
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
                </a>
              </div>
            </Sheet>

          </div>
          <p className="ab-kicker ab-ticker-k">Teams &amp; brands I&rsquo;ve worked with</p>
          <div className="logo-ticker-wrap">
            <div className="logo-ticker-inner" id="logo-ticker-inner">
              
              <div className="ticker-set" id="ticker-set-a">
                <img className="ticker-logo" src="/Images/logobar/trex-labs.webp" alt="Trex Labs" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/zuse-technologies.webp" alt="ZUSE Technologies" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/zen-creatives.webp" alt="Zen Creatives" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/eleetra.webp" alt="Eleetra" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/livecode.webp" alt="LiveCode" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/runtime-terror.webp" alt="Runtime Terror" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/sl-cyber-designs.webp" alt="SL Cyber Designs" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/takg-solutions.webp" alt="TAKG Solutions" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/wrc.webp" alt="WRC" decoding="async" />
              </div>

              <div className="ticker-set" aria-hidden="true">
                <img className="ticker-logo" src="/Images/logobar/trex-labs.webp" alt="" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/zuse-technologies.webp" alt="" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/zen-creatives.webp" alt="" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/eleetra.webp" alt="" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/livecode.webp" alt="" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/runtime-terror.webp" alt="" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/sl-cyber-designs.webp" alt="" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/takg-solutions.webp" alt="" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/wrc.webp" alt="" decoding="async" />
              </div>
            </div>
          </div>
      

          <AboutStory />
          <AboutStats />
          <AboutStack />
          <AboutChannels />
          <AboutVoices />

          <SignOff className="about-signoff" />
        </main>

      {/* Extra top fade chrome specific to the About page (not part of StandardShell) */}
      <div id="nav-fade-mask"></div>


    </StandardShell>
  );
}
