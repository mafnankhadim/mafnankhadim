import { useEffect, useRef, useState } from "react";

// Counts a stat up from zero the first time it scrolls into view.
//
// Takes the display string, not a number ("2+", "26"), and animates only the
// leading digits — so the suffix a stat carries stays put and callers keep
// passing the one value they already have.
const PARSE = /^(\d+)(.*)$/;

export default function CountUp({ value, duration = 1400 }) {
  const match = PARSE.exec(String(value));
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef(null);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    // Not a leading-number string, so there is nothing to animate.
    if (target === null) return;

    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }

    setShown(0);
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // One shot: re-running on every re-entry would make the page twitch
        // on the way back up.
        observer.disconnect();

        const started = performance.now();
        const tick = (now) => {
          const t = Math.min((now - started) / duration, 1);
          // easeOutCubic — fast out of the gate, settling onto the number.
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  // The full value stays in the accessibility tree, so a screen reader is read
  // "26 projects" once rather than every intermediate number.
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
