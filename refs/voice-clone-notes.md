# Voice clone (local, free) — notes

## What was tried

**F5-TTS v1 Base** (1.2B parameters) on CPU — installed and loaded, but the
inference for a 4-word test phrase ("Locking horns with digital assets.")
did not complete in 10 minutes. The 1.2B model is too large to run on CPU in
usable time. The reference audio (42s) was loaded via `soundfile` to
bypass the `torchaudio` / `torchcodec` dependency on Python 3.14.

## Why it doesn't work on this machine

- F5-TTS v1 Base = 1.2B params. CPU inference is ~5-10x real-time per token.
  A 12-second clip at 24kHz = ~288k samples = several minutes of CPU
  inference. Not viable for a 5-piece series.
- PyTorch is `2.13.0+cpu` (no CUDA).
- Coqui XTTS (the other free local option) doesn't support Python 3.14
  (requires <3.12).
- OpenVoice v2 doesn't have a pip package for Python 3.14.

## The three real paths

1. **ElevenLabs free tier** (recommended for now)
   - 10,000 characters/month free, no credit card.
   - Sign up at https://elevenlabs.io/, get an API key, set `ELEVENLABS_API_KEY` in `.env`.
   - Clone your voice via their Instant Voice Clone feature, get back a
     `voice_id`, save to `brands/thedigitalstag/voice.json`.
   - The existing `bin/voice-setup.mjs` script and the animate toolkit's
     `voice.mjs` are already wired for this.
   - For a 12-second piece with a short script, you'll use ~200-300
     characters. The 10k free tier covers ~30-50 pieces per month.

2. **Wait for the pieces without voice**
   - The 4 shipped pieces (v3) have no voice — they're text + image + music.
   - Voice is a "nice to have" for a 5th piece or a future series.
   - If you don't want to sign up for ElevenLabs, keep shipping the way
     #1-#4 are now (text + screenshot + music).

3. **GPU for F5-TTS**
   - If you ever get a CUDA-capable GPU, F5-TTS runs ~5-10x real-time
     on GPU, which makes it viable.
   - A mid-range laptop GPU (RTX 3060+) would handle F5-TTS Base
     comfortably.

## For your current 5 pieces

All 4 shipped pieces (market-data-test, market-data-table, market-data-
orderbook, market-data-spread) work without voice. They're text + image
+ music, which is a valid format for social shorts (see the Skilly/Futurepost
references you shared — those have no voice either).

Voice is for a future piece, not for the current series.
