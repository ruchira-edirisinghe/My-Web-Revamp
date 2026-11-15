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
  '400': {
    name: 'Bad request',
    title: 'That signal came through garbled',
    text: "Something in the request didn't make sense, so the page couldn't load. A mistyped or half-copied link is the usual cause. Check the address, or start again from the homepage.",
    action: 'work',
  },
  '401': {
    name: 'Unauthorized',
    title: 'Clearance required',
    text: "This area needs you to sign in, and this request didn't come with a valid sign-in. Everything public on the site is one click away from the homepage.",
    action: 'contact',
  },
  '403': {
    name: 'Forbidden',
    title: 'Restricted airspace',
    text: "You don't have permission to view this page. It's closed off on purpose. The rest of the site is open, so head back home, or get in touch if you think this is a mistake.",
    action: 'contact',
  },
  '404': {
    name: 'Page not found',
    title: 'This page drifted out of orbit',
    text: "The page you're looking for doesn't exist or may have moved. Let's get you back to familiar stars.",
    action: 'work',
  },
  '408': {
    name: 'Request timeout',
    title: 'Signal lost in transit',
    text: 'The request took too long to arrive, so the connection was closed. A slow or patchy network is the usual cause. Give it another try.',
    action: 'retry',
  },
  '410': {
    name: 'Gone',
    title: 'This star has burned out',
    text: "This page used to be here, but it was removed for good and won't be coming back. The rest of my work is still a click away.",
    action: 'work',
  },
  '429': {
    name: 'Too many requests',
    title: 'Easy on the thrusters',
    text: 'Too many requests came from your connection in a short time, so things are paused for a moment. Wait a little, then try again.',
    action: 'retry',
  },
  '500': {
    name: 'Internal server error',
    title: 'Something broke on board',
    text: "An unexpected error stopped this page from loading. It's nothing you did. Try again in a moment, or head back to the homepage.",
    action: 'retry',
  },
  '502': {
    name: 'Bad gateway',
    title: "The relay station isn't answering",
    text: 'A server between you and this site sent back a response that made no sense. It usually clears up within a minute, so try again shortly.',
    action: 'retry',
  },
  '503': {
    name: 'Service unavailable',
    title: 'Docked for maintenance',
    text: "The site is offline for a short while, either for maintenance or because it's busy. It'll be back soon, so please check again in a little while.",
    action: 'retry',
  },
  '504': {
    name: 'Gateway timeout',
    title: 'No reply from mission control',
    text: 'A server between you and this site waited too long for an answer. This is usually brief, so try again in a moment.',
    action: 'retry',
  },
} satisfies Record<string, ErrorPage>;

export type ErrorCode = keyof typeof ERROR_PAGES;

export const ERROR_CODES = Object.keys(ERROR_PAGES) as ErrorCode[];

export function isErrorCode(code: string): code is ErrorCode {
  return Object.hasOwn(ERROR_PAGES, code);
}
