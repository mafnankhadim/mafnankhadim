import { socialLinks } from "../data/content.js";

// Fixed vertical social rail pinned to the bottom-left of the viewport.
// Desktop only: the footer already lists the same links, so on narrow screens
// the rail is hidden rather than competing with the content.
export default function SocialBar() {
  return (
    <div className="social-bar" aria-label="Social links">
      <ul>
        {socialLinks.map((social) => (
          <li key={social.href}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
            >
              <i className={social.icon} aria-hidden="true"></i>
            </a>
          </li>
        ))}
      </ul>
      <span className="social-bar-line" aria-hidden="true"></span>
    </div>
  );
}
