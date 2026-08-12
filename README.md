# Afnan Khadim, Portfolio (React + Vite)

A React + Vite rebuild of the original static portfolio. All jQuery plugin
behaviour (sticky header, one-page nav scroll-spy, mobile menu, About tabs,
animated skill bars, portfolio filter, headline text rotator, scroll-to-top,
Web3Forms contact form) is reimplemented with React hooks, no jQuery.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Structure

```
public/                 # original template assets, served at site root
  css/  fonts/  images/
src/
  main.jsx              # React entry, imports template CSS via index.html
  App.jsx               # page composition
  components/           # one component per section
  data/
    content.js          # nav, services, skills, contact info, social links
    portfolio.js        # projects with descriptions + GitHub / Play Store links
  styles/overrides.css  # small additions on top of the template CSS
```

## Notes

- The template's CSS/fonts/images live in `public/` so their relative
  `url(...)` paths keep working unchanged; stylesheets are linked from
  `index.html`.
- Project descriptions and links in `src/data/portfolio.js` point to the real
  GitHub repos at https://github.com/mafnankhadim, and to the published Android
  apps on Google Play. There are deliberately no live-demo links.
- The Web3Forms access key in `src/data/content.js` is public by design (it was
  already in the original client-side markup).
