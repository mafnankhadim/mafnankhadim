import { useState } from "react";
import { projects, portfolioFilters } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

// Landing page shows a curated first page of work; the rest is one click away.
const PAGE_SIZE = 9;

export default function Portfolio() {
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
    <section
      id="tcd-portfolio"
      className="tcd-portfolio bg-light-gray sec-spacer"
    >
      <div className="container">
        <Reveal className="tcd-title tcd-title-center mb50">
          <h2>
            My Creative <span>Portfolio</span>
          </h2>
          <p>
            Showcasing web design and full-stack development work built with
            React and Node.js, alongside published Android apps on Google Play
            — from point-of-sale systems to everyday utility tools.
          </p>
        </Reveal>

        <div className="portfolio-filter text-center">
          {portfolioFilters.map((btn) => (
            <button
              key={btn.value}
              className={filter === btn.value ? "active" : ""}
              onClick={() => changeFilter(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="row grid">
          {onScreen.map((project, i) => (
            <Reveal
              as="div"
              className="col-lg-4 col-md-6 col-sm-6 grid-item portfolio-box"
              key={project.title}
              delay={(i % 3) * 120}
            >
              <div className="portfolio-item">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-content">
                  <h4 className="title">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  </h4>
                  <span className="post">{project.category}</span>
                </div>
              </div>
              <div className="description">
                {project.description}
                <div className="portfolio-links">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.linkLabel || "View Project"}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {remaining > 0 && (
          <div className="portfolio-more">
            <button
              type="button"
              onClick={() => setShown(shown + PAGE_SIZE)}
            >
              Load More Work
            </button>
            <span className="portfolio-count">
              Showing {onScreen.length} of {visible.length} projects
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
