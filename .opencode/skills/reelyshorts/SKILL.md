---
name: reelyshorts
description: Generate on-brand short-form video content for thedigitalstag (Gero-inspired) from a one-line idea, a wallet screenshot, or a folder of references. Use when the user asks to "make a short", "create a reel", "generate a video", "make a tweet video", "build a promo", "reelyshorts new", or anything about producing thedigitalstag / Gero-wallet short-form content. Triggers on phrases like "make me a short about staking", "generate 3 concepts for cashback", "build a launch reel for the Gero wallet", "open the gallery", or any request to drive the reelyshorts CLI.
---

# reelyshorts

CLI + local gallery that generates on-brand short-form video content (Twitter / Instagram / YouTube Shorts) for thedigitalstag, an independent Gero-wallet content channel.

The toolkit under the hood is the [cth9191/animate](https://github.com/cth9191/animate) procedural-animation system, vendored in `tools/animate/`. This skill wraps it with the thedigitalstag brand layer (palette, voice, disclaimer, Gero-source citations) and adds a multi-angle "variations" flow.

## When to use

- The user asks to generate a short / reel / promo / explainer / tweet video for thedigitalstag or Gero
- The user pastes a wallet screenshot and asks for content about it
- The user wants to see the gallery of existing pieces
- The user wants to set up the brand or voice clone
- The user wants to export a piece to MP4
- Anything that maps to `reelyshorts <subcommand>`

## When NOT to use

- The user wants general video editing unrelated to the brand — use a different tool
- The user wants a non-Gero wallet with its own brand — adapt carefully, the system is designed for thedigitalstag-first
- The user wants to modify the vendored animate toolkit — go to `tools/animate/` and edit there, with care

## Workflow

```
intake   ->  story  ->  look  ->  storyboard  ->  build  ->  voice  ->  review  ->  publish
```

Each step has a corresponding subcommand. The agent drives them via the CLI:

```bash
node bin/reelyshorts.mjs new "<idea>" --brand thedigitalstag [--variations N] [--screenshot <path>] [--refs <dir>]
node bin/reelyshorts.mjs gallery
node bin/reelyshorts.mjs export pieces/<slug> --formats 9:16,1:1 --captions
node bin/reelyshorts.mjs voice setup
node bin/reelyshorts.mjs voice test "hello"
node bin/reelyshorts.mjs brand show thedigitalstag
node bin/reelyshorts.mjs brand export thedigitalstag
```

## Brand rules (read `brands/thedigitalstag/BRAND.md` for the full spec)

1. **Subject** is the Gero wallet. The product is named in voice/captions under nominative fair use.
2. **Publisher** is thedigitalstag. The blue stag mark (`#1C3E69` family) is the brand. Appears as an end-card lockup and a small corner watermark throughout.
3. **Gero cyan** (`#0CA3FB` -> `#00EAEF`) is an accent on Gero-wallet content only. Subtle. Stag blue dominates.
4. **Disclaimer** "Independent Gero content creator. Not affiliated with GeroWallet / A.D. Labs LTD." appears on every piece's end card, captions, and platform descriptions.
5. **Don't render** the Gero antler mark, the "GeroWallet" wordmark, or any other Gero brand asset. See `LEGAL.md`.
6. **Source material** for content is in `refs/gero-source/` (the 6-month tweet strategy, deepdives, PRDs, community goals, articles zip, gero-logo.svg for reference only). The wallet build ZIP is intentionally not in the repo.

## Intake questions (the "story" step)

When the user gives a vague idea, walk them through these before generating:

1. **What wallet feature or story is this about?** (Staking, swap, cashback, governance, midnight, perpetuals, security, hardware wallet, etc.)
2. **Who is the audience?** (New users, existing wallet users, crypto-native, etc. — picks the angle.)
3. **What format?** Pick from the 8 built-in animate grammars (history, explainer, mission, launch, promo, etc.) or let the agent pick. `tools/animate/grammar/FORMATS.md` has the list.
4. **How many variations?** (Default 1; up to 4 in parallel.)
5. **Voice-over or text-only?** (Default: text-only with captions. Voice if `brands/thedigitalstag/voice.json` has a `voice_id`.)
6. **Aspect ratios?** (Default 9:16 + 1:1. Override with `--formats`.)

If the user already gave specifics, skip the questions and go straight to generation.

## Variations flow (message angle rotation)

For `--variations N`, the agent picks the **N most distinct angles** for the same idea, then runs the animate intake for each in parallel. Example for "Stake ADA in 3 taps":

| Angle | Format | Hook |
|---|---|---|
| mission | mission | "Your keys. Your ADA. Three taps." |
| explainer | explainer | "What delegation actually does" |
| launch | launch | "New in Gero 2.7: instant delegation" |

All three use the same thedigitalstag visual style. Same brand, three distinct messages.

## Build pipeline (per piece)

The `reelyshorts new` command runs the animate flow non-interactively. Stages:

1. **Intake** — format + style + brand + voice
2. **Story** — beat table, facts web-checked against `refs/gero-source/`
3. **Look** — 2-4 style frames for thumbs-up (skipped in non-interactive mode; the agent picks the most representative)
4. **Storyboard** — every beat as a key frame, with sound and transitions
5. **Build** — `node tools/animate/tools/build.mjs pieces/<slug>` — single-file canvas + HTML, scored procedurally
6. **Voice** — `node tools/animate/tools/voice.mjs pieces/<slug>` (if voice_id set) — ElevenLabs + faster-whisper
7. **Music** — synthesized score, beat-mapped (built into the animate toolkit)
8. **Export** — `node tools/animate/tools/export.mjs pieces/<slug> --formats 9:16,1:1` — MP4s per format
9. **Review** — `node tools/animate/tools/review.mjs pieces/<slug>` — measured checks (cuts on beat, loudness, text cut off, hero anchoring)
10. **Captions** — generated per platform (Twitter 280c, IG 2200c, YT 5000c)

## Output expectations

- A new folder at `pieces/<slug>-<angle>/` (one per variation)
- `piece.json` with story, beats, captions, disclaimer
- `dist/*.mp4` for each format requested
- `frames/storyboard.png` for visual review
- The gallery auto-picks up new pieces via `chokidar`

## Hand-off back to the user

When done, tell the user:

1. The pieces that were generated (with paths)
2. The MP4 locations
3. The captions per platform
4. The gallery URL
5. Any review flags (e.g. text cut off, loudness off)

Then offer: tweak the story, re-render specific frames, generate more variations, or push to a real platform via `reelyshorts publish <piece> --platform <twitter|instagram|youtube>` (coming in a later phase).
