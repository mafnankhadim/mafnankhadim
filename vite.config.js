import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Runs the AI assistant's serverless function inside the Vite dev server, so
// `npm run dev` behaves like production instead of 404-ing on /api/chat (which
// Vite would otherwise answer with index.html). Reads the same .env the
// deployed function reads from Vercel's environment.
//
// Vercel handlers take Node's (req, res), which is what connect middleware
// hands us — only the JSON body parsing and the res.status()/.json() helpers
// Vercel adds need shimming. Dev only; Vercel serves api/chat.js in production.
function apiRoutes(env) {
  return {
    name: "api-routes-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        // The function reads process.env at module load, so populate it first.
        for (const [k, v] of Object.entries(env)) {
          if (k.startsWith("CHAT_") || k.endsWith("_API_KEY")) process.env[k] = v;
        }
        const { default: handler } = await server.ssrLoadModule("/api/chat.js");

        const raw = await new Promise((resolve) => {
          const chunks = [];
          req.on("data", (c) => chunks.push(c));
          req.on("end", () => resolve(Buffer.concat(chunks).toString()));
        });
        try {
          req.body = raw ? JSON.parse(raw) : undefined;
        } catch {
          req.body = raw;
        }

        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (body) => {
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify(body));
          return res;
        };

        await handler(req, res);
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // "" prefix: load every var from .env, not just VITE_-prefixed ones.
  const env = loadEnv(mode, process.cwd(), "");
  return { plugins: [react(), apiRoutes(env)] };
});
