import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Grainient from "./Grainient";
import BlurText from "./BlurText";
import TargetCursor from "./TargetCursor";
import "./App.css";

const EMAIL_ADDRESS = "krishsood03@gmail.com";

const experiences = [
  {
    role: "Junior Analyst",
    org: "Trinity Student Managed Fund",
    type: "Part-time",
    period: "Oct 2025 – Present",
    location: "Dublin, Ireland",
    url: "https://www.linkedin.com/company/trinity-smf/posts/?feedView=all",
  },
  {
    role: "Mentor",
    org: "S2S, Trinity College Dublin",
    type: "Part-time",
    period: "Sep 2024 – Present",
    location: "Dublin, Ireland",
    desc: "Managed a group of 15 mentees, providing guidance and serving as a role model.",
    url: "https://www.tcd.ie/student2student/",
  },
  {
    role: "Intern",
    org: "Magic EdTech",
    type: "Internship",
    period: "Jul 2024 – Aug 2024",
    location: "Noida, India",
    desc: "Implemented web scraping solutions for data extraction and built REST APIs & automation scripts to streamline processes.",
    tags: ["Python", "Spring Boot", "Beautiful Soup"],
    url: "https://www.magicedtech.com/",
  },
];

const projects = [
  {
    title: "Natural Language Searching",
    period: "Jan 2025 – Apr 2025",
    desc: "Collaborative project with Propylon — built a legal document search platform using NLP and Named Entity Recognition to interpret queries and retrieve relevant legislative bills.",
    tags: ["Python", "Django", "React", "OpenSearch"],
    url: "https://github.com/Soodkr3",
  },
  {
    title: "Volume Gesture Control",
    period: "Jan 2025",
    desc: "Real-time system that adjusts audio volume via hand gestures captured through a webcam, using computer vision and ML for hand landmark detection.",
    tags: ["Python", "OpenCV", "MediaPipe"],
    url: "https://github.com/Soodkr3/Volume-Gesture-Control",
  },
  {
    title: "Sentiment Analysis",
    period: "Dec 2024",
    desc: "Full-stack ML app that classifies sentiment of text inputs using a Naive Bayes model trained on IMDb data.",
    tags: ["Python", "React", "NLP"],
    url: "https://github.com/Soodkr3/Sentiment-Analysis",
  },
  {
    title: "Landsat — NASA Hackathon",
    period: "Sep – Oct 2024",
    desc: "2nd place at NASA Space Apps Hackathon. Satellite tracking platform for real-time NDVI monitoring with historical trend analysis and environmental metadata.",
    tags: ["Python", "React", "Google Earth Engine"],
    url: "https://github.com/ishaanJ91/landsat",
  },
];

// Scroll-triggered fade-up wrapper
const FadeUp = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1, rootMargin: "-20px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={`app-root ${loaded ? "app-root--loaded" : ""}`}>
      <TargetCursor
        targetSelector="a, button, .cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
      />

      {/* Fixed Grainient background */}
      <div className="grainient-bg">
        <Grainient
          color1="#ff9ec5"
          color2="#5227FF"
          color3="#B19EEF"
          timeSpeed={0.15}
          colorBalance={0}
          warpStrength={0.25}
          warpFrequency={2}
          warpSpeed={0.5}
          warpAmplitude={8}
          blendAngle={0}
          blendSoftness={0.5}
          rotationAmount={30}
          noiseScale={1.5}
          grainAmount={0.08}
          grainScale={2}
          grainAnimated={false}
          contrast={1.15}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Frosted glass navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <span className="navbar-brand" onClick={() => scrollToSection("hero")}>
            Krish Sood
          </span>

          {/* Desktop links */}
          <div className="navbar-links navbar-links--desktop">
            <button className="nav-link cursor-target" onClick={() => scrollToSection("about")}>About</button>
            <button className="nav-link cursor-target" onClick={() => scrollToSection("experience")}>Experience</button>
            <button className="nav-link cursor-target" onClick={() => scrollToSection("projects")}>Projects</button>
            <a className="nav-link cursor-target" href={`mailto:${EMAIL_ADDRESS}`}>Contact</a>
            <a className="nav-link nav-link--resume cursor-target" href="/Krish Sood Dublin.pdf" download="Krish_Sood_Resume.pdf">Resume</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`hamburger cursor-target ${menuOpen ? "hamburger--open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <button className="mobile-menu-link cursor-target" onClick={() => scrollToSection("about")}>About</button>
              <button className="mobile-menu-link cursor-target" onClick={() => scrollToSection("experience")}>Experience</button>
              <button className="mobile-menu-link cursor-target" onClick={() => scrollToSection("projects")}>Projects</button>
              <a className="mobile-menu-link cursor-target" href={`mailto:${EMAIL_ADDRESS}`} onClick={() => setMenuOpen(false)}>Contact</a>
              <a className="mobile-menu-link cursor-target" href="/Krish Sood Dublin.pdf" download="Krish_Sood_Resume.pdf" onClick={() => setMenuOpen(false)}>Resume</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <BlurText
            text="Welcome."
            delay={120}
            animateBy="words"
            direction="top"
            className="hero-subtitle"
          />
          <BlurText
            text="AI, Full Stack & everything in between."
            delay={180}
            animateBy="words"
            direction="top"
            className="hero-tagline"
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="content-section">
        <BlurText
          text="About"
          delay={80}
          animateBy="words"
          direction="top"
          className="section-heading"
          rootMargin="-40px"
          threshold={0.15}
        />
        <FadeUp>
          <div className="glass-card about-card">
            <p className="about-text">
              I'm a Computer Science student at Trinity College Dublin with a strong interest in AI and full-stack development. I enjoy building end-to-end solutions — from training ML models to crafting clean frontends and robust APIs.
            </p>
            <div className="tech-tags">
              {["Python", "Java", "JavaScript", "React", "Django", "Spring Boot", "SQL"].map((t) => (
                <span className="tech-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      <div className="section-divider" />

      {/* Experience */}
      <section id="experience" className="content-section">
        <BlurText
          text="Experience"
          delay={80}
          animateBy="words"
          direction="top"
          className="section-heading"
          rootMargin="-40px"
          threshold={0.15}
        />
        <div className="cards-list">
          {experiences.map((exp, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <a
                className="glass-card glass-card--link cursor-target"
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="card-top-row">
                  <span className="card-role">{exp.role}</span>
                  <span className="card-period">{exp.period}</span>
                </div>
                <div className="card-org">{exp.org} · {exp.type}</div>
                <div className="card-location">{exp.location}</div>
                {exp.desc && <div className="card-desc">{exp.desc}</div>}
                {exp.tags && (
                  <div className="tech-tags">
                    {exp.tags.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
                  </div>
                )}
              </a>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Projects */}
      <section id="projects" className="content-section">
        <BlurText
          text="Projects"
          delay={80}
          animateBy="words"
          direction="top"
          className="section-heading"
          rootMargin="-40px"
          threshold={0.15}
        />
        <div className="cards-list">
          {projects.map((proj, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <a
                className="glass-card glass-card--link cursor-target"
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="card-top-row">
                  <span className="card-role">{proj.title}</span>
                  <span className="card-period">{proj.period}</span>
                </div>
                <div className="card-desc">{proj.desc}</div>
                {proj.tags && (
                  <div className="tech-tags">
                    {proj.tags.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
                  </div>
                )}
                <span className="card-link-hint">View on GitHub →</span>
              </a>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Education */}
      <section id="education" className="content-section">
        <BlurText
          text="Education"
          delay={80}
          animateBy="words"
          direction="top"
          className="section-heading"
          rootMargin="-40px"
          threshold={0.15}
        />
        <div className="cards-list">
          <FadeUp>
            <a
              className="glass-card glass-card--link cursor-target"
              href="https://www.tcd.ie/scss/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="card-top-row">
                <span className="card-role">Trinity College Dublin</span>
                <span className="card-period">Sep 2023 – Present</span>
              </div>
              <div className="card-org">Bachelor of Arts — Computer Science</div>
              <div className="card-desc">4.0 GPA · First Class Honours · Book Prize recipient</div>
            </a>
          </FadeUp>
          <FadeUp delay={0.1}>
            <a
              className="glass-card glass-card--link cursor-target"
              href="https://www.gyanbharatischool.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="card-top-row">
                <span className="card-role">Gyan Bharati School, Delhi</span>
                <span className="card-period">Apr 2010 – Apr 2023</span>
              </div>
              <div className="card-org">High School Diploma — PCM Stream</div>
              <div className="card-desc">Boards: 94.8% overall</div>
            </a>
          </FadeUp>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a className="cursor-target" href="https://www.linkedin.com/in/krish-sood-3795282a5/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="cursor-target" href="https://github.com/Soodkr3" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="cursor-target" href={`mailto:${EMAIL_ADDRESS}`}>Email</a>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Krish Sood</p>
      </footer>
    </div>
  );
}

export default App;
