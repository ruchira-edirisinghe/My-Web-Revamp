---
name: design-avoid-generic-ai-look
description: User's portfolio case-study pages should not look "generic AI generated"
metadata:
  type: feedback
---

For the project case-study pages (e.g. `all-projects/technosphere-case-study.html` + its CSS in `styles/projects/`), the user flagged the UI as "too generic AI generated looking" and wanted it fixed without touching the site header, footer, or content structure (CSS-only).

**Why:** This is a designer's portfolio; the look must read as intentionally crafted, and styling should fit each project's brand (Technosphere = a FOSS/CTF tech convention).

**How to apply:** De-genericize by — replacing mismatched "wedding/cursive" display fonts (Cinzel Decorative, Great Vibes) with brand-consistent type (the documented brand font is **Poppins**; use JetBrains Mono for micro-labels/numbers/metrics; keep Cormorant Garamond only for editorial pull-quotes); unifying off-brand colors to the real palette (brand purple #7B6FFF + cyan #38D9F5 highlight + emerald #10B981 "signal"), not a default AI blue; avoiding uniform glassmorphism + the same lift+glow on every card — give signature, varied detail (e.g. hover "targeting-bracket" corners, notched icon badges, mono section numbering with ticks). Keep emoji icons (they're content) but frame them deliberately.
