import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import ChatWindow from "./ChatWindow";
import DarkModeToggle from "./DarkModeToggle";
import "../index.css";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
  }, [isDark]);

  return (
    <div className={`app-wrapper ${isDark ? "dark" : ""}`}>
      <header className="app-header">
        <DarkModeToggle isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      </header>

      <main className="main-content">
        <Hero />
        <ChatWindow />
      </main>
    </div>
  );
}