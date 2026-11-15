import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StatusScreen from '@/components/errors/StatusScreen';
import { ERROR_CODES, ERROR_PAGES, isErrorCode } from '@/components/errors/data';

// One static page per status in components/errors/data.ts, at /errors/<code>/.
// The site is a static export, so nothing here sends the status itself: these
// are for a host, proxy or CDN to serve when it answers with that code (Vercel
// already serves the 404 for missing URLs). The sitemap walk skips [code]
// folders, so they stay out of it.
export const dynamicParams = false;

export function generateStaticParams() {
  return ERROR_CODES.map((code) => ({ code }));
}

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  if (!isErrorCode(code)) return {};
  const page = ERROR_PAGES[code];
  return {
    title: `${code} ${page.name} - Ruchira Edirisinghe`,
    description: page.text,
    // An error page is never the page to index, wherever it's served from.
    alternates: { canonical: null },
    robots: { index: false, follow: true },
  };
}

export default async function ErrorCodePage({ params }: Props) {
  const { code } = await params;
  if (!isErrorCode(code)) notFound();
  return <StatusScreen code={code} />;
}
