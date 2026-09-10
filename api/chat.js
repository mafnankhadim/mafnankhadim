// Vercel Serverless Function backing the site's AI assistant
// (src/components/Chatbot.jsx), served at /api/chat.
//
// It exists purely to keep the model API key off the client: the browser posts
// a conversation here, this function adds the system prompt and the secret key
// and forwards the call. Any OpenAI-compatible chat-completions endpoint works
// (Groq, OpenAI, OpenRouter, Together...), selected with env vars:
//
//   CHAT_API_KEY   required — the provider's secret key
//   CHAT_API_URL   optional — defaults to Groq's OpenAI-compatible endpoint
//   CHAT_MODEL     optional — defaults to openai/gpt-oss-120b (on Groq)
//
// The system prompt is built here rather than sent by the browser, so a
// visitor cannot swap it out by crafting their own request.

import { KNOWLEDGE } from "../src/data/chatbot.js";

const API_URL =
  process.env.CHAT_API_URL ||
  "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.CHAT_MODEL || "openai/gpt-oss-120b";
const API_KEY =
  process.env.CHAT_API_KEY ||
  process.env.GROQ_API_KEY ||
  process.env.OPENAI_API_KEY;

// Guardrails against a stranger running up the API bill with the key that sits
// behind this endpoint: one visitor's turn is short, and so is the context.
const MAX_MESSAGES = 16;
const MAX_CHARS = 1500;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!API_KEY) {
    return res.status(500).json({
      error: "The assistant is not configured yet (missing CHAT_API_KEY).",
    });
  }

  // Vercel parses a JSON body for us; fall back for anything it hands back raw.
  let payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const incoming = Array.isArray(payload?.messages) ? payload.messages : [];
  const messages = incoming
    .filter(
      (m) =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (!messages.length) {
    return res.status(400).json({ error: "No message to answer" });
  }

  let upstream;
  try {
    upstream = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 600,
        messages: [{ role: "system", content: KNOWLEDGE }, ...messages],
      }),
    });
  } catch {
    return res.status(502).json({ error: "Could not reach the AI service." });
  }

  if (!upstream.ok) {
    // Log the provider's reason for the site owner; keep it out of the reply.
    console.error("AI provider error", upstream.status, await upstream.text());
    return res.status(502).json({
      error:
        upstream.status === 429
          ? "The assistant is busy right now — please try again in a moment."
          : "The assistant is unavailable right now.",
    });
  }

  const data = await upstream.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    return res.status(502).json({ error: "Empty response from the AI service." });
  }

  return res.status(200).json({ reply });
}
