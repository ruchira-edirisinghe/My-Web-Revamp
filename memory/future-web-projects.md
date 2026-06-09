---
name: future-web-projects
description: Projects still to be added to web-projects.html and their filter categories
metadata:
  type: project
---

`web-projects.html` has a category filter (added 2026): **ALL · WEB UI/UX · MOBILE UI/UX · DEVELOPMENT**. Each project card carries a space-separated `data-category` attribute (values: `web`, `mobile`, `dev`); the filter shows a card when its `data-category` includes the selected filter (or always for "all"). The 10 existing case-study cards are all `data-category="web"`.

**Already added:** **Lottogram** (`lottogram-case-study.html`, `data-category="web mobile"`) — a betting/lottery iGaming platform designed for both desktop and mobile; its case study has a Desktop/Mobile gallery switcher (`.device-toggle` + `.device-gallery.is-desktop`/`.is-mobile`, desktop = landscape cards, mobile = portrait phone cards).

**Two projects the user will add later** — add them as `.project-card` entries (and likely case-study pages) with these categories:
- **Horse Racing Game** → `data-category="dev"` (Development)
- **Social Casino** → `data-category="web mobile"` (Web UI/UX + Mobile UI/UX)

Until **Development** has a project (Horse Racing Game), that filter shows an empty "coming soon" state (`#filter-empty`). Mobile UI/UX is no longer empty (Lottogram covers it). Cover-banner/card category tags follow the same design+development convention — see [[design-avoid-generic-ai-look]] for the overall case-study system, and remember [[github-pages-case-sensitivity]] when wiring their image paths.
