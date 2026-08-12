import { useEffect, useState } from "react";
import { skills } from "../data/content.js";
import Reveal from "./Reveal.jsx";

const tabs = [
  { id: "biography", label: "Biography", icon: "fa fa-user" },
  { id: "education", label: "Education", icon: null },
  { id: "experience", label: "Experience", icon: "fa fa-coffee" },
  { id: "skills", label: "Skills", icon: "fa fa-diamond" },
];

export default function About() {
  const [active, setActive] = useState("biography");
  const [animateBars, setAnimateBars] = useState(false);

  // Animate the skill bars the first time the Skills tab is opened.
  useEffect(() => {
    if (active === "skills") {
      const id = setTimeout(() => setAnimateBars(true), 50);
      return () => clearTimeout(id);
    }
  }, [active]);

  const paneClass = (id) => `tab-pane fade${active === id ? " show active" : ""}`;

  return (
    <section id="tcd-about" className="tcd-about sec-spacer">
      <div className="container">
        <Reveal className="tcd-title tcd-title-center mb50">
          <h2>
            About <span>Me</span>
          </h2>
          <p>
            I'm M. Afnan Khadim, a MERN stack developer with 2+ years of
            professional experience delivering production React and Node.js
            applications for government and healthcare clients. Alongside the
            web, I design and publish offline-first Android apps on Google Play.
          </p>
        </Reveal>

        <Reveal className="tcd-tabs mt-25" delay={120}>
          <ul className="nav nav-tabs nav-center">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <a
                  href={`#${tab.id}`}
                  className={active === tab.id ? "active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(tab.id);
                  }}
                >
                  {tab.icon && <i className={tab.icon}></i>}
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="tab-content">
            {/* Biography */}
            <div id="biography" className={paneClass("biography")}>
              <div className="about-bio">
                <p className="lead-text">
                  2+ years of professional experience across the stack: React,
                  Redux and TypeScript on the frontend, Node.js, Express and
                  MongoDB on the backend, plus published Android apps on Google
                  Play.
                </p>
                <p>
                  I'm M. Afnan Khadim, a MERN stack developer based in Lahore,
                  Pakistan and open to remote work. I hold a BS in Computer
                  Science from Mirpur University of Science and Technology, and
                  I currently work as a Software Developer at DevBrains Lahore,
                  building core modules for a production medical web portal in
                  React and TypeScript. Before that I spent two years at PITC,
                  Ministry of Energy (Power Division), as a MERN Stack Developer.
                </p>
                <p>
                  My focus is REST API design, authentication, component
                  architecture and responsive UI. At PITC I shipped
                  consumer-facing modules for the DISCO power portal (bill
                  payment, installments, complaint registration and meter
                  change) and built the full-stack Bill Detection module end to end,
                  owning schema design, REST endpoint authentication and
                  deployment readiness.
                </p>
                <p>
                  Alongside web work I build and publish Android apps: BytePOS
                  for offline point-of-sale and billing, ByteTools for on-device
                  document work, and several electricity-services utilities. I
                  work in Agile teams, I'm comfortable working remotely, and I
                  care about writing clean, maintainable code.
                </p>
              </div>
            </div>

            {/* Education */}
            <div id="education" className={paneClass("education")}>
              <div className="about-edu">
                <div className="edu-item">
                  <h3 className="degree">BS. Computer Science</h3>
                  <div className="campus">
                    Mirpur University of Science and Technology, AJK
                    <span className="date">2019 - 2023</span>
                  </div>
                  <div className="desc">
                    Pursued a Bachelor's degree in Computer Science, gaining
                    comprehensive knowledge in software development, algorithms,
                    databases, and web technologies. Developed strong
                    problem-solving skills through coursework and projects. Gained
                    hands-on experience with modern programming languages and
                    frameworks. Prepared to apply technical expertise to real-world
                    software challenges.
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div id="experience" className={paneClass("experience")}>
              <div className="about-exprnc">
                <div className="exprnc-item">
                  <h3 className="title">Software Developer</h3>
                  <div className="company">
                    DevBrains Lahore, Lahore, Pakistan
                    <span className="date">Nov 2025 - Present</span>
                  </div>
                  <div className="desc">
                    Building core modules (patient intake, appointment scheduling
                    and role-based dashboards) in a production medical web portal
                    using React.js and TypeScript with responsive, accessible UIs.
                    I integrate REST APIs with React Query for data fetching and
                    caching, handling authentication flows, error states and form
                    validation through a shared hooks layer, and I maintain a
                    reusable component library of forms, modals and data tables
                    used across the product to enforce design consistency.
                  </div>
                </div>

                <div className="exprnc-item">
                  <h3 className="title">MERN Stack Developer</h3>
                  <div className="company">
                    PITC, Ministry of Energy (Power Division), Lahore, Pakistan
                    <span className="date">Dec 2023 - Nov 2025</span>
                  </div>
                  <div className="desc">
                    Shipped consumer-facing modules (bill payment, installments,
                    complaint registration and meter change) in the power portal
                    used by DISCOs, built with React.js and Redux. Designed and
                    delivered a multi-step approval UI for bill-correction and
                    meter-reading workflows that improved service tracking for
                    field teams, and built the full-stack Bill Detection module
                    end to end with React and Node.js/Express, owning schema
                    design, REST endpoint authentication and deployment readiness.
                  </div>
                </div>

                <div className="exprnc-item">
                  <h3 className="title">Intern</h3>
                  <div className="company">
                    AJK Electricity Department, Muzaffarabad
                    <span className="date">Jul 2023 - Aug 2023</span>
                  </div>
                  <div className="desc">
                    At the AJK Electricity Department, I utilized Microsoft Excel for
                    data analysis and reporting tasks. I also prepared professional
                    office communications using Microsoft Word and created impactful
                    presentations with Microsoft PowerPoint to support departmental
                    initiatives and goals.
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div id="skills" className={paneClass("skills")}>
              <div className="about-skills">
                <h3>My Skills</h3>
                <p>
                  I specialize in full-stack web development using the MERN stack
                  (MongoDB, Express.js, React.js, Node.js), with TypeScript, Redux
                  and React Query in day-to-day use. I have a strong foundation in
                  HTML, CSS, Bootstrap and JavaScript, and I extend the same
                  React skills to mobile with React Native.
                </p>
                <div className="spacer5"></div>
                <div className="skills-grid">
                  {skills.map((skill) => (
                    <div className="progress" key={skill.label}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{
                          width: animateBars ? `${skill.value}%` : "0%",
                          transition: "width 1.2s ease",
                        }}
                        aria-valuenow={skill.value}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <span className="pb-label">{skill.label}</span>
                        <span className="pb-percent">{skill.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
