const fs = require('fs');

function writeSilentWav(path, seconds = 8, sampleRate = 44100) {
  const numChannels = 2;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const numSamples = seconds * sampleRate;
  const dataSize = numSamples * numChannels * bitsPerSample / 8;

  const buffer = Buffer.alloc(44 + dataSize);

  let offset = 0;
  buffer.write('RIFF', offset); offset += 4;
  buffer.writeUInt32LE(36 + dataSize, offset); offset += 4; // file size - 8
  buffer.write('WAVE', offset); offset += 4;

  // fmt chunk
  buffer.write('fmt ', offset); offset += 4;
  buffer.writeUInt32LE(16, offset); offset += 4; // subchunk1 size
  buffer.writeUInt16LE(1, offset); offset += 2; // PCM
  buffer.writeUInt16LE(numChannels, offset); offset += 2;
  buffer.writeUInt32LE(sampleRate, offset); offset += 4;
  buffer.writeUInt32LE(byteRate, offset); offset += 4;
  buffer.writeUInt16LE(blockAlign, offset); offset += 2;
  buffer.writeUInt16LE(bitsPerSample, offset); offset += 2;

  // data chunk
  buffer.write('data', offset); offset += 4;
  buffer.writeUInt32LE(dataSize, offset); offset += 4;

  // PCM data is already zero-filled (silence)

  fs.writeFileSync(path, buffer);
  console.log(`Wrote ${seconds}s silent WAV to ${path}`);
}

const outPath = 'src/assets/music.wav';
writeSilentWav(outPath, 8, 44100);
