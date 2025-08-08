import React from "react";
import Galaxy from "./Galaxy";
import BlurText from "./BlurText";
import "./App.css";

const aboutLines = [
  "3rd Year CS student at Trinity College Dublin",
  "AI and Full stack developer",
  "Proficient in Python and JavaScript",
];

const socials = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/krish-sood-3795282a5/",
  },
  {
    label: "GitHub",
    url: "https://github.com/Soodkr3",
  },
];

const handleAnimationComplete = () => {
  // optional
};

function App() {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "250vh", // enough to allow scroll for all sections
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Galaxy background */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "auto",
        }}
      >
        <Galaxy
          glowIntensity={0.1}
          density={0.4}
          saturation={0}
          hueShift={0}
          speed={0.7}
          mouseRepulsion={true}
          mouseInteraction={true}
          transparent={false}
        />
      </div>

      {/* Fixed top left name */}
      <div className="top-left-name">
        <BlurText
          text="Krish Sood"
          delay={80}
          animateBy="words"
          direction="top"
          className="top-left-hero"
        />
      </div>

      {/* Hero Section */}
      <section
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <BlurText
          text="Welcome to my Universe!"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="main-hero-text"
        />
      </section>

      {/* About Section */}
      <section
        style={{
          width: "100vw",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          marginTop: "15vh",
        }}
      >
        {aboutLines.map((line, idx) => (
          <BlurText
            key={idx}
            text={line}
            delay={120}
            animateBy="words"
            direction="top"
            className="about-blur-text"
            rootMargin="-30px"
            threshold={0.1}
          />
        ))}
        <div className="social-links-container" style={{ pointerEvents: "auto" }}>
          {socials.map((social, i) => (
            <a
              href={social.url}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              key={social.label}
              tabIndex={0}
              style={{ pointerEvents: "auto" }}
              onClick={e => {
                      // Remove focus so the button doesn't keep focus styling after click
              e.currentTarget.blur();
              }}
            >
              <BlurText
                text={social.label}
                delay={80}
                animateBy="words"
                direction="top"
                className="social-blur-text"
                rootMargin="-30px"
                threshold={0.1}
              />
            </a>
          ))}
        </div>
      </section>

      {/* Extra space for scrolling away */}
      <div style={{ height: "70vh" }}></div>
    </div>
  );
}

export default App;