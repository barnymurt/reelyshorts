# pieces/

One folder per concept. The animate toolkit expects this structure:

```
pieces/<slug>/
├── piece.json         story, beats, captions, disclaimer
├── brief.md           human-readable brief
├── LOG.md             build log
├── audio/
│   ├── track.wav      procedural score (built by the toolkit)
│   └── voice.wav      narration (if voice-over is enabled)
├── assets/            screenshots, captured UI, reference frames
├── frames/            storyboard + stills
│   ├── storyboard.png
│   └── *.png
├── src/               source for the procedural canvas
│   ├── head.html
│   ├── bridges.js
│   ├── scenes.js
│   └── score.js
└── dist/              final outputs
    ├── piece-9x16.mp4
    ├── piece-1x1.mp4
    └── captions.json
```

Until the CLI is implemented in Phase 4, you can scaffold a new piece by copying `tools/animate/templates/piece/` and editing it manually.
