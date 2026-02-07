import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import logo from '../assets/logo.svg';

const Outro: React.FC<{data: any}> = ({data}) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 30], [0, 1]);

  return (
    <div className="outro">
      <div className="outro-card" style={{opacity: fade}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12}}>
          <img src={logo} alt="logo" style={{width: 54, height: 54, borderRadius: 10, boxShadow: '0 8px 28px rgba(0,0,0,0.5)'}} />
          <div style={{fontSize: 16, color: 'var(--muted)', fontWeight: 700}}>{data.brandName}</div>
        </div>

        <h2 className="outro-title">{data.callToAction || 'Start your free trial today'}</h2>
        <p className="outro-sub">{data.ctaSub || 'No credit card required — instant setup.'}</p>
        <div style={{marginTop: 28}}>
          <button className="btn shine">Get Started</button>
        </div>
        <div style={{marginTop: 20, opacity: 0.85}}>
          <small>{data.brandName} · Built for teams</small>
        </div>
      </div>
    </div>
  );
};

export default Outro;
