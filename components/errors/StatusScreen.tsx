import ErrorScreen, { ErrorLink } from './ErrorScreen';
import { ERROR_PAGES, type ErrorCode } from './data';

/** The error screen for an HTTP status, with its words from data.ts. */
export default function StatusScreen({ code }: { code: ErrorCode }) {
  const page = ERROR_PAGES[code];
  const secondary = page.action === 'work' ? <ErrorLink href="/projects">See my work</ErrorLink> : null;

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
