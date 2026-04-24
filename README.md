# Ali Karami — Personal Portfolio

A fast, accessible, fully-static personal portfolio. Zero build step, zero
dependencies — just HTML, CSS, and vanilla JS. Designed to be dropped directly
into a GitHub Pages repo.

## Live preview (local)

Just open `index.html` in a browser. For a realistic preview (font loading,
relative paths) serve it with any static server:

```bash
# Python
python3 -m http.server 8080

# Node (no install)
npx serve .
```

Then visit http://localhost:8080.

## File structure

```
portfolio/
├── index.html        # Page markup + all content
├── styles.css        # Design system, layout, light/dark, responsive
├── script.js         # Theme toggle, active-section, reveal, menu
├── assets/
│   ├── profile.jpg   # <-- Drop your headshot here (or leave it to use the AK monogram)
│   └── Ali_Karami_CV.pdf  # <-- Optional: your CV for the Download CV button
└── README.md
```

## Customize

Everything you may want to edit lives in `index.html`:

1. **Your photo** — replace `assets/profile.jpg` with your headshot
   (square-ish crop, 800×1000 works great). If the file is missing, the UI
   gracefully falls back to a monogram placeholder.
2. **CV** — drop a `Ali_Karami_CV.pdf` into `assets/` to enable the “Download CV”
   button. Or change the `href` to link out.
3. **Meta / SEO** — update the `<title>`, `<meta name="description">`, and
   `og:url` in the `<head>`.
4. **Publication links** — replace the placeholder links in the `<article class="pub">`
   blocks with arXiv / openaccess / IEEE URLs.
5. **Content** — edit the text directly. Sections use semantic HTML (`<section>`,
   `<article>`), so updates are straightforward.
6. **Colors** — tweak the CSS custom properties at the top of `styles.css`
   (`:root { ... }` for light, `[data-theme="dark"] { ... }` for dark).

## Deploy to GitHub Pages

### Option A — User site (`username.github.io`)

1. Create a repo named exactly `<your-username>.github.io` (e.g. `karami7899.github.io`).
2. Copy the contents of this folder (`index.html`, `styles.css`, `script.js`,
   `assets/`) into the repo root.
3. Commit & push to `main`:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio"
   git branch -M main
   git remote add origin git@github.com:<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
4. In the repo settings → **Pages**, set:
   - Source: `Deploy from a branch`
   - Branch: `main` / root (`/`)
5. Your site is live at `https://<your-username>.github.io/` within ~1 minute.

### Option B — Project site (`username.github.io/portfolio`)

1. Push this folder to any repo (e.g. `portfolio`).
2. Settings → Pages → Branch: `main`, folder `/root`.
3. Live at `https://<your-username>.github.io/portfolio/`.
4. Note: relative paths (`./assets/...`, `./styles.css`) already work for
   project sites — no changes needed.

### Custom domain

1. Add a `CNAME` file to the repo root containing your domain (e.g. `alikarami.dev`).
2. Point the domain's `A`/`CNAME` records at GitHub Pages (see GitHub docs).
3. Enable **Enforce HTTPS** once the cert is issued.

## Features

- Light/dark theme with system preference detection and per-user persistence
- Sticky, blur-backed navigation with active-section highlighting
- Scroll-triggered reveal animations (respects `prefers-reduced-motion`)
- Fully responsive, mobile menu, keyboard-accessible
- Semantic HTML, proper heading hierarchy, skip-to-content link, ARIA labels
- Fast: no frameworks, no bundlers, ~20 KB HTML/CSS/JS total
- SEO: descriptive meta, Open Graph + Twitter cards, inline SVG favicon
- Print-friendly stylesheet (try Cmd/Ctrl + P)

## Lighthouse targets

Out of the box the site should score:

- Performance: 99–100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## License

MIT — feel free to fork this as a template. Attribution appreciated but not
required.
