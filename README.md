# signal.maksimov — Candidate Intelligence Report

A recruiter-facing page framed as a "candidate intelligence report" — the same health-score /
event-feed / watchlist language from [Signalex](../signalex) (a French company-intelligence
platform built from scratch), pointed at a career instead of a company.

No framework, no build step: plain HTML/CSS/JS. Open `index.html` directly in a browser, or
deploy it anywhere that serves static files.

## Structure

```
index.html     all markup + content
styles.css     dark, terminal/dashboard aesthetic
script.js      gauge animation, event feed accordion, stack render, query console, nav
assets/
  profile.jpg            headshot (resized)
  Oleg_Maksimov_CV.pdf   downloadable CV, linked from the hero section
```

## Editing content

Everything is in plain text in `index.html`. A few spots worth knowing:

- **Score / signals** — `#score` section in `index.html`. The numeric score lives in
  `script.js` → `const SCORE = 94;` (drives the gauge animation) and must match the `GRADE`
  text and `/score` console response if changed.
- **Event feed** — `#feed` section, one `<li class="feed-item">` per entry, newest first.
- **Stack** — edit the `STACK` array at the top of `script.js`; it renders the `#stack` grid.
- **Projects** — `#sources` section in `index.html`, one `<article class="source-card">` per project.
- **Query console answers** — `API` object in `script.js`.
- **"In the Lab" (business ideas)** — `#lab` section in `index.html`. Replace a card's lock
  icon, title, description and status badge once a venture is ready to show; add more
  `<div class="lab-card">` blocks as needed.

## Deploy

Any static host works. Three options, easiest first:

### Netlify (drag & drop)
Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this folder in. Done —
you get a live URL immediately, and can add a custom domain after.

### Vercel
```bash
npm i -g vercel   # once
cd myPortfolio
vercel --prod
```

### GitHub Pages
```bash
cd myPortfolio
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin <your-new-github-repo-url>
git push -u origin main
```
Then in the repo settings: **Pages → Deploy from branch → main → / (root)**.

## Notes

- `assets/Oleg_Maksimov_CV.pdf` is a copy of the CV — update it by replacing that file (keep
  the same filename so the download link in `index.html` keeps working).
- The query console is a static, client-side simulation (no backend) — it only answers the
  commands defined in `script.js`.
