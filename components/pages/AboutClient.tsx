'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import StandardShell from '@/components/StandardShell';
import SignOff from '@/components/SignOff';
import { cssVars } from '@/lib/css';
import { initAbout } from '@/lib/scripts/about';

export default function AboutClient() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  // Portal target (document.body) is only available after mount on the client.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const disposers = [initAbout()];
    return () => disposers.forEach((d) => d && d());
  }, []);

  useEffect(() => {
    document.body.style.overflow = isCvModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCvModalOpen]);

  useEffect(() => {
    if (!isCvModalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCvModalOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCvModalOpen]);

  return (
    <StandardShell
      active="about"
      dataPage="about"
      tagline={<>Getting to know more about<br className="tagline-br" /> <span className="tagline-name">Ruchira Edirisinghe</span></>}
    >
      <main className="page">
          <p className="section-label">Get to know me</p>
          <h1 className="page-title">About Me</h1>
      
          <div className="hero-intro">
            <div className="hero-intro-grid">
      
              
              <div className="hero-side hero-side-left">
                <p className="hero-side-phrase"><span className="line1">Turning Ideas</span><span className="accent">Into Reality</span>
                </p>
                <p className="hero-side-phrase"><span className="line1">Designing for</span><span className="accent">Better UX</span></p>
                <div className="hero-arcs">
                  <svg width="68" height="52" viewBox="0 0 68 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 44 Q44 52 28 44" stroke="rgba(100,190,255,0.8)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                    <path d="M54 32 Q38 42 20 32" stroke="rgba(100,190,255,0.6)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                    <path d="M48 20 Q32 32 12 20" stroke="rgba(100,190,255,0.4)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                  </svg>
                </div>
              </div>
      
              
              <div className="hero-intro-photo-wrap">
                <div className="hero-intro-arch"></div>
                <div className="hero-intro-photo">
                  <img src="/Images/mefront.webp" alt="Ruchira Edirisinghe" decoding="async" />
                </div>
      
                
                <div className="photo-doodles-back" aria-hidden="true">
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.06s', '--rot': '8deg', '--ox': '0px', '--oy': '80px', top: '28%', left: '47%', width: '90px', height: '56px' })}
                    viewBox="0 0 90 56" fill="none">
                    <ellipse cx="45" cy="28" rx="38" ry="15" stroke="rgba(100,60,200,0.55)" strokeWidth="2.3"
                      strokeLinecap="round" />
                    <ellipse cx="45" cy="28" rx="22" ry="9" stroke="rgba(100,60,200,0.48)" strokeWidth="2"
                      strokeLinecap="round" />
                    <ellipse cx="45" cy="28" rx="8" ry="4" stroke="rgba(100,60,200,0.72)" strokeWidth="2.2"
                      strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.09s', '--rot': '-4deg', '--ox': '30px', '--oy': '60px', top: '42%', left: '34%', width: '34px', height: '62px' })}
                    viewBox="0 0 34 62" fill="none">
                    <path d="M26 4 L8 26 L20 26 L4 58" stroke="rgba(100,60,200,0.62)" strokeWidth="2.4"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.12s', '--rot': '-12deg', '--ox': '-10px', '--oy': '40px', top: '58%', left: '44%', width: '50px', height: '50px' })}
                    viewBox="0 0 50 50" fill="none">
                    <path d="M25 25 C25 18 32 14 37 19 C42 24 37 34 27 32 C14 30 9 17 17 9 C25 1 40 5 44 18"
                      stroke="rgba(100,60,200,0.58)" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.07s', '--rot': '6deg', '--ox': '50px', '--oy': '50px', top: '50%', left: '28%', width: '44px', height: '42px' })}
                    viewBox="0 0 44 42" fill="none">
                    <path
                      d="M22 36 C22 36 3 24 3 13 C3 7.5 7.5 3.5 13 3.5 C16.5 3.5 19.5 5.5 22 9 C24.5 5.5 27.5 3.5 31 3.5 C36.5 3.5 41 7.5 41 13 C41 24 22 36 22 36Z"
                      stroke="rgba(100,60,200,0.6)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
      
                </div>
      
                
                <div className="photo-doodles-front" aria-hidden="true">
      
                  
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.04s', '--rot': '-6deg', '--ox': '0px', '--oy': '160px', top: '-4%', left: '33%', width: '68px', height: '64px' })}
                    viewBox="0 0 68 64" fill="none">
                    <path
                      d="M17 25 C17 25 5 17 5 9.5 C5 5.8 8 3 12 3 C14.5 3 16.5 4.5 17 7 C17.5 4.5 19.5 3 22 3 C26 3 29 5.8 29 9.5 C29 17 17 25 17 25Z"
                      stroke="rgba(100,60,200,0.92)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M46 29 C46 29 34 21 34 13.5 C34 9.8 37 7 41 7 C43.5 7 45.5 8.5 46 11 C46.5 8.5 48.5 7 51 7 C55 7 58 9.8 58 13.5 C58 21 46 29 46 29Z"
                      stroke="rgba(100,60,200,0.88)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 25 Q19 35 21 40" stroke="rgba(100,60,200,0.62)" strokeWidth="1.9" strokeLinecap="round" />
                    <path d="M46 29 Q47 37 48 42" stroke="rgba(100,60,200,0.62)" strokeWidth="1.9" strokeLinecap="round" />
                    <path d="M21 40 Q34 38 48 42" stroke="rgba(100,60,200,0.52)" strokeWidth="1.9" strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.07s', '--rot': '6deg', '--ox': '-60px', '--oy': '150px', top: '-2%', left: '52%', width: '82px', height: '52px' })}
                    viewBox="0 0 82 52" fill="none">
                    <ellipse cx="41" cy="26" rx="35" ry="13" stroke="rgba(100,60,200,0.8)" strokeWidth="2.2"
                      strokeLinecap="round" />
                    <ellipse cx="41" cy="26" rx="21" ry="8" stroke="rgba(100,60,200,0.65)" strokeWidth="2"
                      strokeLinecap="round" />
                    <ellipse cx="41" cy="26" rx="7" ry="3.5" stroke="rgba(100,60,200,0.9)" strokeWidth="2.2"
                      strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.05s', '--rot': '-3deg', '--ox': '-100px', '--oy': '110px', top: '1%', right: '9%', width: '74px', height: '48px' })}
                    viewBox="0 0 74 48" fill="none">
                    <path
                      d="M12 42 Q4 42 4 34 Q4 26 12 25 Q11 14 21 14 Q25 6 36 11 Q42 5 51 11 Q63 10 65 22 Q73 24 73 32 Q73 40 64 40 Z"
                      stroke="rgba(100,60,200,0.84)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.09s', '--rot': '0deg', '--ox': '-100px', '--oy': '110px', top: '8%', right: '4%', width: '70px', height: '58px' })}
                    viewBox="0 0 70 58" fill="none">
                    <path
                      d="M52 4 L54.4 13.6 L64 11 L57.5 18 L64 25 L54.4 22.4 L52 32 L49.6 22.4 L40 25 L46.5 18 L40 11 L49.6 13.6 Z"
                      stroke="rgba(100,60,200,0.92)" strokeWidth="2.1" strokeLinejoin="round" />
                    <path
                      d="M20 28 L21.5 33.5 L27 32 L23 36.5 L27 41 L21.5 39.5 L20 45 L18.5 39.5 L13 41 L17 36.5 L13 32 L18.5 33.5 Z"
                      stroke="rgba(100,60,200,0.78)" strokeWidth="1.9" strokeLinejoin="round" />
                    <path
                      d="M36 6 L37.2 10 L41 9.2 L38.5 12 L41 14.8 L37.2 14 L36 18 L34.8 14 L31 14.8 L33.5 12 L31 9.2 L34.8 10 Z"
                      stroke="rgba(100,60,200,0.72)" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
      
                  
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.05s', '--rot': '-14deg', '--ox': '110px', '--oy': '130px', top: '10%', left: '5%', width: '46px', height: '46px' })}
                    viewBox="0 0 46 46" fill="none">
                    <path
                      d="M23 3 L26.4 14.5 L38.5 11.2 L30 21 L38.5 30.8 L26.4 27.5 L23 39 L19.6 27.5 L7.5 30.8 L16 21 L7.5 11.2 L19.6 14.5 Z"
                      stroke="rgba(100,60,200,0.9)" strokeWidth="2.2" strokeLinejoin="round" />
                  </svg>
      
                  
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.08s', '--rot': '10deg', '--ox': '130px', '--oy': '55px', top: '34%', left: '1%', width: '54px', height: '52px' })}
                    viewBox="0 0 54 52" fill="none">
                    <path
                      d="M27 46 C27 46 3 31 3 16 C3 9 8.5 4 15.5 4 C19.5 4 23 6.5 27 11 C31 6.5 34.5 4 38.5 4 C45.5 4 51 9 51 16 C51 31 27 46 27 46Z"
                      stroke="rgba(100,60,200,0.9)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.11s', '--rot': '5deg', '--ox': '125px', '--oy': '5px', top: '49%', left: '1%', width: '56px', height: '56px' })}
                    viewBox="0 0 56 56" fill="none">
                    <path d="M28 28 C28 20 36 16 42 22 C48 28 42 40 30 38 C16 36 10 22 18 12 C26 2 44 6 48 20"
                      stroke="rgba(100,60,200,0.86)" strokeWidth="2.3" strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.14s', '--rot': '-6deg', '--ox': '115px', '--oy': '-55px', bottom: '22%', left: '0%', width: '86px', height: '76px' })}
                    viewBox="0 0 86 76" fill="none">
                    <path
                      d="M17 48 Q8 48 8 40 Q8 32 17 31 Q15 20 26 20 Q30 12 40 17 Q47 11 55 18 Q68 17 70 29 Q79 31 79 40 Q79 48 70 48 Z"
                      stroke="rgba(100,60,200,0.82)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M14 60 L15.3 65.2 L20.5 64 L17 68 L20.5 72 L15.3 70.8 L14 76 L12.7 70.8 L7.5 72 L11 68 L7.5 64 L12.7 65.2 Z"
                      stroke="rgba(100,60,200,0.84)" strokeWidth="1.8" strokeLinejoin="round" />
                    <path
                      d="M37 58 L38.2 62.5 L43 61.5 L39.8 65 L43 68.5 L38.2 67.5 L37 72 L35.8 67.5 L31 68.5 L34.2 65 L31 61.5 L35.8 62.5 Z"
                      stroke="rgba(100,60,200,0.74)" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
      
                  
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.13s', '--rot': '-18deg', '--ox': '85px', '--oy': '-95px', bottom: '28%', left: '10%', width: '74px', height: '62px' })}
                    viewBox="0 0 74 62" fill="none">
                    <path d="M6 58 Q36 6 66 30" stroke="rgba(100,60,200,0.7)" strokeWidth="2.2" strokeLinecap="round"
                      strokeDasharray="5 6" />
                    <path d="M56 22 L66 30 L58 40" stroke="rgba(100,60,200,0.84)" strokeWidth="2.2" strokeLinecap="round"
                      strokeLinejoin="round" />
                    <circle cx="28" cy="46" r="2.6" stroke="rgba(100,60,200,0.62)" strokeWidth="1.8" />
                    <circle cx="17" cy="32" r="2.1" stroke="rgba(100,60,200,0.52)" strokeWidth="1.7" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.18s', '--rot': '2deg', '--ox': '65px', '--oy': '-135px', bottom: '7%', left: '0%', width: '100px', height: '48px' })}
                    viewBox="0 0 100 48" fill="none">
                    <path d="M4 36 C14 16 24 44 34 30 C42 20 50 46 62 32 C70 22 80 42 96 24" stroke="rgba(100,60,200,0.84)"
                      strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.16s', '--rot': '-10deg', '--ox': '88px', '--oy': '-155px', bottom: '4%', left: '9%', width: '40px', height: '40px' })}
                    viewBox="0 0 40 40" fill="none">
                    <path d="M20 6 C32 6 36 17 30 25 C24 33 11 31 9 21 C7 11 17 4 23 11 C29 17 27 28 19 27"
                      stroke="rgba(100,60,200,0.82)" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
      
                  
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.1s', '--rot': '4deg', '--ox': '-135px', '--oy': '35px', top: '38%', right: '1%', width: '78px', height: '52px' })}
                    viewBox="0 0 78 52" fill="none">
                    <circle cx="39" cy="26" r="16" stroke="rgba(100,60,200,0.9)" strokeWidth="2.4" />
                    <path d="M6 14 Q39 34 72 14" stroke="rgba(100,60,200,0.78)" strokeWidth="2.3" strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.15s', '--rot': '13deg', '--ox': '-125px', '--oy': '0px', top: '53%', right: '1%', width: '56px', height: '56px' })}
                    viewBox="0 0 56 56" fill="none">
                    <path
                      d="M28 28 C22 28 18 22 22 18 C26 14 34 18 34 26 C34 36 24 42 16 36 C8 30 12 16 22 12 C34 6 46 14 46 28 C46 42 34 50 22 46"
                      stroke="rgba(100,60,200,0.84)" strokeWidth="2.3" strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.13s', '--rot': '-16deg', '--ox': '-105px', '--oy': '-65px', bottom: '30%', right: '11%', width: '36px', height: '34px' })}
                    viewBox="0 0 36 34" fill="none">
                    <path
                      d="M18 30 C18 30 2 20 2 11 C2 6.5 5.8 3 10 3 C12.8 3 15 4.8 18 7.5 C21 4.8 23.2 3 26 3 C30.2 3 34 6.5 34 11 C34 20 18 30 18 30Z"
                      stroke="rgba(100,60,200,0.92)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.17s', '--rot': '-4deg', '--ox': '-88px', '--oy': '-115px', bottom: '13%', right: '7%', width: '62px', height: '66px' })}
                    viewBox="0 0 62 66" fill="none">
                    <path d="M31 62 L31 30" stroke="rgba(100,60,200,0.76)" strokeWidth="2.1" strokeLinecap="round" />
                    <path d="M31 46 C24 40 14 42 14 50 C14 54 24 54 31 46Z" stroke="rgba(100,60,200,0.84)" strokeWidth="2.1"
                      strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M31 36 C38 30 48 32 48 40 C48 44 38 44 31 36Z" stroke="rgba(100,60,200,0.84)" strokeWidth="2.1"
                      strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M31 30 C31 22 38 17 41 23" stroke="rgba(100,60,200,0.64)" strokeWidth="1.9"
                      strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.2s', '--rot': '-18deg', '--ox': '-78px', '--oy': '-162px', bottom: '5%', right: '2%', width: '66px', height: '56px' })}
                    viewBox="0 0 66 56" fill="none">
                    <path d="M4 30 L62 4 L46 52 L32 36 Z" stroke="rgba(100,60,200,0.92)" strokeWidth="2.4"
                      strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M32 36 L36 26" stroke="rgba(100,60,200,0.7)" strokeWidth="2.1" strokeLinecap="round" />
                  </svg>
      
                  
                  <svg className="doodle"
                    style={cssVars({ '--delay': '0.19s', '--rot': '20deg', '--ox': '-52px', '--oy': '-162px', bottom: '3%', right: '15%', width: '42px', height: '42px' })}
                    viewBox="0 0 42 42" fill="none">
                    <path d="M21 8 C33 8 37 20 31 28 C25 36 11 34 9 24 C7 14 17 6 23 13 C29 20 27 30 19 29"
                      stroke="rgba(100,60,200,0.82)" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
      
                </div>
              </div>
      
              
              <div className="hero-side hero-side-right">
                <p className="hero-side-phrase"><span className="line1">Crafting Digital</span><span className="accent">Experiences</span>
                </p>
                <p className="hero-side-phrase"><span className="line1">Building Creative</span><span className="accent">Interfaces</span>
                </p>
                <div className="hero-arcs">
                  <svg width="68" height="52" viewBox="0 0 68 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 44 Q44 52 28 44" stroke="rgba(100,190,255,0.8)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                    <path d="M54 32 Q38 42 20 32" stroke="rgba(100,190,255,0.6)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                    <path d="M48 20 Q32 32 12 20" stroke="rgba(100,190,255,0.4)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                  </svg>
                </div>
              </div>
      
            </div>
      
            
            <div className="hero-mobile-texts">
              <div className="hero-mobile-col hero-mobile-col-left">
                <p className="hero-side-phrase"><span className="line1">Crafting Digital</span><span className="accent">Experiences</span>
                </p>
                <p className="hero-side-phrase"><span className="line1">Building Creative</span><span className="accent">Interfaces</span>
                </p>
                <div className="hero-arcs">
                  <svg width="60" height="46" viewBox="0 0 68 52" fill="none">
                    <path d="M60 44 Q44 52 28 44" stroke="rgba(100,190,255,0.8)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                    <path d="M54 32 Q38 42 20 32" stroke="rgba(100,190,255,0.6)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                    <path d="M48 20 Q32 32 12 20" stroke="rgba(100,190,255,0.4)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                  </svg>
                </div>
              </div>
              <div className="hero-mobile-col hero-mobile-col-right">
                <p className="hero-side-phrase"><span className="line1">Turning Ideas</span><span className="accent">Into Reality</span>
                </p>
                <p className="hero-side-phrase"><span className="line1">Designing for</span><span className="accent">Better UX</span></p>
                <div className="hero-arcs" style={{ transform: 'scaleX(-1)' }}>
                  <svg width="60" height="46" viewBox="0 0 68 52" fill="none">
                    <path d="M60 44 Q44 52 28 44" stroke="rgba(100,190,255,0.8)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                    <path d="M54 32 Q38 42 20 32" stroke="rgba(100,190,255,0.6)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                    <path d="M48 20 Q32 32 12 20" stroke="rgba(100,190,255,0.4)" strokeWidth="2.2" strokeLinecap="round"
                      fill="none" />
                  </svg>
                </div>
              </div>
            </div>
      
            
            <div className="hero-intro-ctas">
              <button type="button" className="hero-cta-primary" onClick={() => setIsCvModalOpen(true)}>
                Download CV
                <svg viewBox="0 0 24 24">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
              <Link href="/projects" className="hero-cta-ghost">View My Work</Link>
            </div>
      
            
            {isMounted && createPortal(
            <div
              id="cv-modal-overlay"
              className={isCvModalOpen ? 'active' : undefined}
              aria-hidden={!isCvModalOpen}
              onClick={(event) => {
                if (event.target === event.currentTarget) setIsCvModalOpen(false);
              }}
            >
              <div className="cv-modal-wrapper">
      
                <div className="cv-modal-box" role="dialog" aria-modal="true" aria-labelledby="cv-modal-title">
      
      
                  
      
                  
                  <button id="cv-close-btn" className={`cv-modal-close ${isCvModalOpen ? 'visible' : ''}`} aria-label="Close" onClick={() => setIsCvModalOpen(false)}>✕</button>
      
                  
                  <div className="cv-modal-glow"></div>
      
                  
                  <div className="cv-modal-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor"
                        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                        strokeLinejoin="round" />
                      <line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <polyline points="9 15 12 18 15 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                  </div>
      
                  
                  <h2 className="cv-modal-title" id="cv-modal-title">Ruchira Edirisinghe</h2>
                  <p className="cv-modal-subtitle">Curriculum Vitae</p>
      
                  
                  <div className="cv-modal-divider"></div>
      
                  
                  <p className="cv-modal-body">
                    You’re about to access <span className="cv-modal-name">Ruchira Edirisinghe</span>'s CV.<br />
                    Choose how you’d like to continue.
                  </p>
      
                  
                  <div className="cv-modal-actions">
                    <a href="/docs/ruchiraedirisinghe-cv.pdf" download="Ruchira_Edirisinghe_CV.pdf" onClick={() => setIsCvModalOpen(false)}
                      className="cv-btn cv-btn-primary">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.7"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                          strokeLinejoin="round" />
                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="1.7"
                          strokeLinecap="round" />
                      </svg>
                      Download CV
                    </a>
                    <a href="https://drive.google.com/file/d/1VOlUmLOLnbNnXnkU8TE6Y9E5qZbVBvOY/view?usp=sharing" onClick={() => setIsCvModalOpen(false)}
                      target="_blank" rel="noopener noreferrer" className="cv-btn cv-btn-ghost">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.7"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                      </svg>
                      View via Google Drive
                    </a>
                  </div>
      
                </div>
              </div>
            </div>,
            document.body
            )}

          </div>
          <div className="logo-ticker-wrap">
            <div className="logo-ticker-inner" id="logo-ticker-inner">
              
              <div className="ticker-set" id="ticker-set-a">
                <img className="ticker-logo" src="/Images/logobar/zen-creatives.webp" alt="Zen Creatives" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/eleetra.webp" alt="Eleetra" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/livecode.webp" alt="LiveCode" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/runtime-terror.webp" alt="Runtime Terror" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/sl-cyber-designs.webp" alt="SL Cyber Designs" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/takg-solutions.webp" alt="TAKG Solutions" decoding="async" />
                <img className="ticker-logo" src="/Images/logobar/wrc.webp" alt="WRC" decoding="async" />
              </div>

              <div className="ticker-set" aria-hidden="true">
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
      
          <div className="about-grid">
      
            
            <section className="bio-section" aria-label="About Me">
              <canvas id="bio-canvas"></canvas>
      
              <div className="bio-body">
      
                
                <h2 className="bio-greeting-line">
                  Hi 👋, I'm <span className="bio-name-underline">Ruchira Edirisinghe</span>
                </h2>
      
                <p className="bio-para" style={cssVars({ '--para-delay': '0.1s' })}>
                  I'm a UI/UX engineer and game developer, and I've spent the last four years or so working in the space
                  where design and code meet. Most of my days are split between designing interfaces, building them on the
                  front end and making games, so I get to follow an idea all the way from a rough sketch to something people
                  can actually click, play and enjoy. I care a lot about things looking good, but I care just as much about
                  them working properly and feeling fun to use.
                </p>
      
                <p className="bio-para" style={cssVars({ '--para-delay': '0.22s' })}>
                  When I start a project, I try to put myself in the shoes of the people who'll be using it. What are they
                  trying to get done, and what's getting in their way? Once I understand that, the design decisions tend to
                  make themselves. Because I also build what I design, I can take a layout from Figma and turn it into a fast,
                  working site or app, and set up the hosting so it stays that way once it's live.
                </p>
      
                <p className="bio-para" style={cssVars({ '--para-delay': '0.34s' })}>
                  I'm always curious about how people use technology, so I keep reading and experimenting with what's new in
                  game development, accessibility and interactive design. Whether I'm putting together a browser game,
                  working alongside developers and designers on a team, or taking a project from the first idea through to
                  launch, I try to keep the code clean, the process efficient and the end result focused on the people using it.
                </p>
      
              </div>
            </section>
      
            <div className="about-content">
      
              
              <div className="about-block">
                <div className="block-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M9 9h.01M15 9h.01M9 15h6" />
                  </svg>
                </div>
                <div className="block-header">
                  <div className="block-header-left">
                    <p className="block-label">Design &amp; Strategy</p>
                    <h2 className="block-title"
                      style={{ fontFamily: "'Squada One', sans-serif", fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0px' }}>
                      <span style={{ whiteSpace: 'nowrap' }}>UI UX Engineering</span><br />
                      &amp; UX Consulting
                    </h2>
                  </div>
                </div>
                <div className="block-bottom">
                  <p className="block-text">I handle the whole design process, starting with research and wireframes and
                    working through to polished interfaces and clickable prototypes you can test with real users. I also work
                    with startups and businesses as a consultant, helping them figure out what their product needs and how to
                    make it easy and enjoyable to use.</p>
                </div>
              </div>
      
              
              <div className="about-block">
                <div className="block-icon">
                  <svg viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div className="block-header">
                  <div className="block-header-left">
                    <p className="block-label">Development</p>
                    <h2 className="block-title"
                      style={{ fontFamily: "'Squada One', sans-serif", fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0px' }}>
                      <span style={{ whiteSpace: 'nowrap' }}>Vibe Coding and</span><br />
                      <span style={{ whiteSpace: 'nowrap' }}>Web Development</span>
                    </h2>
                  </div>
                </div>
                <div className="block-bottom">
                  <p className="block-text">I build front ends with HTML, CSS, JavaScript and React, and lately a lot of my
                    work is done through vibe coding, where I plan the architecture and guide AI tools to write the code with
                    me. Because I come from a design background, I pay close attention to the small things like spacing,
                    animation and how a page feels when you scroll through it.</p>
                </div>
              </div>
      
              
              <div className="about-block">
                <div className="block-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="4" />
                    <path d="M6 12h4M8 10v4" />
                    <path d="M15 11h.01M18 13h.01" />
                  </svg>
                </div>
                <div className="block-header">
                  <div className="block-header-left">
                    <p className="block-label">Games &amp; Visual Arts</p>
                    <h2 className="block-title"
                      style={{ fontFamily: "'Squada One', sans-serif", fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0px' }}>
                      <span style={{ whiteSpace: 'nowrap' }}>GAME DEVELOPMENT</span><br />
                      &amp; GRAPHIC DESIGNING
                    </h2>
                  </div>
                </div>
                <div className="block-bottom">
                  <p className="block-text">I make games, ranging from browser games built with three.js to projects in
                    Unity, and I usually work on the mechanics, the game feel and the artwork myself. On the graphic design
                    side, I create logos, brand identities, posters and artwork, and I enjoy giving each piece its own story
                    and personality.</p>
                </div>
              </div>
      
            </div>
          </div>
      
      
          <section className="ufo-stats-section" aria-label="Professional Achievements">
            <div className="ufo-visual-wrapper">
      
              
              <svg className="ufo-beam-svg" viewBox="0 0 860 780" xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMin meet">
                <defs>
                  <linearGradient id="ufoBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(0,220,255,0.75)" />
                    <stop offset="35%" stopColor="rgba(0,195,255,0.32)" />
                    <stop offset="100%" stopColor="rgba(0,160,255,0.0)" />
                  </linearGradient>
                  
                  <linearGradient id="bmFade" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="72%" stopColor="white" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <mask id="bmMask">
                    <rect x="0" y="130" width="860" height="650" fill="url(#bmFade)" />
                  </mask>
      
                  <filter id="pGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
      
                
                <g mask="url(#bmMask)">
                  <polygon points="430,130 110,780 750,780" fill="url(#ufoBeamGrad)" />
                </g>
      
      
                
                <circle cx="429" cy="600" r="2.0" fill="rgba(140,240,255,0.92)" filter="url(#pGlow)">
                  <animate attributeName="cy" values="780;138" dur="4.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.92;0" dur="4.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="435" cy="400" r="1.5" fill="rgba(210,170,255,0.82)">
                  <animate attributeName="cy" values="780;145" dur="5.2s" begin="1.1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.82;0" dur="5.2s" begin="1.1s" repeatCount="indefinite" />
                </circle>
                <circle cx="422" cy="250" r="1.8" fill="rgba(100,240,255,0.9)" filter="url(#pGlow)">
                  <animate attributeName="cy" values="780;135" dur="3.6s" begin="2.3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.9;0" dur="3.6s" begin="2.3s" repeatCount="indefinite" />
                </circle>
                <circle cx="438" cy="510" r="1.3" fill="rgba(170,215,255,0.72)">
                  <animate attributeName="cy" values="780;150" dur="5.9s" begin="0.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.72;0" dur="5.9s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="420" cy="340" r="1.6" fill="rgba(130,235,255,0.85)" filter="url(#pGlow)">
                  <animate attributeName="cy" values="780;140" dur="4.9s" begin="3.1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.85;0" dur="4.9s" begin="3.1s" repeatCount="indefinite" />
                </circle>
              </svg>
      
              
              <div className="ufo-beam-area">
                <img src="/Images/graphic assets/ufoo.webp" className="ufo-png" alt="UFO Stats Interface" decoding="async" />
              </div>
      
              
              <div className="ufo-mid-glow" aria-hidden="true"></div>
      
              
              <div className="ufo-stats-row">
      
                
                <div className="ufo-pillar pillar-left" style={cssVars({ '--pillar-delay': '0.05s' })}>
                  <div className="pillar-float">
                    <div className="pillar-num-row">
                      <span className="pillar-number" data-target="50">0</span>
                      <span className="pillar-plus">+</span>
                    </div>
                    <p className="pillar-label">Projects<br />Completed</p>
                  </div>
                  <br />
                  <div className="pillar-base">
                    <div className="pillar-pedestal">
                      
                      <svg className="pillar-viz" viewBox="0 0 240 185" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="scrFace" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(10,25,45,0.95)" />
                            <stop offset="100%" stopColor="rgba(5,15,35,0.98)" />
                          </linearGradient>
                          <linearGradient id="lidTop" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(40,80,140,0.7)" />
                            <stop offset="100%" stopColor="rgba(20,50,100,0.85)" />
                          </linearGradient>
                          <linearGradient id="lidLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(30,65,120,0.6)" />
                            <stop offset="100%" stopColor="rgba(15,40,85,0.8)" />
                          </linearGradient>
                          <linearGradient id="baseTop" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(50,100,180,0.55)" />
                            <stop offset="100%" stopColor="rgba(25,60,130,0.65)" />
                          </linearGradient>
                          <linearGradient id="baseSide" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(25,60,120,0.7)" />
                            <stop offset="100%" stopColor="rgba(10,30,70,0.85)" />
                          </linearGradient>
                          <linearGradient id="baseRight" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(15,40,90,0.75)" />
                            <stop offset="100%" stopColor="rgba(6,20,55,0.9)" />
                          </linearGradient>
                          <radialGradient id="scrGlow" cx="50%" cy="50%" r="55%">
                            <stop offset="0%" stopColor="rgba(80,210,255,0.18)" />
                            <stop offset="100%" stopColor="rgba(80,210,255,0)" />
                          </radialGradient>
                          <linearGradient id="progG1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(80,210,255,0.9)" />
                            <stop offset="100%" stopColor="rgba(60,240,255,0.5)" />
                          </linearGradient>
                          <filter id="gfLap" x="-40%" y="-40%" width="180%" height="180%">
                            <feGaussianBlur stdDeviation="4" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                          <filter id="gfLapSm" x="-80%" y="-80%" width="260%" height="260%">
                            <feGaussianBlur stdDeviation="2" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
      
                        
                        <polygon points="66,8 174,8 190,28 50,28" fill="url(#lidTop)" stroke="rgba(80,150,255,0.45)"
                          strokeWidth="1" />
                        <polygon points="50,28 66,8 66,13 50,33" fill="url(#lidLeft)" stroke="rgba(60,120,220,0.35)"
                          strokeWidth="0.8" />
                        <polygon points="66,13 174,13 190,33 50,33" fill="url(#scrFace)" stroke="rgba(80,180,255,0.55)"
                          strokeWidth="1.2" />
                        <polygon points="66,13 174,13 190,33 50,33" fill="url(#scrGlow)" />
      
                        
                        <circle cx="76" cy="19" r="4" fill="rgba(80,210,255,0.12)" stroke="rgba(80,210,255,0.55)"
                          strokeWidth="1" />
                        <polyline points="73.5,19 75.5,21.2 79.5,16.5" stroke="rgba(80,230,255,1)" strokeWidth="1.3"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="84" y="17" width="60" height="3.5" rx="1.5" fill="rgba(80,210,255,0.55)" />
                        <circle cx="76" cy="26" r="4" fill="rgba(80,210,255,0.12)" stroke="rgba(80,210,255,0.55)"
                          strokeWidth="1" />
                        <polyline points="73.5,26 75.5,28.2 79.5,23.5" stroke="rgba(80,230,255,1)" strokeWidth="1.3"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="84" y="24" width="52" height="3.5" rx="1.5" fill="rgba(80,210,255,0.45)" />
                        <circle cx="76" cy="33" r="4" fill="rgba(80,210,255,0.06)" stroke="rgba(80,210,255,0.28)"
                          strokeWidth="1" strokeDasharray="2.5 1.5" />
                        <rect x="84" y="31" width="60" height="3.5" rx="1.5" fill="rgba(255,255,255,0.06)" />
                        <rect x="84" y="31" width="34" height="3.5" rx="1.5" fill="url(#progG1)">
                          <animate attributeName="width" values="0;34;34" dur="2.5s" begin="0.5s" repeatCount="indefinite"
                            calcMode="spline" keySplines="0.4 0 0.2 1;0 0 0 0" />
                        </rect>
      
                        
                        <line x1="50" y1="33" x2="190" y2="33" stroke="rgba(60,130,220,0.5)" strokeWidth="1" />
      
                        
                        <polygon points="38,33 202,33 218,55 22,55" fill="url(#baseTop)" stroke="rgba(70,140,240,0.4)"
                          strokeWidth="1" />
                        <polygon points="22,55 38,33 38,38 22,60" fill="url(#baseSide)" stroke="rgba(50,110,200,0.3)"
                          strokeWidth="0.8" />
                        <polygon points="202,33 218,55 218,60 202,38" fill="url(#baseRight)" stroke="rgba(40,90,170,0.3)"
                          strokeWidth="0.8" />
                        <polygon points="22,60 218,60 218,65 22,65" fill="rgba(20,50,110,0.65)" stroke="rgba(40,90,180,0.25)"
                          strokeWidth="0.5" />
                        <rect x="40" y="38" width="158" height="3" rx="1.2" fill="rgba(100,170,255,0.12)" />
                        <rect x="44" y="43" width="148" height="3" rx="1.2" fill="rgba(100,170,255,0.10)" />
                        <rect x="50" y="48" width="132" height="3" rx="1.2" fill="rgba(100,170,255,0.08)" />
                        <rect x="90" y="49" width="58" height="7" rx="2.5" fill="rgba(100,160,255,0.1)"
                          stroke="rgba(100,160,255,0.2)" strokeWidth="0.6" />
                        <line x1="66" y1="13" x2="174" y2="13" stroke="rgba(120,220,255,0.6)" strokeWidth="0.8" />
                        <line x1="66" y1="8" x2="174" y2="8" stroke="rgba(140,200,255,0.4)" strokeWidth="0.6" />
                        <circle cx="120" cy="34" r="1.8" fill="rgba(80,230,255,0.9)" filter="url(#gfLapSm)">
                          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                        </circle>
      
                        
                        
                        <rect x="20" y="78" width="28" height="36" rx="3" fill="rgba(30,60,130,0.55)"
                          stroke="rgba(80,150,255,0.3)" strokeWidth="0.8" />
                        <rect x="23" y="82" width="18" height="2.5" rx="1" fill="rgba(80,180,255,0.45)" />
                        <rect x="23" y="87" width="14" height="2.5" rx="1" fill="rgba(80,180,255,0.35)" />
                        <rect x="23" y="92" width="16" height="2.5" rx="1" fill="rgba(80,180,255,0.3)" />
                        <polyline points="23,100 26,103 32,97" stroke="rgba(80,230,255,0.9)" strokeWidth="1.4"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="41,78 41,84 47,84" stroke="rgba(80,150,255,0.4)" strokeWidth="0.8"
                          strokeLinecap="round" />
      
                        
                        <circle cx="200" cy="105" r="20" stroke="rgba(80,210,255,0.12)" strokeWidth="6" fill="none" />
                        <circle cx="200" cy="105" r="20" stroke="rgba(80,210,255,0.85)" strokeWidth="6" fill="none"
                          strokeDasharray="125.66 0" strokeLinecap="round" filter="url(#gfLapSm)" />
                        <circle cx="200" cy="90" r="10" fill="rgba(80,210,255,0.06)" stroke="rgba(80,210,255,0.2)"
                          strokeWidth="0.6" />
                        <text x="200" y="109" fontFamily="Montserrat,sans-serif" fontSize="8" fontWeight="800"
                          fill="rgba(120,230,255,0.9)" textAnchor="middle">100%</text>
      
                        
                        <rect x="42" y="140" width="50" height="10" rx="5" fill="rgba(80,210,255,0.15)"
                          stroke="rgba(80,210,255,0.35)" strokeWidth="0.8" />
                        <circle cx="51" cy="145" r="3" fill="rgba(80,230,255,0.85)" filter="url(#gfLapSm)" />
                        <rect x="57" y="143" width="28" height="3" rx="1.5" fill="rgba(80,210,255,0.55)" />
      
                        <rect x="100" y="140" width="50" height="10" rx="5" fill="rgba(80,210,255,0.12)"
                          stroke="rgba(80,210,255,0.3)" strokeWidth="0.8" />
                        <circle cx="109" cy="145" r="3" fill="rgba(80,230,255,0.75)" filter="url(#gfLapSm)" />
                        <rect x="115" y="143" width="28" height="3" rx="1.5" fill="rgba(80,210,255,0.45)" />
      
                        <rect x="158" y="140" width="40" height="10" rx="5" fill="rgba(80,210,255,0.10)"
                          stroke="rgba(80,210,255,0.25)" strokeWidth="0.8" />
                        <circle cx="167" cy="145" r="3" fill="rgba(80,230,255,0.65)" />
                        <rect x="173" y="143" width="20" height="3" rx="1.5" fill="rgba(80,210,255,0.35)" />
                      </svg>
                    </div>
                    <div className="pillar-ground-glow"></div>
                  </div>
                </div>
      
                
                <div className="ufo-pillar pillar-mid" style={cssVars({ '--pillar-delay': '0.18s' })}>
                  <div className="pillar-float">
                    <div className="pillar-num-row">
                      <span className="pillar-number" data-target="4">0</span>
                      <span className="pillar-plus">+</span>
                    </div>
                    <p className="pillar-label">Years of<br />Experience</p>
                  </div>
                  <div className="pillar-base">
                    <div className="pillar-pedestal">
                      
                      
                      <svg className="pillar-viz" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          
                          <linearGradient id="calFace" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(20,8,48,0.97)" />
                            <stop offset="100%" stopColor="rgba(35,10,70,0.99)" />
                          </linearGradient>
                          
                          <linearGradient id="calHead" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(140,60,255,0.9)" />
                            <stop offset="100%" stopColor="rgba(200,120,255,0.8)" />
                          </linearGradient>
                          
                          <linearGradient id="calLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(90,30,180,0.75)" />
                            <stop offset="100%" stopColor="rgba(50,15,110,0.9)" />
                          </linearGradient>
                          
                          <linearGradient id="calTop" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(160,90,255,0.55)" />
                            <stop offset="100%" stopColor="rgba(100,40,200,0.7)" />
                          </linearGradient>
                          
                          <linearGradient id="calBot" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(60,20,130,0.7)" />
                            <stop offset="100%" stopColor="rgba(30,8,80,0.85)" />
                          </linearGradient>
                          <filter id="gfCal" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4.5" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                          <filter id="gfCalSm" x="-80%" y="-80%" width="260%" height="260%">
                            <feGaussianBlur stdDeviation="2.2" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                          <radialGradient id="calGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(180,100,255,0.22)" />
                            <stop offset="100%" stopColor="rgba(180,100,255,0)" />
                          </radialGradient>
                        </defs>
      
                        
                        <polygon points="55,42 185,42 200,58 40,58" fill="url(#calTop)" stroke="rgba(180,110,255,0.5)"
                          strokeWidth="1" />
      
                        
                        <rect x="40" y="58" width="160" height="106" rx="4" ry="4" fill="url(#calFace)"
                          stroke="rgba(160,80,255,0.55)" strokeWidth="1.2" />
      
      
                        
                        <rect x="40" y="58" width="160" height="26" rx="4" ry="4" fill="url(#calHead)" />
                        
                        <rect x="40" y="72" width="160" height="12" fill="url(#calHead)" />
                        
                        <text x="120" y="76" fontFamily="Montserrat,sans-serif" fontSize="8.5" fontWeight="800"
                          fill="rgba(255,255,255,0.95)" textAnchor="middle" letterSpacing="0.18em">EXPERIENCE</text>
      
                        
                        
                        <text x="62" y="101" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="700"
                          fill="rgba(200,140,255,0.55)" letterSpacing="0.1em">YEAR 01</text>
                        <circle cx="108" cy="98" r="2" fill="rgba(180,100,255,0.75)" filter="url(#gfCalSm)" />
                        <circle cx="116" cy="98" r="2" fill="rgba(180,100,255,0.72)" filter="url(#gfCalSm)" />
                        <circle cx="124" cy="98" r="2" fill="rgba(180,100,255,0.68)" />
                        <circle cx="132" cy="98" r="2" fill="rgba(180,100,255,0.64)" />
                        <circle cx="140" cy="98" r="2" fill="rgba(180,100,255,0.60)" />
                        <circle cx="148" cy="98" r="2" fill="rgba(180,100,255,0.56)" />
                        <circle cx="156" cy="98" r="2" fill="rgba(180,100,255,0.52)" />
                        <circle cx="164" cy="98" r="2" fill="rgba(180,100,255,0.45)" />
                        <circle cx="172" cy="98" r="2" fill="rgba(180,100,255,0.38)" />
      
                        
                        <rect x="55" y="107" width="130" height="1" rx="0.5" fill="rgba(190,110,255,0.15)" />
                        <text x="62" y="119" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="700"
                          fill="rgba(200,140,255,0.55)" letterSpacing="0.1em">YEAR 02</text>
                        <circle cx="108" cy="116" r="2" fill="rgba(200,120,255,0.78)" filter="url(#gfCalSm)" />
                        <circle cx="116" cy="116" r="2" fill="rgba(200,120,255,0.74)" filter="url(#gfCalSm)" />
                        <circle cx="124" cy="116" r="2" fill="rgba(200,120,255,0.70)" />
                        <circle cx="132" cy="116" r="2" fill="rgba(200,120,255,0.65)" />
                        <circle cx="140" cy="116" r="2" fill="rgba(200,120,255,0.60)" />
                        <circle cx="148" cy="116" r="2" fill="rgba(200,120,255,0.55)" />
                        <circle cx="156" cy="116" r="2" fill="rgba(200,120,255,0.50)" />
                        <circle cx="164" cy="116" r="2" fill="rgba(200,120,255,0.44)" />
                        <circle cx="172" cy="116" r="2" fill="rgba(200,120,255,0.36)" />
      
                        
                        <rect x="55" y="125" width="130" height="1" rx="0.5" fill="rgba(210,140,255,0.18)" />
                        <text x="62" y="137" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="700"
                          fill="rgba(220,170,255,0.75)" letterSpacing="0.1em">YEAR 03</text>
                        <circle cx="108" cy="134" r="2.2" fill="rgba(220,160,255,0.95)" filter="url(#gfCalSm)" />
                        <circle cx="116" cy="134" r="2.2" fill="rgba(220,160,255,0.92)" filter="url(#gfCalSm)" />
                        <circle cx="124" cy="134" r="2.2" fill="rgba(220,160,255,0.88)" filter="url(#gfCalSm)" />
                        <circle cx="132" cy="134" r="2.2" fill="rgba(220,160,255,0.83)" />
                        <circle cx="140" cy="134" r="2.2" fill="rgba(220,160,255,0.78)" />
                        <circle cx="148" cy="134" r="2.2" fill="rgba(220,160,255,0.72)" />
                        <circle cx="156" cy="134" r="2.2" fill="rgba(220,160,255,0.65)" />
                        <circle cx="164" cy="134" r="2.2" fill="rgba(220,160,255,0.56)" />
                        <circle cx="172" cy="134" r="2.2" fill="rgba(220,160,255,0.46)" />
      
                        
                        <rect x="55" y="143" width="130" height="1" rx="0.5" fill="rgba(230,180,255,0.25)" />
                        <text x="62" y="155" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="700"
                          fill="rgba(240,200,255,0.90)" letterSpacing="0.1em">YEAR 04</text>
                        <circle cx="108" cy="152" r="2.5" fill="rgba(240,200,255,1)" filter="url(#gfCalSm)" />
                        <circle cx="116" cy="152" r="2.5" fill="rgba(240,200,255,1)" filter="url(#gfCalSm)" />
                        <circle cx="124" cy="152" r="2.5" fill="rgba(240,200,255,0.95)" filter="url(#gfCalSm)" />
                        <circle cx="132" cy="152" r="2.5" fill="rgba(240,200,255,0.88)" />
                        <circle cx="140" cy="152" r="2.5" fill="rgba(240,200,255,0.78)" />
                        
                        <circle cx="148" cy="152" r="2.5" fill="rgba(240,200,255,0.70)">
                          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
                          <animate attributeName="r" values="2.5;3.8;2.5" dur="1.4s" repeatCount="indefinite" />
                        </circle>
      
                        
                        <circle cx="95" cy="58" r="5" fill="rgba(15,5,40,0.9)" stroke="rgba(180,110,255,0.65)"
                          strokeWidth="1.2" />
                        <circle cx="145" cy="58" r="5" fill="rgba(15,5,40,0.9)" stroke="rgba(180,110,255,0.65)"
                          strokeWidth="1.2" />
      
                        
                        <line x1="40" y1="62" x2="40" y2="164" stroke="rgba(140,70,240,0.4)" strokeWidth="0.6" />
      
                      </svg>
                    </div>
                    <div className="pillar-ground-glow"></div>
                  </div>
                </div>
      
                
                <div className="ufo-pillar pillar-right" style={cssVars({ '--pillar-delay': '0.32s' })}>
                  <div className="pillar-float">
                    <div className="pillar-num-row">
                      <span className="pillar-number" data-target="30">0</span>
                      <span className="pillar-plus">+</span>
                    </div>
                    <p className="pillar-label">Happy<br />Customers</p>
                  </div>
                  <div className="pillar-base">
                    <div className="pillar-pedestal">
                      
                      
                      <svg className="pillar-viz" viewBox="0 10 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          
                          <linearGradient id="cupBody" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(80,255,140,0.25)" />
                            <stop offset="100%" stopColor="rgba(40,180,90,0.12)" />
                          </linearGradient>
                          
                          <linearGradient id="cupLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(60,220,110,0.3)" />
                            <stop offset="100%" stopColor="rgba(20,120,60,0.5)" />
                          </linearGradient>
                          
                          <linearGradient id="stemFace" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(60,200,100,0.4)" />
                            <stop offset="100%" stopColor="rgba(20,110,55,0.6)" />
                          </linearGradient>
                          
                          <linearGradient id="baseTG" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(70,220,120,0.5)" />
                            <stop offset="100%" stopColor="rgba(30,140,70,0.65)" />
                          </linearGradient>
                          
                          <linearGradient id="baseFG" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(30,160,75,0.55)" />
                            <stop offset="100%" stopColor="rgba(10,80,40,0.75)" />
                          </linearGradient>
                          
                          <radialGradient id="starGlw" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(100,255,150,1)" />
                            <stop offset="60%" stopColor="rgba(80,255,130,0.55)" />
                            <stop offset="100%" stopColor="rgba(80,255,130,0)" />
                          </radialGradient>
                          <filter id="gfTroph" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="5" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                          <filter id="gfTrSm" x="-80%" y="-80%" width="260%" height="260%">
                            <feGaussianBlur stdDeviation="2.5" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
      
      
                        
                        
                        <polygon points="82,138 158,138 168,148 72,148" fill="url(#baseTG)" stroke="rgba(80,220,110,0.45)"
                          strokeWidth="1" />
                        
                        <rect x="72" y="148" width="96" height="14" rx="4" ry="4" fill="url(#baseFG)"
                          stroke="rgba(60,190,90,0.35)" strokeWidth="0.8" />
                        
                        <polygon points="72,148 82,138 82,152 72,162" fill="rgba(30,140,65,0.5)" stroke="rgba(50,170,80,0.3)"
                          strokeWidth="0.6" />
                        
                        <line x1="82" y1="138" x2="158" y2="138" stroke="rgba(130,255,170,0.5)" strokeWidth="0.8" />
      
                        
                        
                        <rect x="108" y="110" width="24" height="28" rx="3" ry="3" fill="url(#stemFace)"
                          stroke="rgba(70,210,100,0.4)" strokeWidth="0.8" />
                        
                        <polygon points="103,115 108,110 108,138 103,143" fill="rgba(40,160,75,0.45)"
                          stroke="rgba(50,180,85,0.3)" strokeWidth="0.6" />
                        
                        <polygon points="103,115 108,110 132,110 137,115" fill="rgba(90,230,130,0.4)"
                          stroke="rgba(90,220,120,0.4)" strokeWidth="0.6" />
      
                        
                        
                        <path
                          d="M 80,57 L 160,57 Q 162,57 163,59 L 149,109 Q 148,111 146,111 L 94,111 Q 92,111 91,109 L 77,59 Q 76,57 78,57 Z"
                          fill="url(#cupBody)" stroke="rgba(80,230,120,0.55)" strokeWidth="1.2" />
                        
                        <polygon points="73,63 78,57 92,110 85,115" fill="url(#cupLeft)" stroke="rgba(60,200,100,0.4)"
                          strokeWidth="0.8" />
                        
                        <rect x="73" y="57" width="94" height="8" rx="4" ry="4" fill="rgba(100,240,150,0.3)"
                          stroke="rgba(100,240,150,0.5)" strokeWidth="0.8" />
      
                        
                        <line x1="78" y1="57" x2="162" y2="57" stroke="rgba(160,255,200,0.6)" strokeWidth="1" />
      
                        
                        <path d="M 78,67 C 52,67 46,83 52,97 C 56,107 72,110 85,110" stroke="rgba(80,220,120,0.65)"
                          strokeWidth="3.5" fill="none" strokeLinecap="round" />
                        
                        <path d="M 162,67 C 188,67 194,83 188,97 C 184,107 170,110 157,110" stroke="rgba(80,220,120,0.55)"
                          strokeWidth="3" fill="none" strokeLinecap="round" />
      
                        
                        <ellipse cx="120" cy="81" rx="32" ry="8" fill="rgba(10,60,25,0.4)" />
      
                        
                        
                        <polygon
                          points="120,20 123.5,30 134,30 125.5,36.5 128.5,47 120,41 111.5,47 114.5,36.5 106,30 116.5,30"
                          fill="rgba(80,255,140,0.9)" filter="url(#gfTrSm)" stroke="rgba(160,255,200,0.7)"
                          strokeWidth="0.5" />
                        
                        <polygon points="120,24 122.5,31 129,31 123.5,35 125.5,42 120,38.5 114.5,42 116.5,35 111,31 117.5,31"
                          fill="rgba(180,255,210,1)" />
                        
                        <circle cx="120" cy="34" r="16" fill="url(#starGlw)" filter="url(#gfTroph)">
                          <animate attributeName="r" values="14;20;14" dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite" />
                        </circle>
      
                        
                        <circle cx="78" cy="180" r="3.2" fill="rgba(80,255,140,0.9)" filter="url(#gfTrSm)" />
                        <circle cx="95" cy="180" r="3.2" fill="rgba(80,255,140,0.9)" filter="url(#gfTrSm)" />
                        <circle cx="120" cy="180" r="3.2" fill="rgba(80,255,140,0.9)" filter="url(#gfTrSm)" />
                        <circle cx="145" cy="180" r="3.2" fill="rgba(80,255,140,0.9)" filter="url(#gfTrSm)" />
                        <circle cx="162" cy="180" r="3.2" fill="rgba(80,255,140,0.9)" filter="url(#gfTrSm)" />
                        
                        <line x1="78" y1="180" x2="162" y2="180" stroke="rgba(80,255,140,0.25)" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="pillar-ground-glow"></div>
                  </div>
                </div>
      
              </div>
            </div>
          </section>
      
      
          
          <section className="techstack-section" aria-label="Tech Stack">
      
            <div className="techstack-heading">
              <p className="techstack-label">What I work with</p>
              <h2 className="techstack-title">My Tech Stack</h2>
            </div>
      
            <div className="para-container">
              <p className="bio-para" style={cssVars({ '--para-delay': '0.1s' })}>
                These are the tools I reach for most often. I've picked them up over the years because they let me work
                quickly without cutting corners on quality or looks. Alongside the usual design and development work, I've
                been getting better at prompt engineering and vibe coding, which I mostly use to build front-end interfaces
                and games. I still lean on good old development habits like planning the structure first, reviewing every
                change and testing properly, so the projects hold up well and are easy to grow later on.
              </p>
            </div>
      
            <div className="techstack-grid">
      
              
              <div className="stack-panel" style={cssVars({ '--panel-delay': '0.35s', '--panel-glow': 'rgba(180,100,255,0.12)', '--panel-border-hover': 'rgba(180,120,255,0.3)', '--panel-line': 'rgba(180,120,255,0.2)', '--panel-bloom': 'radial-gradient(ellipse,rgba(160,80,255,0.1) 0%,transparent 70%)', '--panel-icon-bg': 'rgba(160,80,255,0.1)', '--panel-icon-border': 'rgba(180,100,255,0.28)', '--panel-icon-color': 'rgba(200,150,255,0.92)', '--panel-accent': 'rgba(200,150,255,0.62)', '--panel-accent-solid': 'rgba(200,150,255,0.5)', '--panel-divider-start': 'rgba(180,100,255,0.26)', '--panel-line-color': 'rgba(180,100,255,0.12)' })}>
                <div className="stack-panel-header">
                  <div className="stack-icon-wrap">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 19l7-7 3 3-7 7-3-3z" />
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                      <path d="M2 2l7.586 7.586" />
                      <circle cx="11" cy="11" r="2" />
                    </svg>
                  </div>
                  <div className="stack-panel-meta">
                    <span className="stack-panel-eyebrow">Stack 01</span>
                    <span className="stack-panel-name">Designing</span>
                  </div>
                </div>
                <div className="stack-divider"></div>
      
                <div className="stack-nodes">
      
                  <div className="snode"
                    style={cssVars({ '--nd': '0.42s', '--float-dur': '4.1s', '--float-off': '0s', '--nd-bg': 'rgba(255,113,78,0.1)', '--nd-border': 'rgba(255,113,78,0.22)', '--nd-hover-bg': 'rgba(255,113,78,0.18)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 24 24" fill="none">
                        <rect x="8" y="2" width="8" height="6" rx="3" fill="#F24E1E" />
                        <rect x="8" y="9" width="8" height="6" rx="3" fill="#A259FF" />
                        <rect x="8" y="16" width="8" height="6" rx="3" fill="#0ACF83" />
                        <rect x="2" y="2" width="8" height="6" rx="3" fill="#FF7262" />
                        <circle cx="18" cy="12" r="3" fill="#1ABCFE" />
                      </svg></div>
                    <span className="snode-label">Figma</span>
                  </div>
      
                  <div className="snode"
                    style={cssVars({ '--nd': '0.50s', '--float-dur': '3.6s', '--float-off': '0.4s', '--nd-bg': 'rgba(49,168,255,0.08)', '--nd-border': 'rgba(49,168,255,0.2)', '--nd-hover-bg': 'rgba(49,168,255,0.15)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <rect x="2" y="2" width="24" height="24" rx="4" fill="#001E36" /><text x="4.5" y="20"
                          fontFamily="Arial" fontSize="13" fontWeight="800" fill="#31A8FF">Ps</text>
                      </svg></div>
                    <span className="snode-label">Photoshop</span>
                  </div>
      
                  <div className="snode"
                    style={cssVars({ '--nd': '0.58s', '--float-dur': '4.4s', '--float-off': '0.9s', '--nd-bg': 'rgba(255,154,0,0.08)', '--nd-border': 'rgba(255,154,0,0.2)', '--nd-hover-bg': 'rgba(255,154,0,0.15)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <rect x="2" y="2" width="24" height="24" rx="4" fill="#330000" /><text x="4" y="20"
                          fontFamily="Arial" fontSize="13" fontWeight="800" fill="#FF9A00">Ai</text>
                      </svg></div>
                    <span className="snode-label">Illustrator</span>
                  </div>
      
                  <div className="snode"
                    style={cssVars({ '--nd': '0.66s', '--float-dur': '3.9s', '--float-off': '1.3s', '--nd-bg': 'rgba(153,153,255,0.08)', '--nd-border': 'rgba(153,153,255,0.2)', '--nd-hover-bg': 'rgba(153,153,255,0.15)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <rect x="2" y="2" width="24" height="24" rx="4" fill="#00005B" /><text x="3.5" y="20"
                          fontFamily="Arial" fontSize="13" fontWeight="800" fill="#9999FF">Ae</text>
                      </svg></div>
                    <span className="snode-label">After Effects</span>
                  </div>
      
                  <div className="snode"
                    style={cssVars({ '--nd': '0.74s', '--float-dur': '4.7s', '--float-off': '0.6s', '--nd-bg': 'rgba(90,200,250,0.07)', '--nd-border': 'rgba(90,200,250,0.18)', '--nd-hover-bg': 'rgba(90,200,250,0.13)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="10" stroke="rgba(90,200,250,0.4)" strokeWidth="1.2" />
                        <path d="M9 16c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#5ac8fa" strokeWidth="1.8"
                          strokeLinecap="round" />
                        <circle cx="14" cy="10" r="2" fill="#5ac8fa" />
                      </svg></div>
                    <span className="snode-label">Spline</span>
                  </div>
      
                  <div className="snode"
                    style={cssVars({ '--nd': '0.82s', '--float-dur': '3.5s', '--float-off': '1.8s', '--nd-bg': 'rgba(0,85,255,0.08)', '--nd-border': 'rgba(0,85,255,0.22)', '--nd-hover-bg': 'rgba(0,85,255,0.15)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <path d="M7 4h14v7H14L7 4z" fill="#0055FF" opacity="0.9" />
                        <path d="M7 11h7l7 7H7v-7z" fill="#0055FF" opacity="0.6" />
                        <path d="M7 18h7l-7 7v-7z" fill="#0055FF" opacity="0.35" />
                      </svg></div>
                    <span className="snode-label">Framer</span>
                  </div>
      
                </div>
              </div>
      
              
              <div className="stack-panel" style={cssVars({ '--panel-delay': '0.48s', '--panel-glow': 'rgba(100,180,255,0.12)', '--panel-border-hover': 'rgba(100,180,255,0.3)', '--panel-line': 'rgba(100,180,255,0.2)', '--panel-bloom': 'radial-gradient(ellipse,rgba(80,160,255,0.1) 0%,transparent 70%)', '--panel-icon-bg': 'rgba(80,160,255,0.1)', '--panel-icon-border': 'rgba(100,180,255,0.28)', '--panel-icon-color': 'rgba(140,210,255,0.92)', '--panel-accent': 'rgba(140,210,255,0.62)', '--panel-accent-solid': 'rgba(140,210,255,0.5)', '--panel-divider-start': 'rgba(100,180,255,0.26)', '--panel-line-color': 'rgba(100,180,255,0.1)' })}>
                <div className="stack-panel-header">
                  <div className="stack-icon-wrap">
                    <svg viewBox="0 0 24 24">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div className="stack-panel-meta">
                    <span className="stack-panel-eyebrow">Stack 02</span>
                    <span className="stack-panel-name">Programming</span>
                  </div>
                </div>
                <div className="stack-divider"></div>
      
                <div className="stack-nodes">
      
                  <div className="snode"
                    style={cssVars({ '--nd': '0.55s', '--float-dur': '4.2s', '--float-off': '0s', '--nd-bg': 'rgba(49,120,198,0.09)', '--nd-border': 'rgba(49,120,198,0.24)', '--nd-hover-bg': 'rgba(49,120,198,0.18)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <rect x="2" y="2" width="24" height="24" rx="3" fill="#3178C6" /><text x="10" y="22"
                          fontFamily="Arial" fontSize="11" fontWeight="800" fill="#fff">TS</text>
                      </svg></div>
                    <span className="snode-label">TypeScript</span>
                  </div>

                  <div className="snode"
                    style={cssVars({ '--nd': '0.63s', '--float-dur': '3.7s', '--float-off': '0.5s', '--nd-bg': 'rgba(255,255,255,0.05)', '--nd-border': 'rgba(255,255,255,0.16)', '--nd-hover-bg': 'rgba(255,255,255,0.1)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="12" fill="#000" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
                        <path d="M10 19V9l9 11.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 9v6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                      </svg></div>
                    <span className="snode-label">Next.js</span>
                  </div>

                  <div className="snode"
                    style={cssVars({ '--nd': '0.71s', '--float-dur': '4.5s', '--float-off': '1.1s', '--nd-bg': 'rgba(255,255,255,0.05)', '--nd-border': 'rgba(255,255,255,0.16)', '--nd-hover-bg': 'rgba(255,255,255,0.1)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round">
                        <path d="M4 24L9 4l15 15z" />
                        <path d="M6.5 14L16.5 11.5 14 21.5z" />
                        <path d="M9 4l7.5 7.5M4 24l2.5-10M24 19l-10 2.5" />
                      </svg></div>
                    <span className="snode-label">Three.js</span>
                  </div>

                  <div className="snode"
                    style={cssVars({ '--nd': '0.79s', '--float-dur': '4s', '--float-off': '1.6s', '--nd-bg': 'rgba(255,255,255,0.05)', '--nd-border': 'rgba(255,255,255,0.16)', '--nd-hover-bg': 'rgba(255,255,255,0.1)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round">
                        <path d="M14 3l9.5 5.5v11L14 25l-9.5-5.5v-11z" />
                        <path d="M14 14l9.5-5.5M14 14v11M14 14L4.5 8.5" />
                      </svg></div>
                    <span className="snode-label">Unity</span>
                  </div>

                  <div className="snode"
                    style={cssVars({ '--nd': '0.87s', '--float-dur': '3.8s', '--float-off': '0.3s', '--nd-bg': 'rgba(155,79,150,0.1)', '--nd-border': 'rgba(155,79,150,0.26)', '--nd-hover-bg': 'rgba(155,79,150,0.18)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <path d="M14 2l10.4 6v12L14 26 3.6 20V8z" fill="#68217A" />
                        <text x="6.6" y="18.5" fontFamily="Arial" fontSize="10" fontWeight="800" fill="#fff">C#</text>
                      </svg></div>
                    <span className="snode-label">C#</span>
                  </div>

                  <div className="snode"
                    style={cssVars({ '--nd': '0.95s', '--float-dur': '4.3s', '--float-off': '1.0s', '--nd-bg': 'rgba(51,153,51,0.09)', '--nd-border': 'rgba(51,153,51,0.24)', '--nd-hover-bg': 'rgba(51,153,51,0.17)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <path d="M14 2l10.4 6v12L14 26 3.6 20V8z" fill="#339933" />
                        <text x="9.6" y="18.5" fontFamily="Arial" fontSize="11" fontWeight="800" fill="#fff">N</text>
                      </svg></div>
                    <span className="snode-label">Node.js</span>
                  </div>
      
                </div>
              </div>
      
              
              <div className="stack-panel" style={cssVars({ '--panel-delay': '0.61s', '--panel-glow': 'rgba(100,240,180,0.1)', '--panel-border-hover': 'rgba(80,220,160,0.3)', '--panel-line': 'rgba(80,220,160,0.2)', '--panel-bloom': 'radial-gradient(ellipse,rgba(60,200,140,0.1) 0%,transparent 70%)', '--panel-icon-bg': 'rgba(60,200,140,0.09)', '--panel-icon-border': 'rgba(80,220,160,0.26)', '--panel-icon-color': 'rgba(100,240,180,0.9)', '--panel-accent': 'rgba(100,240,180,0.62)', '--panel-accent-solid': 'rgba(100,240,180,0.45)', '--panel-divider-start': 'rgba(80,220,160,0.24)', '--panel-line-color': 'rgba(80,220,160,0.1)' })}>
                <div className="stack-panel-header">
                  <div className="stack-icon-wrap">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z" />
                      <path
                        d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z" />
                    </svg>
                  </div>
                  <div className="stack-panel-meta">
                    <span className="stack-panel-eyebrow">Stack 03</span>
                    <span className="stack-panel-name">AI Tools</span>
                  </div>
                </div>
                <div className="stack-divider"></div>
      
                <div className="stack-nodes">
      
                  
                  <div className="snode"
                    style={cssVars({ '--nd': '0.68s', '--float-dur': '4.3s', '--float-off': '0s', '--nd-bg': 'rgba(215,118,85,0.12)', '--nd-border': 'rgba(215,118,85,0.28)', '--nd-hover-bg': 'rgba(215,118,85,0.2)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 512 509.64" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#D77655"
                          d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z" />
                        <path fill="#FCF2EE" fillRule="nonzero"
                          d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z" />
                      </svg></div>
                    <span className="snode-label">Claude</span>
                  </div>
      
                  
                  <div className="snode"
                    style={cssVars({ '--nd': '0.76s', '--float-dur': '3.9s', '--float-off': '0.6s', '--nd-bg': 'rgba(16,163,127,0.1)', '--nd-border': 'rgba(16,163,127,0.25)', '--nd-hover-bg': 'rgba(16,163,127,0.18)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 512 509.639" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#10A37F"
                          d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.612C52.026 509.64 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z" />
                        <path fill="#fff" fillRule="nonzero"
                          d="M412.037 221.764a90.834 90.834 0 004.648-28.67 90.79 90.79 0 00-12.443-45.87c-16.37-28.496-46.738-46.089-79.605-46.089-6.466 0-12.943.683-19.264 2.04a90.765 90.765 0 00-67.881-30.515h-.576c-.059.002-.149.002-.216.002-39.807 0-75.108 25.686-87.346 63.554-25.626 5.239-47.748 21.31-60.682 44.03a91.873 91.873 0 00-12.407 46.077 91.833 91.833 0 0023.694 61.553 90.802 90.802 0 00-4.649 28.67 90.804 90.804 0 0012.442 45.87c16.369 28.504 46.74 46.087 79.61 46.087a91.81 91.81 0 0019.253-2.04 90.783 90.783 0 0067.887 30.516h.576l.234-.001c39.829 0 75.119-25.686 87.357-63.588 25.626-5.242 47.748-21.312 60.682-44.033a91.718 91.718 0 0012.383-46.035 91.83 91.83 0 00-23.693-61.553l-.004-.005z" />
                      </svg></div>
                    <span className="snode-label">ChatGPT</span>
                  </div>
      
                  
                  <div className="snode"
                    style={cssVars({ '--nd': '0.84s', '--float-dur': '4.6s', '--float-off': '1.2s', '--nd-bg': 'rgba(72,147,252,0.09)', '--nd-border': 'rgba(72,147,252,0.22)', '--nd-hover-bg': 'rgba(72,147,252,0.16)' })}>
                    <div className="snode-icon"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65">
                        <mask id="maskme_g4" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="65"
                          height="65">
                          <path
                            d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z"
                            fill="#000" />
                          <path
                            d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z"
                            fill="url(#gem_grad4)" />
                        </mask>
                        <g mask="url(#maskme_g4)">
                          <g filter="url(#gf0d)">
                            <path
                              d="M-5.859 50.734c7.498 2.663 16.116-2.33 19.249-11.152 3.133-8.821-.406-18.131-7.904-20.794-7.498-2.663-16.116 2.33-19.25 11.151-3.132 8.822.407 18.132 7.905 20.795z"
                              fill="#FFE432" />
                          </g>
                          <g filter="url(#gf1d)">
                            <path
                              d="M27.433 21.649c10.3 0 18.651-8.535 18.651-19.062 0-10.528-8.35-19.062-18.651-19.062S8.78-7.94 8.78 2.587c0 10.527 8.35 19.062 18.652 19.062z"
                              fill="#FC413D" />
                          </g>
                          <g filter="url(#gf2d)">
                            <path
                              d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z"
                              fill="#00B95C" />
                          </g>
                          <g filter="url(#gf3d)">
                            <path
                              d="M30.954 74.181c9.014-5.485 11.427-17.976 5.389-27.9-6.038-9.925-18.241-13.524-27.256-8.04-9.015 5.486-11.428 17.977-5.39 27.902 6.04 9.924 18.242 13.523 27.257 8.038z"
                              fill="#00B95C" />
                          </g>
                          <g filter="url(#gf4d)">
                            <path
                              d="M67.391 42.993c10.132 0 18.346-7.91 18.346-17.666 0-9.757-8.214-17.667-18.346-17.667s-18.346 7.91-18.346 17.667c0 9.757 8.214 17.666 18.346 17.666z"
                              fill="#3186FF" />
                          </g>
                          <g filter="url(#gf5d)">
                            <path
                              d="M34.74 51.43c11.135 7.656 25.896 5.524 32.968-4.764 7.073-10.287 3.779-24.832-7.357-32.488C49.215 6.52 34.455 8.654 27.382 18.94c-7.072 10.288-3.779 24.833 7.357 32.49z"
                              fill="#3186FF" />
                          </g>
                        </g>
                        <defs>
                          <filter id="gf0d" x="-19.824" y="13.152" width="39.274" height="43.217" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="2.46" result="effect1_foregroundBlur_2001_67" />
                          </filter>
                          <filter id="gf1d" x="-15.001" y="-40.257" width="84.868" height="85.688"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="11.891" result="effect1_foregroundBlur_2001_67" />
                          </filter>
                          <filter id="gf2d" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67" />
                          </filter>
                          <filter id="gf3d" x="-19.845" y="15.459" width="79.731" height="81.505" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67" />
                          </filter>
                          <filter id="gf4d" x="29.832" y="-11.552" width="75.117" height="73.758" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="9.606" result="effect1_foregroundBlur_2001_67" />
                          </filter>
                          <filter id="gf5d" x="8.107" y="-5.966" width="78.877" height="77.539" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="7.775" result="effect1_foregroundBlur_2001_67" />
                          </filter>
                          <linearGradient id="gem_grad4" x1="18.447" y1="43.42" x2="52.153" y2="15.004"
                            gradientUnits="userSpaceOnUse">
                            <stop stopColor="#4893FC" />
                            <stop offset=".27" stopColor="#4893FC" />
                            <stop offset=".777" stopColor="#969DFF" />
                            <stop offset="1" stopColor="#BD99FE" />
                          </linearGradient>
                        </defs>
                      </svg></div>
                    <span className="snode-label">Gemini</span>
                  </div>
      
                  
                  <div className="snode"
                    style={cssVars({ '--nd': '0.92s', '--float-dur': '4s', '--float-off': '0.4s', '--nd-bg': 'rgba(255,255,255,0.05)', '--nd-border': 'rgba(255,255,255,0.14)', '--nd-hover-bg': 'rgba(255,255,255,0.1)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 512 428.862" xmlns="http://www.w3.org/2000/svg">
                        <g fillRule="nonzero">
                          <path fill="#fff"
                            d="M355.945 299.241c-16.573-64.745-45.269-126.858-86.582-177.533-17.764-21.785-36.98-39.849-57.646-54.189-5.193-3.599-2.291-12.434 4.054-12.406 1.622 0 3.386.432 5.293 1.295C314.418 98.519 381.71 178.899 420.32 272.851a349.638 349.638 0 0111.311 31.81c2.034 6.701-4.212 12.776-10.457 8.806-16.076-10.2-37.487-10.954-57.589-8.422-3.756.47-6.758-2.332-7.64-5.804zm12.193 110.668c8.82 6.616 17.015 5.976 25.394-.156 9.437-6.915 19.158-14.018 29.164-21.312 8.607-6.274 18.865-8.493 29.307-5.662 4.088 1.119 8.821 3.671 14.198 7.654a2169.868 2169.868 0 0028.296 20.671c3.064 2.191 6.35 3.31 9.859 3.358 4.486.066 7.019 2.323 7.598 6.771a4.672 4.672 0 01-.285 2.391c-1.29 3.319-3.713 4.983-7.27 4.993-6.373.029-12.183-1.783-17.427-5.434a955.133 955.133 0 01-30.047-21.838c-7.867-5.933-16.517-7.981-24.854-1.949a12234.402 12234.402 0 00-31.326 22.706c-8.859 6.439-18.476 8.265-28.852 5.476-4.39-1.185-9.238-3.77-14.539-7.753-9.74-7.312-18.955-14.027-27.643-20.144-7.511-5.302-15.094-5.269-22.747.099-8.394 5.89-17.2 12.306-26.419 19.248-5.994 4.515-11.173 7.365-15.536 8.55-10.309 2.817-19.955.996-28.936-5.463a2286.243 2286.243 0 01-28.696-20.969c-9.858-7.313-17.512-6.972-27.215.085a18230.827 18230.827 0 00-29.065 21.197c-8.469 6.185-17.973 7.887-28.509 5.108-4.382-1.157-9.219-3.732-14.512-7.726-9.152-6.904-18.954-14.022-29.406-21.353-5.932-4.169-14.853-3.159-20.472.939a3834.273 3834.273 0 01-32.735 23.602c-5.444 3.879-11.798 5.728-19.064 5.548-2.93-.066-4.993-1.888-6.188-5.463a4.026 4.026 0 01-.185-1.75c.446-4.401 2.878-6.701 7.298-6.9 4.126-.18 7.607-1.304 10.443-3.371 10.66-7.768 21.074-15.332 31.241-22.692.256-.19.308-.427.156-.711a2580.357 2580.357 0 00-13.97-24.555c-3.016-5.208-.355-10.955 5.833-11.353a812261.421 812261.421 0 00428.289-26.931 45.868 45.868 0 015.578-.028c4.353.242 6.942 5.164 5.732 9.119-.397 1.319-1.583 2.864-3.556 4.638-31.81 28.61-69.298 51.23-108.819 70.151-.693.341-.73.745-.113 1.209zm-52.411-95.631c-34.675-13.59-71.246-20.273-109.715-20.045-45.411.271-89.115 13.359-126.204 37.771-7.383 4.852-15.279-4.41-9.688-10.456 3.158-3.423 5.989-6.924 8.493-10.499 22.421-32.048 35.685-68.188 39.792-108.42 6.957-68.245-14.952-133.303-48.527-192.599-1.38-2.433-.043-7.014 2.433-8.636C74.9-.303 77.542-.451 80.235.954 132.75 28.42 179.636 62.378 220.893 102.83c57.162 56.038 99.358 124.895 109.245 204.947.589 4.733-1.261 7.607-5.547 8.621-2.761.655-6.019-1.01-8.864-2.12z" />
                          <path fill="#fff"
                            d="M122.061 95.346c20.301 70.066 15.18 144.727-21.354 207.936a.213.213 0 00.285.298c33.394-15.488 68.638-23.346 105.731-23.573 36.648-.228 72.347 5.842 107.098 18.21a.428.428 0 00.569-.471c-13.942-87.804-72.186-161.698-139.207-216.84-24.83-20.438-51.458-38.938-79.882-55.497-.92-.541-1.133-.333-.64.626 11.116 21.539 20.249 44.642 27.4 69.311z" />
                          <path fill="#760987"
                            d="M182.56 281.26a262.32 262.32 0 0124.163-1.253c9.349-.058 18.637.294 27.862 1.056l62.574-44.117a309.283 309.283 0 00-12.875-27.409L182.56 281.26z" />
                          <path fill="#E50304"
                            d="M131.958 144.231a282.22 282.22 0 011.9 33.335l82.893-58.628A505.511 505.511 0 00196.079 99l-64.121 45.231z" />
                          <path fill="#FF8E00"
                            d="M133.858 177.524a266.664 266.664 0 01-2.593 36.528l104.809-74.126a460.913 460.913 0 00-19.258-20.921l-82.958 58.519z" />
                          <path fill="#FFEC00"
                            d="M131.302 213.792c-1.962 13.996-5.066 27.819-9.36 41.343l131.862-93.26a417.826 417.826 0 00-17.752-21.974l-104.75 73.891z" />
                          <path fill="#008025"
                            d="M122.01 254.921a243.15 243.15 0 01-21.303 48.361.213.213 0 00.285.298c.731-.339 1.462-.673 2.194-1.004l166.741-117.56a377.93 377.93 0 00-16.085-23.091L122.01 254.921z" />
                          <path fill="#004DFF"
                            d="M102.781 302.759c25.517-11.603 52.109-18.77 79.777-21.499l101.727-71.722a345.49 345.49 0 00-14.354-24.53l-167.15 117.751z" />
                          <path fill="#fff"
                            d="M53.319 365.636a.17.17 0 00-.1.241l8.934 15.608a1.198 1.198 0 001.238.582c8.953-1.508 17 .214 24.142 5.165 9.456 6.545 19.457 13.795 30.004 21.752 7.924 5.976 16.233 8.081 24.655 2.12 8.242-5.833 18.02-12.941 29.335-21.325 10.214-7.569 20.373-10.272 32.636-6.601 3.518 1.052 8.369 3.897 14.553 8.535a1359.088 1359.088 0 0025.295 18.467c9.162 6.529 17.072 5.562 25.892-1.095a957.364 957.364 0 0129.99-21.782c12.662-8.835 28.04-7.042 40.261 2.148a537.008 537.008 0 0013.145 9.603c.419.304.983.363 1.47.146 35.174-16.069 67.429-35.299 96.764-57.692 1.243-.949 1.086-1.37-.469-1.266-132.354 8.337-263.751 16.602-394.189 24.797a17.896 17.896 0 00-3.556.597zM369.005 290.236c14.369-1.423 29.492-.484 43.448 3.627a.4.4 0 00.483-.513c-27.841-75.556-75.386-144.213-140.7-191.19-1.185-.844-1.299-.715-.341.385 46.407 53.321 78.032 118.536 96.228 187.079.123.456.417.659.882.612z" />
                        </g>
                      </svg></div>
                    <span className="snode-label">Midjourney</span>
                  </div>
      
                  
                  <div className="snode"
                    style={cssVars({ '--nd': '1.00s', '--float-dur': '3.7s', '--float-off': '1.5s', '--nd-bg': 'rgba(255,255,255,0.04)', '--nd-border': 'rgba(255,255,255,0.16)', '--nd-hover-bg': 'rgba(255,255,255,0.09)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="512" height="512" rx="122" fill="#000" />
                        <path d="M255.428 423l148.991-83.5L255.428 256l-148.99 83.5 148.99 83.5z" fill="url(#cG1d)" />
                        <path d="M404.419 339.5v-167L255.428 89v167l148.991 83.5z" fill="url(#cG2d)" />
                        <path d="M255.428 89l-148.99 83.5v167l148.99-83.5V89z" fill="url(#cG3d)" />
                        <path d="M404.419 172.5L255.428 423V256l148.991-83.5z" fill="#E4E4E4" />
                        <path d="M404.419 172.5L255.428 256l-148.99-83.5h297.981z" fill="#fff" />
                        <defs>
                          <linearGradient id="cG1d" x1="255.428" y1="256" x2="255.428" y2="423"
                            gradientUnits="userSpaceOnUse">
                            <stop offset=".16" stopColor="#fff" stopOpacity=".39" />
                            <stop offset=".658" stopColor="#fff" stopOpacity=".8" />
                          </linearGradient>
                          <linearGradient id="cG2d" x1="404.419" y1="173.015" x2="257.482" y2="261.497"
                            gradientUnits="userSpaceOnUse">
                            <stop offset=".182" stopColor="#fff" stopOpacity=".31" />
                            <stop offset=".715" stopColor="#fff" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="cG3d" x1="255.428" y1="89" x2="112.292" y2="342.802"
                            gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fff" stopOpacity=".6" />
                            <stop offset=".667" stopColor="#fff" stopOpacity=".22" />
                          </linearGradient>
                        </defs>
                      </svg></div>
                    <span className="snode-label">Cursor</span>
                  </div>
      
                  
                  <div className="snode"
                    style={cssVars({ '--nd': '1.08s', '--float-dur': '4.2s', '--float-off': '0.8s', '--nd-bg': 'rgba(255,255,255,0.05)', '--nd-border': 'rgba(255,255,255,0.15)', '--nd-hover-bg': 'rgba(255,255,255,0.1)' })}>
                    <div className="snode-icon"><svg viewBox="0 0 28 28" fill="none">
                        <rect x="2" y="2" width="24" height="24" rx="6" fill="#0B0B0B" stroke="rgba(209,254,23,0.55)" strokeWidth="1" />
                        <path d="M9 8v12M19 8v12M9 14h10" stroke="#D1FE17" strokeWidth="2.4" strokeLinecap="round" />
                      </svg></div>
                    <span className="snode-label">Higgsfield</span>
                  </div>
      
                </div>
              </div>
      
            </div>
          </section>
      
          <br /><br /><br /><br />
      
          
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
      
          
          <section className="gaming-section" aria-label="Gaming &amp; Creator Channels">
      
            <div className="gaming-heading" id="gaming-heading">
              <span className="gaming-label">Content Creator &amp; Gamer</span>
              <img className="gaming-title-img" src="/Images/zenitrongaming.webp" alt="Zenitron Gaming" decoding="async" />
            </div>
      
            <div className="para-container">
              <p className="bio-para" style={cssVars({ '--para-delay': '0.1s' })}>
                When I'm not designing or coding, you'll probably find me gaming or live streaming. I run a channel called
                Zenitron Gaming, where I play, stream and share clips across a few different platforms. It started as a way
                to unwind, but it's grown into a fun little community, and honestly, spending time inside other people's games
                gives me a lot of ideas for my own work.
              </p>
            </div>
      
            <div className="gaming-grid" id="gaming-grid">
      
              <a className="platform-card pc-yt" href="https://www.youtube.com/@zenitrongaming" target="_blank"
                rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.0s' })} data-url="https://www.youtube.com/@zenitrongaming"
                data-name="YouTube" data-action="visit the Zenitron Gaming YouTube channel" data-detail="@zenitrongaming">
                <div className="pc-icon-wrap"><svg viewBox="0 0 24 24" fill="var(--pc-color)">
                    <path
                      d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg></div>
                <span className="pc-name">YouTube</span>
                <span className="pc-username">@zenitrongaming</span>
                <div className="pc-stats">
                  <div className="pc-stat"><span className="pc-stat-label">Subscribers</span><span className="pc-stat-value">375+</span>
                  </div>
                  <div className="pc-stat"><span className="pc-stat-label">Videos</span><span className="pc-stat-value">120+</span></div>
                </div>
                <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                  Visit Channel
                  <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                    <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                    <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </a>
      
              <a className="platform-card pc-fb" href="https://www.facebook.com/gaming/zenitrongaming" target="_blank"
                rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.1s' })} data-url="https://www.facebook.com/gaming/zenitrongaming"
                data-name="Facebook" data-action="visit the Zenitron Gaming Facebook page" data-detail="@zenitrongaming">
                <div className="pc-icon-wrap"><svg viewBox="0 0 24 24" fill="var(--pc-color)">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg></div>
                <span className="pc-name">Facebook</span>
                <span className="pc-username">@zenitrongaming</span>
                <div className="pc-stats">
                  <div className="pc-stat"><span className="pc-stat-label">Followers</span><span className="pc-stat-value">440+</span>
                  </div>
                  <div className="pc-stat"><span className="pc-stat-label">Type</span><span className="pc-stat-value">Live</span>
                  </div>
                </div>
      
                <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                  Visit Channel
                  <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                    <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                    <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </a>
      
              <a className="platform-card pc-tt" href="https://www.tiktok.com/@zenitrongaming" target="_blank"
                rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.2s' })} data-url="https://www.tiktok.com/@zenitrongaming"
                data-name="TikTok" data-action="visit the Zenitron Gaming TikTok page" data-detail="@zenitrongaming">
                <div className="pc-icon-wrap"><svg viewBox="0 0 24 24" fill="var(--pc-color)">
                    <path
                      d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.65a8.23 8.23 0 004.84 1.55V6.75a4.85 4.85 0 01-1.07-.06z" />
                  </svg></div>
                <span className="pc-name">TikTok</span>
                <span className="pc-username">@zenitrongaming</span>
                <div className="pc-stats">
                  <div className="pc-stat"><span className="pc-stat-label">Followers</span><span className="pc-stat-value">1.2K</span>
                  </div>
                  <div className="pc-stat"><span className="pc-stat-label">Videos</span><span className="pc-stat-value">60+</span></div>
                </div>
                <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                  Visit Channel
                  <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                    <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                    <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </a>
      
              <a className="platform-card pc-tw" href="https://www.twitch.tv/zenitrongaminglive" target="_blank"
                rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.3s' })} data-url="https://www.twitch.tv/zenitrongaminglive"
                data-name="Twitch" data-action="visit the Zenitron Gaming Twitch channel"
                data-detail="@zenitrongaminglive">
                <div className="pc-icon-wrap"><svg viewBox="0 0 24 24" fill="var(--pc-color)">
                    <path
                      d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                  </svg></div>
                <span className="pc-name">Twitch</span>
                <span className="pc-username">@zenitrongaminglive</span>
                <div className="pc-stats">
                  <div className="pc-stat"><span className="pc-stat-label">Followers</span><span className="pc-stat-value">20+</span>
                  </div>
                  <div className="pc-stat"><span className="pc-stat-label">Type</span><span className="pc-stat-value">Live</span>
                  </div>
                </div>
                <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                  Visit Channel
                  <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                    <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                    <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </a>
      
              <a className="platform-card pc-kick" href="https://kick.com/zenitrongaminglive" target="_blank"
                rel="noopener noreferrer" style={cssVars({ '--gc-delay': '0.4s' })} data-url="https://kick.com/zenitrongaminglive"
                data-name="Kick" data-action="visit the Zenitron Gaming Kick channel"
                data-detail="@zenitrongaminglive">
                <div className="pc-icon-wrap"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
                    clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
                    <path
                      d="M37 .036h164.448v113.621h54.71v-56.82h54.731V.036h164.448v170.777h-54.73v56.82h-54.711v56.8h54.71v56.82h54.73V512.03H310.89v-56.82h-54.73v-56.8h-54.711v113.62H37V.036z"
                      fill="#53fc18" />
                  </svg></div>
                <span className="pc-name">Kick</span>
                <span className="pc-username">@zenitrongaminglive</span>
                <div className="pc-stats">
                  <div className="pc-stat"><span className="pc-stat-label">Followers</span><span className="pc-stat-value">20+</span>
                  </div>
                  <div className="pc-stat"><span className="pc-stat-label">Type</span><span className="pc-stat-value">Live</span>
                  </div>
                </div>
                <span className="pc-link" style={{ display: 'inline-block', padding: '10px 0' }}>
                  Visit Channel
                  <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle' }}>
                    <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                    <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </a>
      
            </div>
          </section>
      
          <br /><br /><br /><br />
      
          
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
      
      
          
          <section className="testimonials-section" aria-label="Client Testimonials">
      
            
            <div className="testi-shell" id="testi-shell" aria-live="polite">
      
              
              <div className="testi-meta-row">
                <div className="testi-avatars-stack" id="testi-av-stack">
                  <img src="/Images/testimonials/thaanu.webp" alt="Thaanu Perera" className="testi-avatar-thumb current-av"
                    data-av="0" decoding="async" />
                  <img src="/Images/testimonials/suraji.webp" alt="Suraji Ekanayake" className="testi-avatar-thumb" data-av="1" decoding="async" />
                  <img src="/Images/testimonials/sandakelum.webp" alt="Sandakelum" className="testi-avatar-thumb" data-av="2" decoding="async" />
                  <img src="/Images/testimonials/janith.webp" alt="Janith" className="testi-avatar-thumb" data-av="3" decoding="async" />
                  <img src="/Images/testimonials/wenupa.webp" alt="Wenupa" className="testi-avatar-thumb" data-av="4" decoding="async" />
                  <img src="/Images/testimonials/avishka.webp" alt="Avishka" className="testi-avatar-thumb" data-av="5" decoding="async" />
                  <img src="/Images/testimonials/sandev-dullewa.webp" alt="Sandev Dulleva" className="testi-avatar-thumb"
                    data-av="6" decoding="async" />
                  <img src="/Images/testimonials/atheeque.webp" alt="Atheeque" className="testi-avatar-thumb" data-av="7" decoding="async" />
                  <img src="/Images/testimonials/ramuthu.webp" alt="Ramuthu Senanayake" className="testi-avatar-thumb" data-av="8" decoding="async" />
      
                </div>
                <div className="testi-counter">
                  <span className="testi-counter-cur" id="testi-cur">01</span>
                  <span className="testi-counter-sep">/</span>
                  <span className="testi-counter-tot">09</span>
                </div>
              </div>
      
              
              <div className="testi-quote-area" id="testi-quote-area">
      
                <div className="testi-slide active" data-slide="0">
                  <p className="testi-quote">I had the pleasure of working with Ruchira on several projects, and I can confidently
                    say he’s one of the most talented and dedicated UI/UX designers I’ve encountered. His expertise in both
                    UI/UX design and engineering is truly remarkable, allowing him to craft visually compelling interfaces
                    that are not only user-friendly but also highly functional.</p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/thaanu.webp" alt="Thaanu Perera" className="testi-author-avatar" decoding="async" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Thaanu Perera</span>
                      <span className="testi-role">Software Engineer - Eyepax</span>
                    </div>
                    <div className="testi-stars"><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg></div>
                  </div>
                </div>
                <div className="testi-slide" data-slide="1">
                  <p className="testi-quote">Working with Ruchira on UI/UX design projects has been an incredible experience. He
                    has a great talent for blending the latest trends with user-friendly designs. Whenever we team up, we
                    always create solutions that go above and beyond expectations. His creative vision combined with my design
                    skills results in experiences that truly connect with users. I highly recommend Ruchira for any UI/UX work
                    and his dedication and passion make him a fantastic addition to any team.</p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/suraji.webp" alt="Suraji Ekanayake" className="testi-author-avatar" decoding="async" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Suraji Ekanayake</span>
                      <span className="testi-role">UI/UX Designer - Freelance</span>
                    </div>
                    <div className="testi-stars"><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg></div>
                  </div>
                </div>
                <div className="testi-slide" data-slide="2">
                  <p className="testi-quote">To express my recommendation for this talented man joining the team of employers at
                    Zuse Technologies, I am happy to write this recommendation for Mr. Ruchira Edirisinghe. Throughout the
                    period of cooperation, Ruchira has shown himself as a skilled specialist who has excellent experience in
                    developing effective user-oriented designs that often have even higher performance indicators than stated
                    by the client. This has made him the most vital figure in the design team by balancing creativity with
                    technical competence coupled with his understanding of user’s behavior.</p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/sandakelum.webp" alt="Sandakelum" className="testi-author-avatar" decoding="async" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Sandakelum Senevirathna</span>
                      <span className="testi-role">Tech Lead - ZUSE Technologies</span>
                    </div>
                    <div className="testi-stars"><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg></div>
                  </div>
                </div>
                <div className="testi-slide" data-slide="3">
                  <p className="testi-quote">I had the pleasure of working with Ruchira at Zuse Technologies, where he handled
                    UI/UX for our LMS projects. His work made a real difference in how students interacted with the
                    platform from intuitive course navigation to features like progress tracking and badge systems for course
                    completion. He has a strong eye for clean, user-friendly design and always delivers with quality and
                    attention to detail. On top of that, he’s incredibly easy to collaborate with, making the whole
                    development process smooth and efficient.</p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/janith.webp" alt="Janith" className="testi-author-avatar" decoding="async" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Janith Perera</span>
                      <span className="testi-role">Software Engineer - Racedata</span>
                    </div>
                    <div className="testi-stars"><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg></div>
                  </div>
                </div>
                <div className="testi-slide" data-slide="4">
                  <p className="testi-quote">Embarking on projects with Ruchira has been nothing short of a creative adventure in
                    the world of UI/UX design. His ability to seamlessly merge cutting-edge trends with user-centric
                    functionality is truly commendable. With Ruchira's expertise steering the ship, our collaborations have
                    consistently delivered solutions that not only meet but exceed expectations. Together, we harmonize his
                    innovative vision with my UI designing talents, crafting experiences that resonate with audiences on a
                    profound level.</p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/wenupa.webp" alt="Wenupa" className="testi-author-avatar" decoding="async" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Wenupa Mandinu</span>
                      <span className="testi-role">Cyber Security Engineer - Freelance</span>
                    </div>
                    <div className="testi-stars"><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg></div>
                  </div>
                </div>
                <div className="testi-slide" data-slide="5">
                  <p className="testi-quote">Having collaborated with Ruchira across multiple initiatives, I’ve seen firsthand his
                    exceptional ability to bridge the gap between high-end design and functional engineering. He consistently
                    delivers interfaces that are not only visually striking but also technically robust and intuitive. His
                    deep understanding of user behavior and meticulous attention to detail make him a rare talent in UI/UX
                    engineering and an invaluable asset to any team.</p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/avishka.webp" alt="Avishka Sooriyapperuma" className="testi-author-avatar" decoding="async" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Avishka Sooriyapperuma</span>
                      <span className="testi-role">Senior DevOps Engineer - LSEG</span>
                    </div>
                    <div className="testi-stars"><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg></div>
                  </div>
                </div>
                <div className="testi-slide" data-slide="6">
                  <p className="testi-quote">I had the pleasure of working with Ruchira on a recent web development project, and I
                    was truly impressed by his exceptional UI/UX design skills. Ruchira's ability to create visually appealing
                    and user-friendly interfaces is unparalleled. He has a keen eye for detail, a deep understanding of user
                    behavior, and a knack for turning complex concepts into intuitive designs. Ruchira's collaborative nature
                    and dedication to delivering top-notch designs make him an invaluable asset to any team.</p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/sandev-dullewa.webp" alt="Sandev Dulleva" className="testi-author-avatar" decoding="async" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Sandev Dulleva</span>
                      <span className="testi-role">Software Engineer - ZUSE Technologies</span>
                    </div>
                    <div className="testi-stars"><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg></div>
                  </div>
                </div>
                <div className="testi-slide" data-slide="7">
                  <p className="testi-quote">I had the pleasure of managing Ruchira directly during his time as a developer at
                    TAKG, and I can confidently say that he is one of the most talented and dedicated professionals I have
                    worked with. Ruchira consistently demonstrated exceptional technical skills, creativity, and a strong work
                    ethic. His ability to tackle complex problems and deliver high-quality solutions was truly impressive. He
                    played a pivotal role in UI/UX Development, where his contributions were instrumental in achieving our
                    goals.</p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/atheeque.webp" alt="Atheeque Hasan" className="testi-author-avatar" decoding="async" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Atheeque Hasan</span>
                      <span className="testi-role">Senior Data Analyst - AiSCOUT</span>
                    </div>
                    <div className="testi-stars"><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg></div>
                  </div>
                </div>
                <div className="testi-slide" data-slide="8">
                  <p className="testi-quote">I am pleased to recommend Ruchira for any role pertaining to UI/UX engineering.
                    During our collaboration on website development projects, where I served as the project manager, he
                    consistently demonstrated exceptional skills in crafting user-friendly interfaces.
                    Ruchira possesses a remarkable talent for designing aesthetically pleasing and functional websites. His
                    meticulous attention to detail ensures that every aspect of the user experience is carefully considered.
                  </p>
                  <div className="testi-author-row">
                    <img src="/Images/testimonials/ramuthu.webp" alt="Ramuthu Senanayake" className="testi-author-avatar" decoding="async" />
                    <div className="testi-author-sep"></div>
                    <div className="testi-author-info">
                      <span className="testi-name">Ramuthu Senanayake</span>
                      <span className="testi-role">Associate Project Manager - Sysco LABS Sri Lanka</span>
                    </div>
                    <div className="testi-stars"><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg><svg viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg></div>
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

          <SignOff className="about-signoff" />
        </main>

      {/* Extra top fade chrome specific to the About page (not part of StandardShell) */}
      <div id="nav-fade-mask"></div>


    </StandardShell>
  );
}
