# My-Web-Revamp

Personal portfolio of **Ruchira Edirisinghe** — UI/UX Engineer & Consultant.

Originally a static HTML/CSS/JS site, now a **Next.js (App Router) + React + TypeScript**
application that builds to a fully static site. The visual design, CSS, and animations
(canvas space background, water-fill preloader, scatter cursor, audio spectrum, skills-cloud
physics, image lightboxes) are a faithful port of the original.

## Tech stack

- **Next.js 15** (App Router) with **React 19** and **TypeScript**
- **Static export** (`output: 'export'`) — builds to plain HTML/CSS/JS in `out/`
- Per-page CSS imported from `styles/`; Google Fonts loaded in the root layout

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # outputs the static site to ./out
```

Deploy the contents of `out/` to any static host (GitHub Pages, Netlify, Vercel, etc.).
No server runtime is required.

## Project structure

```
app/                     App Router routes (one folder per page)
  layout.tsx             root <html>/<body>, metadata, fonts
  page.tsx               home ("/")
  about, experience,     standard pages
  contact, links,
  coming-soon/
  projects/              projects hub
    web/                 web projects + 16 case studies (web/<slug>)
    graphic/             graphic hub + 5 galleries (graphic/<slug>)
components/              shared UI + per-page client components
  StandardShell.tsx      shared chrome (nav, preloader, footer, cursor, music…)
  HomeClient.tsx, Navbar, MobileMenu, SiteFooter, Preloader, ScrollTop
  pages/                 page-specific client components
lib/
  scripts/               the original vanilla-JS animations, ported to TS modules
                         (each exports an init…() that returns a cleanup fn, run from useEffect)
  css.ts, useBodyDataPage.ts
styles/                  the original per-page CSS (imported per route)
public/                  Images/, audio/, docs/ (favicons under Images/favicon/)
```

### How the animation port works

Each original IIFE script (`styles/**/*.js`) was ported to a `lib/scripts/*.ts` module that
exports an `init…(): () => void` function. Page components run it inside a `useEffect` and call
the returned cleanup on unmount, so the canvas/rAF loops, listeners, audio context, and injected
nodes are torn down correctly (StrictMode- and navigation-safe). The CSS is imported unchanged.

## Routes

`/` · `/about` · `/experience` · `/contact` · `/links` · `/coming-soon` · `/projects` ·
`/projects/web` (+ `/projects/web/<slug>` case studies) · `/projects/graphic`
(+ `/projects/graphic/<slug>` galleries).

---

Copyright (c) 2026 Ruchira Edirisinghe. All rights reserved.

This website and its source code are the exclusive property of the author. No part of this code
may be copied, modified, distributed, used, or reproduced in any form without explicit written
permission from the author.

## Image pipeline

Everything under `public/Images` ships as **WebP** (q85). Case-study captures are
stored at up to **1920px** (the lightbox draws them at viewport width) and every
one also gets a **`<name>-card.webp` at 1100px** for the gallery marquee, whose
cards are 540px on desktop and 300px on a phone.

```bash
npm run images:check   # report what the resizer would change, touch nothing
npm run images         # resize / repack in place, write missing -card variants
npm run images:webp    # re-encode to WebP and repoint every src in the markup
```

Run them in that order: the resizer works on PNG/JPG, and the WebP pass converts
what it leaves behind, deletes the original, and rewrites the `src` / `data-full`
paths in `app/`, `components/` and `lib/`. Two things stay PNG on purpose —
`Images/favicon/**` (the manifest declares `image/png`) and `Images/mynew.png`
(the `og:image`, since some crawlers still will not take WebP; the on-page hero
uses the `.webp` copy).

The script is idempotent and only rewrites files git already has a copy of, so a
screenshot dropped in and not yet committed is reported and left alone (resizing
in place is irreversible for a file with no other copy). Pass
`--include-untracked` to override that deliberately.

After adding new captures to a case study: commit them, run `npm run images`, and
point the gallery `<img src>` at the `-card` sibling while the card's `data-full`
keeps the full-size path. `lib/cardSrc.ts` does that mapping for the galleries
built from an array.

Raw, uncropped source captures live in `assets-src/` — kept in the repo, outside
`public/`, so they are never deployed:

- `assets-src/banners/` — the ten generated 16:9 game key-art banners
- `assets-src/whack-a-mole/` — the raw browser screenshots, before the chrome crop

### Game covers are 16:9

All ten games ship `cover.webp` at **1600×900**, `cover-thumb.webp` at **700×394**
and `cover-card.webp` at **1100×619**. That matches `.project-image-wrap`, which is
`aspect-ratio: 16/9` with `object-fit: cover` — a square cover there loses the top
and bottom 44% of the artwork, which for a lockup is the wordmark. To reinstall
from the sources in `assets-src/banners/`:

```bash
node scripts/install-game-banners.mjs
npm run images:webp                    # both installers still write PNG
```

`scripts/install-wam-captures.mjs` does the same job for Whack-A-Mole's raw
captures, cropping 143px of browser chrome off the top of each. Both installers
write PNG, so follow either one with `npm run images:webp`.
