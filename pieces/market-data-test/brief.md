# market-data-test brief

A 12s 9:16 test piece for thedigitalstag, explaining https://gerowallet.io/wallet/market-data/. No voice; upbeat dancey procedural score at 120 BPM, 24fps.

## Concept

F4 mission: the user *wants* live market data in their non-custodial wallet; *Gero* delivers it via the Market tab, fed by Nexus. The proof: an order book, a candle chart, and "11" — eleven DEX venues indexed, every trade real, every candle verified.

## Beats

| t      | shot    | what happens |
|--------|---------|--------------|
| 0.0    | list    | "MARKET DATA" tag (cyan) + "Every token. Every venue." display |
| 0.8    | list    | card pops in with three token rows (ADA, GERO selected, NIGHT) |
| 1.4    | list    | rows pop in one at a time |
| 2.4    | list    | cyan accent bar appears on the selected (GERO) row + cyan glow on the right edge of the card |
| 2.5    | list    | "Live from the chain." caption |
| 6.0    | morph   | cyan right-edge -> cyan left-edge of the order book |
| 6.1    | charts  | "POWERED BY NEXUS" tag + "Order books. Real trades." display |
| 6.8    | charts  | candle chart card pops in, candles reveal one by one |
| 8.0    | charts  | order book card pops in, asks then bids reveal one by one |
| 9.2    | charts  | "SPREAD 0.0003" between asks and bids (cyan) |
| 10.0   | charts  | big "11" stat in cyan: "DEX venues indexed / real trades / live, in your wallet" |
| 11.2   | charts  | "gerowallet.io/wallet/market-data" pill in the bottom-right |
| 12.0   | charts  | hero (wow mood) + watermark |

## Sound plan

- 0.0-12.0: a driving 4-on-the-floor kick + an off-beat snare, every quarter
- 0.0-12.0: 8th-note plucks at 880-1210 Hz, bright and short
- 0.0-12.0: a sawtooth pad on A3-C4-E4-G4, low send
- 5.7-6.3: a sweep 400 -> 3200 Hz landing on the morph
- 7.0-7.6: 14 candle-by-candle chimes
- 7.5-8.8: 10 order book row reveals
- 10.0: a bandpass noise hit on the big "11" (the payoff)

## Style

- `thedigitalstag` (the existing style)
- 1080x1920, 24fps, 120 BPM
- 2 eras, 1 shape morph (cyan right-edge -> cyan left-edge)

## Cyan accent usage

Subtle, locked to Gero content:
- "MARKET DATA" tag
- The word "venue" in the display
- The selected GERO row's accent bar + sparkline
- The bridge strip (left and right)
- "SPREAD 0.0003" between asks and bids
- The big "11" stat
- The gerowallet.io pill

## Voice

None. Captions are auto-generated per platform; see `piece.json` `captions` and the post-export caption suggestions.

## Bridge

| A (era 0) | B (era 1) |
|---|---|
| cyan rectangle at (880-898, 760-1100) | cyan rectangle at (220-238, 760-1100) |

Both are tall thin vertical strips of identical proportions, so the morph is a clean horizontal slide.
