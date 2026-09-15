# Video Upload Workflow

## When adding a new video to the site

### 1. Export from DaVinci Resolve
- Format: MP4
- Codec: H.264
- Resolution: 1920x1080 (vertical: 1080x1920). **Check this on every render job**: re-rendering can
  fall back to the 4K timeline resolution without warning.
- Frame rate: match source (24 or 30fps)
- Quality: Restrict to 8,000 Kb/s
- **Network Optimization: ON** (Video tab, same panel as Format). This is fast start: it puts the
  playback index at the front of the file so browsers can start playing immediately. Off by default.
- Audio: none (videos are muted on site)
- Target file size: under 15MB. For short loops (under 15s), aim under 10MB.
- Save these as a render preset so they don't have to be re-set each time.

**Forgot Network Optimization?** Fix it losslessly (no re-encode) instead of re-exporting:
```
ffmpeg -i input.mp4 -map 0:v:0 -c copy -write_tmcd 0 -movflags +faststart output.mp4
```

### 2. Upload to Cloudflare R2
- Bucket: `portfoliowebsite` (dash.cloudflare.com → R2 → portfoliowebsite)
- Public URL base: `https://media.francisbondmedia.com/` (custom domain connected to the bucket, 2026-09-15)
- Full URL format: `https://media.francisbondmedia.com/your-filename.mp4`
- Upload a file to the bucket and it's immediately available at that address. Always use this domain in site code.
- Free tier: 10GB storage, 1M Class A (write) and 10M Class B (read) requests/month, egress always free.
  Enabling R2 requires a payment method on file even at $0; it's only billed past the free tier.
- **Never use the `r2.dev` address** (`pub-ae10c7c775f64f7e9bd33eb61de9ae8f.r2.dev`) in site code. Cloudflare rate-limits
  it and documents it as development-only. In September 2026 it throttled the 11MB Ramon's video to
  1.5–7.5 Mbit/s, below its 8.1 Mbit/s bitrate, so it took ~45s to start. The custom domain goes through
  Cloudflare's normal network and cache and served the same file at 100–200 Mbit/s.

### 3. Add to the site
Use a standard HTML5 video element — no JavaScript needed, no backend required:

```html
<video
  src="https://media.francisbondmedia.com/your-filename.mp4"
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

| File | Specs | Placement |
|---|---|---|
| WebEdit00108000.mp4 | 5.3MB, 2160x3840 (4K), 5s | Drone & Aerial services row, index.html |
| WebEdit00108468.mp4 | 16.3MB, 2160x3840 (4K), 16s | Motel Marfa project page |
| WebEditHorizBelize00108799.mp4 | 4.2MB, 1920x1080, 4s, fast start | Videography services row, index.html (CSS crops to 2:3 desktop, ~1:1 phone, centred) |
| WebEditVertBelize00108831.mp4 | 10.7MB, 1080x1920, 11s, fast start | Ramon's Village project page |

Uploaded but not placed: WebEditHorizBelize00108540.mp4 and WebEditHorizBelize00108658.mp4
(1920x1080, fast start; pool pans, near-duplicates of each other).

The first two predate the 1080p standard above and are 4K.

## Notes
- Do not host video files in the GitHub repo — file size limits and no streaming
- R2 has no egress fees (unlike AWS S3) — serving the file to visitors is free
- If the custom domain ever changes, update all `src` attributes and this doc
- Lower-bitrate (3 Mbit/s, 1080p) versions of the two Ramon's videos are in
  `Website Formated Hotel content/Ramon's Village Resort/web-video-3mbps/` if phone load time ever becomes a problem.
  Same filenames, so uploading them over the originals needs no code change.
