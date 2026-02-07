import React from 'react';

const particles = new Array(12).fill(0).map((_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 6 + Math.round(Math.random() * 28),
  delay: `${Math.random() * 4}s`,
  duration: 6 + Math.round(Math.random() * 8),
}));

const ParticleOverlay: React.FC = () => {
  return (
    <div className="particle-layer">
      {particles.map((p, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleOverlay;
