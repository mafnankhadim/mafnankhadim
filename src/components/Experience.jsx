import { education, experience } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import "../styles/experience.css";

export default function Experience() {
  return (
    <section id="experience" className="section section--alt section--line">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Career</span>
          <h2 className="section-title">
            Where I've <em>worked</em>
          </h2>
          <p className="section-sub">
            A government power portal, a medical product, and the internship
            that started it — with what I owned in each.
          </p>
        </Reveal>

        <ol className="exp-timeline">
          {experience.map((job, i) => (
            <Reveal
              as="li"
              className="exp-item"
              key={`${job.company}-${job.period}`}
              delay={i * 110}
            >
              {/* The dot is absolutely placed on the rail, so it stays aligned
                  whether the period sits beside the card or above it. */}
              <span
                className={`exp-node${job.current ? " is-current" : ""}`}
                aria-hidden="true"
              ></span>

              <div className="exp-aside">
                <p
                  className={`exp-period${job.current ? " exp-period--current" : ""}`}
                >
                  {job.period}
                </p>
                <p className="exp-location">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  {job.location}
                </p>
              </div>

              <article className="exp-card card">
                <h3 className="exp-role">{job.role}</h3>
                <p className="exp-company">{job.company}</p>
                <p className="exp-desc">{job.description}</p>

                {job.highlights.length > 0 && (
                  <ul className="exp-points">
                    {job.highlights.map((point) => (
                      <li key={point}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal className="exp-edu" delay={120}>
          <div className="exp-edu-head">
            <h3 className="exp-edu-title">
              <i className="fa fa-graduation-cap" aria-hidden="true"></i>
              Education
            </h3>
            <span className="exp-edu-rule" aria-hidden="true"></span>
          </div>

          <div className="grid exp-edu-list">
            {education.map((item) => (
              <article className="card exp-edu-item" key={item.degree}>
                <p className="exp-period">{item.period}</p>
                <h4 className="exp-degree">{item.degree}</h4>
                <p className="exp-school">{item.school}</p>
                <p className="exp-desc">{item.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
