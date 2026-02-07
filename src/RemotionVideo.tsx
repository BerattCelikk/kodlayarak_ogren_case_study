import React from 'react';
import {Composition, Sequence} from 'remotion';
import Intro from './components/Intro';
import Feature from './components/Feature';
import Outro from './components/Outro';
import ProgressBar from './components/ProgressBar';
import ParticleOverlay from './components/ParticleOverlay';
import DataCard from './components/DataCard';
import LowerThird from './components/LowerThird';
import CaptionOverlay from './components/CaptionOverlay';
import generated from './assets/generated.json';
import logo from './assets/logo.svg';
import {Audio} from 'remotion';
import MusicLayer from './components/MusicLayer';

const fps = 30;
const durationInFrames = 1800; // 60s at 30fps

const VideoRoot: React.FC = () => {
  const features = generated.features || [];

  return (
    <div className={`theme-${generated.theme || 'cool'}`} style={{width: '100%', height: '100%'}}>
      <>
      <MusicLayer />

      <Sequence from={0} durationInFrames={120}>
        <Intro data={generated} />
      </Sequence>

      {/* particle overlay across the video */}
      <ParticleOverlay />

      {features.map((f, idx) => (
        // overlap sequences slightly for crossfade feeling
        <Sequence key={idx} from={120 + idx * 220} durationInFrames={220}>
          <Feature
            title={f.title}
            description={f.description}
            image={f.image}
            index={idx}
            total={features.length}
            duration={220}
          />
          <LowerThird text={f.title} />
        </Sequence>
      ))}

      <Sequence from={120 + features.length * 220} durationInFrames={360}>
        <DataCard title={generated.dataTitle || 'Data & Impact'} summary={generated.dataSummary || 'Insights pulled automatically from live usage and analytics.'} />
      </Sequence>

      <Sequence from={120 + features.length * 220 + 360} durationInFrames={360}>
        <Outro data={generated} />
      </Sequence>

      {/* Top-right watermark logo */}
      <div style={{position: 'absolute', right: 28, top: 18, zIndex: 30}}>
        <img src={logo} alt="logo" style={{width: 56, height: 56, borderRadius: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.5)'}} />
      </div>

      {/* Vignette + Progress bar overlay */}
      <div className="vignette" />
      <CaptionOverlay />
      <ProgressBar />
      </>
    </div>
  );
};

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductAd"
        component={VideoRoot}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
      />
    </>
  );
};

export default RemotionVideo;
