import React from 'react';

const Hero = () => {
  return (
    <div className="hero-sky-wrapper">
      <div className="night-sky">
        <div className="moon"></div>
        <div className="stars">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}></div>
          ))}
        </div>

        {/* Floating Creative Texts in the Sky */}
        <div className="scroll-hint-box">
  🌌 Scroll down to explore the cosmos...
</div>
<div className="scroll-arrow">
  <span></span>
</div>
        <div className="scroll-arrow">
  <span></span>
</div>
        <div className="floating-sky-text sky-text-1">✨ Explore the Unknown</div>
        <div className="floating-sky-text sky-text-2">🚀 Powered by Space Tech</div>
        <div className="floating-sky-text sky-text-3">🛰️ MOSDAC Universe Awaits</div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">MOSDAC AI Help Bot</h1>
        <p className="hero-tagline">WELCOME ASTRONAUTS 👨‍🚀</p>
       
      </div>
    </div>
  );
};

export default Hero;