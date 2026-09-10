import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage.jsx";
import {
  ASSISTANT_NAME,
  CHAT_ENDPOINT,
  GREETING,
  SUGGESTIONS,
} from "../data/chatbot.js";

// Floating AI assistant: a launcher bubble in the bottom-right corner that
// opens a side panel (not a full-screen takeover). The API key lives in the
// Netlify function this posts to — see netlify/functions/chat.js.

const STORAGE_KEY = "afnan-chat";

// The transcript is kept for the tab's lifetime only: a returning visitor
// gets a clean greeting, but switching sections mid-conversation (or an
// accidental close) doesn't throw the answers away.
function loadHistory() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* private mode — the transcript just won't survive a reload */
    }
  }, [messages]);

  // Keep the newest message in view as answers stream in.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, pending, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Esc closes the panel and hands focus back to the launcher.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text) {
    const question = text.trim();
    if (!question || pending) return;

    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setError("");
    setPending(true);

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      // A non-JSON 200 means the function isn't running (plain `npm run dev`
      // serves index.html here) — treat it as an outage, not an empty answer.
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) {
        throw new Error(
          data.error ||
            "The assistant is unavailable right now — please use the contact form below."
        );
      }
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again, or use the contact form."
      );
    } finally {
      setPending(false);
    }
  }

  // Chips only make sense while the visitor hasn't asked anything yet.
  const showSuggestions = messages.length === 0 && !pending;

  return (
    <>
      <div
        className={`chatbot-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label={ASSISTANT_NAME}
        aria-hidden={!open}
      >
        <div className="chatbot-head">
          <span className="chatbot-avatar">
            <img src="/images/logos/logo.webp" alt="" />
          </span>
          <div className="chatbot-identity">
            <strong>{ASSISTANT_NAME}</strong>
            <span className="chatbot-status">Online</span>
          </div>
          <button
            type="button"
            className="chatbot-close"
            onClick={() => {
              setOpen(false);
              launcherRef.current?.focus();
            }}
            aria-label="Close chat"
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div className="chatbot-body" ref={listRef}>
          <div className="chatbot-msg bot">
            <ChatMessage text={GREETING} />
          </div>

          {messages.map((m, i) => (
            <div key={i} className={`chatbot-msg ${m.role === "user" ? "user" : "bot"}`}>
              {m.role === "user" ? <p>{m.content}</p> : <ChatMessage text={m.content} />}
            </div>
          ))}

          {pending && (
            <div className="chatbot-msg bot chatbot-typing" aria-label="Typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          {error && <p className="chatbot-error">{error}</p>}
        </div>

        {showSuggestions && (
          <div className="chatbot-chips">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          className="chatbot-input"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about projects, skills…"
            aria-label="Your message"
            maxLength={1000}
            autoComplete="off"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={pending || !input.trim()}
          >
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </form>

        <p className="chatbot-note">
          AI can make mistakes — please verify important details.
        </p>
      </div>

      <button
        type="button"
        ref={launcherRef}
        className={`chatbot-launcher${open ? " is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : `Chat with ${ASSISTANT_NAME}`}
      >
        <i
          className={open ? "fa fa-times" : "fa fa-comments"}
          aria-hidden="true"
        ></i>
        {!open && <span className="chatbot-ping" aria-hidden="true"></span>}
      </button>
    </>
  );
}
