# Francis Bond Media

Portfolio website for Francis Bond Media — hospitality photography and videography for luxury hotels, boutique properties, and short-term rentals.

**Live site:** [francisbondmedia.com](https://francisbondmedia.com)

## Features

- **Hero slideshow** — Rotating highlight images across projects
- **Stats section** — Data-driven case for professional photography
- **Portfolio preview** — 2x2 grid linking to individual project galleries (Lucky Arrow, Halcyon, Riu Mexico, Willow House)
- **Services** — Photography, Videography, and Drone & Aerial
- **About** — Bio and headshot
- **CTA** — Call-to-action leading to contact page
- **Contact form** — Powered by [Formspree](https://formspree.io) with phone/email displayed
- **Instagram** — @francisbondmedia linked in footer across all pages
- **Responsive** — Mobile hamburger nav with close-on-outside-click

## Tech Stack

- Static HTML/CSS/JS (no framework, no build step)
- [Sharp](https://sharp.pixelplumbing.com/) for image optimization
- GitHub Pages hosting with custom domain via Cloudflare DNS
- Formspree for contact form submissions

## Local Development

1. Clone the repo:
   ```
   git clone https://github.com/francis-bond/francis-bond-media.git
   cd francis-bond-media
   ```

2. Open `index.html` in your browser, or serve it locally:
   ```
   npx serve .
   ```

### Image Optimization (optional)

If you need to re-optimize images from source files in `Website Formated Hotel content/`:

```
npm install
npm run optimize
```

This generates full-size (2400px) and thumbnail (1200px) versions into `assets/images/`.
