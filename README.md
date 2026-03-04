# VibeCR Monitor — Landing Page

This directory contains the **static marketing/documentation page** for the VibeCR project.
It is a standalone HTML/CSS/JS site designed to be served directly (e.g., GitHub Pages) — no build step, no framework, no backend calls.

## What it covers

- **Hero** — VibeCR Monitor wordmark, pitch, static stats strip
- **Quickstart** — 3 terminal-style CLI cards showing setup/run workflow
- **Templates** — Downloadable `project_template.yaml` and CSV formats
- **Demo Marquee** — Auto-scrolling horizontal ticker of generic project examples
- **Literature Workflow** — Undermind vs Zotero comparison panels
- **Coding / Research Stack** — Curated examples of tools, IDEs, and prompt patterns
- **FAQ** — Essential questions and answers

## File structure

```
page_site/
  index.html              <- Entry point (all sections)
  .nojekyll               <- Disables Jekyll on GitHub Pages
  assets/
    styles.css            <- Design tokens (dark theme), layout, marquee animations
    app.js                <- Marquee population, scroll reveal, FAQ toggle, nav state
    icon.svg              <- VibeCR custom logo SVG
  templates/
    project_template.yaml <- Downloadable YAML
    undermind_template.csv<- Downloadable CSV
    zotero_template.csv   <- Downloadable CSV
  README.md               <- This file
```

## How to edit

### Logo & Brand Name
Edit `index.html` (Hero section) and `assets/icon.svg`.
The wordmark is built with HTML/CSS (`.nav-wordmark`, `.hero-title`).

### Demo Marquee Entries
Edit `assets/app.js` → `demoProjects` array.
```javascript
const demoProjects = [
  { name: "Agent Eval Benchmark", papers: 42, steps: 18 },
  // ... add or modify generic projects
];
```

### Stack Links & Prompts
Edit `index.html` → `#coding-stack` and `#research-stack` sections. Links are hardcoded HTML `<a>` tags inside `.stack-list`. Prompts are text inside `.prompt-box`.

### Templates
Edit the actual files in `page_site/templates/`. The "Download" buttons in `index.html` link directly to these relative paths.

## Handoff interfaces

| Component | Location | Details |
|-----------|----------|---------|
| Demo Marquee Data | `assets/app.js` | Array of objects injected into the infinite CSS scroll track |
| Template Downloads | `templates/` | Physical files referenced via relative `<a href>` |
| FAQ Content | `index.html` | Hardcoded inside `.faq-item` blocks |
| Design System | `assets/styles.css` | `:root` vars define colors, type scale, spacing, shadows |
| Animations | `assets/styles.css` | Keyframes for blobs and marquee (respects prefers-reduced-motion) |

## Acceptance checklist status

- [x] No console errors
- [x] All anchors work (`#quickstart`, `#templates`, etc.)
- [x] Download buttons download files correctly
- [x] Marquee scrolls smoothly and loops infinitely
- [x] Sections are visually separated (gradients/borders/chips)
- [x] GitHub link points to correct repo
- [x] Mobile layout collapses nav to hamburger menu
