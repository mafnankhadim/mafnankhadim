# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **React + Vite single-page portfolio** for "M Afnan Khadim — MERN Stack Web Developer". It is a rewrite of the sibling plain-HTML/jQuery site in `../` (which has its own separate `CLAUDE.md`): every jQuery plugin behavior — sticky header, one-page scroll-spy nav, off-canvas mobile menu, About tabs, animated skill bars, portfolio filter, headline text rotator, scroll-to-top, Web3Forms contact — is reimplemented with **React hooks, no jQuery**. React 18 + Vite 5; no TypeScript, no router, no state library, no test/lint tooling.

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

There is no lint or test setup, and no single-test command — verify changes by running `npm run dev` and checking the browser.

## Architecture

The defining constraint: **components reuse the original template's CSS by rendering its exact class names.** The template stylesheets, fonts, and images are unmodified and live in `public/` (served at site root); `index.html` links them (`/css/style.css`, `/css/responsive.css`, etc.) before React mounts. So JSX like `className="tcd-title tcd-title-center mb50"` is not arbitrary — those class names are the contract with the vendored CSS. When adding markup, match the template's class names rather than inventing new ones; `src/styles/overrides.css` (imported once in `main.jsx`) is the only place for genuinely new styles.

- **`src/App.jsx`** — composes the page: `Header`, then a `<main>` of section components (`Banner`, `About`, `Services`, `Portfolio`, `ContactInfo`, `ContactForm`), then `Footer`, `Copyright`, `ScrollToTop`. One component per section, each ~self-contained.
- **`src/data/content.js`** and **`src/data/portfolio.js`** — all copy, nav links, services, skills, contact/social details, and portfolio projects live here as exported arrays. Components map over this data; edit content here, not in JSX.
- **`src/components/`** — thin presentational components. The ones that replace jQuery plugins own their behavior via hooks: `Header.jsx` (scroll listener for sticky + scroll-spy, `nav-expanded` body class for the mobile menu), `Banner.jsx` (`setInterval` headline rotator), `About.jsx` (tab state + one-shot skill-bar width animation), `Portfolio.jsx` (client-side filter by `filters` array), `ScrollToTop.jsx`.

### Section ids ↔ nav are coupled
Each section's `id` (`tcd-banner`, `tcd-about`, `tcd-services`, `tcd-portfolio`, `tcd-contact`) is both the scroll target and the scroll-spy key. `navLinks` in `content.js` references these ids by their `target`. If you rename a section id, rename it in `navLinks` too, or the nav highlight and smooth-scroll break. `Header.jsx`'s `scrollToSection` subtracts ~70px to clear the fixed header.

### Portfolio filtering
`portfolio.js` uses opaque filter keys: `filter1` = Web Design, `filter2` = Web Development, `*` = All. `filter3` = Mobile Apps. A project's `filters` array (not its display `category`) decides which buttons show it; a project can list several. Web projects' `link` points at the GitHub repo and renders the default "View Project" call-to-action; the published Android apps point at their Google Play listing (built from the `PLAY` prefix) and set `linkLabel: "Google Play"`. There are deliberately no live-demo links.

`Portfolio.jsx` paginates client-side: `PAGE_SIZE` (9) projects render at a time behind a "Load More Work" button, and switching filters resets back to the first page. The grid's first page is hand-ordered in `portfolio.js` to interleave apps and web work rather than leading with six app cards — reorder the array to change what lands above the fold.

App card images are pre-composed 1200×600 PNGs (`public/images/portfolio/app-*.png`) built from the square Play Store icons. That 2:1 ratio matters: nothing in the CSS constrains image height, so a raw 1:1 icon would render double-height and break row alignment.

## Contact form (gotcha)

`ContactForm.jsx` posts `FormData` to Web3Forms via `fetch`. The email subject is fixed by a hidden `<input name="subject">`; the visible subject field is deliberately named `user_subject` so it does **not** override that hidden subject. Don't rename `user_subject` to `subject` — that would clobber the intended subject line. The `WEB3FORMS_ACCESS_KEY` in `content.js` is a public client-side key by design (it was already exposed in the original markup).

## Assets

`public/` mirrors the original template tree. Several Font Awesome files use literal `@`-versioned names (e.g. `fontawesome-webfont.woff@v=4.7.0`) that the CSS `url(...)` references expect — preserve those exact filenames. Portfolio thumbnails and the CV PDF are referenced by root-absolute paths (`/images/...`), which resolve against `public/`.
