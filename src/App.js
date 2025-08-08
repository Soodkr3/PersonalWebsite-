import React from "react";
import Galaxy from "./Galaxy";
import BlurText from "./BlurText";
import ProfileCard from "./ProfileCard";
import "./App.css";
import MagicBento from "./MagicBento";

const aboutLines = [
  "3rd Year CS student at Trinity College Dublin",
  "AI and Full stack developer",
  "Proficient in Python and JavaScript",
];

const socials = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/krish-sood/",
  },
  {
    label: "GitHub",
    url: "https://github.com/Soodkr3",
  },
];

const experiences = [
  {
    title: "AI Developer Intern — XYZ Startup",
    period: "June 2024 – Aug 2024",
    desc: "Built and deployed computer vision models for real-time object detection in Python (PyTorch, OpenCV).",
  },
  {
    title: "Full Stack Developer — College Society",
    period: "Sept 2023 – Present",
    desc: "Developed and maintained a React/Node.js web app for event management used by 200+ students.",
  },
  {
    title: "Research Assistant — TCD",
    period: "May 2023 – Aug 2023",
    desc: "Assisted in NLP research, working on transformer models and dataset preprocessing.",
  },
];

const handleAnimationComplete = () => {};

function App() {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "350vh",
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
          text="krish sood"
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

      {/* Profile + About Section Side-by-Side */}
      <section className="profile-about-section">
        <div className="profile-card-container">
          <ProfileCard
            avatarUrl="https://ik.imagekit.io/krishsood/photoNoBG_2.png?updatedAt=1754675208255"
            name="Krish Sood"
            title="CS Student • AI & Full Stack Dev"
            handle="Soodkr3"
            status="Online"
            miniAvatarUrl="https://ik.imagekit.io/krishsood/photoNoBG_2.png?updatedAt=1754675208255"
            contactText="Contact"
            showUserInfo={true}
            onContactClick={() => console.log('Contact clicked')}
          />
        </div>
        <div className="about-description-container">
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
                onClick={e => { e.currentTarget.blur(); }}
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
        </div>
      </section>

      {/* Experience Heading */}
      <section
        style={{
          width: "100vw",
          minHeight: "30vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          pointerEvents: "none",
          marginTop: "15vh",
        }}
      >
        <BlurText
          text="Info"
          delay={80}
          animateBy="words"
          direction="top"
          className="experience-heading"
          rootMargin="-20px"
          threshold={0.15}
        />
      </section>

      {/* Experience Bento Glass Grid */}
      <section
        style={{
          width: "100vw",
          minHeight: "45vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          pointerEvents: "auto",
          marginTop: "2vh",
        }}
      >
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </section>

      {/* Extra space for scrolling away */}
      <div style={{ height: "70vh" }}></div>
    </div>
  );
}

export default App;