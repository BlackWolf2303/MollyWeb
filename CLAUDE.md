# MOLLY Fashion – Project Guide

## Project Overview
Landing page for **MOLLY Fashion** – Vietnamese fashion brand (quần short, đồ bộ, pijama).
- Live URL: https://mollyfashion.vn/
- Deployed on: Cloudflare Pages (auto-deploy from GitHub `master` branch)
- GitHub repo: connected to Cloudflare Pages

## Tech Stack
- **Pure HTML + Tailwind CSS** (CDN, no build step)
- **No framework** — single `index.html` file
- Images: WebP format (converted via `scripts/convert-webp.js` using sharp)
- Font: Google Fonts (Inter)

## Critical Rules

### Git / Deployment
- **NEVER auto-push to git.** Only run `git push` when the user explicitly says to (e.g. "push đi", "push lên github").
- Commit freely when asked, but stop there — do not chain `&& git push`.
- Cloudflare Pages deploys automatically when `master` branch is pushed.

### Cloudflare Build
- Do NOT push `package.json`, `package-lock.json`, or `node_modules/` — this causes Cloudflare to run `npm install` and hit the 25MiB asset size limit (workerd binary is 119MB).
- These are already in `.gitignore`. Keep them there.

## Image Guidelines
- All product images use **WebP** format (converted from JPEG/PNG via sharp at quality 82).
- Exception: `assets/imgs/banner.jpg` stays as **JPEG** — used as `og:image` for social sharing (Facebook/Zalo don't support WebP OG images).
- Use `loading="lazy"` on all below-fold images.
- Favicon: `assets/imgs/favicon.webp` (64×64).

## SEO / Meta Tags
- `og:image` must always point to a **JPEG** file at `https://mollyfashion.vn/assets/imgs/banner.jpg`
- All canonical/OG URLs use domain `mollyfashion.vn` (not `mollyfashion.pages.dev`)
- Sitemap: `https://mollyfashion.vn/sitemap.xml`

## Design System
- **Color palette**: Teal/cyan accents on dark background
- Tailwind utility classes — no custom CSS files
- Combo section middle card: highlighted with `ring-2 ring-teal-400`
- Best Sellers cards: `aspect-[4/5]`, `object-contain`
- Combo image cards: `aspect-square`, `object-contain`, `rounded-3xl`

## File Structure
```
index.html          # Main landing page (only page)
assets/
  imgs/
    banner.jpg      # OG image (keep as JPEG)
    favicon.webp    # 64×64 favicon
    combo/          # Combo product images (set-2, set-3, set-5)
robots.txt
sitemap.xml
scripts/
  convert-webp.js   # Batch WebP converter (sharp)
  update-html.js    # Updates img src to .webp + adds lazy loading
```
