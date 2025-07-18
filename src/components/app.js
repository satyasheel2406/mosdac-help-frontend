import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import ChatWindow from "./ChatWindow";
import DarkModeToggle from "./DarkModeToggle";
import logo from "../assets/logo.png"; // ✅ your logo file
import "../index.css";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
  }, [isDark]);
  useEffect(() => {
  window.scrollTo(0, 0); // This forces page to load at top
}, []);

  return (
    <div className={`app-wrapper ${isDark ? "dark" : ""}`}>
      <header className="app-header">
           <div className="header-logo-wrapper">
          <img src={logo} alt="Team Logo" className="team-logo" />
        </div>
        <DarkModeToggle isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      </header>

      <main className="main-content">
        <Hero />
        <ChatWindow />
      </main>
    </div>
  );
}