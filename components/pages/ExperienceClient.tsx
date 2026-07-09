'use client';
import { useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import StandardShell from '@/components/StandardShell';
import { initExperience } from '@/lib/scripts/experience';

/** Image error fallback: hide the broken <img> and reveal its initials sibling. */
function imgFallback(e: SyntheticEvent<HTMLImageElement>) {
  const t = e.currentTarget;
  t.style.display = 'none';
  const sib = t.nextElementSibling as HTMLElement | null;
  if (sib) sib.style.display = 'flex';
}

export default function ExperienceClient() {
  useEffect(() => {
    const d = [initExperience()];
    return () => d.forEach((f) => f && f());
  }, []);

  return (
    <StandardShell
      active="experience"
      dataPage="experience"
      tagline={<>Exploring the journey of<br className="tagline-br" /><span className="tagline-name">Ruchira Edirisinghe</span></>}
    >
        <main className="page">
          <p className="section-label">My professional journey</p>
          <h1 className="page-title">Work Experience</h1>
          <br /><br />
          <div className="para-container">
            <p className="bio-para" style={{ '--para-delay': '0.1s' }}>
              With over 4 years of professional experience in the field, I have developed a strong foundation in building
              robust, scalable, and visually engaging web experiences. My journey has taken me through a variety of roles and
              projects, allowing me to refine my skills in frontend development, UI/UX design, and collaborating with
              cross-functional teams. I am passionate about leveraging modern technologies and best practices to deliver
              high-quality solutions that are both user-focused and technically sound.
            </p>
          </div>

          
          <section className="exp-section" aria-label="Work Experience">
            <div className="timeline">

              
              <div className="tl-item tl-left" style={{ '--tl-delay': '0.05s' }}>
                <div className="tl-card-wrap">
                  <div className="tl-card">
                    <div className="tl-company-row">
                      <div className="tl-logo-wrap">
                        <img src="/Images/experience/trexlabs.png" alt="TREX Labs" />
                      </div>
                      <div className="tl-company-meta">
                        <span className="tl-date">2025 DEC - PRESENT</span>
                        <p className="tl-role">UI UX CONSULTANT<br />(Part Time)</p>
                        <span className="tl-company">TREX LABS</span>
                        <span className="tl-location">
                          <svg viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Nugegoda, Sri Lanka
                        </span>
                      </div>
                    </div>
                    <div className="tl-desc-box">
                      <p className="tl-desc">
                        Responsible for designing the full UI/UX process for a
                        social media platform called InsiderHub. Focused on creating
                        intuitive, user-friendly interfaces to optimise user
                        experience and meet platform objectives.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tl-node-wrap">
                  <div className="tl-node"></div>
                </div>
                <div className="tl-empty"></div>
              </div>

              
              <div className="tl-item tl-right" style={{ '--tl-delay': '0.1s' }}>
                <div className="tl-empty"></div>
                <div className="tl-node-wrap">
                  <div className="tl-node"></div>
                </div>
                <div className="tl-card-wrap">
                  <div className="tl-card">
                    <div className="tl-company-row">
                      <div className="tl-logo-wrap">
                        <img src="/Images/experience/funextreme.png" alt="FunExtreme Technology" />
                      </div>
                      <div className="tl-company-meta">
                        <span className="tl-date">2025 AUG - Present</span>
                        <p className="tl-role">UI/UX Engineer &amp;<br />Game&nbsp;Developer</p>
                        <span className="tl-company">FUNEXTREME TECHNOLOGY LLC</span>
                        <span className="tl-location">
                          <svg viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Dubai, United Arab Emirates
                        </span>
                      </div>
                    </div>
                    <div className="tl-desc-box">
                      <p className="tl-desc">
                        Specialized in gamified UI design and frontend development for <strong
                          style={{ color: 'rgba(3, 187, 101, 0.9)' }}>747.LIVE</strong>. Solving
                        complex UX challenges with critical thinking and technical troubleshooting, transforming standard
                        interfaces into engaging, player-centric experiences that boost retention and develop games for
                        user engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="tl-item tl-left" style={{ '--tl-delay': '0.05s' }}>
                <div className="tl-card-wrap">
                  <div className="tl-card">
                    <div className="tl-company-row">
                      <div className="tl-logo-wrap">
                        <img src="/Images/experience/ruach.png" alt="Ruach Holdings" />
                      </div>
                      <div className="tl-company-meta">
                        <span className="tl-date">2024 Sept - 2024 Nov</span>
                        <p className="tl-role">Contract UI/UX Engineer</p>
                        <span className="tl-company">Ruach Holdings</span>
                        <span className="tl-location">
                          <svg viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Colombo, Sri Lanka
                        </span>
                      </div>
                    </div>
                    <div className="tl-desc-box">
                      <p className="tl-desc">
                        Responsible for designing the full UI/UX process for a
                        social media platform called InsiderHub targetted for Sri
                        Lankan audience. Focused on creating intuitive,
                        user-friendly interfaces to optimise user experience and
                        meet platform objectives.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tl-node-wrap">
                  <div className="tl-node"></div>
                </div>
                <div className="tl-empty"></div>
              </div>

              
              <div className="tl-item tl-right" style={{ '--tl-delay': '0.1s' }}>
                <div className="tl-empty"></div>
                <div className="tl-node-wrap">
                  <div className="tl-node"></div>
                </div>
                <div className="tl-card-wrap">
                  <div className="tl-card">
                    <div className="tl-company-row">
                      <div className="tl-logo-wrap">
                        <img src="/Images/experience/zuse.png" alt="ZUSE Technologies" />
                      </div>
                      <div className="tl-company-meta">
                        <span className="tl-date">2023 Nov - 2024 Aug</span>
                        <p className="tl-role">UI/UX Engineer</p>
                        <span className="tl-company">ZUSE Technologies</span>
                        <span className="tl-location">
                          <svg viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Colombo, Sri Lanka
                        </span>
                      </div>
                    </div>
                    <div className="tl-desc-box">
                      <p className="tl-desc">
                        Designed and helped develop compelling user interfaces to
                        improve user experience and visual appeal as an <strong
                          style={{ color: 'rgba(200, 160, 255, 0.9)' }}>Associate UI UX Engineer</strong>. Additionally
                        developed educational games and contributed to the Lyceum
                        Learning Management System (LMS).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="tl-item tl-left" style={{ '--tl-delay': '0.15s' }}>
                <div className="tl-card-wrap">
                  <div className="tl-card">
                    <div className="tl-company-row">
                      <div className="tl-logo-wrap">
                        <img src="/Images/experience/TP.png" alt="TransPerfect" />
                      </div>
                      <div className="tl-company-meta">
                        <span className="tl-date">2023 Aug - 2024 Nov</span>
                        <p className="tl-role">Freelance UI/UX Designer</p>
                        <span className="tl-company">TransPerfect</span>
                        <span className="tl-location">
                          <svg viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          New York, United States
                        </span>
                      </div>
                    </div>
                    <div className="tl-desc-box">
                      <p className="tl-desc">
                        Specialised in crafting compelling and aesthetically
                        pleasing user interfaces to enhance user experience and
                        satisfy customer requirements on a <strong style={{ color: 'rgba(200, 160, 255, 0.9)' }}>freelance contract
                          basis</strong>.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tl-node-wrap">
                  <div className="tl-node"></div>
                </div>
                <div className="tl-empty"></div>
              </div>

              
              <div className="tl-item tl-right" style={{ '--tl-delay': '0.2s' }}>
                <div className="tl-empty"></div>
                <div className="tl-node-wrap">
                  <div className="tl-node"></div>
                </div>
                <div className="tl-card-wrap">
                  <div className="tl-card">
                    <div className="tl-company-row">
                      <div className="tl-logo-wrap">
                        <img src="/Images/experience/design.png" alt="Freelance" />
                      </div>
                      <div className="tl-company-meta">
                        <span className="tl-date">2022 Aug - Present</span>
                        <p className="tl-role">Freelance UI/UX Designer</p>
                        <span className="tl-company">Freelance Upon Reservation</span>
                        <span className="tl-location">
                          <svg viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Remote, Global
                        </span>
                      </div>
                    </div>
                    <div className="tl-desc-box">
                      <p className="tl-desc">
                        Creating engaging, user-centered designs that enhance
                        functionality and enjoyment across platforms. Dedicated to
                        delivering seamless, high-quality user experiences to global
                        clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="tl-item tl-left" style={{ '--tl-delay': '0.25s' }}>
                <div className="tl-card-wrap">
                  <div className="tl-card">
                    <div className="tl-company-row">
                      <div className="tl-logo-wrap">
                        <img src="/Images/experience/pearson.png" alt="Pearson" />
                      </div>
                      <div className="tl-company-meta">
                        <span className="tl-date">2022 Jul - 2023 Jun</span>
                        <p className="tl-role">AR/VR Game Dev<br />(Internship)</p>
                        <span className="tl-company">Pearson</span>
                        <span className="tl-location">
                          <svg viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          London, United Kingdom
                        </span>
                      </div>
                    </div>
                    <div className="tl-desc-box">
                      <p className="tl-desc">
                        Contributed to immersive learning applications for children
                        on AR/VR gaming platforms. The team achieved
                        <strong style={{ color: 'rgba(109, 215, 247, 0.9)' }}>1st place</strong>
                        in an Inter-Company Global Gaming Solutions Competition for
                        developing <em>MetaLingo</em> - an Immersive Language
                        Learning Platform.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tl-node-wrap">
                  <div className="tl-node"></div>
                </div>
                <div className="tl-empty"></div>
              </div>

              
              <div className="tl-item tl-right" style={{ '--tl-delay': '0.3s' }}>
                <div className="tl-empty"></div>
                <div className="tl-node-wrap">
                  <div className="tl-node"></div>
                </div>
                <div className="tl-card-wrap">
                  <div className="tl-card">
                    <div className="tl-company-row">
                      <div className="tl-logo-wrap">
                        <img src="/Images/experience/takg.png" alt="TAKG Solutions" />
                      </div>
                      <div className="tl-company-meta">
                        <span className="tl-date">2021 Oct - Present</span>
                        <p className="tl-role">Co-Founder & <br /> UX/UI Designer</p>
                        <span className="tl-company">TAKG Solutions</span>
                        <span className="tl-location">
                          <svg viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Colombo, Sri Lanka
                        </span>
                      </div>
                    </div>
                    <div className="tl-desc-box">
                      <p className="tl-desc">
                        Founded as a tech startup focused on project completion,
                        inventive ideation, and strategic investments. The company
                        is also dedicated to educating the younger generation on
                        contemporary technological trends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="tl-item tl-left" style={{ '--tl-delay': '0.35s' }}>
                <div className="tl-card-wrap">
                  <div className="tl-card">
                    <div className="tl-company-row">
                      <div className="tl-logo-wrap">
                        <img src="/Images/experience/zencreatives.png" alt="ZEN CREATIVES" />
                      </div>
                      <div className="tl-company-meta">
                        <span className="tl-date">2021 Jan - Present</span>
                        <p className="tl-role">Graphic Design<br />and UX/UI Dev</p>
                        <span className="tl-company">ZEN CREATIVES</span>
                        <span className="tl-location">
                          <svg viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Colombo, Sri Lanka
                        </span>
                      </div>
                    </div>
                    <br />
                    <div className="tl-desc-box">
                      <p className="tl-desc">
                        Established to leverage dual expertise as a graphic designer
                        and developer. Engages in freelancing in spare time,
                        dedicated to meeting clients' graphical design needs with a
                        commitment to exceeding expectations.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tl-node-wrap">
                  <div className="tl-node"></div>
                </div>
                <div className="tl-empty"></div>
              </div>
            </div>
            
          </section>
          <br /><br />

          
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

          <br /><br /><br /><br />

          
          <section className="exp-section cert-section" aria-label="Licenses and Certifications">
            <div className="exp-section-heading" id="cert-heading">
              <span className="exp-section-label">Credentials</span>
              <h2 className="page-title">Licenses &amp; Certifications</h2>
            </div>
            <div className="para-container">
              <p className="bio-para" style={{ '--para-delay': '0.1s' }}>
                Over the years, I have continuously invested in expanding my knowledge and validating my skills through
                industry-recognised certifications. These credentials reflect my commitment to staying current with evolving
                technologies and best practices across <strong style={{ color: 'rgba(140, 210, 255, 0.9)' }}>UI/UX design</strong>,
                <strong style={{ color: 'rgba(200, 160, 255, 0.9)' }}>software development</strong>, and
                <strong style={{ color: 'rgba(100, 220, 160, 0.9)' }}>cybersecurity</strong> - ensuring I bring both depth and
                breadth to every project I take on.
              </p>
            </div>
            <br /><br />

            <div className="cert-scroll-container">
              <div className="cert-grid" id="cert-grid">

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.05s', '--cert-color': 'rgba(80,180,255,0.85)', '--cert-glow': 'rgba(80,180,255,0.18)' }} id="cert-0"
                  data-url="https://www.coursera.org/account/accomplishments/specialization/6LH3NKVNFF16">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(80,180,255,0.1)', '--badge-border': 'rgba(80,180,255,0.25)' }}>
                    <img src="/Images/experience/google.jpg" alt="Google" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(80,180,255,0.9)' }}>G</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Google UX Design Professional</p>
                    <span className="cert-issuer">Google (Coursera)</span>
                    <span className="cert-year">2025</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.10s', '--cert-color': 'rgba(140,80,255,0.85)', '--cert-glow': 'rgba(140,80,255,0.18)' }} id="cert-1"
                  data-url="https://www.credly.com/badges/2ad42d53-f0b2-4c63-b40d-1b67ad04bd4a/linked_in_profile">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(140,80,255,0.1)', '--badge-border': 'rgba(140,80,255,0.25)' }}>
                    <img src="/Images/experience/cisco.png" alt="Cisco" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(140,80,255,0.9)' }}>M</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Introduction to Cybersecurity</p>
                    <span className="cert-issuer">Cisco</span>
                    <span className="cert-year">2025</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.15s', '--cert-color': 'rgba(255,140,40,0.85)', '--cert-glow': 'rgba(255,140,40,0.18)' }} id="cert-2"
                  data-url="https://www.linkedin.com/learning/certificates/34fb036cbc7e615f42fe35b8db5b8072fb1a89ff2d0b7a2c14d05fd0137fac35?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(255,140,40,0.1)', '--badge-border': 'rgba(255,140,40,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="linkedin" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,140,40,0.9)' }}>LI</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Figma Essentials Training</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2023</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.20s', '--cert-color': 'rgba(100,220,160,0.85)', '--cert-glow': 'rgba(100,220,160,0.18)' }}
                  id="cert-3"
                  data-url="https://www.linkedin.com/learning/certificates/a65374f3ba4a8c4488a531b49c896966f59f259eca15b9bf799e840e5753d159?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(100,220,160,0.1)', '--badge-border': 'rgba(100,220,160,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="linkedin" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(100,220,160,0.9)' }}>C</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Understanding AR & VR: Introduction</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2023</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.05s', '--cert-color': 'rgba(255,60,120,0.85)', '--cert-glow': 'rgba(255,60,120,0.18)' }} id="cert-4"
                  data-url="https://www.credly.com/badges/ac96f8ee-cbd7-43e9-93f6-fecc6ff6fc4c/linked_in_profile">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(255,60,120,0.1)', '--badge-border': 'rgba(255,60,120,0.25)' }}>
                    <img src="/Images/experience/Pearsonlogo.jpg" alt="pearson" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,60,120,0.9)' }}>U</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Inclusive Learning Experience Explorer</p>
                    <span className="cert-issuer">Pearson</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.10s', '--cert-color': 'rgba(80,180,255,0.85)', '--cert-glow': 'rgba(80,180,255,0.18)' }} id="cert-5"
                  data-url="https://drive.google.com/file/d/1xqaOJL7ldvpigKS5mFawXI8p6upKOXDx/view">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(80,180,255,0.1)', '--badge-border': 'rgba(80,180,255,0.25)' }}>
                    <img src="/Images/experience/google.jpg" alt="Google" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(80,180,255,0.9)' }}>G</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Google HashCode'22</p>
                    <span className="cert-issuer">Google - Certificate of Participation</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.15s', '--cert-color': 'rgba(200,160,255,0.85)', '--cert-glow': 'rgba(200,160,255,0.18)' }}
                  id="cert-6"
                  data-url="https://www.linkedin.com/learning/certificates/ac9f1b8addd94d7a37f865a96d8edbf74256dadcbc0e0e004bd57af95d81f745?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(200,160,255,0.1)', '--badge-border': 'rgba(200,160,255,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(200,160,255,0.9)' }}>F</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Learning REST APIs</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.20s', '--cert-color': 'rgba(255,200,60,0.85)', '--cert-glow': 'rgba(255,200,60,0.18)' }} id="cert-7"
                  data-url="https://www.linkedin.com/learning/certificates/6da4458c8005e94b28522dda8b54c0507a4ff311e8067cce7c488b7ab7b3eb7a?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(255,200,60,0.1)', '--badge-border': 'rgba(255,200,60,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,200,60,0.9)' }}>U</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">React: Ecosystems</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.05s', '--cert-color': 'rgba(80,220,180,0.85)', '--cert-glow': 'rgba(80,220,180,0.18)' }} id="cert-8"
                  data-url="https://www.linkedin.com/learning/certificates/d72a2bf610edcf37b8d41b6e906ef67de0643a3ed8c84935a5baf3bd25e9abcd?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(80,220,180,0.1)', '--badge-border': 'rgba(80,220,180,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(80,220,180,0.9)' }}>C</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Learning React.js - Learning<br />Fundamentals of React</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.10s', '--cert-color': 'rgba(255,80,80,0.85)', '--cert-glow': 'rgba(255,80,80,0.18)' }} id="cert-9"
                  data-url="https://www.linkedin.com/learning/certificates/efc13988a2fa0a57f44b43a5d09eb4ead4ae26a26a8c1986a88169f50e6e4a68?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(255,80,80,0.1)', '--badge-border': 'rgba(255,80,80,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,80,80,0.9)' }}>Ps</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Learning Cryptography and Network Security</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.15s', '--cert-color': 'rgba(80,180,255,0.85)', '--cert-glow': 'rgba(80,180,255,0.18)' }}
                  id="cert-10"
                  data-url="https://www.linkedin.com/learning/certificates/27d41f2902289069e7e6e05626de0389472c03530a5d4b525a74d12e76e8d2da?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(80,180,255,0.1)', '--badge-border': 'rgba(80,180,255,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(80,180,255,0.9)' }}>Li</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">How to Motivate Yourself to Do What's Most Important</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2021</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.20s', '--cert-color': 'rgba(140,80,255,0.85)', '--cert-glow': 'rgba(140,80,255,0.18)' }}
                  id="cert-11"
                  data-url="https://www.linkedin.com/learning/certificates/f3a9322a6c5a1f94fea36dd2dee44bd37e08d24968ec1b2b6d2677cb105f0c2b?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(140,80,255,0.1)', '--badge-border': 'rgba(140,80,255,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(140,80,255,0.9)' }}>C</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Lean Technology Strategy: Purposeful Organizations</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.05s', '--cert-color': 'rgba(255,140,40,0.85)', '--cert-glow': 'rgba(255,140,40,0.18)' }}
                  id="cert-12"
                  data-url="https://www.linkedin.com/learning/certificates/89fa5201a3930f6ac3f9d28ff4cd8f0a26573749c3781cf61e110873a492460d?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(255,140,40,0.1)', '--badge-border': 'rgba(255,140,40,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,140,40,0.9)' }}>UE</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Learning Kali Linux</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.10s', '--cert-color': 'rgba(100,220,160,0.85)', '--cert-glow': 'rgba(100,220,160,0.18)' }}
                  id="cert-13"
                  data-url="https://www.linkedin.com/learning/certificates/a02b019e1e5930657dc9fe16401b3344f313614e6cd390666c41106f7b20b691?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(100,220,160,0.1)', '--badge-border': 'rgba(100,220,160,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(100,220,160,0.9)' }}>HS</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">What Is Scrum?</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.15s', '--cert-color': 'rgba(255,60,120,0.85)', '--cert-glow': 'rgba(255,60,120,0.18)' }}
                  id="cert-14"
                  data-url="https://www.linkedin.com/learning/certificates/cb108aafc3d72421303ae43aefd472c64f9905bbf61507ba8f7555d52eb56d0a?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(255,60,120,0.1)', '--badge-border': 'rgba(255,60,120,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,60,120,0.9)' }}>G</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Java Object-Oriented Programming</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.20s', '--cert-color': 'rgba(80,180,255,0.85)', '--cert-glow': 'rgba(80,180,255,0.18)' }}
                  id="cert-15"
                  data-url="https://www.linkedin.com/learning/certificates/9306d45b7688e623491527589436fc914f7a4d8bf1acbdaed605da5740d0b30e?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(80,180,255,0.1)', '--badge-border': 'rgba(80,180,255,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(80,180,255,0.9)' }}>IBM</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Python for Students</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.05s', '--cert-color': 'rgba(200,160,255,0.85)', '--cert-glow': 'rgba(200,160,255,0.18)' }}
                  id="cert-16"
                  data-url="https://www.linkedin.com/learning/certificates/93c3f765e7578dbecbd42170d428133d9d26560fd2d0b112e0fd7e6aa9fd69b3?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(200,160,255,0.1)', '--badge-border': 'rgba(200,160,255,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(200,160,255,0.9)' }}>U</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Learning Java</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2022</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.10s', '--cert-color': 'rgba(255,200,60,0.85)', '--cert-glow': 'rgba(255,200,60,0.18)' }}
                  id="cert-17"
                  data-url="https://www.linkedin.com/learning/certificates/3d9d12b84dd447be5f3c772647f3896f95779f11440553b04b05af1d6d48e8e6?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(255,200,60,0.1)', '--badge-border': 'rgba(255,200,60,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,200,60,0.9)' }}>SM</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">AI Accountability Essential Training</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2021</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.15s', '--cert-color': 'rgba(80,220,180,0.85)', '--cert-glow': 'rgba(80,220,180,0.18)' }}
                  id="cert-18"
                  data-url="https://www.linkedin.com/learning/certificates/32b3b9a19fe23eb94efb7aa8d9254eff65ad21223c434ac45323841c7c154f0a?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(80,220,180,0.1)', '--badge-border': 'rgba(80,220,180,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(80,220,180,0.9)' }}>M</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">IoT Foundations: Fundamentals</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2021</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.20s', '--cert-color': 'rgba(255,80,80,0.85)', '--cert-glow': 'rgba(255,80,80,0.18)' }} id="cert-19"
                  data-url="https://www.linkedin.com/learning/certificates/9c42ef7038741bf6d25fc38ef099f4031b961bdf3637cce50e0ab6c70f5802f6?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(255,80,80,0.1)', '--badge-border': 'rgba(255,80,80,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,80,80,0.9)' }}>C</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Game Design Foundations: 3</p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2021</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.05s', '--cert-color': 'rgba(80,180,255,0.85)', '--cert-glow': 'rgba(80,180,255,0.18)' }}
                  id="cert-20"
                  data-url="https://www.linkedin.com/learning/certificates/2d872e221ad68c46dd89d7a1523c7bfdc1988ec27e1384dc0fa9280b11126bfb?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(80,180,255,0.1)', '--badge-border': 'rgba(80,180,255,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(80,180,255,0.9)' }}>GH</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Game Design Foundations: 2 </p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2021</span>
                  </div>
                </div>

                
                <div className="cert-card"
                  style={{ '--cert-delay': '0.10s', '--cert-color': 'rgba(140,80,255,0.85)', '--cert-glow': 'rgba(140,80,255,0.18)' }}
                  id="cert-21"
                  data-url="https://www.linkedin.com/learning/certificates/8c2a0a18d567a7d9bf4590eb38f29099848ac53d43ccf6881997725cf2bf90b8?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2B%2FZBLQj4R1CHG0LAOl6Dww%3D%3D">
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <div className="cert-badge" style={{ '--badge-bg': 'rgba(140,80,255,0.1)', '--badge-border': 'rgba(140,80,255,0.25)' }}>
                    <img src="/Images/experience/LinkedIn.png" alt="LinkedIn Learning" className="cert-logo-img"
                      onError={imgFallback} />
                    <span className="cert-initials" style={{ display: 'none', color: 'rgba(140,80,255,0.9)' }}>Li</span>
                  </div>
                  <div className="cert-info">
                    <p className="cert-name">Game Design Foundations: 1 </p>
                    <span className="cert-issuer">LinkedIn Learning</span>
                    <span className="cert-year">2021</span>
                  </div>
                </div>

              </div>
              

              
              <div className="cert-custom-scrollbar" id="cert-custom-scrollbar">
                <div className="cert-sb-track" id="cert-sb-track">
                  <div className="cert-sb-thumb" id="cert-sb-thumb">
                    <div className="cert-sb-dot"></div>
                  </div>
                </div>
              </div>

            </div>
            
          </section>

          <br /><br />

          
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

          <br /><br />


          
          <section className="skills-section" aria-label="Skills">
            <div className="exp-section-heading" id="skills-heading">
              <span className="exp-section-label">Expertise</span>
              <h2 className="page-title">Specialized Skills</h2>
            </div>

            <div className="para-container">
              <p className="bio-para" style={{ '--para-delay': '0.1s' }}>
                Throughout my career, I have cultivated a diverse and specialized set of technical skills, ranging from
                <strong style={{ color: 'rgba(140, 210, 255, 0.9)' }}>UI/UX architecture</strong> and
                <strong style={{ color: 'rgba(80, 220, 180, 0.9)' }}>indie game development</strong> to
                <strong style={{ color: 'rgba(200, 160, 255, 0.9)' }}>modern frontend engineering</strong>. My approach blends
                aesthetic precision with technical robustness, ensuring that every project I touch is not only visually
                stunning but also highly functional and user-centric.
              </p>
            </div>

            <br /><br />

            <div id="skills-universe" className="skills-universe">
              
              <div className="nebula-node-wrap theme-uiux" data-pct="95" data-x="10" data-y="8">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg></div>
                  <div className="nebula-label">UI/UX Design</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-uiux" data-pct="92" data-x="25" data-y="25">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path
                        d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5zM5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5zM5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0zM12 9h3.5A3.5 3.5 0 1 1 12 12.5V9zM15.5 2A3.5 3.5 0 0 1 19 5.5 3.5 3.5 0 0 1 15.5 9H12V2h3.5z" />
                    </svg></div>
                  <div className="nebula-label">Figma</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-uiux" data-pct="90" data-x="15" data-y="50">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg></div>
                  <div className="nebula-label">Prototyping</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-uiux" data-pct="88" data-x="5" data-y="40">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8M8 12h8" />
                    </svg></div>
                  <div className="nebula-label">Wireframing</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-uiux" data-pct="85" data-x="20" data-y="75">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg></div>
                  <div className="nebula-label">UX Research</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-uiux" data-pct="90" data-x="30" data-y="60">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg></div>
                  <div className="nebula-label">Design Systems</div>
                </div>
              </div>

              
              <div className="nebula-node-wrap theme-game" data-pct="85" data-x="45" data-y="10">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <path d="M6 12h4m-2-2v4M15 11h.01M18 13h.01" />
                    </svg></div>
                  <div className="nebula-label">Indie Games</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-game" data-pct="85" data-x="55" data-y="45">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path d="M12 3v18M3 12h18M5.3 5.3l13.4 13.4M5.3 18.7L18.7 5.3" />
                    </svg></div>
                  <div className="nebula-label">Unity</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-game" data-pct="82" data-x="40" data-y="70">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path
                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg></div>
                  <div className="nebula-label">AR/VR</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-game" data-pct="88" data-x="50" data-y="60">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <line x1="6" y1="12" x2="10" y2="12" />
                      <line x1="8" y1="10" x2="8" y2="14" />
                      <circle cx="15" cy="11" r="1" />
                      <circle cx="17.5" cy="13" r="1" />
                      <path d="M3 6h18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                    </svg></div>
                  <div className="nebula-label">C# Scripting</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-game" data-pct="80" data-x="60" data-y="80">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg></div>
                  <div className="nebula-label">Optimization</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-dev" data-pct="98" data-x="75" data-y="20">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                    </svg></div>
                  <div className="nebula-label">Vibe Coding</div>
                </div>
              </div>

              
              <div className="nebula-node-wrap theme-dev" data-pct="87" data-x="75" data-y="10">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg></div>
                  <div className="nebula-label">Front-End</div>
                </div>
              </div>
              <div className="nebula-node-wrap theme-dev" data-pct="88" data-x="85" data-y="40">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="2" />
                      <path
                        d="M12 5.5a18.2 18.2 0 0 0-11 5.5 18.2 18.2 0 0 0 11 5.5 18.2 18.2 0 0 0 11-5.5 18.2 18.2 0 0 0-11-5.5z" />
                    </svg></div>
                  <div className="nebula-label">React</div>
                </div>
              </div>
              
              <div className="nebula-node-wrap theme-dev" data-pct="95" data-x="20" data-y="25">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <rect x="6" y="3" width="12" height="15" rx="2" />
                      <path d="M9 21h6v-3H9v3z" />
                      <circle cx="12" cy="10" r="2" />
                    </svg></div>
                  <div className="nebula-label">Game Development</div>
                </div>
              </div>

              
              <div className="nebula-node-wrap theme-game" data-pct="90" data-x="65" data-y="15">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg></div>
                  <div className="nebula-label">Real-time Render</div>
                </div>
              </div>

              
              <div className="nebula-node-wrap theme-dev" data-pct="90" data-x="50" data-y="45">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path
                        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-1.6 1.6a1 1 0 0 0 1.4 1.4l2.3-2.3a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0z" />
                      <path
                        d="M9.3 17.7a1 1 0 0 0 0-1.4l-1.6-1.6 1.6-1.6a1 1 0 0 0-1.4-1.4l-2.3 2.3a1 1 0 0 0 0 1.4l2.3 2.3a1 1 0 0 0 1.4 0z" />
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg></div>
                  <div className="nebula-label">UI/UX<br />Engineering</div>
                </div>
              </div>

              
              <div className="nebula-node-wrap theme-dev" data-pct="93" data-x="25" data-y="75">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path d="M12 19l7-7 3 3-7 7-3-3z" />
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    </svg></div>
                  <div className="nebula-label">Graphic Design</div>
                </div>
              </div>

              
              <div className="nebula-node-wrap theme-dev" data-pct="88" data-x="80" data-y="75">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                      <path
                        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg></div>
                  <div className="nebula-label">Visual Coding</div>
                </div>
              </div>

              
              <div className="nebula-node-wrap theme-dev" data-pct="85" data-x="45" data-y="18">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <path
                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg></div>
                  <div className="nebula-label">Product Design</div>
                </div>
              </div>

              
              <div className="nebula-node-wrap theme-dev" data-pct="92" data-x="10" data-y="50">
                <div className="nebula-node">
                  <div className="nebula-cloud"></div>
                  <div className="nebula-ring"></div>
                  <div className="nebula-core"><svg viewBox="0 0 24 24">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg></div>
                  <div className="nebula-label">Frontend Development</div>
                </div>
              </div>
            </div>


          </section>

          
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

          <br /><br /><br /><br />

          
          <section className="exp-section edu-section" aria-label="Education">
            <div className="exp-section-heading" id="edu-heading">
              <span className="exp-section-label">Education Background</span>
              <h1 className="page-title">Academic History</h1>
            </div>
            <div className="para-container">
              <p className="bio-para" style={{ '--para-delay': '0.1s' }}>
                My academic journey has been defined by dedication, continuous effort, and a drive to push my boundaries. I
                invested countless hours into mastering new concepts, tackling complex problems, and pursuing projects that
                sharpened both my technical abilities and creative thinking. Through perseverance and a commitment to
                excellence, I was able to achieve personal milestones that reflect my passion for learning and my
                determination to succeed.
              </p>
            </div>
            
            <div className="edu-stack">

              
              <div className="edu-entry" style={{ '--edu-delay': '0.05s' }} id="edu-entry-0">
                <div className="edu-logo edu-logo-wide">
                  <img src="/Images/experience/ply.png" alt="University of Plymouth logo" />
                </div>
                <span className="edu-year">2020 - 2023</span>
                <h3 className="edu-degree">BSc. (Honors) <br />Computer Security</h3>
                <span className="edu-institute">University of Plymouth</span>
                <span className="edu-location">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  NSBM Green University, Sri Lanka
                </span>
                <p className="edu-desc">
                  Accomplished a <strong style={{ color: 'rgba(200, 160, 255, 0.9)' }}>Second Class Honours</strong> degree in
                  Computer Security
                  from the University of Plymouth at <strong style={{ color: 'rgba(3, 187, 101, 0.9)' }}>NSBM Green
                    University</strong>,
                  demonstrating dedication and hard work throughout the academic journey.
                </p>
              </div>

              
              <div className="edu-entry" style={{ '--edu-delay': '0.15s' }} id="edu-entry-1">
                <div className="edu-logo">
                  <img src="/Images/experience/WRC.png" alt="Wayamba Royal College logo" />
                </div>
                <span className="edu-year">2012 - 2020</span>
                <h3 className="edu-degree">Secondary Education <br /> O/L &amp; A/L</h3>
                <span className="edu-institute">Wayamba Royal College</span>
                <span className="edu-location">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Kurunegala, Sri Lanka
                </span>
                <p className="edu-desc">
                  Successfully completed both Ordinary Level (O/L) and Advanced Level
                  (A/L) Examinations at Wayamba Royal College, Kurunegala, with
                  outstanding academic and non-academic achievements.
                </p>
              </div>

              
              <div className="edu-entry" style={{ '--edu-delay': '0.25s' }} id="edu-entry-2">
                <div className="edu-logo">
                  <img src="/Images/experience/wickra.png" alt="Wickramashila National School logo" />
                </div>
                <span className="edu-year">2006 - 2011</span>
                <h3 className="edu-degree">Primary Education <br />FOUNDATION STUDIES</h3>
                <span className="edu-institute">Wickramashila National School</span>
                <span className="edu-location">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Giriulla, Sri Lanka
                </span>
                <p className="edu-desc">
                  Accomplished primary education with a focus on academic excellence and holistic growth. Engaged in a wide
                  range of activities, achieving commendable results and developing a disciplined approach to learning.
                </p>
              </div>

            </div>
            
          </section>

          <br />

          
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

          <br /><br />

          
          <section className="vol-section exp-section" aria-label="Volunteering Experience">
            <div className="exp-section-heading" id="vol-heading">
              <span className="exp-section-label">Community Impact</span>
              <h2 className="page-title">Volunteer Experience</h2>
            </div>

            <div className="para-container">
              <p className="bio-para" style={{ '--para-delay': '0.1s' }}>
                Giving back to the community has always been a core part of my journey. Whether through
                <strong style={{ color: 'rgba(100, 220, 160, 0.9)' }}>mentorship</strong>,
                <strong style={{ color: 'rgba(140, 210, 255, 0.9)' }}>open-source contributions</strong>, or
                <strong style={{ color: 'rgba(200, 160, 255, 0.9)' }}>social initiatives</strong>, I strive to use my skills to
                empower others and create meaningful change. These experiences have shaped my perspective on
                the power of collective effort and technology for good.
              </p>
            </div>

            <div className="vol-grid">

              
              <div className="vol-card" style={{ '--vol-color': 'rgba(255,78,80,0.8)', '--vol-glow': 'rgba(255,78,80,0.2)', '--vol-delay': '0.05s' }}>
                <div className="vol-badge">
                  <img src="/Images/experience/isaca.png" alt="ISACA" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,78,80,1)' }}>MF</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Editor In Chief</p>
                  <span className="vol-org">ISACA NSBM Student Group</span>
                  <span className="vol-date">2022 - 2023</span>
                </div>
              </div>

              
              <div className="vol-card"
                style={{ '--vol-color': 'rgba(180,100,255,0.8)', '--vol-glow': 'rgba(180,100,255,0.2)', '--vol-delay': '0.1s' }}>
                <div className="vol-badge">
                  <img src="/Images/experience/dns.png" alt="DNS NSBM" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(180,100,255,1)' }}>DB</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Associate Vice President</p>
                  <span className="vol-org">Department of Network And Security - NSBM</span>
                  <span className="vol-date">2022 - 2023</span>
                </div>
              </div>

              
              <div className="vol-card" style={{ '--vol-color': 'rgba(255,50,50,0.8)', '--vol-glow': 'rgba(255,50,50,0.2)', '--vol-delay': '0.15s' }}>
                <div className="vol-badge">
                  <img src="/Images/experience/foss.png" alt="foss" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,50,50,1)' }}>RC</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Coordinator Of Volunteers</p>
                  <span className="vol-org">FOSS Community of NSBM</span>
                  <span className="vol-date">2022 - 2023</span>
                </div>
              </div>

              
              <div className="vol-card"
                style={{ '--vol-color': 'rgba(100,220,160,0.8)', '--vol-glow': 'rgba(100,220,160,0.2)', '--vol-delay': '0.2s' }}>
                <div className="vol-badge">
                  <img src="/Images/experience/foss.png" alt="foss" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(100,220,160,1)' }}>CG</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Community Coordinator</p>
                  <span className="vol-org">FOSS Community of NSBM</span>
                  <span className="vol-date">2021 - 2023</span>
                </div>
              </div>

              
              <div className="vol-card"
                style={{ '--vol-color': 'rgba(255,255,0,0.8)', '--vol-glow': 'rgba(255,255,0,0.15)', '--vol-delay': '0.25s' }}>
                <div className="vol-badge" style={{ borderStyle: 'solid' }}>
                  <img src="/Images/experience/foss.png" alt="foss" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,255,0,1)' }}>AI</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Volunteer</p>
                  <span className="vol-org">FOSS Community of NSBM</span>
                  <span className="vol-date">2020 - 2023</span>
                </div>
              </div>

              
              <div className="vol-card"
                style={{ '--vol-color': 'rgba(140,210,255,0.8)', '--vol-glow': 'rgba(140,210,255,0.2)', '--vol-delay': '0.05s' }}>
                <div className="vol-badge">
                  <img src="/Images/experience/wrc-round.png" alt="Wayamba Royal College" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(140,210,255,1)' }}>AS</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Senior Prefect</p>
                  <span className="vol-org">Wayamba Royal College</span>
                  <span className="vol-date">2018 - 2020</span>
                </div>
              </div>

              
              <div className="vol-card" style={{ '--vol-color': 'rgba(0,255,127,0.8)', '--vol-glow': 'rgba(0,255,127,0.2)', '--vol-delay': '0.1s' }}>
                <div className="vol-badge">
                  <img src="/Images/experience/int-blue.png" alt="Interact Club" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(0,255,127,1)' }}>GT</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Director of Club Service</p>
                  <span className="vol-org">Interact Club Of Wayamba Royal College</span>
                  <span className="vol-date">2019 - 2020</span>
                </div>
              </div>

              
              <div className="vol-card"
                style={{ '--vol-color': 'rgba(30,144,255,0.8)', '--vol-glow': 'rgba(30,144,255,0.2)', '--vol-delay': '0.15s' }}>
                <div className="vol-badge">
                  <img src="/Images/experience/int-blue.png" alt="Interact Club" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(30,144,255,1)' }}>U</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Assistant Director Of Community Service</p>
                  <span className="vol-org">Interact Club Of Wayamba Royal College</span>
                  <span className="vol-date">2018 - 2019</span>
                </div>
              </div>

              
              <div className="vol-card" style={{ '--vol-color': 'rgba(255,165,0,0.8)', '--vol-glow': 'rgba(255,165,0,0.2)', '--vol-delay': '0.2s' }}>
                <div className="vol-badge">
                  <img src="/Images/experience/int.png" alt="Interact Club" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,165,0,1)' }}>RI</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Official Photographer</p>
                  <span className="vol-org">Interact Club of Wayamba Royal College</span>
                  <span className="vol-date">2018 - 2020</span>
                </div>
              </div>

              
              <div className="vol-card"
                style={{ '--vol-color': 'rgba(255,105,180,0.8)', '--vol-glow': 'rgba(255,105,180,0.2)', '--vol-delay': '0.25s' }}>
                <div className="vol-badge">
                  <img src="/Images/experience/rps.png" alt="Royalists Photographic Society" className="vol-logo"
                    onError={imgFallback} />
                  <span className="cert-initials" style={{ display: 'none', color: 'rgba(255,105,180,1)' }}>GE</span>
                </div>
                <div className="vol-info">
                  <p className="vol-role">Official Photographer</p>
                  <span className="vol-org">Royalists Photographic Society (WRC)</span>
                  <span className="vol-date">2017 - 2020</span>
                </div>
              </div>

            </div>
          </section>
          <br /><br />

          
          <div className="cosmic-divider" aria-hidden="true" style={{ marginTop: '80px' }}>
            <div className="cosmic-divider-sweep"></div>
            <div className="cosmic-divider-core">
              <span className="cosmic-divider-orb orb-sm"></span>
              <span className="cosmic-divider-orb"></span>
              <span className="cosmic-divider-star">&#10022;</span>
              <span className="cosmic-divider-orb"></span>
              <span className="cosmic-divider-orb orb-sm"></span>
            </div>
          </div>

          
          <section className="testimonials-section" aria-label="Client Testimonials">

            
            <div className="testi-shell" id="testi-shell" aria-live="polite">
              
              <div className="testi-meta-row">
                <div className="testi-avatars-stack" id="testi-av-stack">
                  <img src="/Images/testimonials/thaanu.jpg" alt="Thaanu Perera" className="testi-avatar-thumb current-av"
                    data-av="0" />
                  <img src="/Images/testimonials/suraji.png" alt="Suraji Ekanayake" className="testi-avatar-thumb" data-av="1" />
                  <img src="/Images/testimonials/sandakelum.jpg" alt="Sandakelum" className="testi-avatar-thumb" data-av="2" />
                  <img src="/Images/testimonials/janith.jpg" alt="Janith" className="testi-avatar-thumb" data-av="3" />
                  <img src="/Images/testimonials/wenupa.png" alt="Wenupa Mandinu" className="testi-avatar-thumb" data-av="4" />
                  <img src="/Images/testimonials/avishka.jpg" alt="Avishka" className="testi-avatar-thumb" data-av="5" />
                  <img src="/Images/testimonials/sandev-dullewa.png" alt="Sandev Dulleva" className="testi-avatar-thumb"
                    data-av="6" />
                  <img src="/Images/testimonials/atheeque.png" alt="Atheeque Hasan" className="testi-avatar-thumb" data-av="7" />
                  <img src="/Images/testimonials/ramuthu.jpg" alt="Ramuthu Senanayake" className="testi-avatar-thumb"
                    data-av="8" />
                </div>
                <div className="testi-counter">
                  <span className="testi-counter-cur" id="testi-cur">01</span>
                  <span className="testi-counter-sep">/</span>
                  <span className="testi-counter-tot">09</span>
                </div>
              </div>

              
              <div className="testi-quote-area" id="testi-quote-area">
                <div className="testi-slide active" data-slide="0">
                  <p className="testi-quote">
                    I had the pleasure of working with Ruchira on several projects,
                    and I can confidently say he's one of the most talented and
                    dedicated UI/UX designers I've encountered. His expertise in
                    both UI/UX design and engineering is truly remarkable, allowing
                    him to craft visually compelling interfaces that are not only
                    user-friendly but also highly functional.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/thaanu.jpg" alt="Thaanu Perera" className="testi-author-avatar" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Thaanu Perera</span>
                      <span className="testi-role">Software Engineer - Eyepax</span>
                    </div>
                    <div className="testi-stars">
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="testi-slide" data-slide="1">
                  <p className="testi-quote">
                    Working with Ruchira on UI/UX design projects has been an
                    incredible experience. He has a great talent for blending the
                    latest trends with user-friendly designs. Whenever we team up,
                    we always create solutions that go above and beyond
                    expectations. His creative vision combined with my design skills
                    results in experiences that truly connect with users. I highly
                    recommend Ruchira for any UI/UX work.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/suraji.png" alt="Suraji Ekanayake" className="testi-author-avatar" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Suraji Ekanayake</span>
                      <span className="testi-role">UI/UX Designer - Freelance</span>
                    </div>
                    <div className="testi-stars">
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="testi-slide" data-slide="2">
                  <p className="testi-quote">
                    Ruchira is a rare combination of creative vision and technical
                    precision. His work consistently demonstrates a deep
                    understanding of both user behaviour and aesthetic excellence.
                    On every project we've collaborated on, he brought ideas to life
                    in ways that felt fresh, polished, and genuinely purposeful.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/sandakelum.jpg" alt="Sandakelum" className="testi-author-avatar" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Sandakelum Senevirathne</span>
                      <span className="testi-role">Tech Lead - ZUSE TECHNOLOGIES</span>
                    </div>
                    <div className="testi-stars">
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="testi-slide" data-slide="3">
                  <p className="testi-quote">
                    Ruchira's eye for detail and dedication to user-centric design
                    make him an outstanding designer. His work on our platform
                    demonstrated both strategic thinking and meticulous execution.
                    Every interface he touched became cleaner, more intuitive, and
                    more engaging for our users.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/janith.jpg" alt="Janith" className="testi-author-avatar" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Janith Perera</span>
                      <span className="testi-role">Software Engineer - RACEDATA</span>
                    </div>
                    <div className="testi-stars">
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="testi-slide" data-slide="4">
                  <p className="testi-quote">
                    Embarking on projects with Ruchira has been nothing short of a
                    creative adventure in the world of UI/UX design. His ability to
                    seamlessly merge cutting-edge trends with user-centric
                    functionality is truly commendable. Together, we harmonise his
                    innovative vision with my UI designing talents, crafting
                    experiences that resonate with audiences on a profound level.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/wenupa.png" alt="Wenupa Mandinu" className="testi-author-avatar" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Wenupa Mandinu</span>
                      <span className="testi-role">Cyber Security Engineer - Freelance</span>
                    </div>
                    <div className="testi-stars">
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="testi-slide" data-slide="5">
                  <p className="testi-quote">
                    I've had the opportunity to observe Ruchira's work across
                    multiple projects and his commitment to excellence is unmatched.
                    He approaches every challenge with a methodical mindset,
                    delivers on time, and always brings a level of polish that
                    elevates the entire product.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/avishka.jpg" alt="Avishka" className="testi-author-avatar" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Avishka Dilshan</span>
                      <span className="testi-role">Senior DevOps Engineer - LSEG</span>
                    </div>
                    <div className="testi-stars">
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="testi-slide" data-slide="6">
                  <p className="testi-quote">
                    I had the pleasure of working with Ruchira on a recent web
                    development project, and I was truly impressed by his
                    exceptional UI/UX design skills. Ruchira's ability to create
                    visually appealing and user-friendly interfaces is unparalleled.
                    He has a keen eye for detail, a deep understanding of user
                    behavior, and a knack for turning complex concepts into
                    intuitive designs.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/sandev-dullewa.png" alt="Sandev Dulleva" className="testi-author-avatar" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Sandev Dulleva</span>
                      <span className="testi-role">Software Engineer - ZUSE Technologies</span>
                    </div>
                    <div className="testi-stars">
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="testi-slide" data-slide="7">
                  <p className="testi-quote">
                    I had the pleasure of managing Ruchira directly during their
                    time as a developer at TAKG, and I can confidently say that he
                    is one of the most talented and dedicated professionals I have
                    worked with. Ruchira consistently demonstrated exceptional
                    technical skills, creativity, and a strong work ethic. His
                    ability to tackle complex problems and deliver high-quality
                    solutions was truly impressive.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/atheeque.png" alt="Atheeque Hasan" className="testi-author-avatar" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Atheeque Hasan</span>
                      <span className="testi-role">Senior Data Analyst - AiSCOUT</span>
                    </div>
                    <div className="testi-stars">
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="testi-slide" data-slide="8">
                  <p className="testi-quote">
                    I am pleased to recommend Ruchira for any role pertaining to
                    UI/UX engineering. During our collaboration on website
                    development projects, where I served as the project manager, he
                    consistently demonstrated exceptional skills in crafting
                    user-friendly interfaces. Ruchira possesses a remarkable talent
                    for designing aesthetically pleasing and functional websites.
                    His meticulous attention to detail ensures that every aspect of
                    the user experience is carefully considered.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/ramuthu.jpg" alt="Ramuthu Senanayake" className="testi-author-avatar" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Ramuthu Senanayake</span>
                      <span className="testi-role">Associate Project Manager - Sysco LABS Sri Lanka</span>
                    </div>
                    <div className="testi-stars">
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              

              
              <div className="testi-bottom">
                <div className="testi-progress-track">
                  <div className="testi-progress-fill" id="testi-prog"></div>
                </div>
                <div className="testi-nav">
                  <button className="testi-btn" id="testi-prev" aria-label="Previous testimonial">
                    <svg viewBox="0 0 24 24">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button className="testi-btn" id="testi-next" aria-label="Next testimonial">
                    <svg viewBox="0 0 24 24">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
          </section>
        </main>

        <div id="cert-prompt-overlay" className="modal-overlay">
          <div className="modal-card">
            <img id="modal-logo" className="modal-header-logo" alt="Issuer logo" />
            <h3 id="modal-title">Certificate Name</h3>
            <span id="modal-issuer" className="modal-issuer-sub">Company Name</span>
            <p>You are going to be redirected to<br />the credentials of this certification.<br />Do you wish to continue?
            </p>
            <div className="modal-actions">
              <button id="modal-cancel" className="modal-btn btn-secondary">Back</button>
              <button id="modal-confirm" className="modal-btn btn-primary">View Credential</button>
            </div>
          </div>
        </div>

    </StandardShell>
  );
}
