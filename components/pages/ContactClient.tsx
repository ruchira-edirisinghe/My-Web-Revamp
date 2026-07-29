// @ts-nocheck
'use client';
import { useEffect } from 'react';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initContact } from '@/lib/scripts/contact';

const LOTTIE_SRC = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js';
const LOTTIE_ANIM = 'https://lottie.host/095f4fb8-36c3-4d6d-9497-08c839fad6e1/t6yZPomlAe.lottie';

export default function ContactClient() {
  useEffect(() => {
    const disposers = [initContact()];

    // Load the dotlottie web component module once (it defines <dotlottie-wc>).
    let lottieScript: HTMLScriptElement | null = null;
    if (!document.querySelector(`script[src="${LOTTIE_SRC}"]`)) {
      lottieScript = document.createElement('script');
      lottieScript.type = 'module';
      lottieScript.src = LOTTIE_SRC;
      document.head.appendChild(lottieScript);
    }

    return () => {
      disposers.forEach((d) => d && d());
      if (lottieScript && lottieScript.parentNode) lottieScript.parentNode.removeChild(lottieScript);
    };
  }, []);

  return (
    <StandardShell
      active="contact"
      dataPage="contact"
      tagline={<>Connecting you with<br className="tagline-br" /> <span className="tagline-name">Ruchira Edirisinghe</span></>}
    >
      <div id="nav-fade-mask"></div>

      <main className="page">
        {/* Hidden per request - the hero section below carries the intro instead.
        <span className="section-label">Let's talk</span>
        <h1 className="page-title">Contact Me</h1>
        */}

        {/* ── Hero: big text + constellation ── */}
        <section className="contact-hero">
          <div className="contact-hero-left">
            <div className="mobile-lottie-wrap">
              <dotlottie-wc src={LOTTIE_ANIM}
                style={{ width: '280px', height: '280px' }} autoplay loop render-mode="canvas"></dotlottie-wc>
            </div>
            <div className="contact-big-text">
              <span className="line-plain">Ready To Make</span>
              <span className="line-glow">Something Iconic?</span>
            </div>
            <p className="contact-intro-para">
              Whether you have a project in mind, want to collaborate on something exciting, or simply want to say hello -
              I'd love to hear from you. I'm passionate about crafting meaningful digital experiences and always open to new
              opportunities.
            </p>
            <div className="contact-availability">
              <span className="avail-dot"></span>
              Available for new projects
            </div>
          </div>

          <div className="contact-hero-right">
            <div className="constellation-wrap">
              <div className="lottie-container">
                <dotlottie-wc src={LOTTIE_ANIM}
                  style={{ width: '480px', height: '480px' }} autoplay loop render-mode="canvas"></dotlottie-wc>
              </div>
            </div>
          </div>
        </section>

        {/* COSMIC DIVIDER */}
        <div className="cosmic-divider">
          <div className="cosmic-divider-core">
            <span className="cosmic-divider-orb orb-sm"></span>
            <span className="cosmic-divider-orb"></span>
            <span className="cosmic-divider-star">✦</span>
            <span className="cosmic-divider-orb"></span>
            <span className="cosmic-divider-orb orb-sm"></span>
          </div>
        </div>

        <section className="channels-section">
          <div className="channels-grid">

            {/* 1. Email */}
            <div className="channel-card cc-email" data-url="mailto:ruchira.ed@proton.me" data-name="Email"
              data-action="the mailing app to mail to Ruchira Edirisinghe" data-detail="ruchira.ed@proton.me"
              style={cssVars({ '--cc-delay': '0.1s' })}>
              <div className="cc-arrow"><svg viewBox="0 0 24 24">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg></div>
              <div className="cc-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <span className="cc-label">Direct mail</span>
                <p className="cc-name">Email</p>
                <p className="cc-handle">ruchira.ed@proton.me</p>
              </div>
              <p className="cc-desc">Best for project inquiries, collaboration proposals, and anything that deserves a
                thoughtful reply.</p>
            </div>

            {/* 2. Phone */}
            <div className="channel-card cc-phone" data-url="https://wa.me/94774009851" data-name="WhatsApp/Call"
              data-action="WhatsApp to direct contact Ruchira Edirisinghe" data-detail="+94774009851"
              style={cssVars({ '--cc-delay': '0.2s' })}>
              <div className="cc-arrow"><svg viewBox="0 0 24 24">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg></div>
              <div className="cc-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <span className="cc-label">Direct contact</span>
                <p className="cc-name">WhatsApp/Call</p>
                <p className="cc-handle">+94 77 400 9851</p>
              </div>
              <p className="cc-desc">Direct line for urgent discussions, fast updates, or informal brainstorming sessions.</p>
            </div>

            {/* 3. LinkedIn */}
            <div className="channel-card cc-linkedin" data-url="https://www.linkedin.com/in/ruchiraedirisinghe/"
              data-name="LinkedIn" data-action="LinkedIn to view my professional profile"
              data-detail="in/ruchiraedirisinghe" style={cssVars({ '--cc-delay': '0.3s' })}>
              <div className="cc-arrow"><svg viewBox="0 0 24 24">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg></div>
              <div className="cc-icon-wrap">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <span className="cc-label">Professional network</span>
                <p className="cc-name">LinkedIn</p>
                <p className="cc-handle">in/ruchiraedirisinghe</p>
              </div>
              <p className="cc-desc">Connect professionally, explore my work history, endorsements, and career journey in
                detail.</p>
            </div>

            {/* 4. GitHub */}
            <div className="channel-card cc-github" data-url="https://github.com/ruchira-edirisinghe" data-name="GitHub"
              data-action="GitHub to explore my code repositories" data-detail="@ruchira-edirisinghe"
              style={cssVars({ '--cc-delay': '0.4s' })}>
              <div className="cc-arrow"><svg viewBox="0 0 24 24">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg></div>
              <div className="cc-icon-wrap">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div>
                <span className="cc-label">Open source</span>
                <p className="cc-name">GitHub</p>
                <p className="cc-handle">@ruchira-edirisinghe</p>
              </div>
              <p className="cc-desc">Explore my code repositories, open-source contributions, and technical projects.</p>
            </div>

            {/* 5. Behance */}
            <div className="channel-card cc-behance" data-url="https://www.behance.net/ruchiraedirisinghe" data-name="Behance"
              data-action="Behance to browse my design portfolio" data-detail="@ruchiraedirisinghe" style={cssVars({ '--cc-delay': '0.5s' })}>
              <div className="cc-arrow"><svg viewBox="0 0 24 24">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg></div>
              <div className="cc-icon-wrap">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path
                    d="M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z" />
                </svg>
              </div>
              <div>
                <span className="cc-label">Design portfolio</span>
                <p className="cc-name">Behance</p>
                <p className="cc-handle">ruchiraedirisinghe</p>
              </div>
              <p className="cc-desc">Browse my UI/UX design work, creative projects, and curated design case studies.</p>
            </div>

            {/* 6. Instagram */}
            <div className="channel-card cc-instagram" data-url="https://www.instagram.com/ruchii_zzz/?hl=en"
              data-name="Instagram" data-action="Instagram to see my visual stories" data-detail="@ruchii_zzz"
              style={cssVars({ '--cc-delay': '0.6s' })}>
              <div className="cc-arrow"><svg viewBox="0 0 24 24">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg></div>
              <div className="cc-icon-wrap">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div>
                <span className="cc-label">Visual stories</span>
                <p className="cc-name">Instagram</p>
                <p className="cc-handle">@ruchii_zzz</p>
              </div>
              <p className="cc-desc">Behind-the-scenes, creative process snapshots, and a glimpse into my visual world.</p>
            </div>

          </div>
        </section>

        {/* COSMIC DIVIDER */}
        <div className="cosmic-divider" style={{ marginTop: '80px' }}>
          <div className="cosmic-divider-core">
            <span className="cosmic-divider-orb orb-sm"></span>
            <span className="cosmic-divider-orb"></span>
            <span className="cosmic-divider-star">✦</span>
            <span className="cosmic-divider-orb"></span>
            <span className="cosmic-divider-orb orb-sm"></span>
          </div>
        </div>

        {/* ── Orbit "How I Work" section ── */}
        <section className="orbit-section">
          <div className="orbit-visual-wrap">
            {/* Cosmic atmosphere decorations */}
            <div className="space-atmosphere">
              {/* Twinkling stars */}
              <div className="space-star"
                style={cssVars({ top: '10%', left: '20%', width: '2px', height: '2px', '--star-dur': '3s', '--star-delay': '0s', '--star-op': '0.6' })}></div>
              <div className="space-star"
                style={cssVars({ top: '40%', left: '10%', width: '3px', height: '3px', '--star-dur': '4s', '--star-delay': '1s', '--star-op': '0.8' })}></div>
              <div className="space-star"
                style={cssVars({ top: '70%', left: '15%', width: '2px', height: '2px', '--star-dur': '5s', '--star-delay': '2s', '--star-op': '0.5' })}></div>
              <div className="space-star"
                style={cssVars({ top: '20%', left: '80%', width: '3px', height: '3px', '--star-dur': '3.5s', '--star-delay': '0.5s', '--star-op': '0.9' })}></div>
              <div className="space-star"
                style={cssVars({ top: '60%', left: '85%', width: '2px', height: '2px', '--star-dur': '4.5s', '--star-delay': '1.5s', '--star-op': '0.4' })}></div>
              <div className="space-star"
                style={cssVars({ top: '85%', left: '60%', width: '3px', height: '3px', '--star-dur': '4s', '--star-delay': '2.5s', '--star-op': '0.7' })}></div>

              {/* PNG Clouds (Denser multi-layer atmosphere) */}
              <img src="/Images/graphic assets/cloud1.png" className="space-cloud-png"
                style={cssVars({ top: '-12%', left: '-5%', '--cloud-dur': '14s', '--cloud-op': '0.2' })} alt="" />
              <img src="/Images/graphic assets/cloud2.png" className="space-cloud-png"
                style={cssVars({ top: '5%', right: '-10%', '--cloud-dur': '16s', '--cloud-op': '0.15' })} alt="" />
              <img src="/Images/graphic assets/cloud1.png" className="space-cloud-png"
                style={cssVars({ top: '25%', left: '-15%', width: '280px', '--cloud-dur': '22s', '--cloud-op': '0.12', filter: 'blur(15px)' })} alt="" />
              <img src="/Images/graphic assets/cloud2.png" className="space-cloud-png"
                style={cssVars({ top: '45%', right: '-20%', width: '320px', '--cloud-dur': '18s', '--cloud-op': '0.1', filter: 'blur(12px)' })} alt="" />
              <img src="/Images/graphic assets/cloud1.png" className="space-cloud-png"
                style={cssVars({ top: '55%', left: '10%', width: '200px', '--cloud-dur': '14s', '--cloud-op': '0.08', filter: 'blur(20px)', zIndex: 3 })}
                alt="" />
              <img src="/Images/graphic assets/cloud1.png" className="space-cloud-png"
                style={cssVars({ bottom: '8%', left: '-10%', '--cloud-dur': '19s', '--cloud-op': '0.22' })} alt="" />
              <img src="/Images/graphic assets/cloud2.png" className="space-cloud-png"
                style={cssVars({ bottom: '15%', right: '-5%', '--cloud-dur': '17s', '--cloud-op': '0.18' })} alt="" />
              <img src="/Images/graphic assets/cloud1.png" className="space-cloud-png"
                style={cssVars({ bottom: '-8%', left: '15%', width: '350px', '--cloud-dur': '24s', '--cloud-op': '0.15', filter: 'blur(18px)' })} alt="" />
              <img src="/Images/graphic assets/cloud2.png" className="space-cloud-png"
                style={cssVars({ bottom: '35%', left: '-25%', width: '300px', '--cloud-dur': '13s', '--cloud-op': '0.09', filter: 'blur(25px)' })} alt="" />
            </div>

            {/* Flying Astronaut Image */}
            <img src="/Images/graphic assets/space.png" alt="Astronaut" className="astronaut-visual" />
          </div>

          <div className="orbit-text">
            <span className="orbit-eyebrow">Collaboration philosophy</span>
            <h2 className="orbit-heading">
              <span className="orbit-heading-row">
                <span className="line-plain">Solving</span> <span className="line-glow">Problems,</span>
              </span>
              <span className="orbit-heading-row">
                <span className="line-plain">One Pixel </span><span className="line-glow">At A Time</span>
              </span>
            </h2>
            <p className="orbit-para">I believe great digital products are born from meaningful conversations. Whether you have
              a detailed brief or just a rough idea, I'm here to help shape it into something remarkable. My approach is
              collaborative, transparent, and focused on outcomes that truly matter to
              your users and business.</p>
            <div className="collab-list">
              <div className="collab-item active" style={cssVars({ '--ci-delay': '0.1s' })}>
                <span className="collab-toggle"></span>
                <span className="collab-icon">🎯</span>
                <div className="collab-text">
                  <strong>Discovery &amp; Strategy</strong>
                  <div className="collab-description">
                    <span>Conducting in-depth research to understand your specific mission, target audience, and project
                      constraints thoroughly. We'll identify key opportunities and define a strategic roadmap that ensures
                      every
                      design decision is backed by purpose and clear business objectives.</span>
                  </div>
                </div>
              </div>
              <div className="collab-item" style={cssVars({ '--ci-delay': '0.2s' })}>
                <span className="collab-toggle"></span>
                <span className="collab-icon">🔮</span>
                <div className="collab-text">
                  <strong>Design &amp; Prototype</strong>
                  <div className="collab-description">
                    <span>Translating strategy into high-fidelity mockups and interactive prototypes that bring your vision to
                      life. My design process focuses on aesthetics and functionality, ensuring an intuitive user journey and
                      a
                      premium visual identity that resonates with your brand's core values.</span>
                  </div>
                </div>
              </div>
              <div className="collab-item" style={cssVars({ '--ci-delay': '0.3s' })}>
                <span className="collab-toggle"></span>
                <span className="collab-icon">⚡</span>
                <div className="collab-text">
                  <strong>Build &amp; Ship</strong>
                  <div className="collab-description">
                    <span>Using modern, robust web technologies to build performant and accessible front-end solutions. I
                      ensure
                      the code is clean, optimized for all devices, and capable of delivering a seamless user experience that
                      feels as good as it looks.</span>
                  </div>
                </div>
              </div>
              <div className="collab-item" style={cssVars({ '--ci-delay': '0.4s' })}>
                <span className="collab-toggle"></span>
                <span className="collab-icon">🌱</span>
                <div className="collab-text">
                  <strong>Iterate &amp; Grow</strong>
                  <div className="collab-description">
                    <span>The journey doesn't end at launch. I provide continuous support and data-driven insights to refine
                      and
                      grow your product over time. Through analytics and user feedback, we'll keep evolving the experience to
                      stay ahead of the curve and maintain a competitive edge.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* REDIRECT PROMPT MODAL */}
      <div id="cert-prompt-overlay" className="modal-overlay">
        <div className="modal-card">
          <div id="modal-icon-wrap" className="modal-icon-wrap"></div>
          <p id="modal-detail-box"></p>
          <p className="modal-instruction">You are going to be redirected to <span id="modal-action-text"
              style={{ color: '#fff', fontWeight: 600 }}>the application</span>.<br />Do you wish to continue?</p>
          <div className="modal-actions">
            <button id="modal-cancel" className="modal-btn btn-secondary">Go Back</button>
            <button id="modal-confirm" className="modal-btn btn-primary">Continue</button>
          </div>
        </div>
      </div>
    </StandardShell>
  );
}
