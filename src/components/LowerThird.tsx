import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

const LowerThird: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 20, 40], [100, 12, 0]);
  const opacity = interpolate(frame, [0, 20, 40], [0, 0.9, 1]);

  return (
    <div style={{position: 'absolute', left: 36, bottom: 48, pointerEvents: 'none'}}>
      <div style={{transform: `translateX(${slide}px)`, opacity, background: 'linear-gradient(90deg, rgba(6,182,212,0.12), rgba(124,58,237,0.08))', padding: '14px 20px', borderRadius: 12, backdropFilter: 'blur(6px)', boxShadow: '0 10px 30px rgba(2,6,23,0.6)', color: '#fff', display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{width:12,height:12,borderRadius:6,background:'linear-gradient(90deg,#06b6d4,#7c3aed)'}} />
        <div style={{fontSize:16,fontWeight:700}}>{text}</div>
      </div>
    </div>
  );
};

export default LowerThird;
