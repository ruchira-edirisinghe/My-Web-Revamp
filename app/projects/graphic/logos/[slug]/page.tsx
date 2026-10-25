import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo';
import '@/styles/projects/projects.css';
import '@/styles/projects/graphic.css';
import '@/styles/projects/logo-brand.css';
import LogoBrandPage from '@/components/pages/logos/LogoBrandPage';
import { LOGO_BRANDS, art, fontsHref, logoBrand } from '@/components/pages/logos/data';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => LOGO_BRANDS.map((b) => ({ slug: b.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = logoBrand((await params).slug);
  if (!b) return {};
  return pageMeta(`/projects/graphic/logos/${b.slug}/`, {
    title: `${b.name} Logo & Brand Guidelines | Ruchira Edirisinghe`,
    description: `${b.idea} The ${b.name} logo by Ruchira Edirisinghe: the thinking behind it, its colours, type, pattern and the brand in use.`,
    image: { url: art(b, 'logo'), alt: `The ${b.name} logo` },
  });
}

export default async function Page({ params }: Props) {
  const b = logoBrand((await params).slug);
  if (!b) notFound();
  // The real-world mockups generated so far (scene-<key>.webp, see LogoBrandPage).
  const photos = fs.readdirSync(path.join(process.cwd(), 'public/Images/logos', b.slug))
    .filter((f) => f.startsWith('scene-')).map((f) => f.slice(6, -5));
  return (
    <>
      <link rel="stylesheet" href={fontsHref(b)} precedence="default" />
      <LogoBrandPage slug={b.slug} photos={photos} />
    </>
  );
}
