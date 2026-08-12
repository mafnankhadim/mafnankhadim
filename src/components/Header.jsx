import { useEffect, useState } from "react";
import { navLinks, FIVERR_URL } from "../data/content.js";

// Smooth-scroll to a section id, accounting for the fixed header height.
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState(navLinks[0].target);

  // Sticky header + scroll-spy (which section is currently in view).
  useEffect(() => {
    const onScroll = () => {
      setSticky(window.scrollY > 0);

      const offset = window.scrollY + 80;
      let current = navLinks[0].target;
      for (const link of navLinks) {
        const el = document.getElementById(link.target);
        if (el && el.offsetTop <= offset) current = link.target;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Toggle the off-canvas mobile menu by mirroring the original body class.
  useEffect(() => {
    document.body.classList.toggle("nav-expanded", navOpen);
    return () => document.body.classList.remove("nav-expanded");
  }, [navOpen]);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setNavOpen(false);
    scrollToSection(target);
  };

  const renderMenu = () =>
    navLinks.map((link) => (
      <li key={link.target} className={active === link.target ? "active" : ""}>
        <a
          href={`#${link.target}`}
          onClick={(e) => handleNavClick(e, link.target)}
        >
          {link.label}
        </a>
      </li>
    ));

  return (
    <>
      <header
        id="tcd-header"
        className={`tcd-header tcd-header-1 menu-sticky${sticky ? " sticky" : ""}`}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-9">
              <div className="logo">
                <a
                  href="#tcd-banner"
                  onClick={(e) => handleNavClick(e, "tcd-banner")}
                >
                  <img src="/images/logos/logo.webp" alt="Logo" />
                </a>
              </div>
            </div>
            <div className="col-md-9 col-sm-3">
              <div className="mainmenu">
                <ul className="nav-menu">{renderMenu()}</ul>
                <div className="hire-me-btn">
                  <a
                    href={FIVERR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hire Me
                  </a>
                </div>
                <span>
                  <a
                    className="nav-expander fixed"
                    href="#"
                    id="nav-expander"
                    aria-label="Toggle navigation"
                    aria-expanded={navOpen}
                    onClick={(e) => {
                      e.preventDefault();
                      setNavOpen((v) => !v);
                    }}
                  >
                    <i className="fa fa-bars fa-lg white" aria-hidden="true"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile off-canvas menu */}
      <nav className="canvas-menu-area">
        <div className="close-btn">
          <span
            id="nav-close"
            className="text-center"
            onClick={() => setNavOpen(false)}
          >
            x
          </span>
        </div>
        <ul className="nav-menu">{renderMenu()}</ul>
      </nav>
    </>
  );
}
