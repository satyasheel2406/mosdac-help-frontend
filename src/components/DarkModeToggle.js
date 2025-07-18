import React from 'react';

export default function DarkModeToggle({ isDark, toggleDark }) {
  return (
    <div className="toggle-wrapper">
      <button
        onClick={toggleDark}
        className="dark-toggle-btn"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? '🌞 Light' : '🌙 Dark'}
      </button>
    </div>
  );
}