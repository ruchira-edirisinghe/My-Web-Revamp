import { PERSON, SITE_URL } from '@/lib/site';

// schema.org Person + WebSite, rendered once in the root layout. This is what lets
// Google treat the site and the profiles in `sameAs` as one person when someone
// searches the name, and is the groundwork for a knowledge panel.
const PERSON_ID = `${SITE_URL}/#person`;

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PERSON.name,
      givenName: 'Ruchira',
      familyName: 'Edirisinghe',
      url: `${SITE_URL}/`,
      image: SITE_URL + PERSON.image,
      jobTitle: PERSON.jobTitle,
      email: `mailto:${PERSON.email}`,
      nationality: { '@type': 'Country', name: PERSON.country },
      address: { '@type': 'PostalAddress', addressCountry: 'LK' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: PERSON.alumniOf },
      worksFor: PERSON.worksFor.map((name) => ({ '@type': 'Organization', name })),
      knowsAbout: PERSON.knowsAbout,
      sameAs: PERSON.sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: PERSON.name,
      alternateName: ['Ruchira Edirisinghe Portfolio', 'Ruchira'],
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
      about: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: `${PERSON.name} - ${PERSON.jobTitle}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': PERSON_ID },
    },
  ],
};

export default function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escape `<` so no string in the data can close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\u003c') }}
    />
  );
}
