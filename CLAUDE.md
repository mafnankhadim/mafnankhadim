# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **React + Vite single-page portfolio** for "M Afnan Khadim — MERN Stack Web Developer". React 18 + Vite 5; no TypeScript, no router, no state library, no test/lint tooling.

It began as a rewrite of the sibling plain-HTML/jQuery template site in `../`, but that inheritance is **over**: the vendored template stylesheets (Bootstrap, `style.css`, `responsive.css`, `owl.carousel.css`, `text-rotator.css`) were deleted in the dark redesign. The only file left from the template is `public/css/font-awesome.min.css`, kept for its icon glyphs. Layout, type, colour and every component now come from `src/styles/`.

Do not reintroduce Bootstrap classes (`row`, `col-*`) or old template classes (anything `tcd-*`, `portfolio-box`, `banner-content`) — none of them resolve to anything any more.

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

`npm run dev` also serves the AI assistant's function: a dev-only Vite plugin in `vite.config.js` loads `.env` and mounts `api/chat.js` at `/api/chat`, the same path Vercel serves in production. Without that plugin Vite answers the path with `index.html`, which is why the widget guards on a missing `reply` rather than trusting a 200.

There is no lint or test setup, and no single-test command — verify changes by running `npm run dev` and checking the browser.

## Deployment

Zero-config Vercel — there is no `vercel.json`. The Vite preset builds `dist/`, and anything under `api/` becomes a function by convention, which is why `api/chat.js` answers `/api/chat` in production without any routing config. Note that the function imports from `src/`: `api/` and `src/` are one build, not two isolated trees, which is what makes the shared `src/data/chatbot.js` below possible — and what constrains it.

## Architecture

### Styling: one design system, then one stylesheet per component

`src/styles/base.css` is the design system and the contract: CSS custom-property tokens (`--bg-*`, `--text-*`, `--accent*`, `--grad`, `--surface`, `--shadow*`, `--font-*`, `--radius*`, `--ease`, `--container`, `--nav-h`), a reset, and the shared primitives — `.container`, `.section` (+ `--alt`, `--line`, `--glow`), `.grid`/`.grid--2`/`.grid--3`, `.section-head`, `.eyebrow`, `.section-title` (its `<em>` gets the gradient fill), `.section-sub`, `.btn` (+ `--primary`, `--ghost`), `.card`, `.tilt`, `.reveal*`, `.sr-only`.

Every section then owns a stylesheet next to it, imported at the top of its component (`Nav.jsx` → `nav.css`, `Work.jsx` → `work.css`, …). Classes are prefixed per section (`.work-*`, `.exp-*`, `.svc-*`, `.skills-*`, `.about-*`, `.contact-*`, `.foot-*`) so two sections can never collide. Add a new section the same way; nothing in `base.css` should need editing.

**Import order matters and is easy to break.** `src/main.jsx` imports `base.css` *before* `App.jsx`. Vite emits CSS in module-graph order, so importing `App.jsx` first would pull every component stylesheet in ahead of the design system, and `base.css` would then override the components meant to refine it (a `.nav-cta { display: none }` silently losing to `.btn { display: inline-flex }` — this actually happened). Keep the design system first.

Colours always come from the tokens — no raw hex in section stylesheets.

`base.css` also carries the page-wide craft layer: a fixed SVG-turbulence grain on `body::after` (large flat near-black areas with wide radial gradients band visibly without it), the inset top highlight on `.card` that makes a panel read as raised rather than cut out, the sweep on `.btn--primary::after`, and `text-wrap: balance`/`pretty` on headings and paragraphs to kill orphan words. `body::after` and `.card::before` are deliberately left free of other uses — check before claiming them.

### Composition

**`src/App.jsx`** — `Nav`, then a `<main>` of `Hero`, `Marquee`, `About`, `Skills`, `Experience`, `Services`, `Work`, `Contact`, then `Footer` and three fixed overlays outside `<main>`: `SocialBar`, `ScrollToTop`, `Chatbot`. `App.jsx` also imports `overlays.css` (the social rail and the back-to-top button), the only stylesheet not owned by a single component.

**`src/data/content.js`** and **`src/data/portfolio.js`** — all copy, nav links, services, tech groups, marquee items, experience, education, contact/social details and portfolio projects. Components map over this data; **edit content here, not in JSX**.

**`api/chat.js`** — the only server-side code, deployed as a Vercel function; see "AI assistant" below.

### Section ids ↔ nav are coupled

Each section's `id` (`home`, `about`, `skills`, `experience`, `services`, `work`, `contact`) is both the scroll target and the scroll-spy key. `navLinks` in `content.js` references a subset of these by `target`. Rename an id and you must rename it in `navLinks`, or the nav highlight and smooth-scroll break. `src/utils/scroll.js` owns the single `HEADER_OFFSET` both `Nav.jsx` and `Hero.jsx` scroll by, so the two cannot drift.

`Nav.jsx` also selects the last nav entry explicitly once the page is scrolled to the bottom: the final section is usually too short to ever cross the scroll-spy probe line.

### The 3D layer

Two independent mechanisms, both degrading to nothing:

**`HeroScene.jsx`** — a three.js scene behind the hero: a metallic faceted core inside a counter-rotating wireframe shell, wrapped in an additive particle shell, all easing toward the pointer. `three` is loaded with a **dynamic `import()`** so it lands in its own ~747 kB chunk instead of the entry bundle. It is skipped entirely under `prefers-reduced-motion`, and a failed chunk load or missing WebGL context is swallowed — the `.hero-glow` CSS gradient carries the hero on its own. The loop is paused by an IntersectionObserver when the hero scrolls away and by `visibilitychange` when the tab is hidden. Note: `start()` deliberately does **not** call `clock.start()` — that resets `elapsedTime` to 0 and would snap the rotation back to its origin on every resume. Teardown disposes every geometry and material plus the renderer; GPU resources are not garbage collected.

`placeSolid()` parks the solid in the hero's right-hand space on wide viewports and centres/shrinks it on narrow ones, recomputed on resize. On narrow viewports the copy sits *over* the solid, so `hero.css` also drops `.hero-canvas` to 40% opacity there for legibility.

**`Tilt.jsx`** — pointer-driven 3D tilt for cards. It writes `--tilt-x`/`--tilt-y` (rotation) and `--tilt-lx`/`--tilt-ly` (glare origin) as custom properties and lets `base.css` own the actual `transform`. That split is deliberate: the stylesheet withholds the effect on coarse/touch pointers and under reduced motion without the component knowing, and the same properties drive the specular sweep. Writes are rAF-coalesced.

**Gotcha:** `transform-style: preserve-3d` is destroyed by any `overflow` other than `visible` on the element or an ancestor. Card shells that tilt therefore keep `overflow: visible` and let an inner media box do the clipping. If a `translateZ()` lift stops working, look for an `overflow: hidden` above it.

### Stat figures animate, and that constrains their selectors

`CountUp.jsx` counts a stat up from zero the first time it scrolls into view. It takes the **display string** (`"2+"`, `"26"`), animates only the leading digits and keeps any suffix, and renders two spans: an `aria-hidden` one that ticks and an `.sr-only` one holding the final value, so assistive tech is read the number once rather than every frame. Used by `Hero.jsx` and `About.jsx`.

Because of those inner spans, **never style a stat's label with a bare descendant selector**. `.hero-stats span { font-size: 12.5px }` silently shrank the animated figure to label size; it has to be `.hero-stats li > span`. Same trap applies anywhere `CountUp` is dropped into a block that also styles `span`.

### Content below the fold starts at opacity 0

`Reveal.jsx` wraps most section content. It is an IntersectionObserver fade/slide: children render with `opacity: 0` and only gain `.is-visible` once scrolled into view. So **a section inspected, screenshotted or scraped without actually scrolling to it looks empty** — that is the animation, not a render failure. `prefers-reduced-motion: reduce` short-circuits it to visible immediately, which is both the accessibility path and the quickest way to rule it out when debugging. Props: `as`, `direction`, `delay`, `once`.

### Portfolio filtering

`portfolio.js` uses opaque filter keys: `filter1` = Web Design, `filter2` = Web Development, `filter3` = Mobile Apps, `*` = All. A project's `filters` array (not its display `category`) decides which buttons show it; a project can list several. Web projects' `link` points at the GitHub repo and renders the default "View Project" call-to-action; the published Android apps point at their Google Play listing (built from the `PLAY` prefix) and set `linkLabel: "Google Play"`. Projects with a private repo but a deployed site link to the live site with `linkLabel: "Visit Website"` (Aniza Ladies Tailor); otherwise there are no live-demo links, and a project with neither a public repo nor a live site falls back to `GITHUB_PROFILE`.

`Work.jsx` paginates client-side: `PAGE_SIZE` (9) projects render at a time behind a "Load More Work" button, and switching filters resets back to the first page. The grid is a bento — the first project of the current filter spans two columns as a featured card. The first page is hand-ordered in `portfolio.js` to interleave apps and web work rather than leading with six app cards.

Project thumbnails have wildly different aspect ratios (app cards are pre-composed 1200×600 PNGs built from square Play Store icons; web screenshots vary), so `work.css` locks every thumbnail to a fixed `aspect-ratio` box with `object-fit: cover`. Don't remove that — raw icons would render double-height and break row alignment.

**Counts are derived, never written down.** `Hero.jsx` and `About.jsx` compute "projects shipped" and "apps on Google Play" from `projects` at module scope, so the headline figures can never contradict the grid below them.

## AI assistant

`Chatbot.jsx` is a floating launcher bubble plus a side panel (deliberately not the full-screen layout of the sibling reference project in `../chatbot`); its styles live in `src/styles/chatbot.css`. It posts the transcript to `/api/chat`, which is what makes the widget worth its complexity: the model API key is a Vercel env var (`CHAT_API_KEY`, plus optional `CHAT_API_URL` / `CHAT_MODEL` for any OpenAI-compatible provider) and never reaches the browser. Contrast the Web3Forms key, which is public by design.

The system prompt is assembled **in the function**, not sent by the client, so a visitor can't swap it out with a crafted request; the function also drops any client-supplied `system` message and caps history at 16 messages × 1500 chars. Both the widget and the function import `src/data/chatbot.js` — keep that file free of JSX, browser-only APIs and `import.meta`, since the function's bundler cannot resolve them. That is why the endpoint constant lives in `Chatbot.jsx` rather than alongside the greeting.

`chatbot.js` generates its project list from `portfolio.js` rather than restating it, so the assistant cannot describe a project the site no longer shows. Edit the bio, greeting and suggestion chips there, not in the component. Only the first sentence of each description reaches the prompt (`SUMMARY_CHARS`): the system prompt is re-sent on every request, and the untrimmed version burned ~3k of Groq's 8k-tokens/minute free tier per question.

Which side of the wire each variable lives on is the thing to keep straight. `CHAT_API_KEY` (falling back to `GROQ_API_KEY` or `OPENAI_API_KEY`), `CHAT_API_URL` and `CHAT_MODEL` are unprefixed and read only by the function — `vite.config.js` calls `loadEnv(mode, cwd, "")` with an empty prefix precisely so the dev plugin can see them. `VITE_CHAT_ENDPOINT` is the sole `VITE_`-prefixed variable and therefore the only one bundled into the client; it just repoints the widget if the function is ever hosted elsewhere. `.env.example` is the template, and `.env` is gitignored.

`ChatMessage.jsx` renders the model's markdown (bold, code, links, lists) as React nodes rather than `innerHTML` — a reply containing HTML is escaped. Note the widget styling has to undo `base.css`'s global `ul { list-style: none }` reset, which would otherwise strip the assistant's bullets.

The launcher occupies the same bottom-right corner as the back-to-top rocket, so `overlays.css` pushes `#toTop` up to `bottom: 112px`. Moving one means moving the other.

## Contact form (gotcha)

`Contact.jsx` posts `FormData` to Web3Forms via `fetch`. The email subject is fixed by a hidden `<input name="subject">`; the visible subject field is deliberately named `user_subject` so it does **not** override that hidden subject. Don't rename `user_subject` to `subject` — that would clobber the intended subject line. The `WEB3FORMS_ACCESS_KEY` in `content.js` is a public client-side key by design (it was already exposed in the original markup).

## Assets

`public/` still mirrors the original template tree for **images and fonts**. Several Font Awesome files use literal `@`-versioned names (e.g. `fontawesome-webfont.woff@v=4.7.0`) that the CSS `url(...)` references expect — preserve those exact filenames. Portfolio thumbnails and the logo are referenced by root-absolute paths (`/images/...`), which resolve against `public/`.

Typography is loaded from Google Fonts in `index.html`: **Inter** for body/UI and **Sora** for display headings. The old template asked for "Montserrat" everywhere but never loaded a webfont, so the site had silently been falling back to the system sans.

`public/images/slider/freelancer/afnan.png` (the original studio photo, on a white background) is no longer referenced by anything — the redesigned hero uses the WebGL scene instead.
