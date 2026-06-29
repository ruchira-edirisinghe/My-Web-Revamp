'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { initProjects } from '@/lib/scripts/projects';
import { initCaseStudy } from '@/lib/scripts/case-study';

export default function CaseStudyPhurl() {
  useEffect(() => {
    const disposers = [initProjects(), initCaseStudy()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Outsmarting the <span className="tagline-name">Phishy Web</span></>}
    >
      {/* ═══════════════════════════════
           FLOATING TABLE OF CONTENTS
      ═══════════════════════════════ */}
      <nav className="cs-toc" id="cs-toc" aria-label="Case study navigation">
        <div className="cs-toc-track">
          <a className="cs-toc-item" href="#sec-problem"><span className="cs-toc-label">Problem</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-research"><span className="cs-toc-label">Research</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-ideation"><span className="cs-toc-label">The Model</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-design"><span className="cs-toc-label">Design</span><span
              className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-vibe"><span className="cs-toc-label">Build</span><span className="cs-toc-dot"></span></a>
          <a className="cs-toc-item" href="#sec-results"><span className="cs-toc-label">Results</span><span
              className="cs-toc-dot"></span></a>
        </div>
      </nav>

      <main>

        <div className="cs-wrap">

          <Link href="/projects/web" className="back-link"><span>←</span> Back to Projects</Link>

          {/* ═══════════════════════════════
               HERO — Title + Cover Banner
          ═══════════════════════════════ */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title">Project PhURL</h1>
            <p className="cs-hero-subtitle">A Web Platform That Detects Phishing URLs with AI — and Teaches You to Spot Them</p>
          </header>

          {/* Cover image banner */}
          <div className="cs-cover-banner" id="hero-banner">
            <img src="/Images/projects/Phurl/cover.png" alt="Project PhURL — AI phishing-URL detection platform cover"
              className="cs-cover-img" id="hero-img" loading="eager" />
            <div className="cs-cover-shine"></div>
          </div>


          {/* Meta row */}
          <div className="cs-meta-row">
            <div className="cs-meta-card">
              <div className="cs-meta-label">Role</div>
              <div className="cs-meta-value">UI/UX Engineer<br/>Full-Stack Dev</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Type</div>
              <div className="cs-meta-value">Design · Dev<br/>Machine Learning</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Tools</div>
              <div className="cs-meta-value">Figma · React<br/>Django · Python</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Model</div>
              <div className="cs-meta-value">LightGBM<br/>96.6% Accuracy</div>
            </div>
            <div className="cs-meta-card">
              <div className="cs-meta-label">Platform</div>
              <div className="cs-meta-value">Web<br/>Responsive</div>
            </div>
          </div>

          {/* Elevator pitch */}
          <div className="cs-elevator">
            <p>
              Phishing doesn't break in — it tricks its way in, one convincing link at a time. PhURL is an end-to-end project that pairs a trained machine-learning model with a calm, educational interface, so anyone can paste a link, get an instant verdict, and actually learn why it's risky. The guiding mantra throughout: <em style={{ color: 'var(--lyc-gold)', fontStyle: 'normal', fontWeight: 500 }}>if it looks phishy, it probably is.</em>
            </p>
          </div>


          {/* ═══════════════════════════════
               01 — THE PROBLEM
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-problem">
            <div className="cs-section-divider">
              <span className="cs-section-num">01 ——</span>
              <span className="cs-section-num">The Problem</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Context &amp; The Problem</h2>

            <p className="cs-body">
              Phishing attacks evolve faster than most people can keep up with — a fresh malicious domain, a lookalike login page, a shortened link in a message. Many existing tools either block silently in the background or flash a cryptic warning, but they rarely help a person understand <em>why</em> a link is dangerous. The result is a population that stays one careless click away from compromise.
            </p>

            <div className="cs-highlight">
              <p>"Phishing attacks are evolving rapidly… existing solutions often lack adaptability and fail to <em>educate users effectively</em>."</p>
            </div>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🎯</div>
                <h4>Problem Statement</h4>
                <p>People need a fast, trustworthy way to check whether a URL is safe — and just as importantly, to learn the cues of a phishing attempt so they can protect themselves next time.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🏁</div>
                <h4>The Goal</h4>
                <p>Build an accurate ML model for phishing detection, wrap it in an intuitive interface, teach users about phishing through real resources, and keep the whole system scalable, adaptable and secure.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">👥</div>
                <h4>Target Audience</h4>
                <p>Everyday individuals and organisations who want phishing protection plus genuine cybersecurity awareness — regardless of their technical background.</p>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               02 — RESEARCH
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-research">
            <div className="cs-section-divider">
              <span className="cs-section-num">02 ——</span>
              <span className="cs-section-num">Discovery &amp; Research</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Discovery &amp; Research</h2>

            <p className="cs-body">
              Research ran on two tracks at once: understanding what users actually need from a URL checker, and understanding the data and models that could power it. The two informed each other — a model is only useful if people trust and understand its output.
            </p>

            <h3 className="cs-sub-heading">Detect-Only Tools vs. PhURL's Opportunity</h3>

            <div className="cs-compare">
              <div className="cs-compare-side fail">
                <div className="cs-compare-label"><i>✕</i> Where Existing Tools Fall Short</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>Block or flag links without explaining the risk</li>
                    <li><div className="cs-list-bullet"></div>Static rule-sets that struggle to adapt to new tactics</li>
                    <li><div className="cs-list-bullet"></div>No learning layer — users never get more phishing-aware</li>
                  </ul>
                </div>
              </div>
              <div className="cs-compare-side success">
                <div className="cs-compare-label"><i>✓</i> PhURL's Opportunity</div>
                <div className="cs-compare-body">
                  <ul className="cs-list">
                    <li><div className="cs-list-bullet"></div>An ML model that learns patterns from real URL data</li>
                    <li><div className="cs-list-bullet"></div>A clear, instant verdict anyone can read at a glance</li>
                    <li><div className="cs-list-bullet"></div>A built-in learning hub that turns a scan into a lesson</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Who We Designed For</h3>

            <div className="cs-personas-grid">
              <div className="persona-card">
                <div className="persona-avatar">🧑‍💻</div>
                <div>
                  <div className="persona-name">The Everyday User</div>
                  <div className="persona-role">Primary — Non-technical · Cautious</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Mobile-first</span>
                    <span className="persona-trait">Wants reassurance</span>
                    <span className="persona-trait">No jargon</span>
                  </div>
                  <p className="persona-quote">"I got a weird link in a message — can I just paste it somewhere and be told if it's safe?"</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🛡️</div>
                <div>
                  <div className="persona-name">The IT / Org Lead</div>
                  <div className="persona-role">Secondary — Security-conscious</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Risk-aware</span>
                    <span className="persona-trait">Needs reliability</span>
                    <span className="persona-trait">Scalability</span>
                  </div>
                  <p className="persona-quote">"I want a dependable check my whole team can use, with low false positives."</p>
                </div>
              </div>
              <div className="persona-card">
                <div className="persona-avatar">🎓</div>
                <div>
                  <div className="persona-name">The Learner</div>
                  <div className="persona-role">Tertiary — Student / Curious</div>
                  <div className="persona-traits">
                    <span className="persona-trait">Wants to understand</span>
                    <span className="persona-trait">Visual learner</span>
                    <span className="persona-trait">Engaged</span>
                  </div>
                  <p className="persona-quote">"Don't just tell me it's phishing — show me what made it phishing."</p>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Cross-Persona Insights</h3>

            <div className="cs-insight-comp">
              <div className="cs-comp-col labels">
                <div className="cs-comp-header empty"></div>
                <div className="cs-comp-row-label">Primary Goal</div>
                <div className="cs-comp-row-label">Core Frustration</div>
                <div className="cs-comp-row-label highlight">Design Insight</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🧑‍💻 Everyday User</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Quickly know if a single link is safe.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Security tools feel technical and intimidating.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">One big input, one plain-language verdict, zero setup.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🛡️ IT / Org Lead</div>
                <div className="cs-comp-cell" data-label="Primary Goal">A reliable check with few false alarms.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Inaccurate tools erode trust fast.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Prioritise model accuracy and a scalable API.</div>
              </div>
              <div className="cs-comp-col">
                <div className="cs-comp-header">🎓 Learner</div>
                <div className="cs-comp-cell" data-label="Primary Goal">Understand the "why" behind a verdict.</div>
                <div className="cs-comp-cell" data-label="Core Frustration">Tools give a verdict but no explanation.</div>
                <div className="cs-comp-cell highlight" data-label="Design Insight">Pair every result with an educational learning hub.</div>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               03 — THE AI / ML MODEL
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-ideation">
            <div className="cs-section-divider">
              <span className="cs-section-num">03 ——</span>
              <span className="cs-section-num">The Model</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">The AI &amp; ML Engine</h2>

            <p className="cs-body">
              At the heart of PhURL is a supervised classifier trained to tell malicious URLs from safe ones. The pipeline takes a raw link, engineers a set of numeric features from it, scales the data, and runs it through a trained model that returns a confident verdict.
            </p>

            <h3 className="cs-sub-heading">Detection Pipeline</h3>

            <div className="cs-flow">
              <div className="flow-step">
                <div className="flow-node">🔗</div>
                <div className="flow-label">URL Input</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🧬</div>
                <div className="flow-label">Feature Extraction</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🤖</div>
                <div className="flow-label">LightGBM Model</div>
              </div>
              <div className="flow-arrow"></div>
              <div className="flow-step">
                <div className="flow-node">🛡️</div>
                <div className="flow-label">Safe / Phishing Verdict</div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Model Selection</h3>
            <p className="cs-body">Three gradient-boosting and ensemble classifiers were trained and benchmarked on the same dataset. The Light GBM Classifier came out ahead on both accuracy and false-positive/negative balance, so it became the model shipped to production.</p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🥇</div>
                <h4>Light GBM <span style={{ color: 'var(--lyc-gold)' }}>· Chosen</span></h4>
                <p>The best performer at <strong style={{ color: '#fff' }}>96.6% accuracy</strong> with low false positives and negatives. Serialised to a <code>.joblib</code> file and loaded by the backend at inference time.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🌲</div>
                <h4>Random Forest</h4>
                <p>A strong ensemble baseline — reliable, but edged out on accuracy and speed for this feature set.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">⚡</div>
                <h4>XGBoost</h4>
                <p>Competitive gradient boosting that performed well, but didn't beat Light GBM's balance on this data.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">📊</div>
              <p className="cs-callout-text">The model was trained on a public <strong style={{ color: '#fff' }}>Kaggle dataset</strong> (by Manu Siddhartha) spanning <strong style={{ color: '#fff' }}>phishing, malware, defacement and safe URLs</strong>. Heavy preprocessing, feature engineering and data scaling were needed to squeeze reliable signal out of messy, real-world links.</p>
            </div>
          </section>


          {/* ═══════════════════════════════
               04 — UI / VISUAL DESIGN
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-design">
            <div className="cs-section-divider">
              <span className="cs-section-num">04 ——</span>
              <span className="cs-section-num">The Interface</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">UI &amp; Visual Design</h2>

            <p className="cs-body">
              A security tool only works if people aren't scared of it. The interface was designed in Figma around three priorities — <strong style={{ color: '#fff' }}>simplicity</strong> (a clean, minimal layout that never overwhelms), <strong style={{ color: '#fff' }}>accessibility</strong> (clear navigation and readable type for all levels), and <strong style={{ color: '#fff' }}>engagement</strong> (interactive checks and learning content that invite exploration).
            </p>

            <div className="creative-styleguide">
              <div className="sg-unit">
                <div className="glass-box">
                  <div className="typo-hero">Montserrat</div>
                  <div className="typo-weights-row">
                    <span className="typo-weight-item" style={{ fontWeight: 400 }}>Regular</span>
                    <span className="typo-weight-item" style={{ fontWeight: 400, fontStyle: 'italic' }}>Italic</span>
                    <span className="typo-weight-item" style={{ fontWeight: 500 }}>Medium</span>
                    <span className="typo-weight-item" style={{ fontWeight: 600 }}>Semi Bold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 700 }}>Bold</span>
                    <span className="typo-weight-item" style={{ fontWeight: 800 }}>Extra Bold</span>
                  </div>
                </div>
              </div>

              <div className="sg-unit">
                <div className="glass-box">
                  <div className="sg-unit-title">Color</div>
                  <p className="sg-unit-desc">PhURL's palette — a vivid purple and electric lime over a deep purple-black, with red reserved for danger and grey for neutral UI.</p>
                  <div className="color-strip">
                    <div className="color-block" style={{ background: '#FFFFFF' }}><span className="color-hex">#FFFFFF<br/>255, 255, 255</span></div>
                    <div className="color-block" style={{ background: '#8FFF00' }}><span className="color-hex">#8FFF00<br/>143, 255, 0</span></div>
                    <div className="color-block" style={{ background: '#704BFF' }}><span className="color-hex">#704BFF<br/>112, 75, 255</span></div>
                    <div className="color-block" style={{ background: '#11072D' }}><span className="color-hex">#11072D<br/>17, 7, 45</span></div>
                    <div className="color-block" style={{ background: '#AFAFAF' }}><span className="color-hex">#AFAFAF<br/>175, 175, 175</span></div>
                    <div className="color-block" style={{ background: '#FF0000' }}><span className="color-hex">#FF0000<br/>255, 0, 0</span></div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="cs-sub-heading">Core Interface Components</h3>
            <div className="ia-grid">
              <div className="cs-card">
                <div className="cs-card-icon">🔎</div>
                <h4>URL Scanner</h4>
                <p>One-field input · Real-time check · Clear verdict</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📚</div>
                <h4>Learning Hub</h4>
                <p>Articles · Infographics · Videos</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">📊</div>
                <h4>Results Dashboard</h4>
                <p>Verdict · Confidence · Guidance</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">💬</div>
                <h4>Feedback &amp; Errors</h4>
                <p>Friendly states · Recovery guidance</p>
              </div>
            </div>

            <h3 className="cs-sub-heading">High-Fidelity Screens</h3>
            <p className="cs-body">The screens below show the core PhURL experience — from the scan input to the safe/phishing result and the learning content that backs it up. Click any screen to view it in high resolution.</p>

            <div className="ui-gallery">
              {/* Row 1: Moving Right */}
              <div className="ui-marquee-track ui-track-2" id="marquee-1">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/Phurl/Home Screen UI.png">
                  <img src="/Images/projects/Phurl/Home Screen UI.png" alt="Home Screen" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home Screen</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Classic URL Detection UI.png">
                  <img src="/Images/projects/Phurl/Classic URL Detection UI.png" alt="Classic URL Detection" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Classic Detection</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Advanced URL Detection UI.png">
                  <img src="/Images/projects/Phurl/Advanced URL Detection UI.png" alt="Advanced URL Detection" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Advanced Detection</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/What is Phishing UI.png">
                  <img src="/Images/projects/Phurl/What is Phishing UI.png" alt="What is Phishing" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">What is Phishing</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Login UI.png">
                  <img src="/Images/projects/Phurl/Login UI.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Create Account UI.png">
                  <img src="/Images/projects/Phurl/Create Account UI.png" alt="Create Account" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Create Account</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/Phurl/Home Screen UI.png">
                  <img src="/Images/projects/Phurl/Home Screen UI.png" alt="Home Screen" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Home Screen</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Classic URL Detection UI.png">
                  <img src="/Images/projects/Phurl/Classic URL Detection UI.png" alt="Classic URL Detection" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Classic Detection</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Advanced URL Detection UI.png">
                  <img src="/Images/projects/Phurl/Advanced URL Detection UI.png" alt="Advanced URL Detection" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Advanced Detection</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/What is Phishing UI.png">
                  <img src="/Images/projects/Phurl/What is Phishing UI.png" alt="What is Phishing" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">What is Phishing</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Login UI.png">
                  <img src="/Images/projects/Phurl/Login UI.png" alt="Login" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Login</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Create Account UI.png">
                  <img src="/Images/projects/Phurl/Create Account UI.png" alt="Create Account" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Create Account</div>
                </div>
              </div>

              {/* Row 2: Moving Left */}
              <div className="ui-marquee-track ui-track-1" id="marquee-2">
                {/* Set 1 */}
                <div className="ui-card" data-full="/Images/projects/Phurl/Account Successful UI.png">
                  <img src="/Images/projects/Phurl/Account Successful UI.png" alt="Account Created" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Account Created</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/View Profile UI.png">
                  <img src="/Images/projects/Phurl/View Profile UI.png" alt="View Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">View Profile</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Update Profile Success UI.png">
                  <img src="/Images/projects/Phurl/Update Profile Success UI.png" alt="Profile Updated" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile Updated</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Comtinue History Delete UI.png">
                  <img src="/Images/projects/Phurl/Comtinue History Delete UI.png" alt="Delete History" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Delete History</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/History Delete Success UI.png">
                  <img src="/Images/projects/Phurl/History Delete Success UI.png" alt="History Deleted" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">History Deleted</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/T&C UI.png">
                  <img src="/Images/projects/Phurl/T&C UI.png" alt="Terms and Conditions" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Terms &amp; Conditions</div>
                </div>
                {/* Set 2 (Duplicate for loop) */}
                <div className="ui-card" data-full="/Images/projects/Phurl/Account Successful UI.png">
                  <img src="/Images/projects/Phurl/Account Successful UI.png" alt="Account Created" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Account Created</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/View Profile UI.png">
                  <img src="/Images/projects/Phurl/View Profile UI.png" alt="View Profile" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">View Profile</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Update Profile Success UI.png">
                  <img src="/Images/projects/Phurl/Update Profile Success UI.png" alt="Profile Updated" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Profile Updated</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/Comtinue History Delete UI.png">
                  <img src="/Images/projects/Phurl/Comtinue History Delete UI.png" alt="Delete History" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Delete History</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/History Delete Success UI.png">
                  <img src="/Images/projects/Phurl/History Delete Success UI.png" alt="History Deleted" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">History Deleted</div>
                </div>
                <div className="ui-card" data-full="/Images/projects/Phurl/T&C UI.png">
                  <img src="/Images/projects/Phurl/T&C UI.png" alt="Terms and Conditions" className="ui-thumb" loading="lazy" decoding="async" />
                  <div className="ui-card-label">Terms &amp; Conditions</div>
                </div>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════
               05 — BUILD / ENGINEERING
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-vibe">
            <div className="cs-section-divider">
              <span className="cs-section-num">05 ——</span>
              <span className="cs-section-num">The Build</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Development &amp; Deployment</h2>

            <p className="cs-body">
              PhURL is a full-stack build: a React front end talking to a Django back end that wraps the trained model behind a clean API. Development followed a hybrid of Agile, Scrum and Waterfall — structured enough to plan the ML work, flexible enough to iterate on the UI from user feedback.
            </p>

            <div className="cs-cards-grid">
              <div className="cs-card">
                <div className="cs-card-icon">⚛️</div>
                <h4>Frontend</h4>
                <p>Built in <strong style={{ color: '#fff' }}>React + JavaScript</strong> — an interactive dashboard and a real-time URL verification tool that calls the backend and renders the verdict instantly.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🐍</div>
                <h4>Backend</h4>
                <p>A <strong style={{ color: '#fff' }}>Django</strong> service in an MVC structure exposing API endpoints for URL verification, with the Light GBM classifier loaded for inference.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">🧠</div>
                <h4>ML Integration</h4>
                <p>The trained model is serialised to <code>joblib</code> and called per request — feature-engineering the URL, scaling, then classifying it as safe or malicious.</p>
              </div>
              <div className="cs-card">
                <div className="cs-card-icon">☁️</div>
                <h4>Deployment</h4>
                <p>Packaged for <strong style={{ color: '#fff' }}>Heroku</strong> (Procfile, runtime &amp; requirements) for easy, scalable hosting of the Django app and model together.</p>
              </div>
            </div>

            <div className="cs-callout">
              <div className="cs-callout-icon">🧪</div>
              <p className="cs-callout-text">Quality came from real testing: <strong style={{ color: '#fff' }}>User Acceptance Testing</strong> with university students plus <strong style={{ color: '#fff' }}>cross-browser checks</strong> on Chrome, Brave, Firefox and Opera Mini — each round feeding fixes back into the UI/UX.</p>
            </div>

            <p className="cs-body" style={{ marginTop: '24px' }}>
              Explore the engineering behind it:
              <a href="https://github.com/ruchira-edirisinghe/Project-PhURL-Backend" target="_blank" rel="noopener" style={{ color: 'var(--lyc-cyan)', fontWeight: 600 }}>Backend &amp; API repo ↗</a>
              &nbsp;·&nbsp;
              <a href="https://github.com/ruchira-edirisinghe/Project-PhURL-Heroku" target="_blank" rel="noopener" style={{ color: 'var(--lyc-cyan)', fontWeight: 600 }}>Heroku deployment repo ↗</a>
            </p>
          </section>


          {/* ═══════════════════════════════
               06 — RESULTS & REFLECTION
          ═══════════════════════════════ */}
          <section className="cs-section" id="sec-results">
            <div className="cs-section-divider">
              <span className="cs-section-num">06 ——</span>
              <span className="cs-section-num">Results &amp; Reflection</span>
              <div className="cs-section-line"></div>
            </div>
            <h2 className="cs-section-title">Outcome &amp; Impact</h2>

            <h3 className="cs-sub-heading">Key Outcomes</h3>

            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-metric" data-text="96.6%">0</div>
                <div className="outcome-label">Detection accuracy with the Light GBM model</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-metric" data-count="4" data-suffix=" Browsers">0</div>
                <div className="outcome-label">Cross-browser verified — Chrome, Brave, Firefox, Opera Mini</div>
              </div>
            </div>

            <div className="cs-highlight" style={{ marginTop: '28px' }}>
              <p>"PhURL successfully addresses the growing threat of phishing by combining advanced machine learning with user education — its intuitive design, high accuracy and scalability make it valuable for individuals and organisations alike."</p>
            </div>

            <div className="reflection-grid">
              <div className="reflection-card">
                <h4>📈 Outcome</h4>
                <p>A reliable detector (96.6% accuracy, low false positives) wrapped in an interface that testers praised for its design and educational resources — and confirmed working across major browsers.</p>
              </div>
              <div className="reflection-card">
                <h4>🧗 Challenges</h4>
                <p>Dataset limitations meant extensive preprocessing; tuning the model was a constant balance between accuracy and minimising false positives/negatives; and interface warnings had to be reworked from user feedback.</p>
              </div>
              <div className="reflection-card">
                <h4>💡 What I Learned</h4>
                <p>A hybrid methodology balanced flexibility with structure, and continuous user feedback was crucial to refining usability. Above all: adaptability is essential against evolving phishing tactics.</p>
              </div>
              <div className="reflection-card">
                <h4>🚀 Next Steps</h4>
                <p>On-screen warnings as users browse, deeper detection capabilities, and a mobile app to put PhURL's protection in more hands.</p>
              </div>
            </div>

            <div className="cs-cta-row">
              <a href="https://www.behance.net/gallery/162863377/PhURL-Phishing-URL-Detection-Learning-Platform" target="_blank" rel="noopener"
                className="cs-cta-btn primary">View on Behance →</a>
              <a href="https://www.figma.com/file/BcFxaUP9jcyyUxHTR81APO/PhURL---UI-Design" target="_blank"
                rel="noopener" className="cs-cta-btn ghost">Open in Figma</a>
              <a href="https://github.com/ruchira-edirisinghe/Project-PhURL-Backend" target="_blank"
                rel="noopener" className="cs-cta-btn ghost">Backend Code on GitHub</a>
              <a href="https://github.com/ruchira-edirisinghe/Project-PhURL-Heroku" target="_blank"
                rel="noopener" className="cs-cta-btn ghost">Deployment on GitHub</a>
            </div>
          </section>

        </div>
      </main>

      {/* ── CASE STUDY IMAGE MODAL ── */}
      <div id="cs-modal" className="cs-modal-overlay" aria-hidden="true">
        <button id="cs-modal-zoom" className="cs-modal-btn zoom-btn" aria-label="Zoom image">
          <svg viewBox="0 0 24 24">
            <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </button>
        <button id="cs-modal-close" className="cs-modal-btn" aria-label="Close modal">
          <svg viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <button id="cs-modal-prev" className="cs-modal-nav-btn" aria-label="Previous image">
          <svg viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button id="cs-modal-next" className="cs-modal-nav-btn" aria-label="Next image">
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div className="cs-modal-container">
          <div className="cs-modal-content">
            <img id="cs-modal-img" src="" alt="Case Study Preview" loading="lazy" decoding="async" />
            <div className="cs-modal-info">
              <div id="cs-modal-counter" className="cs-modal-counter">0 / 0</div>
              <h3 id="cs-modal-title" className="cs-modal-title"></h3>
            </div>
          </div>
        </div>
      </div>

      {/* ── REDIRECTION MODAL ── */}
      <div id="redirect-modal" className="redirect-modal-overlay" aria-hidden="true">
        <div className="redirect-modal-card">
          <div className="redirect-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
          <h3 id="redirect-title" className="redirect-title">Exiting Habitat</h3>
          <p id="redirect-msg" className="redirect-msg">Do you wish to continue to view this project externally?</p>
          <div className="redirect-cta-row">
            <button id="redirect-cancel" className="redirect-btn ghost">Stay Here</button>
            <a id="redirect-confirm" href="#" target="_blank" rel="noopener" className="redirect-btn primary">Continue ↗</a>
          </div>
        </div>
      </div>
    </StandardShell>
  );
}
