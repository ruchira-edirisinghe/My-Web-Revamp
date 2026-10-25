/* Every logo in the Logo Designs gallery, as a brand: who it's for, the idea
   behind it, how the thinking went, and the system built around it (colours,
   type, pattern, signage and the places it's used). LogoBrandPage.tsx turns
   each one into a guideline page at /projects/graphic/logos/<slug>/.

   The artwork lives in /Images/logos/<slug>/: logo.webp (the whole logo, cut
   out of its artboard), mark.webp (the symbol alone, when it stands apart
   from the words), *-dark.webp (the same in light ink, for dark grounds) and
   scene-<signage|stationery|use>.webp (real-world mockup photos, generated
   with Higgsfield in a setting chosen for each brand). */

export interface Swatch { name: string; hex: string; role: string }
export interface Face { family: string; weights: number[]; italic?: boolean }

export type Signage = 'office' | 'store' | 'van' | 'stage' | 'billboard';
export type Use =
  | 'app' | 'web' | 'social' | 'card' | 'tee' | 'cap' | 'cup' | 'bag' | 'box' | 'badge'
  | 'lanyard' | 'polo' | 'mug' | 'sticker' | 'book' | 'bottle' | 'jersey' | 'mousepad' | 'tag' | 'invite';
export type Pattern = 'grid' | 'offset' | 'diagonal' | 'rings';

export interface LogoBrand {
  slug: string;
  name: string;
  sector: string;
  /** Who it was made for, in a line. */
  client: string;
  /** The idea in one sentence: the hero's quote. */
  idea: string;
  keywords: [string, string, string];
  /** The thinking, in four moves: the brief, the symbol, the shape, the colour and type. */
  steps: [string, string, string, string];
  colors: Swatch[];
  display: Face;
  text: Face;
  /** On dark grounds: its own light version ('alt'), as drawn ('own'), or on a light plate. */
  onDark: 'alt' | 'own' | 'plate';
  /** Drawn with shading and inner detail, so it can't be shown as a single-colour silhouette. */
  illustrated?: boolean;
  /** Has a symbol that stands apart from the wordmark (mark.webp). */
  mark: boolean;
  pattern: Pattern;
  signage: Signage;
  uses: [Use, Use, Use, Use];
  /** What a use is called on this brand's page, where the general name doesn't fit (a ring box, not packaging). */
  names?: Partial<Record<Use, string>>;
  /** A line for the applications: a slogan or a call to action. */
  line: string;
}

export const LOGO_BRANDS: LogoBrand[] = [
  {
    slug: 'ciao', name: 'Ciao Chat', sector: 'Chat App Brand',
    client: 'A chat app with a built-in assistant that helps people reply, plan and stay in touch.',
    idea: 'A robot you’d happily talk to: its whole face is a speech bubble.',
    keywords: ['Friendly', 'Conversational', 'Smart'],
    steps: [
      'The app pairs people with an AI helper, so the logo had to make a robot feel like a friend rather than a machine. “Ciao” is a greeting, and the brand needed to sound like one.',
      'A chat bubble is the most familiar symbol in messaging. Giving it two eyes and an antenna turned it into a face, so the bot and the conversation became one shape.',
      'Everything is rounded: thick strokes, soft corners and a bubble tail that doubles as a smile. The wordmark is set in a wide geometric face whose open counters echo the bubble.',
      'Two blues, from deep to bright, run like a gradient across the mark, borrowed from screens and the sky. A deep navy keeps it grounded and readable at small sizes.',
    ],
    colors: [
      { name: 'Ciao Blue', hex: '#0A5CF5', role: 'Primary' },
      { name: 'Sky Cyan', hex: '#12B6F7', role: 'Secondary' },
      { name: 'Bubble Aqua', hex: '#6FE0FB', role: 'Highlight' },
      { name: 'Deep Navy', hex: '#0B1A4A', role: 'Text & dark' },
      { name: 'Cloud', hex: '#F4F8FF', role: 'Background' },
    ],
    display: { family: 'Fredoka', weights: [400, 600, 700] }, text: { family: 'Nunito', weights: [400, 600, 800] },
    onDark: 'alt', mark: true, pattern: 'offset', signage: 'billboard', uses: ['app', 'social', 'tee', 'web'],
    line: 'Say ciao to smarter chats.',
  },
  {
    slug: 'funextreme', name: 'FunExtreme', sector: 'Recreational',
    client: 'Fun Extreme Technology LLC, a platform for booking adventure and recreational activities.',
    idea: 'An F and an X fused at full speed, with an arrow breaking out of the box.',
    keywords: ['Adrenaline', 'Bold', 'Upward'],
    steps: [
      'The audience is thrill-seekers, so the mark had to feel fast and a little dangerous, while the “Technology LLC” side needed to look like a dependable business.',
      'The initials F and X became the symbol. Cutting the X with a long rising arrow turned the letters into a graph that only goes up: more fun, more extreme.',
      'Sharp diagonals and sliced terminals give the letters motion. The arrow overshoots the frame on purpose, because the brand is about going past the limit.',
      'A red gradient from ember to bright adrenaline red carries the energy. The descriptor is set in a calm, widely spaced sans so the company still reads as professional.',
    ],
    colors: [
      { name: 'Adrenaline Red', hex: '#E8383A', role: 'Primary' },
      { name: 'Ember', hex: '#8A0B0B', role: 'Depth' },
      { name: 'Carbon', hex: '#0B0B0D', role: 'Text & dark' },
      { name: 'Steel', hex: '#9AA0A6', role: 'Support' },
      { name: 'Chalk', hex: '#F6F6F4', role: 'Background' },
    ],
    display: { family: 'Rubik', weights: [500, 800, 900] }, text: { family: 'Raleway', weights: [400, 500, 700] },
    onDark: 'alt', mark: true, pattern: 'diagonal', signage: 'billboard', uses: ['app', 'tee', 'cap', 'social'],
    line: 'Go past the limit.',
  },
  {
    slug: 'konekza', name: 'KoneKza', sector: 'Tech & Networking',
    client: 'A company that designs and installs networking and connectivity solutions for businesses.',
    idea: 'Two links locked into one endless loop: a connection that never drops.',
    keywords: ['Connected', 'Reliable', 'Continuous'],
    steps: [
      'KoneKza sells connections, so the logo needed to say “always on” at a glance and look as clean and reliable as a well-run network.',
      'A C and an infinity loop were merged into one continuous path. The diamond cut inside the loop is a data packet passing through the link.',
      'The loop is drawn with a single, even stroke built on two circles of the same size, so it feels engineered rather than hand-drawn.',
      'One confident green stands for “connected” and “go”, like a status light. The wordmark is a sturdy, wide sans in the same green, so the logo reads as one unit.',
    ],
    colors: [
      { name: 'Link Green', hex: '#0A9A6A', role: 'Primary' },
      { name: 'Deep Forest', hex: '#075A42', role: 'Depth' },
      { name: 'Signal Mint', hex: '#C8F0E0', role: 'Highlight' },
      { name: 'Ink', hex: '#0B1A14', role: 'Text & dark' },
      { name: 'Paper', hex: '#F5FAF7', role: 'Background' },
    ],
    display: { family: 'Exo 2', weights: [500, 700, 800] }, text: { family: 'Manrope', weights: [400, 600, 700] },
    onDark: 'own', mark: true, pattern: 'rings', signage: 'office', uses: ['web', 'lanyard', 'polo', 'mug'],
    names: { lanyard: 'Staff ID' },
    line: 'Always connected.',
  },
  {
    slug: 'sureid', name: 'SureID', sector: 'Verification',
    client: 'An identity verification product that checks documents and faces for banks and apps.',
    idea: 'A keyhole inside a shield: your identity, locked and verified.',
    keywords: ['Secure', 'Trustworthy', 'Clear'],
    steps: [
      'People hand over their ID to this product, so before anything else the logo had to make them feel safe. Trust was the whole brief.',
      'A shield is the universal sign for protection, and a keyhole says that only the right person gets in. Putting the keyhole inside the shield combined both into one symbol.',
      'The shield is a softened pentagon with rounded corners, so it feels protective rather than aggressive. The keyhole is cut as a perfect circle on a tapering stem.',
      'Green says “verified” and gold says “valuable”, like a seal of approval. The wide, rounded wordmark splits the name in two colours so “ID” stands out.',
    ],
    colors: [
      { name: 'Secure Green', hex: '#0A9A6A', role: 'Primary' },
      { name: 'Key Gold', hex: '#C8A81A', role: 'Accent' },
      { name: 'Vault', hex: '#06392A', role: 'Text & dark' },
      { name: 'Mint Seal', hex: '#D5F2E6', role: 'Highlight' },
      { name: 'Paper', hex: '#F8FBF9', role: 'Background' },
    ],
    display: { family: 'Orbitron', weights: [500, 700, 800] }, text: { family: 'Manrope', weights: [400, 600, 700] },
    onDark: 'own', mark: true, pattern: 'grid', signage: 'office', uses: ['app', 'card', 'web', 'sticker'],
    names: { card: 'Access card', sticker: 'Laptop sticker' },
    line: 'Verified in seconds.',
  },
  {
    slug: 'akila', name: 'Akila Physics', sector: 'Identity Design',
    client: 'Akila Athukorala, a physics tuition teacher who runs classes for advanced-level students.',
    idea: 'The teacher himself, inside a seal: the brand is the person students trust.',
    keywords: ['Personal', 'Authoritative', 'Local'],
    steps: [
      'In Sri Lankan tuition, students follow a teacher, not a company. The logo had to put a recognisable face on posters and class notes across the country.',
      'A portrait inside a round seal works like a stamp of quality. His name runs around the ring in Sinhala, so the brand speaks directly to his students.',
      'The photo was turned into a high-contrast black and white illustration that survives cheap printing and photocopied notes. Stars separate the lines of text in the ring.',
      'Pure black and white keeps it cheap to print and instantly legible on any colour of paper. Gold is added only as a highlight for results and achievements.',
    ],
    colors: [
      { name: 'Ink Black', hex: '#0B0B0C', role: 'Primary' },
      { name: 'Paper White', hex: '#F7F5F0', role: 'Background' },
      { name: 'Exam Gold', hex: '#E3B341', role: 'Accent' },
      { name: 'Chalk Grey', hex: '#8A8A8F', role: 'Support' },
      { name: 'Blackboard', hex: '#1E2A26', role: 'Dark' },
    ],
    display: { family: 'Abhaya Libre', weights: [500, 700, 800] }, text: { family: 'Inter', weights: [400, 500, 700] },
    onDark: 'plate', illustrated: true, mark: false, pattern: 'rings', signage: 'billboard', uses: ['social', 'book', 'tee', 'bag'],
    names: { book: 'Class notes', bag: 'Tote bag' },
    line: 'Physics, made simple.',
  },
  {
    slug: 'bumpie', name: 'Bumpie', sector: 'Software Brand',
    client: 'A software platform that helps parents-to-be share and monetize their maternity journey.',
    idea: 'A baby curled up inside the B: the brand holds what matters most.',
    keywords: ['Warm', 'Caring', 'Playful'],
    steps: [
      'Bumpie is about pregnancy, so the logo had to feel tender and joyful, never clinical, while still looking like a real product people would pay for.',
      'The bowl of the B became a baby bump, with a tiny baby curled up inside it. A small heart above the i adds the love without spelling it out.',
      'The name is written in a bouncy, hand-lettered script whose curves swell like a bump. The baby is drawn in the same weight so it sits inside the letter naturally.',
      'A soft violet is gentle and gender-neutral, which mattered for a parenting brand. Lilac and blush pink support it, and a deep plum keeps text readable.',
    ],
    colors: [
      { name: 'Bump Purple', hex: '#9A4FD9', role: 'Primary' },
      { name: 'Lilac', hex: '#C9A6F2', role: 'Secondary' },
      { name: 'Blush', hex: '#F3C6DC', role: 'Accent' },
      { name: 'Night Plum', hex: '#2A1640', role: 'Text & dark' },
      { name: 'Cream', hex: '#FBF7F2', role: 'Background' },
    ],
    display: { family: 'Grand Hotel', weights: [400] }, text: { family: 'Nunito', weights: [400, 600, 800] },
    onDark: 'own', mark: false, pattern: 'offset', signage: 'office', uses: ['app', 'social', 'tee', 'box'],
    names: { tee: 'Maternity T-shirt', box: 'Gift box' },
    line: 'Every bump, celebrated.',
  },
  {
    slug: 'celeritas', name: 'Celeritas', sector: 'Logistics Branding',
    client: 'An agent management system for an international courier service.',
    idea: 'A lightning strike through a turning globe: deliveries that move at speed.',
    keywords: ['Speed', 'Global', 'Energetic'],
    steps: [
      '“Celeritas” is Latin for speed, and the system runs a courier network across countries. The logo had to feel fast and international at once.',
      'A circle that turns like an arrow suggests a globe and a round trip, and a red lightning bolt cuts through it as the shortest route between two points.',
      'The circle is broken into two sweeping arcs, black on top and green below, so it spins. The bolt is drawn with sharp angles to contrast with the curves.',
      'Red for urgency and green for “delivered” tell the story of every parcel. The bold, slightly wide wordmark in red is built to read on vans and labels.',
    ],
    colors: [
      { name: 'Velocity Red', hex: '#B8121B', role: 'Primary' },
      { name: 'Route Green', hex: '#0BA52F', role: 'Secondary' },
      { name: 'Asphalt', hex: '#101112', role: 'Text & dark' },
      { name: 'Signal Mint', hex: '#BFF0CF', role: 'Highlight' },
      { name: 'Cloud', hex: '#F4F4F2', role: 'Background' },
    ],
    display: { family: 'Russo One', weights: [400] }, text: { family: 'Roboto', weights: [400, 500, 700] },
    onDark: 'alt', mark: true, pattern: 'diagonal', signage: 'van', uses: ['web', 'box', 'cap', 'lanyard'],
    names: { box: 'Parcel', lanyard: 'Agent ID' },
    line: 'Delivered at the speed of now.',
  },
  {
    slug: 'dairy', name: 'Lanka Dairy', sector: 'Corporate Identity',
    client: 'Lanka Dairy Engineers, a company that produces and distributes fresh dairy milk.',
    idea: 'A cow on green pasture under palm trees: fresh milk from the Sri Lankan countryside.',
    keywords: ['Fresh', 'Natural', 'Local'],
    steps: [
      'Buyers of milk want to know where it comes from. The logo had to show a real, local farm, not a factory.',
      'A white cow standing on a round hill of green pasture tells the whole story. Palm trees and a blue sky behind it place the farm firmly in Sri Lanka.',
      'Everything sits inside a circle that can be printed on a bottle cap. The ground curves like the globe and continues past the circle as a sweeping horizon.',
      'Fresh greens lead, with lagoon blue for water and sky, and the white of milk at the centre. The italic, condensed wordmark moves forward like a delivery truck.',
    ],
    colors: [
      { name: 'Pasture Green', hex: '#129C1C', role: 'Primary' },
      { name: 'Palm Leaf', hex: '#0B5A1C', role: 'Depth' },
      { name: 'Lagoon Blue', hex: '#2A4A9A', role: 'Secondary' },
      { name: 'Sun Yellow', hex: '#F6C21C', role: 'Accent' },
      { name: 'Milk', hex: '#FFF9EC', role: 'Background' },
    ],
    display: { family: 'Saira Condensed', weights: [600, 700, 800], italic: true }, text: { family: 'Source Sans 3', weights: [400, 600, 700] },
    onDark: 'plate', mark: true, pattern: 'rings', signage: 'van', uses: ['bottle', 'box', 'bag', 'polo'],
    names: { bottle: 'Milk bottle', bag: 'Tote bag' },
    line: 'Fresh from our farms.',
  },
  {
    slug: 'dns', name: 'D.N.S.', sector: 'Community Club',
    client: 'The Department of Network and Security’s community club at NSBM Green University.',
    idea: 'Network nodes arranged into a shield-like diamond: networking and security in one figure.',
    keywords: ['Connected', 'Protected', 'Student'],
    steps: [
      'The club brings together students of networking and cyber security, so the mark had to speak to both halves of the department.',
      'Rounded diamonds became network nodes, linked to a central hub the way devices join a switch. Together they form a larger diamond, a shape that guards its centre.',
      'Every node is the same rotated square on a strict grid, so the mark feels like a technical diagram. The links narrow toward the hub to show traffic flowing in.',
      'Blue for networking and green for security alternate across the nodes, with a lime highlight for energy. The full department name sits below in a heavy sans.',
    ],
    colors: [
      { name: 'Node Green', hex: '#3CB84A', role: 'Primary' },
      { name: 'Network Blue', hex: '#1A5AA0', role: 'Primary' },
      { name: 'Signal Lime', hex: '#8CC83C', role: 'Accent' },
      { name: 'Ink', hex: '#0C0F14', role: 'Text & dark' },
      { name: 'Mist', hex: '#EEF3F0', role: 'Background' },
    ],
    display: { family: 'Archivo Black', weights: [400] }, text: { family: 'Archivo', weights: [400, 500, 700] },
    onDark: 'alt', mark: true, pattern: 'grid', signage: 'stage', uses: ['tee', 'lanyard', 'social', 'sticker'],
    names: { lanyard: 'Event pass', sticker: 'Laptop sticker' },
    line: 'Connect. Protect. Grow.',
  },
  {
    slug: 'electra', name: 'Electra', sector: 'Energy Software',
    client: 'Project Electra, a university software project for monitoring solar energy.',
    idea: 'A cloud wired like a circuit board: solar energy, managed in the cloud.',
    keywords: ['Clean', 'Technical', 'Bright'],
    steps: [
      'Electra collects data from solar panels and shows it online. The logo needed to connect energy with cloud software in one clear picture.',
      'A cloud is the obvious sign for online software, and circuit traces rising inside it turn the cloud into a working board, with power running through it.',
      'The traces end in small nodes at different heights, like a bar chart of rising output. The bold condensed type below stacks “Project” over “Electra”.',
      'A single bright solar cyan keeps the mark clean and modern. A spark of yellow is kept for alerts and highlights in the product, like the sun itself.',
    ],
    colors: [
      { name: 'Solar Cyan', hex: '#18B8DA', role: 'Primary' },
      { name: 'Circuit Navy', hex: '#0B2A3A', role: 'Text & dark' },
      { name: 'Spark Yellow', hex: '#FFD23F', role: 'Accent' },
      { name: 'Panel Blue', hex: '#0E6E8C', role: 'Depth' },
      { name: 'Cloud', hex: '#F2FBFD', role: 'Background' },
    ],
    display: { family: 'Teko', weights: [500, 600, 700] }, text: { family: 'Exo 2', weights: [400, 500, 700] },
    onDark: 'own', mark: true, pattern: 'grid', signage: 'office', uses: ['web', 'app', 'sticker', 'polo'],
    names: { sticker: 'Inverter label' },
    line: 'Power you can see.',
  },
  {
    slug: 'gaming', name: 'Gaming Community', sector: 'University Life',
    client: 'The official Gaming Community of NSBM Green University.',
    idea: 'An armoured warrior on a shield: the university’s gamers, ready for battle.',
    keywords: ['Competitive', 'Powerful', 'Team'],
    steps: [
      'The club competes in esports tournaments, so the logo had to look like it belonged next to professional team badges on a stream overlay.',
      'Esports teams use mascots, so the community got a green armoured warrior. It sits on a shield, the classic sign of a team badge.',
      'The mascot is drawn with thick outlines and strong shadows so it stays sharp when shrunk to a profile picture. The NSBM banner crosses the shield like a sash.',
      'NSBM green ties the club to the university, with deep navy for the banner and steel gold trim for a trophy feel. Black outlines hold it all together.',
    ],
    colors: [
      { name: 'Arena Green', hex: '#1A8A3A', role: 'Primary' },
      { name: 'Shield Navy', hex: '#0B0B4A', role: 'Secondary' },
      { name: 'Trophy Gold', hex: '#C9A24A', role: 'Accent' },
      { name: 'Night', hex: '#07070A', role: 'Dark' },
      { name: 'Volt Lime', hex: '#7BD389', role: 'Highlight' },
    ],
    display: { family: 'Black Ops One', weights: [400] }, text: { family: 'Rajdhani', weights: [500, 600, 700] },
    onDark: 'own', illustrated: true, mark: false, pattern: 'diagonal', signage: 'stage', uses: ['jersey', 'social', 'mousepad', 'cap'],
    line: 'Level up together.',
  },
  {
    slug: 'gears', name: 'Gears & Glam', sector: 'Apparel Brand',
    client: 'A clothing brand that sells glamorous, modern fashion, with the slogan “Elegance in every gear”.',
    idea: 'A G that turns like a gear and shines like a ring: fashion with engineering behind it.',
    keywords: ['Elegant', 'Modern', 'Precise'],
    steps: [
      'The name joins two worlds, the mechanics of gears and the shine of glam. The logo had to feel like a luxury label, not a hardware store.',
      'A single G is drawn as nested arcs that rotate like the teeth of a gear, while its gold finish and round form recall jewellery.',
      'The G is built from concentric circles with one clean cut, so it looks precise. The wordmark is widely spaced capitals, the way fashion houses set their names.',
      'Gold against black is the classic language of luxury. Champagne and ivory soften it for packaging, and the tagline sits on a thin gold rule.',
    ],
    colors: [
      { name: 'Glam Gold', hex: '#D89A3A', role: 'Primary' },
      { name: 'Onyx', hex: '#0A0A0A', role: 'Text & dark' },
      { name: 'Champagne', hex: '#F3E3C3', role: 'Highlight' },
      { name: 'Bronze', hex: '#9A6A2A', role: 'Depth' },
      { name: 'Ivory', hex: '#FBF8F2', role: 'Background' },
    ],
    display: { family: 'Josefin Sans', weights: [300, 600, 700] }, text: { family: 'Cormorant Garamond', weights: [400, 500, 600], italic: true },
    onDark: 'alt', mark: true, pattern: 'rings', signage: 'store', uses: ['bag', 'box', 'tag', 'social'],
    names: { bag: 'Shopping bag', box: 'Gift box' },
    line: 'Elegance in every gear.',
  },
  {
    slug: 'gevents', name: 'GEvents', sector: 'Event Management',
    client: 'A startup that plans events and handles everything from venues to logistics.',
    idea: 'A bold 3D G with the word “Events” riding its curve like a banner.',
    keywords: ['Celebration', 'Bold', 'Organised'],
    steps: [
      'An events company sells excitement, but clients also need to trust it with their budget. The logo had to be loud and well put together.',
      'The G stands for the company and wraps around like a stage or a ribbon. “Events” runs along its edge, as if printed on a banner hanging from it.',
      'The G is extruded into 3D with glossy highlights, so it looks like a physical sign on stage. Its heavy, rounded form keeps it friendly.',
      'Red is the colour of celebrations, from carpets to ribbons. Deep crimson gives it depth, and black keeps the type sharp and businesslike.',
    ],
    colors: [
      { name: 'Event Red', hex: '#D8191A', role: 'Primary' },
      { name: 'Crimson', hex: '#7A0A0A', role: 'Depth' },
      { name: 'Ink', hex: '#0B0B0B', role: 'Text & dark' },
      { name: 'Blush', hex: '#FFD9D6', role: 'Highlight' },
      { name: 'White', hex: '#FFFFFF', role: 'Background' },
    ],
    display: { family: 'Oswald', weights: [500, 600, 700] }, text: { family: 'Poppins', weights: [400, 500, 600] },
    onDark: 'own', mark: false, pattern: 'offset', signage: 'stage', uses: ['lanyard', 'invite', 'social', 'tee'],
    names: { lanyard: 'Event pass' },
    line: 'We make moments.',
  },
  {
    slug: 'grubit', name: 'Grubit', sector: 'Food Tech',
    client: 'A food delivery service connecting hungry people with local restaurants.',
    idea: 'A smiling chef riding a swoosh of flavour, with a spoon and fork raised to cheer.',
    keywords: ['Tasty', 'Playful', 'Quick'],
    steps: [
      'Food delivery is about appetite and speed. The logo needed to make people smile and feel hungry before they open the app.',
      'A chef’s hat and moustache give a friendly face, and a spoon and fork cross like a cheers. The G of the wordmark sweeps out into a swoosh that carries everything.',
      'The letters bounce along a curved baseline, as if dancing on the plate. Rounded shapes everywhere keep it cheerful and easy to read on a phone.',
      'Ketchup red and mustard yellow are classic appetite colours, used by food brands worldwide. Charcoal and cream keep the system calm around them.',
    ],
    colors: [
      { name: 'Ketchup', hex: '#E8192A', role: 'Primary' },
      { name: 'Mustard', hex: '#F8B448', role: 'Secondary' },
      { name: 'Saffron', hex: '#F7962E', role: 'Accent' },
      { name: 'Charcoal', hex: '#2A2220', role: 'Text & dark' },
      { name: 'Cream', hex: '#FFF6E8', role: 'Background' },
    ],
    display: { family: 'Baloo 2', weights: [600, 700, 800] }, text: { family: 'Nunito', weights: [400, 600, 800] },
    onDark: 'own', mark: false, pattern: 'offset', signage: 'van', uses: ['app', 'box', 'cup', 'bag'],
    names: { box: 'Meal box', cup: 'Drink cup', bag: 'Delivery bag' },
    line: 'Grub it, love it.',
  },
  {
    slug: 'hassle', name: 'HassleFree', sector: 'Courier Service',
    client: 'A courier service that puts fast delivery and good customer support first.',
    idea: 'An H and an F that share one stroke, the way a good courier shares the load.',
    keywords: ['Simple', 'Smooth', 'Dependable'],
    steps: [
      'The promise is in the name: sending a parcel without the hassle. The logo had to look effortless and calm, not busy.',
      'The initials H and F are joined so the second stroke of the H becomes the stem of the F. One shared stroke means one less step, which is the brand in a single move.',
      'The letters are built from broad, flat-ended strokes with a diagonal link, like a road changing lanes. Big counters keep it legible on parcel labels.',
      'A soft gradient from violet to teal feels modern and friendly, like a smooth handover. A dark ink and pale mist frame it for documents and the app.',
    ],
    colors: [
      { name: 'Express Violet', hex: '#8878E8', role: 'Primary' },
      { name: 'Route Teal', hex: '#6CB8A8', role: 'Secondary' },
      { name: 'Slate Blue', hex: '#7898B8', role: 'Support' },
      { name: 'Ink', hex: '#141428', role: 'Text & dark' },
      { name: 'Mist', hex: '#EEF1F7', role: 'Background' },
    ],
    display: { family: 'Space Grotesk', weights: [500, 600, 700] }, text: { family: 'Inter', weights: [400, 500, 600] },
    onDark: 'own', mark: false, pattern: 'diagonal', signage: 'van', uses: ['box', 'app', 'polo', 'web'],
    names: { box: 'Parcel' },
    line: 'Delivery, without the hassle.',
  },
  {
    slug: 'heal', name: 'HealHub', sector: 'Healthcare IT',
    client: 'A university software project that manages patients’ health records.',
    idea: 'A heart held inside a drop: care and the lifeblood of medicine, in one line.',
    keywords: ['Caring', 'Calm', 'Trustworthy'],
    steps: [
      'Health records are sensitive, so the brand had to feel caring and calm, not like cold hospital software.',
      'A drop is the sign of blood and medicine, and a heart inside it says care. Drawing both with one continuous line shows that the system keeps everything connected.',
      'The drop is a single, even outline that loops into the heart, with the wordmark tucked into its curve. “Heal” is outlined and “Hub” is solid, to show one leads to the other.',
      'Black line art keeps it clean and clinical. A soft teal accent and mint background bring calm when it’s used in the product.',
    ],
    colors: [
      { name: 'Care Black', hex: '#0A0A0B', role: 'Primary' },
      { name: 'Pulse Teal', hex: '#2AB3A6', role: 'Accent' },
      { name: 'Soft Mint', hex: '#DFF5F1', role: 'Highlight' },
      { name: 'Steel Grey', hex: '#8A9096', role: 'Support' },
      { name: 'White', hex: '#FFFFFF', role: 'Background' },
    ],
    display: { family: 'Urbanist', weights: [400, 600, 800] }, text: { family: 'Inter', weights: [400, 500, 600] },
    onDark: 'alt', mark: false, pattern: 'offset', signage: 'office', uses: ['app', 'web', 'lanyard', 'card'],
    names: { card: 'Patient card', lanyard: 'Staff badge' },
    line: 'Care, connected.',
  },
  {
    slug: 'hnc', name: 'HNC', sector: 'Personal Brand',
    client: 'A gaming streamer who needed a mascot for their channels and merchandise.',
    idea: 'A tough rabbit with a carrot and a blaster: cute and dangerous, like the streams.',
    keywords: ['Mischievous', 'Loud', 'Memorable'],
    steps: [
      'Streamers live on personality. The logo had to work as a channel icon, a sticker and a T-shirt, and make viewers remember the name.',
      'A rabbit with an angry frown, holding a carrot and a weapon, mixes cute with chaos, which is exactly the tone of the streams.',
      'The mascot is drawn in a bold esports style with thick outlines, and the HNC letters underneath are chunky and glitched with red to look like they’ve been hit.',
      'Teal fur and carrot orange are complementary, so the rabbit pops on any screen. Dark plum outlines and a red glitch keep it punchy.',
    ],
    colors: [
      { name: 'Rabbit Teal', hex: '#0AA8B8', role: 'Primary' },
      { name: 'Carrot', hex: '#F88808', role: 'Secondary' },
      { name: 'Glitch Red', hex: '#E0283A', role: 'Accent' },
      { name: 'Midnight Plum', hex: '#281828', role: 'Dark' },
      { name: 'White', hex: '#FFFFFF', role: 'Light' },
    ],
    display: { family: 'Bangers', weights: [400] }, text: { family: 'Rajdhani', weights: [500, 600, 700] },
    onDark: 'own', illustrated: true, mark: false, pattern: 'diagonal', signage: 'stage', uses: ['tee', 'cap', 'social', 'mousepad'],
    line: 'Hit follow.',
  },
  {
    slug: 'imlan', name: 'IMLAN', sector: 'Education',
    client: 'IMLAN, an immersive language learning system I worked on for Pearson.',
    idea: 'A learner wearing a graduation cap, wrapped in headphones made of the letter Ω.',
    keywords: ['Immersive', 'Global', 'Learning'],
    steps: [
      'IMLAN teaches languages through immersion: listening and speaking, not just reading. The logo had to show a student fully inside the experience.',
      'Headphones wrap around a graduation cap, so the learner is surrounded by sound. The headphones are shaped like an omega, a nod to the end goal: fluency.',
      'The figure is built from one smooth line that rises into the headband and settles into shoulders, like a person sitting comfortably to learn.',
      'A deep learning teal feels academic but modern, with a dark ocean blue for depth. A graduate gold accent marks achievements in the product.',
    ],
    colors: [
      { name: 'Learning Teal', hex: '#0888A8', role: 'Primary' },
      { name: 'Deep Ocean', hex: '#0B4A66', role: 'Depth' },
      { name: 'Graduate Gold', hex: '#F2B43A', role: 'Accent' },
      { name: 'Ink', hex: '#0B0B0C', role: 'Text & dark' },
      { name: 'Paper', hex: '#F4FAFC', role: 'Background' },
    ],
    display: { family: 'Lexend', weights: [500, 700, 800] }, text: { family: 'Lexend', weights: [300, 400, 500] },
    onDark: 'alt', mark: true, pattern: 'rings', signage: 'office', uses: ['app', 'web', 'book', 'bag'],
    names: { book: 'Workbook', bag: 'Tote bag' },
    line: 'Learn it by living it.',
  },
  {
    slug: 'ohl', name: 'OHL', sector: 'Logo Redesign',
    client: 'OHL, an existing brand that wanted a modern logo for its future promotions.',
    idea: 'A golden omega standing on its own pedestal, like a trophy.',
    keywords: ['Prestige', 'Bold', 'Timeless'],
    steps: [
      'This was a redesign, so the brand had to stay recognisable while feeling more confident and modern for new campaigns.',
      'The Ω, the last letter of the Greek alphabet, means the ultimate. Standing it upright on two feet turns it into a trophy, the best of the best.',
      'The omega is given depth with an extruded side and soft gradients, so it reads as a solid gold object. The letters OHL below lean forward in a bold italic serif.',
      'Gold and amber say prestige, and a royal blue for the letters contrasts it strongly, so the logo reads clearly at any size.',
    ],
    colors: [
      { name: 'Omega Gold', hex: '#F8D43A', role: 'Primary' },
      { name: 'Amber', hex: '#F88808', role: 'Depth' },
      { name: 'Royal Blue', hex: '#283898', role: 'Secondary' },
      { name: 'Ink', hex: '#0B0D1A', role: 'Text & dark' },
      { name: 'Ivory', hex: '#FFFBEF', role: 'Background' },
    ],
    display: { family: 'Playfair Display', weights: [700, 800, 900], italic: true }, text: { family: 'Lato', weights: [400, 700] },
    onDark: 'alt', mark: true, pattern: 'grid', signage: 'billboard', uses: ['social', 'cap', 'cup', 'box'],
    names: { cup: 'Coffee cup', box: 'Gift box' },
    line: 'Nothing beyond.',
  },
  {
    slug: 'phurl', name: 'PhURL', sector: 'Cyber Security',
    client: 'PhURL, my machine learning system that detects phishing URLs and keeps people safe online.',
    idea: 'A triangle inside a triangle, crossed by a line: a warning sign that scans the link.',
    keywords: ['Alert', 'Precise', 'Protective'],
    steps: [
      'PhURL checks links before you click them. The logo had to feel like a warning and a shield, sharp and technical, but not scary.',
      'A triangle is the universal warning sign. Putting a second triangle inside it makes a layered barrier, and the horizontal line is a scanner sweeping across the link.',
      'Everything is drawn with one thin, even stroke on a strict equilateral grid, like a technical drawing. The wordmark is set in a narrow, mono-style face inside the base.',
      'Pure black and white, like code on a terminal, keeps it serious. A single alert red is used only when a threat is found, and a scan cyan for safe results.',
    ],
    colors: [
      { name: 'Phish Black', hex: '#0A0A0A', role: 'Primary' },
      { name: 'Safe White', hex: '#F7F7F5', role: 'Background' },
      { name: 'Alert Red', hex: '#E5383B', role: 'Threat' },
      { name: 'Scan Cyan', hex: '#3BD4E5', role: 'Safe' },
      { name: 'Grey', hex: '#8A8A8A', role: 'Support' },
    ],
    display: { family: 'Michroma', weights: [400] }, text: { family: 'IBM Plex Mono', weights: [400, 500, 600] },
    onDark: 'alt', mark: false, pattern: 'diagonal', signage: 'billboard', uses: ['web', 'app', 'tee', 'sticker'],
    names: { sticker: 'Laptop sticker' },
    line: 'Check before you click.',
  },
  {
    slug: 'takg', name: 'TAKG', sector: 'Startup Branding',
    client: 'TAKG, the tech startup I co-founded.',
    idea: 'Four letters locked into one block, like parts of a machine that only work together.',
    keywords: ['Solid', 'Ambitious', 'Engineered'],
    steps: [
      'As a co-founder I wanted a mark that looked established from day one: compact, confident and impossible to confuse with anyone else.',
      'T, A, K and G are stacked and interlocked into a single square block, the way a small team fits its skills together. The G closes the block like a hook.',
      'The letters share strokes on a tight grid, with sharp diagonal cuts that add direction. It reads as a monogram up close and as a solid stamp from far away.',
      'One deep founder navy keeps it serious and versatile. A signal teal accent is used for the product, and ice white for clean layouts.',
    ],
    colors: [
      { name: 'Founder Navy', hex: '#082838', role: 'Primary' },
      { name: 'Ocean', hex: '#0F4A64', role: 'Depth' },
      { name: 'Signal Teal', hex: '#2EC4B6', role: 'Accent' },
      { name: 'Ice', hex: '#E8F1F5', role: 'Highlight' },
      { name: 'White', hex: '#FFFFFF', role: 'Background' },
    ],
    display: { family: 'Unbounded', weights: [500, 700, 900] }, text: { family: 'Inter', weights: [400, 500, 600] },
    onDark: 'alt', mark: false, pattern: 'grid', signage: 'office', uses: ['web', 'tee', 'mug', 'sticker'],
    names: { sticker: 'Laptop sticker' },
    line: 'Built to fit together.',
  },
  {
    slug: 'wish', name: 'WishKids', sector: 'Community Service',
    client: 'A community project that brings clean water to people affected by drought.',
    idea: 'A drop of water with a young leaf growing inside it: water that gives life back.',
    keywords: ['Hopeful', 'Fresh', 'Caring'],
    steps: [
      'The project raises money to bring water to dry villages. The logo had to show hope, not hardship, so people would want to help.',
      'A water drop is the core of the cause, and a fresh green leaf curling inside it shows what the water brings back: growth and life.',
      'The drop is layered with sweeping curves of blue and green, like a wave wrapping a sprout. The name is hand-written, as if by a child, to keep it warm.',
      'Water blues and fresh leaf greens are natural and optimistic. A cream background keeps posters and donation boxes light and friendly.',
    ],
    colors: [
      { name: 'Rain Green', hex: '#0A6A3A', role: 'Primary' },
      { name: 'Fresh Leaf', hex: '#78B818', role: 'Secondary' },
      { name: 'Water Blue', hex: '#384898', role: 'Secondary' },
      { name: 'Sky', hex: '#7FA6E0', role: 'Highlight' },
      { name: 'Cream', hex: '#F6FBF4', role: 'Background' },
    ],
    display: { family: 'Kaushan Script', weights: [400] }, text: { family: 'Quicksand', weights: [400, 500, 700] },
    onDark: 'plate', mark: true, pattern: 'offset', signage: 'billboard', uses: ['tee', 'bottle', 'box', 'social'],
    names: { bottle: 'Water bottle', box: 'Donation box' },
    line: 'Every drop grows hope.',
  },
  {
    slug: 'xuping', name: 'XUPING', sector: 'Jewellery Brand',
    client: 'Xuping Jewellery, a jewellery brand with stores and stockists in many countries.',
    idea: 'A crossed X with tapering strokes, cut like a gemstone and finished like a fine serif.',
    keywords: ['Refined', 'Luxurious', 'International'],
    steps: [
      'Jewellery is bought on trust and taste, so the logo had to feel refined and international, quiet enough to sit next to the pieces.',
      'The X is the first letter of the name and is shaped like two blades crossing. Its strokes taper to points like the facets of a cut stone.',
      'The wordmark is a light, elegant serif with generous spacing, and “Jewellery” sits between two fine lines like an engraving on a ring box.',
      'Sapphire blue is a classic gemstone colour that sets the brand apart from the usual gold. Platinum and a touch of gold leaf finish the packaging.',
    ],
    colors: [
      { name: 'Sapphire', hex: '#283898', role: 'Primary' },
      { name: 'Midnight', hex: '#10164A', role: 'Depth' },
      { name: 'Gold Leaf', hex: '#C9A24A', role: 'Accent' },
      { name: 'Platinum', hex: '#E7E7EE', role: 'Highlight' },
      { name: 'Pearl', hex: '#FBFAF7', role: 'Background' },
    ],
    display: { family: 'Cormorant Garamond', weights: [400, 500, 600] }, text: { family: 'Jost', weights: [300, 400, 500] },
    onDark: 'alt', mark: true, pattern: 'diagonal', signage: 'store', uses: ['box', 'bag', 'tag', 'social'],
    names: { box: 'Ring box', bag: 'Shopping bag', tag: 'Jewellery tag' },
    line: 'Crafted to shine.',
  },
  {
    slug: 'yasupi', name: 'Yasupi', sector: 'Import & Export',
    client: 'Yasupi Global, a company that imports, exports and distributes goods worldwide.',
    idea: 'A globe crossed by a plane and a ship, held between import and export arrows.',
    keywords: ['Global', 'Reliable', 'Moving'],
    steps: [
      'Yasupi moves goods between countries by air and sea. The logo had to explain the business at a glance to suppliers and customers abroad.',
      'A globe sits at the centre, with a plane flying over it and a cargo ship sailing across it. Two arrows circle it, one for import and one for export.',
      'The arrows wrap the globe in opposite directions, so the mark always feels in motion. The O in “Global” becomes a location pin, marking where goods arrive.',
      'Ocean blue for the sea routes, trade green for exports and a strong red for the name make it bold enough for shipping containers and trucks.',
    ],
    colors: [
      { name: 'Ocean Blue', hex: '#0898E8', role: 'Primary' },
      { name: 'Cargo Red', hex: '#E81828', role: 'Secondary' },
      { name: 'Trade Green', hex: '#087848', role: 'Accent' },
      { name: 'Navy', hex: '#284898', role: 'Depth' },
      { name: 'Ink', hex: '#0B0B0B', role: 'Text & dark' },
    ],
    display: { family: 'Alfa Slab One', weights: [400] }, text: { family: 'Roboto', weights: [400, 500, 700] },
    onDark: 'alt', illustrated: true, mark: false, pattern: 'rings', signage: 'van', uses: ['box', 'web', 'polo', 'cap'],
    names: { box: 'Export carton' },
    line: 'Your world, delivered.',
  },
  {
    slug: 'zen', name: 'ZEN', sector: 'Artist Branding',
    client: 'ZEN, my own personal brand for freelance creative work.',
    idea: 'The name framed by mirrored brushstroke leaves: calm at the centre, energy around it.',
    keywords: ['Balanced', 'Artistic', 'Bold'],
    steps: [
      'My freelance work covers design, art and code, so the brand needed to feel artistic but disciplined, like the balance the word “zen” suggests.',
      'The name sits at the centre, held by bursts of sharp leaves above and below that mirror each other, like a calm mind with creativity flowing around it.',
      'The leaves are drawn as quick, pointed brushstrokes, perfectly mirrored on both axes. Two thin rules frame the letters, which are spaced wide and steady.',
      'A deep vermilion red, the colour of seals on Asian paintings, is the signature. Ink black and rice paper complete it, with a soft blossom pink for highlights.',
    ],
    colors: [
      { name: 'Zen Red', hex: '#B8182A', role: 'Primary' },
      { name: 'Ink', hex: '#140A0C', role: 'Text & dark' },
      { name: 'Blossom', hex: '#E86A7A', role: 'Highlight' },
      { name: 'Seal Gold', hex: '#C9A24A', role: 'Accent' },
      { name: 'Rice Paper', hex: '#F6EFE6', role: 'Background' },
    ],
    display: { family: 'Cinzel', weights: [500, 700, 800] }, text: { family: 'Lato', weights: [300, 400, 700] },
    onDark: 'alt', mark: false, pattern: 'rings', signage: 'office', uses: ['tee', 'bag', 'social', 'book'],
    names: { book: 'Sketchbook', bag: 'Tote bag' },
    line: 'Create with calm.',
  },
];

export const logoBrand = (slug: string) => LOGO_BRANDS.find((b) => b.slug === slug);

/** The artwork, light-on-dark where asked and drawn. */
export const art = (b: LogoBrand, which: 'logo' | 'mark', dark = false) => {
  const name = which === 'mark' && !b.mark ? 'logo' : which;
  return `/Images/logos/${b.slug}/${name}${dark && b.onDark === 'alt' ? '-dark' : ''}.webp`;
};

/** The Google Fonts stylesheet for a brand's two faces. */
export const fontsHref = (b: LogoBrand) => {
  const fam = (f: Face) => `family=${f.family.replace(/ /g, '+')}:${f.italic ? 'ital,' : ''}wght@${f.weights.flatMap((w) => (f.italic ? [`0,${w}`, `1,${w}`] : [`${w}`])).join(';')}`;
  const faces = b.display.family === b.text.family ? [b.display] : [b.display, b.text];
  return `https://fonts.googleapis.com/css2?${faces.map(fam).join('&')}&display=swap`;
};
