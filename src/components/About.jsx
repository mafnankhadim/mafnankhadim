import { education } from "../data/content.js";
import { projects } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";
import Tilt from "./Tilt.jsx";
import CountUp from "./CountUp.jsx";
import "../styles/about.css";

const [degree] = education;

// Counted from the portfolio data rather than typed out, so the numbers can
// never disagree with the grid a visitor scrolls to next.
const projectCount = projects.length;
const playCount = projects.filter((p) => p.linkLabel === "Google Play").length;

const facts = [
  { label: "Location", value: "Lahore, Pakistan" },
  { label: "Availability", value: "Open to remote" },
  ...(degree
    ? [{ label: "Education", value: degree.degree, note: degree.school }]
    : []),
];

const stats = [
  { icon: "fa fa-briefcase", value: "2+", label: "Years of professional experience" },
  { icon: "fa fa-rocket", value: `${projectCount}`, label: "Projects shipped" },
  { icon: "fa fa-android", value: `${playCount}`, label: "Apps live on Google Play" },
  { icon: "fa fa-graduation-cap", value: "BS", label: "Computer Science" },
];

export default function About() {
  return (
    <section id="about" className="section section--glow">
      <div className="container about-grid">
        <Reveal as="div" className="about-aside" direction="right">
          {/* The sticky element is the inner block: the Reveal wrapper is the
              grid item and has to stay full-height for the rail to travel. */}
          <div className="about-aside-inner">
            <span className="eyebrow">About Me</span>
            <h2 className="section-title">
              I build <em>software people use daily</em>
            </h2>
            <p className="section-sub about-lead">
              2+ years across the stack: React, Redux and TypeScript on the
              frontend, Node.js, Express and MongoDB on the backend, plus
              published Android apps on Google Play.
            </p>

            <dl className="about-facts">
              {facts.map((fact) => (
                <div className="about-fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>
                    {fact.value}
                    {fact.note && <small>{fact.note}</small>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <div className="about-main">
          <Reveal as="div" className="about-body" delay={80}>
            <p>
              I'm M. Afnan Khadim, a MERN stack developer based in Lahore,
              Pakistan and open to remote work. I hold a BS in Computer Science
              from Mirpur University of Science and Technology, and I currently
              work as a Software Developer at DevBrains Lahore, building core
              modules for a production medical web portal in React and
              TypeScript. Before that I spent two years at PITC, Ministry of
              Energy (Power Division), as a MERN Stack Developer.
            </p>
            <p>
              My focus is REST API design, authentication, component
              architecture and responsive UI. At PITC I shipped consumer-facing
              modules for the DISCO power portal — bill payment, installments,
              complaint registration and meter change — and built the full-stack
              Bill Detection module end to end, owning schema design, REST
              endpoint authentication and deployment readiness.
            </p>
            <p>
              Alongside web work I build and publish Android apps: BytePOS for
              offline point-of-sale and billing, ByteTools for on-device
              document work, and several electricity-services utilities. I work
              in Agile teams, I'm comfortable working remotely, and I care about
              writing clean, maintainable code.
            </p>
          </Reveal>

          <Reveal as="div" className="grid about-stats" delay={160}>
            {stats.map((stat) => (
              <Tilt className="card about-stat" key={stat.label}>
                <i className={stat.icon} aria-hidden="true"></i>
                <span className="about-stat-value">
                  <CountUp value={stat.value} />
                </span>
                <span className="about-stat-label">{stat.label}</span>
              </Tilt>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
