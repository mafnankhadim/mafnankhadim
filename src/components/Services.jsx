import { services } from "../data/content.js";
import Reveal from "./Reveal.jsx";

export default function Services() {
  return (
    <section
      id="tcd-services"
      className="tcd-services bg-p3 bg-light-gray sec-spacer"
    >
      <div className="container">
        <div className="row">
          {services.map((service, i) => (
            <Reveal
              as="div"
              className="col-lg-4 col-md-6"
              key={service.title}
              delay={i * 120}
            >
              <div className="service-item">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <div className="service-content">
                  <h4 className="title">{service.title}</h4>
                  <p className="description">{service.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
