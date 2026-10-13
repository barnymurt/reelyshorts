# market-data-test LOG

Build log for the 12s 9:16 test piece. First full piece using the thedigitalstag style.

## 2026-10-12 — first build

- Scaffolded `pieces/market-data-test/` with `piece.json`, `brief.md`, `LOG.md`, and the `src/` quartet (head.html, bridges.js, scenes.js, score.js).
- 12s, 9:16, 24fps, 120 BPM. F4 mission (4 beats + payoff). 2 eras joined by one shape morph.
- No voice. Procedural score at 120 BPM: driving kick + off-beat snare + 8th-note plucks + sawtooth pad + a sweep into the morph + a payoff hit.
- Subject: https://gerowallet.io/wallet/market-data/ — explains that Gero's Market tab and every token page are fed by Nexus, indexed from 11 Cardano DEX venues, checked against real trades.
- Cyan accent used subtly (locked to Gero content): tag, selected row, bridge strip, "SPREAD 0.0003", the big "11", the gerowallet.io pill.

## Open / follow-ups

- Captions: written into `piece.json` `captions` (twitter / instagram / youtube). The gallery/exporter will surface them.
- Real Gero UI screenshots: the order book + candle chart in the piece are drawn from the description, not from a real screenshot. The hand-drawn version is fast and brand-consistent; the real-UI version would need a `tools/capture.mjs` run on the live page or an H3 Ref2VA pass.
- If H3 is wired: the candle chart and order book could be replaced with H3 Ref2VA outputs of a real Gero dashboard screenshot, with the same animate chrome on top.
