'use client';
import { useEffect } from 'react';
import ErrorScreen from '@/components/errors/ErrorScreen';
import RetryButton from '@/components/errors/RetryButton';

/**
 * Shown when a page throws while rendering in the browser, in place of Next's
 * bare "Application error" text. The root layout survives, so Try again
 * re-renders just the page (reset) and Back to home is a normal link.
 */
export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen
      code="Oops"
      label="Error · Something went wrong"
      title="This page hit a snag"
      text="Something went wrong while this page was loading. Trying again usually fixes it. If it doesn't, the homepage is a safe place to land."
      tone="server"
      secondary={<RetryButton onRetry={reset} />}
    />
  );
}
