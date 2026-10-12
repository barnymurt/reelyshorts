# thedigitalstag demo LOG

Build log for the first piece this style has carried.

## 2026-10-12 — first build

- Scaffolded `styles/thedigitalstag/` from `tools/animate/templates/style/kit.js` + the crosshatch demo.
- Wrote `STYLE.md` with the measured palette and frame checklist.
- Wrote `kit.js` with `dsBackdrop`, `dsCard`, `dsSlab`, `dsHero`, `dsWatermark`, `dsTag`, `dsCaption`, `dsPill`, `dsAccent`.
- Demo: 6s, 9:16, 24fps, 120 BPM, 2 eras, 1 shape morph (cyan glow -> row of cyan underlines).
- Hero carries through with different moods (happy -> wow).
- Watermark in top-left throughout.

## Open

- Real pieces are next. After the first full piece (3+ beats) is approved, append to `STYLE.md` "Proven on" with the piece name.
- If a real piece needs Gero UI screenshots, switch `STYLE.paper` to `#0E1A28` (already set) and use `drawAsset` from `kit/core.js` to embed the screenshot. The screenshot will sit inside a `dsCard` so it inherits the line.
- If a piece needs no cyan, omit the cyan tokens entirely.
