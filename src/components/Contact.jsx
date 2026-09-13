import { useEffect, useRef, useState } from "react";
import {
  WEB3FORMS_ACCESS_KEY,
  contactInfo,
  socialLinks,
} from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SocialIcon from "./SocialIcon.jsx";
import "../styles/contact.css";

// Web3Forms endpoint. The access key is public by design — it only allows
// posting to this form's own inbox.
const ENDPOINT = "https://api.web3forms.com/submit";

// The subject line that lands in the inbox. It is carried by a *hidden* input
// named `subject`; the visible subject field is deliberately named
// `user_subject` so a visitor's text is appended to the payload instead of
// overwriting this one.
const MAIL_SUBJECT = "New Contact Request from Portfolio";

export default function Contact() {
  const [status, setStatus] = useState(null); // { message, ok }
  const [submitting, setSubmitting] = useState(false);
  const timer = useRef(0);

  // The status auto-clears after 5s; drop the pending timer on unmount so it
  // cannot fire a setState into a dead component.
  useEffect(() => () => clearTimeout(timer.current), []);

  const flash = (message, ok) => {
    setStatus({ message, ok });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        form.reset();
        flash("Message sent successfully! I'll reply soon.", true);
      } else {
        flash("Something went wrong. Please try again.", false);
      }
    } catch {
      flash("Network error. Please try again.", false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section section--glow">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">
            Let's build something <em>together</em>
          </h2>
          <p className="section-sub">
            Have a project, a role, or just a question? Send a message and I'll
            get back to you — usually within a day.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-aside" direction="right">
            <h3 className="contact-pitch-title">Open to new work</h3>
            <p className="contact-pitch">
              I take on MERN stack builds, React front-ends and Android apps —
              from a single feature to a full product. Tell me what you're
              making and I'll tell you honestly how I'd approach it.
            </p>

            <ul className="contact-rows">
              {contactInfo.map((item) => (
                <li className="contact-row" key={item.title}>
                  <span className="contact-row__badge" aria-hidden="true">
                    <i className={item.icon}></i>
                  </span>
                  <span className="contact-row__body">
                    <span className="contact-row__label">{item.title}</span>
                    {item.href ? (
                      <a
                        className="contact-row__value"
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-row__value">{item.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="contact-social">
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
          </Reveal>

          <Reveal className="contact-form-wrap" direction="left" delay={120}>
            <form className="card contact-form" onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="access_key"
                value={WEB3FORMS_ACCESS_KEY}
              />
              <input type="hidden" name="subject" value={MAIL_SUBJECT} />

              <div className="contact-fields">
                <div className="contact-field">
                  <label className="sr-only" htmlFor="contact-name">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Name*"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label className="sr-only" htmlFor="contact-email">
                    Your email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Email*"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="contact-field contact-field--full">
                  <label className="sr-only" htmlFor="contact-subject">
                    Subject
                  </label>
                  {/* Named `user_subject`, never `subject` — see MAIL_SUBJECT. */}
                  <input
                    id="contact-subject"
                    type="text"
                    name="user_subject"
                    placeholder="Subject"
                  />
                </div>

                <div className="contact-field contact-field--full">
                  <label className="sr-only" htmlFor="contact-message">
                    Your message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="6"
                    placeholder="Message*"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="contact-actions">
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={submitting}
                >
                  <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                  {submitting ? "Sending..." : "Send Message"}
                </button>
                <p className="contact-note">
                  Required fields are marked with an asterisk.
                </p>
              </div>

              <p
                className={`contact-status${
                  status ? (status.ok ? " is-ok" : " is-error") : ""
                }`}
                role="status"
                aria-live="polite"
              >
                {status ? status.message : ""}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
