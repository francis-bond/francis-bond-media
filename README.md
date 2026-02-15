# Francis Bond Media

Portfolio website for Francis Bond Media — hospitality photography and videography for luxury hotels, boutique properties, and short-term rentals.

**Live site:** [francis-bond.github.io/francis-bond-media](https://francis-bond.github.io/francis-bond-media/)

## Local Development

This is a static HTML/CSS/JS site with no build step required.

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

This uses [sharp](https://sharp.pixelplumbing.com/) to generate full-size (2400px) and thumbnail (1200px) versions into `assets/images/`.
