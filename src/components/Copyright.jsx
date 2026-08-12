import { socialLinks } from "../data/content.js";
import SocialIcon from "./SocialIcon.jsx";

export default function Copyright() {
  return (
    <div className="tcd-copyright">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="copyright-text">
              <p>
                © {new Date().getFullYear()}{" "}
                <a href="#tcd-banner">M Afnan Khadim</a>. All Rights Reserved.
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
      </div>
    </div>
  );
}
