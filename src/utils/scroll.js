// Smooth-scroll to a section id, offset to clear the fixed header.
// Shared by Header.jsx (nav + logo) and Banner.jsx (the "View My Work" CTA) so
// the two can't drift to different offsets.
export const HEADER_OFFSET = 70;

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
