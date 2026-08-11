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
            I'm M. Afnan Khadim, a Frontend Developer with hands-on experience in
            React.js, Node.js, and MongoDB. I enjoy building clean, responsive web
            applications and have worked on real-world projects like dashboards and
            educational platforms. I'm passionate about learning new technologies
            and contributing to impactful digital solutions.
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
                  I've 2+ Years Professional Experience on Web Development (HTML,
                  CSS, Bootstrap, JavaScript, React.js, Node.js, Express.js,
                  MongoDB, MERN Stack)
                </p>
                <p>
                  I'm M. Afnan Khadim, a passionate MERN Stack web developer from
                  Lahore, Pakistan, with a strong foundation in frontend and
                  full-stack development. I hold a Bachelor's degree in Computer
                  Science from Mirpur University of Science and Technology and
                  currently work as a Web Developer at the Power Information
                  Technology Company. With expertise in MongoDB, Express.js, React,
                  and Node.js, I build full-stack solutions that deliver seamless
                  user experiences and robust functionality. I am committed to
                  continuously learning and staying up to date with the latest
                  technologies and best practices in the industry.
                </p>
                <p>
                  I have developed a POS system for multiple stores to manage
                  products efficiently, as well as a quiz preparation web app aimed
                  at helping users improve their knowledge. I've built and deployed
                  several real-world projects and am dedicated to creating
                  efficient, user-friendly digital solutions while bringing
                  innovative ideas to life through efficient code and beautiful UI
                  designs that exceed client expectations.
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
                  <h3 className="title">Web Developer</h3>
                  <div className="company">
                    Power Information Technology Company, Lahore, Pakistan
                    <span className="date">2023 - Present</span>
                  </div>
                  <div className="desc">
                    Currently working as a MERN Stack Web Developer, responsible for
                    designing and developing dynamic, responsive, and user-friendly
                    web applications. I create full-stack solutions using MongoDB,
                    Express.js, React.js, and Node.js. My work includes developing
                    scalable applications like POS systems for multi-store product
                    management and educational platforms like quiz preparation apps.
                    I collaborate closely with teams to ensure all solutions align
                    with client requirements and are delivered with robust
                    functionality and beautiful UI/UX.
                  </div>
                </div>

                <div className="exprnc-item">
                  <h3 className="title">Intern</h3>
                  <div className="company">
                    AJK Electricity Department, Muzaffarabad
                    <span className="date">Jul 2023 – Aug 2023</span>
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
                  (MongoDB, Express.js, React.js, Node.js). I have a strong
                  foundation in HTML, CSS, Bootstrap, and JavaScript, and I'm
                  experienced in building responsive, scalable web applications that
                  deliver excellent user experiences.
                </p>
                <div className="spacer5"></div>
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
        </Reveal>
      </div>
    </section>
  );
}
