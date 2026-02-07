const fs = require('fs');

function writeWav(path, samples, sampleRate = 44100, numChannels = 2) {
  const bitsPerSample = 16;
  const blockAlign = numChannels * bitsPerSample / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * numChannels * bitsPerSample / 8;

  const buffer = Buffer.alloc(44 + samples.length * numChannels * 2);
  let offset = 0;
  buffer.write('RIFF', offset); offset += 4;
  buffer.writeUInt32LE(36 + dataSize, offset); offset += 4;
  buffer.write('WAVE', offset); offset += 4;
  buffer.write('fmt ', offset); offset += 4;
  buffer.writeUInt32LE(16, offset); offset += 4;
  buffer.writeUInt16LE(1, offset); offset += 2;
  buffer.writeUInt16LE(numChannels, offset); offset += 2;
  buffer.writeUInt32LE(sampleRate, offset); offset += 4;
  buffer.writeUInt32LE(byteRate, offset); offset += 4;
  buffer.writeUInt16LE(blockAlign, offset); offset += 2;
  buffer.writeUInt16LE(bitsPerSample, offset); offset += 2;
  buffer.write('data', offset); offset += 4;
  buffer.writeUInt32LE(dataSize, offset); offset += 4;

  // write samples (interleaved)
  for (let i = 0; i < samples.length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const s = Math.max(-1, Math.min(1, samples[i][ch]));
      const val = Math.floor(s * 32767);
      buffer.writeInt16LE(val, offset); offset += 2;
    }
  }

  fs.writeFileSync(path, buffer);
}

function generateAmbient(seconds = 60, sampleRate = 44100) {
  const numSamples = seconds * sampleRate;
  const samples = new Array(numSamples);

  // create a few slow-moving sine layers
  const layers = [
    {freq: 110, amp: 0.12, speed: 0.03},
    {freq: 220, amp: 0.08, speed: 0.015},
    {freq: 440, amp: 0.03, speed: 0.009},
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let left = 0;
    let right = 0;

    // base pads
    for (let j = 0; j < layers.length; j++) {
      const lay = layers[j];
      const mod = Math.sin(2 * Math.PI * lay.speed * t + j);
      const phase = 2 * Math.PI * lay.freq * t + mod * 0.5;
      const val = Math.sin(phase) * lay.amp * (0.8 + 0.2 * Math.sin(0.1 * t + j));
      // slight stereo offset
      left += val * (0.9 + 0.1 * Math.cos(0.07 * t + j));
      right += val * (0.9 - 0.1 * Math.cos(0.07 * t + j));
    }

    // gentle low-frequency rumble
    left += 0.02 * Math.sin(2 * Math.PI * 30 * t);
    right += 0.02 * Math.sin(2 * Math.PI * 30 * t + 0.3);

    // apply long fade-in/out
    const fadeIn = Math.min(1, t / 4);
    const fadeOut = Math.min(1, (seconds - t) / 6);
    const env = Math.max(0, Math.min(1, fadeIn * fadeOut));

    left *= env;
    right *= env;

    samples[i] = [left, right];
  }

  return samples;
}

const out = 'src/assets/music.wav';
const seconds = 60;
const samples = generateAmbient(seconds, 44100);
writeWav(out, samples, 44100, 2);
console.log(`Generated ambient ${seconds}s WAV at ${out}`);
