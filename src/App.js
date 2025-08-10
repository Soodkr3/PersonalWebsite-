import React from "react";
import Galaxy from "./Galaxy";
import BlurText from "./BlurText";
import ProfileCard from "./ProfileCard";
import "./App.css";
import MagicBento from "./MagicBento";
import TargetCursor from "./TargetCursor";

// Set your details here:
const MOBILE_NUMBER = "+1234567890"; // <-- Replace with your real number!
const EMAIL_ADDRESS = "youremail@example.com"; // <-- Replace with your real email!

const socials = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/krish-sood/",
    type: "link"
  },
  {
    label: "GitHub",
    url: "https://github.com/Soodkr3",
    type: "link"
  },
  {
    label: "Email",
    url: `mailto:${EMAIL_ADDRESS}`,
    type: "email"
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

const handleContactClick = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(MOBILE_NUMBER).then(() => {
      alert("Mobile number copied.");
    });
  } else {
    // fallback
    const tempInput = document.createElement("input");
    tempInput.value = MOBILE_NUMBER;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Mobile number copied.");
  }
};

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
      {/* Custom animated cursor */}
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
      />

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
            onContactClick={handleContactClick}
          />
        </div>
        <div className="about-description-container">
          {/* Social buttons */}
          <div className="social-links-container" style={{ pointerEvents: "auto" }}>
            {socials.map((social) =>
              social.type === "email" ? (
                <a
                  key={social.label}
                  className="social-link cursor-target"
                  href={social.url}
                  style={{
                    pointerEvents: "auto",
                    cursor: "pointer",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    outline: "none",
                    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(51, 65, 85, 0.4) 100%)",
                    color: "#e2e8f0",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    borderRadius: "1.6rem",
                    padding: "0.4rem 1.6rem",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(255, 255, 255, 0.05) inset, 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                    fontFamily: "'Plus Jakarta Sans', 'Inter', Arial, sans-serif",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  tabIndex={0}
                  onMouseUp={e => e.currentTarget.blur()}
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
              ) : (
                <button
                  key={social.label}
                  className="social-link cursor-target"
                  tabIndex={0}
                  type="button"
                  onClick={() => window.open(social.url, "_blank", "noopener,noreferrer")}
                  style={{
                    pointerEvents: "auto",
                    cursor: "pointer",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    outline: "none",
                    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(51, 65, 85, 0.4) 100%)",
                    color: "#e2e8f0",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    borderRadius: "1.6rem",
                    padding: "0.4rem 1.6rem",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(255, 255, 255, 0.05) inset, 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                    fontFamily: "'Plus Jakarta Sans', 'Inter', Arial, sans-serif",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseUp={e => e.currentTarget.blur()}
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
                </button>
              )
            )}
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