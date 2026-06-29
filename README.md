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
