# Video Upload Workflow

## When adding a new video to the site

### 1. Export from DaVinci Resolve
- Format: MP4
- Codec: H.264
- Resolution: 1920x1080
- Frame rate: match source (24 or 30fps)
- Quality: Restrict to 8,000 Kb/s
- Audio: none (videos are muted on site)
- Target file size: under 15MB. For short loops (under 15s), aim under 10MB.

### 2. Upload to Cloudflare R2
- Bucket: `portfoliowebsite` (dash.cloudflare.com → R2 → portfoliowebsite)
- Public dev URL base: `https://pub-ae10c7c775f64f7e9bd33eb61de9ae8f.r2.dev/`
- Full URL format: `https://pub-ae10c7c775f64f7e9bd33eb61de9ae8f.r2.dev/your-filename.mp4`
- Free tier: 10GB storage, 1M requests/month — well within limits for a portfolio site

### 3. Add to the site
Use a standard HTML5 video element — no JavaScript needed, no backend required:

```html
<video
  src="https://pub-ae10c7c775f64f7e9bd33eb61de9ae8f.r2.dev/your-filename.mp4"
  autoplay
  muted
  loop
  playsinline>
</video>
```

All four attributes are required:
- `autoplay` — plays on load
- `muted` — browsers block autoplay with sound; this is intentional
- `loop` — loops seamlessly
- `playsinline` — prevents iOS from going full screen on autoplay

### 4. CSS
**Services row (index.html):** `.services__image video` is already styled — just swap the video src.

**Project page:** wrap in `<div class="project-video">` — already styled to match gallery width/padding.

## Current videos on site

| File | URL | Placement |
|---|---|---|
| WebEdit00108000.mp4 (5.3MB) | .../WebEdit00108000.mp4 | Drone & Aerial services row, index.html |
| WebEdit00108468.mp4 (16.3MB) | .../WebEdit00108468.mp4 | Motel Marfa project page |

## Notes
- Do not host video files in the GitHub repo — file size limits and no streaming
- R2 has no egress fees (unlike AWS S3) — serving the file to visitors is free
- If the R2 dev URL ever changes, update all `src` attributes and this table
