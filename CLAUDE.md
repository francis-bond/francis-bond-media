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
index.html          - Home page (hero, stats, portfolio preview, services, about, CTA)
portfolio.html      - Portfolio listing (hover-to-preview background effect)
contact.html        - Contact form (Formspree) + phone/email
projects/           - Individual project pages (one per property)
  willow-house.html
  portola.html
  halcyon.html
  lucky-arrow.html
  riu-mexico.html
  four-seasons.html
css/style.css       - All styles (single file)
js/main.js          - Shared JS (nav toggle, scroll animations, hero slideshow, gallery layout)
js/portfolio.js     - Portfolio page hover background effect
assets/images/      - Optimized images, organized by project name
  <slug>/
    01-full.jpg, 01-thumb.jpg ...
    manifest.json   - Per-project image metadata (width, height, orientation)
scripts/optimize-images.js - Sharp-based image optimization script
CNAME               - GitHub Pages custom domain config
```

## Portfolio Page Order (portfolio.html)
1. Willow House (Terlingua, TX) - Desert, Remote, Big Bend
2. Portola Hotel & Spa - Coastal, Elegant, Relaxed
3. Halcyon - Urban, Boutique, Vibrant
4. Lucky Arrow Retreat - Rustic, Glamping, Hill Country
5. Riu Mexico - Tropical, Resort, Paradise
6. Four Seasons Austin - Luxury, Refined, Iconic

## Homepage Selected Work Grid (index.html)
Four featured projects (2x2): Willow House, Halcyon, Riu Mexico, Lucky Arrow

## Image System
- Source images live in `Website Formated Hotel content/` (gitignored)
- `npm run optimize` reads source images, sorts alphabetically, outputs numbered files
- Output: `assets/images/<slug>/01-full.jpg`, `01-thumb.jpg`, etc.
- Full: 2400px wide, 80% quality | Thumb: 1200px wide, 75% quality
- **IMPORTANT:** Optimize script reads dimensions from OUTPUT files (not source), so EXIF rotation is correctly applied. Sharp 0.33.5 auto-rotates on resize.
- Each project gets a `manifest.json` with `{ "01": { width, height, orientation } ... }`
- Orientation is "portrait" (height > width) or "landscape" (width >= height)

### Source folder names (in `Website Formated Hotel content/`)
- `Willow House Final Website` → slug `willow-house`
- `Portola` → slug `portola`
- `Halcyon` → slug `halcyon`
- `Lucky Arrow Retreat` → slug `lucky-arrow`
- `Riu Mexico` → slug `riu-mexico`
- `Four Seasons Austin` → slug `four-seasons`

### Highlight image mappings (source filename number → output file)
- 6213 → willow-house/04 (showcase/thumbnail for Willow House)
- DSCF3295 → four-seasons/01
- 4R5A5721 → halcyon/30
- 4R5A5552-HDR → halcyon/01
- 4R5A4148-HDR → lucky-arrow/08
- 4R5A5431 → portola/20
- 4R5A5100 → portola/06
- DSCF3012 → riu-mexico/04

### Images removed from gallery pages (still exist in assets, just not referenced in HTML)
- Four Seasons: 06, 09, 11 (DSCF3309, DSCF3312, DSCF3315)
- Halcyon: 10, 11, 15 (4R5A5626, 4R5A5627, 4R5A5636)
- Portola: 08, 10 (4R5A5103, 4R5A5389)
- Riu Mexico: 01, 06, 17 (DSCF3005, DSCF3014, DSCF3141)
- Willow House: 09, 11, 16, 27, 42 (4R5A6249, 4R5A6265, 4R5A6305, 4R5A6395, 4R5A6529)

## Gallery Layout System (js/main.js)
Project gallery pages use a JS-driven row-based justified layout:
- Fetches `manifest.json` from the same image directory
- Builds rows using `buildRows(portraits, landscapes)` — deterministic algorithm
- **Rules:** max 3 portraits per row, max 2 landscapes per row, mixed rows (1P+1L) allowed
- **Pattern:** portrait rows alternate 3/2 images; a mixed or landscape row inserted every 2 portrait rows
- **Row height:** calculated so images fill container width exactly at natural aspect ratio; capped at 700px desktop / 320px mobile
- **Centering:** `justify-content: center` on `.gallery-row` — rows with fewer images center naturally
- **No cropping:** `object-fit: cover` on images that perfectly match their container ratio
- CSS classes used: `.project-gallery` (column flex container), `.gallery-row` (row), `.gallery-row__item` (item)

## Conventions
- BEM-style CSS class naming (e.g., `hero__title`, `nav__links`, `stats__card`)
- Semantic HTML sections with fade-in/stagger animation classes
- Section background alternation: `section--muted` (#f3f1ee), `section--dark` (#eae7e2)
- Images stored in `assets/images/<project-name>/` with numbered filenames
- Page titles use `|` as separator (e.g., `Willow House | Francis Bond Media`)
- No em dashes in any visible copy — use commas, periods, or colons instead
- Right-click on images is disabled site-wide (contextmenu listener in main.js)
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
