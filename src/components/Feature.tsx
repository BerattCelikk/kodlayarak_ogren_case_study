import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

const Feature: React.FC<{title: string; description: string; image?: string; index: number; total: number; brandColor?: string; duration?: number}> = ({title, description, image, index, total, duration = 220}) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 20, 40], [0, 0.8, 1]);
  const fadeOut = interpolate(frame, [Math.max(0, duration - 40), Math.max(0, duration - 20), duration], [1, 0.6, 0]);
  const opacity = Math.min(fade, fadeOut);
  const translateY = interpolate(frame, [0, 30], [26, 0]);
  const scale = interpolate(frame, [0, duration], [1.02, 1]);
  const parallax = Math.sin(index * 0.6 + frame / 20) * 6;

  const left = index % 2 === 0;

  return (
    <div className="feature-row" style={{opacity}}>
      <div className="feature-card" style={{transform: `translateY(${translateY}px)`}}>
        {left && (
          <img
            src={image}
            alt={title}
            className="feature-image"
            style={{transform: `translateX(${parallax}px) scale(${scale})`}}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/1200/800';
            }}
          />
        )}

        <div className="feature-text">
          <div style={{fontSize: 14, color: 'var(--muted)', marginBottom: 8}}>Feature {index + 1} / {total}</div>
          <h3>{title}</h3>
          <p>{description}</p>
          <div style={{marginTop: 18}}>
            <button className="btn">Learn More</button>
          </div>
        </div>

        {!left && (
          <img
            src={image}
            alt={title}
            className="feature-image"
            style={{transform: `translateX(${parallax * -1}px) scale(${scale})`}}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/1200/800';
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Feature;
