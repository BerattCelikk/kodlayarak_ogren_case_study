import React from 'react';
import {Audio, useCurrentFrame, useVideoConfig} from 'remotion';
import generated from '../assets/generated.json';
import musicWav from '../assets/music.wav';

const MusicLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const musicFile = generated.music || null;
  let resolvedSrc: string | null = null;
  if (musicFile) {
    const lower = musicFile.toLowerCase();
    if (lower.endsWith('.wav')) resolvedSrc = musicWav;
  }

  if (!resolvedSrc) return null;

  const features = (generated.features || []).length;
  const featureStart = (idx: number) => 120 + idx * 220;
  const dataStart = 120 + features * 220;
  const outroStart = dataStart + 360;

  // Default and ducked volumes
  // base volume and dynamic ducking
  const baseVolume = 0.7;
  let volume = baseVolume;

  const duckVolume = 0.2;
  const duckFadeFrames = Math.round(fps * 0.6); // 0.6s fade for duck transitions

  // helper for smoothstep
  const smooth = (x: number) => x * x * (3 - 2 * x);

  // apply ducking for feature entries
  for (let i = 0; i < features; i++) {
    const s = featureStart(i);
    if (frame >= s - duckFadeFrames && frame <= s + 30 + duckFadeFrames) {
      const rel = (frame - (s - duckFadeFrames)) / (duckFadeFrames + 30 + duckFadeFrames);
      const factor = smooth(Math.max(0, Math.min(1, rel)));
      // dip towards duckVolume around the middle
      const target = duckVolume;
      volume = baseVolume * (1 - factor) + target * factor;
    }
  }

  // duck for data and outro sections with smooth fades
  if (frame >= dataStart - duckFadeFrames && frame <= dataStart + 360 + duckFadeFrames) {
    const rel = (frame - (dataStart - duckFadeFrames)) / (360 + 2 * duckFadeFrames);
    const factor = smooth(Math.max(0, Math.min(1, rel)));
    volume = Math.min(volume, baseVolume * (1 - factor) + duckVolume * factor);
  }
  if (frame >= outroStart - duckFadeFrames && frame <= outroStart + 360 + duckFadeFrames) {
    const rel = (frame - (outroStart - duckFadeFrames)) / (360 + 2 * duckFadeFrames);
    const factor = smooth(Math.max(0, Math.min(1, rel)));
    volume = Math.min(volume, baseVolume * (1 - factor) + duckVolume * factor);
  }

  // overall fade in/out for music (first 3s and last 4s)
  const fadeInFrames = Math.round(fps * 3);
  const fadeOutFrames = Math.round(fps * 4);
  if (frame < fadeInFrames) {
    volume *= (frame / fadeInFrames);
  }
  const totalFrames = Math.round(60 * fps);
  if (frame > totalFrames - fadeOutFrames) {
    volume *= ((totalFrames - frame) / fadeOutFrames);
  }

  return (
    <>
      <Audio src={resolvedSrc} volume={volume} />
    </>
  );
};

export default MusicLayer;
