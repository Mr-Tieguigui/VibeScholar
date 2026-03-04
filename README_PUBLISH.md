# Resonance Landing Page — Publish Instructions

## Overview

This is a static landing page for the **Resonance** research execution cockpit.
It is designed to be deployed via **GitHub Pages Mode A** (`<username>.github.io`).

## Files

```
page_site/
├── index.html          Main landing page
├── style.css           Design system / theme
├── main.js             Interactivity (FAQ, animations, config binding)
├── config.js           Site configuration (stats, URLs, product name)
├── screenshots/        Place UI screenshots here (referenced in HTML)
│   └── .gitkeep
├── README_PUBLISH.md   This file
└── .nojekyll           Tells GitHub Pages not to use Jekyll
```

## How to Update Content

### Change product name, tagline, or stats
Edit `config.js`:
```js
window.SITE_CONFIG = {
  productName: "Resonance",
  tagline: "Your tagline here",
  appUrl: "https://your-app-url.com",
  githubUrl: "https://github.com/your-username/vibeCR",
  stats: {
    projectsTracked: 24,
    papersIndexed: 1847,
    executionSteps: 312,
    reportsGenerated: 96,
  },
};
```

### Add screenshots
1. Take screenshots of the running app
2. Save them as PNG to `screenshots/` (e.g. `dashboard.png`, `overview.png`)
3. Add `<img src="screenshots/dashboard.png" alt="Dashboard">` in `index.html`

### Change styles
Edit `style.css`. All colors, fonts, spacing are in CSS custom properties at the top.

---

## Publishing to GitHub Pages (Step-by-Step)

### Prerequisites
- A GitHub account
- `git` installed locally
- GitHub CLI (`gh`) OR a personal access token

### Step 1: Create the GitHub repo
```bash
# Option A: Using GitHub CLI
gh repo create <YOUR_USERNAME>.github.io --public --description "Resonance landing page"

# Option B: Manually
# Go to https://github.com/new
# Repo name: <YOUR_USERNAME>.github.io
# Visibility: Public
# Do NOT initialize with README
```

### Step 2: Initialize local git repo and push
```bash
cd /data/guiyao/vibeCR/page_site

# Initialize
git init
git branch -M main

# Add remote
git remote add origin git@github.com:<YOUR_USERNAME>/<YOUR_USERNAME>.github.io.git
# OR with HTTPS:
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_USERNAME>.github.io.git

# Commit and push
git add -A
git commit -m "Initial landing page for Resonance"
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages** (`https://github.com/<YOUR_USERNAME>/<YOUR_USERNAME>.github.io/settings/pages`)
2. Under **Source**, select **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Click **Save**

### Step 4: Verify
- Wait 1-2 minutes for GitHub to build
- Open `https://<YOUR_USERNAME>.github.io/`
- The landing page should be live

### Step 5: Update the site
```bash
cd /data/guiyao/vibeCR/page_site
# Make edits...
git add -A
git commit -m "Update landing page"
git push
```
GitHub Pages will auto-rebuild within ~1 minute.

---

## Verification Checklist

After deploying, verify:

- [ ] Page loads at `https://<USERNAME>.github.io/`
- [ ] Navigation sticky bar is visible and all links work
- [ ] Hero section shows product name and tagline
- [ ] "Open App" button links to your running app
- [ ] Stats strip shows numbers with animated counters
- [ ] Quickstart section has 4 step cards with code blocks
- [ ] Features section has 9 feature cards in a 3-column grid
- [ ] Demo section has 4 mock UI cards (project, overview, literature, reports)
- [ ] Documentation section has 4 resource links
- [ ] FAQ accordion opens/closes correctly
- [ ] Footer shows license and tech credits
- [ ] Mobile responsive (test at 375px and 768px widths)
- [ ] No console errors in browser DevTools

## Screenshot Placement Strategy

When you have app screenshots, place them in `screenshots/`:

| Filename | Description | Where to use |
|----------|-------------|-------------|
| `dashboard.png` | Home page portfolio grid | Hero or Demo section |
| `overview.png` | Project overview page | Demo section |
| `literature.png` | Literature manager | Demo section |
| `reports.png` | Reports page | Demo section |
| `template.png` | Template upload flow | Quickstart section |
| `social_preview.png` | 1200x630 OG image | `<meta property="og:image">` |

To add an image, update `index.html`:
```html
<img src="screenshots/dashboard.png" alt="Dashboard" style="border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.1)">
```
