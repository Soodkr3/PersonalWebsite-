import React from "react";
import Galaxy from "./Galaxy";
import BlurText from "./BlurText";
import ProfileCard from "./ProfileCard";
import MagicBento from "./MagicBento";
import TargetCursor from "./TargetCursor";
import "./App.css";

// ── Personal details ───────────────────────────────────────────────────────
const MOBILE_NUMBER = "+1234567890"; // ← replace with your real number
const EMAIL_ADDRESS = "youremail@example.com"; // ← replace with your real email

const socials = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/krish-sood/", type: "link" },
  { label: "GitHub", url: "https://github.com/Soodkr3", type: "link" },
  { label: "Email", url: `mailto:${EMAIL_ADDRESS}`, type: "email" },
];

// ── Handlers ───────────────────────────────────────────────────────────────
const handleContactClick = () => {
  const copy = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => alert("Mobile number copied."));
    } else {
      const inp = document.createElement("input");
      inp.value = text;
      document.body.appendChild(inp);
      inp.select();
      document.execCommand("copy");
      document.body.removeChild(inp);
      alert("Mobile number copied.");
    }
  };
  copy(MOBILE_NUMBER);
};

// Social button styles (defined once to avoid repetition)
const socialBtnStyle = {
  pointerEvents: "auto",
  cursor: "pointer",
  border: "none",
  outline: "none",
  background: "rgba(20,24,40,0.40)",
  color: "#b3e5fc",
  fontWeight: 600,
  fontSize: "1.12rem",
  borderRadius: "1.4rem",
  padding: "0.22rem 1.33rem",
  transition: "background 0.14s, box-shadow 0.14s, transform 0.13s",
  boxShadow: "0 2px 16px 0 rgba(0,0,0,0.09)",
  fontFamily: "'Plus Jakarta Sans', 'Inter', Arial, sans-serif",
  textDecoration: "none",
  display: "inline-block",
};

// ── App ────────────────────────────────────────────────────────────────────
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
      {/* Custom animated cursor (desktop only) */}
      <TargetCursor targetSelector=".cursor-target" spinDuration={2} hideDefaultCursor={true} />

      {/* Galaxy background — fixed, full viewport */}
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

      {/* Fixed top-left name */}
      <div className="top-left-name">
        <BlurText
          text="krish sood"
          delay={80}
          animateBy="words"
          direction="top"
          className="top-left-hero"
        />
      </div>

      {/* ── Hero section ─────────────────────────────────────────────── */}
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
          className="main-hero-text"
        />
      </section>

      {/* ── Profile card + social links ───────────────────────────────── */}
      <section className="profile-about-section">
        <div className="profile-card-container">
          <ProfileCard
            avatarUrl="https://ik.imagekit.io/krishsood/photoNoBG_2.png?updatedAt=1754675208255"
            miniAvatarUrl="https://ik.imagekit.io/krishsood/photoNoBG_2.png?updatedAt=1754675208255"
            name="Krish Sood"
            title="CS Student • AI & Full Stack Dev"
            handle="Soodkr3"
            status="Online"
            contactText="Contact"
            showUserInfo={true}
            onContactClick={handleContactClick}
          />
        </div>

        <div className="about-description-container">
          <div
            className="social-links-container"
            style={{ pointerEvents: "auto" }}
          >
            {socials.map((social) =>
              social.type === "email" ? (
                <a
                  key={social.label}
                  className="social-link cursor-target"
                  href={social.url}
                  style={socialBtnStyle}
                  tabIndex={0}
                  onMouseUp={(e) => e.currentTarget.blur()}
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
                  type="button"
                  tabIndex={0}
                  onClick={() => window.open(social.url, "_blank", "noopener,noreferrer")}
                  style={socialBtnStyle}
                  onMouseUp={(e) => e.currentTarget.blur()}
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

      {/* ── "Info" heading ────────────────────────────────────────────── */}
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

      {/* ── MagicBento card grid ──────────────────────────────────────── */}
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

      {/* Bottom spacer */}
      <div style={{ height: "70vh" }} />
    </div>
  );
}

export default App;
