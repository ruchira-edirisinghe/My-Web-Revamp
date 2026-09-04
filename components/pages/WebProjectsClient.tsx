'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import { cssVars } from '@/lib/css';
import { initProjects } from '@/lib/scripts/projects';
import { initProjectFilter } from '@/lib/scripts/project-filter';

interface WebProject {
  cat: string;
  idx: number;
  img: string;
  alt: string;
  tag: string;
  label: string;
  title: string;
  desc: string;
  tags: string[];
  href: string;
}

const WEB_PROJECTS: WebProject[] = [
  { cat: 'web dev', idx: 0, img: '/Images/projects/catalogie/cover-thumb.png', alt: 'Catalogie - media tracker for movies, TV, games and books', tag: 'Collaborative · Design & Development', label: 'Live Product · Ongoing', title: 'Catalogie', desc: 'A live, self-hosted media tracker built with two collaborators - movies, TV series, games and books in one catalog, each logged at its own unit of progress, behind a strict-TypeScript PERN API with ratings, social, analytics and importers. Still shipping: six versions since launch.', tags: ['React · Express 5', 'PostgreSQL · TS', 'Team of 3'], href: '/projects/web/catalogie' },
  { cat: 'web dev', idx: 1, img: '/Images/projects/Phurl/cover-thumb.png', alt: 'Project PhURL - AI Phishing URL Detection', tag: 'UI/UX Designing & Development', label: 'AI · Cybersecurity', title: 'Project PhURL', desc: 'A full-stack phishing-URL detection & awareness platform - a LightGBM model (96.6% accuracy) wrapped in a React + Django app, with a built-in learning hub.', tags: ['UI/UX', 'React · Django', 'Machine Learning'], href: '/projects/web/phurl' },
  { cat: 'web mobile', idx: 2, img: '/Images/projects/funxt/cover-thumb.png', alt: 'Fun Extreme Technology Corporate Website UI', tag: 'UI/UX Designing', label: 'Corporate / Gaming-Tech', title: 'Fun Extreme Technology', desc: 'A corporate website for a gaming-tech firm - home, four solution pillars, company, careers and contact - on one bold red-gradient system, designed for desktop and mobile and shipped to a live site.', tags: ['Figma', 'UI/UX', 'Web + Mobile'], href: '/projects/web/funxt' },
  { cat: 'web mobile', idx: 3, img: '/Images/projects/social-casino/cover-thumb.png', alt: '747 Social Casino Platform UI', tag: 'UI/UX Designing', label: 'Social Casino UI', title: '747 Social Casino', desc: 'A social casino that blends a full social network - profiles, stories, posts and comments - with games and prizes, on a green-and-gold token system designed for desktop and mobile.', tags: ['Figma', 'UI/UX', 'Web + Mobile'], href: '/projects/web/747social' },
  { cat: 'web mobile', idx: 4, img: '/Images/projects/lottogram/cover-thumb.png', alt: 'Lottogram Betting & Lottery Platform UI', tag: 'UI/UX Designing', label: 'iGaming / Betting UI', title: 'Lottogram', desc: 'A bold betting & lottery platform - games, live events, wallet, bet history and loyalty - designed end-to-end on one red-and-gold system for both desktop and mobile.', tags: ['Figma', 'UI/UX', 'Web + Mobile'], href: '/projects/web/lottogram' },
  { cat: 'dev games', idx: 5, img: '/Images/projects/horse-game/cover-thumb.png', alt: 'Horse Racing Elite - browser racing game', tag: 'Development + Vibe Coding', label: 'Web Game / Next.js', title: 'Horse Racing Elite', desc: 'A browser multiplayer racing arena built with Next.js - a seeded, fixed-timestep 60fps race engine, odds-based betting, bots and a neon e-sports skin, shipped backend-free and vibe-coded end to end.', tags: ['Next.js · React', 'TypeScript', 'Vibe Coding'], href: '/projects/web/horse-racing' },
  { cat: 'dev games', idx: 6, img: '/Images/projects/car-game/cover-thumb.png', alt: 'Ready To Race Unlimited - browser car-racing game', tag: 'Development + Vibe Coding', label: 'Web Game / Next.js', title: 'Ready To Race Unlimited', desc: 'A browser multiplayer car-racing arena built with Next.js - a seeded, fixed-timestep 60fps race engine, odds-based betting, bots and a neon e-sports skin, shipped backend-free and vibe-coded end to end.', tags: ['Next.js · React', 'TypeScript', 'Vibe Coding'], href: '/projects/web/car-racing' },
  { cat: 'dev games', idx: 7, img: '/Images/projects/aether-dynasty/cover-thumb.png', alt: 'Aether Dynasty - browser slot game', tag: 'Development + Vibe Coding', label: 'Web Game / iGaming', title: 'Aether Dynasty', desc: 'A browser slot game with up to 46,656 ways - a cascading expanding board, Greek-god symbols, Golden Frame Wilds, Free Games with a rising multiplier, a Golden Treasure bonus, turbo and auto-spin, two-channel audio, built entirely client-side and vibe-coded end to end.', tags: ['Next.js · React', 'TypeScript', 'Vibe Coding'], href: '/projects/web/aether-dynasty' },
  { cat: 'dev games', idx: 8, img: '/Images/projects/propbet/cover-thumb.png', alt: 'PropBet - real-time crash betting game', tag: 'Development + Vibe Coding', label: 'Web Game / iGaming', title: 'PropBet', desc: 'A real-time crash betting game built with Next.js - a plane climbs a rising multiplier curve that can burst at any moment, with dual bet panels, per-panel auto cash-out, a live crash-history rail and a smooth 60fps game loop, shipped backend-free and vibe-coded end to end.', tags: ['Next.js · React', 'TypeScript', 'Vibe Coding'], href: '/projects/web/propbet' },
  { cat: 'dev games', idx: 9, img: '/Images/projects/collapse-factor/cover-thumb.png', alt: 'Collapse Factor - browser tower-pull betting game', tag: 'Development + Game Design', label: 'Web Game / 3D Betting', title: 'Collapse Factor', desc: 'Jenga as a cash-out ladder, drawn as an engineering sheet - a claw pulls a block out of a 48-block tower every turn while the collapse factor is printed on a gauge before you commit. The ladder is priced from that same published curve, so every rung returns exactly 97%.', tags: ['Next.js · three.js', 'TypeScript', 'Provably Fair'], href: '/projects/web/collapse-factor' },
  { cat: 'dev games', idx: 10, img: '/Images/projects/coin-duel/cover-thumb.png', alt: 'Coin Duel - browser coin-toss duelling game', tag: 'Development + Game Design', label: 'Web Game / 3D Betting', title: 'Coin Duel', desc: 'Five coins minted into a column of light in a neon pit - back the face that lands on more of them. Five is odd so a tie is impossible, and both prices are re-drawn every round from a ladder that averages to an exact 97.000% return.', tags: ['Next.js · three.js', 'WebGL + Bloom', 'Provably Fair'], href: '/projects/web/coin-duel' },
  { cat: 'dev games', idx: 11, img: '/Images/projects/kamba-adeema/cover-thumb.png', alt: 'Kamba Adeema - browser tug-of-war betting game', tag: 'Development + Game Design', label: 'Web Game / Cultural Sport', title: 'Kamba Adeema', desc: 'The Avurudu tug of war as a one-bet betting pitch in 3D, in front of two hundred instanced spectators. Eight pullers grip or slip as fair coins, the swing settles the bet and drags the rope, and a draw refunds - which makes the fair price exactly evens by symmetry.', tags: ['Next.js · three.js', 'InstancedMesh', '97.09% RTP'], href: '/projects/web/kamba-adeema' },
  { cat: 'dev games', idx: 12, img: '/Images/projects/kana-mutti/cover-thumb.png', alt: 'Kana Mutti - browser blindfold pot-smashing betting game', tag: 'Development + Game Design', label: 'Web Game / Sealed Reveal', title: 'Kana Mutti', desc: 'The Avurudu blindfold pot-smash as a cash-out ladder, and the arcade’s reference build for sealed-reveal fairness - a board that is publicly verifiable afterwards and completely unguessable while you are still picking pots.', tags: ['Next.js · three.js', 'Commit-Reveal', 'a11y DOM Mirror'], href: '/projects/web/kana-mutti' },
  { cat: 'dev games', idx: 13, img: '/Images/projects/pixel-poker/cover-thumb.png', alt: "Pixel Perfect Poker - browser Texas Hold'em tournament", tag: 'Development + Game Design', label: 'Web Game / Skill · No House', title: 'Pixel Perfect Poker', desc: "A 6-max No-Limit Hold'em Sit & Go in a retro pixel skin - a full rules engine with real side pots and split pots, five Monte-Carlo bots with distinct personalities, and a deal that has to stay secret rather than be published.", tags: ['Next.js · React', 'Monte Carlo AI', 'Firebase MP'], href: '/projects/web/pixel-poker' },
  { cat: 'web', idx: 14, img: '/Images/projects/lyceum/cover-thumb.png', alt: 'Lyceum Campus', tag: 'UI/UX Designing', label: 'Academic Redesign', title: 'Lyceum Campus', desc: 'A comprehensive web redesign focusing on information architecture, course findability, and brand identity for a modern university.', tags: ['Figma', 'UI/UX', 'Research'], href: '/projects/web/lycampus' },
  { cat: 'web', idx: 15, img: '/Images/projects/msg_platform/cover-thumb.png', alt: 'Messaging Platform UI', tag: 'UI/UX Designing', label: 'SaaS Dashboard UI', title: 'Messaging Platform', desc: 'A multi-channel messaging services platform for developers & teams - guided service creation, a visual parameter builder, API tokens, logs and billing, secured with 2FA.', tags: ['Figma', 'UI/UX', 'SaaS'], href: '/projects/web/messaging-system' },
  { cat: 'web', idx: 16, img: '/Images/projects/kyc/cover-thumb.png', alt: 'KYC Verification UI', tag: 'UI/UX Designing', label: 'Identity / Fintech UI', title: 'KYC Verification', desc: 'A guided identity-verification flow - consent, document upload with live status, and face-scan liveness across a 4-step journey, designed end-to-end in both light and dark.', tags: ['Figma', 'UI/UX', 'Fintech'], href: '/projects/web/kyc' },
  { cat: 'web', idx: 17, img: '/Images/projects/agent/cover-thumb.png', alt: '747 Agent Back-Office Dashboard UI', tag: 'UI/UX Designing', label: 'Back-Office / iGaming Ops', title: '747 Agent Back-Office', desc: 'A multi-level agent & player management console - agent tree, credit lines, transfers, commissions and a full reports suite - designed end-to-end in two complete themes, dark and light.', tags: ['Figma', 'UI/UX', 'Dark + Light'], href: '/projects/web/agent-system' },
  { cat: 'web', idx: 18, img: '/Images/projects/LMS/cover-thumb.png', alt: 'ZUSE Corporate LMS', tag: 'UI/UX Designing', label: 'EdTech Architecture', title: 'ZUSE Corporate LMS', desc: 'A state-of-the-art Learning Management System designed to empower corporate employees through intuitive UX and interactive learning.', tags: ['Figma', 'UI/UX', 'EdTech'], href: '/projects/web/lms' },
  { cat: 'web dev', idx: 19, img: '/Images/projects/technosphere/cover-thumb.png', alt: 'Technosphere Case Study', tag: 'UI/UX Designing & Development + Consulting', label: 'Sustainable Tech', title: 'Technosphere', desc: 'A digital platform dedicated to tracking and analyzing environmental impact, fostering sustainable technological growth through data-driven insights.', tags: ['UI/UX', 'Sustainability', 'Web App'], href: '/projects/web/technosphere' },
  { cat: 'web', idx: 20, img: '/Images/projects/vebuild/cover-thumb.png', alt: 'VeBuild Construction Web UI', tag: 'UI/UX Designing', label: 'Construction Web UI', title: 'VeBuild', desc: 'A clean & sleek website redesign for a construction company - featuring a side-by-side look at two UI directions, from an earlier block layout to the refined final design.', tags: ['Figma', 'UI/UX', 'Web'], href: '/projects/web/vebuild' },
  { cat: 'web', idx: 21, img: '/Images/projects/dtmhms/COVER-thumb.png', alt: 'DTM Hall Management System', tag: 'UI/UX Designing', label: 'Booking Platform UI', title: 'DTM Hall Management System', desc: 'A clean, sleek hall-booking platform that replaces paper-based venue reservations with a colour-coded calendar, side-by-side venue comparison, and a scalable design system.', tags: ['Figma', 'UI/UX', 'React.js'], href: '/projects/web/dtmhms' },
  { cat: 'web', idx: 22, img: '/Images/projects/ncgws/cover-thumb.png', alt: 'NCG Warehouse Solutions Web UI', tag: 'UI/UX Designing', label: 'Corporate Web UI', title: 'NCG Warehouse', desc: 'A corporate website for a logistics & warehousing company - surfacing live capacity, smart tender discovery, and fleet reach through a clean, blue-and-yellow design system.', tags: ['Figma', 'UI/UX', 'Vue.js'], href: '/projects/web/ncgws' },
  { cat: 'web', idx: 23, img: '/Images/projects/lyaportal/cover-thumb.png', alt: 'Lyceum Academy Exam Portal UI', tag: 'UI/UX Designing', label: 'Multi-Role Portal UI', title: 'LYA Exam Portal', desc: "Lyceum Academy's online exam registration & payment portal - three tailored journeys for students, parents and teachers, with flexible online and bank-transfer payment flows.", tags: ['Figma', 'UI/UX', 'Web Portal'], href: '/projects/web/lyaportal' },
];

export default function WebProjectsClient() {
  useEffect(() => {
    const disposers = [initProjects(), initProjectFilter()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  return (
    <StandardShell
      active="projects"
      dataPage="projects"
      tagline={<>Architecting the <span className="tagline-name">Digital Cosmos</span></>}
    >
      <main>
        <header id="hero-heading">
          <div className="back-nav-wrap">
            <Link href="/projects" className="back-link"><span>←</span> Back to Project Categories</Link>
          </div>
          <p className="section-label">Digital Craft</p>
          <h1 className="page-title">Web Projects</h1>
          <br />
          <p className="bio-para">
            High-performance web applications and interactive digital ecosystems built with modern frameworks and liquid
            glass aesthetics.
          </p>
        </header>

        <div className="project-filter" role="group" aria-label="Filter projects by category">
          <button className="filter-btn active" type="button" data-filter="all" aria-pressed="true">All</button>
          <button className="filter-btn" type="button" data-filter="web" aria-pressed="false">Web UI/UX</button>
          <button className="filter-btn" type="button" data-filter="mobile" aria-pressed="false">Mobile UI/UX</button>
          <button className="filter-btn" type="button" data-filter="dev" aria-pressed="false">Development</button>
          <button className="filter-btn" type="button" data-filter="games" aria-pressed="false">Web Games</button>
        </div>

        <div className="projects-grid">
          {WEB_PROJECTS.map((c) => (
            <div key={c.title} className="project-card type-web" data-category={c.cat} style={cssVars({ '--card-index': c.idx })}>
              <div className="project-image-wrap">
                <img src={c.img} alt={c.alt} className="project-card-img" />
                <span className="project-card-tag">{c.tag}</span>
              </div>
              <div className="project-content">
                <span className="project-label">{c.label}</span>
                <h3 className="project-title">{c.title}</h3>
                <p className="project-desc">{c.desc}</p>
                <div className="project-tags">
                  {c.tags.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
              <div className="project-links">
                <Link href={c.href} className="project-link-btn">View Case Study ↗</Link>
              </div>
            </div>
          ))}
          <p className="filter-empty" id="filter-empty" hidden>More projects in this category are on the way - coming soon.</p>
        </div>
      </main>
    </StandardShell>
  );
}
