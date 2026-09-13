import { useEffect, useRef, useState } from "react";
import HeroScene from "./HeroScene.jsx";
import CountUp from "./CountUp.jsx";
import { bannerRoles as roles, bannerLead, CV_URL } from "../data/content.js";
import { projects } from "../data/portfolio.js";
import { scrollToSection } from "../utils/scroll.js";
import "../styles/hero.css";

// Counted from portfolio.js rather than written out, so the headline figures
// can never contradict the grid further down the page.
const stats = [
  { value: "2+", label: "Years Experience" },
  { value: `${projects.length}`, label: "Projects Shipped" },
  {
    value: `${projects.filter((p) => p.linkLabel === "Google Play").length}`,
    label: "Apps on Google Play",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  // Spotlight that follows the cursor across the hero. The position is written
  // to custom properties on the section and `.hero-spot` in the stylesheet
  // paints it, so the effect can be switched off in CSS (coarse pointers,
  // reduced motion) without touching this component. rAF-coalesced because
  // pointermove fires far more often than the screen repaints.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let next = null;

    const flush = () => {
      frame = 0;
      if (next) {
        el.style.setProperty("--mx", `${next.x}%`);
        el.style.setProperty("--my", `${next.y}%`);
      }
    };

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      next = {
        x: (((event.clientX - rect.left) / rect.width) * 100).toFixed(1),
        y: (((event.clientY - rect.top) / rect.height) * 100).toFixed(1),
      };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      {/* Depth layers behind the copy, back to front: WebGL solid, colour
          wash, perspective grid. All decorative and pointer-transparent. */}
      <HeroScene />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-spot" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow hero-badge">
            <span className="hero-dot" aria-hidden="true" />
            Available for freelance &amp; remote work
          </span>

          <h1 className="hero-title">
            Hi, I'm <em>M Afnan Khadim</em>
          </h1>

          {/* One slot, one visible role at a time. The full list stays in the
              DOM for screen readers and for a no-JS crawl. */}
          <p className="hero-roles" aria-label={roles.join(", ")}>
            <span className="hero-roles-slot" aria-hidden="true">
              {roles.map((role, i) => (
                <span
                  key={role}
                  className={`hero-role${i === index ? " is-visible" : ""}`}
                >
                  {role}
                </span>
              ))}
            </span>
          </p>

          <p className="hero-lead">{bannerLead}</p>

          <div className="hero-actions">
            <a
              className="btn btn--primary"
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-download" aria-hidden="true" /> Download CV
            </a>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => scrollToSection("work")}
            >
              View My Work
            </button>
          </div>

          <ul className="hero-stats">
            {stats.map((stat) => (
              <li key={stat.label}>
                <strong>
                  <CountUp value={stat.value} />
                </strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll"
        onClick={() => scrollToSection("about")}
      >
        <span>Scroll</span>
        <i className="fa fa-angle-down" aria-hidden="true" />
      </button>
    </section>
  );
}
