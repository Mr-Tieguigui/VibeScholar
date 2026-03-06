# VibeOps — Vibe Coding & Research Monitor

Static landing page for the [vibeCR](https://github.com/vibeops/vibeops) project.  
Hosted on GitHub Pages. Zero build step, zero dependencies beyond Google Fonts.

## Structure

```
page_site/
├── index.html              # Entry point
├── assets/
│   ├── styles.css          # Design system (dark academic + tech theme)
│   ├── app.js              # Interactivity (ticker, nav, FAQ, scroll reveal)
│   └── icon.svg            # Custom logo icon
├── templates/
│   ├── project_template.yaml
│   ├── undermind_template.csv
│   └── zotero_template.csv
└── README.md
```

## Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | Quickstart | CLI-style terminal cards with install/run/workflow |
| 02 | Templates | Downloadable YAML + CSV templates |
| 03 | Demo Projects | 60-entry infinite ticker with search & domain filter |
| 04 | Literature Workflow | Dual-source ingestion (Undermind + Zotero) |
| 05 | Coding Stack | Recommended tools for Vibe Coding |
| 06 | Research Stack | Recommended tools for Vibe Research |
| 07 | FAQ | Expandable Q&A |

## Demo Ticker

- **60 synthetic projects** across 16 research domains
- Seamless infinite horizontal scroll (CSS animation)
- Real-time search by title/summary (debounced)
- Domain tag dropdown filter
- Reset button to clear filters
- Pauses on hover
- Respects `prefers-reduced-motion` (disables animation, enables manual scroll)
- No private data — all entries are generic/synthetic

## Editing

### Change the product name
Search-replace `VibeOps` in `index.html`, `styles.css` comment header, `app.js` comment header, and this README.

### Add/remove demo projects
Edit the `DEMO_DATA` array in `assets/app.js`. Each entry needs: `title`, `domain`, `summary`, `papers`, `steps`, `artifacts`, `updated`.

### Modify design tokens
All CSS variables are in `:root` at the top of `assets/styles.css`.

## Deployment

This is a static site — just serve `page_site/` as the root. For GitHub Pages:
1. Go to repo Settings → Pages
2. Set source to the branch containing `page_site/`
3. Set folder to `/page_site`

## License

CC BY-SA 4.0
