import { useEffect, useRef, useState } from "react";
import { navLinks, FIVERR_URL } from "../data/content.js";
import { scrollToSection } from "../utils/scroll.js";
import "../styles/nav.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navLinks[0].target);
  const progressRef = useRef(null);

  // Condensed bar + scroll-spy + read-progress, on one passive listener.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Written straight to the node rather than held in state: this runs on
      // every scroll frame, and a setState here would re-render the whole nav
      // each time for a value only CSS consumes.
      if (progressRef.current) {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }

      // Probe a line a little below the nav: the section crossing it is the
      // one the reader is actually looking at.
      const probe = window.scrollY + 140;
      let current = navLinks[0].target;
      for (const link of navLinks) {
        const el = document.getElementById(link.target);
        if (el && el.offsetTop <= probe) current = link.target;
      }

      // The last section is usually too short to ever reach the probe line, so
      // hitting the bottom of the page selects it explicitly.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      setActive(atBottom ? navLinks[navLinks.length - 1].target : current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the full-screen mobile menu.
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  // Escape closes the menu — expected of anything full-screen and modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e, target) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(target);
  };

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a
          className="nav-logo"
          href="#home"
          onClick={(e) => go(e, "home")}
          aria-label="M Afnan Khadim — home"
        >
          <img src="/images/logos/logo.webp" alt="" width="120" height="32" />
        </a>

        <nav className="nav-links" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.target}>
                <a
                  href={`#${link.target}`}
                  className={active === link.target ? "is-active" : ""}
                  aria-current={active === link.target ? "page" : undefined}
                  onClick={(e) => go(e, link.target)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a
            className="btn btn--primary nav-cta"
            href={FIVERR_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hire Me
          </a>

          <button
            type="button"
            className={`nav-burger${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <span className="nav-progress" ref={progressRef} aria-hidden="true" />

      {/* Full-screen drawer. Kept mounted (not conditionally rendered) so it can
          transition both ways; `inert` keeps it out of the tab order and the
          accessibility tree while closed. */}
      <div
        id="nav-drawer"
        className={`nav-drawer${open ? " is-open" : ""}`}
        inert={open ? undefined : ""}
      >
        <ul>
          {navLinks.map((link, i) => (
            <li key={link.target} style={{ "--i": i }}>
              <a href={`#${link.target}`} onClick={(e) => go(e, link.target)}>
                <span className="nav-drawer-num">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          className="btn btn--primary"
          href={FIVERR_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          Hire Me
        </a>
      </div>
    </header>
  );
}
