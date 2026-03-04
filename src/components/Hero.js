import React from "react";
import "./Hero.css";

function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <p className="hero__greeting">Hi, my name is</p>
        <h1 className="hero__name">Your Name.</h1>
        <h2 className="hero__tagline">I build things for the web.</h2>
        <p className="hero__description">
          I'm a software developer passionate about creating beautiful,
          performant, and accessible web experiences. I specialize in building
          products that live at the intersection of design and engineering.
        </p>
        <div className="hero__actions">
          <button
            className="btn btn--primary"
            onClick={() => scrollTo("projects")}
          >
            View My Work
          </button>
          <button
            className="btn btn--outline"
            onClick={() => scrollTo("contact")}
          >
            Get In Touch
          </button>
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

export default Hero;
