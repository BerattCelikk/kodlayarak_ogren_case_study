/**
 * Generator script that uses Hugging Face Inference API (preferred) to
 * create structured JSON for the Remotion video. If `HUGGINGFACE_API_KEY`
 * is missing it will exit with a helpful message.
 *
 * Usage:
 * 1) Create a `.env` file at project root with `HUGGINGFACE_API_KEY=hf_...`
 * 2) Run: `npm run generate:assets`
 */

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const outJson = path.join(__dirname, 'assets', 'generated.json');
const imagesDir = path.join(__dirname, 'assets', 'images');

async function callHfModel(model: string, inputs: string) {
  const token = process.env.HUGGINGFACE_API_KEY;
  if (!token) throw new Error('HUGGINGFACE_API_KEY not set');

  const url = `https://router.huggingface.co/models/${model}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs, options: { wait_for_model: true } }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HF model error ${res.status}: ${body}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }

  return res.text();
}

async function main() {
  const hfToken = process.env.HUGGINGFACE_API_KEY;
  if (!hfToken) {
    console.error('Please set HUGGINGFACE_API_KEY in your environment (or .env).');
    process.exit(1);
  }

  // Prompt asks the model to return only valid JSON matching our schema.
  const prompt = `Generate a JSON object for a short promotional video for a fictional SaaS product. Respond ONLY with valid JSON. Keys: productName, brandName, tagline, brandColor, callToAction, ctaSub, dataTitle, dataSummary, features (array of 4 objects with title and description).`;

  const modelText = process.env.HF_MODEL_TEXT || 'gpt2';

  console.log('Calling HF model', modelText);
  const result = await callHfModel(modelText, prompt);

  // HF models return various shapes; try to extract the generated text.
  let textOutput = '';
  if (Array.isArray(result)) {
    // many HF text models return [{generated_text: '...'}]
    if (result[0] && typeof result[0] === 'object' && 'generated_text' in result[0]) {
      textOutput = result[0].generated_text as string;
    } else if (typeof result[0] === 'string') {
      textOutput = result[0];
    } else {
      textOutput = JSON.stringify(result[0]);
    }
  } else if (typeof result === 'object' && 'generated_text' in result) {
    textOutput = (result as any).generated_text;
  } else if (typeof result === 'string') {
    textOutput = result;
  } else {
    textOutput = JSON.stringify(result);
  }

  let data: any = null;
  try {
    // Try to find JSON block in the output (in case model adds commentary)
    const firstBrace = textOutput.indexOf('{');
    const jsonText = firstBrace >= 0 ? textOutput.slice(firstBrace) : textOutput;
    data = JSON.parse(jsonText);
  } catch (err) {
    console.error('Failed to parse JSON from model output. Model returned:');
    console.error(textOutput);
    process.exit(1);
  }

  // Ensure images folder exists (we'll keep image generation optional/future)
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  // If features don't include images, leave placeholders (the video uses picsum placeholders already)
  for (let i = 0; i < (data.features || []).length; i++) {
    if (!data.features[i].image) {
      data.features[i].image = `https://picsum.photos/seed/feature${i + 1}/1200/800`;
    }
  }

  fs.writeFileSync(outJson, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Wrote generated JSON to', outJson);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
