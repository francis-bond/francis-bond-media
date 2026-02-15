# Francis Bond Media — Portfolio Website

## Rules
- **Keep README.md current:** Whenever code changes add, remove, or modify a feature, integration, or structural element (e.g., form handlers, APIs, new sections, deployment changes), update `README.md` to reflect the change.

## Purpose
Showcase hospitality photography and videography by Francis Bond Media. Target audience: luxury hotels, boutique properties, and short-term rental operators looking to hire a photographer.

## Tech Stack
- Static HTML/CSS/JS site (no framework, no build step)
- `sharp` for image optimization (`npm run optimize`)
- Deployed via **GitHub Pages** with custom domain
- Contact form powered by **Formspree** (endpoint: `https://formspree.io/f/mpqjdnpq`)

## Deployment
- **Repo:** https://github.com/francis-bond/francis-bond-media
- **Domain:** francisbondmedia.com (DNS via Cloudflare, proxy OFF / DNS only)
- **Hosting:** GitHub Pages, deploys automatically on push to `main`
- CNAME file in repo root maps the custom domain
- GitHub Pages serves from `main` branch, root `/`

## Project Structure
```
index.html          — Home page (hero, stats, portfolio preview, services, about, CTA)
portfolio.html      — Portfolio listing (hover-to-preview background effect)
contact.html        — Contact form (Formspree) + phone/email
projects/           — Individual project pages (one per property)
  four-seasons.html
  halcyon.html
  lucky-arrow.html
  portola.html
  riu-mexico.html
css/style.css       — All styles (single file)
js/main.js          — Shared JS (nav toggle, scroll animations, hero slideshow)
js/portfolio.js     — Portfolio page hover background effect
assets/images/      — Optimized images, organized by project name
scripts/optimize-images.js — Sharp-based image optimization script
CNAME               — GitHub Pages custom domain config
```

## Homepage Sections (in order)
1. **Hero slideshow** — 5 highlight images cycling every 5s
2. **Why Great Media Matters** — 3 stats cards, warm background
3. **Selected Work** — 2x2 preview grid of 4 projects, links to project pages
4. **Services** — Photography, Videography, Drone & Aerial (with SVG icons), darker background
5. **About** — Photo + bio, side-by-side grid
6. **CTA** — Dark background, "Get in Touch" button to contact page
7. **Footer** — Nav links, Instagram, copyright

## Image System
- Source images live in `Website Formated Hotel content/` (gitignored)
- `npm run optimize` reads source images, sorts alphabetically, outputs numbered files
- Output: `assets/images/<slug>/01-full.jpg`, `01-thumb.jpg`, etc.
- Full: 2400px wide, 80% quality | Thumb: 1200px wide, 75% quality
- Mapping of user's highlight images to numbered files:
  - DSCF3295 → four-seasons/01
  - 4R5A5721 → halcyon/30
  - 4R5A5702 → halcyon/26
  - 4R5A5552-HDR → halcyon/01
  - 4R5A4148-HDR → lucky-arrow/08
  - 4R5A5431 → portola/20
  - 4R5A5100 → portola/06
  - 4R5A5419 → portola/16
  - DSCF3012 → riu-mexico/04

## Conventions
- BEM-style CSS class naming (e.g., `hero__title`, `nav__links`, `stats__card`)
- Semantic HTML sections with fade-in/stagger animation classes
- Section background alternation: `section--muted` (#f3f1ee), `section--dark` (#eae7e2)
- Subtle 60px divider lines between same-background sections
- Images stored in `assets/images/<project-name>/` with numbered filenames
- Project gallery uses CSS Grid with nth-child patterns for asymmetric layout
- Favicon: `FBM_favicon_280x280.png`, Logo: `Minimalist_FBM_Logo_Transparent-2.png`

## Design Details
- Fonts: Playfair Display (serif headings), Inter (sans body)
- Accent color: `#b08d6e` (warm bronze)
- Mobile nav: hamburger slides in from right; `.nav--hero` links switch to dark text when open
- Instagram: @francisbondmedia (link in footer of every page, SVG icon)

## Contact Info
- Phone: +1 (281) 203-4083
- Email: Francisbondmedia@gmail.com
- Instagram: @francisbondmedia
- Based in Austin, TX

## Original Reference
- Old Canva site: https://bondportfolio.my.canva.site/home
- Used as reference for content, highlights, and contact info
