'use client';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import StandardShell from '@/components/StandardShell';
import SignOff from '@/components/SignOff';
import AboutVoices from '@/components/about/AboutVoices';
import { initExperience } from '@/lib/scripts/experience';

/* Experience - a hero with the headline numbers and jump links, then the
   work timeline (lib/scripts/experience.ts threads the glowing spine down
   through each role's node as you scroll), the certifications as a
   filterable wall of real links, skills as three panels of bars, the
   education path, volunteering grouped by organisation, a testimonial
   carousel and a closing call to action. Styles: styles/experience/exp-v2.css. */

type Css = CSSProperties & Record<`--${string}`, string>;

const IMG = '/Images/experience/';

interface Role {
  co: string; role: string; from: string; to: string; place: string; logo: string; c: string;
  tags: string[]; desc: ReactNode;
}
const ROLES: Role[] = [
  {
    co: 'FunExtreme Technology LLC', role: 'UI/UX Engineer & Game Developer', from: '2025 Aug', to: 'Present', place: 'Dubai, United Arab Emirates',
    logo: 'funextreme.webp', c: '#ffb454', tags: ['Full time'],
    desc: <>Here I design and build the gamified interfaces for <strong>747.LIVE</strong>, and I also develop games for the platform. A lot of the job is working through tricky UX problems and debugging on the front end, then turning ordinary screens into something players actually enjoy coming back to. The games I build are there to keep people engaged and give them more reasons to stick around.</>,
  },
  {
    co: 'Trex Labs', role: 'UI/UX Consultant', from: '2025 Dec', to: 'Present', place: 'Nugegoda, Sri Lanka',
    logo: 'trexlabs.webp', c: '#8cd2ff', tags: ['Part time'],
    desc: <>I&rsquo;m working part time with Trex Labs on InsiderHub, a social media platform, where I look after the UI/UX from start to finish. That covers everything from mapping out how people move through the app to designing the screens themselves, with the aim of keeping it simple to use while still hitting what the platform needs to achieve.</>,
  },
  {
    co: 'Techwire Lanka', role: 'UI/UX Engineer', from: '2025 Aug', to: 'Present', place: 'Colombo, Sri Lanka',
    logo: 'techwire-mark.svg', c: '#ff6b6b', tags: ['Full time'],
    desc: <>At Techwire Lanka I design and build the interfaces for the company&rsquo;s software products, from early user flows and wireframes through to polished screens and a shared design system. I work closely with the developers to bring those designs to life in the front end, so what ships stays true to the design and feels clear, consistent and easy to use.</>,
  },
  {
    co: 'Ruach Holdings', role: 'Contract UI/UX Engineer', from: '2024 Sept', to: '2024 Nov', place: 'Colombo, Sri Lanka',
    logo: 'ruach.webp', c: '#c39bff', tags: ['Contract'],
    desc: <>On this contract I handled the full UI/UX design for InsiderHub, a social media platform built for a Sri Lankan audience. I worked out how the app should flow and designed interfaces that felt familiar and easy for local users, while making sure they supported what the platform was trying to do.</>,
  },
  {
    co: 'ZUSE Technologies', role: 'UI/UX Engineer', from: '2023 Nov', to: '2024 Aug', place: 'Colombo, Sri Lanka',
    logo: 'zuse.webp', c: '#5ce0c6', tags: ['Full time'],
    desc: <>I joined ZUSE as an <strong>Associate UI UX Engineer</strong>, where I designed interfaces and helped the developers build them, with the goal of making our products easier and nicer to use. I also made educational games and worked on the Lyceum Learning Management System (LMS), which students used for their courses.</>,
  },
  {
    co: 'TransPerfect', role: 'Freelance UI/UX Designer', from: '2023 Aug', to: '2024 Nov', place: 'New York, United States',
    logo: 'TP.webp', c: '#6fa8ff', tags: ['Freelance'],
    desc: <>I worked with TransPerfect on a <strong>freelance contract basis</strong>, designing user interfaces for their client projects. Each job came with its own set of requirements, so my focus was on understanding what the client really wanted and delivering screens that looked good and were easy to use.</>,
  },
  {
    co: 'Freelance Upon Reservation', role: 'Freelance UI/UX Designer', from: '2022 Aug', to: 'Present', place: 'Remote, Global',
    logo: 'design.webp', c: '#ff7eb6', tags: ['Freelance'],
    desc: <>Alongside my full-time roles, I take on freelance UI/UX work when I have the time. I&rsquo;ve worked with clients from different parts of the world on websites, apps and other products, always trying to make them useful, smooth to use and enjoyable on whatever device people happen to be on.</>,
  },
  {
    co: 'Pearson', role: 'AR/VR Game Developer', from: '2022 Jul', to: '2023 Jun', place: 'London, United Kingdom',
    logo: 'pearson.webp', c: '#4be38a', tags: ['Internship', '1st place award'],
    desc: <>During my internship I worked on AR/VR learning apps for children, where kids could learn through play in an immersive world. Our team won <strong>1st place</strong> in an Inter-Company Global Gaming Solutions Competition with <em>MetaLingo</em>, an immersive platform for learning new languages.</>,
  },
  {
    co: 'TAKG Solutions', role: 'Co-Founder & UX/UI Designer', from: '2021 Oct', to: 'Present', place: 'Colombo, Sri Lanka',
    logo: 'takg.webp', c: '#ffd76a', tags: ['Founder'],
    desc: <>I co-founded TAKG Solutions as a small tech startup. We take on client projects, come up with ideas of our own and look for smart places to invest. We also run sessions to teach younger people about the technology that&rsquo;s shaping things today, which is a part of the work I really enjoy.</>,
  },
  {
    co: 'Zen Creatives', role: 'Graphic Design and UX/UI Dev', from: '2021 Jan', to: 'Present', place: 'Colombo, Sri Lanka',
    logo: 'zencreatives.webp', c: '#ff8a6a', tags: ['Founder'],
    desc: <>I started Zen Creatives so I could use both sides of my skill set, as a graphic designer and as a developer. I freelance here in my spare time, helping clients with logos, posters, social media designs and other graphics, and I always try to give them a little more than they asked for.</>,
  },
];

type CertCat = 'Design' | 'Development' | 'Security' | 'Games & XR' | 'Growth';
interface Cert { name: string; by: string; year: string; logo: string; cat: CertCat; url: string }
const LI = 'https://www.linkedin.com/learning/certificates/';
const CERTS: Cert[] = [
  { name: 'Google UX Design Professional', by: 'Google (Coursera)', year: '2025', logo: 'google.webp', cat: 'Design', url: 'https://www.coursera.org/account/accomplishments/specialization/6LH3NKVNFF16' },
  { name: 'Introduction to Cybersecurity', by: 'Cisco', year: '2025', logo: 'cisco.webp', cat: 'Security', url: 'https://www.credly.com/badges/2ad42d53-f0b2-4c63-b40d-1b67ad04bd4a/linked_in_profile' },
  { name: 'Figma Essentials Training', by: 'LinkedIn Learning', year: '2023', logo: 'LinkedIn.webp', cat: 'Design', url: LI + '34fb036cbc7e615f42fe35b8db5b8072fb1a89ff2d0b7a2c14d05fd0137fac35' },
  { name: 'Understanding AR & VR: Introduction', by: 'LinkedIn Learning', year: '2023', logo: 'LinkedIn.webp', cat: 'Games & XR', url: LI + 'a65374f3ba4a8c4488a531b49c896966f59f259eca15b9bf799e840e5753d159' },
  { name: 'Inclusive Learning Experience Explorer', by: 'Pearson', year: '2022', logo: 'Pearsonlogo.webp', cat: 'Design', url: 'https://www.credly.com/badges/ac96f8ee-cbd7-43e9-93f6-fecc6ff6fc4c/linked_in_profile' },
  { name: "Google HashCode '22", by: 'Google · Participation', year: '2022', logo: 'google.webp', cat: 'Development', url: 'https://drive.google.com/file/d/1xqaOJL7ldvpigKS5mFawXI8p6upKOXDx/view' },
  { name: 'Learning REST APIs', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Development', url: LI + 'ac9f1b8addd94d7a37f865a96d8edbf74256dadcbc0e0e004bd57af95d81f745' },
  { name: 'React: Ecosystems', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Development', url: LI + '6da4458c8005e94b28522dda8b54c0507a4ff311e8067cce7c488b7ab7b3eb7a' },
  { name: 'Learning React.js: Fundamentals', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Development', url: LI + 'd72a2bf610edcf37b8d41b6e906ef67de0643a3ed8c84935a5baf3bd25e9abcd' },
  { name: 'Learning Cryptography and Network Security', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Security', url: LI + 'efc13988a2fa0a57f44b43a5d09eb4ead4ae26a26a8c1986a88169f50e6e4a68' },
  { name: 'Lean Technology Strategy: Purposeful Organizations', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Growth', url: LI + 'f3a9322a6c5a1f94fea36dd2dee44bd37e08d24968ec1b2b6d2677cb105f0c2b' },
  { name: 'Learning Kali Linux', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Security', url: LI + '89fa5201a3930f6ac3f9d28ff4cd8f0a26573749c3781cf61e110873a492460d' },
  { name: 'What Is Scrum?', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Growth', url: LI + 'a02b019e1e5930657dc9fe16401b3344f313614e6cd390666c41106f7b20b691' },
  { name: 'Java Object-Oriented Programming', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Development', url: LI + 'cb108aafc3d72421303ae43aefd472c64f9905bbf61507ba8f7555d52eb56d0a' },
  { name: 'Python for Students', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Development', url: LI + '9306d45b7688e623491527589436fc914f7a4d8bf1acbdaed605da5740d0b30e' },
  { name: 'Learning Java', by: 'LinkedIn Learning', year: '2022', logo: 'LinkedIn.webp', cat: 'Development', url: LI + '93c3f765e7578dbecbd42170d428133d9d26560fd2d0b112e0fd7e6aa9fd69b3' },
  { name: "How to Motivate Yourself to Do What's Most Important", by: 'LinkedIn Learning', year: '2021', logo: 'LinkedIn.webp', cat: 'Growth', url: LI + '27d41f2902289069e7e6e05626de0389472c03530a5d4b525a74d12e76e8d2da' },
  { name: 'AI Accountability Essential Training', by: 'LinkedIn Learning', year: '2021', logo: 'LinkedIn.webp', cat: 'Growth', url: LI + '3d9d12b84dd447be5f3c772647f3896f95779f11440553b04b05af1d6d48e8e6' },
  { name: 'IoT Foundations: Fundamentals', by: 'LinkedIn Learning', year: '2021', logo: 'LinkedIn.webp', cat: 'Development', url: LI + '32b3b9a19fe23eb94efb7aa8d9254eff65ad21223c434ac45323841c7c154f0a' },
  { name: 'Game Design Foundations: 3', by: 'LinkedIn Learning', year: '2021', logo: 'LinkedIn.webp', cat: 'Games & XR', url: LI + '9c42ef7038741bf6d25fc38ef099f4031b961bdf3637cce50e0ab6c70f5802f6' },
  { name: 'Game Design Foundations: 2', by: 'LinkedIn Learning', year: '2021', logo: 'LinkedIn.webp', cat: 'Games & XR', url: LI + '2d872e221ad68c46dd89d7a1523c7bfdc1988ec27e1384dc0fa9280b11126bfb' },
  { name: 'Game Design Foundations: 1', by: 'LinkedIn Learning', year: '2021', logo: 'LinkedIn.webp', cat: 'Games & XR', url: LI + '8c2a0a18d567a7d9bf4590eb38f29099848ac53d43ccf6881997725cf2bf90b8' },
];
const CAT_COLOR: Record<CertCat, string> = {
  Design: '#8cd2ff', Development: '#c39bff', Security: '#ff7a7a', 'Games & XR': '#4be38a', Growth: '#ffd76a',
};
const CAT_ORDER: CertCat[] = ['Design', 'Development', 'Security', 'Games & XR', 'Growth'];

const SKILLS: { title: string; note: string; c: string; items: [string, number][] }[] = [
  {
    title: 'Design', note: 'UI/UX architecture', c: '#8cd2ff',
    items: [['UI/UX Design', 95], ['Figma', 92], ['Prototyping', 90], ['Design Systems', 90], ['Wireframing', 88], ['UX Research', 85]],
  },
  {
    title: 'Games', note: 'Indie game development', c: '#4be38a',
    items: [['Real-time Rendering', 90], ['C# Scripting', 88], ['Unity', 85], ['Indie Games', 85], ['AR/VR', 82], ['Optimization', 80]],
  },
  {
    title: 'Build', note: 'Modern frontend engineering', c: '#c39bff',
    items: [['Vibe Coding', 98], ['Game Development', 95], ['Graphic Design', 93], ['Frontend Development', 92], ['UI/UX Engineering', 90], ['React', 88], ['Visual Coding', 88], ['Product Design', 85]],
  },
];

const EDU = [
  {
    years: '2020 - 2023', level: 'Undergraduate', title: 'BSc. (Hons) Computer Security', school: 'University of Plymouth',
    place: 'NSBM Green University, Sri Lanka', logo: 'ply.webp', c: '#8cd2ff',
    desc: 'I graduated with a Second Class Honours degree in Computer Security from the University of Plymouth, which I studied for at NSBM Green University. It was a demanding course, and finishing it with a good result took a lot of steady effort.',
  },
  {
    years: '2012 - 2020', level: 'Secondary', title: 'O/L & A/L', school: 'Wayamba Royal College',
    place: 'Kurunegala, Sri Lanka', logo: 'WRC.webp', c: '#c39bff',
    desc: 'I sat both my Ordinary Level (O/L) and Advanced Level (A/L) examinations at Wayamba Royal College in Kurunegala. Besides my studies, I was involved in a lot of clubs and activities there, and I did well on both fronts.',
  },
  {
    years: '2006 - 2011', level: 'Primary', title: 'Foundation Studies', school: 'Wickramashila National School',
    place: 'Giriulla, Sri Lanka', logo: 'wickra.webp', c: '#4be38a',
    desc: 'This is where I did my primary education. Alongside my schoolwork I took part in all sorts of activities, did well in my studies and picked up the steady study habits that helped me later on.',
  },
];

interface Vol { role: string; org: string; logo: string; years: string; c: string }
const VOL: { era: string; place: string; items: Vol[] }[] = [
  {
    era: 'University', place: 'NSBM Green University',
    items: [
      { role: 'Editor in Chief', org: 'ISACA NSBM Student Group', logo: 'isaca.webp', years: '2022 - 2023', c: '#8cd2ff' },
      { role: 'Associate Vice President', org: 'Department of Network and Security', logo: 'dns.webp', years: '2022 - 2023', c: '#c39bff' },
      { role: 'Coordinator of Volunteers', org: 'FOSS Community of NSBM', logo: 'foss.webp', years: '2022 - 2023', c: '#4be38a' },
      { role: 'Community Coordinator', org: 'FOSS Community of NSBM', logo: 'foss.webp', years: '2021 - 2023', c: '#4be38a' },
      { role: 'Volunteer', org: 'FOSS Community of NSBM', logo: 'foss.webp', years: '2020 - 2023', c: '#4be38a' },
    ],
  },
  {
    era: 'School', place: 'Wayamba Royal College',
    items: [
      { role: 'Director of Club Service', org: 'Interact Club of WRC', logo: 'int-blue.webp', years: '2019 - 2020', c: '#6fa8ff' },
      { role: 'Senior Prefect', org: 'Wayamba Royal College', logo: 'wrc-round.webp', years: '2018 - 2020', c: '#ffd76a' },
      { role: 'Official Photographer', org: 'Interact Club of WRC', logo: 'int.webp', years: '2018 - 2020', c: '#6fa8ff' },
      { role: 'Assistant Director of Community Service', org: 'Interact Club of WRC', logo: 'int-blue.webp', years: '2018 - 2019', c: '#6fa8ff' },
      { role: 'Official Photographer', org: 'Royalists Photographic Society', logo: 'rps.webp', years: '2017 - 2020', c: '#ff8a6a' },
    ],
  },
];

const JUMPS: [string, string][] = [['work', 'Work'], ['certs', 'Certifications'], ['skills', 'Skills'], ['edu', 'Education'], ['vol', 'Volunteering']];

const I = {
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
};
const Icon = ({ d, cls = '' }: { d: ReactNode; cls?: string }) => (
  <svg className={`xp-i ${cls}`} viewBox="0 0 24 24" aria-hidden="true">{d}</svg>
);

function Head({ kicker, title, glow, children }: { kicker: string; title: string; glow: string; children?: ReactNode }) {
  return (
    <header className="xp-head xp-rv">
      <p className="xp-kicker">{kicker}</p>
      <h2 className="xp-title"><span className="xp-plain">{title}</span> <span className="xp-glow">{glow}</span></h2>
      {children && <p className="xp-lede">{children}</p>}
    </header>
  );
}

/* Every credential, grouped by the year it was earned (newest first) as a
   row of passes: the issuer's logo on the stub, the course on the ticket.
   Each pass is a real link (the leaving-the-site dialog asks first). */
function Certs() {
  const years = Array.from(new Set(CERTS.map((c) => c.year))).sort((a, b) => Number(b) - Number(a));
  return (
    <>
      <ul className="xp-legend xp-rv" aria-label="Subjects">
        {CAT_ORDER.map((k) => (
          <li key={k} style={{ '--c': CAT_COLOR[k] } as Css}>
            <span className="xp-legend-dot" aria-hidden="true" />{k}
            <span className="xp-legend-n">{CERTS.filter((c) => c.cat === k).length}</span>
          </li>
        ))}
      </ul>
      <div className="xp-years">
        {years.map((y) => {
          const items = CERTS.filter((c) => c.year === y)
            .sort((a, b) => CAT_ORDER.indexOf(a.cat) - CAT_ORDER.indexOf(b.cat));
          return (
            <section key={y} className="xp-year" aria-label={`Earned in ${y}`}>
              <h3 className="xp-year-n xp-rv">{y}<span>{items.length} {items.length === 1 ? 'credential' : 'credentials'}</span></h3>
              <ul className="xp-tix">
                {items.map((c, k) => (
                  <li key={c.name} className="xp-rv" style={{ '--c': CAT_COLOR[c.cat], transitionDelay: `${(k % 3) * 0.07}s` } as Css}>
                    <a
                      className="xp-tix-card xp-snd" href={c.url} target="_blank" rel="noopener noreferrer"
                      data-name={c.name} data-detail={`${c.by} · ${c.year}`}
                    >
                      <span className="xp-tix-stub"><img src={IMG + c.logo} alt="" loading="lazy" decoding="async" /></span>
                      <span className="xp-tix-body">
                        <span className="xp-tix-cat">{c.cat}</span>
                        <span className="xp-tix-name">{c.name}</span>
                        <span className="xp-tix-by">{c.by}</span>
                      </span>
                      <Icon d={I.arrow} cls="xp-tix-go" />
                      <span className="sr-only"> (opens the credential in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}

/* Skill bubbles drift all over their stage, bounce off its walls and each
   other, and shy away from the pointer (or a finger). The loop only runs
   while the stage is on screen and the tab is visible; transforms only.
   With reduced motion they are laid out once and stay put. */
function useBubbles(ref: { current: HTMLUListElement | null }) {
  useEffect(() => {
    const ul = ref.current;
    if (!ul) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const b = Array.from(ul.children as HTMLCollectionOf<HTMLElement>).map((el) => ({ el, r: 0, x: 0, y: 0, vx: 0, vy: 0, sp: 0 }));
    let W = 0, H = 0, raf = 0, last = 0, onScreen = false;
    let px = -9999, py = -9999;

    const measure = () => {
      W = ul.clientWidth; H = ul.clientHeight;
      b.forEach((o) => {
        o.r = o.el.offsetWidth / 2;
        o.x = Math.min(Math.max(o.x, o.r), W - o.r);
        o.y = Math.min(Math.max(o.y, o.r), H - o.r);
      });
    };
    const place = () => b.forEach((o) => { o.el.style.transform = `translate3d(${(o.x - o.r).toFixed(1)}px, ${(o.y - o.r).toFixed(1)}px, 0)`; });
    const collide = (bounce: boolean) => {
      for (let i = 0; i < b.length; i++) {
        for (let j = i + 1; j < b.length; j++) {
          const p = b[i], q = b[j];
          const dx = q.x - p.x, dy = q.y - p.y, min = p.r + q.r + 6;
          const d2 = dx * dx + dy * dy;
          if (d2 >= min * min || d2 === 0) continue;
          const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, push = (min - d) / 2;
          p.x -= nx * push; p.y -= ny * push; q.x += nx * push; q.y += ny * push;
          if (bounce) {
            // Equal masses: swap the velocity components along the contact normal.
            const pv = p.vx * nx + p.vy * ny, qv = q.vx * nx + q.vy * ny;
            if (pv - qv > 0) {
              p.vx += (qv - pv) * nx; p.vy += (qv - pv) * ny;
              q.vx += (pv - qv) * nx; q.vy += (pv - qv) * ny;
            }
          }
        }
      }
    };
    const walls = () => b.forEach((o) => {
      if (o.x < o.r) { o.x = o.r; o.vx = Math.abs(o.vx); }
      if (o.x > W - o.r) { o.x = W - o.r; o.vx = -Math.abs(o.vx); }
      if (o.y < o.r) { o.y = o.r; o.vy = Math.abs(o.vy); }
      if (o.y > H - o.r) { o.y = H - o.r; o.vy = -Math.abs(o.vy); }
    });

    measure();
    b.forEach((o) => {
      o.x = o.r + Math.random() * Math.max(1, W - 2 * o.r);
      o.y = o.r + Math.random() * Math.max(1, H - 2 * o.r);
      const a = Math.random() * Math.PI * 2;
      o.sp = 16 + Math.random() * 22;
      o.vx = Math.cos(a) * o.sp; o.vy = Math.sin(a) * o.sp;
    });
    for (let k = 0; k < 80; k++) { collide(false); walls(); }
    place();
    ul.classList.add('is-live');

    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      b.forEach((o) => {
        // The pointer nudges nearby bubbles away.
        const dx = o.x - px, dy = o.y - py, d2 = dx * dx + dy * dy, R = o.r + 90;
        if (d2 < R * R && d2 > 1) {
          const d = Math.sqrt(d2), f = (1 - d / R) * 900 * dt;
          o.vx += (dx / d) * f; o.vy += (dy / d) * f;
        }
        // Ease back to each bubble's own cruising speed, so they never stop or race.
        const v = Math.hypot(o.vx, o.vy) || 1, k = 1 + (o.sp / v - 1) * Math.min(1, dt * 1.5);
        o.vx *= k; o.vy *= k;
        o.x += o.vx * dt; o.y += o.vy * dt;
      });
      collide(true);
      walls();
      place();
      if (onScreen && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const wake = () => { if (!still && !raf && onScreen && !document.hidden) { last = 0; raf = requestAnimationFrame(tick); } };

    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; wake(); });
    io.observe(ul);
    const ro = new ResizeObserver(() => { measure(); collide(false); walls(); place(); });
    ro.observe(ul);
    const move = (e: PointerEvent) => { const r = ul.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; };
    const leave = () => { px = py = -9999; };
    ul.addEventListener('pointermove', move, { passive: true });
    ul.addEventListener('pointerdown', move, { passive: true });
    ul.addEventListener('pointerleave', leave);
    ul.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') leave(); });
    document.addEventListener('visibilitychange', wake);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      ul.removeEventListener('pointermove', move); ul.removeEventListener('pointerdown', move);
      ul.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', wake);
    };
  }, [ref]);
}

function Skills() {
  const [pick, setPick] = useState<string>('All');
  const stage = useRef<HTMLUListElement>(null);
  useBubbles(stage);
  // Mixed colours across the stage; size still follows how strong the skill is.
  const all = SKILLS.flatMap((g) => g.items.map(([name, pct]) => ({ name, pct, g })))
    .sort((a, b) => b.pct - a.pct);
  const tabs = ['All', ...SKILLS.map((g) => g.title)];
  return (
    <>
      <div className="xp-filters is-center xp-rv" role="group" aria-label="Highlight a skill group">
        {tabs.map((k) => {
          const g = SKILLS.find((x) => x.title === k);
          return (
            <button
              key={k} type="button" className="xp-chip xp-snd" aria-pressed={pick === k}
              style={{ '--c': g ? g.c : '#ffffff' } as Css} onClick={() => setPick(k)}
            >
              {k}{g && <span className="xp-chip-note">{g.note}</span>}
            </button>
          );
        })}
      </div>
      <ul ref={stage} className="xp-bubbles xp-rv" aria-label="Skills">
        {all.map(({ name, pct, g }, k) => (
          <li
            key={name}
            className={`xp-bub${pick !== 'All' && pick !== g.title ? ' is-dim' : ''}`}
            style={{ '--c': g.c, '--s': String(0.68 + ((pct - 80) / 18) * 0.32), '--i': String(k) } as Css}
          >
            <span className="xp-bub-in"><span className="xp-bub-name">{name}</span></span>
          </li>
        ))}
      </ul>
    </>
  );
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
      <main className="page xp">
        {/* ══ HERO ══ */}
        <section className="xp-hero" aria-labelledby="xp-h1">
          <p className="xp-kicker">My professional journey</p>
          <h1 id="xp-h1" className="xp-big"><span className="xp-plain">Work</span> <span className="xp-glow">Experience</span></h1>
          <p className="xp-intro">
            I&rsquo;ve been working professionally for a little over four years now, building all kinds of web products,
            from learning platforms and social apps to online games. Some roles sharpened my front-end skills, some pushed
            my UI/UX thinking further, and a lot of them taught me how to work well with developers, testers and product
            people who all see a project from a different angle.
          </p>
          <nav className="xp-jumps" aria-label="On this page">
            {JUMPS.map(([id, l]) => <a key={id} href={`#${id}`} className="xp-jump xp-snd">{l}</a>)}
          </nav>
        </section>

        {/* ══ WORK TIMELINE ══ */}
        <section id="work" className="xp-sec" aria-label="Work experience">
          <ol className="xp-tl">
            {ROLES.map((r, k) => (
              <li key={r.co} className={`xp-role ${k % 2 ? 'is-right' : 'is-left'}`} style={{ '--c': r.c } as Css}>
                <div className="xp-when" aria-hidden="true">
                  <span>{r.from}</span><span className="xp-when-to">{r.to === 'Present' ? 'Present' : r.to}</span>
                </div>
                <span className="xp-node" aria-hidden="true" />
                <article className="xp-card">
                  <img className="xp-card-mark" src={IMG + r.logo} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  <header className="xp-card-head">
                    <span className="xp-logo-wrap"><img className="xp-logo" src={IMG + r.logo} alt="" loading="lazy" decoding="async" /></span>
                    <div className="xp-card-id">
                      <p className="xp-date">{r.from} – {r.to}</p>
                      <h3 className="xp-role-name">{r.role}</h3>
                      <p className="xp-co">{r.co}</p>
                    </div>
                  </header>
                  <p className="xp-desc">{r.desc}</p>
                  <footer className="xp-card-foot">
                    <span className="xp-place"><Icon d={I.pin} />{r.place}</span>
                    <span className="xp-tags">
                      {r.to === 'Present' && <span className="xp-tag is-now">Current</span>}
                      {r.tags.map((t) => <span key={t} className="xp-tag">{t}</span>)}
                    </span>
                  </footer>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* ══ CERTIFICATIONS ══ */}
        <section id="certs" className="xp-sec" aria-label="Licenses and certifications">
          <Head kicker="Credentials" title="Licenses &" glow="certifications">
            Taking courses is one of the ways I keep up. These cover newer tools and best practices across UI/UX design,
            software development and cybersecurity. Each card opens the credential itself.
          </Head>
          <Certs />
        </section>

        {/* ══ SKILLS ══ */}
        <section id="skills" className="xp-sec" aria-label="Skills">
          <Head kicker="Expertise" title="Specialized" glow="skills">
            I like having a foot in both design and development, so I can make something look right and make sure it
            works properly for the people using it.
          </Head>
          <Skills />
        </section>

        {/* ══ EDUCATION ══ */}
        <section id="edu" className="xp-sec" aria-label="Education">
          <Head kicker="Education background" title="Academic" glow="history">
            Those years taught me how to learn properly and how to keep going when things get tough, and both have
            stayed with me in my career.
          </Head>
          <ol className="xp-edu">
            {EDU.map((e) => (
              <li key={e.school} className="xp-edu-item xp-rv" style={{ '--c': e.c } as Css}>
                <div className="xp-edu-mark" aria-hidden="true">
                  <img src={IMG + e.logo} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="xp-edu-body">
                  <p className="xp-edu-years">{e.years}<span>{e.level}</span></p>
                  <h3 className="xp-edu-title">{e.title}</h3>
                  <p className="xp-edu-school">{e.school}</p>
                  <p className="xp-place"><Icon d={I.pin} />{e.place}</p>
                  <p className="xp-desc">{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ══ VOLUNTEERING ══ */}
        <section id="vol" className="xp-sec" aria-label="Volunteer experience">
          <Head kicker="Community impact" title="Volunteer" glow="experience">
            Through mentorship, open-source communities and social initiatives, I&rsquo;ve tried to use what I know to
            help other people move forward.
          </Head>
          <div className="xp-vol">
            {VOL.map((col) => (
              <div key={col.era} className="xp-vol-col xp-rv">
                <h3 className="xp-vol-head">{col.era}<span>{col.place} · {col.items.length} roles</span></h3>
                <ul className="xp-vol-list">
                  {col.items.map((v) => (
                    <li key={v.role + v.org} className="xp-vol-row" style={{ '--c': v.c } as Css}>
                      <img className="xp-vol-logo" src={IMG + v.logo} alt="" loading="lazy" decoding="async" />
                      <span className="xp-vol-txt">
                        <span className="xp-vol-role">{v.role}</span>
                        <span className="xp-vol-org">{v.org}</span>
                      </span>
                      <span className="xp-vol-y">{v.years}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <AboutVoices className="xp-sec" rv="xp-rv" head={<Head kicker="Kind words" title="What people" glow="say" />} />

        {/* ══ SIGN-OFF ══ */}
        <SignOff className="xp-sec xp-rv" />
      </main>
    </StandardShell>
  );
}
