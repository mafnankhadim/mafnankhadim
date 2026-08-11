import { contactInfo } from "../data/content.js";
import Reveal from "./Reveal.jsx";

export default function ContactInfo() {
  return (
    <section
      id="tcd-contact"
      className="tcd-contact-info sec-spacer bg-light-gray"
    >
      <div className="container">
        <div className="row">
          {contactInfo.map((item, i) => (
            <Reveal
              as="div"
              className="col-lg-4 col-md-4"
              key={item.title}
              delay={i * 120}
            >
              <div className="contact-info-item">
                <div className="icon-bar">
                  <i className={item.icon} aria-hidden="true"></i>
                </div>
                <div className="info-details">
                  <h5>{item.title}</h5>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
