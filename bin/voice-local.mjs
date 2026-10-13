#!/usr/bin/env node
// =====================================================================
//  voice-local.mjs — Node.js wrapper around bin/voice-local.py.
//  Generates narration audio using a local voice clone (OmniVoice).
//
//  Output: <output>.wav  +  <output>.json  (word timing from faster-whisper)
//
//  usage:
//    node bin/voice-local.mjs \
//        --text "Locking horns with digital assets." \
//        --ref-audio brands/thedigitalstag/voice-samples/barny-01.wav \
//        --ref-text "Transcript of the reference audio." \
//        --output brands/thedigitalstag/voice-samples/test-output.wav \
//        [--num-step 32] [--duration 5.0] [--device cuda:0] [--no-transcribe]
//
//  The reelyshorts CLI wraps this for the standard `voice setup` and
//  `voice test` commands.
// =====================================================================
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PY = "C:\\Python314\\python.exe";
const SCRIPT = join(__dirname, "voice-local.py");

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith("--")) {
      const key = a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const next = args[i + 1];
      if (!next || next.startsWith("--")) {
        opts[key] = true;
      } else {
        opts[key] = next;
        i++;
      }
    }
  }
  return opts;
}

function toKebab(key) {
  return "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function buildPythonArgs(opts) {
  const args = [SCRIPT];
  for (const [k, v] of Object.entries(opts)) {
    if (v === true) {
      args.push(toKebab(k));
    } else if (v !== false && v !== undefined) {
      args.push(toKebab(k), String(v));
    }
  }
  return args;
}

function run() {
  const opts = parseArgs();

  if (!opts.text || !opts.refAudio || !opts.output) {
    console.error("usage: node bin/voice-local.mjs --text <str> --ref-audio <wav> --output <wav> [--ref-text <str>] [--num-step 32] [--device cuda:0] [--no-transcribe]");
    process.exit(2);
  }

  // default to transcribe for word timing
  if (!opts.noTranscribe) opts.transcribe = true;

  if (!existsSync(PY)) {
    console.error(`Python not found at ${PY}. Edit bin/voice-local.mjs to set PY.`);
    process.exit(2);
  }
  if (!existsSync(SCRIPT)) {
    console.error(`voice-local.py not found at ${SCRIPT}.`);
    process.exit(2);
  }
  if (!existsSync(opts.refAudio)) {
    console.error(`Reference audio not found: ${opts.refAudio}`);
    process.exit(2);
  }

  const args = buildPythonArgs(opts);
  console.log(`[voice-local] spawning: ${PY} ${args.join(" ")}`);

  const child = spawn(PY, args, { stdio: "inherit" });

  child.on("error", (err) => {
    console.error(`[voice-local] failed to spawn: ${err.message}`);
    process.exit(1);
  });
  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`[voice-local] python exited with code ${code}`);
      process.exit(code || 1);
    }
    // read the JSON output (if generated) and print to stdout
    const jsonPath = opts.output.replace(/\.wav$/, ".json");
    if (existsSync(jsonPath)) {
      const data = JSON.parse(readFileSync(jsonPath, "utf8"));
      console.log(`[voice-local] ok: ${data.duration_s}s, ${data.words?.length || 0} words`);
    }
  });
}

run();
