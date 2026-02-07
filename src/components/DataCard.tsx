import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

const DataCard: React.FC<{title: string; summary: string}> = ({title, summary}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 20, 40], [0, 1, 1]);

  // simple typewriter: reveal characters based on frame
  const totalChars = summary.length;
  const chars = Math.min(totalChars, Math.floor((frame / 2)));
  const visible = summary.slice(0, chars) + (chars < totalChars ? '|' : '');

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
      <div style={{maxWidth: 1000, padding: 24, textAlign: 'center', color: '#fff', opacity: reveal}}>
        <div style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>{title}</div>
        <div style={{fontSize: 20, color: 'var(--muted)'}}>{visible}</div>
      </div>
    </div>
  );
};

export default DataCard;
