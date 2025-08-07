import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={handleSidebarClose}
      ></div>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>My Dashboard</h2>
        <nav>
          <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </nav>
      </aside>
      <div className="main-content">
        <header className="topbar">
          <button
            className="hamburger-btn"
            onClick={handleSidebarToggle}
            aria-label="Open Sidebar"
          >
            <span className="hamburger-icon"></span>
          </button>
          
        </header>
        <section className="content">
          
        </section>
      </div>
    </div>
  );
}

export default Dashboard;