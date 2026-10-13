# market-data-spread brief

Piece **#4** in the thedigitalstag Gero series. 12s 9:16, 24fps, 120 BPM. Text + image + music, no voice.

## Frame sequence (hard cuts, no morphs)

| # | t      | Frame | What |
|---|--------|-------|------|
| 1 | 0.0-1.6s | **HOOK** | "3 tokens. / Same minute. / 3 prices." (3 lines, last in cyan) |
| 2 | 1.6-3.0s | **SHARPEN** | "Why?" (cyan, large) |
| 3 | 3.0-4.4s | **LIQUIDITY** | "Liquidity is split / across 11 DEXes." (2 lines, last in cyan) |
| 4 | 4.4-8.0s | **REVEAL** | the Gero screenshot. **MUSIC DROP at 4.4s.** |
| 5 | 8.0-10.0s | **PAY** | "Gero shows you / all of them." (2 lines, last in cyan) |
| 6 | 10.0-12.0s | **CTA** | "Gero Wallet → Market tab" + gerowallet.io pill + "Next: are you up on Cardano in under 10 seconds?" teaser for #5 |

## Note on the hook

The original #4 hook was "Same token. Same minute. 3% apart." which requires a screenshot of the same token on different venues (e.g., ADA on MuesliSwap vs SundaeSwap). The public market data page doesn't show per-venue prices per token — it shows different tokens in the live data strip.

Per user's direction (option A), the hook was changed to "3 tokens. Same minute. 3 prices." which uses the live data strip directly: NIGHT ($0.0338), SNEK ($0.03849), STRIKE ($0.6159) — 3 different tokens at the same time, with 3 different prices. The meaning shifts from "same token, different venues" to "3 tokens, 3 prices" but the data is real and the reveal is honest.

## Screenshot

The reveal frame is a real screenshot of `gerowallet.io/wallet/market-data/`, captured at build time. Cropped to 1080x1080, centered on the 1080x1920 stage with a thin cyan border. Shows the 11 DEX connections diagram and the live data strip (NIGHT, SNEK, STRIKE with their prices and 24H changes).

## Sound plan

- 0.0-1.6 (hook): 3 quiet plucks (C5, E5, G5) at 0.5s intervals
- 1.7 (sharpen): a single tick (A4) on the "Why?"
- 3.1 (liquidity): a deeper tick (F4)
- 0.0-4.4: a low triangle pad (D3, A3)
- **4.4 (the DROP)**: a bandpass noise hit + 4 rising plucks (C4, E4, G4, C5) + a fuller sawtooth pad
- 4.4-8.0 (reveal): the fuller pad holds
- 8.0-12.0 (pay + CTA): a softer triangle pad + a single pluck + a noise hit on the CTA

## Brand

- thedigitalstag watermark (stag-circle.png + "thedigitalstag" + "Locking horns with digital assets") in every era
- Cyan accent on Gero content only: the "3 prices." word in the hook, the "Why?" in the sharpen, the "across 11 DEXes." in the liquidity frame, the screenshot border, the "Live from gerowallet.io" caption, the "all of them." word in the pay, the gerowallet.io pill

## Voice

None. Captions are in `piece.json` `captions`.

## Bridge

None — frame-sequence piece (hard cuts, no morphs).
