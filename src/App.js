// App.js
import React from "react";
import Galaxy from "./Galaxy";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Galaxy
          glowIntensity={0.25}
          density={0.4}
          saturation={0}
          hueShift={0}
          speed={0.7}
          mouseRepulsion={true}
          mouseInteraction={true}
          transparent={false}
        />
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Dashboard />
      </div>
    </>
  );
}

export default App;