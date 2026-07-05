# MAINTAINING.md

This file is the handoff manual for Alex's portfolio site (byun-alex.github.io). It was built by Claude (Fable 5) on 2026-07-05 and will be maintained by later Claude sessions (Opus 4.8 or newer) and by Alex himself. Read this fully before changing anything. It exists so a session with zero context can make a correct edit in minutes without drifting from the design.

## What this site is

Alex's personal-brand site, recruiter-ready second. It shows his projects like product launches and tells the honest story of building them. The audience is (a) anyone Alex wants to impress with what he builds, and (b) hiring managers for Technical Support Engineer and junior technical roles who should land, skim, and think "competent, ships things, easy to contact."

## Design philosophy (the WHY, hold this line)

- **Apple/Tesla discipline.** One idea per screen section. Generous whitespace. Big confident typography does the talking. If an edit makes a section busier, the edit is wrong.
- **Product-launch treatment for projects.** Every project is a full-width section: kicker, big claim as the heading, one-sentence value line, one hero visual, then details. Never a grid of repo cards. The site sells the work the way Apple sells a phone.
- **Story over numbers.** Each project carries a depth tag (weekend hack / multi-week build / living system) and an honest "What it actually took" paragraph. No numeric self-scores, no star ratings, ever. Numbers invite comparison; stories flex. This was an explicit decision made with Alex on 2026-07-05.
- **Light theme, one accent.** Near-white background, near-black ink, one restrained blue. The dark screenshots and terminal blocks provide all the contrast the page needs.
- **Honest content only.** Every fact on the page comes from Alex's real repos, session diary, or resume. Do not invent metrics, projects, or dates. If a claim cannot be traced to a source, it does not go on the page.

## Voice guide (how Alex writes)

- Earnest, formal-casual, a little understated. Not startup-bro, no hype words ("revolutionary", "blazingly").
- Sentences end with the lesson. Alex's posts close on what he learned, not on the applause line.
- First person, plain words. "Nearly broke me" over "presented significant challenges."
- **NO EM-DASHES, anywhere on the site or in this repo.** This is Alex's hard rule (long dashes read as AI-written). Use a colon, a comma, or a new sentence instead. Check every edit for them before committing.

## File map

```
/
├── index.html            all content lives here, one page
├── styles.css            all styling; CSS variables at the top control the look
├── main.js               scroll reveals only; nothing else may run on this site
├── Alex-Byun-Resume.pdf  the downloadable resume (master lives in Alex's vault)
├── MAINTAINING.md        this file
└── assets/
    ├── brain-dashboard.png   headless-Edge screenshot of the running app
    └── life-planner.png      headless-Edge screenshot of the running app
```

- The site is static, hand-written, zero build step, zero dependencies, zero analytics. Keep it that way.
- Content sections in `index.html` in order: hero, section-intro, five `.project` sections, timeline, case studies, about, footer.
- `main.js` adds `.in` to `.reveal` elements via IntersectionObserver and honours `prefers-reduced-motion`. Do not add other scripts.

## Recipes

### Add a new project section

Copy this block and place it before the timeline section (or between projects; strongest work goes first). Fill every slot; the honest paragraph is mandatory.

```html
<section class="project" id="PROJECT-ID">
  <div class="container">
    <p class="project-kicker reveal">repo-or-project-name</p>
    <h3 class="reveal">The one big claim, stated plainly.</h3>
    <p class="project-value reveal">One sentence on what it does and why it matters.</p>
    <figure class="project-visual reveal">
      <img src="assets/PROJECT-ID.png" alt="Describe the screenshot" loading="lazy">
    </figure>
    <div class="project-body">
      <p class="reveal">A short plain-words paragraph on how it works.</p>
      <ul class="skills reveal" aria-label="Skills this project proves">
        <li>skill one</li><li>skill two</li><li>skill three</li>
      </ul>
      <p class="depth reveal"><span class="depth-tag">weekend hack | multi-week build | living system</span></p>
      <p class="honest reveal"><strong>What it actually took.</strong> The honest story: what hurt, what was learned, in Alex's voice.</p>
      <p class="project-links reveal"><a href="https://github.com/byun-alex/REPO" target="_blank" rel="noopener">github.com/byun-alex/REPO &rarr;</a></p>
    </div>
  </div>
</section>
```

Screenshot recipe: run the app locally, then headless Edge:
`msedge --headless --disable-gpu --window-size=1440,960 --screenshot=out.png http://localhost:PORT/`
If the project has no UI, build a CSS visual instead (see `.pipeline`, `.terminal`, `.json-card` in styles.css for the three existing patterns). Never ship a stock image or an AI-generated mock screenshot.

### Add a timeline entry

Newest entries go at the TOP of the `<ol class="timeline">`. One line, real date, plain sentence:

```html
<li><time>7 Jul 2026</time><span>What shipped, in one honest sentence.</span></li>
```

### Add a case study card

Add an `<article class="case reveal">` inside `<div class="cases">`:

```html
<article class="case reveal">
  <h3>Name: what it is in five words</h3>
  <p>Three or four sentences: the problem, the architecture, the daily use. No private content, ever.</p>
  <a href="https://github.com/byun-alex/REPO" target="_blank" rel="noopener">Read the case study &rarr;</a>
</article>
```

### Change the accent colour

Edit `--accent` at the top of `styles.css`, and the matching rgba in `.depth-tag` and `.pipe-gate` backgrounds. Nothing else. Keep it restrained; if it would look loud on apple.com, it is wrong here.

### Update the resume

Replace `Alex-Byun-Resume.pdf` with a fresh export from the master in Alex's vault (`Second brain/Brain/02 - Life Admin/Job Hunt/`). Keep the same filename so links keep working.

## Anti-drift rules (what NOT to do)

1. No dark mode bolt-ons. The light design is a decision, not an oversight.
2. No frameworks, no build steps, no npm. If a change seems to need React, the change is wrong.
3. No section sprawl. New content replaces or earns its place; the page stays skimmable in two minutes. One idea per screen.
4. No numeric self-ratings on projects. Depth tag + honest paragraph only.
5. No em-dashes. Anywhere. Re-check before every commit.
6. No analytics, trackers, or external scripts. The only JS is the scroll reveal.
7. No invented content. Every new claim needs a source in Alex's vault or repos.
8. Do not remove the honest paragraphs or sand down their voice. The confession is the credibility.

## Deploy

The repo is `byun-alex/byun-alex.github.io`, served by GitHub Pages from the main branch root. Deploying is just: commit, push to main, wait a minute, check https://byun-alex.github.io. There is no build pipeline to break.
