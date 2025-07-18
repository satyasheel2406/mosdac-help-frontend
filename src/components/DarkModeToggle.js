// src/components/DarkModeToggle.jsx
import React from 'react';

export default function DarkModeToggle({ isDark, toggleDark }) {
  return (
    <button
      onClick={toggleDark}
      className="dark-toggle"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}