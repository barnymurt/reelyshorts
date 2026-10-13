# market-data-orderbook brief

Piece **#3** in the thedigitalstag Gero series. 12s 9:16, 24fps, 120 BPM. Text + image + music, no voice.

## Frame sequence (hard cuts, no morphs)

| # | t      | Frame | What |
|---|--------|-------|------|
| 1 | 0.0-2.4s | **HOOK** | "You're only seeing / half the / order book." (3 lines, last in cyan) |
| 2 | 2.4-4.2s | **SHARPEN** | a thin hand-drawn MuesliSwap order book (greyed out, with a red "?" overlay) + "That's one venue." in cyan below |
| 3 | 4.2-8.0s | **REVEAL** | the Gero screenshot showing all 11 DEXes. Cyan border. **MUSIC DROP at 4.2s.** |
| 4 | 8.0-10.0s | **PAY** | "Every trade. / Every venue. / One view." (3 lines, middle in cyan) |
| 5 | 10.0-12.0s | **CTA** | "Gero Wallet → Market tab" + gerowallet.io pill + "Next: same token, same minute, 3% apart." teaser for #4 |

## Screenshot

The reveal frame is a real screenshot of `gerowallet.io/wallet/market-data/`, captured at build time. Cropped to 1080x1080, centered on the 1080x1920 stage with a thin cyan border. Shows the 11 DEX connections diagram and the live data strip (NIGHT #1 +5.9%, SNEK +2.7%, STRIKE -7.3%).

The sharpen frame uses a hand-drawn MuesliSwap order book (just 2 asks, 2 bids with thin depth) to visually contrast with the "all 11" reveal.

## Sound plan

- 0.0-2.4 (hook): 5 quiet plucks at 0.48s intervals (C5, D5, E5, G5, A5)
- 2.4 (between Q and A): a single tick (A4)
- 0.0-4.2: a low triangle pad (D3, A3)
- **4.2 (the DROP)**: a bandpass noise hit + 4 rising plucks (C4, E4, G4, C5) + a fuller sawtooth pad
- 4.2-8.0 (reveal): the fuller pad holds
- 8.0-12.0 (pay + CTA): a softer triangle pad + a single pluck + a noise hit on the CTA

## Brand

- thedigitalstag watermark (stag-circle.png + "thedigitalstag" + "Locking horns with digital assets") in every era
- Cyan accent on Gero content only: the "order book." word in the hook, the "That's one venue." in the sharpen, the screenshot border, the "Live from gerowallet.io" caption, the "Every venue." word in the pay, the gerowallet.io pill

## Voice

None. Captions are in `piece.json` `captions`.

## Bridge

None — frame-sequence piece (hard cuts, no morphs).
