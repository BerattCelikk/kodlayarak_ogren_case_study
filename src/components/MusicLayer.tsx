import React from 'react';
import {Audio, useCurrentFrame, useVideoConfig} from 'remotion';
import generated from '../assets/generated.json';

const MusicLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const musicFile = generated.music || null;

  if (!musicFile) return null;

  const features = (generated.features || []).length;
  const featureStart = (idx: number) => 120 + idx * 220;
  const dataStart = 120 + features * 220;
  const outroStart = dataStart + 360;

  // Default and ducked volumes
  let volume = 0.65;

  // Duck briefly at the start of each feature
  for (let i = 0; i < features; i++) {
    const s = featureStart(i);
    if (frame >= s && frame < s + 30) {
      volume = 0.25;
    }
  }

  // Duck during data and outro sections
  if (frame >= dataStart && frame < dataStart + 360) volume = 0.25;
  if (frame >= outroStart && frame < outroStart + 360) volume = 0.25;

  return (
    <>
      <Audio src={`./assets/${musicFile}`} volume={volume} />
    </>
  );
};

export default MusicLayer;
