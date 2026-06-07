---
name: github-pages-case-sensitivity
description: This portfolio deploys to GitHub Pages (Linux, case-sensitive paths) — asset casing matters
metadata:
  type: project
---

This repo is a static site deployed to GitHub Pages, which serves from a **case-sensitive Linux** filesystem. The dev machine is Windows (case-insensitive), so wrong-case asset paths work locally but **404 in production**.

Authoritative folder casing (from `git ls-files`): images live under **`Images/`** (capital I) and audio under **`audio/`** (lowercase). Always match references exactly.

On 2026-06-07 a sweep fixed: ~94 `images/` → `Images/` refs across HTML, all `Audio/` → `audio/` refs in JS + comingsoon.html, and `experience/Ply.png` → `ply.png`. To re-verify after edits, run a case-sensitive link checker (a Python `os.listdir`-based existence check that also `urllib.parse.unquote`s `%20`), not just `os.path.exists` (which is case-insensitive on Windows).

Related: shared `styles/projects/projects.js` computes `basePath` (`../` when path includes `/all-projects/`, else `./`) — keep asset refs in that file relative to that. See [[design-avoid-generic-ai-look]].
