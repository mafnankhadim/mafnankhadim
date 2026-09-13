import {
  FIVERR_URL,
  contactInfo,
  footerLinks,
  navLinks,
  services,
  socialLinks,
} from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SocialIcon from "./SocialIcon.jsx";
import "../styles/footer.css";

// The email address lives in contactInfo as the one `mailto:` entry, so the CTA
// button never drifts from the address shown in the contact section.
const emailEntry = contactInfo.find((item) => item.href?.startsWith("mailto:"));

export default function Footer() {
  // Computed per render rather than baked in at build time.
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="container">
        <Reveal className="foot-cta">
          <div className="foot-cta__text">
            <h2 className="foot-cta__title">
              Have a project in <em>mind?</em>
            </h2>
            <p className="foot-cta__lead">
              I'm taking on new work — web apps, React front-ends and Android
              builds. Send the details and I'll come back with a plan.
            </p>
          </div>
          <div className="foot-cta__actions">
            <a
              className="btn btn--primary"
              href={FIVERR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-briefcase" aria-hidden="true"></i>
              Hire Me on Fiverr
            </a>
            {emailEntry && (
              <a className="btn btn--ghost" href={emailEntry.href}>
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                Email Me
              </a>
            )}
          </div>
        </Reveal>

        <div className="foot-cols">
          <div className="foot-brand">
            <img
              className="foot-logo"
              src="/images/logos/logo.webp"
              alt="M Afnan Khadim"
              width="150"
              height="40"
            />
            <p className="foot-blurb">
              MERN stack developer building production web applications and
              offline-first Android apps.
            </p>
          </div>

          <nav className="foot-col" aria-label="Footer navigation">
            <h3 className="foot-col__title">Navigate</h3>
            <ul className="foot-menu">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <a href={`#${link.target}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot-col">
            <h3 className="foot-col__title">Find Me On</h3>
            <ul className="foot-menu">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot-col">
            <h3 className="foot-col__title">Services</h3>
            <ul className="foot-menu">
              {services.map((service) => (
                <li key={service.title}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bar">
          <p className="foot-copy">
            &copy; {year} M Afnan Khadim. All rights reserved.
          </p>
          <ul className="foot-social">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <SocialIcon social={social} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
