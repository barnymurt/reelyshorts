# ReelyShorts

> A CLI + local web gallery for generating on-brand short-form video content for thedigitalstag (Gero-inspired).

Generate Twitter/Instagram/YouTube Shorts from a one-line idea or a wallet screenshot. Procedural canvas animation rendered to MP4. Same brand voice and palette every time, distinct visual style per piece.

## What it is

```
idea  ->  reelyshorts new "..."   ->  MP4s in 9:16 + 1:1   ->  reelyshorts gallery
```

Each "concept" is a procedural-animated short built on the [cth9191/animate](https://github.com/cth9191/animate) toolkit (vendored in `tools/animate/`), wrapped by our own CLI and brand layer.

## Quick start

```bash
# 1. Install
npm install
npx playwright install chromium

# 2. Set up the brand
#    - Read brands/thedigitalstag/BRAND.md (or run: npm run brand:show)
#    - Drop 3-5 min of voice samples into brands/thedigitalstag/voice-samples/
#    - Set ELEVENLABS_API_KEY in .env (copy from .env.example)

# 3. Generate your first piece
npm run new -- "Stake ADA in 3 taps" --brand thedigitalstag

# 4. Open the gallery
npm run gallery
# -> http://localhost:4317
```

## Commands

| Command | What it does |
|---|---|
| `reelyshorts new "<idea>"` | Generate a piece from a one-line idea |
| `reelyshorts new --screenshot ./shot.png` | Generate from a wallet UI screenshot |
| `reelyshorts new "<idea>" --variations 3` | Three concept angles, same idea |
| `reelyshorts gallery` | Open the local gallery (http://localhost:4317) |
| `reelyshorts export <piece>` | Render 9:16 + 1:1 MP4s + captions |
| `reelyshorts voice setup` | Upload voice samples, create ElevenLabs clone |
| `reelyshorts voice test "hello"` | Play a sample of the cloned voice |
| `reelyshorts brand show` | Open BRAND.md in browser |
| `reelyshorts brand export` | Write BRAND.pdf |

Under the hood these are thin wrappers around the animate toolkit (`tools/animate/tools/*.mjs`). You can also run those directly:

```bash
node tools/animate/tools/build.mjs pieces/my-piece
node tools/animate/tools/storyboard.mjs pieces/my-piece
node tools/animate/tools/export.mjs pieces/my-piece --formats 9:16,1:1
node tools/animate/tools/review.mjs pieces/my-piece
```

## Repo layout

```
reelyshorts/
├── bin/                         CLI entry (reelyshorts.mjs)
├── brands/
│   └── thedigitalstag/          Your brand
│       ├── BRAND.md             Brand guideline (read this)
│       ├── BRAND.pdf            Printable version
│       ├── palette.json         Color tokens
│       ├── voice.json           ElevenLabs clone config
│       ├── voice-samples/       Audio for the clone (gitignored)
│       ├── logos/               Stag photos
│       └── disclaimer/          End-card assets
├── refs/                        Visual references + Gero source docs
├── styles/
│   └── thedigitalstag/          The "look" (built in Phase 2)
├── tools/
│   ├── animate/                 Vendored cth9191/animate toolkit
│   └── VENDORED.md              Upstream commit + license
├── pieces/                      One folder per concept
├── gallery/                     Vite + React local UI
├── .opencode/
│   └── skills/reelyshorts/      opencode skill (drive from agent)
├── LEGAL.md                     Trademark + nominative-use notes
└── README.md                    This file
```

## Brand

This is an independent content channel. The publisher is **thedigitalstag**. The subject is the **Gero wallet** (Cardano / Midnight / Apex Fusion).

- We use the **thedigitalstag** stag mark and palette.
- We use **Gero wallet UI screenshots** for visual reference.
- We use the **"GeroWallet"** name in voice and captions under nominative fair use.
- We do **not** render the Gero antler mark, the GeroWallet wordmark, or any other Gero brand asset in our output.

See `LEGAL.md` for the full reasoning and `brands/thedigitalstag/BRAND.md` for the brand spec.

## Tooling requirements

- Node 18+ (built and tested on 24)
- ffmpeg on PATH (or `ffmpeg-static` from npm)
- Playwright + Chromium (`npx playwright install chromium`)
- Python 3 + `faster-whisper` (for voice timing; only when using voice-over)
- ElevenLabs API key (only when using the cloned voice; pieces fall back to text-only without it)

## Voice clone (one-time setup)

1. Record 3-5 minutes of clean speech in `brands/thedigitalstag/voice-samples/`. Use the provided script (when generated) or just talk about the wallet naturally.
2. `reelyshorts voice setup` walks you through uploading to ElevenLabs Instant Voice Clone and storing the `voice_id` in `brands/thedigitalstag/voice.json`.
3. `reelyshorts voice test "hello"` plays a sample so you can verify the clone.

After that, every narration in every piece uses your cloned voice. Faster-whisper transcribes the resulting audio locally to get word timing, and the animation re-times to your words automatically.

## Build phases

- [x] **Phase 1** — Scaffold: folder structure, vendored toolkit, brand kit, source material, repo live.
- [ ] **Phase 2** — Brand: build `styles/thedigitalstag/` from refs, draft custom animate style.
- [ ] **Phase 3** — Voice: record samples, ElevenLabs clone, integration tests.
- [ ] **Phase 4** — CLI: `new`, `export`, `gallery` commands.
- [ ] **Phase 5** — Opencode skill: `.opencode/skills/reelyshorts/SKILL.md`.
- [ ] **Phase 6** — Gallery UI: Vite + React, file watcher, video player.
- [ ] **Phase 7** — Brand PDF: Playwright print-to-PDF of `BRAND.md`.
- [ ] **Phase 8** — Sample pieces: 3 variations of "Stake ADA in 3 taps" to validate the pipeline.

## License

MIT. The vendored animate toolkit is MIT (see `tools/VENDORED.md`).
