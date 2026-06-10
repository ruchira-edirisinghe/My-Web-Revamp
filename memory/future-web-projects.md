---
name: future-web-projects
description: Projects still to be added to web-projects.html and their filter categories
metadata:
  type: project
---

`web-projects.html` has a category filter (added 2026): **ALL · WEB UI/UX · MOBILE UI/UX · DEVELOPMENT**. Each project card carries a space-separated `data-category` attribute (values: `web`, `mobile`, `dev`); the filter shows a card when its `data-category` includes the selected filter (or always for "all"). The 10 existing case-study cards are all `data-category="web"`.

**Already added** (both use the Desktop/Mobile gallery switcher — `.device-toggle` + `.device-gallery.is-desktop`/`.is-mobile`, desktop = landscape cards, mobile = portrait phone cards; the lightbox in `projectui-modal.js` scopes to `.cs-panel, .device-gallery`):
- **Lottogram** (`lottogram-case-study.html`, `data-category="web mobile"`) — betting/lottery iGaming platform.
- **747 Social Casino** (`747social-case-study.html`, `data-category="web mobile"`) — social-network + casino platform.
- **Fun Extreme Technology** (`funxt-case-study.html`, `data-category="web mobile"`, added 2026-06-10) — gaming-tech corporate site (red gradient #FF5757→#CD0505 + blue-ash, Gilroy); assets in `Images/projects/funxt/` (filenames contain spaces → `%20`-encoded refs); live at funextreme-web.vercel.app.

**One project the user will add later** — add as a `.project-card` entry (and likely a case-study page):
- **Horse Racing Game** → `data-category="dev"` (Development)

Until **Development** has a project (Horse Racing Game), that filter shows an empty "coming soon" state (`#filter-empty`). Mobile UI/UX is covered by Lottogram + 747. Cover-banner/card category tags follow the same design+development convention — see [[design-avoid-generic-ai-look]] for the overall case-study system, and remember [[github-pages-case-sensitivity]] when wiring their image paths.
