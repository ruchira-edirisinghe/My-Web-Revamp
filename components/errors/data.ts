// The words on each HTTP error page. app/not-found.tsx shows the 404, and
// app/errors/[code]/ exports every entry as a static page at /errors/<code>/
// for a host or proxy to serve when it answers with that status.

/** The second button beside Back to home. */
export type ErrorAction = 'work' | 'contact' | 'retry';

export interface ErrorPage {
  /** The status's name, shown in the pill after "Error <code> ·". */
  name: string;
  title: string;
  text: string;
  action: ErrorAction;
}

export const ERROR_PAGES = {
  '404': {
    name: 'Page not found',
    title: 'This page drifted out of orbit',
    text: "The page you're looking for doesn't exist or may have moved. Let's get you back to familiar stars.",
    action: 'work',
  },
} satisfies Record<string, ErrorPage>;

export type ErrorCode = keyof typeof ERROR_PAGES;

export const ERROR_CODES = Object.keys(ERROR_PAGES) as ErrorCode[];

export function isErrorCode(code: string): code is ErrorCode {
  return Object.hasOwn(ERROR_PAGES, code);
}
