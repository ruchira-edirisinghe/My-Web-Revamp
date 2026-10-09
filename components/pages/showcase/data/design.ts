import type { DesignStudy, Shot } from '../types';

/** `[file, caption]` pairs under one folder → gallery shots. */
const shots = (dir: string, list: [string, string][]): Shot[] =>
  list.map(([file, caption]) => ({ src: `${dir}/${file}.webp`, caption }));

/* UI/UX case studies, in the order the projects grid lists them. */
export const DESIGN: DesignStudy[] = [
  /* ─────────────────────────────── FUN EXTREME ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'funxt',
    title: 'Fun Extreme Technology',
    tagline: 'A corporate website for a gaming technology company. It needed to feel fun enough for the gaming world while still looking credible to big enterprise clients.',
    kicker: 'UI/UX Case Study · Corporate Website',
    cover: '/Images/projects/funxt/cover.webp',
    accent: '#ff5757',
    accent2: '#a9a9b9',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Web Designer' },
      { label: 'Client', value: 'Fun Extreme Technology LLC' },
      { label: 'Type', value: 'Corporate website · B2B' },
      { label: 'Tools', value: 'Figma · Design system' },
      { label: 'Deliverables', value: '9+ pages, desktop & mobile' },
      { label: 'Status', value: 'Shipped to a live site' },
    ],
    links: [
      { label: 'Live site', href: 'https://funextreme-web.vercel.app' },
      { label: 'Figma file', href: 'https://www.figma.com/design/Rte3UE8njPV64UYW35l5g8/Fun-Extreme-LLC-WEB?node-id=0-1' },
    ],
    brief: [
      'Fun Extreme Technology builds software for gaming platforms around the world, and they needed a company website that showed what they could do. That meant a Home page, four Solution pillars, plus Company, Careers and Contact pages.',
      'The real challenge was that the company has two sides to it. Most B2B tech websites feel dry and templated, and most gaming websites feel playful but not very serious. This one site had to win over enterprise buyers, get gaming operators excited and attract engineers, all without splitting into two separate designs.',
    ],
    problem: {
      statement: 'A gaming technology company needs a website that feels energetic enough for the gaming world but solid enough for enterprise buyers, and most websites only manage one or the other.',
      goal: 'Create one bold design system led by red, used across Home, Solutions, Company, Careers and Contact, with every page fully designed for both desktop and mobile.',
      audience: 'Gaming operators looking for a technology partner, engineers thinking about joining the company, and partners looking for signs that the company can be trusted.',
      quote: 'Fun is right there in the company’s name, but its clients are big enterprises. The site had to look like both at the same time.',
    },
    research: {
      summary: 'Three very different kinds of people land on the same homepage. A client wants to check what the company can do, a job candidate wants to get a feel for the culture, and a partner wants to see whether the company is credible. All three skim the page looking for proof rather than reading long paragraphs, so stats, clearly named solution pillars and real partnerships needed to appear early, with more detail just a click away.',
      compare: {
        before: { label: 'Typical B2B tech sites', items: ['Stock-photo templates with no personality', 'Service lists written as jargon walls', 'One funnel that ignores clients, candidates and partners'] },
        after: { label: 'The opportunity', items: ['One confident red-gradient identity over calm blue-ash neutrals', 'Four named solution pillars, each with a deep-dive page', 'Dedicated journeys for Solutions, Company, Careers and Contact'] },
      },
      personas: [
        { icon: '🕹️', name: 'The Gaming Operator', role: 'Primary · evaluating a partner', traits: ['ROI-driven', 'Time-poor', 'Sceptical'], quote: 'Show me you’ve shipped gaming tech at scale - fast, secure and compliant.' },
        { icon: '👩‍💻', name: 'The Engineer Candidate', role: 'Secondary · exploring careers', traits: ['Craft-focused', 'Culture-curious', 'Mobile-first'], quote: 'I want to see what I’d build and who I’d build it with - before I hit Apply.' },
        { icon: '🤝', name: 'The Strategic Partner', role: 'Tertiary · verifying credibility', traits: ['Trust-seeking', 'Detail-oriented', 'Brand-aware'], quote: 'Numbers, partnerships and a global footprint tell me this company is real.' },
      ],
      insights: [
        { icon: '🧱', title: 'Specifics beat claims', text: 'Operators don’t trust vague service pages, so I broke each of the four pillars down into six specific services.' },
        { icon: '🧑‍💼', title: 'Careers is a hub, not a form', text: 'Candidates want to know what they’d be working on and what the culture is like, so the careers page has detailed role cards and simple ways to apply.' },
        { icon: '📊', title: 'Proof up front', text: 'Partners want to check how big and established the company is, so stats, partner logos and a section on the global network sit near the top of the page.' },
      ],
    },
    structure: {
      flow: ['Home', 'Solutions', 'Pillar deep-dive', 'Company', 'Contact & Careers'],
      note: 'The four solution pillars, Design & Development, Cloud & Operations, Security & Compliance and Innovation & Planning, shape the whole site. They appear in the homepage grid, the Solutions overview and four deep-dive pages, each covering six services.',
      ia: [
        { icon: '🏠', title: 'Home', text: 'Hero · stats · pillars · partners' },
        { icon: '🧭', title: 'Solutions', text: 'Overview · 4 pillar pages · 24 services' },
        { icon: '🏢', title: 'Company', text: 'Why us · engagement models · global network' },
        { icon: '✉️', title: 'Careers & Contact', text: 'Role cards · apply · get-in-touch form' },
      ],
    },
    system: {
      summary: 'A single bold red gradient (#FF5757 → #CD0505) stands out against plenty of white space and two blue-ash greys. Every neutral colour has documented opacity steps from 8% to 80%, so the same colours work on bright sections and on dark charcoal bands.',
      colors: [
        { hex: '#FF5757', name: 'Red - light' }, { hex: '#CD0505', name: 'Red - deep' },
        { hex: '#7B7B94', name: 'Blue-ash' }, { hex: '#A9A9B9', name: 'Blue-ash light' },
        { hex: '#FFFFFF', name: 'White' }, { hex: '#000000', name: 'Black' },
      ],
      fonts: [{ name: 'Gilroy', use: 'Everything from hero statements to data labels - Regular to Black, 12-48pt' }],
    },
    screens: [
      { label: 'Desktop', orientation: 'landscape', shots: shots('/Images/projects/funxt/desktop', [
        ['Home', 'Home'], ['Solutions', 'Solutions'], ['Solutions _ DESIGN AND DEVELOPMENT', 'Design & Development'],
        ['Solutions _ CLOUD AND OPERATIONS', 'Cloud & Operations'], ['Solutions _ SECURITY AND COMPLIANCE', 'Security & Compliance'],
        ['Solutions _ INNOVATION AND PLANNING', 'Innovation & Planning'], ['Company', 'Company'], ['Careers', 'Careers'], ['Contact Us', 'Contact Us'],
      ]) },
      { label: 'Mobile', orientation: 'portrait', shots: shots('/Images/projects/funxt/mobile', [
        ['Mobile - Home', 'Home'], ['Mobile - Solutions', 'Solutions'], ['Mobile - Solutions-1', 'Design & Development'],
        ['Mobile - Company', 'Company'], ['Mobile - Contact us', 'Contact Us'],
      ]) },
    ],
    interactions: [
      { icon: '🧱', title: 'Pillar-driven navigation', text: 'The four solution tiles drive the whole site. Each one opens a deep-dive page that explains the pillar through six specific services.' },
      { icon: '📈', title: 'Proof through numbers', text: 'Counters showing 100+ employees and 5+ countries, partner logos and a global network section turn the company’s claims into something visitors can actually see.' },
      { icon: '✉️', title: 'Conversion touchpoints', text: 'A two-part call-to-action band, with "Interested in joining us?" on one side and "Speak with our experts" on the other, plus role cards and a simple, focused contact form.' },
    ],
    outcome: {
      metrics: [{ value: '9+', label: 'Pages designed' }, { value: '2', label: 'Layouts - desktop & mobile' }, { value: '24', label: 'Services across 4 pillars' }, { value: 'Live', label: 'Shipped to production' }],
      summary: 'A complete company website with a homepage, a solutions section built around four pillars with their own deep-dive pages, and Company, Careers and Contact pages. Everything was designed for desktop and mobile and is now live.',
      challenge: 'Keeping both sides of the company’s personality, the energy of gaming and the seriousness of enterprise, in one identity across nine content-heavy pages and two layouts.',
      learned: 'A small, disciplined colour palette goes a long way. One red gradient and a set of documented opacity steps did the job of a much bigger design system.',
      next: 'Adding case studies and articles, polishing the animation on the gradient bands, and translating the site for markets around the world.',
    },
  },

  /* ─────────────────────────────── 747 SOCIAL ─────────────────────────────── */
  {
    kind: 'design',
    slug: '747social',
    title: '747 Social Casino',
    tagline: 'A social network and a casino, designed as one premium product that works on both desktop and mobile.',
    kicker: 'UI/UX Case Study · Social Casino',
    cover: '/Images/projects/social-casino/cover.webp',
    accent: '#00b377',
    accent2: '#d4af37',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Product Designer' },
      { label: 'Type', value: 'Social casino · Web + mobile' },
      { label: 'Tools', value: 'Figma · Token system' },
      { label: 'Screens', value: '90+ high-fidelity' },
      { label: 'Themes', value: 'Light & dark' },
      { label: 'Views', value: 'Desktop & mobile' },
    ],
    links: [{ label: 'Figma file', href: 'https://www.figma.com/design/50pSddynqetCpXJCHFhyDm/747-Social-Casino?node-id=73-6900' }],
    brief: [
      '747 Social Casino is built around people, not just games. It combines a full social network, with profiles, stories, posts and comments, with games and prizes, and it has a detailed onboarding journey to get new users started.',
      'My job was to take something with this many layers and make it feel easy, premium and consistent on both desktop and mobile.',
    ],
    problem: {
      statement: 'Combining a social network and a casino, along with a long onboarding flow, could easily produce something that feels cluttered and tiring before anyone even gets to the fun part.',
      goal: 'Create one premium design system where the social side and the games sit comfortably together, onboarding feels light and rewarding, and every screen works on desktop and mobile.',
      audience: 'Players who are there for the community and want to express themselves, and casual gamers who are after some fun and a chance to win prizes.',
      quote: 'The games and the feed aren’t hard on their own. The hard part is making them feel like one premium product on every screen.',
    },
    research: {
      summary: 'People who come for the social side and people who come for the casino overlap, but they want different things at first. One group wants to express themselves, and the other just wants to play. The product had to welcome both and guide them through onboarding without hitting them with a wall of form fields.',
      compare: {
        before: { label: 'Typical social / casino apps', items: ['Onboarding that dumps every field at once', 'Social and gaming that feel like two apps stitched together', 'Desktop and mobile that drift apart over time'] },
        after: { label: 'The opportunity', items: ['Progressive onboarding with clear complete / incomplete states', 'One green-and-gold system uniting social and gaming', 'A documented token system for light/dark and device parity'] },
      },
      personas: [
        { icon: '💬', name: 'The Social Player', role: 'Primary · community-first', traits: ['Expressive', 'Content creator', 'Mobile-first'], quote: 'I’m here for the community as much as the games - show me stories, posts and profiles.' },
        { icon: '🎁', name: 'The Casual Gamer', role: 'Secondary · plays for rewards', traits: ['Prize-driven', 'Casual', 'Quick sessions'], quote: 'I want quick games and a real shot at a prize - make claiming rewards feel great.' },
        { icon: '🆕', name: 'The New User', role: 'Tertiary · onboarding', traits: ['First-timer', 'Cautious', 'Time-poor'], quote: 'Don’t make me fill in everything at once - let me complete my profile bit by bit.' },
      ],
      insights: [
        { icon: '🪪', title: 'Real self-expression', text: 'A detailed "About Me" section with photos, text, video and voice, instead of a basic profile.' },
        { icon: '⏱️', title: 'A satisfying claim', text: 'A prize timer that counts down to a "ready to claim" moment, which fixes prize mechanics that used to feel unrewarding.' },
        { icon: '🧩', title: 'Progress, not forms', text: 'Onboarding is split into steps you can skip, with clear progress shown along the way.' },
      ],
    },
    structure: {
      flow: ['Login', 'Onboarding', 'Build profile', 'Social feed', 'Play & win'],
      note: 'Onboarding is broken into steps you can skip: profile, cover photo, "About Me" media, invites and games. Each step clearly shows whether it’s complete or not.',
      ia: [
        { icon: '📰', title: 'Social Feed', text: 'Home · stories · posts · comments' },
        { icon: '🪪', title: 'Profile', text: 'About Me · media · edit' },
        { icon: '🎁', title: 'Play & Prizes', text: 'Games · prize timer · claim' },
        { icon: '🔔', title: 'Account', text: 'Onboarding · login · notifications' },
      ],
    },
    system: {
      summary: 'Casino green, lifted with gold for anything to do with value and winning, and grounded with deep navy text and clean neutrals. It’s all defined as a complete token system (primary colours, surfaces, text, borders, and success, error and warning states) with light and dark modes.',
      colors: [
        { hex: '#009F68', name: 'Primary green' }, { hex: '#007A50', name: 'Green - pressed' }, { hex: '#D4AF37', name: 'Gold' },
        { hex: '#FF3939', name: 'Error' }, { hex: '#192B4A', name: 'Navy text' }, { hex: '#9BAEC9', name: 'Muted' },
        { hex: '#F8FAFC', name: 'Surface - light' }, { hex: '#151515', name: 'Surface - dark' }, { hex: '#E2E8F0', name: 'Border' },
      ],
      fonts: [{ name: 'Poppins', use: 'Headings to metadata - Light to Bold, 12-48pt, tuned for light and dark' }],
    },
    screens: [
      { label: 'Desktop', orientation: 'landscape', shots: shots('/Images/projects/social-casino/desktop', [
        ['Desktop - Home', 'Home'], ['Desktop - Login', 'Login'], ['Desktop - Onboarding 1', 'Onboarding'],
        ['Desktop - Story And Post 1', 'Stories & posts'], ['Desktop - Profile - About Me Photo', 'Profile'],
        ['Desktop - Comments', 'Comments'], ['Desktop - Notifications', 'Notifications'], ['Desktop - Prize Timer Popup - Ready To Claim', 'Prize claim'],
      ]) },
      { label: 'Mobile', orientation: 'portrait', shots: shots('/Images/projects/social-casino/mobile', [
        ['Mobile - Home', 'Home'], ['Mobile - Login', 'Login'], ['Mobile - 1 - Story', 'Stories'], ['Mobile - 5 - Single Post', 'Post'],
        ['Mobile - Profile - About Me Photo', 'Profile'], ['Mobile - Comments', 'Comments'], ['Mobile - 1 - Notifications Full', 'Notifications'],
        ['Mobile - Onboarding 4 - Invite', 'Onboarding · invite'],
      ]) },
    ],
    interactions: [
      { icon: '🧩', title: 'Progressive onboarding', text: 'You build your profile, cover and "About Me" media one step at a time, and each step clearly shows whether it’s done or still waiting.' },
      { icon: '📰', title: 'Stories, posts & comments', text: 'A full social layer with stories, single and multi-image posts and comments gives the casino a real sense of community.' },
      { icon: '🎁', title: 'Prizes & floating actions', text: 'A prize timer counts down to "ready to claim", and on mobile a floating action button keeps the most important actions just a tap away.' },
    ],
    outcome: {
      metrics: [{ value: '90+', label: 'Screens designed' }, { value: '2', label: 'Layouts - desktop & mobile' }, { value: '2', label: 'Themes - light & dark' }],
      summary: 'A complete social casino design with multi-step onboarding, a full social feed, detailed profiles, games, prizes and notifications, all designed for desktop and mobile in both light and dark themes.',
      challenge: 'Bringing a social network and a casino together into one product, and keeping dozens of onboarding states consistent across two layouts.',
      learned: 'A documented token system is what keeps a product this big consistent, and designing all the in-between states is half the work.',
      next: 'Handing the designs over to engineering, prototyping the story and prize-claim interactions, and designing a tablet layout.',
    },
  },

  /* ─────────────────────────────── LOTTOGRAM ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'lottogram',
    title: 'Lottogram',
    tagline: 'A betting and lottery platform where I took a lot of dense data and made it bold, clear and trustworthy on every screen.',
    kicker: 'UI/UX Case Study · iGaming',
    cover: '/Images/projects/lottogram/cover.webp',
    accent: '#ff3b30',
    accent2: '#efbf04',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Product Designer' },
      { label: 'Type', value: 'Betting & lottery · Web + mobile' },
      { label: 'Tools', value: 'Figma · Design system' },
      { label: 'Screens', value: '30+ high-fidelity' },
      { label: 'Type scale', value: 'Lexend, 12-36pt' },
      { label: 'Views', value: 'Desktop & mobile' },
    ],
    links: [{ label: 'Figma file', href: 'https://www.figma.com/design/M2WdMhxNjcPGODYaGeBchT/Lottogram-UI?node-id=1328-2510' }],
    brief: [
      'A betting and lottery platform is one of the most crowded products you can design. Odds, bet slips, wallets, live events, loyalty schemes and promotions are all fighting for attention.',
      'Lottogram brings all of that under control and turns it into a bold, confident experience that feels consistent and trustworthy, whether a player is at home on a desktop or placing a bet on their phone.',
    ],
    problem: {
      statement: 'Odds, bet history, wallets and live events are hard to make easy to scan and trustworthy, and even harder to keep consistent between desktop and mobile.',
      goal: 'Build a bold, consistent platform on a single design system that works on a wide desktop layout and scales down to a focused mobile one.',
      audience: 'Casual players looking for promotions, and serious bettors who keep a close eye on odds, their history and their wallet, on whatever device they happen to be using.',
      quote: 'In betting, the interface is where trust comes from. It has to feel just as confident on a phone in your hand as it does on a desktop at home.',
    },
    research: {
      summary: 'Betting users are impatient but also want lots of detail, and they expect desktop and mobile to work in exactly the same way. That’s why I designed the two layouts side by side rather than one after the other.',
      compare: {
        before: { label: 'Typical betting apps', items: ['Cluttered screens that bury odds and the bet slip', 'Desktop and mobile that feel like different products', 'Wallets and history that are hard to trust at a glance'] },
        after: { label: 'The opportunity', items: ['A red-and-gold system that guides the eye to what matters', 'One design language scaled across desktop and mobile', 'Clear wallet, bet history and loyalty built for confidence'] },
      },
      personas: [
        { icon: '🎰', name: 'The Casual Player', role: 'Primary · plays for fun', traits: ['Mobile-first', 'Promo-driven', 'Impulsive'], quote: 'Show me what’s hot, let me grab a bonus, and make placing a bet feel effortless.' },
        { icon: '📊', name: 'The Serious Bettor', role: 'Secondary · tracks everything', traits: ['Data-hungry', 'Desktop power user', 'Methodical'], quote: 'I live in my bet history and wallet - I need detail, accuracy and fast switching.' },
        { icon: '📡', name: 'The Live Bettor', role: 'Tertiary · in-play', traits: ['Real-time', 'On the go', 'Reactive'], quote: 'When an event is live, every second counts - the odds and slip have to keep up.' },
      ],
      insights: [
        { icon: '🎁', title: 'Promos front and centre', text: 'Casual players miss offers when there’s too much going on, so bold promotions and games come first.' },
        { icon: '🧾', title: 'Structured money', text: 'A wallet where your bet and BetBuilder history are laid out so you can scan them quickly, instead of having to hunt for things.' },
        { icon: '⚡', title: 'Live, on both devices', text: 'A live events layout that’s tuned separately for a wide desktop screen and for a phone.' },
      ],
    },
    structure: {
      flow: ['Home', 'Games / Live', 'Bet slip', 'Wallet', 'Bet history'],
      note: 'I designed the same structure twice, side by side: a wide desktop layout with a sidebar that folds away, and a focused mobile layout. Both are built from one shared set of components.',
      ia: [
        { icon: '🎮', title: 'Play', text: 'Home · games · live events' },
        { icon: '🎁', title: 'Engage', text: 'Promotions · affiliate · messages' },
        { icon: '👛', title: 'My Wallet', text: 'Balance · loyalty · bonuses' },
        { icon: '📈', title: 'History', text: 'Bet · BetBuilder · my info' },
      ],
    },
    system: {
      summary: 'A bold red base, lit up with gold for winnings and value, and grounded with deep navy and clean neutrals. Spacing follows a strict scale, with gaps from 4 to 80 and padding from 20 to 80, so even busy screens stay tidy on both devices.',
      colors: [
        { hex: '#CE0D05', name: 'Red' }, { hex: '#6D1010', name: 'Red - deep' }, { hex: '#150000', name: 'Background' },
        { hex: '#EFBF04', name: 'Gold' }, { hex: '#BE990C', name: 'Gold - deep' }, { hex: '#61D28F', name: 'Win green' },
        { hex: '#0088CC', name: 'Info blue' }, { hex: '#060B2A', name: 'Navy' }, { hex: '#2E3FA1', name: 'Indigo' }, { hex: '#A8A8A8', name: 'Muted' },
      ],
      fonts: [{ name: 'Lexend', use: 'Built for reading proficiency - keeps a data-heavy interface legible at 12-36pt' }],
    },
    screens: [
      { label: 'Desktop', orientation: 'landscape', shots: shots('/Images/projects/lottogram', [
        ['Desktop - Home - Unfolded', 'Home'], ['Desktop - Games - Folded', 'Games (sidebar folded)'], ['Desktop - Live Events - Unfolded', 'Live events'],
        ['Desktop - Promotions - Unfolded', 'Promotions'], ['Desktop - My Profile - My Wallet - Unfolded', 'My wallet'],
        ['Desktop - My Profile - My Wallet - Bet History - Unfolded', 'Bet history'], ['Desktop - Messages - Unfolded', 'Messages'], ['Desktop - Affiliate - Unfolded', 'Affiliate'],
      ]) },
      { label: 'Mobile', orientation: 'portrait', shots: shots('/Images/projects/lottogram/Mobile', [
        ['Mobile - Home', 'Home'], ['Mobile - Games', 'Games'], ['Mobile - Live Events', 'Live events'], ['Mobile - Promotions', 'Promotions'],
        ['Mobile - My Profile - My Wallet', 'My wallet'], ['Mobile - My Profile - My Wallet - Bet History', 'Bet history'], ['Mobile - Message', 'Messages'], ['Mobile - Affiliate', 'Affiliate'],
      ]) },
    ],
    interactions: [
      { icon: '↔️', title: 'Foldable desktop sidebar', text: 'Experienced users can fold the navigation away to make more room for odds and history, or open it up when they’re browsing.' },
      { icon: '👛', title: 'Wallet & loyalty', text: 'Your balance, bonuses, loyalty points and bet and BetBuilder history all live together in one wallet that’s built to feel trustworthy, and it works the same way on both devices.' },
      { icon: '📱', title: 'Desktop ↔ mobile parity', text: 'Because both layouts share the same components, a bet you start on your desktop and finish on your phone never feels unfamiliar.' },
    ],
    outcome: {
      metrics: [{ value: '30+', label: 'Screens designed' }, { value: '2', label: 'Layouts on one system' }, { value: '9', label: 'Product areas' }],
      summary: 'A complete iGaming design covering Home, Games, Live Events, Promotions, Wallet, Bet and BetBuilder history, Loyalty, Messages and Affiliate, for both desktop and mobile.',
      challenge: 'Keeping a product packed with data bold but still trustworthy, and making sure two very different layouts stayed in step using one set of components.',
      learned: 'Designing desktop and mobile at the same time keeps the design system honest, and a strict spacing and type scale is what holds the two together.',
      next: 'Handing over to engineering, prototyping the live in-play interactions, and adding a tablet layout and more types of games.',
    },
  },
  /* ─────────────────────────────── LYCEUM CAMPUS ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'lycampus',
    title: 'Lyceum Campus',
    tagline: 'A redesign of a university’s website, which is its digital front door. Getting to what you need used to take seven clicks, and now it takes three.',
    kicker: 'UI/UX Case Study · Website Redesign',
    cover: '/Images/projects/lyceum/cover.webp',
    accent: '#5b8fe0',
    accent2: '#7fd6ff',
    facts: [
      { label: 'Role', value: 'UI/UX Designer · UX Researcher' },
      { label: 'Timeline', value: '6 weeks · 2024' },
      { label: 'Type', value: 'University website redesign' },
      { label: 'Tools', value: 'Figma · Adobe Illustrator' },
      { label: 'Research', value: 'Benchmarking · interviews · usability tests' },
      { label: 'Platform', value: 'Responsive web' },
    ],
    links: [
      { label: 'Behance', href: 'https://www.behance.net/gallery/211863631/Lyceum-Campus-Web-Redesign' },
      { label: 'Figma file', href: 'https://www.figma.com/design/fIaLeCxJr8lNq84jOIo4U1/Lyceum-Campus?node-id=385-1328' },
    ],
    brief: [
      'A university’s website is often the first impression a future student gets. Lyceum Campus’s site wasn’t making a good one. Course information was buried under layers of menus, the layout broke on phones, and the whole look was years out of date.',
      'For the redesign, I stripped everything back to one question: what does a student actually need to find, and how quickly can they find it?',
    ],
    problem: {
      statement: 'Messy navigation, cluttered layouts and an unclear page structure meant students, parents and staff couldn’t find important academic information.',
      goal: 'Make the site much easier to get around, make it accessible for people of all ages and strengthen the brand, with the aim of cutting the time it takes to find information by 60%.',
      audience: 'Current students (18-26), future applicants and their parents (16-50), and teaching and admin staff, all of whom have very different levels of comfort with technology.',
      quote: 'Students were spending 4 to 7 minutes finding basic course information, which should take less than 30 seconds.',
    },
    research: {
      summary: 'Before designing anything, I compared the site against five local and international university websites, chatted informally with current students and watched people use the site. That brought up patterns I never would have found by guessing.',
      compare: {
        before: { label: 'Where competitors failed', items: ['Dense, table-heavy layouts that overwhelm first visits', 'No hierarchy between primary and secondary content', 'Mobile pages that are desktop pages shrunk to fit'] },
        after: { label: 'Opportunities spotted', items: ['Card layouts with a clear CTA hierarchy', 'Progressive disclosure - essentials first, detail on demand', '"Quick access" zones for the most-searched content'] },
      },
      personas: [
        { icon: '🎓', name: 'Kavya Perera, 18', role: 'Primary · prospective student', traits: ['Mobile-first', 'Impatient', 'Visual learner'], quote: 'I just want to know what courses you have, how much they cost, and when intake starts.' },
        { icon: '💼', name: 'Mr. Silva, 48', role: 'Secondary · parent / sponsor', traits: ['Desktop user', 'Detail-oriented', 'Seeks trust'], quote: 'Is this a recognised degree? I need the full curriculum and the faculty credentials.' },
        { icon: '🏫', name: 'Dr. Fernando, 55', role: 'Tertiary · faculty / admin', traits: ['Quick access', 'Internal portals', 'Routine'], quote: 'I use the site purely to jump into the LMS or find calendar updates.' },
      ],
      insights: [
        { icon: '🔍', title: 'Thumb-friendly search', text: 'Students needed five or more taps just to find the fees. A quick search bar and large buttons fix that.' },
        { icon: '🔠', title: 'Readable trust', text: 'Parents found the text too small and couldn’t see the things that build trust, so I used a clear type structure, high contrast and full syllabus tables.' },
        { icon: '⚡', title: 'Staff quick links', text: 'Links for staff were hidden in the footer, so now a sticky bar at the top takes them straight to the LMS and webmail.' },
      ],
    },
    structure: {
      flow: ['Home', 'Browse courses', 'Course detail', 'Admissions', 'Contact / Apply'],
      note: 'On the old site, it took 5 to 7 clicks to reach the admissions contact. The new flow takes 3, and an "Apply Now" button is always visible at every step.',
      ia: [
        { icon: '🏛️', title: 'About', text: 'History · mission · leadership · campus' },
        { icon: '📚', title: 'Academics', text: 'Programmes · courses · faculties · calendar' },
        { icon: '📝', title: 'Admissions', text: 'Apply · fees · requirements · deadlines' },
        { icon: '🌐', title: 'Campus Life', text: 'Events · clubs · facilities · gallery' },
      ],
    },
    system: {
      summary: 'I built a new identity from scratch that balances academic tradition with modern accessibility. It uses an institutional blue on light, airy pale-blue backgrounds, with black text for the strongest possible contrast.',
      colors: [
        { hex: '#285BA2', name: 'Lyceum blue' }, { hex: '#E5EBF3', name: 'Pale surface' },
        { hex: '#000000', name: 'Text' }, { hex: '#FFFFFF', name: 'Background' },
      ],
      fonts: [{ name: 'Poppins', use: 'One family for headings and body - clear hierarchy, readable for every age group' }],
    },
    screens: [
      { orientation: 'landscape', shots: shots('/Images/projects/lyceum', [
        ['Home 1', 'Home'], ['Events 1', 'Events & news'], ['Inside Event 1', 'Event detail'], ['Inside a Programme 1', 'Programme'],
        ['Student Life 1', 'Campus life'], ['Our Story --_ About Us 1', 'Our story'], ['Our Story --_ Leadership & Governance 1', 'Leadership'],
        ['Our Story --_ Partners 1', 'Global partners'], ['Man Faculty Page_ Faculty Of Education 1', 'Faculty page'],
      ]) },
    ],
    interactions: [
      { icon: '✨', title: 'Button feel', text: 'The main buttons have a springy bounce when you hover over them. It’s a subtle press effect that shows they’re clickable without being distracting.' },
      { icon: '🌊', title: 'Page transitions', text: 'Content fades up into place one piece after another, a bit like a building revealing itself as you walk through it.' },
      { icon: '🎨', title: 'Colour psychology', text: 'Navy and blue suggest trust and authority, and cyan highlights add some energy. Together they avoid the sterile white and grey you see on most institutional websites.' },
    ],
    outcome: {
      metrics: [{ value: '3 clicks', label: 'To admissions info (down from 7)' }, { value: '94%', label: 'Task completion in usability testing' }, { value: '9', label: 'Key page templates' }],
      quote: 'People in the testing sessions described it as "clean", "professional" and "easy to use", and several of them said they wished their own university’s website worked this well.',
      summary: 'A complete responsive redesign covering the home page, programmes, faculties, events, campus life and the "Our Story" pages, all checked through usability testing.',
      challenge: 'Serving three groups of people with very different levels of tech confidence through one navigation, without hiding anything any of them need.',
      learned: 'Test with real users, not just other designers. Even the difference between "Programmes" and "Courses" confused people, and changing one word made things noticeably easier to find.',
      next: 'Running A/B tests on card and list layouts for courses, using design tokens right from the start, and looking into personalised programme suggestions.',
    },
  },

  /* ─────────────────────────────── MESSAGING PLATFORM ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'messaging-system',
    title: 'Messaging Platform',
    tagline: 'A dashboard that takes a complicated multi-channel messaging system and turns it into one calm, easy-to-use control centre.',
    kicker: 'UI/UX Case Study · SaaS Dashboard',
    cover: '/Images/projects/msg_platform/cover.webp',
    accent: '#11b157',
    accent2: '#dda82a',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Product Designer' },
      { label: 'Type', value: 'SaaS dashboard · Web app' },
      { label: 'Tools', value: 'Figma' },
      { label: 'Screens', value: '40+ high-fidelity' },
      { label: 'Security', value: '2FA · scoped API tokens' },
      { label: 'Platform', value: 'Responsive web' },
    ],
    links: [{ label: 'Figma file', href: 'https://www.figma.com/design/MlHC1coJqFScsx4AifaKZl/Messaging-Platform-UI?node-id=74-5445' }],
    brief: [
      'Sending a message is easy, but running the system behind it isn’t. Services, channels, message parameters, API keys, delivery logs and billing all need a home somewhere.',
      'This platform brings all of that together in one dashboard, where developers and teams can set things up, send messages and keep an eye on everything with confidence.',
    ],
    problem: {
      statement: 'Setting up services, building parameters, managing keys and reading logs were spread all over the place and felt intimidating, so routine setup turned into a constant stream of support requests.',
      goal: 'Build one clear dashboard with guided service setup, an easy-to-understand parameter builder, secure tokens, and logs and billing that are easy to read.',
      audience: 'Developers connecting through the API, team admins managing services and access, and business owners keeping track of usage and spending.',
      quote: 'The hardest part of a messaging platform isn’t sending the message. It’s making the system behind it feel simple.',
    },
    research: {
      summary: 'Three very different kinds of user share the product. Developers live in tokens and logs, admins look after services and access, and owners keep an eye on spending. The design separates the powerful features from the simple ones without splitting the product in two.',
      compare: {
        before: { label: 'Typical dashboards', items: ['Dense, developer-only UIs that intimidate teams', 'Multi-step setup with no guidance or feedback', 'Security and billing treated as afterthoughts'] },
        after: { label: 'The opportunity', items: ['Guided onboarding and service-creation wizards', 'A visual parameter builder for text, image and link', 'First-class 2FA and transparent billing'] },
      },
      personas: [
        { icon: '👨‍💻', name: 'The Developer', role: 'Primary · integrator', traits: ['API-driven', 'Detail-oriented', 'Efficiency'], quote: 'Give me clean tokens, clear docs and readable logs - I’ll handle the rest.' },
        { icon: '🛠️', name: 'The Team Admin', role: 'Secondary · operator', traits: ['Governance', 'Configures', 'Security'], quote: 'I set up services and channels, and access and security have to be airtight.' },
        { icon: '📈', name: 'The Business Owner', role: 'Tertiary · stakeholder', traits: ['Cost-aware', 'Big picture', 'Occasional'], quote: 'I just want to see what we’re sending and what it’s costing - clearly.' },
      ],
      insights: [
        { icon: '🔑', title: 'One developer hub', text: 'Tokens, logs and documentation are all in one place, instead of being spread across different tools.' },
        { icon: '🧭', title: 'Wizards for setup', text: 'Services are created step by step with two-factor authentication, which helps admins who previously had no guidance at all.' },
        { icon: '💳', title: 'Billing at a glance', text: 'Billing and pricing are clear, and usage is easy to see instead of being tucked away.' },
      ],
    },
    structure: {
      flow: ['Login + 2FA', 'Dashboard', 'Create service', 'Add parameters', 'Token & send'],
      note: 'Setting up a service and building parameters are both guided wizards that finish with a clear success screen. Complicated setup feels like working through a checklist rather than finding your way through a maze.',
      ia: [
        { icon: '⚙️', title: 'Services', text: 'All · new · channels · OTP' },
        { icon: '🧩', title: 'Parameters', text: 'Text · image · link' },
        { icon: '🔑', title: 'Tokens & Logs', text: 'API keys · delivery logs' },
        { icon: '💳', title: 'Billing & Docs', text: 'Pricing · billing · documentation' },
      ],
    },
    system: {
      summary: 'Instrument Sans paired with a wide but carefully controlled palette. Calm sage neutrals and deep green give the structure, while warm, bold accent colours are kept for labelling channels, statuses and states.',
      colors: [
        { hex: '#22604F', name: 'Deep green' }, { hex: '#11B157', name: 'Success' }, { hex: '#9CAFAA', name: 'Sage' },
        { hex: '#D6DAC8', name: 'Stone' }, { hex: '#FBF3D5', name: 'Cream' }, { hex: '#DDA82A', name: 'Amber' },
        { hex: '#C45A3D', name: 'Terracotta' }, { hex: '#D02F44', name: 'Error' }, { hex: '#920066', name: 'Plum' },
      ],
      fonts: [{ name: 'Instrument Sans', use: 'A contemporary grotesque with an even rhythm - keeps dense, data-heavy tables readable' }],
    },
    screens: [
      { orientation: 'landscape', shots: shots('/Images/projects/msg_platform', [
        ['Login', 'Login'], ['2fa Select', '2FA verification'], ['Dashboard', 'Dashboard'], ['Services --_ All', 'Services'],
        ['Services --_ New Service --_ Select Service', 'New service'], ['Services --_ Onboarding --_ Welcome', 'Onboarding'],
        ['Parameters', 'Parameters'], ['Prameters--_ New Parameter--_ Parameter Info add', 'Parameter builder'],
        ['Tokens', 'API tokens'], ['Logs', 'Logs'], ['Documentation', 'Documentation'], ['Billing and Pricing --_ Billing details', 'Billing'],
      ]) },
    ],
    interactions: [
      { icon: '🧭', title: 'Guided wizards', text: 'Setting up a service and creating parameters are broken into steps, and each one finishes with a clear success screen.' },
      { icon: '🧩', title: 'Visual parameter builder', text: 'You add text, image and link parameters and preview them visually, which turns a fiddly setup task into something you can actually see.' },
      { icon: '🔒', title: 'Security by default', text: 'Two-factor authentication, tokens with limited access and clear confirmation steps before disabling anything make sensitive actions feel deliberate and safe.' },
    ],
    outcome: {
      metrics: [{ value: '40+', label: 'Screens designed' }, { value: '2FA', label: 'Security-first flows' }, { value: '8', label: 'Product areas' }],
      summary: 'A consistent SaaS design system covering login, services, parameters, tokens, logs, documentation, billing and settings.',
      challenge: 'Meeting the needs of developers, admins and owners in one product without overwhelming any of them, across dozens of multi-step flows.',
      learned: 'In complicated tools, the biggest wins come from the wizards and from the empty, success and error states. A wide colour palette only works if it follows strict rules.',
      next: 'Handing over to engineering, adding more detailed analytics to the dashboard, and building team roles and permissions on top of the two-factor authentication.',
    },
  },

  /* ─────────────────────────────── KYC ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'kyc',
    title: 'KYC Verification',
    tagline: 'Identity verification redesigned as a calm, guided journey, in both light and dark themes.',
    kicker: 'UI/UX Case Study · Fintech Flow',
    cover: '/Images/projects/kyc/cover.webp',
    accent: '#8bb7ff',
    accent2: '#7edce2',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Product Designer' },
      { label: 'Type', value: 'Fintech · multi-step flow' },
      { label: 'Tools', value: 'Figma' },
      { label: 'Flow', value: '4 steps · every state' },
      { label: 'Themes', value: 'Light & dark' },
      { label: 'Platform', value: 'Responsive web' },
    ],
    links: [{ label: 'Figma file', href: 'https://www.figma.com/design/4rJcjETLUrlp2fwFtKmoOt/KYC-Verification?node-id=0-1' }],
    brief: [
      'KYC is where good onboarding usually falls apart. There are long forms, blurry document uploads, nerve-racking face scans and no real idea whether any of it actually worked.',
      'This flow turns verification into a guided journey that tells you exactly what to do and what’s happening at every step.',
    ],
    problem: {
      statement: 'Verification matters a lot and asks a lot of people. Unclear steps, document and face capture that fail easily, and no feedback about what’s happening all make people anxious and cause them to give up.',
      goal: 'Create a guided, transparent flow with preparation at the start, capture steps that forgive small mistakes, clear in-progress, success and error states, and full light and dark themes.',
      audience: 'People going through verification for the first time, often on their phones, and the compliance teams who rely on clean, reliable captures.',
      quote: 'Verification only works when people trust it. Every step has to tell them what to do, and be honest about whether it worked.',
    },
    research: {
      summary: 'KYC sits between someone who just wants it over with and a compliance process that needs everything to be accurate. The design lowers people’s anxiety without lowering the quality of what gets captured.',
      compare: {
        before: { label: 'Typical KYC flows', items: ['Every requirement dumped at once', 'Silent capture - no progress, success or error feedback', 'One rigid theme that fights the host app'] },
        after: { label: 'The opportunity', items: ['A preparation screen before each step', 'Live status for every upload and scan', 'First-class light and dark themes'] },
      },
      personas: [
        { icon: '🪪', name: 'The New Applicant', role: 'Primary · first-time verifier', traits: ['Impatient', 'Privacy-aware', 'Anxious'], quote: 'Just tell me what to do at each step - and whether it actually worked.' },
        { icon: '📱', name: 'The Mobile User', role: 'Secondary · on the go', traits: ['Mobile-first', 'Camera-based', 'Distracted'], quote: 'I’m doing this on my phone - the uploads and face scan have to just work.' },
        { icon: '🛡️', name: 'The Compliance Lead', role: 'Tertiary · trust & risk', traits: ['Risk-aware', 'Process-driven', 'Auditable'], quote: 'We need clean captures and a clear pass / fail so verification holds up.' },
      ],
    },
    structure: {
      flow: ['Consent', 'Prepare', 'Upload documents', 'Face scan', 'Verified'],
      note: 'Every stage starts with a preparation screen that tells people what to expect, and ends with a clear result.',
      ia: [
        { icon: '📜', title: 'Step 1 · Consent', text: 'User consent · preparation · warnings' },
        { icon: '📄', title: 'Step 2 · Documents', text: 'Upload · in progress · confirm info' },
        { icon: '🤳', title: 'Step 3 · Face scan', text: 'Liveness · success · retry on fail' },
        { icon: '✅', title: 'Step 4 · Complete', text: 'Review · confirmation · done' },
      ],
    },
    system: {
      summary: 'Inter on a trustworthy blue base, with green, orange and red kept strictly for success, in progress and error, so the status is always obvious in both themes.',
      colors: [
        { hex: '#1E429F', name: 'Trust blue' }, { hex: '#8BB7FF', name: 'Blue - light' }, { hex: '#E4EFFF', name: 'Blue - surface' },
        { hex: '#020C23', name: 'Dark background' }, { hex: '#7EDCE2', name: 'Teal' }, { hex: '#008F0A', name: 'Success' },
        { hex: '#FF8800', name: 'In progress' }, { hex: '#D02F44', name: 'Error' }, { hex: '#666666', name: 'Muted' },
      ],
      fonts: [{ name: 'Inter', use: 'A neutral, screen-first face - dense verification steps stay clear at every size' }],
    },
    screens: [
      { label: 'Dark', orientation: 'landscape', shots: shots('/Images/projects/kyc', [
        ['Dark- Home --_ User Consent', 'Consent'], ['Dark- Step 1 - Proceed', 'Step 1 · proceed'], ['Dark- Step 2 - Default', 'Step 2 · documents'],
        ['Dark- Step 2 - info confirm', 'Step 2 · confirm info'], ['Dark- Step 3 - Scan Face', 'Step 3 · face scan'], ['Dark- Step 3 - Scan Face Success Step', 'Step 3 · success'],
      ]) },
      { label: 'Light', orientation: 'landscape', shots: shots('/Images/projects/kyc', [
        ['Light- Home', 'Home'], ['Light- Step 1 - Preperation', 'Step 1 · prepare'], ['Light- Step 2 - Before Select', 'Step 2 · upload'],
        ['Light- Step 2 - Complete', 'Step 2 · complete'], ['Light- Step 3 - Scan Face', 'Step 3 · face scan'], ['Light- Step 4 - Preperation', 'Step 4 · final'],
      ]) },
    ],
    interactions: [
      { icon: '🚦', title: 'Live status states', text: 'Every upload and scan shows whether it’s in progress, successful or has failed, and the colours make it instantly clear whether it passed, is still waiting or needs another try.' },
      { icon: '🧭', title: 'Preparation first', text: 'Each step starts with a calm preparation screen, so people know what they’ll need before the camera turns on.' },
      { icon: '🌓', title: 'Light & dark parity', text: 'The entire flow is designed twice, matched pixel for pixel, so it feels at home inside any app that uses it.' },
    ],
    outcome: {
      metrics: [{ value: '4', label: 'Guided steps' }, { value: '2', label: 'Themes, every state' }, { value: '3', label: 'Status states per capture' }],
      summary: 'A complete verification system with a clear four-step journey and obvious status at every point, designed in light and dark for every preparation, capture, success and error screen.',
      challenge: 'Covering every possible state, whether in progress, error, retry or success, without cluttering the smooth path, and keeping all of it consistent across two themes.',
      learned: 'In verification, the moments where things go wrong are the real product. Designing errors and retries carefully is what stops people from giving up.',
      next: 'Handing over to engineering, doing accessibility reviews of the camera steps, and supporting more document types and countries.',
    },
  },
  /* ─────────────────────────────── 747 AGENT ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'agent-system',
    title: '747 Agent Back-Office',
    tagline: 'A console for managing agents and players across several levels of an iGaming operation, designed in both dark and light.',
    kicker: 'UI/UX Case Study · Back-Office Dashboard',
    cover: '/Images/projects/agent/cover.webp',
    accent: '#a4cafe',
    accent2: '#f08a43',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Product Designer' },
      { label: 'Type', value: 'iGaming back-office' },
      { label: 'Tools', value: 'Figma · Token system' },
      { label: 'Screens', value: '60+ high-fidelity' },
      { label: 'Themes', value: 'Dark & light' },
      { label: 'Platform', value: 'Desktop web app' },
    ],
    links: [{ label: 'Figma file', href: 'https://www.figma.com/design/97C6QDeuzBbUyRGR7rDrE3/Agent-Dashboard?node-id=69-7085' }],
    brief: [
      '747 Agent is the control room behind a sports betting, e-sports and online casino platform. It’s where a network of agents at several levels manage player accounts, credit lines, transfers and commissions.',
      'My job was to make a financial back-office full of data feel calm, easy to scan and trustworthy, in two complete themes.',
    ],
    problem: {
      statement: 'When you put an agent hierarchy, money and reporting into one console, it can quickly become a wall of tables that’s slow to read and easy to misread.',
      goal: 'Build a calm system where the agent tree, balances and reports can be understood at a glance, using one set of tokens that works in both dark and light.',
      audience: 'Master agents who manage the agents below them and their credit, sub-agents who run their own players, and operations admins who keep an eye on reports and compliance.',
      quote: 'In a financial back-office, clarity is the most important feature. If an operator misreads a balance or a credit line, real money is at stake.',
    },
    research: {
      summary: 'The three types of user sit at different levels of the same tree and need the same data shown in different ways, whether that’s the agents below them and their credit, their own players, or reports for the whole platform. A lot of them work long shifts and switch themes to stay comfortable.',
      compare: {
        before: { label: 'Typical back-offices', items: ['Flat tables with no hierarchy or grouping', 'Money figures and statuses that all look the same', 'A dark theme bolted on later that breaks contrast'] },
        after: { label: 'The opportunity', items: ['An expandable agent tree with clear roles and indentation', 'Colour-coded metric chips for deposits, bets, wins and tax', 'One token system with dark and light parity from day one'] },
      },
      personas: [
        { icon: '👑', name: 'The Master Agent', role: 'Primary · runs a downline', traits: ['Credit-focused', 'Power user', 'All-day shifts'], quote: 'I need to see my whole tree - who owes what, who’s earning - and move credit down the line fast.' },
        { icon: '🧑‍💼', name: 'The Sub-Agent', role: 'Secondary · manages players', traits: ['Player-first', 'Commission-driven', 'Practical'], quote: 'Show me my players, my balance and my commission - and let me transfer money without a manual.' },
        { icon: '🛡️', name: 'The Operations Admin', role: 'Tertiary · oversight & reports', traits: ['Compliance', 'Report-heavy', 'Detail-oriented'], quote: 'I live in reports. I need to filter, export and trust the numbers.' },
      ],
      insights: [
        { icon: '🌳', title: 'See the hierarchy', text: 'An agent tree you can expand, with columns for credit, balance and commission.' },
        { icon: '👛', title: 'Money in one place', text: 'A focused wallet, a transfer flow and a player table for sub-agents.' },
        { icon: '📑', title: 'Reports you can work', text: 'Every report view has search, filters, saving and exporting.' },
      ],
    },
    structure: {
      flow: ['Login', 'Dashboard', 'Agent tree', 'Transfer & commission', 'Reports'],
      note: 'The agent tree is the backbone of the whole product. Agent Manager and Agent rows expand and collapse, and each one shows its currency, direct players, credit line, total available, balance, and available and pending commission. Every other screen connects back to a point in this tree.',
      ia: [
        { icon: '📊', title: 'Overview', text: 'Dashboard · stats · profit · top bets & players' },
        { icon: '🌳', title: 'Hierarchy', text: 'Network · agent tree · add users' },
        { icon: '👥', title: 'Players', text: 'Players · blocked · accounts · logs' },
        { icon: '💰', title: 'Finance & Reports', text: 'Wallet · transfer · commission · reports' },
      ],
    },
    system: {
      summary: 'Slate and navy backgrounds brightened with a soft blue accent, with indigo, orange, red, pink and green used for gentle metric labels. Every colour comes as a matching pair of tokens, so dark #374151 surfaces map to light #F2F3F7.',
      colors: [
        { hex: '#1F2A37', name: 'Dark surface' }, { hex: '#374151', name: 'Dark card' }, { hex: '#233876', name: 'Navy' },
        { hex: '#A4CAFE', name: 'Accent blue' }, { hex: '#F2F3F7', name: 'Light surface' }, { hex: '#B51C85', name: 'Chip - magenta' },
        { hex: '#F08A43', name: 'Chip - orange' }, { hex: '#CE3131', name: 'Chip - red' }, { hex: '#D2E5FF', name: 'Chip - blue' },
      ],
      fonts: [{ name: 'Inter', use: 'UI-grade sans for dense tables and 12-14px labels - Regular to Black' }],
    },
    screens: [
      { label: 'Dark', orientation: 'landscape', shots: shots('/Images/projects/agent/dark', [
        ['Dashboard - Dark', 'Dashboard'], ['Agent Tree - Dark', 'Agent tree'], ['Players - Dark', 'Players'],
        ['Reports --_ Sport Bets - Dark', 'Reports · sport bets'], ['Transactions - Dark', 'Transactions'], ['Agents - Dark', 'Agents'],
      ]) },
      { label: 'Light', orientation: 'landscape', shots: shots('/Images/projects/agent/Light', [
        ['Dashboard - Light', 'Dashboard'], ['Agent Tree - Light', 'Agent tree'], ['Players - Light', 'Players'],
        ['Reports --_ Sport Bets - Light', 'Reports · sport bets'], ['Transaction - Lght', 'Transactions'], ['Agents - Light', 'Agents'],
      ]) },
    ],
    interactions: [
      { icon: '🌳', title: 'The agent tree', text: 'Indentation, status dots and credit, balance and commission on every row make a whole network of agents easy to read at a glance.' },
      { icon: '🏷️', title: 'Metric chips', text: 'Deposits, bets, wins, tax, bonuses and commission appear as soft coloured labels, so you can scan them quickly instead of hunting through numbers.' },
      { icon: '🌓', title: 'Dark & light parity', text: 'Both themes were designed together using paired tokens, so contrast and the meaning of each colour stay exactly the same.' },
    ],
    outcome: {
      metrics: [{ value: '60+', label: 'Screens designed' }, { value: '2', label: 'Complete themes' }, { value: '4', label: 'Product areas' }],
      quote: 'A financial back-office packed with data that finally feels calm, with one token system and two complete themes.',
      summary: 'A complete agent back-office with a live financial dashboard, an expandable agent tree, player and account management, a wallet and transfers, commission plans and a full set of reports.',
      challenge: 'Keeping dozens of busy, table-heavy screens easy to scan and consistent, with proper contrast in both themes.',
      learned: 'In a financial tool, holding back is the design. Paired tokens, careful use of colour and one strong structure work better than visual flourishes.',
      next: 'Handing the tokens over to engineering, prototyping how the tree expands and how transfers work, and testing the tables with large amounts of data.',
    },
  },

  /* ─────────────────────────────── ZUSE LMS ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'lms',
    title: 'ZUSE Corporate LMS',
    tagline: 'Corporate training redesigned as a premium learning experience built around cards.',
    kicker: 'UI/UX Case Study · EdTech SaaS',
    cover: '/Images/projects/LMS/cover.webp',
    accent: '#3f83f8',
    accent2: '#07b4ba',
    facts: [
      { label: 'Role', value: 'Lead UI/UX Designer · UX Researcher' },
      { label: 'Timeline', value: '8 weeks · 2024' },
      { label: 'Type', value: 'Corporate LMS · Web SaaS' },
      { label: 'Tools', value: 'Figma · Adobe Illustrator' },
      { label: 'Research', value: 'Benchmarking · observation' },
      { label: 'Platform', value: 'Responsive web' },
    ],
    links: [
      { label: 'Behance', href: 'https://www.behance.net/gallery/199770923/ZUSE-Cooperate-LMS-UI' },
      { label: 'Figma file', href: 'https://www.figma.com/design/Q6NuDc8wpRvIlUe3xndrLa/Cooperate-LMS?node-id=0-1&t=322WWMLNiS7VZs9c-1' },
    ],
    brief: [
      'Older LMS platforms are where professional growth tends to stall. Cluttered dashboards, confusing navigation and the same learning path for everyone end up frustrating the very people they’re supposed to help.',
      'ZUSE swaps all that bureaucracy for a smooth, card-based interface that treats corporate training like a premium digital product.',
    ],
    problem: {
      statement: 'Outdated page structures and cluttered dashboards were pushing busy professionals and senior staff to give up on training they were required to complete.',
      goal: 'Increase course engagement by 50% by showing information gradually and building an intuitive, card-based dashboard.',
      audience: 'Busy professionals (25-55), company administrators, and HR managers who need a simple way to track compliance.',
      quote: 'Employees were spending 6 to 9 minutes just finding basic course information, and many gave up before they’d even started learning.',
    },
    research: {
      summary: 'Comparing five corporate training platforms showed that they kept adding features at the cost of being efficient. When I watched people use them, they got lost in menus trying to do the simplest thing, which was to carry on with a course.',
      compare: {
        before: { label: 'Legacy LMS failures', items: ['Dense, table-heavy layouts with no visual relief', 'Sidebars with 15+ top-level links', 'Poor mobile support and broken session persistence'] },
        after: { label: 'The opportunity', items: ['Progressive disclosure of course material', 'Personal metrics surfacing "Next up" immediately', 'Quick access to certificates and achievements'] },
      },
      personas: [
        { icon: '🏃‍♂️', name: 'Kusum Perera, 28', role: 'Primary · busy professional', traits: ['Mobile-first', 'Impatient', 'Achiever'], quote: 'I need to finish a module on my commute and know exactly where I left off.' },
        { icon: '💼', name: 'Damith Wickramasinghe, 45', role: 'Secondary · division manager', traits: ['Desktop user', 'Compliance-focused', 'Busy'], quote: 'I need to track certifications for my whole team without digging through nested reports.' },
        { icon: '🛠️', name: 'Dilshan Ratnayake, 34', role: 'Tertiary · HR system admin', traits: ['Quick access', 'Batch editor', 'Internal support'], quote: 'I spend half my day helping people find hidden course library links.' },
      ],
      insights: [
        { icon: '▶️', title: '"Resume now" first', text: 'Learners needed five or more clicks to continue a course, so a big "Resume" button at the top of the page fixes that.' },
        { icon: '📊', title: 'Visual compliance', text: 'Managers get progress bars and red-flag alerts instead of dense reports.' },
        { icon: '🧰', title: 'One action bar', text: 'Admins get one combined action bar for making bulk changes, and it works the same way across every view.' },
      ],
    },
    structure: {
      flow: ['Login', 'Dashboard', 'Course hub', 'Learning player', 'Certification'],
      note: 'I condensed 12 old menu items into 5 dashboard categories, which cuts navigation by about 40%. The main idea behind the design was remembering where each learner was across sessions.',
      ia: [
        { icon: '🏠', title: 'Dashboard', text: 'Overview · progress · recent · achievements' },
        { icon: '📚', title: 'Library', text: 'Courses · catalogue · categories · recommendations' },
        { icon: '📈', title: 'Analytics', text: 'Reports · stats · benchmarks · team tracking' },
        { icon: '👤', title: 'Account', text: 'Profile · settings · notifications · help' },
      ],
    },
    system: {
      summary: 'A high-contrast palette of deep blue with turquoise highlights that feels professional but lively, with soft tinted backgrounds that give heavy course content some breathing room.',
      colors: [
        { hex: '#1C64F2', name: 'Primary blue' }, { hex: '#047481', name: 'Teal' }, { hex: '#07B4BA', name: 'Turquoise' },
        { hex: '#8458CC', name: 'Violet' }, { hex: '#D03801', name: 'Alert orange' }, { hex: '#EBF5FF', name: 'Blue tint' },
        { hex: '#EDFAFA', name: 'Teal tint' }, { hex: '#FFF8F1', name: 'Warm tint' }, { hex: '#FFFFFF', name: 'Background' },
      ],
      fonts: [{ name: 'SF Pro Display', use: 'Crisp, familiar system type that keeps a content-heavy product calm and legible' }],
    },
    screens: [
      { label: 'Product', orientation: 'landscape', shots: shots('/Images/projects/LMS', [
        ['Login', 'Login'], ['Home', 'Dashboard'], ['Courses', 'Courses'], ['Course Overview', 'Course overview'], ['Course View', 'Learning player'], ['My Profile', 'Profile'],
      ]) },
      { label: 'Onboarding', orientation: 'landscape', shots: shots('/Images/projects/LMS', [
        ['User Onboarding - Account Info', '1 · Account info'], ['User Onboarding - Personal Info', '2 · Personal info'],
        ['User Onboarding - verify Confirmation', '3 · Verify'], ['User Onboarding - Confirmation', '4 · Done'],
      ]) },
    ],
    interactions: [
      { icon: '▶️', title: 'Resume where you left off', text: 'The dashboard opens with the course you’re in the middle of, so you can start a session on your commute with one tap.' },
      { icon: '🃏', title: 'Card-based library', text: 'Courses are shown as cards with your progress built in, and the full syllabus details sit one level down, only appearing when you want them.' },
      { icon: '🪜', title: 'Four-step onboarding', text: 'Account, personal details, verification and confirmation, each on its own simple, easy-to-follow screen.' },
    ],
    outcome: {
      metrics: [{ value: '3 clicks', label: 'To course discovery (down from 8)' }, { value: '98%', label: 'Onboarding completion (up from 42%)' }, { value: '12 → 5', label: 'Menu items to dashboard categories' }],
      quote: 'Professional doesn’t have to mean boring. Treating learners like premium customers boosted engagement across every age group.',
      summary: 'A complete LMS redesign covering login, the dashboard, the course catalogue, course overviews, the learning player, profiles and a four-step onboarding.',
      challenge: 'Cutting down an old navigation with 15 links without hiding anything that managers and admins rely on.',
      learned: 'Onboarding is the most important moment. Breaking it into four easy steps took away the anxiety people felt with older corporate systems.',
      next: 'Starting with a design system from day one next time. The card components already made it easy to grow the library in an organised way.',
    },
  },

  /* ─────────────────────────────── TECHNOSPHERE ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'technosphere',
    title: 'TECHNOSPHERE',
    tagline: 'The website for a university tech convention, bringing schedules, speakers, registration and a CTF portal together in one energetic interface.',
    kicker: 'UI/UX Case Study · Event Website',
    cover: '/Images/projects/technosphere/cover.webp',
    accent: '#7b6fff',
    accent2: '#38d9f5',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Product Designer' },
      { label: 'Client', value: 'FOSS Community, NSBM Green University' },
      { label: 'Timeline', value: '4 weeks · 2022' },
      { label: 'Tools', value: 'Figma · Adobe Illustrator' },
      { label: 'Platform', value: 'Responsive web, live site' },
      { label: 'Deliverables', value: 'Landing, CTF, registration, profiles, Q&A' },
    ],
    links: [
      { label: 'Live website', href: 'https://technosphere.fossnsbm.org/' },
      { label: 'Figma file', href: 'https://www.figma.com/file/LvdxN9OCg67try10dKlXWu/Technosphere-Website?type=design&node-id=98%3A7&mode=design' },
    ],
    brief: [
      'TECHNOSPHERE is a technical convention run by the FOSS Community of NSBM Green University. The 2022 event included talks, guest speakers, a webinar track and a capture-the-flag (CTF) competition, and it needed a website with just as much energy.',
      'I rebuilt the event’s online presence around one question. How do you make a fast-paced convention easy to follow for a competitor racing the clock, a speaker checking their time slot and a first-year student who just wants to know what’s going on right now?',
    ],
    problem: {
      statement: 'Attendees needed to get to schedules, speaker details and competition rules quickly, but most event websites bury them under clutter that falls apart on a phone in the middle of the event.',
      goal: 'Build an eye-catching, responsive site that grabs visitors as soon as they land, gets them registered either in person or online, and keeps the schedule, speakers and CTF just one tap away.',
      audience: 'Tech lovers, university students, lecturers and tech enthusiasts joining the sessions in person, through the webinar or in the CTF.',
      quote: 'The UI design played a big part in improving the whole experience, and it caught visitors’ attention from the moment they landed on the homepage.',
    },
    research: {
      summary: 'I looked at existing tech convention websites and the interaction patterns that keep people engaged during a fast-moving event. Then I looked at the three kinds of attendee who would be using the site on the day.',
      compare: {
        before: { label: 'Common event-site pitfalls', items: ['Cluttered landing pages that hide the Register button', 'Schedules that are unreadable on mobile during the event', 'Static, dull layouts that don’t reflect a tech event'] },
        after: { label: 'TECHNOSPHERE opportunities', items: ['An immersive, high-impact hero that hooks users instantly', 'Quick access to Schedule, Speakers and the CTF competition', 'A responsive design built for on-the-go use at the venue'] },
      },
      personas: [
        { icon: '💻', name: 'Tech Enthusiast', role: 'Primary · CTF competitor, 20-25', traits: ['Competitor', 'Mobile user', 'Detail-oriented'], quote: 'I need the CTF rules and leaderboard updates immediately. Every second counts.' },
        { icon: '🎤', name: 'Speaker / Faculty', role: 'Secondary · academic member, 35-50', traits: ['Professional', 'Schedule-focused', 'Resource-seeker'], quote: 'I want the full list of speakers and the session flow to make sure everything is on track.' },
        { icon: '🚀', name: 'General Attendee', role: 'Tertiary · student / newcomer, 18-22', traits: ['Explorer', 'Social', 'Visual learner'], quote: 'I’m here to learn and network. Show me what’s happening now and where I should go.' },
      ],
      insights: [
        { icon: '🏁', title: 'The CTF can’t be buried', text: 'Competitors waste time looking for the rules, so the CTF portal has its own link in the sticky navigation.' },
        { icon: '🕒', title: 'One source of truth for time', text: 'Speakers noticed that schedules didn’t match between screens and signs, so there’s now one schedule with clear time slots.' },
        { icon: '🃏', title: 'Cards over walls of text', text: 'Newcomers skim through pages, so sessions are shown as cards with a clear "happening now" label.' },
      ],
    },
    structure: {
      flow: ['Landing', 'Explore schedule', 'Speaker bios', 'CTF portal', 'Register / join'],
      note: 'I turned low-fidelity wireframes into a high-fidelity prototype based on feedback. There are two registration paths, one for people attending in person and one for webinar attendees, and each leads to its own profile view.',
      ia: [
        { icon: '🗓️', title: 'Event schedule', text: 'Session timings, tracks and breakout rooms.' },
        { icon: '🎤', title: 'Speakers', text: 'Profiles, topics and Q&A links.' },
        { icon: '🏁', title: 'CTF competition', text: 'Rules, challenges and the leaderboard.' },
        { icon: '📝', title: 'Registration', text: 'Separate registration flows for in-person and webinar attendees, each ending with a confirmation screen.' },
        { icon: '📺', title: 'Webinar & Q&A', text: 'A video player with a question thread right next to the stream.' },
        { icon: '📍', title: 'Venue info', text: 'Maps, directions and support.' },
      ],
    },
    system: {
      summary: 'The design focuses on simplicity, accessibility and good looks, with balanced white space, bold Poppins type, and a black background lit up by purple and cyan gradients that reflect innovation and the FOSS spirit.',
      colors: [
        { hex: '#000000', name: 'Black' },
        { hex: '#7B6FFF', name: 'Violet' },
        { hex: '#38D9F5', name: 'Cyan' },
        { hex: '#FFFFFF', name: 'White' },
      ],
      fonts: [{ name: 'Poppins', use: 'Headlines and body - bold weights for the event voice, regular for schedules and details.' }],
    },
    screens: [
      {
        orientation: 'landscape',
        shots: shots('/Images/projects/technosphere', [
          ['Landing', 'Landing page'],
          ['CTF Landing', 'CTF competition'],
          ['Register - Physical Attendee', 'Register · physical attendee'],
          ['Register - Webinar Attendee', 'Register · webinar attendee'],
          ['Register - Success Popup', 'Registration success'],
          ['Profile - Physical Attendee', 'Profile · physical attendee'],
          ['Profile - Webinar Attendee', 'Profile · webinar attendee'],
          ['Video-Player', 'Webinar video player'],
          ['Ask-Questions-home', 'Ask questions'],
          ['Ask-Questions-addcomment', 'Q&A · add a comment'],
        ]),
      },
    ],
    interactions: [
      { icon: '👆', title: 'Action and clarity', text: 'High-contrast buttons with strong hover effects keep sessions, registration and the CTF easy to get to.' },
      { icon: '📱', title: 'Tech everywhere', text: 'The layout adjusts for desktop, tablet and phone, so the schedule is just as easy to use at the venue as it is at a desk.' },
      { icon: '🌈', title: 'Gradient hierarchy', text: 'Violet to cyan gradients and bold type draw your eye to the highlights and to what’s coming up next.' },
      { icon: '💬', title: 'Live Q&A', text: 'Webinar attendees can ask and answer questions right next to the stream instead of switching to a separate tool.' },
    ],
    outcome: {
      metrics: [
        { value: '100%', label: 'responsive layout across all tested devices' },
        { value: '85%', label: 'reported increase in exploring event details' },
        { value: '4 weeks', label: 'from brief to a live site' },
      ],
      summary: 'Attendees spent more time looking through event details and joining sessions and the CTF, and people of every technical level found the site easier to get around. The consistent design also helped establish TECHNOSPHERE as a leading student tech event.',
      challenge: 'Fitting a lot of schedule information and a competition portal into an interface that still feels exciting, all within a four-week deadline before the event.',
      learned: 'People use event websites in short bursts, on their phones and under time pressure. Designing around "what’s happening right now" mattered more than any fancy animation on the homepage.',
      next: 'Continuing to gather feedback from attendees after every event, looking into personalised schedules, and updating the style guide as the event grows.',
    },
  },
  /* ───────────────────────────────── VEBUILD ───────────────────────────────── */
  {
    kind: 'design',
    slug: 'vebuild',
    title: 'VEBUILD',
    tagline: 'A clean, sleek website for a modern construction company, which I designed twice in two different directions.',
    kicker: 'UI/UX Case Study · Construction Website',
    cover: '/Images/projects/vebuild/cover.webp',
    accent: '#01a59e',
    accent2: '#1f394f',
    facts: [
      { label: 'Role', value: 'UI/UX Designer · Product Designer' },
      { label: 'Type', value: 'Self-initiated UI concept' },
      { label: 'Platform', value: 'Responsive web' },
      { label: 'Tools', value: 'Figma' },
      { label: 'Deliverables', value: '2 design directions, 20 screens' },
      { label: 'Published', value: 'Behance · Figma' },
    ],
    links: [
      { label: 'Behance (final)', href: 'https://www.behance.net/gallery/198713933' },
      { label: 'Figma (final)', href: 'https://www.figma.com/design/zwKbWePPKM1ujfCR418sg1?node-id=177-795' },
      { label: 'Behance (block UI)', href: 'https://www.behance.net/gallery/198687327' },
      { label: 'Figma (block UI)', href: 'https://www.figma.com/design/zwKbWePPKM1ujfCR418sg1?node-id=0-1' },
    ],
    brief: [
      'VEBUILD is a construction company with the projects and credentials to give clients real confidence, but its website didn’t reflect the quality of its work. Potential clients found it hard to browse the portfolio, learn about the company’s history and values, or find a clear way to get in touch.',
      'I designed the website in two directions. The first was a "block" concept that used modular cards and interactive tools to organise a lot of construction data. The final, refined direction kept that structure but made it cleaner and calmer, with more white space, bold type and the brand’s navy and teal colours, so the work itself could do the talking.',
    ],
    problem: {
      statement: 'The information was all there, but the experience didn’t have the polish, clarity and trust signals a modern construction client expects. Dense technical content and slow, heavy image galleries made the company hard to judge and hard to apply to.',
      goal: 'Make the portfolio easy to explore, bring the company’s history, certifications and sustainability work forward as reasons to trust it, give every visitor a simple way to get in touch, and keep everything accessible and responsive on every device.',
      audience: 'Property developers and commercial clients checking what the company can do, stakeholders and architects verifying its credentials, and people looking for jobs.',
      quote: 'People today expect more than just information. They want an experience that looks good and is easy to find their way around.',
    },
    research: {
      summary: 'I started by looking at how people actually judge a construction company online. They scan past projects for proof of quality, look for signs that the company can be trusted and want an easy way to get in touch. For the block concept, this was backed up by 32 interviews with construction professionals and an analysis of more than 150 user sessions. 73% of people struggled to find relevant case studies, image galleries on mobile took over 8 seconds to load, and 68% gave up on the careers page.',
      compare: {
        before: { label: 'Common construction-site pitfalls', items: ['Dense, text-heavy pages that bury the actual project work', 'Generic stock imagery that fails to prove real capability', 'Slow galleries and hidden contact paths that stall enquiries and applications'] },
        after: { label: 'VEBUILD opportunities', items: ['A visual-first, filterable portfolio that lets the work speak', 'Clear credibility cues - history, certifications, CSR and sustainability', 'Prominent, low-friction calls-to-action and a short application flow'] },
      },
      personas: [
        { icon: '🏗️', name: 'Property Developer', role: 'Primary · client / decision-maker', traits: ['Quality-focused', 'Time-poor', 'Risk-aware'], quote: 'I want to see proof of past work and know I can trust this team before I ever pick up the phone.' },
        { icon: '📐', name: 'Architect / Stakeholder', role: 'Secondary · technical partner', traits: ['Detail-driven', 'Process-minded', 'Visual'], quote: 'Lay out the credentials, scope and approach clearly - I shouldn’t have to dig.' },
        { icon: '💼', name: 'Job Candidate', role: 'Tertiary · applicant', traits: ['Career-focused', 'Mobile-first', 'Impatient'], quote: 'I want to understand the culture and apply quickly - not abandon a slow careers page.' },
      ],
      insights: [
        { icon: '🖼️', title: 'Proof is visual', text: 'Clients judge a builder by the buildings they’ve made, so the portfolio had to take centre stage, with filters for project type, service, location and size.' },
        { icon: '🏅', title: 'Trust lives in the details', text: 'Most construction websites spread their history, group companies, certifications and CSR work all over the place. Here they come together as one "Our Company" story.' },
        { icon: '⚡', title: 'Careers must be fast', text: 'Two thirds of job candidates gave up on the old application process. A new step-by-step application cut the time it takes from 7.5 minutes down to 3.2.' },
      ],
    },
    structure: {
      flow: ['Landing', 'Explore projects', 'Our Company & trust', 'Sustainability / CSR', 'Enquire or apply'],
      note: 'I refined the low-fidelity wireframes over several rounds and tested them with a mixed group of users. That showed we needed clearer calls to action, better readability and simpler navigation before I moved on to the high-fidelity prototype.',
      ia: [
        { icon: '🏢', title: 'Our Company', text: 'History, values, organisation structure, gallery and certifications.' },
        { icon: '🏗️', title: 'Projects', text: 'A portfolio with card filters for type, service, location and size, plus a detailed page for each project.' },
        { icon: '🌱', title: 'CSR & Sustainability', text: 'Initiatives, impact and goals as a trust signal.' },
        { icon: '🧭', title: 'Group of Companies', text: 'The wider group and what each company does.' },
        { icon: '💼', title: 'Careers', text: 'Open roles, job detail and a short application flow.' },
        { icon: '✉️', title: 'Contact', text: 'Enquiry form, locations and direct details.' },
      ],
    },
    system: {
      summary: 'The design follows three principles: elegance, simplicity and accessibility. It gets there with balanced white space, bold typography and colours taken straight from the company’s logo, a deep navy paired with a bright teal that feels clean, dependable and modern. All colour contrast meets WCAG 2.1 AA.',
      colors: [
        { hex: '#1F394F', name: 'Navy' },
        { hex: '#01A59E', name: 'Teal' },
        { hex: '#FFFFFF', name: 'White' },
      ],
      fonts: [{ name: 'Poppins', use: 'Headlines and body - bold, structured and highly legible.' }],
      notes: [
        { icon: '🧱', title: 'Block direction', text: 'Layouts built on cards and grids, with distinct modular sections that give it a solid, industrial feel.' },
        { icon: '✨', title: 'Final direction', text: 'Flowing sections with plenty of white space. It’s the same structure, just calmer and more premium.' },
      ],
    },
    screens: [
      {
        label: 'Final design',
        orientation: 'landscape',
        shots: shots('/Images/projects/vebuild', [
          ['Home', 'Homepage'],
          ['Projects', 'Projects'],
          ['Our Company', 'Our Company'],
          ['Group of Companies', 'Group of Companies'],
          ['Certifications', 'Certifications'],
          ['CSR', 'CSR'],
          ['Careers', 'Careers'],
          ['Careers --_ job', 'Careers · job detail'],
          ['Contact Us', 'Contact Us'],
        ]),
      },
      {
        label: 'Block UI concept',
        orientation: 'landscape',
        shots: shots('/Images/projects/vebuild/block', [
          ['Home Sceen - Main View', 'Home · main view'],
          ['Our Company - Company Description', 'Our Company · description'],
          ['Our Company - Gallery', 'Our Company · gallery'],
          ['Our Company - Organization Structure', 'Our Company · org structure'],
          ['Our Company - Certifications', 'Our Company · certifications'],
          ['Projects', 'Projects'],
          ['Our Products', 'Our Products'],
          ['group of companies', 'Group of Companies'],
          ['CSR', 'CSR'],
          ['careers', 'Careers'],
          ['contact us', 'Contact Us'],
        ]),
      },
    ],
    interactions: [
      { icon: '👆', title: 'Confident CTAs', text: 'Clear, high-contrast calls to action make getting in touch easy and keep visitors moving towards a conversation.' },
      { icon: '🗂️', title: 'Progressive disclosure', text: 'Simple project cards with specifications you can expand, plus an "Expert Mode" in the block concept, so the deeper detail only shows up when someone wants it.' },
      { icon: '📐', title: 'Interactive tools', text: 'The block concept added a Blueprint Explorer and a Material Selector, so architects could explore how the company builds things instead of reading static specifications.' },
      { icon: '📱', title: 'Responsive flow', text: 'Layouts adapt to desktop, tablet and mobile, so the brand looks just as polished on a site visit as it does in the boardroom.' },
      { icon: '🎯', title: 'Visual hierarchy', text: 'Teal highlights against deep navy draw attention to projects and calls to action, while the white space keeps everything calm and easy to scan.' },
      { icon: '♿', title: 'Accessible by default', text: 'Keyboard navigation, screen reader support and high-contrast colour pairs are used throughout.' },
    ],
    outcome: {
      metrics: [
        { value: '62%', label: 'more project-page engagement (block concept testing)' },
        { value: '81%', label: 'fewer support queries' },
        { value: '3.2 min', label: 'application time, down from 7.5' },
        { value: '<1.5s', label: 'mobile gallery load, 98/100 PageSpeed' },
      ],
      summary: 'People spent more time exploring the portfolio, and the inclusive design made the site easier to use for people of every technical level. The consistent navy and teal design also strengthened VEBUILD’s image as a dependable, forward-thinking builder.',
      challenge: 'Presenting complex technical construction information without overwhelming clients who aren’t technical. The block direction solved this with structure and tools, and the final direction did it with restraint and a clear hierarchy.',
      learned: 'Designing the same site twice made the trade-off really clear. Modular blocks are great for organising lots of data, but white space and a strong hierarchy build more trust. The best result combined the structure of the first design with the calm of the second.',
      next: 'Showing projects in AR, integrating BIM models, adding support for more languages and personalising the site with AI, while keeping the style guide up to date as the brand grows.',
      quote: 'The blueprint tool shows our construction approach instantly… it doesn’t make me feel technologically challenged.',
    },
  },
  /* ─────────────────────────────── DTM HMS ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'dtmhms',
    title: 'DTM Hall Management System',
    tagline: 'Turning paper-based venue booking into a clean, visual experience that only takes a few taps.',
    kicker: 'UI/UX Case Study · Booking Platform',
    cover: '/Images/projects/dtmhms/COVER.webp',
    accent: '#00b6aa',
    accent2: '#7cf2e8',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Product Designer' },
      { label: 'Team', value: 'DreamTeam' },
      { label: 'Type', value: 'Booking platform · Design system' },
      { label: 'Tools', value: 'Figma · React.js · SVG' },
      { label: 'Research', value: 'Admin & booker studies' },
      { label: 'Platform', value: 'Responsive web' },
    ],
    links: [
      { label: 'Behance', href: 'https://www.behance.net/gallery/199006183/DTM-Hall-Management-System' },
      { label: 'Figma file', href: 'https://www.figma.com/file/l6I5kiLJkE6iOv5vH3gHeO/Hall-Management-Web-UI' },
    ],
    brief: [
      'Booking a school hall shouldn’t involve phone calls, paper forms and dates that end up double-booked. DreamTeam noticed that schools and institutions in Sri Lanka’s education sector were still managing hall bookings by hand.',
      'DTM HMS replaces all of that with one platform for Lyceum’s premises, where availability, pricing and layouts are clear, visual and can be booked in just a few taps.',
    ],
    problem: {
      statement: 'Because the process was on paper and spread across different places, it was hard to see what was free, compare venues or trust the price.',
      goal: 'Make booking simpler, build trust in the institution, work for very different kinds of users and set up a visual design system that can grow.',
      audience: 'Administrative staff who need to see availability in real time and make bulk bookings, and occasional users who just want to reserve a hall.',
      quote: '91% of users preferred a visual calendar to lists of text, and 62% had given up on a booking because the pricing wasn’t clear.',
    },
    research: {
      summary: 'The research split neatly into two groups: the administrators who handle bookings every day and the people who book a hall now and then. Both groups kept running into the same problems.',
      compare: {
        before: { label: 'What research found', items: ['78% struggled to compare venue features', '62% abandoned bookings over unclear pricing', '91% preferred visual calendars over text lists'] },
        after: { label: 'Design response', items: ['Side-by-side venue comparison', 'Transparent, upfront pricing', 'A colour-coded calendar as the centrepiece'] },
      },
      personas: [
        { icon: '🗂️', name: 'The Administrator', role: 'Primary · operations staff', traits: ['Power user', 'Time-pressured', 'Detail-oriented'], quote: 'I need to see what’s free at a glance and never double-book a hall.' },
        { icon: '🙋', name: 'The Occasional Booker', role: 'Secondary · one-off user', traits: ['Infrequent', 'Price-sensitive', 'Wants simplicity'], quote: 'I book a hall once in a while - it has to be obvious, with no surprise costs.' },
        { icon: '📅', name: 'The Event Coordinator', role: 'Tertiary · recurring planner', traits: ['Planner', 'Visual', 'Recurring needs'], quote: 'The calendar view saves me hours each week.' },
      ],
    },
    structure: {
      flow: ['Home', 'Explore halls', 'Compare & layout', 'Check calendar', 'Book & confirm'],
      note: 'There are four flows: Discovery, Venue Exploration, Booking Management and Support. Complex options are only shown when they’re needed.',
      ia: [
        { icon: '🧭', title: 'Discovery', text: 'Home · about · orientation' },
        { icon: '🏛️', title: 'Venue Exploration', text: 'Halls · layouts · comparison' },
        { icon: '📅', title: 'Booking Management', text: 'Calendar · availability · confirm' },
        { icon: '💬', title: 'Support', text: 'Contact · help · enquiries' },
      ],
    },
    system: {
      summary: 'A mostly white background with one bold green accent, calm enough for an institution but sharp enough to feel modern. It uses card layouts and type that adapts to everything from 320px phones to admin screens wider than 1440px.',
      colors: [{ hex: '#00B6AA', name: 'DTM green' }, { hex: '#000000', name: 'Text' }, { hex: '#FFFFFF', name: 'Canvas' }],
      fonts: [{ name: 'Sora', use: 'Crisp and modern, with subtle early-screen character - adaptive from phone to admin dashboard' }],
    },
    screens: [
      { orientation: 'landscape', shots: shots('/Images/projects/dtmhms', [
        ['Home', 'Home'], ['Book Your Hall', 'Book your hall'], ['Book Your Hall --_ Layout', 'Hall layout view'],
        ['Book Your Hall --_ Calendar View', 'Calendar view'], ['About Us', 'About us'], ['Contact us', 'Contact us'],
      ]) },
    ],
    interactions: [
      { icon: '📅', title: 'Dynamic calendar', text: 'Colour-coded availability shows which dates are free or booked at a glance, and it’s the heart of the whole product.' },
      { icon: '⚖️', title: 'Comparative view', text: 'Comparing venues and their features side by side replaces scrolling through lists of text.' },
      { icon: '🪄', title: 'Progressive disclosure', text: 'More complex options stay out of the way until they’re needed, which keeps the interface calm while still supporting experienced users.' },
    ],
    outcome: {
      metrics: [{ value: '63%', label: 'Fewer booking errors' }, { value: '88%', label: 'First-time task success' }, { value: '<1.2s', label: 'Booking engine response' }, { value: '95', label: 'Lighthouse accessibility' }],
      quote: '"Finally feels like we’ve entered the digital age." - School administrator',
      summary: 'Booking errors dropped by 63%, 88% of people completed the most important tasks successfully on their first try, and the average session grew to 4.2 minutes.',
      challenge: 'Fitting lots of detail into a clean interface. I solved it by putting the most important content first, showing secondary details only when asked, and using icons for amenities instead of text.',
      learned: 'Good UX can completely change how an institution works. The calendar on its own took away most of the admin workload.',
      next: 'Connecting to the ERP system, suggesting available slots with AI and adding support for more languages so more institutions can use it.',
    },
  },
  /* ─────────────────────────────── NCG WAREHOUSE ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'ncgws',
    title: 'NCG Warehouse',
    tagline: 'A website for a logistics company, made as organised as its warehouse floor.',
    kicker: 'UI/UX Case Study · Corporate Website',
    cover: '/Images/projects/ncgws/cover.webp',
    accent: '#3d8fe0',
    accent2: '#fed217',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Product Designer' },
      { label: 'Client', value: 'NCG Warehouse Solutions (Lyceum Global)' },
      { label: 'Type', value: 'Corporate website' },
      { label: 'Tools', value: 'Figma · Vue.js · SVG' },
      { label: 'Research', value: '47 participants' },
      { label: 'Platform', value: 'Responsive web' },
    ],
    links: [
      { label: 'Behance', href: 'https://www.behance.net/gallery/199114839/NCG-Warehouse-Web-UI-Design' },
      { label: 'Figma file', href: 'https://www.figma.com/design/DDVOHEwoIH67XnmMrvX65k/NCG-Warehouse' },
    ],
    brief: [
      'NCG Warehouse Solutions is part of Lyceum Global, with more than 30,000 sq ft of storage and a fleet that covers the whole island. The operations were impressive, but the website didn’t live up to them.',
      'The redesign gives a complex logistics business a website where capacity is clear, tenders are easy to find and visitors trust the company from the first glance.',
    ],
    problem: {
      statement: 'Information about capacity, services and tenders was hidden away in PDFs and unclear pages, so the site didn’t show how capable NCG really is.',
      goal: 'Show what the warehouse can do, make it easier to find and submit tenders, reflect the Lyceum Global brand and work for people with any level of technical experience.',
      audience: 'Corporate clients who need to know about capacity, service agreements and tender deadlines, vendors bidding on tenders, and job applicants browsing on their phones.',
      quote: '68% of users struggled to find tender documents, capacity details were buried in PDFs, and mobile visitors, who made up 42% of traffic, left the site 73% more often.',
    },
    research: {
      summary: 'Research with 47 people, including corporate buyers, vendors and job applicants, turned vague complaints into a clear picture of where the old site was letting people down.',
      compare: {
        before: { label: 'What research found', items: ['68% couldn’t locate tender documents', 'Warehouse capacity buried in PDFs', 'Mobile users bounced 73% more often'] },
        after: { label: 'Design response', items: ['Capacity as live, visual dashboards', 'Tenders discoverable with smart filters', 'Mobile-first for on-the-go stakeholders'] },
      },
      personas: [
        { icon: '🏢', name: 'The Corporate Client', role: 'Primary · supply-chain buyer', traits: ['B2B', 'Data-driven', 'Time-pressured'], quote: 'I need capacity, service levels and tender deadlines up front - not in a PDF.' },
        { icon: '📑', name: 'The Vendor / Bidder', role: 'Secondary · tender applicant', traits: ['Deadline-driven', 'Detail-oriented', 'Compliance'], quote: 'Finding the right tender and submitting on time is the whole job.' },
        { icon: '🧑‍💼', name: 'The Job Applicant', role: 'Tertiary · career seeker', traits: ['Mobile-first', 'Career-focused', 'Quick scan'], quote: 'I browse and apply on my phone - it has to be quick and clear.' },
      ],
    },
    structure: {
      flow: ['Home', 'Our operations', 'Capacity & fleet', 'Tenders', 'Submit / enquire'],
      note: 'A clean seven-page structure with Home, About Us, Our Team, Our Operations, Tenders, Join Us and Contact. A top-level overview leads into department details and equipment only when people want to dig deeper.',
      ia: [
        { icon: '🏢', title: 'Company', text: 'Home · about us · our team' },
        { icon: '🏭', title: 'Operations', text: 'Capacity · fleet · workflow' },
        { icon: '📑', title: 'Tenders', text: 'Listings · filters · submission' },
        { icon: '🤝', title: 'Engage', text: 'Join us · careers · contact' },
      ],
    },
    system: {
      summary: 'Lyceum Global’s corporate blue builds trust, and a warehouse yellow accent adds energy and makes things stand out. Isometric warehouse diagrams and animated process flows are part of a style guide that keeps evolving.',
      colors: [
        { hex: '#0654A1', name: 'Corporate blue' }, { hex: '#FED217', name: 'Warehouse yellow' }, { hex: '#8B181F', name: 'Lyceum red' },
        { hex: '#198754', name: 'Success' }, { hex: '#B2B2B2', name: 'Grey' }, { hex: '#000000', name: 'Text' }, { hex: '#FFFFFF', name: 'Canvas' },
      ],
      fonts: [{ name: 'Poppins', use: 'Geometric sans with Latin and Devanagari support - one family across the whole site' }],
    },
    screens: [
      { orientation: 'landscape', shots: shots('/Images/projects/ncgws', [
        ['HOME Screen', 'Home'], ['About -_ About Us', 'About us'], ['About -_ Our Team', 'Our team'], ['Our Operations', 'Our operations'],
        ['Tenders', 'Tenders'], ['Join Us', 'Join us'], ['Join Us - Job Description', 'Job description'], ['Login', 'Login'], ['Sign in', 'Sign in'], ['Contact Us', 'Contact us'],
      ]) },
    ],
    interactions: [
      { icon: '📦', title: 'Capacity dashboard', text: 'Live visuals of how full the warehouse is bring more than 30,000 sq ft of storage to life, with no PDFs, just a view you can take in at a glance.' },
      { icon: '🗓️', title: 'Tender timeline', text: 'Vendors can filter tenders by date, type and value, subscribe to alerts and follow a timeline, so they never miss one.' },
      { icon: '🚚', title: 'Fleet preview', text: 'A built-in map preview gives a sense of the island-wide fleet and shows how far NCG’s reach goes.' },
    ],
    outcome: {
      metrics: [{ value: '57%', label: 'Fewer tender support queries' }, { value: '39%', label: 'Better mobile conversion' }, { value: '5.1 min', label: 'Average session' }, { value: '0.8s', label: 'Page load' }],
      quote: '"Applying for tenders now takes half the time." - Vendor representative',
      summary: 'Support questions about tenders dropped by 57% and mobile conversions went up by 39%. The redesign made things clearer, more efficient and stronger for the brand all at once.',
      challenge: 'Explaining warehouse operations with many layers without overwhelming people. The answer was an overview that lets people dig deeper when they want to.',
      learned: 'Complicated industrial operations become easy to understand when you turn the information into something visual and interactive.',
      next: 'Connecting to the ERP system, adding AR tours of the warehouse, and supporting Sinhala and Tamil.',
    },
  },

  /* ─────────────────────────────── LYA EXAM PORTAL ─────────────────────────────── */
  {
    kind: 'design',
    slug: 'lyaportal',
    title: 'LYA Exam Portal',
    tagline: 'Exam registration and payment turned into a calm, guided journey for students, parents and teachers.',
    kicker: 'UI/UX Case Study · Multi-Role Portal',
    cover: '/Images/projects/lyaportal/cover.webp',
    accent: '#5b8fe0',
    accent2: '#9cc2ff',
    facts: [
      { label: 'Role', value: 'UI/UX Engineer · Product Designer' },
      { label: 'Client', value: 'Lyceum Academy' },
      { label: 'Type', value: 'Exam registration & payments' },
      { label: 'Tools', value: 'Figma' },
      { label: 'Roles', value: 'Student · Parent · Teacher' },
      { label: 'Screens', value: '40+ high-fidelity' },
    ],
    links: [{ label: 'Figma file', href: 'https://www.figma.com/design/HaFcGnIIpF8tVnnYJudJjD/LYA-Exam-Portal-UI?node-id=264-2184' }],
    brief: [
      'Registering and paying for an exam is often the most stressful part of taking one. The forms are all over the place, the fees aren’t clear, and the families and teachers involved can’t see the same information.',
      'The LYA Exam Portal is Lyceum Academy’s online exam platform, and it turns that process into a guided journey for three different roles.',
    ],
    problem: {
      statement: 'A single generic flow couldn’t work for students, parents and teachers, and confusing payment options turned the most important step into the most stressful one.',
      goal: 'Build one portal with a journey designed for each role, a guided flow from registration through to payment, and payment options that suit how people actually pay in Sri Lanka.',
      audience: 'Students who register for and sit exams, parents who pay for them, and teachers who confirm the exam details.',
      quote: 'Registering and paying for an exam should feel as reassuring as getting the result. It should be clear, trustworthy and free of stress.',
    },
    research: {
      summary: 'This product serves several roles, and each one arrives with a different goal and a different worry. My research mapped out those journeys and the gaps in trust around the payment step that were tripping people up.',
      compare: {
        before: { label: 'Typical portals', items: ['One generic flow forced on every user', 'Payment as a confusing dead end', 'No answer for bank-transfer realities'] },
        after: { label: 'The opportunity', items: ['Role-based dashboards for student, parent and teacher', 'A guided, signposted register-to-pay flow', 'Online and bank-transfer payment with clear status'] },
      },
      personas: [
        { icon: '🎓', name: 'The Student', role: 'Primary · exam candidate', traits: ['Mobile-first', 'Time-pressured', 'Wants clarity'], quote: 'I just want to find my exam, confirm my details and pay - without confusion.' },
        { icon: '👨‍👩‍👧', name: 'The Parent', role: 'Secondary · payer / guardian', traits: ['Trust-seeking', 'Record-keeping', 'Occasional'], quote: 'I’m paying for my child’s exams - I need to trust it and keep a clear record.' },
        { icon: '🧑‍🏫', name: 'The Teacher', role: 'Tertiary · oversight', traits: ['Detail-oriented', 'Routine', 'Accuracy'], quote: 'I need to confirm exam details and keep everything accurate for my students.' },
      ],
      insights: [
        { icon: '🎯', title: 'Focused student flow', text: 'A focused dashboard and a simple step-by-step payment flow replace the old cluttered steps.' },
        { icon: '🧾', title: 'A payment trail', text: 'Parents get a "My Payments" history, which gives them confidence that everything has gone through.' },
        { icon: '✅', title: 'Space to verify', text: 'Teachers get their own screens for checking and confirming exam details.' },
      ],
    },
    structure: {
      flow: ['Login', 'Dashboard', 'Browse exams', 'Confirm details', 'Pay & confirm'],
      note: 'One main journey, adapted into three flows for the three roles, all on the same design system, so the portal feels the same no matter who logs in.',
      ia: [
        { icon: '🏠', title: 'Dashboard', text: 'Overview · notifications · quick actions' },
        { icon: '📝', title: 'Exams', text: 'All exams · my exams · details' },
        { icon: '💳', title: 'Payments', text: 'Online · bank transfer · my payments' },
        { icon: '👤', title: 'Account', text: 'Login · roles · profile' },
      ],
    },
    system: {
      summary: 'A blue and mostly white palette that feels trustworthy and professional, and stays calm and easy to focus on when money and exams are involved.',
      colors: [{ hex: '#285BA2', name: 'Lyceum blue' }, { hex: '#E5EBF3', name: 'Pale surface' }, { hex: '#000000', name: 'Text' }, { hex: '#FFFFFF', name: 'Canvas' }],
      fonts: [{ name: 'Poppins', use: 'Geometric, monolinear clarity with a little warmth - for every role and screen' }],
    },
    screens: [
      { label: 'Student', orientation: 'landscape', shots: shots('/Images/projects/lyaportal', [
        ['Login', 'Login'], ['Dashboard 1', 'Student dashboard'], ['All Exams', 'All exams'], ['My Exams', 'My exams'],
        ['Details Confirmation', 'Details confirmation'], ['Dashboard --_ Notifications', 'Notifications'],
      ]) },
      { label: 'Payments', orientation: 'landscape', shots: shots('/Images/projects/lyaportal', [
        ['Select Payment Method', 'Select payment'], ['Bank Transfer Payment', 'Bank transfer'], ['Online Payment Successful', 'Payment success'], ['My Payments', 'My payments'],
      ]) },
      { label: 'Parent & Teacher', orientation: 'landscape', shots: [
        { src: '/Images/projects/lyaportal/parent-flow/Dashboard 3.webp', caption: 'Parent dashboard' },
        { src: '/Images/projects/lyaportal/teacher-flow/Dashboard 2.webp', caption: 'Teacher dashboard' },
      ] },
    ],
    interactions: [
      { icon: '🚪', title: 'Role-based dashboards', text: 'Students, parents and teachers each land on a dashboard built around what they need to do.' },
      { icon: '🏦', title: 'Flexible payments', text: 'You can pay instantly online or by bank transfer, and there’s an "upload slip later" option because that’s how a lot of people actually pay.' },
      { icon: '🚦', title: 'Honest status', text: 'Every payment finishes with a clear success or failure screen that tells you what to do next.' },
    ],
    outcome: {
      metrics: [{ value: '3', label: 'Role-based journeys' }, { value: '40+', label: 'Screens designed' }, { value: '2', label: 'Payment paths' }],
      quote: 'One portal and three confident journeys, with the payment step finally as trustworthy as it should be.',
      summary: 'A consistent portal for several roles, with three tailored flows covering registration, dashboards and every possible state for online and bank transfer payments.',
      challenge: 'Keeping three side-by-side flows consistent, and handling payment edge cases like failures and "upload slip later" without cluttering the smooth path.',
      learned: 'A shared design system is what makes a product with several roles feel like one product, and failed or pending payments matter just as much as successful ones.',
      next: 'Handing over to development, adding reminders for pending bank transfers, and building results publishing and admin reports.',
    },
  },
];
