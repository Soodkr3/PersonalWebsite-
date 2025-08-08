import React from "react";
export default function Projects({ onBack }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"
    }}>
      <h2 style={{ color: "rgba(255,255,255,0.93)" }}>Projects</h2>
      <ul style={{ color: "rgba(255,255,255,0.81)", fontSize: "1.2rem", listStyle: "none", padding: 0 }}>
        <li><a href="https://github.com/Soodkr3/Project1" target="_blank" rel="noopener noreferrer" style={{ color: "#b3e5fc", textDecoration: "underline" }}>Project 1</a></li>
        <li><a href="https://github.com/Soodkr3/Project2" target="_blank" rel="noopener noreferrer" style={{ color: "#b3e5fc", textDecoration: "underline" }}>Project 2</a></li>
        {/* Add more projects here */}
      </ul>
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