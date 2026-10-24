/* The graphic design collections: what's in each one, in order, with the
   real size of every thumbnail (so the grids hold their shape while images
   load). Used by the Graphic Design page (GraphicProjectsClient.tsx) and
   every gallery page (GalleryPage.tsx).

   Each piece lives in /Images/artworks/<dir>/thumbs/<file> with its full-size
   version one folder up, at /Images/artworks/<dir>/<file>. Downloadable
   collections also keep the original, full-resolution file for each piece in
   /Images/artworks/<dir>/original/ (see Piece.original). */

export type Layout = 'logos' | 'art' | 'squares' | 'phones' | 'mixed';

export interface Piece {
  file: string;
  title: string;
  tag?: string;
  sub?: string;
  w: number;
  h: number;
  /** File name in original/, served by the Download button (full resolution). */
  original?: string;
}

export interface Section {
  title?: string;
  blurb?: string;
  items: Piece[];
}

export interface Collection {
  slug: string;
  dir: string;
  title: string;
  /** The word for one piece, for counts ("24 logos"). */
  unit: [string, string];
  kicker: string;
  label: string;
  accent: string;
  layout: Layout;
  blurb: string;
  intro: string;
  tags: string[];
  tagline: [string, string];
  /** Offered as a download in the viewer (wallpapers, artworks). */
  downloadable?: boolean;
  sections: Section[];
}

const logo = (file: string, title: string, tag: string, sub: string): Piece => ({ file, title, tag, sub, w: 600, h: 400 });
const sq = (file: string, title: string, tag: string, sub?: string): Piece => ({ file, title, tag, sub, w: 600, h: 600 });

export const COLLECTIONS: Collection[] = [
  {
    slug: 'logos',
    dir: 'logos',
    title: 'Logo Designs',
    unit: ['logo', 'logos'],
    kicker: 'Identity & Branding',
    label: 'Identity Design',
    accent: '#8cd2ff',
    layout: 'logos',
    blurb: 'Logos and brand marks I’ve designed for businesses, events and personal projects, each one built to be simple and memorable.',
    intro: 'Over the years I’ve designed logos and brand identities for all sorts of clients, including tech startups, university clubs, large international companies and my own personal brand. Here are some of my favourites.',
    tags: ['Brand Identity', 'Vector Art', 'Logo Marks', 'Typography'],
    tagline: ['Forging the', 'Identity Matrix'],
    sections: [{
      items: [
        logo('ciao.webp', 'Ciao Chat', 'Chat App Brand', 'A friendly robot mark for Ciao Chat, with the bot’s face drawn as a speech bubble.'),
        logo('funextreme.webp', 'FunExtreme', 'Recreational', 'Custom branding for a platform built around adventure and recreational activities.'),
        logo('konekza.webp', 'KoneKza', 'Tech & Networking', 'Clean, professional branding for a company that provides networking and connectivity solutions.'),
        logo('sureid.webp', 'SureID', 'Verification', 'Branding for an identity verification product, designed to feel secure and trustworthy.'),
        logo('akila.webp', 'Akila Physics', 'Identity Design', 'A logo for a physics tuition teacher, used for their classes, marketing and branding.'),
        logo('bumpie.webp', 'Bumpie', 'Software Brand', 'The visual identity for Bumpie, a software platform for maternity status monetization.'),
        logo('celeritas.webp', 'Celeritas', 'Logistics Branding', 'A logo for an agent management system used by an international courier service.'),
        logo('dairy.webp', 'Lanka Dairy', 'Corporate Identity', 'Branding for a company that produces and distributes dairy milk.'),
        logo('dns.webp', 'D.N.S.', 'Community Club', 'A logo for the Networking Department’s community club at my university.'),
        logo('electra.webp', 'Electra', 'Energy Software', 'The visual identity for a university software project focused on solar energy.'),
        logo('gaming.webp', 'Gaming Community', 'University Life', 'The official logo for the Gaming Community of NSBM Green University.'),
        logo('gears.webp', 'Gears & Glam', 'Apparel Brand', 'A logo for a clothing brand that sells glamorous, modern fashion.'),
        logo('gevents.webp', 'GEvents', 'Event Management', 'Branding for a modern startup that handles event planning and logistics.'),
        logo('grubit.webp', 'Grubit', 'Food Tech', 'A playful, modern identity for a food delivery service.'),
        logo('hassle.webp', 'HassleFree', 'Courier Service', 'A logo for a courier service that puts fast delivery and good customer support first.'),
        logo('heal.webp', 'HealHub', 'Healthcare IT', 'The identity for a university software project that manages health records.'),
        logo('hnc.webp', 'HNC', 'Personal Brand', 'A logo for a gaming streamer, used across their channels and marketing.'),
        logo('imlan.webp', 'IMLAN', 'Education', 'Branding for IMLAN, an immersive language learning system I worked on for Pearson.'),
        logo('ohl.webp', 'OHL', 'Logo Redesign', 'A modern redesign of the OHL logo, made for the brand’s future promotions.'),
        logo('phurl.webp', 'PhURL', 'Cyber Security', 'The logo for PhURL, my phishing URL detection system that helps keep people safe online.'),
        logo('takg.webp', 'TAKG', 'Startup Branding', 'The visual identity for TAKG, the tech startup I co-founded.'),
        logo('wish.webp', 'WishKids', 'Community Service', 'A logo for a project that brings water to people affected by drought.'),
        logo('xuping.webp', 'XUPING', 'Global Enterprise', 'A logo for a multinational group of companies working across many different industries.'),
        logo('yasupi.webp', 'Yasupi', 'Distribution', 'Branding for a local distribution and logistics network.'),
        logo('zen.webp', 'ZEN', 'Artist Branding', 'My own personal brand, which I use for my freelance creative work.'),
      ],
    }],
  },
  {
    slug: 'artworks',
    dir: '',
    title: 'Digital Artworks',
    unit: ['artwork', 'artworks'],
    kicker: 'Immersive Gallery',
    label: 'Fine Art',
    accent: '#c39bff',
    layout: 'art',
    blurb: 'Digital artwork where I experiment with light, shadow and colour, mostly portraits of characters from the films, shows and anime I love.',
    intro: 'These are digital paintings and illustrations I’ve made over the years, mostly portraits and scenes of characters from films, shows and anime that I love. Each one was a chance to try out new lighting, colour and painting techniques.',
    tags: ['Digital Paint', 'Illustration', 'Fan Art', 'Character Portraits'],
    tagline: ['Manifesting the', 'Infinite Canvas'],
    downloadable: true,
    sections: [{
      items: [
        { file: 'Loki-sylvie.webp', original: 'Loki-sylvie.jpg', title: 'Temporal Bonds', tag: 'Illustration', sub: 'Loki and his variant Sylvie, painted to show how alike they are and the connection between them.', w: 1200, h: 675 },
        { file: 'Kakashi.webp', original: 'Kakashi.jpg', title: 'The Copy Ninja', tag: 'Character Study', sub: 'A detailed portrait of Kakashi Hatake from Naruto, where I focused on depth and realistic textures.', w: 1200, h: 1697 },
        { file: 'kira1.webp', original: 'kira1.png', title: 'The Thunder Kitsune', tag: 'Character Study', sub: 'A portrait of Kira Yukimura, the thunder kitsune from Teen Wolf.', w: 1200, h: 675 },
        { file: 'lucy-david.webp', original: 'lucy-david.png', title: 'Edgerunners', tag: 'Digital Portrait', sub: 'A neon-lit tribute to the two characters at the heart of Cyberpunk: Edgerunners and their story in Night City.', w: 1200, h: 675 },
        { file: 'spidey.webp', original: 'spidey.jpg', title: 'Friendly Neighborhood', tag: 'Illustration', sub: 'Spider-Man mid-swing, painted to capture the energy and movement the character is known for.', w: 1200, h: 675 },
        { file: 'loki.webp', original: 'loki.jpg', title: 'God of Mischief', tag: 'Portrait', sub: 'Loki Laufeyson holding the Tesseract, as he appears in Marvel’s Avengers films.', w: 1200, h: 675 },
        { file: 'andrew.webp', original: 'andrew.jpg', title: 'The Amazing One', tag: 'Portrait', sub: 'A cinematic portrait of the Peter Parker from The Amazing Spider-Man, one of the variants from across the multiverse.', w: 1200, h: 671 },
        { file: 'demonslayer.webp', original: 'demonslayer.png', title: 'Water Breathing', tag: 'Fan Art', sub: 'A tribute to the Water Breathing technique from Demon Slayer, painted in my own style.', w: 1200, h: 675 },
        { file: 'otisruby.webp', original: 'otisruby.png', title: 'Unlikely Connection', tag: 'Character Study', sub: 'A piece about the kind of close bond that sometimes forms in the most unexpected places.', w: 1200, h: 675 },
        { file: 'freedom.webp', original: 'freedom.jpg', title: 'Winged Freedom', tag: 'Conceptual Art', sub: 'A symbolic piece about the weight of making a choice and the feeling of finally being set free.', w: 1200, h: 675 },
        { file: 'grave.webp', original: 'grave.jpg', title: 'The Quiet Grave', tag: 'Mood Piece', sub: 'Fan art inspired by Studio Ghibli’s Grave of the Fireflies.', w: 1200, h: 675 },
      ],
    }],
  },
  {
    slug: 'event-posters',
    dir: 'event-posters',
    title: 'Event Posters',
    unit: ['poster', 'posters'],
    kicker: 'High-Impact Visuals',
    label: 'Print & Social',
    accent: '#ff8ad8',
    layout: 'squares',
    blurb: 'Posters I’ve designed for events, made to grab people’s attention and get them curious enough to find out more.',
    intro: 'Posters I’ve designed for company events, hackathons and other creative get-togethers. Each one had to catch people’s eye and tell them what the event was about at a glance.',
    tags: ['Event Promotion', 'Typography', 'Layout', 'Social Media'],
    tagline: ['Broadcasting the', 'Event Horizon'],
    sections: [{
      items: [
        sq('AGM-2.webp', 'Annual General Meeting 2022', 'Teaser', 'A “coming soon” teaser for the ISACA NSBM Student Chapter’s AGM.'),
        sq('Coming-Soon-Final.webp', 'Linuxify', 'Teaser', 'The teaser for Linuxify, ISACA’s Linux bootcamp series.'),
        sq('OSD-Final.webp', 'Welcome to Linuxify', 'Bootcamp', 'Welcoming everyone into the Linuxify bootcamp.'),
        sq('HackToNight.webp', 'HackToNight', 'Stay Tuned', 'Building up to a night of hacking for Hacktoberfest.'),
        sq('Happening-now.webp', 'HackToNight', 'Happening Now', 'The “we’re live” poster for the same night.'),
        sq('Live Now Final.webp', 'Mozilla Monthly Meetup', 'Live Now', 'An online meetup, announced the moment it went live.'),
        sq('Step-into-GO.webp', 'Step into Go', 'Workshop', 'A beginner’s workshop on the Go programming language.'),
        sq('dive.webp', 'Dive into C v3.0', 'Workshop', 'The third run of a hands-on C programming session.'),
        sq('Technosphere - Registrations closed.webp', 'Technosphere', 'Registrations Closed', 'Letting everyone know the tech convention was fully booked.'),
        sq('esthetique1.webp', 'Esthétique ’21', 'Countdown', 'The countdown to a UI/UX hackathon.'),
        sq('esthetique2.webp', 'Esthétique ’21', 'Workshop', 'The poster for the hackathon’s UI/UX workshop.'),
      ],
    }],
  },
  {
    slug: 'mobile-wallpapers',
    dir: 'mobile-wallpaper',
    title: 'Mobile Wallpapers',
    unit: ['wallpaper', 'wallpapers'],
    kicker: 'Digital Personalization',
    label: 'For Your Phone',
    accent: '#6dffb4',
    layout: 'phones',
    blurb: 'A set of clean phone wallpapers in high resolution, designed to look especially good on AMOLED screens.',
    intro: 'A set of phone wallpapers I’ve made. They’re high resolution and designed to look especially good on AMOLED screens, so feel free to grab one for your own phone.',
    tags: ['AMOLED Ready', 'High Resolution', 'Anime & Fan Art', 'Free Download'],
    tagline: ['Tailoring Your', 'Pocket Universe'],
    downloadable: true,
    sections: [
      {
        title: 'Manga Collage',
        blurb: 'Himiko Toga and Akane Kurokawa cut out over a grey wall of manga panels.',
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
          file: `${n}.webp`,
          original: `${n}.jpg`,
          title: n <= 5 ? `Himiko Toga ${String(n).padStart(2, '0')}` : `Akane Kurokawa ${String(n - 5).padStart(2, '0')}`,
          tag: 'Manga Collage',
          w: 400,
          h: 867,
        })),
      },
      {
        title: 'Fan Art Collection',
        blurb: 'Colourful fan art wallpapers I designed for the shows, films and anime I love, from Spider-Man and Loki to Demon Slayer.',
        items: [
          { file: '11.webp', original: '11.jpg', title: 'David & Lucy', tag: 'Cyberpunk: Edgerunners', sub: 'David and Lucy sitting together under a sunrise over the planet.', w: 400, h: 889 },
          { file: '12.webp', original: '12.jpg', title: 'Kira Yukimura', tag: 'Teen Wolf', sub: 'Kira, the thunder kitsune, drawing her sword through a purple storm.', w: 400, h: 954 },
          { file: '13.webp', original: '13.jpg', title: 'Kira Yukimura II', tag: 'Teen Wolf', sub: 'The same scene reimagined in soft, watercolour blues.', w: 400, h: 905 },
          { file: '14.webp', original: '14.jpg', title: 'Your Lie in April', tag: 'Your Lie in April', sub: 'Kōsei and Kaori under falling cherry blossom petals.', w: 400, h: 889 },
          { file: '15.webp', original: '15.jpg', title: 'The Amazing One', tag: 'Spider-Man', sub: 'A chibi Spider-Man I designed, glowing with joy in a burst of red rays and floating hearts.', w: 400, h: 867 },
          { file: '16.webp', original: '16.jpg', title: 'Friendly Neighborhood', tag: 'Spider-Man', sub: 'Gwen and Peter sharing a moment on a moonlit rooftop under a starry night sky.', w: 400, h: 867 },
          { file: '17.webp', original: '17.jpg', title: 'Temporal Bonds', tag: 'Loki', sub: 'Loki and Sylvie on either side of a rift in time, beneath a sky full of swirling galaxies.', w: 400, h: 867 },
          { file: '18.webp', original: '18.jpg', title: 'Water Breathing', tag: 'Demon Slayer', sub: 'Tanjiro and Nezuko mid-leap across a bold comic-style burst of orange and red.', w: 400, h: 867 },
        ],
      },
    ],
  },
  {
    slug: 'other-stuff',
    dir: 'other-stuff',
    title: 'Other Stuff',
    unit: ['piece', 'pieces'],
    kicker: 'Graphic Design & Branding',
    label: 'Miscellaneous',
    accent: '#ffb84d',
    layout: 'mixed',
    blurb: 'Everything that doesn’t fit anywhere else: social posts, T-shirts and printed brand material.',
    intro: 'This is where I keep the design work that doesn’t fit neatly into the other collections, like social posts, clothing designs and branded materials I’ve made for different people and projects.',
    tags: ['Social Media', 'Apparel', 'Print', 'Brand Collateral'],
    tagline: ['Unveiling the', 'Creative Spectrum'],
    sections: [
      {
        title: 'Social Posts',
        blurb: 'Campaigns and awareness posts for communities and companies.',
        items: [
          sq('ART.webp', 'Calling for Volunteers', 'Recruitment', 'A call for volunteers for the Department of Network & Security at NSBM.'),
          sq('banner.webp', 'Can You Spot a Phish?', 'Awareness', 'A phishing awareness post with tips for spotting suspicious emails.'),
          sq('covid.webp', 'Know the Symptoms', 'Awareness', 'A pandemic awareness post on the new symptoms and how to stay safe.'),
          sq('DAY.webp', 'Happy Women’s Day', 'Celebration', 'A Women’s Day post for the ISACA student chapter.'),
          sq('INDIA.webp', 'Pray for India', 'Solidarity', 'A message of support during India’s pandemic crisis.'),
        ],
      },
      {
        title: 'T-Shirt Designs',
        blurb: 'Club and community T-shirts, front and back.',
        items: [
          { file: 'fosstshirt.webp', title: 'FOSS Community', tag: 'T-Shirt', sub: 'A T-shirt for the FOSS Community at NSBM.', w: 600, h: 400 },
          { file: 'isaca.webp', title: 'ISACA Community Day', tag: 'T-Shirt', sub: 'A T-shirt for ISACA’s Community Day 2022.', w: 600, h: 400 },
          { file: 'mora-tshirt.webp', title: 'University of Colombo FOS', tag: 'T-Shirt', sub: 'Sample designs in blue and black for the University of Colombo’s Faculty of Science.', w: 600, h: 407 },
        ],
      },
      {
        title: 'Branding & Print',
        blurb: 'A billboard, a brochure, cards, a magazine cover and an invitation.',
        items: [
          { file: 'Billboard.webp', title: 'Gears & Glam Billboard', tag: 'Billboard', sub: 'An outdoor billboard for the Gears & Glam clothing brand.', w: 513, h: 393 },
          { file: 'brouchure.webp', title: 'Gears & Glam Brochure', tag: 'Brochure', sub: 'A brochure that walks through the brand and its collections.', w: 600, h: 467 },
          { file: 'Business-Card.webp', title: 'Gears & Glam Business Card', tag: 'Business Card', sub: 'Business cards to go with the rest of the brand.', w: 600, h: 525 },
          { file: 'New-Magazine.webp', title: 'Fashion+ Magazine', tag: 'Magazine Cover', sub: 'A cover for a weekly fashion magazine.', w: 600, h: 849 },
          { file: 'InvitationAll.webp', title: 'Invitation Card', tag: 'Invitation', sub: 'An ornate invitation card in black and gold.', w: 600, h: 818 },
        ],
      },
    ],
  },
];

const base = (c: Collection) => `/Images/artworks/${c.dir ? `${c.dir}/` : ''}`;
export const thumbOf = (c: Collection, p: Piece) => `${base(c)}thumbs/${p.file}`;
export const fullOf = (c: Collection, p: Piece) => `${base(c)}${p.file}`;
export const originalOf = (c: Collection, p: Piece) => (p.original ? `${base(c)}original/${p.original}` : undefined);
export const piecesOf = (c: Collection) => c.sections.flatMap((s) => s.items);
export const countOf = (c: Collection) => piecesOf(c).length;
export const hrefOf = (c: Collection) => `/projects/graphic/${c.slug}`;
export const collection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)!;
