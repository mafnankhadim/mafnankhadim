import { socialLinks } from "../data/content.js";

export default function Copyright() {
  return (
    <div className="tcd-copyright">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="copyright-text">
              <p>
                © 2025 <a href="#tcd-banner">M Afnan Khadim</a>. All Rights
                Reserved.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <ul className="footer-share">
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={social.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
