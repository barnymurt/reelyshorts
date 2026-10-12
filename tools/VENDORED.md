# Vendored dependencies

## tools/animate/

Vendored from [cth9191/animate](https://github.com/cth9191/animate).

- Upstream commit: `7e5eb56feb2dd573f890e1b7b34748af43d58263`
- Upstream branch: `main`
- License: MIT
- Original path: `plugins/animate/skills/animate/`

### What's in here
- `craft.md`, `intake.md`, `new-style.md`, `SKILL.md` — the procedural-animation guide
- `grammar/` — story-format rules (FORMATS.md, FRAME.md, STORY.md)
- `kit/` — shared rendering primitives (board.js, core.js, morph.js, score-head.js, score-tail.js)
- `styles/` — 7 built-in visual styles (crosshatch, cut-paper, isometric, math, pixel, riso, sketchbook), each with `kit.js`, `sample.png`, `STYLE.md`, `demo/`
- `templates/` — piece, style, beat-cut scaffolds
- `tools/` — CLI scripts: `build.mjs`, `capture.mjs`, `compare.mjs`, `export.mjs`, `framehash.mjs`, `gallery.mjs`, `gpu.mjs`, `review.mjs`, `still.mjs`, `storyboard.mjs`, `textcheck.mjs`, `tile.mjs`, `voice.mjs`, `voice_words.py`, `measure/refs.mjs`, `measure/shotlog.py`
- `examples/history-of-ai/` — complete reference piece

### Notes
- The original ships as a Claude Code plugin. We vendor the underlying toolkit and drive it from our own CLI (`bin/reelyshorts.mjs`) so it works outside Claude Code (e.g. from opencode, a terminal, or CI).
- We do not modify the vendored copy in this phase. Customizations land in `styles/thedigitalstag/` and in our wrapper scripts.

### Updating
```bash
git clone --depth 1 https://github.com/cth9191/animate.git /tmp/animate-src
rm -rf tools/animate
cp -R /tmp/animate-src/plugins/animate/skills/animate tools/animate
# update the SHA at the top of this file
```
