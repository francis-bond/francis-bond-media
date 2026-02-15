# Francis Bond Media — Portfolio Website

## Purpose
Showcase hospitality photography and videography by Francis Bond Media. Target audience: luxury hotels, boutique properties, and short-term rental operators looking to hire a photographer.

## Tech Stack
- Static HTML/CSS/JS site (no framework, no build step)
- `sharp` for image optimization (`npm run optimize`)
- No deployment tooling configured yet

## Project Structure
```
index.html          — Home page (hero slideshow, stats, about)
portfolio.html      — Portfolio gallery
contact.html        — Contact form
projects/           — Individual project pages (one per property)
  four-seasons.html
  halcyon.html
  lucky-arrow.html
  portola.html
  riu-mexico.html
css/style.css       — All styles
js/main.js          — Shared JS (nav toggle, animations, slideshow)
js/portfolio.js     — Portfolio page JS
assets/images/      — Optimized images, organized by project name
scripts/optimize-images.js — Sharp-based image optimization script
```

## Conventions
- BEM-style CSS class naming (e.g., `hero__title`, `nav__links`, `stats__card`)
- Semantic HTML sections with fade-in/stagger animation classes
- Images stored in `assets/images/<project-name>/` with numbered filenames
- Favicon: `FBM_favicon_280x280.png`, Logo: `Minimalist_FBM_Logo_Transparent-2.png`

## Notes
- Based in Austin, Texas — works nationally and internationally
- Brand name: **Francis Bond Media**
