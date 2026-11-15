'use client';
import { useEffect } from 'react';
import ErrorScreen from '@/components/errors/ErrorScreen';
import RetryButton from '@/components/errors/RetryButton';

// The three faces the error screen uses. The root layout normally loads them,
// but this page replaces the layout, so it has to load them itself.
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Orbitron:wght@500;800&family=Sora:wght@600&display=swap';

/**
 * The last line: shown when the root layout itself throws, which app/error.tsx
 * can't catch. It renders its own <html> and <body> because the layout is gone,
 * and Back to home is a plain link (a full page load) rather than trusting the
 * client router.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Something went wrong - Ruchira Edirisinghe</title>
        <meta name="robots" content="noindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS_HREF} />
      </head>
      <body style={{ margin: 0, background: '#02030a' }}>
        <ErrorScreen
          code="Oops"
          label="Error · Something went wrong"
          title="The site hit a snag"
          text="Something went wrong and the site couldn't load. It's nothing you did. Try again, or head back to the homepage for a fresh start."
          tone="server"
          secondary={<RetryButton onRetry={reset} />}
          hardHome
        />
      </body>
    </html>
  );
}
