# MAINTAINING.md

This file is the handoff manual for Alex's portfolio site (byun-alex.github.io). v1 was built by Claude (Fable 5) on 2026-07-05; v2 (dark redesign, navigation, multi-view) on 2026-07-06, planned with Alex directly. It will be maintained by later Claude sessions (Opus 4.8 or newer) and by Alex himself. Read this fully before changing anything. It exists so a session with zero context can make a correct edit in minutes without drifting from the design.

## What this site is

Alex's personal-brand site first, recruiter-ready second. It shows his projects like products and tells the honest story of building them. The audience is (a) anyone Alex wants to impress with what he builds, and (b) hiring managers for Technical Support Engineer and junior technical roles who should land, click around, and think "competent, ships things, easy to contact."

## Architecture (v2)

- **One `index.html` with five views**, switched by JS hash routing: `#home`, `#about`, `#process`, `#portfolio`, `#contact`. A view is a `<section class="view" data-view="NAME">`; `main.js` toggles `.active` on the section matching `location.hash` (default `home`). Direct links like `/#portfolio` work; so do back/forward buttons.
- **A fixed top nav** (name left, links right, hamburger under 760px). Active link is synced by `main.js` via `data-view` attributes.
- **Portfolio view is a compact card grid.** Each card links to a real standalone page in `portfolio/<slug>.html` with the full product-launch writeup. Detail pages share `../styles.css` and `../main.js` and copy-paste the nav header (no build step, so shared chrome is duplicated by hand across the 5 detail pages; editing the nav means editing 6 files).
- **Process view** holds the working-method cards, the build-log timeline, and the case studies. **Portfolio stays purely the project grid.**

## Design philosophy (the WHY, hold this line)

- **Dark base + gradient glows.** Near-black background, purple/blue glow orbs (`.glow-field` fixed backdrop), frosted-glass cards, ONE accent (electric violet `--accent`). Hover = accent glow. Alex chose this on 2026-07-06 over the v1 light/Apple look, which he found boring. Do not revert to light, and do not add a theme toggle.
- **One idea per view.** Home is intro + four route cards only, never a project list. If an edit makes a view busier, the edit is wrong.
- **Product-launch treatment on DETAIL pages.** Kicker, big claim heading, value line, hero visual, body, skills tags, depth tag, honest paragraph. The grid card is only the teaser.
- **Story over numbers.** Depth tags (weekend hack / multi-week build / living system) and the honest "What it actually took" paragraph. No numeric self-scores, ever.
- **Honest content only.** Every fact traces to Alex's real repos, session diary, or resume. No invented metrics, projects, or dates.

## Voice guide (how Alex writes)

- Earnest, formal-casual, a little understated. Not startup-bro, no hype words.
- Sentences end with the lesson.
- First person, plain words. "Nearly broke me" over "presented significant challenges."
- **NO EM-DASHES, anywhere on the site or in this repo.** Alex's hard rule (long dashes read as AI-written). Use a colon, a comma, or a new sentence. Check every edit before committing.

## File map

```
/
├── index.html            nav + 5 views (home, about, process, portfolio, contact)
├── styles.css            all styling; theme tokens in :root at the top
├── main.js               hash router, scroll reveals, mobile nav toggle. Nothing else may run.
├── Alex-Byun-Resume.pdf  the downloadable resume (master lives in Alex's vault)
├── MAINTAINING.md        this file
├── portfolio/
│   ├── brain-dashboard.html
│   ├── life-planner.html
│   ├── content-factory.html
│   ├── session-continuity.html
│   └── job-ad-extractor.html
└── assets/
    ├── brain-dashboard.png
    └── life-planner.png
```

Static, hand-written, zero build step, zero dependencies, zero analytics. Keep it that way.

## Recipes

### Add a new project
1. Copy `portfolio/job-ad-extractor.html` to `portfolio/<new-slug>.html`. Replace title, meta description, kicker, heading, value line, visual, body, skills `<li>`s, depth tag, honest paragraph, repo link. Screenshot goes in `assets/` and is referenced as `../assets/<name>.png`.
2. Add a card to the `.pgrid` in `index.html` (copy an existing `.pcard`, edit kicker/heading/teaser/depth/href).
3. Add a dated line to the timeline (below).

### Add a timeline entry
In `index.html`, Process view, add at the TOP of `<ol class="timeline">`:
```html
<li><time>D Mon YYYY</time><span>What shipped, one sentence, honest.</span></li>
```

### Add a case study
In `index.html`, Process view, copy an existing `<article class="card case reveal">` block inside `.cases` and edit.

### Change the accent / glow palette
Edit `:root` in `styles.css`: `--accent` (the one accent), `--accent-soft` (gradient partner, orbs only), `--accent-glow` (hover glow rgba). The orbs also use a fixed `#6d28d9` in `.orb-3`.

### Add a nav item / rename a view
Update the nav `<ul>` AND the `VIEWS` array in `main.js` AND add the `<section class="view" data-view="...">`. Then copy the nav change into all 5 `portfolio/*.html` headers.

## Anti-drift rules (do NOT)

- No framework migrations, no bundlers, no npm.
- No light-theme revert, no theme toggle, no second accent colour.
- No project writeups inline on the Portfolio grid; teasers only, detail lives on the project page.
- No new sections on Home. Intro + route cards is the whole view.
- No analytics, no trackers, no external fonts/CDNs.
- `main.js` stays under ~100 lines: router, reveals, nav toggle. Nothing else runs on this site.

## Deploy

This folder is its own git repo, pushed to `byun-alex/byun-alex.github.io` (GitHub Pages, main branch root). **A push to main IS a deploy.** Verify locally first (open index.html, click every nav link, every card, every back link, check a phone width and prefers-reduced-motion).
