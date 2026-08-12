// One glyph for a `socialLinks` entry: a Font Awesome class where the icon
// font has the brand, an inline SVG where it doesn't (see content.js).
// Shared by the fixed social rail and the footer strip so both stay in sync.
//
// The viewBox crops the 24x24 source to the wordmark's ink box (y 8.412 ->
// 15.588) so the mark fills the space instead of floating in empty padding;
// .social-svg sizes it to that 24:7.176 aspect.
export default function SocialIcon({ social }) {
  if (social.svgPath) {
    return (
      <svg
        className="social-svg"
        viewBox="0 8.412 24 7.176"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d={social.svgPath} />
      </svg>
    );
  }

  return <i className={social.icon} aria-hidden="true"></i>;
}
