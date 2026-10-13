# market-data-table brief

Piece **#2** in the thedigitalstag Gero series. 12s 9:16, 24fps, 120 BPM. Text + image + music, no voice.

## Frame sequence (hard cuts, no morphs)

| # | t      | Frame | What |
|---|--------|-------|------|
| 1 | 0.0-2.4s | **HOOK** | "Which Cardano / token traded / the most today?" (3 lines, last in cyan) |
| 2 | 2.4-4.2s | **SHARPEN** | silence beat (0.3s) then "Not ADA. / Not SNEK." (in cyan) |
| 3 | 4.2-8.0s | **REVEAL** | the actual Gero live data screenshot, 1080x1080, thin cyan border, "Live from gerowallet.io" caption above. **MUSIC DROP at 4.2s.** |
| 4 | 8.0-10.0s | **PAY** | "Every token. / Ranked. / One table." (3 lines, middle in cyan) |
| 5 | 10.0-12.0s | **CTA** | "Gero Wallet → Market tab" label, gerowallet.io/wallet/market-data cyan pill, "Next: why your swap moved the price." teaser below |

## Screenshot

The reveal frame is a real screenshot of `gerowallet.io/wallet/market-data/`, captured at build time. It shows the live data strip:
- NIGHT $0.0338 +5.9% (the #1 by volume, the actual top token at capture time)
- SNEK $0.03849 +2.7%
- STRIKE $0.6159 -7.3%
- NIGHT 1H CANDLES, RSI 45
- MCAP $522.06M, VOL $300.7K, TVL $2.72M

Cropped to 1080x1080, centered on the 1080x1920 stage with a thin cyan border.

## Sound plan

- 0.0-2.4 (hook): 5 quiet plucks at 0.48s intervals (C5, D5, E5, G5, A5)
- 2.4 (between Q and A): a single tick (A4)
- 0.0-4.2: a low triangle pad (D3, A3)
- **4.2 (the DROP)**: a bandpass noise hit + 4 rising plucks (C4, E4, G4, C5) + a fuller sawtooth pad
- 4.2-8.0 (reveal): the fuller pad holds
- 8.0-12.0 (pay + CTA): a softer triangle pad + a single pluck + a noise hit on the CTA

## Brand

- thedigitalstag watermark (stag-circle.png + "thedigitalstag" + "Locking horns with digital assets") in every era
- Cyan accent on Gero content only: the "today?" word in the hook, the "Not SNEK." in the sharpen, the screenshot border, the "Live from gerowallet.io" caption, the "Ranked." word in the pay, the gerowallet.io pill

## Voice

None. Captions are in `piece.json` `captions`.

## Bridge

None — this is a frame-sequence piece (hard cuts, no morphs). The reveal IS the cut.
