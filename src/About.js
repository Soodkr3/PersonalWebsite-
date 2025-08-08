import React from "react";
export default function About({ onBack }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"
    }}>
      <h2 style={{ color: "rgba(255,255,255,0.93)" }}>About Me</h2>
      <p style={{ color: "rgba(255,255,255,0.81)", fontSize: "1.15rem", maxWidth: 500 }}>
        {/* Your about text here */}
        Hi! I'm Soodkr3, a passionate developer fascinated by beautiful UIs and interactive web experiences.
      </p>
      <button onClick={onBack} style={{
        marginTop: "2.5rem",
        background: "rgba(255,255,255,0.10)",
        color: "rgba(255,255,255,0.80)",
        border: "none",
        borderRadius: "1.5rem",
        padding: "0.9rem 2.2rem",
        fontSize: "1.1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s"
      }}>Back</button>
    </div>
  );
}