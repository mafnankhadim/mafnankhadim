import { Fragment } from "react";

// Minimal markdown for model replies: **bold**, `code`, [text](url), bare URLs
// and "- " bullet lists. Rendered as React nodes rather than innerHTML, so a
// reply can never inject markup into the page.

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s<>)]+)/g;

function Link({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

// A bare repo URL can run past 60 characters, which wraps to three lines in a
// 380px panel. Drop the scheme and elide the middle of a long path; the href
// still points at the full URL.
const MAX_LABEL = 38;

function linkLabel(href) {
  const bare = href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  if (bare.length <= MAX_LABEL) return bare;
  const cut = bare.slice(0, MAX_LABEL - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf("/"), MAX_LABEL - 12)) + "…";
}

function inline(text, keyPrefix) {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      // Parse the contents too: models routinely bold a link, as in
      // **[BytePOS](https://…)**, and a literal slice would print the markup.
      return <strong key={key}>{inline(part.slice(2, -2), key)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    const md = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (md) {
      return (
        <Link key={key} href={md[2]}>
          {md[1]}
        </Link>
      );
    }
    if (/^https?:\/\//.test(part)) {
      // Trailing punctuation belongs to the sentence, not the URL.
      const trailing = part.match(/[.,;:!?]+$/);
      const href = trailing ? part.slice(0, -trailing[0].length) : part;
      return (
        <Fragment key={key}>
          <Link href={href}>{linkLabel(href)}</Link>
          {trailing ? trailing[0] : null}
        </Fragment>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export default function ChatMessage({ text }) {
  // Models often emit autolinks as <https://example.com>. Unwrap them first,
  // or the angle brackets end up in the visible text and the closing one is
  // swallowed into the href.
  text = text.replace(/<(https?:\/\/[^>\s]+)>/g, "$1");

  const blocks = [];
  let list = null; // { ordered, items }

  const flush = () => {
    if (list) {
      const Tag = list.ordered ? "ol" : "ul";
      blocks.push(
        <Tag key={`list-${blocks.length}`}>
          {list.items.map((item, i) => (
            <li key={i}>{inline(item, `li-${blocks.length}-${i}`)}</li>
          ))}
        </Tag>
      );
      list = null;
    }
  };

  text.split("\n").forEach((line, i) => {
    const bullet = line.match(/^\s*(?:([-*•])|\d+\.)\s+(.*)$/);
    if (bullet) {
      const ordered = !bullet[1];
      // A switch between bullet and numbered styles starts a new list.
      if (list && list.ordered !== ordered) flush();
      (list ||= { ordered, items: [] }).items.push(bullet[2]);
      return;
    }
    flush();
    if (line.trim()) {
      blocks.push(<p key={`p-${i}`}>{inline(line, `p-${i}`)}</p>);
    }
  });
  flush();

  return <>{blocks}</>;
}
