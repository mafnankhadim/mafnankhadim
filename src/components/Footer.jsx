import { services, footerLinks, contactInfo } from "../data/content.js";

// Email and phone are the contactInfo entries that carry a link.
const quickContact = contactInfo.filter((item) => item.href);

export default function Footer() {
  return (
    <footer className="tcd-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="footer-logo">
              <img src="/images/logos/logo.webp" alt="Footer Logo" />
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="footer-widget">
              <h4 className="footer-title">My Services</h4>
              <ul className="footer-menu">
                {services.map((service) => (
                  <li key={service.title}>
                    <a href="#tcd-services">{service.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="footer-widget">
              <h4 className="footer-title">Find Me On</h4>
              <ul className="footer-menu">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 d-sm-block d-md-none d-lg-block">
            <div className="footer-widget">
              <h4 className="footer-title">Quick Contact</h4>
              <ul className="footer-menu">
                {quickContact.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
