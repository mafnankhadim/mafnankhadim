import { useState } from "react";
import { WEB3FORMS_ACCESS_KEY } from "../data/content.js";
import Reveal from "./Reveal.jsx";

export default function ContactForm() {
  const [status, setStatus] = useState(null); // { message, color }
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        form.reset();
        setStatus({ message: "Message sent successfully!", color: "green" });
      } else {
        setStatus({
          message: "Something went wrong. Please try again.",
          color: "red",
        });
      }
    } catch {
      setStatus({ message: "Network error. Please try again.", color: "red" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section className="tcd-contact-form sec-spacer bg-p">
      <div className="container">
        <Reveal className="tcd-title tcd-title-center mb50">
          <h2>
            Contact With <span>Me!</span>
          </h2>
          <p>
            I'm always excited to connect and collaborate on new projects or
            discuss opportunities. Whether you have a question, want to work
            together, or just want to say hi, feel free to reach out using the form
            below. I'll get back to you as soon as possible!
          </p>
        </Reveal>
        <Reveal className="contact-form right-side" delay={120}>
          <form id="contactForm" onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input
              type="hidden"
              name="subject"
              value="New Contact Request from Portfolio"
            />

            <div className="row">
              <div className="col-md-6">
                <div className="form-field">
                  <input type="text" placeholder="Name*" required name="name" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-field">
                  <input
                    type="email"
                    placeholder="Email*"
                    name="email"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Subject"
                    name="user_subject"
                  />
                </div>
              </div>
            </div>

            <div className="form-field">
              <textarea
                rows="7"
                placeholder="Message*"
                name="message"
                required
              ></textarea>
            </div>

            {status && (
              <div style={{ marginBottom: "10px", textAlign: "center" }}>
                <div style={{ color: status.color }}>{status.message}</div>
              </div>
            )}

            <div className="form-button">
              <button type="submit" className="readon" disabled={submitting}>
                {submitting ? "SENDING..." : "SUBMIT NOW"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
