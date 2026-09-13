import { useEffect, useRef, useState } from "react";
import { skills, techGroups } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import Tilt from "./Tilt.jsx";
import "../styles/skills.css";

// Ring geometry. The circumference is what stroke-dasharray/offset work in, so
// it is derived once here rather than hard-coded next to the markup.
const RING_SIZE = 104;
const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;

// One shared sweep drives every ring: each starts RING_STAGGER later than the
// one before it and runs for RING_DURATION.
const RING_DURATION = 1300;
const RING_STAGGER = 90;

const clamp01 = (n) => Math.min(Math.max(n, 0), 1);
const easeOut = (p) => 1 - Math.pow(1 - p, 3);

// SVG gradient ids are document-global, so each ring needs its own or every
// ring paints with the first one's stops.
const slug = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Skills() {
  // 0..1 progress of the whole staggered sweep; 1 means every ring is settled.
  const [progress, setProgress] = useState(0);
  const coreRef = useRef(null);

  useEffect(() => {
    const el = coreRef.current;
    if (!el) return;

    // Reduced motion: land on the final values, no sweep.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const total = RING_DURATION + RING_STAGGER * (skills.length - 1);
    let frame = 0;
    let start = 0;

    const step = (now) => {
      if (!start) start = now;
      const p = clamp01((now - start) / total);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect(); // one-shot: the rings never replay
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const elapsed = progress * (RING_DURATION + RING_STAGGER * (skills.length - 1));

  return (
    <section id="skills" className="section section--glow">
      <div className="container">
        <Reveal as="header" className="section-head section-head--center">
          <span className="eyebrow">Tech Stack</span>
          <h2 className="section-title">
            The tools I <em>build with</em>
          </h2>
          <p className="section-sub">
            A working stack, not a wish list — every entry below ships in
            production code, a published app or a client project.
          </p>
        </Reveal>

        <div className="grid skills-grid">
          {techGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 110}>
              <Tilt className="card skills-card">
                <span className="skills-badge" aria-hidden="true">
                  <i className={group.icon} />
                </span>
                <h3 className="skills-card-title">{group.title}</h3>
                <ul className="skills-tags">
                  {group.items.map((item) => (
                    <li key={item} className="skills-tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="skills-core" ref={coreRef}>
          <h3 className="skills-core-title">Core strengths</h3>
          <ul className="skills-core-list">
            {skills.map((skill, i) => {
              const id = `skill-${slug(skill.label)}-${i}`;
              const gradId = `${id}-grad`;
              // Each ring's own eased 0..1, offset by its place in the row.
              const local = easeOut(
                clamp01((elapsed - i * RING_STAGGER) / RING_DURATION)
              );
              const shown = Math.round(skill.value * local);

              return (
                <li key={skill.label} className="skills-ring">
                  <div
                    className="skills-ring-dial"
                    role="progressbar"
                    aria-labelledby={id}
                    aria-valuenow={skill.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <svg
                      className="skills-ring-svg"
                      viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <defs>
                        <linearGradient
                          id={gradId}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          {/* stop-color is set from CSS so the stops can use
                              the theme tokens instead of raw hex. */}
                          <stop offset="0%" className="skills-ring-stop-a" />
                          <stop offset="100%" className="skills-ring-stop-b" />
                        </linearGradient>
                      </defs>
                      <circle
                        className="skills-ring-track"
                        cx={RING_SIZE / 2}
                        cy={RING_SIZE / 2}
                        r={RING_R}
                      />
                      <circle
                        className="skills-ring-arc"
                        cx={RING_SIZE / 2}
                        cy={RING_SIZE / 2}
                        r={RING_R}
                        stroke={`url(#${gradId})`}
                        strokeDasharray={RING_C}
                        strokeDashoffset={RING_C * (1 - (skill.value / 100) * local)}
                      />
                    </svg>
                    <span className="skills-ring-value">
                      {shown}
                      <span className="skills-ring-pct">%</span>
                    </span>
                  </div>
                  <span className="skills-ring-label" id={id}>
                    {skill.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
