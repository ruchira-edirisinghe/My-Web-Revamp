// Single source for who the site is about and where it lives, so the metadata,
// robots.txt, sitemap.xml and the JSON-LD Person all say the same thing.

// Deployed origin - set NEXT_PUBLIC_SITE_URL at build time (e.g. in Vercel's
// env vars) when the site moves to a custom domain; every absolute URL follows it.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ruchiraedirisinghe.vercel.app'
).replace(/\/+$/, '');

export const PERSON = {
  name: 'Ruchira Edirisinghe',
  jobTitle: 'UI/UX Engineer & Game Developer',
  email: 'ruchira.ed@proton.me',
  image: '/Images/mynew.png',
  country: 'Sri Lanka',
  alumniOf: 'University of Plymouth',
  worksFor: ['FunExtreme Technology LLC', 'Techwire Lanka', 'Trex Labs'],
  knowsAbout: [
    'UI/UX Design',
    'Product Design',
    'Front-end Development',
    'Next.js',
    'React',
    'Unity',
    'Game Development',
    'Graphic Design',
    'Computer Security',
  ],
  // Profiles that are Ruchira's own - this is the `sameAs` list Google uses to
  // tie the site and the social accounts to one person.
  sameAs: [
    'https://www.linkedin.com/in/ruchiraedirisinghe/',
    'https://github.com/ruchira-edirisinghe',
    'https://www.behance.net/ruchiraedirisinghe',
    'https://www.instagram.com/ruchii_zzz/',
    'https://www.youtube.com/@zenitrongaming',
    'https://www.twitch.tv/zenitrongaminglive',
    'https://www.tiktok.com/@zenitrongaming',
  ],
} as const;
