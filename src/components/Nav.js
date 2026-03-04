import React, { useState, useEffect } from "react";
import "./Nav.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <a
        href="#hero"
        className="nav__logo"
        onClick={(e) => scrollTo(e, "#hero")}
      >
        YN
      </a>

      <ul className={`nav__links${menuOpen ? " nav__links--open" : ""}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} onClick={(e) => scrollTo(e, href)}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={`nav__burger${menuOpen ? " nav__burger--open" : ""}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Nav;
