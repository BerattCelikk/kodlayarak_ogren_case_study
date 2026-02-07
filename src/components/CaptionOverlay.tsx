import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import generated from '../assets/generated.json';

const CaptionOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const features = generated.features || [];

  // Timeline mapping (must match RemotionVideo timings)
  const introEnd = 120;
  const featureSpacing = 220;
  const featureStart = 120;

  let caption = generated.tagline || '';

  if (frame >= introEnd && features.length > 0) {
    const idx = Math.floor((frame - featureStart) / featureSpacing);
    if (idx >= 0 && idx < features.length) caption = features[idx].title + ' — ' + features[idx].description;
    else if (frame >= featureStart + features.length * featureSpacing) caption = generated.dataSummary || '';
  }

  // subtle slide-up reveal
  const y = interpolate(frame % 60, [0, 30], [18, 0]);
  const opacity = interpolate(frame % 60, [0, 10, 30], [0, 0.9, 1]);

  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 120, display: 'flex', justifyContent: 'center', pointerEvents: 'none'}}>
      <div style={{maxWidth: 1200, padding: '12px 20px', background: 'rgba(3,7,18,0.5)', borderRadius: 12, color: '#fff', fontSize: 18, opacity, transform: `translateY(${y}px)`, backdropFilter: 'blur(6px)', boxShadow: '0 8px 30px rgba(0,0,0,0.5)'}}>
        {caption}
      </div>
    </div>
  );
};

export default CaptionOverlay;
