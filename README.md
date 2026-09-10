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

`npm run dev` also runs the AI assistant's serverless function (see
`vite.config.js`), so the chat widget works locally as soon as a `.env` with
`CHAT_API_KEY` exists — no Netlify CLI needed. `npx netlify dev` also works if
you want the full Netlify environment.

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

## AI assistant

The floating chat bubble (`src/components/Chatbot.jsx`) posts to a Netlify
function, `netlify/functions/chat.js`, which adds the system prompt and the
model API key before calling the provider. The key therefore never reaches the
browser — unlike the Web3Forms key, it must stay secret.

The function's knowledge about Afnan lives in `src/data/chatbot.js`, and its
project list is generated from `src/data/portfolio.js`, so the assistant can't
describe a project that is no longer on the site. Edit the bio, greeting or
suggestion chips there.

Configure the provider with environment variables — in Netlify under
Site settings → Environment variables, and locally in a `.env` (see
`.env.example`):

| Variable | Required | Default |
| --- | --- | --- |
| `CHAT_API_KEY` | yes | — |
| `CHAT_API_URL` | no | Groq's OpenAI-compatible endpoint |
| `CHAT_MODEL` | no | `openai/gpt-oss-120b` |

Any OpenAI-compatible chat-completions API works (Groq, OpenAI, OpenRouter,
Together): set `CHAT_API_URL` and `CHAT_MODEL` to match the provider. Without a
key the widget still renders and fails politely, pointing visitors at the
contact form.

Locally the same function is served by a small Vite dev-server plugin in
`vite.config.js`, which reads `.env` and mounts the handler at the same
`/.netlify/functions/chat` path Netlify uses in production.
