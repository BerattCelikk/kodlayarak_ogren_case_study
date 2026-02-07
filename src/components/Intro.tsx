import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import logo from '../assets/logo.svg';

const Intro: React.FC<{data: any}> = ({data}) => {
  const frame = useCurrentFrame();
  const springVal = spring({frame, fps: 30, config: {damping: 200}});
  const scale = interpolate(springVal, [0, 1], [0.96, 1]);
  const opacity = interpolate(springVal, [0, 0.6, 1], [0, 0.9, 1]);

  const brand = data.brandColor || '#06b6d4';

  return (
    <div className="intro-wrap animated-bg">
      <div className="intro-card" style={{transform: `scale(${scale})`, opacity}}>
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', left: 18, top: 18, display: 'flex', alignItems: 'center', gap: 10}}>
            <img src={logo} alt="logo" style={{width: 48, height: 48, borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.4)'}} />
            <div style={{fontSize: 14, color: 'var(--muted)', fontWeight: 600}}>{data.brandName}</div>
          </div>

          <div style={{position: 'absolute', left: -80, top: -40}} className="floating-dot float-1" />
          <div style={{position: 'absolute', right: -60, top: 10}} className="floating-dot float-2" />
          <div style={{position: 'absolute', right: 80, bottom: -30}} className="floating-dot float-3" />
          <h1 className="intro-title">{data.productName}</h1>
          <p className="intro-sub">{data.tagline}</p>
          <div className="cta">
            <button className="btn shine">Discover More</button>
            <button className="btn secondary" style={{marginLeft: 12}}>Watch Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
