// =====================================================================
//  voice setup — upload voice-samples/ to ElevenLabs Instant Voice Clone,
//  save the returned voice_id to brands/thedigitalstag/voice.json, then
//  test by generating "Locking horns with digital assets" and writing
//  the result to brands/thedigitalstag/voice-samples/test-output.mp3
//
//  usage: node bin/voice-setup.mjs
//
//  Reads ELEVENLABS_API_KEY from .env. If unset, prints the install URL
//  and exits with a helpful message.
// =====================================================================
import 'dotenv/config';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BRAND = 'thedigitalstag';
const SAMPLES = join(ROOT, 'brands', BRAND, 'voice-samples');
const VOICE_JSON = join(ROOT, 'brands', BRAND, 'voice.json');
const TEST_OUT = join(SAMPLES, 'test-output.mp3');
const VOICE_NAME = 'barny thedigitalstag';

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error('ELEVENLABS_API_KEY is not set in .env');
  console.error('Get a key at https://elevenlabs.io/app/settings/api-keys');
  process.exit(1);
}

const files = existsSync(SAMPLES)
  ? readdirSync(SAMPLES).filter((f) => /\.(mp3|m4a|wav|webm|ogg)$/i.test(f))
  : [];
if (files.length === 0) {
  console.error(`No voice samples found in ${SAMPLES}`);
  process.exit(1);
}

const client = new ElevenLabsClient({ apiKey });

console.log(`Uploading ${files.length} sample(s) to ElevenLabs...`);
for (const f of files) console.log(`  - ${f}`);

const sampleBuffers = files.map((f) => ({
  name: f,
  data: readFileSync(join(SAMPLES, f)),
}));

// ElevenLabs SDK: voices.ivc.create() — Instant Voice Clone
let voiceId;
try {
  const createRes = await client.voices.ivc.create({
    name: VOICE_NAME,
    files: sampleBuffers.map((s) => new Blob([s.data])),
    remove_background_noise: true,
  });
  voiceId = createRes.voice_id;
  console.log(`Created voice: ${voiceId}`);
} catch (e) {
  // older SDKs may use a different shape — fall back to the legacy endpoint
  console.error('Instant Voice Clone API call failed:', e.message);
  console.error('Falling back to legacy /v1/voices/add endpoint...');
  const form = new FormData();
  form.append('name', VOICE_NAME);
  for (const s of sampleBuffers) form.append('files', new Blob([s.data]), s.name);
  const res = await fetch('https://api.elevenlabs.io/v1/voices/add', {
    method: 'POST',
    headers: { 'xi-api-key': apiKey },
    body: form,
  });
  if (!res.ok) {
    console.error('Legacy endpoint failed:', await res.text());
    process.exit(1);
  }
  const data = await res.json();
  voiceId = data.voice_id;
  console.log(`Created voice (legacy): ${voiceId}`);
}

// update voice.json
const voiceCfg = JSON.parse(readFileSync(VOICE_JSON, 'utf8'));
voiceCfg.voice_id = voiceId;
voiceCfg.voice_name = VOICE_NAME;
writeFileSync(VOICE_JSON, JSON.stringify(voiceCfg, null, 2));
console.log(`Updated ${VOICE_JSON}`);

// test the clone
console.log('Testing the clone: "Locking horns with digital assets."');
const testText = 'Locking horns with digital assets.';
const audio = await client.textToSpeech.convert(voiceId, {
  text: testText,
  model_id: process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2',
});
const chunks = [];
for await (const chunk of audio) chunks.push(chunk);
writeFileSync(TEST_OUT, Buffer.concat(chunks));
console.log(`Wrote test output: ${TEST_OUT}`);
console.log('\nSetup complete. Use `reelyshorts voice test "..."` from any piece to generate narration.');
