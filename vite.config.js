import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Runs the AI assistant's Netlify function inside the Vite dev server, so
// `npm run dev` behaves like production instead of 404-ing on
// /.netlify/functions/chat (which Vite would otherwise answer with
// index.html). Reads the same .env the deployed function reads from Netlify's
// environment. Dev only — Netlify serves the real function in production.
function chatFunction(env) {
  return {
    name: "chat-function-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/.netlify/functions/chat", async (req, res) => {
        // The function reads process.env at module load, so populate it first.
        for (const [k, v] of Object.entries(env)) {
          if (k.startsWith("CHAT_") || k.endsWith("_API_KEY")) process.env[k] = v;
        }
        const { default: handler } = await server.ssrLoadModule(
          "/netlify/functions/chat.js"
        );

        const body = await new Promise((resolve) => {
          const chunks = [];
          req.on("data", (c) => chunks.push(c));
          req.on("end", () => resolve(Buffer.concat(chunks)));
        });

        const response = await handler(
          new Request(`http://localhost${req.url}`, {
            method: req.method,
            headers: req.headers,
            body: req.method === "GET" ? undefined : body,
          })
        );

        res.statusCode = response.status;
        response.headers.forEach((v, k) => res.setHeader(k, v));
        res.end(Buffer.from(await response.arrayBuffer()));
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // "" prefix: load every var from .env, not just VITE_-prefixed ones.
  const env = loadEnv(mode, process.cwd(), "");
  return { plugins: [react(), chatFunction(env)] };
});
