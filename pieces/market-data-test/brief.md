# market-data-test v2 brief

A 12s 9:16 piece for thedigitalstag, explaining https://gerowallet.io/wallet/market-data/. **Restructured around a curiosity hook and a clear payoff** based on feedback from the fit50 reference.

## What changed from v1

| v1 | v2 |
|---|---|
| Opens with "Every token. Every venue." (statement) | Opens with "Switching tabs to track one token?" (question — pulls the viewer in) |
| 3 token rows in a card (the "wallet") | 6 fake browser tabs across 6 fake DEXs (the "chaos") |
| Shows the wallet UI as a feature list | Shows the pain first, then the fix |
| "11 venues" is a stat | "11 venues. Real trades. 1 wallet." is the close, with `gerowallet.io` as the CTA |
| No loop tease | "Tomorrow: a 60-second order book" tease at the end |
| Code-drawn watermark silhouette | Actual `stag-circle.png` PNG (transparent corners) in the top-left, plus the "thedigitalstag" wordmark + "Independent Gero content" tagline |

## Beats

| t      | shot    | what happens |
|--------|---------|--------------|
| 0.2    | problem | "Switching tabs to track / one token?" (the question) |
| 0.4    | problem | 6 fake browser tabs pop in: MuesliSwap, SundaeSwap (active), WingRiders, VyFinance, MinSwap, Spectrum |
| 1.2    | problem | First price jump — a dissonant pluck, all 6 prices change |
| 2.2    | problem | Second price jump — all 6 prices change again (the chaos) |
| 3.2    | problem | "5 sites. 5 order books. 5 candles." |
| 4.8    | problem | cyan glow on the active tab (the bridge object); "There's a better way." |
| 6.0    | morph   | active tab → Gero wallet card |
| 6.2    | fix     | "Gero has every / venue in one tab." |
| 6.8    | fix     | 16 cyan candles pop in one by one |
| 7.6    | fix     | order book: 5 asks, "SPREAD 0.0003", 5 bids |
| 9.4    | fix     | "11 venues. Real trades. 1 wallet." (the stat) |
| 10.4   | fix     | "gerowallet.io/wallet/market-data" cyan pill (the CTA) |
| 11.4   | fix     | "Tomorrow: a 60-second order book / • / Part 2 of the Gero series" (the loop tease) |
| 12.0   | loop    | back to the question |

## Sound plan

- 0.0-6.0 (problem): a soft triangle pad + an off-beat blip + two dissonant plucks on the price jumps
- 5.7-6.3: a sweep 400 → 3200 Hz landing on the morph
- 6.0-12.0 (fix): a fuller sawtooth pad + 8th-note dancey plucks at 880-1210 Hz
- 6.8-7.4: 16 candle chimes
- 7.6-8.6: 10 order book row reveals
- 10.4: a bandpass noise hit on the gerowallet.io CTA

## Style

- `thedigitalstag` (the existing style)
- 1080x1920, 24fps, 120 BPM
- 2 eras, 1 shape morph

## Brand

- The actual `stag-circle.png` PNG (transparent corners) appears in the top-left of every era, alongside the "thedigitalstag" wordmark and "Independent Gero content" tagline
- Cyan accent is used subtly on Gero content only: the active tab, the "venue" highlight, the order-book spread, the 11-venues stat, the gerowallet.io pill

## Voice

None. Captions are in `piece.json` `captions` and `captions.json`.

## Bridge

| A (era 0) | B (era 1) |
|---|---|
| blue rectangle at (280, 740, 800, 920) — the active tab | dark card at (80, 700, 1000, 1280) — the Gero wallet |

Both are horizontal rectangles of similar proportions, so the morph is a clean expansion.
