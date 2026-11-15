import type { ReactNode } from 'react';
import ErrorScreen, { ErrorLink } from './ErrorScreen';
import RetryButton from './RetryButton';
import { ERROR_PAGES, type ErrorAction, type ErrorCode, type ErrorPage } from './data';

const SECONDARY: Record<ErrorAction, ReactNode> = {
  work: <ErrorLink href="/projects">See my work</ErrorLink>,
  contact: <ErrorLink href="/contact">Get in touch</ErrorLink>,
  retry: <RetryButton />,
};

/** The error screen for an HTTP status, with its words from data.ts. */
export default function StatusScreen({ code }: { code: ErrorCode }) {
  const page: ErrorPage = ERROR_PAGES[code];
  const secondary = SECONDARY[page.action];

  return (
    <ErrorScreen
      code={code}
      label={`Error ${code} · ${page.name}`}
      title={page.title}
      text={page.text}
      tone={code.startsWith('5') ? 'server' : 'client'}
      secondary={secondary}
    />
  );
}
