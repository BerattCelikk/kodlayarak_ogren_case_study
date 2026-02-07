import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = frame / Math.max(1, durationInFrames - 1);
  const width = interpolate(progress, [0, 1], [0, 100]);

  const secondsTotal = Math.round(durationInFrames / 30);
  const secondsPassed = Math.floor(frame / 30);
  const secondsLeft = Math.max(0, secondsTotal - secondsPassed);

  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 28, display: 'flex', alignItems: 'center', flexDirection: 'column', pointerEvents: 'none'}}>
      <div style={{width: 800, height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 8}}>
        <div style={{width: `${width}%`, height: '100%', background: 'linear-gradient(90deg,#06b6d4,#7c3aed)', borderRadius: 8, boxShadow: '0 6px 20px rgba(0,0,0,0.5)'}} />
      </div>
      <div style={{marginTop: 8, color: 'var(--muted)', fontSize: 13}}>{secondsLeft}s left • {(progress * 100).toFixed(0)}%</div>
    </div>
  );
};

export default ProgressBar;
