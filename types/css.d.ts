import 'react';

// Allow CSS custom properties (e.g. `--card-index`, `--para-delay`) in inline
// `style={{ … }}` objects. The original site set these via inline styles; this
// augmentation keeps them type-clean across all components without per-call casts.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
