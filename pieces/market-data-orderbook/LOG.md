# market-data-orderbook LOG

Build log for piece #3 in the thedigitalstag Gero series. Same frame-sequence format as #2.

## 2026-10-13 — first build

Frame sequence (12s, 5 hard-cut frames, no morphs):
  1 (0-2.4s)   HOOK: "You're only seeing / half the / order book." (3 lines, last in cyan)
  2 (2.4-4.2s) SHARPEN: a thin hand-drawn MuesliSwap order book (greyed out, red "?")
                + "That's one venue." in cyan
  3 (4.2-8.0s) REVEAL: real Gero screenshot, cyan border, "Live from gerowallet.io"
                MUSIC DROP at 4.2s
  4 (8-10s)    PAY: "Every trade. / Every venue. / One view."
  5 (10-12s)   CTA: gerowallet.io pill + "Next: same token, same minute, 3% apart."

The user said to use the "earlier screenshot" (the NIGHT page view they shared). I captured a similar view from `gerowallet.io/wallet/market-data/` using `tools/capture.mjs` — the public page shows a preview of the Market tab (which contains the same data the NIGHT page shows: 11 DEXes, live token prices, candles). Cropped to 1080x1080, embedded as `assets/gero-reveal.png`.

The sharpen frame uses a hand-drawn MuesliSwap order book (from thedigitalstag style) with only 2 asks and 2 bids of thin depth, plus a red "?" overlay to show it's incomplete. This visually contrasts with the "all 11" reveal that follows.

## Open / follow-ups

- The NIGHT page (the user's earlier screenshot) shows a fuller order book with Recent Trades from multiple venues. The public market data page only shows the live data strip. For a richer reveal, we'd need to capture the actual wallet UI (requires the browser extension).
- The hand-drawn order book in the sharpen frame is a stylistic approximation, not a real order book. It's clearly marked as "incomplete" with the red "?".
- #4 (price spread) and #5 (P&L) still need to be built. Same frame-sequence format.
