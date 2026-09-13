import { services } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import Tilt from "./Tilt.jsx";
import "../styles/services.css";

export default function Services() {
  return (
    <section id="services" className="section section--alt section--line">
      <div className="container">
        <Reveal as="header" className="section-head section-head--center">
          <span className="eyebrow">What I Do</span>
          <h2 className="section-title">
            Three things I ship <em>end to end</em>
          </h2>
          <p className="section-sub">
            Interface design, full-stack web applications, and native Android
            apps published on Google Play.
          </p>
        </Reveal>

        <div className="grid grid--3 svc-grid">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 120}>
              <Tilt as="article" className="card svc-card">
                {/* Decorative watermark; the count carries no meaning of its
                    own, so it stays out of the accessibility tree. */}
                <span className="svc-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="svc-badge" aria-hidden="true">
                  <i className={service.icon} />
                </span>
                <h3 className="svc-title">{service.title}</h3>
                <p className="svc-text">{service.description}</p>
                <ul className="svc-points">
                  {service.points.map((point) => (
                    <li key={point}>
                      <i className="fa fa-check" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
