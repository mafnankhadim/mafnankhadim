import { useState } from "react";
import { projects, portfolioFilters } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";
import Tilt from "./Tilt.jsx";
import "../styles/work.css";

// The landing page shows a curated first page of work; the rest is one click
// away. The array order in portfolio.js decides what lands above the fold.
const PAGE_SIZE = 9;

// The call-to-action points at three different kinds of destination, so the
// glyph is derived from the label rather than stored per project.
function ctaIcon(label) {
  if (label === "Google Play") return "fa fa-android";
  if (label === "Visit Website") return "fa fa-external-link";
  return "fa fa-github";
}

export default function Work() {
  const [filter, setFilter] = useState("*");
  const [shown, setShown] = useState(PAGE_SIZE);

  const visible = projects.filter(
    (p) => filter === "*" || p.filters.includes(filter)
  );
  const onScreen = visible.slice(0, shown);
  const remaining = visible.length - onScreen.length;

  // Switching filters starts the new set from the top again.
  const changeFilter = (value) => {
    setFilter(value);
    setShown(PAGE_SIZE);
  };

  return (
    <section id="work" className="section section--glow">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">
            <i className="fa fa-th-large" aria-hidden="true"></i>
            Portfolio
          </span>
          <h2 className="section-title">
            Selected <em>Work</em>
          </h2>
          <p className="section-sub">
            Full-stack web applications built with React and Node.js, interface
            work for real businesses, and native Android apps published on
            Google Play — from point-of-sale systems to everyday utilities.
          </p>
        </Reveal>

        <Reveal
          className="work-filters"
          role="group"
          aria-label="Filter projects by type"
        >
          {portfolioFilters.map((btn) => (
            <button
              key={btn.value}
              type="button"
              className={`work-filter${
                filter === btn.value ? " is-active" : ""
              }`}
              aria-pressed={filter === btn.value}
              onClick={() => changeFilter(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </Reveal>

        <div className="work-grid">
          {onScreen.map((project, i) => {
            // The first card of the current filter is the bento hero tile.
            const featured = i === 0;
            const label = project.linkLabel || "View Project";

            return (
              <Reveal
                as="div"
                key={project.title}
                className={`work-item${featured ? " work-item--featured" : ""}`}
                delay={(i % 3) * 90}
              >
                {/* One tilt surface per card so the thumbnail and the copy
                    move together as a single plane. */}
                <Tilt
                  className={`work-card card${
                    featured ? " work-card--featured" : ""
                  }`}
                >
                  <div className="work-card__media">
                    <img
                      className="work-card__img"
                      src={project.image}
                      alt={`${project.title} — ${project.category} project preview`}
                      loading="lazy"
                      decoding="async"
                    />
                    {/* The scrim is a real element rather than a third pseudo:
                        the media box's two are already spoken for by the hover
                        wash and the inset frame. */}
                    <span className="work-card__scrim" aria-hidden="true" />
                    {featured && (
                      <span className="work-card__badge">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="work-card__body">
                    <span className="work-card__cat">{project.category}</span>
                    <h3 className="work-card__title">{project.title}</h3>
                    <p className="work-card__desc">{project.description}</p>

                    <div className="work-card__actions">
                      <a
                        className={
                          featured
                            ? "btn btn--ghost work-card__btn"
                            : "work-card__cta"
                        }
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} — ${project.title}`}
                      >
                        <i className={ctaIcon(label)} aria-hidden="true"></i>
                        {label}
                        <i
                          className="fa fa-long-arrow-right work-card__arrow"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>

        <div className="work-more">
          {remaining > 0 && (
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
            >
              Load More Work
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </button>
          )}
          <p className="work-count" aria-live="polite">
            Showing {onScreen.length} of {visible.length} projects
          </p>
        </div>
      </div>
    </section>
  );
}
